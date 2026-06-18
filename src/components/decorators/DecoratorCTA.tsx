"use client"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Flower } from "lucide-react"

export function DecoratorCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Join as Decorator */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl border border-primary/20 p-8 md:p-12 text-primary-foreground relative overflow-hidden group shadow-none"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-bold border border-white/10 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Grow Your Studio Brand
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  List Your Decor Agency on NEXUS.
                </h3>
                <p className="text-primary-foreground/80 text-sm font-medium mb-8 max-w-md leading-relaxed">
                  Join Pakistan's premier hospitality and events network. Reach high-budget shadi clients, manage custom packages, list prime truss rigs, and receive secured payouts.
                </p>
              </div>
              <button className="bg-white text-primary hover:bg-slate-50 font-bold rounded-xl h-12 px-6 w-max shadow-sm transition-transform hover:-translate-y-0.5 flex items-center gap-2 text-sm">
                Register as Decorator <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Book Decor Consultant */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl border border-outline p-8 md:p-12 text-foreground relative overflow-hidden group shadow-none"
          >
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-slate-50 rounded-tl-full -z-0 opacity-50 group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold border border-outline mb-6">
                  <Flower className="w-3.5 h-3.5 text-primary" /> Staging Coordination
                </div>
                <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                  Need Help Planning a Custom Stage Layout?
                </h3>
                <p className="text-muted-foreground text-sm font-medium mb-8 max-w-md leading-relaxed">
                  Consult with a verified NEXUS visual director to coordinate backdrop lighting setups, schedule sunset photo paths, and compile stage theme models.
                </p>
              </div>
              <button className="bg-foreground hover:bg-slate-800 text-white font-bold rounded-xl h-12 px-6 w-max transition-transform hover:-translate-y-0.5 flex items-center gap-2 text-sm shadow-sm">
                Request Decor Consultant <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
