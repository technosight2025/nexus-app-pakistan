"use client"
import React, { useState } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { ProfileSubNav } from "@/components/layout/ProfileSubNav"
import { MegaFooter } from "@/components/layout/MegaFooter"
import Image from "next/image"
import Link from "next/link"
import { 
  MapPin, Star, Share2, Heart, Award, ShieldCheck, 
  CheckCircle2, ChevronRight, Users, Car, Coffee, 
  Music, Wifi, Sparkles, Calendar, Shield, ArrowRight,
  Sun, Moon, Home, Clock, X, Eye
} from "lucide-react"
import Confetti from "react-confetti"

const FARMHOUSE = {
  name: "Green Meadows Farmhouse",
  type: "Luxury Escape & Boutique Event Lawn",
  location: "Main Bedian Road, Near DHA Phase 6, Lahore",
  rating: 4.8,
  reviews: 86,
  basePrice: 180000,
  capacity: "100 - 450 guests",
  about: "Green Meadows Farmhouse is Lahore's premier private sanctuary for luxury boutique events and serene family escapes. Spanning over 8 kanals of manicured grass, the property features a gorgeous temperature-controlled swimming pool, a fully-furnished contemporary AC lounge, private luxury suites, and a dedicated catering setup area. Perfect for intimate Nikahs, vibrant Mehndis, corporate retreats, and premium pool side gatherings.",
  amenities: [
    { name: "Private Pool", icon: Sun, desc: "Temperature-controlled swimming pool" },
    { name: "Lush Lawns", icon: Home, desc: "Capacity up to 450 guests" },
    { name: "AC Lounge & Suites", icon: Coffee, desc: "Fully furnished indoor space" },
    { name: "High-speed WiFi", icon: Wifi, desc: "Coverage across the lawn" },
    { name: "Gated Parking", icon: Car, desc: "Secure parking for 50+ vehicles" },
    { name: "Power Backup", icon: Sparkles, desc: "Heavy-duty 100kVA generator" }
  ],
  packages: [
    { 
      name: "Day picnic Escape", 
      price: 180000, 
      duration: "10 AM - 6 PM",
      desc: "Perfect for daytime corporate retreats, pool parties, and family picnics.",
      features: ["Full Pool Access", "Lounge & 1 Bedroom Suite", "Sound System Setup", "Bring Your Own Food allowed"] 
    },
    { 
      name: "Boutique Event / Nikah", 
      price: 240000, 
      duration: "5 PM - 1 AM",
      desc: "Ideal for intimate Nikahs, Mayuns, and high-end formal gatherings.",
      features: ["Full Lawn Decoration Space", "Bridal Preparation Room", "Valet Parking Coordinator", "Heavy Duty Generator Backup", "Event Coordination Assistant"] 
    },
    { 
      name: "Full 24-Hour Staycation", 
      price: 360000, 
      duration: "24 Hours (Overnight)",
      desc: "The ultimate private luxury getaway with overnight accommodation.",
      features: ["Full Estate Access", "2 Luxury Bedrooms Stay", "Dedicated Butler Service", "Complimentary Breakfast", "Night Lighting & Security"] 
    }
  ],
  images: [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop", // Villa and lawn
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop", // Pool view
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", // Modern lounge
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop", // night view
  ]
}

