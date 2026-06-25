'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Building, Award, Sparkles } from 'lucide-react';

export default function FullyModernizedNexusLanding() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans antialiased text-slate-200 bg-[#050706]">
      
      {/* 🌌 High-End Ambient Lighting Ring Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-500/10 via-[#C5A880]/5 to-transparent pointer-events-none z-0 blur-[130px]" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent pointer-events-none z-0 blur-[100px]" />

      {/* 🧭 Luxury Glassmorphic Header */}
      <header className="relative z-30 max-w-7xl mx-auto px-8 py-6 flex justify-between items-center border-b border-white/5 bg-[#050706]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-xl font-serif font-black tracking-[0.2em] text-white">
            NEXUS
          </span>
          <span className="text-[8px] tracking-widest uppercase font-black text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded bg-[#D4AF37]/5">
            HERITAGE
          </span>
        </div>
        
        {/* Subtle Cyber-Luxury Status Pill */}
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <span className="inline-flex items-center gap-2 text-slate-400 text-[9px] bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-[0.15em] font-bold">SYSTEM ACTIVE</span>
          </span>
        </div>
      </header>

      {/* 🏛️ Grand Hero Whitespace Architecture */}
      <section className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-36 pb-20 sm:pt-44 sm:pb-24 flex flex-col items-center justify-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-slate-300">
            The Luxury Standard for Pakistani Events
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight leading-[1.15] text-white max-w-4xl mx-auto">
          Architecting Elite Celebrations <br />
          <span className="font-serif italic font-light bg-gradient-to-r from-[#F0D3A2] via-[#D4AF37] to-[#FAF5EC] bg-clip-text text-transparent">
            With Sovereign Precision
          </span>
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide">
          Connecting high-net-worth families with premier heritage venues, elite cinematic studios, and tailored event workflows across Pakistan.
        </p>
        
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent mx-auto pt-4" />
      </section>

      {/* 🗂️ Unified Symmetrical Interactive Card Grid */}
      <main className="relative z-20 max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6 pb-32">
        
        {/* CARD 1: B2C Client Portal */}
        <Link 
          href="/wizard"
          className="min-h-[410px] flex flex-col justify-between bg-[#0B110E] border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
          
          <div className="space-y-6 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner shrink-0 group-hover:text-emerald-400 group-hover:bg-emerald-500/5 transition-all duration-300">
              <Compass className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase block">B2C Portal</span>
              <h3 className="font-serif text-xl font-medium text-white transition-colors group-hover:text-emerald-400">Launch Event Wizard</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Configure your seasonal marriage profile specs, map out guest capacities, and dynamically discover vetted local elite partners.
              </p>
            </div>
          </div>
          <div className="pt-6 relative z-10">
            <div className="w-full bg-emerald-600 group-hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 whitespace-nowrap">
              Start Designing <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </div>
        </Link>

        {/* CARD 2: B2B Venue Management Suite */}
        <Link 
          href="/business/venues/dashboard"
          className="min-h-[410px] flex flex-col justify-between bg-[#0B110E] border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
          
          <div className="space-y-6 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner shrink-0 group-hover:text-emerald-400 group-hover:bg-emerald-500/5 transition-all duration-300">
              <Building className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase block">B2B Management</span>
              <h3 className="font-serif text-xl font-medium text-white transition-colors group-hover:text-emerald-400">Marquee Operations</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Monitor live seasonal utilization curves, block out dates manually, enforce client contracts, and audit financial yield matrices.
              </p>
            </div>
          </div>
          <div className="pt-6 relative z-10">
            <div className="w-full bg-white group-hover:bg-slate-100 text-slate-950 text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md whitespace-nowrap">
              Enter Corporate Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </div>
        </Link>

        {/* CARD 3: Specialists Network / Artisan Wire */}
        <button 
          type="button"
          onClick={() => alert("Artisan wire setup dashboard initialization step processing under next milestone cycle.")}
          className="min-h-[410px] flex flex-col justify-between bg-[#0B110E] border border-white/5 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/40 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
          
          <div className="space-y-6 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner shrink-0 group-hover:text-emerald-400 group-hover:bg-emerald-500/5 transition-all duration-300">
              <Award className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase block">Specialists Network</span>
              <h3 className="font-serif text-xl font-medium text-white transition-colors group-hover:text-emerald-400">Artisan Console</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Position your media studio craft inside our verified search grids, review user feedback arrays, and lock live assignment payouts.
              </p>
            </div>
          </div>
          <div className="pt-6 w-full relative z-10">
            <div className="w-full bg-slate-900 group-hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md whitespace-nowrap">
              Access Artisan Wire <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </div>
        </button>

      </main>

      {/* Soft Faded Modern Accent Line */}
      <div className="max-w-6xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
