import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import useProgress from '../store/useProgress';

export default function Home() {
  const { xp, completedLessons, correctChallenges, totalChallenges } = useProgress();
  const doneCount = Object.keys(completedLessons).length;
  const accuracy = totalChallenges
    ? Math.round((correctChallenges / totalChallenges) * 100)
    : 0;

  const liveCount = modules.filter((m) => m.status === 'available').length;
  const totalLessons = modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero */}
      <div className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-surface-700 bg-surface-900 px-3 py-1 text-xs text-surface-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Interactive Python Learning
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Learn Python by <span className="brand-gradient">playing</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-surface-600 sm:text-lg">
          Master Python, Math and Machine Learning — from a 7th grader&apos;s first line of code
          to building your own ML models. All interactive, all in your browser, all free.
        </p>
      </div>

      {/* Stats row — sirf tab dikhao jab user ne kuch kiya ho */}
      {(xp > 0 || doneCount > 0) && (
        <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard label="Total XP" value={xp} icon="⚡" color="text-amber-400" />
          <StatCard label="Lessons Done" value={doneCount} icon="✓" color="text-emerald-400" />
          <StatCard
            label="Accuracy"
            value={totalChallenges ? `${accuracy}%` : '—'}
            icon="🎯"
            color="text-cyan-400"
          />
        </div>
      )}

      {/* Modules grid */}
      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-xl font-bold tracking-tight">Learning Paths</h2>
          <span className="text-sm text-surface-600">
            {liveCount} modules · {totalLessons}+ lessons · all free
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </div>

      {/* Footer */}
<footer className="mt-20 border-t border-surface-800 pt-8 text-center text-sm text-surface-600">
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
    <div className="glass-card p-4 text-center">
      <div className={`mb-1 text-2xl ${color}`}>{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-surface-600">{label}</div>
    </div>
  );
}