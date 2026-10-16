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

  // ── On login: pull from cloud, merge with local, push merged back ──
  useEffect(() => {
    if (!isLoaded) return;
    if (!userId) {
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

        const state = useProgress.getState();
        const local = extractProgress(state);

        if (snap.exists()) {
          const cloud = snap.data();
          const merged = mergeProgress(local, cloud);
          useProgress.setState(merged);
          await setDoc(ref, {
            ...merged,
            lastSync: new Date().toISOString(),
          });
        } else {
          await setDoc(ref, {
            ...local,
            lastSync: new Date().toISOString(),
          });
        }

        syncedRef.current = true;
      } catch (e) {
        console.warn('[sync] pull failed:', e);
        // Let the user continue — sync will retry on next change
        syncedRef.current = true;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, isLoaded]);

  // ── On every progress change: debounced push to cloud ──
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = useProgress.subscribe((state) => {
      if (!syncedRef.current) return;

      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
      pushTimerRef.current = setTimeout(async () => {
        try {
          const ref = doc(db, 'progress', userId);
          const payload = {
            ...extractProgress(useProgress.getState()),
            lastSync: new Date().toISOString(),
          };
          await setDoc(ref, payload);
        } catch (e) {
          console.warn('[sync] push failed:', e);
        }
      }, SYNC_DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
    };
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
  };
}

function mergeProgress(local, cloud) {
  const completedLessons = {
    ...(cloud.completedLessons || {}),
    ...(local.completedLessons || {}),
  };

  const completedChallenges = { ...(cloud.completedChallenges || {}) };
  for (const [key, val] of Object.entries(local.completedChallenges || {})) {
    if (completedChallenges[key] === undefined) {
      completedChallenges[key] = val;
    } else {
      completedChallenges[key] = completedChallenges[key] || val;
    }
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
  };
}