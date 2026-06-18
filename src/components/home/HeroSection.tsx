"use client"

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Search, 
  Calendar, 
  Mail, 
  Users, 
  Building, 
  Image as ImageIcon, 
  Monitor, 
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
  X,
  Film,
  Palette,
  Utensils,
  Car,
  Music,
  Headphones,
  Briefcase,
  Camera,
  Video
} from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const { isRomanUrdu } = useLanguage();
  const [activeMenu, setActiveMenu] = useState<'where' | 'area' | 'when' | 'search' | null>(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Islamabad");
  const [area, setArea] = useState("Any Area");
  const [dateStr, setDateStr] = useState("Add dates");
  const [showAIModal, setShowAIModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const slideshowImages = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop"
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const scrollingServices = isRomanUrdu ? [
    "Banquets aur Venues",
    "Elite Photographers",
    "Creative Decorators",
    "Premium Caterers",
    "Makeup Artists",
    "Creative Studios",
    "DJs aur Sound Systems"
  ] : [
    "Banquets & Venues",
    "Elite Photographers",
    "Creative Decorators",
    "Premium Caterers",
    "Makeup Artists",
    "Creative Studios",
    "DJs & Sound Systems"
  ];
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const serviceTimer = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % scrollingServices.length);
    }, 2800);
    return () => clearInterval(serviceTimer);
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

  const handleSearchSubmitClick = () => {
    const qStr = new URLSearchParams({
      query,
      location,
      area,
      date: dateStr
    }).toString();
    router.push(`/marketplace?${qStr}`);
  };

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
    <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#FDF8F0] border-b border-[#ECE7DF]">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center w-full h-full"
            style={{ 
              backgroundImage: `url('${slideshowImages[currentSlideIndex]}')`,
              maskImage: 'linear-gradient(to top right, black 50%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to top right, black 50%, transparent 95%)'
            }}
          />
        </AnimatePresence>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          
          {/* Centered Hero Content */}
          <div className="w-full max-w-3xl flex flex-col items-center justify-center z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-[#FAF7F2] border border-[#ECE7DF] rounded-full mb-4">
              <span className="text-[10px] font-[800] tracking-[0.08em] text-[#0F5B3E] uppercase">
                {isRomanUrdu ? "Pakistan Ka #1 Event Ecosystem" : "Pakistan's #1 Event Ecosystem"}
              </span>
            </div>
            
            {/* Hero Heading */}
            <h1 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] leading-[1.05] font-[700] text-[#0F5B3E] font-serif tracking-tight mb-4 flex flex-col items-center">
              <span>{isRomanUrdu ? "Aj Aap Kya Plan Kar Rahe Hain?" : "What are you planning today?"}</span>
            </h1>
            
            {/* Modern Scrolling Service Badge */}
            <div className="mb-6 h-[44px] flex items-center justify-center">
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2 bg-white border border-[#ECE7DF]/80 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                <Sparkles className="w-4 h-4 text-[#C9A227] animate-pulse" />
                <span className="text-[10.5px] font-[800] text-[#6B7280] uppercase tracking-wider">
                  {isRomanUrdu ? "Verified Dhundein" : "Find Verified"}
                </span>
                <span className="text-gray-300">|</span>
                <div className="w-[150px] sm:w-[190px] h-[24px] overflow-hidden relative flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentServiceIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute left-0 font-sans font-extrabold text-[#0F5B3E] text-[12.5px] sm:text-[13.5px] tracking-wide whitespace-nowrap uppercase"
                    >
                      {scrollingServices[currentServiceIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Hero Paragraph */}
            <p className="text-[14.5px] sm:text-[15.5px] text-[#4B5563] mb-8 leading-[1.6] font-[500] max-w-[600px]">
              {isRomanUrdu 
                ? "Shadi plan krain, creative studios manage krain, venues chalayein, aur haseen yadein mehfooz krain — sab aik platform par."
                : "Plan weddings, manage creative studios, operate venues, and preserve memories — all in one unified standard."}
            </p>
          </div>

          {/* Center Section: Airbnb-style Search System */}
          <div className="w-full max-w-4xl mx-auto z-30 relative mb-8">
            
            {/* Ask AI Trigger */}
            <div className="flex justify-center mb-4">
              <button 
                type="button"
                onClick={() => setShowAIModal(true)}
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#E6F0EC] hover:bg-[#0F5B3E] border border-[#0F5B3E]/10 backdrop-blur-md transition-all duration-300 shadow-sm text-[#0F5B3E] hover:text-white"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227] group-hover:text-white group-hover:scale-110 transition-all animate-pulse" />
                <span className="font-bold text-[10px] tracking-wider uppercase">
                  {isRomanUrdu ? "AI Matchmaker Se Pucho" : "Ask AI Matchmaker"}
                </span>
              </button>
            </div>

            {/* Airbnb-style Big Search Pill */}
            <div 
              ref={searchRef}
              className={`relative bg-white rounded-[2.5rem] transition-all duration-300 flex items-center p-2 shadow-[0_15px_45px_rgba(5,46,32,0.1)] border border-[#ECE7DF] ${
              activeMenu ? 'ring-4 ring-[#C9A227]/20 scale-[1.01] shadow-[0_20px_50px_rgba(5,46,32,0.15)]' : ''
            }`}>
              
              {/* Location Segment */}
              <div 
                onClick={() => setActiveMenu('where')}
                className={`hidden md:flex flex-col justify-center px-6 lg:px-8 rounded-full h-16 cursor-pointer transition-colors w-1/5 relative group ${activeMenu === 'where' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#FAF7F2] z-10'}`}
              >
                <span className="text-[10px] lg:text-xs font-bold text-[#1D1C17] uppercase tracking-wider">
                  {isRomanUrdu ? "Shehar" : "City"}
                </span>
                <span className={`text-xs lg:text-sm truncate ${location === 'Anywhere' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>{location}</span>
                {activeMenu !== 'where' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
              </div>

              {/* Area Segment */}
              <div 
                onClick={() => setActiveMenu('area')}
                className={`hidden md:flex flex-col justify-center px-6 lg:px-8 rounded-full h-16 cursor-pointer transition-colors w-1/5 relative group ${activeMenu === 'area' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#FAF7F2] z-10'}`}
              >
                <span className="text-[10px] lg:text-xs font-bold text-[#1D1C17] uppercase tracking-wider">
                  {isRomanUrdu ? "Ilaqa" : "Area"}
                </span>
                <span className={`text-xs lg:text-sm truncate ${area === 'Any Area' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>
                  {area === 'Any Area' && isRomanUrdu ? "Koi Bhi Ilaqa" : area}
                </span>
                {activeMenu !== 'area' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
              </div>
              
              {/* Date Segment */}
              <div 
                onClick={() => setActiveMenu('when')}
                className={`hidden md:flex flex-col justify-center px-6 lg:px-8 rounded-full h-16 cursor-pointer transition-colors w-1/5 relative group ${activeMenu === 'when' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#FAF7F2] z-10'}`}
              >
                <span className="text-[10px] lg:text-xs font-bold text-[#1D1C17] uppercase tracking-wider">
                  {isRomanUrdu ? "Kab" : "When"}
                </span>
                <span className={`text-xs lg:text-sm truncate ${dateStr === 'Add dates' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>
                  {dateStr === 'Add dates' && isRomanUrdu ? "Taqreeb Ki Date" : dateStr}
                </span>
                {activeMenu !== 'when' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
              </div>

              {/* Search Query Segment */}
              <div 
                onClick={() => setActiveMenu('search')}
                className={`flex-1 flex flex-col justify-center px-6 rounded-full h-16 transition-colors relative ${activeMenu === 'search' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#FAF7F2] z-10'}`}
              >
                <span className="text-xs font-bold text-[#1D1C17] uppercase tracking-wider hidden md:block">
                  {isRomanUrdu ? "Kya Chahye" : "Looking for"}
                </span>
                <div className="flex items-center w-full">
                  <Search className="w-5 h-5 text-[#1D1C17] md:hidden mr-2 shrink-0" />
                  <input 
                    type="text"
                    placeholder={isRomanUrdu ? "Venues, Photographers, Services..." : "Venues, Photographers, Services..."}
                    className="w-full bg-transparent border-none outline-none text-[#1D1C17] text-sm md:text-base placeholder:text-[#5E6460]/70 font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setActiveMenu('search')}
                  />
                </div>
              </div>

              {/* Search Button */}
              <button 
                type="button"
                onClick={handleSearchSubmitClick}
                className="bg-[#0F5B3E] hover:bg-[#0A422C] text-white h-14 w-14 md:h-16 md:w-32 rounded-full font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-md hover:shadow-lg hover:-translate-y-0.5 z-20"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden md:inline text-base">
                  {isRomanUrdu ? "Talaash" : "Search"}
                </span>
              </button>

              {/* Unified Dropdown Menus */}
              <AnimatePresence>
                {activeMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(5,46,32,0.15)] border border-[#ECE7DF] overflow-hidden z-50 p-6"
                  >
                    
                    {/* Where Menu Content */}
                    {activeMenu === 'where' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">
                          {isRomanUrdu ? "Mashhoor Shehar" : "Popular Cities"}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {cities.map((cityOption, idx) => (
                            <button 
                              type="button"
                              key={cityOption}
                              onClick={() => { 
                                setLocation(cityOption); 
                                setArea("Any Area"); // Reset area when city changes
                                setActiveMenu('area'); 
                              }}
                              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all group ${location === cityOption ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#ECE7DF] hover:border-[#0F5B3E] hover:shadow-md'}`}
                            >
                              <MapPin className={`w-6 h-6 transition-transform group-hover:scale-110 group-hover:-translate-y-1 ${location === cityOption ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`} />
                              <span className={`font-bold text-sm ${location === cityOption ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{cityOption}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Area Menu Content */}
                    {activeMenu === 'area' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">
                          {isRomanUrdu ? `${location} Ke Mashhoor Ilaqe` : `Popular Areas in ${location}`}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button 
                              type="button"
                              onClick={() => { setArea("Any Area"); setActiveMenu('when'); }}
                              className={`p-4 rounded-2xl flex items-center justify-center border-2 transition-all group ${area === 'Any Area' ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#ECE7DF] hover:border-[#0F5B3E] hover:shadow-md'}`}
                            >
                            <span className={`font-bold text-sm ${area === 'Any Area' ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>
                              {isRomanUrdu ? "Koi Bhi Ilaqa" : "Any Area"}
                            </span>
                          </button>
                          
                          {(areasByCity[location] || ["City Center", "DHA", "Cantt"]).map((a, idx) => (
                            <button 
                              type="button"
                              key={a}
                              onClick={() => { setArea(a); setActiveMenu('when'); }}
                              className={`p-4 rounded-2xl flex items-center justify-center border-2 transition-all group ${area === a ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#ECE7DF] hover:border-[#0F5B3E] hover:shadow-md'}`}
                            >
                              <span className={`font-bold text-sm ${area === a ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{a}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* When Menu Content */}
                    {activeMenu === 'when' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">
                          {isRomanUrdu ? "Taqreeb Ki Date" : "Quick Dates"}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {dates.map((d, idx) => (
                            <button 
                              type="button"
                              key={d}
                              onClick={() => { setDateStr(d); setActiveMenu('search'); }}
                              className={`p-4 rounded-2xl flex items-center gap-4 border-2 transition-all group ${dateStr === d ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#ECE7DF] hover:border-[#0F5B3E] hover:shadow-md'}`}
                            >
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${dateStr === d ? 'bg-[#0F5B3E] text-white' : 'bg-[#FAF7F2] text-[#5E6460] group-hover:bg-[#0F5B3E] group-hover:text-white'}`}>
                                <Calendar className="w-5 h-5" />
                              </div>
                              <span className={`font-bold text-sm ${dateStr === d ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{d}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Search Menu Content */}
                    {activeMenu === 'search' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">
                          {isRomanUrdu ? "Zumaar (Categories)" : "Categories"}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[280px] overflow-y-auto custom-scrollbar p-1">
                          {categories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                              <button 
                                type="button"
                                key={idx}
                                className="w-full text-left p-3 hover:bg-[#FAF7F2] border border-transparent hover:border-[#ECE7DF] rounded-2xl flex items-center gap-4 transition-all hover:shadow-sm group"
                                onClick={() => { setQuery(cat.name); setActiveMenu(null); }}
                              >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 ${cat.bg}`}>
                                  <Icon className={`w-5 h-5 ${cat.color}`} />
                                </div>
                                <span className="font-bold text-[#1D1C17] text-sm leading-tight group-hover:text-[#0F5B3E] transition-colors">{cat.name}</span>
                              </button>
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

          {/* Centered Hero Content - Bottom Part */}
          <div className="w-full max-w-3xl flex flex-col items-center justify-center z-10 mt-10">
            {/* Merchant / Secondary Action quick link row */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] font-[600] text-[#6B7280] mb-2">
              <span>{isRomanUrdu ? "Kya aap merchant hain?" : "Are you a merchant?"}</span>
              <Link href="/business" className="text-[#0F5B3E] hover:underline flex items-center gap-1 font-bold">
                {isRomanUrdu ? "Apna Karobar Barhayein" : "Grow Your Business"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <button type="button" className="text-[#0F5B3E] hover:underline flex items-center gap-1.5 font-bold">
                <svg className="w-4 h-4 fill-none stroke-current mr-1 shrink-0" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                </svg>
                {isRomanUrdu ? "Demo Dekhein" : "Watch Demo"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decluttered Full-width Horizontal Stats Banner */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 relative z-10">
        <div className="bg-white/70 backdrop-blur-md border border-[#ECE7DF]/75 rounded-[32px] p-5 shadow-[0_12px_35px_rgba(5,46,32,0.03)] w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 divide-y-0 sm:divide-x divide-[#ECE7DF]/60">
            
            {/* Stat 1 */}
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#0F5B3E]" />
              </div>
              <div>
                <div className="text-[16px] sm:text-[18px] font-extrabold text-[#1F2937] leading-none">10,000+</div>
                <div className="text-[10px] font-semibold text-[#6B7280] leading-tight mt-1">
                  {isRomanUrdu ? "Mehmaan Manage Kiye" : "Event Guests Managed"}
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3 justify-center sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
                <Building className="w-5 h-5 text-[#0F5B3E]" />
              </div>
              <div>
                <div className="text-[16px] sm:text-[18px] font-extrabold text-[#1F2937] leading-none">500+</div>
                <div className="text-[10px] font-semibold text-[#6B7280] leading-tight mt-1">
                  {isRomanUrdu ? "Karobar Onboard Kiye" : "Businesses Onboarded"}
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3 justify-center sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#0F5B3E]" />
              </div>
              <div>
                <div className="text-[16px] sm:text-[18px] font-extrabold text-[#1F2937] leading-none">50,000+</div>
                <div className="text-[10px] font-semibold text-[#6B7280] leading-tight mt-1">
                  {isRomanUrdu ? "Invites Bheje Gaye" : "Invitations Delivered"}
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3 justify-center sm:pl-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5 text-[#0F5B3E]" />
              </div>
              <div>
                <div className="text-[16px] sm:text-[18px] font-extrabold text-[#1F2937] leading-none">1M+</div>
                <div className="text-[10px] font-semibold text-[#6B7280] leading-tight mt-1">
                  {isRomanUrdu ? "Yadein Mehfooz Kin" : "Memories Captured"}
                </div>
              </div>
            </div>

          </div>
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
                      <p className="text-white/70 text-sm">
                        {isRomanUrdu ? "Kuch hi seconds mein behtareen vendors dhundein" : "Find your perfect event vendors in seconds"}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
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
                    <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-[#ECE7DF] shadow-sm">
                      <p className="text-[#1D1C17] text-sm leading-relaxed">
                        {isRomanUrdu ? (
                          <>
                            Salam! Main apka Nexus AI Matchmaker hoon. Mujhe batayein ap kya plan kar rahe hain! Jaise ke:<br/><br/>
                            <span className="italic text-[#5E6460]">"Lahore mein 500 guests ke liye shadi hall chahiye 10 Lakh ke andar aglay December."</span>
                          </>
                        ) : (
                          <>
                            Hi! I'm your Nexus AI Matchmaker. Tell me what you're planning! For example:<br/><br/>
                            <span className="italic text-[#5E6460]">"I need a luxury wedding hall in Lahore for 500 guests under 10 Lakh next December."</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pl-11">
                    <button 
                      type="button"
                      onClick={() => setQuery("Venues")}
                      className="text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E] hover:text-white transition-colors border border-[#0F5B3E]/20"
                    >
                      {isRomanUrdu ? "Luxury Venues Dhundein" : "Find Luxury Venues"}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setQuery("Photographers")}
                      className="text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E] hover:text-white transition-colors border border-[#0F5B3E]/20"
                    >
                      {isRomanUrdu ? "Sastay Photographers" : "Budget Photographers"}
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[#ECE7DF] shrink-0">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={isRomanUrdu ? "Apni perfect taqreeb ke baare mein batayein..." : "Describe your perfect event..."}
                      className="w-full bg-[#FAF7F2] border border-[#ECE7DF] rounded-full pl-5 pr-12 py-4 text-[#1D1C17] focus:outline-none focus:border-[#0F5B3E]"
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#D9467A] text-white rounded-full flex items-center justify-center hover:bg-[#C23366] transition-colors shadow-md"
                    >
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
    </section>
  );
}
