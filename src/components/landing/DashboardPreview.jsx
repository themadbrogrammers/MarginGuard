import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useInView';

const DashboardPreview = () => {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });

  return (
    <section ref={ref} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-black bg-[#FAF9F6]">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-6"
          >
            Volume VI — The Ledger
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl text-black"
          >
            The Command Center
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/dashboard" className="font-sans text-xs tracking-widest uppercase text-black border-b border-black pb-1 hover:opacity-50 transition-opacity">
            Open Interactive Demo &rarr;
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="w-full border border-black bg-[#FAF9F6] shadow-[16px_16px_0_0_rgba(0,0,0,1)] relative p-8 md:p-12 overflow-hidden"
      >
        {/* Subtle grid background for the blueprint feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Mockup Header */}
        <div className="flex justify-between items-center border-b border-black pb-6 mb-8 relative z-10">
          <div className="font-editorial text-2xl italic">MarginGuard Internal</div>
          <div className="font-mono text-xs">SYS_ACTIVE</div>
        </div>

        {/* Mockup Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          <div className="md:col-span-2 border border-black p-8 bg-white">
            <p className="font-sans text-[10px] uppercase tracking-widest text-black/50 mb-2">Profit at Risk</p>
            <h3 className="font-editorial text-6xl md:text-8xl text-[#C45A45] mb-8 tracking-tighter">₹3,00,000</h3>
            <div className="h-4 w-full flex border border-black">
              <div className="w-[36%] bg-black"></div>
              <div className="w-[25%] bg-black/80"></div>
              <div className="w-[18%] bg-black/60"></div>
              <div className="w-[12%] bg-black/40"></div>
              <div className="w-[9%] bg-black/20"></div>
            </div>
          </div>

          <div className="border border-black p-8 bg-black text-[#FAF9F6]">
            <p className="font-sans text-[10px] uppercase tracking-widest text-white/50 mb-6">AI Priority Action</p>
            <h4 className="font-editorial text-3xl mb-4 leading-tight">Disable COD in pincode 302019</h4>
            <div className="font-mono text-xs opacity-70 mb-12">
              Expected Recovery:<br/>
              <span className="text-[#C45A45] text-lg mt-2 block">+ ₹82,000/mo</span>
            </div>
            <div className="border border-[#FAF9F6] py-3 text-center font-sans text-xs uppercase tracking-widest hover:bg-[#FAF9F6] hover:text-black transition-colors cursor-pointer">
              Approve
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
};

export default DashboardPreview;
