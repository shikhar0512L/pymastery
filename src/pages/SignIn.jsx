import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 py-16">
      <div className="text-center">
        <div className="mb-2 text-4xl">🐍</div>
        <h1 className="text-2xl font-bold text-white">
          Sign in to <span className="brand-gradient">PyMastery</span>
        </h1>
        <p className="mt-2 text-sm text-surface-600">
          Sync your progress across devices.
        </p>
      </div>

      <ClerkSignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
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