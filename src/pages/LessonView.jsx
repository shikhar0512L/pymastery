import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getModuleById, getLessonStatus } from '../data/modules';
import { getLesson } from '../data/python';
import SectionRenderer from '../components/lesson/SectionRenderer';
import ChallengeCard from '../components/lesson/ChallengeCard';
import useProgress from '../store/useProgress';

const difficultyStyles = {
  beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
};

export default function LessonView() {
  const { moduleId, lessonId } = useParams();
  const module = getModuleById(moduleId);
  const lesson = getLesson(moduleId, lessonId);

  const { completedChallenges, completeLesson, completedLessons } = useProgress();

  // ── Sanitized lessons list — removes any undefined/null entries ──
  const lessons = Array.isArray(module?.lessons)
    ? module.lessons.filter((l) => l && l.id)
    : [];

  // ── Challenge progress ──
  const challenges = Array.isArray(lesson?.challenges) ? lesson.challenges : [];
  const answeredCount = challenges.filter(
    (c) => c && `${moduleId}:${lessonId}:${c.id}` in completedChallenges
  ).length;

  const totalChallenges = challenges.length;
  const allAnswered = totalChallenges > 0 && answeredCount === totalChallenges;
  const lessonKey = `${moduleId}:${lessonId}`;
  const lessonDone = lessonKey in completedLessons;

  // ── Auto-complete lesson when all challenges answered ──
  useEffect(() => {
    if (allAnswered && !lessonDone) {
      completeLesson(moduleId, lessonId);
    }
  }, [allAnswered, lessonDone, moduleId, lessonId, completeLesson]);

  // ── Prev / Next detection (safe) ──
  const currentIdx = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < lessons.length - 1
      ? lessons[currentIdx + 1]
      : null;

  // 🔒 Lock guard — direct URL access block
  if (module && lesson) {
    const status = getLessonStatus(module, lessonId, completedLessons);
    if (status === 'locked') {
      const prev = currentIdx > 0 ? lessons[currentIdx - 1] : null;
      return (
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="text-5xl">🔒</div>
          <h1 className="mt-4 text-2xl font-bold">Lesson locked</h1>
          <p className="mt-2 text-surface-600">
            Complete the previous lesson to unlock this one.
          </p>
          {prev ? (
            <Link
              to={`/module/${module.id}/lesson/${prev.id}`}
              className="mt-6 inline-block rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
            >
              Go to: {prev.title} →
            </Link>
          ) : (
            <Link
              to={`/module/${module.id}`}
              className="mt-6 inline-block text-brand-500 hover:underline"
            >
              ← Back to module
            </Link>
          )}
        </div>
      );
    }
  }

  if (!module || !lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="text-5xl">🚧</div>
        <h1 className="mt-4 text-2xl font-bold">Lesson coming soon</h1>
        <p className="mt-2 text-surface-600">
          This lesson will be added in a later step.
        </p>
        <Link
          to={`/module/${moduleId}`}
          className="mt-6 inline-block text-brand-500 hover:underline"
        >
          ← Back to module
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-surface-600">
        <Link to="/" className="transition-colors hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link
          to={`/module/${module.id}`}
          className="transition-colors hover:text-white"
        >
          {module.title}
        </Link>
        <span>/</span>
        <span className="text-surface-600/80">{lesson.title}</span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
              difficultyStyles[lesson.difficulty] || difficultyStyles.beginner
            }`}
          >
            {lesson.difficulty}
          </span>
          <span className="text-xs text-surface-600">
            {lesson.duration} min read
          </span>
          {currentIdx >= 0 && (
            <span className="text-xs text-surface-600">
              · Lesson {currentIdx + 1} of {lessons.length}
            </span>
          )}
          {lessonDone && (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
              ✓ Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {lesson.title}
        </h1>
      </header>

      {/* Intro */}
      <div className="mb-8 rounded-xl border-l-2 border-brand-500 bg-surface-900/60 p-4">
        <p className="text-[15px] leading-relaxed text-slate-200">
          {lesson.intro}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {(lesson.sections || []).map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>

      {/* Challenges */}
      {totalChallenges > 0 && (
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
              🎮 Practice Challenges
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-xl border border-surface-800 bg-surface-900/40 px-4 py-3">
            <div className="flex-1">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-surface-600">Progress</span>
                <span className="font-medium text-slate-300">
                  {answeredCount} / {totalChallenges} answered
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-800">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-amber-400 transition-all duration-500"
                  style={{
                    width: `${
                      totalChallenges
                        ? (answeredCount / totalChallenges) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {challenges.map((c, i) => (
              <ChallengeCard
                key={`${moduleId}-${lessonId}-${c.id}`}
                moduleId={moduleId}
                lessonId={lessonId}
                challenge={c}
                index={i}
                total={totalChallenges}
              />
            ))}
          </div>

          {allAnswered && (
            <div className="animate-slide-up mt-8 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-brand-500/5 p-6 text-center">
              <div className="text-4xl">🎉</div>
              <h3 className="mt-3 text-xl font-bold text-white">
                Lesson complete!
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                You answered all {totalChallenges} challenges. Keep the streak
                going.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to={`/module/${module.id}`}
                  className="rounded-lg border border-surface-700 bg-surface-900 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-brand-500/50 hover:text-white"
                >
                  All lessons
                </Link>
                {nextLesson && (
                  <Link
                    to={`/module/${module.id}/lesson/${nextLesson.id}`}
                    className="rounded-lg bg-gradient-to-r from-brand-500 to-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
                  >
                    Next: {nextLesson.title} →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prev / Next nav */}
      <div className="mt-12 grid grid-cols-2 gap-3 border-t border-surface-800 pt-6">
        {prevLesson ? (
          <Link
            to={`/module/${module.id}/lesson/${prevLesson.id}`}
            className="group rounded-xl border border-surface-800 bg-surface-900/40 p-4 transition-all hover:border-brand-500/40 hover:bg-surface-900"
          >
            <div className="text-[11px] uppercase tracking-wider text-surface-600">
              ← Previous
            </div>
            <div className="mt-1 text-sm font-medium text-white group-hover:text-brand-400">
              {prevLesson.title}
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            to={`/module/${module.id}/lesson/${nextLesson.id}`}
            className="group rounded-xl border border-surface-800 bg-surface-900/40 p-4 text-right transition-all hover:border-brand-500/40 hover:bg-surface-900"
          >
            <div className="text-[11px] uppercase tracking-wider text-surface-600">
              Next →
            </div>
            <div className="mt-1 text-sm font-medium text-white group-hover:text-brand-400">
              {nextLesson.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}