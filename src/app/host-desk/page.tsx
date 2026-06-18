"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowUpRight, MessageSquare, Utensils, Wallet, MapPin, 
  Users, Languages
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type PaletteType = 'dark' | 'light';

export default function HostDeskPage() {
  const router = useRouter();
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage();
  const [palette, setPalette] = useState<PaletteType>('dark');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Theme configuration matching brand identity
  const activeBg = palette === 'dark' ? 'bg-[#050505]' : 'bg-[#EBDDB9]';
  const activeText = palette === 'dark' ? 'text-white' : 'text-[#050505]';
  const activeSubText = palette === 'dark' ? 'text-white/60' : 'text-[#050505]/70';
  const borderCol = palette === 'dark' ? 'border-white/10' : 'border-[#050505]/10';
  const accentText = palette === 'dark' ? 'text-[#C5A059]' : 'text-[#856633]';
  const cardBg = palette === 'dark' ? 'bg-[#0f0f0f]/90 hover:bg-[#121212]' : 'bg-[#FAF6ED]/70 hover:bg-[#FAF6ED]';
  const btnBg = palette === 'dark' ? 'bg-[#C5A059] text-black hover:bg-[#b08e4e]' : 'bg-[#050505] text-white hover:bg-[#1b1b1b]';

  return (
    <div className={`min-h-screen ${activeBg} ${activeText} font-sans antialiased transition-colors duration-500 relative overflow-hidden flex flex-col justify-between`}>
      
      {/* Decorative aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#C5A059]/3 blur-[120px] pointer-events-none" />
      </div>

      {/* Header bar */}
      <header className={`z-10 border-b ${borderCol} py-4 px-6 md:px-12 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className={`p-2 rounded-xl border ${borderCol} hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer`}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className={`text-2xl font-serif tracking-widest font-bold ${accentText}`}>NK</span>
          </div>

          <div className="flex items-center gap-4">
            {/* English / Urdu Toggle Button */}
            <button
              onClick={() => setIsRomanUrdu(!isRomanUrdu)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black tracking-wider uppercase rounded-full transition-all border cursor-pointer select-none ${
                palette === 'dark' 
                  ? 'border-white/10 text-white hover:bg-white/5 bg-white/5' 
                  : 'border-[#050505]/15 text-[#050505] hover:bg-black/5 bg-black/5'
              }`}
              title={isRomanUrdu ? "Switch to English" : "Urdu mein tabdeel karain"}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isRomanUrdu ? "Urdu" : "EN"}</span>
            </button>

            {/* Palettes Selector Widget */}
            <div className={`flex items-center gap-3 bg-black/20 px-3.5 py-1.5 rounded-full border ${borderCol} text-[10px] font-bold tracking-wider font-mono`}>
              <span className="opacity-50">PALETTES:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPalette('dark')}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    palette === 'dark' 
                      ? 'border border-[#C5A059] text-white' 
                      : 'border border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => setPalette('light')}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                    palette === 'light' 
                      ? 'border border-[#856633] text-black' 
                      : 'border border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Light</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10 w-full flex-grow flex flex-col justify-center gap-12 md:gap-16">
        
        {/* Title area */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className={`text-[10px] font-black tracking-[0.3em] uppercase ${accentText}`}>{isRomanUrdu ? "GATEWAY SYSTEM" : "THE ECOSYSTEM GATEWAY"}</span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight font-medium">
            Host Desk Operations Control
          </h1>
          <p className={`${activeSubText} text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light`}>
            {isRomanUrdu 
              ? "Family ke liye banaye gaye is ek platform par contracts manage karain, daig ka andaza lagayein, baraat track karain aur salami ka hisab rakhain." 
              : "Coordinate milestone contracts, calculate portion supply runs, track guest convoys, and manage gift splits inside a unified workspace designed for families."}
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
          {[
            {
              title: "AI Shaadi Planner",
              description: isRomanUrdu 
                ? "RSVPs khudkar banayein, seating plan set karain aur shaadi ke checklists ke liye hamare AI assistant se baat karain." 
                : "Automate RSVPs, suggest seating charts, and chat with our localized AI assistant regarding wedding prep checklists.",
              icon: <MessageSquare className="w-5 h-5" />,
              badge: "Shaadi AI",
              actionText: isRomanUrdu ? "Chat shuru karain" : "Chat Assistant",
              action: () => router.push("/ai-planner")
            },
            {
              title: isRomanUrdu ? "Daig Portion Calculator" : "Cauldron Daig Estimator",
              description: isRomanUrdu 
                ? "Khaane ka zaya rokhain. Mehmaano ki tadad ke hisab se daig aur masalajaat ka andaza lagayein." 
                : "Prevent food waste or shortages. Calculate cauldron count and ingredient portions by dish and guest size.",
              icon: <Utensils className="w-5 h-5" />,
              badge: "Catering Utility",
              actionText: isRomanUrdu ? "Calculator kholain" : "Open Calculator",
              action: () => router.push("/tools/catering")
            },
            {
              title: isRomanUrdu ? "Salami Ledger" : "Salami Ledger Splits",
              description: isRomanUrdu 
                ? "Salami cash ka record rakhain, tracking sheets print karain aur digital hisab manage karain." 
                : "Record traditional Salami cash gifts, print tracking sheets, and manage secure digital share splits.",
              icon: <Wallet className="w-5 h-5" />,
              badge: "Ledger SaaS",
              actionText: isRomanUrdu ? "Ledger manage karain" : "Manage Ledger",
              action: () => router.push("/tools/salami")
            },
            {
              title: isRomanUrdu ? "Baraat Caravan GPS" : "Baraat Caravan GPS",
              description: isRomanUrdu 
                ? "Baraat ke convoy routes set karain, mehmaano ke pohnchne ka time dekhain aur raste ki rukawat se bachain." 
                : "Set up convoy routes, monitor guest arrival times, and avoid navigation delays in busy wedding halls.",
              icon: <MapPin className="w-5 h-5" />,
              badge: "Caravan Live",
              actionText: isRomanUrdu ? "Baraat track karain" : "Track Convoys",
              action: () => router.push("/tools/gps")
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-6 rounded-[2rem] border ${borderCol} ${cardBg} transition-all duration-300 flex flex-col justify-between shadow-md group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${
                    palette === 'dark' ? 'bg-[#1a160e] text-[#C5A059]' : 'bg-[#EBDDB9]/50 text-[#856633]'
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    palette === 'dark' ? 'bg-white/5 text-white/60' : 'bg-black/5 text-[#050505]/60'
                  }`}>
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-sm font-serif font-bold group-hover:text-[#C5A059] transition-colors">{item.title}</h3>
                  <p className={`text-[11px] leading-relaxed font-light ${
                    palette === 'dark' ? 'text-white/60' : 'text-[#050505]/70'
                  }`}>{item.description}</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={item.action}
                  className={`w-full py-2.5 px-4 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    palette === 'dark' 
                      ? 'bg-white/5 hover:bg-[#C5A059] hover:text-black text-white' 
                      : 'bg-[#050505]/5 hover:bg-[#C5A059] hover:text-black text-[#050505]'
                  }`}
                >
                  <span>{item.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Dashboard Portal */}
        <div className={`max-w-xl mx-auto rounded-[2rem] p-8 border ${borderCol} ${
          palette === 'dark' ? 'bg-white/[0.01]' : 'bg-white/40'
        } text-center space-y-6 shadow-xl`}>
          <div className="space-y-2">
            <h2 className="text-lg font-serif font-bold">{isRomanUrdu ? "Apna event manage karne ke liye tayyar hain?" : "Ready to manage your active event?"}</h2>
            <p className={`text-[11px] leading-relaxed max-w-sm mx-auto font-light ${activeSubText}`}>
              {isRomanUrdu 
                ? "Budget manager, vendor quotes, guest list aur timeline planners tak rasai haasil karain." 
                : "Access complete budget managers, vendor quote sheets, guest RSVP ledgers, and timeline planners."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button 
              onClick={() => router.push("/dashboard/host")}
              className={`py-3 px-8 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer ${btnBg}`}
            >
              {isRomanUrdu ? "Dashboard Portal mein jayein" : "Enter Dashboard Portal"}
            </button>
            <button 
              onClick={() => router.push("/#register")}
              className={`py-3 px-8 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${borderCol} hover:bg-white/5 cursor-pointer`}
            >
              {isRomanUrdu ? "Naya Event Register karain" : "Register New Event"}
            </button>
          </div>
        </div>

      </main>

      {/* Footer bar */}
      <footer className={`z-10 border-t ${borderCol} py-6 px-6 text-center text-[10px] text-slate-400 font-light`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>{isRomanUrdu ? "NEXUS PLATFORM SHAADI-OS © 2026. TAMAM HAQOOQ MEHFOOZ HAIN." : "NEXUS PLATFORM SHAADI-OS © 2026. ALL RIGHTS RESERVED."}</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Ecosystem</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
