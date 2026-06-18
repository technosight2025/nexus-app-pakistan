"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, MapPin, Users, Star, Filter, Heart, Calendar, 
  Sparkles, Check, ChevronRight, ChevronLeft,
  Award, ShieldCheck, Map, ArrowRight
} from 'lucide-react'
import Link from 'next/link'

const VENUE_TYPES = [
  { id: "Virtual Star Studio", label: "Virtual Star Studio", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=200" },
  { id: "Masonic Hall", label: "Masonic Hall", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=200" },
  { id: "Architecture", label: "Architecture", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200" },
  { id: "Road Fort", label: "Road Fort", img: "https://images.unsplash.com/photo-1530103862676-de88b6b080b0?q=80&w=200" }
]

const AESTHETICS = [
  { id: "LED House", label: "LED House", img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=200" },
  { id: "Moments", label: "Moments", img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=200" },
  { id: "Contemporary Fine", label: "Contemporary Fine", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=200" },
  { id: "Tabi Hall", label: "Tabi Hall", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=200" }
]

const AMENITIES = [
  { id: "Full Kitchen", label: "Full Kitchen", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=200" },
  { id: "Pitcher/Cushion", label: "Pitcher/Cushion", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=200" },
  { id: "Landscaping", label: "Landscaping", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=200" },
  { id: "Floral Float", label: "Floral Float", img: "https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=200" }
]

const MOCK_PACKAGES = [
  {
    id: "p1",
    name: "AR Production Bundle",
    desc: "Deligent, professional, custom TV, film, and product video production.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400",
    price: "250,000"
  },
  {
    id: "p2",
    name: "Historic Gala & Concert Package",
    desc: "Acropica venue usage, AV/H/T setup, and hospitality.",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400",
    price: "500,000"
  }
]

const DISCOVER_VENUES = [
  { id: "d1", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "150,000", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400" },
  { id: "d2", name: "Makemp Rekoup", rating: 4.9, price: "160,000", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400" },
  { id: "d3", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "150,000", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400" },
  { id: "d4", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "150,000", img: "https://images.unsplash.com/photo-1530103862676-de88b6b080b0?q=80&w=400" },
  { id: "d5", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "100,000", img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=400" },
  { id: "d6", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "100,000", img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=400" },
  { id: "d7", name: "THE REFINERY SOUNDSTAGE", rating: 4.5, price: "150,000", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400" },
  { id: "d8", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "150,000", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400" },
  { id: "d9", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "150,000", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400" },
  { id: "d10", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "180,000", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400" },
  { id: "d11", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "180,000", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400" },
  { id: "d12", name: "THE REFINERY SOUNDSTAGE", rating: 4.9, price: "180,000", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400" }
]

export function VenueDirectoryV3() {
  const [selectedType, setSelectedType] = useState("Virtual Star Studio")
  const [selectedAesthetic, setSelectedAesthetic] = useState("LED House")
  const [selectedAmenity, setSelectedAmenity] = useState("Full Kitchen")
  const [capacity, setCapacity] = useState(350)
  const [selectedDate, setSelectedDate] = useState("2026-06-25")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-[#FDFBF7] text-[#2C2520] min-h-screen relative overflow-hidden font-sans pb-24">
      
      {/* Background Soft Blurs */}
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-[#16423C]/5 to-[#C5A880]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#C5A880]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Navbar */}
      <nav className="fixed top-0 inset-x-0 h-20 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-[#C5A880]/15 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-[#16423C] flex items-center gap-2">
              NEXUS
            </Link>
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#2C2520]/75">
              <Link href="/explore" className="hover:text-[#C5A880] transition-colors">Explore</Link>
              <Link href="/pricing" className="hover:text-[#C5A880] transition-colors">Support</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 hover:text-[#16423C] px-4 py-2 transition-colors">Return Home</Link>
            <Link href="/dashboard" className="bg-[#16423C] hover:bg-[#0F2D29] text-white px-6 py-2.5 rounded-full font-medium text-xs shadow-md transition-all flex items-center gap-2">
              B2B Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Responsive Grid Layout */}
      <div className="container mx-auto px-6 max-w-7xl pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Venue Specific Search & Filtering (Boutique Sidebar)    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-md space-y-6 relative overflow-hidden">
            
            <div className="space-y-1 border-b border-[#C5A880]/15 pb-4">
              <h2 className="text-xl font-serif text-[#16423C] flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#C5A880]" />
                Refine Venues
              </h2>
              <p className="text-[11px] text-[#2C2520]/60 font-medium">Discover, schedule and allocate event spaces.</p>
            </div>

            {/* Location & Map Mockup */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A880]" />
                <input 
                  type="text" 
                  defaultValue="DHA Phase 6, Lahore"
                  className="w-full bg-[#FDFBF7] border border-[#C5A880]/20 rounded-xl p-3 pl-10 text-xs text-[#2C2520] placeholder:text-slate-500 focus:outline-none focus:border-[#16423C] font-semibold"
                />
              </div>

              {/* Styled Mockup Map rendering */}
              <div className="relative h-24 rounded-xl border border-[#C5A880]/20 overflow-hidden bg-[#FDFBF7]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#16423C_1px,transparent_1px)] [background-size:16px_16px]" />
                <svg className="absolute inset-0 w-full h-full stroke-[#C5A880]/20" strokeWidth="1">
                  <line x1="10" y1="0" x2="10" y2="100" />
                  <line x1="50" y1="0" x2="80" y2="100" />
                  <line x1="120" y1="0" x2="110" y2="100" />
                  <line x1="200" y1="0" x2="180" y2="100" />
                  <line x1="0" y1="30" x2="300" y2="30" />
                  <line x1="0" y1="70" x2="300" y2="70" />
                  <circle cx="100" cy="50" r="25" fill="none" stroke="#C5A880" strokeWidth="0.5" strokeDasharray="3" className="animate-pulse" />
                </svg>
                {/* Gold Marker Pin */}
                <div className="absolute top-1/2 left-[100px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C5A880] border-2 border-white flex items-center justify-center animate-bounce shadow-lg">
                    <div className="w-1.5 h-1.5 bg-[#16423C] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#2C2520]/60">
                <span className="text-[#C5A880]">Guest Capacity</span>
                <span className="text-[#16423C] font-bold">{capacity} People</span>
              </div>
              <div className="relative flex items-center">
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full h-1 bg-[#C5A880]/20 rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                />
              </div>
              <div className="flex justify-between items-center text-[9px] text-[#2C2520]/40 font-bold uppercase">
                <span>Min 50</span>
                <span>Max 1,000</span>
              </div>
            </div>

            {/* Venue Type Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">Venue Type</label>
              <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                {VENUE_TYPES.map(vt => {
                  const isSelected = selectedType === vt.id;
                  return (
                    <button
                      key={vt.id}
                      onClick={() => setSelectedType(vt.id)}
                      className={`flex-none w-20 h-20 rounded-xl border relative overflow-hidden transition-all duration-300 flex flex-col justify-end p-1.5 text-left ${
                        isSelected ? 'border-[#16423C] ring-2 ring-[#16423C]/10' : 'border-[#C5A880]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${vt.img})` }} />
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="relative z-10 text-[9px] font-bold leading-none tracking-tight text-white">{vt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aesthetic Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">Aesthetic</label>
              <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                {AESTHETICS.map(ae => {
                  const isSelected = selectedAesthetic === ae.id;
                  return (
                    <button
                      key={ae.id}
                      onClick={() => setSelectedAesthetic(ae.id)}
                      className={`flex-none w-20 h-20 rounded-xl border relative overflow-hidden transition-all duration-300 flex flex-col justify-end p-1.5 text-left ${
                        isSelected ? 'border-[#16423C] ring-2 ring-[#16423C]/10' : 'border-[#C5A880]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ae.img})` }} />
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="relative z-10 text-[9px] font-bold leading-none tracking-tight text-white">{ae.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amenities Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">Amenities</label>
              <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                {AMENITIES.map(am => {
                  const isSelected = selectedAmenity === am.id;
                  return (
                    <button
                      key={am.id}
                      onClick={() => setSelectedAmenity(am.id)}
                      className={`flex-none w-20 h-20 rounded-xl border relative overflow-hidden transition-all duration-300 flex flex-col justify-end p-1.5 text-left ${
                        isSelected ? 'border-[#16423C] ring-2 ring-[#16423C]/10' : 'border-[#C5A880]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${am.img})` }} />
                      <div className="absolute inset-0 bg-black/40" />
                      <span className="relative z-10 text-[9px] font-bold leading-none tracking-tight text-white">{am.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Histogram Visual */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">Price Range Preview</label>
              <div className="flex items-end justify-between h-12 px-2 bg-[#FDFBF7] rounded-lg p-1 border border-[#C5A880]/20">
                {[15, 30, 45, 60, 80, 95, 75, 50, 40, 25, 10, 15, 30, 45, 60, 80, 50, 20, 10].map((h, index) => {
                  const isActive = index >= 2 && index <= 15;
                  return (
                    <div 
                      key={index} 
                      className={`w-[6px] rounded-t-[1px] transition-all duration-500`}
                      style={{ 
                        height: `${h}%`,
                        backgroundColor: isActive ? '#C5A880' : 'rgba(197, 168, 128, 0.15)',
                        opacity: isActive ? 1 : 0.4
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-[9px] font-bold text-[#2C2520]/50 uppercase">
                <span>₨ 100,000</span>
                <span>₨ 900,000</span>
              </div>
            </div>

            {/* Custom Calendar Grid selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                Date Selection
              </label>
              
              <div className="bg-[#FDFBF7] p-2.5 rounded-xl border border-[#C5A880]/20 space-y-2">
                <div className="flex justify-between items-center text-[9px] font-bold text-[#2C2520]/75 uppercase">
                  <span>June 2026</span>
                  <div className="flex gap-1.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#C5A880] hover:text-[#16423C] cursor-pointer" />
                    <ChevronRight className="w-3.5 h-3.5 text-[#C5A880] hover:text-[#16423C] cursor-pointer" />
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-medium text-slate-500">
                  <span className="font-bold text-pink-700">S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  {[
                    "", "", "", "", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                  ].map((day, i) => {
                    const isSelected = day === 25;
                    return (
                      <span 
                        key={i} 
                        onClick={() => day && setSelectedDate(`2026-06-${day}`)}
                        className={`py-1 rounded cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#16423C] text-white font-bold scale-110 shadow-sm' 
                            : day ? 'hover:bg-[#16423C]/5 text-[#2C2520]' : 'opacity-0'
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* MIDDLE COLUMN: Featured Packages (Boutique Listings)                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Featured Packages */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
                <h2 className="text-xl font-serif text-[#16423C]">Trending & Packages</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {MOCK_PACKAGES.map(pkg => (
                  <div 
                    key={pkg.id} 
                    className="group relative bg-white border border-[#C5A880]/20 hover:border-[#16423C]/40 rounded-2xl overflow-hidden p-4 space-y-3 shadow-sm transition-all duration-300"
                  >
                    <div className="h-36 rounded-xl overflow-hidden relative">
                      <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 bg-[#16423C] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-white/10">
                        ₨ {pkg.price}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-base text-[#16423C] group-hover:text-[#C5A880] transition-colors">{pkg.name}</h3>
                      <p className="text-xs text-[#2C2520]/70 leading-relaxed">{pkg.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Book Venues Section */}
            <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-serif text-[#16423C] flex items-center gap-2 border-b border-[#C5A880]/15 pb-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                Why Book Venues on Nexus
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#16423C] font-semibold">100% Vetted Listings</p>
                    <p className="text-[10px] text-[#2C2520]/60">Every marquee, hall, and garden verified for municipal compliance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#16423C] font-semibold">Site Visit Coordination</p>
                    <p className="text-[10px] text-[#2C2520]/60">Schedule physical walkthrough appointments directly via B2B dashboards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#16423C] font-semibold">Integrated Stage & AV Support</p>
                    <p className="text-[10px] text-[#2C2520]/60">Direct catering adjustments and shehnai soundscape sync included.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Discover Venues (Gallery Grid)                              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex justify-between items-center border-b border-[#C5A880]/15 pb-2">
              <h2 className="text-xl font-serif text-[#16423C] flex items-center gap-2">
                <Map className="w-5 h-5 text-[#C5A880]" />
                Discover Venues
              </h2>
              <span className="text-xs font-bold text-[#C5A880]">{DISCOVER_VENUES.length} Spaces Found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DISCOVER_VENUES.map((venue) => {
                const isFav = favorites.includes(venue.id)
                return (
                  <div 
                    key={venue.id} 
                    className="group relative bg-white border border-[#C5A880]/20 hover:border-[#16423C]/40 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Heart Icon Button */}
                    <button 
                      onClick={() => toggleFavorite(venue.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all z-10"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    <div className="h-32 overflow-hidden relative">
                      <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <h4 className="font-serif text-xs text-[#16423C] group-hover:text-[#C5A880] transition-colors leading-tight line-clamp-1">{venue.name}</h4>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5 shrink-0">
                            <Star className="w-2.5 h-2.5 text-[#C5A880] fill-current" />
                            <span className="text-[10px] font-bold text-amber-800">{venue.rating}</span>
                          </div>
                          <span className="text-[9px] text-[#2C2520]/50 font-semibold">• Pakistan</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#C5A880]/15 flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-[9px] text-[#2C2520]/40 font-bold uppercase leading-none">starts from</p>
                          <p className="text-xs font-mono font-bold text-[#16423C] leading-none mt-1">₨ {venue.price}</p>
                        </div>
                        <Link 
                          href={`/venues/${venue.id}`} 
                          className="w-7 h-7 rounded-full bg-[#FDFBF7] border border-[#C5A880]/20 flex items-center justify-center text-[#16423C] group-hover:bg-[#16423C] group-hover:border-transparent group-hover:text-white transition-colors shadow-sm"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Load More */}
            <div className="flex justify-center pt-4">
              <button className="px-6 py-2.5 bg-[#FDFBF7] border border-[#C5A880]/20 hover:border-[#16423C] hover:text-white hover:bg-[#16423C] rounded-xl text-xs font-semibold text-[#2C2520] transition-all">
                Load More Venues
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}
