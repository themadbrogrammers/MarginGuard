import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { leakageBreakdown, merchant } from '../../data/demoData';
import { formatCurrency } from '../../utils/formatters';

const ProfitAtRisk = () => {
  const COLORS = ['#0A0A0A', '#C45A45', '#555555', '#888888', '#BBBBBB'];

  const saved = localStorage.getItem('marguard_parsed_data');
  const parsed = saved ? JSON.parse(saved) : null;
  const currentMerchant = parsed ? { ...merchant, ...parsed } : merchant;
  const currentBreakdown = parsed ? parsed.breakdown : leakageBreakdown;
  const retainedPercent = ((currentMerchant.actualKept / currentMerchant.grossRevenue) * 100).toFixed(0);
  const leakedPercent = (100 - retainedPercent).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border border-black bg-[#FAF9F6] p-8 md:p-12 mb-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-black"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-black/50 mb-4">Profit At Risk</h2>
          <div className="font-editorial text-5xl sm:text-6xl md:text-9xl text-[#C45A45] tracking-tighter leading-none mb-6">
            {formatCurrency(currentMerchant.totalLeakage)}
          </div>
          <p className="font-classic text-xl italic text-black/70">
            Out of {formatCurrency(currentMerchant.grossRevenue)} gross revenue.
          </p>
        </div>

        <div className="h-64 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentBreakdown}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
                stroke="none"
              >
                {currentBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-editorial text-3xl">{leakedPercent}%</span>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-8 border-t border-black">
        <div className="flex justify-between font-sans text-[10px] uppercase tracking-widest mb-3">
          <span>{retainedPercent}% Retained</span>
          <span className="text-[#C45A45]">{leakedPercent}% Leaked</span>
        </div>
        <div className="h-2 w-full flex border border-black">
          <div className="bg-black" style={{ width: `${retainedPercent}%` }}></div>
          <div className="bg-[#C45A45]" style={{ width: `${leakedPercent}%` }}></div>
        </div>
      </div>

    </motion.div>
  );
};

export default ProfitAtRisk;
