"use client"
import { motion } from "framer-motion"
import { ArrowRight, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BusinessCTA() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full filter blur-[100px] translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full filter blur-[80px] -translate-x-1/3 translate-y-1/4" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl border border-white/20"
        >
          <Bot className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8"
        >
          Ready to Automate Your <br className="hidden md:block" />
          Event Business?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-primary-50 font-medium mb-12 max-w-2xl mx-auto"
        >
          Join thousands of Pakistani venues, caterers, and photographers who use NEXUS as their daily operating system.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/dashboard/vendor">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold rounded-2xl bg-white text-primary hover:bg-slate-50 shadow-xl hover:-translate-y-1 transition-all">
              Join the Ecosystem <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg font-bold rounded-2xl bg-transparent border-2 border-white/30 text-white hover:bg-white/10 transition-all">
            Contact Sales
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-sm text-primary-100 font-medium opacity-80"
        >
          No credit card required. Free 14-day trial for premium OS features.
        </motion.p>

      </div>
    </section>
  )
}
