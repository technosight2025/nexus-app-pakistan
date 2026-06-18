"use client"

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Check } from 'lucide-react'

export function StudioFeatures() {
  const features = [
    {
      id: "projects",
      title: "1. Collaborative Project Pipeline",
      subtitle: "Track shooting timelines, crew schedules, and gear.",
      desc: "An advanced CRM tailored specifically for photography and videography studios. Manage client deposits, create event shooting timelines, log equipment deployments, and route team assignments in real-time.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
      badge: "Studio CRM & Schedules",
      link: "/dashboard/studio/projects",
      linkText: "Manage Projects",
      points: [
        "Interactive timeline pipelines",
        "Photographer & assistant shift logs",
        "Camera & lens inventory trackers",
        "Automated balance collection reminders"
      ]
    },
    {
      id: "selection",
      title: "2. Lightroom-Synced Photo Selection",
      subtitle: "No more USB transfers or endless messages.",
      desc: "Deploy client photo-selection portals directly from your dashboard. Let wedding couples favorite, comment, or request edits on raw proofs online. Selection counts sync straight to your Lightroom plugin.",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
      badge: "Selection & Proofing",
      link: "/dashboard/studio/albums",
      linkText: "Configure Client Portals",
      points: [
        "Lightroom catalog sync plugin",
        "Real-time favorite list counters",
        "Password-protected private galleries",
        "Watermark protection controls"
      ]
    },
    {
      id: "deliveries",
      title: "3. Video Proofing & High-Speed Delivery",
      subtitle: "Review edits and deliver files in original quality.",
      desc: "Avoid client review confusion. Share wedding video drafts with time-stamped commenting, allowing couples to request revisions at exact frames. Deliver final albums and video files in high-resolution downloads.",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop",
      badge: "Draft Review & Delivery",
      link: "/dashboard/studio/deliveries",
      linkText: "Configure Deliveries",
      points: [
        "Time-based video draft annotations",
        "Secure high-speed folder transfers",
        "Client download log analytics",
        "Custom branded album download walls"
      ]
    }
  ]

  return (
    <section className="py-20 bg-white border-t border-[#ECE7DF] relative">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] font-[700] tracking-[0.15em] text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3.5 py-1.5 rounded-full">
            STUDIO WORKFLOWS
          </span>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#052E20] font-serif tracking-tight mt-5 mb-4">
            Built for Elite Creative Studios
          </h2>
          <p className="text-slate-500 font-medium text-[15px] max-w-xl mx-auto leading-relaxed">
            Unify your event client pipeline, photo selections, and digital video proofing in one premium platform.
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
