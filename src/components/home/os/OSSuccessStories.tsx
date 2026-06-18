"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { Building2, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export function OSSuccessStories() {
  const logos = [
    { name: "Marriott", label: "Hotel Partner" },
    { name: "PC Hotels", label: "Enterprise" },
    { name: "Garrison", label: "Premium Venue" },
    { name: "Nishat", label: "Boutique Hotel" },
    { name: "Qasr-e-Noor", label: "Banquet Chain" },
    { name: "Creative Studios", label: "Media Partner" }
  ]

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#E6E2DA]/50">
      <Container>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Success Callout */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-white p-8 md:p-10 rounded-[24px] border border-[#E6E2DA] shadow-lg relative overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0F5B3E]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex items-center gap-3 text-emerald-600 mb-6 font-bold text-sm tracking-widest uppercase">
              <TrendingUp className="w-5 h-5" />
              <span>Case Study</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-[#1A1A1A] mb-4 leading-tight">
              Venue 3 REDUCED BOOKING TIME BY 40%
            </h3>
            
            <p className="text-[#6B7280] leading-relaxed mb-8">
              Through Nexus Ecosystem's automated quotation flows and live availability matrix, top-tier venues are seeing immediate reduction in administrative overhead and faster contract signings.
            </p>
            
            <Link href="/business" className="inline-flex items-center gap-2 text-[#0F5B3E] font-bold text-sm hover:underline uppercase tracking-wider">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Logo Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-[0.15em] mb-8 text-center lg:text-left">
              Trusted by Pakistan's Best
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {logos.map((logo, idx) => (
                <div 
                  key={idx}
                  className="bg-white/50 border border-[#E6E2DA] rounded-xl h-24 flex flex-col items-center justify-center p-4 hover:bg-white transition-colors cursor-default group"
                >
                  <Building2 className="w-6 h-6 text-slate-300 group-hover:text-[#D4AF37] transition-colors mb-2" />
                  <span className="font-bold text-slate-800 text-sm text-center">{logo.name}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{logo.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
