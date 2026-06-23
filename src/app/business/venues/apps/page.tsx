'use client';

import React from 'react';
import { AppWindow, ShieldCheck } from 'lucide-react';

export default function NexusDecoupledAppView() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans flex flex-col justify-center items-center p-6">
      <div className="max-w-sm w-full bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <AppWindow className="w-12 h-12 text-[#0F5B3E] mx-auto mb-4" />
        <h2 className="text-base font-black text-slate-800">Decoupled App Hub</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          Integrated tools have been optimized and centralized directly into your main B2B workspace interfaces.
        </p>
      </div>
    </div>
  );
}
