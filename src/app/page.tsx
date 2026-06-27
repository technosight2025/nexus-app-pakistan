"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Store, 
  Camera, 
  Globe,
  Calendar,
  Users,
  Utensils,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { HomeEntryCards } from '@/components/home/HomeEntryCards';
import { HomeCategoryChips } from '@/components/home/HomeCategoryChips';
import { HomeExploreHeader } from '@/components/layout/HomeExploreHeader';
import { ExploreEntryPoint } from '@/components/home/ExploreEntryPoint';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

// Simulated Live Action Log using warm, hospitality-driven terminology
interface LiveLog {
  id: number;
  time: string;
  type: 'rsvp' | 'invoice' | 'ai' | 'invite';
  textEN: string;
  textRU: string;
}

const INITIAL_LOGS: LiveLog[] = [
  { id: 1, time: '12s ago', type: 'rsvp', textEN: 'Family RSVP: Ayesha & Bilal Baraat (+4 guests)', textRU: 'Khandan RSVP: Ayesha aur Bilal Baraat (+4 mehman)' },
  { id: 2, time: '28s ago', type: 'invoice', textEN: 'Personalized Plan: Deposit paid to Royal Palm Banquets', textRU: 'Personalized Plan: Royal Palm Banquets ko advance paid' },
  { id: 3, time: '1m ago', type: 'ai', textEN: 'Event Concierge: Arranged seating layout for Mayun & Mehndi', textRU: 'Event Concierge: Mayun aur Mehndi ka seating layout tayyar' },
  { id: 4, time: '2m ago', type: 'invite', textEN: 'Bilingual Card Sent: 42 invites shared via WhatsApp', textRU: 'Bilingual Dawat Nama: 42 links WhatsApp par share' },
];

