"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, Calendar, Wallet, Store } from 'lucide-react'

export function PlannerHero() {
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
              <span className="text-[11px] font-[700] tracking-[0.06em] text-[#0F5B3E] uppercase">PLANNER OS</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-[700] text-[#0F5B3E] font-serif tracking-tight mb-6">
              Manage Clients,<br />Budgets & Vendors.
            </h1>

            {/* Paragraph */}
            <p className="text-[16px] text-[#4B5563] mb-8 max-w-[90%] leading-[1.6] font-[500]">
              The unified operating system built specifically for Pakistani event planners and wedding managers. Track client requests, compile budgeting spreadsheets, coordinate vendors, and deploy event-day itineraries from one dashboard.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/register?role=planner">
                <button className="flex items-center gap-2 px-7 py-3.5 bg-[#0F5B3E] text-white text-[14px] font-[700] rounded-full hover:bg-[#0d4d34] transition-all shadow-md">
                  Register as Planner <span className="text-lg leading-none">→</span>
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
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Itineraries</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Build minute-by-minute schedules for halls, caterers, and DJs.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Wallet className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Budget logs</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Track client deposits, vendor payments, and profit targets.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Store className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Vendor Sync</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Log contracts, request quotes, and sync vendor bookings.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="w-full lg:w-[48%] relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(5,46,32,0.12)] border border-[#ECE7DF] bg-white p-4 flex flex-col justify-between">
              
              {/* Fake Planner Hub Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Wedding: Sarah & Bilal • Budget Check</h4>
                  <p className="text-[9.5px] text-slate-400 font-medium">Total budget: Rs. 25,00,000</p>
                </div>
                <span className="text-[9.5px] font-black text-[#0F5B3E] uppercase tracking-wider bg-[#E6F0EC] px-2.5 py-1 rounded-full">
                  Under Budget
                </span>
              </div>

              {/* Budget logs visual */}
              <div className="space-y-2.5 my-3 flex-1 overflow-hidden">
                {[
                  { name: "Venue: Royal Marquee", allocated: "Rs. 8,00,000", paid: "Rs. 4,00,000", status: "50% Paid" },
                  { name: "Catering: Pearl Banquet", allocated: "Rs. 10,00,000", paid: "Rs. 8,00,000", status: "80% Paid" },
                  { name: "Decor: Floral Designs", allocated: "Rs. 4,00,000", paid: "Rs. 4,00,000", status: "100% Paid" },
                  { name: "Media: Ahmad Studio", allocated: "Rs. 2,00,000", paid: "Rs. 50,000", status: "25% Paid" }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-100 p-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 block">{item.name}</span>
                      <span className="text-[9px] text-slate-400 font-medium">Allocated: {item.allocated}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black text-[#0F5B3E] block">Paid: {item.paid}</span>
                      <span className="text-[8.5px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-[4px] inline-block mt-0.5">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Budget footer status */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-slate-400">Syncs with client invoices dashboard.</span>
                <button className="px-4 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white text-[10px] font-bold rounded-lg transition-colors">
                  Add Expense
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
