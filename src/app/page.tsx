"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, MapPin, ArrowRight, Star, 
  CheckCircle, Calendar, Users, Utensils, MessageSquare, 
  Building2, Camera, Globe, Heart, ChevronLeft, ChevronRight, 
  QrCode, Send, MessageCircle, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useLanguage } from '@/contexts/LanguageContext';
import { HomeEntryCards } from '@/components/home/HomeEntryCards';
import { HomeCategoryChips } from '@/components/home/HomeCategoryChips';
import { HomeExploreHeader } from '@/components/layout/HomeExploreHeader';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { SuccessStories } from '@/components/home/SuccessStories';
import { VendorBenefits } from '@/components/home/VendorBenefits';
import { Newsletter } from '@/components/home/Newsletter';
import { ChooseJourney } from '@/components/home/ChooseJourney';
import { RentalsWardrobe } from '@/components/home/RentalsWardrobe';
import { WhyChooseNexus } from '@/components/home/WhyChooseNexus';

// Stylized Interactive Pakistan Map Cities
const CITIES = [
  { id: 'lahore', name: 'Lahore', x: 260, y: 190, venues: 480, planners: 150, events: '15,200+' },
  { id: 'karachi', name: 'Karachi', x: 90, y: 380, venues: 620, planners: 220, events: '24,000+' },
  { id: 'islamabad', name: 'Islamabad', x: 250, y: 110, venues: 290, planners: 90, events: '9,800+' },
  { id: 'faisalabad', name: 'Faisalabad', x: 210, y: 195, venues: 180, planners: 40, events: '4,100+' },
  { id: 'multan', name: 'Multan', x: 170, y: 250, venues: 140, planners: 30, events: '3,200+' },
  { id: 'peshawar', name: 'Peshawar', x: 190, y: 115, venues: 110, planners: 25, events: '2,900+' },
  { id: 'quetta', name: 'Quetta', x: 70, y: 280, venues: 80, planners: 15, events: '1,500+' }
];

