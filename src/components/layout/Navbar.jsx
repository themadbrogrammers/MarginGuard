import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-black py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-black group-hover:opacity-70 transition-opacity">
            <path d="M8 22V10l4 6 4-6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 10h4a4 4 0 0 1 0 8h-4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
          </svg>
          <span className="font-sans text-sm tracking-[0.2em] uppercase font-semibold text-black">
            MarginGuard
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          <Link to="/audit" className="font-sans text-xs tracking-widest uppercase text-black/60 hover:text-black transition-colors">Run Audit</Link>
          <Link to="/dashboard" className="font-sans text-xs tracking-widest uppercase text-black/60 hover:text-black transition-colors">The Ledger</Link>
          <Link to="/pricing" className="font-sans text-xs tracking-widest uppercase text-black/60 hover:text-black transition-colors">Access</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/login" className="font-sans text-xs tracking-widest uppercase text-black hover:opacity-70 transition-opacity">Sign In</Link>
          <Link to="/audit" className="bg-black text-[#FAF9F6] border border-black px-8 py-3 font-sans text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-colors">
            Run Audit
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF9F6] border-b border-black overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <Link to="/audit" onClick={() => setMobileMenuOpen(false)} className="font-sans text-xs tracking-widest uppercase text-black border-b border-black/10 pb-4">Run Audit</Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="font-sans text-xs tracking-widest uppercase text-black border-b border-black/10 pb-4">The Ledger</Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="font-sans text-xs tracking-widest uppercase text-black border-b border-black/10 pb-4">Access</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="font-sans text-xs tracking-widest uppercase text-black border-b border-black/10 pb-4">Sign In</Link>
              <Link to="/audit" onClick={() => setMobileMenuOpen(false)} className="bg-black text-[#FAF9F6] border border-black px-8 py-3 text-center font-sans text-xs tracking-widest uppercase hover:bg-transparent hover:text-black transition-colors">Run Audit</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
