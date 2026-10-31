import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PyodideBadge from './components/PyodideBadge';
import AssistantBubble from './components/assistant/AssistantBubble';
import AchievementToast from './components/AchievementToast';
import WelcomeBackModal from './components/WelcomeBackModal';
import ShortcutsModal from './components/ShortcutsModal'; // 🆕
import Home from './pages/Home';
import ModuleView from './pages/ModuleView';
import LessonView from './pages/LessonView';
import Practice from './pages/Practice';
import Achievements from './pages/Achievements';
import Bookmarks from './pages/Bookmarks';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import useProgressSync from './hooks/useProgressSync';
import useTrackPageView from './hooks/useTrackPageView';
import useStreak from './hooks/useStreak';
import useAchievements from './hooks/useAchievements';
import useWelcomeBack from './hooks/useWelcomeBack';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'; // 🆕

export default function App() {
  // 🆕 Global UI state for shortcuts
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useProgressSync();
  useTrackPageView();
  useStreak();
  useAchievements();
  useWelcomeBack();
  
  // 🆕 Activate shortcuts
  useKeyboardShortcuts({
    onOpenShortcuts: () => setShowShortcuts(true),
    onOpenSearch: () => {
      // We dispatch a custom event that Navbar listens to, or just toggle a state.
      // For simplicity, we can trigger a click on the search button, or pass state down.
      // Given our current architecture, Search is in Navbar. Let's just open it via event.
      document.dispatchEvent(new CustomEvent('open-search'));
    }
  });

  return (
    <div className="min-h-screen bg-surface-950">
      <ScrollToTop />
      <Navbar onOpenShortcuts={() => setShowShortcuts(true)} /> {/* 🆕 Pass prop */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
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
      <AchievementToast />
      <WelcomeBackModal />
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} /> {/* 🆕 */}
    </div>
  );
}