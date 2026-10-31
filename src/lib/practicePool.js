// 🎲 Practice pool — aggregates all challenges from every lesson

import { getAllLessons } from '../data/python';
import { getModuleById } from '../data/modules';

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

let cachedPool = null;

export function buildChallengePool() {
  if (cachedPool) return cachedPool;
  const pool = [];
  for (const { moduleId, lessonId, lesson } of getAllLessons()) {
    const challenges = lesson?.challenges || [];
    for (const c of challenges) {
      if (!c || !c.id) continue;
      pool.push({
        moduleId,
        lessonId,
        lessonTitle: lesson.title || lessonId,
        lessonDifficulty: lesson.difficulty || 'intermediate',
        challenge: c,
        key: `${moduleId}:${lessonId}:${c.id}`,
      });
    }
  }
  cachedPool = pool;
  return pool;
}

export function filterPool(pool, { moduleId, difficulty, type } = {}) {
  return pool.filter((item) => {
    if (moduleId && moduleId !== 'all' && item.moduleId !== moduleId) return false;
    if (difficulty && difficulty !== 'all' && item.lessonDifficulty !== difficulty) return false;
    if (type && type !== 'all' && item.challenge.type !== type) return false;
    return true;
  });
}

export function getDailyChallenge() {
  const pool = buildChallengePool();
  if (!pool.length) return null;
  const today = localDateKey();
  const idx = hashString(`pymastery-daily-${today}`) % pool.length;
  return pool[idx];
}

export function pickRandom(pool, excludeKey, seenKeys) {
  if (!pool.length) return null;
  let candidates = pool.filter(
    (item) => item.key !== excludeKey && !seenKeys?.has(item.key)
  );
  if (!candidates.length) {
    candidates = pool.filter((item) => item.key !== excludeKey);
  }
  if (!candidates.length) candidates = pool;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function getModuleOptions() {
  const pool = buildChallengePool();
  const moduleIds = Array.from(new Set(pool.map((i) => i.moduleId)));
  return moduleIds
    .map((id) => ({ id, title: getModuleById(id)?.title || id }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'All levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'mcq', label: 'Multiple choice' },
  { value: 'predict-output', label: 'Predict output' },
  { value: 'code-fill', label: 'Fill in the blank' },
  { value: 'code-challenge', label: 'Code challenge' },
  { value: 'output-match', label: 'Output match' },
  { value: 'numeric-answer', label: 'Numeric answer' },
];