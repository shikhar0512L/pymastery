import { usePyodideStatus } from '../hooks/usePyodide';

export default function PyodideBadge() {
  const { status, message } = usePyodideStatus();

  if (status === 'ready' || status === 'idle') return null;

  if (status === 'error') {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <div className="flex items-center gap-2 rounded-full border border-rose-500/40 bg-surface-900/95 px-4 py-2 shadow-lg backdrop-blur">
          <span className="text-sm">⚠️</span>
          <span className="text-xs font-medium text-rose-400">
            Python runtime failed to load
          </span>
        </div>
      </div>
    );
  }

  // loading | packages
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="flex items-center gap-3 rounded-full border border-surface-700 bg-surface-900/95 px-4 py-2 shadow-lg backdrop-blur">
        <div className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
        <span className="text-xs font-medium text-slate-200">
          {message || 'Loading Python…'}
        </span>
      </div>
    </div>
  );
}