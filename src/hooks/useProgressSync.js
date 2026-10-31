import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useProgress from '../store/useProgress';

const SYNC_DEBOUNCE_MS = 800;

export default function useProgressSync() {
  const { user, isLoaded } = useUser();
  const userId = user?.id || null;
  const syncedRef = useRef(false);
  const pushTimerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;
    const state = useProgress.getState();
    const linkedUserId = state.linkedUserId;

    if (!userId) {
      if (linkedUserId) useProgress.getState().reset();
      syncedRef.current = false;
      return;
    }

    let cancelled = false;
    syncedRef.current = false;

    (async () => {
      try {
        const ref = doc(db, 'progress', userId);
        const snap = await getDoc(ref);
        if (cancelled) return;

        const local = extractProgress(useProgress.getState());

        if (snap.exists()) {
          const cloud = snap.data();
          const merged = mergeProgress(local, cloud);
          useProgress.setState({ ...merged, linkedUserId: userId });
          await setDoc(ref, { ...merged, lastSync: new Date().toISOString() });
        } else {
          useProgress.setState({ ...local, linkedUserId: userId });
          await setDoc(ref, { ...local, lastSync: new Date().toISOString() });
        }
        syncedRef.current = true;
      } catch (e) {
        console.warn('[sync] pull failed:', e);
        syncedRef.current = true;
      }
    })();

    return () => { cancelled = true; };
  }, [userId, isLoaded]);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = useProgress.subscribe((state) => {
      if (!syncedRef.current) return;
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
      pushTimerRef.current = setTimeout(async () => {
        try {
          const ref = doc(db, 'progress', userId);
          const payload = { ...extractProgress(useProgress.getState()), lastSync: new Date().toISOString() };
          await setDoc(ref, payload);
        } catch (e) {
          console.warn('[sync] push failed:', e);
        }
      }, SYNC_DEBOUNCE_MS);
    });
    return () => { unsubscribe(); if (pushTimerRef.current) clearTimeout(pushTimerRef.current); };
  }, [userId]);
}

function extractProgress(state) {
  return {
    xp: state.xp || 0,
    completedLessons: state.completedLessons || {},
    completedChallenges: state.completedChallenges || {},
    totalChallenges: state.totalChallenges || 0,
    correctChallenges: state.correctChallenges || 0,
    streak: state.streak || 0,
    currentStreak: state.currentStreak || 0,
    longestStreak: state.longestStreak || 0,
    lastStreakDate: state.lastStreakDate || null,
    lastDailyChallengeDate: state.lastDailyChallengeDate || null,
    dailyChallengesCompleted: state.dailyChallengesCompleted || 0,
    streakFreezes: state.streakFreezes ?? 2, // 🆕
    totalFreezesUsed: state.totalFreezesUsed || 0, // 🆕
    unlockedAchievements: state.unlockedAchievements || {},
    lastActiveModuleId: state.lastActiveModuleId || null,
    bookmarks: state.bookmarks || {},
    notes: state.notes || {},
    lastVisit: state.lastVisit || null,
  };
}

function mergeProgress(local, cloud) {
  const completedLessons = { ...(cloud.completedLessons || {}), ...(local.completedLessons || {}) };
  const completedChallenges = { ...(cloud.completedChallenges || {}) };
  for (const [key, val] of Object.entries(local.completedChallenges || {})) {
    if (completedChallenges[key] === undefined) completedChallenges[key] = val;
    else completedChallenges[key] = completedChallenges[key] || val;
  }

  const unlockedAchievements = { ...(cloud.unlockedAchievements || {}) };
  for (const [id, ts] of Object.entries(local.unlockedAchievements || {})) {
    if (!unlockedAchievements[id] || ts < unlockedAchievements[id]) unlockedAchievements[id] = ts;
  }

  const bookmarks = { ...(cloud.bookmarks || {}) };
  for (const [k, ts] of Object.entries(local.bookmarks || {})) {
    if (!bookmarks[k] || ts < bookmarks[k]) bookmarks[k] = ts;
  }

  const notes = { ...(cloud.notes || {}) };
  for (const [k, entry] of Object.entries(local.notes || {})) {
    if (!entry || !entry.text) continue;
    const cloudEntry = notes[k];
    if (!cloudEntry || (entry.updatedAt || 0) > (cloudEntry.updatedAt || 0)) notes[k] = entry;
  }

  const xp = Math.max(local.xp || 0, cloud.xp || 0);
  const totalChallenges = Object.keys(completedChallenges).length;
  const correctChallenges = Object.values(completedChallenges).filter(Boolean).length;

  return {
    xp,
    completedLessons,
    completedChallenges,
    totalChallenges,
    correctChallenges,
    streak: Math.max(local.streak || 0, cloud.streak || 0),
    currentStreak: Math.max(local.currentStreak || 0, cloud.currentStreak || 0),
    longestStreak: Math.max(local.longestStreak || 0, cloud.longestStreak || 0),
    lastStreakDate: local.lastStreakDate || cloud.lastStreakDate || null,
    lastDailyChallengeDate: local.lastDailyChallengeDate || cloud.lastDailyChallengeDate || null,
    dailyChallengesCompleted: Math.max(local.dailyChallengesCompleted || 0, cloud.dailyChallengesCompleted || 0),
    streakFreezes: Math.min(local.streakFreezes ?? 2, cloud.streakFreezes ?? 2), // 🆕 Take MIN to reflect used freezes
    totalFreezesUsed: Math.max(local.totalFreezesUsed || 0, cloud.totalFreezesUsed || 0), // 🆕 Take MAX
    unlockedAchievements,
    lastActiveModuleId: local.lastActiveModuleId || cloud.lastActiveModuleId || null,
    bookmarks,
    notes,
    lastVisit: local.lastVisit || cloud.lastVisit || null,
  };
}