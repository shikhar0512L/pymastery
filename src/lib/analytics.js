// 📊 Analytics helpers — thin wrapper around Firebase Analytics
import { logEvent } from 'firebase/analytics';
import { analytics, initAnalytics } from './firebase';

let ready = false;

async function ensureReady() {
  if (ready) return;
  await initAnalytics();
  ready = true;
}

async function track(eventName, params = {}) {
  try {
    await ensureReady();
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  } catch (e) {
    // Never let analytics break the app
    // console.debug('[analytics]', eventName, params, e);
  }
}

// ── Page views ─────────────────────────────
export function trackPageView(path, title = '') {
  return track('page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
}

// ── Lesson events ──────────────────────────
export function trackLessonView(moduleId, lessonId, lessonTitle) {
  return track('lesson_view', {
    module_id: moduleId,
    lesson_id: lessonId,
    lesson_title: lessonTitle || '',
  });
}

export function trackLessonComplete(moduleId, lessonId) {
  return track('lesson_complete', {
    module_id: moduleId,
    lesson_id: lessonId,
  });
}

export function trackModuleView(moduleId, moduleTitle) {
  return track('module_view', {
    module_id: moduleId,
    module_title: moduleTitle || '',
  });
}

// ── Challenge events ───────────────────────
export function trackChallengeAttempt(moduleId, lessonId, challengeId, type, correct) {
  return track('challenge_attempt', {
    module_id: moduleId,
    lesson_id: lessonId,
    challenge_id: challengeId,
    challenge_type: type || 'unknown',
    correct: !!correct,
  });
}

// ── Code / interaction events ──────────────
export function trackCodeRun(moduleId, lessonId, source = 'lesson') {
  return track('code_run', {
    module_id: moduleId || 'unknown',
    lesson_id: lessonId || 'unknown',
    source,
  });
}

export function trackAssistantQuery(query) {
  return track('assistant_query', {
    query_length: query?.length || 0,
  });
}

// ── Auth events ────────────────────────────
export function trackSignIn(userId) {
  return track('sign_in', {
    user_id: userId || 'anonymous',
  });
}

export function trackSignOut() {
  return track('sign_out');
}

// ── Generic (for custom one-offs) ──────────
export function trackCustom(eventName, params = {}) {
  return track(eventName, params);
}