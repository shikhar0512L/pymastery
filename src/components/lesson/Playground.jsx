import { useState } from 'react';
import { runPython } from '../../lib/pyodide';

export default function Playground({ starterCode }) {
  const [code, setCode] = useState(starterCode);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    if (running) return;
    setRunning(true);
    setResult(null);
    try {
      const out = await runPython(code);
      setResult(out);
    } catch (e) {
      setResult({ stdout: '', stderr: '', value: null, error: e.message });
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    setResult(null);
  };

  return (
    <div className="mt-14">
      {/* Section divider */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          🧪 Playground
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
      </div>

      <p className="mb-4 text-sm leading-relaxed text-surface-600">
        Write Python, hit <span className="text-emerald-400 font-medium">Run</span>,
        and see what happens. Everything runs in your browser — no setup, no
        limits.
      </p>

      <div className="overflow-hidden rounded-2xl border border-surface-700 bg-surface-900">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-surface-800 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-surface-600">
              main.py
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="rounded-md border border-surface-700 px-2 py-1 text-[11px] font-medium text-surface-600 transition-colors hover:border-surface-500 hover:text-white"
            >
              ↻ Reset
            </button>
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1.5 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-[11px] font-semibold text-white shadow-sm transition-all hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60"
            >
              {running ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  <span>Running…</span>
                </>
              ) : (
                <>
                  <span>▶</span>
                  <span>Run</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={10}
          className="w-full resize-y bg-surface-900 p-4 font-mono text-[13px] leading-relaxed text-slate-200 outline-none placeholder:text-surface-700"
          placeholder="# Write your Python code here..."
        />

        {/* Output */}
        <div className="border-t border-surface-800 bg-surface-950/70 px-4 py-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">
            Output
          </div>
          {!result && !running && (
            <pre className="text-[13px] font-mono text-surface-600">
              Click ▶ Run to execute your code…
            </pre>
          )}
          {running && !result && (
            <pre className="text-[13px] font-mono text-surface-500">
              {running ? '⏳ Running… (first run downloads ~10 MB Python runtime)' : ''}
            </pre>
          )}
          {result && <PlaygroundOutput result={result} />}
        </div>
      </div>
    </div>
  );
}

function PlaygroundOutput({ result }) {
  const hasError = !!result.error;
  const hasStdout = !!result.stdout;
  const hasStderr = !!result.stderr && !hasError;
  const hasValue = result.value !== null && result.value !== undefined;

  return (
    <div className="space-y-1">
      {hasStdout && (
        <pre className="whitespace-pre-wrap text-[13px] font-mono text-emerald-300">
          {result.stdout}
        </pre>
      )}
      {hasValue && (
        <pre className="whitespace-pre-wrap text-[13px] font-mono text-cyan-300">
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
      {!hasError && !hasStdout && !hasStderr && !hasValue && (
        <pre className="text-[13px] font-mono text-surface-600">
          (no output)
        </pre>
      )}
    </div>
  );
}