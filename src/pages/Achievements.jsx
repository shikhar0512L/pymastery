import useProgress from '../store/useProgress';
import { ACHIEVEMENTS, CATEGORY_LABELS } from '../lib/achievements';
import ShareProgressButton from '../components/ShareProgressButton';

const CATEGORY_ORDER = [
  'lessons',
  'streak',
  'xp',
  'challenges',
  'accuracy',
  'daily',
  'modules',
];

export default function Achievements() {
  const unlocked = useProgress((s) => s.unlockedAchievements || {});
  const unlockedCount = Object.keys(unlocked).length;
  const totalCount = ACHIEVEMENTS.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  const grouped = {};
  for (const a of ACHIEVEMENTS) {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-32 sm:px-6 sm:pb-36">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1
              className="font-bold tracking-tight text-white"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)' }}
            >
              🏆 Achievements
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-surface-600">
              Milestones you unlock as you learn. {unlockedCount} of {totalCount}{' '}
              unlocked so far.
            </p>
          </div>
          {unlockedCount > 0 && (
            <ShareProgressButton variant="secondary" label="Share" />
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4 rounded-xl border border-surface-800 bg-surface-900/40 px-4 py-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-surface-600">Overall progress</span>
            <span className="font-medium text-slate-300">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-8">
        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (!items?.length) return null;
          const catUnlocked = items.filter((a) => unlocked[a.id]).length;

          return (
            <div key={cat}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-300">
                  {CATEGORY_LABELS[cat]}
                </h2>
                <span className="text-[11px] text-surface-600">
                  {catUnlocked}/{items.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                {items.map((a) => {
                  const isUnlocked = !!unlocked[a.id];
                  const unlockTime = unlocked[a.id];
                  return (
                    <div
                      key={a.id}
                      className={`rounded-xl border p-3 text-center transition-all sm:p-4 ${
                        isUnlocked
                          ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-orange-500/5'
                          : 'border-surface-800 bg-surface-900/40 opacity-60'
                      }`}
                    >
                      <div
                        className={`mb-1.5 text-3xl sm:mb-2 sm:text-4xl ${
                          isUnlocked ? '' : 'grayscale'
                        }`}
                      >
                        {isUnlocked ? a.icon : '🔒'}
                      </div>
                      <div className="text-[12px] font-semibold text-white sm:text-sm">
                        {isUnlocked ? a.title : '???'}
                      </div>
                      <div className="mt-0.5 text-[10px] leading-tight text-surface-600 sm:text-[11px]">
                        {isUnlocked ? a.description : 'Locked'}
                      </div>
                      {isUnlocked && unlockTime && (
                        <div className="mt-1.5 text-[10px] text-amber-400/70">
                          {new Date(unlockTime).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}