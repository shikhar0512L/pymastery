// 🐍 Pyodide singleton with smart package loading.
// Strategy: load numpy + pandas first (blocking), then the rest in background.

const PYODIDE_VERSION = '0.26.2';
const CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// Blocking packages — awaited before any code runs. Keep this list SMALL.
const PRIMARY_PACKAGES = ['numpy', 'pandas'];

// Background packages — loaded lazily after runtime is ready.
// No blocking; if a run needs them sooner, ensurePackages() awaits.
const BACKGROUND_PACKAGES = ['matplotlib', 'scikit-learn'];

let pyodidePromise = null;
let pyodideInstance = null;
let primaryPromise = null;
let backgroundPromise = null;
let status = 'idle';
let statusMessage = '';
const listeners = new Set();

function emit() {
  listeners.forEach((cb) => {
    try {
      cb({ status, message: statusMessage });
    } catch {
      /* ignore */
    }
  });
}

function setStatus(next, message = '') {
  status = next;
  statusMessage = message;
  emit();
}

export function getPyodideStatus() {
  return { status, message: statusMessage };
}

export function subscribePyodide(cb) {
  listeners.add(cb);
  try {
    cb({ status, message: statusMessage });
  } catch {
    /* ignore */
  }
  return () => listeners.delete(cb);
}

export function isPyodideLoaded() {
  return pyodideInstance !== null;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load Pyodide script'))
      );
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () =>
      reject(new Error('Failed to load Pyodide from CDN'));
    document.head.appendChild(script);
  });
}

export function getPyodide() {
  if (!pyodidePromise) {
    setStatus('loading', 'Booting Python runtime…');
    pyodidePromise = (async () => {
      try {
        await loadScript(`${CDN_BASE}pyodide.js`);
        // eslint-disable-next-line no-undef
        const instance = await window.loadPyodide({ indexURL: CDN_BASE });
        pyodideInstance = instance;

        // 🔇 Silence DeprecationWarnings globally — cosmetic noise
        try {
          await instance.runPythonAsync(`
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
`);
        } catch {
          /* ignore — warnings are cosmetic */
        }

        // ── Phase 1: primary packages (blocking) ──
        setStatus('packages', 'Loading numpy & pandas…');
        primaryPromise = instance
          .loadPackage(PRIMARY_PACKAGES)
          .then(() => {
            setStatus('ready', '');
            // ── Phase 2: background packages (non-blocking) ──
            backgroundPromise = instance
              .loadPackage(BACKGROUND_PACKAGES)
              .catch((e) => {
                console.warn('[pyodide] background packages failed:', e);
                backgroundPromise = null;
              });
          })
          .catch((e) => {
            console.warn('[pyodide] primary packages failed:', e);
            setStatus('ready', '');
            primaryPromise = null;
          });

        return instance;
      } catch (e) {
        setStatus('error', e.message || 'Runtime failed');
        pyodidePromise = null;
        throw e;
      }
    })();
  }
  return pyodidePromise;
}

// Detect if code needs scikit-learn
function codeNeedsSklearn(code) {
  return /\b(import\s+sklearn|from\s+sklearn)\b/.test(code || '');
}

// Ensure packages are loaded before running code.
// - Primary (numpy, pandas): always awaited
// - Background (matplotlib, sklearn): awaited only if the code needs it
async function ensurePackages(needsSklearn = false) {
  if (primaryPromise) {
    try {
      await primaryPromise;
    } catch {
      /* already handled */
    }
  }

  if (needsSklearn && backgroundPromise) {
    try {
      await backgroundPromise;
    } catch {
      /* ignore — will fail with a clear ModuleNotFoundError if needed */
    }
  }
}

export async function runPython(code) {
  const pyodide = await getPyodide();
  await ensurePackages(codeNeedsSklearn(code));

  const stdoutLines = [];
  const stderrLines = [];

  pyodide.setStdout({ batched: (msg) => stdoutLines.push(msg) });
  pyodide.setStderr({ batched: (msg) => stderrLines.push(msg) });

  let returnValue = null;
  let error = null;

  try {
    const value = await pyodide.runPythonAsync(code);
    if (value !== undefined && value !== null) {
      const str = String(value);
      if (str !== 'None') returnValue = str;
    }
  } catch (e) {
    error = e.message || String(e);
  }

  return {
    stdout: stdoutLines.join('\n'),
    stderr: stderrLines.join('\n'),
    value: returnValue,
    error,
  };
}

