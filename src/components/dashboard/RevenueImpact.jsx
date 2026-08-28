import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { merchant } from '../../data/demoData';

const data = [
  { name: 'Week 1', actual: 400000, projected: 400000 },
  { name: 'Week 2', actual: 420000, projected: 450000 },
  { name: 'Week 3', actual: 410000, projected: 480000 },
  { name: 'Week 4', actual: 470000, projected: 550000 },
];

const RevenueImpact = () => {
  const saved = localStorage.getItem('marguard_parsed_data');
  const parsed = saved ? JSON.parse(saved) : null;
  const scale = parsed ? Math.max(0.1, parsed.grossRevenue / 2000000) : 1;
  const leakageScale = parsed ? Math.max(0.1, parsed.totalLeakage / 300000) : 1;

  const currentData = data.map(d => ({
    name: d.name,
    actual: Math.round(d.actual * scale),
    projected: Math.round(d.actual * scale + (d.projected - d.actual) * leakageScale)
  }));

  const formatLakhs = (val) => `₹${(val / 100000).toFixed(1)}L`;
  const currentTrajectory = parsed ? parsed.actualKept : 1700000;
  const protectedTrajectory = currentTrajectory + (parsed ? parsed.totalLeakage * 0.8 : 220000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="border border-black bg-[#FAF9F6] p-8 h-full text-black"
    >
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black">
        <BarChart2 className="w-5 h-5" />
        <h3 className="font-editorial text-2xl">Trajectory Analysis</h3>
      </div>

      <div className="flex gap-8 mb-8">
        <div>
          <div className="font-sans text-[10px] uppercase tracking-widest text-black/50 mb-1">Current Trajectory</div>
          <div className="font-sans font-bold text-2xl">{formatLakhs(currentTrajectory)}</div>
        </div>
        <div className="border-l border-black/20 pl-8">
          <div className="font-sans text-[10px] uppercase tracking-widest text-black/50 mb-1">Protected Trajectory</div>
          <div className="font-sans font-bold text-2xl text-[#C45A45]">{formatLakhs(protectedTrajectory)}</div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" opacity={0.1} vertical={false} />
            <XAxis dataKey="name" stroke="#000000" opacity={0.5} tick={{ fontSize: 10, fill: '#000000' }} tickLine={false} axisLine={false} />
            <YAxis stroke="#000000" opacity={0.5} tick={{ fontSize: 10, fill: '#000000' }} tickFormatter={(val) => `₹${val/1000}k`} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '0', color: '#FAF9F6' }}
              itemStyle={{ color: '#FAF9F6' }}
            />
            <Line type="monotone" dataKey="actual" stroke="#000000" strokeWidth={2} dot={{ r: 4, fill: '#FAF9F6', stroke: '#000000', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="projected" stroke="#C45A45" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RevenueImpact;
