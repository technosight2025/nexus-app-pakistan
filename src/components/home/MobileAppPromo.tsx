"use client"
import { motion } from "framer-motion"
import { Smartphone } from "lucide-react"

export function MobileAppPromo() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            {/* Fake phones setup */}
            <div className="relative w-full max-w-md mx-auto aspect-[9/16] bg-foreground rounded-xl border-[8px] border-outline shadow-lg p-4 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-outline rounded-b-3xl w-1/3 mx-auto z-20" />
              <div className="w-full h-full bg-background rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-black text-xl text-primary">NEXUS</span>
                    <div className="w-8 h-8 rounded-full bg-outline" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-32 bg-surface rounded-2xl shadow-sm border border-outline" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-surface rounded-2xl shadow-sm border border-outline" />
                      <div className="h-24 bg-surface rounded-2xl shadow-sm border border-outline" />
                    </div>
                    <div className="w-full h-48 bg-surface rounded-2xl shadow-sm border border-outline" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6">
              <Smartphone className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-6">
              Manage Everything on the Go.
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              The NEXUS Vendor & Customer App gives you complete control in your pocket. Track bookings, manage leads, and update your digital signage instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-xl transition-all hover:scale-105">
                <div className="text-left">
                  <div className="text-xs font-semibold">GET IT ON</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-xl transition-all hover:scale-105">
                <div className="text-left">
                  <div className="text-xs font-semibold">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
