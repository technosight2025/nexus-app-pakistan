"use client"

import React from 'react'
import { MarketplaceCard } from './MarketplaceCard'

export interface ContentGridProps {
  activeCategory: string
  compareList: string[]
  setCompareList: React.Dispatch<React.SetStateAction<string[]>>
  searchQuery?: string
  selectedCity?: string
  selectedBudget?: string
  selectedAvailability?: string
  activeMode?: 'gigs' | 'rentals'
  onItemSelect?: (item: any) => void
}

export function ContentGrid({ 
  activeCategory, 
  compareList, 
  setCompareList,
  searchQuery = "",
  selectedCity = "All Cities",
  selectedBudget = "Any Budget",
  selectedAvailability = "Any Date",
  activeMode = "gigs",
  onItemSelect
}: ContentGridProps) {

  const MOCK_DATA = [
    {
      id: "prof-1",
      type: "photographer" as const,
      name: "Usman Ali Photography",
      category: "Photography",
      location: "Lahore, Punjab",
      rating: 4.9,
      reviews: 128,
      price: "75,000",
      images: [
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150",
      badge: "Top Rated",
      isVerified: true,
      isPremium: true,
      previews: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Drone Included", "Same-Day Edit", "Luxury Album"],
      bookedDates: ["Nov 15", "Nov 16"]
    },
    {
      id: "prof-2",
      type: "photographer" as const,
      name: "NM Cinematics & Video",
      category: "Videography",
      location: "Islamabad, Capital",
      rating: 4.8,
      reviews: 96,
      price: "120,000",
      images: [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511899726470-55269784b2eb?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
      badge: "Popular",
      isVerified: true,
      isPremium: false,
      previews: [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Cinematic Films", "Multi-Camera", "4K Resolution"],
      bookedDates: ["Oct 28", "Oct 30"]
    },
    {
      id: "prof-lehnga",
      type: "workforce" as const,
      name: "Zardozi Lehnga Boutique",
      category: "Lehnga Rental",
      location: "Gulberg, Lahore",
      rating: 4.9,
      reviews: 142,
      price: "15,000",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
      badge: "Designer",
      isVerified: true,
      isPremium: true,
      previews: [],
      features: ["Designer Bridal Wear", "Custom Fittings", "Free Alterations"],
      bookedDates: ["Dec 05", "Dec 12", "Jan 10"]
    },
    {
      id: "prof-3",
      type: "decorator" as const,
      name: "Sarah Khan Bridal Salon",
      category: "Makeup Artist",
      location: "Karachi, Sindh",
      rating: 4.9,
      reviews: 73,
      price: "45,000",
      images: [
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      badge: "Verified",
      isVerified: true,
      isPremium: true,
      previews: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Bridal Makeup", "Party Makeup", "Airbrush Finish"],
      bookedDates: ["Nov 20", "Nov 25", "Dec 01"]
    },
    {
      id: "prof-4",
      type: "decorator" as const,
      name: "Floral Dreams Event Decor",
      category: "Decorator",
      location: "Lahore, Punjab",
      rating: 4.7,
      reviews: 81,
      price: "150,000",
      images: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
      badge: "New",
      isVerified: false,
      isPremium: false,
      previews: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Floral Archways", "Custom Lighting", "Theme Design"],
      bookedDates: ["Dec 15"]
    },
    {
      id: "prof-5",
      type: "venue" as const,
      name: "Royal Palm Grand Marquee",
      category: "Venues",
      location: "Lahore, Punjab",
      rating: 4.9,
      reviews: 142,
      price: "250,000",
      images: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
      badge: "Top Rated",
      isVerified: true,
      isPremium: true,
      previews: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Indoor Halls", "Outdoor Lawn", "Catering"],
      bookedDates: ["Dec 20", "Dec 21"]
    },
    {
      id: "prof-6",
      type: "package" as const,
      name: "Bismillah Catering & Daig Services",
      category: "Catering",
      location: "Lahore, Punjab",
      rating: 4.8,
      reviews: 67,
      price: "45,000",
      images: [
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      badge: "Verified",
      isVerified: true,
      isPremium: false,
      previews: [
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Desi Cuisine", "Live BBQ", "Table Service"],
      bookedDates: ["Nov 18", "Nov 19"]
    },
    {
      id: "prof-7",
      type: "decorator" as const,
      name: "Fareed Ayaz Qawwal Band",
      category: "Entertainment",
      location: "Karachi, Sindh",
      rating: 5.0,
      reviews: 89,
      price: "180,000",
      images: [
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150",
      badge: "Top Rated",
      isVerified: true,
      isPremium: true,
      previews: [
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Live Qawwali", "Sound System", "Lighting"],
      bookedDates: ["Dec 01", "Dec 05"]
    },
    {
      id: "prof-8",
      type: "workforce" as const,
      name: "PixelStream LED Signs & Projectors",
      category: "Digital Displays",
      location: "Islamabad, Capital",
      rating: 4.7,
      reviews: 34,
      price: "35,000",
      images: [
        "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150",
      badge: "Popular",
      isVerified: true,
      isPremium: false,
      previews: [
        "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["SMD Screens", "LED Setup", "Technical Support"],
      bookedDates: ["Jan 15", "Jan 16"]
    },
    {
      id: "prof-9",
      type: "workforce" as const,
      name: "PakRent VIP Luxury Cars",
      category: "Transport",
      location: "Lahore, Punjab",
      rating: 4.6,
      reviews: 21,
      price: "15,000",
      images: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop"
      ],
      avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=150",
      badge: "Verified",
      isVerified: true,
      isPremium: false,
      previews: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=150&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=150&auto=format&fit=crop"
      ],
      features: ["Luxury Cars", "Chauffeur", "Decoration"],
      bookedDates: ["Dec 14", "Dec 25"]
    }
  ]

  // Filtering logic
  const filteredData = MOCK_DATA.filter(item => {
    // 0. Mode Filter
    const isGigCategory = ['Photography', 'Videography', 'Decorator', 'Makeup Artist', 'Catering', 'Entertainment'].includes(item.category)
    const isRentalCategory = ['Venues', 'Lehnga Rental', 'Digital Displays', 'Transport'].includes(item.category)
    if (activeMode === 'gigs' && !isGigCategory) return false
    if (activeMode === 'rentals' && !isRentalCategory) return false

    // 1. Category Filter
    if (activeCategory !== "All") {
      if (item.category !== activeCategory) return false
    }

    // 2. City Filter
    if (selectedCity !== "All Cities") {
      const cityClean = selectedCity.split(" ")[0].toLowerCase()
      if (!item.location.toLowerCase().includes(cityClean)) return false
    }

    // 3. Budget Filter
    if (selectedBudget !== "Any Budget") {
      const priceNum = parseInt(item.price.replace(/,/g, ""), 10)
      if (selectedBudget === "Budget (< 50k)") {
        if (priceNum >= 50000) return false
      } else if (selectedBudget === "Mid-Range (50k-120k)") {
        if (priceNum < 50000 || priceNum > 120000) return false
      } else if (selectedBudget === "Premium (> 120k)") {
        if (priceNum <= 120000) return false
      }
    }

    // 4. Text Search / AI Matchmaker Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      
      // Look for city references in query (e.g., "lahore", "karachi")
      const mentionsLahore = query.includes("lahore")
      const mentionsKarachi = query.includes("karachi")
      const mentionsIslamabad = query.includes("islamabad")
      
      if (mentionsLahore && !item.location.toLowerCase().includes("lahore")) return false
      if (mentionsKarachi && !item.location.toLowerCase().includes("karachi")) return false
      if (mentionsIslamabad && !item.location.toLowerCase().includes("islamabad")) return false

      // Look for price constraints (e.g., "under 50k", "under 100k", "50k")
      const priceNum = parseInt(item.price.replace(/,/g, ""), 10)
      if (query.includes("under 50k") || query.includes("under 50,000") || query.includes("50k")) {
        if (priceNum >= 50000) return false
      } else if (query.includes("under 100k") || query.includes("under 100,000") || query.includes("100k")) {
        if (priceNum >= 100000) return false
      } else if (query.includes("under 200k") || query.includes("under 200,000") || query.includes("200k")) {
        if (priceNum >= 200000) return false
      }

      // Check text matches
      const matchesName = item.name.toLowerCase().includes(query)
      const matchesLoc = item.location.toLowerCase().includes(query)
      const matchesCat = item.category.toLowerCase().includes(query)
      const matchesType = item.type.toLowerCase().includes(query)
      
      // If query does not mention specific city or budget triggers, check general matching
      const hasSpecificTriggers = mentionsLahore || mentionsKarachi || mentionsIslamabad || query.includes("under") || query.includes("k")
      if (!hasSpecificTriggers && !matchesName && !matchesLoc && !matchesCat && !matchesType) {
        return false
      }
    }

    return true
  })

  return (
    <div className="space-y-6">
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-[#E6E2DA] p-12 text-center max-w-lg mx-auto">
          <span className="text-3xl block mb-4">🔍</span>
          <h4 className="text-sm font-extrabold text-slate-800">No Professionals Match Your Search</h4>
          <p className="text-xs text-slate-400 font-semibold mt-2.5 leading-normal">
            Try adjusting your search criteria, selecting a different city, or resetting the budget thresholds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredData.map(item => (
            <MarketplaceCard 
              key={item.id} 
              {...item} 
              compareList={compareList} 
              setCompareList={setCompareList} 
              onSelect={() => onItemSelect && onItemSelect(item)}
            />
          ))}
        </div>
      )}

    </div>
  )
}