const ALL_AMENITIES_CATEGORIZED = {
  outdoors: [
    { name: "Private Pool", desc: "Clean, temperature-controlled water" },
    { name: "Manicured Lawns", desc: "Perfect for events and seating" },
    { name: "Outdoor BBQ Grill", desc: "Dedicated live grilling section" },
    { name: "Fairy Lights & Lighting", desc: "Magical atmosphere setup" },
    { name: "Gazebo & Sitting Area", desc: "Comfy shaded garden seating" },
    { name: "Children Play Area", desc: "Swings and open space" }
  ],
  indoors: [
    { name: "AC Lounge Area", desc: "Fully air-conditioned modern sitting" },
    { name: "2 Luxury Bed Suites", desc: "For overnight stay and bridal prep" },
    { name: "Ensuite Bathrooms", desc: "Prisine condition with toiletries" },
    { name: "Modern Kitchen", desc: "Equipped with fridge, microwave, gas" },
    { name: "Smart TV & Soundbar", desc: "Indoor entertainment setup" },
    { name: "Snooker / Pool Table", desc: "Premium billiard recreation board" }
  ],
  facilities: [
    { name: "100kVA Generator", desc: "Automatic backup power generator" },
    { name: "High-Speed WiFi", desc: "Full coverage across house and pool" },
    { name: "Secure Gated Parking", desc: "Capacity for 50+ vehicles inside" },
    { name: "CCTV Security", desc: "24/7 camera surveillance of gate" },
    { name: "On-site Helper staff", desc: "For housekeeping and coordination" },
    { name: "Wheelchair Access", desc: "Ramps for elderly and disabled guests" }
  ]
}

