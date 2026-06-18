"use client"

import { useState, useEffect } from "react"
import { MapPin, Tag, ArrowRight, ShieldCheck, Sparkles, Building2, Users, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

// English Slides Configurations
const B2C_SLIDES_EN = [
  {
    image: "/images/pakistani_wedding_venue.png",
    tag: "For Event Hosts & Families",
    title: "Plan Your Celebration",
    description: "Match with Pakistan's elite venues, designers, and caterers. Keep all coordinates, dates, and media approvals synced."
  },
  {
    image: "/images/pakistani_wedding_couple.png",
    tag: "Signature Moments",
    title: "Curate Your Dream Wedding",
    description: "Connect with the country's most premium bridal makeup artists, wedding planners, and visual storytellers."
  },
  {
    image: "/images/pakistani_mehndi_hands.png",
    tag: "Mehndi & Sangeet Ceilings",
    title: "Vibrant Celebration Decor",
    description: "Discover local marquee setups with floral hangings, custom staging lights, and traditional seating options."
  }
]

const B2B_SLIDES_EN = [
  {
    image: "https://images.unsplash.com/photo-1505232458627-539096539133?q=80&w=800&auto=format&fit=crop",
    tag: "For Vendors & Venue Partners",
    title: "Grow Your Event Business",
    description: "Pakistan's event ERP operating system. Manage inbound pipelines, design quotations, dispatch crew shifts, and sync calendars."
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tag: "Cloud Signage Suite",
    title: "Broadcast Your Packages",
    description: "Update interactive digital menus, manage display screens, and broadcast venue availability in real-time."
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    tag: "CRM OS & Pipelines",
    title: "Inbound Pipeline Automation",
    description: "Capture client bookings, draft customized line-item proposals, and manage crew schedules on a unified canvas."
  }
]

const ORCH_SLIDES_EN = [
  {
    image: "/images/mehndi_bridal.png",
    tag: "Milestone Tracker",
    title: "Precision Orchestration",
    description: "From milestone tracking to media delivery—manage with ease."
  },
  {
    image: "/images/pakistani_bride_makeup.png",
    tag: "Digital Vault",
    title: "Secure Media Sharing",
    description: "Collaborate on wedding videos, guest lists, and print designs in one secure sandbox."
  },
  {
    image: "/images/pakistani_wedding_couple.png",
    tag: "Real-Time Sync",
    title: "Instant Manager Chat",
    description: "Get real-time feedback and direct approvals from your venue manager via our WhatsApp bridge."
  }
]

const INTEL_SLIDES_EN = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tag: "Analytics & Reports",
    title: "Enterprise Intelligence",
    description: "Turn leads into revenue with our powerful CRM & Analytics."
  },
  {
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    tag: "Ledger OS",
    title: "Automated Bookings Ledger",
    description: "Track advances, pending milestones, and itemized quotations without manual spreadsheets."
  },
  {
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
    tag: "Smart Forecasts",
    title: "Peak Season Insights",
    description: "Predict wedding season high-demand dates and optimize venue package pricing dynamically."
  }
]

// Roman Urdu Slides Configurations
const B2C_SLIDES_RU = [
  {
    image: "/images/pakistani_wedding_venue.png",
    tag: "Event Hosts & Families Ke Liye",
    title: "Apni Taqreeb Ki Tayari Krain",
    description: "Pakistan ke behtareen halls, designers, aur caterers se match krain. Apni dates aur bookings ko ek jaga manage krain."
  },
  {
    image: "/images/pakistani_wedding_couple.png",
    tag: "Yadgar Lamhat",
    title: "Shadi Ki Shandar Tayari",
    description: "Mulk ke sab se ache makeup artists, wedding planners, aur photographers se rabta krain."
  },
  {
    image: "/images/pakistani_mehndi_hands.png",
    tag: "Mehndi aur Sangeet",
    title: "Khubsoorat Decorations",
    description: "Phoolon ki sajawat, stage lighting, aur behtareen seating arrangements wale halls talash krain."
  }
]

