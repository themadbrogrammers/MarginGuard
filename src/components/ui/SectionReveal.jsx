import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const SectionReveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { x: 50, y: 0 };
      case 'right': return { x: -50, y: 0 };
      default: return { y: 50, x: 0 };
    }
  };

  const initial = { opacity: 0, ...getInitialOffset() };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] // Custom easeOut function for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
