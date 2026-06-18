"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle2, Gift } from 'lucide-react';

interface RegistryProps {
  allowRegistry: boolean;
}

export const Registry: React.FC<RegistryProps> = ({ allowRegistry }) => {
  const [copied, setCopied] = useState(false);

  if (!allowRegistry) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("03001234567");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-nexus-charcoal py-24 px-4 text-center">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-nexus-gold/10 rounded-full flex items-center justify-center mx-auto text-nexus-gold mb-8">
            <Gift size={32} />
          </div>
          
          <h2 className="text-3xl font-serif text-white">Blessings & Gifts</h2>
          <p className="text-white/60 font-light leading-relaxed">
            Your presence is the greatest gift of all. However, should you wish to bless us with a gift, a digital Salami contribution is deeply appreciated.
          </p>

          <div className="mt-12 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <h3 className="text-nexus-gold text-sm uppercase tracking-widest font-semibold mb-6">Raast ID / IBAN</h3>
            
            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 group hover:border-white/20 transition-colors">
              <div className="text-left">
                <p className="text-white/40 text-xs mb-1">Raast Mobile Number</p>
                <p className="text-white font-mono text-lg tracking-widest">0300 123 4567</p>
              </div>
              <button 
                onClick={handleCopy}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="text-nexus-emerald" size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-white/40 text-xs mt-4 text-center">Title: Ahmed Khan</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
