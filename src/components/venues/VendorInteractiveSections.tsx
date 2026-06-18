"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Sparkles, Upload, Check, MessageSquare, Phone, Heart, Share2, Shield, CalendarCheck, ChevronRight, Star, ArrowRight } from "lucide-react"

// Types
type Category = "All" | "Bridal Wear" | "Groom Wear" | "Party Wear" | "Accessories"

interface InteractiveProps {
  vendorId: string
  vendorName: string
  startingPrice: number
  phone: string | null
}

export function VendorInteractiveSections({ vendorId, vendorName, startingPrice, phone }: InteractiveProps) {
  // Calendar State
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  
  // Try-On State
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tryOnSuccess, setTryOnSuccess] = useState(false)
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(null)

  // Favorites & Share State
  const [isFavorited, setIsFavorited] = useState(false)
  const [isShared, setIsShared] = useState(false)

  // Calendar reserved dates mock (June 2026)
  const reservedDates = [5, 6, 12, 13, 19, 20, 26, 27] // Peak Pakistani wedding weekends
  
  // AI Accessories Mock
  const accessories = [
    { id: "acc-1", name: "Kundan Heritage Choker Set", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300" },
    { id: "acc-2", name: "Gold Plated Zircon Jhumar", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300" },
    { id: "acc-3", name: "Designer Velvet Bridal Clutch", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=300" }
  ]

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setUserPhoto(reader.result as string)
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setTryOnSuccess(true)
      }, 2500) // Mock AI fitting time
    }
    reader.readAsDataURL(file)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setIsShared(true)
    setTimeout(() => setIsShared(false), 2000)
  }

  return (
    <div className="space-y-16">
      
      {/* ══ STICKY BOOKING BAR (Floating bottom bar) ══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] px-6 py-4 flex items-center justify-between md:px-12">
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Viewing Storefront</p>
            <h4 className="font-extrabold text-[#1A1A1A] text-sm">{vendorName}</h4>
          </div>
          <div className="border-l border-stone-200 pl-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2A378]">Invest from</p>
            <p className="text-lg font-black text-[#0F5B3E]">₨ {Number(startingPrice).toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href={`https://wa.me/${phone || "923001234567"}?text=Hi%20${encodeURIComponent(vendorName)},%20I'm%20interested%20in%20renting%20an%20outfit.`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 bg-[#25D366] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#20ba59] transition-all flex items-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-white" /> Chat Now
          </a>
          <button className="h-12 px-8 bg-[#0F5B3E] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#0a3f2b] transition-all shadow-md shadow-[#0F5B3E]/10">
            Book Fitting
          </button>
        </div>
      </div>

      {/* ══ QUICK ACTION GRID ══ */}
      <section className="bg-white rounded-[2rem] border border-stone-200/60 p-8 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#1A1A1A] font-heading mb-6 flex items-center gap-3">
          <span className="w-6 h-0.5 bg-[#C2A378]" /> Concierge & Actions
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <a 
            href={`https://wa.me/${phone || "923001234567"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-stone-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all text-center group"
          >
            <MessageSquare className="w-6 h-6 text-[#25D366] group-hover:scale-110 transition-transform mb-2" />
            <span className="text-xs font-bold text-stone-700">WhatsApp Store</span>
          </a>
          
          <a 
            href={`tel:${phone || "+923001234567"}`}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-stone-200 hover:border-[#0F5B3E] hover:bg-[#0F5B3E]/5 transition-all text-center group"
          >
            <Phone className="w-6 h-6 text-[#0F5B3E] group-hover:scale-110 transition-transform mb-2" />
            <span className="text-xs font-bold text-stone-700">Call Representative</span>
          </a>

          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50/30 transition-all text-center group"
          >
            <Heart className={`w-6 h-6 ${isFavorited ? "fill-rose-500 text-rose-500" : "text-stone-400"} group-hover:scale-110 transition-transform mb-2`} />
            <span className="text-xs font-bold text-stone-700">{isFavorited ? "In Wishlist" : "Save Favorite"}</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-stone-200 hover:border-[#C2A378] hover:bg-[#C2A378]/5 transition-all text-center group"
          >
            <Share2 className="w-6 h-6 text-[#C2A378] group-hover:scale-110 transition-transform mb-2" />
            <span className="text-xs font-bold text-stone-700">{isShared ? "Copied Link!" : "Share Store"}</span>
          </button>

          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center col-span-2 md:col-span-1">
            <span className="text-xs font-black text-[#0F5B3E]">1 hr</span>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Response Time</span>
          </div>
        </div>
      </section>

      {/* ══ VIRTUAL TRY-ON EXPERIENCE ══ */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#2E2A24] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2A378]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#0F5B3E]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold tracking-widest uppercase text-[#C2A378]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Virtual Studio
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              AI Virtual Try-On Experience
            </h2>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              Visualize how your dream wedding dress fits instantly. Upload a portrait photograph and our neural engine will render the bridal attire tailored to your posture.
            </p>
            <ul className="space-y-2.5 text-xs text-stone-300 font-medium">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C2A378]" /> Hyper-realistic drape and texture fit</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C2A378]" /> Automatic accessories matching suggestions</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#C2A378]" /> Side-by-side fitting comparisons</li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-inner">
              {!userPhoto ? (
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#C2A378]" />
                  </div>
                  <div>
                    <input type="file" id="tryon-upload" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    <label htmlFor="tryon-upload" className="px-5 py-2.5 bg-white text-stone-900 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-stone-100 transition-colors inline-block">
                      Upload Portrait
                    </label>
                    <p className="text-[10px] text-stone-400 mt-2 font-medium">JPEG or PNG, front-facing portrait works best</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Your photo</p>
                      <div className="relative aspect-[3/4] bg-stone-900 rounded-xl overflow-hidden border border-white/10">
                        <img src={userPhoto} alt="Original" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-[#C2A378] uppercase tracking-widest flex items-center gap-1">
                        {isProcessing ? "AI Modeling..." : "Try-On Render"}
                      </p>
                      <div className="relative aspect-[3/4] bg-stone-900 rounded-xl overflow-hidden border border-[#C2A378]/30 flex items-center justify-center">
                        {isProcessing ? (
                          <div className="text-center space-y-2">
                            <div className="w-8 h-8 border-2 border-[#C2A378] border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Draping Fabric...</p>
                          </div>
                        ) : (
                          <>
                            {/* Mock Rendered Image - superimposing head or showing beautiful dress */}
                            <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400" alt="Try On Result" className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-[#0F5B3E] text-white p-1 rounded-full"><Check className="w-3.5 h-3.5" /></div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {tryOnSuccess && (
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#C2A378]">Suggested Jewelry Matching</p>
                      <div className="grid grid-cols-3 gap-2">
                        {accessories.map(acc => (
                          <button 
                            key={acc.id}
                            onClick={() => setSelectedAccessory(acc.id === selectedAccessory ? null : acc.id)}
                            className={`p-1.5 rounded-xl border text-left transition-all ${selectedAccessory === acc.id ? "bg-white/10 border-[#C2A378]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                          >
                            <img src={acc.img} alt="" className="w-full aspect-square object-cover rounded-lg mb-1" />
                            <p className="text-[8px] font-bold leading-tight truncate">{acc.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setUserPhoto(null); setTryOnSuccess(false); }}
                      className="flex-1 py-2 rounded-xl bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      Reset Photo
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-[#0F5B3E] hover:bg-[#0c4a32] text-white text-[10px] font-bold uppercase tracking-widest transition-all">
                      Save Render
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE AVAILABILITY CALENDAR ══ */}
      <section className="bg-white rounded-[2rem] border border-stone-200/60 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-extrabold text-[#1A1A1A] font-heading flex items-center gap-3">
              <span className="w-6 h-0.5 bg-[#C2A378]" /> Availability Calendar
            </h3>
            <p className="text-xs text-stone-400 mt-1 font-semibold uppercase tracking-wider">Plan and block your rental date instantly</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-stone-100 border border-stone-200" /> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0F5B3E]/10 border border-[#0F5B3E]/20 text-[#0F5B3E]" /> Reserved (Peak)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Calendar Grid */}
          <div className="md:col-span-8 bg-stone-50/50 border border-stone-200/60 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-sm text-[#1A1A1A] font-heading uppercase tracking-widest">June 2026</h4>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Standard Slot</span>
            </div>
            
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Mock offset for June 1st, 2026 starting on Monday */}
              {Array.from({ length: 30 }).map((_, idx) => {
                const day = idx + 1
                const isReserved = reservedDates.includes(day)
                const isSelected = selectedDate === day
                
                return (
                  <button
                    key={day}
                    disabled={isReserved}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold border transition-all relative ${
                      isReserved 
                        ? "bg-[#0F5B3E]/5 border-[#0F5B3E]/10 text-stone-300 cursor-not-allowed" 
                        : isSelected
                          ? "bg-[#0F5B3E] border-[#0F5B3E] text-white shadow-md shadow-[#0F5B3E]/10"
                          : "bg-white border-stone-200 text-[#1A1A1A] hover:border-[#C2A378] hover:shadow-sm"
                    }`}
                  >
                    <span>{day}</span>
                    {isReserved && (
                      <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#0F5B3E]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Calendar Sidebar detail */}
          <div className="md:col-span-4 bg-stone-50 border border-stone-200/60 rounded-3xl p-6 space-y-4">
            <h4 className="font-extrabold text-sm text-[#1A1A1A] font-heading uppercase tracking-widest pb-2 border-b border-stone-200/60 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#C2A378]" /> Selection Info
            </h4>

            {selectedDate ? (
              <div className="space-y-3 text-stone-600">
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Selected Date</p>
                  <p className="text-base font-extrabold text-[#1A1A1A] mt-0.5">June {selectedDate}, 2026</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800 font-semibold leading-relaxed">
                    This slot is available! You can reserve now. Peak season slots hold a refundable security deposit.
                  </p>
                </div>
                <button className="w-full py-3 bg-[#0F5B3E] hover:bg-[#0c4a32] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md">
                  Reserve This Date
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-stone-400">
                <p className="text-xs font-medium">Select an available date on the calendar to check pricing and availability rules.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
