import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { rtoInvestigation } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';

const InvestigationDemo = () => {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  return (
    <section ref={ref} id="how-it-works" className="py-32 px-6 md:px-12 max-w-5xl mx-auto border-b border-black">
      <div className="flex flex-col md:flex-row gap-16">
        
        {/* Left: Context */}
        <div className="md:w-1/3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-6"
          >
            Volume IV — The Investigation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-editorial text-4xl leading-tight text-black mb-6"
          >
            A forensic deep dive into the RTO anomaly.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-classic text-xl italic text-black/70 mb-12"
          >
            While a standard dashboard merely reports an increase in Return-To-Origin rates, MarginGuard isolates the exact causal vector.
          </motion.p>
        </div>

        {/* Right: The Dossier (replaces terminal) */}
        <div className="md:w-2/3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-[#FAF9F6] border border-black p-8 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative"
          >
            {/* Dossier Header */}
            <div className="border-b border-black pb-6 mb-8 flex justify-between items-end">
              <div>
                <span className="font-sans text-[10px] tracking-widest uppercase text-black/50 block mb-2">Internal Brief</span>
                <h3 className="font-editorial text-2xl">Investigation #482</h3>
              </div>
              <div className="text-right">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#C45A45] font-bold">Priority: High</span>
              </div>
            </div>

            {/* Dossier Content - Typed slowly */}
            <div className="font-mono text-sm leading-loose text-black space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <span className="opacity-50">01 //</span> Scanning {rtoInvestigation.ordersAnalyzed.toLocaleString()} recent orders...
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <span className="opacity-50">02 //</span> Anomaly isolated: <span className="font-bold">{rtoInvestigation.product}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 2.6 }}
                className="pl-8 border-l border-black/20"
              >
                Payment Vector: {rtoInvestigation.paymentMethod}<br/>
                Baseline RTO: {rtoInvestigation.normalRTO}%<br/>
                Current RTO: <span className="text-[#C45A45] font-bold">{rtoInvestigation.currentRTO}%</span> (Deviation critical)
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 3.6 }}
              >
                <span className="opacity-50">03 //</span> Geographic concentration identified:
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 4.4 }}
                className="pl-8 border-l border-black/20"
              >
                Pincode 302017 &rarr; 29% RTO<br/>
                Pincode 302018 &rarr; 27% RTO<br/>
                Pincode 302019 &rarr; 31% RTO
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 5.6 }}
                className="bg-black text-[#FAF9F6] p-4 mt-8"
              >
                <div className="font-sans text-[10px] tracking-widest uppercase opacity-70 mb-2">Conclusion & Impact</div>
                <div className="font-editorial text-2xl">
                  Avoidable Loss: <span className="text-[#C45A45]">{formatCurrency(rtoInvestigation.monthlyLoss)}/mo</span>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default InvestigationDemo;
