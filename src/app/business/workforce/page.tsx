'use client';

import React from 'react';
import { Briefcase, ShieldCheck, Users, UsersRound } from 'lucide-react';

export default function NexusB2BWorkforceWorkspace() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans pb-12">
      
      {/* Upper B2B Workspace Header */}
      <header className="sticky top-0 z-50 bg-[#0F5B3E] text-[#FAF7F2] border-b border-[#D4AF37]/40 p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4AF37]/20 p-2 rounded-xl border border-[#D4AF37]/40">
            <Briefcase className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Nexus Ecosystem</span>
            <h1 className="text-base font-black tracking-tight">WORKFORCE & STAFF OPERATIONS</h1>
          </div>
        </div>
        <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Workforce Active
        </div>
      </header>

      {/* Main Structural Layout */}
      <main className="max-w-4xl mx-auto px-4 mt-12 text-center space-y-4">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <UsersRound className="w-12 h-12 text-[#0F5B3E] mx-auto mb-4" />
          <h2 className="text-base font-black text-slate-800">Decoupled Team Allocations</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            On-site tracking, field coordination, and operational crew scheduling parameters are fully partitioned here to protect build pipeline performance metrics.
          </p>
        </div>
      </main>

    </div>
  );
}
