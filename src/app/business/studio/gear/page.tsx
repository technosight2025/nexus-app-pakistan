'use client';

import React, { useState } from 'react';
import { Camera, ShieldCheck, ChevronLeft, ShieldAlert, Cpu, Layers, ToggleLeft, ToggleRight, CheckCircle } from 'lucide-react';

export default function NexusStudioGearInventory() {
  const [gear, setGear] = useState([
    { id: 'g01', name: 'Sony FX3 Cinema Camera', category: 'Camera Body', status: 'Deployed', assignedTo: 'Zeeshan (Lead Video)', condition: 'Optimal' },
    { id: 'g02', name: 'Sony a7R V Mirrorless', category: 'Camera Body', status: 'In Vault', assignedTo: 'None', condition: 'Optimal' },
    { id: 'g03', name: 'G Master 50mm f/1.2 Lens', category: 'Optics', status: 'Deployed', assignedTo: 'Amna (Candid Photo)', condition: 'Optimal' },
    { id: 'g04', name: 'DJI Mavic 3 Pro Drone', category: 'Aerial', status: 'Maintenance', assignedTo: 'None', condition: 'Calibrating Sensor' }
  ]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Structural Branding Header Bar Row */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-4 max-w-4xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <a href="/business/studio" className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </a>
          <div>
            <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Studio Production Core</span>
            <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Gear & Asset Inventory Matrix</h1>
          </div>
        </div>
        <div className="bg-white border border-[#C5A880]/30 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F5B3E]" /> System Calibrated
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Descriptive Hub Summary Deck */}
        <div className="bg-gradient-to-br from-[#0F5B3E] to-[#0A3F2B] text-[#FDFBF7] p-6 rounded-2xl border border-[#C5A880]/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-serif text-base font-black tracking-wide">Prevent Shoot Logistics Friction</h2>
            <p className="text-[11px] text-slate-200 max-w-xl leading-relaxed">
              Track and assign professional production equipment arrays. Real-time logging maps items directly against upcoming booking schedule requirements.
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-xl text-center shrink-0 min-w-[100px]">
            <span className="text-[9px] text-[#C5A880] uppercase tracking-widest font-black block">Active Assets</span>
            <span className="text-xl font-serif font-black text-white block mt-0.5">{gear.length} Nodes</span>
          </div>
        </div>

        {/* Detailed Inventory Ledger Row Cards Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-[#0F5B3E]" /> Hardware Logistics Logs
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {gear.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 group hover:border-[#0F5B3E]/20 transition-all">
                
                {/* Meta Descriptors Segment */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-500">
                      <Camera className="w-4 h-4 text-[#0F5B3E]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.category}</p>
                    </div>
                  </div>
                </div>

                {/* Tracking Metrics Sub-Deck Columns */}
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 text-xs font-medium text-slate-500">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Deployment Allocation</span>
                    <span className="text-slate-700 font-bold block mt-0.5">{item.assignedTo}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Hardware Integrity</span>
                    <span className="text-slate-700 font-bold block mt-0.5">{item.condition}</span>
                  </div>
                </div>

                {/* Operational Status Badging Ribbon */}
                <div className="flex items-center justify-end sm:justify-start">
                  <span className={`px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider border ${
                    item.status === 'Deployed' 
                      ? 'bg-amber-50 border-amber-200 text-amber-700' 
                      : item.status === 'In Vault'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-rose-50 border-rose-200 text-rose-700'
                  }`}>
                    {item.status}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
