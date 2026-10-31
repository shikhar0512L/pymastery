import useProgress from '../store/useProgress';

export default function WelcomeBackModal() {
  const showWelcomeBack = useProgress((s) => s.showWelcomeBack);
  const claim = useProgress((s) => s.claimWelcomeBackGift);
  const close = useProgress((s) => s.dismissWelcomeBack);

  if (!showWelcomeBack) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm" 
        onClick={close} 
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-amber-500/40 bg-surface-900 shadow-2xl shadow-amber-500/20 animate-slide-up text-center p-6 sm:p-8">
        <div className="text-6xl mb-4 animate-bounce">🎁</div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
        
        <p className="text-surface-600 text-sm mb-6 leading-relaxed">
          We missed you! Here's a little boost to help you jump right back into your Python journey.
        </p>

        <div className="bg-surface-950/50 rounded-xl p-4 mb-6 border border-surface-800">
          <span className="text-3xl font-extrabold text-amber-400 block">+50 XP</span>
          <span className="text-[10px] uppercase tracking-wider text-surface-500">Bonus Gift</span>
        </div>

        <button
          onClick={claim}
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-white shadow-glow transition-transform hover:scale-105"
        >
          Claim Reward 🚀
        </button>

        <button
          onClick={close}
          className="mt-4 text-xs text-surface-500 hover:text-white transition-colors"
        >
          No thanks, I'll just browse
        </button>
      </div>
    </div>
  );
}