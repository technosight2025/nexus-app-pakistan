"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Sparkles, ShieldCheck } from "lucide-react"

interface VideographerHeroProps {
  onSearch: (style: string, city: string) => void
}

export function VideographerHero({ onSearch }: VideographerHeroProps) {
  const [style, setStyle] = useState("")
  const [city, setCity] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(style, city)
  }

  const QUICK_TAGS = ["Cinematic Highlight", "Teaser Film", "Documentary Cut", "Drone Coverage", "Traditional Full Cut"]

  return (
    <section className="relative bg-white border-b border-outline overflow-hidden py-12 md:py-20">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.015] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6"
          >
            <ShieldCheck className="w-4 h-4" /> Cinematic Storytellers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground"
          >
            Pakistan's Premier Event & Wedding Videographers.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mb-8 font-medium leading-relaxed max-w-xl"
          >
            Book verified cinematic filmmakers, drone operators, and video editors. Sync schedules, outline styles, and pay securely via NEXUS Escrow.
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSearchSubmit}
            className="bg-white border border-outline rounded-2xl p-2 md:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-2xl"
          >
            <div className="flex-1 flex items-center relative group px-2">
              <Search className="w-5 h-5 text-muted-foreground absolute left-3 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="What style do you prefer? e.g. Cinematic..."
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full pl-10 pr-2 py-3 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="border-t md:border-t-0 md:border-l border-outline my-1 md:my-0 h-px md:h-8" />

            <div className="flex items-center gap-2 px-4 py-2 md:py-0">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent text-sm font-bold text-foreground outline-none cursor-pointer py-2 w-full md:w-36 appearance-none"
              >
                <option value="">All Cities</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-sm hover:shadow-[0_8px_24px_rgba(15,91,62,0.15)] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" /> Find Filmmakers
            </button>
          </motion.form>

          {/* Quick Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs font-bold text-muted-foreground mr-1">Popular:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setStyle(tag)
                  onSearch(tag, city)
                }}
                className="px-3 py-1.5 rounded-lg border border-outline bg-slate-50 hover:bg-slate-100 hover:border-primary/30 text-xs font-bold text-foreground transition-all"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
