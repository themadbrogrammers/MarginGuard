import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';
import { strategies } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';

const StrategyComparison = () => {
  const saved = localStorage.getItem('marguard_parsed_data');
  const parsed = saved ? JSON.parse(saved) : null;
  const scale = parsed ? Math.max(0.1, parsed.totalLeakage / 300000) : 1;

  const currentStrategies = strategies.map(s => ({
    ...s,
    protectedMargin: Math.round(s.protectedMargin * scale)
  }));

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-5 h-5 text-black" />
        <h2 className="font-editorial text-3xl">Protective Strategies</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentStrategies.map((strategy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
            className={`border p-6 flex flex-col ${
              strategy.recommended 
                ? 'border-black bg-black text-[#FAF9F6] shadow-[8px_8px_0_0_#C45A45]' 
                : 'border-black bg-[#FAF9F6] text-black'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="font-sans text-[10px] uppercase tracking-widest opacity-60 mb-1">Model Output</div>
                <h3 className="font-sans font-bold text-lg leading-tight">{strategy.name}</h3>
              </div>
              {strategy.recommended && (
                <span className="bg-[#FAF9F6] text-black text-[9px] uppercase tracking-widest font-bold px-2 py-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Optimal
                </span>
              )}
            </div>

            <div className="mb-6">
              <div className={`font-mono text-xs opacity-60 mb-2`}>Predicted Recovery</div>
              <div className="font-editorial text-4xl">{formatCurrency(strategy.protectedMargin)}</div>
            </div>

            <div className="space-y-3 flex-grow mb-8 border-t border-current/20 pt-4">
              <div className="font-sans text-[10px] uppercase tracking-widest opacity-60">Actions</div>
              {(strategy.actions || [strategy.description]).map((action, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${strategy.recommended ? 'bg-[#FAF9F6]' : 'bg-black'}`} />
                  <span className="font-sans text-xs leading-relaxed opacity-80">{action}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-3 font-sans text-xs uppercase tracking-widest font-bold border transition-colors ${
              strategy.recommended 
                ? 'bg-[#FAF9F6] text-black border-[#FAF9F6] hover:bg-transparent hover:text-[#FAF9F6]' 
                : 'bg-black text-[#FAF9F6] border-black hover:bg-transparent hover:text-black'
            }`}>
              {strategy.recommended ? 'Execute Protocol' : 'Simulate'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StrategyComparison;
