"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react'

export function ProblemSolution() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FDF8F0] px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Decorative luxury gold accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-gradient-to-b from-[#C5A880] to-transparent" />
      
      <div className="max-w-[1200px] mx-auto bg-[#0F5B3E] rounded-[2.5rem] p-8 md:p-16 text-center text-white relative shadow-xl overflow-hidden border border-[#D4AF37]/20">
        {/* Subtle background luxury motif overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[#D4AF37] border border-white/5 text-[9px] font-black uppercase tracking-widest rounded-full">
            <AlertCircle className="w-3.5 h-3.5" /> Overcome the Chaos
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black font-serif tracking-tight leading-tight">
            Planning a celebration?<br className="hidden sm:inline" />
            <span className="text-[#D4AF37] italic font-light font-serif">We know it's overwhelming.</span>
          </h2>
          
          <p className="text-slate-200 text-sm md:text-base leading-relaxed font-normal max-w-xl mx-auto">
            Coordinating multiple vendors, budgets, guest RSVPs, and traditional wedding milestones shouldn't feel like a full-time job. Nexus Heritage brings everything together in one unified, stress-free space.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/create-event" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#ebd0ab] text-neutral-950 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_8px_20px_rgba(212,175,55,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                Start Free <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            
            <Link href="/explore" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-white hover:bg-white/5 text-white rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer">
                Explore Marketplace
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
