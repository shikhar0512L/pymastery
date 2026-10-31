import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getModuleById } from '../data/modules';

export default function useKeyboardShortcuts({ onOpenShortcuts, onOpenSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { moduleId, lessonId } = useParams();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 🚨 CRITICAL: Ignore shortcuts if user is typing in an input, textarea, or select
      const target = e.target;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      if (isTyping) return;

      // 1. Shortcuts Help Modal ('?')
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        onOpenShortcuts?.();
        return;
      }

      // 2. Search (Ctrl+K or Cmd+K)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch?.();
        return;
      }

      // 3. Navigation Shortcuts (Only inside lessons)
      const isLessonPage = location.pathname.includes('/lesson/');
      if (isLessonPage && moduleId && lessonId) {
        const mod = getModuleById(moduleId);
        if (!mod || !mod.lessons) return;

        const currentIdx = mod.lessons.findIndex((l) => l.id === lessonId);
        if (currentIdx === -1) return;

        if (e.key === 'ArrowRight' && !e.metaKey && !e.ctrlKey) {
          // Next Lesson
          if (currentIdx < mod.lessons.length - 1) {
            navigate(`/module/${moduleId}/lesson/${mod.lessons[currentIdx + 1].id}`);
          }
        } else if (e.key === 'ArrowLeft' && !e.metaKey && !e.ctrlKey) {
          // Previous Lesson
          if (currentIdx > 0) {
            navigate(`/module/${moduleId}/lesson/${mod.lessons[currentIdx - 1].id}`);
          }
        }
      }

      // 4. Quick Navigate ('p' for practice, 'a' for achievements, 'b' for bookmarks)
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === 'p') {
          navigate('/practice');
        } else if (e.key.toLowerCase() === 'a') {
          navigate('/achievements');
        } else if (e.key.toLowerCase() === 'b') {
          navigate('/bookmarks');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname, moduleId, lessonId, onOpenShortcuts, onOpenSearch]);
}