import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import ContinueCard from '../components/ContinueCard';
import ShareProgressButton from '../components/ShareProgressButton';
import useProgress from '../store/useProgress';

export default function Home() {
  const {
    xp,
    completedLessons,
    correctChallenges,
    totalChallenges,
    lastActiveModuleId,
  } = useProgress();
  const doneCount = Object.keys(completedLessons).length;
  const accuracy = totalChallenges
    ? Math.round((correctChallenges / totalChallenges) * 100)
    : 0;

  const liveCount = modules.filter((m) => m.status === 'available').length;
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
  const showStats = xp > 0 || doneCount > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14">
      {/* Hero */}
      <div className="mb-10 text-center sm:mb-14">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-surface-700 bg-surface-900 px-3 py-1 text-[11px] text-surface-600 sm:mb-4 sm:text-xs">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Interactive Python Learning
        </div>

        <h1
          className="mb-3 font-extrabold tracking-tight sm:mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 6vw, 4rem)',
            lineHeight: 1.1,
          }}
        >
          Learn Python by <span className="brand-gradient">playing</span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-surface-600 sm:text-base lg:text-lg">
          Master Python, Math and Machine Learning — from a 7th grader&apos;s
          first line of code to building your own ML models. All interactive,
          all in your browser, all free.
        </p>
      </div>

      {/* Continue Where Left Off */}
      <ContinueCard
        completedLessons={completedLessons}
        lastActiveModuleId={lastActiveModuleId}
      />

      {/* Stats row + Share button */}
      {showStats && (
        <div className="mb-8 sm:mb-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">Your Stats</h2>
            <ShareProgressButton variant="secondary" label="Share Progress" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <StatCard label="Total XP" value={xp} icon="⚡" color="text-amber-400" />
            <StatCard
              label="Lessons Done"
              value={doneCount}
              icon="✓"
              color="text-emerald-400"
            />
            <StatCard
              label="Accuracy"
              value={totalChallenges ? `${accuracy}%` : '—'}
              icon="🎯"
              color="text-cyan-400"
            />
          </div>
        </div>
      )}

      {/* Modules grid */}
      <div>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            Learning Paths
          </h2>
          <span className="text-[11px] text-surface-600 sm:text-sm">
            {liveCount} modules · {totalLessons}+ lessons · all free
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-14 border-t border-surface-800 pt-6 text-center text-xs text-surface-600 sm:mt-20 sm:pt-8 sm:text-sm">
        Built with ❤️ by{' '}
        <a
          href="https://shikhar-singh-in.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-400 transition-colors hover:text-brand-300 hover:underline"
        >
          Shikhar Singh
        </a>{' '}
        · Free forever
      </footer>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="glass-card p-3 text-center sm:p-4">
      <div className={`mb-1 text-xl sm:text-2xl ${color}`}>{icon}</div>
      <div className="text-lg font-bold text-white sm:text-2xl">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-surface-600 sm:text-xs">
        {label}
      </div>
    </div>
  );
}