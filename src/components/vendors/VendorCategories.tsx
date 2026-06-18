"use client"
import { motion } from "framer-motion"
import { Camera, ChefHat, Sparkles, Paintbrush, Music, ClipboardList } from "lucide-react"

const VENDOR_TYPES = [
  { id: "photography", name: "Photography", count: "3,500+", icon: Camera, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: "catering", name: "Caterers", count: "1,200+", icon: ChefHat, color: "bg-red-50 text-red-600 border-red-200" },
  { id: "makeup", name: "Makeup Artists", count: "4,100+", icon: Sparkles, color: "bg-pink-50 text-pink-600 border-pink-200" },
  { id: "decor", name: "Decorators", count: "950+", icon: Paintbrush, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: "music", name: "DJs & Music", count: "600+", icon: Music, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { id: "planners", name: "Event Planners", count: "300+", icon: ClipboardList, color: "bg-slate-50 text-slate-600 border-slate-200" },
]

export function VendorCategories() {
  return (
    <section className="py-20 bg-slate-50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
              Browse by Service
            </h2>
            <p className="text-muted-foreground font-medium">
              Find exactly what you need to bring your vision to life.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {VENDOR_TYPES.map((type, idx) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer bg-white border border-border rounded-xl p-6 text-center hover:shadow-md hover:border-primary/30 transition-all flex flex-col items-center justify-center h-full"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${type.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <type.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{type.name}</h3>
              <p className="text-xs font-medium text-muted-foreground">{type.count} pros</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
