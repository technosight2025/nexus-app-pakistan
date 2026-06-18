"use client"
import { motion } from "framer-motion"
import { 
  Wallet, ChefHat, Navigation, ShoppingBag, 
  Music, Sparkles, ArrowRight, Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const B2C_SERVICES = [
  {
    id: "daig",
    title: "AI Daig Calculator",
    desc: "Mehmaano ke hisaab se khane ki miqdar ka theek theek andaza lagayein.",
    icon: ChefHat,
    cta: "Menu Hisaab Lagayein",
    href: "/tools/daig-calculator",
    color: "bg-red-100 text-red-600 border-red-200",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "salami",
    title: "Digital Salami Tracker",
    desc: "Cash gifts aur digital Raast transfers ko asani se list aur track karein.",
    icon: Wallet,
    cta: "Salami Manage Karein",
    href: "/dashboard/planner/salami",
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "jahaiz",
    title: "Smart Jahaiz Registry",
    desc: "Apne jahaiz ki items save karein aur easily family ke sath share karein.",
    icon: ShoppingBag,
    cta: "Registry Banayein",
    href: "/tools/jahaiz-tracker",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    image: "https://images.unsplash.com/photo-1606403212882-9908cfba2a31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "baraat",
    title: "Live Baraat Tracker",
    desc: "Dulhay ki arrival ka live GPS link banayein aur mehmaano ko bhejein.",
    icon: Navigation,
    cta: "Baraat Track Karein",
    href: "/tools/baraat-tracker",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "mehndi",
    title: "AI Mehndi Designer",
    desc: "AI ki madad se zabardast aur unique mehndi designs khud banayein.",
    icon: Sparkles,
    cta: "Design Mehndi",
    href: "/tools/mehndi-designer",
    color: "bg-orange-100 text-orange-600 border-orange-200",
    image: "https://images.unsplash.com/photo-1598424915655-b4618e7b3992?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "beats",
    title: "Shaadi Beats Playlist",
    desc: "Mehndi aur dholki ke liye mazedar gaano ki playlists dhoondein.",
    icon: Music,
    cta: "Gaaney Sunain",
    href: "/tools/shaadi-beats",
    color: "bg-pink-100 text-pink-600 border-pink-200",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800"
  }
]


export function MyNexusSection() {
  return (
    <section className="py-24 bg-white relative border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4"
          >
            My <span className="text-primary">NEXUS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium"
          >
            Aapka command center. Shaadi ki tayyari aur business ke tamam tools aik hi jagah par.
          </motion.p>
        </div>

        {/* B2C Event Tools Grid */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
            <Users className="w-6 h-6 text-foreground" />
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Event Planning Tools</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {B2C_SERVICES.map((service, idx) => (
              <Link href={service.href} key={service.id} className="block group h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden hover:border-primary/40"
                >
                  <div className="relative h-28 w-full overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10" />
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute top-3 left-3 z-20 w-8 h-8 rounded-lg flex items-center justify-center bg-white/95 backdrop-blur-sm shadow-sm ${service.color.split(' ').find(c => c.startsWith('text-'))}`}>
                      <service.icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors leading-tight">{service.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-3">{service.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>



      </div>
    </section>
  )
}

