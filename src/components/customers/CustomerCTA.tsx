"use client"

import React from 'react'
import Link from 'next/link'

export function CustomerCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#052E20] via-[#0B402B] to-[#052E20] text-white overflow-hidden relative select-none">
      {/* Background visual graphics */}
      <div className="absolute right-0 bottom-0 w-[450px] h-[350px] bg-[#C5A880]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-[#0F5B3E]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10 text-center">
        <span className="text-[11px] font-[700] tracking-[0.15em] text-[#C5A880] uppercase">
          NEXUS FOR HOSTS
        </span>
        <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-tight font-serif font-medium italic text-white max-w-3xl mx-auto mt-6 mb-6">
          Coordinate your event, invite your guests, and capture every memory.
        </h2>
        <p className="text-[14px] md:text-[16px] text-gray-300 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
          Create an account and setup your event page in under 3 minutes. Plan with elite tools designed for premium Pakistani celebrations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/create-event">
            <button className="px-8 py-4 bg-[#C5A880] hover:bg-[#b49871] text-[#052E20] font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-md">
              Start Free Trial
            </button>
          </Link>
          <Link href="/pricing">
            <button className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-black text-xs uppercase tracking-widest rounded-full border border-white/25 transition-all">
              View Pricing
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
