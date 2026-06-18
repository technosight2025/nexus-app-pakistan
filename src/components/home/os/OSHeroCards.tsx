"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Store, CalendarDays, Settings2 } from "lucide-react"

export function OSHeroCards() {
  const cards = [
    {
      title: "DISCOVER VENUES & VENDORS",
      description: "Discover venues & vendors across the event and hospitality ecosystem.",
      icon: Store,
    },
    {
      title: "MANAGE BOOKINGS & QUOTATIONS",
      description: "Manage bookings, automated quotations, and deliver seamlessly.",
      icon: CalendarDays,
    },
    {
      title: "TRANSFORM OPERATIONS",
      description: "Transform digital operations, reduce overhead, and build trust.",
      icon: Settings2,
    }
  ]

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
          className="bg-white rounded-xl p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 border border-slate-100"
        >
          {/* Icon Container */}
          <div className="w-16 h-16 mb-6 rounded-2xl bg-[#F0F7F4] text-[#0F5B3E] flex items-center justify-center border border-[#0F5B3E]/10 group-hover:scale-110 group-hover:bg-[#0F5B3E] group-hover:text-white transition-all duration-300">
            <card.icon className="w-8 h-8" strokeWidth={1.5} />
          </div>

          <h3 className="text-sm font-bold text-[#1A1A1A] mb-3 tracking-wide leading-snug">
            {card.title}
          </h3>

          <p className="text-xs text-[#6B7280] leading-relaxed">
            {card.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
