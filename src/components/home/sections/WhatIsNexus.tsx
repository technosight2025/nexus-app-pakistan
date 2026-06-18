"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Briefcase, Camera, Users, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  {
    id: 'marketplace',
    title: 'Marketplace',
    tagline: 'Discover professionals and services.',
    description: 'The ultimate directory for Pakistani events and productions. Instantly book vetted photographers, venues, decorator studios, makeup artists, and event planners with live slot verification.',
    icon: Compass,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    accentColor: '#047857',
    features: [
      '12+ Creative Professional Categories',
      'Verified Portfolios & Reviews',
      'Real-time Availability Calendars',
      'Secure Direct Payments'
    ]
  },
  {
    id: 'business',
    title: 'Business Hub',
    tagline: 'Manage bookings, clients, payments and projects.',
    description: 'A robust workspace that acts as the operating system for your business. Organize bookings, invoice clients, split vendor commissions, manage projects, and automate schedules.',
    icon: Briefcase,
    color: 'text-indigo-950',
    bg: 'bg-indigo-50',
    accentColor: '#1E1B4B',
    features: [
      'Advanced Booking Calendars',
      'CRM & Client Communication',
      'Automated Invoicing & Revenue Audits',
      'Real-time Project Timelines'
    ]
  },
  {
    id: 'memories',
    title: 'Event Memories',
    tagline: 'Collect photos and videos from every guest.',
    description: 'Preserve generational legacies by capturing every memory. Let guests scan a single QR code to instantly share live uploads, access shared galleries, compile AI-powered albums, and generate highlights.',
    icon: Camera,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    accentColor: '#D97706',
    features: [
      'QR Code Instant Guest Scanning',
      'Live Guest Upload Streams',
      'AI-Powered Facial Grouping & Albums',
      'Shared Collaborative Event Galleries'
    ]
  },
  {
    id: 'network',
    title: 'Creative Network',
    tagline: 'Connect the entire creative industry.',
    description: 'A thriving community where professionals pair up for collaborative gigs, rent out wardrobe/gear, share leads, showcase designer coutures, and co-produce projects under one master profile.',
    icon: Users,
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    accentColor: '#7C3AED',
    features: [
      'Co-working & Project Partnerships',
      'Lead Sharing & Subcontracting',
      'Equipment & Wardrobe Rental Lists',
      'Creative Community Forums & Events'
    ]
  }
];

export default function WhatIsNexus() {
  const [activePillar, setActivePillar] = useState(PILLARS[0]);

  return (
    <section className="py-24 bg-white border-y border-[#E6E2DA] relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-50/50 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-50/50 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            THE PLATFORM ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            One Platform. Four Powerful Systems.
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium">
            Nexus integrates every aspect of the creative economy into a singular, clean workspace.
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillar.id === pillar.id;
            return (
              <motion.div
                key={pillar.id}
                onClick={() => setActivePillar(pillar)}
                whileHover={{ y: -6 }}
                className={`p-6.5 rounded-3xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-56 ${
                  isActive 
                    ? 'border-[#1E1B4B] bg-slate-50/80 shadow-md' 
                    : 'border-[#E6E2DA] bg-white hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                {/* Accent Top Bar */}
                {isActive && (
                  <div 
                    className="absolute top-0 left-0 right-0 h-1" 
                    style={{ backgroundColor: pillar.accentColor }}
                  />
                )}

                <div className="space-y-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${pillar.bg} ${pillar.color} border border-slate-100`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E1B4B] font-heading">{pillar.title}</h3>
                    <p className="text-[#1E1B4B]/70 text-xs font-semibold mt-1 leading-snug">{pillar.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#1E1B4B]/40 group pt-4">
                  <span>Explore system</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Pillar Detail Showcase Panel */}
        <div className="bg-[#FAF9F6] border border-[#E6E2DA] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          {/* Subtle Decorative Mesh Overlay */}
          <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Left detail description */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${activePillar.bg} ${activePillar.color}`}>
                    Active Pillar OS
                  </span>
                  <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" /> Verified Security
                  </span>
                </div>

                <h3 className="text-2xl md:text-3.5xl font-bold font-heading text-[#1E1B4B]">
                  Nexus {activePillar.title}
                </h3>
                
                <p className="text-[#1E1B4B]/80 text-sm md:text-base leading-relaxed font-sans font-medium">
                  {activePillar.description}
                </p>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {activePillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                      <span className="text-xs md:text-sm font-semibold text-[#1E1B4B]/85">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right illustrative frame */}
              <div className="relative h-[280px] sm:h-[340px] rounded-[2rem] overflow-hidden border border-[#E6E2DA] bg-white p-6 flex flex-col justify-between shadow-xs">
                {/* Dynamic mini interface mockups or visualizations based on active pillar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono">
                    NEXUS_OS_V5.0 // {activePillar.id.toUpperCase()}
                  </span>
                </div>

                {/* Simulated Content */}
                <div className="flex-1 py-6 flex flex-col justify-center space-y-4">
                  {activePillar.id === 'marketplace' && (
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-100 rounded-md w-3/4 animate-pulse" />
                      <div className="h-8 bg-emerald-50 border border-emerald-150 rounded-lg p-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-800">Top Photographer booked for Barat</span>
                        <span className="text-[9px] font-mono font-bold bg-emerald-700 text-white px-2 py-0.5 rounded-full">CONFIRMED</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-md w-1/2 animate-pulse" />
                    </div>
                  )}

                  {activePillar.id === 'business' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-indigo-50 border border-indigo-150 p-2.5 rounded-xl">
                        <div>
                          <div className="text-[9px] font-bold text-[#1E1B4B]/60">REVENUE GENERATED</div>
                          <div className="text-base font-bold text-[#1E1B4B] font-mono">PKR 1,450,000</div>
                        </div>
                        <span className="text-[9px] font-bold bg-[#1E1B4B] text-white px-2.5 py-1 rounded-md">+24.5%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-md w-2/3 animate-pulse" />
                    </div>
                  )}

                  {activePillar.id === 'memories' && (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-16 h-16 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Scan QR to Upload Live Event Photos</span>
                      <div className="w-24 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                  )}

                  {activePillar.id === 'network' && (
                    <div className="space-y-2">
                      <div className="flex -space-x-2 overflow-hidden justify-center py-2">
                        {['couple', 'venue', 'photographer'].map((item, idx) => (
                          <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-200" />
                        ))}
                      </div>
                      <div className="text-center text-[10px] font-bold text-[#1E1B4B]/80 bg-purple-50 border border-purple-100 p-2 rounded-lg">
                        Joined Bridal Fashion Shoot project with 4 other artisans
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Connected via Secure Ledger</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
