"use client"

import React from 'react'
import Link from 'next/link'
import { Calendar, Monitor, BarChart3, ChevronRight, Check } from 'lucide-react'

export function VenueFeatures() {
  const features = [
    {
      id: "bookings",
      title: "1. Smart Bookings Calendar",
      subtitle: "Eliminate double-booking errors completely.",
      desc: "A centralized dashboard constructed to manage multi-hall venue scheduling. Block dates, track partial deposits, log contract parameters, and send automated client reminders for upcoming payments.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      badge: "Calendar & Invoicing",
      link: "/business/venues/calendar",
      linkText: "Explore Bookings System",
      points: [
        "Interactive monthly scheduling grids",
        "Multi-hall scheduling isolation",
        "Automatic deposit & payment schedules",
        "Conflict notification warnings"
      ]
    },
    {
      id: "displays",
      title: "2. Cloud Digital Signage & Displays",
      subtitle: "Sync welcome displays with event timelines.",
      desc: "Turn passive marquee screens into dynamic signs. Update welcome greeting banners, active hall directions, food menus, and guest seating charts remotely through your Nexus panel.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
      badge: "Displays Integration",
      link: "/business/venues/displays",
      linkText: "Configure Lobby Screens",
      points: [
        "Remote screen display controls",
        "Automatic layout template updates",
        "Live photo slideshow stream casting",
        "Sponsor billboard insertions"
      ]
    },
    {
      id: "analytics",
      title: "3. Advanced Analytics & Occupancy Logs",
      subtitle: "Optimize pricing matrices and check occupancy rates.",
      desc: "Gain deep insight into your operational performance. Monitor monthly bookings, capacity yields, seasonal revenue peaks, outstanding client credit, and catering inventory splits.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      badge: "Financial Analytics",
      link: "/business/venues/analytics",
      linkText: "Analyze Venue Metrics",
      points: [
        "Gross profit & seasonal projections",
        "Monthly marquee occupancy calculations",
        "Wait-staff wage log integration",
        "Catering food inventory trackers"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white border-t border-[#ECE7DF] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] font-[700] tracking-[0.15em] text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3.5 py-1.5 rounded-full">
            CORE PLATFORM FEATURES
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#052E20] font-serif tracking-tight mt-5 mb-4">
            Built for Premium Halls & Marquees
          </h2>
          <p className="text-slate-500 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
            From booking confirmations to lobby screens and kitchen inventories, manage everything in one integrated portal.
          </p>
        </div>

        {/* Alternate Layout Features List */}
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
