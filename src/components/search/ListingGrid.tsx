"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { Star, MapPin, Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { MOCK_VENUES, MOCK_VENDORS } from "./MockData"

interface ListingGridProps {
  activeTab: "venues" | "vendors"
}

// Sub-component to manage individual card state (Interactive)
function ListingCard({ item }: { item: any }) {
  const [isSaved, setIsSaved] = useState(false)
  const [currentImg, setCurrentImg] = useState(0)

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImg((prev) => (prev === item.images.length - 1 ? 0 : prev + 1))
  }

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImg((prev) => (prev === 0 ? item.images.length - 1 : prev - 1))
  }

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-outline hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
      
      {/* Interactive Image Carousel */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image 
          src={item.images[currentImg]} 
          alt={item.name} 
          fill 
          sizes="(max-width: 1280px) 100vw, 50vw"
          className="object-cover transition-transform duration-700" 
        />
        
        {/* Navigation Arrows (Show on Hover) */}
        {item.images.length > 1 && (
          <>
            <button 
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all text-slate-700 shadow-sm z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all text-slate-700 shadow-sm z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Image Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {item.images.map((_: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${idx === currentImg ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {item.isFeatured && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>
        
        {/* Interactive Heart */}
        <button 
          onClick={toggleSave}
          className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm z-10"
        >
          <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-pink-500 text-pink-500' : 'text-muted-foreground hover:text-pink-500'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow cursor-pointer group-hover:bg-slate-50/50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
              {"type" in item ? item.type : item.category}
            </p>
            <h3 className="text-xl font-black text-foreground line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-sm">{item.rating}</span>
            <span className="text-xs text-muted-foreground">({item.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4" />
          {item.area}, {item.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {item.features.slice(0, 3).map((feature: string) => (
            <span key={feature} className="bg-slate-100 text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-md">
              {feature}
            </span>
          ))}
          {item.features.length > 3 && (
            <span className="bg-slate-100 text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-md">
              +{item.features.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
            <p className="text-lg font-black text-foreground">
              Rs: {"pricePerHead" in item ? item.pricePerHead.toLocaleString() : item.startingPrice.toLocaleString()}
              <span className="text-sm font-medium text-muted-foreground">
                {"pricePerHead" in item ? " / head" : ""}
              </span>
            </p>
          </div>
          
          <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-xl font-bold transition-colors">
            <MessageCircle className="w-4 h-4" />
            Request Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export function ListingGrid({ activeTab }: ListingGridProps) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      const city = searchParams.get("city")
      const type = searchParams.get("type")
      const q = searchParams.get("q")
      
      try {
        const supabase = createClient()
        let query = supabase.from("businesses").select("*")

        // Apply filters to DB query
        if (city && city !== "Any City") {
          query = query.ilike("city", `%${city}%`)
        }
        if (type && type !== "Type") {
          query = query.eq("business_type", type)
        }
        if (q) {
          query = query.or(`name.ilike.%${q}%,business_type.ilike.%${q}%,city.ilike.%${q}%`)
        }
        
        const { data, error } = await query

        if (!error && data && data.length > 0) {
          // If DB has data, map it (mocking image structure for now)
          let mapped = data.map(d => ({
            ...d,
            images: d.images || ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"],
            features: d.features || ["Air Conditioned", "Parking"],
            rating: 4.5,
            reviews: 12,
            area: d.city || "Lahore",
            location: "Main Boulevard",
            startingPrice: 5000
          }))

          if (q) {
            const lowerQ = q.toLowerCase()
            mapped = mapped.filter(m => {
              const name = (m.name || "").toLowerCase()
              const itemType = (m.business_type || "").toLowerCase()
              const location = (m.city || "").toLowerCase()
              const features = (m.features || []).some((f: string) => f.toLowerCase().includes(lowerQ))
              return name.includes(lowerQ) || itemType.includes(lowerQ) || location.includes(lowerQ) || features
            })
          }
          setItems(mapped)
        } else {
          // Fallback to mock data and apply local filtering
          let mocks: any[] = activeTab === "venues" ? [...MOCK_VENUES] : [...MOCK_VENDORS]
          
          if (city && city !== "Any City") {
            mocks = mocks.filter(m => {
              const searchArea = m.area || m.location || ""
              return searchArea.toLowerCase().includes(city.toLowerCase())
            })
          }
          if (type && type !== "Type") {
            mocks = mocks.filter(m => {
              const itemType = ("type" in m ? m.type : m.category).toLowerCase()
              return itemType.includes(type.toLowerCase())
            })
          }
          if (q) {
            const lowerQ = q.toLowerCase()
            mocks = mocks.filter(m => {
              const name = (m.name || "").toLowerCase()
              const typeOrCategory = (("type" in m ? m.type : m.category) || "").toLowerCase()
              const location = (m.location || "").toLowerCase()
              const area = (m.area || "").toLowerCase()
              const features = (m.features || []).some((f: string) => f.toLowerCase().includes(lowerQ))
              return name.includes(lowerQ) || typeOrCategory.includes(lowerQ) || location.includes(lowerQ) || area.includes(lowerQ) || features
            })
          }
          setItems(mocks)
        }
      } catch (err) {
        // Fallback on error
        setItems(activeTab === "venues" ? MOCK_VENUES : MOCK_VENDORS)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [activeTab, searchParams])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-bold text-foreground mb-2">No listings found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  )
}
