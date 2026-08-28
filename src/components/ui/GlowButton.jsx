import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GlowButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = ''
}) => {
  const baseClasses = "relative inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none";
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variants = {
    primary: "bg-gradient-to-r from-[#00ff88] to-[#00e5ff] text-white shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] border-transparent",
    secondary: "bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] text-white hover:bg-white/[0.08] hover:border-white/[0.2]",
    danger: "bg-[#ff3366] text-white shadow-[0_0_20px_rgba(255,51,102,0.3)] hover:shadow-[0_0_30px_rgba(255,51,102,0.5)] border-transparent"
  };

  const classes = `${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`;
  
  const Component = href ? (href.startsWith('http') ? motion.a : motion(Link)) : motion.button;
  const props = href ? (href.startsWith('http') ? { href, target: "_blank", rel: "noopener noreferrer" } : { to: href }) : { onClick };

  return (
    <Component
      {...props}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
    >
      {/* Additional glow element for primary/danger variants */}
      {(variant === 'primary' || variant === 'danger') && (
        <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white/20 blur-md pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};

export default GlowButton;
