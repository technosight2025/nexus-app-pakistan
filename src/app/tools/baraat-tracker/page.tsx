'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, Share2, ChevronLeft, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

export default function NexusBaraatTracker() {
  const [distance, setDistance] = useState<number>(8.4);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Simulate progress decrement over time to reflect a live convoy vehicle moving
  useEffect(() => {
    let interval: any;
    if (isSimulating && distance > 0.1) {
      interval = setInterval(() => {
        setDistance((prev) => parseFloat((prev - 0.2).toFixed(1)));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, distance]);

  const handleShareLink = () => {
    const mockTrackingUrl = typeof window !== 'undefined' ? `${window.location.origin}/tools/baraat-tracker?live=true` : '';
    navigator.clipboard.writeText(mockTrackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Quick routing hook to open WhatsApp directly with pre-filled premium messaging format
    const whatsappText = encodeURIComponent(`Assalam-o-Alaikum! Follow our wedding convoy (Baraat) arrival route live on the Nexus ecosystem network map here: ${mockTrackingUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${whatsappText}`, '_blank');
  };

  const calculatedEta = Math.ceil(distance * 2.5); // Metric calculation rule matching local traffic standards

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Premium Minimal Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-4 max-w-xl mx-auto w-full flex items-center gap-3">
        <a href="/" className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </a>
        <div>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Live Logistics Utilities</span>
          <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Convoy Baraat Tracker</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Real-time Map Simulation HUD Interface */}
        <div className="relative bg-slate-100 h-[260px] rounded-2xl overflow-hidden border border-[#C5A880]/30 shadow-inner group">
          {/* Conceptual vector-grid aesthetic mapping out local coordinate patterns */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0F5B3E_1px,transparent_1px),linear-gradient(to_bottom,#0F5B3E_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Static Route Vector Vector Path Indicator */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M 50 200 Q 200 100, 350 70" fill="none" stroke="#C5A880" strokeWidth="4" strokeDasharray="6,6" className="animate-pulse" />
          </svg>

          {/* Destination Node: Venue Pin Marker */}
          <div className="absolute top-[60px] right-[120px] bg-white border border-[#0F5B3E] px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1.5 z-10 animate-bounce">
            <MapPin className="w-3.5 h-3.5 text-[#0F5B3E] fill-[#0F5B3E]/10" />
            <span className="text-[10px] font-black text-slate-800">Wedding Venue</span>
          </div>

          {/* Origin Node: Moving Convoy Indicator Avatar */}
          <div 
            className="absolute bg-[#0F5B3E] text-white p-2.5 rounded-full shadow-lg border-2 border-white transition-all duration-1000 ease-in-out"
            style={{
              bottom: `${Math.min(180, 50 + (9 - distance) * 15)}px`,
              left: `${Math.min(320, 50 + (9 - distance) * 28)}px`,
            }}
          >
            <Car className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200/60 px-2.5 py-1 rounded-lg text-[9px] font-bold text-slate-500 flex items-center gap-1">
            <RefreshCw className={`w-3 h-3 text-[#0F5B3E] ${isSimulating ? 'animate-spin' : ''}`} />
            Live satellite localization node synchronization active
          </div>
        </div>

        {/* Operational Realtime Status Deck Metric Matrix */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-5 shadow-sm grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
            <Clock className="w-5 h-5 text-[#0F5B3E] mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Estimated Arrival</span>
            <span className="text-lg font-serif font-black text-slate-900 block mt-0.5">{distance > 0.1 ? `${calculatedEta} Mins` : 'Arrived'}</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
            <Navigation className="w-5 h-5 text-[#0F5B3E] mx-auto mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Remaining Proximity</span>
            <span className="text-lg font-serif font-black text-slate-900 block mt-0.5">{distance > 0.1 ? `${distance} KM` : '0.0 KM'}</span>
          </div>
        </div>

        {/* Dynamic Action Trigger Panel Suite */}
        <div className="bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] border border-[#C5A880]/30 rounded-2xl p-5 text-center space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-black text-slate-900">Broadcasting & Coordination Switch</h3>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
              Generate a client-side localized webhook token payload link to dispatch your current arrival metrics directly across family WhatsApp groups.
            </p>
          </div>

          <button
            type="button"
            onClick={handleShareLink}
            className="w-full sm:w-auto bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white font-black text-xs px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <Share2 className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
            {copied ? 'Link Copied to Clipboard!' : 'Share Convoy Path on WhatsApp'}
          </button>

          <div className="pt-2 border-t border-[#C5A880]/20 flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#0F5B3E]" /> Protected under Nexus Core Guardrails
          </div>
        </div>

      </main>
    </div>
  );
}
