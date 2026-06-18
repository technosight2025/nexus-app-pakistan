"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, CheckCircle, ShieldCheck, Mail } from "lucide-react"

export interface Videographer {
  id: number
  name: string
  specialty: string
  category: string
  location: string
  rate: string
  rating: number
  reviews: number
  verified: boolean
  image: string
  features: string[]
  droneIncluded: boolean
}

const FEATURED_VIDEOGRAPHERS: Videographer[] = [
  {
    id: 1,
    name: "Qasim Ali Mureed Films",
    specialty: "High-End Cinematic Wedding Highlights & Trailers",
    category: "Cinematic Highlight",
    location: "Karachi",
    rate: "PKR 200,000",
    rating: 5.0,
    reviews: 156,
    verified: true,
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&w=400&q=80",
    features: ["RED V-Raptor 8K", "Cinema Lenses", "Same Day Edit Option"],
    droneIncluded: true
  },
  {
    id: 2,
    name: "Maha's Cinematic Squad",
    specialty: "Story-Driven Cinematic Reels & Wedding Films",
    category: "Cinematic Highlight",
    location: "Lahore",
    rate: "PKR 150,000",
    rating: 4.9,
    reviews: 290,
    verified: true,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    features: ["Sony FX3 Rig", "DJI Ronin 2 Stabilizers", "Multicam Coverage"],
    droneIncluded: true
  },
  {
    id: 3,
    name: "Lumina Wedding Films",
    specialty: "Acoustic Documentary Coverage & Main Highlights",
    category: "Documentary Films",
    location: "Islamabad",
    rate: "PKR 180,000",
    rating: 4.8,
    reviews: 112,
    verified: true,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80",
    features: ["Raw Speech Tracks", "Colorist Grading", "4K HDR Master"],
    droneIncluded: false
  },
  {
    id: 4,
    name: "HypeReels Media",
    specialty: "Fast-Paced Instagram Teasers & Social Media Promos",
    category: "Social Media Teasers",
    location: "Lahore",
    rate: "PKR 80,000",
    rating: 4.9,
    reviews: 64,
    verified: true,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80",
    features: ["Portrait Video Cut", "Fast Delivery (48 Hours)", "Tiktok Formats"],
    droneIncluded: false
  },
  {
    id: 5,
    name: "Traditional Sound & Media",
    specialty: "Standard Full-Length Stage Multicam Coverage",
    category: "Traditional Multicam",
    location: "Peshawar",
    rate: "PKR 90,000",
    rating: 4.7,
    reviews: 42,
    verified: false,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80",
    features: ["2x Sony A7IV", "Main Stage Sound Tap", "Full Duration Edit"],
    droneIncluded: false
  }
]

interface VideographerFeaturedProps {
  searchQuery: string
  selectedCity: string
}

export function VideographerFeatured({ searchQuery, selectedCity }: VideographerFeaturedProps) {
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Cinematic Highlight", "Documentary Films", "Social Media Teasers", "Traditional Multicam"]

  const filteredVideographers = FEATURED_VIDEOGRAPHERS.filter((video) => {
    const matchesSearch =
      video.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCity = selectedCity === "" || video.location.toLowerCase() === selectedCity.toLowerCase()
    const matchesCategory = filterCategory === "All" || video.category === filterCategory

    return matchesSearch && matchesCity && matchesCategory
  })

  return (
    <section className="py-16 bg-[#FFFAFB] border-t border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
              <Star className="w-4 h-4 fill-secondary" /> Star Filmmakers
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              Featured Videographers & Studios
            </h2>
            <p className="text-muted-foreground font-medium">
              Top event directors and cinema crews with high-speed lenses, colorists, and prompt video delivery.
            </p>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-outline w-max max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.split(" ")[0]} {cat !== "All" && "..."}
              </button>
            ))}
          </div>
        </div>

        {filteredVideographers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-outline">
            <p className="text-muted-foreground font-semibold">No videographers found matching your filters.</p>
            <button
              onClick={() => {
                setFilterCategory("All")
              }}
              className="mt-4 text-sm font-bold text-primary hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredVideographers.map((video) => (
                <motion.div
                  layout
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-2xl border border-outline overflow-hidden hover:border-primary/20 transition-all flex flex-col justify-between group shadow-none"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-100 border-b border-outline overflow-hidden">
                      <img
                        src={video.image}
                        alt={video.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-bold text-foreground border border-outline">
                          {video.category}
                        </span>
                        {video.droneIncluded && (
                          <span className="px-2.5 py-1 bg-emerald-500/95 text-white backdrop-blur-md rounded-lg text-[10px] font-bold">
                            Drone Incl.
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-50/95 backdrop-blur-md border border-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold">{video.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                          {video.name}
                        </h3>
                        {video.verified && (
                          <CheckCircle className="w-4.5 h-4.5 text-primary fill-primary/10 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground mb-4">{video.specialty}</p>

                      {/* Location & Reviews */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {video.location}
                        </span>
                        <span>•</span>
                        <span>{video.reviews} reviews</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {video.features.map((feat) => (
                          <span
                            key={feat}
                            className="px-2 py-0.5 bg-slate-50 text-slate-600 rounded-md text-[10px] font-bold border border-outline"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-4 border-t border-outline flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                        Packages From
                      </span>
                      <span className="font-black text-primary text-base">{video.rate} / day</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-none">
                      <Mail className="w-3.5 h-3.5" /> Request Quote
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
