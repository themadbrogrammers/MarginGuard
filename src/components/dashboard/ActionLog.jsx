import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck } from 'lucide-react';

const actions = [
  { time: '10:42 AM', title: 'RTO Filter applied', desc: 'Blocked 12 high-risk COD orders.', amount: '+₹14,500' },
  { time: '09:15 AM', title: 'Coupon loop closed', desc: 'Deactivated leaked promo code.', amount: '+₹5,200' },
  { time: 'Yesterday', title: 'Payment gateway reroute', desc: 'Shifted traffic from failing node.', amount: '+₹8,900' },
];

const ActionLog = () => {
  const saved = localStorage.getItem('marguard_parsed_data');
  const parsed = saved ? JSON.parse(saved) : null;
  const scale = parsed ? Math.max(0.1, parsed.totalLeakage / 300000) : 1;

  const currentActions = actions.map(a => {
    const rawVal = parseInt(a.amount.replace(/[^0-9]/g, ''));
    const scaledVal = Math.round(rawVal * scale);
    return {
      ...a,
      amount: `+₹${scaledVal.toLocaleString()}`
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="border border-black bg-[#FAF9F6] p-6 h-full text-black flex flex-col"
    >
      <div className="flex items-center gap-2 mb-6 border-b border-black pb-4">
        <Clock className="w-4 h-4" strokeWidth={1.5} />
        <h3 className="font-sans text-xs uppercase tracking-widest font-bold">Intervention Log</h3>
      </div>

      <div className="space-y-0 flex-grow relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/10"></div>
        {currentActions.map((action, index) => (
          <div key={index} className="relative pl-6 pb-6 last:pb-0">
            <div className="absolute left-0 top-1 w-4 h-4 bg-[#FAF9F6] border border-black flex items-center justify-center z-10">
              <ShieldCheck className="w-2.5 h-2.5 text-black" />
            </div>
            
            <div className="font-mono text-[9px] text-black/40 mb-1">{action.time}</div>
            <div className="font-sans font-bold text-sm mb-1">{action.title}</div>
            <div className="font-sans text-xs text-black/70 mb-2">{action.desc}</div>
            <div className="font-mono text-xs text-[#C45A45]">{action.amount} protected</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActionLog;
