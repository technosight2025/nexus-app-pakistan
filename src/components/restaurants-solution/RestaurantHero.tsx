"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, BookOpen, Clock, Heart } from 'lucide-react'

export function RestaurantHero() {
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
              <span className="text-[11px] font-[700] tracking-[0.06em] text-[#0F5B3E] uppercase">RESTAURANT OS</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-[700] text-[#0F5B3E] font-serif tracking-tight mb-6">
              Delight Guests.<br />Grow Your Restaurant.
            </h1>

            {/* Paragraph */}
            <p className="text-[16px] text-[#4B5563] mb-8 max-w-[90%] leading-[1.6] font-[500]">
              The unified digital platform built specifically for Pakistani restaurants, cafes, and catering spaces. Publish interactive digital QR menus, manage real-time table reservations, and coordinate private banquet halls from a single dashboard.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/register?role=restaurant">
                <button className="flex items-center gap-2 px-7 py-3.5 bg-[#0F5B3E] text-white text-[14px] font-[700] rounded-full hover:bg-[#0d4d34] transition-all shadow-md">
                  Register Your Restaurant <span className="text-lg leading-none">→</span>
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
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">QR Menus</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Digital menus allow clients to scan, filter, and view prices.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Table Logs</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Coordinate bookings and peak hours to prevent double-booking.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Heart className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Guest Loyalty</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Keep logs of favorite tables, diets, and guest notes.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="w-full lg:w-[48%] relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(5,46,32,0.12)] border border-[#ECE7DF] bg-white p-4 flex flex-col justify-between">
              
              {/* Fake Table Layout Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Lakeside Terrace • Table Management</h4>
                  <p className="text-[9.5px] text-slate-400 font-medium">Status: 8 of 12 tables occupied</p>
                </div>
                <span className="text-[9.5px] font-black text-[#0F5B3E] uppercase tracking-wider bg-[#E6F0EC] px-2.5 py-1 rounded-full">
                  Live View
                </span>
              </div>

              {/* Table Seating Mockup */}
              <div className="grid grid-cols-4 gap-3 my-4 flex-1">
                {[
                  { id: "T1", cap: "4 Seats", status: "occupied", guest: "Zoya Raza" },
                  { id: "T2", cap: "6 Seats", status: "occupied", guest: "Ahmad Ali" },
                  { id: "T3", cap: "2 Seats", status: "vacant" },
                  { id: "T4", cap: "8 Seats", status: "reserved", guest: "Bilal (7:30)" },
                  { id: "T5", cap: "4 Seats", status: "occupied", guest: "Kiran Shah" },
                  { id: "T6", cap: "4 Seats", status: "vacant" },
                  { id: "T7", cap: "6 Seats", status: "occupied", guest: "Hamza Malik" },
                  { id: "T8", cap: "2 Seats", status: "occupied", guest: "Sarah Khan" }
                ].map((table) => (
                  <div 
                    key={table.id} 
                    className={`rounded-xl border p-2.5 flex flex-col justify-between text-left transition-all ${
                      table.status === "occupied" 
                        ? "bg-[#FAF7F2] border-[#ECE7DF] text-[#052E20]" 
                        : table.status === "reserved"
                          ? "bg-amber-50/50 border-amber-200 text-amber-800"
                          : "bg-white border-slate-100 text-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black">{table.id}</span>
                      <span className="text-[8px] font-medium">{table.cap}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-[9px] font-bold truncate block">
                        {table.status === "occupied" || table.status === "reserved" ? table.guest : "Vacant"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seating footer status */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-slate-400">Syncs instantly with reservations portal.</span>
                <button className="px-4 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white text-[10px] font-bold rounded-lg transition-colors">
                  Assign Table
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
