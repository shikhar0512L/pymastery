import { useState, useEffect, useRef } from 'react';
import useProgress from '../../store/useProgress';

export default function LessonNotes({ moduleId, lessonId }) {
  const setNote = useProgress((s) => s.setNote);
  const notes = useProgress((s) => s.notes || {});
  const key = `${moduleId}:${lessonId}`;
  const existingText = notes[key]?.text || '';
  const hasNote = existingText.trim().length > 0;

  const [open, setOpen] = useState(hasNote);
  const [text, setText] = useState(existingText);
  const [status, setStatus] = useState('idle'); // idle | saving | saved
  const lastSaved = useRef(existingText);
  const saveTimer = useRef(null);

  // Sync if lesson changes (soft)
  useEffect(() => {
    // If switching to a different lesson, reset
    const currentSaved = lastSaved.current || '';
    if (text === currentSaved && existingText !== text && existingText !== currentSaved) {
      setText(existingText);
      lastSaved.current = existingText;
      setOpen(existingText.trim().length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Auto-save with debounce
  useEffect(() => {
    if (text === lastSaved.current) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    setStatus('saving');

    saveTimer.current = setTimeout(() => {
      setNote(moduleId, lessonId, text);
      lastSaved.current = text;
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1400);
    }, 700);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, moduleId, lessonId]);

  const handleClear = () => {
    setText('');
    setNote(moduleId, lessonId, '');
    lastSaved.current = '';
    setStatus('idle');
  };

  const charCount = text.length;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-surface-800 bg-surface-900/40">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-surface-900/60"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">📝</span>
          <span className="text-sm font-semibold text-white">
            Your Notes
          </span>
          {hasNote && (
            <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
              {charCount} chars
            </span>
          )}
          {status === 'saving' && (
            <span className="text-[10px] text-amber-400">Saving…</span>
          )}
          {status === 'saved' && (
            <span className="text-[10px] text-emerald-400">✓ Saved</span>
          )}
        </div>
        <span className="text-xs text-surface-600">{open ? '▲' : '▼'}</span>
      </button>

      {/* Body */}
      {open && (
        <div className="border-t border-surface-800 px-4 py-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Jot down key takeaways, formulas, gotchas, or questions to revisit…"
            rows={6}
            className="w-full resize-y rounded-lg border border-surface-700 bg-surface-950 px-3 py-2 font-mono text-[13px] leading-relaxed text-slate-200 placeholder:text-surface-700 outline-none transition-colors focus:border-cyan-500/50"
            style={{ minHeight: 120 }}
          />
          <div className="mt-2 flex items-center justify-between text-[11px] text-surface-600">
            <span>
              {hasNote
                ? 'Auto-saved · synced to your account'
                : 'Notes are private · auto-saved as you type'}
            </span>
            {hasNote && (
              <button
                onClick={handleClear}
                className="rounded-md border border-surface-700 px-2 py-0.5 text-[10px] text-surface-600 transition-colors hover:border-rose-500/40 hover:text-rose-400"
              >
                Clear note
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}