"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, MapPin, ArrowRight, Star, 
  CheckCircle, Calendar, Users, Utensils, MessageSquare, 
  Building2, Camera, Globe, Heart, ChevronLeft, ChevronRight, 
  QrCode, Send, MessageCircle, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { HomeEntryCards } from '@/components/home/HomeEntryCards';
import { HomeCategoryChips } from '@/components/home/HomeCategoryChips';
import { HomeExploreHeader } from '@/components/layout/HomeExploreHeader';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

// Stylized Interactive Pakistan Map Cities
const CITIES = [
  { id: 'lahore', name: 'Lahore', x: 260, y: 190, venues: 480, planners: 150, events: '15,200+' },
  { id: 'karachi', name: 'Karachi', x: 90, y: 380, venues: 620, planners: 220, events: '24,000+' },
  { id: 'islamabad', name: 'Islamabad', x: 250, y: 110, venues: 290, planners: 90, events: '9,800+' },
  { id: 'faisalabad', name: 'Faisalabad', x: 210, y: 195, venues: 180, planners: 40, events: '4,100+' },
  { id: 'multan', name: 'Multan', x: 170, y: 250, venues: 140, planners: 30, events: '3,200+' },
  { id: 'peshawar', name: 'Peshawar', x: 190, y: 115, venues: 110, planners: 25, events: '2,900+' },
  { id: 'quetta', name: 'Quetta', x: 70, y: 280, venues: 80, planners: 15, events: '1,500+' }
];

