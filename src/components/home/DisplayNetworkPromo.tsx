"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tv, MonitorPlay, Sparkles } from "lucide-react"
import Image from "next/image"

export function DisplayNetworkPromo() {
  return (
    <section className="py-24 bg-[#FFFAFB] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Playful TV Display Mockup */}
            <div className="relative rounded-xl p-4 bg-gradient-to-br from-purple-200 to-pink-200 shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-6 -right-6 text-6xl animate-bounce">📺</div>
              <div className="bg-white rounded-3xl overflow-hidden border-8 border-white shadow-inner relative aspect-video">
                <Image 
                  src="/images/pakistani_wedding_couple.png" 
                  alt="Digital Signage Event" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Simulated UI Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-500/90 to-transparent p-6 text-white text-center">
                  <h4 className="text-2xl font-black mb-1 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" /> 
                    Welcome to Sarah &amp; Ali&apos;s Wedding!
                  </h4>
                  <p className="text-white/90 font-medium text-sm">Please be seated, the ceremony is about to begin.</p>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-4 border border-purple-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <MonitorPlay className="w-6 h-6" />
              </div>
              <div>
                <div className="font-black text-foreground">Real-time Updates</div>
                <div className="text-sm font-medium text-muted-foreground">Control from anywhere</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-bold mb-6 text-sm"
            >
              <Tv className="w-4 h-4" /> NEXUS SIGNAGE
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6 leading-tight">
              Bring Your Venues to Life with Smart Screens ✨
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
              Transform standard TVs into magical digital displays. Welcome guests, showcase event timelines, and display beautiful sponsor logos with just one click from your phone!
            </p>

            <ul className="space-y-6 mb-10">
              {[
                { title: "Fun & Engaging", desc: "Display live photo walls and animated welcome messages.", emoji: "🎉" },
                { title: "Super Easy", desc: "No tech skills needed. Update screens instantly via our app.", emoji: "📱" },
                { title: "Boost Revenue", desc: "Sell ad space to preferred vendors on your venue screens.", emoji: "💰" }
              ].map((feature, i) => (
                <li key={i} className="flex gap-4 items-start group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                    {feature.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground group-hover:text-purple-600 transition-colors">{feature.title}</h4>
                    <p className="text-muted-foreground font-medium">{feature.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Button className="h-16 px-10 text-xl font-bold rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-[0_10px_30px_rgba(147,51,234,0.3)] hover:shadow-[0_15px_40px_rgba(147,51,234,0.4)] transition-all hover:-translate-y-1">
              Explore Digital Signage
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
