import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackLessonView, trackModuleView } from '../lib/analytics';
import { getLesson } from '../data/python';
import { getModuleById } from '../data/modules';

/**
 * Automatically fires analytics events on every route change.
 * Must be used inside <BrowserRouter>.
 */
export default function useTrackPageView() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Every navigation → page_view
    trackPageView(path, document.title);

    // Route-specific events
    const moduleMatch = path.match(/^\/module\/([^/]+)$/);
    const lessonMatch = path.match(/^\/module\/([^/]+)\/lesson\/([^/]+)$/);

    if (lessonMatch) {
      const [, moduleId, lessonId] = lessonMatch;
      const lesson = getLesson(moduleId, lessonId);
      trackLessonView(moduleId, lessonId, lesson?.title);
    } else if (moduleMatch) {
      const [, moduleId] = moduleMatch;
      const mod = getModuleById(moduleId);
      trackModuleView(moduleId, mod?.title);
    }
  }, [location.pathname]);
}