"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  X, Calendar, Users, Check, MessageSquare, ShieldCheck, 
  Star, Award, Info, Clock, Sparkles, Sliders, DollarSign, ChevronRight
} from 'lucide-react'

export interface HybridDetailItem {
  id: string
  type: 'venue' | 'photographer' | 'decorator' | 'package' | 'workforce'
  name: string
  category: string
  location: string
  rating: number
  reviews: number
  price: string // Base rate or starting price
  images: string[]
  avatar?: string
  badge?: string
  features?: string[]
  bookedDates?: string[]
  isVerified?: boolean
  isPremium?: boolean
}

interface HybridDetailDrawerProps {
  isOpen: boolean
  onClose: () => void
  item: HybridDetailItem | null
  onBookingSubmit: (bookingDetails: {
    itemId: string
    itemName: string
    category: string
    price: number
    type: 'rental' | 'gig'
    selectedTier?: 'Basic' | 'Standard' | 'Premium'
    startDate?: string
    endDate?: string
    seatingConfig?: string
    guestCount?: string
    requirements?: string
  }) => void
}

export function HybridDetailDrawer({ isOpen, onClose, item, onBookingSubmit }: HybridDetailDrawerProps) {
  // Common States
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'portfolio'>('details')
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'payment'>('form')
  const [paymentMethod, setPaymentMethod] = useState<'Raast' | 'EasyPaisa' | 'JazzCash' | 'Bank'>('Raast')
  
  // Airbnb (Rental/Space) States
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [seatingConfig, setSeatingConfig] = useState("Banquet Rounds")
  const [venueCapacity, setVenueCapacity] = useState(250)
  
  // Fiverr (Gig/Service) States
  const [selectedTier, setSelectedTier] = useState<'Basic' | 'Standard' | 'Premium'>('Standard')
  const [eventVibe, setEventVibe] = useState("")
  const [guestCount, setGuestCount] = useState("100 - 300 guests")
  const [requirements, setRequirements] = useState("")

  // Calculate pricing based on item starting rate
  const baseRate = item ? parseInt(item.price.replace(/,/g, ""), 10) || 50000 : 50000
  
  // Calculate gig package multipliers
  const getPackagePrice = (tier: 'Basic' | 'Standard' | 'Premium') => {
    if (tier === 'Basic') return Math.round(baseRate * 0.7)
    if (tier === 'Standard') return baseRate
    return Math.round(baseRate * 1.5)
  }

  // Calculate rental duration
  const [totalPrice, setTotalPrice] = useState(baseRate)
  useEffect(() => {
    if (item?.type === 'venue' || item?.type === 'workforce') {
      if (startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
        setTotalPrice(baseRate * diffDays)
      } else {
        setTotalPrice(baseRate)
      }
    } else {
      setTotalPrice(getPackagePrice(selectedTier))
    }
  }, [startDate, endDate, selectedTier, item])

  if (!isOpen || !item) return null

  const isRentalType = item.type === 'venue' || item.type === 'workforce'

  const handleProceed = () => {
    if (isRentalType && (!startDate || !endDate)) {
      alert("Please select both a Start Date and End Date.")
      return
    }
    setCheckoutStep('payment')
  }

  const handleCheckoutSubmit = () => {
    onBookingSubmit({
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      price: totalPrice,
      type: isRentalType ? 'rental' : 'gig',
      selectedTier: isRentalType ? undefined : selectedTier,
      startDate: isRentalType ? startDate : undefined,
      endDate: isRentalType ? endDate : undefined,
      seatingConfig: isRentalType ? seatingConfig : undefined,
      guestCount: isRentalType ? undefined : guestCount,
      requirements: isRentalType ? `Event Vibe: ${eventVibe}. Info: ${requirements}` : undefined
    })
    // Reset state
    setCheckoutStep('form')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl flex flex-col h-full z-10">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#E6E2DA] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-white">
              <img src={item.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150"} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-none">{item.name}</h3>
              <p className="text-xs text-[#0F5B3E] font-bold mt-1 uppercase tracking-wider">{item.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-200/50 rounded-full text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
          
          {/* Main Visual Carousel */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#E6E2DA]">
            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-black text-slate-900 flex items-center gap-1 shadow-sm border border-slate-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {item.rating} <span className="text-slate-500">({item.reviews} reviews)</span>
            </div>
            {item.isPremium && (
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-slate-950 font-black px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" /> Elite Pro
              </div>
            )}
          </div>

          {/* Details/Reviews Toggle Tab */}
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveSubTab('details')}
              className={`pb-2 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeSubTab === 'details' ? 'border-[#0F5B3E] text-[#0F5B3E]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Overview & Bookings
            </button>
            <button 
              onClick={() => setActiveSubTab('portfolio')}
              className={`pb-2 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeSubTab === 'portfolio' ? 'border-[#0F5B3E] text-[#0F5B3E]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Portfolio & Features
            </button>
          </div>

          {activeSubTab === 'details' ? (
            <div className="space-y-6">
              {checkoutStep === 'form' ? (
                <>
                  {/* AIRBNB RENTAL OR SPACE BOOKING FLOW */}
                  {isRentalType ? (
                    <div className="space-y-6">
                      
                      {/* Host Profile info card */}
                      <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-4 flex justify-between items-center text-left">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🏡</span>
                          <div>
                            <h4 className="text-xs font-black text-slate-800">Managed by Elite Host</h4>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Response Time: within 10 mins • Verified Account</p>
                          </div>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                          ✓ Identity Confirmed
                        </span>
                      </div>

                      {/* Date Range Selection (Airbnb style) */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#0F5B3E]" /> Select Dates
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Check In</label>
                            <input 
                              type="date" 
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-bold bg-white border border-[#E6E2DA] rounded-xl outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Check Out</label>
                            <input 
                              type="date" 
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-bold bg-white border border-[#E6E2DA] rounded-xl outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]"
                            />
                          </div>
                        </div>
                        
                        {item.bookedDates && item.bookedDates.length > 0 && (
                          <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-xl text-[10px] font-semibold">
                            ⚠️ This host has blocked dates: <span className="font-extrabold">{item.bookedDates.join(', ')}</span>. Please coordinate date locks.
                          </div>
                        )}
                      </div>

                      {/* Seating & Capacity Arrangement (Only for Venues) */}
                      {item.type === 'venue' && (
                        <div className="space-y-4">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                            <Sliders className="w-4 h-4 text-[#0F5B3E]" /> Floor Layout & Seating Configuration
                          </h4>

                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { name: "Banquet Rounds", desc: "Classic tables of 8, perfect for family seating" },
                              { name: "Theater Rows", desc: "Maximum capacity seating, oriented towards stage" },
                              { name: "U-Shape Seminar", desc: "Corporate layouts, ideal for presentations" },
                              { name: "Cabaret Clusters", desc: "Spaced crescent arrangements with service aisles" }
                            ].map((config) => (
                              <button
                                key={config.name}
                                onClick={() => setSeatingConfig(config.name)}
                                className={`p-3 rounded-xl border text-left transition-all ${seatingConfig === config.name ? 'border-[#0F5B3E] bg-[#0F5B3E]/5 ring-1 ring-[#0F5B3E]' : 'border-slate-200 hover:border-slate-300'}`}
                              >
                                <span className="text-xs font-extrabold text-slate-800 block">{config.name}</span>
                                <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{config.desc}</span>
                              </button>
                            ))}
                          </div>

                          {/* Seating Arrangement Graphic */}
                          <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-5 flex flex-col items-center space-y-4">
                            <div className="text-[10px] font-bold uppercase text-slate-400">Layout Preview for {venueCapacity} Guests ({seatingConfig})</div>
                            
                            {/* Grid Dots simulation */}
                            <div className="grid grid-cols-8 gap-3 py-2">
                              {Array.from({ length: 24 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold ${
                                    seatingConfig === "Theater Rows" 
                                      ? "bg-slate-400 text-white rounded-xs" 
                                      : seatingConfig === "U-Shape Seminar" 
                                        ? i % 8 === 0 || i < 8 || i % 8 === 7 
                                          ? "bg-[#0F5B3E] text-white" 
                                          : "opacity-10 bg-slate-300"
                                        : i % 4 === 0 
                                          ? "bg-[#D4AF37] ring-4 ring-[#D4AF37]/20 text-slate-900" 
                                          : "bg-slate-300 text-slate-600"
                                  }`}
                                >
                                  {seatingConfig === "Theater Rows" ? "■" : "●"}
                                </div>
                              ))}
                            </div>

                            {/* Dynamic Capacity Range */}
                            <div className="w-full space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                                <span>Min Capacity: 100</span>
                                <span>Selected: {venueCapacity} Guests</span>
                                <span>Max Capacity: 500</span>
                              </div>
                              <input 
                                type="range" 
                                min="100" 
                                max="500" 
                                step="25" 
                                value={venueCapacity}
                                onChange={(e) => setVenueCapacity(Number(e.target.value))}
                                className="w-full accent-[#0F5B3E]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    // FIVERR CREATIVE SERVICE BOOKING FLOW
                    <div className="space-y-6">
                      
                      {/* Service Badges Row */}
                      <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-1 bg-[#0F5B3E]/5 text-[#0F5B3E] border border-[#0F5B3E]/10 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                          <Award className="w-3.5 h-3.5 text-[#D4AF37]" /> Level 2 Professional
                        </span>
                        <span className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                          ★ 98% Order Completion
                        </span>
                      </div>

                      {/* Fiverr Tiered Packages tabs */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Select Package Tier</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">Select standard service templates</span>
                        </div>

                        {/* Three Tabs Toggle */}
                        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
                          {(['Basic', 'Standard', 'Premium'] as const).map((tier) => (
                            <button
                              key={tier}
                              onClick={() => setSelectedTier(tier)}
                              className={`py-2 px-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${selectedTier === tier ? 'bg-white text-[#0F5B3E] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>

                        {/* Package Details Display */}
                        <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-5 space-y-4 text-left">
                          <div className="flex justify-between items-baseline">
                            <h4 className="text-sm font-extrabold text-slate-800">{selectedTier} Custom Package</h4>
                            <span className="text-lg font-black text-[#0F5B3E]">Rs. {getPackagePrice(selectedTier).toLocaleString()}</span>
                          </div>

                          <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                            {selectedTier === 'Basic' && "Essential micro-services designed for short sessions, small gatherings, and digital raw asset deliverable formats."}
                            {selectedTier === 'Standard' && "Complete signature execution matching premier Pakistani aesthetic expectations. Includes standard reviews and albums."}
                            {selectedTier === 'Premium' && "Elite full-scale coverage with director-level operators, drones, cinematic custom editing suites, and premium physical album sets."}
                          </p>

                          <ul className="grid grid-cols-2 gap-2 border-t border-slate-200/50 pt-3 text-[10px] font-semibold text-slate-600">
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 
                              {selectedTier === 'Basic' ? '4 Hours Coverage' : selectedTier === 'Standard' ? '8 Hours Coverage' : 'Full-Day/Multi-Day'}
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              {selectedTier === 'Basic' ? '1 Lead Specialist' : selectedTier === 'Standard' ? '2 Team Members' : '3+ Crew Directors'}
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 
                              {selectedTier === 'Basic' ? '2 Revisions' : selectedTier === 'Standard' ? '5 Revisions' : 'Unlimited Revisions'}
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 
                              {selectedTier === 'Basic' ? '5 Days Delivery' : selectedTier === 'Standard' ? '10 Days Delivery' : 'Express 3 Days Delivery'}
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Fiverr Requirement intake questions */}
                      <div className="space-y-4 border-t border-slate-100 pt-4">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-[#0F5B3E]" /> Submit Requirements
                        </h4>

                        <div className="space-y-3">
                          <div>
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Event Vibe / Color Theme</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Mughal Gold / Pastel Pink Nikkah" 
                              value={eventVibe}
                              onChange={(e) => setEventVibe(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#E6E2DA] rounded-xl outline-none focus:border-[#0F5B3E]"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Guest Scale Range</label>
                            <select 
                              value={guestCount}
                              onChange={(e) => setGuestCount(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-bold bg-white border border-[#E6E2DA] rounded-xl outline-none focus:border-[#0F5B3E]"
                            >
                              <option>Under 100 guests</option>
                              <option>100 - 300 guests</option>
                              <option>300 - 500 guests</option>
                              <option>500+ guests</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1">Describe Custom Requirements</label>
                            <textarea 
                              rows={3}
                              placeholder="Describe your event parameters, specific styles, song preferences, or coordinator schedules..." 
                              value={requirements}
                              onChange={(e) => setRequirements(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-medium bg-white border border-[#E6E2DA] rounded-xl outline-none focus:border-[#0F5B3E] resize-none"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </>
              ) : (
                /* PAYMENT STEP - COMMON ESCROW DEPOSIT FLOW */
                <div className="space-y-6 text-left">
                  <div className="bg-[#FAF7F2] border border-[#E6E2DA] p-5 rounded-2xl space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Checkout Summary</span>
                    <div className="flex justify-between items-center font-extrabold text-sm border-b border-slate-200/50 pb-2">
                      <span className="text-slate-800">{item.name}</span>
                      <span className="text-[#0F5B3E]">Rs. {totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 pt-1">
                      <span>Category Booking:</span>
                      <span>{item.category}</span>
                    </div>
                    {isRentalType ? (
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>Date Range:</span>
                        <span>{startDate} to {endDate}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                        <span>Package Tier:</span>
                        <span>{selectedTier} Package</span>
                      </div>
                    )}

                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3.5 rounded-xl text-[10px] font-semibold leading-relaxed space-y-2 mt-2">
                      <div className="flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wider text-emerald-900">
                        <ShieldCheck className="w-4 h-4" /> Nexus Escrow Trust Active
                      </div>
                      <p>
                        Your deposit is held securely in the **Nexus trust system**. Funds will only be released to the vendor after you verify event completion or file uploads.
                      </p>
                    </div>
                  </div>

                  {/* Escrow Channel Methods */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Select Escrow Deposit Channel</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'Raast', name: 'Instant Raast ID', desc: 'Secure direct bank transfer' },
                        { id: 'EasyPaisa', name: 'EasyPaisa Wallet', desc: 'Mobile escrow authorization' },
                        { id: 'JazzCash', name: 'JazzCash Wallet', desc: 'Immediate transaction link' },
                        { id: 'Bank', name: 'Direct Bank Deposit', desc: 'Alfalah / Allied Bank escrow logs' }
                      ].map((ch) => (
                        <button
                          key={ch.id}
                          onClick={() => setPaymentMethod(ch.id as any)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${paymentMethod === ch.id ? 'border-[#0F5B3E] bg-[#0F5B3E]/5 ring-1 ring-[#0F5B3E]' : 'border-slate-200 hover:border-slate-300'}`}
                        >
                          <span className="text-xs font-black text-slate-800 block">{ch.name}</span>
                          <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">{ch.desc}</span>
                        </button>
                      ))}
                    </div>

                    {/* Escrow payout details warning */}
                    <div className="text-[10px] font-semibold text-slate-500 leading-normal bg-slate-50 border border-slate-200/50 p-3 rounded-xl flex gap-2 items-start">
                      <Info className="w-4 h-4 text-slate-400 shrink-0" />
                      <p>
                        A 3.5% Nexus processing fee is applied. P2P contracts have safe dispute coverage. Cancellation terms allow full refunds up to 7 days before execution.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* PORTFOLIO & AUDIT SHEET VIEW */
            <div className="space-y-6 text-left">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Representative Portfolios</h4>
                <div className="grid grid-cols-3 gap-2">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200" alt="" className="rounded-xl aspect-square object-cover" />
                  <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=200" alt="" className="rounded-xl aspect-square object-cover" />
                  <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=200" alt="" className="rounded-xl aspect-square object-cover" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Included Deliverable Checklist</h4>
                <div className="space-y-2.5">
                  {(item.features || ['Premium Gear Set', 'Fully Verified Logistics', 'Secure Backup Protection']).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center text-[10px] font-black">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Contract Policies</h4>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                  Deposit 20% to lock calendar slot, 80% remaining holds in escrow. Refund policy guarantees full payout returns if service provider reports collision or cancellation locks within 14 days of booking requests.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions bar */}
        <div className="p-6 border-t border-[#E6E2DA] bg-[#FAF7F2] mt-auto">
          {checkoutStep === 'form' ? (
            <div className="flex items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Estimated Total</span>
                <span className="text-lg font-black text-slate-900">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`Opening WhatsApp Chat with ${item.name} support!`)}
                  className="px-4 py-3 border border-[#E6E2DA] hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp
                </button>
                <button 
                  onClick={handleProceed}
                  className="px-6 py-3 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-transform active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  Proceed to Escrow <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <button 
                onClick={() => setCheckoutStep('form')}
                className="px-4 py-3 border border-[#E6E2DA] hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Back to Config
              </button>

              <button 
                onClick={handleCheckoutSubmit}
                className="flex-1 py-3 bg-[#0c5c3b] hover:bg-[#052e1d] text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-transform active:scale-95 shadow-md cursor-pointer block"
              >
                Secure Booking via {paymentMethod} Escrow
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
