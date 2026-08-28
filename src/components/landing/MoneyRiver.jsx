import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { leakageBreakdown, merchant } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';
import { PackageX, BadgePercent, RotateCcw, CreditCard, Ticket } from 'lucide-react';

const iconMap = {
  PackageX: PackageX,
  BadgePercent: BadgePercent,
  RotateCcw: RotateCcw,
  CreditCard: CreditCard,
  Ticket: Ticket,
};

const MoneyRiver = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, once: true });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-black">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Context */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-6"
          >
            Volume II — The Anatomy of Loss
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl leading-tight mb-8"
          >
            Where exactly did your margins bleed out?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-classic text-2xl text-black/70 italic"
          >
            We dissected 10,000 orders. Here is the forensic breakdown of {formatCurrency(merchant.totalLeakage)} in avoidable profit loss.
          </motion.p>
        </div>

        {/* Right Column: Structural Breakdown */}
        <div className="lg:col-span-8 relative">
          <div className="absolute left-[24px] md:left-[28px] top-0 bottom-0 w-px bg-black opacity-20"></div>
          
          <div className="flex flex-col gap-12">
            {leakageBreakdown.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                  className="relative pl-16 md:pl-24"
                >
                  {/* Connector Node */}
                  <div className="absolute left-[20px] md:left-[24px] top-[14px] w-2 h-2 rounded-full bg-black"></div>
                  <div className="absolute left-[28px] md:left-[32px] top-[17px] w-12 md:w-16 h-px bg-black opacity-20"></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-baseline">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-2">
                        {Icon && <Icon className="w-5 h-5 text-black/60" strokeWidth={1} />}
                        <h3 className="font-sans text-sm tracking-widest uppercase font-semibold text-black">
                          {item.label}
                        </h3>
                      </div>
                      <p className="font-classic text-xl text-black/80 italic">{item.description}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="font-editorial text-4xl text-[#C45A45]">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Summary Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 pl-16 md:pl-24 pt-8 border-t border-black relative"
          >
             <div className="absolute left-[24px] md:left-[28px] top-0 w-px h-full bg-black opacity-20"></div>
             <div className="flex justify-between items-baseline">
                <span className="font-sans text-xs tracking-widest uppercase text-black/60">Total Unnecessary Loss</span>
                <span className="font-editorial text-5xl text-black">{formatCurrency(merchant.totalLeakage)}</span>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MoneyRiver;
