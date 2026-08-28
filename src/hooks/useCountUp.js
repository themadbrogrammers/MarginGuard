import { useState, useEffect, useRef, useCallback } from 'react';

export function useCountUp(end, duration = 2, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(startOnMount);
  const rafRef = useRef(null);

  const start = useCallback(() => setIsStarted(true), []);

  useEffect(() => {
    if (!isStarted) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, isStarted]);

  return { count, start };
}