const B2B_SLIDES_RU = [
  {
    image: "https://images.unsplash.com/photo-1505232458627-539096539133?q=80&w=800&auto=format&fit=crop",
    tag: "Vendors aur Hall Owners Ke Liye",
    title: "Apne Event Business Ko Barhain",
    description: "Pakistan ka pehla Event ERP system. Naye orders, quotations, staff shifts, aur calendars ko asani se manage krain."
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tag: "Digital Signage Suite",
    title: "Apne Packages Ki Tashheer Krain",
    description: "Interactive digital menus aur LED screens par booking dates ko live update krain."
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    tag: "CRM aur Sales Pipelines",
    title: "Auto Order Bookings",
    description: "Customers ki bookings ko handle krain, professional proposals banain, aur staff ki duties assign krain."
  }
]

const ORCH_SLIDES_RU = [
  {
    image: "/images/mehndi_bridal.png",
    tag: "Milestone Tracker",
    title: "Precision Orchestration",
    description: "Milestone tracking se le kar media delivery tak—sab asani se manage krain."
  },
  {
    image: "/images/pakistani_bride_makeup.png",
    tag: "Digital Vault",
    title: "Secure Media Sharing",
    description: "Shaadi ki videos, photos, aur guest list ko ek mehfooz digital vault me share krain."
  },
  {
    image: "/images/pakistani_wedding_couple.png",
    tag: "Real-Time Sync",
    title: "Instant Manager Chat",
    description: "Apne hall manager se direct rabta rkhain aur WhatsApp bridge ke zariye updates hasil krain."
  }
]

const INTEL_SLIDES_RU = [
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tag: "Analytics & Reports",
    title: "Enterprise Intelligence",
    description: "Humare powerful CRM aur analytics se leads ko revenue me convert krain."
  },
  {
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    tag: "Ledger OS",
    title: "Automated Bookings Ledger",
    description: "Booking advances, bills, aur quotations ka clear digital ledger manage krain."
  },
  {
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
    tag: "Smart Forecasts",
    title: "Peak Season Insights",
    description: "Shadi season ki bookings ka andaza lagain aur pricing ko automatically optimize krain."
  }
]

export interface MarketplaceHeroProps {
  isRomanUrdu?: boolean
  setIsRomanUrdu?: (val: boolean) => void
}

