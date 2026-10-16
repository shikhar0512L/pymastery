import { Link, useLocation } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import useProgress from '../store/useProgress';

export default function Navbar() {
  const { xp, completedLessons } = useProgress();
  const location = useLocation();
  const doneCount = Object.keys(completedLessons).length;
  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 border-b border-surface-800 bg-surface-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="text-2xl transition-transform group-hover:scale-110">🐍</span>
          <span className="text-lg font-bold tracking-tight">
            Py<span className="brand-gradient">Mastery</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              to="/"
              className="hidden text-sm text-surface-600 transition-colors hover:text-white sm:block"
            >
              ← All modules
            </Link>
          )}

          <div className="flex items-center gap-2 rounded-full border border-surface-700 bg-surface-900 px-3 py-1.5">
            <span className="text-xs font-medium text-amber-400">⚡ {xp} XP</span>
            <span className="h-4 w-px bg-surface-700" />
            <span className="text-xs font-medium text-emerald-400">✓ {doneCount}</span>
          </div>

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button className="rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-400 transition-colors hover:bg-brand-500/20">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'h-8 w-8',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}