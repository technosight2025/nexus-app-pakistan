'use client';

import React, { useState } from 'react';
import { Utensils, Users, ChevronLeft, Flame, Info, Scale, HelpCircle } from 'lucide-react';

export default function NexusDaigCalculator() {
  const [guests, setGuests] = useState<number>(150);
  const [menuType, setMenuType] = useState<'biryani' | 'pulao' | 'qorma'>('biryani');

  // Localized culinary math matrices: standard 1 Daig (Degh) safely serves 100 guests
  const calculateRequirements = () => {
    const daigCapacity = 100;
    const totalDaigs = Math.ceil(guests / daigCapacity);
    
    // Standard tier ratios per single traditional Pakistani degh
    let ricePerDaig = 0;
    let meatPerDaig = 0;

    if (menuType === 'biryani') {
      ricePerDaig = 12; // 12 KG Rice
      meatPerDaig = 12; // 12 KG Meat (1:1 Ratio)
    } else if (menuType === 'pulao') {
      ricePerDaig = 10; // 10 KG Rice
      meatPerDaig = 12; // 12 KG Meat
    } else {
      ricePerDaig = 0;
      meatPerDaig = 16; // 16 KG Meat for Qorma
    }

    return {
      daigs: totalDaigs,
      totalRice: ricePerDaig * totalDaigs,
      totalMeat: meatPerDaig * totalDaigs,
    };
  };

  const metrics = calculateRequirements();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Upper Navigation Row Bar */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-4 max-w-xl mx-auto w-full flex items-center gap-3">
        <a href="/" className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </a>
        <div>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Bespoke Utilities</span>
          <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Traditional Daig Calculator</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-[#0F5B3E] to-[#0A3F2B] text-[#FDFBF7] p-6 rounded-2xl border border-[#C5A880]/30 shadow-md space-y-2">
          <div className="bg-white/10 p-2 rounded-xl border border-white/10 w-fit text-[#C5A880]">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="font-serif text-lg font-black tracking-wide">Calculate Catering Math with Precision</h2>
          <p className="text-[11px] text-slate-200 leading-relaxed">
            Avoid inventory waste or shortages. Input your exact attendee allocations to calibrate raw ingredients matching classic heritage serving weights.
          </p>
        </div>

        {/* Form Inputs Grid Card */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-5 shadow-sm space-y-5">
          
          {/* Guest Allocation Slider Range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-black text-slate-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0F5B3E]" /> Estimated Attendance
              </label>
              <span className="font-black text-[#0F5B3E] bg-[#0F5B3E]/5 px-2.5 py-1 rounded-lg border border-[#0F5B3E]/10 text-xs">
                {guests} Persons
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="2000" 
              step="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0F5B3E]"
            />
            <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              <span>10 Min</span>
              <span>2,000 Max</span>
            </div>
          </div>

          {/* Recipe Type Matrix Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-[#0F5B3E]" /> Select Heritage Recipe Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['biryani', 'pulao', 'qorma'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMenuType(type)}
                  className={`py-2.5 rounded-xl border text-xs font-black capitalize tracking-wide transition-all ${
                    menuType === type
                      ? 'bg-[#0F5B3E] text-white border-[#0F5B3E] shadow-sm'
                      : 'bg-slate-50 border-slate-200/60 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Traditional Allocation Results Outputs Panel */}
        <div className="bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] border border-[#C5A880]/30 rounded-2xl p-5 space-y-4">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-[#0F5B3E]" /> Total Yield Assessment
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="bg-white p-4 rounded-xl border border-[#C5A880]/20 text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Required Deghs</span>
              <span className="text-xl font-serif font-black text-[#0F5B3E] block mt-1">{metrics.daigs} Daig</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#C5A880]/20 text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Total Raw Meat</span>
              <span className="text-xl font-serif font-black text-slate-800 block mt-1">
                {metrics.totalMeat > 0 ? `${metrics.totalMeat} KG` : 'N/A'}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#C5A880]/20 text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block">Total Basmati Rice</span>
              <span className="text-xl font-serif font-black text-slate-800 block mt-1">
                {metrics.totalRice > 0 ? `${metrics.totalRice} KG` : '0 KG'}
              </span>
            </div>

          </div>

          <div className="bg-white/50 border border-amber-200/40 rounded-xl p-3 flex gap-2 items-start text-[10px] text-amber-900 font-medium leading-relaxed">
            <Info className="w-3.5 h-3.5 text-[#0F5B3E] shrink-0 mt-0.5" />
            <p>Ratios adjust matching standard 12kg rice / 12kg meat recipe limits per degh cluster. Actual ingredient distributions might vary depending on vendor spice profiles.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
