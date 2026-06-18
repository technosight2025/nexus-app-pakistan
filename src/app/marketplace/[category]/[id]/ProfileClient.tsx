"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Star, MapPin, Share2, Heart, Calendar, Users, 
  CheckCircle2, Clock, Camera, ShieldCheck, Mail, Phone,
  Info, Award, Sparkles, AlertCircle, ChevronRight, PlayCircle, X, Maximize2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProfileData {
  id: string
  name: string
  category: string
  categoryLabel: string
  rating: number
  reviewsCount: number
  location: string
  tagline: string
  about: string
  priceRange: string
  coverImage: string
  avatarImage: string
  stats: { label: string; value: string }[]
  portfolio: { 
    id?: string;
    title: string; 
    tag: string; 
    image: string;
    price?: string;
    features?: string[];
    bookedDates?: string[];
    sizes?: string[];
    material?: string;
  }[]
  portfolioTags: string[]
  packages: {
    name: string
    price: string
    description: string
    popular?: boolean
    inclusions: string[]
  }[]
  gear?: string[]
  reviews: {
    author: string
    rating: number
    date: string
    comment: string
  }[]
}

export function ProfileClient({ vendor }: { vendor: ProfileData }) {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [activeGalleryTag, setActiveGalleryTag] = useState("All")
  const [liked, setLiked] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(vendor.packages[1]?.name || vendor.packages[0]?.name)
  const router = useRouter()
  const [extraOutfits, setExtraOutfits] = useState<typeof vendor.portfolio>([])

  // Load vendor-added outfits from Supabase (via the rentals dashboard API)
  useEffect(() => {
    fetch("/api/rentals/outfits")
      .then(r => r.ok ? r.json() : [])
      .then((data: Array<{ id: string; name: string; tag: string; image_url: string; price: string; sizes?: string[]; material?: string; features?: string[] }>) => {
        if (!Array.isArray(data)) return
        const existingNames = new Set(vendor.portfolio.map(p => p.title))
        const merged = data
          .filter(o => !existingNames.has(o.name))
          .map(o => ({
            id: o.id,
            title: o.name,
            tag: o.tag,
            image: o.image_url || "/images/wardrobe/1.png",
            price: o.price,
            sizes: o.sizes || [],
            material: o.material || "",
            features: o.features || [],
            bookedDates: [],
          }))
        setExtraOutfits(merged)
      })
      .catch(() => {})
  }, [])

  // Merge static portfolio with dashboard-added outfits
  const allPortfolio = [...vendor.portfolio, ...extraOutfits]
  
  // Booking inquiry form states
  const [eventDate, setEventDate] = useState("")
  const [eventType, setEventType] = useState("Wedding")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const tabs = [
    { id: "portfolio", label: "Portfolio Gallery" },
    { id: "packages", label: "Packages & Pricing" },
    { id: "about", label: "About & Experience" },
    { id: "reviews", label: `Reviews (${vendor.reviewsCount})` }
  ]

  const filteredPortfolio = activeGalleryTag === "All"
    ? allPortfolio
    : allPortfolio.filter(item => item.tag === activeGalleryTag)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !phone || !eventDate) {
      alert("Please fill in all required fields.")
      return
    }
    setFormSubmitted(true)
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      {/* Dynamic Cover Section */}
      <div className="h-[350px] md:h-[450px] w-full relative overflow-hidden">
        <img 
          src={vendor.coverImage} 
          alt={`${vendor.name} Cover`} 
          className="w-full h-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-black/40 to-transparent" />
        
        {/* Cover Actions */}
        <div className="absolute top-28 right-6 flex items-center gap-3 z-20">
          <button 
            onClick={() => setLiked(!liked)}
            className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${
              liked 
                ? "bg-red-500 border-red-500 text-white shadow-lg" 
                : "bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-[#052E20]"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[#052E20] transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 -mt-36 md:-mt-48 relative z-20">
        
        {/* Header Profile Info Card */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(5,46,32,0.04)] p-6 md:p-10 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Avatar */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl border-4 border-white shadow-xl overflow-hidden shrink-0 bg-gray-50 -mt-16 md:-mt-24">
              <img 
                src={vendor.avatarImage} 
                alt={`${vendor.name} Avatar`} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-[#052E20]/5 text-[#052E20] text-xs font-black rounded-full uppercase tracking-wider">
                  {vendor.categoryLabel}
                </span>
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 fill-current" /> Verified Partner
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-medium text-[#052E20] mb-2 tracking-tight">
                {vendor.name}
              </h1>
              <p className="text-lg text-gray-500 font-medium mb-4">{vendor.tagline}</p>

              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-gray-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-[#C5A880]" />
                  {vendor.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4.5 h-4.5 text-amber-400 fill-current" />
                  <span className="text-gray-900 font-black">{vendor.rating}</span> ({vendor.reviewsCount} verified reviews)
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4.5 h-4.5 text-[#0F5B3E]" />
                  Avg. Response: {vendor.stats.find(s => s.label.includes("Response"))?.value || "2 Hours"}
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E6E2DA] shrink-0 text-center lg:text-right w-full lg:w-auto">
              <span className="text-xs font-extrabold uppercase text-[#C5A880] tracking-wider block mb-1">Starting Price</span>
              <span className="text-2xl md:text-3xl font-black text-[#052E20]">{vendor.priceRange}</span>
              <span className="text-xs font-semibold text-gray-400 block mt-1">Custom quotes available</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
            {vendor.stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-lg font-black text-[#052E20]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Try-On Studio Banner (Rentals Only) */}
        {vendor.category === "rentals" && (
          <div className="bg-gradient-to-r from-[#052E20] via-[#0F5B3E] to-[#052E20] rounded-[2.5rem] p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C5A880]/30 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#C5A880]/20 blur-3xl rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C5A880] animate-pulse" />
                <span className="text-[#C5A880] font-black text-sm uppercase tracking-widest">Nexus AI Experience</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-3">The Virtual Try-On Studio</h2>
              <p className="text-[#E6F0EC] text-sm md:text-base max-w-xl font-medium mx-auto md:mx-0">
                Upload your photo and instantly see how you look in any of our premium rental outfits using our advanced AI face-swapping technology. Try before you rent, right from your phone.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
              <Link 
                href="/ai-tryon-studio"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#C5A880] hover:bg-[#B3956D] text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(197,168,128,0.3)] hover:shadow-[0_10px_40px_rgba(197,168,128,0.5)] hover:-translate-y-1"
              >
                Launch AI Studio
                <Maximize2 className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Content Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side Content Console (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Elegant Sticky Navigation Tabs */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-5 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? "bg-[#052E20] text-white shadow-md shadow-[#052E20]/10" 
                      : "text-gray-500 hover:text-[#052E20] hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Sections */}
            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "portfolio" && (
                  <motion.div 
                    key="portfolio"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Gallery Filter Chips */}
                    <div className="flex flex-wrap items-center gap-2">
                      {vendor.portfolioTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setActiveGalleryTag(tag)}
                          className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${
                            activeGalleryTag === tag
                              ? "bg-[#0F5B3E] text-white border-[#0F5B3E]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-[#0F5B3E] hover:text-[#0F5B3E]"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Gallery Dynamic Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredPortfolio.map((item, index) => {
                        const productSlug = item.id || item.title.toLowerCase().replace(/\s+/g, '-');
                        return (
                        <div 
                          key={index}
                          onClick={() => router.push(`/marketplace/${vendor.category === 'rentals' ? 'rentals' : vendor.category}/${vendor.id}/product/${productSlug}`)}
                          className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
                        >
                          <div className="relative w-full aspect-[4/5] shrink-0 overflow-hidden bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-10">
                              <span className="px-3 py-1 bg-white/95 backdrop-blur-sm shadow-sm text-[10px] font-black text-[#052E20] rounded-lg uppercase tracking-wider">
                                {item.tag}
                              </span>
                            </div>
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-bold text-[#052E20] text-sm leading-tight">{item.title}</h4>
                              {item.price && (
                                <span className="font-black text-slate-900 text-[13px] whitespace-nowrap">Rs. {item.price}</span>
                              )}
                            </div>
                            
                            {/* Detailed Info */}
                            <div className="flex flex-col gap-2 mt-auto">
                              {(item.sizes || item.material) && (
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500 mt-1">
                                  {item.sizes && <span>Sizes: <span className="text-slate-800">{item.sizes.join(', ')}</span></span>}
                                  {item.material && <span>Material: <span className="text-slate-800">{item.material}</span></span>}
                                </div>
                              )}
                              
                              {item.features && item.features.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {item.features.map((feature, idx) => (
                                    <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {item.bookedDates && item.bookedDates.length > 0 && (
                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-rose-500 bg-rose-50 px-2 py-1 rounded-md mt-1 self-start">
                                  <Calendar className="w-3 h-3 shrink-0" />
                                  <span className="truncate">Booked: {item.bookedDates.join(', ')}</span>
                                </div>
                              )}
                            </div>
                            
                            <div 
                              className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link 
                                href={`/marketplace/${vendor.category === 'rentals' ? 'rentals' : vendor.category}/${vendor.id}/product/${productSlug}`}
                                className="text-[11px] font-bold text-[#0F5B3E] hover:underline cursor-pointer flex items-center gap-1"
                              >
                                View Full Details
                                <ChevronRight className="w-3 h-3" />
                              </Link>

                              {vendor.category === 'rentals' && (
                                <Link 
                                  href={item.id ? `/ai-tryon-studio?id=${item.id}` : `/ai-tryon-studio?product=${encodeURIComponent(item.title)}&image=${encodeURIComponent(item.image)}&price=${item.price || ''}`}
                                  className="text-[10px] font-black text-black bg-[#D4AF37] hover:bg-[#C5A880] transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 uppercase tracking-wider shadow-sm"
                                >
                                  <Sparkles className="w-3 h-3" />
                                  Try On
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === "packages" && (
                  <motion.div 
                    key="packages"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {vendor.packages.map((pkg, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedPackage(pkg.name)}
                          className={`cursor-pointer bg-white p-6 rounded-[2rem] border relative flex flex-col justify-between transition-all duration-300 ${
                            selectedPackage === pkg.name
                              ? "border-2 border-[#0F5B3E] shadow-xl shadow-[#0F5B3E]/5 scale-[1.02]"
                              : "border-gray-200 hover:border-gray-300 shadow-sm"
                          }`}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-3 right-6 bg-[#C5A880] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                              Most Popular
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <input 
                                type="radio" 
                                checked={selectedPackage === pkg.name}
                                onChange={() => setSelectedPackage(pkg.name)}
                                className="accent-[#0F5B3E] h-4 w-4"
                              />
                              <h3 className="text-lg font-bold text-[#052E20]">{pkg.name}</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-4">{pkg.description}</p>
                            <div className="text-2xl font-black text-[#0F5B3E] mb-6">{pkg.price}</div>
                            
                            <div className="h-[1px] w-full bg-gray-100 my-4" />

                            <ul className="space-y-3">
                              {pkg.inclusions.map((inc, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-8">
                            <button 
                              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                                selectedPackage === pkg.name
                                  ? "bg-[#0F5B3E] text-white"
                                  : "border border-gray-200 text-gray-600 hover:border-[#0F5B3E] hover:text-[#0F5B3E]"
                              }`}
                            >
                              {selectedPackage === pkg.name ? "Selected Plan" : "Select Package"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "about" && (
                  <motion.div 
                    key="about"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#052E20] mb-3">About the Studio</h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-semibold">{vendor.about}</p>
                    </div>

                    {vendor.gear && vendor.gear.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-[#052E20] mb-3 flex items-center gap-2">
                          <Camera className="w-5 h-5 text-[#C5A880]" /> Studio Equipment & Technology
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {vendor.gear.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 bg-[#FAF7F2] p-3 rounded-xl border border-gray-100">
                              <Sparkles className="w-3.5 h-3.5 text-[#0F5B3E] shrink-0" />
                              <span className="text-xs font-bold text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-[#052E20] text-white p-6 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                      <h4 className="text-base font-bold mb-1 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#C5A880]" /> Nexus Guarantee Program
                      </h4>
                      <p className="text-xs text-[#E6F0EC] leading-relaxed max-w-lg font-semibold">
                        This verified partner is backed by the Nexus Safeguard policy. Enjoy guaranteed booking protection, replacement coverage, and verified transaction logging.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div 
                    key="reviews"
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Reviews List */}
                    {vendor.reviews.map((rev, index) => (
                      <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex items-center gap-1 shrink-0 bg-[#FAF7F2] border border-gray-100 rounded-xl px-3 py-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="text-sm font-black text-[#052E20]">{rev.rating}.0</span>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold text-sm text-[#052E20]">{rev.author}</h4>
                            <span className="text-[11px] font-bold text-gray-400">{rev.date}</span>
                          </div>
                          <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                            "{rev.comment}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side Inquiry Form (4 Cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(5,46,32,0.04)] overflow-hidden">
              
              <div className="bg-[#052E20] p-6 text-white text-center relative">
                <h3 className="text-xl font-bold font-serif mb-1 text-[#FDF8F0]">Check Availability</h3>
                <p className="text-xs text-[#E6F0EC]/80 font-semibold">Send a direct request, get a custom quote</p>
              </div>

              <div className="p-6 md:p-8">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-[#E6F0EC] text-[#0F5B3E] rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#052E20] mb-1">Request Sent!</h4>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-[240px] mx-auto font-semibold">
                        {vendor.name} has been notified. Expect a phone/WhatsApp response in under {vendor.stats.find(s => s.label.includes("Response"))?.value || "2 hours"}.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setFormSubmitted(false)
                        setFullName("")
                        setPhone("")
                      }}
                      className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 transition-colors"
                    >
                      Send Another Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Selected Package</label>
                      <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                        <span className="text-xs font-bold text-[#052E20]">{selectedPackage}</span>
                        <button 
                          type="button" 
                          onClick={() => setActiveTab("packages")}
                          className="text-[10px] font-bold text-[#0F5B3E] hover:underline"
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Event Type</label>
                      <select 
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E]"
                      >
                        <option>Wedding (Baraat/Valima)</option>
                        <option>Mehndi / Sangeet</option>
                        <option>Couple Shoot / Pre-wedding</option>
                        <option>Corporate / Commercial</option>
                        <option>Family Portrait Shoot</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Event Date *</label>
                      <div className="relative">
                        <input 
                          type="date"
                          required
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Shafiq Ahmad"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">WhatsApp / Phone *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="e.g. +92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Special Instructions (Optional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Mention locations, hours needed, or custom requests..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E] resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className="w-full py-4 bg-[#0F5B3E] hover:bg-[#0A422C] text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg shadow-[#0F5B3E]/10"
                      >
                        Submit Request
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold justify-center">
                      <AlertCircle className="w-3.5 h-3.5" /> No pre-payment required to inquire
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Padding */}
      <div className="h-32" />
    </div>
  )
}
