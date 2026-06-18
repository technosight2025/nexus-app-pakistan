"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Calendar, Camera, CreditCard, Layers, Sparkles } from 'lucide-react';

const COMPARISONS = [
  {
    title: 'Marketplace',
    fragmented: 'Unverified Facebook posts, random referrals, and zero catalog pricing structure.',
    unified: 'A clean, centralized public directory showcasing portfolios, direct slot booking calendars, and vetted reviews.',
    icon: Compass,
    color: 'text-indigo-950',
    bg: 'bg-indigo-50'
  },
  {
    title: 'CRM & Contacts',
    fragmented: 'Scattered WhatsApp message threads, manual notepad books, and lost client lists.',
    unified: 'Standardized SaaS CRM with dedicated customer tags, notes history, automatic updates, and status tags.',
    icon: Users,
    color: 'text-emerald-750',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Bookings & Calendar',
    fragmented: 'Double-booked marquee dates, phone calls to verify hall availability, and paper logs.',
    unified: 'Instant slot checkers, blocked-out reservation periods, and real-time client booking ledger calendar updates.',
    icon: Calendar,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    title: 'Event Galleries',
    fragmented: 'Slow Google Drive folder links, compressed WhatsApp photos, and messy USB delivery drives.',
    unified: 'QR code scanning, guest web uploads directly to a facial-grouped AI album, and instant social highlights.',
    icon: Camera,
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  },
  {
    title: 'Payments',
    fragmented: 'Manual cash advances, missing bank transfer receipts, and split payment tracking disputes.',
    unified: 'Integrated digital invoice generation, automated revenue commissions, and cash ledger records.',
    icon: CreditCard,
    color: 'text-purple-750',
    bg: 'bg-purple-50'
  },
  {
    title: 'Client Management',
    fragmented: 'Continuous phone tag, unrecorded project scope changes, and mismatched design estimates.',
    unified: 'Unified project timeline milestone updates, collaborative workspace threads, and automated contracts.',
    icon: Layers,
    color: 'text-cyan-750',
    bg: 'bg-cyan-50'
  }
];

export default function WhyNexus() {
  return (
    <section className="py-24 bg-[#FAF9F6] border-y border-[#E6E2DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            SYSTEM CONSOLIDATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            Replace Multiple Tools With One Ecosystem
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium">
            Consolidate your stack. Save time, reduce booking friction, and protect event data.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPARISONS.map((comp) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.title}
                whileHover={{ y: -6 }}
                className="bg-white border border-[#E6E2DA] rounded-[2rem] p-6.5 text-left flex flex-col justify-between h-[360px] shadow-xs hover:border-[#1E1B4B] hover:shadow-md transition-all duration-300"
              >
                {/* Header Icon + Title */}
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${comp.bg} ${comp.color} border border-slate-100`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1B4B] font-heading">
                    {comp.title}
                  </h3>
                </div>

                {/* Comparison Lists */}
                <div className="space-y-3 flex-grow pt-4">
                  {/* Fragmented Way */}
                  <div className="flex gap-2.5 items-start">
                    <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-500 font-bold text-[10px] flex items-center justify-center shrink-0 border border-rose-100 mt-0.5">
                      ✕
                    </span>
                    <p className="text-[11.5px] font-semibold text-slate-400 leading-normal">
                      {comp.fragmented}
                    </p>
                  </div>

                  {/* Unified Way */}
                  <div className="flex gap-2.5 items-start border-t border-[#E6E2DA]/40 pt-3.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-[#047857] font-bold text-[10px] flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                      ✓
                    </span>
                    <p className="text-[11.5px] font-bold text-[#1E1B4B]/80 leading-normal">
                      {comp.unified}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
