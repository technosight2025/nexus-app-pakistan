"use client"
import React, { useState } from 'react';
import { Search, ChevronDown, MapPin, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function EntryPointNavigation({ 
  activePersona, 
  setActivePersona 
}: { 
  activePersona: 'host' | 'vendor' | 'freelancer'; 
  setActivePersona: (persona: 'host' | 'vendor' | 'freelancer') => void 
}) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-2xl relative z-20">
        
        {/* Dynamic Personas Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl justify-between items-center mb-6 relative">
          <button 
            onClick={() => setActivePersona('host')}
            className={`flex-1 text-center py-3 text-[13px] md:text-sm font-bold rounded-xl transition-all relative z-10 ${activePersona === 'host' ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activePersona === 'host' && (
              <motion.div layoutId="activePersonaBg" className="absolute inset-0 bg-[#0A3B2A] rounded-xl -z-10" />
            )}
            Find Services
          </button>
          <button 
            onClick={() => setActivePersona('vendor')}
            className={`flex-1 text-center py-3 text-[13px] md:text-sm font-bold rounded-xl transition-all relative z-10 ${activePersona === 'vendor' ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activePersona === 'vendor' && (
              <motion.div layoutId="activePersonaBg" className="absolute inset-0 bg-[#0A3B2A] rounded-xl -z-10" />
            )}
            List a Business
          </button>
          <button 
            onClick={() => setActivePersona('freelancer')}
            className={`flex-1 text-center py-3 text-[13px] md:text-sm font-bold rounded-xl transition-all relative z-10 ${activePersona === 'freelancer' ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activePersona === 'freelancer' && (
              <motion.div layoutId="activePersonaBg" className="absolute inset-0 bg-[#0A3B2A] rounded-xl -z-10" />
            )}
            Join as Artisan
          </button>
        </div>

        {/* Search Bar / Action Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePersona}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            {activePersona === 'host' && (
              <>
                <div className="flex flex-col md:flex-row items-center bg-white border border-slate-200 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-2 gap-2 w-full">
                  
                  {/* Event Type */}
                  <div className="w-full md:flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-rose-50 text-rose-500 rounded-full group-hover:scale-105 transition-transform">
                      <PartyPopper className="w-4 h-4" />
                    </div>
                    <select defaultValue="" className="w-full bg-transparent text-[14px] font-bold text-slate-800 py-4 pl-14 pr-10 focus:outline-none cursor-pointer appearance-none hover:bg-slate-50 rounded-2xl transition-colors">
                      <option value="" disabled>Event Type</option>
                      <option value="wedding">Wedding / Valima</option>
                      <option value="mehndi">Mehndi / Dholki</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="hidden md:block w-px h-10 bg-slate-200" />

                  {/* City */}
                  <div className="w-full md:flex-1 relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-500 rounded-full group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select defaultValue="" className="w-full bg-transparent text-[14px] font-bold text-slate-800 py-4 pl-14 pr-10 focus:outline-none cursor-pointer appearance-none hover:bg-slate-50 rounded-2xl transition-colors">
                      <option value="" disabled>City</option>
                      <option value="lahore">Lahore</option>
                      <option value="karachi">Karachi</option>
                      <option value="islamabad">Islamabad</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>

                  <div className="hidden md:block w-px h-10 bg-slate-200" />

                  {/* Area */}
                  <div className="w-full md:flex-1 relative flex items-center">
                    <div className="relative flex-1 group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-500 rounded-full group-hover:scale-105 transition-transform">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select defaultValue="" className="w-full bg-transparent text-[14px] font-bold text-slate-800 py-4 pl-14 pr-10 focus:outline-none cursor-pointer appearance-none hover:bg-slate-50 rounded-2xl transition-colors">
                        <option value="" disabled>Area</option>
                        <option value="dha">DHA</option>
                        <option value="gulberg">Gulberg</option>
                        <option value="bahria">Bahria Town</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    <button className="bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white px-6 py-4 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 shrink-0 font-bold flex items-center gap-2 ml-2">
                      <Search className="w-4 h-4" /> <span className="hidden lg:inline">Search</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Popular:</span>
                  {['Photographers in Lahore', 'Outdoor Venues', 'Bridal Makeup'].map((tag) => (
                    <span key={tag} className="text-[13px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer px-3 py-1 rounded-lg transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}

            {activePersona === 'vendor' && (
              <div className="text-center py-4">
                <h3 className="text-xl font-black text-slate-800 mb-2">Grow Your Event Business</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">Join Pakistan's premier ecosystem for event professionals. Get leads, manage bookings, and scale your operations.</p>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/business" className="bg-[#0A3B2A] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#0A3B2A]/90 transition-colors shadow-md">
                    Register Business
                  </Link>
                  <Link href="/business" className="bg-slate-100 text-[#0A3B2A] font-bold px-8 py-3.5 rounded-xl hover:bg-slate-200 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            )}

            {activePersona === 'freelancer' && (
              <div className="text-center py-4">
                <h3 className="text-xl font-black text-slate-800 mb-2">Monetize Your Craft</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">Are you a master makeup artist, mehndi designer, or event staff? List your skills and get hired for premium events instantly.</p>
                <div className="flex items-center justify-center gap-4">
                  <Link href="/freelancers" className="bg-[#0A3B2A] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#0A3B2A]/90 transition-colors shadow-md">
                    Create Artisan Profile
                  </Link>
                  <Link href="/freelancers" className="bg-slate-100 text-[#0A3B2A] font-bold px-8 py-3.5 rounded-xl hover:bg-slate-200 transition-colors">
                    Explore Jobs
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
