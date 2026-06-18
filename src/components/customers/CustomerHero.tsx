"use client"

import React from 'react'
import Link from 'next/link'
import { Sparkles, Calendar, Heart, Shield } from 'lucide-react'

export function CustomerHero() {
  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 overflow-hidden bg-[#FDF8F0]">
      {/* Decorative floral background pattern or background blur elements */}
      <div className="absolute right-0 top-0 w-[40%] h-[100%] opacity-[0.03] pointer-events-none -z-10">
        <img 
          src="/images/pakistani_wedding_couple.png" 
          alt="Pattern Backdrop" 
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
              <span className="text-[11px] font-[700] tracking-[0.06em] text-[#0F5B3E] uppercase">HOST WITH EASE</span>
            </div>

            {/* Headline */}
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] font-[700] text-[#0F5B3E] font-serif tracking-tight mb-6">
              Your Perfect Event,<br />Simplified.
            </h1>

            {/* Paragraph */}
            <p className="text-[16px] text-[#4B5563] mb-8 max-w-[90%] leading-[1.6] font-[500]">
              From digital RSVP invitations and real-time vendor coordination to shared memories captured instantly by your guests. Nexus provides all the tools you need to host spectacular Pakistani weddings, events, and parties in one elegant workspace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/create-event">
                <button className="flex items-center gap-2 px-7 py-3.5 bg-[#0F5B3E] text-white text-[14px] font-[700] rounded-full hover:bg-[#0d4d34] transition-all shadow-md">
                  Create Your Event <span className="text-lg leading-none">→</span>
                </button>
              </Link>
              <Link href="/invite">
                <button className="px-7 py-3.5 bg-white text-[#1F2937] text-[14px] font-[700] rounded-full border border-[#ECE7DF] hover:bg-gray-50 transition-all shadow-sm">
                  Design Digital Invites
                </button>
              </Link>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#ECE7DF] w-full">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Heart className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Zero Ads</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Clean, premium, beautiful guest view experience.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">RSVP Tracking</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">Real-time headcounts and guest diet options.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#0F5B3E]">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Private & Secure</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">You control who views and shares photos.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="w-full lg:w-[48%] relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-[32px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(5,46,32,0.12)] border border-[#ECE7DF] bg-white p-4">
              {/* Photo Area */}
              <div className="w-full h-[52%] rounded-[24px] overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" 
                  alt="Couple at Pakistani Wedding" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#0F5B3E] text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase shadow-md">
                  Featured Wedding
                </div>
              </div>

              {/* Card Content Area */}
              <div className="pt-6 px-3 flex flex-col justify-between h-[48%]">
                <div>
                  <h3 className="text-[22px] font-[700] text-[#052E20] leading-tight mb-2">
                    Ayesha & Hamza
                  </h3>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-4">
                    Join us as we celebrate our Walima ceremony. View details, send invitations, and share memories.
                  </p>

                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E6F0EC] flex items-center justify-center">
                        <Calendar className="w-3.5 h-3.5 text-[#0F5B3E]" />
                      </div>
                      <span className="text-[12px] font-bold text-slate-700">December 18, 2026 • Lahore</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {[
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=60&h=60&fit=crop",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&h=60&fit=crop",
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=60&h=60&fit=crop"
                    ].map((avatar, idx) => (
                      <img 
                        key={idx} 
                        src={avatar} 
                        className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover" 
                        alt="Guest" 
                      />
                    ))}
                    <span className="inline-flex items-center justify-center h-6.5 w-6.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-600 ring-2 ring-white">
                      +142
                    </span>
                  </div>
                  
                  <span className="text-[11px] font-[700] text-[#0F5B3E] uppercase tracking-wider bg-[#E6F0EC] px-3 py-1 rounded-full">
                    148 Guests RSVP'd
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
