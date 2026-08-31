import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, FileText, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { normalizeMerchantData } from '../utils/merchantNormalizer';

const AuditPage = () => {
  const [step, setStep] = useState('upload'); // upload, parsing, mapping, warning
  const [parsingLogs, setParsingLogs] = useState([]);
  const [parsedData, setParsedData] = useState(null);
  const [mappingOverrides, setMappingOverrides] = useState({});
  const [normalizationResult, setNormalizationResult] = useState(null);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  // --------------------------------------------------
  // CSV PARSER
  // --------------------------------------------------

  const parseCSVText = (rawText) => {
    const lines = rawText
      .replace(/\r/g, '')
      .trim()
      .split('\n')
      .filter(Boolean);

    if (lines.length < 2) return [];

    const headers = lines[0]
      .split(',')
      .map(h => h.trim().replace(/^"|"$/g, ''));

    return lines.slice(1).map(line => {
      const values = line
        .split(',')
        .map(v => v.trim().replace(/^"|"$/g, ''));

      return headers.reduce((acc, header, index) => {
        acc[header] = values[index] ?? '';
        return acc;
      }, {});
    });
  };

  // --------------------------------------------------
  // RUN NORMALIZATION + EXISTING MARGIN ANALYSIS
  // --------------------------------------------------

  const analyzeMerchantData = (rows, name = 'merchant.csv') => {
    try {
      if (!rows || rows.length === 0) {
        setNormalizationResult(null);
        setParsedData(null);
        return;
      }

      const normalized = normalizeMerchantData(rows);

      setNormalizationResult(normalized);
      setFileName(name);

      if (!normalized.success) {
        setParsedData(null);
        return;
      }

      const orders = normalized.normalizedData;

      let grossRevenue = 0;
      let rtoLeakage = 0;
      let discountLeakage = 0;
      let refundLeakage = 0;
      let paymentFailureLeakage = 0;
      let couponLeakage = 0;

      orders.forEach(row => {
        const amount = Number(row.selling_price) || 0;
        const discount = Number(row.discount) || 0;

        grossRevenue += amount;
        discountLeakage += discount;

        const status = String(row.order_status || '').toLowerCase();
        const rto = String(row.rto_status || '').toUpperCase();

        if (rto === 'RTO' || status === 'rto') {
          rtoLeakage += amount;
        }

        if (String(row.payment_status || '').toLowerCase() === 'failed') {
          paymentFailureLeakage += amount;
        }

        if (
          String(row.coupon_code || '').toUpperCase() === 'WELCOME10' &&
          Number(row.customer_order_count || 2) > 1
        ) {
          couponLeakage += discount;
        }

        if (
          String(row.refund_flag || '') === '1' ||
          status === 'refunded' ||
          status === 'returned'
        ) {
          refundLeakage += Number(row.refund_amount) || amount;
        }
      });

      const totalLeakage =
        rtoLeakage +
        discountLeakage +
        refundLeakage +
        paymentFailureLeakage +
        couponLeakage;


      console.log("MARGIN GUARDIAN CALCULATION:", {
        rtoLeakage,
        discountLeakage,
        refundLeakage,
        paymentFailureLeakage,
        couponLeakage,
        totalLeakage
      });  

      const breakdown = [
        {
          id: 'rto',
          label: 'RTO Losses',
          amount: rtoLeakage,
          color: '#ff3366',
          percentage: totalLeakage ? ((rtoLeakage / totalLeakage) * 100).toFixed(1) : '0.0',
          severity: 'critical'
        },
        {
          id: 'discounts',
          label: 'Excessive Discounts',
          amount: discountLeakage,
          color: '#ffaa00',
          percentage: totalLeakage ? ((discountLeakage / totalLeakage) * 100).toFixed(1) : '0.0',
          severity: 'high'
        },
        {
          id: 'refunds',
          label: 'Refund Losses',
          amount: refundLeakage,
          color: '#ffd000',
          percentage: totalLeakage ? ((refundLeakage / totalLeakage) * 100).toFixed(1) : '0.0',
          severity: 'medium'
        },
        {
          id: 'payments',
          label: 'Payment Failures',
          amount: paymentFailureLeakage,
          color: '#00b4d8',
          percentage: totalLeakage ? ((paymentFailureLeakage / totalLeakage) * 100).toFixed(1) : '0.0',
          severity: 'medium'
        },
        {
          id: 'coupon',
          label: 'Coupon Abuse',
          amount: couponLeakage,
          color: '#a855f7',
          percentage: totalLeakage ? ((couponLeakage / totalLeakage) * 100).toFixed(1) : '0.0',
          severity: 'low'
        }
      ]
        .sort((a, b) => b.amount - a.amount)
        .filter(item => item.amount > 0);

      const result = {
        recordCount: orders.length,
        grossRevenue,
        totalLeakage,
        actualKept: grossRevenue - totalLeakage,
        breakdown,
        hasMarketingSpend: false,

        // New normalization information
        dataQuality: normalized.quality,
        mappings: normalized.mappings,
        missingFields: normalized.missingFields,
        validationIssues: normalized.validationIssues,
        normalizedData: orders
      };

      localStorage.setItem('marguard_parsed_data', JSON.stringify(result));
      setParsedData(result);
    } catch (error) {
      console.error('Merchant data analysis failed:', error);
      setParsedData(null);
    }
  };

  // --------------------------------------------------
  // FILE UPLOAD
  // --------------------------------------------------

  const handleFileUpload = async (e) => {
    e?.preventDefault();

    const file = e?.target?.files?.[0];

    // Keep the existing sample-dataset button functional.
    if (!file) {
      setParsedData(null);
      setNormalizationResult(null);
      setFileName('UrbanFit_Q3.csv');
      setStep('parsing');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File is larger than the 50MB limit.');
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('For Milestone 1, please upload a CSV file. XLSX support will be added next.');
      return;
    }

    try {
      const rawText = await file.text();
      const rows = parseCSVText(rawText);

      if (!rows.length) {
        alert('Could not find usable rows in this CSV.');
        return;
      }

      analyzeMerchantData(rows, file.name);
      setStep('parsing');
    } catch (error) {
      console.error(error);
      alert('Could not read this CSV file.');
    }
  };

  // --------------------------------------------------
  // PASTE SUPPORT
  // --------------------------------------------------

  useEffect(() => {
    const handlePaste = (e) => {
      if (step !== 'upload') return;

      const text = e.clipboardData.getData('Text');

      if (!text || !text.includes(',')) return;

      const rows = parseCSVText(text);

      if (rows.length > 0) {
        analyzeMerchantData(rows, 'pasted-merchant-data.csv');
        setStep('parsing');
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [step]);

  // --------------------------------------------------
  // PARSING ANIMATION
  // --------------------------------------------------

  useEffect(() => {
    if (step !== 'parsing') return;

    const isReal = parsedData !== null;
    const records = isReal ? parsedData.recordCount : '54,231';

    const logs = [
      'Initializing intelligent parser...',
      `Reading ${fileName || 'raw ledger data'} (CSV format)...`,
      `Found ${records} order records.`,
      'Detecting merchant-specific column names...',
      'Mapping fields to canonical merchant schema...',
      'Profiling values and checking data types...',
      'Validating required fields and relationships...',
      'Calculating data confidence...'
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
          if (isReal) {
            setStep('mapping');
          } else {
            setStep('warning');
          }
        }, 600);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [step, parsedData, fileName]);

  // --------------------------------------------------
  // CONFIRM MAPPING
  // --------------------------------------------------

  const confirmMapping = () => {
    if (!parsedData) return;

    localStorage.setItem(
      'marguard_parsed_data',
      JSON.stringify(parsedData)
    );

    if (parsedData.missingFields.length > 0) {
      setStep('warning');
    } else {
      navigate('/dashboard');
    }
  };

  const quality = parsedData?.dataQuality || {
    score: 0,
    completeness: 0,
    validity: 0,
    mappingConfidence: 0
  };

  const mappings = parsedData?.mappings || [];

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="none"
              className="w-4 h-4 text-[#FAF9F6]"
            >
              <path d="M8 22V10l4 6 4-6v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 10h4a4 4 0 0 1 0 8h-4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="14" r="1.5" fill="currentColor"/>
            </svg>
          </div>

          <span className="font-editorial italic text-base sm:text-lg leading-none whitespace-nowrap">
            Intelligent Parser
          </span>
        </div>

        <div className="w-16"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
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
                  Provide your raw order export. MarginGuard will detect your schema,
                  normalize the data, and validate it before analysis.
                </p>

                <label className="cursor-pointer block border-2 border-dashed border-black/30 hover:border-black p-12 transition-colors mb-8">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".csv"
                  />

                  <FileText className="w-6 h-6 mx-auto mb-4 opacity-50" />

                  <span className="font-sans text-xs uppercase tracking-widest font-bold">
                    Drag & Drop, Browse, or Paste (Ctrl+V)
                  </span>
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
                  <div className="font-sans text-xs uppercase tracking-widest font-bold mb-4">
                    Canonical Schema Snapshot
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/20">
                          <th className="pb-2 font-normal text-black/50">order_id</th>
                          <th className="pb-2 font-normal text-black/50">date</th>
                          <th className="pb-2 font-normal text-black/50">selling_price</th>
                          <th className="pb-2 font-normal text-black/50">payment_method</th>
                          <th className="pb-2 font-normal text-black/50">discount</th>
                          <th className="pb-2 font-normal text-black/50">rto_status</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="border-b border-black/10">
                          <td className="py-2">#1042</td>
                          <td className="py-2">2026-08-21</td>
                          <td className="py-2">₹4,200</td>
                          <td className="py-2">COD</td>
                          <td className="py-2">₹200</td>
                          <td className="py-2 text-[#C45A45]">RTO</td>
                        </tr>

                        <tr className="border-b border-black/10">
                          <td className="py-2">#1043</td>
                          <td className="py-2">2026-08-21</td>
                          <td className="py-2">₹1,850</td>
                          <td className="py-2">UPI</td>
                          <td className="py-2">₹0</td>
                          <td className="py-2">Delivered</td>
                        </tr>

                        <tr>
                          <td className="py-2">#1044</td>
                          <td className="py-2">2026-08-22</td>
                          <td className="py-2">₹2,100</td>
                          <td className="py-2">Credit Card</td>
                          <td className="py-2">₹100</td>
                          <td className="py-2">Refunded</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest text-black/40 font-mono">
                  Supported: CSV. Max size: 50MB. Data is processed locally in memory.
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

                  <h2 className="font-sans text-xs uppercase tracking-widest font-bold">
                    Parsing Data Engine
                  </h2>
                </div>

                <div className="font-mono text-xs space-y-3 min-h-[250px]">
                  {parsingLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4"
                    >
                      <span className="text-white/40">
                        [{String(index + 1).padStart(2, '0')}]
                      </span>

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

            {/* STEP 3: MAPPING REVIEW */}
            {step === 'mapping' && parsedData && (
              <motion.div
                key="mapping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-black p-8 sm:p-10 bg-[#FAF9F6] shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
              >
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-editorial text-3xl">Schema Analysis</h2>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-black/50 mt-1">
                      {fileName || 'merchant.csv'} · {parsedData.recordCount.toLocaleString()} records
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="font-sans text-[10px] uppercase tracking-widest text-black/50">
                      Data confidence
                    </div>
                    <div className="font-editorial text-3xl">
                      {quality.score}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="border border-black p-4">
                    <div className="font-sans text-[10px] uppercase tracking-widest text-black/50">
                      Completeness
                    </div>
                    <div className="font-mono text-xl mt-1">{quality.completeness}%</div>
                  </div>

                  <div className="border border-black p-4">
                    <div className="font-sans text-[10px] uppercase tracking-widest text-black/50">
                      Validity
                    </div>
                    <div className="font-mono text-xl mt-1">{quality.validity}%</div>
                  </div>

                  <div className="border border-black p-4">
                    <div className="font-sans text-[10px] uppercase tracking-widest text-black/50">
                      Mapping
                    </div>
                    <div className="font-mono text-xl mt-1">{quality.mappingConfidence}%</div>
                  </div>
                </div>

                <div className="border border-black mb-8">
                  <div className="px-5 py-4 border-b border-black font-sans text-xs uppercase tracking-widest font-bold">
                    Merchant → Canonical Mapping
                  </div>

                  <div className="divide-y divide-black/10">
                    {mappings.map((mapping, index) => {
                      const confidence = Math.round(mapping.confidence * 100);

                      return (
                        <div
                          key={`${mapping.source}-${index}`}
                          className="grid grid-cols-[1.2fr_1fr_auto] items-center gap-4 px-5 py-4"
                        >
                          <div>
                            <div className="font-mono text-xs">{mapping.source}</div>
                            <div className="font-sans text-[9px] uppercase tracking-widest text-black/40 mt-1">
                              Merchant field
                            </div>
                          </div>

                          <div>
                            {mapping.target ? (
                              <>
                                <div className="font-mono text-xs">
                                  {mapping.target}
                                </div>

                                <div className="font-sans text-[9px] uppercase tracking-widest text-black/40 mt-1">
                                  Canonical field
                                </div>
                              </>
                            ) : mapping.candidates?.length > 0 ? (

                              <div>
                                <select
                                  value={
                                    mappingOverrides[mapping.source] || ""
                                  }
                                  onChange={(e) => {
                                    setMappingOverrides(prev => ({
                                      ...prev,
                                      [mapping.source]: e.target.value
                                    }));
                                  }}
                                  className="border border-black bg-transparent px-2 py-2 font-mono text-xs w-full"
                                >

                                  <option value="">
                                    Select canonical field
                                  </option>

                                  {mapping.candidates.map(candidate => (

                                    <option
                                      key={candidate.field}
                                      value={candidate.field}
                                    >
                                      {candidate.label}
                                    </option>

                                  ))}

                                </select>

                                <div className="font-sans text-[9px] uppercase tracking-widest text-[#9A6B00] mt-1">
                                  Review required
                                </div>

                              </div>

                            ) : (

                              <div className="font-mono text-xs text-black/50">
                                No confident match
                              </div>

                            )}
                          </div>

                          <div className="text-right">
                            {mapping.target ? (
                              <span
                                className={`font-mono text-xs ${
                                  confidence >= 90
                                    ? 'text-black'
                                    : confidence >= 70
                                      ? 'text-[#9A6B00]'
                                      : 'text-[#C45A45]'
                                }`}
                              >
                                {confidence}%
                              </span>
                            ) : (
                              <span className="font-mono text-xs text-[#C45A45]">
                                REVIEW
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* ==================================================
    FINANCIAL ANALYSIS READINESS
================================================== */}

{normalizationResult?.financialReadiness && (
  <div className="border border-black mb-8">

    <div className="px-5 py-4 border-b border-black font-sans text-xs uppercase tracking-widest font-bold">
      Financial Analysis Readiness
    </div>

    <div className="px-5 py-5">

      <div className="font-sans text-xs text-black/60 mb-5">
        MarginGuard checks which financial insights can
        be calculated safely from the data provided.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {Object.entries(
          normalizationResult.financialReadiness.analyses
        ).map(([key, analysis]) => (

          <div
            key={key}
            className="border border-black/20 px-4 py-4 flex items-start justify-between gap-4"
          >

            <div>

              <div className="font-mono text-xs">
                {analysis.label}
              </div>

              <div className="font-sans text-[10px] text-black/50 mt-2 leading-relaxed">
                {analysis.reason}
              </div>

            </div>


            <div className="shrink-0">

              {analysis.available ? (

                <span className="font-mono text-[10px] border border-black px-2 py-1">
                  AVAILABLE
                </span>

              ) : (

                <span className="font-mono text-[10px] border border-black/30 px-2 py-1 text-black/50">
                  INCOMPLETE
                </span>

              )}

            </div>

          </div>

        ))}

      </div>


      {/* ----------------------------------------------
          READINESS SUMMARY
      ---------------------------------------------- */}

      <div className="mt-5 pt-5 border-t border-black/10 flex items-center justify-between">

        <div>

          <div className="font-sans text-[9px] uppercase tracking-widest text-black/40">
            Analysis Readiness
          </div>

          <div className="font-mono text-xl mt-1">
            {
              normalizationResult
                .financialReadiness
                .readinessScore
            }%
          </div>

        </div>


        <div className="text-right">

          <div className="font-sans text-[9px] uppercase tracking-widest text-black/40">
            Available Analyses
          </div>

          <div className="font-mono text-xl mt-1">

            {
              normalizationResult
                .financialReadiness
                .availableCount
            }

            /

            {
              normalizationResult
                .financialReadiness
                .totalAnalyses
            }

          </div>

        </div>

      </div>

    </div>

  </div>
)}

                {parsedData.missingFields.length > 0 && (
                  <div className="border border-[#C45A45] p-5 mb-5">
                    <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold mb-3">
                      <AlertTriangle className="w-4 h-4 text-[#C45A45]" />
                      Required concepts missing
                    </div>

                    <div className="font-mono text-xs space-y-2">
                      {parsedData.missingFields.map(field => (
                        <div key={field.field}>
                          ✗ {field.label} ({field.field})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsedData.validationIssues.length > 0 && (
                  <div className="border border-black/20 p-5 mb-8">
                    <div className="font-sans text-xs uppercase tracking-widest font-bold mb-3">
                      Validation findings
                    </div>

                    <div className="font-mono text-xs space-y-2 max-h-36 overflow-y-auto">
                      {parsedData.validationIssues.slice(0, 12).map((issue, index) => (
                        <div key={index}>
                          <span className="text-black/40">Row {issue.row} · </span>
                          {issue.message}
                        </div>
                      ))}

                      {parsedData.validationIssues.length > 12 && (
                        <div className="text-black/40">
                          + {parsedData.validationIssues.length - 12} more findings
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('upload')}
                    className="flex-1 py-4 border border-black font-sans text-xs tracking-widest uppercase font-bold hover:bg-black hover:text-[#FAF9F6] transition-colors"
                  >
                    Re-upload
                  </button>

                  <button
                    onClick={confirmMapping}
                    className="flex-1 py-4 bg-black text-[#FAF9F6] border border-black font-sans text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-black transition-colors"
                  >
                    Confirm Mapping
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: WARNING */}
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
                    <p className="font-mono text-[10px] uppercase tracking-widest text-black/50 mt-1">
                      Status: Analysis limitations detected
                    </p>
                  </div>
                </div>

                <div className="border border-black p-6 mb-8 bg-black/5">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold mb-4">
                    Missing required concepts
                  </h3>

                  <div className="font-mono text-xs space-y-2">
                    {parsedData?.missingFields?.map(field => (
                      <div key={field.field}>
                        ✗ {field.label}
                      </div>
                    ))}
                  </div>

                  <p className="font-classic italic text-lg text-black/80 mt-5">
                    MarginGuard will only use analyses supported by the available data.
                    Missing fields will not be silently guessed.
                  </p>
                </div>

                <div className="border border-black p-6 mb-12">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-black" strokeWidth={1.5} />
                    Data quality
                  </h3>

                  <div className="grid grid-cols-2 gap-y-3 font-mono text-xs">
                    <div>Completeness</div>
                    <div>{quality.completeness}%</div>

                    <div>Validity</div>
                    <div>{quality.validity}%</div>

                    <div>Mapping confidence</div>
                    <div>{quality.mappingConfidence}%</div>

                    <div>Overall confidence</div>
                    <div>{quality.score}%</div>
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
