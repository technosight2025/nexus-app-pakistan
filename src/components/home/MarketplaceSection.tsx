"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  Camera, 
  Video, 
  Film, 
  Sparkles, 
  Palette, 
  Utensils, 
  Car, 
  Music, 
  Headphones, 
  Monitor, 
  Users, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MarketplaceSection() {
  const { isRomanUrdu } = useLanguage();

  const categories = [
    {
      title: 'Venues',
      count: isRomanUrdu ? '320+ Marquees aur Halls' : '320+ Marquees & Halls',
      slug: 'marriage-halls',
      icon: Building,
      bg: 'bg-blue-50/70',
      border: 'border-blue-100 hover:border-blue-300 hover:shadow-[0_15px_30px_rgba(59,130,246,0.06)]',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Photographers',
      count: isRomanUrdu ? '450+ Shooters' : '450+ Shooters',
      slug: 'photographers',
      icon: Camera,
      bg: 'bg-rose-50/70',
      border: 'border-rose-100 hover:border-rose-300 hover:shadow-[0_15px_30px_rgba(244,63,94,0.06)]',
      iconColor: 'text-rose-600',
    },
    {
      title: 'Videographers',
      count: isRomanUrdu ? '280+ Film Creators' : '280+ Film Creators',
      slug: 'videographers',
      icon: Film,
      bg: 'bg-indigo-50/70',
      border: 'border-indigo-100 hover:border-indigo-300 hover:shadow-[0_15px_30px_rgba(99,102,241,0.06)]',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Studios',
      count: isRomanUrdu ? '120+ Production Houses' : '120+ Production Houses',
      slug: 'studios',
      icon: Video,
      bg: 'bg-purple-50/70',
      border: 'border-purple-100 hover:border-purple-300 hover:shadow-[0_15px_30px_rgba(168,85,247,0.06)]',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Decorators',
      count: isRomanUrdu ? '180+ Designers' : '180+ Designers',
      slug: 'decorators',
      icon: Sparkles,
      bg: 'bg-amber-50/70',
      border: 'border-amber-100 hover:border-amber-300 hover:shadow-[0_15px_30px_rgba(245,158,11,0.06)]',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Makeup Artists',
      count: isRomanUrdu ? '250+ Salon aur Stylists' : '250+ Salon & Stylists',
      slug: 'makeup-artists',
      icon: Palette,
      bg: 'bg-pink-50/70',
      border: 'border-pink-100 hover:border-pink-300 hover:shadow-[0_15px_30px_rgba(236,72,153,0.06)]',
      iconColor: 'text-pink-600',
    },
    {
      title: 'Caterers',
      count: isRomanUrdu ? '200+ Daigs aur Services' : '200+ Daigs & Services',
      slug: 'catering',
      icon: Utensils,
      bg: 'bg-orange-50/70',
      border: 'border-orange-100 hover:border-orange-300 hover:shadow-[0_15px_30px_rgba(249,115,22,0.06)]',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Rentals & Transport',
      count: isRomanUrdu ? '150+ Vehicles aur Outfits' : '150+ Vehicles & Outfits',
      slug: 'transport',
      icon: Car,
      bg: 'bg-slate-50/70',
      border: 'border-slate-100 hover:border-slate-300 hover:shadow-[0_15px_30px_rgba(100,116,139,0.06)]',
      iconColor: 'text-slate-600',
    },
    {
      title: 'Entertainment',
      count: isRomanUrdu ? '90+ Qawwals aur Bands' : '90+ Qawwals & Bands',
      slug: 'entertainment',
      icon: Music,
      bg: 'bg-fuchsia-50/70',
      border: 'border-fuchsia-100 hover:border-fuchsia-300 hover:shadow-[0_15px_30px_rgba(217,70,239,0.06)]',
      iconColor: 'text-fuchsia-600',
    },
    {
      title: 'DJs & Audio',
      count: isRomanUrdu ? '80+ Sound Providers' : '80+ Sound Providers',
      slug: 'djs',
      icon: Headphones,
      bg: 'bg-violet-50/70',
      border: 'border-violet-100 hover:border-violet-300 hover:shadow-[0_15px_30px_rgba(139,92,246,0.06)]',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Digital Displays',
      count: isRomanUrdu ? '60+ LED Terminals' : '60+ LED Terminals',
      slug: 'digital-displays',
      icon: Monitor,
      bg: 'bg-cyan-50/70',
      border: 'border-cyan-100 hover:border-cyan-300 hover:shadow-[0_15px_30px_rgba(6,182,212,0.06)]',
      iconColor: 'text-cyan-600',
    },
    {
      title: 'Workforce',
      count: isRomanUrdu ? '110+ Operations Staff' : '110+ Operations Staff',
      slug: 'workforce',
      icon: Users,
      bg: 'bg-emerald-50/70',
      border: 'border-emerald-100 hover:border-emerald-300 hover:shadow-[0_15px_30px_rgba(16,185,129,0.06)]',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Business Solutions',
      count: isRomanUrdu ? '40+ SaaS aur ERP Tools' : '40+ SaaS & ERP Tools',
      slug: 'business-solutions',
      icon: Briefcase,
      bg: 'bg-gray-50/70',
      border: 'border-gray-100 hover:border-gray-300 hover:shadow-[0_15px_30px_rgba(107,114,128,0.06)]',
      iconColor: 'text-gray-600',
    }
  ];

  return (
    <section className="w-full bg-[#FAF7F2]/40 py-16 md:py-24 border-b border-[#ECE7DF]">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Elegant Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0F5B3E]/5 border border-[#0F5B3E]/10 rounded-full">
            <span className="text-[10px] font-black uppercase text-[#0F5B3E] tracking-widest">
              {isRomanUrdu ? "Marketplace Directory" : "Marketplace Directory"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#052E20] font-serif">
            {isRomanUrdu ? "Pakistan Ke Behtareen Specialists" : "Discover Pakistan's Best"}
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
            {isRomanUrdu 
              ? "Apni pasand ke verified venues, creative teams aur event managers se seedha rabta krain."
              : "Connect directly with verified venues, leading creative teams, and event operations in every major city."}
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/marketplace/${cat.slug}`}
                className={`group flex flex-col items-center text-center bg-white p-5 rounded-[20px] border ${cat.border} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer h-full justify-between min-h-[160px]`}
              >
                <div className="flex flex-col items-center w-full">
                  <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shrink-0`}>
                    <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-extrabold text-sm text-[#1F2937] group-hover:text-[#0F5B3E] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                </div>
                <div className="mt-3">
                  <span className="inline-block text-[10px] font-black text-[#6B7280] tracking-wide bg-gray-50 group-hover:bg-[#0F5B3E]/5 group-hover:text-[#0F5B3E] px-2.5 py-1 rounded-full border border-gray-100 group-hover:border-[#0F5B3E]/10 transition-all">
                    {cat.count}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* AI Matchmaker promo card to balance grid */}
          <Link
            href="/ai-planner"
            className="group flex flex-col items-center text-center bg-gradient-to-br from-[#0F5B3E] to-[#0A422C] p-5 rounded-[20px] border border-[#0F5B3E] hover:border-[#C9A227] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(15,91,62,0.15)] cursor-pointer h-full justify-between min-h-[160px] text-white"
          >
            <div className="flex flex-col items-center w-full">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shrink-0">
                <Sparkles className="w-5 h-5 text-[#C9A227] animate-pulse" />
              </div>
              <h3 className="font-heading font-extrabold text-sm leading-snug text-white">
                {isRomanUrdu ? "AI Matchmaker" : "AI Matchmaker"}
              </h3>
              <p className="text-[10.5px] text-white/70 font-medium leading-normal mt-1.5 px-1">
                {isRomanUrdu ? "AI ko apne liye behtareen vendors chun'ne dein" : "Let AI curate the best vendors for you"}
              </p>
            </div>
            <div className="mt-3 w-full flex justify-center">
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#C9A227] uppercase tracking-wider group-hover:text-white transition-colors">
                {isRomanUrdu ? "Planner Check Krain" : "Try Planner"} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
