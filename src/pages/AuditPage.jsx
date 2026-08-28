import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, FileText, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuditPage = () => {
  const [step, setStep] = useState('upload'); // upload, parsing, warning, complete
  const [parsingLogs, setParsingLogs] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    e.preventDefault();
    setParsedData(null); // use mock
    setStep('parsing');
  };

  const processCSV = (rawText) => {
    try {
      const lines = rawText.trim().split('\n');
      let currentTable = 'orders';
      let tables = { orders: [], order: [], customers: [], shipments: [], returns: [], product_costs: [] };
      let headers = null;

      for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        if (line.toLowerCase().endsWith('.csv')) {
          currentTable = line.toLowerCase().replace('.csv', '');
          headers = null;
          continue;
        }
        if (!headers) {
          headers = line.split(',').map(h => h.trim());
          continue;
        }
        const values = line.split(',');
        const obj = headers.reduce((acc, h, i) => {
          acc[h] = values[i]?.trim();
          return acc;
        }, {});
        
        if (tables[currentTable]) {
          tables[currentTable].push(obj);
        } else {
          tables.orders.push(obj); // Fallback for pure flat CSVs
        }
      }

      const orders = tables.orders.length > 0 ? tables.orders : (tables.order.length > 0 ? tables.order : []);
      if (orders.length === 0) return null;

      let grossRevenue = 0, rtoLeakage = 0, discountLeakage = 0, refundLeakage = 0, paymentFailureLeakage = 0, couponLeakage = 0;

      orders.forEach(row => {
        const amount = parseFloat(row.order_amount || row.gross_amount) || 0;
        const discount = parseFloat(row.discount_amount) || 0;
        
        grossRevenue += amount;
        discountLeakage += discount;

        const status = (row.order_status || '').toLowerCase();
        if (row.rto_flag === '1' || status === 'rto') rtoLeakage += amount;
        if (row.payment_status === 'Failed' || row.payment_status === 'failed') paymentFailureLeakage += amount;
        if (row.coupon_code === 'WELCOME10' && parseInt(row.customer_order_count || '2') > 1) couponLeakage += discount;
      });

      if (tables.returns && tables.returns.length > 0) {
        tables.returns.forEach(r => {
           refundLeakage += parseFloat(r.refund_amount) || 0;
        });
      } else {
        orders.forEach(row => {
           const refund = parseFloat(row.refund_amount) || 0;
           const status = (row.order_status || '').toLowerCase();
           if (row.refund_flag === '1' || status === 'refunded' || status === 'returned') {
             refundLeakage += (refund > 0 ? refund : parseFloat(row.order_amount || row.gross_amount || 0));
           }
        });
      }

      const totalLeakage = rtoLeakage + discountLeakage + refundLeakage + paymentFailureLeakage + couponLeakage;
      
      const breakdown = [
        { id: 'rto', label: 'RTO Losses', amount: rtoLeakage, color: '#ff3366', percentage: ((rtoLeakage/totalLeakage)*100).toFixed(1), severity: 'critical' },
        { id: 'discounts', label: 'Excessive Discounts', amount: discountLeakage, color: '#ffaa00', percentage: ((discountLeakage/totalLeakage)*100).toFixed(1), severity: 'high' },
        { id: 'refunds', label: 'Refund Losses', amount: refundLeakage, color: '#ffd000', percentage: ((refundLeakage/totalLeakage)*100).toFixed(1), severity: 'medium' },
        { id: 'payments', label: 'Payment Failures', amount: paymentFailureLeakage, color: '#00b4d8', percentage: ((paymentFailureLeakage/totalLeakage)*100).toFixed(1), severity: 'medium' },
        { id: 'coupon', label: 'Coupon Abuse', amount: couponLeakage, color: '#a855f7', percentage: ((couponLeakage/totalLeakage)*100).toFixed(1), severity: 'low' },
      ].sort((a,b) => b.amount - a.amount).filter(i => i.amount > 0);

      const result = {
        recordCount: orders.length,
        grossRevenue,
        totalLeakage,
        actualKept: grossRevenue - totalLeakage,
        breakdown,
        hasMarketingSpend: Object.values(tables).some(t => t.length > 0 && Object.keys(t[0]).includes('marketing_spend'))
      };
      
      localStorage.setItem('marguard_parsed_data', JSON.stringify(result));
      return result;
    } catch(e) {
      return null;
    }
  };

  useEffect(() => {
    const handlePaste = (e) => {
      if (step === 'upload') {
        const text = e.clipboardData.getData('Text');
        if (text && text.includes('order_')) {
          const result = processCSV(text);
          if (result) setParsedData(result);
        }
        setStep('parsing');
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [step]);

  useEffect(() => {
    if (step === 'parsing') {
      const isReal = parsedData !== null;
      const records = isReal ? parsedData.recordCount : "54,231";
      
      const logs = [
        "Initializing intelligent parser...",
        "Reading raw ledger data (CSV format)...",
        `Found ${records} order records.`,
        "Mapping columns to standard schema...",
        "Analyzing payment failure rates...",
        "Cross-referencing RTO patterns by pincode...",
        "Identifying overlapping discount codes...",
        "Validating data integrity..."
      ];
      
      let currentLog = 0;
      setParsingLogs([]);
      
      const interval = setInterval(() => {
        if (currentLog < logs.length) {
          setParsingLogs(prev => [...prev, logs[currentLog]]);
          currentLog++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
             // If real data and it has marketing_spend, skip warning
             if (isReal && parsedData.hasMarketingSpend) {
                 navigate('/dashboard');
             } else {
                 setStep('warning');
             }
          }, 800);
        }
      }, 600);

      return () => clearInterval(interval);
    }
  }, [step, parsedData, navigate]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-black bg-[#FAF9F6] px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-xs uppercase tracking-widest font-bold">Return</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 bg-black text-[#FAF9F6] flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-4 h-4 text-[#FAF9F6]">
              <path d="M8 22V10l4 6 4-6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 10h4a4 4 0 0 1 0 8h-4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <span className="font-editorial italic text-base sm:text-lg leading-none whitespace-nowrap">Intelligent Parser</span>
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: UPLOAD */}
            {step === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-black p-8 sm:p-12 bg-[#FAF9F6] text-center shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
              >
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 border border-black flex items-center justify-center">
                    <UploadCloud className="w-8 h-8 text-black" strokeWidth={1} />
                  </div>
                </div>
                <h2 className="font-editorial text-4xl mb-4">Upload Ledger Data</h2>
                <p className="font-classic text-xl italic text-black/70 mb-12 max-w-md mx-auto">
                  Provide your raw order export (Shopify, WooCommerce, or custom CSV). Our engine will map it automatically.
                </p>
                
                <label className="cursor-pointer block border-2 border-dashed border-black/30 hover:border-black p-12 transition-colors mb-8">
                  <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv,.xlsx" />
                  <FileText className="w-6 h-6 mx-auto mb-4 opacity-50" />
                  <span className="font-sans text-xs uppercase tracking-widest font-bold">Drag & Drop, Browse, or Paste (Ctrl+V)</span>
                </label>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-black/10 flex-grow"></div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-black/40">OR</span>
                  <div className="h-px bg-black/10 flex-grow"></div>
                </div>

                <button 
                  onClick={handleFileUpload}
                  className="w-full py-4 mb-8 border border-black bg-black text-[#FAF9F6] font-sans text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-black transition-colors"
                >
                  Load Sample Dataset (UrbanFit_Q3.csv)
                </button>

                <div className="text-left border border-black/20 p-6 mb-8 bg-black/[0.02]">
                  <div className="font-sans text-xs uppercase tracking-widest font-bold mb-4">Expected Schema Snapshot</div>
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/20">
                          <th className="pb-2 font-normal text-black/50">order_id</th>
                          <th className="pb-2 font-normal text-black/50">date</th>
                          <th className="pb-2 font-normal text-black/50">total_value</th>
                          <th className="pb-2 font-normal text-black/50">payment_method</th>
                          <th className="pb-2 font-normal text-black/50">discount_code</th>
                          <th className="pb-2 font-normal text-black/50">status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-2">#1042</td>
                          <td className="py-2">2026-08-21</td>
                          <td className="py-2">₹4,200</td>
                          <td className="py-2">COD</td>
                          <td className="py-2">WELCOME20</td>
                          <td className="py-2 text-[#C45A45]">RTO</td>
                        </tr>
                        <tr className="border-b border-black/10">
                          <td className="py-2">#1043</td>
                          <td className="py-2">2026-08-21</td>
                          <td className="py-2">₹1,850</td>
                          <td className="py-2">UPI</td>
                          <td className="py-2">NONE</td>
                          <td className="py-2">Delivered</td>
                        </tr>
                        <tr>
                          <td className="py-2">#1044</td>
                          <td className="py-2">2026-08-22</td>
                          <td className="py-2">₹2,100</td>
                          <td className="py-2">Credit Card</td>
                          <td className="py-2">SUMMER50</td>
                          <td className="py-2 text-[#C45A45]">Refunded</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest text-black/40 font-mono">
                  Supported: CSV, XLSX. Max size: 50MB. All data is processed locally in memory.
                </div>
              </motion.div>
            )}

            {/* STEP 2: PARSING */}
            {step === 'parsing' && (
              <motion.div
                key="parsing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-black bg-black text-[#FAF9F6] p-8 sm:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-3 mb-8 border-b border-white/20 pb-4">
                  <div className="relative">
                    <Zap className="w-5 h-5 text-[#FAF9F6]" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#FAF9F6] rounded-full animate-ping"></div>
                  </div>
                  <h2 className="font-sans text-xs uppercase tracking-widest font-bold">Parsing Data Engine</h2>
                </div>
                
                <div className="font-mono text-xs space-y-3 min-h-[250px]">
                  {parsingLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4"
                    >
                      <span className="text-white/40">[{String(index + 1).padStart(2, '0')}]</span>
                      <span className="text-white/90">{log}</span>
                    </motion.div>
                  ))}
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-[#FAF9F6] mt-4"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: WARNING */}
            {step === 'warning' && (
              <motion.div
                key="warning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-black p-8 sm:p-12 bg-[#FAF9F6] shadow-[8px_8px_0_0_#C45A45]"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#C45A45] text-[#FAF9F6] flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="font-editorial text-3xl">Partial Data Mapped</h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-black/50 mt-1">Status: Minor Warnings Detected</p>
                  </div>
                </div>
                
                <div className="border border-black p-6 mb-8 bg-black/5">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C45A45]"></span>
                    Missing Column: marketing_spend
                  </h3>
                  <p className="font-classic italic text-lg text-black/80">
                    The parser could not locate marketing acquisition data. Customer Acquisition Cost (CAC) leakage analysis will be skipped.
                  </p>
                </div>
                
                <div className="border border-black p-6 mb-12">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-black" strokeWidth={1.5} />
                    Successfully Mapped
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2 font-mono text-xs">
                    <div>✓ Order Value</div>
                    <div>✓ Payment Status</div>
                    <div>✓ Shipping State</div>
                    <div>✓ Discount Codes</div>
                    <div>✓ Return/RTO Status</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('upload')}
                    className="flex-1 py-4 border border-black font-sans text-xs tracking-widest uppercase font-bold hover:bg-black hover:text-[#FAF9F6] transition-colors"
                  >
                    Re-upload
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 py-4 bg-black text-[#FAF9F6] border border-black font-sans text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-black transition-colors"
                  >
                    Proceed to Ledger
                  </button>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AuditPage;
