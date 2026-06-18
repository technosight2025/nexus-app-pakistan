"use client"

import React, { useState, useEffect } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Search,
  Award,
  Users,
  Film,
  Store,
  Box,
  Tag,
  Star,
  MapPin,
  ChevronDown,
  Play,
  Heart,
  MessageSquare,
  Mic,
  Headphones,
  Sliders,
  DollarSign,
  Calculator,
  MessageSquareCode,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  CheckSquare,
  HelpCircle,
  Clock,
  Briefcase
} from "lucide-react"

// Types & Data Structures
interface Vendor {
  id: string
  name: string
  category: string
  theme: string
  location: string
  rating: number
  reviews: number
  price: number // Numeric for budget calculations
  avatar: string
  images: string[]
  badge?: string
  isVerified: boolean
  isPremium: boolean
  availableSlot: string
  packages: {
    bronze: { name: string; price: number; details: string[] }
    silver: { name: string; price: number; details: string[] }
    gold: { name: string; price: number; details: string[] }
  }
}

const MOCK_VENDORS: Vendor[] = [
  {
    id: "v-1",
    name: "Usman Ali Photography",
    category: "Photography",
    theme: "Traditional Mughal",
    location: "Lahore, Punjab",
    rating: 4.9,
    reviews: 142,
    price: 75000,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150",
    images: ["https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=600&auto=format&fit=crop"],
    badge: "Top Rated",
    isVerified: true,
    isPremium: true,
    availableSlot: "June 24, 2026",
    packages: {
      bronze: { name: "Mehndi Solo", price: 45000, details: ["1 Photographer", "4 Hours coverage", "Digital gallery delivery"] },
      silver: { name: "Shendi Deluxe", price: 75000, details: ["2 Photographers", "Full coverage", "Premium wedding album"] },
      gold: { name: "Complete Cinematic", price: 110000, details: ["3 Crew members", "Groom/Bride pre-shoot", "Raw drive transfer"] }
    }
  },
  {
    id: "v-2",
    name: "NM Cinematics & Video",
    category: "Videography",
    theme: "Modern Sufi Night",
    location: "Islamabad, Capital",
    rating: 4.8,
    reviews: 98,
    price: 120000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop"],
    badge: "Popular",
    isVerified: true,
    isPremium: false,
    availableSlot: "July 2, 2026",
    packages: {
      bronze: { name: "Traditional Video", price: 80000, details: ["1 Videographer", "Full HD delivery", "Digital link"] },
      silver: { name: "Signature Reel", price: 120000, details: ["2 Videographers", "4K Drone shot coverage", "3min Highlight film"] },
      gold: { name: "Cinematographer's Cut", price: 180000, details: ["Directors Cut package", "Drone flythroughs", "Extended documentary video"] }
    }
  },
  {
    id: "v-3",
    name: "Sarah Khan Bridal Salon",
    category: "Makeup Artist",
    theme: "Pastel Nikkah",
    location: "Karachi, Sindh",
    rating: 4.9,
    reviews: 84,
    price: 25000,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    images: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop"],
    badge: "Verified",
    isVerified: true,
    isPremium: true,
    availableSlot: "June 20, 2026",
    packages: {
      bronze: { name: "Nikkah Minimalist", price: 20000, details: ["Flawless base makeup", "Hair-styling", "Dupatta setting"] },
      silver: { name: "Signature Barat Look", price: 25000, details: ["Premium makeup session", "Lashes & contour detailing", "Hair styling & jewelry assist"] },
      gold: { name: "Elite HD Bridal Combo", price: 45000, details: ["HD base airbrushing", "Pre-makeovers trial", "Bridal package gift kit"] }
    }
  },
  {
    id: "v-4",
    name: "Floral Dreams Event Decor",
    category: "Decorator",
    theme: "Traditional Mughal",
    location: "Lahore, Punjab",
    rating: 4.7,
    reviews: 89,
    price: 150000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop"],
    badge: "Top Rated",
    isVerified: true,
    isPremium: false,
    availableSlot: "July 5, 2026",
    packages: {
      bronze: { name: "Cozy Stage Setup", price: 90000, details: ["Standard marigold flowers", "Stage seating sofa", "Ambient focus lights"] },
      silver: { name: "Grand Floral Corridor", price: 150000, details: ["Rose & Jasmin canopy entrance", "Full backdrop floral wall", "Uplighting & drapes setup"] },
      gold: { name: "Royal Mughal Shendi Theme", price: 250000, details: ["Exotic flowers ceiling hanging", "Traditional dholki decor centerpieces", "Mughal layout arches & red carpets"] }
    }
  }
]

