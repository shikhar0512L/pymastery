import { knowledge } from '../data/assistant/knowledge';
import { getAllLessons } from '../data/python';

/* ═══════════════════════════════════════════
   Stopwords — filter generic English words
   Note: 'is' is intentionally NOT here —
   it is a meaningful Python operator keyword.
   ═══════════════════════════════════════════ */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'how', 'what', 'why', 'when', 'where', 'which',
  'who', 'whom', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'from',
  'and', 'or', 'not', 'but', 'if', 'then', 'than', 'so', 'as', 'by',
  'this', 'that', 'these', 'those', 'i', 'me', 'my', 'you', 'your',
  'we', 'us', 'our', 'it', 'its', 'can', 'could', 'should', 'would',
  'will', 'just', 'about', 'into', 'out', 'up', 'down', 'over', 'under',
  'difference', 'between', 'vs', 'versus', 'explain', 'tell', 'about',
]);

function normalize(s) {
  return (s || '').toLowerCase().replace(/[^\w]/g, '');
}

/* ═══════════════════════════════════════════
   Keyword scoring — bidirectional matching
   ═══════════════════════════════════════════ */
function scoreEntry(entry, tokens) {
  let score = 0;
  const keywords = [...new Set(entry.keywords.map(normalize))].filter(Boolean);
  const questionNorm = normalize(entry.question);

  for (const token of tokens) {
    const t = normalize(token);
    if (!t || t.length < 2) continue;

    for (const kw of keywords) {
      if (kw === t) score += 10;
      else if (t.length >= 3 && kw.startsWith(t)) score += 5;
      else if (t.length >= 4 && kw.includes(t)) score += 3;
      else if (kw.length >= 3 && t.includes(kw)) score += 4;   // reverse
    }

    if (t.length >= 4 && questionNorm.includes(t)) score += 3;
  }
  return score;
}

function matchIntent(q) {
  if (/^(hi|hello|hey|yo|sup)\b/i.test(q)) return 'greeting';
  if (/\b(thanks?|thank you|thx|ty)\b/i.test(q)) return 'thanks';
  if (/^(help|what can you do|commands|options)\b/i.test(q)) return 'help';
  return null;
}

