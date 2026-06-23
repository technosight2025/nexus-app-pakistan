"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle, Calculator, Search, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-y-auto max-h-full relative border border-slate-100 pointer-events-auto"
            >
              
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center mb-6 shadow-inner relative z-10">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2 relative z-10">Welcome to your Dashboard!</h3>
                <p className="text-emerald-50 text-sm opacity-90 relative z-10 leading-relaxed">
                  Your event profile is successfully set up. Nexus is now your central hub for all wedding planning and management.
                </p>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest text-center">Quick Actions</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <Link 
                    href="/dashboard/host/v2/budget" 
                    onClick={onClose}
                    className="flex items-center p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-slate-800">Review Budget</h5>
                      <p className="text-xs text-slate-500">Fine-tune your estimated costs.</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </Link>

                  <Link 
                    href="/explore" 
                    onClick={onClose}
                    className="flex items-center p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <Search className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-slate-800">Explore Vendors</h5>
                      <p className="text-xs text-slate-500">Find venues and professionals.</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </Link>

                  <Link 
                    href="/dashboard/host/v2/invitations" 
                    onClick={onClose}
                    className="flex items-center p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4 shrink-0 group-hover:scale-110 transition-transform">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-slate-800">Setup Guest List</h5>
                      <p className="text-xs text-slate-500">Import contacts & send e-cards.</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors" />
                  </Link>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <CheckCircle className="w-4 h-4" /> Go to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
