import { useEffect } from 'react';
import useProgress from '../store/useProgress';

export default function useAchievements() {
  const xp = useProgress((s) => s.xp);
  const completedLessonsCount = useProgress(
    (s) => Object.keys(s.completedLessons || {}).length
  );
  const correctChallenges = useProgress((s) => s.correctChallenges);
  const totalChallenges = useProgress((s) => s.totalChallenges);
  const currentStreak = useProgress((s) => s.currentStreak);
  const dailyChallengesCompleted = useProgress(
    (s) => s.dailyChallengesCompleted
  );

  useEffect(() => {
    useProgress.getState().checkAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    xp,
    completedLessonsCount,
    correctChallenges,
    totalChallenges,
    currentStreak,
    dailyChallengesCompleted,
  ]);
}