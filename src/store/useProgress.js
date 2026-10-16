import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  trackLessonComplete,
  trackChallengeAttempt,
} from '../lib/analytics';

const useProgress = create(
  persist(
    (set, get) => ({
      // ── State ──
      xp: 0,
      completedLessons: {},
      completedChallenges: {},
      streak: 0,
      lastVisit: null,
      totalChallenges: 0,
      correctChallenges: 0,

      // ── Actions ──
      addXp: (amount) =>
        set((s) => ({
          xp: s.xp + amount,
          lastVisit: new Date().toISOString(),
        })),

      completeLesson: (moduleId, lessonId) => {
        const key = `${moduleId}:${lessonId}`;
        if (get().completedLessons[key]) return;
        set((s) => ({
          completedLessons: { ...s.completedLessons, [key]: true },
          lastVisit: new Date().toISOString(),
        }));
        // 📊 Analytics
        trackLessonComplete(moduleId, lessonId);
      },

      recordChallenge: (moduleId, lessonId, challengeId, correct, type) => {
        const key = `${moduleId}:${lessonId}:${challengeId}`;
        if (key in get().completedChallenges) return;
        set((s) => ({
          completedChallenges: { ...s.completedChallenges, [key]: correct },
          totalChallenges: s.totalChallenges + 1,
          correctChallenges: s.correctChallenges + (correct ? 1 : 0),
          lastVisit: new Date().toISOString(),
        }));
        // 📊 Analytics
        trackChallengeAttempt(moduleId, lessonId, challengeId, type, correct);
      },

      isLessonComplete: (moduleId, lessonId) =>
        !!get().completedLessons[`${moduleId}:${lessonId}`],

      getModuleProgress: (moduleId, totalLessons) => {
        if (!totalLessons) return 0;
        const done = Object.keys(get().completedLessons).filter((k) =>
          k.startsWith(`${moduleId}:`)
        ).length;
        return Math.round((done / totalLessons) * 100);
      },

      reset: () =>
        set({
          xp: 0,
          completedLessons: {},
          completedChallenges: {},
          streak: 0,
          lastVisit: null,
          totalChallenges: 0,
          correctChallenges: 0,
        }),
    }),
    {
      name: 'pymastery-progress',
      version: 1,
    }
  )
);

export default useProgress;