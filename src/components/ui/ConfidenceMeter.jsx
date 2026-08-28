import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const ConfidenceMeter = ({ value = 0, size = 120, label = "Confidence" }) => {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      // simple animation loop for the number
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setAnimatedValue(easeOut * value);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Arc represents roughly 75% of a circle
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * (value / 100));

  let color = '#ff3366'; // Danger
  if (value >= 50) color = '#ffaa00'; // Warning
  if (value >= 75) color = '#00ff88'; // Primary

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-2" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-[135deg]"
        >
          {/* Background Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Foreground Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: arcLength }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: arcLength }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        
        {/* Value Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center transform -translate-y-2">
          <span className="text-3xl font-bold font-mono text-white tracking-tighter" style={{ color }}>
            {Math.round(animatedValue)}<span className="text-lg opacity-70">%</span>
          </span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};

export default ConfidenceMeter;
