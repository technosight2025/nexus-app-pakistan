"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, ArrowRight } from "lucide-react"
import { MOCK_VENDORS } from "@/components/search/MockData"

export function TrendingVendors() {
  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trending Vendors</h2>
          <p className="text-slate-500 font-medium mt-1">Top-rated professionals for your event</p>
        </div>
        <Link href="/search?tab=vendors" className="text-rose-500 hover:text-rose-600 font-bold hidden sm:flex items-center gap-1">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_VENDORS.map((vendor, index) => (
          <Link href={`/vendors/${vendor.id}`} key={vendor.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col gap-3"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                <Image 
                  src={vendor.images[0]} 
                  alt={vendor.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  {vendor.category}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-rose-500 transition-colors">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{vendor.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-slate-500 text-sm font-medium mb-2">
                  <MapPin className="w-3.5 h-3.5" /> {vendor.location}
                </div>
                
                <div className="text-sm font-bold text-slate-900">
                  Starts from <span className="text-rose-500">Rs {vendor.startingPrice.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
