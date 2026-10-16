import { useState } from 'react';
import { runPython, isPyodideLoaded } from '../../lib/pyodide';

const KEYWORDS = new Set([
  'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and',
  'or', 'return', 'import', 'from', 'as', 'True', 'False', 'None', 'print',
  'is', 'pass', 'break', 'continue', 'lambda', 'try', 'except', 'finally',
  'with', 'yield', 'raise', 'global', 'nonlocal', 'del', 'assert', 'match',
  'case',
]);

const TOKEN_REGEX =
  /(#.*$)|('[^']*'|"[^"]*")|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)/gm;

function tokenize(code) {
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: code.slice(lastIndex, match.index), type: 'plain' });
    }
    if (match[1]) parts.push({ text: match[1], type: 'comment' });
    else if (match[2]) parts.push({ text: match[2], type: 'string' });
    else if (match[3]) parts.push({ text: match[3], type: 'number' });
    else if (match[4]) {
      const word = match[4];
      parts.push({ text: word, type: KEYWORDS.has(word) ? 'keyword' : 'plain' });
    }
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < code.length) {
    parts.push({ text: code.slice(lastIndex), type: 'plain' });
  }
  return parts;
}

const tokenClasses = {
  plain: 'text-slate-200',
  comment: 'text-slate-500 italic',
  string: 'text-amber-300',
  number: 'text-cyan-300',
  keyword: 'text-violet-400',
};

export default function CodeBlock({
  code,
  output,
  language = 'python',
  runnable = false,
}) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [booted, setBooted] = useState(isPyodideLoaded());

  const tokens = tokenize(code || '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleRun = async () => {
    if (running) return;
    setRunning(true);
    setResult(null);
    try {
      const out = await runPython(code);
      setResult(out);
      setBooted(true);
    } catch (e) {
      setResult({ stdout: '', stderr: '', value: null, error: e.message });
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-surface-700 bg-surface-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-800 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-surface-600">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {runnable && (
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20 disabled:opacity-60"
            >
              {running ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
                  <span>{booted ? 'Running' : 'Booting…'}</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Run</span>
                </>
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="rounded-md border border-surface-700 px-2 py-1 text-[11px] font-medium text-surface-600 transition-colors hover:border-brand-500/50 hover:text-brand-400"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <code>
          {tokens.map((t, i) => (
            <span key={i} className={tokenClasses[t.type]}>
              {t.text}
            </span>
          ))}
        </code>
      </pre>

      {/* Static expected output (from lesson data) — hidden while a Run result is present */}
      {output && !result && (
        <div className="border-t border-surface-800 bg-surface-950/60 px-4 py-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">
            Output
          </div>
          <pre className="text-[13px] font-mono text-emerald-300">{output}</pre>
        </div>
      )}

      {/* Live run output */}
      {result && <RunResult result={result} />}
    </div>
  );
}

function RunResult({ result }) {
  const hasError = !!result.error;
  const hasStderr = !!result.stderr && !hasError;
  const hasStdout = !!result.stdout;
  const hasValue = result.value !== null && result.value !== undefined;

  if (!hasError && !hasStderr && !hasStdout && !hasValue) {
    return (
      <div className="animate-fade-in border-t border-surface-800 bg-surface-950/60 px-4 py-3">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-surface-600">
          Output
        </div>
        <pre className="text-[13px] font-mono text-surface-600">
          (no output)
        </pre>
      </div>
    );
  }

  return (
    <div className="animate-fade-in border-t border-surface-800 bg-surface-950/70 px-4 py-3">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">
          Output
        </span>
        {hasError && (
          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-medium text-rose-400">
            error
          </span>
        )}
      </div>
      {hasStdout && (
        <pre className="whitespace-pre-wrap text-[13px] font-mono text-emerald-300">
          {result.stdout}
        </pre>
      )}
      {hasValue && (
        <pre className="whitespace-pre-wrap text-[13px] font-mono text-cyan-300">
          {hasStdout ? '\n' : ''}
          {result.value}
        </pre>
      )}
      {hasStderr && (
        <pre className="whitespace-pre-wrap text-[13px] font-mono text-amber-300">
          {result.stderr}
        </pre>
      )}
      {hasError && (
        <pre className="whitespace-pre-wrap text-[13px] font-mono text-rose-400">
          {result.error}
        </pre>
      )}
    </div>
  );
}