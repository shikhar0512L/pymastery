// 🏆 Achievement definitions + unlock checks
import { modules } from '../data/modules';

function hasCompletedModule(state, moduleId) {
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod || !mod.lessons?.length) return false;
  return mod.lessons.every((l) => `${moduleId}:${l.id}` in state.completedLessons);
}

export const ACHIEVEMENTS = [
  // ── Lessons ──
  { id: 'first_steps', icon: '🎯', title: 'First Steps', description: 'Complete your first lesson', category: 'lessons',
    check: (s) => Object.keys(s.completedLessons || {}).length >= 1 },
  { id: 'five_lessons', icon: '📚', title: 'Getting Started', description: 'Complete 5 lessons', category: 'lessons',
    check: (s) => Object.keys(s.completedLessons || {}).length >= 5 },
  { id: 'ten_lessons', icon: '📖', title: 'Bookworm', description: 'Complete 10 lessons', category: 'lessons',
    check: (s) => Object.keys(s.completedLessons || {}).length >= 10 },
  { id: 'twenty_five_lessons', icon: '🎓', title: 'Scholar', description: 'Complete 25 lessons', category: 'lessons',
    check: (s) => Object.keys(s.completedLessons || {}).length >= 25 },
  { id: 'fifty_lessons', icon: '🏛️', title: 'Sage', description: 'Complete 50 lessons', category: 'lessons',
    check: (s) => Object.keys(s.completedLessons || {}).length >= 50 },

  // ── Streaks ──
  { id: 'streak_3', icon: '🔥', title: 'On Fire', description: '3-day streak', category: 'streak',
    check: (s) => (s.currentStreak || 0) >= 3 },
  { id: 'streak_7', icon: '💪', title: 'Week Warrior', description: '7-day streak', category: 'streak',
    check: (s) => (s.currentStreak || 0) >= 7 },
      { id: 'ice_cold', icon: '🧊', title: 'Ice Cold', description: 'Saved your streak with a Freeze', category: 'streak',
    check: (s) => (s.totalFreezesUsed || 0) >= 1 },
  { id: 'streak_30', icon: '👑', title: 'Consistency King', description: '30-day streak', category: 'streak',
    check: (s) => (s.currentStreak || 0) >= 30 },

  // ── XP ──
  { id: 'xp_100', icon: '⚡', title: 'Spark', description: 'Earn 100 XP', category: 'xp',
    check: (s) => (s.xp || 0) >= 100 },
  { id: 'xp_500', icon: '🌟', title: 'Rising Star', description: 'Earn 500 XP', category: 'xp',
    check: (s) => (s.xp || 0) >= 500 },
  { id: 'xp_1000', icon: '🌠', title: 'Supernova', description: 'Earn 1000 XP', category: 'xp',
    check: (s) => (s.xp || 0) >= 1000 },

  // ── Challenges ──
  { id: 'challenge_10', icon: '✏️', title: 'Challenger', description: 'Solve 10 challenges', category: 'challenges',
    check: (s) => (s.correctChallenges || 0) >= 10 },
  { id: 'challenge_50', icon: '🧠', title: 'Problem Solver', description: 'Solve 50 challenges', category: 'challenges',
    check: (s) => (s.correctChallenges || 0) >= 50 },
  { id: 'challenge_100', icon: '🏆', title: 'Champion', description: 'Solve 100 challenges', category: 'challenges',
    check: (s) => (s.correctChallenges || 0) >= 100 },

  // ── Accuracy ──
  { id: 'accuracy_80', icon: '🎯', title: 'Sharpshooter', description: '80%+ accuracy (min 10 challenges)', category: 'accuracy',
    check: (s) => (s.totalChallenges || 0) >= 10 && (s.correctChallenges || 0) / s.totalChallenges >= 0.8 },
  { id: 'accuracy_95', icon: '🎖️', title: 'Precision Master', description: '95%+ accuracy (min 20 challenges)', category: 'accuracy',
    check: (s) => (s.totalChallenges || 0) >= 20 && (s.correctChallenges || 0) / s.totalChallenges >= 0.95 },

  // ── Daily ──
  { id: 'daily_first', icon: '🌅', title: 'Early Bird', description: 'Complete your first daily challenge', category: 'daily',
    check: (s) => (s.dailyChallengesCompleted || 0) >= 1 },
  { id: 'daily_10', icon: '📅', title: 'Habit Builder', description: 'Complete 10 daily challenges', category: 'daily',
    check: (s) => (s.dailyChallengesCompleted || 0) >= 10 },

  // ── Module completions ──
  { id: 'module_linalg', icon: '📐', title: 'Math Mind', description: 'Complete all Linear Algebra lessons', category: 'modules',
    check: (s) => hasCompletedModule(s, 'linear-algebra') },
  { id: 'module_calculus', icon: '📈', title: 'Calculus Conqueror', description: 'Complete all Calculus lessons', category: 'modules',
    check: (s) => hasCompletedModule(s, 'calculus') },
  { id: 'module_pandas', icon: '🐼', title: 'Data Driven', description: 'Complete all Pandas lessons', category: 'modules',
    check: (s) => hasCompletedModule(s, 'pandas') },
  { id: 'module_ml', icon: '🤖', title: 'AI Awakened', description: 'Complete all Machine Learning lessons', category: 'modules',
    check: (s) => hasCompletedModule(s, 'ml') },
  { id: 'module_numpy', icon: '📊', title: 'Array Acolyte', description: 'Complete all NumPy lessons', category: 'modules',
    check: (s) => hasCompletedModule(s, 'numpy') },
  { id: 'module_basics', icon: '🐍', title: 'Python Pro', description: 'Complete all Python Fundamentals lessons', category: 'modules',
    check: (s) => hasCompletedModule(s, 'python-basics') },
];

export const CATEGORY_LABELS = {
  lessons: '📚 Lessons',
  streak: '🔥 Streaks',
  xp: '⚡ XP',
  challenges: '🧩 Challenges',
  accuracy: '🎯 Accuracy',
  daily: '📅 Daily',
  modules: '🏆 Module Completions',
};

export function getAchievement(id) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function getNewlyUnlocked(state, alreadyUnlocked) {
  return ACHIEVEMENTS.filter(
    (a) => !alreadyUnlocked[a.id] && a.check(state)
  );
}