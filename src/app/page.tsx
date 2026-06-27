"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Store, 
  Camera, 
  Globe,
  Calendar,
  Users,
  Utensils,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { PlanYourEventSection } from '@/components/home/PlanYourEventSection';
import { HomeEntryCards } from '@/components/home/HomeEntryCards';
import { HomeCategoryChips } from '@/components/home/HomeCategoryChips';
import { HomeExploreHeader } from '@/components/layout/HomeExploreHeader';
import { ExploreEntryPoint } from '@/components/home/ExploreEntryPoint';

// Simulated Live Action Log
interface LiveLog {
  id: number;
  time: string;
  type: 'rsvp' | 'invoice' | 'ai' | 'invite';
  textEN: string;
  textRU: string;
}

const INITIAL_LOGS: LiveLog[] = [
  { id: 1, time: '12s ago', type: 'rsvp', textEN: 'Guest RSVP: Ayesha & Bilal Baraat (+4 guests)', textRU: 'Mehman RSVP: Ayesha aur Bilal Baraat (+4 mehman)' },
  { id: 2, time: '28s ago', type: 'invoice', textEN: 'Vendor Deposit: Paid to Royal Palm Banquet', textRU: 'Vendor Adayeigi: Royal Palm Banquet ko advance paid' },
  { id: 3, time: '1m ago', type: 'ai', textEN: 'AI Concierge: Generated seating layout for Mehndi', textRU: 'AI Concierge: Mehndi ka seating layout tayyar' },
  { id: 4, time: '2m ago', type: 'invite', textEN: 'Invitation Opened: 42 guest links delivered via WhatsApp', textRU: 'Dawat Nama Open: 42 link WhatsApp par delivered' },
];

