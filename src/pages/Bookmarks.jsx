import { Link } from 'react-router-dom';
import useProgress from '../store/useProgress';
import { getModuleById } from '../data/modules';
import { getLesson } from '../data/python';

const difficultyColors = {
  beginner: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  intermediate: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  advanced: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
};

export default function Bookmarks() {
  const bookmarks = useProgress((s) => s.bookmarks || {});
  const removeBookmark = useProgress((s) => s.removeBookmark);

  const entries = Object.entries(bookmarks)
    .map(([key, ts]) => {
      const [moduleId, lessonId] = key.split(':');
      const module = getModuleById(moduleId);
      const lesson = getLesson(moduleId, lessonId);
      if (!module || !lesson) return null;
      return { key, moduleId, lessonId, module, lesson, ts };
    })
    .filter(Boolean)
    .sort((a, b) => b.ts - a.ts);

  if (entries.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-5xl">🔖</div>
        <h1 className="mt-4 text-2xl font-bold">No bookmarks yet</h1>
        <p className="mt-2 text-surface-600">
          Click the <strong className="text-amber-400">Save</strong> button on
          any lesson to bookmark it for later.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
        >
          Browse lessons →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-32 sm:px-6 sm:pb-36">
      <div className="mb-8">
        <h1
          className="font-bold tracking-tight text-white"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)' }}
        >
          🔖 Bookmarks
        </h1>
        <p className="mt-2 text-sm text-surface-600">
          {entries.length} saved lesson{entries.length === 1 ? '' : 's'}. Click
          any to continue.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {entries.map((e) => (
          <div
            key={e.key}
            className="group relative overflow-hidden rounded-xl border border-surface-800 bg-surface-900/40 transition-all hover:border-amber-500/40 hover:bg-surface-900"
          >
            <Link
              to={`/module/${e.moduleId}/lesson/${e.lessonId}`}
              className="block p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-950/60 text-xl">
                  {e.module.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-surface-600">
                    {e.module.title}
                  </div>
                  <div className="mt-0.5 truncate text-sm font-bold text-white group-hover:text-amber-400">
                    {e.lesson.title}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        difficultyColors[e.lesson.difficulty] ||
                        difficultyColors.beginner
                      }`}
                    >
                      {e.lesson.difficulty}
                    </span>
                    <span className="text-[10px] text-surface-600">
                      {e.lesson.duration} min
                    </span>
                    <span className="text-[10px] text-surface-600">
                      · Saved{' '}
                      {new Date(e.ts).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <button
              onClick={(ev) => {
                ev.preventDefault();
                removeBookmark(e.moduleId, e.lessonId);
              }}
              title="Remove bookmark"
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md text-surface-600 opacity-0 transition-all hover:bg-rose-500/15 hover:text-rose-400 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}