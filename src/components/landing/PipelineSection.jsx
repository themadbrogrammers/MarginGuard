import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';

const steps = [
  { num: 'I', title: 'Detect', desc: 'Continuous surveillance of transaction metadata.' },
  { num: 'II', title: 'Investigate', desc: 'Root cause isolation across 50+ data dimensions.' },
  { num: 'III', title: 'Calculate', desc: 'Forensic quantification of exact margin impact.' },
  { num: 'IV', title: 'Recommend', desc: 'Strategic interventions presented for review.' },
  { num: 'V', title: 'Simulate', desc: 'Predictive modeling of intervention outcomes.' },
  { num: 'VI', title: 'Approve', desc: 'Merchant authorises the protective policy.' },
  { num: 'VII', title: 'Execute', desc: 'Immediate deployment of the structural fix.' },
  { num: 'VIII', title: 'Verify', desc: 'Post-intervention margin recovery audit.' },
];

const PipelineSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-black">
      <div className="text-center mb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-6"
        >
          Volume III — The Methodology
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-4xl sm:text-5xl md:text-6xl text-black"
        >
          Not a dashboard. An active guardian.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative">
        {/* Horizontal connective line for desktop */}
        <div className="hidden lg:block absolute top-[28px] left-8 right-8 h-px bg-black opacity-20"></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className="relative"
          >
            {/* The Node */}
            <div className="w-14 h-14 border border-black bg-[#FAF9F6] flex items-center justify-center rounded-none mb-6 relative z-10 hover:bg-black hover:text-[#FAF9F6] transition-colors duration-300">
              <span className="font-editorial text-xl italic">{step.num}</span>
            </div>
            
            <h3 className="font-sans text-sm tracking-widest uppercase font-semibold text-black mb-3">
              {step.title}
            </h3>
            <p className="font-classic text-lg text-black/70 italic pr-4">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PipelineSection;
