"use client"

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, MapPin, Calendar, SearchIcon, Sparkles, X, ChevronRight, Building, Tent, Home, Utensils, Sun, Briefcase, Camera, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VenueHeroProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}

export function VenueHero({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory
}: VenueHeroProps) {
  const [activeMenu, setActiveMenu] = useState<'where' | 'when' | 'search' | null>(null);
  const [dateStr, setDateStr] = useState("Add dates");
  const [showAIModal, setShowAIModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
    { name: "All Types", icon: Building, color: "text-slate-500", bg: "bg-slate-50" },
    { name: "Marquees", icon: Tent, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Banquet Halls", icon: Building, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Farmhouses", icon: Home, color: "text-amber-500", bg: "bg-amber-50" },
    { name: "Hotels", icon: Building, color: "text-purple-500", bg: "bg-purple-50" },
    { name: "Restaurants", icon: Utensils, color: "text-orange-500", bg: "bg-orange-50" },
    { name: "Outdoor Spaces", icon: Sun, color: "text-rose-500", bg: "bg-rose-50" },
    { name: "Corporate", icon: Briefcase, color: "text-slate-500", bg: "bg-slate-50" },
    { name: "Studios", icon: Video, color: "text-indigo-500", bg: "bg-indigo-50" }
  ];

  const cities = ["All", "Islamabad", "Lahore", "Karachi", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];
  const dates = ["This Weekend", "Next Week", "This Month", "Next Month", "Pick a custom date"];

  return (
    <div className="w-full bg-[#0F5B3E] pt-24 pb-16 px-4 relative z-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C9A227] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title and AI Assistant Button */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-6xl font-serif text-white text-center mb-6 tracking-tight drop-shadow-md">
            Find the perfect venue.
          </h1>
          
          {/* AI Assistant Trigger */}
          <button 
            onClick={() => setShowAIModal(true)}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="w-4 h-4 text-[#C9A227] group-hover:scale-110 transition-transform" />
            <span className="text-white font-bold text-sm tracking-wide">Ask AI Venue Finder</span>
          </button>
        </div>

        {/* Airbnb-style Big Search Pill */}
        <div 
          ref={searchRef}
          className={`relative bg-white rounded-full transition-all duration-300 flex items-center p-2 shadow-2xl mx-auto max-w-4xl border border-white/20 ${
          activeMenu ? 'ring-4 ring-white/30 scale-[1.02] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]' : ''
        }`}>
          
          {/* Location Segment */}
          <div 
            onClick={() => setActiveMenu('where')}
            className={`hidden md:flex flex-col justify-center px-8 rounded-full h-16 cursor-pointer transition-colors w-1/4 relative group ${activeMenu === 'where' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#F2EFE9] z-10'}`}
          >
            <span className="text-xs font-bold text-[#1D1C17] uppercase tracking-wider">Where</span>
            <span className={`text-sm truncate ${selectedCity === 'All' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>{selectedCity}</span>
            {activeMenu !== 'where' && <div className="absolute inset-y-2 right-0 w-[1px] bg-[#E6E2DA] transition-colors group-hover:bg-[#E6E2DA]" />}
          </div>
          
          {/* Date Segment */}
          <div 
            onClick={() => setActiveMenu('when')}
            className={`hidden md:flex flex-col justify-center px-8 rounded-full h-16 cursor-pointer transition-colors w-1/4 relative group ${activeMenu === 'when' ? 'bg-white shadow-lg z-20' : 'hover:bg-[#F2EFE9] z-10'}`}
          >
            <span className="text-xs font-bold text-[#1D1C17] uppercase tracking-wider">When</span>
            <span className={`text-sm truncate ${dateStr === 'Add dates' ? 'text-[#5E6460]' : 'text-[#1D1C17] font-bold'}`}>{dateStr}</span>
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
                placeholder="Marquee, Farmhouse, Hotel..."
                className="w-full bg-transparent border-none outline-none text-[#1D1C17] text-sm md:text-base placeholder:text-[#5E6460]/70 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setActiveMenu('search')}
              />
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={() => setActiveMenu(null)}
            className="bg-[#D9467A] hover:bg-[#C23366] text-white h-14 w-14 md:h-16 md:w-32 rounded-full font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_4px_14px_0_rgba(217,70,122,0.39)] hover:shadow-[0_6px_20px_rgba(217,70,122,0.23)] hover:-translate-y-0.5 z-20"
          >
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
                          onClick={() => { setSelectedCity(city); setActiveMenu('when'); }}
                          className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all group ${selectedCity === city ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#E6E2DA] hover:border-[#0F5B3E] hover:shadow-md'}`}
                        >
                          <MapPin className={`w-6 h-6 transition-transform group-hover:scale-110 group-hover:-translate-y-1 ${selectedCity === city ? 'text-[#0F5B3E]' : 'text-[#5E6460]'}`} />
                          <span className={`font-bold text-sm ${selectedCity === city ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{city}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* When Menu Content */}
                {activeMenu === 'when' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">Quick Dates</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {dates.map((d, idx) => (
                        <motion.button 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.04 }}
                          key={d}
                          onClick={() => { setDateStr(d); setActiveMenu('search'); }}
                          className={`p-4 rounded-2xl flex items-center gap-4 border-2 transition-all group ${dateStr === d ? 'border-[#0F5B3E] bg-[#E6F0EC] shadow-inner' : 'border-[#E6E2DA] hover:border-[#0F5B3E] hover:shadow-md'}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${dateStr === d ? 'bg-[#0F5B3E] text-white' : 'bg-[#F2EFE9] text-[#5E6460] group-hover:bg-[#0F5B3E] group-hover:text-white'}`}>
                            <Calendar className="w-5 h-5" />
                          </div>
                          <span className={`font-bold text-sm ${dateStr === d ? 'text-[#0F5B3E]' : 'text-[#1D1C17]'}`}>{d}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Search Menu Content */}
                {activeMenu === 'search' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xs font-bold text-[#5E6460] uppercase tracking-wider mb-4 px-2">Venue Types</p>
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
                            onClick={() => { setSelectedCategory(cat.name); if (cat.name !== "All Types") { setSearchQuery(cat.name); } else { setSearchQuery(""); } setActiveMenu(null); }}
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
                      <h3 className="font-serif font-bold text-xl">Nexus AI Venue Finder</h3>
                      <p className="text-white/70 text-sm">Find your perfect event venue in seconds</p>
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
                        Hi! I'm your Nexus AI Venue Finder. Tell me what kind of venue you're looking for! For example:<br/><br/>
                        <span className="italic text-[#5E6460]">"I need a luxury farmhouse in Lahore for 500 guests with catering included next December."</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pl-11">
                    <button className="text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E] hover:text-white transition-colors border border-[#0F5B3E]/20">
                      Find Luxury Marquees
                    </button>
                    <button className="text-xs font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E] hover:text-white transition-colors border border-[#0F5B3E]/20">
                      Outdoor Venues
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[#E6E2DA] shrink-0">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Describe your perfect venue..."
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
