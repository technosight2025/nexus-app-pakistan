"use client"
import { motion } from "framer-motion"
import { Wifi, UserCheck, UtensilsCrossed } from "lucide-react"

const BENEFITS = [
  {
    title: "Dedicated Steward Coverage",
    desc: "Experience high-touch table hospitality. NEXUS restaurant venues assign a ratio of at least 1 dedicated steward per 12 guests to ensure quick serving and clean sweeps.",
    icon: UserCheck,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    title: "Tailored Custom Tasting Menus",
    desc: "Customize menus to suit high-tea requests, multi-course sit-down dinners, or heavy traditional buffets. Request menu changes and lock in pricing dynamically.",
    icon: UtensilsCrossed,
    color: "bg-pink-50 text-pink-700 border-pink-100"
  },
  {
    title: "Built-In AV & High-Speed Wi-Fi",
    desc: "Forget renting audio rigs. Event-ready spaces come fully equipped with high-speed fiber internet connection, projector setups, and wireless mic systems.",
    icon: Wifi,
    color: "bg-blue-50 text-blue-700 border-blue-100"
  }
]

export function RestaurantBenefits() {
  return (
    <section className="py-20 bg-[#FFFAFB] border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            Exclusive Dining & Corporate Conveniences
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            NEXUS vetted restaurant partners guarantee premium event lounges and halls built for smooth company meetings, family gatherings, and anniversaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card rounded-2xl border border-outline p-8 hover:border-primary/20 transition-all flex flex-col h-full shadow-none group"
            >
              <div className={`w-14 h-14 rounded-2xl border ${benefit.color} flex items-center justify-center mb-6 shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed flex-1">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
