"use client"
import { motion } from "framer-motion"
import { HardDrive, RotateCcw, Paintbrush } from "lucide-react"

const BENEFITS = [
  {
    title: "Raw Footage Hand-off",
    desc: "Never wait months for your footage. Get high-speed access to all your unedited RAW files on a synced cloud drive or direct hard-drive transfer within 7 days.",
    icon: HardDrive,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100"
  },
  {
    title: "Dual-Card Backup Guarantee",
    desc: "We enforce dual-card backup checks on all event crew camera bodies. If a single memory card encounters read errors, backup records prevent any file loss.",
    icon: RotateCcw,
    color: "bg-pink-50 text-pink-700 border-pink-100"
  },
  {
    title: "Calibrated Cine Color Science",
    desc: "Our colorists sync skin tones and ambient lighting levels across Sony SLog3, RED RAW, and Arri LogC profiles to ensure beautiful, harmonious visuals.",
    icon: Paintbrush,
    color: "bg-blue-50 text-blue-700 border-blue-100"
  }
]

export function VideographerBenefits() {
  return (
    <section className="py-20 bg-[#FFFAFB] border-b border-outline">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
            High-Performance Standards For Event Filmmaking
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            NEXUS brings studio-grade operational standards to event videographers. We guarantee file preservation, quick deliveries, and premium color outputs.
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
