"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, LayoutDashboard, Search } from 'lucide-react';
import Link from 'next/link';
import { EventAIChat } from './EventAIChat';

export function EventWizard() {
  const [isSuccess, setIsSuccess] = useState(false);

  const StepSuccess = () => (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-32 h-32 bg-[#0F5B3E] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#0F5B3E]/30"
      >
        <CheckCircle2 className="w-16 h-16 text-white" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-serif text-[#1D1C17] mb-4 tracking-tight"
      >
        Your Event Workspace is Ready
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[#5E6460] text-lg md:text-xl font-medium mb-12"
      >
        NEXUS has successfully generated your Event Command Center.
      </motion.p>

      {/* Event Health Meter */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-white p-6 rounded-2xl border border-[#E6E2DA] shadow-sm mb-12 text-left"
      >
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[#5E6460] text-sm font-bold uppercase tracking-wider mb-1">Event Setup Score</p>
            <p className="text-[#0F5B3E] font-bold text-lg">Excellent Start</p>
          </div>
          <span className="text-4xl font-serif text-[#1D1C17]">92%</span>
        </div>
        <div className="h-3 w-full bg-[#E6F0EC] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "92%" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#0F5B3E] to-[#1A8259] rounded-full"
          />
        </div>
        <p className="text-xs font-medium text-[#5E6460] mt-3">This score improves as you book vendors and upload documents.</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 w-full"
      >
        <Link href="/dashboard" className="flex-1 py-4 bg-[#0F5B3E] text-white rounded-full font-bold text-lg hover:bg-[#0A422C] transition-colors shadow-lg flex items-center justify-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          Go To Dashboard
        </Link>
        <Link href="/marketplace" className="flex-1 py-4 bg-white border border-[#E6E2DA] text-[#1D1C17] rounded-full font-bold text-lg hover:bg-[#F2EFE9] transition-colors flex items-center justify-center gap-2">
          <Search className="w-5 h-5" />
          Explore Vendors
        </Link>
      </motion.div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      {/* Main Content Area */}
      <main className={`flex-1 w-full px-4 md:px-6 pt-24 md:pt-32 pb-32 flex items-center justify-center`}>
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl mx-auto flex justify-center items-center"
            >
              <StepSuccess />
            </motion.div>
          ) : (
            <motion.div
              key="ai-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-serif text-[#1D1C17] mb-2 tracking-tight">AI Event Architect</h2>
                <p className="text-[#5E6460] font-medium text-lg">Let Nexus build your event workspace through a quick conversation.</p>
              </div>
              <EventAIChat onSuccess={() => {
                setIsSuccess(true);
                window.scrollTo(0,0);
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
