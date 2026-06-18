"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Calendar, MapPin, Users, CreditCard, CheckCircle2, Circle, 
  Upload, MessageCircle, ArrowLeft, Home, FileText, Check,
  Clock, DollarSign, Image as ImageIcon, ChevronRight, Landmark,
  Send, Sparkles, ShieldCheck
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface EventDetails {
  id: string;
  name: string;
  start_datetime?: string | null;
  end_datetime?: string | null;
  guest_count?: number | null;
  budget?: number | null;
  status?: string | null;
}

interface EventDashboardProps {
  event: EventDetails
}

// Initial planning task items
const INITIAL_TASKS = [
  { id: "guest_list", label: "Finalize guest list count & seat allocations", completed: true },
  { id: "caterer", label: "Approve custom catering menu proposal", completed: true },
  { id: "decor", label: "Confirm floral stage & entrance decor concept", completed: false },
  { id: "makeup", label: "Schedule wedding day makeup trial slots", completed: false },
  { id: "av_setup", label: "Approve stage sound, projection & lighting plot", completed: true },
  { id: "deposit", label: "Transfer second installment booking deposit", completed: false }
]

// Initial vendor quotes
const INITIAL_QUOTES = [
  { id: "q1", vendor: "Margalla Meadows Hall", category: "Venue Space", price: 600000, status: "ACCEPTED" },
  { id: "q2", vendor: "Shalimar Gourmet Catering", category: "Food & Dessert", price: 450000, status: "ACCEPTED" },
  { id: "q3", vendor: "Hassan & Co. Floral Design", category: "Stage Decor", price: 350000, status: "REVIEW" },
  { id: "q4", vendor: "Raza Bukhari Studio", category: "Photography", price: 180000, status: "PENDING" }
]

// Memories images
const INITIAL_MEMORIES = [
  { id: "m1", src: "/images/pakistani_wedding_couple.png", caption: "Couple Portrait Session" },
  { id: "m2", src: "/images/pakistani_wedding_venue.png", caption: "Pavilion Entrance Decor" },
  { id: "m3", src: "/images/pakistani_mehndi_hands.png", caption: "Mehndi Design Highlights" },
  { id: "m4", src: "/images/pakistani_bride_makeup.png", caption: "Bridal Preparation details" },
  { id: "m5", src: "/images/mehndi_bridal.png", caption: "Traditional Ornaments" }
]

