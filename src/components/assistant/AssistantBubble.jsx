import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AssistantPanel from './AssistantPanel';
import { useAssistantOpened } from '../../hooks/useAssistantHistory';

export default function AssistantBubble() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { opened, markOpened } = useAssistantOpened();

  // Context from URL — used for smarter search scoring
  const context = {
    moduleId: params.moduleId,
    lessonId: params.lessonId,
  };

  const openPanel = () => {
    setOpen(true);
    if (!opened) markOpened();
  };

  // ── Ctrl/Cmd+K opens the assistant ──
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPanel();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <>
      {open && (
        <AssistantPanel onClose={() => setOpen(false)} context={context} />
      )}

      {!open && (
        <button
          onClick={openPanel}
          title="Ask PyMastery Assistant (Ctrl+K)"
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-amber-500 text-2xl shadow-glow transition-transform hover:scale-110 animate-slide-up"
          aria-label="Open PyMastery Assistant"
        >
          <span className="absolute inset-0 rounded-full bg-brand-500/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-ping" />
          <span className="relative">🤖</span>
          {!opened && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-surface-950 bg-rose-500" />
            </span>
          )}
        </button>
      )}
    </>
  );
}