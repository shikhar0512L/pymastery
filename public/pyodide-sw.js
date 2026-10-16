// 🐍 Pyodide singleton with status + package auto-loading.
// Status: 'idle' → 'loading' (runtime) → 'packages' → 'ready' | 'error'

const PYODIDE_VERSION = '0.26.2';
const CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// All packages the platform will ever need for current + planned modules.
// Loaded once after the runtime boots; cached by service worker afterwards.
const AUTO_LOAD_PACKAGES = [
  'numpy',         // numerical foundation
  'pandas',        // data handling (drags in numpy + pytz + dateutil)
  'matplotlib',    // plotting
  'scipy',         // scientific computing
  'scikit-learn',  // machine learning module
];

let pyodidePromise = null;
let pyodideInstance = null;
let packagesPromise = null;
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
  // Emit current state on subscribe
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

        // Kick off package loading immediately in the background.
        // Users can start reading a lesson while this happens.
        setStatus('packages', 'Loading Python packages…');
        packagesPromise = instance
          .loadPackage(AUTO_LOAD_PACKAGES, {
            messageCallback: (msg) => {
              // msg looks like "Loading numpy, pandas, ..." — show progress
              if (typeof msg === 'string' && msg.length < 80) {
                setStatus('packages', msg);
              }
            },
          })
          .then(() => {
            setStatus('ready', '');
          })
          .catch((e) => {
            console.warn('[pyodide] package load failed:', e);
            // Do not fail the whole runtime — some code still works.
            setStatus('ready', '');
            packagesPromise = null;
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

// Await the package loading (no-op after the first success).
async function ensurePackages() {
  if (packagesPromise) {
    try {
      await packagesPromise;
    } catch {
      /* error already handled */
    }
  }
}

/**
 * Run a Python code string in the browser.
 */
export async function runPython(code) {
  const pyodide = await getPyodide();
  await ensurePackages();

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

/**
 * Run user-written code against test cases.
 */
export async function runCodeChallenge(userCode, tests) {
  const pyodide = await getPyodide();
  await ensurePackages();

  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });

  pyodide.globals.set('__pym_user_code', userCode);
  pyodide.globals.set('__pym_tests_json', JSON.stringify(tests));

  const PYTHON_RUNNER = `
import json as __pym_json
import io as __pym_io
import sys as __pym_sys

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
            actual = repr(eval(t['input'], ns))
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

/**
 * Run user code and compare its stdout against an expected string.
 */
export async function runOutputMatch(userCode, expectedOutput) {
  const pyodide = await getPyodide();
  await ensurePackages();

  pyodide.setStdout({ batched: () => {} });
  pyodide.setStderr({ batched: () => {} });

  pyodide.globals.set('__pym_user_code', userCode);
  pyodide.globals.set('__pym_expected', expectedOutput);

  const RUNNER = `
import io as __pym_io
import sys as __pym_sys
import json as __pym_json

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