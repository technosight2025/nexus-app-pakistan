"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, CheckCircle, ShieldCheck, Mail } from "lucide-react"

export interface Restaurant {
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
  maxGuests: number
}

const FEATURED_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "Kolachi Rooftop",
    specialty: "High-End Seaside Rooftop BBQ & Traditional Feasts",
    category: "Rooftop Lounges",
    location: "Karachi",
    rate: "PKR 3,500",
    rating: 5.0,
    reviews: 890,
    verified: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    features: ["Seaside View", "Live Charcoal Grill", "Private VIP Deck"],
    maxGuests: 300
  },
  {
    id: 2,
    name: "Lal Qila Buffet",
    specialty: "Theme Mughal Buffet Experience & Live Stations",
    category: "Buffet Halls",
    location: "Karachi",
    rate: "PKR 2,400",
    rating: 4.8,
    reviews: 632,
    verified: true,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80",
    features: ["Mughlai Design Hall", "100+ Buffet Items", "In-house Sound System"],
    maxGuests: 150
  },
  {
    id: 3,
    name: "The Monal Margalla",
    specialty: "Scenic Margalla Hills Rooftop Banquet Dining",
    category: "Rooftop Lounges",
    location: "Islamabad",
    rate: "PKR 3,000",
    rating: 4.9,
    reviews: 512,
    verified: true,
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=400&q=80",
    features: ["Hill Skyline Views", "Live Traditional Music", "Heated Event Deck"],
    maxGuests: 250
  },
  {
    id: 4,
    name: "Salt'n Pepper Village",
    specialty: "Traditional Folk Buffet & Private Banquet Halls",
    category: "Mini Banquet Halls",
    location: "Lahore",
    rate: "PKR 2,800",
    rating: 4.7,
    reviews: 342,
    verified: true,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
    features: ["Pure Ghee Mutton Karahi", "Projector & Mic Rig", "Dedicated Buffet Stewards"],
    maxGuests: 120
  }
]

interface RestaurantFeaturedProps {
  searchQuery: string
  selectedCity: string
}

export function RestaurantFeatured({ searchQuery, selectedCity }: RestaurantFeaturedProps) {
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Private Dining Rooms", "Rooftop Lounges", "Buffet Halls", "High-Tea Lounges", "Mini Banquet Halls"]

  const filteredRestaurants = FEATURED_RESTAURANTS.filter((rest) => {
    const matchesSearch =
      rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rest.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCity = selectedCity === "" || rest.location.toLowerCase() === selectedCity.toLowerCase()
    
    // Fuzzy match category
    const matchesCategory =
      filterCategory === "All" ||
      rest.category === filterCategory

    return matchesSearch && matchesCity && matchesCategory
  })

  return (
    <section className="py-16 bg-[#FFFAFB] border-t border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
              <Star className="w-4 h-4 fill-secondary" /> Star Spaces
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              Featured Dining Venues
            </h2>
            <p className="text-muted-foreground font-medium">
              Top event-ready restaurants with verified private lounges, custom buffet setups, and visual equipment.
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

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-outline">
            <p className="text-muted-foreground font-semibold">No dining spaces found matching your filters.</p>
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
              {filteredRestaurants.map((rest) => (
                <motion.div
                  layout
                  key={rest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-2xl border border-outline overflow-hidden hover:border-primary/20 transition-all flex flex-col justify-between group shadow-none"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-100 border-b border-outline overflow-hidden">
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-bold text-foreground border border-outline">
                          {rest.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-50/95 backdrop-blur-md border border-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold">{rest.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                          {rest.name}
                        </h3>
                        {rest.verified && (
                          <CheckCircle className="w-4.5 h-4.5 text-primary fill-primary/10 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground mb-4">{rest.specialty}</p>

                      {/* Location & Reviews */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {rest.location}
                        </span>
                        <span>•</span>
                        <span>Max Capacity: {rest.maxGuests} guests</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {rest.features.map((feat) => (
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
                        Est. Menu
                      </span>
                      <span className="font-black text-primary text-base">{rest.rate} / head</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-none">
                      <Mail className="w-3.5 h-3.5" /> Request Booking
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
