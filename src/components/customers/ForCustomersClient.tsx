"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Menu, Search, Sparkles, BookOpen, Mail, MapPin, Heart, 
  Plus, Home, Calendar, LayoutGrid, Store, User, ChevronRight,
  Phone, Globe, MessageSquare
} from 'lucide-react'

export function ForCustomersClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const quickActions = [
    {
      title: "Host Event",
      desc: "Start planning your dream gala or wedding today.",
      icon: Sparkles,
      iconColor: "text-[#0F5B3E]",
      bgColor: "bg-[#E6F4EA]",
      href: "/create-event"
    },
    {
      title: "Budget Maker",
      desc: "Manage your landmark occasion finances with precision.",
      icon: BookOpen,
      iconColor: "text-[#1E3A8A]",
      bgColor: "bg-[#E8EAF6]",
      href: "/tools/budget-planner"
    },
    {
      title: "Invite Studio",
      desc: "Design and send digital invitations in seconds.",
      icon: Mail,
      iconColor: "text-[#0F5B3E]",
      bgColor: "bg-[#E0F2F1]",
      href: "/invite"
    }
  ]

  const featuredVenues = [
    {
      id: 1,
      name: "The Sapphire Marquee",
      location: "DHA Phase 6, Karachi",
      price: "PKR 450,000+",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "The Imperial Grand Ballroom",
      location: "Gulberg, Lahore",
      price: "PKR 650,000+",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Margalla Hills Banquet",
      location: "E-11, Islamabad",
      price: "PKR 550,000+",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"
    }
  ]

  const trendingProfessionals = [
    {
      name: "Zain Ahmed",
      role: "CINEMATOGRAPHY",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Sara's Glam",
      role: "BRIDAL MAKEUP",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Cuisine Royale",
      role: "CATERING",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Elite Decors",
      role: "EVENT DESIGN",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=150&auto=format&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#111C15] font-sans pb-28 relative">
      
      {/* 1. HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF5EC]/90 backdrop-blur-md border-b border-[#ECE7DF] px-4 py-4.5 flex items-center justify-between">
        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6 text-[#111C15]" />
        </button>
        <span className="text-[20px] font-serif font-black tracking-tight text-[#111C15]">
          Nexus Ecosystem
        </span>
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]">
          <Image 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
            alt="Profile Avatar" 
            fill 
            className="object-cover"
          />
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="px-4 pt-4">
        <div className="relative w-full rounded-3xl overflow-hidden h-96 shadow-lg">
          {/* Ceiling chandelier warm luxury backdrop */}
          <Image 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop" 
            alt="Heritage ceiling" 
            fill 
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
              Heritage in<br />Motion
            </h1>
            <p className="text-sm text-slate-200 font-light max-w-xs sm:max-w-md mx-auto leading-relaxed">
              Discover the finest venues and professionals for your landmark celebrations.
            </p>

            {/* Smart Search Capsule */}
            <div className="w-full max-w-sm bg-white/95 backdrop-blur-xs rounded-full p-1.5 flex items-center shadow-lg border border-white/20 mt-4">
              <div className="flex items-center flex-1 px-3">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Venues, Planners..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-hidden text-xs text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
              <button className="bg-[#0F5B3E] hover:bg-[#0c4b33] text-white px-5 py-2.5 rounded-full text-xs font-black tracking-wide transition-colors">
                search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTIONS */}
      <section className="px-4 pt-10 space-y-4">
        <h2 className="text-2xl font-serif font-extrabold text-[#111C15]">
          Quick Actions
        </h2>
        <div className="space-y-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon
            return (
              <Link 
                href={action.href} 
                key={idx}
                className="flex items-start gap-4 p-5 bg-white border border-[#ECE7DF] rounded-2xl hover:shadow-md transition-all group"
              >
                <div className={`p-3 rounded-xl ${action.bgColor} ${action.iconColor} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-base font-serif font-bold text-[#111C15] group-hover:text-[#D4AF37] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    {action.desc}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 4. FEATURED VENUES */}
      <section className="pt-12 space-y-4">
        <div className="px-4 flex items-baseline justify-between">
          <div className="space-y-1 text-left">
            <h2 className="text-2xl font-serif font-extrabold text-[#111C15]">
              Featured Venues
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Bespoke locations in Lahore & Karachi
            </p>
          </div>
          <Link href="/venues" className="text-xs font-bold text-[#0F5B3E] hover:underline flex items-center gap-0.5">
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal scroll grid */}
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {featuredVenues.map((venue) => (
            <div 
              key={venue.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white border border-[#ECE7DF] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Image area */}
              <div className="relative h-44 w-full">
                <Image 
                  src={venue.image} 
                  alt={venue.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-600 px-3 py-1 rounded-full uppercase shadow-sm">
                  Featured
                </div>
              </div>

              {/* Detail area */}
              <div className="p-4 space-y-3 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-base font-serif font-bold text-[#111C15]">
                    {venue.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#0F5B3E] shrink-0" />
                    <span>{venue.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#ECE7DF]/50">
                  <span className="text-sm font-semibold text-[#0F5B3E]">
                    {venue.price}
                  </span>
                  <button 
                    onClick={() => toggleFavorite(venue.id)}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        favorites.includes(venue.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-slate-400 hover:text-red-500'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRENDING PROFESSIONALS */}
      <section className="px-4 pt-10 space-y-6">
        <h2 className="text-2xl font-serif font-extrabold text-[#111C15]">
          Trending Professionals
        </h2>
        <div className="grid grid-cols-2 gap-y-8 gap-x-4">
          {trendingProfessionals.map((prof, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2.5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37]/35 shadow-md">
                <Image 
                  src={prof.image} 
                  alt={prof.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-serif font-bold text-[#111C15]">
                  {prof.name}
                </h4>
                <p className="text-[10px] tracking-widest font-sans font-bold text-slate-500 uppercase">
                  {prof.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BRAND INFO FOOTER */}
      <footer className="mt-16 border-t border-[#ECE7DF] bg-[#F5F2EB]/50 px-6 py-12 space-y-10 text-left">
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-black tracking-tight text-[#111C15]">
            Nexus Ecosystem
          </h3>
          <p className="text-xs text-slate-500 font-light leading-relaxed max-w-md">
            The gold standard for event logistics and festive celebrations in Pakistan. Bridging tradition with modern planning excellence.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-black text-[#D4AF37]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-700">
            <li>
              <Link href="/venues" className="hover:text-[#0F5B3E] transition-colors">
                Venue Directory
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-[#0F5B3E] transition-colors">
                Vendor Portal
              </Link>
            </li>
            <li>
              <Link href="/tools/budget-planner" className="hover:text-[#0F5B3E] transition-colors">
                Budget Planning Tool
              </Link>
            </li>
            <li>
              <Link href="/forum" className="hover:text-[#0F5B3E] transition-colors">
                Community Forum
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-black text-[#D4AF37]">
            Contact
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-600 font-light">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0F5B3E] shrink-0" />
              <span>support@nexusecosystem.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#0F5B3E] shrink-0" />
              <span>+92 (0) 51 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0F5B3E] shrink-0" />
              <span>Islamabad, PK</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-[#ECE7DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500 font-light">
            © 2026 Nexus Ecosystem. Heritage in Motion.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="p-2 bg-white rounded-full border border-[#ECE7DF] text-slate-600 hover:text-[#0F5B3E] transition-colors shadow-xs flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="p-2 bg-white rounded-full border border-[#ECE7DF] text-slate-600 hover:text-[#0F5B3E] transition-colors shadow-xs flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="p-2 bg-white rounded-full border border-[#ECE7DF] text-slate-600 hover:text-[#0F5B3E] transition-colors shadow-xs flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* 7. FLOATING STICKY MOBILE NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF5EC]/95 backdrop-blur-md border-t border-[#ECE7DF] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between relative">
          
          {/* Home button (active) */}
          <Link href="/for-customers" className="flex flex-col items-center gap-1 px-3 py-1 bg-[#E6F4EA] rounded-full text-[#0F5B3E]">
            <Home className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
          </Link>

          {/* Planner button */}
          <Link href="/start-planning" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#111C15] transition-colors py-1">
            <Calendar className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Planner</span>
          </Link>

          {/* Create button */}
          <Link href="/create-event" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#111C15] transition-colors py-1">
            <LayoutGrid className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Create</span>
          </Link>

          {/* Market button */}
          <Link href="/explore" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#111C15] transition-colors py-1">
            <Store className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Market</span>
          </Link>

          {/* Vendors button */}
          <Link href="/vendors" className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#111C15] transition-colors py-1">
            <User className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-wider">Vendors</span>
          </Link>

          {/* Floating plus button */}
          <button className="absolute -top-7 right-4 w-12 h-12 bg-[#111C15] hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105">
            <Plus className="w-6 h-6" />
          </button>

        </div>
      </div>

    </div>
  )
}
