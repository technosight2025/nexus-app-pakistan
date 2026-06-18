"use client"

import React, { useState, useEffect, useRef } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Volume2,
  VolumeX,
  Sparkles,
  Calendar,
  Building2,
  Camera,
  QrCode,
  Laptop,
  Check,
  ChevronDown,
  Info,
  Clock,
  Send,
  PhoneCall,
  Lock,
  ChevronRight,
  Maximize2
} from "lucide-react"
import Link from "next/link"

// Define types for roles
type RoleType = "venues" | "studios" | "guests" | "super-admin"

interface DemoStep {
  title: string
  description: string
  highlightCard: string
}

export default function DemoPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleType>("venues")
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  // ROI Calculator states
  const [calcRole, setCalcRole] = useState<"venues" | "studios" | "hosts">("venues")
  // Venues sliders
  const [venueHalls, setVenueHalls] = useState(3)
  const [venueEvents, setVenueEvents] = useState(120)
  // Studios sliders
  const [studioStaff, setStudioStaff] = useState(6)
  const [studioEvents, setStudioEvents] = useState(40)
  // Host sliders
  const [guestCount, setGuestCount] = useState(400)
  const [eventCount, setEventCount] = useState(3)

  // Scheduling states
  const [formState, setFormState] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    role: "venues",
    date: "",
    timeSlot: "",
  })
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [loadingStep, setLoadingStep] = useState(0)
  
  // FAQ accordion states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Mount check for safe hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-play progress loop
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.25
        if (next >= 100) {
          // Loop inside current role
          return 0
        }
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Sync active step based on progress
  useEffect(() => {
    // 4 steps per role: 0-25%, 25-50%, 50-75%, 75-100%
    const step = Math.min(Math.floor(progress / 25), 3)
    setActiveStepIndex(step)
  }, [progress])

  // Reset progress on role switch
  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role)
    setProgress(0)
    setActiveStepIndex(0)
    setIsPlaying(true)
  }

  // Handle step jump
  const handleStepJump = (idx: number) => {
    setProgress(idx * 25 + 5)
    setActiveStepIndex(idx)
    setIsPlaying(false) // Pause on manual selection so user can read
  }

  // Interactive Demo Steps Data
  const roleSteps: Record<RoleType, DemoStep[]> = {
    venues: [
      {
        title: "Multi-Hall Calendar",
        description: "Prevents double bookings across multiple marquees and lawns with visual timelines.",
        highlightCard: "calendar"
      },
      {
        title: "Staff Dispatch",
        description: "Assign catering, security, and cleaning squads to specific halls in real-time.",
        highlightCard: "staff"
      },
      {
        title: "Catering Planner",
        description: "Configure premium traditional Pakistani menus (Korma, Biryani, Naan) with live cost tracking.",
        highlightCard: "catering"
      },
      {
        title: "Revenue Ledger",
        description: "Log client deposits, installment plans, and generate GST compliant invoices.",
        highlightCard: "revenue"
      }
    ],
    studios: [
      {
        title: "Leads Pipeline",
        description: "Capture booking inquiries directly from the public marketplace and assign to photographers.",
        highlightCard: "leads"
      },
      {
        title: "Legal E-Contracts",
        description: "Draft event coverage agreements with integrated electronic signatures and PDF generators.",
        highlightCard: "contracts"
      },
      {
        title: "High-Res Galleries",
        description: "Deliver premium, fast client delivery portals for weddings with selection grids and highlight clips.",
        highlightCard: "galleries"
      },
      {
        title: "Milestone Billing",
        description: "Automate invoicing across booking advance, event day, and final edit release deliverables.",
        highlightCard: "billing"
      }
    ],
    guests: [
      {
        title: "Digital Invitation",
        description: "Personalized rich-media mobile pages with custom theme music, map pins, and couple stories.",
        highlightCard: "invitation"
      },
      {
        title: "Smart RSVP Control",
        description: "Guests RSVP directly, specifying family sub-groups, kids count, and dietary choices.",
        highlightCard: "rsvp"
      },
      {
        title: "Seating Arrangements",
        description: "Assign family groups and VIP tables visually, linking them to guest list updates.",
        highlightCard: "seating"
      },
      {
        title: "QR Code Entry",
        description: "Instant tablet ticket scans at marquee gate to check in invitees and secure access.",
        highlightCard: "qrcode"
      }
    ],
    "super-admin": [
      {
        title: "System Performance",
        description: "Monitor database workloads, active transactions, and Pakistan regional hosting clusters.",
        highlightCard: "performance"
      },
      {
        title: "Verifications Hub",
        description: "Audit and verify newly registered marquees and photographers before marketplace listing.",
        highlightCard: "verifications"
      },
      {
        title: "Urgent Live Support",
        description: "Triage emergency reports (e.g. backup generator outage notifications) to local field support.",
        highlightCard: "support"
      },
      {
        title: "Command Search",
        description: "Lookup any customer, billing receipt, or event schedule across the entire country instantly.",
        highlightCard: "searchbar"
      }
    ]
  }

  // Handle Demo Schedule Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.phone || !formState.email) return

    setBookingStatus("submitting")
    setLoadingStep(0)

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= 2) {
          clearInterval(stepInterval)
          setBookingStatus("success")
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  // FAQ List
  const faqs = [
    {
      q: "How fast can we onboard our marquee or studio?",
      a: "NEXUS setup is lightning fast. Standard creative studios set up their invoice models and client portals in 30 minutes. Large multi-hall marquees can import their calendars and register their staff rosters within 48 hours with our dedicated setup guides."
    },
    {
      q: "Does the guest RSVP system work with WhatsApp?",
      a: "Yes! The Invitation OS allows you to send invitations with direct, secure links. Guests receive personalized links via SMS or WhatsApp, click to open their custom invitation, submit their RSVP, and get their secure entrance QR code immediately."
    },
    {
      q: "How does the system handle booking deposits and offline cash payments?",
      a: "We support both! You can connect local payment gateways (JazzCash, Easypaisa, local bank transfers) for digital payments. For cash advances, admins can manually log offline payments into the secure ledger, which auto-updates the remaining milestones and generates SMS receipts."
    },
    {
      q: "Can we restrict team permissions for staff members?",
      a: "Absolutely. Under the Identity & Organization OS, you can define custom roles. Marquee managers can see full financial reports, while front-desk staff can only view booking statuses, and kitchen squads see catering sheets."
    }
  ]

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden relative">
        
        {/* Modern Ambient Backdrop Gradients */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0F5B3E]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 relative">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              NEXUS Interactive Tour
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
              Experience the Power of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37]">
                Pakistan's Premium Event OS
              </span>
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto font-medium">
              Explore how our connected ecosystem transforms venue operations, creative professional studios, and guest hospitality into a unified premium standard.
            </p>
          </div>

          {/* Interactive Demo Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
            {[
              { id: "venues", label: "Marquees & Venues OS", icon: Building2 },
              { id: "studios", label: "Creative Studios OS", icon: Camera },
              { id: "guests", label: "Guest Invite & RSVP", icon: QrCode },
              { id: "super-admin", label: "Super Admin Command", icon: Laptop },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = selectedRole === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleRoleSelect(tab.id as RoleType)}
                  className={`flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-sm ${
                    isActive
                      ? "bg-[#0F5B3E] text-white ring-2 ring-[#0F5B3E]/10 scale-105"
                      : "bg-white text-[#4B5563] border border-[#E6E2DA] hover:border-[#0F5B3E]/40 hover:bg-[#FDF8F0]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-[#0F5B3E]"}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Simulated Interactive Product Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
            
            {/* Left Side: Interactive Step Explanations (4 cols) */}
            <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-6 border border-[#E6E2DA] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#1A1A1A] text-lg uppercase tracking-wider text-[#0F5B3E]">
                    Tour Milestones
                  </h3>
                  
                  {/* Equalizer Visualizer */}
                  {mounted && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-end gap-0.5 h-4 w-6">
                        <div
                          className={`w-1 bg-[#D4AF37] rounded-full transition-transform duration-300 origin-bottom ${
                            isPlaying && !isMuted ? "animate-wave-slow h-3" : "h-1"
                          }`}
                        />
                        <div
                          className={`w-1 bg-[#D4AF37] rounded-full transition-transform duration-300 origin-bottom ${
                            isPlaying && !isMuted ? "animate-wave-medium h-4" : "h-1.5"
                          }`}
                        />
                        <div
                          className={`w-1 bg-[#D4AF37] rounded-full transition-transform duration-300 origin-bottom ${
                            isPlaying && !isMuted ? "animate-wave-fast h-3" : "h-2"
                          }`}
                        />
                        <div
                          className={`w-1 bg-[#D4AF37] rounded-full transition-transform duration-300 origin-bottom ${
                            isPlaying && !isMuted ? "animate-wave-medium h-2" : "h-1"
                          }`}
                        />
                      </div>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#E6E2DA] transition-colors"
                        title={isMuted ? "Unmute guide" : "Mute guide"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-[#6B7280]" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#0F5B3E]" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {roleSteps[selectedRole].map((step, idx) => {
                    const isActive = activeStepIndex === idx
                    return (
                      <button
                        key={idx}
                        onClick={() => handleStepJump(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex gap-4 ${
                          isActive
                            ? "bg-[#0F5B3E]/5 border-[#0F5B3E]/40 ring-1 ring-[#0F5B3E]/20"
                            : "bg-transparent border-transparent hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                            isActive
                              ? "bg-[#0F5B3E] text-white shadow-md"
                              : "bg-[#FAF7F2] text-[#4B5563] border border-[#E6E2DA]"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1A1A1A] leading-snug transition-colors group-hover:text-[#0F5B3E]">
                            {step.title}
                          </h4>
                          <p className="text-xs text-[#6B7280] leading-relaxed mt-1">
                            {step.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Simulated Play/Pause timeline bar */}
                <div className="mt-8 pt-6 border-t border-[#E6E2DA]">
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white font-bold rounded-xl text-xs transition-colors shadow-md shrink-0"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" /> Pause Tour
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" /> Play Tour
                        </>
                      )}
                    </button>
                    <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden relative">
                      <motion.div
                        className="bg-[#D4AF37] h-full rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive UI Sandbox Screen (8 cols) */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <div className="relative bg-[#1E2522] rounded-[2.5rem] p-4 shadow-[0_30px_70px_rgba(15,91,62,0.18)] border-8 border-[#1A1A1A] aspect-[16/10.5] flex flex-col overflow-hidden">
                
                {/* Virtual Laptop Frame Details */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#1A1A1A] rounded-full z-20 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-[#FAF7F2]/40 rounded-full" />
                </div>

                {/* Virtual Screen Content */}
                <div className="bg-[#FAF7F2] w-full h-full rounded-[1.8rem] overflow-hidden flex flex-col text-[#1A1A1A] text-xs select-none">
                  
                  {/* Top Bar of Virtual App */}
                  <div className="bg-[#0F5B3E] px-4 py-3 text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold tracking-wider text-sm text-[#D4AF37]">
                        NEXUS
                      </span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-white/10">
                        {selectedRole === "super-admin" ? "Master Command Control" : `${selectedRole} OS`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-100/90 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Server Status: <span className="font-bold text-emerald-200">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Interactive Dashboard Simulator content */}
                  <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#FAF7F2]">
                    <AnimatePresence mode="wait">
                      
                      {/* 1. VENUES OS DASHBOARD */}
                      {selectedRole === "venues" && (
                        <motion.div
                          key="venues"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="h-full flex flex-col gap-4"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <h3 className="text-base font-extrabold text-[#0F5B3E]">Venue Command Center</h3>
                              <p className="text-[10px] text-[#6B7280]">Shalamar Grand Marquee, Lahore</p>
                            </div>
                            <span className="text-[10px] bg-white border border-[#E6E2DA] px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
                              <Calendar className="w-3.5 h-3.5 text-[#0F5B3E]" /> Today's Operations
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {/* Card 1: Calendaring */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 0
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Halls Booking Timeline</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 1</span>
                              </div>
                              <div className="space-y-2">
                                <div className="p-2 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA] flex justify-between items-center">
                                  <div>
                                    <div className="font-bold text-[#1A1A1A]">Royal Lawn (Barat)</div>
                                    <div className="text-[9px] text-[#6B7280]">Ahmad weds Sarah • 500 Guests</div>
                                  </div>
                                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Catering Live</span>
                                </div>
                                <div className="p-2 bg-amber-50/50 rounded-xl border border-amber-200/60 flex justify-between items-center">
                                  <div>
                                    <div className="font-bold text-[#1A1A1A]">Crystal Palace (Valima)</div>
                                    <div className="text-[9px] text-[#6B7280]">Hamza weds Zainab • 350 Guests</div>
                                  </div>
                                  <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Decor Setup</span>
                                </div>
                              </div>
                              {activeStepIndex === 0 && (
                                <span className="absolute -top-3 -right-2 bg-[#D4AF37] text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-lg">
                                  Focus Active
                                </span>
                              )}
                            </div>

                            {/* Card 2: Staff Dispatch */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 1
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Operational Squads</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 2</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-1.5">
                                  <span className="font-medium">Kitchen Squad A</span>
                                  <span className="text-[9px] bg-emerald-100 text-[#0F5B3E] px-2 py-0.5 rounded-full font-bold">Dispatched (Hall 1)</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-1.5">
                                  <span className="font-medium">Security Wing B</span>
                                  <span className="text-[9px] bg-emerald-100 text-[#0F5B3E] px-2 py-0.5 rounded-full font-bold">At Main Gate</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Valet Parking Team</span>
                                  <span className="text-[9px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">Standby (Lawn 2)</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 3: Catering Planner */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 2
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Menu Designer (Active)</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 3</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="font-semibold text-slate-800">Pakistani Shahi Traditional Menu</span>
                                  <span className="font-bold text-[#0F5B3E]">Rs. 4,200/head</span>
                                </div>
                                <div className="text-[9px] text-[#6B7280]">Includes: Shahi Mutton Qorma, Chicken Biryani, Roghni Naan, Kulfi.</div>
                                <div className="bg-[#FAF7F2] p-1.5 rounded-lg border border-[#E6E2DA] text-[9.5px] font-bold text-slate-700 flex justify-between mt-1">
                                  <span>Event Total: 500 Guests</span>
                                  <span className="text-[#0F5B3E]">Rs. 2,100,000</span>
                                </div>
                              </div>
                            </div>

                            {/* Card 4: Revenue Ledger */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 3
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Financial Ledger</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 4</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-[#0F5B3E]/5 p-2 rounded-xl">
                                  <div className="text-[8px] text-[#6B7280]">Total Bill</div>
                                  <div className="font-bold text-[#0F5B3E] text-[10px]">Rs. 3.2M</div>
                                </div>
                                <div className="bg-emerald-50 p-2 rounded-xl">
                                  <div className="text-[8px] text-[#6B7280]">Deposited</div>
                                  <div className="font-bold text-emerald-800 text-[10px]">Rs. 2.0M</div>
                                </div>
                                <div className="bg-amber-50 p-2 rounded-xl">
                                  <div className="text-[8px] text-[#6B7280]">Pending</div>
                                  <div className="font-bold text-amber-800 text-[10px]">Rs. 1.2M</div>
                                </div>
                              </div>
                              <div className="mt-2 text-[9px] text-slate-500 font-semibold flex items-center justify-between">
                                <span>Next Installment Due: July 1st</span>
                                <span className="text-amber-600">SMS Reminders Active</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* 2. CREATIVE STUDIOS OS DASHBOARD */}
                      {selectedRole === "studios" && (
                        <motion.div
                          key="studios"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="h-full flex flex-col gap-4"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <h3 className="text-base font-extrabold text-[#0F5B3E]">Studio Operations OS</h3>
                              <p className="text-[10px] text-[#6B7280]">Grand Luminary Photography Studio</p>
                            </div>
                            <span className="text-[10px] bg-white border border-[#E6E2DA] px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
                              <Camera className="w-3.5 h-3.5 text-[#0F5B3E]" /> Projects Workspace
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {/* Leads Pipeline */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 0
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Leads Pipeline</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 1</span>
                              </div>
                              <div className="space-y-2">
                                <div className="p-2 bg-emerald-50/50 rounded-xl border border-emerald-100 flex justify-between items-center">
                                  <div>
                                    <div className="font-bold text-slate-800">Mehak S. - Wedding (Lahore)</div>
                                    <div className="text-[9px] text-emerald-800 font-bold">Marketplace Lead • Rs. 450,000</div>
                                  </div>
                                  <span className="text-[9px] bg-[#0F5B3E] text-white px-2.5 py-1 rounded-full font-bold">Warm</span>
                                </div>
                                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                                  <div>
                                    <div className="font-bold text-slate-800">Kamran J. - Event Shoot</div>
                                    <div className="text-[9px] text-[#6B7280]">Inquiry • Rs. 180,000</div>
                                  </div>
                                  <span className="text-[9px] bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full font-bold">New</span>
                                </div>
                              </div>
                            </div>

                            {/* Contracts & E-Sign */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 1
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Smart Booking Contracts</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 2</span>
                              </div>
                              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA] space-y-1">
                                <div className="font-bold text-slate-800 text-[11px] flex items-center justify-between">
                                  <span>Studio Booking Agreement</span>
                                  <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Check className="w-3 h-3" /> VERIFIED
                                  </span>
                                </div>
                                <p className="text-[9px] text-slate-500">Legal coverage template for: Ali & Sana (Oct 24, 2026)</p>
                                <div className="mt-2 pt-2 border-t border-[#E6E2DA] flex justify-between items-center">
                                  <span className="text-[9px] text-slate-600 italic">Signature: Ali H. Siddiqui</span>
                                  <span className="text-[9.5px] font-bold text-[#0F5B3E]">E-Signed</span>
                                </div>
                              </div>
                            </div>

                            {/* Deliveries Portal */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 2
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Digital Deliverables Portal</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 3</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] text-slate-600">
                                  <span>Client Photo Approvals</span>
                                  <span className="font-bold text-emerald-600">88% Selected</span>
                                </div>
                                <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E6E2DA]">
                                  <div className="bg-emerald-600 h-full w-[88%]" />
                                </div>
                                <div className="p-2 bg-[#0F5B3E]/5 rounded-xl border border-[#0F5B3E]/10 flex items-center justify-between">
                                  <span className="font-bold text-[#0F5B3E]">Zahra & Hamza Highlights.mp4</span>
                                  <span className="text-[9px] bg-[#0F5B3E] text-white px-2 py-0.5 rounded-full font-bold">Ready</span>
                                </div>
                              </div>
                            </div>

                            {/* Milestone Billing */}
                            <div
                              className={`bg-white p-4 rounded-2xl border transition-all duration-300 relative ${
                                activeStepIndex === 3
                                  ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md scale-[1.01]"
                                  : "border-[#E6E2DA] opacity-80"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#1A1A1A]">Billing Milestones</span>
                                <span className="text-[9px] font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-2 py-0.5 rounded-full">Step 4</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-600">1. Booking Deposit (30%)</span>
                                  <span className="font-bold text-emerald-600">Paid (Rs. 135k)</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-600">2. Event Day Roster (40%)</span>
                                  <span className="font-bold text-emerald-600">Paid (Rs. 180k)</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-600">3. Release deliverables (30%)</span>
                                  <span className="font-bold text-amber-600">Pending (Rs. 135k)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* 3. GUEST INVITATION & RSVP OS (MOBILE WRAPPER) */}
                      {selectedRole === "guests" && (
                        <motion.div
                          key="guests"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="h-full flex items-center justify-center"
                        >
                          {/* Simulated Smartphone Screen */}
                          <div className="w-[300px] bg-white rounded-[2rem] border-8 border-slate-900 shadow-xl overflow-hidden aspect-[9/16] flex flex-col relative scale-95 md:scale-100">
                            
                            {/* Mobile status indicators */}
                            <div className="bg-slate-900 text-[8px] text-white px-4 py-1.5 flex justify-between shrink-0 font-medium">
                              <span>12:30 PM</span>
                              <div className="flex gap-1 items-center">
                                <span>LTE</span>
                                <div className="w-4 h-2 bg-white rounded-sm" />
                              </div>
                            </div>

                            {/* Screen Body */}
                            <div className="flex-1 bg-[#FAF7F2] overflow-auto p-4 space-y-4">
                              
                              {/* Digital Invitation Section */}
                              <div
                                className={`bg-white rounded-2xl border transition-all duration-300 relative ${
                                  activeStepIndex === 0
                                    ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md"
                                    : "border-[#E6E2DA]"
                                }`}
                              >
                                <div className="h-24 bg-gradient-to-tr from-[#0F5B3E] to-[#0F5B3E]/60 flex items-center justify-center text-white relative overflow-hidden">
                                  <div className="absolute top-2 right-2 p-1 bg-white/20 rounded-full backdrop-blur-md">
                                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  </div>
                                  <div className="text-center">
                                    <span className="text-[8px] font-bold tracking-widest text-[#D4AF37]">SHADI INVITATION</span>
                                    <h4 className="font-serif text-sm font-extrabold tracking-tight">Sana & Hamza</h4>
                                  </div>
                                </div>
                                <div className="p-3 text-center text-[10px] text-[#1A1A1A]">
                                  <p className="font-semibold mb-1">Lahore Marquee Chain • Hall A</p>
                                  <span className="text-[#0F5B3E] font-bold">Traditional Shehnai music playing...</span>
                                </div>
                              </div>

                              {/* RSVP Component */}
                              <div
                                className={`bg-white p-3 rounded-2xl border transition-all duration-300 relative ${
                                  activeStepIndex === 1
                                    ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md"
                                    : "border-[#E6E2DA]"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-[#1A1A1A] text-[10px]">RSVP Status</span>
                                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Sent</span>
                                </div>
                                <div className="bg-[#FAF7F2] p-2 rounded-xl text-[9px] space-y-1">
                                  <div className="flex justify-between font-medium">
                                    <span>Attending Guests:</span>
                                    <span className="font-bold text-[#0F5B3E]">4 Members</span>
                                  </div>
                                  <div className="flex justify-between font-medium text-slate-500">
                                    <span>Sub-family group:</span>
                                    <span>Kamran Karim & family</span>
                                  </div>
                                </div>
                              </div>

                              {/* Seating Arrangement */}
                              <div
                                className={`bg-white p-3 rounded-2xl border transition-all duration-300 relative ${
                                  activeStepIndex === 2
                                    ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md"
                                    : "border-[#E6E2DA]"
                                }`}
                              >
                                <span className="font-bold text-[#1A1A1A] text-[10px] block mb-1">Your Assigned Table</span>
                                <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-center text-[9px] text-[#1A1A1A] font-bold">
                                  Table 8 • VVIP Family Sector A
                                </div>
                              </div>

                              {/* Entrance QR Ticket */}
                              <div
                                className={`bg-white p-3 rounded-2xl border transition-all duration-300 relative ${
                                  activeStepIndex === 3
                                    ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/10 shadow-md"
                                    : "border-[#E6E2DA]"
                                }`}
                              >
                                <span className="font-bold text-[#1A1A1A] text-[10px] block text-center mb-2">Gate Entrance pass</span>
                                <div className="flex flex-col items-center gap-1.5">
                                  <div className="w-16 h-16 bg-[#FAF7F2] border border-[#E6E2DA] rounded-lg flex items-center justify-center p-2">
                                    {/* Simulated QR Code */}
                                    <div className="w-full h-full bg-slate-900 rounded-sm relative opacity-85">
                                      <div className="absolute top-1 left-1 w-3.5 h-3.5 bg-white rounded-sm border border-slate-900" />
                                      <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-sm border border-slate-900" />
                                      <div className="absolute bottom-1 left-1 w-3.5 h-3.5 bg-white rounded-sm border border-slate-900" />
                                    </div>
                                  </div>
                                  <span className="text-[8px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                                    NXS-9988-LHR
                                  </span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* 4. SUPER ADMIN DASHBOARD (DARK COMMAND CENTER MODE) */}
                      {selectedRole === "super-admin" && (
                        <motion.div
                          key="super-admin"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="h-full flex flex-col gap-4 text-white"
                        >
                          <div className="flex justify-between items-center mb-1 bg-[#161E1A] p-3 rounded-2xl border border-emerald-950">
                            <div>
                              <h3 className="text-sm font-extrabold text-[#D4AF37] flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" /> Global Platform Operations
                              </h3>
                              <p className="text-[9px] text-[#A39E93]">Ecosystem-wide metrics across Pakistan</p>
                            </div>
                            <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl font-bold text-emerald-400 flex items-center gap-1 shadow-sm">
                              Admin Panel
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {/* Performance/Health Monitor */}
                            <div
                              className={`p-4 rounded-2xl transition-all duration-300 relative ${
                                activeStepIndex === 0
                                  ? "bg-[#1C2C24] border border-[#D4AF37] ring-4 ring-[#D4AF37]/10"
                                  : "bg-[#151B18] border border-[#232F2A] opacity-75"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#FAF7F2]">Ecosystem Health</span>
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Step 1</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-[#A39E93]">Active Server Cluster:</span>
                                  <span className="font-bold text-emerald-400">99.98% Healthy</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-[#A39E93]">Active User Transactions:</span>
                                  <span className="font-bold text-[#D4AF37]">4,142 / Sec</span>
                                </div>
                              </div>
                            </div>

                            {/* Verifications Hub */}
                            <div
                              className={`p-4 rounded-2xl transition-all duration-300 relative ${
                                activeStepIndex === 1
                                  ? "bg-[#1C2C24] border border-[#D4AF37] ring-4 ring-[#D4AF37]/10"
                                  : "bg-[#151B18] border border-[#232F2A] opacity-75"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#FAF7F2]">Provider Verification</span>
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Step 2</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="p-1.5 bg-[#1F2925] rounded-xl border border-emerald-950 flex justify-between items-center text-[9px]">
                                  <span>Lahore Grand Palace</span>
                                  <span className="text-amber-400 font-extrabold">Audit Pending</span>
                                </div>
                                <div className="p-1.5 bg-[#1F2925] rounded-xl border border-emerald-950 flex justify-between items-center text-[9px]">
                                  <span>Breeze Film Studio</span>
                                  <span className="text-emerald-400 font-extrabold flex items-center gap-0.5">Approved</span>
                                </div>
                              </div>
                            </div>

                            {/* Support Tickets Queue */}
                            <div
                              className={`p-4 rounded-2xl transition-all duration-300 relative ${
                                activeStepIndex === 2
                                  ? "bg-[#1C2C24] border border-[#D4AF37] ring-4 ring-[#D4AF37]/10"
                                  : "bg-[#151B18] border border-[#232F2A] opacity-75"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#FAF7F2]">Admins Tickets Hub</span>
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Step 3</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] bg-[#232F2A] p-2 rounded-xl border border-emerald-900">
                                  <span className="font-bold text-rose-400">Generator Outage Alert</span>
                                  <span className="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded font-extrabold">RESOLVING</span>
                                </div>
                              </div>
                            </div>

                            {/* Command Palette */}
                            <div
                              className={`p-4 rounded-2xl transition-all duration-300 relative ${
                                activeStepIndex === 3
                                  ? "bg-[#1C2C24] border border-[#D4AF37] ring-4 ring-[#D4AF37]/10"
                                  : "bg-[#151B18] border border-[#232F2A] opacity-75"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-[#FAF7F2]">Global Lookup Palette</span>
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Step 4</span>
                              </div>
                              <div className="p-2 bg-[#121A16] rounded-xl border border-emerald-950 flex items-center justify-between text-[10px]">
                                <span className="text-slate-500">Search invoice, booking ID...</span>
                                <span className="text-slate-600 bg-slate-900 px-1.5 py-0.5 rounded font-mono text-[9px] font-bold">Ctrl + K</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ROI & Estimator Value Calculator Section */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#E6E2DA] shadow-sm mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
            
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight">
                Calculate Your <span className="text-[#0F5B3E]">NEXUS Value ROI</span>
              </h2>
              <p className="text-[#6B7280] text-sm md:text-base mt-2 max-w-lg mx-auto">
                Select your business type and toggle event scale to estimate time savings and revenue optimizations.
              </p>
            </div>

            {/* Calculator Tab selector */}
            <div className="flex justify-center border-b border-[#E6E2DA] pb-6 mb-8 gap-4">
              {[
                { id: "venues", label: "Venue Owner", icon: Building2 },
                { id: "studios", label: "Creative Studio", icon: Camera },
                { id: "hosts", label: "Wedding/Event Host", icon: Users },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = calcRole === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCalcRole(tab.id as "venues" | "studios" | "hosts")}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 font-bold text-sm transition-all duration-300 ${
                      isActive
                        ? "border-[#0F5B3E] text-[#0F5B3E]"
                        : "border-transparent text-[#6B7280] hover:text-[#0F5B3E]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Sliders Input Area */}
              <div className="lg:col-span-7 space-y-8">
                {calcRole === "venues" && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-[#1A1A1A]">Number of Halls / Branches</label>
                        <span className="font-mono font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-3 py-1 rounded-xl text-xs">
                          {venueHalls} {venueHalls === 1 ? "Hall" : "Halls"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={venueHalls}
                        onChange={(e) => setVenueHalls(parseInt(e.target.value))}
                        className="w-full accent-[#0F5B3E] bg-slate-200 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-[#1A1A1A]">Events & Bookings / Year</label>
                        <span className="font-mono font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-3 py-1 rounded-xl text-xs">
                          {venueEvents} Events
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="600"
                        step="10"
                        value={venueEvents}
                        onChange={(e) => setVenueEvents(parseInt(e.target.value))}
                        className="w-full accent-[#0F5B3E] bg-slate-200 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {calcRole === "studios" && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-[#1A1A1A]">Studio Roster Size (Crew)</label>
                        <span className="font-mono font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-3 py-1 rounded-xl text-xs">
                          {studioStaff} Team Members
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="25"
                        value={studioStaff}
                        onChange={(e) => setStudioStaff(parseInt(e.target.value))}
                        className="w-full accent-[#0F5B3E] bg-slate-200 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-[#1A1A1A]">Covered Weddings / Year</label>
                        <span className="font-mono font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-3 py-1 rounded-xl text-xs">
                          {studioEvents} Weddings
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="5"
                        value={studioEvents}
                        onChange={(e) => setStudioEvents(parseInt(e.target.value))}
                        className="w-full accent-[#0F5B3E] bg-slate-200 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {calcRole === "hosts" && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-[#1A1A1A]">Expected Guests Count</label>
                        <span className="font-mono font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-3 py-1 rounded-xl text-xs">
                          {guestCount} Guests
                        </span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1500"
                        step="50"
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="w-full accent-[#0F5B3E] bg-slate-200 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-[#1A1A1A]">Total Functions Roster (Events)</label>
                        <span className="font-mono font-bold text-[#0F5B3E] bg-[#0F5B3E]/5 px-3 py-1 rounded-xl text-xs">
                          {eventCount} {eventCount === 1 ? "Event" : "Events"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={eventCount}
                        onChange={(e) => setEventCount(parseInt(e.target.value))}
                        className="w-full accent-[#0F5B3E] bg-slate-200 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Value Output Area */}
              <div className="lg:col-span-5 bg-[#FAF7F2] rounded-3xl p-6 border border-[#E6E2DA] shadow-inner">
                <h3 className="font-extrabold text-[#1A1A1A] text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0F5B3E]" /> Estimated ROI Yield
                </h3>

                <div className="space-y-4">
                  {calcRole === "venues" && (
                    <>
                      <div className="bg-white p-4 rounded-2xl border border-[#E6E2DA]">
                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Revenue Leakages Plugged</span>
                        <div className="text-2xl font-black text-[#0F5B3E] mt-0.5">
                          Rs. {((venueEvents * 14000) + (venueHalls * 45000)).toLocaleString()} / Yr
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">Saves food wastage and catches incorrect installment logging.</p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-[#E6E2DA]">
                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Managerial Time Saved</span>
                        <div className="text-2xl font-black text-[#1A1A1A] mt-0.5">
                          {Math.round(venueEvents * 4.5)} Hours / Yr
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">Consolidates staff dispatch lists and POS invoicing automatically.</p>
                      </div>
                      
                      <div className="text-center pt-2">
                        <span className="text-xs text-[#0F5B3E] font-bold bg-[#0F5B3E]/5 px-3 py-1.5 rounded-full inline-block">
                          Recommended Plan: NEXUS Venue OS Pro Suite
                        </span>
                      </div>
                    </>
                  )}

                  {calcRole === "studios" && (
                    <>
                      <div className="bg-white p-4 rounded-2xl border border-[#E6E2DA]">
                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Increased Booking Revenue</span>
                        <div className="text-2xl font-black text-[#0F5B3E] mt-0.5">
                          Rs. {Math.round(studioEvents * 0.22 * 170000).toLocaleString()} / Yr
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">Converts Warm Marketplace leads into paying customers 22% faster.</p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-[#E6E2DA]">
                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Deliverable Turnaround Velocity</span>
                        <div className="text-2xl font-black text-[#1A1A1A] mt-0.5">
                          3.5x Faster Selection
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">High-speed proofing and Client Select portals remove photo delays.</p>
                      </div>

                      <div className="text-center pt-2">
                        <span className="text-xs text-[#0F5B3E] font-bold bg-[#0F5B3E]/5 px-3 py-1.5 rounded-full inline-block">
                          Recommended Plan: NEXUS Studio Enterprise OS
                        </span>
                      </div>
                    </>
                  )}

                  {calcRole === "hosts" && (
                    <>
                      <div className="bg-white p-4 rounded-2xl border border-[#E6E2DA]">
                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Estimated Plate Charges Saved</span>
                        <div className="text-2xl font-black text-[#0F5B3E] mt-0.5">
                          Rs. {Math.round(guestCount * 0.12 * 3200).toLocaleString()} Saved
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">Estimates a ~12% guest counts leak decrease via direct digital RSVP confirmations.</p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-[#E6E2DA]">
                        <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Guest Entry Scanning Time</span>
                        <div className="text-2xl font-black text-[#1A1A1A] mt-0.5">
                          &lt; 3 Sec / Guest Check-in
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">QR tickets scanned at marquee entry block wedding gate crashers.</p>
                      </div>

                      <div className="text-center pt-2">
                        <span className="text-xs text-[#0F5B3E] font-bold bg-[#0F5B3E]/5 px-3 py-1.5 rounded-full inline-block">
                          Recommended Plan: NEXUS Premium RSVP & Invite Pack
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Scheduling Form & Contact Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            
            {/* Left Side text (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                Secure Your Personal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37]">
                  Demo Playground Session
                </span>
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed">
                Need more custom insights? Set up a live video playground consultation with a dedicated NEXUS implementation architect. We will mapping your existing operations workflow to show the direct upgrade impact.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Personalized Architecture Map", desc: "No generic templates. We map your actual hall coordinates, team rosters, and payment milestones." },
                  { title: "Direct Marketplace Analysis", desc: "See your local search ranking index for venues and photographers in Lahore, Karachi, and Islamabad." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#0F5B3E]/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#0F5B3E]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A] text-sm">{item.title}</h4>
                      <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Card: Interactive Scheduler (6 cols) */}
            <div className="lg:col-span-6">
              <div className="bg-[#0F5B3E] rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl border border-white/10">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent blur-2xl pointer-events-none" />

                <AnimatePresence mode="wait">
                  {bookingStatus === "idle" && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="text-2xl font-black mb-1">Book Live Demo</h3>
                      <p className="text-xs text-emerald-100/80 mb-6">Select a slot to confirm your personal system tour.</p>

                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Asim Raza"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block mb-1">Business Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Royal Marquee Lahore"
                              value={formState.businessName}
                              onChange={(e) => setFormState({ ...formState, businessName: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block mb-1">WhatsApp / Phone</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 03211234567"
                              value={formState.phone}
                              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block mb-1">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. asim@marquee.com"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block mb-1">Preferred Date</label>
                            <input
                              type="date"
                              required
                              value={formState.date}
                              onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 block mb-1">Preferred Time Slot</label>
                            <select
                              required
                              value={formState.timeSlot}
                              onChange={(e) => setFormState({ ...formState, timeSlot: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all appearance-none"
                            >
                              <option value="" className="text-slate-800">Select Slot</option>
                              <option value="11:00 AM - 12:00 PM" className="text-slate-800">11:00 AM - 12:00 PM</option>
                              <option value="02:00 PM - 03:00 PM" className="text-slate-800">02:00 PM - 03:00 PM</option>
                              <option value="04:00 PM - 05:00 PM" className="text-slate-800">04:00 PM - 05:00 PM</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-4 py-4 px-6 bg-white text-[#0F5B3E] hover:bg-[#FAF7F2] font-black rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Confirm System Slot <ArrowRight className="w-5 h-5" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {bookingStatus === "submitting" && (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-16 h-16 border-4 border-emerald-200 border-t-[#D4AF37] rounded-full animate-spin" />
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg text-white">Validating Live Environment Slot</h4>
                        <div className="h-6 overflow-hidden relative w-64 mx-auto text-xs text-emerald-200 font-medium">
                          <AnimatePresence mode="wait">
                            {loadingStep === 0 && (
                              <motion.div
                                key="0"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                              >
                                Allocating secure playground environment...
                              </motion.div>
                            )}
                            {loadingStep === 1 && (
                              <motion.div
                                key="1"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                              >
                                Linking custom milestones & metrics...
                              </motion.div>
                            )}
                            {loadingStep === 2 && (
                              <motion.div
                                key="2"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                              >
                                Dispatching invitation packet to calendars...
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {bookingStatus === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-6 text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-[#FAF7F2]">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-black text-[#FAF7F2]">Tour Slot Secured!</h3>
                        <p className="text-xs text-emerald-100/80 mt-1 max-w-sm mx-auto">
                          Asalamu Alaikum, <span className="font-bold">{formState.name}</span>. We've allocated your playground environment. A calendar invite link has been dispatched to <span className="font-bold">{formState.email}</span>.
                        </p>
                      </div>

                      <div className="bg-[#1C2C24] p-4 rounded-2xl border border-emerald-950 text-left text-xs space-y-2 max-w-sm mx-auto">
                        <div className="flex justify-between border-b border-[#232F2A] pb-1.5 text-[#A39E93]">
                          <span>Consultation Date</span>
                          <span className="font-bold text-white">{formState.date}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#232F2A] pb-1.5 text-[#A39E93]">
                          <span>Assigned Time</span>
                          <span className="font-bold text-white">{formState.timeSlot}</span>
                        </div>
                        <div className="flex justify-between text-[#A39E93]">
                          <span>Assigned Architect</span>
                          <span className="font-bold text-[#D4AF37]">NEXUS Core Guide</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setBookingStatus("idle")}
                        className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl text-xs transition-colors"
                      >
                        Reschedule / Back
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

          {/* Dynamic Accordion FAQs */}
          <div className="max-w-4xl mx-auto mb-20 bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#E6E2DA] shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-center text-[#1A1A1A] mb-8">
              Frequently Answered <span className="text-[#0F5B3E]">Tour Queries</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div key={idx} className="border-b border-[#E6E2DA] pb-4">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center text-left py-2 group cursor-pointer"
                    >
                      <span className="font-bold text-[#1A1A1A] group-hover:text-[#0F5B3E] transition-colors pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#6B7280] transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180 text-[#0F5B3E]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed mt-2 pl-1 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E6E2DA]/50">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      <MegaFooter />
    </PublicLayout>
  )
}

