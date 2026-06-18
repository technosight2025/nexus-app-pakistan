"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Sparkles, Upload, Check, MessageSquare, Phone, Heart, Share2, Shield, CalendarCheck, ChevronRight, Star, ArrowRight, Eye, ShoppingBag, X, XCircle, Banknote, CreditCard, CheckCircle2 } from "lucide-react"

// Types
export interface Outfit {
  id: string
  name: string
  designer: string
  tag: string
  price: number
  deposit: number
  image: string
  sizes: string[]
  badge?: string
}

interface InteractiveFrameProps {
  storeSlug: string
  storeName: string
  phone: string
  vendorId?: string
  initialOutfits?: Outfit[]
}

// Seed Mock Outfits matching the screenshot
const MOCK_OUTFITS: Outfit[] = [
  {
    id: "outfit-1",
    name: "Zarlish",
    designer: "By Zuhair Murad",
    tag: "Bridal Wear",
    price: 45000,
    deposit: 25000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Most Rented"
  },
  {
    id: "outfit-2",
    name: "Sunehri",
    designer: "By Faraz Manan",
    tag: "Bridal Wear",
    price: 38000,
    deposit: 20000,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    badge: "New Arrival"
  },
  {
    id: "outfit-3",
    name: "Noor-e-Zainab",
    designer: "By Elan",
    tag: "Bridal Wear",
    price: 42000,
    deposit: 25000,
    image: "https://images.unsplash.com/photo-1596450514735-111a2faefa25?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Trending"
  },
  {
    id: "outfit-4",
    name: "Mahrukh",
    designer: "By Sana Safinaz",
    tag: "Bridal Wear",
    price: 48000,
    deposit: 25000,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    badge: "Premium"
  },
  {
    id: "outfit-5",
    name: "Sham-e-Ishq",
    designer: "By Nomi Ansari",
    tag: "Bridal Wear",
    price: 50000,
    deposit: 25000,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "Luxury"
  }
]

