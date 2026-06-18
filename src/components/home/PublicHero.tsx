"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EntryPointNavigation } from "./EntryPointNavigation"

const SLIDESHOW_DATA = {
  host: [
    { image: "/images/host_luxury_wedding.png", feature: "Discover Premium Venues" },
    { image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop", feature: "Hire Top-Tier Vendors" },
    { image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop", feature: "Seamless Event Planning" }
  ],
  vendor: [
    { image: "/images/vendor_dashboard_venue.png", feature: "Smart CRM & Lead Management" },
    { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop", feature: "Automated Booking Calendars" },
    { image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop", feature: "Frictionless Invoicing" }
  ],
  freelancer: [
    { image: "/images/artisan_freelancer_elite.png", feature: "Elite Heritage Marketplace" },
    { image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop", feature: "Direct High-Value Bookings" },
    { image: "https://images.unsplash.com/photo-1493225457224-b159f8a37943?q=80&w=2069&auto=format&fit=crop", feature: "Secure Escrow Payments" }
  ]
}

const HERO_TEXT = {
  host: {
    title: <>The Ultimate Ecosystem <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">For Every Event</span></>,
    subtitle: "Plan weddings, book premium venues, hire top-tier vendors, and manage your entire event—all on one unified platform."
  },
  vendor: {
    title: <>Scale Your Venue <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">With Elite Tools</span></>,
    subtitle: "Access full CRM, automated booking calendars, and zero-friction invoicing tools tailored for luxury venues and businesses."
  },
  freelancer: {
    title: <>Monetize Your Craft <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">On A Premier Platform</span></>,
    subtitle: "Whether you are a master calligrapher, premium makeup artist, or independent stylist—get booked alongside premier brands."
  }
}

export function PublicHero({ 
  activePersona, 
  setActivePersona 
}: { 
  activePersona: 'host' | 'vendor' | 'freelancer'; 
  setActivePersona: (persona: 'host' | 'vendor' | 'freelancer') => void 
}) {
  const [slideIndex, setSlideIndex] = useState(0)

  // Reset slide index when persona changes
  useEffect(() => {
    setSlideIndex(0)
  }, [activePersona])

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDESHOW_DATA[activePersona].length)
    }, 4000)
    return () => clearInterval(interval)
  }, [activePersona])

  const currentSlide = SLIDESHOW_DATA[activePersona][slideIndex]
  const currentText = HERO_TEXT[activePersona]

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 rounded-3xl mt-4 max-w-[1400px] mx-auto min-h-[500px] flex items-center justify-center p-6 md:p-12">
      
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${currentSlide.image}')` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-0" />
      
      {/* Dynamic Feature Tag Overlay */}
      <div className="absolute top-6 left-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.feature}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-xl"
          >
            {currentSlide.feature}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
              {currentText.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
              {currentText.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Smart Search Bar & Entry Point Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full mt-2"
        >
          <EntryPointNavigation activePersona={activePersona} setActivePersona={setActivePersona} />
        </motion.div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDESHOW_DATA[activePersona].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlideIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === slideIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
