import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { merchant } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';

const HeroSection = () => {
  const [showReal, setShowReal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReal(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-[#FAF9F6] border-b border-black">
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black"></div>
      </div>

      <div className="z-10 text-center max-w-5xl px-6 w-full flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-8"
        >
          Volume I — The Illusion of Revenue
        </motion.p>

        <motion.div 
          className="relative mb-12 w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Base Revenue */}
          <motion.h1 
            className="font-editorial text-5xl sm:text-7xl md:text-9xl tracking-tighter leading-none text-black relative z-10 whitespace-nowrap"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2, delay: 3, ease: "easeInOut" }}
          >
            {formatCurrency(merchant.grossRevenue)}
          </motion.h1>

          {/* Actual Revenue Revealed */}
          <motion.h1 
            className="font-editorial text-5xl sm:text-7xl md:text-9xl tracking-tighter leading-none text-[#C45A45] absolute inset-0 z-20 flex items-center justify-center whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 4, ease: "easeOut" }}
          >
            {formatCurrency(merchant.actualKept)}
          </motion.h1>

          {/* Strikethrough line */}
          <motion.div 
            className="absolute top-1/2 left-[-10%] right-[-10%] h-[2px] bg-[#C45A45] z-30"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>

        <div className="h-24 relative w-full flex justify-center mt-4">
          <AnimatePresence mode="wait">
            {!showReal ? (
              <motion.p
                key="impeccable"
                className="absolute w-full px-6 font-classic text-xl sm:text-2xl md:text-3xl text-black/70 italic text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
              >
                Your monthly revenue looks impeccable.
              </motion.p>
            ) : (
              <motion.p
                key="actual"
                className="absolute w-full px-6 font-classic text-xl sm:text-2xl md:text-3xl text-[#C45A45] italic text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                But this is what you actually keep.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 5.5 }}
          className="mt-12 border border-black px-6 py-3 bg-[#FAF9F6]"
        >
          <span className="font-sans text-xs tracking-widest uppercase font-semibold text-black">
            Leakage Detected: <span className="text-[#C45A45]">{formatCurrency(merchant.totalLeakage)}</span>
          </span>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 flex flex-col items-center gap-4 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 6.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-black/40">Discover Where</span>
        <ArrowDown className="w-4 h-4 text-black animate-bounce" strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
