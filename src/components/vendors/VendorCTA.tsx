"use client"
import { motion } from "framer-motion"
import { Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VendorCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-xl border border-slate-800"
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-white mb-6 border border-white/20">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Are you an Event Professional?
            </h2>
            <p className="text-slate-300 text-lg max-w-xl">
              Stop juggling WhatsApp messages and Excel sheets. 
              Join NEXUS to manage your leads, send smart quotations, and grow your business.
            </p>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
            <Link href="/business">
              <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
                List Your Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