export default function HomePage() {
  const { isRomanUrdu } = useLanguage();
  const { isSignedIn, user } = useUser();
  
  // Airbnb Search States
  const [searchLocation, setSearchLocation] = useState('');
  const [searchEventType, setSearchEventType] = useState('Baraat');
  const [searchGuests, setSearchGuests] = useState('300');
  const [searchDate, setSearchDate] = useState('');

  // Map Hover State
  const [hoveredCity, setHoveredCity] = useState<typeof CITIES[0] | null>(null);

  // Catering Slider State
  const [guestsCount, setGuestsCount] = useState<number>(300);

  // Testimonials Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Masonry Saved State
  const [savedInspirations, setSavedInspirations] = useState<number[]>([]);
  const [savedProfessionals, setSavedProfessionals] = useState<string[]>([]);
  const toggleSaveProfessional = (id: string) => {
    setSavedProfessionals(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // AI Assistant Chat Simulator States
  const [aiMessageIndex, setAiMessageIndex] = useState(0);
  const aiConversation = [
    { sender: 'user', text: 'I am planning a Baraat for 400 guests in Lahore this November. What should my timeline look like?' },
    { sender: 'concierge', text: 'Congratulations! For a 400-guest Baraat in November: 1. Secure your marquee by July (slots fill early). 2. Book your caterer for a 3-course menu. 3. Finalize setup check-ins at 05:00 PM. Here is a custom checklist.' },
    { sender: 'user', text: 'Can you estimate the number of Biryani daigs needed?' },
    { sender: 'concierge', text: 'Based on 400 guests, you will need approximately 5 Biryani Daigs (10kg rice base) and 4 Qorma Daigs. I can add this directly to your catering checklist!' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAiMessageIndex((prev) => (prev < aiConversation.length - 1 ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Daig calculations
  const biryaniDaigs = Math.ceil(guestsCount / 80);
  const qormaDaigs = Math.ceil(guestsCount / 100);

  // Testimonials array
  const testimonials = [
    {
      quote: "Planning our daughter's wedding from London seemed impossible. Nexus Heritage aligned our budget, managed RSVPs for 600 guests, and helped us book the perfect marquee in minutes.",
      client: "Mrs. & Mr. Siddiqui",
      location: "Lahore / London",
      event: "Baraat Reception",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
    },
    {
      quote: "The guest counter tool was highly accurate! We managed our food budgeting down to the rupee, and the bilingual Urdu invitations were loved by all our family members.",
      client: "Ayesha & Bilal",
      location: "Karachi",
      event: "Mehndi Celebration",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200"
    },
    {
      quote: "As marquee operators, the partner platform has simplified our booking management. No more double bookings or lost deposit receipts. Truly elite hospitality software.",
      client: "Royal Palms Events",
      location: "Lahore",
      event: "Partner Marquee",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    }
  ];

  // Bilingual switcher card state
  const [isUrduCard, setIsUrduCard] = useState(false);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen font-sans pb-20 md:pb-0 antialiased selection:bg-[#C5A880]/20 text-slate-800">
      {/* Structured SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Nexus Heritage",
            "url": "https://nexus-app-pakistan.vercel.app",
            "logo": "https://nexus-app-pakistan.vercel.app/vercel.svg",
            "sameAs": [
              "https://instagram.com",
              "https://facebook.com",
              "https://youtube.com"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+92-300-1234567",
              "contactType": "customer service",
              "availableLanguage": ["English", "Urdu"]
            }
          })
        }}
      />
      
      {/* GLOBAL SCROLL-TRANSITIONS NAV BAR */}
      <HomeExploreHeader />

      {/* 1. HERO EXPERIENCE WITH SLATE & INDIGO OVERLAYS */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-950 text-white">
        
        {/* Modern grid and gradient overlays (Stripe-inspired) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 z-0" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

        {/* Content Overlay */}
        <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 w-full text-center flex flex-col items-center">
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest rounded-full mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> Pakistan's Premier Event Marketplace
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-6 text-white"
          >
            Everything You Need for Your Perfect Event, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-indigo-500">All in One Place</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg font-normal mb-10 max-w-2xl leading-relaxed"
          >
            Discover trusted venues, photographers, videographers, decorators, caterers, rental stores, makeup artists, entertainers, and production professionals across Pakistan.
          </motion.p>

          {/* CENTRAL MARKETPLACE SEARCH BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl md:rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md mb-4"
          >
            <div className="flex flex-col md:flex-row items-center justify-between text-left divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              {/* Category Search Input */}
              <div className="flex-1 px-5 py-3 w-full">
                <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">What are you looking for?</label>
                <select 
                  value={searchEventType} 
                  onChange={(e) => setSearchEventType(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-200 outline-none border-none cursor-pointer mt-1"
                >
                  <option value="venues" className="bg-slate-900">Venues</option>
                  <option value="photographers" className="bg-slate-900">Photography</option>
                  <option value="videographers" className="bg-slate-900">Videography</option>
                  <option value="makeup" className="bg-slate-900">Makeup Artists</option>
                  <option value="decor" className="bg-slate-900">Decorators</option>
                  <option value="catering" className="bg-slate-900">Catering</option>
                  <option value="rentals" className="bg-slate-900">Popular Rentals</option>
                </select>
              </div>

              {/* Location selection */}
              <div className="flex-1 px-5 py-3 w-full">
                <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Location</label>
                <select 
                  value={searchLocation} 
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-200 outline-none border-none cursor-pointer mt-1"
                >
                  <option value="" className="bg-slate-900">Choose Location</option>
                  <option value="lahore" className="bg-slate-900">Lahore</option>
                  <option value="karachi" className="bg-slate-900">Karachi</option>
                  <option value="islamabad" className="bg-slate-900">Islamabad</option>
                  <option value="faisalabad" className="bg-slate-900">Faisalabad</option>
                  <option value="multan" className="bg-slate-900">Multan</option>
                  <option value="peshawar" className="bg-slate-900">Peshawar</option>
                  <option value="quetta" className="bg-slate-900">Quetta</option>
                </select>
              </div>

              {/* Event Date Picker */}
              <div className="flex-1 px-5 py-3 w-full">
                <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Event Date</label>
                <input 
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-slate-200 outline-none border-none mt-1 select-none"
                />
              </div>

              {/* Search Submit Action Button */}
              <div className="px-3 py-2 w-full md:w-auto shrink-0 flex justify-end">
                <Link href={`/explore?location=${searchLocation}&category=${searchEventType}`}>
                  <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl md:rounded-full flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
                    <Search className="w-4 h-4" /> Search
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Search Suggestions Underneath */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-slate-500"
          >
            <span>Popular:</span>
            {[
              { label: 'Banquet Halls in Lahore', loc: 'lahore', cat: 'venues' },
              { label: 'Photographers in Karachi', loc: 'karachi', cat: 'photographers' },
              { label: 'Caterers in Islamabad', loc: 'islamabad', cat: 'catering' }
            ].map((sug, idx) => (
              <button 
                key={idx} 
                onClick={() => { setSearchLocation(sug.loc); setSearchEventType(sug.cat); }}
                className="px-3 py-1 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                {sug.label}
              </button>
            ))}
          </motion.div>

          {/* Primary & Secondary Hero CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/explore">
              <span className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 hover:shadow-[0_8px_25px_rgba(79,70,229,0.3)] transition-all cursor-pointer">
                Explore Services <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/business">
              <span className="inline-flex items-center px-8 py-4 border border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-white/5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer">
                Become a Professional
              </span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 2. TRUSTED BY STRIP & KEY STATISTICS */}
      <section className="bg-white border-y border-slate-200/50 py-12 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A880]">Trusted By Pakistan's Finest Families</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">15,000+</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Verified Artisans</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">250+</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Cities Covered</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">40,000+</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Events Managed</p>
            </div>
            <div>
              <h4 className="text-4xl font-serif font-black text-slate-900">98%</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.2 CHOOSE YOUR JOURNEY SECTION */}
      <ChooseJourney />

      {/* 2.5 PROBLEM-SOLUTION SECTION */}
      <ProblemSolution />

      {/* 3. HOW IT WORKS TIMELINE */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center bg-slate-50 border-y border-slate-200">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4F46E5] block mb-2 font-bold">Planning Made Simple</span>
        <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight mb-16">
          How Nexus Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold mb-6 shadow-md z-10">1</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Search</h3>
            <p className="text-xs text-slate-550 max-w-xs leading-relaxed">
              Explore a vast database of verified venues, photographers, makeup artists, and decorators.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#14B8A6] text-white flex items-center justify-center text-lg font-bold mb-6 shadow-md z-10">2</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Compare</h3>
            <p className="text-xs text-slate-550 max-w-xs leading-relaxed">
              Filter by city, pricing, capacity, reviews, and availability dates to find the perfect fit.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-bold mb-6 shadow-md z-10">3</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Book</h3>
            <p className="text-xs text-slate-550 max-w-xs leading-relaxed">
              Confirm bookings securely with protected card deposits and electronic contract sign-offs.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SPLIT CATERING CALCULATOR WIDGET */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-[#FAF6F0] border border-[#E6CDA7]/40 rounded-[2.5rem] p-8 md:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: inputs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-[#C5A880] block">Estimator & Calculators</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-950 leading-tight">
                Plan with Confidence
              </h2>
              <p className="text-slate-550 text-xs leading-relaxed text-slate-500">
                Estimate catering costs, seating, budgets, and guest requirements instantly with our integrated planning utilities. Includes: **Guest Calculator**, **Meal Calculator**, **Budget Planner**, and **Timeline Generator**.
              </p>
              <div className="pt-2">
                <Link href="/create-event">
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F5B3E] text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#0c4730] hover:shadow-md transition-all cursor-pointer">
                    Open Calculator <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </span>
                </Link>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-3xs">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-bold text-slate-500">Expected Guests Count</span>
                  <span className="text-xl font-black text-slate-950">{guestsCount} Guests</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1200" 
                  step="25"
                  value={guestsCount} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setGuestsCount(val);
                    if (typeof window !== 'undefined' && navigator.vibrate) {
                      navigator.vibrate(5);
                    }
                  }}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#C5A880] [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#C5A880] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C5A880] [&::-moz-range-thumb]:border-none"
                />
              </div>
            </div>

            {/* Right side: stats & illustration breakdown */}
            <div className="lg:col-span-5 w-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md text-center space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">Meal Estimates</span>
                <span className="text-xs font-bold text-[#C5A880] uppercase">10kg Base Pot</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Biryani Daigs</span>
                  <span className="text-3xl font-black text-slate-900">{biryaniDaigs}</span>
                  <span className="text-[9px] text-slate-450 block mt-1">Rice & Meat mix</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Qorma Daigs</span>
                  <span className="text-3xl font-black text-slate-900">{qormaDaigs}</span>
                  <span className="text-[9px] text-slate-455 block mt-1">Curry base pot</span>
                </div>
              </div>

              <div className="pt-2 text-xs font-medium text-slate-500 leading-relaxed text-left border-t border-slate-100">
                🍲 Estimates assume a standard Pakistani wedding catering portion of 250g per head. Setup wagers can scale this dynamically.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PAKISTAN MAP CONSOLE */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-bold">National Infrastructure</span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-950 leading-tight">
                Planning Across Pakistan
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We power elite hospitality and creative partnerships across every major urban hub in the country. Hover over city coordinates to explore active events and verified talent registry details.
              </p>

              {/* Display hovered statistics details */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60 min-h-[140px] flex flex-col justify-center">
                {hoveredCity ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={hoveredCity.id}
                  >
                    <span className="text-lg font-black text-slate-950 block font-serif">{hoveredCity.name} Hub</span>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <div>
                        <span className="text-[#C5A880] text-lg font-black block">{hoveredCity.venues}</span>
                        <span>Venues</span>
                      </div>
                      <div>
                        <span className="text-[#C5A880] text-lg font-black block">{hoveredCity.planners}</span>
                        <span>Planners</span>
                      </div>
                      <div>
                        <span className="text-[#C5A880] text-lg font-black block">{hoveredCity.events}</span>
                        <span>Events</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-slate-400 text-xs italic text-center">
                    Hover over any city coordinate on the map to inspect live ecosystem data.
                  </div>
                )}
              </div>
            </div>

            {/* Right Interactive SVG Map Column */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[400px] h-[450px] bg-slate-50 rounded-3xl border border-slate-200/50 p-6 overflow-hidden flex items-center justify-center">
                {/* Stylized Pakistan Map SVG Path */}
                <svg width="340" height="420" viewBox="0 0 340 420" fill="none" className="text-slate-350 z-0">
                  <path 
                    d="M 50,300 C 60,330 90,380 90,390 C 100,400 120,400 130,370 C 140,340 180,310 200,280 C 220,250 250,210 270,180 C 290,150 290,110 250,110 C 210,110 180,130 160,160 C 140,190 100,220 80,260 C 60,300 50,300 50,300 Z" 
                    stroke="#E6CDA7" 
                    strokeWidth="2.5" 
                    strokeDasharray="4 6"
                    fill="#FAF6F0"
                  />
                  {/* Connection lines */}
                  <line x1="90" y1="380" x2="260" y2="190" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="250" y1="110" x2="260" y2="190" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="210" y1="195" x2="260" y2="190" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                </svg>

                {/* City node indicators */}
                {CITIES.map((city) => {
                  const isHovered = hoveredCity?.id === city.id;
                  return (
                    <button
                      key={city.id}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      style={{ left: `${city.x}px`, top: `${city.y}px` }}
                      className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group focus:outline-none"
                    >
                      <span className={`absolute inset-0 rounded-full bg-[#C5A880] transition-all duration-300 ${
                        isHovered ? 'scale-180 opacity-40 animate-ping' : 'scale-100 opacity-20'
                      }`} />
                      <span className={`w-2.5 h-2.5 rounded-full border border-white transition-all duration-300 ${
                        isHovered ? 'bg-[#C5A880] scale-120' : 'bg-slate-900'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.2 WHY CHOOSE NEXUS SECTION */}
      <WhyChooseNexus />

      {/* 6. REDESIGNED BILINGUAL DIGITAL INVITATION Mockup */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-white border border-slate-200/50 rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text */}
          <div className="max-w-xl text-left space-y-6">
            <span className="inline-block px-3 py-1 bg-[#C5A880]/15 text-[#C5A880] text-[10px] font-black uppercase tracking-widest rounded-full">
              Complimentary Tool
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-serif text-neutral-900 leading-tight tracking-tight">
              Beautiful Invitations. Instantly Delivered.
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed text-slate-500">
              Create elegant bilingual invitations with RSVP tracking and WhatsApp sharing.
            </p>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-650 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> QR Code
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Google Maps
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> RSVP
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Gift Registry
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Countdown Timer
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" /> Event Schedule
              </li>
            </ul>

            <div className="pt-2">
              <Link href="/invite/demo-guest-view">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#C5A880] transition-colors cursor-pointer">
                  Create Invitation <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {/* Switch Toggle */}
            <div className="flex gap-3">
              <button 
                onClick={() => setIsUrduCard(false)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  !isUrduCard 
                    ? 'bg-neutral-950 text-white border-neutral-950' 
                    : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                English Text
              </button>
              <button 
                onClick={() => setIsUrduCard(true)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  isUrduCard 
                    ? 'bg-neutral-950 text-white border-neutral-950' 
                    : 'bg-slate-50 text-slate-650 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                Urdu Calligraphy
              </button>
            </div>
          </div>

          {/* Right Mobile / RSVP Mockup */}
          <div className="w-full lg:w-[400px] bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="border-2 border-double border-[#C5A880]/40 p-6 text-center bg-white rounded-2xl relative min-h-[300px] flex flex-col justify-between">
              
              <div className="space-y-4">
                <span className="font-serif italic text-xs text-[#C5A880] block">Bismillah-ir-Rahman-ir-Rahim</span>
                
                <AnimatePresence mode="wait">
                  {isUrduCard ? (
                    <motion.div
                      key="urdu"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="space-y-2 py-4"
                    >
                      <h3 className="font-serif text-3xl font-bold text-neutral-900">شادی کی تقریب</h3>
                      <p className="text-xs font-medium text-slate-500">عائشہ اور بلال کی برات میں شرکت فرما کر شکریہ کا موقع دیں۔</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="english"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2 py-4"
                    >
                      <h3 className="font-serif text-2xl font-bold text-neutral-900">Baraat Ceremony</h3>
                      <p className="text-xs uppercase font-mono tracking-widest text-slate-400">Request the Honour of Your Presence</p>
                      <h4 className="font-serif text-xl font-bold text-[#C5A880]">Ayesha & Bilal</h4>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* QR and RSVP bar */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-6 shrink-0">
                <div className="text-left">
                  <span className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">Scan to RSVP</span>
                  <span className="text-[10px] font-mono font-bold text-slate-700">Shaadi Code: #AB89</span>
                </div>
                <QrCode className="w-8 h-8 text-[#C5A880]" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 7. BRING ENTRY CARDS & CATEGORY GRID SHIFTED BELOW HERO */}
      <HomeEntryCards />
      <CategoryGrid />

      {/* 8. FEATURED PROFESSIONALS GRID */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-slate-50">
        <div className="flex justify-between items-baseline mb-8">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 block font-bold mb-1">Verified Professionals</span>
            <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight">Featured Professionals</h2>
          </div>
          <Link href="/explore?tab=professionals" className="text-xs font-black uppercase tracking-wider text-indigo-600 hover:underline flex items-center gap-1.5 min-h-[48px]">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-8 mb-4 scrollbar-hide text-left">
          {["Photographers", "Videographers", "Decorators", "Makeup Artists", "Florists", "Event Planners", "Caterers", "Live Music", "Rental Services"].map((cat) => (
            <button key={cat} className="px-4 py-2 border border-slate-250 bg-white rounded-full text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 'prof-1',
              name: 'Oshoot Photography',
              category: 'Photography',
              city: 'Lahore',
              price: 'PKR 150,000 / event',
              rating: '4.9',
              reviews: '120 reviews',
              image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600'
            },
            {
              id: 'prof-2',
              name: 'Zara Makeup Studio',
              category: 'Makeup Artist',
              city: 'Karachi',
              price: 'PKR 85,000 / bride',
              rating: '4.8',
              reviews: '95 reviews',
              image: 'https://images.unsplash.com/photo-151285560929-80b456fea0bc?q=80&w=600'
            },
            {
              id: 'prof-3',
              name: 'Tariq Amin Salon',
              category: 'Production',
              city: 'Islamabad',
              price: 'PKR 120,000 / event',
              rating: '4.9',
              reviews: '180 reviews',
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600'
            }
          ].map((prof) => (
            <div key={prof.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-slate-350 transition-all duration-300 hover:shadow-lg text-left flex flex-col h-full relative">
              
              {/* Photo & Verified Badge & Save Button */}
              <div className="relative h-56 overflow-hidden bg-slate-100 shrink-0">
                <img src={prof.image} alt={prof.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                {/* Verified Badge */}
                <span className="absolute top-4 left-4 bg-emerald-500 text-white px-2.5 py-1 rounded-md text-[8px] font-bold tracking-wider uppercase flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 fill-white text-emerald-500" /> Verified
                </span>

                {/* Save Heart Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleSaveProfessional(prof.id); }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-slate-650 hover:text-red-500 transition-colors z-30 cursor-pointer"
                >
                  <Heart className={`w-4.5 h-4.5 ${savedProfessionals.includes(prof.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{prof.category}</span>
                    <span className="text-xs font-semibold text-slate-500">{prof.city}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight flex items-center gap-1.5">
                    {prof.name}
                  </h3>
                  
                  {/* Rating & Review counts */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="font-bold ml-1 text-slate-900">{prof.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{prof.reviews}</span>
                  </div>
                </div>
                
                {/* Actions and Price Info */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Starting Price</span>
                    <span className="text-sm font-black text-slate-900">{prof.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link href={`/vendors/${prof.id}`} className="w-full">
                      <button className="w-full py-2 border border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold transition-all cursor-pointer">
                        View Profile
                      </button>
                    </Link>
                    <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="w-full">
                      <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 9. FEATURED VENUES GRID */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-white border-b border-slate-200/50">
        <div className="flex justify-between items-baseline mb-8">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 block font-bold mb-1">Premium Spaces</span>
            <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight">Featured Venues</h2>
          </div>
          <Link href="/explore?tab=venues" className="text-xs font-black uppercase tracking-wider text-indigo-600 hover:underline flex items-center gap-1.5 min-h-[48px]">
            Explore Venues <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Venue Type Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-8 mb-4 scrollbar-hide text-left">
          {["Luxury Hotels", "Farmhouses", "Banquet Halls", "Marquees", "Destination Venues", "Outdoor Gardens", "Rooftop Spaces"].map((cat) => (
            <button key={cat} className="px-4 py-2 border border-slate-200 bg-white rounded-full text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: 'The Royal Palms',
              city: 'Lahore, Pakistan',
              price: 'PKR 450,000 / day',
              rating: '4.8',
              capacity: '500 guests',
              availability: 'Available Today',
              image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600'
            },
            {
              name: 'The Nishat Banquets',
              city: 'Johar Town, Lahore',
              price: 'PKR 850,000 / day',
              rating: '4.9',
              capacity: '1,200 guests',
              availability: 'Fully Booked Nov',
              image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600'
            }
          ].map((venue, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-slate-350 transition-all duration-300 hover:shadow-lg text-left flex flex-col h-full">
              
              {/* Cover Image & Availability Status & Rating badge */}
              <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                {/* Availability Badge */}
                <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-wider ${
                  venue.availability.includes('Available') ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {venue.availability}
                </span>

                {/* Rating Badge */}
                <span className="absolute top-4 right-4 bg-white/95 border border-slate-150 px-2 py-1 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {venue.rating}
                </span>
              </div>

              {/* Venue details */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{venue.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {venue.city}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Capacity</span>
                    <span className="font-bold text-slate-850">{venue.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Price Range</span>
                    <span className="font-black text-slate-900">{venue.price}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 9.2 RENTALS & WARDROBE SECTION */}
      <RentalsWardrobe />

      {/* 9.5 INSPIRATION COLLECTIONS */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-white border-b border-slate-200/50">
        <div className="flex justify-between items-baseline mb-12">
          <div className="text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 block font-bold mb-1">Curated Guides</span>
            <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight">Inspiration Collections</h2>
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">Immersive Experiences</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 1, title: 'Luxury Weddings', desc: 'Opulent celebrations with verified design artisans.', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600' },
            { id: 2, title: 'Budget-Friendly Celebrations', desc: 'Curated packages designed for compact budgets.', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600' },
            { id: 3, title: 'Corporate Events', desc: 'Product launches, annual galas, and professional team getaways.', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600' },
            { id: 4, title: 'Fashion Shoots', desc: 'Elite photography studios and modern studio equipment rentals.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600' },
            { id: 5, title: 'Outdoor Events', desc: 'Rooftops, farmhouses, and scenic lawns across Pakistan.', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600' },
            { id: 6, title: 'Destination Weddings', desc: 'All-inclusive resort bookings and travel logistics.', image: 'https://images.unsplash.com/photo-1520854221256-17451cc35953?q=80&w=600' }
          ].map((item) => {
            const isSaved = savedInspirations.includes(item.id);
            return (
              <div key={item.id} className="relative h-96 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-left" />

                {/* Save Trigger */}
                <div className="absolute top-4 right-4 z-20">
                  <button 
                    onClick={() => {
                      setSavedInspirations(prev => 
                        prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id]
                      )
                    }}
                    className={`p-2 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer border ${
                      isSaved ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Text Info */}
                <div className="relative z-20 text-left">
                  <h4 className="text-lg font-black text-white leading-tight mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4 opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                  <Link href="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300">
                    Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. AI WEDDING PLANNER MOCKUP INTERFACE */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-[#FAF7F2]">
        <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white">
          
          {/* Left info column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#E6C594] border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Artificial Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-serif text-white leading-tight tracking-tight">
              Meet Your Personal AI Event Planner
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Let artificial intelligence help you organize your dream celebration in minutes.
            </p>

            <ul className="space-y-2 text-slate-350 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594]" /> Personalized planning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594]" /> Budget optimization
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594]" /> Timeline creation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594]" /> Vendor recommendations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594]" /> Guest management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6C594]" /> Checklist automation
              </li>
            </ul>

            <Link href="/create-event">
              <button className="px-6 py-3.5 bg-[#E6C594] text-neutral-950 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#ebd0ab] hover:shadow-[0_8px_20px_rgba(230,197,148,0.25)] transition-all cursor-pointer">
                Start with AI
              </button>
            </Link>
          </div>

          {/* Right simulated conversational UI */}
          <div className="lg:col-span-7 w-full bg-slate-900 border border-white/10 rounded-3xl p-6 min-h-[300px] flex flex-col justify-between text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4 text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ecosystem Assistant</span>
              </div>
              <span>Live Console</span>
            </div>

            {/* Conversation list */}
            <div className="flex-1 space-y-4 py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={aiMessageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-xs font-medium text-slate-200">
                      {aiConversation[aiMessageIndex].sender === 'user' 
                        ? aiConversation[aiMessageIndex].text 
                        : aiConversation[aiMessageIndex - 1]?.text || aiConversation[0].text}
                    </div>
                  </div>
                  {/* Concierge message */}
                  <div className="flex justify-start">
                    <div className="bg-slate-950 border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] text-xs font-medium text-[#E6C594]">
                      {aiConversation[aiMessageIndex].sender === 'concierge' 
                        ? aiConversation[aiMessageIndex].text 
                        : aiConversation[aiMessageIndex + 1]?.text || aiConversation[1].text}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>Dynamic simulation</span>
              <span className="text-slate-400 font-bold uppercase">Touch Active</span>
            </div>
          </div>

        </div>
      </section>

      {/* 11. LUXURY SUCCESS STORIES */}
      <SuccessStories />

      {/* 11. CALL TO ACTION */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 text-center bg-slate-900 text-white rounded-3xl my-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black font-sans leading-tight">
            Ready to Create Your Perfect Event?
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Join thousands of hosts booking top professionals, venues, and event rentals with absolute scheduling security.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/explore">
              <span className="inline-flex items-center gap-2 px-8 py-4 bg-[#4F46E5] hover:bg-indigo-750 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all cursor-pointer">
                Explore Services <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/register?role=artisan">
              <span className="inline-flex items-center px-8 py-4 border border-slate-700 hover:border-slate-500 hover:bg-white/5 text-slate-300 rounded-lg text-xs font-black uppercase tracking-widest transition-all cursor-pointer">
                Join Nexus Today
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11.8 NEWSLETTER SIGNUP */}
      <Newsletter />

      {/* 12. COMPREHENSIVE FOOTER */}
      <footer className="border-t border-slate-200/60 bg-white text-neutral-800 py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Company */}
          <div className="text-left space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><Link href="/about" className="hover:text-neutral-900 transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-neutral-900 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-neutral-900 transition-colors">Blog</Link></li>
              <li><Link href="/press" className="hover:text-neutral-900 transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Column 2: Marketplace */}
          <div className="text-left space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest">Marketplace</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><Link href="/explore" className="hover:text-neutral-900 transition-colors">Explore</Link></li>
              <li><Link href="/explore?tab=professionals" className="hover:text-neutral-900 transition-colors">Professionals</Link></li>
              <li><Link href="/explore?tab=venues" className="hover:text-neutral-900 transition-colors">Venues</Link></li>
              <li><Link href="/rentals/all" className="hover:text-neutral-900 transition-colors">Rentals</Link></li>
              <li><Link href="/dashboard" className="hover:text-neutral-900 transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Column 3: Support & Socials */}
          <div className="text-left space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest">Support</h4>
            <ul className="space-y-3 text-xs text-slate-500 mb-6">
              <li><Link href="/help-center" className="hover:text-neutral-900 transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-neutral-900 transition-colors">Contact</Link></li>
              <li><Link href="/faqs" className="hover:text-neutral-900 transition-colors">FAQs</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-neutral-900 transition-colors">Terms of Service</Link></li>
            </ul>

            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest pt-2">Connect</h4>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.2 1.2-1.2H16V1h-3.2C9.8 1 9 2.5 9 4.8V8z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter Quick Field */}
          <div className="text-left space-y-4">
            <h4 className="font-bold text-neutral-900 text-[10px] uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Stay updated with exclusive vendor lists, planning guides, and system feature updates.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="flex bg-slate-50 border border-slate-200 rounded-lg p-1">
              <input 
                type="email" 
                required 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-xs px-3 py-2 flex-grow placeholder-slate-400 font-medium w-full text-slate-800" 
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-750 text-white px-4 py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-450 font-medium">
            © 2026 Nexus. Crafted with elegance for unforgettable celebrations.
          </p>
          <div className="flex space-x-6 text-xs text-slate-450">
            <Link href="/privacy-policy" className="hover:text-neutral-900">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-neutral-900">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-neutral-900">Cookies</Link>
          </div>
        </div>
      </footer>

      {/* Mobile-First Bottom Nav Bar */}
      <MobileBottomNav />

      {/* Floating WhatsApp Contact Button */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline-block">
          Need Help? Talk to us on WhatsApp
        </span>
      </a>

    </div>
  );
}
