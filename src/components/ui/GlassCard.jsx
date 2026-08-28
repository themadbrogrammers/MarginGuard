import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = false, 
  glow = '#00ff88', 
  onClick 
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !hover) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover ? { scale: 1.01 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
        ${onClick ? 'cursor-pointer text-left' : ''}
        ${className}
      `}
    >
      {hover && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glow}15, transparent 40%)`
          }}
        />
      )}
      
      {/* Optional border glow on hover */}
      {hover && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none p-[1px] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${glow}40, transparent 40%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
};

export default GlassCard;
