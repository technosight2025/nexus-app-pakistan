"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LockKeyhole, Mail } from "lucide-react"

export function SecretVenueDeals() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 backdrop-blur-sm">
                <LockKeyhole className="w-4 h-4" /> VIP Access
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                Unlock Secret Venue Deals
              </h2>
              <p className="text-slate-300 font-medium max-w-lg mx-auto md:mx-0">
                Some venues don't want their heavily discounted rates shown publicly. Enter your email to get instant access to unpublished deals up to <span className="text-secondary font-bold">30% off</span>.
              </p>
            </div>
            
            <div className="w-full md:w-auto flex-1 max-w-md">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-medium"
                    required
                  />
                </div>
                <Button className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto shrink-0">
                  Unlock Deals
                </Button>
              </form>
              <p className="text-xs text-slate-500 font-medium text-center md:text-left mt-3">
                Join 10,000+ couples saving on their weddings.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
