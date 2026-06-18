"use client"
import { motion } from "framer-motion"
import { Layout, Compass, ShieldAlert } from "lucide-react"

const BENEFITS = [
  {
    title: "3D Digital Renders First",
    desc: "Never book blindly. Review detailed 3D color mood models and stage layout drawings before committing to any deposits. Tweak variables until you are completely satisfied.",
    icon: Layout,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    title: "Fresh Flower Cut Audits",
    desc: "We enforce strict checks on floral materials. If your package specifies natural rose grids, our on-site team audits the delivery to verify fresh cuts over faded synthetics.",
    icon: Compass,
    color: "bg-pink-50 text-pink-700 border-pink-100"
  },
  {
    title: "Rigging & Truss Safety",
    desc: "Safety first. Every heavy stage frame and hanging lighting truss undergoes structural verification to protect guests, sound systems, and video crew from falls.",
    icon: ShieldAlert,
    color: "bg-blue-50 text-blue-700 border-blue-100"
  }
]

export function DecoratorBenefits() {
  return (
    <section className="py-20 bg-[#FFFAFB] border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            Staging & Visual Design Trust Standards
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            NEXUS enforces high professional guidelines. Every decorator passes digital skill audits, equipment checks, and scaffolding safety reviews to secure event day operations.
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
