import { useState } from 'react';
import useProgress from '../../store/useProgress';
import { runOutputMatch } from '../../lib/pyodide';

export default function OutputMatchChallenge({
  moduleId,
  lessonId,
  challenge,
  index,
  total,
}) {
  const { addXp, recordChallenge, completedChallenges } = useProgress();
  const challengeKey = `${moduleId}:${lessonId}:${challenge.id}`;
  const alreadyAnswered = challengeKey in completedChallenges;

  const [code, setCode] = useState(
    alreadyAnswered ? challenge.solution : challenge.starterCode
  );
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(alreadyAnswered);

  const handleRun = async () => {
    if (running || completed) return;
    setRunning(true);
    setResult(null);
    try {
      const res = await runOutputMatch(code, challenge.expectedOutput);
      setResult(res);
      setAttempts((a) => a + 1);

      if (res.passed && !completed) {
        setCompleted(true);
        recordChallenge(moduleId, lessonId, challenge.id, true);
        if (!alreadyAnswered) addXp(challenge.xp);
      }
    } catch (e) {
      setResult({ actual: '', expected: '', passed: false, error: e.message });
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setResult(null);
  };

  const canRevealSolution = attempts >= 2 || completed;

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

      <div className="space-y-4 p-4 sm:p-5">
        <p className="text-[15px] font-medium leading-relaxed text-slate-200">
          {challenge.question}
        </p>

        {/* Expected output */}
        <div className="overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/5">
          <div className="border-b border-emerald-500/20 px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              🎯 Expected Output
            </span>
          </div>
          <pre className="overflow-x-auto p-3 text-[13px] font-mono text-emerald-300">
            {challenge.expectedOutput}
          </pre>
        </div>

        {/* Editor */}
        <div className="overflow-hidden rounded-xl border border-surface-700 bg-surface-950">
          <div className="flex items-center justify-between border-b border-surface-800 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-surface-600">
                main.py
              </span>
            </div>
            {!completed && (
              <button
                onClick={handleReset}
                className="text-[11px] font-medium text-surface-600 transition-colors hover:text-white"
              >
                ↻ Reset
              </button>
            )}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={8}
            disabled={completed}
            className="w-full resize-y bg-surface-950 p-4 font-mono text-[13px] leading-relaxed text-slate-200 outline-none disabled:opacity-70"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRun}
            disabled={running || completed}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-all hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50"
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

          {challenge.hint && (
            <button
              onClick={() => setShowHint((v) => !v)}
              className="rounded-lg border border-surface-700 px-3 py-2 text-[12px] font-medium text-surface-500 transition-colors hover:border-surface-600 hover:text-white"
            >
              {showHint ? 'Hide Hint' : '💡 Hint'}
            </button>
          )}

          {challenge.solution && canRevealSolution && (
            <button
              onClick={() => setShowSolution((v) => !v)}
              className="rounded-lg border border-surface-700 px-3 py-2 text-[12px] font-medium text-surface-500 transition-colors hover:border-surface-600 hover:text-white"
            >
              {showSolution ? 'Hide Solution' : '🔓 Solution'}
            </button>
          )}
        </div>

        {/* Hint */}
        {showHint && challenge.hint && (
          <div className="animate-slide-up rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-sm">💡</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Hint
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-300">
              {challenge.hint}
            </p>
          </div>
        )}

        {/* Result */}
        {result && <OutputMatchResult result={result} />}

        {/* Solution */}
        {showSolution && challenge.solution && (
          <div className="animate-slide-up overflow-hidden rounded-xl border border-surface-700 bg-surface-950">
            <div className="border-b border-surface-800 px-3 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-500">
                Reference Solution
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-slate-200">
              <code>{challenge.solution}</code>
            </pre>
          </div>
        )}

        {/* Completion */}
        {completed && (
          <div className="animate-slide-up rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">🎉</span>
              <span className="text-sm font-semibold text-emerald-400">
                Output matched!
              </span>
              {!alreadyAnswered && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
                  +{challenge.xp} XP
                </span>
              )}
            </div>
            <p className="text-[13px] leading-relaxed text-slate-300">
              {challenge.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function OutputMatchResult({ result }) {
  if (result.error) {
    return (
      <div className="animate-slide-up rounded-xl border border-rose-500/40 bg-rose-500/5 p-4">
        <div className="mb-1.5 text-sm font-semibold text-rose-400">
          Runtime error
        </div>
        <pre className="whitespace-pre-wrap text-[12px] font-mono text-rose-300">
          {result.error}
        </pre>
      </div>
    );
  }

  return (
    <div
      className={`animate-slide-up rounded-xl border p-4 ${
        result.passed
          ? 'border-emerald-500/40 bg-emerald-500/5'
          : 'border-rose-500/40 bg-rose-500/5'
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-base">{result.passed ? '🎉' : '💭'}</span>
        <span
          className={`text-sm font-semibold ${
            result.passed ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {result.passed ? 'Output matched!' : 'Output did not match'}
        </span>
      </div>

      {!result.passed && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-emerald-500/30 bg-emerald-500/5">
            <div className="border-b border-emerald-500/20 px-3 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                Expected
              </span>
            </div>
            <pre className="overflow-x-auto p-3 text-[12px] font-mono text-emerald-300">
              {result.expected || '(empty)'}
            </pre>
          </div>
          <div className="overflow-hidden rounded-lg border border-rose-500/30 bg-rose-500/5">
            <div className="border-b border-rose-500/20 px-3 py-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                Your Output
              </span>
            </div>
            <pre className="overflow-x-auto p-3 text-[12px] font-mono text-rose-300">
              {result.actual || '(no output)'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}