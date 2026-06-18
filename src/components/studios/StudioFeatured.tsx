"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, CheckCircle, ShieldCheck, Mail } from "lucide-react"

export interface Studio {
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
  stageCapacity: string
}

const FEATURED_STUDIOS: Studio[] = [
  {
    id: 1,
    name: "Lumina Cinematic Studios",
    specialty: "High-End Video Editing & Color Suites",
    category: "Cinematic Film Studios",
    location: "Lahore",
    rate: "PKR 75,000",
    rating: 4.9,
    reviews: 142,
    verified: true,
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&w=400&q=80",
    features: ["DaVinci Resolve Panel", "4K HDR Monitors", "Acoustic Insulation"],
    stageCapacity: "10-12 editors"
  },
  {
    id: 2,
    name: "Echo Sound Stage & Dubbing",
    specialty: "Acoustic Audio Recording & Mixing Stage",
    category: "Sound Recording & Foley",
    location: "Karachi",
    rate: "PKR 50,000",
    rating: 5.0,
    reviews: 89,
    verified: true,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80",
    features: ["ProTools HDX", "Vocal Isolation Booths", "Live Ensemble Area"],
    stageCapacity: "Up to 30 Musicians"
  },
  {
    id: 3,
    name: "Aura Fashion Bay",
    specialty: "Cyclorama & Commercial Photographic Studio",
    category: "Commercial & Fashion",
    location: "Lahore",
    rate: "PKR 60,000",
    rating: 4.8,
    reviews: 95,
    verified: true,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    features: ["25ft White Cyclorama", "Wireless DMX Lights", "Bridal Dressing Bay"],
    stageCapacity: "50 Crew Max"
  },
  {
    id: 4,
    name: "Apex Virtual Production Stage",
    specialty: "VFX Chromakey & Projection Mapping Suite",
    category: "VFX & Green Screen",
    location: "Islamabad",
    rate: "PKR 120,000",
    rating: 5.0,
    reviews: 38,
    verified: true,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80",
    features: ["Full 180° Green Screen", "Unreal Engine Sync", "High-Speed Rail Camera"],
    stageCapacity: "70 Crew Max"
  },
  {
    id: 5,
    name: "Redline Camera Gear Depot",
    specialty: "High-End Cinema Camera & Lighting Hire",
    category: "Equipment & Gear Hire",
    location: "Karachi",
    rate: "PKR 45,000",
    rating: 4.7,
    reviews: 114,
    verified: false,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80",
    features: ["RED V-Raptor 8K", "Arri Signature Primes", "Aputure Electro Storms"],
    stageCapacity: "Gear Only"
  },
  {
    id: 6,
    name: "Skyview Aerials Office",
    specialty: "Heavy-Lifter Drone & Stabilizer Rigging",
    category: "Equipment & Gear Hire",
    location: "Islamabad",
    rate: "PKR 55,000",
    rating: 4.9,
    reviews: 73,
    verified: true,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80",
    features: ["DJI Inspire 3 Drone", "Ronin 2 Gimbal", "Standby Operator Pack"],
    stageCapacity: "Gear + Crew"
  }
]

interface StudioFeaturedProps {
  searchQuery: string
  selectedCity: string
}

export function StudioFeatured({ searchQuery, selectedCity }: StudioFeaturedProps) {
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Cinematic Film Studios", "Sound Recording & Foley", "Commercial & Fashion", "VFX & Green Screen", "Equipment & Gear Hire"]

  const filteredStudios = FEATURED_STUDIOS.filter((studio) => {
    const matchesSearch =
      studio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCity = selectedCity === "" || studio.location.toLowerCase() === selectedCity.toLowerCase()
    const matchesCategory = filterCategory === "All" || studio.category === filterCategory

    return matchesSearch && matchesCity && matchesCategory
  })

  return (
    <section className="py-16 bg-[#FFFAFB] border-t border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
              <Star className="w-4 h-4 fill-secondary" /> Verified Spaces
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              Featured Production Spaces
            </h2>
            <p className="text-muted-foreground font-medium">
              Acoustically insulated, temperature controlled, and generator backup equipped creative studios.
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

        {filteredStudios.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-outline">
            <p className="text-muted-foreground font-semibold">No studios found matching your search filters.</p>
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
              {filteredStudios.map((studio) => (
                <motion.div
                  layout
                  key={studio.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-2xl border border-outline overflow-hidden hover:border-primary/20 transition-all flex flex-col justify-between group shadow-none"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-100 border-b border-outline overflow-hidden">
                      <img
                        src={studio.image}
                        alt={studio.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-1.5">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-bold text-foreground border border-outline">
                          {studio.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-50/95 backdrop-blur-md border border-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold">{studio.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                          {studio.name}
                        </h3>
                        {studio.verified && (
                          <CheckCircle className="w-4.5 h-4.5 text-primary fill-primary/10 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground mb-4">{studio.specialty}</p>

                      {/* Location & Capacity */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {studio.location}
                        </span>
                        <span>•</span>
                        <span>Capacity: {studio.stageCapacity}</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {studio.features.map((feat) => (
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
                        Starts From
                      </span>
                      <span className="font-black text-primary text-base">{studio.rate} / day</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-none">
                      <Mail className="w-3.5 h-3.5" /> Book Stage
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
