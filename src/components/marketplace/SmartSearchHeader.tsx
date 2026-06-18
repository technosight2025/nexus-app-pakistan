"use client"

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Search, MapPin, Calendar, SearchIcon, Sparkles, X, ChevronRight, Building, Camera, Video, Film, Palette, Utensils, Car, Music, Headphones, Monitor, Users, Briefcase, Diamond } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SPONSORED_ADS = [
  {
    id: "ad-1",
    title: "Grand Taj Banquet Hall",
    tagline: "Exclusive winter bookings now open. Complimentary floral decor upgrade included.",
    tag: "Featured Venue",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    discount: "Free Decor",
    link: "/marketplace"
  },
  {
    id: "ad-2",
    title: "Ahmad Studio",
    tagline: "Book your 2026 coverage today and receive 20% off comprehensive cinematography packages.",
    tag: "Trending Studio",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=600&auto=format&fit=crop",
    discount: "20% OFF",
    link: "/marketplace"
  },
  {
    id: "ad-3",
    title: "Zara's Makeup Bar",
    tagline: "Elite signature bridal makeup. Includes free pre-shoot makeup consultations.",
    tag: "Featured Artist",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop",
    discount: "Free Consultation",
    link: "/marketplace"
  }
];

export function SmartSearchHeader() {
  const [activeMenu, setActiveMenu] = useState<'where' | 'area' | 'when' | 'search' | null>(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Islamabad");
  const [area, setArea] = useState("Any Area");
  const [dateStr, setDateStr] = useState("Add dates");
  const [showAIModal, setShowAIModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % SPONSORED_ADS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { name: "Venues", icon: Building, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Photographers", icon: Camera, color: "text-rose-500", bg: "bg-rose-50" },
    { name: "Studios", icon: Video, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Videographers", icon: Film, color: "text-indigo-500", bg: "bg-indigo-50" },
    { name: "Decorators", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-50" },
    { name: "Makeup Artists", icon: Palette, color: "text-pink-500", bg: "bg-pink-50" },
    { name: "Catering", icon: Utensils, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "Transport", icon: Car, color: "text-slate-500", bg: "bg-slate-50" },
    { name: "Entertainment", icon: Music, color: "text-fuchsia-500", bg: "bg-fuchsia-50" },
    { name: "DJs", icon: Headphones, color: "text-violet-500", bg: "bg-violet-50" },
    { name: "Digital Displays", icon: Monitor, color: "text-cyan-500", bg: "bg-cyan-50" },
    { name: "Workforce", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Business Solutions", icon: Briefcase, color: "text-gray-500", bg: "bg-gray-50" }
  ];

  const cities = ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];
  
  const areasByCity: Record<string, string[]> = {
    "Islamabad": ["F-7", "F-8", "Blue Area", "DHA", "Bahria Town", "E-11", "G-11", "I-8"],
    "Lahore": ["DHA", "Gulberg", "Johar Town", "Bahria Town", "Model Town", "Wapda Town"],
    "Karachi": ["DHA", "Clifton", "PECHS", "Gulshan-e-Iqbal", "Tariq Road", "Bahria Town"]
  };
  
  const dates = ["This Weekend", "Next Week", "This Month", "Next Month", "Pick a custom date"];

  return (
    <div className="w-full bg-gradient-to-br from-[#052E20] via-[#0B402B] to-[#052E20] pt-24 pb-20 px-4 relative z-50 border-b border-white/5">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#C5A880] rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* Ad Display Banner & Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-10">
          {/* Left Column: Headings & Subtext */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#FDF8F0] mb-5 tracking-tight font-medium drop-shadow-sm leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}
            >
              Discover Pakistan's <br className="hidden lg:block" /> Finest Event Experts
            </h1>
            <p className="text-gray-300/90 text-sm md:text-base font-semibold leading-relaxed mb-6 max-w-xl">
              Connect with vetted wedding halls, elite photographers, and trending coordinators. Search real-time availability and get customized quotations directly from the source.
            </p>
            {/* AI Assistant Trigger */}
            <button 
              onClick={() => setShowAIModal(true)}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-white/10 hover:bg-[#C5A880] border border-white/15 backdrop-blur-md transition-all duration-300 shadow-md text-white hover:text-white"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880] group-hover:text-white group-hover:scale-110 transition-all" />
              <span className="font-bold text-xs tracking-wider uppercase">Ask AI Matchmaker</span>
            </button>
          </div>

          {/* Right Column: Dynamic Ad Display Screen */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="w-full max-w-[520px] bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.2rem] p-6.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col min-h-[210px]">
              
              {/* Header Tag */}
              <div className="flex items-center justify-between mb-4.5 z-10">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/90 text-white text-[9px] font-black uppercase tracking-wider border border-white/10 shadow-sm">
                  <Diamond className="w-3 h-3 text-white fill-current" />
                  SPONSORED SPOTLIGHT
                </div>
                <div className="flex gap-1.5">
                  {SPONSORED_ADS.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${adIndex === idx ? 'bg-[#C5A880] w-3.5' : 'bg-white/30'}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Animated Ad Box */}
              <div className="relative flex-1 flex flex-col justify-between z-10 min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={adIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.35 }}
                    className="flex gap-5 items-center flex-1"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/15 relative shadow-lg">
                      <img 
                        src={SPONSORED_ADS[adIndex].image} 
                        alt={SPONSORED_ADS[adIndex].title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-[8.5px] font-bold text-white text-center py-0.5">
                        {SPONSORED_ADS[adIndex].discount}
                      </div>
                    </div>
                    {/* Content text */}
                    <div className="flex-1 text-left">
                      <span className="text-[9.5px] font-extrabold text-[#C5A880] uppercase tracking-wider block mb-0.5">
                        {SPONSORED_ADS[adIndex].tag}
                      </span>
                      <h4 className="font-serif text-lg text-white font-bold tracking-tight mb-1">
                        {SPONSORED_ADS[adIndex].title}
                      </h4>
                      <p className="text-gray-300 text-xs font-semibold leading-relaxed line-clamp-3">
                        {SPONSORED_ADS[adIndex].tagline}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Learn More Button */}
                <div className="mt-3.5 pt-3 border-t border-white/10 flex justify-end">
                  <Link 
                    href={SPONSORED_ADS[adIndex].link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:text-white transition-colors"
                  >
                    Claim Spotlight Offer
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Background Accent glow */}
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-[#C5A880]/15 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Airbnb-style Big Search Pill */}
        <div 
          ref={searchRef}
          className={`relative bg-white rounded-[2.5rem] transition-all duration-300 flex items-center p-2 shadow-[0_20px_50px_rgba(5,46,32,0.15)] mx-auto max-w-4xl border border-gray-100/30 ${
          activeMenu ? 'ring-4 ring-[#C5A880]/20 scale-[1.01] shadow-[0_30px_60px_-15px_rgba(5,46,32,0.25)]' : ''
        }`}>
          
          {/* Location Segment */}
          <div 
            onClick={() => setActiveMenu('where')}
            className={`hidden md:flex flex-col justify-center px-6 lg:px-8 rounded-full h-16 cursor-pointer transition-colors w-1/5 relative group ${activeMenu === 'where' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#F2EFE9] z-10'}`}
          >
            <span className="text-[10px] lg:text-xs font-bold text-[#1D1C17] uppercase tracking-wider">City</span>
            <span className={`text-xs lg:text-sm truncate ${location === 'Anywhere' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>{location}</span>
            {activeMenu !== 'where' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
          </div>

          {/* Area Segment */}
          <div 
            onClick={() => setActiveMenu('area')}
            className={`hidden md:flex flex-col justify-center px-6 lg:px-8 rounded-full h-16 cursor-pointer transition-colors w-1/5 relative group ${activeMenu === 'area' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#F2EFE9] z-10'}`}
          >
            <span className="text-[10px] lg:text-xs font-bold text-[#1D1C17] uppercase tracking-wider">Area</span>
            <span className={`text-xs lg:text-sm truncate ${area === 'Any Area' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>{area}</span>
            {activeMenu !== 'area' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
          </div>
          
          {/* Date Segment */}
          <div 
            onClick={() => setActiveMenu('when')}
            className={`hidden md:flex flex-col justify-center px-6 lg:px-8 rounded-full h-16 cursor-pointer transition-colors w-1/5 relative group ${activeMenu === 'when' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#F2EFE9] z-10'}`}
          >
            <span className="text-[10px] lg:text-xs font-bold text-[#1D1C17] uppercase tracking-wider">When</span>
            <span className={`text-xs lg:text-sm truncate ${dateStr === 'Add dates' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>{dateStr}</span>
            {activeMenu !== 'when' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
          </div>

          {/* Search Query Segment */}
          <div 
            onClick={() => setActiveMenu('search')}
            className={`flex-1 flex flex-col justify-center px-6 rounded-full h-16 transition-colors relative ${activeMenu === 'search' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#F2EFE9] z-10'}`}
          >
            <span className="text-xs font-bold text-[#1D1C17] uppercase tracking-wider hidden md:block">Looking for</span>
            <div className="flex items-center w-full">
              <SearchIcon className="w-5 h-5 text-[#1D1C17] md:hidden mr-2 shrink-0" />
              <input 
                type="text"
                placeholder="Venues, Photographers, Services..."
                className="w-full bg-transparent border-none outline-none text-[#1D1C17] text-sm md:text-base placeholder:text-[#5E6460]/70 font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setActiveMenu('search')}
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#D9467A] hover:bg-[#C23366] text-white h-14 w-14 md:h-16 md:w-32 rounded-full font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_4px_14px_0_rgba(217,70,122,0.39)] hover:shadow-[0_6px_20px_rgba(217,70,122,0.23)] hover:-translate-y-0.5 z-20">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden md:inline text-lg">Search</span>
          </button>

          {/* Unified Dropdown Menus */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#E6E2DA] overflow-hidden z-50 p-6"
              >
                
                {/* Where Menu Content */}
                {activeMenu === 'where' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">Popular Cities</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {cities.map((city, idx) => (
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          key={city}
                          onClick={() => { 
                            setLocation(city); 
                            setArea("Any Area"); // Reset area when city changes
                            setActiveMenu('area'); 
                          }}
                          className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all group ${location === city ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#E6E2DA] hover:border-[#0F5B3E] hover:shadow-md'}`}
                        >
                          <MapPin className={`w-6 h-6 transition-transform group-hover:scale-110 group-hover:-translate-y-1 ${location === city ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`} />
                          <span className={`font-bold text-sm ${location === city ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{city}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Area Menu Content */}
                {activeMenu === 'area' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">Popular Areas in {location}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => { setArea("Any Area"); setActiveMenu('when'); }}
                        className={`p-4 rounded-2xl flex items-center justify-center border-2 transition-all group ${area === 'Any Area' ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#E6E2DA] hover:border-[#0F5B3E] hover:shadow-md'}`}
                      >
                        <span className={`font-bold text-sm ${area === 'Any Area' ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>Any Area</span>
                      </motion.button>
                      
                      {(areasByCity[location] || ["City Center", "DHA", "Cantt"]).map((a, idx) => (
                        <motion.button 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (idx + 1) * 0.03 }}
                          key={a}
                          onClick={() => { setArea(a); setActiveMenu('when'); }}
                          className={`p-4 rounded-2xl flex items-center justify-center border-2 transition-all group ${area === a ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#E6E2DA] hover:border-[#0F5B3E] hover:shadow-md'}`}
                        >
                          <span className={`font-bold text-sm ${area === a ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{a}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* When Menu Content */}
                {activeMenu === 'when' && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    {/* Left Panel: Quick Options */}
                    <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6 border-r border-[#E6E2DA]/50 text-left">
                      <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-2 px-1">Quick Options</p>
                      <div className="flex flex-col gap-2.5">
                        {dates.map((d, idx) => (
                          <button 
                            key={d}
                            onClick={() => { setDateStr(d); setActiveMenu('search'); }}
                            className={`p-3.5 rounded-2xl flex items-center gap-3 border transition-all text-left ${dateStr === d ? 'border-[#0F5B3E] bg-[#E6F0EC]' : 'border-[#E6E2DA] hover:border-[#0F5B3E]/50 hover:bg-[#FAF7F2]'}`}
                          >
                            <Calendar className={`w-4 h-4 ${dateStr === d ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`} />
                            <span className={`font-bold text-xs uppercase tracking-wider ${dateStr === d ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{d}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel: Live Slot Checker */}
                    <div className="lg:col-span-8 flex flex-col text-left">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider px-1">Live Slots Booked Status</p>
                          <h4 className="font-serif text-[#052E20] font-black text-lg mt-0.5">December 2026 (Peak Shaadi Season)</h4>
                        </div>
                        <div className="flex gap-4 text-[10px] font-bold">
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Day Available</span>
                          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Night Booked</span>
                        </div>
                      </div>

                      {/* Calendar Grid */}
                      <div className="bg-[#FAF7F2] p-4.5 rounded-2.5xl border border-[#E6E2DA]/60">
                        {/* Day names */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase text-[#5E6460] tracking-wider mb-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d}>{d}</div>)}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-1.5 text-center">
                          {/* Blank for Tuesday start (December 1, 2026 is Tuesday, so 1 blank for Monday offset) */}
                          <div />

                          {/* Render Days 1 to 31 */}
                          {Array.from({ length: 31 }, (_, i) => {
                            const day = i + 1;
                            const dayOfWeek = (day + 0) % 7; // Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6, Mon=0
                            const isWeekend = dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6; // Fri, Sat, Sun

                            // Mock booked status
                            const isNightBooked = isWeekend; 
                            const isDayBooked = dayOfWeek === 5 || (dayOfWeek === 6 && day % 2 === 0);

                            return (
                              <div 
                                key={day} 
                                className="bg-white rounded-xl border border-[#E6E2DA]/40 p-1.5 flex flex-col items-center justify-between min-h-[52px] shadow-2xs group hover:border-[#0F5B3E] transition-all"
                              >
                                <span className="text-[10px] font-black text-gray-500">{day}</span>
                                
                                {/* D (Day) & N (Night) slots indicators */}
                                <div className="flex gap-1 w-full justify-center mt-1">
                                  {/* Day slot */}
                                  <button
                                    onClick={() => {
                                      if (!isDayBooked) {
                                        setDateStr(`Dec ${day}, 2026 (Day Slot)`);
                                        setActiveMenu(null);
                                      }
                                    }}
                                    disabled={isDayBooked}
                                    className={`w-4.5 py-0.5 rounded-md text-[8px] font-bold text-center border transition-all ${
                                      isDayBooked 
                                        ? 'bg-red-50 text-red-400 border-red-100 cursor-not-allowed' 
                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-[#0F5B3E] hover:text-white hover:border-[#0F5B3E]'
                                    }`}
                                    title={isDayBooked ? "Day Slot: Booked" : `Day Slot: Available. Click to select.`}
                                  >
                                    D
                                  </button>
                                  {/* Night slot */}
                                  <button
                                    onClick={() => {
                                      if (!isNightBooked) {
                                        setDateStr(`Dec ${day}, 2026 (Night Slot)`);
                                        setActiveMenu(null);
                                      }
                                    }}
                                    disabled={isNightBooked}
                                    className={`w-4.5 py-0.5 rounded-md text-[8px] font-bold text-center border transition-all ${
                                      isNightBooked 
                                        ? 'bg-red-50 text-red-400 border-red-100 cursor-not-allowed' 
                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-[#0F5B3E] hover:text-white hover:border-[#0F5B3E]'
                                    }`}
                                    title={isNightBooked ? "Night Slot: Booked" : `Night Slot: Available. Click to select.`}
                                  >
                                    N
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Stats and Info */}
                      <div className="mt-3.5 flex items-center justify-between text-[11px] font-bold text-[#5E6460]">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                          Weekend night slots are 100% booked. Weekdays fully open.
                        </span>
                        <span>Total slots: 62 | Booked: 37 | Available: 25</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Search Menu Content */}
                {activeMenu === 'search' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">Categories</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[350px] overflow-y-auto custom-scrollbar p-1">
                      {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                          <motion.button 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.02 }}
                            key={idx}
                            className="w-full text-left p-3 hover:bg-[#FAF7F2] border border-transparent hover:border-[#E6E2DA] rounded-2xl flex items-center gap-4 transition-all hover:shadow-sm group"
                            onClick={() => { setQuery(cat.name); setActiveMenu(null); }}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 ${cat.bg}`}>
                              <Icon className={`w-5 h-5 ${cat.color}`} />
                            </div>
                            <span className="font-bold text-[#1D1C17] text-sm leading-tight group-hover:text-[#0F5B3E] transition-colors">{cat.name}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Assistant Modal via Portal to escape header z-index context */}
      {mounted && createPortal(
        <AnimatePresence>
          {showAIModal && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowAIModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]"
              >
                {/* Header */}
                <div className="bg-[#0F5B3E] p-6 text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md">
                      <Sparkles className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl">Nexus AI Matchmaker</h3>
                      <p className="text-white/70 text-sm">Find your perfect event vendors in seconds</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAIModal(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-[#FAF7F2] p-6 overflow-y-auto space-y-4">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-[#0F5B3E] flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-[#E6E2DA] shadow-sm">
                      <p className="text-[#1D1C17] text-sm leading-relaxed">
                        Hi! I'm your Nexus AI Matchmaker. Tell me what you're planning! For example:<br/><br/>
                        <span className="italic text-[#5E6460]">"I need a luxury wedding hall in Lahore for 500 guests under 10 Lakh next December."</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pl-11">
                    <button className="text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E] hover:text-white transition-colors border border-[#0F5B3E]/20">
                      Find Luxury Venues
                    </button>
                    <button className="text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E] hover:text-white transition-colors border border-[#0F5B3E]/20">
                      Budget Photographers
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[#E6E2DA] shrink-0">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Describe your perfect event..."
                      className="w-full bg-[#FAF7F2] border border-[#E6E2DA] rounded-full pl-5 pr-12 py-4 text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E]"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D9467A] text-white rounded-full flex items-center justify-center hover:bg-[#C23366] transition-colors shadow-md">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
