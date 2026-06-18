"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, CheckCircle, ShieldCheck, Mail } from "lucide-react"

export interface Decorator {
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
  rendersIncluded: boolean
}

const FEATURED_DECORATORS: Decorator[] = [
  {
    id: 1,
    name: "Lumina Decor & Florals",
    specialty: "High-End Hanging Floral Scales & Grand Stage Rigs",
    category: "Floral Rigs & Stage",
    location: "Lahore",
    rate: "PKR 150,000",
    rating: 5.0,
    reviews: 184,
    verified: true,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
    features: ["Natural Roses Wall", "Hanging Jasmine Archs", "Walking Aisle Rigs"],
    rendersIncluded: true
  },
  {
    id: 2,
    name: "Royal Floral Art",
    specialty: "Luxury Theme Decor, DMX Lights & Stage Structures",
    category: "Floral Rigs & Stage",
    location: "Karachi",
    rate: "PKR 250,000",
    rating: 4.9,
    reviews: 142,
    verified: true,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80",
    features: ["3D Truss Stages", "Hanging Crystals Grid", "Ambient Moving Heads"],
    rendersIncluded: true
  },
  {
    id: 3,
    name: "Aura Events Decor",
    specialty: "Vibrant Traditional Mehndi Rigs & Marigold Backdrops",
    category: "Traditional Themes",
    location: "Islamabad",
    rate: "PKR 120,000",
    rating: 4.8,
    reviews: 95,
    verified: true,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=80",
    features: ["Yellow Marigold Curtains", "Dholki Floor Seating", "Traditional Clay Lamps"],
    rendersIncluded: false
  },
  {
    id: 4,
    name: "Minimalist Metals & Co.",
    specialty: "Modern Metal Grids, Pampas Grass & Neon Rigs",
    category: "Modern Minimalist",
    location: "Lahore",
    rate: "PKR 100,000",
    rating: 4.9,
    reviews: 63,
    verified: false,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80",
    features: ["Geometric Stage Trusses", "Edison Hanging Bulbs", "Pampas Grass Bouquets"],
    rendersIncluded: true
  }
]

interface DecoratorFeaturedProps {
  searchQuery: string
  selectedCity: string
}

export function DecoratorFeatured({ searchQuery, selectedCity }: DecoratorFeaturedProps) {
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Floral Rigs & Stage", "Traditional Themes", "Modern Minimalist", "Table & Seat Linens"]

  const filteredDecorators = FEATURED_DECORATORS.filter((decor) => {
    const matchesSearch =
      decor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      decor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      decor.features.some(feat => feat.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCity = selectedCity === "" || decor.location.toLowerCase() === selectedCity.toLowerCase()
    
    // Fuzzy match category
    const matchesCategory =
      filterCategory === "All" ||
      decor.category === filterCategory ||
      (filterCategory === "Table & Seat Linens" && decor.features.includes("Hanging Crystals Grid"))

    return matchesSearch && matchesCity && matchesCategory
  })

  return (
    <section className="py-16 bg-[#FFFAFB] border-t border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
              <Star className="w-4 h-4 fill-secondary" /> Master Designers
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">
              Featured Event Decorators
            </h2>
            <p className="text-muted-foreground font-medium">
              Hand-picked stage builders and lighting engineers with certified staging structures and 3D digital renders.
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

        {filteredDecorators.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-outline">
            <p className="text-muted-foreground font-semibold">No decorators found matching your filters.</p>
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
              {filteredDecorators.map((decor) => (
                <motion.div
                  layout
                  key={decor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-card rounded-2xl border border-outline overflow-hidden hover:border-primary/20 transition-all flex flex-col justify-between group shadow-none"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-slate-100 border-b border-outline overflow-hidden">
                      <img
                        src={decor.image}
                        alt={decor.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg text-[10px] font-bold text-foreground border border-outline">
                          {decor.category}
                        </span>
                        {decor.rendersIncluded && (
                          <span className="px-2.5 py-1 bg-emerald-500/95 text-white backdrop-blur-md rounded-lg text-[10px] font-bold">
                            3D Renders ✓
                          </span>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-yellow-50/95 backdrop-blur-md border border-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold">{decor.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                          {decor.name}
                        </h3>
                        {decor.verified && (
                          <CheckCircle className="w-4.5 h-4.5 text-primary fill-primary/10 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs font-semibold text-muted-foreground mb-4">{decor.specialty}</p>

                      {/* Location & Reviews */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {decor.location}
                        </span>
                        <span>•</span>
                        <span>{decor.reviews} reviews</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {decor.features.map((feat) => (
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
                        Setups From
                      </span>
                      <span className="font-black text-primary text-base">{decor.rate}</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-none">
                      <Mail className="w-3.5 h-3.5" /> Book Consultation
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
