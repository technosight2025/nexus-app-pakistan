"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Users, Star, Filter, ArrowRight, Heart, Award, ShieldCheck } from "lucide-react"
import Link from "next/link"

const MOCK_VENUES = [
  { id: "v1", name: "Grand Taj Marquee", location: "DHA Phase 8, Lahore", capacity: "500-1000", price: "850,000", rating: 4.9, reviews: 124, tags: ["Marquee", "Premium", "Catering"], img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800", verified: true },
  { id: "v2", name: "Royal Palm Golf & Country Club", location: "Canal Road, Lahore", capacity: "200-800", price: "1,200,000", rating: 4.8, reviews: 89, tags: ["Outdoor", "Luxury", "Valet"], img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800", verified: true },
  { id: "v3", name: "Aura Grande", location: "E-11, Islamabad", capacity: "300-600", price: "600,000", rating: 4.7, reviews: 56, tags: ["Banquet", "Modern"], img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", verified: false },
  { id: "v4", name: "The Monal", location: "Pir Sohawa, Islamabad", capacity: "100-300", price: "450,000", rating: 4.9, reviews: 312, tags: ["Restaurant", "Scenic", "Outdoor"], img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", verified: true },
  { id: "v5", name: "Pearl Continental", location: "Saddar, Karachi", capacity: "400-1200", price: "2,500,000", rating: 4.8, reviews: 420, tags: ["Hotel", "Luxury", "Indoor"], img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800", verified: true },
  { id: "v6", name: "Bahria Grand Hotel", location: "Bahria Town, Lahore", capacity: "150-400", price: "800,000", rating: 4.6, reviews: 45, tags: ["Hotel", "Boutique"], img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800", verified: false },
]

export function VenueSearchDirectory() {
  const [activeCity, setActiveCity] = useState("All Cities")
  const [searchQuery, setSearchQuery] = useState("")
  const [guestCount, setGuestCount] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    )
  }

  const toggleVenueType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    )
  }

  const filteredVenues = MOCK_VENUES.filter(v => {
    // City filter
    if (activeCity !== "All Cities" && !v.location.toLowerCase().includes(activeCity.toLowerCase())) return false
    
    // Search query filter
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.location.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    // Guest count check (capacity matches minimum number, e.g. "500-1000")
    if (guestCount) {
      const parts = v.capacity.split("-")
      const minCapacity = parseInt(parts[0]) || 0
      const maxCapacity = parseInt(parts[1]) || 9999
      const queryGuests = parseInt(guestCount) || 0
      if (queryGuests > maxCapacity) return false
    }

    // Type tags filter
    if (selectedTypes.length > 0 && !v.tags.some(tag => selectedTypes.includes(tag))) return false

    // Amenities tags filter
    if (selectedAmenities.length > 0 && !v.tags.some(tag => selectedAmenities.includes(tag))) return false

    // Price parse filter
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#16423C]/10 to-[#C5A880]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#16423C]/5 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A880] uppercase block">Discover Heritage Venues</span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#16423C] tracking-wide leading-tight">
              Find Your Ideal <br />
              <span className="italic text-[#C5A880]">Wedding Venue</span>
            </h1>
            <p className="text-base md:text-lg text-[#2C2520]/70 max-w-xl mx-auto">
              Discover and book top-rated marquees, banquets, and outdoor spaces across Pakistan's major cultural hubs.
            </p>

            {/* Smart Search Capsule with Ambient Glow */}
            <div className="mt-10 bg-white p-3 rounded-2xl md:rounded-full border border-[#C5A880]/30 shadow-xl shadow-[#C5A880]/5 flex flex-col md:flex-row gap-3 max-w-4xl mx-auto relative z-20 focus-within:ring-2 focus-within:ring-[#16423C]/10 transition-all duration-300">
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#FDFBF7] rounded-xl md:rounded-full border border-[#C5A880]/15 focus-within:border-[#16423C] transition-colors group">
                <MapPin className="w-4 h-4 text-[#C5A880] group-focus-within:text-[#16423C]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where? (e.g. Canal Road, Lahore)" 
                  className="bg-transparent border-none outline-none w-full text-[#2C2520] font-medium placeholder:text-[#2C2520]/40 text-sm" 
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-[#FDFBF7] rounded-xl md:rounded-full border border-[#C5A880]/15 focus-within:border-[#16423C] transition-colors group">
                <Users className="w-4 h-4 text-[#C5A880] group-focus-within:text-[#16423C]" />
                <input 
                  type="number" 
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  placeholder="Guests (e.g. 500)" 
                  className="bg-transparent border-none outline-none w-full text-[#2C2520] font-medium placeholder:text-[#2C2520]/40 text-sm" 
                />
              </div>
              <button className="bg-[#16423C] hover:bg-[#0F2D29] text-white px-8 py-3 rounded-xl md:rounded-full font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-[#16423C]/10">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            {/* Quick City Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {["All Cities", "Lahore", "Islamabad", "Karachi", "Faisalabad"].map((city) => (
                <button 
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border ${
                    activeCity === city 
                      ? 'bg-[#16423C] text-white border-[#16423C] shadow-md' 
                      : 'bg-[#FDFBF7] text-[#2C2520]/80 border-[#C5A880]/30 hover:border-[#C5A880]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 🌟 Directory Grid & Sidebar 🌟 */}
      <div className="container mx-auto px-6 max-w-7xl mt-12 flex flex-col lg:flex-row gap-8 relative z-20">
        
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-[#C5A880]/20 shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg text-[#16423C] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C5A880]" /> Refine Search
              </h3>
              <button 
                onClick={() => {
                  setSelectedTypes([])
                  setMinPrice("")
                  setMaxPrice("")
                  setSelectedAmenities([])
                }}
                className="text-xs font-semibold text-[#C5A880] hover:text-[#16423C] hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 mb-3">Venue Type</h4>
                <div className="space-y-2.5">
                  {["Marquee", "Banquet Hall", "Outdoor / Farmhouse", "Hotel", "Restaurant"].map((type) => {
                    const isChecked = selectedTypes.includes(type)
                    return (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => toggleVenueType(type)}
                          className="sr-only" 
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                          isChecked 
                            ? 'border-[#16423C] bg-[#16423C] text-white' 
                            : 'border-[#C5A880]/40 group-hover:border-[#C5A880] bg-white'
                        }`}>
                          {isChecked && <div className="w-1.5 h-1.5 rounded-sm bg-white" />}
                        </div>
                        <span className="text-xs font-medium text-[#2C2520]/75 group-hover:text-[#16423C]">{type}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="h-[1px] bg-[#C5A880]/15" />

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
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2520]/80 mb-3">Amenities</h4>
                <div className="space-y-2.5">
                  {["Valet Parking", "Bridal Room", "In-house Catering", "Backup Generator", "Air Conditioning"].map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity)
                    return (
                      <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => toggleAmenity(amenity)}
                          className="sr-only" 
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                          isChecked 
                            ? 'border-[#16423C] bg-[#16423C] text-white' 
                            : 'border-[#C5A880]/40 group-hover:border-[#C5A880] bg-white'
                        }`}>
                          {isChecked && <div className="w-1.5 h-1.5 rounded-sm bg-white" />}
                        </div>
                        <span className="text-xs font-medium text-[#2C2520]/75 group-hover:text-[#16423C]">{amenity}</span>
                      </label>
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
              {activeCity === "All Cities" ? "Top Venues in Pakistan" : `Venues in ${activeCity}`}
            </h2>
            <p className="text-xs font-medium text-[#2C2520]/50 hidden sm:block">Showing {filteredVenues.length} results</p>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredVenues.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-[#C5A880]/10 p-12 text-center"
              >
                <p className="text-base text-[#2C2520]/70 font-medium">No venue spaces match your active filters.</p>
                <button 
                  onClick={() => {
                    setSearchQuery("")
                    setGuestCount("")
                    setSelectedTypes([])
                    setMinPrice("")
                    setMaxPrice("")
                    setSelectedAmenities([])
                  }}
                  className="mt-4 text-sm font-semibold text-[#16423C] underline decoration-[#C5A880]"
                >
                  Clear all search terms
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVenues.map((venue, i) => {
                  const isFav = favorites.includes(venue.id)
                  return (
                    <motion.div 
                      key={venue.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-[#C5A880]/20 overflow-hidden group hover:shadow-xl hover:shadow-[#C5A880]/5 hover:border-[#16423C]/40 transition-all duration-300 flex flex-col"
                    >
                      <div className="block relative aspect-[4/3] overflow-hidden bg-slate-50">
                        <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                        
                        {/* Favorite Heart Toggler */}
                        <button 
                          onClick={() => toggleFavorite(venue.id)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors z-10"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-10">
                          {venue.tags.slice(0, 2).map(tag => (
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
                              {venue.verified && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#C5A880] flex items-center gap-1 mb-0.5">
                                  <ShieldCheck className="w-3 h-3" /> Verified Partner
                                </span>
                              )}
                              <h3 className="text-lg font-serif text-[#16423C] group-hover:text-[#C5A880] transition-colors line-clamp-1">{venue.name}</h3>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded border border-amber-100 shrink-0">
                              <Star className="w-3 h-3 text-[#C5A880] fill-current" />
                              <span className="text-xs font-bold text-amber-800">{venue.rating}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5 mb-4">
                            <p className="text-xs font-medium text-[#2C2520]/60 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> {venue.location}
                            </p>
                            <p className="text-xs font-medium text-[#2C2520]/60 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#C5A880]" /> {venue.capacity} Guests
                            </p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-[#C5A880]/15 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] font-bold text-[#2C2520]/40 uppercase tracking-wider">Starting from</p>
                            <p className="text-sm font-mono font-bold text-[#16423C]">₨ {venue.price}</p>
                          </div>
                          <Link href={`/venues/${venue.id}`} className="w-9 h-9 rounded-full bg-[#FDFBF7] border border-[#C5A880]/20 flex items-center justify-center text-[#16423C] group-hover:bg-[#16423C] group-hover:border-transparent group-hover:text-white transition-all shadow-sm">
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
          
          {filteredVenues.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button className="px-6 py-3 bg-[#FDFBF7] border border-[#C5A880]/20 rounded-xl shadow-sm text-sm font-semibold text-[#2C2520] hover:bg-[#16423C] hover:text-white hover:border-transparent transition-all">
                Load More Venues
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
