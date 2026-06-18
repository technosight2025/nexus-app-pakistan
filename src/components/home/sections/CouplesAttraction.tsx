"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Camera, 
  MapPin, 
  Gift, 
  Coins, 
  Sparkles, 
  Download, 
  Navigation, 
  Car, 
  MessageSquare, 
  Check, 
  Users, 
  ArrowRight,
  TrendingUp,
  Heart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Pre-defined estimates for Pakistani wedding budget calculator
const BUDGET_MULTIPLIERS = {
  catering: { Standard: 2000, Elegant: 4500, Royal: 10000 },
  decor: { Standard: 300000, Elegant: 800000, Royal: 2500000 },
  photography: { Standard: 120000, Elegant: 250000, Royal: 600000 },
  makeup: { Standard: 50000, Elegant: 120000, Royal: 300000 },
  planner: { Standard: 100000, Elegant: 200000, Royal: 500000 }
};

interface Transaction {
  id: string;
  name: string;
  amount: number;
  note: string;
  smsSent: boolean;
  time: string;
}

export default function CouplesAttraction() {
  const [activeTab, setActiveTab] = useState<'budget' | 'qr' | 'caravan' | 'salami'>('budget');

  // --- Budget Calculator State ---
  const [eventType, setEventType] = useState<'mehndi' | 'barat' | 'valima' | 'full'>('full');
  const [guests, setGuests] = useState<number>(350);
  const [tier, setTier] = useState<'Standard' | 'Elegant' | 'Royal'>('Elegant');

  // --- QR Generator State ---
  const [brideName, setBrideName] = useState('Ayesha');
  const [groomName, setGroomName] = useState('Bilal');
  const [eventDate, setEventDate] = useState('2026-11-20');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // --- Caravan GPS State ---
  const [caravanStatus, setCaravanStatus] = useState<'departed' | 'stuck' | 'cruising' | 'arrived'>('cruising');
  const [whatsappCopied, setWhatsappCopied] = useState(false);

  // --- Salami Ledger State ---
  const [salamiTransactions, setSalamiTransactions] = useState<Transaction[]>([
    { id: '1', name: 'Chacha Saleem', amount: 25000, note: 'Dua for your new journey! May Allah bless you both.', smsSent: true, time: '10 mins ago' },
    { id: '2', name: 'Auntie Maryam', amount: 15000, note: 'Bohat Mubarak Ayesha and Bilal!', smsSent: false, time: '22 mins ago' },
    { id: '3', name: 'Kamran (Cousin)', amount: 5000, note: 'Congrats guys! Party tonight!', smsSent: false, time: '1 hour ago' }
  ]);
  const [newSalamiName, setNewSalamiName] = useState('');
  const [newSalamiAmount, setNewSalamiAmount] = useState('');
  const [newSalamiNote, setNewSalamiNote] = useState('');
  const [salamiNotification, setSalamiNotification] = useState<string | null>(null);

  // --- Budget Calculator Logic ---
  const calculateCosts = () => {
    let multiplier = 1;
    if (eventType === 'mehndi') multiplier = 0.55;
    else if (eventType === 'valima') multiplier = 0.85;
    else if (eventType === 'barat') multiplier = 0.95;
    else multiplier = 2.1; // Full 3-day wedding

    const cateringCost = Math.round(guests * BUDGET_MULTIPLIERS.catering[tier] * (eventType === 'full' ? 2.5 : 1));
    const decorCost = Math.round(BUDGET_MULTIPLIERS.decor[tier] * multiplier);
    const photoCost = Math.round(BUDGET_MULTIPLIERS.photography[tier] * multiplier);
    const makeupCost = Math.round(BUDGET_MULTIPLIERS.makeup[tier] * (eventType === 'full' ? 2 : 1));
    const plannerCost = Math.round(BUDGET_MULTIPLIERS.planner[tier] * multiplier);

    const total = cateringCost + decorCost + photoCost + makeupCost + plannerCost;

    return {
      catering: cateringCost,
      decor: decorCost,
      photography: photoCost,
      makeup: makeupCost,
      planner: plannerCost,
      total
    };
  };

  const costs = calculateCosts();

  // --- QR Download Handler ---
  const triggerQRDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  // --- Salami Simulator Handler ---
  const handleAddSalami = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSalamiName.trim() || !newSalamiAmount) return;
    const amountNum = parseInt(newSalamiAmount, 10);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      name: newSalamiName,
      amount: amountNum,
      note: newSalamiNote.trim() || 'Best wishes on your wedding!',
      smsSent: false,
      time: 'Just now'
    };

    setSalamiTransactions(prev => [newTx, ...prev]);
    setSalamiNotification(`Received PKR ${amountNum.toLocaleString()} from ${newSalamiName}!`);
    setNewSalamiName('');
    setNewSalamiAmount('');
    setNewSalamiNote('');
    setTimeout(() => setSalamiNotification(null), 4000);
  };

  const handleSendThankYouSMS = (id: string, name: string) => {
    setSalamiTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, smsSent: true } : tx));
    alert(`Thank you SMS sent to ${name}: "Ayesha & Bilal say thank you for your generous Salami of PKR ${salamiTransactions.find(tx => tx.id === id)?.amount.toLocaleString()} and lovely wishes!"`);
  };

  const totalSalami = salamiTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  // --- WhatsApp Copy Link Caravan ---
  const copyCaravanLink = () => {
    setWhatsappCopied(true);
    setTimeout(() => setWhatsappCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-y border-[#E6E2DA] relative overflow-hidden" id="couples-hub">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-indigo-50/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-emerald-50/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase text-[#D97706] tracking-[0.25em] bg-amber-50 border border-amber-200/60 px-4 py-1.5 rounded-full shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" /> For Engaged Couples
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            Your Entire Wedding, Powered by One Ecosystem
          </h2>
          <p className="text-[#1E1B4B]/70 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Forget chaotic spreadsheets, missing guest memories, and back-and-forth phone logs. Nexus provides Pakistan's couples with a premium digital planning suite.
          </p>
        </div>

        {/* Tab Buttons Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {[
            { id: 'budget', label: 'Shaadi Budget Tool', icon: Calculator, desc: 'Cost estimation & allocation', color: 'border-emerald-500 text-emerald-800 bg-emerald-50' },
            { id: 'qr', label: 'Guest Memories QR Hub', icon: Camera, desc: 'Shared album generators', color: 'border-[#D97706] text-amber-800 bg-amber-50' },
            { id: 'caravan', label: 'Baraat live GPS', icon: Navigation, desc: 'Realtime caravan tracking', color: 'border-indigo-600 text-indigo-950 bg-indigo-50' },
            { id: 'salami', label: 'Digital Salami Ledger', icon: Coins, desc: 'Gift logs & automated SMS', color: 'border-rose-500 text-rose-800 bg-rose-50' }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300 text-left w-full sm:w-auto hover:translate-y-[-2px] cursor-pointer ${
                  isActive 
                    ? `border-[#1E1B4B] bg-white text-[#1E1B4B] shadow-md font-bold` 
                    : 'border-[#E6E2DA] bg-white/60 text-[#1E1B4B]/60 font-semibold'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-[#1E1B4B] text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs tracking-tight">{t.label}</div>
                  <div className="text-[9px] opacity-75 font-normal font-mono">{t.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Panel */}
        <div className="bg-white border border-[#E6E2DA] rounded-[2.5rem] p-6 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Left Column: Interactive Settings / Form */}
              <div className="lg:col-span-5 space-y-6">
                
                {activeTab === 'budget' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#047857]" />
                      <h3 className="text-xl font-bold text-[#1E1B4B] font-heading">Shaadi Budget Calculator</h3>
                    </div>
                    <p className="text-xs text-[#1E1B4B]/60 leading-relaxed font-semibold">
                      Estimate your wedding costs dynamically using current market prices for caterers, decorators, photographers, and makeup artists in Pakistan.
                    </p>

                    {/* Scale Selector */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-[#1E1B4B]/60">Wedding Functions</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'full', label: 'Full 3-Day Wedding' },
                          { id: 'barat', label: 'Baraat Only' },
                          { id: 'mehndi', label: 'Mehndi Only' },
                          { id: 'valima', label: 'Valima Only' }
                        ].map((evt) => (
                          <button
                            key={evt.id}
                            onClick={() => setEventType(evt.id as any)}
                            className={`py-2 px-3 text-xs rounded-xl font-semibold border text-center transition-all cursor-pointer ${
                              eventType === evt.id 
                                ? 'bg-[#1E1B4B] border-[#1E1B4B] text-white font-bold' 
                                : 'bg-[#FAF9F6] border-[#E6E2DA] text-[#1E1B4B]/80 hover:bg-[#E6E2DA]/30'
                            }`}
                          >
                            {evt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Guest Count Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-[#1E1B4B]/60">
                        <span>Guest Count</span>
                        <span className="text-sm font-mono text-[#047857] font-bold">{guests} Guests</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="25"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#047857]"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-slate-400">
                        <span>100 Guests</span>
                        <span>500 Guests</span>
                        <span>1000 Guests</span>
                      </div>
                    </div>

                    {/* Quality Tier Selector */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-[#1E1B4B]/60 font-sans">Quality Tier & Vibe</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'Standard', label: 'Standard', desc: 'Good Value' },
                          { id: 'Elegant', label: 'Elegant', desc: 'Premium' },
                          { id: 'Royal', label: 'Royal', desc: 'Ultra-Luxury' }
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setTier(t.id as any)}
                            className={`py-2 px-1 text-xs rounded-xl font-semibold border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                              tier === t.id 
                                ? 'bg-emerald-50 border-[#047857] text-[#047857] font-bold shadow-xs' 
                                : 'bg-[#FAF9F6] border-[#E6E2DA] text-[#1E1B4B]/80 hover:bg-[#E6E2DA]/30'
                            }`}
                          >
                            <span className="font-bold">{t.label}</span>
                            <span className="text-[7px] font-normal uppercase opacity-75">{t.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dashboard Preview Action */}
                    <Link
                      href="/explore"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#047857] hover:bg-[#035f44] text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-700/10 transition-all duration-300"
                    >
                      Instant Match Vendors <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {activeTab === 'qr' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#D97706]" />
                      <h3 className="text-xl font-bold text-[#1E1B4B] font-heading font-sans">Guest Memory Card Builder</h3>
                    </div>
                    <p className="text-xs text-[#1E1B4B]/60 leading-relaxed font-semibold">
                      Provide a single hub where guests scan to upload images directly into your secure wedding album in real-time. Input names below to customize your live memory board.
                    </p>

                    {/* Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#1E1B4B]/50 mb-1">Bride's Name</label>
                        <input
                          type="text"
                          value={brideName}
                          onChange={(e) => setBrideName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#E6E2DA] rounded-xl text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#D97706]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#1E1B4B]/50 mb-1">Groom's Name</label>
                        <input
                          type="text"
                          value={groomName}
                          onChange={(e) => setGroomName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#E6E2DA] rounded-xl text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#D97706]"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black uppercase tracking-wider text-[#1E1B4B]/50 mb-1">Wedding Date</label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-[#FAF9F6] border border-[#E6E2DA] rounded-xl text-xs font-mono text-[#1E1B4B] outline-none focus:border-[#D97706]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={triggerQRDownload}
                      disabled={isDownloading}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#1E1B4B] hover:bg-[#151333] text-white text-xs font-bold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {isDownloading ? (
                        <>Generating PDF Template...</>
                      ) : downloadSuccess ? (
                        <><Check className="w-4 h-4 text-emerald-400" /> Template Saved!</>
                      ) : (
                        <><Download className="w-4 h-4" /> Download Table QR Display Card</>
                      )}
                    </button>
                  </div>
                )}

                {activeTab === 'caravan' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-indigo-700" />
                      <h3 className="text-xl font-bold text-[#1E1B4B] font-heading">Baraat Live Caravan Tracker</h3>
                    </div>
                    <p className="text-xs text-[#1E1B4B]/60 leading-relaxed font-semibold">
                      Keep your wedding guests informed. When the Barat caravan departs, share a live link. Guests see the group GPS track and exact arrival ETA instantly.
                    </p>

                    {/* Status Toggles to Simulate Traffic/Progress */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-[#1E1B4B]/60">Simulate Caravan Status</label>
                      <div className="space-y-2">
                        {[
                          { id: 'departed', title: 'Caravan Departed', desc: 'Leaving groom\'s estate' },
                          { id: 'stuck', title: 'Stuck in Canal Traffic', desc: 'Canal Road underpass bottleneck' },
                          { id: 'cruising', title: 'Cruising Gulberg Blvd', desc: 'Clear route at 45 km/h' },
                          { id: 'arrived', title: 'Arrived at Venue', desc: 'Dhol welcome started!' }
                        ].map((stat) => (
                          <button
                            key={stat.id}
                            onClick={() => setCaravanStatus(stat.id as any)}
                            className={`w-full flex items-center justify-between p-3 border rounded-xl text-left transition-all cursor-pointer ${
                              caravanStatus === stat.id 
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold shadow-xs' 
                                : 'bg-[#FAF9F6] border-[#E6E2DA] text-[#1E1B4B]/80 hover:bg-[#E6E2DA]/30'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-2 h-2 rounded-full ${
                                caravanStatus === stat.id 
                                  ? (stat.id === 'stuck' ? 'bg-amber-500 animate-ping' : stat.id === 'arrived' ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-600 animate-pulse') 
                                  : 'bg-slate-300'
                              }`} />
                              <div>
                                <div className="text-xs font-bold">{stat.title}</div>
                                <div className="text-[9px] opacity-75 font-normal">{stat.desc}</div>
                              </div>
                            </div>
                            <span className="text-[8px] font-mono opacity-60 uppercase">Select</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <button
                      onClick={copyCaravanLink}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#047857] hover:bg-[#035f44] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                    >
                      {whatsappCopied ? 'Link Copied! Send to Family Group' : 'Generate Guest Whatsapp Invite Link'}
                    </button>
                  </div>
                )}

                {activeTab === 'salami' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-rose-600" />
                      <h3 className="text-xl font-bold text-[#1E1B4B] font-heading font-sans">Digital Salami Registry</h3>
                    </div>
                    <p className="text-xs text-[#1E1B4B]/60 leading-relaxed font-semibold">
                      Instead of paper envelopes, guests send digital cash gifts (Salami) with custom notes. The ledger calculates totals, logs greetings, and lets you tap to send thank-you SMS notices.
                    </p>

                    {/* Simulation form */}
                    <form onSubmit={handleAddSalami} className="space-y-3 bg-[#FAF9F6] p-4 border border-[#E6E2DA] rounded-2xl">
                      <div className="text-[10px] font-black uppercase text-[#1E1B4B]/70 tracking-wider">Simulate Guest Cash Gift</div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Guest Name"
                          value={newSalamiName}
                          onChange={(e) => setNewSalamiName(e.target.value)}
                          className="px-3 py-2 border border-[#E6E2DA] rounded-xl text-xs font-semibold bg-white text-[#1E1B4B] outline-none"
                        />
                        <input
                          type="number"
                          required
                          placeholder="Amount (PKR)"
                          value={newSalamiAmount}
                          onChange={(e) => setNewSalamiAmount(e.target.value)}
                          className="px-3 py-2 border border-[#E6E2DA] rounded-xl text-xs font-mono bg-white text-[#1E1B4B] outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Congratulations & Dua wishes..."
                        value={newSalamiNote}
                        onChange={(e) => setNewSalamiNote(e.target.value)}
                        className="w-full px-3 py-2 border border-[#E6E2DA] rounded-xl text-xs bg-white text-[#1E1B4B] outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Gift Salami (Simulate Payment)
                      </button>
                    </form>
                  </div>
                )}

              </div>

              {/* Right Column: Premium High-Fidelity Simulator Display */}
              <div className="lg:col-span-7 h-full flex flex-col justify-center">
                
                {/* Simulator Frame Mockup (Stripe/Apple Clean aesthetic) */}
                <div className="bg-[#121212] text-white rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl p-6.5 relative min-h-[440px] flex flex-col justify-between">
                  {/* Top Phone Status Indicator */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-[10px] font-mono text-white/40">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span>NEXUS_COUPLING_SYSTEM_SECURE</span>
                    </div>
                    <span>LIVE STATUS VIEWER</span>
                  </div>

                  {/* Dynamic Inner Screens */}
                  <div className="flex-1 flex flex-col justify-center">
                    
                    {/* BUDGET CALCULATOR SCREEN */}
                    {activeTab === 'budget' && (
                      <div className="space-y-6">
                        <div className="text-center space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Total Budget Estimate</span>
                          <h4 className="text-3xl sm:text-4.5xl font-bold font-heading text-white font-mono">
                            PKR {costs.total.toLocaleString()}
                          </h4>
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full uppercase tracking-wider">
                            {tier} Category Plan
                          </span>
                        </div>

                        {/* Breakdown Progress Cards */}
                        <div className="space-y-3">
                          {[
                            { name: 'Catering & Venue', amt: costs.catering, pct: '50%', color: 'bg-emerald-500' },
                            { name: 'Floral & Thematic Decor', amt: costs.decor, pct: '25%', color: 'bg-indigo-500' },
                            { name: 'Cinematography & Shoots', amt: costs.photography, pct: '12%', color: 'bg-amber-500' },
                            { name: 'Bridal Couture & Makeup', amt: costs.makeup, pct: '8%', color: 'bg-rose-500' },
                            { name: 'Coordinator Fees', amt: costs.planner, pct: '5%', color: 'bg-purple-500' }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-xs font-semibold text-white/80">
                                <span>{item.name}</span>
                                <span className="font-mono text-white">PKR {item.amt.toLocaleString()}</span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: item.pct }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                  className={`h-full ${item.color}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* QR GUEST ALBUM SCREEN */}
                    {activeTab === 'qr' && (
                      <div className="flex flex-col items-center justify-center py-4 space-y-5">
                        
                        {/* Interactive Table Tent Card Mockup */}
                        <div className="w-64 bg-white text-[#1E1B4B] rounded-2xl border-4 border-[#C5A059] p-5 shadow-2xl relative overflow-hidden text-center flex flex-col items-center justify-between min-h-[300px]">
                          {/* Top ornate design element */}
                          <div className="text-[9px] font-black uppercase text-[#D97706] tracking-[0.2em] font-serif border-b border-[#E6E2DA] pb-1 w-full">
                            Welcome to the Wedding of
                          </div>

                          {/* Bride & Groom names */}
                          <div className="my-2.5">
                            <h5 className="text-xl font-bold font-serif text-[#1E1B4B] italic">
                              {brideName || 'Bride'}
                            </h5>
                            <span className="text-xs uppercase text-slate-400 font-mono font-black">&</span>
                            <h5 className="text-xl font-bold font-serif text-[#1E1B4B] italic">
                              {groomName || 'Groom'}
                            </h5>
                          </div>

                          {/* QR CODE MOCKUP SVG */}
                          <div className="w-32 h-32 bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-center relative shadow-inner">
                            <svg className="w-full h-full text-[#1E1B4B]" viewBox="0 0 100 100" fill="currentColor">
                              {/* QR code outer squares */}
                              <rect x="5" y="5" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4" />
                              <rect x="10" y="10" width="10" height="10" />
                              <rect x="75" y="5" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4" />
                              <rect x="80" y="10" width="10" height="10" />
                              <rect x="5" y="75" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4" />
                              <rect x="10" y="80" width="10" height="10" />
                              {/* Random QR code pixels */}
                              <rect x="35" y="10" width="5" height="5" />
                              <rect x="45" y="20" width="10" height="5" />
                              <rect x="60" y="15" width="5" height="15" />
                              <rect x="30" y="35" width="15" height="5" />
                              <rect x="50" y="45" width="5" height="5" />
                              <rect x="15" y="45" width="5" height="15" />
                              <rect x="70" y="50" width="15" height="10" />
                              <rect x="35" y="70" width="10" height="5" />
                              <rect x="60" y="75" width="5" height="20" />
                              <rect x="80" y="40" width="10" height="5" />
                              {/* Center decorative gold heart inside QR */}
                              <circle cx="50" cy="50" r="10" fill="#D97706" />
                              <path d="M47 48.5c-.5-.5-1-1.2-1-2c0-1.5 1-2.5 2.5-2.5 1 0 1.5.5 2 1 .5-.5 1-1 2-1 1.5 0 2.5 1 2.5 2.5 0 .8-.5 1.5-1 2l-3.5 3.5-3.5-3.5z" fill="white" />
                            </svg>
                          </div>

                          <div className="space-y-1">
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Scan QR to share photos</p>
                            <p className="text-[8px] font-bold text-[#D97706] font-mono">{eventDate}</p>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* LIVE GPS CARAVAN SCREEN */}
                    {activeTab === 'caravan' && (
                      <div className="space-y-6 py-2">
                        
                        {/* Header Statistics Dashboard */}
                        <div className="grid grid-cols-3 gap-2 text-center bg-white/5 border border-white/10 p-3 rounded-2xl">
                          <div>
                            <span className="block text-[8px] text-white/50 uppercase tracking-wider">Arrival ETA</span>
                            <span className="text-base font-bold text-white font-mono">
                              {caravanStatus === 'departed' ? '45 Mins' : caravanStatus === 'stuck' ? '32 Mins' : caravanStatus === 'cruising' ? '8 Mins' : '0 Mins'}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-white/50 uppercase tracking-wider">Average Speed</span>
                            <span className="text-base font-bold text-white font-mono">
                              {caravanStatus === 'departed' ? '55 km/h' : caravanStatus === 'stuck' ? '12 km/h' : caravanStatus === 'cruising' ? '48 km/h' : '0 km/h'}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[8px] text-white/50 uppercase tracking-wider">Caravan Size</span>
                            <span className="text-base font-bold text-white font-mono">14 Vehicles</span>
                          </div>
                        </div>

                        {/* Interactive Vector Map Grid */}
                        <div className="bg-[#181818] border border-white/10 rounded-2xl p-4.5 relative overflow-hidden h-48 flex flex-col justify-between">
                          {/* Grid layout */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                          {/* Map Landmarks */}
                          <div className="relative z-10 flex flex-col justify-between h-full font-mono text-[9px] font-bold">
                            <div className="flex justify-between items-center text-slate-400">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#047857]" /> Groom's Estate</span>
                              <span className="flex items-center gap-1 text-rose-400"><MapPin className="w-3 h-3 text-rose-500" /> Royal Palm Venue</span>
                            </div>

                            {/* Simulated Road Line */}
                            <div className="h-1 bg-white/10 relative rounded-full my-6">
                              {/* Dotted path */}
                              <div className="absolute inset-0 bg-repeat-x bg-[radial-gradient(circle,rgba(255,255,255,0.4)_1px,transparent_2px)] bg-[size:8px_4px]" />
                              
                              {/* Car Indicator Position */}
                              <motion.div 
                                animate={{ 
                                  left: caravanStatus === 'departed' ? '10%' : caravanStatus === 'stuck' ? '40%' : caravanStatus === 'cruising' ? '75%' : '98%' 
                                }}
                                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-7.5 h-7.5 bg-indigo-600 rounded-full border border-white/20 flex items-center justify-center shadow-lg"
                              >
                                <Car className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                            </div>

                            {/* Status Alert Text */}
                            <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-left">
                              <span className="text-[#D97706] uppercase text-[7px] block tracking-wider font-sans">Caravan Alert Notice:</span>
                              <p className="text-[8px] text-white/80 font-medium">
                                {caravanStatus === 'departed' && 'Barat departed. Cruising toward Canal road.'}
                                {caravanStatus === 'stuck' && 'Traffic jam on Canal. Slowing down, music and dhol active inside cars!'}
                                {caravanStatus === 'cruising' && 'Traffic cleared. High speed run at Gulberg Boulevard.'}
                                {caravanStatus === 'arrived' && 'Caravan reached venue gates. Flower petals throw initiated.'}
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* SALAMI LEDGER SCREEN */}
                    {activeTab === 'salami' && (
                      <div className="space-y-4">
                        {/* Simulation Success Notification */}
                        {salamiNotification && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl text-center shadow-md flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-4 h-4 fill-white" /> {salamiNotification}
                          </motion.div>
                        )}

                        {/* Gift Stats Box */}
                        <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl">
                          <div>
                            <span className="block text-[8px] text-white/50 uppercase tracking-wider">Total Salami Received</span>
                            <span className="text-2xl font-bold text-white font-mono">PKR {totalSalami.toLocaleString()}</span>
                          </div>
                          <span className="text-[10px] font-bold bg-[#D97706] text-black px-3 py-1.5 rounded-xl flex items-center gap-1 font-mono uppercase">
                            <TrendingUp className="w-3.5 h-3.5" /> {salamiTransactions.length} Gifts
                          </span>
                        </div>

                        {/* Recent Transactions List */}
                        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                          {salamiTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl text-xs hover:border-white/10 transition-colors">
                              <div className="space-y-1 max-w-[70%]">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white">{tx.name}</span>
                                  <span className="text-[8px] text-white/40">{tx.time}</span>
                                </div>
                                <p className="text-[10px] text-white/60 italic leading-snug truncate">"{tx.note}"</p>
                              </div>
                              <div className="text-right space-y-1.5">
                                <span className="block font-bold text-emerald-400 font-mono">PKR {tx.amount.toLocaleString()}</span>
                                <button
                                  onClick={() => handleSendThankYouSMS(tx.id, tx.name)}
                                  className={`text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                    tx.smsSent 
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                      : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                                  }`}
                                >
                                  {tx.smsSent ? 'SMS Sent' : 'Send SMS Thanks'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Bottom Security Footer */}
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[9px] font-mono text-white/40 mt-4">
                    <span>NEXUS LEDGER CHAIN BOOK v2.1</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> SECURE ESCROW ENCRYPTED
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Floating AI Invitation Promo Callout */}
        <div className="mt-16 bg-gradient-to-r from-[#1E1B4B] via-[#0f0e2b] to-[#1E1B4B] rounded-[2.5rem] border border-indigo-950 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.06),transparent_60%)]" />
          <div className="space-y-4 max-w-2xl relative z-10 text-center md:text-left">
            <span className="text-[10px] font-black uppercase text-[#D97706] tracking-[0.2em] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
              Virtual Wedding Advisor
            </span>
            <h3 className="text-2xl md:text-3.5xl font-bold font-heading text-white">
              Need custom recommendations for your Shaadi?
            </h3>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              Ask our Nexus Virtual Event Planner. Get estimates, find wedding halls, photographers, or decorators within your budget, and set up your checklist in Urdu or English.
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link
              href="/ai-planner"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4.5 bg-[#D97706] hover:bg-[#b08e4e] text-black font-bold rounded-full text-[14px] shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer"
            >
              Start Chatting with AI <Sparkles className="w-4 h-4 text-black fill-black" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