export function MarketplaceHero({ isRomanUrdu: propIsRomanUrdu, setIsRomanUrdu: propSetIsRomanUrdu }: MarketplaceHeroProps) {
  const router = useRouter()
  
  // Translation Toggle State with local fallback
  const [localIsRomanUrdu, setLocalIsRomanUrdu] = useState(false)
  const isRomanUrdu = propIsRomanUrdu !== undefined ? propIsRomanUrdu : localIsRomanUrdu
  const setIsRomanUrdu = propSetIsRomanUrdu !== undefined ? propSetIsRomanUrdu : setLocalIsRomanUrdu

  // B2C Search States
  const [location, setLocation] = useState("Islamabad")
  const [category, setCategory] = useState("Wedding")

  // Animated Slides Indexes
  const [b2cIndex, setB2cIndex] = useState(0)
  const [b2bIndex, setB2bIndex] = useState(0)
  const [orchIndex, setOrchIndex] = useState(0)
  const [intelIndex, setIntelIndex] = useState(0)

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const b2cTimer = setInterval(() => {
      setB2cIndex((prev) => (prev + 1) % B2C_SLIDES_EN.length)
    }, 5000)
    
    const b2bTimer = setInterval(() => {
      setB2bIndex((prev) => (prev + 1) % B2B_SLIDES_EN.length)
    }, 5000)

    const orchTimer = setInterval(() => {
      setOrchIndex((prev) => (prev + 1) % ORCH_SLIDES_EN.length)
    }, 5000)

    const intelTimer = setInterval(() => {
      setIntelIndex((prev) => (prev + 1) % INTEL_SLIDES_EN.length)
    }, 5000)

    return () => {
      clearInterval(b2cTimer)
      clearInterval(b2bTimer)
      clearInterval(orchTimer)
      clearInterval(intelTimer)
    }
  }, [])

  const handleLaunchB2C = () => {
    router.push(`/launch-journey?role=customer&city=${location}&category=${category}`)
  }

  const handleLaunchB2B = () => {
    router.push(`/launch-journey?role=owner&city=Lahore&category=Venue`)
  }

  const currentB2c = isRomanUrdu ? B2C_SLIDES_RU[b2cIndex] : B2C_SLIDES_EN[b2cIndex]
  const currentB2b = isRomanUrdu ? B2B_SLIDES_RU[b2bIndex] : B2B_SLIDES_EN[b2bIndex]
  const currentOrch = isRomanUrdu ? ORCH_SLIDES_RU[orchIndex] : ORCH_SLIDES_EN[orchIndex]
  const currentIntel = isRomanUrdu ? INTEL_SLIDES_RU[intelIndex] : INTEL_SLIDES_EN[intelIndex]

  return (
    <div className="w-full space-y-4">
      
      {/* Dynamic Language Switcher Toggle Pill */}
      <div className="flex justify-end items-center">
        <div className="bg-white border border-[#E6E2DA] p-1 rounded-xl flex items-center gap-1 shadow-sm text-xs font-bold">
          <button
            onClick={() => setIsRomanUrdu(false)}
            className={`px-3 py-1.5 rounded-lg transition-all ${!isRomanUrdu ? "bg-[#0F5B3E] text-white" : "text-[#5E6460] hover:text-[#1D1C17]"}`}
          >
            English
          </button>
          <button
            onClick={() => setIsRomanUrdu(true)}
            className={`px-3 py-1.5 rounded-lg transition-all ${isRomanUrdu ? "bg-[#0F5B3E] text-white" : "text-[#5E6460] hover:text-[#1D1C17]"}`}
          >
            Roman Urdu
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full select-none">
        
        {/* 1. TOP-LEFT HALF: B2C - PLAN YOUR CELEBRATION */}
        <div className="relative rounded-2xl overflow-hidden min-h-[450px] flex flex-col justify-end p-6 md:p-8 border border-border bg-slate-900 shadow-sm transition-all duration-300">
          
          {/* Animated Background Images with Warm Emerald Overlay */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentB2c.image}
                className="w-full h-full object-cover opacity-50 absolute inset-0"
                alt={currentB2c.title}
                src={currentB2c.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" } as const}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 text-left" dir="ltr">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={b2cIndex + (isRomanUrdu ? "_ru" : "_en")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" } as const}
                className="space-y-3 text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest w-max">
                  <Sparkles className="w-3.5 h-3.5 text-accent fill-accent" />
                  {currentB2c.tag}
                </div>

                <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {currentB2c.title}
                </h2>
                
                <p className="text-white/85 text-xs md:text-sm leading-relaxed font-sans max-w-md min-h-[40px]">
                  {currentB2c.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* B2C Dynamic Filters Grid */}
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-white/10 space-y-3 shadow-md mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                
                {/* Location Select */}
                <div className="bg-background rounded-lg p-2 flex items-center gap-2 border border-border">
                  <MapPin className="text-primary w-4 h-4 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-[9px] text-[#5E6460] uppercase font-bold tracking-wider block">
                      {isRomanUrdu ? "Shehar / City" : "City Location"}
                    </span>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="bg-transparent border-none focus:outline-none text-xs font-bold text-foreground w-full p-0 leading-none h-4 block"
                    >
                      <option value="Islamabad">Islamabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                    </select>
                  </div>
                </div>

                {/* Category Select */}
                <div className="bg-background rounded-lg p-2 flex items-center gap-2 border border-border">
                  <Tag className="text-primary w-4 h-4 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-[9px] text-[#5E6460] uppercase font-bold tracking-wider block">
                      {isRomanUrdu ? "Taqreeb / Event" : "Event Type"}
                    </span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-transparent border-none focus:outline-none text-xs font-bold text-foreground w-full p-0 leading-none h-4 block"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Gala">Gala</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLaunchB2C}
                className="w-full bg-[#0F5B3E] hover:bg-[#0A422D] text-white active:scale-[0.98] font-bold py-3 px-4 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                {isRomanUrdu ? "Taqreeb Ka Aghaz Krain" : "Start Planning"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. TOP-RIGHT HALF: B2B - GROW YOUR EVENT BUSINESS */}
        <div className="relative rounded-2xl overflow-hidden min-h-[450px] flex flex-col justify-end p-6 md:p-8 border border-border bg-slate-950 shadow-sm transition-all duration-300">
          
          {/* Animated Background Images with Muted Indigo/Staging Overlay */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentB2b.image}
                className="w-full h-full object-cover opacity-45 absolute inset-0"
                alt={currentB2b.title}
                src={currentB2b.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.45, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" } as const}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 text-left" dir="ltr">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={b2bIndex + (isRomanUrdu ? "_ru" : "_en")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" } as const}
                className="space-y-3 text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 text-white/90 text-[10px] font-bold uppercase tracking-widest w-max">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  {currentB2b.tag}
                </div>

                <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {currentB2b.title}
                </h2>
                
                <p className="text-white/85 text-xs md:text-sm leading-relaxed font-sans max-w-md min-h-[40px]">
                  {currentB2b.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* B2B Action Card */}
            <div className="bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-white/10 space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3 text-xs text-white/90 text-left">
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <div>
                    <span className="text-[9px] text-white/60 uppercase font-bold tracking-wider block font-sans">
                      {isRomanUrdu ? "Customer Manager" : "CRM Lead OS"}
                    </span>
                    <span className="font-bold">
                      {isRomanUrdu ? "Auto Inquiries" : "Auto Inquiries"}
                    </span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-accent" />
                  <div>
                    <span className="text-[9px] text-white/60 uppercase font-bold tracking-wider block font-sans">
                      {isRomanUrdu ? "Broadcaster" : "Broadcaster"}
                    </span>
                    <span className="font-bold">
                      {isRomanUrdu ? "Cloud Signage" : "Cloud Signage"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLaunchB2B}
                className="w-full bg-[#C9A227] hover:bg-[#b08e20] text-white active:scale-[0.98] font-bold py-3 px-4 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                {isRomanUrdu ? "Enterprise OS Login" : "Access Business OS"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM-LEFT HALF: PRECISION ORCHESTRATION (ANIMATED SLIDESHOW) */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" } as const}
          className="relative rounded-2xl overflow-hidden min-h-[450px] flex flex-col justify-end p-6 md:p-8 border border-border bg-slate-900 shadow-sm transition-all duration-300"
        >
          {/* Animated Background Images with Warm Emerald Overlay */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentOrch.image}
                className="w-full h-full object-cover opacity-60 absolute inset-0"
                alt={currentOrch.title}
                src={currentOrch.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" } as const}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 text-left" dir="ltr">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={orchIndex + (isRomanUrdu ? "_ru" : "_en")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" } as const}
                className="space-y-3 text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest w-max">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {currentOrch.tag}
                </div>

                <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {currentOrch.title}
                </h2>
                
                <p className="text-white/85 text-xs md:text-sm leading-relaxed font-sans max-w-md min-h-[40px]">
                  {currentOrch.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <Link href="/portal">
              <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-5 py-2.5 h-11 text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5 mt-2">
                {isRomanUrdu ? "Features Check Krain" : "Explore Features"}
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* 4. BOTTOM-RIGHT HALF: ENTERPRISE INTELLIGENCE (ANIMATED SLIDESHOW) */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" } as const}
          className="relative rounded-2xl overflow-hidden min-h-[450px] flex flex-col justify-end p-6 md:p-8 border border-border bg-slate-950 shadow-sm transition-all duration-300"
        >
          {/* Animated Background Images with Muted Charcoal Overlay */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentIntel.image}
                className="w-full h-full object-cover opacity-60 absolute inset-0"
                alt={currentIntel.title}
                src={currentIntel.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" } as const}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-4 text-left" dir="ltr">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={intelIndex + (isRomanUrdu ? "_ru" : "_en")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" } as const}
                className="space-y-3 text-left"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 text-white/90 text-[10px] font-bold uppercase tracking-widest w-max">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  {currentIntel.tag}
                </div>

                <h2 className="font-sans text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {currentIntel.title}
                </h2>
                
                <p className="text-white/85 text-xs md:text-sm leading-relaxed font-sans max-w-md min-h-[40px]">
                  {currentIntel.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <Link href="/dashboard">
              <button className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-5 py-2.5 h-11 text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5 mt-2">
                {isRomanUrdu ? "Analytics Check Krain" : "View Analytics"}
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            </Link>
          </div>
        </motion.div>

      </section>
    </div>
  )
}
