"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Sparkles } from 'lucide-react';

const HERO_IMAGES = [
  '/images/pakistani_wedding_couple.png',
  '/images/pakistani_wedding_venue.png',
  '/images/pakistani_artisan_photographer.png',
  '/images/pakistani_bride_makeup.png',
  '/images/pakistani_model_designer.png'
];

const SERVICES = [
  'Photographer',
  'Videographer',
  'Makeup Artist',
  'Wedding Planner',
  'Venue',
  'Decorator',
  'Florist',
  'Rental Provider',
  'Fashion Designer',
  'Content Creator',
  'Editor',
  'Production House'
];

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad'];

export default function Hero() {
  const router = useRouter();
  const [currentBg, setCurrentBg] = useState(0);
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchService) query.set('category', searchService); // Explore page matches 'category' or 'type'
    if (searchLocation) query.set('location', searchLocation);
    if (searchDate) query.set('date', searchDate);
    router.push(`/explore?${query.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 bg-[#FAF9F6] z-10">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentBg]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/20 via-[#FAF9F6]/60 to-[#FAF9F6] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#047857]/10 border border-[#047857]/20 text-[#047857] px-4.5 py-1.5 rounded-full text-xs font-semibold mb-8 backdrop-blur-xs"
        >
          <Sparkles className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
          <span>Pakistan's Premier Creative Industry Network</span>
        </motion.div>

        {/* Large Premium Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-7xl font-bold tracking-tight text-[#1E1B4B] leading-[1.08] max-w-4xl font-heading mb-6"
        >
          Pakistan's Creative <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-[#1E1B4B] via-[#047857] to-[#D97706] bg-clip-text text-transparent italic font-serif">
            Production Ecosystem
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#1E1B4B]/70 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed font-sans"
        >
          Find professionals. Book services. Manage projects. Preserve memories. <br className="hidden md:inline" />
          Everything inside one unified operating system.
        </motion.p>

        {/* Universal Search Bar (Airbnb-style) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl bg-white border border-[#E6E2DA] p-2 md:p-3 rounded-2xl md:rounded-full shadow-xl shadow-slate-100 flex flex-col md:flex-row items-center gap-2 mb-10 relative z-40"
        >
          <form onSubmit={handleSearch} className="w-full flex flex-col md:flex-row items-center justify-between gap-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Service Search */}
            <div className={`w-full md:w-5/12 text-left px-4 py-2 relative ${showServiceDropdown ? 'z-50' : 'z-10'}`}>
              <label className="block text-[10px] font-bold text-[#1E1B4B]/50 uppercase tracking-widest mb-1">
                What service do you need?
              </label>
              <input
                type="text"
                value={searchService}
                onChange={(e) => {
                  setSearchService(e.target.value);
                  setShowServiceDropdown(true);
                }}
                onFocus={() => setShowServiceDropdown(true)}
                placeholder="e.g. Photographer, Venue"
                className="w-full bg-transparent text-sm font-semibold text-[#1E1B4B] placeholder-slate-400 outline-hidden"
              />
              {showServiceDropdown && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 max-h-56 overflow-y-auto z-50">
                  {SERVICES.filter(s => s.toLowerCase().includes(searchService.toLowerCase())).map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        setSearchService(service);
                        setShowServiceDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#1E1B4B] hover:bg-slate-50 font-medium transition-colors"
                    >
                      {service}
                    </button>
                  ))}
                  {SERVICES.filter(s => s.toLowerCase().includes(searchService.toLowerCase())).length === 0 && (
                    <div className="px-4 py-2.5 text-xs text-[#1E1B4B]/50 font-medium">No services found</div>
                  )}
                </div>
              )}
            </div>

            {/* Location Selector */}
            <div className={`w-full md:w-3/12 text-left px-4 py-2 relative ${showLocationDropdown ? 'z-50' : 'z-10'}`}>
              <label className="block text-[10px] font-bold text-[#1E1B4B]/50 uppercase tracking-widest mb-1">
                Location
              </label>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#047857]" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  placeholder="Select City"
                  className="w-full bg-transparent text-sm font-semibold text-[#1E1B4B] placeholder-slate-400 outline-hidden"
                />
              </div>
              {showLocationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50">
                  {CITIES.filter(c => c.toLowerCase().includes(searchLocation.toLowerCase())).map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setSearchLocation(city);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#1E1B4B] hover:bg-slate-50 font-medium transition-colors"
                    >
                      {city}, Pakistan
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div className="w-full md:w-3/12 text-left px-4 py-2">
              <label className="block text-[10px] font-bold text-[#1E1B4B]/50 uppercase tracking-widest mb-1">
                Date
              </label>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#1E1B4B] outline-hidden"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto p-2">
              <button
                type="submit"
                className="w-full md:w-12 md:h-12 bg-[#047857] hover:bg-[#035f44] text-white flex items-center justify-center gap-2 md:gap-0 px-6 py-3 md:p-0 rounded-xl md:rounded-full transition-all duration-300 shadow-lg shadow-emerald-700/20"
              >
                <Search className="w-4 h-4" />
                <span className="md:hidden font-semibold text-sm">Search</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Global Click Listeners for Search Dropdowns */}
        {(showServiceDropdown || showLocationDropdown) && (
          <div
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => {
              setShowServiceDropdown(false);
              setShowLocationDropdown(false);
            }}
          />
        )}

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative z-0"
        >
          <Link
            href="/explore"
            className="w-full sm:w-auto bg-[#1E1B4B] hover:bg-[#151333] text-white text-[14px] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
          >
            Explore
          </Link>
          <Link
            href="/register?role=professional"
            className="w-full sm:w-auto bg-white border border-[#E6E2DA] text-[#1E1B4B] hover:bg-slate-50 text-[14px] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xs cursor-pointer"
          >
            Join as Professional
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