export default function HomePage() {
  const { isRomanUrdu } = useLanguage();
  
  // Airbnb Search States
  const [searchLocation, setSearchLocation] = useState('');
  const [searchEventType, setSearchEventType] = useState('Baraat');
  const [searchGuests, setSearchGuests] = useState('300');
  const [searchDate, setSearchDate] = useState('');

  // Map Hover State
  const [hoveredCity, setHoveredCity] = useState<typeof CITIES[0] | null>(null);

  // Catering Slider State
  const [guestsCount, setGuestsCount] = useState<number>(300);

  // Testimonials Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Masonry Saved State
  const [savedInspirations, setSavedInspirations] = useState<number[]>([]);

  // AI Assistant Chat Simulator States
  const [aiMessageIndex, setAiMessageIndex] = useState(0);
  const aiConversation = [
    { sender: 'user', text: 'I am planning a Baraat for 400 guests in Lahore this November. What should my timeline look like?' },
    { sender: 'concierge', text: 'Congratulations! For a 400-guest Baraat in November: 1. Secure your marquee by July (slots fill early). 2. Book your caterer for a 3-course menu. 3. Finalize setup check-ins at 05:00 PM. Here is a custom checklist.' },
    { sender: 'user', text: 'Can you estimate the number of Biryani daigs needed?' },
    { sender: 'concierge', text: 'Based on 400 guests, you will need approximately 5 Biryani Daigs (10kg rice base) and 4 Qorma Daigs. I can add this directly to your catering checklist!' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAiMessageIndex((prev) => (prev < aiConversation.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Daig calculations
  const biryaniDaigs = Math.ceil(guestsCount / 80);
  const qormaDaigs = Math.ceil(guestsCount / 100);

  // Testimonials array
  const testimonials = [
    {
      quote: "Planning our daughter's wedding from London seemed impossible. Nexus Heritage aligned our budget, managed RSVPs for 600 guests, and helped us book the perfect marquee in minutes.",
      client: "Mrs. & Mr. Siddiqui",
      location: "Lahore / London",
      event: "Baraat Reception",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
    },
    {
      quote: "The guest counter tool was highly accurate! We managed our food budgeting down to the rupee, and the bilingual Urdu invitations were loved by all our family members.",
      client: "Ayesha & Bilal",
      location: "Karachi",
      event: "Mehndi Celebration",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200"
    },
    {
      quote: "As marquee operators, the partner platform has simplified our booking management. No more double bookings or lost deposit receipts. Truly elite hospitality software.",
      client: "Royal Palms Events",
      location: "Lahore",
      event: "Partner Marquee",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    }
  ];

  // Bilingual switcher card state
  const [isUrduCard, setIsUrduCard] = useState(false);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen font-sans pb-20 md:pb-0 antialiased selection:bg-[#C5A880]/20 text-slate-800">
      
      {/* GLOBAL SCROLL-TRANSITIONS NAV BAR */}
      <HomeExploreHeader />

      {/* 1. HERO EXPERIENCE WITH SLOW ZOOM BACKGROUND */}
      <section className="relative w-full min-h-[85vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Parallax Background Visual */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent lg:z-10" />
          <motion.div
            initial={{ scale: 1.03 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop" 
              alt="Luxury Editorial Wedding Setting" 
              className="w-full h-full object-cover opacity-85 lg:opacity-100"
            />
          </motion.div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A880] mb-5 block"
            >
              {isRomanUrdu ? "PAKISTAN KA PREMIER EVENT PARTNER" : "PAKISTAN'S PREMIER EVENT CONCIERGE"}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter leading-[0.95] mb-8"
            >
              Orchestrate.<br />
              Host.<br />
              <span className="font-light italic text-[#C5A880]">Remember.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-650 text-base md:text-lg font-normal mb-10 max-w-xl leading-relaxed text-slate-600"
            >
              {isRomanUrdu 
                ? "Aap ki khwahish, behtareen andaz me tayyar. Pehli rasm se aakhri reception tak, Nexus Heritage aap ke har haseen lamhe ko manane me aap ka sacha shareek hai."
                : "Your vision, perfectly orchestrated. From the first tradition to the final reception, Nexus Heritage is your dedicated partner in celebrating Pakistan's most beautiful family celebrations."}
            </motion.p>

            {/* AIRBNB-INSPIRED SEGMENTED SEARCH BAR */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-2xl bg-white rounded-full p-2 border border-slate-200/80 shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(197,168,128,0.1)] transition-all duration-500 mb-10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                {/* Location select */}
                <div className="flex-1 px-4 py-2 w-full">
                  <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Location</label>
                  <select 
                    value={searchLocation} 
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none border-none cursor-pointer mt-0.5"
                  >
                    <option value="">Choose City</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                  </select>
                </div>

                {/* Event Type */}
                <div className="flex-1 px-4 py-2 w-full">
                  <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Event</label>
                  <select 
                    value={searchEventType} 
                    onChange={(e) => setSearchEventType(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none border-none cursor-pointer mt-0.5"
                  >
                    <option value="Baraat">Baraat</option>
                    <option value="Mehndi">Mehndi / Mayun</option>
                    <option value="Walima">Walima</option>
                  </select>
                </div>

                {/* Date */}
                <div className="flex-1 px-4 py-2 w-full">
                  <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Date</label>
                  <input 
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none border-none mt-0.5 text-slate-500"
                  />
                </div>

                {/* Search Action */}
                <div className="px-2 py-1 w-full sm:w-auto shrink-0 flex justify-end">
                  <Link href={`/explore?location=${searchLocation}&category=${searchEventType}`}>
                    <button className="w-full sm:w-12 h-12 bg-neutral-950 hover:bg-[#C5A880] rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer">
                      <Search className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* HERO CTAS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <Link href="/create-event">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#C5A880] hover:shadow-[0_8px_20px_rgba(197,168,128,0.2)] transition-all cursor-pointer">
                  Start Planning <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/explore">
                <span className="inline-flex items-center px-8 py-4 border border-slate-300 rounded-full text-slate-800 hover:bg-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer">
                  Explore Marketplace
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY STRIP & KEY STATISTICS */}
      <section className="bg-white border-y border-slate-200/50 py-12 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A880]">Trusted By Pakistan's Finest Families</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">15,000+</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Verified Artisans</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">250+</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Cities Covered</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">40,000+</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Events Managed</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">98%</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS TIMELINE */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block mb-2 font-bold">Execution Blueprint</span>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight mb-16">
          Three Simple Steps to Elegance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-bold mb-6 shadow-lg z-10">1</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">1. Plan</h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Design a customized plan containing your specific traditions (Mehndi, Mayun, Walima), budgets, and timelines.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#C5A880] text-white flex items-center justify-center text-lg font-bold mb-6 shadow-lg z-10">2</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">2. Discover</h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Match with elite marquees, premium designers, makeup studios, and traditional pakwans near you.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-center text-lg font-bold mb-6 shadow-lg z-10">3</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">3. Celebrate</h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Enjoy zero-stress execution with automated RSVP trackers, digital dawat namas, and venue signage.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SPLIT CATERING CALCULATOR WIDGET */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-[#FAF6F0] border border-[#E6CDA7]/40 rounded-[2.5rem] p-8 md:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: inputs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#C5A880] block">Catering Estimator</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-950 leading-tight">
                Calculate Culinary Scales Instantly
              </h2>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-550">
                Traditional cooking requirements require precise scaling. Drag the expected guest slider to compute the exact number of catering Daigs needed.
              </p>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-3xs">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-bold text-slate-500">Expected Guests Count</span>
                  <span className="text-xl font-black text-slate-950">{guestsCount} Guests</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1200" 
                  step="25"
                  value={guestsCount} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setGuestsCount(val);
                    if (typeof window !== 'undefined' && navigator.vibrate) {
                      navigator.vibrate(5);
                    }
                  }}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#C5A880] [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#C5A880] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C5A880] [&::-moz-range-thumb]:border-none"
                />
              </div>
            </div>

            {/* Right side: stats & illustration breakdown */}
            <div className="lg:col-span-5 w-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md text-center space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Meal Estimates</span>
                <span className="text-xs font-bold text-[#C5A880] uppercase">10kg Base Pot</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Biryani Daigs</span>
                  <span className="text-3xl font-black text-slate-900">{biryaniDaigs}</span>
                  <span className="text-[9px] text-slate-450 block mt-1">Rice & Meat mix</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Qorma Daigs</span>
                  <span className="text-3xl font-black text-slate-900">{qormaDaigs}</span>
                  <span className="text-[9px] text-slate-455 block mt-1">Curry base pot</span>
                </div>
              </div>

              <div className="pt-2 text-xs font-medium text-slate-500 leading-relaxed text-left border-t border-slate-100">
                🍲 Estimates assume a standard Pakistani wedding catering portion of 250g per head. Setup wagers can scale this dynamically.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PAKISTAN MAP CONSOLE */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-bold">National Infrastructure</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-950 leading-tight">
                Pakistan's Premier Event Network
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We power elite hospitality and creative partnerships across every major urban hub in the country. Hover over city coordinates to explore active events and verified talent registry details.
              </p>

              {/* Display hovered statistics details */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 min-h-[140px] flex flex-col justify-center">
                {hoveredCity ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={hoveredCity.id}
                  >
                    <span className="text-lg font-black text-slate-950 block font-serif">{hoveredCity.name} Hub</span>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <div>
                        <span className="text-[#C5A880] text-lg font-black block">{hoveredCity.venues}</span>
                        <span>Venues</span>
                      </div>
                      <div>
                        <span className="text-[#C5A880] text-lg font-black block">{hoveredCity.planners}</span>
                        <span>Planners</span>
                      </div>
                      <div>
                        <span className="text-[#C5A880] text-lg font-black block">{hoveredCity.events}</span>
                        <span>Events</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-slate-400 text-xs italic text-center">
                    Hover over any city coordinate on the map to inspect live ecosystem data.
                  </div>
                )}
              </div>
            </div>

            {/* Right Interactive SVG Map Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[400px] h-[450px] bg-slate-50 rounded-3xl border border-slate-200/50 p-6 overflow-hidden flex items-center justify-center">
                {/* Stylized Pakistan Map SVG Path */}
                <svg width="340" height="420" viewBox="0 0 340 420" fill="none" className="text-slate-350 z-0">
                  <path 
                    d="M 50,300 C 60,330 90,380 90,390 C 100,400 120,400 130,370 C 140,340 180,310 200,280 C 220,250 250,210 270,180 C 290,150 290,110 250,110 C 210,110 180,130 160,160 C 140,190 100,220 80,260 C 60,300 50,300 50,300 Z" 
                    stroke="#E6CDA7" 
                    strokeWidth="2.5" 
                    strokeDasharray="4 6"
                    fill="#FAF6F0"
                  />
                  {/* Connection lines */}
                  <line x1="90" y1="380" x2="260" y2="190" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="250" y1="110" x2="260" y2="190" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="210" y1="195" x2="260" y2="190" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                </svg>

                {/* City node indicators */}
                {CITIES.map((city) => {
                  const isHovered = hoveredCity?.id === city.id;
                  return (
                    <button
                      key={city.id}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      style={{ left: `${city.x}px`, top: `${city.y}px` }}
                      className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group focus:outline-none"
                    >
                      <span className={`absolute inset-0 rounded-full bg-[#C5A880] transition-all duration-300 ${
                        isHovered ? 'scale-180 opacity-40 animate-ping' : 'scale-100 opacity-20'
                      }`} />
                      <span className={`w-2.5 h-2.5 rounded-full border border-white transition-all duration-300 ${
                        isHovered ? 'bg-[#C5A880] scale-120' : 'bg-slate-900'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. REDESIGNED BILINGUAL DIGITAL INVITATION Mockup */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-white border border-slate-200/50 rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text */}
          <div className="max-w-xl text-left space-y-6">
            <span className="inline-block px-3 py-1 bg-[#C5A880]/15 text-[#C5A880] text-[10px] font-black uppercase tracking-widest rounded-full">
              Complimentary Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-serif text-neutral-900 leading-tight tracking-tight">
              Bilingual Digital Invites — Handcrafted Gift
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed text-slate-500">
              Deliver exquisite bilingual wedding details directly to WhatsApp. Support authentic Urdu calligraphy toggles alongside English text structures, collect automated RSVP stats, and share Google Map links instantly.
            </p>

            {/* Switch Toggle */}
            <div className="flex gap-3">
              <button 
                onClick={() => setIsUrduCard(false)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  !isUrduCard 
                    ? 'bg-neutral-950 text-white border-neutral-950' 
                    : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                English Text
              </button>
              <button 
                onClick={() => setIsUrduCard(true)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  isUrduCard 
                    ? 'bg-neutral-950 text-white border-neutral-950' 
                    : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                Urdu Calligraphy
              </button>
            </div>
          </div>

          {/* Right Mobile / RSVP Mockup */}
          <div className="w-full lg:w-[400px] bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="border-2 border-double border-[#C5A880]/40 p-6 text-center bg-white rounded-2xl relative min-h-[300px] flex flex-col justify-between">
              
              <div className="space-y-4">
                <span className="font-serif italic text-xs text-[#C5A880] block">Bismillah-ir-Rahman-ir-Rahim</span>
                
                <AnimatePresence mode="wait">
                  {isUrduCard ? (
                    <motion.div
                      key="urdu"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="space-y-2 py-4"
                    >
                      <h3 className="font-serif text-3xl font-bold text-neutral-900">شادی کی تقریب</h3>
                      <p className="text-xs font-medium text-slate-500">عائشہ اور بلال کی برات میں شرکت فرما کر شکریہ کا موقع دیں۔</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="english"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2 py-4"
                    >
                      <h3 className="font-serif text-2xl font-bold text-neutral-900">Baraat Ceremony</h3>
                      <p className="text-xs uppercase font-mono tracking-widest text-slate-400">Request the Honour of Your Presence</p>
                      <h4 className="font-serif text-xl font-bold text-[#C5A880]">Ayesha & Bilal</h4>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* QR and RSVP bar */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-6 shrink-0">
                <div className="text-left">
                  <span className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">Scan to RSVP</span>
                  <span className="text-[10px] font-mono font-bold text-slate-700">Shaadi Code: #AB89</span>
                </div>
                <QrCode className="w-8 h-8 text-[#C5A880]" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. BRING ENTRY CARDS & CATEGORY CHIPS SHIFTED BELOW HERO AS PERBlueprints */}
      <HomeEntryCards />
      <HomeCategoryChips />

      {/* 8. FEATURED PROFESSIONALS GRID */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-[#FAF7F2]">
        <div className="flex justify-between items-baseline mb-12">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block font-bold mb-1">Elite Artisans</span>
            <h2 className="text-3xl font-black font-serif text-slate-900 tracking-tight">Featured Professionals</h2>
          </div>
          <Link href="/explore?tab=professionals" className="text-xs font-black uppercase tracking-wider text-slate-900 hover:underline flex items-center gap-1.5 min-h-[48px]">
            Explore Talent <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Oshoot Photography',
              category: 'Wedding Cinematography',
              city: 'Lahore & Islamabad',
              price: 'PKR 150,000 / event',
              rating: '4.9 (120 reviews)',
              image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600'
            },
            {
              name: 'Zara Makeup Studio',
              category: 'Bridal Makeovers',
              city: 'Karachi Hub',
              price: 'PKR 85,000 / bride',
              rating: '4.8 (95 reviews)',
              image: 'https://images.unsplash.com/photo-151285560929-80b456fea0bc?q=80&w=600'
            },
            {
              name: 'Tariq Amin Salon',
              category: 'High-End Styling',
              city: 'Lahore & Karachi',
              price: 'PKR 120,000 / event',
              rating: '4.9 (180 reviews)',
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600'
            }
          ].map((prof, idx) => (
            <div key={idx} className="bg-white border border-slate-200/60 rounded-[28px] overflow-hidden group hover:border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,168,128,0.12)] hover:-translate-y-2 text-left flex flex-col h-full">
              <div className="relative h-56 overflow-hidden bg-neutral-100 shrink-0">
                <img src={prof.image} alt={prof.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute top-4 left-4 bg-white/95 border border-slate-100 px-3 py-1 rounded-full text-[9px] font-black text-slate-800 tracking-wider uppercase">Verified Artisan</span>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A880] uppercase block mb-1 font-bold">{prof.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{prof.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {prof.city}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Starting from</span>
                    <span className="text-sm font-black text-slate-900">{prof.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {prof.rating.split(' ')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FEATURED VENUES HORIZONTAL GALLERY */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-white border-y border-slate-200/50">
        <div className="flex justify-between items-baseline mb-12">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block font-bold mb-1">Elite Venues</span>
            <h2 className="text-3xl font-black font-serif text-slate-900 tracking-tight">Featured Destinations</h2>
          </div>
          <Link href="/explore?tab=venues" className="text-xs font-black uppercase tracking-wider text-slate-900 hover:underline flex items-center gap-1.5 min-h-[48px]">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: 'The Royal Palms',
              city: 'Lahore, Pakistan',
              price: 'PKR 450,000 / event',
              rating: '4.8',
              image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600'
            },
            {
              name: 'The Nishat Banquets',
              city: 'Johar Town, Lahore',
              price: 'PKR 850,000 / event',
              rating: '4.9',
              image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600'
            }
          ].map((venue, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/50 rounded-[28px] overflow-hidden group hover:border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,168,128,0.12)] hover:-translate-y-2 text-left flex flex-col h-full">
              <div className="relative h-64 overflow-hidden bg-neutral-100 shrink-0">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute top-4 left-4 bg-white/95 border border-slate-100 px-3 py-1 rounded-full text-[9px] font-black text-slate-800 tracking-wider uppercase">Verified Partner</span>
                <span className="absolute top-4 right-4 bg-white/95 border border-slate-100 px-2 py-1 rounded-full text-[10px] font-bold text-slate-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {venue.rating}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight font-serif">{venue.name}</h3>
                  <p className="text-xs text-slate-550 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {venue.city}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Starting from</span>
                    <span className="text-sm font-black text-slate-900">{venue.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.5 TRENDING WEDDING INSPIRATIONS MASONRY GRID */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-white border-b border-slate-200/50">
        <div className="flex justify-between items-baseline mb-12">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block font-bold mb-1">Bridal Moodboard</span>
            <h2 className="text-3xl font-black font-serif text-slate-900 tracking-tight">Trending Inspirations</h2>
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">Curated Weekly</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { id: 1, title: 'Traditional Mayun Garland Setups', size: 'h-80', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600' },
            { id: 2, title: 'Champagne Gold Baraat Marquee Themes', size: 'h-96', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600' },
            { id: 3, title: 'Exquisite Walima Floral Stage backdrops', size: 'h-64', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600' },
            { id: 4, title: 'Minimalist Mehndi Seating Layouts', size: 'h-80', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600' }
          ].map((item) => {
            const isSaved = savedInspirations.includes(item.id);
            return (
              <div key={item.id} className="relative rounded-[28px] overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
                <div className={`${item.size} w-full overflow-hidden bg-slate-100`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                </div>
                
                {/* Dark Vignette Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left" />

                {/* Save Inspiration Trigger */}
                <div className="absolute top-4 right-4 z-20">
                  <button 
                    onClick={() => {
                      setSavedInspirations(prev => 
                        prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id]
                      )
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer border ${
                      isSaved ? 'bg-red-500 text-white border-red-500' : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Info Text on Hover */}
                <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-left">
                  <h4 className="text-sm font-black font-serif text-white leading-tight">{item.title}</h4>
                  <span className="text-[9px] font-mono tracking-wider uppercase text-[#E6C594] mt-1 block">Inspire Card</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. AI WEDDING PLANNER MOCKUP INTERFACE */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-[#FAF7F2]">
        <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#E6C594] border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Artificial Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-serif text-white leading-tight tracking-tight">
              AI Event Concierge
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Plan your traditional wedding with our intelligent assistant. Ask about guest sizes, menu counts, slot conflicts, or local timelines.
            </p>

            <Link href="/create-event">
              <button className="px-6 py-3.5 bg-[#E6C594] text-neutral-950 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#ebd0ab] hover:shadow-[0_8px_20px_rgba(230,197,148,0.25)] transition-all cursor-pointer">
                Plan My Wedding with AI
              </button>
            </Link>
          </div>

          {/* Right simulated conversational UI */}
          <div className="lg:col-span-7 w-full bg-slate-900 border border-white/10 rounded-3xl p-6 min-h-[300px] flex flex-col justify-between text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ecosystem Assistant</span>
              </div>
              <span>Live Console</span>
            </div>

            {/* Conversation list */}
            <div className="flex-1 space-y-4 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={aiMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs font-medium text-slate-200">
                      {aiConversation[aiMessageIndex].sender === 'user' 
                        ? aiConversation[aiMessageIndex].text 
                        : aiConversation[aiMessageIndex - 1]?.text || aiConversation[0].text}
                    </div>
                  </div>
                  {/* Concierge message */}
                  <div className="flex justify-start">
                    <div className="bg-slate-950 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] text-xs font-medium text-[#E6C594]">
                      {aiConversation[aiMessageIndex].sender === 'concierge' 
                        ? aiConversation[aiMessageIndex].text 
                        : aiConversation[aiMessageIndex + 1]?.text || aiConversation[1].text}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>Dynamic simulation</span>
              <span className="text-slate-400 font-bold uppercase">Touch Active</span>
            </div>
          </div>

        </div>
      </section>

      {/* 11. LUXURY TESTIMONIALS CAROUSEL */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block mb-2 font-bold">Curated by Excellence</span>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight mb-16">
          Celebrated by Finest Families
        </h2>

        {/* Carousel Wrapper */}
        <div className="relative max-w-4xl mx-auto bg-white border border-slate-200/50 rounded-[2.5rem] p-8 md:p-16 shadow-sm min-h-[350px] flex flex-col justify-between">
          <div className="absolute top-6 left-6 text-7xl font-serif text-[#C5A880]/20 pointer-events-none select-none">“</div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonialIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-center"
            >
              <p className="text-lg md:text-xl font-serif italic text-slate-800 leading-relaxed max-w-2xl mx-auto">
                "{testimonials[activeTestimonialIdx].quote}"
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200">
                  <img src={testimonials[activeTestimonialIdx].image} alt={testimonials[activeTestimonialIdx].client} className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-slate-900 text-sm">{testimonials[activeTestimonialIdx].client}</h4>
                  <p className="text-slate-400 text-xs font-mono">{testimonials[activeTestimonialIdx].location} • {testimonials[activeTestimonialIdx].event}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex justify-center items-center gap-4 mt-10 shrink-0">
            <button
              onClick={() => setActiveTestimonialIdx(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}
              className="w-10 h-10 rounded-full border border-slate-250 hover:bg-slate-50 flex items-center justify-center text-slate-700 cursor-pointer min-h-[48px] min-w-[48px]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <span 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonialIdx ? 'bg-slate-900 w-4' : 'bg-slate-200'
                  }`} 
                />
              ))}
            </div>
            <button
              onClick={() => setActiveTestimonialIdx(prev => prev < testimonials.length - 1 ? prev + 1 : 0)}
              className="w-10 h-10 rounded-full border border-slate-250 hover:bg-slate-50 flex items-center justify-center text-slate-700 cursor-pointer min-h-[48px] min-w-[48px]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. LUXURY FOOTER */}
      <footer className="border-t border-slate-200/60 bg-white text-neutral-800 py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 text-left">
            <span className="text-xl font-serif tracking-wide text-neutral-900 font-black">
              NEXUS <span className="font-semibold font-sans text-lg tracking-widest ml-1 text-[#C5A880]">HERITAGE</span>
            </span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Pakistan's premier platform for curated family celebrations. Handcrafted for beautiful celebrations.
            </p>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Portals</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><Link href="/dashboard" className="hover:text-neutral-900 transition-colors">Planning Portal</Link></li>
              <li><Link href="/business" className="hover:text-neutral-900 transition-colors">Marquee & Venue Dashboard</Link></li>
              <li><Link href="/register?role=artisan" className="hover:text-neutral-900 transition-colors">Vendor & Creative Studio</Link></li>
            </ul>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Discover</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><Link href="/explore?tab=venues" className="hover:text-neutral-900 transition-colors">Elite Venues</Link></li>
              <li><Link href="/explore?tab=professionals" className="hover:text-neutral-900 transition-colors">Artisan Network</Link></li>
              <li><Link href="/explore?tab=vendors" className="hover:text-neutral-900 transition-colors">Verified Vendors</Link></li>
            </ul>
          </div>
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Ecosystem</h4>
            <div className="flex space-x-3 font-mono text-[9px] tracking-tight bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl w-max">
              <span className="text-slate-400">STATUS</span>
              <span className="text-slate-900 font-bold">SECURE</span>
              <span className="text-emerald-600 font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-slate-400">© 2026 Nexus Heritage International. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile-First Bottom Nav Bar */}
      <MobileBottomNav />

      {/* Floating WhatsApp Contact Button */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline-block">
          Need Help? Talk to us on WhatsApp
        </span>
      </a>

    </div>
  );
}
