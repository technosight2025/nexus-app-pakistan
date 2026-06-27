"use client"
import { motion } from "framer-motion"
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BusinessHero() {
  return (
    <div className="flex flex-col w-full bg-slate-900">
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Dark Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0F1E36]/30 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-70 animate-blob animation-delay-2000" />
        </div>

        <div className="absolute inset-0 z-0 bg-[url('/images/pakistani_wedding_venue.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/20 text-[#E6C594] font-bold text-sm md:text-base mb-8 backdrop-blur-md"
          >
            <Building2 className="w-5 h-5 text-[#E6C594]" />
            Elite B2B Concierge Ecosystem
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 max-w-5xl leading-[1.1]"
          >
            Run Your Entire Event Business on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6C594] to-amber-500">NEXUS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mb-12 font-medium leading-relaxed"
          >
            Stop chasing leads in WhatsApp. All your inquiries are auto-organized into your Nexus Dashboard the moment they arrive. Manage wagers, bookings, and quotations from one unified B2B platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-6"
          >
            {/* Primary Action: Request Demo */}
            <Link href="https://wa.me/923001234567?text=Hi%20Nexus%20Business%20Team,%20I'd%20like%20to%2520request%2520a%2520demo.">
              <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-[#E6C594] text-neutral-950 hover:bg-[#ebd0ab] shadow-[0_10px_30px_rgba(230,197,148,0.3)] transition-all hover:-translate-y-1 flex items-center gap-2 border-0 cursor-pointer">
                Request Demo <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
            
            {/* Secondary Action: Join */}
            <Link href="/dashboard/vendor">
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold rounded-full bg-white/5 text-white border-white/20 hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm cursor-pointer">
                Join the Ecosystem
              </Button>
            </Link>
          </motion.div>

          {/* Risk-Free Trial Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs font-mono uppercase tracking-widest text-[#E6C594] mb-12"
          >
            Start Your risk-free 14-day trial • No credit card required
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 text-slate-350 font-medium text-slate-300"
          >
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Zero Double Bookings</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Smart CRM Included</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> WhatsApp Integrated</div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <div className="w-full bg-slate-950/50 border-y border-white/5 py-6 backdrop-blur-md relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-widest font-mono">
            ⚡ Powering operations for 100+ Marquees, Caterers, and Studios across Lahore, Karachi, and Islamabad.
          </p>
        </div>
      </div>
    </div>
  )
}
