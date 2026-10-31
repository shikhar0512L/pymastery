import { Link } from 'react-router-dom';
import { modules, getModuleById, getLessonStatus } from '../data/modules';

function findContinueTarget(completedLessons, lastActiveModuleId) {
  // 1. Try last active module first
  if (lastActiveModuleId) {
    const mod = getModuleById(lastActiveModuleId);
    if (mod && mod.status === 'available') {
      const unlocked = mod.lessons.find(
        (l) => getLessonStatus(mod, l.id, completedLessons) === 'unlocked'
      );
      if (unlocked) {
        const doneCount = mod.lessons.filter(
          (l) => `${mod.id}:${l.id}` in completedLessons
        ).length;
        return {
          module: mod,
          lesson: unlocked,
          done: doneCount,
          total: mod.lessons.length,
        };
      }
    }
  }

  // 2. Any module with progress + next unlocked
  const candidates = modules
    .filter((m) => m.status === 'available')
    .map((m) => {
      const done = m.lessons.filter(
        (l) => `${m.id}:${l.id}` in completedLessons
      ).length;
      const unlocked = m.lessons.find(
        (l) => getLessonStatus(m, l.id, completedLessons) === 'unlocked'
      );
      return { module: m, lesson: unlocked, done, total: m.lessons.length };
    })
    .filter((x) => x.lesson);

  if (candidates.length) {
    candidates.sort((a, b) => b.done / b.total - a.done / a.total);
    return candidates[0];
  }

  // 3. Brand new user → first available module
  const firstMod = modules.find((m) => m.status === 'available');
  if (firstMod) {
    return {
      module: firstMod,
      lesson: firstMod.lessons[0],
      done: 0,
      total: firstMod.lessons.length,
    };
  }
  return null;
}

export default function ContinueCard({ completedLessons, lastActiveModuleId }) {
  const target = findContinueTarget(completedLessons, lastActiveModuleId);
  if (!target) return null;

  const { module: mod, lesson, done, total } = target;
  const isNewUser = Object.keys(completedLessons).length === 0;

  // Fully done check
  const totalAvailableLessons = modules
    .filter((m) => m.status === 'available')
    .reduce((sum, m) => sum + m.lessons.length, 0);
  const totalDone = Object.keys(completedLessons).length;
  const isFullyDone = totalDone >= totalAvailableLessons;

  if (isFullyDone) {
    return (
      <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-brand-500/5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎉</div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              All lessons complete
            </div>
            <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
              You&apos;ve mastered everything live so far!
            </h3>
            <p className="mt-1 text-sm text-surface-500">
              Keep practicing to maintain your streak, or check your
              achievements.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/practice"
                className="rounded-lg bg-gradient-to-r from-brand-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
              >
                🎯 Practice Mode →
              </Link>
              <Link
                to="/achievements"
                className="rounded-lg border border-surface-700 bg-surface-900 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-amber-500/50 hover:text-white"
              >
                🏆 Achievements
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = Math.round((done / total) * 100);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-brand-500/40 bg-gradient-to-br from-brand-500/10 via-orange-500/5 to-transparent">
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-950/60 text-xl sm:h-12 sm:w-12 sm:text-2xl">
            {mod.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-400 sm:text-[11px]">
              {isNewUser ? '🚀 Start learning' : '▶ Continue where you left off'}
            </div>
            <div className="mt-0.5 truncate text-sm font-bold text-white sm:text-base">
              {lesson.title}
            </div>
            <div className="truncate text-[11px] text-surface-500 sm:text-xs">
              {mod.title} · Lesson {done + 1} of {total}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-amber-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-surface-600 sm:text-[11px]">
            <span>
              {done} of {total} lessons in this module
            </span>
            <span>{progressPct}%</span>
          </div>
        </div>

        <Link
          to={`/module/${mod.id}/lesson/${lesson.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01]"
        >
          {isNewUser ? 'Start first lesson' : 'Continue'} →
        </Link>
      </div>
    </div>
  );
}