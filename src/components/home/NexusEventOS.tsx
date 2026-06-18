"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, Wallet, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function NexusEventOS() {
  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen font-sans selection:bg-[#C9A227]/30 antialiased overflow-hidden">
      
      {/* SECTION 1 - HERO COMMAND CENTER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT (8 COLUMNS) - THE PITCH */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block px-4 py-2 bg-white rounded-full border border-[#E6E2DA] shadow-sm mb-8"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9A227]">
                Pakistan's Event Operating System
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#1D1C17] leading-[1.05] tracking-tight mb-8"
            >
              <span className="block text-[#0F5B3E]">Plan.</span>
              <span className="block text-[#0F5B3E]">Book.</span>
              <span className="block text-[#0F5B3E]">Manage.</span>
              <span className="block italic text-[#C9A227] font-light">Celebrate.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-[#5E6460] text-lg md:text-xl font-medium mb-12 max-w-2xl leading-relaxed"
            >
              Manage weddings, corporate events, venues, photographers, invitations, memories, and digital displays from one unified platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/create-event" className="px-8 py-4 bg-[#0F5B3E] hover:bg-[#0A422C] text-white rounded-full font-semibold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                Start Your Event
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/explore" className="px-8 py-4 bg-white hover:bg-[#F2EFE9] text-[#1D1C17] border border-[#E6E2DA] rounded-full font-semibold transition-all flex items-center justify-center shadow-sm">
                Explore
              </Link>
            </motion.div>
          </div>

          {/* RIGHT (4 COLUMNS) - LIVE DASHBOARD PREVIEW */}
          <div className="lg:col-span-5 xl:col-span-4 relative mt-12 lg:mt-0 z-10">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F5B3E]/20 to-[#C9A227]/20 blur-3xl -z-10 rounded-full scale-110 animate-pulse" style={{ animationDuration: '4s' }} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="bg-white rounded-[2rem] border border-[#E6E2DA] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-[#E6E2DA] bg-gradient-to-br from-white to-[#F2EFE9]/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[#E6F0EC] text-[#0F5B3E] text-xs font-bold rounded-full">
                    ACTIVE EVENT
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#D9467A] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9467A] animate-pulse"></span>
                    Live Sync
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#1D1C17] leading-tight mb-1">
                  Wedding of Ahmed & Fatima
                </h3>
                <p className="text-[#5E6460] text-sm font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Nov 24, 2026 • Royal Palm Golf & Country Club
                </p>
              </div>

              {/* Card Body - Live Stats */}
              <div className="p-6 grid grid-cols-2 gap-4">
                
                {/* Stat 1 */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm text-[#0F5B3E]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#5E6460] uppercase tracking-wider">Timeline</span>
                  </div>
                  <span className="text-2xl font-bold text-[#1D1C17]">75 <span className="text-sm font-medium text-[#5E6460] lowercase">Days left</span></span>
                </div>

                {/* Stat 2 */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-white rounded-lg shadow-sm text-[#D9467A]">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-[#5E6460] uppercase tracking-wider">Guests</span>
                  </div>
                  <span className="text-2xl font-bold text-[#1D1C17]">312 <span className="text-sm font-medium text-[#5E6460] lowercase">Confirmed</span></span>
                </div>

                {/* Stat 3 (Full Width Progress) */}
                <div className="col-span-2 bg-[#FAF7F2] p-4 rounded-2xl flex flex-col group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm text-[#C9A227]">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-[#5E6460] uppercase tracking-wider">Budget</span>
                    </div>
                    <span className="text-sm font-bold text-[#1D1C17]">52% Used</span>
                  </div>
                  <div className="h-2 w-full bg-[#E6E2DA] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "52%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-[#C9A227] rounded-full group-hover:bg-[#D9467A] transition-colors"
                    />
                  </div>
                </div>

                {/* Stat 4 (Full Width Vendors) */}
                <div className="col-span-2 bg-[#E6F0EC] p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm text-[#0F5B3E]">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0F5B3E]/80 uppercase tracking-wider mb-0.5">Vendors Booked</p>
                      <p className="text-lg font-bold text-[#0F5B3E]">8 <span className="text-sm font-medium opacity-70">/ 12 Required</span></p>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0F5B3E] shadow-sm hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
