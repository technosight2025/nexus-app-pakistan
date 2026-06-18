"use client"
import { motion } from "framer-motion"
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BusinessHero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
      {/* Dynamic Dark Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="absolute inset-0 z-0 bg-[url('/images/pakistani_wedding_venue.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/20 text-slate-200 font-bold text-sm md:text-base mb-8 backdrop-blur-md"
        >
          <Building2 className="w-5 h-5 text-primary" />
          The Event & Hospitality Operating System
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 max-w-5xl leading-[1.1]"
        >
          Run Your Entire Event Business on <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">NEXUS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 font-medium leading-relaxed"
        >
          Ditch the WhatsApp chaos and messy spreadsheets. Manage your leads, daily wagers, venue bookings, and quotations from one powerful ERP platform built specifically for Pakistan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
        >
          <Link href="/dashboard/vendor">
            <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white shadow-[0_10px_30px_rgba(255,56,92,0.4)] hover:shadow-[0_15px_40px_rgba(255,56,92,0.5)] transition-all hover:-translate-y-1 flex items-center gap-2 border-0">
              Join the Ecosystem <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold rounded-full bg-white/5 text-white border-white/20 hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm">
            Request Demo
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 text-slate-300 font-medium"
        >
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Zero Double Bookings</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Smart CRM Included</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> WhatsApp Integrated</div>
        </motion.div>
      </div>
    </section>
  )
}
