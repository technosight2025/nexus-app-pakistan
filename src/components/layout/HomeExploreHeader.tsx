"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Globe, Menu, X, User, LayoutDashboard, LogOut, 
  Heart, MessageCircle, Bell, Sparkles, MapPin, Calendar, 
  Building2, Camera, Video, Utensils, Settings, CreditCard, 
  Lock, HelpCircle, Store, CalendarDays, ChevronDown, CheckCircle,
  Inbox, FileText, ShieldAlert, Award
} from 'lucide-react'
import { useUser, useClerk } from "@clerk/nextjs"
import { useLanguage } from '@/contexts/LanguageContext'

export function HomeExploreHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()

  // States
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'account' | 'notifications' | 'wishlist' | 'messages' | 'search-overlay' | null>(null)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  // Search Fields state
  const [searchService, setSearchService] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)

  // Suggestion Databases
  const locationSuggestions = ['Islamabad', 'Lahore', 'Karachi', 'Faisalabad', 'Rawalpindi', 'Peshawar', 'Multan']
  const popularCategories = [
    { name: 'Wedding Venues', count: '124 venues', icon: Building2, tag: 'venues' },
    { name: 'Bridal Makeups', count: '85 artists', icon: Sparkles, tag: 'makeup' },
    { name: 'Cinematography', count: '64 experts', icon: Video, tag: 'videography' },
    { name: 'Event Production', count: '42 staging', icon: Camera, tag: 'production' }
  ]
  const trendingSearches = ['Marquees in Lahore', 'Bridal Couture Rentals', 'Sound systems Islamabad', 'Daig Caterers Rawalpindi']

  // Mock Dropdowns
  const mockWishlist = [
    { type: 'Venue', name: 'Royal Palms Banquet Hall', price: 'PKR 450,000 / day', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=150' },
    { type: 'Professional', name: 'Oshoot Studio Photography', price: 'PKR 150,000 / event', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=150' },
    { type: 'Rental', name: 'Premium Velvet Lehenga', price: 'PKR 35,000 / day', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=150' }
  ]

  const mockNotifications = [
    { id: 1, type: 'Booking Update', message: 'Your scheduling reservation at Royal Palms has been verified.', time: '2h ago', unread: true },
    { id: 2, type: 'New Message', message: 'Zara Makeup Studio sent you availability confirmations.', time: '5h ago', unread: true },
    { id: 3, type: 'System Alert', message: 'Verify your vendor profile status to start listing services.', time: '1d ago', unread: false }
  ]

  const mockMessages = [
    { sender: 'Oshoot Photography', text: 'Yes, we include the drone cinematic coverage in the Premium Plan.', time: '10m ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80' },
    { sender: 'Royal Palms Banquets', text: 'The venue is open for site tours this Sunday at 2 PM.', time: '1h ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80' }
  ]

  const headerRef = useRef<HTMLDivElement>(null)

  // Scroll height transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Click outside header to collapse dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/explore?category=${searchService}&location=${searchLocation}&date=${searchDate}`)
    setActiveDropdown(null)
  }

  const isFieldFilled = searchService !== '' || searchLocation !== '' || searchDate !== ''

  const clearSearch = () => {
    setSearchService('')
    setSearchLocation('')
    setSearchDate('')
  }

  const navLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Categories', href: '/explore?tab=categories' },
    { name: 'Professionals', href: '/explore?tab=professionals' },
    { name: 'Venues', href: '/explore?tab=venues' },
    { name: 'Rentals', href: '/rentals/all' },
    { name: 'Events', href: '/dashboard' },
    { name: 'Inspiration', href: '/explore?tab=inspiration' }
  ]

  return (
    <>
      <header 
        ref={headerRef}
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white border-b border-[#E5E7EB] ${
          isScrolled ? 'h-[68px] shadow-sm' : 'h-[88px]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full h-full flex items-center justify-between relative">
          
          {/* 1. BRAND LOGO AREA */}
          <div 
            onClick={() => { router.push("/"); setActiveDropdown(null); }}
            className="flex items-center gap-2 cursor-pointer shrink-0 group transition-all duration-200"
          >
            <span className="font-sans font-black text-2xl tracking-widest text-[#111827] uppercase select-none group-hover:opacity-85">
              NEXUS
            </span>
          </div>

          {/* 2. GLOBAL SEARCH BAR (Visual Centerpiece) */}
          <div className="hidden xl:flex items-center justify-center flex-1 max-w-[720px] mx-8 relative">
            <div 
              onClick={() => setActiveDropdown('search-overlay')}
              className={`w-full h-14 bg-white border border-[#E5E7EB] hover:border-[#4F46E5] rounded-[40px] p-1 flex items-center transition-all duration-200 group relative ${
                activeDropdown === 'search-overlay' ? 'ring-2 ring-indigo-100 border-[#4F46E5]' : 'hover:shadow-md'
              }`}
            >
              <form onSubmit={handleSearchSubmit} className="w-full flex items-center h-full">
                
                {/* Field 1: Keyword */}
                <div className="flex-1 px-5 text-left flex flex-col justify-center min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Keyword</span>
                  <input 
                    type="text"
                    value={searchService}
                    onChange={(e) => setSearchService(e.target.value)}
                    placeholder="What are you looking for?"
                    className="bg-transparent text-xs font-bold text-[#111827] outline-none placeholder-slate-400 mt-1 w-full truncate border-none p-0 focus:ring-0"
                  />
                </div>

                <div className="w-[1px] h-8 bg-[#E5E7EB]" />

                {/* Field 2: Location */}
                <div className="flex-1 px-5 text-left flex flex-col justify-center min-w-0 relative">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Location</span>
                  <input 
                    type="text"
                    value={searchLocation}
                    onChange={(e) => { setSearchLocation(e.target.value); setShowLocationSuggestions(true); }}
                    onFocus={() => setShowLocationSuggestions(true)}
                    placeholder="Choose a city"
                    className="bg-transparent text-xs font-bold text-[#111827] outline-none placeholder-slate-400 mt-1 w-full truncate border-none p-0 focus:ring-0"
                  />
                  {/* Autocomplete Locations */}
                  <AnimatePresence>
                    {showLocationSuggestions && searchLocation && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 right-0 top-14 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl z-50 py-2 max-h-[200px] overflow-y-auto"
                      >
                        {locationSuggestions
                          .filter(city => city.toLowerCase().includes(searchLocation.toLowerCase()))
                          .map((city, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => { setSearchLocation(city); setShowLocationSuggestions(false); }}
                              className="w-full text-left px-4 py-2 hover:bg-[#EEF2FF] text-xs font-bold text-slate-800 transition-colors"
                            >
                              {city}
                            </button>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-[1px] h-8 bg-[#E5E7EB]" />

                {/* Field 3: Event Date */}
                <div className="flex-1 px-5 text-left flex flex-col justify-center min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Event Date</span>
                  <input 
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="bg-transparent text-xs font-bold text-[#111827] outline-none mt-1 w-full border-none p-0 focus:ring-0"
                  />
                </div>

                {/* Clear search indicator (X) */}
                {isFieldFilled && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="p-2 hover:bg-[#EEF2FF] rounded-full text-slate-400 hover:text-slate-700 mr-2 shrink-0 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Circular Search button */}
                <button 
                  type="submit"
                  className="w-12 h-12 rounded-full bg-[#4F46E5] hover:bg-indigo-750 text-white flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 mr-1 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>

              </form>
            </div>

            {/* PREMIUM SEARCH OVERLAY PANEL */}
            <AnimatePresence>
              {activeDropdown === 'search-overlay' && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute left-0 right-0 top-16 w-full bg-white border border-[#E5E7EB] rounded-3xl shadow-2xl z-50 p-6 text-left grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Left Column: Categories and trending searches */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-black text-[#111827] uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#4F46E5]" /> Popular Categories
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {popularCategories.map((cat, idx) => (
                          <div 
                            key={idx}
                            onClick={() => { setSearchService(cat.tag); setActiveDropdown(null); }}
                            className="flex items-center gap-3 p-3 border border-[#E5E7EB] hover:border-[#4F46E5] hover:bg-[#EEF2FF] rounded-2xl cursor-pointer transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-white transition-colors">
                              <cat.icon className="w-5 h-5 text-slate-650" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">{cat.name}</span>
                              <span className="text-[10px] text-slate-450 block">{cat.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-[#111827] uppercase tracking-widest mb-2.5">Trending Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((trend, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { setSearchService(trend); setActiveDropdown(null); }}
                            className="text-xs font-semibold px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#4F46E5] hover:bg-[#EEF2FF] rounded-full text-slate-600 transition-colors"
                          >
                            {trend}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Suggested Lists & Cities */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-black text-[#111827] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#4F46E5]" /> Suggested Cities
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {locationSuggestions.slice(0, 6).map((city, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => { setSearchLocation(city); }}
                            className="text-xs font-bold border border-[#E5E7EB] hover:border-[#4F46E5] hover:bg-[#EEF2FF] p-2.5 rounded-xl text-center text-slate-700 transition-all"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
                      <span className="text-[9px] font-black uppercase text-[#4F46E5] tracking-widest block mb-1">PROMOTION</span>
                      <h5 className="text-xs font-bold text-[#111827] mb-1">Need customized planning sheets?</h5>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Our integrated artificial intelligence event coordinator builds checklists, caters estimates, and translates invitations in under 60 seconds.
                      </p>
                      <button 
                        type="button" 
                        onClick={() => { router.push("/ai-planner"); setActiveDropdown(null); }}
                        className="text-xs font-black text-[#4F46E5] hover:underline uppercase mt-2 block"
                      >
                        Try AI Planner →
                      </button>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. PRIMARY CALL-TO-ACTION (Become a Professional) & 4. USER ACTIONS */}
          <div className="flex items-center gap-5 shrink-0">
            
            {/* CTA Button */}
            <Link href="/business">
              <span className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-200">
                Become a Professional
              </span>
            </Link>

            {/* User icons space-x-5 */}
            <div className="flex items-center gap-5">
              
              {/* Wishlist Heart Icon */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'wishlist' ? null : 'wishlist')}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#EEF2FF] transition-all cursor-pointer relative"
                  title="Wishlist"
                >
                  <Heart className="w-6 h-6" />
                </button>
                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'wishlist' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-[320px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-4 z-50 text-left space-y-4"
                    >
                      <h4 className="text-xs font-black text-[#111827] uppercase tracking-widest border-b border-slate-100 pb-2">Saved Wishlist</h4>
                      <div className="space-y-3">
                        {mockWishlist.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center hover:bg-slate-50 p-1 rounded-lg transition-colors">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-[#E5E7EB]" />
                            <div className="text-left flex-1 min-w-0">
                              <span className="text-[8px] font-black uppercase text-[#4F46E5] tracking-wider block">{item.type}</span>
                              <span className="text-xs font-bold text-[#111827] block truncate">{item.name}</span>
                              <span className="text-[10px] text-slate-450 block">{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Messages Mail Icon */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'messages' ? null : 'messages')}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#EEF2FF] transition-all cursor-pointer relative"
                  title="Messages"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4F46E5] rounded-full" />
                </button>
                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'messages' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-[320px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-4 z-50 text-left space-y-4"
                    >
                      <h4 className="text-xs font-black text-[#111827] uppercase tracking-widest border-b border-slate-100 pb-2">Recent Chats</h4>
                      <div className="space-y-3.5">
                        {mockMessages.map((msg, idx) => (
                          <div key={idx} className="flex gap-3 items-start hover:bg-slate-50 p-2 rounded-xl cursor-pointer transition-colors">
                            <img src={msg.avatar} alt={msg.sender} className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#E5E7EB]" />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-0.5">
                                <span className="text-xs font-black text-slate-800 truncate">{msg.sender}</span>
                                <span className="text-[8px] text-slate-400 font-bold">{msg.time}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 truncate leading-snug">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications Bell Icon */}
              <div className="relative">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#EEF2FF] transition-all cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#EF4444] text-white rounded-full flex items-center justify-center text-[10px] font-black leading-none">
                    2
                  </span>
                </button>
                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'notifications' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-[340px] bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-4 z-50 text-left space-y-4"
                    >
                      <h4 className="text-xs font-black text-[#111827] uppercase tracking-widest border-b border-slate-100 pb-2">Notifications</h4>
                      <div className="space-y-3.5">
                        {mockNotifications.map((notif) => (
                          <div key={notif.id} className="flex gap-3 items-start p-1.5 hover:bg-slate-50 rounded-xl">
                            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notif.unread ? 'bg-[#EF4444]' : 'bg-transparent'}`} />
                            <div className="flex-1 min-w-0 text-left">
                              <span className="text-[9px] font-black uppercase text-[#4F46E5] block mb-0.5">{notif.type}</span>
                              <p className="text-xs text-slate-700 leading-snug">{notif.message}</p>
                              <span className="text-[9px] text-slate-400 mt-1 block">{notif.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Avatar Dropdown Indicator */}
              <div className="relative">
                <div 
                  onClick={() => setActiveDropdown(activeDropdown === 'account' ? null : 'account')}
                  className="flex items-center gap-1.5 border border-[#E5E7EB] hover:border-slate-800 rounded-full p-1 cursor-pointer bg-white transition-all hover:shadow-xs"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center overflow-hidden shrink-0">
                    {isSignedIn && user?.imageUrl ? (
                      <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-450 mr-1 shrink-0" />
                </div>

                {/* Complex dropdown panel categories */}
                <AnimatePresence>
                  {activeDropdown === 'account' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute right-0 top-14 w-[280px] bg-white border border-[#E5E7EB] shadow-2xl rounded-2xl py-4 z-50 text-left flex flex-col max-h-[85vh] overflow-y-auto scrollbar-hide"
                    >
                      {/* Section: Profile Summary */}
                      <div className="px-4 py-2 border-b border-slate-100 mb-2">
                        <span className="text-xs font-black text-[#111827] block">
                          {isSignedIn ? user?.fullName || 'Nexus User' : 'Nexus Guest'}
                        </span>
                        <span className="text-[10px] text-slate-450 block truncate">
                          {isSignedIn ? user?.primaryEmailAddress?.emailAddress || 'user@nexus.com' : 'Welcome to Nexus'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-green-650 bg-green-50 text-green-700 px-2 py-0.5 rounded-full mt-1.5">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified Status
                        </span>
                      </div>

                      {/* Section: Customer */}
                      <div className="px-4 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">Customer</div>
                      <Link href="/dashboard" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                      </Link>
                      <Link href="/dashboard?tab=bookings" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Bookings
                      </Link>
                      <Link href="/explore?tab=wishlist" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <Heart className="w-3.5 h-3.5" /> Wishlist
                      </Link>
                      <Link href="/dashboard?tab=messages" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5" /> Messages
                      </Link>

                      {/* Section: Professional */}
                      <div className="h-[1px] bg-slate-100 my-2" />
                      <div className="px-4 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">Professional</div>
                      <Link href="/business" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-teal-650" /> Professional Dashboard
                      </Link>
                      <Link href="/business/storefront" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <Store className="w-3.5 h-3.5 text-teal-650" /> My Listings
                      </Link>

                      {/* Section: Business */}
                      <div className="h-[1px] bg-slate-100 my-2" />
                      <div className="px-4 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">Business Dashboard</div>
                      <Link href="/business/venues" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700">
                        Venue Dashboard
                      </Link>
                      <Link href="/business/studio" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700">
                        Rental Dashboard
                      </Link>

                      {/* Section: Settings */}
                      <div className="h-[1px] bg-slate-100 my-2" />
                      <div className="px-4 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest">Settings</div>
                      <Link href="/dashboard/settings" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5" /> Account Settings
                      </Link>
                      <Link href="/help-center" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5" /> Help Center
                      </Link>

                      {/* Separator & Sign Out */}
                      <div className="h-[1px] bg-slate-100 my-2" />
                      {isSignedIn ? (
                        <button 
                          onClick={() => { signOut(); setActiveDropdown(null); }}
                          className="hover:bg-slate-50 px-4 py-2.5 text-left text-xs font-black uppercase text-[#EF4444] tracking-wider flex items-center gap-2 cursor-pointer w-full"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                      ) : (
                        <Link href="/sign-in" onClick={() => setActiveDropdown(null)} className="hover:bg-[#EEF2FF] px-4 py-2.5 text-xs font-black uppercase text-[#4F46E5] tracking-wider block">
                          Sign In
                        </Link>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hamburger Mobile navigation drawer */}
              <button 
                onClick={() => setIsMobileDrawerOpen(true)}
                className="xl:hidden p-2 hover:bg-[#EEF2FF] rounded-full text-slate-650 cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>

            </div>
          </div>

        </div>
      </header>

      {/* MOBILE HEADER SECOND ROW SEARCH BAR */}
      <div className="xl:hidden w-full fixed top-20 left-0 right-0 bg-white border-b border-[#E5E7EB] py-3 px-6 z-40">
        <div className="w-full flex items-center bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-3 py-2 text-slate-500">
          <Search className="w-4 h-4 mr-2" />
          <input 
            type="text" 
            placeholder="Search venues, professionals, rentals..." 
            className="bg-transparent text-xs w-full outline-none font-medium border-none p-0 focus:ring-0 text-[#111827]"
            onClick={() => router.push("/explore")}
          />
        </div>
      </div>

      {/* MOBILE SLIDING NAVIGATION DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-[120] xl:hidden"
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 text-left"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-sans font-black text-lg text-slate-900 uppercase">NEXUS PANEL</span>
                <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 hover:bg-slate-50 rounded-full cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
                <div className="space-y-3">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Discover</span>
                  <Link href="/explore" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Explore</Link>
                  <Link href="/explore?tab=categories" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Categories</Link>
                  <Link href="/explore?tab=inspiration" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Inspiration</Link>
                </div>

                <div className="space-y-3">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Marketplace</span>
                  <Link href="/explore?tab=professionals" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Professionals</Link>
                  <Link href="/explore?tab=venues" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Venues</Link>
                  <Link href="/rentals/all" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Rentals</Link>
                  <Link href="/dashboard" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Events</Link>
                </div>

                <div className="space-y-3">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Account</span>
                  <Link href="/dashboard" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Dashboard</Link>
                  <Link href="/dashboard?tab=bookings" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Bookings</Link>
                  <Link href="/explore?tab=wishlist" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Wishlist</Link>
                  <Link href="/dashboard?tab=messages" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Messages</Link>
                </div>

                <div className="space-y-3 pb-8">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Business</span>
                  <Link href="/business" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-teal-650 hover:text-teal-700 py-1">Become a Professional</Link>
                  <Link href="/business/storefront" onClick={() => setIsMobileDrawerOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-[#4F46E5] py-1">Manage Store</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
