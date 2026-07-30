import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [shouldReduceMotion, setShouldReduceMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = () => setShouldReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return shouldReduceMotion;
}
