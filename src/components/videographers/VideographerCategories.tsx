"use client"
import { motion } from "framer-motion"
import { Play, Film, UserCheck, Flame, Sliders } from "lucide-react"

const CATEGORIES = [
  {
    title: "Cinematic Highlight",
    desc: "3 to 5-minute story-driven highlights with high-end color grading and emotional sound designs.",
    icon: Film,
    color: "bg-emerald-50 border-emerald-100 text-emerald-700",
    count: "350+ crews"
  },
  {
    title: "Documentary Films",
    desc: "Full-length storytelling films including interviews, raw speech tracks, and candid behind-the-scenes.",
    icon: UserCheck,
    color: "bg-blue-50 border-blue-100 text-blue-700",
    count: "180+ directors"
  },
  {
    title: "Social Media Teasers",
    desc: "60-second reels, portrait formatting, fast-paced transitions, and trending background scores.",
    icon: Flame,
    color: "bg-pink-50 border-pink-100 text-pink-700",
    count: "420+ editors"
  },
  {
    title: "Traditional Multicam",
    desc: "Full coverage of main stage proceedings, complete dancing videos, and family greetings sequences.",
    icon: Play,
    color: "bg-purple-50 border-purple-100 text-purple-700",
    count: "210+ operators"
  },
  {
    title: "Post-Production Only",
    desc: "Already shot footage color grading, sound synchronization, highlight clips editing, and delivery.",
    icon: Sliders,
    color: "bg-amber-50 border-amber-100 text-amber-700",
    count: "90+ workstations"
  }
]

export function VideographerCategories() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
            Browse Shooting Styles
          </h2>
          <p className="text-muted-foreground font-medium">
            Find event filmmakers who shoot and edit in your desired visual format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-2xl border border-outline p-6 hover:border-primary/20 transition-all shadow-none group flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color} shrink-0 group-hover:scale-105 transition-transform duration-300 mb-4`}>
                  <cat.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted-foreground font-medium mb-4 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
              <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full w-max">
                {cat.count}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
