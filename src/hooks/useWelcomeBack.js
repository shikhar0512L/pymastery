import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import useProgress from '../store/useProgress';

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

export default function useWelcomeBack() {
  const { isLoaded } = useUser();
  const lastVisit = useProgress((s) => s.lastVisit);
  const triggerWelcomeBack = useProgress((s) => s.triggerWelcomeBack);

  useEffect(() => {
    if (!isLoaded) return;
    if (!lastVisit) return; // Brand new user? No gift.

    const gap = Date.now() - new Date(lastVisit).getTime();
    
    if (gap > THREE_DAYS) {
      triggerWelcomeBack();
    }
  }, [isLoaded, lastVisit, triggerWelcomeBack]); // 👈 Fixed dependency array
}