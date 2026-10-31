import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import useProgress from '../store/useProgress';
import { modules } from '../data/modules';
import { generateShareCard } from '../lib/shareCard';

export default function ShareProgressButton({ variant = 'primary', label = 'Share Progress' }) {
  const { user } = useUser();
  const { xp, currentStreak, completedLessons, correctChallenges, totalChallenges, unlockedAchievements } = useProgress();
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const name = user?.firstName || user?.username || 'Python Learner';
      const accuracy = totalChallenges > 0
        ? Math.round((correctChallenges / totalChallenges) * 100)
        : 0;
      const lessonsDone = Object.keys(completedLessons).length;
      const achievementsCount = Object.keys(unlockedAchievements || {}).length;

      // Count completed modules (100% done)
      const modulesDone = modules.filter((m) => {
        if (m.status !== 'available' || !m.lessons?.length) return false;
        return m.lessons.every((l) => `${m.id}:${l.id}` in completedLessons);
      }).length;

      await generateShareCard({
        name,
        xp,
        streak: currentStreak || 0,
        achievementsCount,
        accuracy,
        lessonsDone,
        modulesDone,
      });
    } catch (e) {
      console.error('Share card failed:', e);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const baseClasses = 'flex items-center justify-center gap-2 rounded-lg font-semibold transition-all disabled:opacity-60';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-500 to-amber-500 text-white shadow-glow hover:scale-105 px-4 py-2.5 text-sm',
    secondary: 'border border-surface-700 bg-surface-900 text-slate-200 hover:border-brand-500/50 hover:text-white px-4 py-2 text-sm',
    icon: 'border border-surface-700 bg-surface-900 text-surface-300 hover:border-brand-500/50 hover:text-white h-8 w-8',
  };

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      title="Download shareable progress card"
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <span>{loading ? '⏳' : '📤'}</span>
      {variant !== 'icon' && <span>{loading ? 'Generating…' : label}</span>}
    </button>
  );
}