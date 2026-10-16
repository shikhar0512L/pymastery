import { useState } from 'react';
import useProgress from '../../store/useProgress';
import CodeBlock from './CodeBlock';
import MathText from './MathText';

const TYPE_LABELS = {
  mcq: 'Multiple Choice',
  'predict-output': 'Predict the Output',
  'code-fill': 'Fill in the Blank',
};

const TYPE_ICONS = {
  mcq: '🎯',
  'predict-output': '🔮',
  'code-fill': '✏️',
};

export default function MCQChallenge({
  moduleId,
  lessonId,
  challenge,
  index,
  total,
}) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const { addXp, recordChallenge, completedChallenges } = useProgress();
  const challengeKey = `${moduleId}:${lessonId}:${challenge.id}`;
  const alreadyAnswered = challengeKey in completedChallenges;

  const isCorrect = selected === challenge.correct;

  const handleSelect = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);

    const correct = i === challenge.correct;
    recordChallenge(moduleId, lessonId, challenge.id, correct);
    if (correct && !alreadyAnswered) {
      addXp(challenge.xp);
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-surface-700 bg-surface-900/60">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-800 bg-surface-950/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">{TYPE_ICONS[challenge.type]}</span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-600">
            {TYPE_LABELS[challenge.type] || 'Challenge'}
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
        <div className="text-[15px] font-medium leading-relaxed text-slate-200">
          <MathText>{challenge.question}</MathText>
        </div>

        {challenge.type === 'code-fill' ? (
          <CodeFillDisplay
            code={challenge.code}
            options={challenge.options}
            selected={selected}
            revealed={revealed}
            correctIdx={challenge.correct}
          />
        ) : challenge.code ? (
          <CodeBlock code={challenge.code} language="python" runnable />
        ) : null}

        {/* Options */}
        <div className="space-y-2">
          {challenge.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isThisCorrect = i === challenge.correct;
            const isThisSelected = i === selected;

            let btnClass =
              'border-surface-700 bg-surface-850 hover:border-surface-600 hover:bg-surface-800';
            let badgeClass = 'bg-surface-800 text-surface-600';
            let icon = null;

            if (revealed) {
              if (isThisCorrect) {
                btnClass =
                  'border-emerald-500/60 bg-emerald-500/10 cursor-default';
                badgeClass = 'bg-emerald-500/20 text-emerald-300';
                icon = '✓';
              } else if (isThisSelected) {
                btnClass =
                  'border-rose-500/60 bg-rose-500/10 cursor-default';
                badgeClass = 'bg-rose-500/20 text-rose-300';
                icon = '✗';
              } else {
                btnClass =
                  'border-surface-800 bg-surface-900/40 opacity-50 cursor-default';
              }
            } else {
              btnClass += ' cursor-pointer';
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={revealed}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all ${btnClass}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${badgeClass}`}
                >
                  {letter}
                </span>
                <span
                  className={`flex-1 text-[13px] text-slate-200 ${
                    challenge.math ? '' : 'font-mono'
                  }`}
                >
                  <MathText>{opt}</MathText>
                </span>
                {icon && (
                  <span
                    className={`text-base font-bold ${
                      isThisCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {icon}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div
            className={`animate-slide-up rounded-xl border p-4 ${
              isCorrect
                ? 'border-emerald-500/40 bg-emerald-500/5'
                : 'border-rose-500/40 bg-rose-500/5'
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
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
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="text-[11px] font-medium text-surface-600 transition-colors hover:text-white"
                >
                  ↻ Try again
                </button>
              )}
            </div>
            <p className="text-[13px] leading-relaxed text-slate-300">
              <MathText>{challenge.explanation}</MathText>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CodeFillDisplay({ code, options, selected, revealed, correctIdx }) {
  const parts = code.split('___');
  return (
    <div className="overflow-hidden rounded-xl border border-surface-700 bg-surface-900">
      <div className="flex items-center gap-2 border-b border-surface-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-[11px] font-medium uppercase tracking-wider text-surface-600">
          python
        </span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-slate-200">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <FillSlot
                options={options}
                selected={selected}
                revealed={revealed}
                correctIdx={correctIdx}
              />
            )}
          </span>
        ))}
      </pre>
    </div>
  );
}

function FillSlot({ options, selected, revealed, correctIdx }) {
  let cls = 'border-brand-500/60 bg-brand-500/10 text-brand-300';
  if (revealed) {
    if (selected === correctIdx) {
      cls = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
    } else {
      cls = 'border-rose-500/60 bg-rose-500/10 text-rose-300';
    }
  }
  const text = selected !== null ? options[selected] : '____';
  return (
    <span
      className={`mx-0.5 inline-block rounded-md border border-dashed px-2 py-0.5 align-baseline ${cls}`}
    >
      {text}
    </span>
  );
}