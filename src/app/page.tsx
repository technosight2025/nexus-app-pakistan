"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  CloudLightning, 
  ArrowRight, 
  Star, 
  CheckCircle, 
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
import { HomeCategoryChips } from '@/components/home/HomeCategoryChips';
import { HomeExploreHeader } from '@/components/layout/HomeExploreHeader';
import { ExploreEntryPoint } from '@/components/home/ExploreEntryPoint';

export default function HomePage() {
  const { isRomanUrdu } = useLanguage();

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen font-sans pb-0 antialiased selection:bg-neutral-100">
      
      {/* 1. GLOBAL EXPLORE-STYLE HEADER */}
      <HomeExploreHeader />

      {/* 2. MINIMALIST SPLIT HERO */}
      <div className="relative w-full bg-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & Search */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 block mb-6">
              {isRomanUrdu ? "Pakistan Ka Behtareen Event OS" : "Pakistan's Premier Event OS"}
            </span>
            
            <h1 className="font-serif text-5xl md:text-7xl font-black text-neutral-900 leading-[1.08] tracking-tight mb-6">
              {isRomanUrdu ? (
                <>
                  Apni perfect taqreeb <span className="font-light italic text-neutral-500">plan karain</span>
                </>
              ) : (
                <>
                  Orchestrate your <span className="font-light italic text-neutral-500">finest celebrations</span>
                </>
              )}
            </h1>

            <p className="text-neutral-500 text-base md:text-lg font-normal mb-10 max-w-xl leading-relaxed">
              {isRomanUrdu 
                ? "Discover karain behtareen venues, legendary artisans, aur bespoke event planning systems."
                : "Discover Pakistan's most exclusive venues, legendary artisans, and bespoke planning tools in a unified, modern interface."}
            </p>

            {/* Clean Minimalist Search Input */}
            <div className="w-full max-w-xl relative">
              <Link href="/explore" className="block w-full">
                <div className="flex items-center w-full bg-neutral-50 border border-neutral-200 hover:border-neutral-800 transition-all rounded-2xl p-4 cursor-pointer">
                  <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                  <span className="text-neutral-450 text-sm font-normal text-neutral-500">
                    {isRomanUrdu ? "Marquees, photographers ya services dhundein..." : "Search venues, photographers, caterers..."}
                  </span>
                  <div className="ml-auto bg-neutral-900 text-white rounded-xl px-4 py-1.5 text-xs font-bold">
                    {isRomanUrdu ? "Talash" : "Search"}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Grayscale Image */}
          <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[500px] bg-neutral-50 rounded-3xl overflow-hidden shadow-xs border border-neutral-100">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop" 
              alt="Luxury Editorial Event Setting" 
              className="w-full h-full object-cover grayscale contrast-105"
            />
          </div>
        </div>
      </div>

      {/* 3. QUICK ENTRY CARDS */}
      <HomeEntryCards />

      {/* 3.5. CATEGORY CHIPS */}
      <HomeCategoryChips />

      {/* NEW EXPLORE ENTRY POINT */}
      <ExploreEntryPoint />

      {/* 4. BUSINESS & ARTISAN GATEWAYS */}
      <div className="max-w-[1400px] mx-auto px-6 mb-24 mt-0 relative z-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Business Gateway (Left) */}
          <div className="relative group rounded-3xl overflow-hidden h-[400px] md:h-[450px] cursor-pointer border border-neutral-100 bg-white hover:border-neutral-900 transition-all duration-300">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out filter grayscale hover:grayscale-0" alt="Vendor Gateway" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <span className="font-mono text-[10px] tracking-widest text-[#E6CDA7] uppercase block mb-2">
                For Business
              </span>
              <h3 className="font-serif text-3xl font-black text-white mb-2 leading-tight">The Elite Network</h3>
              <p className="text-neutral-300 text-sm font-normal mb-6 max-w-sm">
                Enterprise operating systems built for premium venue operators, wedding marquees, and catering services.
              </p>
              
              <Link href="/business">
                <button className="w-max bg-white hover:bg-neutral-100 text-neutral-950 font-bold px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center gap-2">
                  Partner with Nexus <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Artisans (Right) */}
          <div className="relative group rounded-3xl overflow-hidden h-[400px] md:h-[450px] cursor-pointer border border-neutral-100 bg-white hover:border-neutral-900 transition-all duration-300">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 ease-out filter grayscale hover:grayscale-0" alt="Artisan Gateway" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <span className="font-mono text-[10px] tracking-widest text-[#E6CDA7] uppercase block mb-2">
                For Artisans
              </span>
              <h3 className="font-serif text-3xl font-black text-white mb-2 leading-tight">Bespoke Heritage</h3>
              <p className="text-neutral-300 text-sm font-normal mb-6 max-w-sm">
                Exquisite digital portfolio hosting designed for premium cinematographers, stylists, and makeup artists.
              </p>

              <Link href="/register?role=artisan">
                <button className="w-max bg-white hover:bg-neutral-100 text-neutral-950 font-bold px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center gap-2">
                  Join as an Artisan <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 4. THE TRUST BANNER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-24">
        <div className="py-8 flex flex-col items-center justify-center border border-neutral-100 bg-white rounded-3xl">
          <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-[0.3em] mb-6">Trusted by Pakistan's Elite Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-40 hover:opacity-80 transition-all duration-750 w-full px-4 text-neutral-800">
            <div className="text-xl md:text-2xl font-black font-serif tracking-tighter">PEARL CONTINENTAL</div>
            <div className="text-xl md:text-2xl font-black tracking-widest uppercase">Avari</div>
            <div className="text-lg md:text-xl font-bold italic tracking-wider">Shiza Hassan</div>
            <div className="text-xl md:text-2xl font-medium tracking-widest">NISHAT</div>
          </div>
        </div>
      </div>

      {/* Plan Your Event Section */}
      <PlanYourEventSection />

      {/* 5. BENTO SHOWCASES */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-6 pb-24 auto-rows-[minmax(180px,auto)]">
        
        {/* Block A: Elite Venues (8 Cols, Span 2 Rows) */}
        <div className="md:col-span-12 lg:col-span-8 lg:row-span-2 bg-white rounded-3xl border border-neutral-100 p-6 lg:p-8 flex flex-col justify-between hover:border-neutral-900 transition-all duration-300">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-2xl font-black font-serif text-neutral-900 tracking-tight">Elite Venues</h3>
            <Link href="/venues" className="text-xs font-black uppercase tracking-wider text-neutral-900 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {/* Card 1 */}
            <Link href="/venues/l-1" className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-neutral-900 transition-all duration-350">
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0 bg-neutral-50">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop" alt="The Royal Palms" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-3 left-3 bg-white/95 border border-neutral-100 px-2.5 py-1 rounded-full text-[9px] font-black text-neutral-800 tracking-wider uppercase shadow-xs">Premium Venue</div>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-neutral-900 text-base mb-1">The Royal Palms</h4>
                  <p className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Lahore, Pakistan
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider block mb-0.5 text-neutral-400">Starting from</span>
                    <span className="text-sm font-black text-neutral-900">PKR 450,000</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/venues/l-2" className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-neutral-900 transition-all duration-350">
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0 bg-neutral-50">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" alt="Nishat Hotel" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-3 left-3 bg-white/95 border border-neutral-100 px-2.5 py-1 rounded-full text-[9px] font-black text-neutral-800 tracking-wider uppercase shadow-xs">Luxury Hotel</div>
                <div className="absolute top-3 right-3 bg-white/95 border border-neutral-100 px-2 py-1 rounded-full text-[10px] font-bold text-neutral-800 flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-neutral-900 text-base mb-1">The Nishat Banquets</h4>
                  <p className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Johar Town, Lahore
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-neutral-450 font-bold uppercase tracking-wider block mb-0.5 text-neutral-400">Starting from</span>
                    <span className="text-sm font-black text-neutral-900">PKR 850,000</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Block B: AI Assistant (4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 bg-neutral-950 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between group shadow-xs border border-neutral-800 text-white">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/10">
              <Sparkles className="w-6 h-6 text-[#E6CDA7]" />
            </div>
            <h4 className="font-serif text-2xl font-black text-white mb-2 leading-tight">Nexus AI Concierge</h4>
            <p className="text-neutral-400 text-sm font-light mb-6">Ask for venue recommendations, budget estimates, or style ideas.</p>
          </div>
          <Link href="/venues" className="relative block">
            <input 
              type="text" 
              placeholder="e.g., Best outdoor venues in Lahore..." 
              className="w-full pl-4 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs font-normal text-white placeholder:text-white/30 focus:outline-none focus:border-[#E6CDA7]/50 transition-colors cursor-pointer"
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white text-neutral-950 rounded-lg hover:bg-neutral-250 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Block C: Plan Your Event Card (4 Cols) */}
        <div className="md:col-span-6 lg:col-span-4 bg-white border border-neutral-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between group hover:border-neutral-900 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-neutral-50 shadow-xs flex items-center justify-center border border-neutral-100">
                <Calendar className="w-6 h-6 text-neutral-800" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-450 text-neutral-400 px-2 py-0.5 border border-neutral-200 rounded-full">
                Workspace OS
              </span>
            </div>
            
            <h4 className="font-serif text-2xl font-black text-neutral-900 mb-1.5 leading-tight">
              AI Event Workspace
            </h4>
            <p className="text-neutral-500 text-xs font-normal mb-6">
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
                  <div className="w-4 h-4 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-neutral-800" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-black text-neutral-800">{item.title}</h5>
                    <p className="text-[10px] text-neutral-400 font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/create-event" className="w-full block">
            <button className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
              {isRomanUrdu ? "Workspace Tayyar Karain" : "Initialize Workspace"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>

        {/* ROW 3: ECOSYSTEM TOOLS (3x 4 Cols) */}
        
        {/* Digital Storefronts */}
        <div className="md:col-span-4 bg-white border border-neutral-100 rounded-3xl p-6 flex items-start gap-4 hover:border-neutral-900 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center shrink-0 border border-neutral-100">
            <Store className="w-6 h-6 text-neutral-800" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-base mb-1">Vendor Storefronts</h4>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">Build a stunning digital portfolio to showcase your past events and receive direct inquiries.</p>
          </div>
        </div>

        {/* Media Studios */}
        <div className="md:col-span-4 bg-white border border-neutral-100 rounded-3xl p-6 flex items-start gap-4 hover:border-neutral-900 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center shrink-0 border border-neutral-100">
            <Camera className="w-6 h-6 text-neutral-800" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-base mb-1">Media Studios</h4>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">Find top-tier photographers and cinematic videographers to capture your biggest moments.</p>
          </div>
        </div>

        {/* Heritage Vault */}
        <div className="md:col-span-4 bg-white border border-neutral-100 rounded-3xl p-6 flex items-start gap-4 hover:border-neutral-900 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center shrink-0 border border-neutral-100">
            <CloudLightning className="w-6 h-6 text-neutral-800" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-base mb-1">Heritage Vault</h4>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">Preserve your family's history with our military-grade digital storage for event memories.</p>
          </div>
        </div>

        {/* ROW 4: MAP BANNER */}
        <div className="md:col-span-12 bg-neutral-950 rounded-3xl overflow-hidden relative min-h-[220px] md:min-h-[260px] flex items-center justify-between p-8 md:p-12 group cursor-pointer border border-neutral-800 mt-2 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-[9px] tracking-widest uppercase mb-4 border border-white/10">
              <Globe className="w-3 h-3 text-[#E6CDA7]" /> Nationwide Directory
            </div>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">1,200+ Premium Vendors across Pakistan</h3>
            <p className="text-neutral-400 font-normal text-sm max-w-lg leading-relaxed">From the lush marquees of Lahore to the coastal banquets of Karachi, discover the elite professionals who make it happen.</p>
          </div>

          <div className="relative z-10 hidden md:flex w-14 h-14 rounded-full bg-white text-neutral-950 items-center justify-center group-hover:scale-105 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* 6. LUXURY FOOTER */}
      <footer className="border-t border-neutral-100 bg-white text-neutral-800 py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <span className="text-xl font-serif tracking-wide text-neutral-900 font-black">
              NEXUS <span className="font-semibold font-sans text-lg tracking-widest ml-1 text-neutral-500">HERITAGE</span>
            </span>
            <p className="text-xs text-neutral-450 font-normal leading-relaxed text-neutral-500">
              Pakistan's premier multi-tenant operating system for high-net-worth event orchestration. Handcrafted for premium celebrations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Portals</h4>
            <ul className="space-y-3 text-xs font-normal text-neutral-500">
              <li><Link href="/dashboard/host" className="hover:text-neutral-900 transition-colors">Family Hosts Portal</Link></li>
              <li><Link href="/business" className="hover:text-neutral-900 transition-colors">Marquee & Venue OS</Link></li>
              <li><Link href="/register?role=artisan" className="hover:text-neutral-900 transition-colors">Artisan Studio Suite</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Discover</h4>
            <ul className="space-y-3 text-xs font-normal text-neutral-500">
              <li><Link href="/venues" className="hover:text-neutral-900 transition-colors">Elite Venues</Link></li>
              <li><Link href="/explore" className="hover:text-neutral-900 transition-colors">Artisan Network</Link></li>
              <li><Link href="/tools" className="hover:text-neutral-900 transition-colors">Planning Tools</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Ecosystem</h4>
            <div className="flex space-x-3 font-mono text-[9px] tracking-tight bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl">
              <span className="text-neutral-400">STATUS</span>
              <span className="text-neutral-900 font-bold">SECURE</span>
              <span className="text-emerald-600 font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium">© 2026 Nexus Heritage International. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
