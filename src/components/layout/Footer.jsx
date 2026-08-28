import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[#FAF9F6] border-t border-black pt-24 pb-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
        
        {/* Brand */}
        <div className="md:w-1/3">
          <Link to="/" className="flex items-center gap-3 group mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-[#FAF9F6] group-hover:opacity-70 transition-opacity">
              <path d="M8 22V10l4 6 4-6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 10h4a4 4 0 0 1 0 8h-4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
            </svg>
            <span className="font-sans text-sm tracking-[0.2em] uppercase font-semibold">
              MarginGuard
            </span>
          </Link>
          <p className="font-classic text-xl italic text-[#FAF9F6]/70 max-w-sm">
            Structural profit protection for modern merchants.
          </p>
        </div>

        {/* Links */}
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold mb-6">Product</h4>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-[#FAF9F6]/60">
              <li><Link to="/#how-it-works" className="hover:text-[#FAF9F6] transition-colors">Methodology</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#FAF9F6] transition-colors">The Ledger</Link></li>
              <li><Link to="/pricing" className="hover:text-[#FAF9F6] transition-colors">Access</Link></li>
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">API Reference</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold mb-6">Company</h4>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-[#FAF9F6]/60">
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold mb-6">Legal</h4>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-[#FAF9F6]/60">
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-[#FAF9F6] transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-[#FAF9F6]/20 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-[10px] tracking-widest uppercase text-[#FAF9F6]/40">
          © {currentYear} MarginGuard. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" className="text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
