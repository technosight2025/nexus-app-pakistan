"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Share2, Camera, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Memory {
  id: string
  url: string
  title: string
  category: "all" | "mehndi" | "barat" | "decor" | "behind-the-scenes"
  aspectRatio: "portrait" | "landscape" | "square"
  likes: number
}

const MOCK_MEMORIES: Memory[] = [
  { id: "m1", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600", title: "Venue Setup", category: "decor", aspectRatio: "landscape", likes: 24 },
  { id: "m2", url: "https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=400", title: "Bridal Details", category: "barat", aspectRatio: "portrait", likes: 56 },
  { id: "m3", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600", title: "Mehndi Colors", category: "mehndi", aspectRatio: "landscape", likes: 18 },
  { id: "m4", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=400", title: "Ring Exchange", category: "barat", aspectRatio: "square", likes: 89 },
  { id: "m5", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400", title: "Floral Arrangements", category: "decor", aspectRatio: "portrait", likes: 34 },
  { id: "m6", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600", title: "Lighting Check", category: "behind-the-scenes", aspectRatio: "landscape", likes: 12 },
  { id: "m7", url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400", title: "Bridal Portrait", category: "barat", aspectRatio: "portrait", likes: 124 },
]

const MEMORY_CATEGORIES = ["all", "mehndi", "barat", "decor", "behind-the-scenes"]

export function MemoriesWallOverview() {
  const [memoryFilter, setMemoryFilter] = useState("all")

  const filteredMemories = memoryFilter === "all" 
    ? MOCK_MEMORIES 
    : MOCK_MEMORIES.filter(m => m.category === memoryFilter)

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* 🌟 Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight leading-tight">
            Memories Wall
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-2">
            Your beautiful event scrapbook, organized perfectly.
          </p>
        </div>

        <div className="flex gap-3">
          <Button className="h-12 px-6 rounded-full bg-[#0A3B2A] text-white font-bold shadow-md hover:bg-[#0A3B2A]/90 transition-all">
            <Camera className="w-5 h-5 mr-2" /> Add Photos
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key="memories"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-8"
        >
          {/* Memories Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {MEMORY_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setMemoryFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all ${
                  memoryFilter === category 
                    ? "bg-[#0A3B2A] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-[#0A3B2A]/30"
                }`}
              >
                {category.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredMemories.map(memory => (
              <div 
                key={memory.id} 
                className="break-inside-avoid relative group rounded-[24px] overflow-hidden bg-slate-100"
              >
                <img 
                  src={memory.url} 
                  alt={memory.title}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#0A3B2A] transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                      {memory.category.replace("-", " ")}
                    </span>
                    <h3 className="text-white font-bold font-poppins text-lg drop-shadow-md">
                      {memory.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium flex items-center gap-1 mt-1">
                      <Heart className="w-3.5 h-3.5 fill-white/80" /> {memory.likes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMemories.length === 0 && (
            <div className="bg-white rounded-[32px] p-16 text-center border border-slate-100 shadow-sm">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 font-poppins">No memories found</h3>
              <p className="text-slate-500 mt-2">Try selecting a different filter category.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
