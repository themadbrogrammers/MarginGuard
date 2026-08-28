import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Zap } from 'lucide-react';
import { terminalLines } from '../../data/demoData';

const InvestigationFeed = () => {
  const saved = localStorage.getItem('marguard_parsed_data');
  const parsed = saved ? JSON.parse(saved) : null;
  const records = parsed ? parsed.recordCount : '12,430';
  
  const currentLines = [...terminalLines];
  if (parsed) {
    currentLines[0] = { type: 'command', text: `Scanning ${records} orders...` };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="border border-black bg-[#FAF9F6] text-black p-6 h-full flex flex-col font-mono relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6 border-b border-black/20 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="w-4 h-4 text-black" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full animate-ping"></div>
          </div>
          <h3 className="font-sans text-xs uppercase tracking-widest font-bold">Live Intercepts</h3>
        </div>
        <span className="text-[10px] text-black/50 border border-black/20 px-2 py-0.5 rounded-full">Active</span>
      </div>

      <div className="flex-grow overflow-hidden relative z-10">
        <div className="absolute top-0 left-0 w-px h-full bg-black/10 ml-2"></div>
        <div className="space-y-4">
          {currentLines.filter(l => l.type === 'data' || l.type === 'danger' || l.type === 'alert').map((line, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-8"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[3px] top-1.5 w-1.5 h-1.5 bg-black/50 rounded-full border border-[#FAF9F6] z-10"></div>
              
              <div className="flex items-start gap-3">
                {line.type === 'danger' ? (
                  <ShieldAlert className="w-4 h-4 text-[#C45A45] mt-0.5 flex-shrink-0" />
                ) : line.type === 'alert' ? (
                  <Zap className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                ) : null}
                <div>
                  <div className={`text-xs ${line.type === 'danger' ? 'text-[#C45A45]' : 'text-black/80'}`}>
                    {line.text}
                  </div>
                  <div className="text-[9px] text-black/40 mt-1 uppercase">T-{index * 12} SECONDS</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Fading overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#FAF9F6] to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default InvestigationFeed;
