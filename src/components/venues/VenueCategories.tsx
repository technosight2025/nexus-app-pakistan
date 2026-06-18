"use client"
import { motion } from "framer-motion"
import { Tent, Building, TreePine, Hotel, Castle, Landmark } from "lucide-react"

const VENUE_TYPES = [
  { id: "marquee", name: "Marquees", count: "1,240+", icon: Tent, color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: "banquet", name: "Banquet Halls", count: "3,100+", icon: Building, color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { id: "farmhouse", name: "Farmhouses", count: "850+", icon: TreePine, color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { id: "hotel", name: "Luxury Hotels", count: "420+", icon: Hotel, color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: "heritage", name: "Heritage Sites", count: "45+", icon: Castle, color: "bg-amber-50 text-amber-600 border-amber-200" },
  { id: "community", name: "Community Centers", count: "2,000+", icon: Landmark, color: "bg-slate-50 text-slate-600 border-slate-200" },
]

export function VenueCategories() {
  return (
    <section className="py-20 bg-slate-50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
              Browse by Venue Type
            </h2>
            <p className="text-muted-foreground font-medium">
              Explore specialized venues that perfectly match your event scale and vibe.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {VENUE_TYPES.map((type, idx) => (
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
              <p className="text-xs font-medium text-muted-foreground">{type.count} venues</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
