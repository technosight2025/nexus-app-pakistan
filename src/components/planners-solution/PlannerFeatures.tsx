"use client"

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Check } from 'lucide-react'

export function PlannerFeatures() {
  const features = [
    {
      id: "clients",
      title: "1. Client CRM & Milestone Timelines",
      subtitle: "Track milestones, files, and billing stages.",
      desc: "Manage client contracts, planning checklist milestones, moodboards, and invoices in one spot. Send automated follow-up texts, collect e-signatures on contracts, and track billing schedules.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
      badge: "Client Management & Billing",
      link: "/dashboard/planner",
      linkText: "Explore Planner Panel",
      points: [
        "Milestone checklist pipelines",
        "Online contract e-signature portal",
        "Client invoice scheduling trackers",
        "Shared guest moodboard reviews"
      ]
    },
    {
      id: "budgets",
      title: "2. Dynamic Event Budget Spreadsheets",
      subtitle: "Prevent client cost overruns completely.",
      desc: "Stay in control of wedding budgets. Allocate funds across categories, log payment deposits, track balance timelines, and check profit margin projections from a dynamic dashboard.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
      badge: "Budget Tracker OS",
      link: "/dashboard/planner",
      linkText: "Configure Budget Lists",
      points: [
        "Real-time expense logs",
        "Category-wise budget dividers",
        "Upcoming deposit reminders",
        "Cost estimation algorithms"
      ]
    },
    {
      id: "vendors",
      title: "3. Unified Event Vendor Hub",
      subtitle: "Synchronize venues, caterers, and creatives.",
      desc: "Coordinate venues, caterers, makeup artists, and decorators in one place. Send quotation request lists, review and compare pricing sheets, and log service parameters.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
      badge: "Vendor Booking Hub",
      link: "/dashboard/planner",
      linkText: "Manage Vendor List",
      points: [
        "RFP quote submission templates",
        "Vendor contract synchronization",
        "Collaborative event calendar sync",
        "Central invoice payment tracking"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white border-t border-[#ECE7DF] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] font-[700] tracking-[0.15em] text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3.5 py-1.5 rounded-full">
            PLANNER OPERATING SYSTEM
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#052E20] font-serif tracking-tight mt-5 mb-4">
            Built for Elite Wedding & Event Planners
          </h2>
          <p className="text-slate-500 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
            Manage your client pipeline, budgets, shift checklists, and vendor schedules in one integrated portal.
          </p>
        </div>

        {/* Alternate Layout Features list */}
        <div className="space-y-24">
          {features.map((feat, idx) => (
            <div 
              key={feat.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Visual Grid Column */}
              <div className="w-full lg:w-[48%] relative">
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-[#ECE7DF] shadow-md group">
                  <img 
                    src={feat.image} 
                    alt={feat.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0F5B3E] text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase border border-[#ECE7DF] shadow-xs">
                    {feat.badge}
                  </div>
                </div>
              </div>

              {/* Detail Copy Column */}
              <div className="w-full lg:w-[46%] flex flex-col items-start">
                <h3 className="text-[24px] md:text-[28px] font-bold text-[#052E20] font-serif tracking-tight mb-2">
                  {feat.title}
                </h3>
                <h4 className="text-[13px] font-[700] text-[#0F5B3E] uppercase tracking-wider mb-4">
                  {feat.subtitle}
                </h4>
                <p className="text-[14.5px] text-slate-600 mb-6 leading-relaxed">
                  {feat.desc}
                </p>

                {/* Point Lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 w-full">
                  {feat.points.map((pt, key) => (
                    <div key={key} className="flex items-start gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#0F5B3E]" />
                      </div>
                      <span className="text-[12.5px] font-[600] text-slate-700 leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Link */}
                <Link href={feat.link}>
                  <button className="flex items-center gap-1.5 text-[13px] font-[700] text-[#0F5B3E] hover:underline transition-all">
                    {feat.linkText} <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
