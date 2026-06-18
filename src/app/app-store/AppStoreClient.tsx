"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  CheckCircle2, ChevronLeft, Download, Store, Sparkles, Box, LayoutGrid, 
  CalendarCheck, Shirt, ShieldCheck, X, Camera, MapPin, Scissors, PackageOpen
} from 'lucide-react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// MOCK CATALOG DATA
// ─────────────────────────────────────────────────────────────────────────────
const APP_CATEGORIES = ["All", "Fashion & Rentals", "Media", "Venues", "Beauty", "Bundles"]

const CATALOG = [
  {
    id: "rentals-core",
    name: "Rentals & Wardrobe Management",
    vendorName: "Nexus Core",
    category: "Fashion & Rentals",
    icon: Shirt,
    color: "from-[#0A3B2A] to-[#0F5B3E]",
    price: "Rs. 14,000/mo",
    trial: "90-Day Free Trial",
    description: "The ultimate operating system for your rental business. Manage inventory, track bookings, sync across locations, and offer an AI-powered virtual Try-On experience to your customers.",
    features: [
      { icon: LayoutGrid, text: "Centralized Wardrobe Inventory" },
      { icon: CalendarCheck, text: "Smart Booking & Calendar Sync" },
      { icon: Sparkles, text: "AI Virtual Try-On Studio included" },
      { icon: Box, text: "Automated Logistics & Returns tracking" }
    ],
    redirectUrl: "/dashboard/rentals"
  },
  {
    id: "photography-crm",
    name: "Photography CRM & Galleries",
    vendorName: "Nexus Media",
    category: "Media",
    icon: Camera,
    color: "from-slate-800 to-slate-900",
    price: "Rs. 10,000/mo",
    trial: "90-Day Free Trial",
    description: "Manage client shoots, deliver stunning private galleries, and handle invoicing all in one beautiful interface.",
    features: [
      { icon: LayoutGrid, text: "Unlimited Client Galleries" },
      { icon: CalendarCheck, text: "Automated Booking & Contracts" },
      { icon: Sparkles, text: "AI Photo Culling Assistant" },
      { icon: Box, text: "Print Lab Integrations" }
    ],
    redirectUrl: "/dashboard/photography"
  },
  {
    id: "venue-management",
    name: "Venue & Banquet Management",
    vendorName: "Nexus Hospitality",
    category: "Venues",
    icon: MapPin,
    color: "from-amber-700 to-amber-900",
    price: "Rs. 28,000/mo",
    trial: "30-Day Free Trial",
    description: "Handle massive event schedules, catering menus, seating arrangements, and vendor coordination for wedding halls.",
    features: [
      { icon: LayoutGrid, text: "Interactive Floor Plans" },
      { icon: CalendarCheck, text: "Multi-Hall Calendar Sync" },
      { icon: Sparkles, text: "Catering Menu Builder" },
      { icon: Box, text: "Event Vendor Management" }
    ],
    redirectUrl: "/dashboard/venues"
  },
  {
    id: "salon-booking",
    name: "Salon & Spa Booking System",
    vendorName: "Nexus Beauty",
    category: "Beauty",
    icon: Scissors,
    color: "from-rose-500 to-pink-700",
    price: "Rs. 8,000/mo",
    trial: "90-Day Free Trial",
    description: "Streamline your bridal makeup bookings, manage staff schedules, and track inventory for salon products.",
    features: [
      { icon: LayoutGrid, text: "Staff Roster & Commission" },
      { icon: CalendarCheck, text: "Online Client Booking" },
      { icon: Sparkles, text: "Bridal Consultation Forms" },
      { icon: Box, text: "Product Inventory" }
    ],
    redirectUrl: "/dashboard/salon"
  },
  {
    id: "bridal-bundle",
    name: "The Bridal Vendor Bundle",
    vendorName: "Nexus Enterprise",
    category: "Bundles",
    icon: PackageOpen,
    color: "from-[#D4AF37] to-[#A07830]",
    price: "Rs. 22,000/mo",
    trial: "90-Day Free Trial",
    description: "Get the Rentals Module, Salon System, and the AI Virtual Try-On suite wrapped into one massive package for complete bridal boutiques.",
    features: [
      { icon: Shirt, text: "Rentals & Wardrobe Management" },
      { icon: Scissors, text: "Salon & Spa Booking System" },
      { icon: Sparkles, text: "AI Try-On Studio (Unlimited)" },
      { icon: ShieldCheck, text: "Priority Support" }
    ],
    redirectUrl: "/dashboard/rentals"
  }
]

