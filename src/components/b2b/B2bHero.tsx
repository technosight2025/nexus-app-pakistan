"use client"

import React from "react"
import { motion } from "framer-motion"
import { Building2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react"

interface B2bHeroProps {
  isUrdu: boolean;
  onToggleLanguage: (val: boolean) => void;
}

export function B2bHero({ isUrdu, onToggleLanguage }: B2bHeroProps) {
  const transitionSpring = { type: "spring" as const, stiffness: 200, damping: 25 }

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-24 pb-16 px-4 md:px-8 select-none">
      
      {/* Background neon dynamic blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0F5B3E]/15 rounded-full filter blur-[100px] opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A227]/10 rounded-full filter blur-[100px] opacity-80" />
      </div>

      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1505232458627-539096539133?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />

      {/* Language Toggle Bar */}
      <div className="absolute top-6 right-6 z-20">
        <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1 shadow-md text-xs font-bold">
          <button
            onClick={() => onToggleLanguage(false)}
            className={`px-3 py-1.5 rounded-lg transition-all ${!isUrdu ? "bg-[#0F5B3E] text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            English
          </button>
          <button
            onClick={() => onToggleLanguage(true)}
            className={`px-3 py-1.5 rounded-lg transition-all ${isUrdu ? "bg-[#0F5B3E] text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            Roman Urdu
          </button>
        </div>
      </div>

      {/* Main Core Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center" dir="ltr">
        
        {/* Animated Pill Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transitionSpring}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-slate-200 font-bold text-xs md:text-sm mb-6 backdrop-blur-md"
        >
          <Building2 className="w-4 h-4 text-[#C9A227]" />
          {isUrdu ? "Event aur Hospitality Operating System" : "The Event & Hospitality Operating System"}
        </motion.div>

        {/* Dynamic Animated Title */}
        <motion.h1 
          key={isUrdu ? "ur_title" : "en_title"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl"
        >
          {isUrdu ? (
            <>
              Apne Event Business Ko Chalain Ab <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#C9A227]">NEXUS</span> Par
            </>
          ) : (
            <>
              Run Your Entire Event Business on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#C9A227]">NEXUS</span>
            </>
          )}
        </motion.h1>

        {/* Animated Subtitle Description */}
        <motion.p
          key={isUrdu ? "ur_sub" : "en_sub"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-sans"
        >
          {isUrdu ? (
            "WhatsApp ki afratafri aur bikhri hui Excel sheets ko bye bye kahain. Pakistan ke event halls, caterers, aur decorators ke liye tayar kiya gaya pehla ERP platform."
          ) : (
            "Ditch the WhatsApp chaos and messy spreadsheets. Manage your leads, daily wagers, venue bookings, and quotations from one powerful ERP platform built specifically for Pakistan."
          )}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14"
        >
          <a
            href="#registration"
            className="h-14 px-8 rounded-xl bg-[#0F5B3E] hover:bg-[#0c4a32] text-white font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#0F5B3E]/20"
          >
            {isUrdu ? "Registration Shuru Krain" : "Join the Ecosystem"}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#simulator"
            className="h-14 px-8 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center text-sm font-bold backdrop-blur-sm"
          >
            {isUrdu ? "Live Demo Check Krain" : "Try Interactive Demo"}
          </a>
        </motion.div>

        {/* Highlight Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-bold"
        >
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" /> 
            {isUrdu ? "Koi Double Booking Nahi" : "Zero Double Bookings"}
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-lg">
            <Sparkles className="w-4 h-4 text-[#C9A227]" /> 
            {isUrdu ? "Smart WhatsApp Integration" : "WhatsApp Integrated"}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