function tokenize(q) {
  return q
    .split(/\s+/)
    .map((t) => normalize(t))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/* ═══════════════════════════════════════════
   Lesson full-text search
   ═══════════════════════════════════════════ */
function findSnippet(lesson, tokens) {
  for (const section of lesson.sections || []) {
    const text = (section.content || '').toLowerCase();
    for (const token of tokens) {
      const idx = text.indexOf(token);
      if (idx !== -1) {
        const raw = section.content;
        const start = Math.max(0, idx - 40);
        const end = Math.min(raw.length, idx + 90);
        return (
          (start > 0 ? '…' : '') +
          raw.slice(start, end) +
          (end < raw.length ? '…' : '')
        );
      }
    }
  }
  return lesson.intro ? lesson.intro.slice(0, 140) : '';
}

export function searchLessons(query, limit = 5) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter((t) => t.length >= 3);
  if (!tokens.length) return [];

  const results = [];

  for (const { moduleId, lessonId, lesson } of getAllLessons()) {
    let score = 0;
    const title = (lesson.title || '').toLowerCase();
    const intro = (lesson.intro || '').toLowerCase();
    const sectionsText = (lesson.sections || [])
      .map((s) => `${s.content || ''} ${s.code || ''}`)
      .join(' ')
      .toLowerCase();
    const challengeText = (lesson.challenges || [])
      .map((c) => `${c.question || ''} ${c.code || ''}`)
      .join(' ')
      .toLowerCase();

    for (const token of tokens) {
      if (title.includes(token)) score += 15;
      if (intro.includes(token)) score += 8;
      if (sectionsText.includes(token)) score += 4;
      if (challengeText.includes(token)) score += 2;
    }

    if (score > 0) {
      results.push({
        moduleId,
        lessonId,
        title: lesson.title,
        score,
        snippet: findSnippet(lesson, tokens),
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

function extractLessonSearchQuery(q) {
  const patterns = [
    /(?:find|search|which|what)\s+lessons?\s+(?:about|on|for|covering)\s+(.+)/i,
    /lessons?\s+(?:about|on|covering)\s+(.+)/i,
    /where\s+(?:can\s+i\s+)?learn\s+(?:about\s+)?(.+)/i,
    /which\s+lesson\s+covers?\s+(.+)/i,
  ];
  for (const p of patterns) {
    const m = q.match(p);
    if (m && m[1]) return m[1].trim().replace(/[?.!]$/, '');
  }
  return null;
}

/* ═══════════════════════════════════════════
   Related entries picker
   Priority: same LESSON → same MODULE → global
   ═══════════════════════════════════════════ */
function pickRelated(scored, currentEntry, limit = 3) {
  const currentModule = currentEntry?.lessonLink?.moduleId;
  const currentLesson = currentEntry?.lessonLink?.lessonId;
  const currentId = currentEntry?.id;

  const scoreMap = new Map();
  for (const s of scored) {
    if (s.entry.id === currentId) continue;
    scoreMap.set(s.entry.id, s.score);
  }

  const seenIds = new Set([currentId]);
  const sameLesson = [];
  const sameModule = [];
  const global = [];

  const ranked = knowledge
    .filter((e) => e.id !== currentId)
    .map((e) => ({ entry: e, score: scoreMap.get(e.id) || 0 }))
    .sort((a, b) => b.score - a.score);

  // 1️⃣ Same LESSON
  for (const { entry } of ranked) {
    if (sameLesson.length >= limit) break;
    if (seenIds.has(entry.id)) continue;
    const ll = entry.lessonLink;
    if (
      currentLesson &&
      ll?.moduleId === currentModule &&
      ll?.lessonId === currentLesson
    ) {
      sameLesson.push(entry);
      seenIds.add(entry.id);
    }
  }

  // 2️⃣ Same MODULE
  for (const { entry } of ranked) {
    if (sameLesson.length + sameModule.length >= limit) break;
    if (seenIds.has(entry.id)) continue;
    if (currentModule && entry.lessonLink?.moduleId === currentModule) {
      sameModule.push(entry);
      seenIds.add(entry.id);
    }
  }

  // 3️⃣ Global strong matches
  for (const { entry, score } of ranked) {
    if (sameLesson.length + sameModule.length >= limit) break;
    if (seenIds.has(entry.id)) continue;
    if (score < 3) continue;
    global.push(entry);
    seenIds.add(entry.id);
  }

  return [...sameLesson, ...sameModule, ...global].slice(0, limit);
}

/* ═══════════════════════════════════════════
   Shortcuts
   ═══════════════════════════════════════════ */
export function resolveShortcut(input) {
  const q = (input || '').trim();
  if (!q.startsWith('?')) return null;
  const cmd = q.slice(1).trim();
  const [word, ...rest] = cmd.split(/\s+/);
  const key = word.toLowerCase();

  if (key === 'random' || key === 'surprise') return { type: 'random' };
  if (key === 'help' || key === 'commands') return { type: 'shortcuts-help' };
  if (key === 'lessons' && rest.length) {
    return { type: 'lesson-search', query: rest.join(' ') };
  }
  if (key === 'debug') return { type: 'debug-wait' };
  return { type: 'unknown-shortcut', word };
}

export const SHORTCUTS_HELP = [
  { cmd: '?random', desc: 'Show a random knowledge entry' },
  { cmd: '?lessons <topic>', desc: 'Find lessons about a topic' },
  { cmd: '?help', desc: 'Show this list' },
];

/* ═══════════════════════════════════════════
   Main search
   ═══════════════════════════════════════════ */
export function search(query, context = {}) {
  const q = (query || '').trim();
  if (!q) return { type: 'empty' };

  const qLower = q.toLowerCase();

  const intent = matchIntent(qLower);
  if (intent) return { type: 'intent', intent };

  // Lesson-search intent
  const lessonQuery = extractLessonSearchQuery(qLower);
  if (lessonQuery) {
    const results = searchLessons(lessonQuery, 5);
    if (results.length) {
      return { type: 'lesson-results', query: lessonQuery, results };
    }
  }

  const tokens = tokenize(qLower);
  if (tokens.length === 0) return { type: 'fallback' };

  // ⚡ Fast path: exact-question match (e.g., clicking a related question)
  const qNorm = normalize(qLower);
  if (qNorm.length > 4) {
    const exactMatch = knowledge.find(
      (e) => normalize(e.question) === qNorm
    );
    if (exactMatch) {
      const scored = knowledge
        .map((entry) => ({
          entry,
          score:
            entry.id === exactMatch.id ? 100 : scoreEntry(entry, tokens),
        }))
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score);

      return {
        type: 'answer',
        entry: exactMatch,
        related: pickRelated(scored, exactMatch, 3),
      };
    }
  }

  // Standard scoring
  const scored = knowledge
    .map((entry) => {
      let score = scoreEntry(entry, tokens);
      if (context.lessonId && entry.lessonLink?.lessonId === context.lessonId) {
        score += 2;
      }
      if (context.moduleId && entry.lessonLink?.moduleId === context.moduleId) {
        score += 1;
      }
      return { entry, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0 || scored[0].score < 5) {
    return { type: 'fallback', tokens };
  }

  const top = scored[0].entry;
  return {
    type: 'answer',
    entry: top,
    related: pickRelated(scored, top, 3),
  };
}

export function randomEntry() {
  return knowledge[Math.floor(Math.random() * knowledge.length)];
}

export function getContextSuggestions(moduleId, lessonId, limit = 3) {
  if (!moduleId) return [];

  const exact = knowledge.filter(
    (e) =>
      e.lessonLink?.lessonId === lessonId &&
      e.lessonLink?.moduleId === moduleId
  );
  const sameModule = knowledge.filter(
    (e) =>
      e.lessonLink?.moduleId === moduleId &&
      e.lessonLink?.lessonId !== lessonId
  );

  const pool = [...exact, ...sameModule];
  const seed = (lessonId || moduleId || '').length;
  const rotated = pool.length
    ? [...pool.slice(seed % pool.length), ...pool.slice(0, seed % pool.length)]
    : [];

  const seen = new Set();
  const picks = [];
  for (const entry of rotated) {
    if (picks.length >= limit) break;
    if (seen.has(entry.question)) continue;
    seen.add(entry.question);
    picks.push(entry.question);
  }
  return picks;
}

export function getAllQuestions() {
  return knowledge.map((e) => e.question);
}

export const SUGGESTIONS = [
  'What is a derivative?',
  'How does gradient descent work?',
  'What is the chain rule?',
  'What is a vector?',
  'How does groupby work in pandas?',
  'What is a decorator?',
];