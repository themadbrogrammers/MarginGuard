import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { leakageBreakdown } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';

const ThreatBreakdown = () => {
  const saved = localStorage.getItem('marguard_parsed_data');
  const parsed = saved ? JSON.parse(saved) : null;
  const currentBreakdown = parsed ? parsed.breakdown : leakageBreakdown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border border-black bg-[#FAF9F6] p-6 h-full text-black flex flex-col"
    >
      <div className="flex items-center gap-2 mb-8 border-b border-black pb-4">
        <AlertTriangle className="w-4 h-4 text-black" strokeWidth={1.5} />
        <h3 className="font-sans text-xs uppercase tracking-widest font-bold">Threat Hierarchy</h3>
      </div>

      <div className="space-y-6 flex-grow">
        {currentBreakdown.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="font-sans text-xs font-bold uppercase tracking-widest">{item.label}</div>
                <div className="font-sans text-[10px] text-black/50 uppercase tracking-widest mt-1">Severity: {item.severity}</div>
              </div>
              <div className="text-right">
                <div className="font-editorial text-xl">{formatCurrency(item.amount)}</div>
                <div className="font-mono text-[9px] text-[#C45A45] flex items-center justify-end gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" strokeWidth={1} /> {item.percentage}%
                </div>
              </div>
            </div>
            {/* Status Bar */}
            <div className="h-1 w-full bg-black/10 overflow-hidden">
              <motion.div 
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t border-black border-dashed flex justify-between items-center text-[9px] font-mono text-black/50">
        <span>LAST SCANNED: TODAY</span>
        <span>STATUS: VULNERABLE</span>
      </div>
    </motion.div>
  );
};

export default ThreatBreakdown;