export default function HomePage() {
  const { isRomanUrdu } = useLanguage();
  const [logs, setLogs] = useState<LiveLog[]>(INITIAL_LOGS);
  const [guestsCount, setGuestsCount] = useState<number>(300);

  // Auto-update simulated logs
  useEffect(() => {
    const interval = setInterval(() => {
      const types: ('rsvp' | 'invoice' | 'ai' | 'invite')[] = ['rsvp', 'invoice', 'ai', 'invite'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newLog: LiveLog = {
        id: Date.now(),
        time: 'Just now',
        type: randomType,
        textEN: getRandomLogText(randomType, false),
        textRU: getRandomLogText(randomType, true),
      };

      setLogs(prev => [newLog, ...prev.slice(0, 3)]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const getRandomLogText = (type: string, isUrdu: boolean) => {
    if (type === 'rsvp') {
      return isUrdu ? 'Khandan ne Walima ka RSVP confirm kar diya' : 'Family confirmed Walima RSVP';
    }
    if (type === 'invoice') {
      return isUrdu ? 'Mehndi Catering advance approved (Lakh 1.8)' : 'Mehndi Catering advance approved (PKR 180,000)';
    }
    if (type === 'ai') {
      return isUrdu ? 'Event Concierge: 12 planning tasks checklist me shamil' : 'Event Concierge: 12 planning tasks added to checklist';
    }
    return isUrdu ? 'Baraat ka digital dawat nama update' : 'Baraat digital invitation updated';
  };

  // Pakistani Catering Daig Calculator formulas
  const calculateDaigs = (guests: number) => {
    const biryaniDaigs = Math.ceil(guests / 80);
    const qormaDaigs = Math.ceil(guests / 100);
    return { biryani: biryaniDaigs, qorma: qormaDaigs };
  };

  const daigStats = calculateDaigs(guestsCount);

  return (
    <div className="w-full bg-[#FCFBF9] min-h-screen font-sans pb-16 md:pb-0 antialiased selection:bg-neutral-100">
      
      {/* 1. GLOBAL NAV BAR */}
      <HomeExploreHeader />

      {/* 2. CONCIERGE TYPOGRAPHY HERO & LIVE ACTION WORKSPACE PREVIEW */}
      <div className="relative w-full bg-[#FCFBF9] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-neutral-150">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Benefit-Driven Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#C5A880] block mb-6 font-bold">
              {isRomanUrdu ? "PAKISTAN KA PREMIER EVENT PARTNER" : "PAKISTAN'S PREMIER EVENT PARTNER"}
            </span>
            
            <h1 className="font-serif text-5xl md:text-7xl font-black text-neutral-900 tracking-tighter leading-[0.95] mb-8">
              Orchestrate.<br />
              Host.<br />
              <span className="font-light italic text-neutral-450 text-[#C5A880]">Remember.</span>
            </h1>

            <p className="text-neutral-650 text-base md:text-lg font-normal mb-10 max-w-xl leading-relaxed text-neutral-600">
              {isRomanUrdu 
                ? "Aap ki khwahish, behtareen andaz me tayyar. Pehli rasm se aakhri reception tak, Nexus Heritage aap ke har haseen lamhe ko manane me aap ka sacha shareek hai."
                : "Your vision, perfectly orchestrated. From the first tradition to the final reception, Nexus Heritage is your dedicated partner in celebrating Pakistan's most beautiful moments."}
            </p>

            {/* Direct Search Trigger */}
            <div className="w-full max-w-xl">
              <Link href="/explore" className="block">
                <div className="flex items-center w-full bg-white border border-neutral-200 hover:border-neutral-900 transition-all duration-300 rounded-2xl p-4 cursor-pointer shadow-3xs">
                  <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                  <span className="text-neutral-450 text-sm font-normal text-neutral-400">
                    {isRomanUrdu ? "Marquees, photographers ya services dhundein..." : "Search venues, photographers, caterers..."}
                  </span>
                  <div className="ml-auto bg-neutral-950 text-white rounded-xl px-5 py-1.5 text-xs font-bold uppercase tracking-wider">
                    {isRomanUrdu ? "Talash" : "Search"}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Column: Breathtaking Editorial Luxury Event Imagery */}
          <div className="lg:col-span-5 relative w-full h-[400px] lg:h-[480px] bg-neutral-50 rounded-3xl overflow-hidden shadow-xs border border-neutral-150">
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" 
              alt="Luxury Editorial Event Setting" 
              className="w-full h-full object-cover contrast-105"
            />
          </div>
        </div>
      </div>

      {/* 3. THREE UNIFIED PATHWAYS */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24 mt-20 relative z-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path 1: I am Planning */}
          <Link href="/create-event" className="group">
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 h-full flex flex-col justify-between hover:border-[#C5A880]/50 hover:shadow-xs transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 flex items-center justify-center mb-6">
                  <Calendar className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-black font-serif text-neutral-900 mb-2 leading-tight">
                  I am Planning
                </h3>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                  Start your personalized plan. Organize your budget, guest lists, Mayun, Mehndi, Baraat timelines, and track milestones.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-neutral-950 hover:underline mt-8">
                Start Planning <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Path 2: I am Browsing */}
          <Link href="/explore" className="group">
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 h-full flex flex-col justify-between hover:border-[#C5A880]/50 hover:shadow-xs transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 flex items-center justify-center mb-6">
                  <Search className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-black font-serif text-neutral-900 mb-2 leading-tight">
                  I am Browsing
                </h3>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                  Explore verified marquees, premium makeup studios, bridal wear designers, and culinary professionals near you.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-neutral-950 hover:underline mt-8">
                Browse Marketplace <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Path 3: I am a Venue/Vendor */}
          <Link href="/business" className="group">
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 h-full flex flex-col justify-between hover:border-[#C5A880]/50 hover:shadow-xs transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5A880]/10 flex items-center justify-center mb-6">
                  <Store className="w-5 h-5 text-[#C5A880]" />
                </div>
                <h3 className="text-2xl font-black font-serif text-neutral-900 mb-2 leading-tight">
                  I am a Partner
                </h3>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                  For venue owners and creative vendors. Host your storefront, secure online bookings, and streamline client proposals.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-neutral-950 hover:underline mt-8">
                Partner with Us <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. QUICK WIN: DAIG ESTIMATOR / CATERING PLANNER */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24 relative z-40">
        <div className="bg-[#FAF6F0] border border-[#E6CDA7]/40 rounded-[2rem] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block mb-2 font-bold">Catering Planner</span>
            <h3 className="font-serif text-2xl md:text-3xl font-black text-neutral-900 leading-tight mb-3">
              Get Your Accurate Daig Count in Seconds
            </h3>
            <p className="text-neutral-500 text-xs font-normal mb-6">
              Plan your Mehndi, Baraat, or Walima menu requirements. Drag the expected guest count slider, and our catering matrix estimates the exact number of Biryani/Pulao and Qorma Daigs required.
            </p>
            
            {/* Slider */}
            <div className="bg-white p-4 rounded-xl border border-neutral-100">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-bold text-neutral-600">Expected Guests</span>
                <span className="text-lg font-black text-neutral-900">{guestsCount} guests</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="25"
                value={guestsCount} 
                onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#C5A880] [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#C5A880] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:h-10 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C5A880] [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-max shrink-0">
            <div className="p-6 bg-white border border-[#E6CDA7]/25 rounded-2xl text-center w-full lg:w-[180px] shadow-3xs">
              <span className="font-mono text-[9px] text-[#C5A880] uppercase block mb-1 font-bold">Biryani Daigs</span>
              <span className="text-3xl font-black text-neutral-900">{daigStats.biryani}</span>
              <span className="text-[10px] text-neutral-450 block mt-1">(10kg rice base)</span>
            </div>
            <div className="p-6 bg-white border border-[#E6CDA7]/25 rounded-2xl text-center w-full lg:w-[180px] shadow-3xs">
              <span className="font-mono text-[9px] text-[#C5A880] uppercase block mb-1 font-bold">Qorma Daigs</span>
              <span className="text-3xl font-black text-neutral-900">{daigStats.qorma}</span>
              <span className="text-[10px] text-neutral-455 block mt-1">(10kg meat base)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUICK ENTRY CARDS */}
      <HomeEntryCards />

      {/* 6. CATEGORY CHIPS */}
      <HomeCategoryChips />

      {/* 7. EXPLORE ENTRY POINT */}
      <ExploreEntryPoint />

      {/* 8. BILINGUAL INVITATION GIFT PROMO */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24 relative z-40">
        <div className="bg-white border border-[#E6CDA7]/25 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-[#C5A880]/15 text-[#C5A880] text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
              Complimentary Tool
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-neutral-900 leading-tight mb-4 tracking-tight">
              Bilingual Digital Cards — Created as a Gift
            </h2>
            <p className="text-neutral-500 text-sm font-normal mb-8 leading-relaxed">
              Design exquisite digital invitations featuring authentic Urdu script alongside English. Send directly via WhatsApp, collect automated RSVPs from your family, and share venue maps instantly. 100% free when you set up your plan.
            </p>
            <Link href="/create-event">
              <button className="bg-neutral-950 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                Create Your Free Invitation <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          <div className="w-full lg:w-[400px] bg-white border border-[#E6CDA7]/40 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            {/* Elegant invitation mock */}
            <div className="border-2 border-double border-[#C5A880]/50 p-6 text-center rounded-2xl relative">
              <span className="font-serif italic text-xs text-[#C5A880] block mb-2">Bismillah-ir-Rahman-ir-Rahim</span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-1">Baraat Ceremony</h3>
              <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 mb-4">Request the Honour of Your Presence</p>
              
              <div className="h-[1px] bg-[#E6CDA7]/30 my-3" />
              <div className="text-neutral-600 font-serif text-sm italic mb-2">
                Ayesha & Bilal
              </div>
              <div className="text-[10px] text-neutral-400 font-mono mb-4">
                Lahore, Pakistan
              </div>
              <div className="flex gap-2 justify-center">
                <span className="px-3 py-1 bg-[#FAF6F0] border border-[#E6CDA7]/30 text-[#C5A880] text-[9px] font-black rounded-lg">Urdu</span>
                <span className="px-3 py-1 bg-[#FAF6F0] border border-[#E6CDA7]/30 text-[#C5A880] text-[9px] font-black rounded-lg">English</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SOCIAL PROOF: CURATED BY EXCELLENCE */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24 relative z-40">
        <div className="mb-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-bold">
            Curated by Excellence
          </span>
          <h2 className="text-3xl font-black font-serif text-neutral-900 tracking-tight">
            Celebrated by Pakistan's Finest Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Planning our daughter's Baraat and Walima from abroad seemed impossible. The Event Concierge and digital invitations made coordination seamless for our 600 guests.",
              client: "Mrs. & Mr. Siddiqui",
              location: "Lahore / London",
              image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
            },
            {
              quote: "The catering estimator was surprisingly spot on! We managed our Mayun and Mehndi budgets down to the rupee, and the bilingual invites were loved by everyone.",
              client: "Ayesha & Bilal",
              location: "Karachi",
              image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop"
            },
            {
              quote: "As venue operators, the partner storefront has expanded our bookings for the wedding season. Truly a premium experience designed for high-end hospitality.",
              client: "Royal Palms Banquets",
              location: "Lahore",
              image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-neutral-100 rounded-3xl p-8 flex flex-col justify-between hover:border-[#C5A880]/30 transition-all duration-300 hover:shadow-3xs">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-6 bg-neutral-100">
                  <img src={item.image} alt={item.client} className="w-full h-full object-cover" />
                </div>
                <p className="text-neutral-650 text-sm italic leading-relaxed text-neutral-600">
                  "{item.quote}"
                </p>
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">{item.client}</h4>
                <p className="text-neutral-400 text-xs font-mono">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ELITE VENUES PREVIEW */}
      <section className="max-w-[1400px] mx-auto px-6 mb-24 relative z-40">
        <div className="bg-white rounded-3xl border border-neutral-100 p-6 lg:p-8 flex flex-col justify-between hover:border-neutral-900 transition-all duration-300">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-2xl font-black font-serif text-neutral-900 tracking-tight">Elite Venues</h3>
            <Link href="/explore?tab=venues" className="text-xs font-black uppercase tracking-wider text-neutral-950 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <Link href="/venues/l-1" className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-neutral-900 transition-all duration-350">
              <div className="relative h-48 overflow-hidden shrink-0 bg-neutral-50">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop" alt="The Royal Palms" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-3 left-3 bg-white/95 border border-neutral-100 px-2.5 py-1 rounded-full text-[9px] font-black text-neutral-800 tracking-wider uppercase shadow-xs">Verified Partner</div>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-neutral-900 text-base mb-1">The Royal Palms</h4>
                  <p className="text-xs text-neutral-550 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Lahore, Pakistan
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-sm font-black text-neutral-900">PKR 450,000</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/venues/l-2" className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group cursor-pointer flex flex-col h-full hover:border-neutral-900 transition-all duration-350">
              <div className="relative h-48 overflow-hidden shrink-0 bg-neutral-50">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop" alt="Nishat Hotel" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-3 left-3 bg-white/95 border border-neutral-100 px-2.5 py-1 rounded-full text-[9px] font-black text-neutral-800 tracking-wider uppercase shadow-xs">Verified Partner</div>
                <div className="absolute top-3 right-3 bg-white/95 border border-neutral-100 px-2 py-1 rounded-full text-[10px] font-bold text-neutral-800 flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 4.9
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-black font-serif text-neutral-900 text-base mb-1">The Nishat Banquets</h4>
                  <p className="text-xs text-neutral-550 flex items-center gap-1.5 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Johar Town, Lahore
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-0.5">Starting from</span>
                    <span className="text-sm font-black text-neutral-900">PKR 850,000</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. LUXURY FOOTER */}
      <footer className="border-t border-neutral-150 bg-white text-neutral-800 py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <span className="text-xl font-serif tracking-wide text-neutral-900 font-black">
              NEXUS <span className="font-semibold font-sans text-lg tracking-widest ml-1 text-[#C5A880]">HERITAGE</span>
            </span>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Pakistan's premier platform for curated family celebrations. Handcrafted for beautiful celebrations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Portals</h4>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li><Link href="/dashboard" className="hover:text-neutral-900 transition-colors">Planning Portal</Link></li>
              <li><Link href="/business" className="hover:text-neutral-900 transition-colors">Marquee & Venue Dashboard</Link></li>
              <li><Link href="/register?role=artisan" className="hover:text-neutral-900 transition-colors">Vendor & Creative Studio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Discover</h4>
            <ul className="space-y-3 text-xs text-neutral-500">
              <li><Link href="/explore?tab=venues" className="hover:text-neutral-900 transition-colors">Elite Venues</Link></li>
              <li><Link href="/explore?tab=professionals" className="hover:text-neutral-900 transition-colors">Artisan Network</Link></li>
              <li><Link href="/explore?tab=vendors" className="hover:text-neutral-900 transition-colors">Verified Vendors</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest mb-4">Ecosystem</h4>
            <div className="flex space-x-3 font-mono text-[9px] tracking-tight bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-xl w-max">
              <span className="text-neutral-400">STATUS</span>
              <span className="text-neutral-900 font-bold">SECURE</span>
              <span className="text-emerald-600 font-bold">ONLINE</span>
            </div>
            <p className="text-[10px] text-neutral-450">© 2026 Nexus Heritage International. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile-First Bottom Nav Bar */}
      <MobileBottomNav />

      {/* Floating WhatsApp Contact Button (#1 Trust Signal in Pakistan) */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline-block">
          Need Help? Talk to us on WhatsApp
        </span>
      </a>

    </div>
  );
}
