// Registers the Pyodide caching service worker.
// Skipped in dev (Vite HMR + SW = caching headaches).

export function registerPyodideServiceWorker() {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;
  if (import.meta.env.DEV) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/pyodide-sw.js')
      .catch((err) => console.warn('[SW] registration failed:', err));
  });
}