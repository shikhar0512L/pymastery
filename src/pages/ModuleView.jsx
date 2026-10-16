import { useParams, Link } from 'react-router-dom';
import { getModuleById, getLessonStatus } from '../data/modules';
import useProgress from '../store/useProgress';

export default function ModuleView() {
  const { moduleId } = useParams();
  const module = getModuleById(moduleId);
  const { completedLessons } = useProgress();

  if (!module) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-5xl">🤔</div>
        <h1 className="mt-4 text-2xl font-bold">Module not found</h1>
        <Link to="/" className="mt-6 inline-block text-brand-500 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  if (module.status !== 'available') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-5xl">{module.icon}</div>
        <h1 className="mt-4 text-2xl font-bold">{module.title}</h1>
        <p className="mt-2 text-surface-600">
          This module is under construction. Coming soon! 🚧
        </p>
        <Link to="/" className="mt-6 inline-block text-brand-500 hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  // Compute statuses for all lessons in one pass
  const lessonStatuses = module.lessons.map((lesson) =>
    getLessonStatus(module, lesson.id, completedLessons)
  );

  const completedCount = lessonStatuses.filter((s) => s === 'completed').length;
  const progressPct = module.lessons.length
    ? Math.round((completedCount / module.lessons.length) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="text-5xl">{module.icon}</div>
        <div>
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <p className="mt-1 text-surface-600">{module.description}</p>
        </div>
      </div>

      {/* Progress overview */}
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-surface-800 bg-surface-900/40 px-4 py-3">
        <div className="flex-1">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-surface-600">Module progress</span>
            <span className="font-medium text-slate-300">
              {completedCount} / {module.lessons.length} completed
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-800">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-amber-400 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold text-brand-400">
          {progressPct}%
        </span>
      </div>

      {/* Lessons */}
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-600">
        Lessons
      </h2>
      <div className="space-y-2">
        {module.lessons.map((lesson, i) => {
          const status = lessonStatuses[i];
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';

          const Card = (
            <div
              className={`glass-card group flex items-center gap-4 p-4 transition-all ${
                isLocked
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:border-brand-500/50'
              }`}
            >
              {/* Badge */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isCompleted
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : isLocked
                    ? 'bg-surface-800 text-surface-700'
                    : 'bg-surface-800 text-surface-500'
                }`}
              >
                {isCompleted ? '✓' : isLocked ? '🔒' : i + 1}
              </span>

              {/* Text */}
              <div className="flex-1">
                <div
                  className={`font-medium ${
                    isLocked ? 'text-surface-600' : 'text-white'
                  }`}
                >
                  {lesson.title}
                </div>
                <div className="text-xs text-surface-600">
                  {lesson.difficulty} · {lesson.duration} min
                  {isLocked && (
                    <span className="ml-2 text-surface-700">
                      · Complete previous lesson to unlock
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              {isCompleted && (
                <span className="hidden text-[11px] font-medium text-emerald-400 sm:inline">
                  Completed
                </span>
              )}
              {!isLocked && (
                <span className="text-surface-600 transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </div>
          );

          if (isLocked) {
            return <div key={lesson.id}>{Card}</div>;
          }

          return (
            <Link
              key={lesson.id}
              to={`/module/${module.id}/lesson/${lesson.id}`}
              className="block"
            >
              {Card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}