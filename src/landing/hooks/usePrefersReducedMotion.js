import { useEffect, useState } from 'react';

// Reads matchMedia synchronously on mount (lazy initializer) instead of
// defaulting to false-then-updating — the delayed flip was letting
// Framer Motion elements start an entrance animation and then freeze
// mid-transition when `reduced` flipped true right after mount.
function getInitial() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getInitial);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}