// Custom categories matching the design
const CATEGORIES = [
  { name: "Bridal Wear", count: 24, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300" },
  { name: "Groom Wear", count: 12, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300" },
  { name: "Party Wear", count: 35, img: "https://images.unsplash.com/photo-1596450514735-111a2faefa25?q=80&w=300" },
  { name: "Accessories", count: 18, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=300" },
  { name: "Designer Collections", count: 8, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300" },
  { name: "Jewelry", count: 15, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300" },
  { name: "Shoes & Bags", count: 22, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300" }
]

// Calendar configurations
const CALENDAR_DATES = [
  { day: 5, status: "reserved" },
  { day: 6, status: "reserved" },
  { day: 12, status: "reserved" },
  { day: 13, status: "reserved" },
  { day: 19, status: "reserved" },
  { day: 20, status: "reserved" },
  { day: 26, status: "reserved" },
  { day: 27, status: "reserved" },
  { day: 15, status: "peak" },
  { day: 16, status: "peak" },
  { day: 22, status: "peak" },
  { day: 23, status: "peak" }
]

export function StoreInteractiveFrame({ storeSlug, storeName, phone, vendorId = "a1c77aee-29ab-60ae-dd35-7c79570149d7", initialOutfits }: InteractiveFrameProps) {
  // Use DB outfits if available, otherwise fallback to seed mock outfits
  const outfitsList = initialOutfits && initialOutfits.length > 0 ? initialOutfits : MOCK_OUTFITS
  
  // Global Selection States
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit>(outfitsList[1] || outfitsList[0])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedFeaturedTab, setSelectedFeaturedTab] = useState<string>("Best Sellers")
  const [selectedEventTab, setSelectedEventTab] = useState<string>("Weddings")
  const [selectedDate, setSelectedDate] = useState<number | null>(25) // Default to 25 May 2026 as per booking bar
  const [selectedSize, setSelectedSize] = useState<string>("M")
  
  // AI Try-On States
  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tryOnSuccess, setTryOnSuccess] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  // Checkout Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Form States
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const [selectedCity, setSelectedCity] = useState("Lahore")
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery")

  // Handlers
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
      }, 2000)
    }
    reader.readAsDataURL(file)
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formattedDate = selectedDate 
        ? `2026-05-${String(selectedDate).padStart(2, '0')}` 
        : "2026-05-25"
        
      const response = await fetch("/api/rentals/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor_id: vendorId,
          outfit_id: selectedOutfit.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          start_date: formattedDate,
          payment_method: paymentMethod,
          total_price: selectedOutfit.price.toLocaleString(),
          size: selectedSize,
          address: shippingAddress,
          city: selectedCity,
          deposit: selectedOutfit.deposit
        })
      })

      if (!response.ok) {
        throw new Error("Failed to place booking request")
      }

      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsCheckoutOpen(false)
        // Reset form
        setCustomerName("")
        setCustomerPhone("")
        setShippingAddress("")
      }, 4000)
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter outfits based on category selection
  const filteredOutfits = selectedCategory === "All" 
    ? outfitsList 
    : outfitsList.filter(o => o.tag === selectedCategory)

  return (
    <div className="space-y-16">
      
      {/* ══ SHOP BY CATEGORY ══ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif text-[#1E1E1E]">Shop By Category</h2>
          <button className="text-xs font-bold text-[#C9A76A] hover:underline uppercase tracking-wider">View All Categories →</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <button 
              key={i}
              onClick={() => setSelectedCategory(cat.name)}
              className={`min-w-[160px] relative aspect-[3/4] rounded-2xl overflow-hidden group border transition-all ${
                selectedCategory === cat.name ? "border-[#C9A76A] ring-1 ring-[#C9A76A]" : "border-stone-200"
              }`}
            >
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                <p className="font-serif text-sm font-extrabold leading-tight">{cat.name}</p>
                <p className="text-[9px] text-stone-300 font-medium uppercase mt-0.5">{cat.count} Items Available</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══ FEATURED COLLECTION ══ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-serif text-[#1E1E1E]">Featured Collection</h2>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-2">
            {["Best Sellers", "New Arrivals", "Luxury Collection", "Celebrity Inspired", "Seasonal Collection"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFeaturedTab(tab)}
                className={`pb-2 px-1 relative transition-colors ${
                  selectedFeaturedTab === tab ? "text-[#C9A76A]" : "text-stone-400 hover:text-[#1E1E1E]"
                }`}
              >
                {tab}
                {selectedFeaturedTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A76A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {outfitsList.map((outfit) => (
            <div 
              key={outfit.id} 
              onClick={() => setSelectedOutfit(outfit)}
              className={`bg-white rounded-3xl border shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer ${
                selectedOutfit.id === outfit.id ? "border-[#C9A76A] ring-1 ring-[#C9A76A]" : "border-stone-200/60"
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
                <img src={outfit.image} alt={outfit.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                {outfit.badge && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#1E1E1E] border border-stone-200/20 shadow-sm">
                    {outfit.badge}
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest leading-none">{outfit.designer}</h4>
                  <h3 className="text-base font-serif text-[#1E1E1E] mt-1 line-clamp-1">{outfit.name}</h3>
                  <p className="text-[10px] text-stone-400 font-semibold mt-0.5 uppercase tracking-wider">Sizes: {outfit.sizes.join(", ")}</p>
                </div>
                
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-400 block uppercase tracking-widest leading-none">Rental</span>
                    <span className="text-base font-black text-[#0F5B3E] mt-1 block">PKR {outfit.price.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-stone-400 block uppercase tracking-widest leading-none">Deposit</span>
                    <span className="text-xs font-bold text-[#1E1E1E] mt-1 block">PKR {outfit.deposit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button className="flex-1 py-2 bg-[#F7F1E8] text-[#C9A76A] text-[9px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A76A] hover:text-white transition-all">
                    Availability
                  </button>
                  <button className="p-2 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:bg-rose-50/50 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ THREE COLUMN GRID (Availability Calendar, Try-On, Recommendations) ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Col 1: Check Availability Calendar */}
        <div className="lg:col-span-4 bg-white border border-stone-200/60 rounded-[2.5rem] p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-serif text-[#1E1E1E] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#C9A76A] rounded-full" /> Check Availability
          </h3>
          
          {/* Calendar Selector */}
          <div className="bg-stone-50/50 border border-stone-200/60 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 font-heading">May 2026</span>
              <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">Select Date</span>
            </div>

            {/* Calendar grid mock */}
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-stone-400 uppercase mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }).map((_, idx) => {
                const day = idx + 1
                const statusObj = CALENDAR_DATES.find(c => c.day === day)
                const isSelected = selectedDate === day
                
                let btnStyle = "bg-white border-stone-100 text-[#1E1E1E] hover:border-[#C9A76A]"
                if (statusObj?.status === "reserved") {
                  btnStyle = "bg-rose-50/50 border-rose-100/50 text-stone-300 cursor-not-allowed"
                } else if (statusObj?.status === "peak") {
                  btnStyle = "bg-amber-50/50 border-amber-100 text-[#C9A76A]"
                }

                if (isSelected) {
                  btnStyle = "bg-[#C9A76A] border-[#C9A76A] text-white shadow-sm font-bold"
                }

                return (
                  <button
                    key={day}
                    disabled={statusObj?.status === "reserved"}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-lg flex items-center justify-center text-[10px] border transition-all ${btnStyle}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1 block">Selected Dress</label>
              <select 
                value={selectedOutfit.id} 
                onChange={(e) => {
                  const out = outfitsList.find(o => o.id === e.target.value)
                  if (out) setSelectedOutfit(out)
                }}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
              >
                {outfitsList.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1 block">Select Size</label>
                <select 
                  value={selectedSize} 
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                >
                  {selectedOutfit.sizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1 block">Selected Date</label>
                <div className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold">
                  {selectedDate ? `${selectedDate} May 2026` : "Pick date"}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3 bg-[#C9A76A] hover:bg-[#b0925c] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-[#C9A76A]/15"
            >
              Book Outfit Now
            </button>
          </div>
        </div>

        {/* Col 2: Virtual Try-On */}
        <div className="lg:col-span-4 bg-white border border-stone-200/60 rounded-[2.5rem] p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-serif text-[#1E1E1E] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#C9A76A] rounded-full" /> Virtual Try-On
            </span>
            <span className="text-[8px] font-bold text-stone-400 uppercase bg-stone-100 px-2 py-0.5 rounded-full">AI Fitting</span>
          </h3>

          {!userPhoto ? (
            <div className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center">
                <Upload className="w-5 h-5 text-[#C9A76A]" />
              </div>
              <div className="space-y-2">
                <input type="file" id="portal-upload" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <label htmlFor="portal-upload" className="px-4 py-2 bg-[#1E1E1E] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-black transition-colors inline-block">
                  Upload Photo
                </label>
                <p className="text-[9px] text-stone-450 font-medium leading-relaxed">Drag portrait or browse to render AI drape preview</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 flex items-center justify-center">
                {isProcessing ? (
                  <div className="text-center space-y-2">
                    <div className="w-6 h-6 border-2 border-[#C9A76A] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#C9A76A]">AI draping...</p>
                  </div>
                ) : (
                  <>
                    <img src={selectedOutfit.image} alt="Try On Render" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-[#0F5B3E] text-white p-1 rounded-full"><Check className="w-3.5 h-3.5" /></div>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setUserPhoto(null); setTryOnSuccess(false); }} className="flex-1 py-2 bg-stone-50 border border-stone-200 text-[#1E1E1E] text-[9px] font-bold uppercase tracking-widest rounded-xl hover:bg-stone-100 transition-colors">
                  Reset
                </button>
                <button className="flex-1 py-2 bg-[#C9A76A] text-white text-[9px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#b0925c] transition-colors">
                  Apply Fitting
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Col 3: Style Recommendations */}
        <div className="lg:col-span-4 bg-white border border-stone-200/60 rounded-[2.5rem] p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-serif text-[#1E1E1E] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#C9A76A] rounded-full" /> Style Suggestions
          </h3>
          
          <div className="space-y-4">
            {outfitsList.slice(2, 5).map((rec) => (
              <div 
                key={rec.id} 
                onClick={() => setSelectedOutfit(rec)}
                className="flex gap-3 bg-stone-50/50 p-2.5 rounded-xl border border-stone-100 hover:border-[#C9A76A] transition-all cursor-pointer group"
              >
                <div className="w-14 h-18 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                  <img src={rec.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-[10px] font-serif text-[#1E1E1E] line-clamp-1">{rec.name}</h4>
                    <p className="text-[8px] font-bold text-[#C9A76A] uppercase tracking-widest mt-0.5">{rec.designer}</p>
                  </div>
                  <p className="text-[11px] font-black text-[#0F5B3E]">PKR {rec.price.toLocaleString()}</p>
                </div>
                <button className="self-center p-2 rounded-lg border border-stone-200 text-stone-400 group-hover:border-[#C9A76A] group-hover:text-[#C9A76A] transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-[#1E1E1E] hover:bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md">
            Explore All Recommendations
          </button>
        </div>

      </div>

      {/* ══ REAL EVENTS GALLERY ══ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-serif text-[#1E1E1E]">Real Events, Real Stories</h2>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-2">
            {["Weddings", "Walima", "Nikkah", "Mehndi", "Engagement", "Corporate Events"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedEventTab(tab)}
                className={`pb-2 px-1 relative transition-colors ${
                  selectedEventTab === tab ? "text-[#C9A76A]" : "text-stone-400 hover:text-[#1E1E1E]"
                }`}
              >
                {tab}
                {selectedEventTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A76A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry mock */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400",
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=400"
          ].map((img, idx) => (
            <div key={idx} className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 group">
              <img src={img} alt="Real Wedding Showcase" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white border border-white/40 px-3 py-1.5 rounded-full backdrop-blur-sm">View Story</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ STICKY BOOKING BAR (Floating bottom utility) ══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 md:px-12">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-12 h-16 bg-stone-200 rounded-lg overflow-hidden border border-stone-200 shrink-0">
            <img src={selectedOutfit.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <span className="hidden sm:block text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">{selectedOutfit.designer}</span>
            <h4 className="hidden sm:block font-serif text-sm font-extrabold text-[#1E1E1E] mt-0.5">{selectedOutfit.name}</h4>
            
            {/* Price (Visible on both mobile & desktop) */}
            <div className="sm:hidden text-xs font-bold text-[#1E1E1E]">
              <span className="text-sm font-black text-[#0F5B3E]">PKR {selectedOutfit.price.toLocaleString()}</span> / day
            </div>
            
            <div className="hidden sm:flex gap-2 text-[9px] font-bold text-[#C9A76A] uppercase tracking-wider mt-1">
              <span>Rental: PKR {selectedOutfit.price.toLocaleString()}</span>
              <span className="text-stone-300">|</span>
              <span>Deposit: PKR {selectedOutfit.deposit.toLocaleString()}</span>
            </div>
            
            {/* Date Summary on mobile */}
            <span className="sm:hidden text-[9px] font-bold text-stone-500 uppercase tracking-wider block mt-0.5">
              Size: {selectedSize} • {selectedDate ? `${selectedDate} May 2026` : "Select Date"}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-stone-600">
          <div className="hidden md:block">
            <span className="text-[9px] font-bold text-stone-400 block uppercase tracking-widest">Selected Size</span>
            <span className="text-stone-700 font-extrabold block mt-0.5">{selectedSize}</span>
          </div>
          <div className="border-l border-stone-200 pl-4">
            <span className="text-[9px] font-bold text-stone-400 block uppercase tracking-widest">Event Date</span>
            <span className="text-stone-700 font-extrabold block mt-0.5">{selectedDate ? `${selectedDate} May 2026` : "Select Date"}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 w-auto shrink-0">
          <button 
            onClick={() => {
              window.open(`https://wa.me/${phone}?text=Hi!%20I'm%20interested%20in%20renting%20${selectedOutfit.name}%20for%20my%20event%20on%20${selectedDate}%20May%25202026.`, "_blank")
            }}
            className="p-3 border border-[#25D366] text-[#25D366] rounded-xl hover:bg-[#25D366]/5 transition-all flex items-center justify-center gap-2"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
            <span className="hidden md:inline text-[9px] font-bold uppercase tracking-widest">Chat Store</span>
          </button>
          <button 
            onClick={() => setIsCheckoutOpen(true)}
            className="px-5 sm:px-8 py-3 bg-[#1E1E1E] text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-md shadow-black/10"
          >
            Book Now
          </button>
          <button 
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-3 border border-stone-200 text-stone-400 hover:text-rose-500 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* ══ LUXURY CHECKOUT MODAL (Pakistani Market Optimized) ══ */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setIsCheckoutOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }} 
                className="w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-50 my-4 border border-stone-200 flex flex-col"
                onClick={e => e.stopPropagation()}
              >
              {isSuccess ? (
                <div className="p-6 sm:p-12 text-center space-y-6 overflow-y-auto">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-black text-[#1E1E1E]">Booking Requested Successfully!</h3>
                    <p className="text-stone-500 text-sm font-medium max-w-md mx-auto">
                      Your rental request for <strong className="text-stone-800">{selectedOutfit.name}</strong> has been registered. The boutique team will reach out to you via WhatsApp shortly to finalize custom fitting & security deposit transfer.
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl max-w-md mx-auto">
                    <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider">What's Next?</p>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">
                      Keep your CNIC copy ready. You will receive a WhatsApp message within 15-30 minutes for order verification.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#C9A76A] uppercase tracking-widest block">Nexus Rental Concierge</span>
                      <h3 className="text-xl font-serif text-[#1E1E1E] font-black mt-1">Secure Checkout</h3>
                    </div>
                    <button 
                      onClick={() => setIsCheckoutOpen(false)} 
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-50 border border-stone-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-stone-500" />
                    </button>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto no-scrollbar">
                    
                    {/* Item Summary Banner */}
                    <div className="flex gap-4 bg-[#FAF6F0] p-4 rounded-3xl border border-stone-200/50">
                      <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-white">
                        <img src={selectedOutfit.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">{selectedOutfit.designer}</span>
                          <h4 className="font-serif text-sm font-extrabold text-[#1E1E1E] mt-1">{selectedOutfit.name}</h4>
                          <p className="text-[10px] text-stone-500 font-bold uppercase mt-0.5">Size Selected: {selectedSize} | Date: {selectedDate ? `${selectedDate} May 2026` : "25 May 2026"}</p>
                        </div>
                        <div className="flex justify-between items-end border-t border-stone-200/40 pt-1.5">
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Total Price</span>
                          <span className="font-black text-[#0F5B3E] text-base">PKR {selectedOutfit.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Left: Contact Info */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-widest border-b border-stone-100 pb-2">1. Client Details</h4>
                        
                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">Full Name</label>
                          <input 
                            required 
                            type="text"
                            value={customerName} 
                            onChange={e => setCustomerName(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#C9A76A] focus:ring-1 focus:ring-[#C9A76A] outline-none font-semibold transition-all text-xs text-[#1E1E1E]" 
                            placeholder="e.g., Aisha Malik" 
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">WhatsApp Number</label>
                          <input 
                            required 
                            type="tel"
                            value={customerPhone} 
                            onChange={e => setCustomerPhone(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#C9A76A] focus:ring-1 focus:ring-[#C9A76A] outline-none font-semibold transition-all text-xs text-[#1E1E1E]" 
                            placeholder="e.g., 03001234567" 
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">Select City</label>
                          <select 
                            value={selectedCity} 
                            onChange={e => setSelectedCity(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#C9A76A] focus:ring-1 focus:ring-[#C9A76A] outline-none font-semibold transition-all text-xs text-[#1E1E1E] bg-white"
                          >
                            {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Gujranwala", "Sialkot", "Quetta"].map(city => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 block">Shipping Address</label>
                          <textarea 
                            required 
                            rows={2}
                            value={shippingAddress} 
                            onChange={e => setShippingAddress(e.target.value)} 
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#C9A76A] focus:ring-1 focus:ring-[#C9A76A] outline-none font-semibold transition-all text-xs text-[#1E1E1E]" 
                            placeholder="Complete street address & sector..."
                          />
                        </div>
                      </div>

                      {/* Right: Payment Details */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-widest border-b border-stone-100 pb-2">2. Payment & Verification</h4>
                        
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 block">Choose Payment Method</label>
                          
                          <div className="grid grid-cols-1 gap-2">
                            {[
                              { id: "Cash on Delivery", label: "Cash on Delivery / Pickup", desc: "Pay rental fee on delivery. Note: Security deposit transfer required first." },
                              { id: "Bank Transfer", label: "Direct Bank Transfer (IBFT)", desc: "Transfer direct to Meezan Bank / Alfa accounts." },
                              { id: "EasyPaisa", label: "EasyPaisa / JazzCash Mobile Wallet", desc: "Instant mobile wallet transfer." }
                            ].map(method => (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => setPaymentMethod(method.id)}
                                className={`p-3 rounded-2xl border text-left transition-all flex flex-col gap-1 ${
                                  paymentMethod === method.id 
                                    ? "border-[#C9A76A] bg-[#FAF6F0]" 
                                    : "border-stone-200 hover:border-stone-300 bg-white"
                                }`}
                              >
                                <span className="text-xs font-bold text-[#1E1E1E] flex items-center gap-2">
                                  <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                                    paymentMethod === method.id ? "border-[#C9A76A] bg-[#C9A76A]" : "border-stone-300"
                                  }`}>
                                    {paymentMethod === method.id && <span className="w-1 h-1 rounded-full bg-white" />}
                                  </span>
                                  {method.label}
                                </span>
                                <span className="text-[9px] text-stone-500 font-semibold leading-relaxed pl-5">{method.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Direct Bank Details display */}
                        {paymentMethod === "Bank Transfer" && (
                          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-2xl space-y-2 text-[10px] font-semibold text-stone-600">
                            <p className="text-stone-850 font-bold uppercase tracking-wider text-[9px]">Meezan Bank Details:</p>
                            <div className="flex justify-between"><span>Account Title:</span> <span className="font-extrabold text-[#1E1E1E]">{storeName} Rentals</span></div>
                            <div className="flex justify-between"><span>Account Number:</span> <span className="font-extrabold text-[#1E1E1E]">0234-010583920-01</span></div>
                            <div className="flex justify-between"><span>IBAN:</span> <span className="font-extrabold text-[#1E1E1E]">PK64MEZN00023401058392001</span></div>
                          </div>
                        )}

                        {/* EasyPaisa Details display */}
                        {paymentMethod === "EasyPaisa" && (
                          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-2xl space-y-2 text-[10px] font-semibold text-stone-600">
                            <p className="text-stone-850 font-bold uppercase tracking-wider text-[9px]">Mobile Wallet Details:</p>
                            <div className="flex justify-between"><span>EasyPaisa Number:</span> <span className="font-extrabold text-[#1E1E1E]">0300-1234567</span></div>
                            <div className="flex justify-between"><span>EasyPaisa Title:</span> <span className="font-extrabold text-[#1E1E1E]">Hiraa Ahmed</span></div>
                            <div className="flex justify-between"><span>JazzCash Number:</span> <span className="font-extrabold text-[#1E1E1E]">0312-7654321</span></div>
                          </div>
                        )}

                        {/* Security Deposits / Verification Callout */}
                        <div className="p-3 bg-stone-50 border border-stone-200/60 rounded-2xl flex items-start gap-2.5">
                          <Shield className="w-5 h-5 text-[#C9A76A] shrink-0 mt-0.5" />
                          <div className="text-[9px] font-medium leading-relaxed text-stone-500">
                            <span className="font-extrabold text-stone-850 block">Refundable Security Deposit: PKR {selectedOutfit.deposit.toLocaleString()}</span>
                            Security deposit and a copy of CNIC is required before or at delivery. Deposit is fully refunded after inspection.
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex items-center justify-between gap-4">
                      <button 
                        type="button" 
                        onClick={() => setIsCheckoutOpen(false)}
                        className="px-6 py-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Back
                      </button>
                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="flex-1 py-3.5 bg-[#C9A76A] hover:bg-[#b0925c] disabled:opacity-50 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-[#C9A76A]/15 text-center"
                      >
                        {isSubmitting ? "Processing Request..." : `Place Rental Request (PKR ${selectedOutfit.price.toLocaleString()})`}
                      </button>
                    </div>
                  </form>
                </>
              )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
