"use client"
import { MapPin, SlidersHorizontal, Star, DollarSign, ChevronDown } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const city = searchParams.get("city") || "Any City"
  const price = searchParams.get("price") || "Price"
  const type = searchParams.get("type") || "Type"

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.get(key) === value) {
      params.delete(key) // Toggle off
    } else {
      params.set(key, value)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Cyclers for mock interaction
  const cycleCity = () => {
    const cities = ["Any City", "Lahore", "Karachi", "Islamabad"]
    const next = cities[(cities.indexOf(city) + 1) % cities.length]
    updateFilter("city", next)
  }

  const cyclePrice = () => {
    const prices = ["Price", "$", "$$", "$$$"]
    const next = prices[(prices.indexOf(price) + 1) % prices.length]
    updateFilter("price", next)
  }

  const cycleType = () => {
    const types = ["Type", "Marquee", "Banquet", "Outdoor", "Studio"]
    const next = types[(types.indexOf(type) + 1) % types.length]
    updateFilter("type", next)
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar border-b border-outline mb-6">
      <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-background border border-outline rounded-full text-sm font-medium hover:border-primary/50 transition-colors">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        Filters
      </button>
      
      <div className="w-px h-6 bg-outline mx-2 flex-shrink-0" />

      <button 
        onClick={cycleCity}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-background border rounded-full text-sm font-medium transition-colors ${city !== "Any City" ? "border-primary text-primary bg-primary/5" : "border-outline hover:border-primary/50"}`}
      >
        <MapPin className="w-4 h-4 text-muted-foreground" />
        {city}
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      <button 
        onClick={cyclePrice}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-background border rounded-full text-sm font-medium transition-colors ${price !== "Price" ? "border-primary text-primary bg-primary/5" : "border-outline hover:border-primary/50"}`}
      >
        <DollarSign className="w-4 h-4 text-muted-foreground" />
        {price}
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-background border border-outline rounded-full text-sm font-medium hover:border-primary/50 transition-colors">
        <Star className="w-4 h-4 text-muted-foreground" />
        Rating: 4.0+
      </button>

      <button 
        onClick={cycleType}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-background border rounded-full text-sm font-medium transition-colors ${type !== "Type" ? "border-primary text-primary bg-primary/5" : "border-outline hover:border-primary/50"}`}
      >
        {type}
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  )
}
