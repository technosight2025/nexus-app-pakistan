"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Heart, Users, Sparkles, Building2, Calendar } from 'lucide-react';

const CLIENT_STORIES = [
  {
    quote: "Nexus made planning our Barat completely stress-free. We found the dream photographer and secured our banquet hall in Lahore within 2 hours. The live catering calculator estimation saved us from huge wastes!",
    author: "Ayesha & Bilal",
    role: "Happy Couple",
    location: "Lahore",
    rating: 5
  },
  {
    quote: "We loved the guest memories shared portal! Every single photo taken by our wedding guests was collated instantly into our digital album. The AI grouping features are phenomenal.",
    author: "Zainab & Hamza",
    role: "Happy Couple",
    location: "Islamabad",
    rating: 5
  }
];

const PRO_STORIES = [
  {
    quote: "Managing bookings for Royal Pavilions marquee was a nightmare of scattered WhatsApp messages and paper calendars. Nexus Marquee OS calendar slot checker has unified our workflows and boosted slot utilization by 34%.",
    author: "M. Haris",
    role: "Marquee Manager, Royal Pavilion",
    location: "Karachi",
    rating: 5
  },
  {
    quote: "As a wedding photographer, finding clients and getting paid on time was a constant struggle in Pakistan. Nexus gives us direct deposits, secured booking contracts, and a portfolio builder that converts.",
    author: "Sara Tariq",
    role: "Sara Tariq Photography",
    location: "Lahore",
    rating: 5
  }
];

const STATS = [
  { label: 'Professionals Onboarded', value: '1,500+', icon: Users, color: 'text-indigo-950', bg: 'bg-indigo-50' },
  { label: 'Bookings Completed', value: '12,000+', icon: Calendar, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { label: 'Events Managed', value: '8,500+', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Memories Shared', value: '2.5M+', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' }
];

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState<'client' | 'pro'>('client');
  const activeStories = activeTab === 'client' ? CLIENT_STORIES : PRO_STORIES;
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  return (
    <section className="py-24 bg-white border-y border-[#E6E2DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            COMMUNITY VALIDATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            Success Stories
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium">
            See how Nexus is transforming event planning and business operations across Pakistan.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Testimonial Portal */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Toggle tabs */}
            <div className="flex bg-slate-50 border border-[#E6E2DA] p-1.5 rounded-2xl max-w-sm">
              <button
                onClick={() => {
                  setActiveTab('client');
                  setActiveStoryIdx(0);
                }}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'client' 
                    ? 'bg-[#1E1B4B] text-white shadow-xs' 
                    : 'text-[#1E1B4B]/60 hover:text-[#1E1B4B]'
                }`}
              >
                Couples & Clients
              </button>
              <button
                onClick={() => {
                  setActiveTab('pro');
                  setActiveStoryIdx(0);
                }}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'pro' 
                    ? 'bg-[#1E1B4B] text-white shadow-xs' 
                    : 'text-[#1E1B4B]/60 hover:text-[#1E1B4B]'
                }`}
              >
                Creative Businesses
              </button>
            </div>

            {/* Testimonial card */}
            <div className="bg-[#FAF9F6] border border-[#E6E2DA] rounded-[2rem] p-8 md:p-10 relative min-h-[300px] flex flex-col justify-between">
              <div className="absolute top-6 right-8 text-slate-200 select-none">
                <Quote className="w-16 h-16 shrink-0 fill-slate-100/50" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeStoryIdx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative z-10"
                >
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(activeStories[activeStoryIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D97706] fill-[#D97706] shrink-0" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm md:text-base font-semibold text-[#1E1B4B] leading-relaxed italic">
                    &ldquo;{activeStories[activeStoryIdx].quote}&rdquo;
                  </p>

                  {/* Profile */}
                  <div className="border-t border-[#E6E2DA]/60 pt-4">
                    <div className="text-xs font-bold text-[#1E1B4B]">
                      {activeStories[activeStoryIdx].author}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {activeStories[activeStoryIdx].role} · <span className="text-[#047857]">{activeStories[activeStoryIdx].location}, PK</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="flex gap-2 mt-6 justify-center">
                {activeStories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      activeStoryIdx === idx ? 'bg-[#047857] w-5' : 'bg-slate-350'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#FAF9F6] border border-[#E6E2DA] p-6 rounded-3xl flex flex-col justify-between items-center text-center text-left min-h-[170px]"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} border border-slate-100`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-black text-[#1E1B4B] font-mono tracking-tight mt-4">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
