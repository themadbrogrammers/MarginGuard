import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { strategies, currentMetrics } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';
import { Check } from 'lucide-react';

const StrategySimulation = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });
  const [approved, setApproved] = useState(false);

  const recommended = strategies.find(s => s.recommended);

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-black">
      
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-6"
        >
          Volume V — The Intervention
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-4xl sm:text-5xl md:text-6xl text-black mb-6"
        >
          Three paths forward. One optimal choice.
        </motion.h2>
      </div>

      {/* Baseline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12 border-b border-black pb-4 flex flex-col md:flex-row justify-between items-baseline"
      >
        <span className="font-editorial text-2xl italic text-black/50">Current Baseline</span>
        <div className="flex gap-12 font-mono text-sm mt-4 md:mt-0">
          <span>Conversion: {currentMetrics.conversion}%</span>
          <span>RTO: <span className="text-[#C45A45]">{currentMetrics.rto}%</span></span>
        </div>
      </motion.div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            className={`border border-black p-8 relative transition-colors duration-500 ${strategy.recommended && !approved ? 'bg-black text-[#FAF9F6]' : 'bg-[#FAF9F6] text-black'}`}
          >
            {strategy.recommended && (
              <div className="absolute top-0 right-0 bg-[#FAF9F6] text-black border-l border-b border-black px-3 py-1 font-sans text-[9px] uppercase tracking-widest font-bold">
                Recommended
              </div>
            )}
            
            <h3 className="font-editorial text-2xl mb-2">Strategy {strategy.id}</h3>
            <p className={`font-classic italic mb-8 ${strategy.recommended && !approved ? 'text-[#FAF9F6]/70' : 'text-black/70'}`}>
              {strategy.name}
            </p>

            <div className="space-y-4 font-mono text-xs border-t border-current pt-6">
              <div className="flex justify-between">
                <span className="opacity-60">Conversion</span>
                <span>{strategy.conversion}%</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">RTO Rate</span>
                <span>{strategy.rto}%</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-current/20">
                <span className="opacity-60 font-sans tracking-widest uppercase">Margin Protected</span>
                <span className={`font-bold ${strategy.recommended && !approved ? 'text-[#C45A45] mix-blend-screen' : 'text-[#C45A45]'}`}>
                  +{formatCurrency(strategy.protectedMargin)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Area */}
      <div className="flex justify-center h-24 items-center">
        <AnimatePresence mode="wait">
          {!approved ? (
            <motion.button
              key="approve"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setApproved(true)}
              className="editorial-btn-primary flex items-center gap-4"
            >
              Approve Strategy A
              <span className="opacity-50 text-[10px] normal-case">(89% Confidence)</span>
            </motion.button>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-black border border-black px-8 py-4 bg-[#FAF9F6]"
            >
              <div className="w-6 h-6 rounded-full bg-black text-[#FAF9F6] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span className="font-editorial text-xl italic">Policy Applied. Margin Protected.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default StrategySimulation;
