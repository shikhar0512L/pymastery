import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  trackLessonComplete,
  trackChallengeAttempt,
} from '../lib/analytics';
import { getNewlyUnlocked } from '../lib/achievements';

function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

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
      
      // ── Streak & daily ──
      currentStreak: 0,
      longestStreak: 0,
      lastStreakDate: null,
      lastDailyChallengeDate: null,
      dailyChallengesCompleted: 0,

      // 🆕 Streak Freeze
      streakFreezes: 2,
      totalFreezesUsed: 0,

      // ── Achievements ──
      unlockedAchievements: {},
      pendingToasts: [],

      // ── Continue where you left off ──
      lastActiveModuleId: null,

      // ── Bookmarks & Notes ──
      bookmarks: {},
      notes: {},

      // ── Welcome Back ──
      showWelcomeBack: false,
      linkedUserId: null,

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
        trackLessonComplete(moduleId, lessonId);
        get().checkAchievements();
      },

      recordChallenge: (moduleId, lessonId, challengeId, correct, type) => {
        const key = `${moduleId}:${lessonId}:${challengeId}`;
        const existing = get().completedChallenges[key];

        if (existing === true) return;
        if (existing === false && !correct) return;

        const isNew = existing === undefined;
        const upgrading = existing === false && correct;

        set((s) => ({
          completedChallenges: { ...s.completedChallenges, [key]: correct },
          totalChallenges: isNew ? s.totalChallenges + 1 : s.totalChallenges,
          correctChallenges: upgrading
            ? s.correctChallenges + 1
            : isNew && correct
            ? s.correctChallenges + 1
            : s.correctChallenges,
          lastVisit: new Date().toISOString(),
        }));

        trackChallengeAttempt(moduleId, lessonId, challengeId, type, correct);
        get().checkAchievements();
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

      setLastActiveModule: (moduleId) => {
        if (!moduleId) return;
        if (get().lastActiveModuleId === moduleId) return;
        set({ lastActiveModuleId: moduleId });
      },

      // ── Bookmarks ──
      toggleBookmark: (moduleId, lessonId) => {
        const key = `${moduleId}:${lessonId}`;
        set((s) => {
          const b = { ...(s.bookmarks || {}) };
          if (b[key]) delete b[key];
          else b[key] = Date.now();
          return { bookmarks: b };
        });
      },
      isBookmarked: (moduleId, lessonId) => !!((get().bookmarks || {})[`${moduleId}:${lessonId}`]),
      removeBookmark: (moduleId, lessonId) => {
        const key = `${moduleId}:${lessonId}`;
        set((s) => {
          const b = { ...(s.bookmarks || {}) };
          delete b[key];
          return { bookmarks: b };
        });
      },

      // ── Notes ──
      setNote: (moduleId, lessonId, text) => {
        const key = `${moduleId}:${lessonId}`;
        const trimmed = text || '';
        set((s) => {
          const n = { ...(s.notes || {}) };
          if (!trimmed.trim()) delete n[key];
          else n[key] = { text: trimmed, updatedAt: Date.now() };
          return { notes: n };
        });
      },
      removeNote: (moduleId, lessonId) => {
        const key = `${moduleId}:${lessonId}`;
        set((s) => {
          const n = { ...(s.notes || {}) };
          delete n[key];
          return { notes: n };
        });
      },
      getNote: (moduleId, lessonId) => (get().notes || {})[`${moduleId}:${lessonId}`]?.text || '',

      // 🆕 Streak Engine (with Freeze logic)
      updateStreak: () => {
        const today = localDateKey();
        const state = get();
        if (state.lastStreakDate === today) return;

        const yesterday = localDateKey(new Date(Date.now() - 86400000));
        const twoDaysAgo = localDateKey(new Date(Date.now() - 86400000 * 2));
        
        let newStreak = state.currentStreak || 0;
        let freezes = state.streakFreezes ?? 2;
        let usedFreeze = false;
        let newTotalFreezesUsed = state.totalFreezesUsed || 0;

        if (!state.lastStreakDate) {
          newStreak = 1; // First visit
        } else if (state.lastStreakDate === yesterday) {
          newStreak += 1; // Normal streak
        } else if (state.lastStreakDate === twoDaysAgo && freezes > 0) {
          // Saved by freeze!
          newStreak += 1;
          freezes -= 1;
          usedFreeze = true;
          newTotalFreezesUsed += 1;
        } else {
          // Streak broken
          newStreak = 1;
          freezes = 2; // Reset freezes on loss
        }

        // Replenish 1 freeze every 7 days of streak
        if (newStreak > 0 && newStreak % 7 === 0 && freezes < 2 && !usedFreeze) {
          freezes += 1;
        }

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.longestStreak || 0),
          lastStreakDate: today,
          streakFreezes: freezes,
          totalFreezesUsed: newTotalFreezesUsed,
        });
        
        get().checkAchievements();
      },

      recordDailyComplete: () => {
        const today = localDateKey();
        if (get().lastDailyChallengeDate === today) return;
        set((s) => ({
          lastDailyChallengeDate: today,
          dailyChallengesCompleted: (s.dailyChallengesCompleted || 0) + 1,
          xp: s.xp + 25,
          lastVisit: new Date().toISOString(),
        }));
        get().checkAchievements();
      },

      // ── Welcome Back Gift ──
      triggerWelcomeBack: () => set({ showWelcomeBack: true }),
      claimWelcomeBackGift: () => set((s) => ({ showWelcomeBack: false, xp: s.xp + 50, lastVisit: new Date().toISOString() })),
      dismissWelcomeBack: () => set({ showWelcomeBack: false, lastVisit: new Date().toISOString() }),

      // ── Achievements ──
      checkAchievements: () => {
        const state = get();
        const already = state.unlockedAchievements || {};
        const newly = getNewlyUnlocked(state, already);
        if (!newly.length) return;

        const now = Date.now();
        const nextUnlocked = { ...already };
        for (const a of newly) nextUnlocked[a.id] = now;

        set({
          unlockedAchievements: nextUnlocked,
          pendingToasts: [
            ...(state.pendingToasts || []),
            ...newly.map((a) => a.id),
          ],
        });
      },
      dismissToast: (id) => set((s) => ({ pendingToasts: (s.pendingToasts || []).filter((t) => t !== id) })),

      reset: () =>
        set({
          xp: 0,
          completedLessons: {},
          completedChallenges: {},
          streak: 0,
          lastVisit: null,
          totalChallenges: 0,
          correctChallenges: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastStreakDate: null,
          lastDailyChallengeDate: null,
          dailyChallengesCompleted: 0,
          streakFreezes: 2,
          totalFreezesUsed: 0,
          unlockedAchievements: {},
          pendingToasts: [],
          lastActiveModuleId: null,
          bookmarks: {},
          notes: {},
          showWelcomeBack: false,
          linkedUserId: null,
        }),
    }),
    {
      name: 'pymastery-progress',
      version: 9, // 🆕 bumped for Streak Freeze
      migrate: (persisted, fromVersion) => {
        const base = { ...persisted };
        // Previous migrations...
        if (fromVersion < 9) {
          base.streakFreezes = base.streakFreezes ?? 2;
          base.totalFreezesUsed = base.totalFreezesUsed || 0;
        }
        return base;
      },
    }
  )
);

export default useProgress;