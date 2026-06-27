"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BarChart3, MessageSquare, Landmark, ArrowRight } from 'lucide-react'

export function VendorBenefits() {
  const benefits = [
    {
      title: "Manage Inquiries",
      desc: "Track status milestones, verify deposits, and organize incoming requests inside a single, intuitive CRM dashboard.",
      icon: BarChart3
    },
    {
      title: "WhatsApp Native Leads",
      desc: "Connect directly with prospective families. Send automated, beautifully designed menu quotes instantly.",
      icon: MessageSquare
    },
    {
      title: "Module Marketplace",
      desc: "Upsell premium add-ons, showcase packages, and accept card deposits through secure transaction channels.",
      icon: Landmark
    }
  ]

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-slate-950 text-white border-y border-white/5 relative overflow-hidden">
      {/* Muted luxury pattern design background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.06),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] block font-bold">Become a Partner</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight">
            Grow Your Business with Nexus
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals reaching premium clients every day.
          </p>
        </div>

        {/* 3 Columns Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-[28px] p-8 text-center space-y-4 hover:border-[#D4AF37]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white">{benefit.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Start Free Trial CTA */}
        <div className="pt-6">
          <Link href="/register?role=artisan">
            <button className="px-8 py-4 bg-[#D4AF37] hover:bg-[#ebd0ab] text-neutral-950 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(212,175,55,0.3)] transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer">
              Become a Partner <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
