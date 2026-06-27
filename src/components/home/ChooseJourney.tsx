"use client"
import React from 'react'
import Link from 'next/link'
import { Sparkles, Compass, Briefcase, ArrowRight } from 'lucide-react'

export function ChooseJourney() {
  const journeys = [
    {
      title: "I'm Planning",
      desc: "Create your event from scratch with AI assistance, track budgets, and manage RSVPs.",
      icon: Sparkles,
      href: "/create-event",
      btnText: "Start Planning",
      color: "text-[#0F5B3E] bg-[#0F5B3E]/5 border-[#0F5B3E]/20"
    },
    {
      title: "I'm Exploring",
      desc: "Discover venues, photographers, decorators, caterers, and traditional wagers.",
      icon: Compass,
      href: "/explore",
      btnText: "Browse Marketplace",
      color: "text-[#C5A880] bg-[#C5A880]/5 border-[#C5A880]/20"
    },
    {
      title: "I'm a Professional",
      desc: "Grow your business, capture direct WhatsApp leads, and connect with premium clients.",
      icon: Briefcase,
      href: "/register?role=artisan",
      btnText: "Join as Partner",
      color: "text-[#1E1B4B] bg-[#1E1B4B]/5 border-[#1E1B4B]/20"
    }
  ]

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-white">
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880] block font-bold">Tailored Pathways</span>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight leading-tight">
          Everything You Need for Every Celebration
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {journeys.map((j, idx) => {
          const Icon = j.icon
          return (
            <div 
              key={idx}
              className="bg-slate-50/50 border border-slate-200/50 rounded-[32px] p-8 md:p-10 flex flex-col justify-between hover:bg-white hover:border-[#C5A880]/30 hover:shadow-[0_25px_50px_rgba(197,168,128,0.06)] transition-all duration-300 group"
            >
              <div className="space-y-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${j.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold font-serif text-slate-900">{j.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{j.desc}</p>
                </div>
              </div>

              <div className="pt-8">
                <Link href={j.href}>
                  <button className="w-full px-6 py-3.5 bg-neutral-950 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#C5A880] transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                    {j.btnText} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
