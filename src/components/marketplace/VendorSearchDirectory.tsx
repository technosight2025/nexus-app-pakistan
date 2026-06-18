"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Star, Filter, ArrowRight, Heart, Camera, Brush, Scissors, Music, Utensils, Award } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const VENDOR_CATEGORIES = [
  { id: "photography", name: "Photography", icon: Camera },
  { id: "makeup", name: "Makeup Artists", icon: Brush },
  { id: "decor", name: "Decorators", icon: Scissors },
  { id: "music", name: "DJs & Music", icon: Music },
  { id: "catering", name: "Catering", icon: Utensils },
]

const MOCK_VENDORS = [
  { id: "v1", name: "Nexus Studios", category: "Photography", location: "Lahore", price: "150,000", rating: 4.9, reviews: 342, tags: ["Cinematic", "Drone"], img: "https://images.unsplash.com/photo-1511899750669-ce5614986795?q=80&w=800", verified: true },
  { id: "v2", name: "Royal Aesthetics", category: "Makeup Artists", location: "Islamabad", price: "80,000", rating: 4.8, reviews: 215, tags: ["Bridal", "Party"], img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800", verified: true },
  { id: "v3", name: "Enchanted Events", category: "Decorators", location: "Karachi", price: "300,000", rating: 4.7, reviews: 189, tags: ["Floral", "Thematic"], img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", verified: false },
  { id: "v4", name: "DJ Shadow", category: "DJs & Music", location: "Lahore", price: "50,000", rating: 4.9, reviews: 420, tags: ["Mehndi", "Corporate"], img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800", verified: true },
  { id: "v5", name: "Spice & Co.", category: "Catering", location: "Faisalabad", price: "2,500/head", rating: 4.6, reviews: 156, tags: ["Desi", "Continental"], img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800", verified: false },
  { id: "v6", name: "Ayesha's Salon", category: "Makeup Artists", location: "Lahore", price: "100,000", rating: 4.8, reviews: 89, tags: ["Signature Bridal"], img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800", verified: true },
]

export function VendorSearchDirectory() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [activeSpecialties, setActiveSpecialties] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      // Find matching category in VENDOR_CATEGORIES
      const matched = VENDOR_CATEGORIES.find(c => c.name.toLowerCase() === category.toLowerCase())
      if (matched) {
        setActiveCategory(matched.name)
      } else {
        // Fallback to checking direct category name from mocks
        const directMatch = MOCK_VENDORS.find(v => v.category.toLowerCase() === category.toLowerCase())
        if (directMatch) {
          setActiveCategory(directMatch.category)
        }
      }
    }
    const q = searchParams.get("q")
    if (q) {
      setSearchQuery(q)
    }
  }, [searchParams])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
  }

  const toggleSpecialty = (tag: string) => {
    setActiveSpecialties(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filteredVendors = MOCK_VENDORS.filter(v => {
    if (activeCategory !== "All" && v.category !== activeCategory) return false
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.category.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (locationQuery && !v.location.toLowerCase().includes(locationQuery.toLowerCase())) return false
    if (selectedRating && v.rating < selectedRating) return false
    if (activeSpecialties.length > 0 && !v.tags.some(tag => activeSpecialties.includes(tag))) return false
    
    // Price parse checking
    if (minPrice || maxPrice) {
      const numericPrice = parseInt(v.price.replace(/[^0-9]/g, "")) || 0
      if (minPrice && numericPrice < parseInt(minPrice)) return false
      if (maxPrice && numericPrice > parseInt(maxPrice)) return false
    }

    return true
  })

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-24 text-[#2C2520]">
      
      {/* 🌟 Editorial Heritage Hero Header 🌟 */}
      <div className="bg-white border-b border-[#C5A880]/15 pt-32 pb-16 relative overflow-hidden">
        {/* Soft Radial Gold/Emerald Glow Blurs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#C5A880]/10 to-[#16423C]/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#16423C]/10 to-transparent rounded-full blur-[100px] translate-y-1/3 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase block">Discover Heritage Services</span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#16423C] tracking-wide leading-tight">
              Find Premium <br />
              <span className="italic text-[#C5A880]">Wedding Professionals</span>
            </h1>
            <p className="text-base md:text-lg text-[#2C2520]/70 max-w-xl mx-auto">
              Connect with top photographers, traditional decorators, and caterers to elevate your multi-generational milestones.
            </p>

            {/* Smart Search Capsule with Ambient Glow */}
            <div className="mt-10 bg-white p-3 rounded-2xl md:rounded-full border border-[#C5A880]/30 shadow-xl shadow-[#C5A880]/5 flex flex-col md:flex-row gap-3 max-w-4xl mx-auto relative z-20 focus-within:ring-2 focus-within:ring-[#16423C]/10 transition-all duration-300">
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#FDFBF7] rounded-xl md:rounded-full border border-[#C5A880]/15 focus-within:border-[#16423C] transition-colors group">
                <Search className="w-4 h-4 text-[#C5A880] group-focus-within:text-[#16423C]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What service? (e.g. Photography)" 
                  className="bg-transparent border-none outline-none w-full text-[#2C2520] font-medium placeholder:text-[#2C2520]/40 text-sm" 
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#FDFBF7] rounded-xl md:rounded-full border border-[#C5A880]/15 focus-within:border-[#16423C] transition-colors group">
                <MapPin className="w-4 h-4 text-[#C5A880] group-focus-within:text-[#16423C]" />
                <input 
                  type="text" 
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Location (e.g. Lahore)" 
                  className="bg-transparent border-none outline-none w-full text-[#2C2520] font-medium placeholder:text-[#2C2520]/40 text-sm" 
                />
              </div>
              <button className="bg-[#16423C] hover:bg-[#0F2D29] text-white px-8 py-3 rounded-xl md:rounded-full font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-[#16423C]/10">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <button 
                onClick={() => setActiveCategory("All")}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border ${
                  activeCategory === "All" 
                    ? 'bg-[#16423C] text-white border-[#16423C] shadow-md' 
                    : 'bg-[#FDFBF7] text-[#2C2520]/80 border-[#C5A880]/30 hover:border-[#C5A880]'
                }`}
              >
                All Services
              </button>
              {VENDOR_CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border ${
                    activeCategory === cat.name 
                      ? 'bg-[#16423C] text-white border-[#16423C] shadow-md' 
                      : 'bg-[#FDFBF7] text-[#2C2520]/80 border-[#C5A880]/30 hover:border-[#C5A880]'
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" /> {cat.name}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 🌟 Directory Grid & Sidebar 🌟 */}
      <div className="container mx-auto px-6 max-w-7xl mt-12 flex flex-col lg:flex-row gap-8 relative z-20">
        
        {/* Boutique Filters Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-[#C5A880]/20 shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg text-[#16423C] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C5A880]" /> Refine Search
              </h3>
              <button 
                onClick={() => {
                  setMinPrice("")
                  setMaxPrice("")
                  setSelectedRating(null)
                  setActiveSpecialties([])
                }}
                className="text-xs font-semibold text-[#C5A880] hover:text-[#16423C] hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 mb-3">Price Range (PKR)</h4>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#C5A880]/20 rounded-xl text-xs outline-none focus:border-[#16423C]" 
                  />
                  <span className="text-slate-400">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#C5A880]/20 rounded-xl text-xs outline-none focus:border-[#16423C]" 
                  />
                </div>
              </div>

              <div className="h-[1px] bg-[#C5A880]/15" />

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 mb-3">Minimum Rating</h4>
                <div className="space-y-2.5">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="rating" 
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="sr-only" 
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                        selectedRating === rating 
                          ? 'border-[#16423C] bg-[#16423C]' 
                          : 'border-[#C5A880]/40 group-hover:border-[#C5A880]'
                      }`}>
                        {selectedRating === rating && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-[#C5A880] fill-current' : 'text-slate-100'}`} />
                        ))}
                        <span className="text-xs font-medium text-[#2C2520]/60 ml-1.5">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-[#C5A880]/15" />

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 mb-3">Specialities</h4>
                <div className="flex flex-wrap gap-2">
                  {["Cinematic", "Drone", "Bridal", "Thematic", "Corporate", "Desi"].map((tag) => {
                    const isSelected = activeSpecialties.includes(tag)
                    return (
                      <button 
                        key={tag} 
                        onClick={() => toggleSpecialty(tag)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          isSelected 
                            ? 'bg-[#16423C] text-white border-transparent' 
                            : 'border-[#C5A880]/20 bg-[#FDFBF7] text-[#2C2520]/80 hover:border-[#C5A880]'
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-[#16423C]">
              {activeCategory === "All" ? "Top Professionals" : `${activeCategory} Professionals`}
            </h2>
            <p className="text-xs font-medium text-[#2C2520]/50 hidden sm:block">Showing {filteredVendors.length} results</p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredVendors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-[#C5A880]/10 p-12 text-center"
              >
                <p className="text-base text-[#2C2520]/70 font-medium">No professionals match your specific filter criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("")
                    setLocationQuery("")
                    setMinPrice("")
                    setMaxPrice("")
                    setSelectedRating(null)
                    setActiveSpecialties([])
                  }}
                  className="mt-4 text-sm font-semibold text-[#16423C] underline decoration-[#C5A880]"
                >
                  Clear all search terms
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVendors.map((vendor, i) => {
                  const isFav = favorites.includes(vendor.id)
                  return (
                    <motion.div 
                      key={vendor.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-[#C5A880]/20 overflow-hidden group hover:shadow-xl hover:shadow-[#C5A880]/5 hover:border-[#16423C]/40 transition-all duration-300 flex flex-col"
                    >
                      <div className="block relative aspect-[4/3] overflow-hidden bg-slate-50">
                        <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                        
                        {/* Favorite Heart Toggler */}
                        <button 
                          onClick={() => toggleFavorite(vendor.id)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors z-10"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-10">
                          {vendor.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex flex-col">
                              {vendor.verified && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1 mb-0.5">
                                  <Award className="w-3 h-3" /> Verified Partner
                                </span>
                              )}
                              <h3 className="text-lg font-serif text-[#16423C] group-hover:text-[#C5A880] transition-colors line-clamp-1">{vendor.name}</h3>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded border border-amber-100 shrink-0">
                              <Star className="w-3 h-3 text-[#C5A880] fill-current" />
                              <span className="text-xs font-bold text-amber-800">{vendor.rating}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5 mb-4">
                            <p className="text-xs font-bold text-[#C5A880] uppercase tracking-wider">{vendor.category}</p>
                            <p className="text-xs font-medium text-[#2C2520]/60 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> {vendor.location}, Pakistan
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-[#C5A880]/15 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold text-[#2C2520]/40 uppercase tracking-wider">Starting from</p>
                            <p className="text-sm font-mono font-bold text-[#16423C]">₨ {vendor.price}</p>
                          </div>
                          <Link href={`/vendors/${vendor.id}`} className="w-9 h-9 rounded-full bg-[#FDFBF7] border border-[#C5A880]/20 flex items-center justify-center text-[#16423C] group-hover:bg-[#16423C] group-hover:border-transparent group-hover:text-white transition-all shadow-sm">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </AnimatePresence>
          
          {filteredVendors.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button className="px-6 py-3 bg-[#FDFBF7] border border-[#C5A880]/20 rounded-xl shadow-sm text-sm font-semibold text-[#2C2520] hover:bg-[#16423C] hover:text-white hover:border-transparent transition-all">
                Load More Vendors
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
