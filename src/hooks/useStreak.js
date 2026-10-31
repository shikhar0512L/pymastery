import { useEffect } from 'react';
import useProgress from '../store/useProgress';

export default function useStreak() {
  const updateStreak = useProgress((s) => s.updateStreak);
  const currentStreak = useProgress((s) => s.currentStreak);
  const longestStreak = useProgress((s) => s.longestStreak);
  const lastStreakDate = useProgress((s) => s.lastStreakDate);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return { currentStreak, longestStreak, lastStreakDate };
}