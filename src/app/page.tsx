"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  CloudLightning, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  CheckCircle, 
  Calculator, 
  Store, 
  Camera, 
  Globe,
  Calendar,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { PlanYourEventSection } from '@/components/home/PlanYourEventSection';
import { HomeEntryCards } from '@/components/home/HomeEntryCards';

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
        <span className={value ? "text-gray-950 whitespace-nowrap" : "text-gray-500 whitespace-nowrap"}>{selectedLabel}</span>
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

export default function HomePage() {
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('');
  const [wordIndex, setWordIndex] = useState(0);



  const eventWords = isRomanUrdu 
    ? ["BARAAT", "MEHNDI", "WALIMA", "SALGIRAH", "CONVOCATION", "OFFICE GALA"]
    : ["BARAAT", "MEHNDI", "WALIMA", "BIRTHDAY", "CONVOCATION", "OFFICE GALA"];

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % eventWords.length);
    }, 2500);
    return () => clearInterval(wordTimer);
  }, [eventWords.length]);

  const slides = [
    { id: 1, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" }, 
    { id: 2, image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" }, 
    { id: 3, image: "https://images.unsplash.com/photo-1530103862676-de88b6b080b0?q=80&w=2070&auto=format&fit=crop" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full bg-[#FAF5EC] dark:bg-[#0B120E] min-h-screen font-sans pb-0 selection:bg-amber-100 antialiased transition-colors duration-300">
      
      {/* 1. LUXURY TRANSPARENT NAVIGATION HEADER */}
      <header className="absolute top-0 inset-x-0 z-[100] w-full pointer-events-auto">
        <div className="max-w-[1400px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-serif tracking-wide text-white">
                NEXUS <span className="gold-shimmer font-semibold font-sans text-xl tracking-widest ml-1">HERITAGE</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              href="/venues" 
              className="text-xs font-sans font-bold tracking-widest text-white/90 hover:text-[#E6CDA7] transition-colors"
            >
              EXPLORE VENUES
            </Link>
            
            <button
              onClick={() => setIsRomanUrdu(!isRomanUrdu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black tracking-wider uppercase rounded-full transition-all border border-white/20 text-white hover:bg-white/10 bg-white/5 cursor-pointer"
            >
              <span>{isRomanUrdu ? "Urdu" : "EN"}</span>
            </button>

            <div className="hidden sm:flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-mono tracking-tight text-white/90">
                PK-VIP-0902
              </span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#AA7C11] flex items-center justify-center text-white text-xs font-bold font-sans">
                N
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SLIDER HERO SECTION */}
      <div className="relative w-full h-screen min-h-[700px] flex items-center justify-center shadow-2xl bg-black">
        
        {/* Isolated Background Wrapper */}
        <div className="absolute inset-0 overflow-hidden z-0">
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

          {/* Dark Overlay gradient for rich contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A120E] z-10" />

          {/* Floating Event Pills (Desktop Only) */}
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
                className="absolute px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 font-bold tracking-widest text-[10px] shadow-lg flex items-center"
                style={{ top: evt.top, left: evt.left, right: evt.right }}
              >
                <Sparkles className="w-3.5 h-3.5 inline-block mr-2 text-[#E6CDA7]" />
                {evt.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centered Typography & Search bar */}
        <div className="relative z-[60] flex flex-col items-center text-center px-4 w-full max-w-5xl">
          <span className="inline-block px-4 py-1.5 md:px-5 md:py-2 bg-white/20 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full mb-4 border border-white/40 backdrop-blur-md shadow-lg">
            {isRomanUrdu ? "Pakistan Ka Behtareen Event OS" : "Pakistan's Premier Event OS"}
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-2 leading-[1.05] tracking-tight flex flex-col items-center">
            <span className="font-light italic text-[#F5EFE4]">
              {isRomanUrdu ? "Apni perfect taqreeb plan karain" : "Planning your perfect"}
            </span>
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
            {isRomanUrdu 
              ? "Discover karain behtareen venues, legendary artisans, aur bespoke event plan systems."
              : "Discover Pakistan's most exclusive venues, legendary artisans, and bespoke event experiences."}
          </p>

          {/* Search Pill */}
          <div className="w-full relative group max-w-4xl mt-4 z-30">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A880] via-[#E6CDA7] to-[#C5A880] rounded-3xl md:rounded-full blur-md opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse" />
            
            <div className="relative w-full bg-white/95 backdrop-blur-3xl p-1.5 md:p-2 rounded-3xl md:rounded-full shadow-2xl border border-white flex flex-col md:flex-row items-center gap-1 transition-all duration-300 focus-within:scale-[1.02] focus-within:ring-4 focus-within:ring-[#C5A880]/30">
               
               {/* Text Search */}
               <div className="flex-[1.5] flex w-full md:w-auto overflow-hidden items-center transition-colors rounded-2xl md:rounded-full hover:bg-gray-50/50">
                  <Search className="w-5 h-5 text-[#C5A880] ml-5 shrink-0" />
                  <input 
                    type="text" 
                    placeholder={isRomanUrdu ? "Marquees, photographers ya services dhundein..." : "Search for your dream venue or artisan..."} 
                    className="w-full py-4 md:py-5 px-3 focus:outline-none text-gray-900 font-medium placeholder-gray-400 bg-transparent" 
                  />
               </div>
               
               <div className="hidden md:block w-px h-8 bg-gray-200 mx-1" />
               
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
                 
                 <Link href="/venues" className="w-full sm:w-auto">
                   <button className="relative overflow-hidden group/btn w-full bg-gradient-to-r from-[#E6CDA7] to-[#C5A880] text-[#052E20] px-10 py-4 md:py-5 rounded-2xl md:rounded-full font-black text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(197,168,128,0.5)] whitespace-nowrap cursor-pointer">
                     <span className="relative z-10">Start Planning</span>
                   </button>
                 </Link>
               </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      {/* 3. QUICK ENTRY CARDS */}
      <HomeEntryCards />

      {/* 4. BUSINESS & ARTISAN GATEWAYS */}
      <div className="max-w-[1400px] mx-auto px-6 mb-20 mt-0 relative z-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Business Gateway (Left) */}
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-xl h-[420px] md:h-[480px] cursor-pointer border border-[#C5A880]/10 bg-white/5 dark:bg-white/5">
            <img src="/images/vendor_dashboard_venue.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Vendor Gateway" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A120E] via-[#0A120E]/70 to-black/10 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 w-max border border-white/30 shadow-sm">
                For Business
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-2 leading-tight">The Elite Network</h3>
              <p className="text-emerald-50/90 text-sm font-light mb-4 line-clamp-2">
                Enterprise dashboard systems built for premium venue operators, wedding marquees, and culinary vendors.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
                {["Venue Management", "Smart CRM", "Quotation Builder", "Staff Tracking"].map(feature => (
                  <div key={feature} className="flex items-center gap-2.5 px-3 py-2.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
                    <CheckCircle className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                    <span className="text-xs font-bold text-white tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/business">
                <button className="w-max bg-gradient-to-r from-[#B01E5A] to-[#C92A70] text-white font-bold px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg flex items-center gap-2 group-hover:shadow-[0_8px_30px_rgba(176,30,90,0.4)] cursor-pointer">
                  Partner with Nexus <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>

          {/* Artisans (Right) */}
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-xl h-[420px] md:h-[480px] cursor-pointer border border-[#C5A880]/10 bg-white/5 dark:bg-white/5">
            <img src="/images/artisan_freelancer_elite.png" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Artisan Gateway" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A120E] via-[#0A120E]/70 to-black/10 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 w-max border border-white/30 shadow-sm">
                For Artisans
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-2 leading-tight">Bespoke Heritage</h3>
              <p className="text-emerald-50/90 text-sm font-light mb-4 line-clamp-2">
                Exquisite digital portfolio hosting designed for premium cinematographers, designers, and creative directors.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
                {["Digital Storefront", "Direct Bookings", "Creative Freedom", "Analytics"].map(feature => (
                  <div key={feature} className="flex items-center gap-2.5 px-3 py-2.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
                    <CheckCircle className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                    <span className="text-xs font-bold text-white tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/register?role=artisan">
                <button className="w-max bg-white text-[#052E20] font-bold px-6 py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg flex items-center gap-2 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] cursor-pointer">
                  Join as an Artisan <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 4. THE TRUST BANNER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-20">
        <div className="py-8 flex flex-col items-center justify-center border border-[#C5A880]/15 bg-white/40 dark:bg-white/5 rounded-3xl shadow-sm backdrop-blur-sm">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6">Trusted by Pakistan's Elite Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-60 dark:opacity-40 hover:opacity-100 dark:hover:opacity-80 transition-all duration-700 w-full px-4">
            <div className="text-xl md:text-2xl font-black font-serif tracking-tighter text-slate-800 dark:text-slate-200">PEARL CONTINENTAL</div>
            <div className="text-xl md:text-2xl font-black tracking-widest uppercase text-slate-800 dark:text-slate-200">Avari</div>
            <div className="text-lg md:text-xl font-bold italic tracking-wider text-slate-800 dark:text-slate-200">Shiza Hassan</div>
            <div className="text-xl md:text-2xl font-medium tracking-widest text-slate-800 dark:text-slate-200">NISHAT</div>
          </div>
        </div>
      </div>

      {/* Plan Your Event Section */}
      <PlanYourEventSection />

      {/* 5. BENTO SHOWCASES */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-6 pb-24 auto-rows-[minmax(180px,auto)]">
        
        {/* Block A: Elite Venues (8 Cols, Span 2 Rows) */}
        <div className="md:col-span-12 lg:col-span-8 lg:row-span-2 bg-white dark:bg-[#1C2420] rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 lg:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-[#FAF5EC] tracking-tight">Elite Venues</h3>
            <Link href="/venues" className="text-sm font-bold text-[#B01E5A] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {/* Card 1 */}
            <Link href="/venues/l-1" className="bg-white dark:bg-[#1C2420] rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-[#0F5B3E]/30 transition-all">
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" alt="The Royal Palms" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black text-slate-800 tracking-wider uppercase shadow-sm">Premium Venue</div>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-slate-900 dark:text-[#FAF5EC] text-base mb-1">The Royal Palms</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Lahore, Pakistan
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-sm font-black text-slate-900 dark:text-[#C5A880]">PKR 450,000</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/venues/l-2" className="bg-white dark:bg-[#1C2420] rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-[#0F5B3E]/30 transition-all">
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Nishat Hotel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black text-slate-800 tracking-wider uppercase shadow-sm">Luxury Hotel</div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-slate-900 dark:text-[#FAF5EC] text-base mb-1">The Nishat Banquets</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Johar Town, Lahore
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-sm font-black text-slate-900 dark:text-[#C5A880]">PKR 850,000</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Block B: AI Assistant (4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 bg-[#052E20] rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between group shadow-lg border border-[#0A422F]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#C5A880]/20 rounded-full blur-3xl group-hover:bg-[#C5A880]/40 transition-colors duration-700" />
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10">
              <Sparkles className="w-6 h-6 text-[#C5A880]" />
            </div>
            <h4 className="font-serif text-2xl font-black text-white mb-2 leading-tight">Nexus AI Concierge</h4>
            <p className="text-emerald-50/80 text-sm font-light mb-6">Ask for venue recommendations, budget estimates, or style ideas.</p>
          </div>
          <Link href="/venues" className="relative block">
            <input 
              type="text" 
              placeholder="e.g., Best outdoor venues in Lahore..." 
              className="w-full pl-4 pr-10 py-3 bg-black/20 border border-white/10 rounded-xl text-sm font-medium text-white placeholder:text-white/40 focus:outline-none focus:border-[#C5A880]/50 transition-colors backdrop-blur-md cursor-pointer"
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-[#C5A880] text-white rounded-lg hover:bg-[#A88D6A] transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Block C: Plan Your Event Card (4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 bg-gradient-to-br from-[#FAF5EC] to-white dark:from-[#1C2420] dark:to-[#121614] border border-[#E8DCC8] dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center border border-amber-100 dark:border-slate-800">
                <Calendar className="w-6 h-6 text-[#C5A880]" />
              </div>
              <span className="bg-[#0F5B3E]/10 text-[#0F5B3E] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                {isRomanUrdu ? "Workspace OS" : "Workspace OS"}
              </span>
            </div>
            
            <h4 className="font-serif text-2xl font-black text-slate-900 dark:text-[#FAF5EC] mb-1.5 leading-tight">
              {isRomanUrdu ? "AI Event Workspace" : "AI Event Workspace"}
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-6">
              {isRomanUrdu 
                ? "Aik hi digital space mein apni taqreeb ka budget manage karain aur milestones track karain." 
                : "Manage budgets, timelines, guest lists, and bilingual digital invitations in one secure workspace."}
            </p>

            {/* Showcase elements */}
            <div className="space-y-3.5 mb-6">
              {[
                { title: isRomanUrdu ? "Bespoke Budget Plan" : "Bespoke Budget Plan", desc: isRomanUrdu ? "Automated budget allocations based on guest count" : "Automated budget allocations based on guest count" },
                { title: isRomanUrdu ? "Bilingual Digital Cards" : "Bilingual Digital Cards", desc: isRomanUrdu ? "Urdu + English card templates with WhatsApp RSVPs" : "Urdu + English card templates with WhatsApp RSVPs" },
                { title: isRomanUrdu ? "Milestone Tracker" : "Milestone Tracker", desc: isRomanUrdu ? "Real-time task synchronization for organizers" : "Real-time task synchronization for organizers" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="w-4 h-4 rounded-full bg-[#0F5B3E]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0F5B3E]" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-slate-800 dark:text-[#FAF5EC]">{item.title}</h5>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/create-event" className="w-full block">
            <button className="w-full py-4 bg-[#0F5B3E] hover:bg-[#0A422C] text-white font-bold text-sm rounded-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_8px_25px_rgba(15,91,62,0.2)] cursor-pointer">
              {isRomanUrdu ? "Workspace Tayyar Karain" : "Initialize Workspace"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* ROW 3: ECOSYSTEM TOOLS (3x 4 Cols) */}
        
        {/* Digital Storefronts */}
        <div className="md:col-span-4 bg-white dark:bg-[#1C2420] border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 flex items-start gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
            <Store className="w-6 h-6 text-slate-700 dark:text-[#C5A880]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-[#FAF5EC] text-base mb-1">Vendor Storefronts</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Build a stunning digital portfolio to showcase your past events and receive direct inquiries.</p>
          </div>
        </div>

        {/* Media Studios */}
        <div className="md:col-span-4 bg-white dark:bg-[#1C2420] border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 flex items-start gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
            <Camera className="w-6 h-6 text-slate-700 dark:text-[#C5A880]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-[#FAF5EC] text-base mb-1">Media Studios</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Find top-tier photographers and cinematic videographers to capture your biggest moments.</p>
          </div>
        </div>

        {/* Heritage Vault */}
        <div className="md:col-span-4 bg-white dark:bg-[#1C2420] border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 flex items-start gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
            <CloudLightning className="w-6 h-6 text-slate-700 dark:text-[#C5A880]" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-[#FAF5EC] text-base mb-1">Heritage Vault</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Preserve your family's history with our military-grade digital storage for event memories.</p>
          </div>
        </div>

        {/* ROW 4: MAP BANNER */}
        <div className="md:col-span-12 bg-[#121614] rounded-3xl overflow-hidden relative min-h-[220px] md:min-h-[260px] flex items-center justify-between p-8 md:p-12 group cursor-pointer border border-[#C5A880]/10 shadow-xl mt-2">
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(197,168,128,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-[10px] tracking-widest uppercase mb-4 border border-white/10">
              <Globe className="w-3.5 h-3.5 text-[#C5A880]" /> Nationwide Directory
            </div>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">1,200+ Premium Vendors across Pakistan</h3>
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-lg">From the lush marquees of Lahore to the coastal banquets of Karachi, discover the elite professionals who make it happen.</p>
          </div>

          <div className="relative z-10 hidden md:flex w-16 h-16 rounded-full bg-white text-slate-900 items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <ArrowRight className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 6. LUXURY DARK FOOTER */}
      <footer className="border-t border-[#C5A880]/20 bg-[#0A120E] text-white/80 py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <span className="text-2xl font-serif tracking-wide text-white">
              NEXUS <span className="gold-shimmer font-semibold font-sans text-xl tracking-widest ml-1">HERITAGE</span>
            </span>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Pakistan's premier multi-tenant operating system for high-net-worth event orchestration. Handcrafted for premium celebrations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">Portals</h4>
            <ul className="space-y-3.5 text-sm font-medium text-slate-400">
              <li><Link href="/dashboard/host" className="hover:text-white transition-colors">Family Hosts Portal</Link></li>
              <li><Link href="/business" className="hover:text-white transition-colors">Marquee & Venue OS</Link></li>
              <li><Link href="/register?role=artisan" className="hover:text-white transition-colors">Artisan Studio Suite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">Discover</h4>
            <ul className="space-y-3.5 text-sm font-medium text-slate-400">
              <li><Link href="/venues" className="hover:text-white transition-colors">Elite Venues</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Artisan Network</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Planning Tools</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">Ecosystem</h4>
            <div className="flex space-x-3 font-mono text-[11px] tracking-tight bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
              <span className="text-slate-500">SYSTEM STATUS</span>
              <span className="text-[#C5A880] font-black">SECURE</span>
              <span className="text-emerald-500">READY</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">© 2026 Nexus Heritage International. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