export default function HomePage() {
  const { isRomanUrdu } = useLanguage();
  const [logs, setLogs] = useState<LiveLog[]>(INITIAL_LOGS);
  const [guestsCount, setGuestsCount] = useState<number>(300);

  // Auto-update simulated logs
  useEffect(() => {
    const interval = setInterval(() => {
      const types: ('rsvp' | 'invoice' | 'ai' | 'invite')[] = ['rsvp', 'invoice', 'ai', 'invite'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newLog: LiveLog = {
        id: Date.now(),
        time: 'Just now',
        type: randomType,
        textEN: getRandomLogText(randomType, false),
        textRU: getRandomLogText(randomType, true),
      };

      setLogs(prev => [newLog, ...prev.slice(0, 3)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const getRandomLogText = (type: string, isUrdu: boolean) => {
    if (type === 'rsvp') {
      return isUrdu ? 'Zainab & Ali ne Walima RSVP confirm kar diya' : 'Zainab & Ali confirmed Walima RSVP';
    }
    if (type === 'invoice') {
      return isUrdu ? 'Catering advanced approved (Lakh 1.8)' : 'Catering advance approved (PKR 180,000)';
    }
    if (type === 'ai') {
      return isUrdu ? 'AI Planner: 12 dynamic tasks populate ho chukay hain' : 'AI Planner: 12 dynamic tasks populated';
    }
    return isUrdu ? 'Mehndi dawat nama digital view update' : 'Mehndi digital invitation updated';
  };

  // Pakistani Catering Daig Calculator formulas
  const calculateDaigs = (guests: number) => {
    // Standard rule: 1 Daig of Biryani/Pulao (10kg rice + 10kg meat) serves 80-100 guests
    const biryaniDaigs = Math.ceil(guests / 80);
    // Qorma: serves ~100 guests per Daig
    const qormaDaigs = Math.ceil(guests / 100);
    return { biryani: biryaniDaigs, qorma: qormaDaigs };
  };

  const daigStats = calculateDaigs(guestsCount);

  return (
    <div className="w-full bg-[#FCFBF9] min-h-screen font-sans pb-0 antialiased selection:bg-neutral-100">
      
      {/* 1. GLOBAL EXPLORE-STYLE HEADER */}
      <HomeExploreHeader />

      {/* 2. SERIF TYPOGRAPHY HERO & LIVE OS DISPLAY */}
      <div className="relative w-full bg-[#FCFBF9] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-neutral-150">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 block mb-6">
              {isRomanUrdu ? "PAKISTAN KA SHAHEEN EVENT OS" : "PAKISTAN'S PREMIER EVENT OS"}
            </span>
            
            <h1 className="font-serif text-6xl md:text-8xl font-black text-neutral-900 tracking-tighter leading-[0.95] mb-8">
              Orchestrate.<br />
              Host.<br />
              <span className="font-light italic text-neutral-450 text-neutral-400">Remember.</span>
            </h1>

            <p className="text-neutral-500 text-base md:text-lg font-normal mb-10 max-w-xl leading-relaxed">
              {isRomanUrdu 
                ? "Bespoke digital architecture. Marquees, premium artisans aur complete planning systems ko aik unified, state-of-the-art canvas par chalain."
                : "Bespoke digital architecture for Pakistan's finest celebrations. Run elite venues, legendary artisans, and comprehensive planning workflows on a single canvas."}
            </p>

            {/* Direct Search Trigger */}
            <div className="w-full max-w-xl">
              <Link href="/explore" className="block">
                <div className="flex items-center w-full bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-300 rounded-2xl p-4 cursor-pointer shadow-3xs">
                  <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                  <span className="text-neutral-400 text-sm font-normal">
                    {isRomanUrdu ? "Marquees, photographers ya services dhundein..." : "Search venues, photographers, caterers..."}
                  </span>
                  <div className="ml-auto bg-neutral-950 text-white rounded-xl px-5 py-1.5 text-xs font-bold uppercase tracking-wider">
                    {isRomanUrdu ? "Talash" : "Search"}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Event OS Simulation Feed */}
          <div className="lg:col-span-5 relative w-full bg-neutral-950 rounded-[2rem] p-6 md:p-8 border border-neutral-800 shadow-xl overflow-hidden text-white flex flex-col justify-between min-h-[420px]">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
            
            {/* Header of Console */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">NEXUS LIVE LEDGER</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500">SYSTEM: ACTIVE</span>
              </div>

              {/* Feed logs */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      layout
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="p-3 bg-neutral-900/60 border border-neutral-850 rounded-xl flex items-start justify-between gap-4"
                    >
                      <div className="flex gap-3 items-start">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          log.type === 'rsvp' ? 'bg-[#FF385C]' :
                          log.type === 'invoice' ? 'bg-[#C5A880]' :
                          log.type === 'ai' ? 'bg-indigo-400' : 'bg-emerald-400'
                        }`} />
                        <div className="text-[12.5px] font-medium leading-tight text-neutral-250">
                          {isRomanUrdu ? log.textRU : log.textEN}
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-neutral-500 whitespace-nowrap">{log.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Simulated Live Analytics Bar */}
            <div className="pt-6 border-t border-neutral-800 mt-6 flex justify-between items-center text-xs font-mono text-neutral-400">
              <div>
                <span className="block text-[10px] text-neutral-500 uppercase">Total Guests</span>
                <span className="text-white font-bold">{guestsCount} registered</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-neutral-500 uppercase">RSVP Rate</span>
                <span className="text-emerald-400 font-bold">92.4%</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. CONTINUOUS TEXT TICKER */}
      <div className="w-full bg-neutral-950 py-4 overflow-hidden border-y border-neutral-800 flex items-center relative z-20">
        <div className="animate-[marquee_35s_linear_infinite] whitespace-nowrap flex gap-12 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-neutral-400">
          <span>Dholki Night</span>
          <span className="text-neutral-600">•</span>
          <span>Baraat Arrival</span>
          <span className="text-neutral-600">•</span>
          <span>Mehndi Dance Offs</span>
          <span className="text-neutral-600">•</span>
          <span>Traditional Daig Catering</span>
          <span className="text-neutral-600">•</span>
          <span>Valima Reception</span>
          <span className="text-neutral-600">•</span>
          <span>Qawwali Session</span>
          <span className="text-neutral-600">•</span>
          <span>Cinematography Setup</span>
          <span className="text-neutral-600">•</span>
          <span>Digital Guest Cards</span>
          <span className="text-neutral-600">•</span>
          <span>Dholki Night</span>
          <span className="text-neutral-600">•</span>
          <span>Baraat Arrival</span>
          <span className="text-neutral-600">•</span>
          <span>Mehndi Dance Offs</span>
          <span className="text-neutral-600">•</span>
          <span>Traditional Daig Catering</span>
          <span className="text-neutral-600">•</span>
          <span>Valima Reception</span>
        </div>
      </div>

      {/* 4. QUICK ENTRY CARDS */}
      <HomeEntryCards />

      {/* 5. CATEGORY CHIPS */}
      <HomeCategoryChips />

      {/* NEW EXPLORE ENTRY POINT */}
      <ExploreEntryPoint />

      {/* 6. WIDGET BENTO & EVENT OS ESTIMATORS */}
      <div className="max-w-[1400px] mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)] relative z-40">
        
        {/* Bento Cell 1: Interactive Daig & Catering Calculator (Pakistani Specific) */}
        <div className="md:col-span-12 lg:col-span-6 bg-white border border-neutral-100 hover:border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100">
                <Utensils className="w-5 h-5 text-neutral-800" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-450 text-neutral-400 block">Ecosystem tool</span>
                <h4 className="font-serif text-xl font-black text-neutral-900">
                  {isRomanUrdu ? "Catering Calculator" : "Daig & Catering Estimator"}
                </h4>
              </div>
            </div>

            <p className="text-neutral-500 text-xs font-normal mb-6 max-w-md">
              {isRomanUrdu 
                ? "Guest count ko tabdeel karain aur dekhein ke event ke liye kitni daigo ki zaroorat paray gi."
                : "Adjust the guest size slider to instantly calculate Pakistani catering requirements (Daigs) for Biryani and Qorma."}
            </p>

            {/* Slider */}
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 mb-6">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-bold text-neutral-600">Expected Guests</span>
                <span className="text-lg font-black text-neutral-900">{guestsCount} guests</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="25"
                value={guestsCount} 
                onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
              />
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-center">
              <span className="font-mono text-[9px] text-neutral-400 uppercase block mb-1">Biryani/Pulao Daigs</span>
              <span className="text-2xl font-black text-neutral-900">{daigStats.biryani} Daigs</span>
              <span className="text-[10px] text-neutral-400 block mt-1">(10kg rice base)</span>
            </div>
            <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-center">
              <span className="font-mono text-[9px] text-neutral-400 uppercase block mb-1">Qorma/Salan Daigs</span>
              <span className="text-2xl font-black text-neutral-900">{daigStats.qorma} Daigs</span>
              <span className="text-[10px] text-neutral-400 block mt-1">(10kg meat base)</span>
            </div>
          </div>
        </div>

        {/* Bento Cell 2: Elite Venues (Span 6 Cols) */}
        <div className="md:col-span-12 lg:col-span-6 bg-white border border-neutral-100 hover:border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-2xl font-black font-serif text-neutral-900 tracking-tight">Elite Venues</h3>
            <Link href="/venues" className="text-xs font-black uppercase tracking-wider text-neutral-900 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <Link href="/venues/l-1" className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-neutral-900 transition-all duration-350">
              <div className="relative h-36 overflow-hidden shrink-0 bg-neutral-50">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop" alt="The Royal Palms" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-3 left-3 bg-white/95 border border-neutral-100 px-2 py-0.5 rounded-full text-[8px] font-black text-neutral-800 tracking-wider uppercase">Premium</div>
              </div>
              <div className="p-3">
                <h4 className="font-black font-serif text-neutral-900 text-sm mb-1 leading-snug">The Royal Palms</h4>
                <p className="text-[10px] text-neutral-400 font-bold">PKR 450,000 / day</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/venues/l-2" className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-neutral-900 transition-all duration-350">
              <div className="relative h-36 overflow-hidden shrink-0 bg-neutral-50">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" alt="Nishat Hotel" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-3 left-3 bg-white/95 border border-neutral-100 px-2 py-0.5 rounded-full text-[8px] font-black text-neutral-800 tracking-wider uppercase">Luxury</div>
              </div>
              <div className="p-3">
                <h4 className="font-black font-serif text-neutral-900 text-sm mb-1 leading-snug">The Nishat Banquets</h4>
                <p className="text-[10px] text-neutral-400 font-bold">PKR 850,000 / day</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Bento Cell 3: Business Partnering (Left) */}
        <div className="md:col-span-6 bg-white border border-neutral-100 hover:border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block mb-2">OPERATORS</span>
            <h4 className="font-serif text-2xl font-black text-neutral-900 mb-2 leading-tight">Elite Marquee OS</h4>
            <p className="text-neutral-500 text-xs font-normal mb-6">
              Complete venue dashboards, live calendars, contract managers, and automated ledgers for luxury banquet owners.
            </p>
          </div>
          <Link href="/business">
            <button className="bg-neutral-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              Apply Storefront <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Bento Cell 4: Artisan (Right) */}
        <div className="md:col-span-6 bg-white border border-neutral-100 hover:border-neutral-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-450 text-neutral-400 block mb-2">ARTISANS</span>
            <h4 className="font-serif text-2xl font-black text-neutral-900 mb-2 leading-tight">Creative Portals</h4>
            <p className="text-neutral-500 text-xs font-normal mb-6">
              Showcase high-resolution wedding films, digital lookbooks, and handle direct client bookings via secure payment links.
            </p>
          </div>
          <Link href="/register?role=artisan">
            <button className="bg-neutral-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              Join Artisan Pool <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </div>

      {/* 7. PLAN YOUR EVENT SECTION */}
      <PlanYourEventSection />

      {/* 8. LUXURY FOOTER */}
      <footer className="border-t border-neutral-150 bg-white text-neutral-800 py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <span className="text-xl font-serif tracking-wide text-neutral-900 font-black">
              NEXUS <span className="font-semibold font-sans text-lg tracking-widest ml-1 text-neutral-550 text-neutral-400">HERITAGE</span>
            </span>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Pakistan's premier multi-tenant operating system for elite event orchestration. Handcrafted for premium celebrations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Portals</h4>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li><Link href="/dashboard/host" className="hover:text-neutral-900 transition-colors">Family Hosts Portal</Link></li>
              <li><Link href="/business" className="hover:text-neutral-900 transition-colors">Marquee & Venue OS</Link></li>
              <li><Link href="/register?role=artisan" className="hover:text-neutral-900 transition-colors">Artisan Studio Suite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Discover</h4>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li><Link href="/venues" className="hover:text-neutral-900 transition-colors">Elite Venues</Link></li>
              <li><Link href="/explore" className="hover:text-neutral-900 transition-colors">Artisan Network</Link></li>
              <li><Link href="/tools" className="hover:text-neutral-900 transition-colors">Planning Tools</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Ecosystem</h4>
            <div className="flex space-x-3 font-mono text-[9px] tracking-tight bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl w-max">
              <span className="text-neutral-400">STATUS</span>
              <span className="text-neutral-900 font-bold">SECURE</span>
              <span className="text-emerald-600 font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-neutral-450 text-neutral-400">© 2026 Nexus Heritage International. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
