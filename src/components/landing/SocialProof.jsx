import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { socialProofStats, testimonials } from '../../data/demoData';

const SocialProof = () => {
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
          Volume VII — The Evidence
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-4xl sm:text-5xl md:text-6xl text-black"
        >
          Trust in the absolute.
        </motion.h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-black mb-24">
        {socialProofStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            className="border-r border-b border-black p-8 flex flex-col justify-center items-center text-center bg-[#FAF9F6] hover:bg-black hover:text-[#FAF9F6] transition-colors duration-500"
          >
            <div className="font-editorial text-4xl md:text-5xl mb-2">
              {stat.prefix}
              {stat.value >= 1000000000 ? (stat.value / 10000000).toFixed(0) + 'Cr' : stat.value >= 1000 ? (stat.value / 1000) + 'K' : stat.value}
              {stat.suffix}
            </div>
            <div className="font-sans text-[10px] uppercase tracking-widest opacity-60">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
            className="border border-black p-8 bg-[#FAF9F6] relative"
          >
            <div className="absolute top-0 right-0 bg-black text-[#FAF9F6] font-mono text-[10px] py-1 px-3">
              Saved: {testimonial.saved}
            </div>
            <div className="mb-8 font-editorial text-5xl opacity-20">"</div>
            <p className="font-classic text-xl italic leading-relaxed mb-8">
              {testimonial.quote}
            </p>
            <div className="flex items-center gap-4 border-t border-black/10 pt-6">
              <div className="w-10 h-10 border border-black flex items-center justify-center font-editorial">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-sans text-xs uppercase tracking-widest font-bold">{testimonial.name}</div>
                <div className="font-sans text-[10px] uppercase tracking-widest opacity-50">{testimonial.role}, {testimonial.company}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default SocialProof;
