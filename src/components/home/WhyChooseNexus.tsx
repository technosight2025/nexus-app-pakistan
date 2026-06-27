"use client"
import React from 'react'
import { ShieldCheck, CreditCard, DollarSign, Star, Layers, HeartHandshake } from 'lucide-react'

export function WhyChooseNexus() {
  const valueProps = [
    {
      title: "Verified Professionals",
      desc: "Every professional partner goes through strict background screening and quality checks.",
      icon: ShieldCheck,
      color: "text-teal-600 bg-teal-50 border-teal-100"
    },
    {
      title: "Secure Booking",
      desc: "Escrow payments and digital contracts ensure your booking deposits are protected.",
      icon: CreditCard,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden charges, markups, or agency commissions. View and book directly.",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "Authentic Reviews",
      desc: "Trust genuine, community-sourced reviews and ratings from real hosts.",
      icon: Star,
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      title: "One Platform for Every Event",
      desc: "Book venues, hire photography artisans, rent wear, and plan in one interface.",
      icon: Layers,
      color: "text-indigo-650 bg-indigo-50/50 border-indigo-100"
    },
    {
      title: "Dedicated Customer Support",
      desc: "24/7 client happiness agents to resolve any reservation or scheduling questions.",
      icon: HeartHandshake,
      color: "text-rose-650 bg-rose-50 border-rose-100"
    }
  ]

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-slate-50 border-y border-slate-200">
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4F46E5] block font-bold">Uncompromising Quality</span>
        <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight">
          Why Choose Nexus
        </h2>
        <p className="text-slate-500 text-xs md:text-sm font-normal">
          We bring reliability, speed, and luxury coordination standards to discovering, comparing, and booking event providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {valueProps.map((prop, idx) => {
          const Icon = prop.icon
          return (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${prop.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">{prop.title}</h3>
                  <p className="text-xs text-slate-550 leading-relaxed font-normal">{prop.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
