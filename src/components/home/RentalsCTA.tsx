"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tent, Zap, Armchair, Wind, Shirt, Speaker } from "lucide-react"
import Link from "next/link"

export function RentalsCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-outline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

          {/* Left Content */}
          <div className="flex-1 z-10 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6"
            >
              Need Equipment?<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Rent Everything.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Don&apos;t want full event management? Just rent what you need. From massive marquees and heavy-duty generators to luxury lounge furniture and outdoor heaters.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/search?category=rentals">
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:-translate-y-1 transition-all border-none">
                  Explore Rentals Marketplace
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Visual Grid */}
          <div className="flex-1 z-10 w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer text-center"
              >
                <Tent className="w-8 h-8 mb-3 text-primary" />
                <span className="font-bold text-sm">Marquees & Tents</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer md:translate-y-4 text-center"
              >
                <Zap className="w-8 h-8 mb-3 text-yellow-400" />
                <span className="font-bold text-sm">Generators</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer text-center"
              >
                <Armchair className="w-8 h-8 mb-3 text-blue-400" />
                <span className="font-bold text-sm">Furniture</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer text-center"
              >
                <Wind className="w-8 h-8 mb-3 text-cyan-400" />
                <span className="font-bold text-sm">ACs & Heaters</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer md:translate-y-4 text-center"
              >
                <Shirt className="w-8 h-8 mb-3 text-pink-400" />
                <span className="font-bold text-sm">Bridal Dresses</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer text-center"
              >
                <Speaker className="w-8 h-8 mb-3 text-emerald-400" />
                <span className="font-bold text-sm">Sound Systems</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
