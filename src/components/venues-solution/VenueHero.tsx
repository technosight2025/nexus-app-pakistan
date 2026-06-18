"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, Building, BarChart, ShieldCheck } from 'lucide-react'

export function VenueHero() {
  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#FDF8F0]">
      {/* Decorative backdrop pattern */}
      <div className="absolute right-0 top-0 w-[40%] h-[100%] opacity-[0.03] pointer-events-none -z-10">
        <img 
          src="/images/pakistani_wedding_venue.png" 
          alt="Backdrop" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-between">
          
          {/* Left Column: Headline and Actions */}
          <div className="w-full lg:w-[48%] flex flex-col items-start z-10 shrink-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF7F2] border border-[#ECE7DF] rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#0F5B3E]" />
              <span className="text-[11px] font-[700] tracking-[0.06em] text-[#0F5B3E] uppercase">VENUE OS</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-[700] text-[#0F5B3E] font-serif tracking-tight mb-6">
              Maximize Revenue.<br />Manage Your Halls.
            </h1>

            {/* Paragraph */}
            <p className="text-[16px] text-[#4B5563] mb-8 max-w-[90%] leading-[1.6] font-[500]">
              The all-in-one management platform built specifically for Pakistani marriage halls, marquees, and hotels. Prevent costly double bookings, display smart lobby signage, and track daily wager check-ins from one unified cloud portal.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/register?role=venue">
                <button className="flex items-center gap-2 px-7 py-3.5 bg-[#0F5B3E] text-white text-[14px] font-[700] rounded-full hover:bg-[#0d4d34] transition-all shadow-md">
                  Register Your Venue <span className="text-lg leading-none">→</span>
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
                  <Building className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Multi-Hall</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Control separate bookings, calendar grids, and rates.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <BarChart className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Analytics</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Track occupancy rates, seasonal profits, and margins.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Secure logs</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Audit logs of payment collection and booking modifications.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="w-full lg:w-[48%] relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(5,46,32,0.12)] border border-[#ECE7DF] bg-white p-4">
              {/* Fake Calendar Schedule Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="text-xs font-bold text-slate-800">Grand Shahi Ballroom</span>
                </div>
                <span className="text-[10px] font-black text-[#0F5B3E] uppercase tracking-wider bg-[#E6F0EC] px-2.5 py-1 rounded-full">
                  Dec 2026 Schedule
                </span>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-slate-400 font-bold mb-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold text-slate-700">
                {Array.from({ length: 31 }, (_, idx) => {
                  const day = idx + 1
                  const isBooked = [4, 5, 11, 12, 18, 19, 20, 24, 25, 26, 27].includes(day)
                  const isSelected = day === 18

                  return (
                    <div 
                      key={idx} 
                      className={`py-2 rounded-lg flex flex-col items-center justify-center relative transition-all ${
                        isSelected 
                          ? 'bg-[#0F5B3E] text-white shadow-sm' 
                          : isBooked 
                            ? 'bg-[#FAF7F2] border border-[#ECE7DF]/70 text-[#052E20]' 
                            : 'text-slate-300 font-normal hover:bg-slate-50'
                      }`}
                    >
                      <span>{day}</span>
                      {isBooked && !isSelected && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#0F5B3E]"></span>}
                    </div>
                  )
                })}
              </div>

              {/* Selected Day Details Card */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-800">Walima: Zainab & Bilal</h4>
                  <p className="text-[10.5px] text-slate-400 font-medium">Dec 18, 2026 • 7:00 PM - 10:00 PM</p>
                </div>
                <span className="text-[10px] font-bold text-[#0F5B3E] bg-[#E6F0EC] px-3 py-1 rounded-full">
                  Rs. 4,50,000 Paid
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
