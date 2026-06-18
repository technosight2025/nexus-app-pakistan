'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, MapPin, Calculator, Store, Camera, Globe, 
  Building2, Tv, Users, Music, Plus, RefreshCw, CheckCircle2, 
  ArrowRight, ChevronDown, Check, CheckSquare, Calendar, 
  DollarSign, Layers, Award, Play, Pause, Volume2, ShieldAlert
} from 'lucide-react';

interface SalamiTx {
  id: number;
  from: string;
  amount: number;
  time: string;
  thanked: boolean;
}

const AnimatedDropdown = ({ options, placeholder, value, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = value ? options.find((o: any) => o.value === value)?.label : placeholder;

  return (
    <div className="relative flex-1 z-40 w-full sm:w-auto" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-slate-300 py-3.5 px-4 rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm flex items-center justify-between font-bold cursor-pointer transition-all hover:bg-slate-800/80"
      >
        <span className={value ? "text-white whitespace-nowrap text-xs" : "text-slate-500 whitespace-nowrap text-xs"}>
          {selectedLabel}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 ml-2 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-full left-0 min-w-[200px] mt-2 bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 z-50 p-1.5"
          >
            {options.map((opt: any) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 cursor-pointer rounded-xl transition-all font-bold text-xs hover:bg-slate-900 ${
                  value === opt.value ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function NexusHomepageV3() {
  // 1. Dynamic Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('');

  // 2. Timeline state: 'mehndi' | 'baraat' | 'salami' | 'catering'
  const [activeTimelineStep, setActiveTimelineStep] = useState<'mehndi' | 'baraat' | 'salami' | 'catering'>('mehndi');

  // Interactive step 1: Mehndi Beats
  const [isPlayingMehndi, setIsPlayingMehndi] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(70);
  const [selectedSong, setSelectedSong] = useState('Dhol Dhamaka (Mehndi Entry)');
  const mehndiSongs = [
    'Dhol Dhamaka (Mehndi Entry)',
    'Afreen Afreen (Qawali Tribute)',
    'Lathay Di Chadar (Dance Mix)',
    'Guddi Wang (Bhangra Beats)'
  ];

  // Interactive step 2: Baraat GPS
  const [caravanStep, setCaravanStep] = useState(0);
  const landmarks = [
    { dist: 4.5, text: 'Departed Model Town (Dhol loading)', status: 'Active' },
    { dist: 2.8, text: 'Stuck at Ferozepur Underpass', status: 'Delayed' },
    { dist: 1.2, text: 'Entering Main Boulevard Gulberg', status: 'Approaching' },
    { dist: 0.2, text: 'procession offloading at gate', status: 'At Gate' },
    { dist: 0.0, text: 'Dulha Welcomed! Fireworks active!', status: 'Arrived' }
  ];
  const coords = [
    { left: '8%', top: '35%' },
    { left: '28%', top: '15%' },
    { left: '52%', top: '48%' },
    { left: '74%', top: '16%' },
    { left: '92%', top: '35%' }
  ];

  // Interactive step 3: Nikah & Salami
  const [salamiList, setSalamiList] = useState<SalamiTx[]>([
    { id: 1, from: 'Mamoo Hamid', amount: 15000, time: '09:20 PM', thanked: true },
    { id: 2, from: 'Khala Riffat', amount: 8000, time: '09:34 PM', thanked: false },
    { id: 3, from: 'Dost Salman', amount: 5000, time: '09:45 PM', thanked: false }
  ]);
  const [salamiToast, setSalamiToast] = useState<{ from: string; amount: number } | null>(null);

  useEffect(() => {
    if (salamiToast) {
      const timer = setTimeout(() => setSalamiToast(null), 2800);
      return () => clearTimeout(timer);
    }
  }, [salamiToast]);

  const addRandomSalami = () => {
    const guests = ['Tayaji Akram', 'Chachi Seema', 'Dost Bilal', 'Phupho Zohra', 'Khala Nazia'];
    const amounts = [10000, 20000, 30000, 50000];
    const name = guests[Math.floor(Math.random() * guests.length)];
    const val = amounts[Math.floor(Math.random() * amounts.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const tx: SalamiTx = { id: Date.now(), from: name, amount: val, time, thanked: false };
    setSalamiList(prev => [tx, ...prev.slice(0, 2)]);
    setSalamiToast({ from: name, amount: val });
  };

  const toggleSalamiThanks = (id: number) => {
    setSalamiList(prev => prev.map(t => t.id === id ? { ...t, thanked: !t.thanked } : t));
  };

  const salamiTotal = useMemo(() => {
    return salamiList.reduce((sum, t) => sum + t.amount, 245000);
  }, [salamiList]);

  // Interactive step 4: Valima Catering Portion Calculator
  const [guestsCount, setGuestsCount] = useState(300);
  const biryaniDaigs = Math.ceil(guestsCount / 40);
  const dessertDaigs = Math.ceil(guestsCount / 60);
  const rotiCount = Math.ceil(guestsCount * 1.3);
  const qormaDaigs = Math.ceil(guestsCount / 50);

  // 3. Dynamic Budget Split Calculator State
  const [totalBudget, setTotalBudget] = useState(2500000); // 25 Lakh base
  const budgetSplits = useMemo(() => {
    return [
      { name: 'Banquet Venue Hall', pct: 40, color: 'bg-amber-500' },
      { name: 'Catering & Food Services', pct: 30, color: 'bg-emerald-500' },
      { name: 'Premium Decor & Entertainment', pct: 18, color: 'bg-rose-500' },
      { name: 'Cinematic Media & Photo Studios', pct: 12, color: 'bg-teal-500' }
    ];
  }, []);

  // 4. VIP Onboarding subdomain checker
  const [brandName, setBrandName] = useState('');
  const [isCheckingSub, setIsCheckingSub] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const subdomain = brandName.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 22);

  useEffect(() => {
    if (brandName) {
      setIsCheckingSub(true);
      const timer = setTimeout(() => setIsCheckingSub(false), 550);
      return () => clearTimeout(timer);
    }
  }, [brandName]);

  return (
    <div className="bg-[#0b0f14] min-h-screen text-slate-100 font-sans pb-28 relative overflow-hidden">
      
      {/* LUXURY BACKGROUND PATTERNS */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(234,179,8,0.06)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none z-0" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-emerald-900/10 blur-[130px] animate-mesh-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[65%] h-[65%] rounded-full bg-amber-950/15 blur-[150px] animate-mesh-slow [animation-delay:-7s]" />
      </div>

      {/* 1. DARK MODE LUXURY HEADER HERO */}
      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20 text-amber-400 font-black text-[10.5px] mb-6 shadow-[0_0_20px_rgba(234,179,8,0.08)]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>ShaadiOS Suite V3 • The Midnight Gold Collection</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5 font-heading leading-[1.08] text-white">
          Architect <span className="font-cormorant font-light italic text-amber-400">Exquisite</span> Weddings.<br />
          <span>Operate </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
            Entire Ecosystems.
          </span>
        </h1>

        <p className="text-slate-400 text-xs sm:text-base font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          Log traditional Salami ledgers, track curved caravan GPS routes, calculate cauldrons of catering portions, and simulate wedding timelines in real-time.
        </p>

        {/* Glow-Backed Search Console */}
        <div className="w-full relative group max-w-3xl mx-auto">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-emerald-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-45 transition duration-700" />
          
          <div className="relative bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl md:rounded-full border border-white/10 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center w-full px-3">
              <Search className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search premium marquees, banquet halls or bridal salon studios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3.5 focus:outline-hidden text-white text-xs font-bold bg-transparent placeholder:text-slate-500"
              />
            </div>

            <div className="hidden md:block w-px h-6 bg-slate-800" />

            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-1.5 items-center">
              <AnimatedDropdown
                placeholder="Event Category"
                value={eventType}
                onChange={setEventType}
                options={[
                  { value: 'wedding', label: 'Wedding Hall' },
                  { value: 'mehndi', label: 'Mehndi Garden' },
                  { value: 'corporate', label: 'Office Banquet' }
                ]}
              />
              <div className="hidden sm:block w-px h-6 bg-slate-800" />
              <AnimatedDropdown
                placeholder="Location"
                value={city}
                onChange={setCity}
                options={[
                  { value: 'lahore', label: 'Lahore' },
                  { value: 'karachi', label: 'Karachi' },
                  { value: 'islamabad', label: 'Islamabad' }
                ]}
              />

              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl md:rounded-full font-black text-xs text-black bg-amber-400 hover:bg-amber-300 transition-all shadow-md whitespace-nowrap cursor-pointer">
                Search Directory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE EVENT TIMELINE SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-white">
            Guest Experience <span className="font-cormorant font-light italic text-amber-400">Timeline Simulator</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium max-w-xl mx-auto">
            Click each milestone of the traditional timeline to preview the localized software module powering that wedding phase.
          </p>
        </div>

        {/* Timeline Path selector */}
        <div className="relative flex justify-between max-w-4xl mx-auto mb-10 pb-4 overflow-x-auto no-scrollbar gap-8">
          <div className="absolute top-[22px] left-8 right-8 h-0.5 bg-slate-800 z-0" />
          
          {[
            { id: 'mehndi', label: 'I. MEHNDI', desc: 'DJ Beats & Entry' },
            { id: 'baraat', label: 'II. BARAAT', desc: 'Procession Caravan GPS' },
            { id: 'salami', label: 'III. NIKAH', desc: 'Salami Cash Ledger' },
            { id: 'catering', label: 'IV. VALIMA', desc: 'Catering Portion OS' }
          ].map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveTimelineStep(step.id as any)}
              className="relative z-10 flex flex-col items-center min-w-[150px] focus:outline-hidden cursor-pointer"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                activeTimelineStep === step.id
                  ? 'bg-amber-400 border-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}>
                <span className="text-xs font-black">{step.id === 'mehndi' ? '🎵' : step.id === 'baraat' ? '📍' : step.id === 'salami' ? '🧧' : '🍲'}</span>
              </div>
              <span className={`text-[10px] font-black tracking-wider uppercase mt-2.5 ${activeTimelineStep === step.id ? 'text-amber-400' : 'text-slate-400'}`}>
                {step.label}
              </span>
              <span className="text-[8.5px] font-medium text-slate-500 mt-0.5">{step.desc}</span>
            </button>
          ))}
        </div>

        {/* Display Pane container */}
        <div className="max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 min-h-[340px] flex flex-col justify-between shadow-2xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.03)_0%,transparent_60%)] pointer-events-none" />

          <AnimatePresence mode="wait">
            
            {/* STAGE 1: MEHNDI BEATS */}
            {activeTimelineStep === 'mehndi' && (
              <motion.div
                key="mehndi-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1"
              >
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">🎵 STAGE 1 LOGISTICS</span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-2 font-heading">Mehndi Beats DJ Hub</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      DJ sound cue organizer. Stream playlists to digital displays inside the marquee and update stage cues for choreographers live.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select Song Trigger:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {mehndiSongs.map((song) => (
                        <button
                          key={song}
                          onClick={() => { setSelectedSong(song); setIsPlayingMehndi(true); }}
                          className={`p-2 rounded-xl text-left text-[9px] font-black border transition-all truncate cursor-pointer ${
                            selectedSong === song
                              ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {song}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated visualizer */}
                <div className="md:col-span-5 flex flex-col gap-3 bg-slate-950/80 border border-white/5 rounded-2xl p-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[7.5px] font-black text-slate-400 uppercase">Live Music Track</span>
                    <span className="text-emerald-400 text-[8px] font-black bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 animate-pulse">CUE ACTIVE</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingMehndi(!isPlayingMehndi)}
                      className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 hover:scale-105 transition-all cursor-pointer"
                    >
                      {isPlayingMehndi ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
                    </button>
                    <div className="flex flex-col text-left truncate">
                      <span className="text-[9.5px] font-black text-white truncate max-w-[140px]">{selectedSong}</span>
                      <span className="text-[8px] text-slate-400 mt-0.5">Shaadi Beats DJ Mixer</span>
                    </div>
                  </div>

                  {/* Volume slide */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex justify-between text-[7px] font-black text-slate-400">
                      <span>MIX VOL:</span>
                      <span>{volumeLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volumeLevel}
                      onChange={(e) => setVolumeLevel(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  {/* Visualizer animation waves */}
                  <div className="flex items-end justify-center gap-1.5 h-7 mt-1.5 overflow-hidden">
                    {[...Array(9)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1 rounded-full bg-gradient-to-t from-amber-500 to-amber-300 transition-all ${isPlayingMehndi ? 'animate-wave-medium' : ''}`}
                        style={{
                          height: isPlayingMehndi ? '100%' : '20%',
                          animationDelay: `${idx * 0.08}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: BARAAT GPS */}
            {activeTimelineStep === 'baraat' && (
              <motion.div
                key="baraat-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1"
              >
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded-full border border-rose-400/20">📍 STAGE 2 GPS</span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-2 font-heading">Caravan Procession GPS</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      Tracks the wedding caravan. Visual progress logs reduce incoming calls to the family. Click the movement simulator button.
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() => setCaravanStep(prev => (prev + 1) % landmarks.length)}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1"
                    >
                      <span>Simulate Caravan Movement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Curved SVG Map */}
                <div className="md:col-span-5 flex flex-col gap-3 bg-slate-950/80 border border-white/5 rounded-2xl p-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[7.5px] font-black uppercase text-slate-400">
                    <span>Route Track Map</span>
                    <span className="text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/25">{landmarks[caravanStep].status}</span>
                  </div>

                  <div className="h-16 w-full relative flex items-center justify-center bg-slate-900 border border-white/5 rounded-xl overflow-visible">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                      <path d="M 10 32 C 50 4, 80 56, 120 32 C 150 4, 180 38, 190 32" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M 10 32 C 50 4, 80 56, 120 32 C 150 4, 180 38, 190 32" fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="5, 4" />
                    </svg>
                    <motion.div
                      className="absolute w-7 h-7 rounded-full bg-white border border-amber-500 flex items-center justify-center text-xs shadow-lg"
                      animate={{ left: coords[caravanStep].left, top: coords[caravanStep].top }}
                      transition={{ type: 'spring', stiffness: 90, damping: 11 }}
                    >
                      👑
                    </motion.div>
                  </div>

                  <div className="text-left text-[9px] font-black text-slate-200">
                    <span className="text-[7.5px] text-slate-500 block uppercase mb-0.5">CURRENT CARAVAN STEP</span>
                    <p className="truncate font-bold text-white">{landmarks[caravanStep].text}</p>
                    <span className="text-amber-400 font-extrabold mt-0.5 block">📍 {landmarks[caravanStep].dist} km remaining</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: NIKAH & SALAMI */}
            {activeTimelineStep === 'salami' && (
              <motion.div
                key="salami-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1"
              >
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">🧧 STAGE 3 CASH LEDGER</span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-2 font-heading">Nikah & Salami Ledger</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      Cash registry dashboard. Record guest contributions, generate receipt cards, and send automated thank-you messages instantly.
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={addRandomSalami}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Simulate Guest Gift</span>
                    </button>
                  </div>
                </div>

                {/* Salami registry ledger */}
                <div className="md:col-span-5 flex flex-col gap-2.5 bg-slate-950/80 border border-white/5 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                  <AnimatePresence>
                    {salamiToast && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-x-3 bottom-12 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 px-3 py-2 rounded-xl text-[9px] font-black flex items-center justify-between shadow-lg z-20"
                      >
                        <span>🧧 Gift: {salamiToast.from}</span>
                        <span className="bg-white/30 px-1.5 py-0.5 rounded font-mono">PKR {salamiToast.amount.toLocaleString()}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center text-[7.5px] font-black text-slate-400 uppercase tracking-wider border-b border-white/5 pb-2">
                    <span>Balance ledger</span>
                    <span className="text-amber-400">PKR {salamiTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 h-[95px] overflow-hidden justify-start mt-1.5">
                    <AnimatePresence initial={false}>
                      {salamiList.map((tx) => (
                        <motion.div
                          key={tx.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          className="bg-slate-900 border border-white/5 p-2 rounded-xl flex items-center justify-between shadow-2xs"
                        >
                          <div className="flex flex-col text-[8px] font-black leading-tight text-white">
                            <span>{tx.from}</span>
                            <span className="text-slate-500 text-[6.5px] mt-0.5">{tx.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black text-amber-400">PKR {tx.amount.toLocaleString()}</span>
                            <button
                              onClick={() => toggleSalamiThanks(tx.id)}
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                                tx.thanked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 text-slate-500 hover:border-slate-600'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STAGE 4: VALIMA CATERING */}
            {activeTimelineStep === 'catering' && (
              <motion.div
                key="catering-pane"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1"
              >
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-teal-400 bg-teal-400/10 px-2.5 py-1 rounded-full border border-teal-400/20">🍲 STAGE 4 CATERING</span>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-2 font-heading">Valima Catering Portions</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      Smart estimates based on local wedding portions. Adjust guest slider to instantly scale calculations.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-black text-white">
                      <span>GUEST ESTIMATE:</span>
                      <span className="text-amber-400">{guestsCount} GUESTS</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>
                </div>

                {/* Portions calculation card */}
                <div className="md:col-span-5 flex flex-col gap-2.5 bg-slate-950/80 border border-white/5 rounded-2xl p-4 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[7.5px] font-black uppercase text-slate-400">
                    <span>Valima Portion Table</span>
                    <span className="text-teal-400">CALC</span>
                  </div>

                  <div className="flex flex-col gap-2 text-[9px] font-black text-slate-300">
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span>🍚 Biryani Cauldrons</span>
                      <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">{biryaniDaigs} Daigs</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span>🥩 Qorma Cauldrons</span>
                      <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{qormaDaigs} Daigs</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/5">
                      <span>🍨 Dessert Zarda</span>
                      <span className="text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">{dessertDaigs} Daigs</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span>🫓 Roti Count</span>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{rotiCount} Pcs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* 3. DYNAMIC BUDGET SPLIT CALCULATOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative">
          
          <div className="text-center md:text-left mb-8">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 font-black text-[9px] mb-3 uppercase tracking-wider">
              💰 EXCLUSIVE UTILITY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-heading text-white">
              Dynamic Budget Split Planner
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              Scale your total planned investment. The engine splits amounts across venues, food, decor, and photographers based on localized average ratios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Range controls */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex justify-between text-xs font-black text-white">
                <span>TOTAL BUDGET:</span>
                <span className="text-amber-400">PKR {totalBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="5000000"
                step="100000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[9px] font-bold text-slate-500">Range: 5 Lakh to 50 Lakh PKR</span>
            </div>

            {/* Visual graph splits */}
            <div className="md:col-span-7 flex flex-col gap-3 bg-slate-950/80 border border-white/5 rounded-2xl p-4.5">
              <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest border-b border-white/5 pb-1.5 mb-1.5">Calculated Allocations</span>

              <div className="flex flex-col gap-3">
                {budgetSplits.map((split) => {
                  const amount = (totalBudget * split.pct) / 100;
                  return (
                    <div key={split.name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[9px] font-black text-slate-300">
                        <span>{split.name} ({split.pct}%)</span>
                        <span className="text-white">PKR {amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full ${split.color}`}
                          animate={{ width: `${split.pct}%` }}
                          transition={{ type: 'spring', stiffness: 50 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ECOSYSTEM B2B CARD GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-heading text-white">
            Ecosystem Enterprise Software
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">Powering wedding venue operations, high-res photograph proofings, and marquee display channels.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Building2,
              title: "Marquee Venue OS",
              label: "BANQUETS",
              desc: "Coordinate multi-hall slots, itemize client quotations, and track vendor booking entries.",
              color: "text-amber-500",
              bgColor: "bg-amber-500/10"
            },
            {
              icon: Camera,
              title: "Studio Vault OS",
              label: "STUDIO & VAULT",
              desc: "Deliver high-resolution client selection folders and organize photographers shift scheduling.",
              color: "text-rose-500",
              bgColor: "bg-rose-500/10"
            },
            {
              icon: Tv,
              title: "Display Cast OS",
              label: "MARQUEE SCREENS",
              desc: "Stream welcoming slides, timing schedules, and live menus to entrance hall displays.",
              color: "text-teal-500",
              bgColor: "bg-teal-500/10"
            },
            {
              icon: Users,
              title: "Kitchen Cooking OS",
              label: "CATERING LOGS",
              desc: "Track inventory ingredients, stock counts, raw grocery pricing, and chefs chef logs.",
              color: "text-emerald-500",
              bgColor: "bg-emerald-500/10"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col justify-between shadow-lg min-h-[190px]"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className={`w-8.5 h-8.5 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                    <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
                  </div>
                  <span className="text-[7.5px] font-black text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">{item.label}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white font-heading">{item.title}</h3>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-2">{item.desc}</p>
              </div>

              <span className="text-[9.5px] font-black text-amber-400 flex items-center gap-1.5 mt-5 cursor-pointer hover:underline">
                <span>Configure Module</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. VIP BOARDING PASS SUBDOMAIN FINDER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-600 rounded-[2.5rem] p-6 sm:p-10 text-slate-950 shadow-2xl relative overflow-hidden border border-white/10">
          
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Info */}
            <div className="md:col-span-5 flex flex-col justify-center text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/10 border border-slate-950/20 text-slate-950 font-black text-[9px] mb-4 w-fit mx-auto md:mx-0 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> DEPLOY VENTURES
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight mb-2.5 font-heading">
                Claim VIP Domain Deployments
              </h2>
              <p className="text-xs text-slate-900/80 font-bold leading-relaxed mb-4 max-w-sm mx-auto md:mx-0">
                Setup color branding details, book custom themes, and deploy client ledger portals instantly under your private domain link.
              </p>
            </div>

            {/* Ticket Card Form */}
            <div className="md:col-span-7 flex justify-center">
              <div className="w-full max-w-sm bg-slate-950 text-white rounded-[2rem] p-6 shadow-2xl relative border border-white/5 overflow-hidden">
                
                {/* Gold shimmer */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] animate-shimmer" />

                {/* Ticket Cuts */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-7 bg-amber-400 rounded-r-full -ml-2 border-r border-white/5 hidden sm:block z-10" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-7 bg-amber-400 rounded-l-full -mr-2 border-l border-white/5 hidden sm:block z-10" />

                {/* Boarding head */}
                <div className="flex justify-between items-center border-b border-dashed border-slate-800 pb-3 mb-4.5 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black text-amber-400 uppercase tracking-widest">VIP DEPLOYMENT PASS</span>
                    <span className="text-[9px] font-black text-white uppercase tracking-wider mt-0.5">NEXUS ENTERPRISE OS</span>
                  </div>
                  <span className="text-[9px] font-serif font-medium italic text-amber-400 font-bold">V3 Tier</span>
                </div>

                <AnimatePresence mode="wait">
                  {!isReserved ? (
                    <motion.form
                      key="sub-form-v3"
                      onSubmit={(e) => { e.preventDefault(); if (brandName) setIsReserved(true); }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col gap-3.5 relative z-10 text-left"
                    >
                      <div className="flex flex-col gap-1">
                        <label className="text-[9.5px] font-black text-slate-300 uppercase tracking-wider">Business Brand Name</label>
                        <input
                          type="text"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Royal Marquees"
                          className="w-full px-4 py-3 text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-hidden placeholder:text-slate-600"
                        />

                        {brandName && (
                          <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            {isCheckingSub ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                                <span className="text-[9px] font-bold text-emerald-500">Checking system...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                                <span className="text-[9px] font-bold text-slate-300 truncate">
                                  Link: <strong className="text-emerald-400">{subdomain}</strong>.nexusos.pk is <span className="text-emerald-400 font-black uppercase text-[8px]">Available</span>
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9.5px] font-black text-slate-300 uppercase tracking-wider">WhatsApp Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0300 1234567"
                          className="w-full px-4 py-3 text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-hidden placeholder:text-slate-600"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
                      >
                        Claim Portal & Deploy OS
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="sub-success-v3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 relative z-10 flex flex-col items-center"
                    >
                      <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-bounce" />
                      </div>
                      <h4 className="text-xs font-black text-white">Private OS Provisioned!</h4>
                      <p className="text-slate-400 text-[9px] leading-relaxed max-w-xs mt-1.5">
                        Your custom workspace at <strong className="text-amber-400">{subdomain}</strong>.nexusos.pk is locked. Onboarding templates are on their way to your phone.
                      </p>
                      <button
                        onClick={() => { setIsReserved(false); setBrandName(''); }}
                        className="mt-4 text-[9px] font-black text-amber-400 hover:underline cursor-pointer"
                      >
                        Reserve Another Domain
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. GOLD EMBOSSED PARTNERS GRID */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-8 flex flex-col items-center justify-center border border-white/5 bg-slate-950/40 rounded-3xl backdrop-blur-xs shadow-xl text-center">
          <span className="text-[8.5px] font-black text-slate-500 uppercase tracking-widest mb-6">Trusted by Pakistan's Elite Hospitality Networks</span>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 px-4">
            <span className="text-sm sm:text-base font-bold font-serif text-white tracking-tight">PEARL CONTINENTAL</span>
            <span className="text-sm sm:text-base font-black tracking-widest text-white">AVARI HOTELS</span>
            <span className="text-xs sm:text-sm font-bold italic text-slate-300 tracking-wide">Shiza Hassan</span>
            <span className="text-sm sm:text-base font-medium tracking-widest text-white">NISHAT BANQUETS</span>
          </div>
        </div>
      </section>

    </div>
  );
}
