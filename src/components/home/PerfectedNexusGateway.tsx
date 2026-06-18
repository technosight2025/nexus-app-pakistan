"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, MapPin, CloudLightning, ShieldAlert, ArrowRight, Star, ChevronDown, CheckCircle, Calculator, Store, Camera, Globe, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AnimatedDropdown = ({ options, placeholder, value, onChange, isSleek }: any) => {
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
    <div className="relative flex-1 z-50 w-full sm:w-auto" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full text-gray-900 py-4 md:py-5 px-5 rounded-2xl md:rounded-full border border-transparent flex items-center justify-between font-bold cursor-pointer transition-colors ${isSleek ? 'bg-transparent hover:bg-gray-50/50' : 'bg-slate-50 focus-within:border-[#C5A880] shadow-sm hover:bg-white'}`}
      >
        <span className={value ? "text-gray-900 whitespace-nowrap" : "text-gray-500 whitespace-nowrap"}>{selectedLabel}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 ml-2 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C5A880]' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full left-0 min-w-[220px] mt-3 bg-white/90 backdrop-blur-3xl rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/50 z-50 p-2"
          >
            {options.map((opt: any, index: number) => (
              <motion.div
                key={opt.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-5 py-3.5 mb-1 last:mb-0 cursor-pointer rounded-2xl transition-all duration-300 font-bold text-[15px] hover:bg-[#C5A880]/10 hover:text-[#C5A880] hover:translate-x-1 ${value === opt.value ? 'bg-[#C5A880]/10 text-[#C5A880]' : 'text-gray-700'}`}
              >
                {opt.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export function PerfectedNexusGateway() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('');

  const eventWords = ["BARAAT", "MEHNDI", "WALIMA", "BIRTHDAY", "CONVOCATION", "OFFICE GALA"];
  const [wordIndex, setWordIndex] = useState(0);

  React.useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % eventWords.length);
    }, 2500);
    return () => clearInterval(wordTimer);
  }, [eventWords.length]);

  // Switched to much brighter, joyful, radiant luxury event imagery
  const slides = [
    { id: 1, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" }, // Happy wedding couple / bright
    { id: 2, image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" }, // Bright, warm luxury table setup
    { id: 3, image: "https://images.unsplash.com/photo-1530103862676-de88b6b080b0?q=80&w=2070&auto=format&fit=crop" }  // Joyful celebration / toast
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full bg-[#FDFBF9] min-h-screen font-sans pb-24 selection:bg-amber-100 antialiased -mt-16 md:-mt-20">
      
      {/* 1. MASSIVE CENTERED SLIDER HERO (Radiant & Happy) */}
      <div className="relative w-full h-screen min-h-[700px] flex items-center justify-center mb-16 shadow-2xl bg-black">
        
        {/* Isolated Background Wrapper with Overflow Hidden so dropdowns aren't clipped */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Crossfading Backgrounds */}
          <AnimatePresence>
            <motion.img
              key={currentSlide}
              src={slides[currentSlide].image}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 8, ease: "easeOut" }
              }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Nexus Luxury Experience"
            />
          </AnimatePresence>

          {/* Softened, warm overlay to let the "happy" brightness shine while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-[#052E20]/90 z-10" />

          {/* Floating Animated Event Pills (Desktop Only) */}
          <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
            {[
              { name: "BARAAT", top: "20%", left: "10%", delay: 0 },
              { name: "MEHNDI", top: "65%", left: "5%", delay: 1.5 },
              { name: "WALIMA", top: "25%", right: "12%", delay: 0.7 },
              { name: "BIRTHDAY", top: "70%", right: "8%", delay: 2.2 },
              { name: "CONVOCATION", top: "15%", left: "40%", delay: 1.1 },
              { name: "OFFICE GALA", top: "75%", left: "50%", delay: 0.4 },
            ].map((evt, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 4, repeat: Infinity, delay: evt.delay, ease: "easeInOut" }}
                className="absolute px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 font-bold tracking-widest text-[10px] shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center"
                style={{ top: evt.top, left: evt.left, right: evt.right }}
              >
                <Sparkles className="w-3.5 h-3.5 inline-block mr-2 text-[#E6CDA7]" />
                {evt.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centered Typography & Search */}
        <div className="relative z-[60] flex flex-col items-center text-center px-4 w-full max-w-5xl">
          <span className="inline-block px-4 py-1.5 md:px-5 md:py-2 bg-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full mb-4 border border-white/40 backdrop-blur-md shadow-lg">
            A Celebration of Joy
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-2 leading-[1.05] tracking-tight flex flex-col items-center">
            <span className="font-light italic text-[#F5EFE4]">Planning your perfect</span>
            <div className="h-[1.2em] relative overflow-hidden flex items-center justify-center w-full mt-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-black drop-shadow-2xl absolute text-[#E6CDA7] tracking-tight uppercase"
                >
                  {eventWords[wordIndex]}?
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          
          <p className="text-white/90 text-sm md:text-lg lg:text-xl font-medium mb-8 max-w-2xl drop-shadow-lg">
            Discover Pakistan's most exclusive venues, legendary artisans, and bespoke event experiences to bring your happiest moments to life.
          </p>

          {/* Radiant, Sleek Animated Search Bar */}
          <div className="w-full relative group max-w-4xl mt-4 z-30">
            {/* Animated Glow Behind the Search Bar */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A880] via-[#E6CDA7] to-[#C5A880] rounded-3xl md:rounded-full blur-md opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-pulse" />
            
            {/* The Search Bar Container */}
            <div className="relative w-full bg-white/95 backdrop-blur-3xl p-1.5 md:p-2 rounded-3xl md:rounded-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white flex flex-col md:flex-row items-center gap-1 transition-all duration-300 focus-within:scale-[1.02] focus-within:ring-4 focus-within:ring-[#C5A880]/30">
               
               {/* Text Search */}
               <div className="flex-[1.5] flex w-full md:w-auto overflow-hidden items-center transition-colors rounded-2xl md:rounded-full hover:bg-gray-50/50">
                  <Search className="w-5 h-5 text-[#C5A880] ml-5 shrink-0" />
                  <input type="text" placeholder="Search for your dream venue or artisan..." className="w-full py-4 md:py-5 px-3 focus:outline-none text-gray-900 font-medium placeholder-gray-400 bg-transparent" />
               </div>
               
               {/* Vertical Divider (Desktop) */}
               <div className="hidden md:block w-px h-8 bg-gray-200 mx-1" />
               
               {/* Dropdowns & Submit */}
               <div className="w-full md:w-auto flex flex-col sm:flex-row gap-1 items-center flex-1">
                 <AnimatedDropdown 
                   placeholder="Event Type"
                   value={eventType}
                   onChange={setEventType}
                   isSleek={true}
                   options={[
                     { value: 'wedding', label: 'Wedding' },
                     { value: 'corporate', label: 'Corporate Event' },
                     { value: 'party', label: 'Private Party' }
                   ]}
                 />
                 
                 {/* Vertical Divider (Desktop) */}
                 <div className="hidden sm:block w-px h-8 bg-gray-200 mx-1" />
                 
                 <AnimatedDropdown 
                   placeholder="City"
                   value={city}
                   onChange={setCity}
                   isSleek={true}
                   options={[
                     { value: 'lahore', label: 'Lahore' },
                     { value: 'karachi', label: 'Karachi' },
                     { value: 'islamabad', label: 'Islamabad' }
                   ]}
                 />
                 
                 <button className="relative overflow-hidden group/btn w-full sm:w-auto ml-1 bg-gradient-to-r from-[#E6CDA7] to-[#C5A880] text-[#052E20] px-10 py-4 md:py-5 rounded-2xl md:rounded-full font-black text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(197,168,128,0.5)] whitespace-nowrap">
                   <div className="absolute top-0 left-0 w-1/2 h-full bg-white/40 -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[300%] transition-transform duration-700 ease-out" />
                   <span className="relative z-10">Start Planning</span>
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 md:bottom-40 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      {/* 2. SECONDARY GATEWAYS (Business & Artisan) */}
      <div className="max-w-[1400px] mx-auto px-4 mb-16 mt-12 md:mt-16 relative z-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Business Gateway (Left) */}
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-xl h-[400px] md:h-[450px] cursor-pointer border border-[#F5EFE4]">
            <img src="/images/vendor_dashboard_venue.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Vendor Gateway" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#052E20]/95 via-[#052E20]/60 to-black/10 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 w-max border border-white/30 shadow-sm">
                For Business
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-md">The Elite Network</h3>
              <p className="text-emerald-50/90 text-sm font-light mb-4 opacity-100 transition-all duration-500 line-clamp-2">
                Grand, professional, yet deeply hospitable. Join the premier network of elite venues and enterprise vendors.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
                {["Venue Management", "Smart CRM", "Quotation Builder", "Staff Tracking"].map(feature => (
                  <div key={feature} className="flex items-center gap-2.5 px-3 py-2.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg hover:bg-black/60 transition-colors">
                    <CheckCircle className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                    <span className="text-xs font-bold text-white tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-max bg-gradient-to-r from-[#B01E5A] to-[#C92A70] text-white font-bold px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg flex items-center gap-2 group-hover:shadow-[0_8px_30px_rgba(176,30,90,0.4)]">
                Partner with Nexus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Bento Box 3: Artisans (Right) */}
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-xl h-[400px] md:h-[450px] cursor-pointer border border-[#F5EFE4]">
            <img src="/images/artisan_freelancer_elite.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Artisan Gateway" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#052E20]/95 via-[#052E20]/60 to-black/10 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 w-max border border-white/30 shadow-sm">
                For Artisans
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-md">Bespoke Heritage</h3>
              <p className="text-emerald-50/90 text-sm font-light mb-4 opacity-100 transition-all duration-500 line-clamp-2">
                Intimate, craft-focused, and creative. Showcase your unparalleled craft to a discerning audience.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
                {["Digital Storefront", "Direct Bookings", "Creative Freedom", "Analytics"].map(feature => (
                  <div key={feature} className="flex items-center gap-2.5 px-3 py-2.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg hover:bg-black/60 transition-colors">
                    <CheckCircle className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                    <span className="text-xs font-bold text-white tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-max bg-white text-[#052E20] font-bold px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg flex items-center gap-2 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
                Join as an Artisan <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* THE BENTO BOX GRID (12 Cols) */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 px-4 mt-4 pb-24 auto-rows-[minmax(180px,auto)]">
        
        {/* ROW 1: THE TRUST BANNER (12 COLS) */}
        <div className="md:col-span-12 py-8 flex flex-col items-center justify-center border border-slate-200 bg-white/50 rounded-3xl shadow-sm backdrop-blur-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Trusted by Pakistan's Elite Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 w-full px-4">
            <div className="text-xl md:text-2xl font-black font-serif tracking-tighter text-slate-800">PEARL CONTINENTAL</div>
            <div className="text-xl md:text-2xl font-black tracking-widest uppercase text-slate-800">Avari</div>
            <div className="text-lg md:text-xl font-bold italic tracking-wider text-slate-800">Shiza Hassan</div>
            <div className="text-xl md:text-2xl font-medium tracking-widest text-slate-800">NISHAT</div>
          </div>
        </div>

        {/* ROW 2: FEATURED SHOWCASES */}
        
        {/* Block A: Elite Partners (8 Cols, Span 2 Rows) */}
        <div className="md:col-span-12 lg:col-span-8 lg:row-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8 flex flex-col">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-2xl font-black font-serif text-slate-900 tracking-tight">Elite Venues</h3>
            <Link href="/search?tab=venues" className="text-sm font-bold text-[#B01E5A] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden group cursor-pointer flex flex-col h-full">
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" alt="The Royal Palms" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black text-slate-800 tracking-wider uppercase shadow-sm">Premium Venue</div>
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-slate-900 text-lg mb-1">The Royal Palms</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Lahore, Pakistan
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-sm font-black text-slate-900">PKR 450,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden group cursor-pointer flex flex-col h-full">
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Nishat Hotel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black text-slate-800 tracking-wider uppercase shadow-sm">Luxury Hotel</div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9
                </div>
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-slate-900 text-lg mb-1">The Nishat Banquets</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Johar Town, Lahore
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-sm font-black text-slate-900">PKR 850,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block B: Nexus AI Assistant (4 Cols, Span 1 Row) */}
        <div className="md:col-span-6 lg:col-span-4 bg-[#052E20] rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between group cursor-pointer shadow-lg border border-[#0A422F]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C5A880]/20 rounded-full blur-3xl group-hover:bg-[#C5A880]/40 transition-colors duration-700" />
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-[#C5A880]" />
            </div>
            <h4 className="font-serif text-2xl font-black text-white mb-2 leading-tight">Nexus AI Concierge</h4>
            <p className="text-emerald-50/80 text-sm font-light mb-6">Ask for venue recommendations, budget estimates, or style ideas.</p>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g., Best outdoor venues in Lahore..." 
              className="w-full pl-4 pr-10 py-3 bg-black/20 border border-white/10 rounded-xl text-sm font-medium text-white placeholder:text-white/40 focus:outline-none focus:border-[#C5A880]/50 transition-colors backdrop-blur-md"
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#C5A880] text-white rounded-lg hover:bg-[#A88D6A] transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Block C: Budget & Jahaiz Tracker (4 Cols, Span 1 Row) */}
        <div className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-[#FAF5EC] to-white border border-[#E8DCC8] rounded-3xl p-6 md:p-8 flex flex-col justify-between group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6 text-[#C5A880]" />
              </div>
              <span className="bg-[#C5A880]/10 text-[#A88D6A] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">Free Tool</span>
            </div>
            <h4 className="font-serif text-2xl font-black text-slate-900 mb-2 leading-tight">Smart Budget Planner</h4>
            <p className="text-slate-500 text-sm font-medium mb-6">Automatically split your budget across venues, catering, and decor based on local averages.</p>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-gradient-to-r from-[#B01E5A] to-[#C92A70] rounded-full group-hover:w-4/5 transition-all duration-1000" />
          </div>
        </div>

        {/* ROW 3: ECOSYSTEM TOOLS (3x 4 Cols) */}
        
        {/* Digital Storefronts */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 flex items-start gap-4 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:-translate-y-1 transition-transform border border-slate-100">
            <Store className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Vendor Storefronts</h4>
            <p className="text-sm text-slate-500 font-medium">Build a stunning digital portfolio to showcase your past events and receive direct inquiries.</p>
          </div>
        </div>

        {/* Media Studios */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 flex items-start gap-4 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:-translate-y-1 transition-transform border border-slate-100">
            <Camera className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Media Studios</h4>
            <p className="text-sm text-slate-500 font-medium">Find top-tier photographers and cinematic videographers to capture your biggest moments.</p>
          </div>
        </div>

        {/* Heritage Vault */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 flex items-start gap-4 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:-translate-y-1 transition-transform border border-slate-100">
            <CloudLightning className="w-6 h-6 text-slate-700" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Heritage Vault</h4>
            <p className="text-sm text-slate-500 font-medium">Preserve your family's history with our military-grade digital storage for event memories.</p>
          </div>
        </div>

        {/* ROW 4: THE VENDOR DIRECTORY MAP (12 Cols) */}
        <div className="md:col-span-12 bg-[#1A1F24] rounded-3xl overflow-hidden relative min-h-[200px] md:min-h-[250px] flex items-center justify-between p-8 md:p-12 group cursor-pointer border border-slate-800 shadow-xl mt-2">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
            {/* Abstract Map Background Simulation */}
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-[10px] tracking-widest uppercase mb-4 border border-white/10">
              <Globe className="w-3.5 h-3.5" /> Nationwide Directory
            </div>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">1,200+ Premium Vendors across Pakistan</h3>
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-lg">From the lush marquees of Lahore to the coastal banquets of Karachi, discover the elite professionals who make it happen.</p>
          </div>

          <div className="relative z-10 hidden md:flex w-16 h-16 rounded-full bg-white text-slate-900 items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

      </div>
    </div>
  );
}
