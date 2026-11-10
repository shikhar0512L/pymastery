import { useState, useEffect } from 'react';
import useProgress from '../../store/useProgress';
import CodeBlock from './CodeBlock';
import { runOutputMatch } from '../../lib/pyodide';

// 🛑 Helper: Check if code can run in Pyodide (browser)
function canRunInBrowser(code) {
  if (!code) return false;
  const blockedPatterns = [
    /^\s*import\s+flask/m,
    /^\s*from\s+flask\s+import/m,
    /^\s*import\s+django/m,
    /^\s*from\s+django\s+import/m,
    /app\.run\(/m,
  ];
  return !blockedPatterns.some((regex) => regex.test(code));
}

export default function OutputMatchChallenge({
  moduleId,
  lessonId,
  challenge,
  index,
  total,
}) {
  const [code, setCode] = useState(challenge.starterCode || '');
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const { addXp, recordChallenge, completedChallenges } = useProgress();
  const challengeKey = `${moduleId}:${lessonId}:${challenge.id}`;
  const alreadyAnswered = challengeKey in completedChallenges;
  
  const isRunnable = canRunInBrowser(code);

  // Reset state when challenge changes
  useEffect(() => {
    setCode(challenge.starterCode || '');
    setOutput(null);
    setRevealed(false);
  }, [challenge]);

  const handleRun = async () => {
    if (running || !isRunnable) return;
    setRunning(true);
    setOutput(null);
    try {
      const res = await runOutputMatch(code, challenge.expectedOutput);
      setOutput(res);
      setRevealed(true);

      const correct = res.passed;
      recordChallenge(moduleId, lessonId, challenge.id, correct, challenge.type);
      if (correct && !alreadyAnswered) {
        addXp(challenge.xp);
      }
    } catch (e) {
      setOutput({ error: e.message || String(e), passed: false });
      setRevealed(true);
    } finally {
      setRunning(false);
    }
  };

  const isCorrect = output && output.passed;

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-surface-700 bg-surface-900/60">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-800 bg-surface-950/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🖨️</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-600">
            Match the Output
          </span>
          <span className="text-[11px] text-surface-700">
            · {index + 1}/{total}
          </span>
        </div>
        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-400">
          +{challenge.xp} XP
        </span>
      </div>

      {/* Body */}
      <div className="space-y-4 p-4 sm:p-5">
        <p className="text-[15px] font-medium leading-relaxed text-slate-200">
          {challenge.question}
        </p>

        {/* Expected Output */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            🎯 Expected Output
          </div>
          <pre className="font-mono text-[13px] text-emerald-300">
            {challenge.expectedOutput}
          </pre>
        </div>

        {/* Code Editor */}
        <div className="overflow-hidden rounded-xl border border-surface-700 bg-surface-900">
          <div className="flex items-center justify-between border-b border-surface-800 bg-surface-950/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-surface-600">
                main.py
              </span>
            </div>
            <button
              onClick={() => setCode(challenge.starterCode || '')}
              className="text-[11px] text-surface-600 transition-colors hover:text-white"
            >
              ↻ Reset
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-48 w-full resize-y bg-transparent p-4 font-mono text-[13px] leading-relaxed text-slate-200 outline-none"
          />
        </div>

        {/* Run Button & Output */}
        <div className="flex flex-col gap-3">
          {!isRunnable ? (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-[12px] text-amber-300">
              ⚠️ This code contains a web framework import (like Flask/Django). It cannot be executed in the browser environment. Please use the simulation code or revert to the starter code.
            </div>
          ) : (
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {running ? '⏳ Running...' : '▶ Run'}
            </button>
          )}

          {output && (
            <div
              className={`rounded-xl border p-4 ${
                isCorrect
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-rose-500/40 bg-rose-500/5'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`text-sm font-semibold ${
                    isCorrect ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isCorrect ? '✓ Match Found!' : '✗ Mismatch'}
                </span>
              </div>
              <div className="space-y-2 font-mono text-[12px]">
                <div>
                  <span className="text-surface-600">Your Output:</span>
                  <pre className={`mt-1 p-2 rounded bg-surface-950 ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {output.error ? output.error : output.actual}
                  </pre>
                </div>
                {!isCorrect && (
                  <div>
                    <span className="text-surface-600">Expected:</span>
                    <pre className="mt-1 p-2 rounded bg-surface-950 text-emerald-300">
                      {output.expected}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}