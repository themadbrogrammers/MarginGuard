import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { useInView } from '../../hooks/useInView';

const AnimatedCounter = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });
  
  // Custom hook usage
  const { count, start } = useCountUp(end, duration, false);
  
  // Start counting when in view
  React.useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  const formattedValue = count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span 
      ref={ref} 
      className={`font-mono font-bold tabular-nums ${className}`}
    >
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