export default function GreenMeadowsPage() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [selectedDate, setSelectedDate] = useState("2026-06-25")
  const [guestCount, setGuestCount] = useState(150)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false)

  // Interactive booking details
  const currentPrice = FARMHOUSE.packages[selectedPackage].price
  const securityDeposit = Math.round(currentPrice * 0.15) // 15% deposit
  const serviceFee = 7500
  const totalPrice = currentPrice + securityDeposit + serviceFee

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfetti(true)
    setBookingSuccess(true)
  }

  // Simple calendar dates helper
  const availableDates = ["2026-06-20", "2026-06-22", "2026-06-25", "2026-06-26", "2026-06-29", "2026-06-30"]

  return (
    <PublicLayout>
      <ProfileSubNav price={FARMHOUSE.basePrice} priceSuffix="/ event" targetWidgetId="booking-widget" />
      <div className="bg-white min-h-screen pb-24 font-sans text-slate-800 selection:bg-[#16423C] selection:text-white relative">
        {showConfetti && (
          <Confetti
            recycle={false}
            numberOfPieces={200}
            className="fixed inset-0 z-[1000] pointer-events-none"
          />
        )}

        {/* ══ BREADCRUMBS ROW ══ */}
        <div className="bg-white border-b border-stone-200/50 py-4.5">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
              <Link href="/" className="hover:text-[#16423C] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/venues" className="hover:text-[#16423C] transition-colors">Venues</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#16423C] font-extrabold">{FARMHOUSE.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 hover:text-rose-500 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{isFavorite ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══ AIRBNB-STYLE HERO GRID ══ */}
        <div id="gallery" className="max-w-7xl mx-auto px-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[45vh] md:h-[55vh] rounded-3xl overflow-hidden shadow-sm border border-stone-200/40">
            {/* Main Image */}
            <div className="md:col-span-2 relative h-full group overflow-hidden">
              <Image 
                src={FARMHOUSE.images[0]} 
                alt="Green Meadows Main View" 
                fill 
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Gallery Columns */}
            <div className="hidden md:grid grid-rows-2 gap-3 h-full">
              <div className="relative h-full overflow-hidden group">
                <Image 
                  src={FARMHOUSE.images[1]} 
                  alt="Pool View" 
                  fill 
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                />
              </div>
              <div className="relative h-full overflow-hidden group">
                <Image 
                  src={FARMHOUSE.images[2]} 
                  alt="AC Lounge" 
                  fill 
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700" 
                />
              </div>
            </div>

            <div className="hidden md:block relative h-full overflow-hidden group">
              <Image 
                src={FARMHOUSE.images[3]} 
                alt="Night Lighting" 
                fill 
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center cursor-pointer hover:bg-black/45 transition-colors">
                <span className="text-white font-bold text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/30 hover:bg-white hover:text-slate-900 transition-all shadow-md">
                  View Gallery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ MAIN GRID LAYOUT ══ */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Area (Col 7) */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Header Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-[#16423C] text-[10px] font-black uppercase tracking-widest rounded-full">
                    <Award className="w-3.5 h-3.5" /> Verified Partner
                  </span>
                  <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">• Private Farmhouse</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 tracking-tight leading-tight">
                  {FARMHOUSE.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#16423C]" />
                    <span>{FARMHOUSE.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-900">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{FARMHOUSE.rating}</span>
                    <span className="underline decoration-stone-300 font-medium text-stone-400">({FARMHOUSE.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#16423C]" />
                    <span>{FARMHOUSE.capacity}</span>
                  </div>
                </div>
              </div>

              <hr className="border-stone-200/50" />

              {/* PREMIUM DESIGN ADDITION 1: KEY HIGHLIGHTS SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm">
                <div className="flex gap-3">
                  <Sun className="w-5 h-5 text-[#16423C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight">Private Pool Access</p>
                    <p className="text-[10px] text-stone-400 font-semibold mt-0.5 leading-tight">Temperature-controlled pool with maximum security</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-[#16423C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight">100% Power Backup</p>
                    <p className="text-[10px] text-stone-400 font-semibold mt-0.5 leading-tight">Heavy-duty 100kVA generator backup on outage</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-[#16423C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-tight">Secure Gated Estate</p>
                    <p className="text-[10px] text-stone-400 font-semibold mt-0.5 leading-tight">24/7 security guard presence and gated walling</p>
                  </div>
                </div>
              </div>

              <hr className="border-stone-200/50" />

              {/* About Story */}
              <div id="about" className="space-y-4">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> About the Farmhouse
                </h3>
                <p className="text-sm md:text-base text-stone-500 leading-relaxed font-semibold">
                  {FARMHOUSE.about}
                </p>
              </div>

              <hr className="border-stone-200/50" />

              {/* What this place offers (Amenities) */}
              <div id="amenities" className="space-y-6">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> What this place offers
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {FARMHOUSE.amenities.map((item, i) => {
                    const IconComponent = item.icon
                    return (
                      <div key={i} className="flex gap-4 p-4.5 bg-white border border-stone-200/50 rounded-2xl shadow-sm hover:border-[#16423C]/20 transition-all">
                        <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#16423C]/10 flex items-center justify-center text-[#16423C] shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{item.name}</p>
                          <p className="text-[11px] text-stone-400 font-medium mt-0.5 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* PREMIUM DESIGN ADDITION 4: EXPANDABLE AMENITIES PANEL TRIGGER */}
                <button 
                  onClick={() => setShowAmenitiesModal(true)}
                  className="px-6 py-3.5 bg-white border border-stone-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-50 transition-colors shadow-sm"
                >
                  Show all 18 amenities
                </button>
              </div>

              <hr className="border-stone-200/50" />

              {/* PREMIUM DESIGN ADDITION 2: WHERE YOU'LL SLEEP ARRANGEMENT */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> Where you'll sleep
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-stone-200/50 p-6 rounded-[1.5rem] shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-[#16423C] border border-[#16423C]/10">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">Royal Master Suite</p>
                      <p className="text-xs text-stone-400 font-semibold mt-1">1 King Bed • Attached Bath • Private Poolside Entry</p>
                    </div>
                  </div>
                  <div className="bg-white border border-stone-200/50 p-6 rounded-[1.5rem] shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-[#16423C] border border-[#16423C]/10">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">Deluxe Garden Suite</p>
                      <p className="text-xs text-stone-400 font-semibold mt-1">2 Queen Beds • Attached Bath • Garden Facing View</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-stone-200/50" />

              {/* Pricing Packages */}
              <div id="packages" className="space-y-6">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> Available Packages
                </h3>
                
                <div className="space-y-4">
                  {FARMHOUSE.packages.map((pkg, i) => {
                    const isSelected = selectedPackage === i
                    return (
                      <div 
                        key={i}
                        onClick={() => setSelectedPackage(i)}
                        className={`p-6 rounded-[2rem] border transition-all duration-350 cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden ${
                          isSelected 
                            ? "bg-white border-[#16423C] shadow-md ring-1 ring-[#16423C]/20" 
                            : "bg-white border-stone-200/60 hover:border-stone-300 shadow-sm"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 w-2.5 h-full bg-[#16423C]" />
                        )}
                        
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-lg font-serif font-bold text-slate-900">{pkg.name}</h4>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-stone-100 text-stone-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              <Clock className="w-3 h-3 text-[#16423C]" /> {pkg.duration}
                            </span>
                          </div>
                          <p className="text-xs text-stone-400 font-semibold leading-normal max-w-xl">{pkg.desc}</p>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5">
                            {pkg.features.slice(0, 3).map((f, fIdx) => (
                              <span key={fIdx} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-500 uppercase">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-left md:text-right shrink-0 md:border-l md:border-stone-100 md:pl-6">
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider leading-none">Starting from</p>
                          <p className="text-2xl font-black text-[#16423C] mt-1.5 font-mono">₨ {pkg.price.toLocaleString()}</p>
                          <button className={`mt-3.5 px-4.5 py-2 text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-colors border ${
                            isSelected 
                              ? "bg-[#16423C] text-white border-transparent" 
                              : "bg-transparent text-slate-700 border-stone-200"
                          }`}>
                            {isSelected ? "Selected" : "Select Package"}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <hr className="border-stone-200/50" />

              {/* Testimonials */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> Guest Experiences
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Fatima Shah", date: "June 2026", feedback: "Booked Green Meadows for my Nikah ceremony. The pool decorations and lighting setup looked magical. Extremely responsive managers and excellent coordination!" },
                    { name: "Bilal Butt", date: "May 2026", feedback: "Hosted a corporate lunch picnic here. The lawns are beautifully maintained and the interior lounge is very spacious and cool. Backup generator handled load shedding perfectly." }
                  ].map((rev, i) => (
                    <div key={i} className="bg-white border border-stone-200/50 p-5 rounded-[1.5rem] shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-black text-slate-900 leading-none">{rev.name}</p>
                          <p className="text-[9px] text-stone-400 font-bold tracking-wider mt-1">{rev.date}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, sIdx) => (
                            <Star key={sIdx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 font-semibold leading-relaxed">{rev.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-stone-200/50" />

              {/* PREMIUM DESIGN ADDITION 3: MEET YOUR HOST BLOCK */}
              <div className="bg-white border border-stone-200/50 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2 border-b border-stone-100 pb-4">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> Meet your host
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#16423C]/20 shadow-md shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300" 
                      alt="Naeem Chaudhary portrait" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900 leading-none">Chaudhary Naeem</h4>
                      <p className="text-[10px] text-stone-450 font-bold uppercase tracking-wider mt-1.5">CNIC Verified Host • Superhost</p>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                      "Assalam-o-Alaikum! I am Naeem, the owner and host of Green Meadows. We strive to provide a world-class luxury retreat and private booking service. Our trained security and facility staff live on property to assist with power startup, parking setups, and cleaning support. Let's make your event memorable!"
                    </p>
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest pt-1">
                      <span>Response Rate: 100%</span>
                      <span>•</span>
                      <span>Response Time: &lt; 10 Mins</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-stone-200/50" />

              {/* PREMIUM DESIGN ADDITION 5: THINGS TO KNOW POLICIES FOOTER */}
              <div className="bg-white border border-stone-200/50 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-serif text-slate-900 font-bold flex items-center gap-2 border-b border-stone-100 pb-4">
                  <span className="w-1.5 h-6 bg-[#16423C] rounded-full" /> Things to know
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] font-semibold leading-relaxed">
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">House Rules</h4>
                    <ul className="space-y-2 text-stone-500 font-medium">
                      <li>Check-in: 10:00 AM (Day) / 5:00 PM (Night)</li>
                      <li>Check-out: 6:00 PM (Day) / 1:00 AM (Night)</li>
                      <li>Strict no-weapons and zero-drugs policy</li>
                      <li>External catering and catering set-ups allowed</li>
                      <li>Outdoor music setup active until 10:00 PM</li>
                    </ul>
                  </div>
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Safety & Property</h4>
                    <ul className="space-y-2 text-stone-500 font-medium">
                      <li>Security guard stationed at gate 24/7</li>
                      <li>CCTV cameras active in exterior zones only</li>
                      <li>Pool depth: 3.5 ft to 6.5 ft (No lifeguard on duty)</li>
                      <li>Automatic power backup generator on standby</li>
                      <li>First aid box located inside suite lounge</li>
                    </ul>
                  </div>
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Cancellation Policy</h4>
                    <ul className="space-y-2 text-stone-500 font-medium">
                      <li>Free cancellation up to 14 days before event</li>
                      <li>50% refund for cancellations within 7-14 days</li>
                      <li>Cancellations requested &lt; 7 days are non-refundable</li>
                      <li>Coordinator fee (₨ 7,500) is non-refundable on check-out</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Booking Column (Col 5) */}
            <div className="lg:col-span-5" id="booking-widget">
              
              <div id="availability" className="bg-white rounded-[2.5rem] border border-stone-200/60 shadow-xl p-6 md:p-8 sticky top-24 space-y-6">
                
                {bookingSuccess ? (
                  <div className="text-center py-6 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif font-black text-slate-900">Booking Requested!</h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-semibold max-w-xs mx-auto">
                      Your booking request for <strong className="text-slate-900">{FARMHOUSE.packages[selectedPackage].name}</strong> on <strong className="text-slate-900">{selectedDate}</strong> has been submitted. The venue host will contact you shortly on WhatsApp.
                    </p>
                    <button 
                      onClick={() => setBookingSuccess(false)}
                      className="mt-6 w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-extrabold text-[10px] uppercase tracking-widest rounded-xl transition-all"
                    >
                      Plan Another Date
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-2xl font-black text-[#16423C] font-mono">₨ {currentPrice.toLocaleString()}</span>
                        <span className="text-xs text-stone-400 font-semibold lowercase">/ event</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{FARMHOUSE.rating}</span>
                        <span className="text-stone-400 font-medium font-sans">({FARMHOUSE.reviews})</span>
                      </div>
                    </div>

                    <hr className="border-stone-100" />

                    {/* Interactive Custom Calendar Selector */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black tracking-widest uppercase text-stone-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#16423C]" />
                        Select Event Date
                      </label>
                      
                      <div className="border border-stone-200/60 p-3 rounded-2xl bg-[#FAF8F5] space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-700 uppercase">
                          <span>June 2026</span>
                          <span className="text-[9px] font-bold text-[#16423C]">🟢 Green = Available</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-stone-400">
                          <span className="text-rose-500">S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          {[
                            "", "", "", "", "", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                            21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                          ].map((day, i) => {
                            const dateStr = day ? `2026-06-${Number(day) < 10 ? '0' + day : day}` : ""
                            const isAvailable = availableDates.includes(dateStr)
                            const isSelected = selectedDate === dateStr
                            
                            return (
                              <span 
                                key={i} 
                                onClick={() => day && isAvailable && setSelectedDate(dateStr)}
                                className={`py-1 rounded font-mono text-[9.5px] cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-[#16423C] text-white font-black scale-110 shadow-md z-10' 
                                    : isAvailable 
                                      ? 'bg-emerald-50 hover:bg-[#16423C]/5 text-[#16423C] font-black border border-emerald-200/50' 
                                      : day ? 'text-stone-300 hover:bg-stone-50 cursor-not-allowed font-medium' : 'opacity-0'
                                }`}
                              >
                                {day}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-stone-200/60 rounded-xl p-3 focus-within:border-[#16423C] transition-all">
                        <label className="text-[9px] font-black uppercase tracking-wider text-stone-400 block mb-1">Guests</label>
                        <input 
                          type="number" 
                          min={50} 
                          max={500} 
                          required
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full bg-transparent font-black text-xs text-slate-800 outline-none"
                        />
                      </div>
                      <div className="border border-stone-200/60 rounded-xl p-3 bg-stone-50">
                        <label className="text-[9px] font-black uppercase tracking-wider text-stone-400 block mb-1">Time</label>
                        <span className="font-extrabold text-[10.5px] text-slate-700 block truncate">
                          {FARMHOUSE.packages[selectedPackage].duration}
                        </span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 bg-[#FAF8F5] border border-stone-200/40 p-4.5 rounded-2xl text-xs font-semibold text-stone-500">
                      <div className="flex justify-between items-center">
                        <span>{FARMHOUSE.packages[selectedPackage].name} Rent</span>
                        <span className="font-bold text-slate-900 font-mono">₨ {currentPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Refundable Security Deposit (15%)</span>
                        <span className="font-bold text-slate-900 font-mono">₨ {securityDeposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>NEXUS Coordinator Fee</span>
                        <span className="font-bold text-slate-900 font-mono">₨ {serviceFee.toLocaleString()}</span>
                      </div>
                      <div className="h-px bg-stone-200 my-1" />
                      <div className="flex justify-between items-center text-sm font-black text-slate-900">
                        <span>Total (PKR)</span>
                        <span className="font-mono text-[#16423C]">₨ {totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full h-13.5 rounded-xl bg-[#16423C] hover:bg-[#0f2d29] text-white text-[10.5px] font-extrabold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      Request to Reserve <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="pt-2 border-t border-stone-100 flex items-center gap-3">
                      <Shield className="w-8 h-8 text-emerald-600 bg-emerald-50 border border-emerald-100 p-1.5 rounded-full shrink-0" />
                      <p className="text-[10px] font-bold text-stone-400 leading-tight">
                        <strong className="text-slate-800">NEXUS Protection:</strong> Secure holding account, verified venue layout guarantee, and direct host messaging sync.
                      </p>
                    </div>

                  </form>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ══ AMENITIES DRAWER MODAL ══ */}
        {showAmenitiesModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-stone-200/50 animate-fade-in overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-stone-100 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-2xl font-serif font-black text-slate-900">What this place offers</h3>
                  <p className="text-xs text-stone-400 font-semibold mt-1">Complete catalog of facilities and convenience tools</p>
                </div>
                <button 
                  onClick={() => setShowAmenitiesModal(false)}
                  className="w-10 h-10 rounded-full bg-stone-550 border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-slate-750 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
                
                {/* Category 1: Outdoors */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#16423C] uppercase tracking-widest border-b border-stone-100 pb-2">Outdoors & Events</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                    {ALL_AMENITIES_CATEGORIZED.outdoors.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-slate-900">{item.name}</p>
                          <p className="text-[10px] text-stone-400 font-medium mt-0.5 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 2: Indoors */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#16423C] uppercase tracking-widest border-b border-stone-100 pb-2">Indoor Spaces & Comfort</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                    {ALL_AMENITIES_CATEGORIZED.indoors.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-slate-900">{item.name}</p>
                          <p className="text-[10px] text-stone-400 font-medium mt-0.5 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category 3: Facilities */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-[#16423C] uppercase tracking-widest border-b border-stone-100 pb-2">Estate Facilities & Security</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                    {ALL_AMENITIES_CATEGORIZED.facilities.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-slate-900">{item.name}</p>
                          <p className="text-[10px] text-stone-400 font-medium mt-0.5 leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-stone-100 shrink-0">
                <button 
                  onClick={() => setShowAmenitiesModal(false)}
                  className="w-full py-4 bg-[#16423C] hover:bg-[#0f2d29] text-white font-extrabold text-[10.5px] uppercase tracking-widest rounded-xl transition-colors shadow-md"
                >
                  Close Catalog
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
      <MegaFooter />
    </PublicLayout>
  )
}
