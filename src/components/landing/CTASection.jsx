import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';

const CTASection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  return (
    <section ref={ref} className="py-32 px-6 bg-surface text-white">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-8"
        >
          End of Volume
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-editorial text-4xl sm:text-5xl md:text-8xl leading-none mb-8"
        >
          Your revenue deserves a guardian.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-gray-400 text-2xl italic text-white/70 mb-16 max-w-2xl"
        >
          Stop bleeding margin to leaks you cannot see. Institute structural protection today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link to="/pricing" className="bg-background text-white border border-border px-10 py-5 font-sans text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-white transition-colors duration-300">
            Commence Protection
          </Link>
          <Link to="/dashboard" className="bg-transparent text-white border border-border px-10 py-5 font-sans text-xs tracking-widest uppercase font-bold hover:bg-background hover:text-white transition-colors duration-300">
            Examine The Ledger
          </Link>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-mono text-[10px] text-white/40 mt-16"
        >
          No credit card required. First forensic audit completes in 5 minutes.
        </motion.p>
        
      </div>
    </section>
  );
};

export default CTASection;