export default function AppStoreClient() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedApp, setSelectedApp] = useState<typeof CATALOG[0] | null>(null)
  
  // Install State
  const [isInstalling, setIsInstalling] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stepText, setStepText] = useState("Initializing...")
  const [isDone, setIsDone] = useState(false)

  const filteredCatalog = activeCategory === "All" ? CATALOG : CATALOG.filter(app => app.category === activeCategory)

  const handleInstall = () => {
    setIsInstalling(true)
    setProgress(0)
    
    // Simulated Installation Flow
    setTimeout(() => { setProgress(15); setStepText("Downloading assets...") }, 500)
    setTimeout(() => { setProgress(45); setStepText("Provisioning dedicated database...") }, 1500)
    setTimeout(() => { setProgress(65); setStepText(`Configuring ${selectedApp?.name}...`) }, 2800)
    setTimeout(() => { setProgress(85); setStepText(`Activating ${selectedApp?.trial}...`) }, 4000)
    
    setTimeout(() => {
      setProgress(100)
      setStepText("Installation Complete!")
      
      // Hit API to actually create the trial in Supabase
      fetch("/api/billing/activate-trial", { method: "POST" })
        .then(() => {
          setIsDone(true)
          setTimeout(() => {
            router.push(selectedApp?.redirectUrl || "/dashboard")
          }, 1500)
        })
        .catch(() => {
          setIsDone(true)
          setTimeout(() => router.push(selectedApp?.redirectUrl || "/dashboard"), 1500)
        })
    }, 5500)
  }

  const closeSlideOver = () => {
    if (isInstalling) return // Don't close while installing
    setSelectedApp(null)
  }

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Header */}
      <div className="bg-[#0A3B2A] text-white pt-8 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-bold text-sm">
            <ChevronLeft className="w-4 h-4" /> Back to Nexus Hub
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <Store className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-sm font-black tracking-widest uppercase text-[#D4AF37]">Nexus App Store</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Extend your capabilities.</h2>
          <p className="text-white/80 max-w-2xl text-lg">Browse our catalog of enterprise modules built specifically for high-end vendors.</p>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="max-w-7xl mx-auto px-6 -mt-16">
        {/* Categories */}
        <div className="bg-white rounded-2xl p-2 shadow-xl shadow-[#0A3B2A]/5 border border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar mb-8">
          {APP_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-3 px-6 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? "bg-[#0A3B2A] text-white shadow-md shadow-[#0A3B2A]/10" 
                  : "text-slate-500 hover:text-[#0A3B2A] hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCatalog.map(app => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedApp(app)}
                className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <app.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {app.trial}
                  </div>
                </div>
                
                <h3 className="text-xl font-serif text-slate-900 mb-1">{app.name}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1">
                  By {app.vendorName} {app.vendorName.includes("Nexus") && <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </p>
                
                <p className="text-slate-600 text-sm font-medium line-clamp-3 mb-6 flex-1">
                  {app.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="font-black text-slate-900">{app.price}</span>
                  <span className="text-sm font-bold text-[#0A3B2A] group-hover:underline">View Details</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* SLIDE-OVER INSTALLATION MODAL */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeSlideOver}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <button onClick={closeSlideOver} disabled={isInstalling} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors disabled:opacity-50">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">App Details</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12">
                <div className={`w-24 h-24 bg-gradient-to-br ${selectedApp.color} rounded-3xl flex items-center justify-center shadow-xl mb-8`}>
                  <selectedApp.icon className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-4xl font-serif text-slate-900 mb-2">{selectedApp.name}</h2>
                <p className="text-[#0A3B2A] font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  By {selectedApp.vendorName} <ShieldCheck className="w-4 h-4" />
                </p>
                
                <p className="text-slate-600 leading-relaxed text-lg mb-10">
                  {selectedApp.description}
                </p>

                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Included Features</h3>
                <div className="space-y-4 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {selectedApp.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-800 font-bold text-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                        <feature.icon className={`w-4 h-4 ${selectedApp.id === 'bridal-bundle' ? 'text-[#D4AF37]' : 'text-[#0A3B2A]'}`} />
                      </div>
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Install Footer */}
              <div className="p-8 bg-slate-50 border-t border-slate-100 mt-auto">
                <AnimatePresence mode="wait">
                  {!isInstalling ? (
                    <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-3xl font-black text-slate-900">Free</span>
                          <p className="text-sm font-bold text-slate-500 mt-1">{selectedApp.trial}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-500">Then</p>
                          <p className="text-xl font-black text-slate-900">{selectedApp.price}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleInstall}
                        className="w-full py-5 px-6 bg-[#0A3B2A] hover:bg-black text-white rounded-2xl font-bold uppercase tracking-wider text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" /> Install {selectedApp.category === 'Bundles' ? 'Bundle' : 'Module'}
                      </button>
                      <p className="text-xs text-center text-slate-400 mt-4 font-medium px-4">
                        Requires no credit card. Cancel anytime during the trial.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="installing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                      <div className="mb-6 relative w-20 h-20 mx-auto flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                          <motion.circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke={isDone ? "#10B981" : "#0A3B2A"} 
                            strokeWidth="8" 
                            strokeDasharray="283"
                            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isDone ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </motion.div>
                          ) : (
                            <span className="text-sm font-black text-slate-900">{progress}%</span>
                          )}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">{isDone ? "Installed successfully!" : "Installing..."}</h4>
                      <p className="text-xs font-medium text-slate-500">{stepText}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
