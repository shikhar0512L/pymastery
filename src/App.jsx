import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PyodideBadge from './components/PyodideBadge';
import AssistantBubble from './components/assistant/AssistantBubble';
import Home from './pages/Home';
import ModuleView from './pages/ModuleView';
import LessonView from './pages/LessonView';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import useProgressSync from './hooks/useProgressSync';
import useTrackPageView from './hooks/useTrackPageView';

export default function App() {
  useProgressSync();
  useTrackPageView();

  return (
    <div className="min-h-screen bg-surface-950">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/module/:moduleId" element={<ModuleView />} />
          <Route
            path="/module/:moduleId/lesson/:lessonId"
            element={<LessonView />}
          />
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <PyodideBadge />
      <AssistantBubble />
    </div>
  );
};