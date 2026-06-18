"use client"

import React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { motion } from "framer-motion"
import {
  Tv,
  Sparkles,
  ArrowRight,
  MonitorPlay,
  QrCode,
  MapPin,
  Clock,
  Layers,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function DisplaysLandingPage() {
  const displaysFeatures = [
    {
      title: "Welcome Loop Board",
      desc: "Welcome guests with elegant animations, high-res photos, traditional borders, and event agendas dynamically shown.",
      icon: Sparkles
    },
    {
      title: "Interactive Wayfinding",
      desc: "Help guests navigate large multi-lawn marquee halls with animated maps, directions, and parking details.",
      icon: MapPin
    },
    {
      title: "Candid Slideshow Streams",
      desc: "Synchronizes directly with guest memories upload portal. Approved snaps appear live on screens in seconds.",
      icon: QrCode
    },
    {
      title: "Android TV Native App",
      desc: "Install the NEXUS Displays player application directly on any Android Smart TV, projector, or TV box.",
      icon: MonitorPlay
    }
  ]

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden relative">
        {/* Background ambient lights */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0F5B3E]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-[#0F5B3E]/10 text-[#0F5B3E] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Tv className="w-3.5 h-3.5 text-[#D4AF37]" />
              NEXUS Displays OS
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[1.1] mb-6">
              Connect Every Marquee <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] to-[#D4AF37]">
                Screen to the Cloud
              </span>
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto font-medium">
              Transform TV screens, projectors, and digital welcome boards into fully synchronized event media players. Run slide loops, schedules, and live guest feeds instantly.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/demo" 
                className="px-8 py-4 bg-[#0F5B3E] text-white font-bold rounded-xl shadow-lg hover:bg-[#0d4d34] transition-all flex items-center justify-center gap-2"
              >
                Watch Displays OS in Action <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/business/venues" 
                className="px-8 py-4 bg-white border border-[#E6E2DA] text-[#1A1A1A] font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                Register Venue Signage
              </Link>
            </div>
          </div>

          {/* Interactive Screen Preview Mock */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative bg-[#1A1A1A] rounded-[2.5rem] p-6 shadow-2xl border-8 border-neutral-800 aspect-[16/9] overflow-hidden flex flex-col justify-between text-white">
              {/* Screen Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-white/10 px-2 py-0.5 rounded-full border border-white/5">
                    BARAT FUNCTION
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-extrabold tracking-tight">Sana & Ibrahim</h3>
                </div>
                
                <div className="flex gap-2">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-right">
                    <span className="text-[9px] text-gray-300 block">Up Next</span>
                    <span className="text-xs font-bold">Rukhsati - 10:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area representing slideshow overlay */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
                  alt="Live Slide Loop"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />
              </div>

              {/* Screen Footer */}
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-2.5 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-sm relative">
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-sm" />
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-white rounded-sm" />
                      <div className="absolute bottom-0.5 left-0.5 w-2 h-2 bg-white rounded-sm" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#D4AF37] font-bold block">SCAN TO SHARE PHOTOS</span>
                    <span className="text-[10px] text-gray-100 font-semibold">Live stream starts on screen instantly!</span>
                  </div>
                </div>

                <div className="text-[10px] font-semibold text-gray-300 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  Powered by NEXUS Displays OS Loop Player
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displaysFeatures.map((feat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E6E2DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#0F5B3E]/5 flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6 text-[#0F5B3E]" />
                </div>
                <h4 className="text-lg font-bold text-[#1A1A1A] mb-3">{feat.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
      <MegaFooter />
    </PublicLayout>
  )
}
