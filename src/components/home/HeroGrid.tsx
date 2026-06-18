"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Building2, ShieldCheck, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroGrid() {
  const cards = [
    {
      title: "Plan Your Celebration",
      sub: "Your dream event, perfectly orchestrated from start to finish.",
      cta: "Start Planning",
      href: "/launch-journey?role=customer",
      icon: Sparkles,
      iconColor: "text-[#C9A227]",
      bgImage: "/images/pakistani_wedding_couple.png",
      overlay: "from-emerald-950/90 via-emerald-900/60 to-transparent"
    },
    {
      title: "Grow Your Business",
      sub: "The all-in-one OS for Pakistan’s premier event professionals.",
      cta: "Access Business OS",
      href: "/b2b",
      icon: Building2,
      iconColor: "text-amber-400",
      bgImage: "https://images.unsplash.com/photo-1505232458627-539096539133?q=80&w=800&auto=format&fit=crop",
      overlay: "from-slate-950/90 via-slate-900/60 to-transparent"
    },
    {
      title: "Precision Orchestration",
      sub: "From milestone tracking to media delivery—manage with ease.",
      cta: "Explore Features",
      href: "/portal",
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      bgImage: "/images/mehndi_bridal.png",
      overlay: "from-emerald-955/90 via-emerald-950/50 to-transparent"
    },
    {
      title: "Enterprise Intelligence",
      sub: "Turn leads into revenue with our powerful CRM & Analytics.",
      cta: "View Analytics",
      href: "/dashboard",
      icon: TrendingUp,
      iconColor: "text-amber-400",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      overlay: "from-slate-950/90 via-slate-900/50 to-transparent"
    }
  ]

  return (
    <section className="w-full select-none py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {cards.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" } as const}
              className="relative rounded-2xl overflow-hidden min-h-[260px] flex flex-col justify-end border border-[#E6E2DA]/35 shadow-sm group cursor-pointer"
            >
              {/* Premium image backdrop with gradient overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={item.bgImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.overlay}`} />
              </div>

              {/* Card Header & Content Overlay */}
              <Card className="relative z-10 bg-transparent border-0 shadow-none text-white h-full flex flex-col justify-between p-6">
                <CardHeader className="p-0 space-y-3">
                  <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm w-max mb-1">
                    <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  
                  <CardTitle className="text-2xl font-black tracking-tight font-sans">
                    {item.title}
                  </CardTitle>
                  
                  <CardDescription className="text-white/80 text-xs md:text-sm font-medium leading-relaxed font-sans max-w-sm">
                    {item.sub}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 mt-6">
                  <Link href={item.href}>
                    <Button 
                      className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-5 py-2.5 h-11 text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5"
                    >
                      {item.cta}
                      <ArrowRight className="w-4 h-4 text-slate-900" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
