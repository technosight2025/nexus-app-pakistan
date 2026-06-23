import React from 'react';
import { Menu, User, Sparkles, Building2, Palette, ShieldCheck, HeartPulse, ChevronRight } from 'lucide-react';

export default function NexusLuxuryHomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-16 selection:bg-[#0F5B3E]/10">
      
      {/* 1. MINIMALIST LUXURY NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-3.5 flex justify-between items-center max-w-5xl mx-auto w-full">
        <button className="p-2 text-slate-600 hover:text-[#0F5B3E] transition-colors rounded-full hover:bg-slate-100">
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-[20px] font-serif font-black tracking-wide text-[#0F5B3E]">Nexus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 border border-[#C5A880]/30 rounded-full bg-white shadow-sm">
            <User className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </header>

      {/* MAIN HERO LEADER INTRO */}
      <main className="max-w-md mx-auto px-4 mt-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#C5A880] bg-[#C5A880]/10 px-2.5 py-1 rounded-full">Elite Event Ecosystem</span>
          <h2 className="text-2xl font-serif font-black tracking-tight text-slate-900 leading-tight">Welcome to the Gateway of Premium Planning</h2>
          <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">Select your specialized portal pathway below to enter the live Nexus network loop.</p>
        </div>

        {/* 2. THE THREE-SECTION INDIVIDUAL ENTRY GATEWAYS */}
        <div className="space-y-4">
          
          {/* CARD A: THE HOST ENTRY */}
          <a href="/start-planning" className="block bg-gradient-to-br from-[#0F5B3E] to-[#0A3F2B] text-[#FDFBF7] rounded-2xl p-6 shadow-md border border-[#C5A880]/30 hover:scale-[1.01] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="bg-white/10 w-fit p-2.5 rounded-xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-black tracking-wide">Curate Your Dream Event</h3>
                  <p className="text-[11px] text-slate-200 font-medium mt-0.5 leading-relaxed">Access customized digital invitations, real-time budgeting ledgers, and secure family vaults.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C5A880] mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C5A880]">Enter as Host</span>
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">B2C Surface</span>
            </div>
          </a>

          {/* CARD B: VENUES & VENDORS */}
          <a href="/business" className="block bg-white text-slate-800 rounded-2xl p-6 shadow-sm border border-[#C5A880]/20 hover:border-[#0F5B3E]/30 hover:scale-[1.01] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="bg-[#0F5B3E]/5 w-fit p-2.5 rounded-xl border border-[#0F5B3E]/10">
                  <Building2 className="w-5 h-5 text-[#0F5B3E]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-black tracking-wide text-slate-900">The Corporate Elite Network</h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-relaxed">Manage marquee schedules, track client deposits, and review operations logs with zero conflict paths.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#0F5B3E] mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5B3E]">Enter Venue Suite</span>
              <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">B2B SaaS</span>
            </div>
          </a>

          {/* CARD C: INDEPENDENT ARTISANS */}
          <a href="/business/workforce" className="block bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] text-slate-800 rounded-2xl p-6 shadow-sm border border-[#C5A880]/30 hover:scale-[1.01] transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="bg-white w-fit p-2.5 rounded-xl border border-[#C5A880]/30 shadow-sm">
                  <Palette className="w-5 h-5 text-[#0F5B3E]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-black tracking-wide text-slate-900">Bespoke Heritage Talent</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">Position your artistic craft, makeup lookbooks, or calligraphy alongside premier boutique brands.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#0F5B3E] mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-4 pt-4 border-t border-[#C5A880]/20 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5B3E]">Enter Artisan Portal</span>
              <span className="text-[9px] bg-white/60 px-2 py-0.5 rounded text-amber-800 font-bold border border-amber-200/40">Specialists</span>
            </div>
          </a>

        </div>

        {/* 3. FIXED PIXEL-PERFECT HERITAGE VAULT SUB-SYSTEM */}
        <div className="space-y-3 pt-4 border-t border-[#C5A880]/20">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest font-serif">Nexus Heritage Hub</h4>
          
          <div className="bg-white/80 border border-[#C5A880]/30 rounded-2xl p-4 shadow-sm flex items-center gap-4 border-l-4 border-l-[#C5A880]">
            <div className="p-2.5 bg-[#0F5B3E]/5 border border-[#0F5B3E]/10 rounded-xl text-[#0F5B3E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-800">Nexus Legacy Vault</h5>
              <p className="text-[10px] text-slate-400 font-medium">Preserve family records with military-grade storage policies.</p>
            </div>
          </div>

          <div className="bg-white/80 border border-[#C5A880]/30 rounded-2xl p-4 shadow-sm flex items-center gap-4 border-l-4 border-l-[#C5A880]">
            <div className="p-2.5 bg-[#0F5B3E]/5 border border-[#0F5B3E]/10 rounded-xl text-[#0F5B3E]">
              <HeartPulse className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-800">Family Health Vault</h5>
              <p className="text-[10px] text-slate-400 font-medium">Secure family wellness ledgers across generations seamlessly.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