export function EventDashboard({ event }: EventDashboardProps) {
  const router = useRouter()
  
  // State variables
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [quotes, setQuotes] = useState(INITIAL_QUOTES)
  const [memories, setMemories] = useState(INITIAL_MEMORIES)
  
  // Navigation active tab mock state
  const [activeTab, setActiveTab] = useState("Timeline")
  
  // Toast notifications state
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEventStarted, setIsEventStarted] = useState(false)

  // Countdown timer calculations
  useEffect(() => {
    // Default fallback to 90 days in future if start_datetime is not provided
    const targetDate = event.start_datetime 
      ? new Date(event.start_datetime)
      : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)

    const timer = setInterval(() => {
      const difference = targetDate.getTime() - Date.now()
      
      if (difference <= 0) {
        clearInterval(timer)
        setIsEventStarted(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24))
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const m = Math.floor((difference / 1000 / 60) % 60)
        const s = Math.floor((difference / 1000) % 60)
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [event.start_datetime])

  // Toggle tasks
  const handleToggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
    showToast("Checklist progress updated")
  }

  // Handle quote status click (simulates toggling approval state)
  const handleToggleQuote = (id: string) => {
    setQuotes(prev =>
      prev.map(q => {
        if (q.id === id) {
          const nextStatus = q.status === "PENDING" ? "REVIEW" : q.status === "REVIEW" ? "ACCEPTED" : "PENDING"
          return { ...q, status: nextStatus }
        }
        return q
      })
    )
    showToast("Quotation status updated")
  }

  // Upload photo simulation
  const handleUploadPhoto = () => {
    showToast("Photo uploaded to Digital Vault successfully!")
    // Add a mockup item dynamically using existing public images
    const newItem = {
      id: `m_${Date.now()}`,
      src: "/images/mehndi_arabic.png",
      caption: "Guest Uploaded Snap"
    }
    setMemories(prev => [newItem, ...prev])
  }

  // Toast trigger utility
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Checklist completion calculation
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const progressPercent = Math.round((completedTasks / totalTasks) * 100)

  // Payments overview budget logic
  const totalBudget = event.budget || 2000000
  // Accepted quotes sum
  const spentPayments = quotes
    .filter(q => q.status === "ACCEPTED")
    .reduce((sum, item) => sum + item.price, 0)
  
  const remainingBudget = Math.max(0, totalBudget - spentPayments)
  const paymentProgressPercent = Math.round((spentPayments / totalBudget) * 100)

  // Framer Motion spring definition as const to bypass Next.js compilation issues
  const transitionSpring = { type: "spring" as const, stiffness: 300, damping: 25 }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1D1C17] flex flex-col justify-between relative pb-24 font-sans select-none">
      
      {/* 1. PORTAL HEADER BAR */}
      <header className="bg-white border-b border-[#E6E2DA] sticky top-0 z-40 shadow-sm w-full">
        <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link 
              href="/portal"
              className="text-[#5E6460] hover:text-[#0F5B3E] transition-colors p-1 rounded-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="font-sans text-lg font-black text-[#1D1C17] uppercase tracking-wider">
              Portal Overview
            </h2>
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E6E2DA] text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            SECURE CLIENT PORTAL
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] w-full mx-auto px-4 md:px-6 py-6 space-y-6 flex-1">
        
        {/* Toast Notification Container */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#0F5B3E] text-white px-5 py-3 rounded-full shadow-lg border border-[#C9A227]/30 text-xs font-bold tracking-wider flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C9A227] fill-[#C9A227] animate-pulse" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. DYNAMIC COUNTDOWN BANNER CARD (DEEP EMERALD) */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0F5B3E] text-white p-6 md:p-8 shadow-md border border-[#0F5B3E] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Subtle ambient decorative backdrop textures */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-white/5 to-transparent rounded-full pointer-events-none filter blur-2xl" />

          {/* Banner Left Details */}
          <div className="relative z-10 space-y-2.5 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-widest text-[#C9A227]">
              <Calendar className="w-3.5 h-3.5" />
              Upcoming Festive Journey
            </div>
            
            <h1 className="font-sans text-2xl md:text-3xl font-black uppercase tracking-wider leading-tight text-white">
              {event.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/85 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                Lahore, PK
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#C9A227]" />
                {event.guest_count || 300} Guests Registered
              </span>
            </div>
          </div>

          {/* Countdown Clock Display */}
          <div className="relative z-10 shrink-0 w-full md:w-auto bg-white/5 border border-white/10 backdrop-blur-sm p-4 rounded-xl flex items-center justify-around md:justify-center gap-4 text-center">
            {isEventStarted ? (
              <div className="px-6 py-2">
                <p className="text-sm font-black uppercase tracking-widest text-[#C9A227] animate-pulse">Celebration Day is Here!</p>
                <p className="text-[10px] text-white/80">Welcome to your beautiful Event Journey</p>
              </div>
            ) : (
              <>
                <div>
                  <span className="block text-2xl font-black text-white leading-none">{timeLeft.days}</span>
                  <span className="text-[9px] text-[#C9A227] font-black uppercase tracking-wider mt-1 block">Days</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-2xl font-black text-white leading-none">{timeLeft.hours}</span>
                  <span className="text-[9px] text-[#C9A227] font-black uppercase tracking-wider mt-1 block">Hours</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-2xl font-black text-white leading-none">{timeLeft.minutes}</span>
                  <span className="text-[9px] text-[#C9A227] font-black uppercase tracking-wider mt-1 block">Mins</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-2xl font-black text-[#C9A227] leading-none animate-pulse">{timeLeft.seconds}</span>
                  <span className="text-[9px] text-white/75 font-black uppercase tracking-wider mt-1 block">Secs</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 3. DENSE GRID OF PLANNERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* LEFT COLUMN COMPONENTS */}
          <div className="space-y-6">
            
            {/* PLANNING CHECKS LIST */}
            <div className="bg-white border border-[#E6E2DA] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E6E2DA]">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#1D1C17]">Planning Timeline Checklist</h3>
                  <p className="text-[11px] text-[#5E6460]">Tap check circles to update your milestone progress</p>
                </div>
                
                <div className="bg-[#FAF7F2] border border-[#E6E2DA] px-2.5 py-1 rounded-full text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider">
                  {progressPercent}% Complete
                </div>
              </div>

              {/* Progress Slider Meter */}
              <div className="space-y-1">
                <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E6E2DA]">
                  <div 
                    className="bg-[#0F5B3E] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Interactive checklist rows */}
              <div className="space-y-3 pt-1">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      task.completed 
                        ? 'bg-[#FAF7F2]/60 border-[#0F5B3E]/20 text-[#5E6460]' 
                        : 'bg-white border-[#E6E2DA] hover:border-[#0F5B3E]/30'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {task.completed ? (
                        <div className="w-4 h-4 rounded-full bg-[#0F5B3E] flex items-center justify-center text-white border border-[#0F5B3E]">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[#E6E2DA] hover:border-[#0F5B3E] transition-colors bg-white" />
                      )}
                    </div>
                    
                    <span className={`text-[11px] font-bold leading-normal ${task.completed ? 'line-through text-[#5E6460]/75' : 'text-[#1D1C17]'}`}>
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENTS & LEDGER SECTION */}
            <div className="bg-white border border-[#E6E2DA] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="pb-3 border-b border-[#E6E2DA]">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#1D1C17]">Payments Ledger</h3>
                <p className="text-[11px] text-[#5E6460]">Track allocated funds and remaining balance limits</p>
              </div>

              {/* Budget breakdown cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA]">
                  <span className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">Allocated Spent</span>
                  <span className="text-lg font-black text-[#0F5B3E] block mt-0.5">PKR {spentPayments.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E6E2DA]">
                  <span className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">Remaining Balance</span>
                  <span className="text-lg font-black text-[#1D1C17] block mt-0.5">PKR {remainingBudget.toLocaleString()}</span>
                </div>
              </div>

              {/* Spent ratio indicator */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[10px] font-black text-[#5E6460] uppercase tracking-wider">
                  <span>Budget Consumption Meter</span>
                  <span>{paymentProgressPercent}% of PKR {totalBudget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#E6E2DA] relative">
                  <div 
                    className="bg-[#C9A227] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${paymentProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Transactions list */}
              <div className="space-y-2 pt-2 border-t border-[#E6E2DA]/85">
                <h4 className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider">Approved Deposits Ledger</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#1D1C17] font-semibold">Margalla Meadows Hall (Deposit)</span>
                    <span className="text-[#0F5B3E] font-black">PKR 600,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#1D1C17] font-semibold">Shalimar Gourmet Catering (Deposit)</span>
                    <span className="text-[#0F5B3E] font-black">PKR 450,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#5E6460] font-semibold">Hassan &amp; Co. Floral (Quoted pending approval)</span>
                    <span className="text-[#5E6460] font-bold">PKR 350,000</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN COMPONENTS */}
          <div className="space-y-6">
            
            {/* VENDOR QUOTATIONS MATRIX */}
            <div className="bg-white border border-[#E6E2DA] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="pb-3 border-b border-[#E6E2DA] flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#1D1C17]">Vendor Quotes Matrix</h3>
                  <p className="text-[11px] text-[#5E6460]">Tap quote statuses to toggle approval stage (mock)</p>
                </div>
              </div>

              {/* Quote List Cards */}
              <div className="space-y-3">
                {quotes.map(quote => (
                  <div 
                    key={quote.id}
                    className="p-3.5 bg-white rounded-xl border border-[#E6E2DA] flex justify-between items-center gap-3 hover:border-[#0F5B3E]/30 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.01)]"
                  >
                    <div>
                      <span className="text-[9px] bg-[#FAF7F2] border border-[#E6E2DA] px-2 py-0.5 rounded text-[#5E6460] font-black uppercase tracking-wider block w-max mb-1">
                        {quote.category}
                      </span>
                      <h4 className="text-xs font-black text-[#1D1C17] font-sans truncate max-w-[150px]">
                        {quote.vendor}
                      </h4>
                      <p className="text-xs font-bold text-[#0F5B3E] mt-0.5">
                        PKR {quote.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleQuote(quote.id)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all select-none ${
                        quote.status === "ACCEPTED" 
                          ? "bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 text-[#0F5B3E] hover:bg-[#0F5B3E]/15"
                          : quote.status === "REVIEW"
                          ? "bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] hover:bg-[#C9A227]/15"
                          : "bg-[#5E6460]/10 border border-[#5E6460]/20 text-[#5E6460] hover:bg-[#5E6460]/15"
                      }`}
                    >
                      {quote.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MEMORIES WALL PHOTOGRAPHY SECTION */}
            <div className="bg-white border border-[#E6E2DA] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#E6E2DA]">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-[#1D1C17]">Digital Memories Wall</h3>
                  <p className="text-[11px] text-[#5E6460]">Collaborative gallery for snapshots &amp; prints</p>
                </div>
                
                <button
                  onClick={handleUploadPhoto}
                  className="bg-[#0F5B3E] hover:bg-[#0A422D] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Photo
                </button>
              </div>

              {/* Horizontal scroll slider */}
              <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-sand select-none scrollbar-track-transparent">
                {memories.map(photo => (
                  <div 
                    key={photo.id}
                    className="shrink-0 w-36 bg-[#FAF7F2] rounded-xl border border-[#E6E2DA] overflow-hidden p-1.5 shadow-sm"
                  >
                    <div className="h-24 rounded-lg overflow-hidden bg-[#E6E2DA] border border-[#E6E2DA]/60">
                      <img 
                        src={photo.src} 
                        alt={photo.caption} 
                        className="w-full h-full object-cover pointer-events-none hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-1 py-1.5">
                      <p className="text-[9px] font-black text-[#1D1C17] truncate font-sans uppercase tracking-wider">{photo.caption}</p>
                      <span className="text-[8px] text-[#5E6460] block font-medium mt-0.5">Approved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 4. PREMIUM BOTTOM LAYOUT NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-white border-t border-[#E6E2DA] z-40 rounded-t-2xl shadow-md">
        <div className="max-w-[600px] w-full mx-auto flex justify-between items-center px-4">
          <Link 
            href="/portal"
            className="flex flex-col items-center justify-center text-[#5E6460] hover:text-[#0F5B3E] transition-colors py-1.5 px-3 rounded-xl"
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
          </Link>
          
          {[
            { id: "Timeline", label: "Timeline", icon: Clock },
            { id: "Budget", label: "Budget", icon: DollarSign },
            { id: "Guests", label: "Guests", icon: Users },
            { id: "Vendors", label: "Vendors", icon: FileText }
          ].map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  showToast(`Switched view to ${tab.label} section`)
                }}
                className={`flex flex-col items-center justify-center transition-all py-1.5 px-3 rounded-xl ${
                  isActive 
                    ? "text-[#0F5B3E] bg-[#FAF7F2] border border-[#0F5B3E]/10" 
                    : "text-[#5E6460] hover:text-[#0F5B3E]"
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* 5. WHATSAPP FLOATING ACTION BUTTON (PKR GREEN) */}
      <a
        href="https://wa.me/923001234567?text=Hello%20Nexus%2C%20I%20have%20an%20inquiry%20regarding%20my%20event%20journey"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

    </div>
  )
}
