import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-16">
      <div className="text-center">
        <div className="mb-2 text-4xl">🐍</div>
        <h1 className="text-2xl font-bold text-white">
          Join <span className="brand-gradient">PyMastery</span>
        </h1>
        <p className="mt-2 text-sm text-surface-600">
          Free forever. Sync your progress across devices.
        </p>
      </div>

      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/"
        appearance={{
          variables: {
            colorPrimary: '#f97316',
            colorBackground: '#12121a',
            colorText: '#ffffff',
            colorTextSecondary: '#9198a6',
            colorInputBackground: '#1a1a24',
            colorInputText: '#ffffff',
          },
        }}
      />

      <Link
        to="/"
        className="text-xs text-surface-600 transition-colors hover:text-white"
      >
        ← Back to lessons
      </Link>
    </div>
  );
}