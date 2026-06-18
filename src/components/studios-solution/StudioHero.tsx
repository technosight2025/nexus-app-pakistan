"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, Camera, Film, ShieldCheck } from 'lucide-react'

export function StudioHero() {
  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#FDF8F0]">
      {/* Decorative backdrop pattern */}
      <div className="absolute right-0 top-0 w-[40%] h-[100%] opacity-[0.03] pointer-events-none -z-10">
        <img 
          src="/images/pakistani_wedding_couple.png" 
          alt="Backdrop" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-between">
          
          {/* Left Column: Copy & Actions */}
          <div className="w-full lg:w-[48%] flex flex-col items-start z-10 shrink-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF7F2] border border-[#ECE7DF] rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#0F5B3E]" />
              <span className="text-[11px] font-[700] tracking-[0.06em] text-[#0F5B3E] uppercase">STUDIO OS</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-[700] text-[#0F5B3E] font-serif tracking-tight mb-6">
              Streamline Projects.<br />Deliver Masterpieces.
            </h1>

            {/* Paragraph */}
            <p className="text-[16px] text-[#4B5563] mb-8 max-w-[90%] leading-[1.6] font-[500]">
              The unified management platform built specifically for Pakistani photography and videography studios. Manage client projects, coordinate daily wager camera crews, host collaborative photo selection galleries, and deliver final albums in full high-resolution.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/register?role=studio">
                <button className="flex items-center gap-2 px-7 py-3.5 bg-[#0F5B3E] text-white text-[14px] font-[700] rounded-full hover:bg-[#0d4d34] transition-all shadow-md">
                  Register Your Studio <span className="text-lg leading-none">→</span>
                </button>
              </Link>
              <Link href="/demo">
                <button className="px-7 py-3.5 bg-white text-[#1F2937] text-[14px] font-[700] rounded-full border border-[#ECE7DF] hover:bg-gray-50 transition-all shadow-sm">
                  Request Live Demo
                </button>
              </Link>
            </div>

            {/* Core Benefits */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#ECE7DF] w-full">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Camera className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Proofing</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Clients select favorites online; picks sync directly to Lightroom.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Film className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Draft reviews</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Let clients add time-stamped comments directly on video drafts.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Secured Delivery</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Password-protected galleries with download limit controls.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="w-full lg:w-[48%] relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(5,46,32,0.12)] border border-[#ECE7DF] bg-white p-4 flex flex-col justify-between">
              
              {/* Fake Selection Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Aisha & Hamza • Walima Selection</h4>
                  <p className="text-[9.5px] text-slate-400 font-medium">Client view: 42 of 200 selected</p>
                </div>
                <span className="text-[9.5px] font-black text-[#0F5B3E] uppercase tracking-wider bg-[#E6F0EC] px-2.5 py-1 rounded-full">
                  Lightroom Synced
                </span>
              </div>

              {/* Photo selection grid */}
              <div className="grid grid-cols-3 gap-2 my-3 flex-1 overflow-hidden">
                {[
                  { img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop", active: true },
                  { img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop", active: false },
                  { img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&h=200&fit=crop", active: true },
                  { img: "https://images.unsplash.com/photo-1505373633519-7d39e76deb2a?w=300&h=200&fit=crop", active: false },
                  { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop", active: true },
                  { img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=300&h=200&fit=crop", active: false }
                ].map((photo, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3] group">
                    <img src={photo.img} alt="Couple" className="w-full h-full object-cover" />
                    
                    {/* Status badge */}
                    <div className="absolute top-1 right-1 flex items-center justify-center">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white shadow-md ${
                        photo.active ? 'bg-emerald-500' : 'bg-black/40'
                      }`}>
                        {photo.active ? '✓' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selection actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-slate-400">Lightroom plugin connected.</span>
                <button className="px-4 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white text-[10px] font-bold rounded-lg transition-colors">
                  Sync Selection
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
