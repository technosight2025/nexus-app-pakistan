"use client"

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Calculator, 
  Layout, 
  Check, 
  Heart, 
  Music, 
  Briefcase, 
  Gift, 
  Globe, 
  DollarSign,
  Compass,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export function PlanYourEventSection() {
  const { isRomanUrdu } = useLanguage();
  const [eventType, setEventType] = useState<'wedding' | 'mehndi' | 'corporate' | 'birthday'>('wedding');
  const [guests, setGuests] = useState<number>(300);

  // Dynamic calculations for a high-end pakistani event market
  const stats = useMemo(() => {
    let perHeadBase = 2800; // default for wedding
    if (eventType === 'mehndi') perHeadBase = 1800;
    if (eventType === 'corporate') perHeadBase = 3500;
    if (eventType === 'birthday') perHeadBase = 1200;

    // Apply scale multiplier for larger/smaller guest sizes
    let scaleMultiplier = 1.0;
    if (guests <= 150) scaleMultiplier = 1.25; // higher cost per head for intimate
    else if (guests > 350 && guests <= 700) scaleMultiplier = 0.95;
    else if (guests > 700) scaleMultiplier = 0.88;

    const baseCost = guests * perHeadBase * scaleMultiplier;
    
    // Add realistic range (min: base * 0.85, max: base * 1.35)
    const minCost = Math.round((baseCost * 0.85) / 10000) * 10000;
    const maxCost = Math.round((baseCost * 1.35) / 10000) * 10000;

    // Format utility
    const formatPKR = (num: number) => {
      if (num >= 10000000) {
        return `${(num / 10000000).toFixed(1)} Crore`;
      }
      if (num >= 100000) {
        return `${(num / 100000).toFixed(1)} Lakh`;
      }
      return num.toLocaleString();
    };

    // Guest size category
    let guestCategoryEN = 'Intimate Gathering';
    let guestCategoryRU = 'Choti Taqreeb';
    if (guests > 150 && guests <= 350) {
      guestCategoryEN = 'Mid-Size Celebration';
      guestCategoryRU = 'Aam Taqreeb';
    } else if (guests > 350 && guests <= 700) {
      guestCategoryEN = 'Grand Gala';
      guestCategoryRU = 'Bari Taqreeb';
    } else if (guests > 700) {
      guestCategoryEN = 'Royal Elite Gathering';
      guestCategoryRU = 'Shahi Elite Taqreeb';
    }

    // Dynamic modules based on event type
    const modules = {
      wedding: [
        { name: 'Baraat Timeline', nameRU: 'Baraat Ka Schedule', icon: Calendar },
        { name: 'Valima Seating Chart', nameRU: 'Valima Seating Plan', icon: Layout },
        { name: 'Shadi Budget Tracker', nameRU: 'Shadi Ka Budget', icon: Calculator },
        { name: 'Bilingual Guest Invites', nameRU: 'Bilingual Dawat Namey', icon: Globe },
      ],
      mehndi: [
        { name: 'Dholki Playlist & Sound', nameRU: 'Dholki Playlist aur Sound', icon: Music },
        { name: 'Floral Decor Stage Plan', nameRU: 'Decor Stage Plan', icon: Heart },
        { name: 'Choreography Timeline', nameRU: 'Dance Schedule', icon: Calendar },
        { name: 'Bilingual Digital Cards', nameRU: 'Digital Dawat Cards', icon: Globe },
      ],
      corporate: [
        { name: 'Presenter Schedule', nameRU: 'Presenter Schedule', icon: Calendar },
        { name: 'Audience Seating Builder', nameRU: 'Seating Layout', icon: Layout },
        { name: 'Tech & Sound Liaison', nameRU: 'Tech aur Sound Team', icon: Compass },
        { name: 'Invoice & Vendor Ledger', nameRU: 'Invoices aur Ledger', icon: FileText },
      ],
      birthday: [
        { name: 'Theme & Decor Checklist', nameRU: 'Theme aur Decor list', icon: Heart },
        { name: 'Catering & Candy Bar', nameRU: 'Catering aur Snacks', icon: DollarSign },
        { name: 'RSVP Portal Manager', nameRU: 'RSVP Portal Manager', icon: Users },
        { name: 'Kids Gift Registry', nameRU: 'Gift Registry', icon: Gift },
      ]
    }[eventType];

    // Checklist based on event type
    const checklist = {
      wedding: [
        { text: 'Reserve Premium Marquee (Lahore/Islamabad)', textRU: 'Luxury Marquee book karain', done: true },
        { text: 'Design English & Urdu bilingual invite', textRU: 'English aur Urdu dawat nama design karain', done: true },
        { text: 'Assign seating arrangements for Baraat', textRU: 'Baraat ke liye seating plan set karain', done: false },
        { text: 'Finalize catering menu with culinary chef', textRU: 'Catering menu finalize karain', done: false },
      ],
      mehndi: [
        { text: 'Book professional dhol player and sound system', textRU: 'Dhol player aur sound book karain', done: true },
        { text: 'Confirm fresh floral stage decorations', textRU: 'Floral stage decor confirm karain', done: true },
        { text: 'Coordinate dance practice schedule', textRU: 'Dance practice schedule tayyar karain', done: false },
        { text: 'Design digital Mehndi e-invite', textRU: 'Digital Mehndi card design karain', done: false },
      ],
      corporate: [
        { text: 'Book hotel grand ballroom space', textRU: 'Ballroom space book karain', done: true },
        { text: 'Verify audio-visual sound setup', textRU: 'Audio-visual sound setup check karain', done: true },
        { text: 'Send VIP digital passes to attendees', textRU: 'Attendees ko digital passes bheinjein', done: false },
        { text: 'Finalize speaker deck presentations', textRU: 'Speaker presentations check karain', done: false },
      ],
      birthday: [
        { text: 'Order birthday cake & themed backdrop', textRU: 'Theme cake aur backdrop order karain', done: true },
        { text: 'Send RSVP link to guest list', textRU: 'Guest list ko RSVP link bheinjein', done: true },
        { text: 'Setup kids games & play area', textRU: 'Play area aur games set karain', done: false },
        { text: 'Configure custom gift registry list', textRU: 'Gift registry check karain', done: false },
      ]
    }[eventType];

    return {
      minCost: formatPKR(minCost),
      maxCost: formatPKR(maxCost),
      category: isRomanUrdu ? guestCategoryRU : guestCategoryEN,
      modules,
      checklist,
      readiness: Math.min(100, Math.round(45 + (guests / 1000) * 45))
    };
  }, [eventType, guests, isRomanUrdu]);

  const typeConfig = [
    { id: 'wedding', label: 'Wedding 💍', labelRU: 'Shadi 💍', color: 'from-amber-500 to-rose-500' },
    { id: 'mehndi', label: 'Mehndi 🎵', labelRU: 'Mehndi 🎵', color: 'from-yellow-400 to-orange-500' },
    { id: 'corporate', label: 'Corporate 🏢', labelRU: 'Corporate 🏢', color: 'from-blue-500 to-emerald-600' },
    { id: 'birthday', label: 'Birthday 🎉', labelRU: 'Salgirah 🎉', color: 'from-pink-500 to-purple-500' }
  ];

  return (
    <section className="py-24 bg-[#FAF5EC] dark:bg-[#0B120E] border-t border-[#C5A880]/15 dark:border-slate-800 transition-colors duration-300 overflow-hidden relative z-40">
      {/* Premium ambient light spots */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#EAE6DF] to-transparent dark:from-[#1C2420]/30 opacity-30 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#E5BA73]/10 to-transparent dark:from-[#10B981]/5 opacity-30 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0F5B3E]/10 dark:bg-[#10B981]/10 text-[#0F5B3E] dark:text-[#FAF5EC] text-[10px] md:text-xs font-black uppercase tracking-[0.25em] rounded-full mb-4 border border-[#0F5B3E]/20 dark:border-[#10B981]/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#E5BA73] animate-pulse" />
            {isRomanUrdu ? "Interactive Event Planner" : "Interactive Event OS"}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-900 dark:text-[#FAF5EC] font-black tracking-tight mb-5 leading-tight">
            {isRomanUrdu ? "Apna Bespoke Event Plan Karain" : "Plan Your Dream Event"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            {isRomanUrdu 
              ? "Apne event details select karain aur dekhein ke kis tarha hamara multi-tenant OS aap ke liye dynamic budget aur workspace setup generate karta hai."
              : "Specify your parameters to calculate dynamic cost estimates and instantly view your auto-generated digital workspace before initiating setup."}
          </p>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: Configuration Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-[#1C2420] border border-slate-200/60 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(197,168,128,0.03)] transition-all duration-500">
            <div>
              {/* Step 1: Select Event Type */}
              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {isRomanUrdu ? "Marhala 1: Taqreeb Ki Qism" : "Step 1: Event Type"}
                  </span>
                  <span className="text-xs font-bold text-[#C5A880] capitalize">
                    {eventType}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {typeConfig.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setEventType(t.id as any)}
                      className={`relative overflow-hidden p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 group/btn flex flex-col justify-between h-24 ${
                        eventType === t.id 
                          ? 'bg-[#0F5B3E] text-white border-transparent shadow-[0_8px_20px_rgba(15,91,62,0.25)]' 
                          : 'bg-slate-50/50 dark:bg-black/10 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800/80 hover:border-[#C5A880]/30'
                      }`}
                    >
                      {eventType === t.id && (
                        <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8 blur-sm pointer-events-none" />
                      )}
                      <span className="text-sm font-black tracking-wide">
                        {isRomanUrdu ? t.labelRU : t.label}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${
                        eventType === t.id ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {isRomanUrdu ? "Muntakhib Karain" : "Select"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Guest Count Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {isRomanUrdu ? "Marhala 2: Mehmaano ki Tadaad" : "Step 2: Guest Size"}
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-slate-800 px-3 py-1 rounded-xl">
                    <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="text-xs font-black text-slate-800 dark:text-[#FAF5EC] font-mono">
                      {guests}
                    </span>
                  </div>
                </div>
                
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full accent-[#0F5B3E] dark:accent-[#E5BA73] bg-slate-100 dark:bg-slate-800 h-2 rounded-full cursor-pointer transition-all"
                />

                <div className="flex justify-between items-center mt-2.5 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  <span>50</span>
                  <span>250</span>
                  <span>500</span>
                  <span>750</span>
                  <span>1000+</span>
                </div>
                
                {/* Guest category badge */}
                <div className="mt-4 flex items-center gap-2 px-4 py-2.5 bg-slate-50/80 dark:bg-black/20 border border-slate-100 dark:border-slate-800/80 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {isRomanUrdu ? "Taqreeb ki Noiyat:" : "Scale Class:"}
                  </span>
                  <span className="text-xs font-black text-slate-800 dark:text-[#FAF5EC]">
                    {stats.category}
                  </span>
                </div>
              </div>

              {/* Step 3: Estimated Cost Summary */}
              <div className="bg-[#FAF5EC]/70 dark:bg-black/30 border border-[#E8DCC8]/40 dark:border-slate-800/80 rounded-3xl p-5 md:p-6 mb-8">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {isRomanUrdu ? "Estimated Budget Range" : "Est. Package Range"}
                  </span>
                  <span className="text-[10px] bg-[#0F5B3E]/10 dark:bg-[#E5BA73]/10 text-[#0F5B3E] dark:text-[#E5BA73] px-2 py-0.5 rounded-md font-bold uppercase">
                    PKR Local
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-[#FAF5EC] font-serif tracking-tight mb-2">
                  PKR {stats.minCost} - {stats.maxCost}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed">
                  {isRomanUrdu 
                    ? "Is budget mein Premium Catering, Venue Hire, Decor aur Standard Lights included hain." 
                    : "Estimated range includes gourmet menu, marquee space booking, styling decor, and luxury tech packages."}
                </p>

                {/* Workspace Readiness Indicator */}
                <div className="mt-5 pt-5 border-t border-slate-200/50 dark:border-slate-800/80">
                  <div className="flex justify-between items-center mb-1 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <span>{isRomanUrdu ? "Workspace Tayyari" : "Workspace Provisioning Ready"}</span>
                    <span className="font-mono text-[#0F5B3E] dark:text-[#E5BA73]">{stats.readiness}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0F5B3E] to-[#E5BA73] rounded-full transition-all duration-500" 
                      style={{ width: `${stats.readiness}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Primary CTA */}
            <Link 
              href={`/create-event?type=${eventType}&guests=${guests}`}
              className="w-full block"
            >
              <button className="w-full group bg-[#0F5B3E] hover:bg-[#0A3B2A] dark:bg-[#E5BA73] dark:hover:bg-[#d6aa5c] text-white dark:text-[#0B120E] font-black text-base py-4 px-6 rounded-2xl shadow-lg transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(15,91,62,0.3)] flex items-center justify-center gap-3 cursor-pointer">
                <span>{isRomanUrdu ? "AI Workspace Launch Karain" : "Initialize Event Workspace"}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          {/* Right Panel: Live Workspace Preview */}
          <div className="lg:col-span-7 bg-[#0A120E] dark:bg-[#070D0A] rounded-[2.5rem] p-8 md:p-10 border border-white/5 dark:border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient matrix style background grids */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #E5BA73 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            
            <div>
              {/* Header inside mockup */}
              <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner">
                    <Layout className="w-4 h-4 text-[#E5BA73]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white tracking-wider uppercase font-mono">
                      {isRomanUrdu ? "Nexus System Preview" : "Nexus Workspace Engine"}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-bold font-mono tracking-tight block">
                      TENANT_ID: PK-VIP-0902 // DYNAMIC_GENERATION
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-500 font-mono tracking-widest uppercase">
                    {isRomanUrdu ? "ACTIVE DEPLOY" : "LIVE SYNCRONIZED"}
                  </span>
                </div>
              </div>

              {/* Dynamic Module grid mockups */}
              <div className="mb-8">
                <h5 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  {isRomanUrdu ? "Auto-Provisioned Modules" : "Initialized Workspace Modules"}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {stats.modules.map((mod, i) => {
                      const Icon = mod.icon;
                      return (
                        <motion.div
                          key={mod.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors group/widget"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#E5BA73]/10 flex items-center justify-center border border-[#E5BA73]/20 shrink-0 group-hover/widget:scale-105 transition-transform duration-300">
                            <Icon className="w-5 h-5 text-[#E5BA73]" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white tracking-wide block mb-0.5">
                              {isRomanUrdu ? mod.nameRU : mod.name}
                            </span>
                            <span className="text-[9px] text-slate-500 uppercase font-black tracking-wider block">
                              {isRomanUrdu ? "Tayyar Hai" : "Configured & Live"}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Dynamic Checklist preview */}
              <div className="mb-8">
                <h5 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                  {isRomanUrdu ? "Dynamic Task Checklist Preview" : "Automated Milestone Checklist"}
                </h5>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {stats.checklist.map((item, i) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all rounded-xl"
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                          item.done 
                            ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]' 
                            : 'border-white/15 text-white/20'
                        }`}>
                          {item.done ? <Check className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/30" />}
                        </div>
                        <span className={`text-[12.5px] font-medium leading-normal ${
                          item.done ? 'text-slate-400 line-through font-normal' : 'text-slate-200'
                        }`}>
                          {isRomanUrdu ? item.textRU : item.text}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Invitation Preview Card (Luxury Mini card) */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#121E18] to-[#0A120E] border border-[#C5A880]/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 animate-pulse-slow">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#E5BA73]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="text-center md:text-left">
                <span className="text-[9px] font-black text-[#E5BA73] uppercase tracking-[0.2em] block mb-2">
                  {isRomanUrdu ? "Digital Dawat Nama (Bilingual)" : "Bilingual Digital Invitation Preview"}
                </span>
                <p className="font-serif text-[#FAF5EC] text-base leading-snug mb-1 font-bold">
                  {eventType === 'wedding' && (isRomanUrdu ? "Shadi Ka Dawat Nama" : "The Honor of Your Presence")}
                  {eventType === 'mehndi' && (isRomanUrdu ? "Mehndi Dholki Raat" : "Celebrate the Night of Rhythm")}
                  {eventType === 'corporate' && (isRomanUrdu ? "Corporate Event Invitation" : "Annual Corporate Gala Invitation")}
                  {eventType === 'birthday' && (isRomanUrdu ? "Salgirah Ki Dawat" : "Celebrate the Milestone")}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {isRomanUrdu 
                    ? `Hum ba-khushi ${guests} mehmaano ko dawat detey hain.` 
                    : `Cordially inviting ${guests} honored attendees to our premier celebration.`}
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl w-24">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">
                  {isRomanUrdu ? "URDU PASSED" : "AUTO LOCALE"}
                </span>
                <span className="text-[13px] font-bold text-white font-mono">
                  {isRomanUrdu ? "اردو + EN" : "EN + اردو"}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
