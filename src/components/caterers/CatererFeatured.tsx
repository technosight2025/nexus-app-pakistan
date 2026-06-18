"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, CheckCircle, ShieldCheck, Mail } from "lucide-react"

export interface Caterer {
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
  haccpCertified: boolean
}

const FEATURED_CATERERS: Caterer[] = [
  {
    id: 1,
    name: "Dawat Caterers",
    specialty: "High-End Traditional Wedding Feasts & Biryanis",
    category: "Traditional Shadi Feast",
    location: "Karachi",
    rate: "PKR 2,200",
    rating: 4.8,
    reviews: 412,
    verified: true,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80",
    features: ["Daigi Biryani", "Special Taftan", "Live Gajar Halwa"],
    haccpCertified: true
  },
  {
    id: 2,
    name: "Mughal-e-Azam Feasts",
    specialty: "Pure Ghee Traditional Daigs & Live BBQ",
    category: "Traditional Shadi Feast",
    location: "Lahore",
    rate: "PKR 2,800",
    rating: 5.0,
    reviews: 320,
    verified: true,
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=400&q=80",
    features: ["Special Mutton Korma", "Kastori Boti", "Zafrani Kheer"],
    haccpCertified: true
  },
  {
    id: 3,
    name: "Royal Food Art & Buffets",
    specialty: "Premium Continental Buffets & Mocktail Bars",
    category: "Continental & Fusion Buffet",
    location: "Islamabad",
    rate: "PKR 3,500",
    rating: 4.9,
    reviews: 189,
    verified: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    features: ["Live Pasta Counters", "Sushi Station", "Pina Colada Bar"],
    haccpCertified: true
  },
  {
    id: 4,
    name: "Chaat & Bite Co.",
    specialty: "High-Tea arrangements, Grazing Tables & Samosa Bars",
    category: "High-Tea & Appetizers",
    location: "Lahore",
    rate: "PKR 1,500",
    rating: 4.7,
    reviews: 86,
    verified: false,
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=400&q=80",
    features: ["Pani Puri Station", "Mini Beef Sliders", "Kashmiri Chai"],
    haccpCertified: false
  },
  {
    id: 5,
    name: "Jalebi & Ice Masters",
    specialty: "Live Hot Jalebis, Kulfis & Dessert Boards",
    category: "Dessert & Sweet Stations",
    location: "Karachi",
    rate: "PKR 900",
    rating: 4.9,
    reviews: 143,
    verified: true,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80",
    features: ["Live Jalebi Fryers", "Shahi Tukray", "Pistachio Kulfi Carts"],
    haccpCertified: true
  }
]

interface CatererFeaturedProps {
  searchQuery: string
  selectedCity: string
}

export function CatererFeatured({ searchQuery, selectedCity }: CatererFeaturedProps) {
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Traditional Shadi Feast", "Live BBQ & Karahi", "Continental & Fusion Buffet", "High-Tea & Appetizers", "Dessert & Sweet Stations"]

  const filteredCaterers = FEATURED_CATERERS.filter((caterer) => {
    const matchesSearch =
      caterer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caterer.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCity = selectedCity === "" || caterer.location.toLowerCase() === selectedCity.toLowerCase()
    
    // Fuzzy match category
    const matchesCategory =
      filterCategory === "All" ||
      caterer.category === filterCategory ||
      (filterCategory === "Live BBQ & Karahi" && caterer.category === "Traditional Shadi Feast" && caterer.features.includes("Special Mutton Korma"))

    return matchesSearch && matchesCity && matchesCategory
  })

  return (
    <section className="py-16 bg-[#FFFAFB] border-t border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
              <Star className="w-4 h-4 fill-secondary" /> Premium Taste
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              Featured Catering Services
            </h2>
            <p className="text-muted-foreground font-medium">
              Top culinary teams providing strict sanitation controls, food tasting trials, and hot event day deliveries.
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

        {filteredCaterers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-outline">
            <p className="text-muted-foreground font-semibold">No caterers found matching your filters.</p>
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
              {filteredCaterers.map((caterer) => (
                <motion.div
                  layout
                  key={caterer.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-2xl border border-outline overflow-hidden hover:border-primary/20 transition-all flex flex-col justify-between group shadow-none"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-100 border-b border-outline overflow-hidden">
                      <img
                        src={caterer.image}
                        alt={caterer.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-bold text-foreground border border-outline">
                          {caterer.category}
                        </span>
                        {caterer.haccpCertified && (
                          <span className="px-2.5 py-1 bg-emerald-500/95 text-white backdrop-blur-md rounded-lg text-[10px] font-bold">
                            Sanitary Audit ✓
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-50/95 backdrop-blur-md border border-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold">{caterer.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                          {caterer.name}
                        </h3>
                        {caterer.verified && (
                          <CheckCircle className="w-4.5 h-4.5 text-primary fill-primary/10 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground mb-4">{caterer.specialty}</p>

                      {/* Location & Reviews */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {caterer.location}
                        </span>
                        <span>•</span>
                        <span>{caterer.reviews} reviews</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {caterer.features.map((feat) => (
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
                        Est. Cost
                      </span>
                      <span className="font-black text-primary text-base">{caterer.rate} / head</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-none">
                      <Mail className="w-3.5 h-3.5" /> Book Tasting
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