export default function MarketplaceV2Page() {
  // Budget Bento State
  const [selectedVenue, setSelectedVenue] = useState<number>(300000) // Standard 3 Lacs
  const [selectedPhotoPkg, setSelectedPhotoPkg] = useState<number>(75000) // Standard 75k
  const [selectedDecorTheme, setSelectedDecorTheme] = useState<number>(150000) // Traditional 1.5 Lacs

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedVibe, setSelectedVibe] = useState("All Vibes")
  
  // AI Chat Assistant Simulation
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Salam! I am your AI Matcher. Tell me your budget, city, or event style and I'll match the best creative teams instantly." }
  ])
  const [isTyping, setIsTyping] = useState(false)

  // Compare & Catalog states
  const [compareList, setCompareList] = useState<string[]>([])
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})
  const [showCompareModal, setShowCompareModal] = useState(false)

  // Estimate total calculated budget
  const estimatedCost = selectedVenue + selectedPhotoPkg + selectedDecorTheme

  // Auto-populate filter from chat recommendation
  const handleAIQuery = (query: string, response: string, categoryFilter: string, cityFilter: string) => {
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: query }
    ])
    setIsTyping(true)

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: "ai", text: response }
      ])
      setIsTyping(false)
      setActiveCategory(categoryFilter)
      setSelectedCity(cityFilter)
    }, 1500)
  }

  const handleCustomChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const query = chatInput.trim()
    setChatMessages(prev => [...prev, { sender: "user", text: query }])
    setChatInput("")
    setIsTyping(true)

    // Simulate smart AI routing
    setTimeout(() => {
      let reply = "I've scanned our directory. Here are the elite vendors matching your queries. Adjust filters to refine."
      if (query.toLowerCase().includes("makeup") || query.toLowerCase().includes("salon")) {
        setActiveCategory("Makeup Artist")
        reply = "Showing Makeup Artists. Sarah Khan Bridal Salon matches beautifully for wedding look schedules!"
      } else if (query.toLowerCase().includes("lahore")) {
        setSelectedCity("Lahore, Punjab")
        reply = "Filtered to Lahore. Check out Usman Ali Photography and Floral Dreams Event Decor!"
      } else if (query.toLowerCase().includes("photo")) {
        setActiveCategory("Photography")
        reply = "Showing Photography specialists. Usman Ali is highly recommended with 4.9 stars!"
      }
      setChatMessages(prev => [...prev, { sender: "ai", text: reply }])
      setIsTyping(false)
    }, 1500)
  }

  // Card Drawer Expansion handler
  const toggleCardExpansion = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Compare toggle checkbox
  const handleCompareToggle = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(item => item !== id))
    } else {
      if (compareList.length >= 3) {
        alert("You can select up to 3 professionals to compare side-by-side.")
        return
      }
      setCompareList(prev => [...prev, id])
    }
  }

  const resetFilters = () => {
    setSelectedCity("All Cities")
    setSelectedVibe("All Vibes")
    setSearchQuery("")
    setActiveCategory("All")
  }

  // Calculated filter array
  const filteredVendors = MOCK_VENDORS.filter(v => {
    // Category Match
    if (activeCategory !== "All") {
      let match = false
      if (activeCategory === "Photographers" && v.category === "Photography") match = true
      else if (activeCategory === "Videographers" && v.category === "Videography") match = true
      else if (v.category.toLowerCase().includes(activeCategory.toLowerCase())) match = true
      if (!match) return false
    }

    // City Match
    if (selectedCity !== "All Cities") {
      const cleanCity = selectedCity.split(",")[0].trim().toLowerCase()
      if (!v.location.toLowerCase().includes(cleanCity)) return false
    }

    // Vibe/Theme Match
    if (selectedVibe !== "All Vibes") {
      if (v.theme !== selectedVibe) return false
    }

    // Text Query Match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim()
      const nMatch = v.name.toLowerCase().includes(q)
      const cMatch = v.category.toLowerCase().includes(q)
      const lMatch = v.location.toLowerCase().includes(q)
      if (!nMatch && !cMatch && !lMatch) return false
    }

    return true
  })

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-20 overflow-hidden relative text-slate-800">
        
        {/* Confetti elements background */}
        <div className="absolute top-12 left-0 w-[400px] h-[400px] bg-[#0F5B3E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 max-w-7xl space-y-12">
          
          {/* Hero Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-white border border-[#0F5B3E]/10 text-[#0F5B3E] text-[10px] font-black uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              NEXUS PLATFORM V2
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Explore Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37]">
                Event Professionals
              </span>
            </h1>
            <p className="text-xs lg:text-sm text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Plan, budget, and secure your event bookings with visual estimators, instant quote matches, and side-by-side verification checklists.
            </p>
          </div>

          {/* ================= BENTO GRID BLOCK ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Bento Pane 1: Event Architect (Budget Constructor) */}
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-[#E6E2DA] p-8 flex flex-col justify-between space-y-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#E6F0EC] text-[#0F5B3E] rounded-xl border border-[#0F5B3E]/10">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-slate-900 leading-none">Event Cost Bento Architect</h3>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Toggle packages to estimate your budget dynamically</span>
                  </div>
                </div>
                
                {/* Reset Bento settings */}
                <button 
                  onClick={() => {
                    setSelectedVenue(300000)
                    setSelectedPhotoPkg(75000)
                    setSelectedDecorTheme(150000)
                  }}
                  className="text-[10px] font-black text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1.5 rounded-full hover:bg-[#0F5B3E]/10 transition-colors"
                >
                  Reset Calculator
                </button>
              </div>

              {/* Slider Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Venue Tier Selector */}
                <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">1. Venue Setup Tier</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Garden Lounge", price: 150000 },
                      { label: "Luxury Marquee", price: 300000 },
                      { label: "Royal Ballroom", price: 500000 }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedVenue(opt.price)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedVenue === opt.price ? "border-[#0F5B3E] bg-[#0F5B3E]/5 ring-2 ring-[#0F5B3E]/10" : "border-slate-200 bg-white hover:border-slate-300"}`}
                      >
                        <span className="text-xs font-black block text-slate-800">{opt.label}</span>
                        <span className="text-[10px] text-[#0F5B3E] font-extrabold mt-1 block">Rs. {opt.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photography Selector */}
                <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">2. Media Package</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Mehndi Solo Standard", price: 45000 },
                      { label: "Shendi Deluxe Shoot", price: 75000 },
                      { label: "Complete Cinematic", price: 110000 }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedPhotoPkg(opt.price)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedPhotoPkg === opt.price ? "border-[#0F5B3E] bg-[#0F5B3E]/5 ring-2 ring-[#0F5B3E]/10" : "border-slate-200 bg-white hover:border-slate-300"}`}
                      >
                        <span className="text-xs font-black block text-slate-800">{opt.label}</span>
                        <span className="text-[10px] text-[#0F5B3E] font-extrabold mt-1 block">Rs. {opt.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decor Selector */}
                <div className="space-y-3 text-left">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">3. Decoration & Canopy</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Cozy Stage Decor", price: 90000 },
                      { label: "Grand Floral Corridor", price: 150000 },
                      { label: "Royal Mughal Layout", price: 250000 }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedDecorTheme(opt.price)}
                        className={`p-3 rounded-xl border text-left transition-all ${selectedDecorTheme === opt.price ? "border-[#0F5B3E] bg-[#0F5B3E]/5 ring-2 ring-[#0F5B3E]/10" : "border-slate-200 bg-white hover:border-slate-300"}`}
                      >
                        <span className="text-xs font-black block text-slate-800">{opt.label}</span>
                        <span className="text-[10px] text-[#0F5B3E] font-extrabold mt-1 block">Rs. {opt.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dynamic Budget Display bar */}
              <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-[#E6E2DA] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Estimated Booking Total</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-900">Rs. {estimatedCost.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-500">PKR</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[9px] text-slate-500 font-semibold max-w-[150px] leading-snug">
                    Calculated average based on Pakistani wedding service schedules.
                  </div>
                  <button 
                    onClick={() => alert(`Pre-booking matches for Rs. ${estimatedCost.toLocaleString()} package selected!`)}
                    className="px-5 py-2.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-wider whitespace-nowrap block"
                  >
                    Select Package
                  </button>
                </div>
              </div>

            </div>

            {/* Bento Pane 2: AI Quote Matcher Chatbot console */}
            <div className="lg:col-span-4 bg-slate-950 text-white rounded-[2.5rem] p-6 flex flex-col justify-between border border-slate-800 shadow-md h-[420px] lg:h-auto">
              
              <div className="flex items-center gap-2 pb-3 border-b border-slate-900">
                <div className="p-1.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg border border-[#D4AF37]/10 shrink-0">
                  <MessageSquareCode className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-extrabold text-white">AI Event Planner Matcher</h4>
                  <span className="text-[8px] text-slate-500 block leading-none mt-0.5">Instant matching wizard</span>
                </div>
              </div>

              {/* Chat log */}
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 scrollbar-none text-[10px] pr-1">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col text-left space-y-1 max-w-[85%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}
                  >
                    <span className={`px-3 py-2 rounded-2xl leading-normal font-medium ${msg.sender === "user" ? "bg-[#0F5B3E] text-white rounded-br-none" : "bg-slate-900 text-slate-300 rounded-bl-none border border-slate-800"}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl w-20 rounded-bl-none text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Chat Recommendation Shortcuts */}
              <div className="space-y-1.5 border-t border-slate-900 pt-3">
                <span className="text-[8px] font-black text-slate-500 tracking-wider uppercase block text-left">Quick Prompts:</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: "📸 Bridal Makeup Artists", query: "Who are makeup artists?", resp: "Sarah Khan Bridal Salon is available in Karachi for Nikkah pastel styling!", cat: "Makeup Artist", city: "Karachi, Sindh" },
                    { label: "📍 Lahore Event Decorators", query: "Find decorators in Lahore", resp: "Floral Dreams Decor specializes in Traditional Mughal stages in Lahore!", cat: "Decorator", city: "Lahore, Punjab" }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAIQuery(preset.query, preset.resp, preset.cat, preset.city)}
                      className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[8px] text-slate-300 transition-colors border border-slate-800 select-none"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Input form */}
                <form onSubmit={handleCustomChatSubmit} className="flex gap-1.5 pt-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI e.g. Lahore photographers..." 
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-white outline-none focus:border-[#D4AF37]"
                  />
                  <button type="submit" className="px-3 bg-[#D4AF37] hover:bg-[#c39e2e] text-slate-950 font-bold text-[10px] rounded-xl transition-colors">
                    Send
                  </button>
                </form>
              </div>

            </div>

          </div>

          {/* ================= CATALOG SECTION ================= */}
          <div className="space-y-6">
            
            {/* Filter Hub Toolbar */}
            <div className="bg-white rounded-3xl border border-[#E6E2DA] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs text-left">
              
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Search Bar inside Filters */}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search professionals..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold placeholder-slate-400 outline-none focus:bg-white focus:border-[#0F5B3E]"
                  />
                </div>

                {/* City select */}
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="All Cities">All Cities</option>
                  <option value="Lahore, Punjab">Lahore</option>
                  <option value="Karachi, Sindh">Karachi</option>
                  <option value="Islamabad, Capital">Islamabad</option>
                </select>

                {/* Vibe select */}
                <select 
                  value={selectedVibe} 
                  onChange={(e) => setSelectedVibe(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="All Vibes">All Style Vibes</option>
                  <option value="Traditional Mughal">Traditional Mughal</option>
                  <option value="Pastel Nikkah">Pastel Nikkah</option>
                  <option value="Modern Sufi Night">Modern Sufi Night</option>
                </select>
              </div>

              {/* Reset filter widget */}
              {(selectedCity !== "All Cities" || selectedVibe !== "All Vibes" || searchQuery !== "" || activeCategory !== "All") && (
                <button 
                  onClick={resetFilters}
                  className="text-xs font-black text-red-500 hover:text-red-700"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Category selection scroll bar */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {["All", "Photography", "Videography", "Makeup Artist", "Decorator"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border ${activeCategory === cat ? "bg-[#0F5B3E] border-[#0F5B3E] text-white shadow-2xs" : "bg-white border-[#E6E2DA] text-slate-500 hover:text-slate-700"}`}
                >
                  {cat === "All" ? "All Specialists" : cat}
                </button>
              ))}
            </div>

            {/* Vendor Catalog List with drawer menus */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {filteredVendors.length === 0 ? (
                <div className="col-span-full py-16 bg-white border border-[#E6E2DA] rounded-3xl text-center max-w-md mx-auto w-full">
                  <span className="text-3xl">🔍</span>
                  <h4 className="text-sm font-black text-slate-800 mt-3">No V2 Matches Found</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1 leading-normal">
                    Try adjusting the AI search console, selecting a different city, or resetting aesthetic theme parameters.
                  </p>
                </div>
              ) : (
                filteredVendors.map((vendor) => {
                  const isExpanded = !!expandedCards[vendor.id]
                  const isCompared = compareList.includes(vendor.id)
                  
                  return (
                    <div 
                      key={vendor.id}
                      className={`bg-white border rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-300 relative group shadow-2xs hover:shadow-md ${
                        vendor.isPremium ? "border-[#D4AF37]/50" : "border-[#E6E2DA]"
                      }`}
                    >
                      {/* Premium Accent badge */}
                      {vendor.isPremium && (
                        <div className="absolute top-3 left-3 bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#C9A227] px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest z-10 flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-2.5 h-2.5" /> Premium Pro
                        </div>
                      )}

                      {/* Cover Photo */}
                      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative shrink-0">
                        <img src={vendor.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={vendor.name} />
                        
                        {/* Compare checkbox overlay */}
                        <button
                          onClick={() => handleCompareToggle(vendor.id)}
                          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-wider border backdrop-blur-md flex items-center gap-1 transition-all ${
                            isCompared 
                              ? "bg-[#0F5B3E] border-transparent text-white shadow-sm" 
                              : "bg-white/90 border-slate-200 text-slate-500 hover:bg-white"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-2xs border flex items-center justify-center ${isCompared ? "bg-white border-transparent" : "border-slate-400 bg-white"}`}>
                            {isCompared && <span className="text-[#0F5B3E] text-[6px] font-black leading-none">✓</span>}
                          </div>
                          Compare
                        </button>
                      </div>

                      {/* Card Content body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          
                          {/* Label row */}
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-[#C9A227] uppercase tracking-widest">{vendor.category}</span>
                            <span className="text-slate-400">{vendor.theme}</span>
                          </div>

                          {/* Profile Avatar and Name */}
                          <div className="flex items-center gap-2">
                            <img src={vendor.avatar} className="w-7 h-7 rounded-full border border-slate-100 shrink-0 object-cover" alt="" />
                            <h4 className="text-xs font-black text-slate-800 line-clamp-1 leading-snug">
                              {vendor.name}
                            </h4>
                          </div>

                          {/* Rating and Reviews */}
                          <div className="flex items-center gap-1 text-[9px] font-extrabold text-slate-700">
                            <Star className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]" />
                            <span>{vendor.rating}</span>
                            <span className="text-slate-400">({vendor.reviews} reviews)</span>
                            <span className="mx-1.5 text-slate-300">•</span>
                            <span className="text-slate-500">{vendor.location.split(",")[0]}</span>
                          </div>

                          {/* Base rate badge */}
                          <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl px-3 py-1.5 flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-400">Starting Rate:</span>
                            <span className="text-[#0F5B3E] font-black">Rs. {vendor.price.toLocaleString()}+</span>
                          </div>

                          {/* Packages Accordion Drawer list inside card */}
                          <div className="pt-2">
                            <button
                              onClick={() => toggleCardExpansion(vendor.id)}
                              className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 flex items-center justify-center gap-1 transition-colors uppercase tracking-wider"
                            >
                              {isExpanded ? "Hide Pricing Tiers" : "Expand Pricing Tiers"}
                              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden space-y-1.5 pt-2"
                                >
                                  {[
                                    { key: "bronze", title: "Bronze Standard", data: vendor.packages.bronze },
                                    { key: "silver", title: "Silver Signature", data: vendor.packages.silver },
                                    { key: "gold", title: "Gold Cinematic", data: vendor.packages.gold }
                                  ].map((pkg) => (
                                    <div key={pkg.key} className="bg-[#FAF7F2]/60 rounded-xl p-2.5 border border-[#E6E2DA]/40 text-left space-y-1">
                                      <div className="flex justify-between items-baseline">
                                        <span className="text-[9px] font-black text-slate-800">{pkg.title}</span>
                                        <span className="text-[9px] font-black text-[#0F5B3E]">Rs. {pkg.data.price.toLocaleString()}</span>
                                      </div>
                                      <ul className="space-y-0.5 pl-2">
                                        {pkg.data.details.map((det, dIdx) => (
                                          <li key={dIdx} className="text-[8px] text-slate-400 font-semibold list-disc">
                                            {det}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                        </div>

                        {/* Bottom Actions inside Card */}
                        <div className="flex gap-2 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => alert(`Redirecting to vendor premium portfolio view for ID 1!`)}
                            className="flex-1 py-2 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white font-bold text-[10px] rounded-lg text-center transition-colors uppercase tracking-wider block"
                          >
                            Explore Profile
                          </button>
                          <button
                            onClick={() => alert(`Starting WhatsApp chat segment with ${vendor.name}!`)}
                            className="w-8 h-8 rounded-lg border border-[#E6E2DA] hover:bg-[#FAF7F2] flex items-center justify-center text-slate-400 hover:text-[#0F5B3E] transition-colors shrink-0"
                            title="Chat now"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  )
                })
              )}
            </div>

          </div>

          {/* ================= GUARANTEE POLICIES GRID ================= */}
          <div className="bg-white rounded-[2.5rem] border border-[#E6E2DA] p-8 text-left shadow-2xs">
            <div className="max-w-3xl space-y-2 mb-8">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5.5 h-5.5 text-[#0F5B3E]" /> Secure Event Bookings Guaranteed
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Every vendor listed on Nexus platform is fully authenticated under security standards. Protect your event deposits easily.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "ID & Contact Verification", desc: "Every professional verifies CNIC documentation, office addresses, and telephone lines before receiving bookings.", icon: CheckSquare },
                { title: "Nexus Escrow Protection", desc: "Securely lock deposits in our booking trust. Funds are only distributed to vendors upon successful completion of your event.", icon: DollarSign },
                { title: "Dispute Support 24/7", desc: "If issues occur during delivery, our Pakistan-based host helpline intervenes to solve problems and refund deposits.", icon: Clock }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E6E2DA] space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center shrink-0 border border-[#0F5B3E]/10">
                    <item.icon className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Compare Dock */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/95 backdrop-blur-md border border-slate-800 shadow-[0_20px_50px_rgba(5,46,32,0.25)] rounded-[2rem] p-4.5 z-40 animate-in slide-in-from-bottom-10 max-w-4xl w-[90%] flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-4 text-left">
            <div className="bg-[#0F5B3E] text-white px-3.5 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border border-emerald-500/20">
              {compareList.length} Selected
            </div>
            <div>
              <p className="text-white text-xs font-bold">Compare Packages Side-by-Side</p>
              <p className="text-slate-400 text-[10px] font-semibold mt-0.5">Evaluate package structures, rates, and availability slots.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCompareList([])}
              className="text-xs font-bold text-slate-400 hover:text-red-400 transition-colors px-3 cursor-pointer"
            >
              Clear All
            </button>
            <button 
              onClick={() => setShowCompareModal(true)}
              className="bg-[#D4AF37] hover:bg-[#c39e2e] text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-transform active:scale-95 shadow-md flex items-center gap-1.5 block"
            >
              Start Matrix <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal Panel Matrix */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl p-6 lg:p-8 flex flex-col relative text-slate-800 max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowCompareModal(false)}
                className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-left mb-6 border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black text-[#C9A227] uppercase tracking-widest">Nexus Platform</span>
                <h3 className="text-lg font-black text-slate-900 mt-1">Package Comparison Matrix</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Evaluate details and secure standard Escrow rates side-by-side.</p>
              </div>

              {/* Side-by-Side Matrix columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {compareList.map((id) => {
                  const vendor = MOCK_VENDORS.find(v => v.id === id)
                  if (!vendor) return null

                  return (
                    <div key={vendor.id} className="bg-[#FAF7F2]/50 border border-[#E6E2DA] rounded-2xl p-5 text-left flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-4">
                        {/* Header Details */}
                        <div className="flex items-center gap-3">
                          <img src={vendor.avatar} className="w-10 h-10 rounded-full border border-slate-200 object-cover shrink-0" alt="" />
                          <div>
                            <h4 className="text-xs font-black text-slate-900 leading-snug line-clamp-1">{vendor.name}</h4>
                            <span className="text-[9px] font-bold text-[#C9A227] uppercase tracking-wider">{vendor.category}</span>
                          </div>
                        </div>

                        {/* Specs grid */}
                        <div className="space-y-2 border-t border-slate-200/50 pt-3 text-[10px] font-semibold text-slate-600">
                          
                          <div className="flex justify-between items-center">
                            <span>Rating:</span>
                            <span className="font-extrabold text-slate-900 flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> {vendor.rating} ({vendor.reviews} reviews)
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>City Area:</span>
                            <span className="font-extrabold text-slate-900 flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" /> {vendor.location.split(",")[0]}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Vibe Theme:</span>
                            <span className="font-extrabold text-slate-900">{vendor.theme}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Next Available:</span>
                            <span className="font-extrabold text-[#0F5B3E] flex items-center gap-0.5">
                              <Clock className="w-3 h-3" /> {vendor.availableSlot}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Verified Badge:</span>
                            <span className="font-extrabold text-emerald-600">Secure Shield Verified</span>
                          </div>
                        </div>

                        {/* Pricing details */}
                        <div className="space-y-2 border-t border-slate-200/50 pt-3">
                          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Package Options</span>
                          
                          <div className="space-y-1.5">
                            <div className="bg-white p-2 rounded-lg border border-slate-200/50 flex justify-between items-center text-[9px] font-extrabold">
                              <span className="text-slate-700">Bronze:</span>
                              <span className="text-[#0F5B3E]">Rs. {vendor.packages.bronze.price.toLocaleString()}</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-slate-200/50 flex justify-between items-center text-[9px] font-extrabold">
                              <span className="text-slate-700">Silver:</span>
                              <span className="text-[#0F5B3E]">Rs. {vendor.packages.silver.price.toLocaleString()}</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg border border-slate-200/50 flex justify-between items-center text-[9px] font-extrabold">
                              <span className="text-slate-700">Gold:</span>
                              <span className="text-[#0F5B3E]">Rs. {vendor.packages.gold.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Select & Book */}
                      <button
                        onClick={() => {
                          setShowCompareModal(false)
                          alert(`Initiating Escrow Lock session for ${vendor.name}!`)
                        }}
                        className="w-full py-2 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white font-bold text-[10px] rounded-xl text-center uppercase tracking-wider block"
                      >
                        Book Specialist
                      </button>

                    </div>
                  )
                })}
              </div>

              {/* Reset Compare */}
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 font-bold text-xs rounded-xl transition-colors uppercase tracking-wider"
                >
                  Close Matrix
                </button>
                <button
                  onClick={() => {
                    setCompareList([])
                    setShowCompareModal(false)
                  }}
                  className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-colors uppercase tracking-wider"
                >
                  Clear Selection
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MegaFooter />
    </PublicLayout>
  )
}
