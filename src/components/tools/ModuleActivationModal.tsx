"use client"

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ModuleActivationModalProps {
  module: any | null;
  onClose: () => void;
}

export function ModuleActivationModal({ module, onClose }: ModuleActivationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activating, setActivating] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleActivate = () => {
    setActivating(true);
    // Simulate network request
    setTimeout(() => {
      setActivating(false);
      onClose();
      // Show Roman Urdu Toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {module && (
            <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 sm:p-0">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, y: "100%", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: "100%", scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
              >
                {/* Header Cover */}
                <div className="h-32 bg-gradient-to-br from-[#0F5B3E] to-[#0A422C] relative">
                  <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="px-8 pb-8">
                  {/* Icon floating over cover */}
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-[#E6E2DA] flex items-center justify-center -mt-10 mb-4 mx-auto">
                    {module.icon && <module.icon className="w-10 h-10 text-[#0F5B3E]" />}
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h2 className="text-2xl font-serif font-bold text-[#1D1C17]">{module.name}</h2>
                      {module.status === 'Premium' && (
                        <span className="text-[10px] font-bold px-2 py-1 bg-[#FDF8EA] text-[#C9A227] rounded-full uppercase tracking-wide">Pro</span>
                      )}
                    </div>
                    <p className="text-[#5E6460]">{module.desc}</p>
                  </div>

                  <div className="bg-[#FAF7F2] rounded-2xl p-4 mb-8">
                    <h4 className="font-bold text-[#1D1C17] mb-2 text-sm">Included Features:</h4>
                    <ul className="space-y-2 text-sm text-[#5E6460]">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0F5B3E]" /> Unlimited usage</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0F5B3E]" /> Dashboard widget integration</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0F5B3E]" /> Roman Urdu support</li>
                    </ul>
                  </div>

                  {module.status === 'Installed' ? (
                    <button 
                      onClick={onClose}
                      className="w-full py-4 rounded-full bg-[#E6F0EC] text-[#0F5B3E] font-bold text-lg hover:bg-[#0F5B3E] hover:text-white transition-colors"
                    >
                      Open Module
                    </button>
                  ) : module.tier !== 'Free' ? (
                    <button 
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#C9A227] to-[#B08D22] text-white font-bold text-lg shadow-[0_8px_20px_-5px_rgba(201,162,39,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldAlert className="w-5 h-5" />
                      Upgrade to {module.tier} to Access
                    </button>
                  ) : (
                    <button 
                      onClick={handleActivate}
                      disabled={activating}
                      className="w-full py-4 rounded-full bg-[#0F5B3E] text-white font-bold text-lg hover:bg-[#0A422C] transition-all shadow-[0_8px_20px_-5px_rgba(15,91,62,0.5)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {activating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Activating...
                        </>
                      ) : (
                        'Activate Free Module'
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Roman Urdu Toast Notification */}
      {mounted && createPortal(
        <AnimatePresence>
          {showToast && module && (
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="bg-[#1D1C17] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
              >
                <div className="w-8 h-8 rounded-full bg-[#0F5B3E] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">Success!</p>
                  <p className="text-xs text-white/70">Aap ka {module.name} activate ho gaya hai.</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