export async function runCodeChallenge(userCode, tests) {
  const pyodide = await getPyodide();
  await ensurePackages(codeNeedsSklearn(userCode));

  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });

  pyodide.globals.set('__pym_user_code', userCode);
  pyodide.globals.set('__pym_tests_json', JSON.stringify(tests));

  // ✅ Multi-line test input support:
  //   - single line  → eval directly (fast path)
  //   - multi-line   → exec all but last line, then eval the last
  // This matches how a Python REPL shows the final expression's value.
  const PYTHON_RUNNER = `
import json as __pym_json
import io as __pym_io
import sys as __pym_sys
import warnings as __pym_warnings
__pym_warnings.filterwarnings("ignore", category=DeprecationWarning)
__pym_warnings.filterwarnings("ignore", category=FutureWarning)

def __pym_run_tests():
    user_code = __pym_user_code
    tests = __pym_json.loads(__pym_tests_json)
    results = []
    for t in tests:
        buf = __pym_io.StringIO()
        old = __pym_sys.stdout
        __pym_sys.stdout = buf
        error = None
        actual = None
        try:
            ns = {}
            exec(user_code, ns)
            raw = t['input'].strip()
            lines = raw.split('\\n')
            if len(lines) == 1:
                actual = repr(eval(lines[0], ns))
            else:
                exec('\\n'.join(lines[:-1]), ns)
                actual = repr(eval(lines[-1], ns))
        except Exception as e:
            error = type(e).__name__ + ": " + str(e)
        finally:
            __pym_sys.stdout = old

        passed = (error is None) and (actual == t['expected'])
        results.append({
            'input': t['input'],
            'expected': t['expected'],
            'actual': actual if actual is not None else (error or ''),
            'passed': passed,
            'error': error,
            'stdout': buf.getvalue(),
        })
    return __pym_json.dumps(results)

__pym_run_tests()
`;

  try {
    const resultJson = await pyodide.runPythonAsync(PYTHON_RUNNER);
    pyodide.globals.delete('__pym_user_code');
    pyodide.globals.delete('__pym_tests_json');
    return { tests: JSON.parse(resultJson), error: null };
  } catch (e) {
    return { tests: [], error: e.message || String(e) };
  }
}

export async function runOutputMatch(userCode, expectedOutput) {
  const pyodide = await getPyodide();
  await ensurePackages(codeNeedsSklearn(userCode));

  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });

  pyodide.globals.set('__pym_user_code', userCode);
  pyodide.globals.set('__pym_expected', expectedOutput);

  const RUNNER = `
import io as __pym_io
import sys as __pym_sys
import json as __pym_json
import warnings as __pym_warnings
__pym_warnings.filterwarnings("ignore", category=DeprecationWarning)
__pym_warnings.filterwarnings("ignore", category=FutureWarning)

def __pym_check():
    user_code = __pym_user_code
    raw_expected = __pym_expected

    def norm(s):
        return '\\n'.join(line.rstrip() for line in s.split('\\n')).strip()

    expected = norm(raw_expected)

    buf = __pym_io.StringIO()
    old = __pym_sys.stdout
    __pym_sys.stdout = buf
    error = None
    try:
        exec(user_code, {})
    except Exception as e:
        error = type(e).__name__ + ": " + str(e)
    finally:
        __pym_sys.stdout = old

    actual_raw = buf.getvalue()
    actual = norm(actual_raw)
    passed = (error is None) and (actual == expected)

    return __pym_json.dumps({
        'actual': actual,
        'expected': expected,
        'passed': passed,
        'error': error,
    })

__pym_check()
`;

  try {
    const resultJson = await pyodide.runPythonAsync(RUNNER);
    pyodide.globals.delete('__pym_user_code');
    pyodide.globals.delete('__pym_expected');
    return JSON.parse(resultJson);
  } catch (e) {
    return {
      actual: '',
      expected: expectedOutput,
      passed: false,
      error: e.message || String(e),
    };
  }
}