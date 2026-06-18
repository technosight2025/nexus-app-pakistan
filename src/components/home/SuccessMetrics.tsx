"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Star, Users, MapPin } from "lucide-react"

const METRICS = [
  { label: "Happy Couples", value: 15000, suffix: "+", icon: Heart, color: "text-pink-500", bg: "bg-pink-100", emoji: "💕" },
  { label: "5-Star Vendors", value: 450, suffix: "+", icon: Star, color: "text-yellow-500", bg: "bg-yellow-100", emoji: "⭐" },
  { label: "Guests Hosted", value: 2.5, suffix: "M", icon: Users, color: "text-blue-500", bg: "bg-blue-100", emoji: "🎊" },
  { label: "Active Cities", value: 12, suffix: "", icon: MapPin, color: "text-emerald-500", bg: "bg-emerald-100", emoji: "🏙️" },
]

export function SuccessMetrics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary to-rose-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, type: "spring", bounce: 0.6 }}
                className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${metric.bg} ${metric.color} shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter flex items-center gap-1">
                  {isInView ? (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {metric.value}
                    </motion.span>
                  ) : (
                    "0"
                  )}
                  <span>{metric.suffix}</span>
                </div>
                
                <span className="text-sm md:text-base font-bold text-white/90 flex items-center gap-2">
                  {metric.label} <span>{metric.emoji}</span>
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
