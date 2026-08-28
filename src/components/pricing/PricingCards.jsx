import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: '/mo',
    desc: 'For emerging D2C brands.',
    features: ['Up to 1,000 orders/mo', 'Basic leak detection', 'Email alerts', '3 investigations/mo'],
    cta: 'Commence',
    highlight: false
  },
  {
    name: 'Growth',
    price: '₹14,999',
    period: '/mo',
    desc: 'For scaling operations.',
    features: ['Up to 50,000 orders/mo', 'Full AI investigation', 'Strategy simulation', 'Priority support'],
    cta: 'Commence',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For massive volume.',
    features: ['Unlimited orders', 'Custom integrations', 'Dedicated support', 'API access & SLA'],
    cta: 'Contact Sales',
    highlight: false
  }
];

const PricingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
      {tiers.map((tier, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`border border-black p-8 relative flex flex-col ${
            tier.highlight ? 'bg-black text-[#FAF9F6]' : 'bg-[#FAF9F6] text-black'
          }`}
        >
          {tier.highlight && (
            <div className="absolute top-0 right-0 bg-[#FAF9F6] text-black border-l border-b border-black px-3 py-1 font-sans text-[9px] uppercase tracking-widest font-bold">
              Standard
            </div>
          )}
          
          <h3 className="font-editorial text-3xl mb-2">{tier.name}</h3>
          <p className={`font-classic italic mb-8 ${tier.highlight ? 'text-[#FAF9F6]/70' : 'text-black/70'}`}>
            {tier.desc}
          </p>
          
          <div className="mb-8">
            <span className="font-editorial text-5xl">{tier.price}</span>
            <span className={`font-mono text-xs ${tier.highlight ? 'text-[#FAF9F6]/50' : 'text-black/50'}`}>{tier.period}</span>
          </div>

          <ul className="space-y-4 mb-12 flex-grow">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-0.5 ${tier.highlight ? 'text-[#FAF9F6]' : 'text-black'}`} strokeWidth={1} />
                <span className="font-sans text-xs uppercase tracking-widest leading-relaxed opacity-80">{feature}</span>
              </li>
            ))}
          </ul>

          <button className={`w-full py-4 font-sans text-xs tracking-widest uppercase font-bold border transition-colors ${
            tier.highlight 
              ? 'bg-[#FAF9F6] text-black border-[#FAF9F6] hover:bg-transparent hover:text-[#FAF9F6]' 
              : 'bg-black text-[#FAF9F6] border-black hover:bg-transparent hover:text-black'
          }`}>
            {tier.cta}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCards;
