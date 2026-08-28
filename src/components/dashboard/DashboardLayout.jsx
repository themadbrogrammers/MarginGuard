import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black font-sans">
      
      {/* Top Header */}
      <header className="border-b border-black bg-[#FAF9F6] px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">Return</span>
          </Link>
          <div className="h-6 w-px bg-black/20"></div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 bg-black text-[#FAF9F6] flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-4 h-4 text-[#FAF9F6]">
                <path d="M8 22V10l4 6 4-6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 10h4a4 4 0 0 1 0 8h-4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-editorial italic text-base sm:text-lg leading-none whitespace-nowrap">The Ledger</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block text-[10px] uppercase tracking-widest text-black/50">Merchant</div>
          <div className="border border-black px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">UrbanFit</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto p-6 md:p-12">
        {children}
      </main>
      
    </div>
  );
};

export default DashboardLayout;
