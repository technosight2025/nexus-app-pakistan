"use client"

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Check } from 'lucide-react'

export function RestaurantFeatures() {
  const features = [
    {
      id: "menus",
      title: "1. Interactive QR & Digital Menus",
      subtitle: "Update pricing and menu items instantly.",
      desc: "Ditch printing bills and menus for updates. Publish beautiful digital menus that guests can view by scanning QR codes at their tables. Support dynamic price updates, detail descriptions, and dietary filters.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop",
      badge: "Digital Menus",
      link: "/business/dashboard",
      linkText: "Configure Menu Items",
      points: [
        "Interactive scan QR codes",
        "Dietary requirement tag filtering",
        "Instant pricing & details changes",
        "Special chef recommendations cards"
      ]
    },
    {
      id: "reservations",
      title: "2. Real-time Reservations & Seating Logs",
      subtitle: "Prevent double-booking issues during busy hours.",
      desc: "Stay in control of your seating logs. Track client table requests, waitlists, and seat assignments. Request online advance deposits to secure bookings for high-value dinner timings.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
      badge: "Table Logs & Seats",
      link: "/business/dashboard",
      linkText: "Manage Table Grid",
      points: [
        "Dynamic table occupancy calendar",
        "Automated confirmation texts",
        "Online reservation deposit gateway",
        "Customer dietary logs"
      ]
    },
    {
      id: "events",
      title: "3. Private Dining & Banquet Events",
      subtitle: "Seamlessly host wedding lunches and private dinners.",
      desc: "Pakistan's dining industry revolves around community gatherings. Configure packages, track hall rentals, manage custom event buffet requirements, and calculate per-head costs from one dashboard.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      badge: "Events & Banquets",
      link: "/business/event-manager",
      linkText: "Coordinate Private Events",
      points: [
        "Custom event buffet package lists",
        "Private hall booking calendar",
        "Catering staff wage tracker",
        "Per-head cost projection calculator"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white border-t border-[#ECE7DF] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] font-[700] tracking-[0.15em] text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3.5 py-1.5 rounded-full">
            DINING OPERATING SYSTEM
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#052E20] font-serif tracking-tight mt-5 mb-4">
            Built for Elite Dining Spaces
          </h2>
          <p className="text-slate-500 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
            Manage table lists, digital menus, waitlists, and banquet halls from one centralized platform.
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
