"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-16 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Full-width Indigo card */}
        <div className="bg-[#1E1B4B] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Accent graphics */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#047857]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#D97706]/10 blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-8 relative z-10">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/90 px-4 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
              <span>Free for couples · 14-day vendor trial</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white tracking-tight leading-none">
              Ready To Build Your <br /> Next Project?
            </h2>

            {/* Subhead */}
            <p className="text-white/60 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
              Join Pakistan's creative production operating system. Plan, secure, coordinate, and capture memories inside one unified platform.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/explore"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#1E1B4B] text-[14px] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-white/5 cursor-pointer"
              >
                Explore
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto bg-[#047857] hover:bg-[#035f44] text-white text-[14px] font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Join Nexus <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
