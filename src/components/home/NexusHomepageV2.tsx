'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, MapPin, Calculator, Store, Camera, Globe, 
  Building2, Tv, Users, Plus, RefreshCw, CheckCircle2, 
  ArrowRight, ChevronRight, Check, CheckSquare, Calendar, 
  Layers, Star, Inbox, ShieldCheck
} from 'lucide-react';

interface SalamiTx {
  id: number;
  from: string;
  amount: number;
  time: string;
  thanked: boolean;
}

export function NexusHomepageV2() {
  // Hero tab switch: 'host' (B2C) | 'vendor' (B2B)
  const [heroTab, setHeroTab] = useState<'host' | 'vendor'>('host');

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('');

  // 1. ShaadiOS Operations Hub active tab
  const [activeHubTab, setActiveHubTab] = useState<'daig' | 'gps' | 'salami'>('daig');

  // Daig & portion calculator state
  const [guestCount, setGuestCount] = useState(250);
  const biryaniDaigs = Math.ceil(guestCount / 40); 
  const zardaDaigs = Math.ceil(guestCount / 60);  
  const rotiCount = Math.ceil(guestCount * 1.3);   
  const naanCount = Math.ceil(guestCount * 1.1);

  // Procession Caravan GPS tracker state
  const [baraatStep, setBaraatStep] = useState(0);
  const baraatLandmarks = [
    { dist: 4.8, text: 'Dulha caravan left house (Model Town)', status: 'On Route' },
    { dist: 3.2, text: 'Slow traffic at Canal Crossing', status: 'Delayed' },
    { dist: 1.5, text: 'Crossing Liberty Circle - Dhol beats active!', status: 'Approaching' },
    { dist: 0.3, text: 'Caravan arriving near main marquee gate', status: 'At Gate' },
    { dist: 0.0, text: 'Baraat Arrived! Welcome reception active!', status: 'Arrived' }
  ];
  const baraatCoords = [
    { left: '6%', top: '35%' },
    { left: '26%', top: '15%' },
    { left: '50%', top: '48%' },
    { left: '72%', top: '15%' },
    { left: '90%', top: '35%' }
  ];
  const advanceBaraat = () => {
    setBaraatStep(prev => (prev + 1) % baraatLandmarks.length);
  };

  // Salami Ledger state
  const [salamiTxs, setSalamiTxs] = useState<SalamiTx[]>([
    { id: 1, from: 'Chacha Saleem', amount: 10000, time: '09:15 PM', thanked: true },
    { id: 2, from: 'Phupho Riffat', amount: 5000, time: '09:28 PM', thanked: true },
    { id: 3, from: 'Mamoo Akram', amount: 15000, time: '09:42 PM', thanked: false }
  ]);
  const [salamiToast, setSalamiToast] = useState<{ from: string; amount: number } | null>(null);

  useEffect(() => {
    if (salamiToast) {
      const timer = setTimeout(() => setSalamiToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [salamiToast]);

  const addRandomSalami = () => {
    const names = ['Tayee Amna', 'Khala Nazia', 'Phupha Bashir', 'Dost Bilal', 'Chacha Nabeel', 'Mami Zoya'];
    const amounts = [5000, 10000, 15000, 20000];
    const name = names[Math.floor(Math.random() * names.length)];
    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newTx: SalamiTx = { id: Date.now(), from: name, amount, time, thanked: false };
    setSalamiTxs(prev => [newTx, ...prev.slice(0, 2)]);
    setSalamiToast({ from: name, amount });
  };

  const toggleSalamiThanks = (id: number) => {
    setSalamiTxs(prev => prev.map(tx => tx.id === id ? { ...tx, thanked: !tx.thanked } : tx));
  };

  const totalSalami = useMemo(() => {
    return salamiTxs.reduce((sum, tx) => sum + tx.amount, 165000);
  }, [salamiTxs]);

  // VIP subdomain reservation state
  const [leadBusinessName, setLeadBusinessName] = useState('');
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const cleanSubdomain = leadBusinessName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 22);

  useEffect(() => {
    if (leadBusinessName) {
      setIsCheckingDomain(true);
      const timer = setTimeout(() => setIsCheckingDomain(false), 450);
      return () => clearTimeout(timer);
    }
  }, [leadBusinessName]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1F2937] font-sans relative antialiased selection:bg-amber-100">
      
      {/* 1. HERO SECTION (Stripe/Notion SaaS-inspired Split Layout) */}
      <section className="relative max-w-[1440px] mx-auto pt-16 pb-20 px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Heading, Toggle & CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E2DA] text-[#0F5B3E] font-black text-xs uppercase tracking-widest mb-6 w-max shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
            <span>Pakistan's Premium Event Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5 text-[#1F2937]">
            Plan Magnificent Events.<br />
            <span className="text-[#0F5B3E]">Operate Your Business.</span>
          </h1>

          <p className="text-[#6B7280] text-base sm:text-lg font-medium max-w-lg mb-8 leading-relaxed">
            Calculate Biryani daigs, live-track procession caravans, log cash gift registries, and claim private brand portals. Designed for local traditions, built to international standards.
          </p>

          {/* Segmented Switcher Controls */}
          <div className="bg-white p-1 rounded-xl flex gap-1 w-full max-w-md border border-[#E6E2DA] relative mb-8 shadow-2xs">
            <button
              onClick={() => setHeroTab('host')}
              className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                heroTab === 'host' ? 'bg-[#0F5B3E]/10 text-[#0F5B3E]' : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>For Event Hosts</span>
            </button>

            <button
              onClick={() => setHeroTab('vendor')}
              className={`flex-1 py-3 text-xs sm:text-sm font-black rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                heroTab === 'vendor' ? 'bg-[#0F5B3E]/10 text-[#0F5B3E]' : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>For Event Businesses</span>
            </button>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={heroTab === 'host' ? '/sign-up?redirect_url=/portal' : '/sign-up?redirect_url=/dashboard'} className="w-full sm:w-auto">
              <button className="h-12 px-8 text-sm font-black text-white bg-[#0F5B3E] hover:bg-[#0b4730] transition-colors rounded-xl w-full flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                <span>{heroTab === 'host' ? 'Register as Host' : 'Register Event Business'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/explore" className="w-full sm:w-auto">
              <button className="h-12 px-8 text-sm font-black border border-[#E6E2DA] hover:bg-white transition-colors rounded-xl w-full text-[#1F2937] cursor-pointer">
                Explore
              </button>
            </Link>
          </div>

        </div>

        {/* Right Column: Premium High-Fidelity Dashboard Mockup (Pure White Cards, SaaS style) */}
        <div className="lg:col-span-6 bg-white border border-[#E6E2DA] rounded-[2.5rem] p-6 sm:p-8 relative shadow-sm overflow-hidden select-none">
          <div className="absolute top-4 right-4 flex gap-1.5 z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-100" />
          </div>

          <AnimatePresence mode="wait">
            {heroTab === 'host' ? (
              <motion.div
                key="host-mock"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                {/* Header profile info */}
                <div className="flex items-center gap-3 border-b border-[#E6E2DA] pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F5B3E]/10 flex items-center justify-center font-black text-[#0F5B3E] text-xs">
                    AH
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1F2937]">Welcome back, Ali</h4>
                    <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-wider">Event Host Dashboard</p>
                  </div>
                  <span className="ml-auto px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E6E2DA] text-[#0F5B3E] text-[10px] font-black uppercase tracking-wider">
                    Barat OS Active
                  </span>
                </div>

                {/* Milestone Checklist */}
                <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-black text-[#1F2937]">Event Checklist Completion</span>
                    <span className="text-xs font-black text-[#0F5B3E]">75% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E6E2DA]">
                    <div className="w-3/4 h-full bg-[#0F5B3E] rounded-full" />
                  </div>
                  <div className="flex flex-col gap-2 mt-4 text-[11px] font-bold text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F5B3E] shrink-0" />
                      <span className="text-[#1F2937]">Deposit verified for Banquet Marquee Hall</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F5B3E] shrink-0" />
                      <span className="text-[#1F2937]">WhatsApp Digital Invitations dispatched</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#E6E2DA] bg-white shrink-0 flex items-center justify-center text-[7px] text-[#C9A227] font-black">●</div>
                      <span>Confirm final dessert Zarda portion calculator (Pending)</span>
                    </div>
                  </div>
                </div>

                {/* Recent Invite status */}
                <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#6B7280] font-black uppercase tracking-widest">WhatsApp Invitation Reach</span>
                    <span className="text-base font-black text-[#1F2937] mt-0.5">340 RSVPs Confirmed</span>
                  </div>
                  <span className="text-[10px] font-black text-[#D9467A] bg-[#D9467A]/10 px-2 py-1 rounded border border-[#D9467A]/25">
                    Live Broadcast Active
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="vendor-mock"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                {/* Header profile info */}
                <div className="flex items-center gap-3 border-b border-[#E6E2DA] pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6E2DA] flex items-center justify-center font-black text-[#0F5B3E] text-xs">
                    OS
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#1F2937]">Banquets & Marquees Operations</h4>
                    <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-wider">Enterprise Business OS</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E6E2DA] text-[#D9467A] text-[9px] font-black uppercase">
                    White-Label Enabled
                  </span>
                </div>

                {/* Pipeline Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4">
                    <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest">Monthly Booking Value</span>
                    <h5 className="text-base font-black text-[#1F2937] mt-1">PKR 1,850,000</h5>
                    <span className="text-[9px] font-bold text-emerald-600 block mt-1.5">✓ 9 confirmed slot bookings</span>
                  </div>
                  <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4">
                    <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest">Lead Conversion Rate</span>
                    <h5 className="text-base font-black text-[#1F2937] mt-1">28.4%</h5>
                    <span className="text-[9px] font-bold text-emerald-600 block mt-1.5">↑ +4.2% vs last quarter</span>
                  </div>
                </div>

                {/* Lead Pipeline mockup */}
                <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-[#1F2937]">Recent Marquee Booking Request</span>
                    <span className="text-[10px] font-black bg-[#0F5B3E]/10 text-[#0F5B3E] px-2 py-0.5 rounded border border-[#0F5B3E]/20">New Inquiry</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-2.5 border border-[#E6E2DA]/80 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E6E2DA] flex items-center justify-center shrink-0">
                      <Inbox className="w-4.5 h-4.5 text-[#6B7280]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[#1F2937] truncate">Baraat Slot: Royal Palms</p>
                      <p className="text-[9.5px] text-[#6B7280] font-medium truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /> Lahore, Pakistan
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#1F2937]">PKR 450k</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </section>

      {/* 2. TRUST-FIRST STATISTICS ROW (Visibility & Credibility) */}
      <section className="bg-white border-y border-[#E6E2DA] py-10 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          
          <div>
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F5B3E]">10,000+</span>
            <p className="text-sm font-black text-[#1F2937] uppercase tracking-wider mt-1">Event Guests Managed</p>
            <p className="text-xs text-[#6B7280] font-medium mt-0.5">Through smart digital RSVPs and seating maps.</p>
          </div>

          <div className="sm:border-l border-[#E6E2DA] sm:pl-8">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#D9467A]">500+</span>
            <p className="text-sm font-black text-[#1F2937] uppercase tracking-wider mt-1">Verified Businesses Onboarded</p>
            <p className="text-xs text-[#6B7280] font-medium mt-0.5">Marquees, photographic studios, salons & caterers.</p>
          </div>

          <div className="sm:border-l border-[#E6E2DA] sm:pl-8">
            <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#C9A227]">50,000+</span>
            <p className="text-sm font-black text-[#1F2937] uppercase tracking-wider mt-1">Invitations Delivered</p>
            <p className="text-xs text-[#6B7280] font-medium mt-0.5">Instant WhatsApp invitation cards and tracking links.</p>
          </div>

        </div>
      </section>

      {/* 3. SHAADIOS SMART LOGISTICS SUITE (Tabbed Calculators) */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 relative z-10">
        <div className="text-center md:text-left mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2937]">
            Smart <span className="font-cormorant font-light italic text-[#0F5B3E]">ShaadiOS</span> Logistics Suite
          </h2>
          <p className="text-sm text-[#6B7280] mt-1 font-medium max-w-xl">
            Streamlining traditional Pakistani wedding logistics. Try the interactive modules below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Menu */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 justify-center">
            {[
              {
                id: 'daig',
                title: 'Daig & Catering OS',
                desc: 'Calculate biryani cauldrons and dessert portions dynamically based on guest count.'
              },
              {
                id: 'gps',
                title: 'Baraat Caravan GPS',
                desc: 'Trace caravan route displacement milestones and share live links with guests.'
              },
              {
                id: 'salami',
                title: 'Salami Gift Registry',
                desc: 'Log cash gifts, trigger text cards, and export instant PDF receipts.'
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveHubTab(tab.id as any)}
                className={`w-full p-6 rounded-2xl text-left border flex gap-4 transition-all duration-300 cursor-pointer hover:scale-[1.01] ${
                  activeHubTab === tab.id
                    ? 'bg-[#0F5B3E]/10 border-[#0F5B3E]/30 text-[#1F2937]'
                    : 'bg-white border-[#E6E2DA] text-[#6B7280] hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs sm:text-sm font-black tracking-tight text-[#1F2937]">{tab.title}</span>
                  <span className="text-[10px] leading-relaxed text-[#6B7280] font-medium">{tab.desc}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Screen Mockup (Pure White Card) */}
          <div className="lg:col-span-8 flex">
            <div className="w-full relative bg-white border border-[#E6E2DA] rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between min-h-[360px] shadow-2xs">
              
              <AnimatePresence mode="wait">
                
                {/* TAB 1: DAIG CALCULATOR */}
                {activeHubTab === 'daig' && (
                  <motion.div
                    key="daig-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch flex-1"
                  >
                    <div className="sm:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-black uppercase text-[#0F5B3E] tracking-wider bg-[#0F5B3E]/10 px-2.5 py-1 rounded-full border border-[#0F5B3E]/20">🍲 CATERING PORTIONS</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#1F2937] font-heading">Portion OS Calculator</h3>
                        <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed mt-2">
                          Recalculate required biryani cauldrons (Feeding ~40 guests per daig), sweet kheer portions, and roti/naan count dynamically by dragging the guest count slider.
                        </p>
                      </div>

                      {/* Guest Slider */}
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs font-black text-[#1F2937]">
                          <span>GUEST ESTIMATE:</span>
                          <span className="text-[#0F5B3E]">{guestCount} GUESTS</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="50"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full h-1.5 bg-[#FAF7F2] rounded-lg appearance-none cursor-pointer border border-[#E6E2DA] accent-[#0F5B3E]"
                        />
                      </div>
                    </div>

                    {/* Portions Table */}
                    <div className="sm:col-span-5 flex items-center justify-center">
                      <div className="w-full max-w-[210px] bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4 flex flex-col gap-3 shadow-3xs">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest border-b border-[#E6E2DA] pb-1.5">Portion Requirements</span>

                        <div className="flex flex-col gap-2 text-[10px] font-extrabold text-[#1F2937]">
                          <div className="flex justify-between items-center py-1 border-b border-dashed border-[#E6E2DA]/50">
                            <span className="text-[#6B7280] font-bold">🍚 Biryani Cauldrons</span>
                            <span className="text-[#0F5B3E] bg-[#0F5B3E]/10 px-2 py-0.5 rounded font-black">{biryaniDaigs} Daigs</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-dashed border-[#E6E2DA]/50">
                            <span className="text-[#6B7280] font-bold">🍧 Sweet Zarda</span>
                            <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-black">{zardaDaigs} Daigs</span>
                          </div>
                          <div className="flex justify-between items-center py-1 border-b border-dashed border-[#E6E2DA]/50">
                            <span className="text-[#6B7280] font-bold">🫓 Roti Count</span>
                            <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-black">{rotiCount} Pcs</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-[#6B7280] font-bold">🫓 Naan Count</span>
                            <span className="text-teal-700 bg-teal-100 px-2 py-0.5 rounded font-black">{naanCount} Pcs</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: BARAAT GPS */}
                {activeHubTab === 'gps' && (
                  <motion.div
                    key="gps-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch flex-1"
                  >
                    <div className="sm:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-black uppercase text-[#D9467A] tracking-wider bg-[#D9467A]/10 px-2.5 py-1 rounded-full border border-[#D9467A]/20">📍 CARAVAN TRACKING</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#1F2937] font-heading">Caravan Procession GPS</h3>
                        <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed mt-2">
                          Share a live map tracking coordinates link via WhatsApp, letting guests trace real-time procession landmarks and gate arrival timings.
                        </p>
                      </div>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={advanceBaraat}
                          className="px-5 py-3 rounded-xl text-xs font-black text-white bg-[#0F5B3E] hover:bg-[#0b4730] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <span>Simulate caravan displacement</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Visual Route */}
                    <div className="sm:col-span-5 flex flex-col justify-center gap-3 bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4 shadow-3xs">
                      <div className="flex justify-between items-center text-[7.5px] font-black uppercase text-[#6B7280] tracking-wider border-b border-[#E6E2DA] pb-1.5">
                        <span>Procession Status</span>
                        <span className="text-[#D9467A] bg-[#D9467A]/10 px-1.5 py-0.5 rounded font-black animate-pulse">{baraatLandmarks[baraatStep].status}</span>
                      </div>

                      <div className="h-16 w-full relative flex items-center justify-center bg-white border border-[#E6E2DA]/60 rounded-xl overflow-visible">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                          <path d="M 12 32 C 50 4, 80 56, 120 32 C 150 4, 180 38, 190 32" fill="none" stroke="#FAF7F2" strokeWidth="3.5" strokeLinecap="round" />
                          <path d="M 12 32 C 50 4, 80 56, 120 32 C 150 4, 180 38, 190 32" fill="none" stroke="#0F5B3E" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="5, 4" />
                        </svg>
                        <motion.div
                          className="absolute w-7 h-7 rounded-full bg-white border border-[#C9A227] shadow-md flex items-center justify-center text-xs"
                          animate={{ left: baraatCoords[baraatStep].left, top: baraatCoords[baraatStep].top }}
                          transition={{ type: 'spring', stiffness: 90, damping: 11 }}
                        >
                          👑
                        </motion.div>
                      </div>

                      <div className="text-left text-[9px] font-black text-[#1F2937] leading-tight">
                        <span className="text-[7.5px] text-[#6B7280] block uppercase mb-0.5">CURRENT STEP</span>
                        <p className="truncate font-bold">{baraatLandmarks[baraatStep].text}</p>
                        <span className="text-[#0F5B3E] font-extrabold mt-0.5 block">📍 {baraatLandmarks[baraatStep].dist} km remaining</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: SALAMI LEDGER */}
                {activeHubTab === 'salami' && (
                  <motion.div
                    key="salami-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch flex-1"
                  >
                    <div className="sm:col-span-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-black uppercase text-[#C9A227] tracking-wider bg-[#C9A227]/10 px-2.5 py-1 rounded-full border border-[#C9A227]/20">🧧 WEALTH LEDGER</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#1F2937] font-heading">Salami Cash Ledger</h3>
                        <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed mt-2">
                          Log traditional cash contributions instantly. Recalculates ledger sums, sends WhatsApp thank-you templates, and prints receipts.
                        </p>
                      </div>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={addRandomSalami}
                          className="px-5 py-3 rounded-xl text-xs font-black text-white bg-[#0F5B3E] hover:bg-[#0b4730] transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Simulate Guest Gift</span>
                        </button>
                      </div>
                    </div>

                    {/* Salami registry ledger */}
                    <div className="sm:col-span-5 flex flex-col justify-between bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4 shadow-3xs relative overflow-hidden">
                      <AnimatePresence>
                        {salamiToast && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-x-3 bottom-12 bg-gradient-to-r from-[#0F5B3E] to-[#C9A227] text-white px-3 py-2 rounded-xl text-[9px] font-black flex items-center justify-between shadow-lg z-25 border border-white/20"
                          >
                            <span>🧧 Gift from: {salamiToast.from}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-[8px] font-mono">PKR {salamiToast.amount.toLocaleString()}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between items-center text-[7.5px] font-black text-[#6B7280] uppercase tracking-wider border-b border-[#E6E2DA] pb-1.5">
                        <span>Ledger sum total</span>
                        <span className="text-[#0F5B3E]">PKR {totalSalami.toLocaleString()}</span>
                      </div>

                      <div className="flex flex-col gap-1.5 h-[95px] overflow-hidden justify-start mt-2">
                        <AnimatePresence initial={false}>
                          {salamiTxs.map((tx) => (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              className="bg-white border border-[#E6E2DA]/55 p-2 rounded-xl flex items-center justify-between shadow-3xs"
                            >
                              <div className="flex flex-col text-[8px] font-black leading-tight text-[#1F2937]">
                                <span>{tx.from}</span>
                                <span className="text-slate-400 text-[6.5px] mt-0.5">{tx.time}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-black text-slate-800">PKR {tx.amount.toLocaleString()}</span>
                                <button
                                  onClick={() => toggleSalamiThanks(tx.id)}
                                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                                    tx.thanked ? 'bg-[#0F5B3E] border-[#0F5B3E] text-white' : 'border-slate-300 text-slate-400'
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
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* 4. VERIFIED DIRECTORIES / ECOSYSTEM SOLUTIONS GRID */}
      <section className="max-w-[1280px] mx-auto px-6 py-10 relative z-10">
        <div className="text-center md:text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2937]">
            Ecosystem Directories & Software
          </h2>
          <p className="text-sm text-[#6B7280] mt-1 font-medium max-w-xl">
            Verified vendor platforms, booking charts, and invoicing software deployed across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Building2,
              title: "Marquee Venue OS",
              label: "BANQUETS",
              desc: "Manage slots, itemize custom client quotations, and track vendor logs.",
              href: "/business"
            },
            {
              icon: Camera,
              title: "Studio Vault OS",
              label: "STUDIO VAULT",
              desc: "High-resolution proofing screens, favorites logs, and direct video folders.",
              href: "/business/studio"
            },
            {
              icon: Tv,
              title: "Display Cast OS",
              label: "SCREEN STREAM",
              desc: "Broadcast welcoming templates, slide calendars, and menus to marquee screens.",
              href: "/displays"
            },
            {
              icon: Users,
              title: "Kitchen Cooking OS",
              label: "CATERING OS",
              desc: "Track stocks, raw materials, chef schedules, and daily cost lists.",
              href: "/business/kitchen"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E6E2DA] rounded-[2rem] p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow min-h-[190px]"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-8.5 h-8.5 rounded-xl bg-[#FAF7F2] border border-[#E6E2DA] flex items-center justify-center text-[#0F5B3E]">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[7.5px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{item.label}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#1F2937] font-heading">{item.title}</h3>
                <p className="text-[10px] text-[#6B7280] font-medium leading-relaxed mt-2">{item.desc}</p>
              </div>

              <Link href={item.href} className="text-[9.5px] font-black text-[#0F5B3E] flex items-center gap-1 mt-5 hover:underline">
                <span>Configure Module</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ELITE VERIFIED VENDOR SHOWCASE (Airbnb-style Premium Grid) */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F2937]">Verified Elite Marquees</h2>
            <p className="text-sm text-[#6B7280] mt-1 font-medium">Top-tier venues verified for capacity and pricing standards.</p>
          </div>
          <Link href="/search?tab=venues" className="text-xs font-black text-[#0F5B3E] hover:underline flex items-center gap-1">
            <span>Explore All Venues</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "The Royal Palms Banquet",
              city: "Lahore, Pakistan",
              price: "PKR 450,000",
              rating: "4.9",
              reviews: "140",
              img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
            },
            {
              name: "Nishat Banquets Banquet Hall",
              city: "Johar Town, Lahore",
              price: "PKR 850,000",
              rating: "4.8",
              reviews: "220",
              img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
            },
            {
              name: "PC Banquets & Marquees",
              city: "Karachi, Pakistan",
              price: "PKR 950,000",
              rating: "4.9",
              reviews: "310",
              img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
            }
          ].map((venue, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E6E2DA] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col group cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden shrink-0">
                <img 
                  src={venue.img} 
                  alt={venue.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[9px] font-black text-slate-800 border border-[#E6E2DA] shadow-xs">
                  VERIFIED VENUE
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#1F2937] text-base mb-1">{venue.name}</h4>
                  <p className="text-xs text-[#6B7280] font-medium flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {venue.city}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[9px] text-[#6B7280] font-black uppercase tracking-wider block mb-0.5">Starting fee</span>
                    <span className="text-sm font-black text-[#1F2937]">{venue.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#1F2937] font-black">
                    <Star className="w-3.5 h-3.5 text-[#C9A227] fill-[#C9A227]" />
                    <span>{venue.rating}</span>
                    <span className="text-[#6B7280] font-medium">({venue.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VIP BOARDING PASS SUBDOMAIN FINDER (Pure White & Gold Card) */}
      <section className="max-w-[1280px] mx-auto px-6 mb-20 relative z-10">
        <div className="bg-white border border-[#E6E2DA] rounded-[2.5rem] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[radial-gradient(#FAF7F2_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Form copywriting column */}
            <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E6E2DA] text-[#C9A227] font-black text-[9px] mb-4 w-fit mx-auto lg:mx-0 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> DEPLOY BRAND SUITE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3 text-[#1F2937] font-heading">
                Claim VIP Domain Deployments
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed mb-5 max-w-sm mx-auto lg:mx-0">
                Setup custom color themes, book slots, and deploy client portals instantly under your private B2B web domain address.
              </p>

              <div className="flex flex-col gap-2.5 text-[10.5px] text-[#1F2937] font-bold max-w-xs mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#0F5B3E]" />
                  <span>100% White-Labeled Customer portals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#0F5B3E]" />
                  <span>Free training & setup configurations</span>
                </div>
              </div>
            </div>

            {/* Boarding Pass Ticket Form */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md bg-white text-[#1F2937] rounded-[2rem] p-6 sm:p-8 shadow-2xs relative border border-[#C9A227]/30 overflow-hidden">
                
                {/* Gold shimmer */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#C9A227]/5 to-transparent translate-x-[-100%] animate-shimmer" />

                {/* Ticket Cuts */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#FAF7F2] rounded-r-full -ml-2 border-r border-[#C9A227]/30 hidden sm:block z-10" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#FAF7F2] rounded-l-full -mr-2 border-l border-[#C9A227]/30 hidden sm:block z-10" />

                {/* Boarding Header */}
                <div className="flex justify-between items-center border-b border-dashed border-[#E6E2DA] pb-3 mb-5 relative z-10">
                  <div className="flex flex-col text-left">
                    <span className="text-[7px] font-black text-[#C9A227] uppercase tracking-widest">VIP DEPLOYMENT TICKET</span>
                    <span className="text-[9px] font-black text-[#1F2937] uppercase tracking-wider mt-0.5">NEXUS ENTERPRISE OS</span>
                  </div>
                  <span className="text-[9px] font-serif font-medium italic text-[#C9A227] font-bold">Standard Tier</span>
                </div>

                <AnimatePresence mode="wait">
                  {!leadSubmitted ? (
                    <motion.form
                      key="lead-form-compliant"
                      onSubmit={(e) => { e.preventDefault(); if (leadBusinessName) setLeadSubmitted(true); }}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="flex flex-col gap-4 relative z-10 text-left"
                    >
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-[#1F2937] uppercase tracking-wider">Business Brand Name</label>
                        <input
                          type="text"
                          required
                          value={leadBusinessName}
                          onChange={(e) => setLeadBusinessName(e.target.value)}
                          placeholder="e.g. Royal Palace Banquet"
                          className="w-full px-4 py-3 text-xs font-bold rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/15 bg-[#FAF7F2] outline-hidden placeholder:text-slate-400"
                        />

                        {leadBusinessName && (
                          <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#E6E2DA]">
                            {isCheckingDomain ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 text-[#0F5B3E] animate-spin" />
                                <span className="text-[9px] font-bold text-[#0F5B3E]">Checking registry...</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                                <span className="text-[9px] font-bold text-slate-800 truncate">
                                  Link: <strong className="text-[#0F5B3E]">{cleanSubdomain}</strong>.nexusos.pk is <span className="text-emerald-800 bg-emerald-100 px-1 py-0.2 rounded font-black uppercase text-[8px]">Ready</span>
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-[#1F2937] uppercase tracking-wider">WhatsApp Phone</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 0300 1234567"
                          className="w-full px-4 py-3 text-xs font-bold rounded-xl border border-[#E6E2DA] focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/15 bg-[#FAF7F2] outline-hidden placeholder:text-slate-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#0F5B3E] hover:bg-[#0b4730] text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
                      >
                        Claim Portal & Deploy OS
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="lead-success-compliant"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 relative z-10 flex flex-col items-center"
                    >
                      <div className="w-11 h-11 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />
                      </div>
                      <h4 className="text-sm font-black text-slate-900">Portal reserved successfully!</h4>
                      <p className="text-[#6B7280] text-[9.5px] leading-relaxed max-w-xs mt-1.5">
                        Your custom workspace at <strong className="text-[#0F5B3E]">{cleanSubdomain}</strong>.nexusos.pk is provisioned. Check WhatsApp for onboarding cards.
                      </p>
                      <button
                        onClick={() => { setLeadSubmitted(false); setLeadBusinessName(''); }}
                        className="mt-4 text-[9px] font-black text-[#0F5B3E] hover:underline cursor-pointer"
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

      {/* 7. BRANDS GRID (Trust Ticker) */}
      <section className="max-w-[1280px] mx-auto px-6 pb-20 relative z-10">
        <div className="py-8 flex flex-col items-center justify-center border border-[#E6E2DA] bg-white rounded-3xl shadow-3xs text-center">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">Trusted by Pakistan's Premier Hospitality Brand Networks</span>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-55 grayscale hover:grayscale-0 transition-all duration-500 px-4 text-slate-700">
            <span className="text-sm sm:text-base font-bold font-serif">PEARL CONTINENTAL</span>
            <span className="text-sm sm:text-base font-black tracking-widest">AVARI HOTELS</span>
            <span className="text-xs sm:text-sm font-bold italic">Shiza Hassan</span>
            <span className="text-sm sm:text-base font-medium tracking-widest">NISHAT BANQUETS</span>
          </div>
        </div>
      </section>

    </div>
  );
}
