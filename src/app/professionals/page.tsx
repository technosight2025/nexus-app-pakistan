"use client"

import { useState } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { MarketplaceHero } from "@/components/professionals/MarketplaceHero"
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard"

// Dummy data to simulate the marketplace listings
const MOCK_PROFESSIONALS = [
  {
    id: "PRO-001",
    name: "Ali Rahman",
    category: "Cinematography",
    location: "Lahore, Pakistan",
    rating: 4.9,
    reviews: 124,
    price: 150000,
    imageUrl: "https://images.unsplash.com/photo-1518110924513-568b2b7169ac?q=80&w=800&auto=format&fit=crop",
    verificationLevel: "Elite" as const,
    featured: true
  },
  {
    id: "PRO-002",
    name: "Sara's Makeup Studio",
    category: "Bridal Stylist",
    location: "Islamabad, Pakistan",
    rating: 4.8,
    reviews: 89,
    price: 85000,
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    verificationLevel: "Premium" as const
  },
  {
    id: "PRO-003",
    name: "Hassan DJ Services",
    category: "DJ & Sound",
    location: "Karachi, Pakistan",
    rating: 4.7,
    reviews: 56,
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800&auto=format&fit=crop",
    verificationLevel: "Verified" as const
  },
  {
    id: "PRO-004",
    name: "Zainab Floral Designs",
    category: "Event Decorator",
    location: "Lahore, Pakistan",
    rating: 5.0,
    reviews: 210,
    price: 250000,
    imageUrl: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=800&auto=format&fit=crop",
    verificationLevel: "Elite" as const,
    featured: true
  },
  {
    id: "PRO-005",
    name: "Fahad Drone Graphy",
    category: "Drone Operator",
    location: "Islamabad, Pakistan",
    rating: 4.6,
    reviews: 34,
    price: 25000,
    imageUrl: "https://images.unsplash.com/photo-1506785086057-a3f25d97e8de?q=80&w=800&auto=format&fit=crop",
    verificationLevel: "Basic" as const
  },
  {
    id: "PRO-006",
    name: "The Qawali Ensemble",
    category: "Musicians",
    location: "Lahore, Pakistan",
    rating: 4.9,
    reviews: 178,
    price: 120000,
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    verificationLevel: "Premium" as const
  }
]

export default function ProfessionalsMarketplacePage() {
  const [searchRole, setSearchRole] = useState("")
  const [searchCity, setSearchCity] = useState("")

  const handleSearch = (role: string, city: string) => {
    setSearchRole(role)
    setSearchCity(city)
  }

  // Basic filtering simulation
  const filteredProfessionals = MOCK_PROFESSIONALS.filter(pro => {
    const matchesRole = searchRole ? pro.category.toLowerCase().includes(searchRole.toLowerCase()) : true
    const matchesCity = searchCity ? pro.location.toLowerCase().includes(searchCity.toLowerCase()) : true
    return matchesRole && matchesCity
  })

  return (
    <PublicLayout>
      <div className="bg-background min-h-screen">
        <MarketplaceHero onSearch={handleSearch} />
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                  {searchRole || searchCity ? 'Search Results' : 'Featured Professionals'}
                </h2>
                <p className="text-slate-500 font-medium">
                  {filteredProfessionals.length} professionals found
                </p>
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:border-[#0F5B3E]">
                  <option>Sort by: Recommended</option>
                  <option>Sort by: Rating</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                </select>
              </div>
            </div>

            {filteredProfessionals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfessionals.map((pro) => (
                  <ProfessionalCard key={pro.id} {...pro} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">No professionals found</h3>
                <p className="text-slate-500">Try adjusting your search filters or trying a different category.</p>
                <button 
                  onClick={() => { setSearchRole(""); setSearchCity(""); }}
                  className="mt-6 px-6 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:text-[#0F5B3E] hover:border-[#0F5B3E]"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {filteredProfessionals.length > 0 && (
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-[#0F5B3E] hover:text-[#0F5B3E] transition-colors">
                  Load More Professionals
                </button>
              </div>
            )}
          </div>
        </section>

        <MegaFooter />
      </div>
    </PublicLayout>
  )
}
