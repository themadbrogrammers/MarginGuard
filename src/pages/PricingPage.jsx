import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import PricingCards from '../components/pricing/PricingCards';

const faqs = [
  {
    q: 'How does MarginGuard connect to my store?',
    a: 'Simple API integration with Shopify, WooCommerce, and custom platforms. Setup takes under 5 minutes.'
  },
  {
    q: 'Is my data secure?',
    a: 'Bank-grade encryption. SOC 2 Type II compliant. Your data never leaves our secure infrastructure.'
  },
  {
    q: 'What if the AI makes a wrong recommendation?',
    a: 'Every action requires your approval. The AI recommends, you decide. No changes are made without merchant consent.'
  },
  {
    q: 'Can I try before I buy?',
    a: '14-day free trial with full access. No credit card required.'
  }
];

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-32 pb-24 border-b border-black bg-[#FAF9F6] text-black">
      
      <div className="text-center mb-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.2em] uppercase text-black/60 mb-6"
        >
          Access
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-editorial text-6xl md:text-8xl text-black mb-6"
        >
          Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-classic text-2xl italic text-black/70"
        >
          Protect your margins with structural intelligence.
        </motion.p>
      </div>

      <PricingCards />

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-40 px-6">
        <h2 className="font-editorial text-4xl mb-12 border-b border-black pb-4">Frequently Asked Questions</h2>
        
        <div className="border-t border-black">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-black">
              <button 
                className="w-full py-6 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-sans text-xs uppercase tracking-widest font-bold pr-8 text-black">{faq.q}</span>
                {openFaq === index ? <Minus className="w-4 h-4 flex-shrink-0 text-black" strokeWidth={1} /> : <Plus className="w-4 h-4 flex-shrink-0 text-black" strokeWidth={1} />}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="font-classic text-lg italic text-black/80 pb-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PricingPage;
