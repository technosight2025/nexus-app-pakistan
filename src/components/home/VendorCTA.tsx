"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Store, TrendingUp, Rocket } from "lucide-react"

export function VendorCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-yellow-300 via-orange-400 to-rose-500 rounded-xl p-8 md:p-16 overflow-hidden text-center md:text-left shadow-[0_20px_50px_rgba(251,146,60,0.3)]"
        >
          {/* Abstract Bubbly Shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-100/30 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold mb-6 text-sm"
              >
                <Rocket className="w-4 h-4 text-yellow-200" /> GROW WITH US
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                Are You an Event Vendor? <br/> Let&apos;s Grow Together! 🚀
              </h2>
              <p className="text-xl md:text-2xl font-medium text-white/90 mb-8 leading-relaxed max-w-xl">
                Join Pakistan&apos;s happiest event marketplace. Reach thousands of active couples and manage your bookings effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button className="h-16 px-10 rounded-2xl bg-white hover:bg-white/90 text-orange-600 font-black text-xl shadow-xl hover:-translate-y-1 transition-all">
                  Register as Vendor
                </Button>
                <Button variant="outline" className="h-16 px-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold text-xl backdrop-blur-md transition-all">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-white shadow-xl">
                <Store className="w-10 h-10 mb-4 text-yellow-200" />
                <div className="text-3xl font-black mb-1">Zero</div>
                <div className="font-bold text-white/80">Listing Fees</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 text-white shadow-xl translate-y-8">
                <TrendingUp className="w-10 h-10 mb-4 text-yellow-200" />
                <div className="text-3xl font-black mb-1">3x</div>
                <div className="font-bold text-white/80">More Leads</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
