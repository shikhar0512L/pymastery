import { useState } from 'react';
import useProgress from '../../store/useProgress';
import MathText from './MathText';

export default function NumberChallenge({
  moduleId,
  lessonId,
  challenge,
  index,
  total,
}) {
  const [value, setValue] = useState('');
  const [revealed, setRevealed] = useState(false);

  const { addXp, recordChallenge, completedChallenges } = useProgress();
  const challengeKey = `${moduleId}:${lessonId}:${challenge.id}`;
  const alreadyAnswered = challengeKey in completedChallenges;

  const tolerance = challenge.tolerance ?? 0.01;
  const num = parseFloat(value);
  const isCorrect =
    revealed && Number.isFinite(num) && Math.abs(num - challenge.correct) <= tolerance;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (revealed) return;
    if (!Number.isFinite(num)) return;
    const correct = Math.abs(num - challenge.correct) <= tolerance;
    setRevealed(true);
    recordChallenge(moduleId, lessonId, challenge.id, correct);
    if (correct && !alreadyAnswered) addXp(challenge.xp);
  };

  const handleRetry = () => {
    setValue('');
    setRevealed(false);
  };

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-surface-700 bg-surface-900/60">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-800 bg-surface-950/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🔢</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-600">
            Numeric Answer
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
      <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-5">
        <div className="text-[15px] font-medium leading-relaxed text-slate-200">
          <MathText>{challenge.question}</MathText>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={revealed}
            placeholder={challenge.placeholder || 'Your answer'}
            className="min-w-[160px] flex-1 rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 font-mono text-[14px] text-white placeholder:text-surface-700 outline-none transition-colors focus:border-brand-500/60 disabled:opacity-60"
          />
          {challenge.unit && (
            <span className="text-[13px] text-surface-500">
              <MathText>{challenge.unit}</MathText>
            </span>
          )}
          {!revealed && (
            <button
              type="submit"
              disabled={!value.trim()}
              className="rounded-lg bg-gradient-to-br from-brand-500 to-amber-500 px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-105 disabled:opacity-40"
            >
              Check
            </button>
          )}
          {revealed && !isCorrect && (
            <button
              type="button"
              onClick={handleRetry}
              className="text-[12px] font-medium text-surface-600 transition-colors hover:text-white"
            >
              ↻ Try again
            </button>
          )}
        </div>

        {challenge.hint && !revealed && (
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[12px] text-amber-300/90">
            <MathText>{challenge.hint}</MathText>
          </div>
        )}

        {revealed && (
          <div
            className={`animate-slide-up rounded-xl border p-4 ${
              isCorrect
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-rose-500/40 bg-rose-500/5'
            }`}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">{isCorrect ? '🎉' : '💭'}</span>
              <span
                className={`text-sm font-semibold ${
                  isCorrect ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isCorrect ? 'Correct!' : 'Not quite'}
              </span>
              {isCorrect && !alreadyAnswered && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
                  +{challenge.xp} XP
                </span>
              )}
            </div>
            <p className="text-[13px] leading-relaxed text-slate-300">
              <MathText>
                {isCorrect
                  ? challenge.explanation
                  : `Expected: $${challenge.correct}$. ${challenge.explanation}`}
              </MathText>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}