"use client"
import { motion } from "framer-motion"
import { ShieldAlert, Users, Truck } from "lucide-react"

const BENEFITS = [
  {
    title: "Sanitary Audits & Certification",
    desc: "Every caterer listed on NEXUS undergoes physical inspections for food safety. We verify clean workspace areas, ingredient sourcing, and HACCP compliance logs.",
    icon: ShieldAlert,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    title: "Tasting Trial Guarantee",
    desc: "Book with confidence. Enjoy a complimentary tasting session for up to 4 guests at the caterer's main kitchen to lock in spices and menu quality before depositing funds.",
    icon: Users,
    color: "bg-pink-50 text-pink-700 border-pink-100"
  },
  {
    title: "Thermal Transport Logistics",
    desc: "All meals are dispatched in thermal containers via temperature-controlled vans. We guarantee food is delivered piping hot and fresh at your specified call time.",
    icon: Truck,
    color: "bg-blue-50 text-blue-700 border-blue-100"
  }
]

export function CatererBenefits() {
  return (
    <section className="py-20 bg-[#FFFAFB] border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            A Higher Standard For Event Food & Hospitality
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            NEXUS enforces food sanitation and quality protocols. We protect client events from sub-par ingredients, late drop-offs, and cold buffets.
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
