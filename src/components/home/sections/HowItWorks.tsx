"use client";

import React from 'react';
import { Search, MessageSquare, Calendar, Sliders, Heart, Sparkles } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Search',
    description: 'Filter verified vendors by location, services, and live dates.',
    icon: Search,
    color: 'text-indigo-950',
    bg: 'bg-indigo-50',
    badge: 'Discovery'
  },
  {
    num: '02',
    title: 'Connect',
    description: 'Instantly chat with professionals, discuss packages, and get quotes.',
    icon: MessageSquare,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    badge: 'Communication'
  },
  {
    num: '03',
    title: 'Book',
    description: 'Pay deposit securely, sign digital contracts, and lock in the dates.',
    icon: Calendar,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    badge: 'Secured Slot'
  },
  {
    num: '04',
    title: 'Manage',
    description: 'Coordinate schedules, split payments, and track workflow milestones.',
    icon: Sliders,
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    badge: 'Operations Desk'
  },
  {
    num: '05',
    title: 'Preserve Memories',
    description: 'Allow guests to upload live media to your shared, AI-grouped album.',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    badge: 'Heritage Legacy'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white border-y border-[#E6E2DA] relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-slate-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            THE PLATFORM TIMELINE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            How Nexus Works
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium">
            A seamless journey built to connect clients with creative talent in Pakistan.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[90px] left-[5%] right-[5%] h-0.5 bg-slate-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 group">
                  
                  {/* Step Icon & Number */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start relative">
                    {/* Circle Container */}
                    <div className="w-18 h-18 rounded-3xl bg-[#FAF9F6] border-2 border-[#E6E2DA] flex items-center justify-center relative shadow-xs transition-all duration-300 group-hover:border-[#1E1B4B] group-hover:shadow-md bg-white">
                      <Icon className={`w-6 h-6 ${step.color}`} />
                      
                      {/* Step Number Badge */}
                      <span className="absolute -top-2.5 -right-2.5 bg-[#D97706] text-white text-[10px] font-mono font-black w-6.5 h-6.5 rounded-full flex items-center justify-center border border-white">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Stage Badge */}
                    <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md lg:mt-2">
                      {step.badge}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-[#1E1B4B] font-heading">
                      {step.title}
                    </h3>
                    <p className="text-[#1E1B4B]/70 text-xs md:text-sm font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
