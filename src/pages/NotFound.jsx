import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="text-6xl font-black brand-gradient">404</div>
      <p className="mt-4 text-surface-600">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-brand-500 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}