"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ShieldCheck, Tag, Heart, MapPin, Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const CATEGORIES = ['All', 'Bridal Lehenga', 'Sherwani', 'Gharara', 'Party Maxi']

const MOCK_ITEMS = [
  { id: 1, title: "Deep Red Kashee's Lehenga", category: "Bridal Lehenga", retailPrice: 450000, rentalPrice: 45000, owner: "Fatima S.", location: "DHA, Lahore", rating: 4.9, image: "/images/pakistani_bride_makeup.png", tags: ["Dry Cleaned", "Verified"] },
  { id: 2, title: "HSY Classic Black Sherwani", category: "Sherwani", retailPrice: 180000, rentalPrice: 15000, owner: "Ahmed K.", location: "Clifton, Karachi", rating: 4.8, image: "/images/pakistani_wedding_couple.png", tags: ["Verified"] },
  { id: 3, title: "Pastel Pink Walima Maxi", category: "Party Maxi", retailPrice: 220000, rentalPrice: 25000, owner: "Zara Boutique", location: "Gulberg, Lahore", rating: 5.0, image: "/images/pakistani_bride_makeup.png", tags: ["Boutique", "Dry Cleaned"] },
  { id: 4, title: "Traditional Rust Gharara", category: "Gharara", retailPrice: 150000, rentalPrice: 12000, owner: "Ayesha M.", location: "F-11, Islamabad", rating: 4.7, image: "/images/pakistani_wedding_couple.png", tags: [] },
  { id: 5, title: "Gold & Mint Mehndi Dress", category: "Bridal Lehenga", retailPrice: 300000, rentalPrice: 30000, owner: "Sana A.", location: "Bahria Town, Lahore", rating: 4.9, image: "/images/pakistani_bride_makeup.png", tags: ["Verified"] },
  { id: 6, title: "Ivory Prince Coat", category: "Sherwani", retailPrice: 85000, rentalPrice: 8000, owner: "Usman R.", location: "DHA, Karachi", rating: 4.6, image: "/images/pakistani_wedding_couple.png", tags: ["Dry Cleaned"] },
]

export function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = MOCK_ITEMS.filter(item => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold mb-4 text-xs tracking-wider">
          <Tag className="w-4 h-4" /> P2P MARKETPLACE
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Pre-Loved Bridal Rentals</h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl">
          Rent stunning designer wear for a fraction of the retail price, or list your own wedding dress to earn back your investment.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm border border-emerald-100">
          <ShieldCheck className="w-4 h-4" /> 100% Authentic Designers
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm border border-blue-100">
          <ShieldCheck className="w-4 h-4" /> Nexus Protection Guarantee
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Categories */}
        <div className="flex overflow-x-auto w-full md:w-auto gap-2 pb-2 md:pb-0 hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-sm transition-all border-2 ${activeCategory === cat ? 'bg-pink-600 border-pink-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Action */}
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" placeholder="Search designers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-pink-500"
            />
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 font-bold shadow-md">
            <Camera className="w-4 h-4 mr-2" /> List an Item
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center hover:bg-white text-slate-600 hover:text-pink-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-1">{item.category}</p>
                    <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-1">{item.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {item.location}</span>
                  <span className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-current" /> {item.rating}</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Retail Price</span>
                    <span className="text-sm font-bold text-slate-400 line-through">Rs {item.retailPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-pink-600 uppercase tracking-wider">Rental Price</span>
                    <span className="text-2xl font-black text-slate-900">Rs {item.rentalPrice.toLocaleString()} <span className="text-sm text-slate-500 font-medium">/day</span></span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold shadow-md shadow-pink-600/20">
                    Rent Now
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl font-bold border-slate-200">
                    Contact Owner
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-500 font-medium">
          No items found matching your filters.
        </div>
      )}
    </div>
  )
}
