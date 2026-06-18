"use client"

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Wallet, Calendar, Star, CheckCircle2, Diamond, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MarketplaceFilters() {
  const [budget, setBudget] = useState(500000);
  const [isVerified, setIsVerified] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [minRating, setMinRating] = useState(4.0);
  const [location, setLocation] = useState("Islamabad");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const cities = ["Islamabad", "Rawalpindi", "Lahore", "Karachi", "Multan", "Faisalabad", "Peshawar"];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-[#E6E2DA] shadow-sm p-5 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E2DA]">
        <h3 className="font-serif text-xl font-bold text-[#1D1C17] flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#0F5B3E]" />
          Filters
        </h3>
        <button className="text-xs font-bold text-[#5E6460] hover:text-[#D9467A] transition-colors underline underline-offset-4">Reset</button>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Location
        </label>
        <div className="relative group" ref={locationRef}>
          <div 
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className={`w-full bg-white border rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${isLocationOpen ? 'border-[#0F5B3E] shadow-sm' : 'border-[#E6E2DA] hover:border-[#0F5B3E]/50'}`}
          >
            <span className="text-[#1D1C17] font-bold text-sm">{location}</span>
            <ChevronDown className={`w-4 h-4 text-[#1D1C17] transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isLocationOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E6E2DA] rounded-xl shadow-xl overflow-hidden py-2"
              >
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city);
                      setIsLocationOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      location === city 
                        ? 'bg-[#E6F0EC] text-[#0F5B3E] font-bold' 
                        : 'text-[#1D1C17] hover:bg-[#FAF7F2] font-medium'
                    }`}
                  >
                    {city}
                    {location === city && <Check className="w-4 h-4 text-[#0F5B3E]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5" />
          Budget Limit
        </label>
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-[#5E6460] font-semibold text-xs">Any</span>
            <span className="text-[#0F5B3E] font-bold text-sm bg-[#E6F0EC] px-3 py-1 rounded-lg">
              ₨ {(budget / 100000).toFixed(1)} Lakh
            </span>
          </div>
          <div className="relative h-1.5 bg-[#E6E2DA] rounded-full">
            <div 
              className="absolute top-0 left-0 h-full bg-[#0F5B3E] rounded-full"
              style={{ width: `${(budget / 2000000) * 100}%` }}
            />
            <input 
              type="range" 
              min="10000" 
              max="2000000" 
              step="10000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Custom Thumb */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#0F5B3E] rounded-full shadow-md pointer-events-none"
              style={{ left: `calc(${(budget / 2000000) * 100}% - 8px)` }}
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-bold text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Availability
        </label>
        <div className="flex flex-wrap gap-2">
          {["Today", "This Week", "This Month", "Custom"].map(opt => (
            <button key={opt} className="px-3 py-1.5 text-xs font-bold bg-white border border-[#E6E2DA] text-[#1D1C17] rounded-full hover:border-[#0F5B3E] hover:text-[#0F5B3E] transition-all">
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Trust & Quality */}
      <div className="space-y-4 pt-4 border-t border-[#E6E2DA]">
        <label className="text-[10px] font-bold text-[#5E6460] uppercase tracking-widest">Trust & Quality</label>
        
        <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsVerified(!isVerified)}>
          <span className="font-bold text-[#1D1C17] flex items-center gap-1.5 text-sm">
            Verified Only
            <CheckCircle2 className="w-4 h-4 text-[#0F5B3E]" />
          </span>
          <div className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isVerified ? 'bg-[#0F5B3E]' : 'bg-[#E6E2DA]'}`}>
            <motion.div 
              animate={{ x: isVerified ? 20 : 0 }} 
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center justify-between cursor-pointer group" onClick={() => setIsPremium(!isPremium)}>
          <span className="font-bold text-[#1D1C17] flex items-center gap-1.5 text-sm">
            Premium Only
            <Diamond className="w-4 h-4 text-[#C9A227]" />
          </span>
          <div className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isPremium ? 'bg-[#C9A227]' : 'bg-[#E6E2DA]'}`}>
            <motion.div 
              animate={{ x: isPremium ? 20 : 0 }} 
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="space-y-3 pt-4 border-t border-[#E6E2DA]">
        <label className="text-[10px] font-bold text-[#5E6460] uppercase tracking-widest flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" />
          Minimum Rating
        </label>
        <div className="flex flex-col gap-2">
          {[5, 4.5, 4].map(rating => (
            <div 
              key={rating} 
              onClick={() => setMinRating(rating)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className={`font-bold text-sm flex items-center gap-1.5 transition-colors ${minRating === rating ? 'text-[#1D1C17]' : 'text-[#5E6460]'}`}>
                {rating} <Star className={`w-3.5 h-3.5 ${minRating === rating ? 'text-[#C9A227] fill-[#C9A227]' : 'text-[#E6E2DA] fill-[#E6E2DA]'}`} /> & Up
              </span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${minRating === rating ? 'border-[#0F5B3E]' : 'border-[#E6E2DA]'}`}>
                {minRating === rating && <div className="w-2.5 h-2.5 bg-[#0F5B3E] rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
