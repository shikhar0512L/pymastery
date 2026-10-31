import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import useProgress from '../store/useProgress';
import SearchModal from './SearchModal';

export default function Navbar({ onOpenShortcuts }) {
  const { xp, completedLessons, currentStreak, streakFreezes, unlockedAchievements, bookmarks } = useProgress();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const doneCount = Object.keys(completedLessons).length;
  const achievementCount = Object.keys(unlockedAchievements || {}).length;
  const bookmarkCount = Object.keys(bookmarks || {}).length;
  const isHome = location.pathname === '/';
  const isPractice = location.pathname === '/practice';
  const isAchievements = location.pathname === '/achievements';
  const isBookmarks = location.pathname === '/bookmarks';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    const handleOpenSearchEvent = () => setIsSearchOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('open-search', handleOpenSearchEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('open-search', handleOpenSearchEvent);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-surface-800 bg-surface-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6">
          {/* Logo */}
          <Link to="/" className="group flex shrink-0 items-center gap-2">
            <span className="text-xl transition-transform group-hover:scale-110 sm:text-2xl">
              🐍
            </span>
            <span className="text-base font-bold tracking-tight sm:text-lg">
              Py<span className="brand-gradient">Mastery</span>
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            {!isHome && (
              <Link
                to="/"
                className="hidden text-sm text-surface-600 transition-colors hover:text-white lg:block"
              >
                ← All modules
              </Link>
            )}

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-surface-700 bg-surface-900 px-2 py-1.5 text-xs font-medium text-surface-400 transition-colors hover:border-surface-500 hover:text-white sm:px-2.5"
            >
              <span>🔍</span>
              <span className="hidden rounded bg-surface-800 px-1 py-0.5 text-[9px] text-surface-500 md:inline">
                ⌘K
              </span>
            </button>

            {/* Shortcuts */}
            <button
              onClick={onOpenShortcuts}
              title="Keyboard Shortcuts"
              className="hidden sm:flex items-center justify-center h-7 w-7 rounded-full border border-surface-700 bg-surface-900 text-xs font-medium text-surface-400 transition-colors hover:border-surface-500 hover:text-white"
            >
              ?
            </button>

            {/* Practice */}
            <Link
              to="/practice"
              title="Practice mode"
              className={`flex items-center gap-1 rounded-full border px-2 py-1.5 text-xs font-medium transition-colors sm:px-2.5 ${
                isPractice
                  ? 'border-brand-500/60 bg-brand-500/15 text-brand-300'
                  : 'border-surface-700 bg-surface-900 text-surface-300 hover:border-brand-500/40 hover:text-white'
              }`}
            >
              <span>🎯</span>
            </Link>

            {/* Achievements */}
            <Link
              to="/achievements"
              title="Achievements"
              className={`flex items-center gap-1 rounded-full border px-2 py-1.5 text-xs font-medium transition-colors sm:px-2.5 ${
                isAchievements
                  ? 'border-amber-500/60 bg-amber-500/15 text-amber-300'
                  : 'border-surface-700 bg-surface-900 text-surface-300 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              <span>🏆</span>
              {achievementCount > 0 && (
                <span className="hidden text-[10px] md:inline">{achievementCount}</span>
              )}
            </Link>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              title="Bookmarks"
              className={`flex items-center gap-1 rounded-full border px-2 py-1.5 text-xs font-medium transition-colors sm:px-2.5 ${
                isBookmarks
                  ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-300'
                  : 'border-surface-700 bg-surface-900 text-surface-300 hover:border-cyan-500/40 hover:text-white'
              }`}
            >
              <span>🔖</span>
              {bookmarkCount > 0 && (
                <span className="hidden text-[10px] md:inline">{bookmarkCount}</span>
              )}
            </Link>

            {/* Streak & Freeze */}
            {currentStreak > 0 && (
              <span
                title={`${currentStreak}-day streak. ${streakFreezes} freeze(s) available.`}
                className="hidden items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1.5 text-xs font-semibold text-orange-400 lg:flex"
              >
                <span>🔥 {currentStreak}</span>
                <span className="h-3 w-px bg-orange-500/30" />
                <span className={streakFreezes > 0 ? 'text-cyan-400' : 'text-surface-600'}>
                  🧊 {streakFreezes}
                </span>
              </span>
            )}

            {/* Stats pill */}
            <div className="hidden items-center gap-1.5 rounded-full border border-surface-700 bg-surface-900 px-2 py-1.5 md:flex md:gap-2 md:px-3">
              <span className="text-[11px] font-medium text-amber-400 md:text-xs">
                ⚡ {xp}
              </span>
              <span className="h-3 w-px bg-surface-700 md:h-4" />
              <span className="text-[11px] font-medium text-emerald-400 md:text-xs">
                ✓ {doneCount}
              </span>
            </div>

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/">
                <button className="hidden rounded-full border border-brand-500/40 bg-brand-500/10 px-2.5 py-1.5 text-xs font-medium text-brand-400 transition-colors hover:bg-brand-500/20 md:block">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: 'h-7 w-7 sm:h-8 sm:w-8' } }}
              />
            </SignedIn>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}