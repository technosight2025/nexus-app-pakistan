"use client"

import React from 'react'
import Link from 'next/link'
import { Calendar, Mail, Image, ChevronRight, Check } from 'lucide-react'

export function CustomerFeatures() {
  const pillars = [
    {
      id: "events",
      title: "1. Event Planning & RSVP Tracker",
      subtitle: "The ultimate command center for event hosts.",
      desc: "Stay in full control of your planning timeline. Build guest lists, track direct RSVPs in real time, outline seating charts, and sync budgets. No more spreadsheets, manual text messages, or headcount confusion.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
      badge: "Dashboard & OS",
      link: "/dashboard/host/v2",
      linkText: "Go to Planner Dashboard",
      points: [
        "Real-time guest RSVP portal",
        "Day-of wedding itinerary timeline",
        "Expense spreadsheet & budget allocation",
        "Digital seat mapper & VIP tables"
      ]
    },
    {
      id: "invitations",
      title: "2. Custom Digital Invitations",
      subtitle: "Gorgeous digital invitations tailored for Pakistan.",
      desc: "Design stunning digital invites with wedding details, Google Maps venue pins, dress codes, event rules, and instant delivery via WhatsApp, SMS, or Email. Receive RSVPs directly on your wedding page.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      badge: "Invitations Builder",
      link: "/invite",
      linkText: "Build Your Digital Card",
      points: [
        "Premium regional/cultural card designs",
        "Direct RSVP submission form",
        "Embed map pins, countdowns & audio loops",
        "Instant delivery tracking & delivery metrics"
      ]
    },
    {
      id: "memories",
      title: "3. Guest-Shared Memories Wall",
      subtitle: "Preserve every angle of your special day.",
      desc: "Let your guests upload their photos and videos to a central, private wedding feed by simply scanning a QR code at their table. No app downloads required. You receive a premium collaborative album in full high-resolution.",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop",
      badge: "Digital Albums & QR",
      link: "/memories",
      linkText: "Setup Memory Wall",
      points: [
        "Table QR code generation for quick uploads",
        "High-definition guest photo uploads",
        "Live memory slideshow streaming for TV displays",
        "Host review moderation panel"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white border-t border-[#ECE7DF] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] font-[700] tracking-[0.1em] text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3.5 py-1.5 rounded-full">
            EXPLORE THE TOOLKIT
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#052E20] font-serif tracking-tight mt-5 mb-4">
            Three Pillars of Premium Hosting
          </h2>
          <p className="text-slate-500 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
            Nexus coordinates everything behind the scenes so you can focus entirely on enjoying your guests and family.
          </p>
        </div>

        {/* Pillars List - Alternating layouts */}
        <div className="space-y-24">
          {pillars.map((pillar, idx) => (
            <div 
              key={pillar.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Visual Demonstration */}
              <div className="w-full lg:w-[48%] relative">
                <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-[#ECE7DF] shadow-md group">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#0F5B3E] text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase border border-[#ECE7DF] shadow-xs">
                    {pillar.badge}
                  </div>
                </div>
              </div>

              {/* Details Column */}
              <div className="w-full lg:w-[46%] flex flex-col items-start">
                <h3 className="text-[24px] md:text-[28px] font-bold text-[#052E20] font-serif tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <h4 className="text-[13px] font-[700] text-[#0F5B3E] uppercase tracking-wider mb-4">
                  {pillar.subtitle}
                </h4>
                <p className="text-[14.5px] text-slate-600 mb-6 leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Point List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 w-full">
                  {pillar.points.map((pt, key) => (
                    <div key={key} className="flex items-start gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#E6F0EC] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#0F5B3E]" />
                      </div>
                      <span className="text-[12.5px] font-[600] text-slate-700 leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action */}
                <Link href={pillar.link}>
                  <button className="flex items-center gap-1.5 text-[13px] font-[700] text-[#0F5B3E] hover:underline transition-all">
                    {pillar.linkText} <ChevronRight className="w-4 h-4" />
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
