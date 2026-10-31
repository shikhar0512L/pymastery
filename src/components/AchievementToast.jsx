import { useEffect } from 'react';
import useProgress from '../store/useProgress';
import { getAchievement } from '../lib/achievements';

export default function AchievementToast() {
  const pendingToasts = useProgress((s) => s.pendingToasts || []);
  const dismissToast = useProgress((s) => s.dismissToast);

  const currentId = pendingToasts[0];
  const achievement = currentId ? getAchievement(currentId) : null;

  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(() => dismissToast(achievement.id), 4500);
    return () => clearTimeout(t);
  }, [achievement, dismissToast]);

  if (!achievement) return null;

  return (
    <div className="pointer-events-none fixed left-1/2 top-20 z-[100] w-full max-w-sm -translate-x-1/2 px-4">
      <div className="animate-slide-down pointer-events-auto flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-orange-500/10 px-4 py-3 shadow-2xl backdrop-blur-md">
        <span className="text-3xl">{achievement.icon}</span>
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
            🏆 Achievement Unlocked
          </div>
          <div className="text-sm font-bold text-white">
            {achievement.title}
          </div>
          <div className="text-[11px] text-surface-500">
            {achievement.description}
          </div>
        </div>
        <button
          onClick={() => dismissToast(achievement.id)}
          className="flex h-6 w-6 items-center justify-center rounded-md text-surface-600 transition-colors hover:bg-surface-800 hover:text-white"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}