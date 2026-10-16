// 🔥 Firebase init — singleton pattern (App + Firestore + Analytics)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: 'G-KN6Y1JHVLH',
};

// Avoid re-initializing on HMR
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Analytics — async because it needs to check if the browser supports it
export let analytics = null;

export async function initAnalytics() {
  if (analytics) return analytics;
  try {
    const supported = await isSupported();
    if (supported && import.meta.env.PROD) {
      analytics = getAnalytics(app);
    }
  } catch (e) {
    console.warn('[analytics] init failed:', e);
  }
  return analytics;
}

export default app;