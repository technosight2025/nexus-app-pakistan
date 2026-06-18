"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Play } from "lucide-react"

const INSPIRATION_ITEMS = [
  { id: 1, type: "image", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop", likes: 1200, comments: 45, author: "Maha's Photography", category: "Wedding" },
  { id: 2, type: "video", url: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=600&auto=format&fit=crop", likes: 3400, comments: 120, author: "Qasim Ali Mureed", category: "Cinematography" },
  { id: 3, type: "image", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop", likes: 890, comments: 23, author: "Avari Events", category: "Decor" },
  { id: 4, type: "image", url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", likes: 2100, comments: 89, author: "Nabila's Salon", category: "Bridal Makeup" },
  { id: 5, type: "image", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop", likes: 1500, comments: 67, author: "Serena Hotel", category: "Venue" },
  { id: 6, type: "video", url: "https://images.unsplash.com/photo-1516600164266-f3bf22256df2?q=80&w=600&auto=format&fit=crop", likes: 4500, comments: 210, author: "Nexus Memories", category: "Highlights" },
]

export function InspirationGallery() {
  return (
    <div className="w-full bg-slate-950 rounded-3xl p-8 lg:p-12 mt-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col items-center text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Inspiration <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">Gallery</span>
        </h2>
        <p className="text-slate-400 font-medium max-w-2xl text-lg">
          Discover the latest trends, beautiful decor setups, and cinematic highlights from top events across Pakistan.
        </p>
      </div>

      <div className="relative z-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {INSPIRATION_ITEMS.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer border border-white/10 bg-white/5"
          >
            <div className={`relative w-full ${index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
              <Image 
                src={item.url} 
                alt={item.category} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                    <Play className="w-5 h-5 text-white fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* Hover Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
                <div className="flex justify-between items-center text-white">
                  <span className="font-bold text-sm truncate pr-2">{item.author}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1 text-xs font-medium"><Heart className="w-3.5 h-3.5" /> {item.likes}</span>
                    <span className="flex items-center gap-1 text-xs font-medium"><MessageCircle className="w-3.5 h-3.5" /> {item.comments}</span>
                  </div>
                </div>
              </div>

              {/* Top Badge */}
              <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="text-xs font-bold text-white">{item.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex justify-center mt-10">
        <Link href="/inspiration">
          <button className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-md transition-colors border border-white/20">
            View More Inspiration
          </button>
        </Link>
      </div>
    </div>
  )
}
