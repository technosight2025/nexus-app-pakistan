"use client"

import React, { useState } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { motion } from "framer-motion"
import {
  Check,
  Building2,
  Camera,
  Users,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("annually")

  const pricingTiers = [
    {
      name: "Guest & Invite Suite",
      desc: "For single wedding couples and event hosts.",
      price: "15,000",
      period: "per Event",
      icon: Users,
      badge: "Single Event",
      features: [
        "1 Digital Invitation Card Mobile Builder",
        "Traditional music loop & couples story page",
        "Real-time guest RSVP tracking dashboard",
        "VVIP Seating allocation coordinator",
        "SMS/WhatsApp guest invitation dispatch link",
        "QR entrance tickets scanning system",
        "15-day guest gallery cloud memory storage"
      ],
      cta: "Plan My Event",
      href: "/register"
    },
    {
      name: "Creative Studio OS",
      desc: "For photography, editing, and cinematography studios.",
      price: billingCycle === "annually" ? "7,200" : "8,500",
      period: "per Month",
      icon: Camera,
      badge: "Popular Plan",
      features: [
        "Interactive leads pipeline & inquiry inbox",
        "Auto-generator contracts with client E-Sign",
        "Branded client selection photo/video portals",
        "High-res gig deliveries via cloud albums",
        "Invoicing ledger & milestone advance tracker",
        "Crew availability planner (Up to 15 members)",
        "AI Quotation writer & contract templates"
      ],
      cta: "Start Free Trial",
      href: "/register"
    },
    {
      name: "Venue Command OS",
      desc: "For multi-hall wedding marquees, halls, and lawns.",
      price: billingCycle === "annually" ? "21,000" : "25,000",
      period: "per Month",
      icon: Building2,
      badge: "Enterprise Grade",
      features: [
        "Multi-hall visual calendar scheduler",
        "Staff dispatch squad managers (catering, valet)",
        "Shahi catering menu cost calculator",
        "Displays OS controller links to signage TVs",
        "Local payment methods integration & ledger",
        "Automatic SMS installment payment alerts",
        "Dedicated setup onboarding guide"
      ],
      cta: "Schedule Demo",
      href: "/demo"
    }
  ]

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden relative">
        {/* Background ambient color circles */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0F5B3E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              NEXUS PLATFORM SUBSCRIPTIONS
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
              Simple Plans for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37]">
                Unforgettable Events
              </span>
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto font-medium">
              Choose the dedicated suite tailored to your marquee, photography studio, or wedding planning needs. Setup takes under an hour.
            </p>

            {/* Toggle Billing Cycle */}
            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`text-sm font-bold transition-all px-4 py-2 rounded-xl ${
                  billingCycle === "monthly"
                    ? "bg-[#0F5B3E] text-white"
                    : "text-[#6B7280] hover:text-[#0F5B3E]"
                }`}
              >
                Bill Monthly
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBillingCycle("annually")}
                  className={`text-sm font-bold transition-all px-4 py-2 rounded-xl relative ${
                    billingCycle === "annually"
                      ? "bg-[#0F5B3E] text-white"
                      : "text-[#6B7280] hover:text-[#0F5B3E]"
                  }`}
                >
                  Bill Annually
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] bg-[#D4AF37] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider scale-90">
                    SAVE 15%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
            {pricingTiers.map((tier, idx) => {
              const Icon = tier.icon
              const isPopular = tier.badge === "Popular Plan"
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-[2.5rem] p-8 border transition-all duration-300 flex flex-col justify-between ${
                    isPopular
                      ? "border-[#0F5B3E] ring-4 ring-[#0F5B3E]/5 shadow-xl scale-105"
                      : "border-[#E6E2DA] shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                        isPopular
                          ? "bg-[#0F5B3E] text-white"
                          : "bg-[#FAF7F2] text-[#0F5B3E] border border-[#0F5B3E]/10"
                      }`}>
                        {tier.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#0F5B3E]/5 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#0F5B3E]" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">{tier.name}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-6 font-medium">{tier.desc}</p>

                    <div className="flex items-baseline gap-1.5 mb-8">
                      <span className="text-4xl font-black text-[#1A1A1A]">Rs. {tier.price}</span>
                      <span className="text-xs text-[#6B7280] font-bold uppercase tracking-wider">{tier.period}</span>
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-3.5 border-t border-[#E6E2DA] pt-6 mb-8">
                      {tier.features.map((feat, i) => (
                        <div key={i} className="flex gap-3 items-start text-xs font-semibold text-slate-800">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={tier.href}
                    className={`w-full py-4 text-center rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                      isPopular
                        ? "bg-[#0F5B3E] text-white hover:bg-[#0d4d34]"
                        : "bg-white border border-[#E6E2DA] text-[#1A1A1A] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    {tier.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )
            })}
          </div>

        </div>
      </div>
      <MegaFooter />
    </PublicLayout>
  )
}
