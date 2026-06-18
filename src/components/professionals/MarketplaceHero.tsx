"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Briefcase, Camera, Music, Scissors, Sparkles } from "lucide-react"

interface MarketplaceHeroProps {
  onSearch: (role: string, city: string) => void
}

export function MarketplaceHero({ onSearch }: MarketplaceHeroProps) {
  const [role, setRole] = useState("")
  const [city, setCity] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(role, city)
  }

  const popularRoles = [
    { name: "Photographers", icon: Camera },
    { name: "Makeup Artists", icon: Scissors },
    { name: "DJs & Musicians", icon: Music },
    { name: "Event Designers", icon: Sparkles }
  ]

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#FAF7F2]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A227]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#0F5B3E]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-[#C9A227]/30 text-[#C9A227] text-sm font-semibold tracking-wide mb-6 shadow-sm">
              NEXUS PROFESSIONALS
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Hire Elite Creative <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#C9A227]">
                Professionals
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover, hire, and collaborate with Pakistan's top photographers, videographers, editors, musicians, and event creators.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 max-w-3xl mx-auto mb-10"
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/20 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="City or location"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/20 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0F5B3E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0a422c] transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <span className="text-slate-500 font-medium mr-2">Popular:</span>
            {popularRoles.map((role, idx) => (
              <button
                key={idx}
                onClick={() => setRole(role.name)}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 hover:border-[#C9A227] hover:text-[#C9A227] transition-all font-medium shadow-sm hover:shadow-md"
              >
                <role.icon className="w-4 h-4" />
                {role.name}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
