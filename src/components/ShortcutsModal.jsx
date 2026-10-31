import { useEffect } from 'react';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], desc: 'Open Global Search', icon: '🔍' },
  { keys: ['?'], desc: 'Show this help menu', icon: '⌨️' },
  { keys: ['←'], desc: 'Previous lesson', icon: '⬅️' },
  { keys: ['→'], desc: 'Next lesson', icon: '➡️' },
  { keys: ['P'], desc: 'Go to Practice Mode', icon: '🎯' },
  { keys: ['A'], desc: 'Go to Achievements', icon: '🏆' },
  { keys: ['B'], desc: 'Go to Bookmarks', icon: '🔖' },
  { keys: ['Esc'], desc: 'Close any modal', icon: '❌' },
];

export default function ShortcutsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-surface-700 bg-surface-900 shadow-2xl animate-slide-down">
        <div className="flex items-center justify-between border-b border-surface-800 px-5 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            ⌨️ Keyboard Shortcuts
          </h2>
          <button onClick={onClose} className="text-surface-600 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-3">
          {SHORTCUTS.map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg opacity-80">{s.icon}</span>
                <span className="text-sm text-slate-300">{s.desc}</span>
              </div>
              <div className="flex gap-1">
                {s.keys.map(k => (
                  <kbd key={k} className="rounded border border-surface-700 bg-surface-800 px-2 py-1 text-xs font-mono font-semibold text-white shadow-sm">
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}