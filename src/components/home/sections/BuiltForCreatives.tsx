"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const INDUSTRIES = [
  {
    name: 'Wedding Industry',
    subtitle: 'Shaadi Operations OS',
    description: 'Coordinate multi-day timeline sheets, manage bridal packages, track payouts, and capture guest uploads seamlessly.',
    image: '/images/pakistani_wedding_couple.png',
    badge: 'Traditional'
  },
  {
    name: 'Corporate Events',
    subtitle: 'Production & Seminars',
    description: 'Simplify corporate bookings, invoice with standardized tax codes, and manage production workflow pipelines.',
    image: '/images/artisan_freelancer_elite.png',
    badge: 'Enterprise'
  },
  {
    name: 'Fashion Industry',
    subtitle: 'Designer Coutures',
    description: 'Publish luxury catalogs, coordinate with bridal designers, and manage catalog shoots on direct timelines.',
    image: '/images/pakistani_model_designer.png',
    badge: 'Couture'
  },
  {
    name: 'Content Creators',
    subtitle: 'Influencers & Media',
    description: 'Book studio sets, rent wardrobe coutures, coordinate campaigns, and collaborate directly with media crews.',
    image: '/images/pakistani_model_bridal.png',
    badge: 'Modern'
  },
  {
    name: 'Film & Media',
    subtitle: 'Production Companies',
    description: 'Hire secondary crew, track equipment rentals, coordinate checklists, and run large-scale film logistics.',
    image: '/images/creative_artisans_circle.png',
    badge: 'Cinema'
  },
  {
    name: 'Photography Studios',
    subtitle: 'Elite Visual Teams',
    description: 'Lock booking slots on shared calendars, send proposals, handle client CRM, and deliver galleries securely.',
    image: '/images/pakistani_artisan_photographer.png',
    badge: 'Visuals'
  },
  {
    name: 'Rental Businesses',
    subtitle: 'Equipment & Wardrobes',
    description: 'Catalog cameras, lenses, decorations, bridal couture outfits, and rent them out with real-time deposit security.',
    image: '/images/vendor_dashboard_venue.png',
    badge: 'Rentals'
  },
  {
    name: 'Venues & Marquees',
    subtitle: 'Halls & Banquet Lawns',
    description: 'Manage reservation slots, prevent overlapping bookings, and automate seasonal pricing packages.',
    image: '/images/pakistani_wedding_venue.png',
    badge: 'Banquet'
  }
];

export default function BuiltForCreatives() {
  return (
    <section className="py-24 bg-white border-y border-[#E6E2DA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            TAILORED INDUSTRY SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            Built for Every Creative Professional
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium">
            Nexus provides custom tools designed for the exact needs of your specific niche.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry) => (
            <motion.div
              key={industry.name}
              whileHover={{ y: -6 }}
              className="group border border-[#E6E2DA] rounded-[2rem] overflow-hidden bg-[#FAF9F6] flex flex-col justify-between h-[390px] shadow-xs"
            >
              {/* Image Header with Badge */}
              <div className="relative h-44 overflow-hidden border-b border-[#E6E2DA]/50 bg-slate-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-[9px] font-mono font-bold uppercase tracking-wider bg-white/25 backdrop-blur-md text-white border border-white/20 px-2 py-0.5 rounded-full">
                  {industry.badge}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#047857]">
                    {industry.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-[#1E1B4B] font-heading">
                    {industry.name}
                  </h3>
                  <p className="text-[#1E1B4B]/70 text-xs md:text-sm font-medium leading-relaxed line-clamp-3">
                    {industry.description}
                  </p>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#1E1B4B] border-t border-[#E6E2DA] pt-4 mt-3 flex items-center justify-between group-hover:text-[#047857] transition-colors">
                  <span>Learn more</span>
                  <div className="w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#1E1B4B]/50 group-hover:text-white group-hover:bg-[#047857] group-hover:border-[#047857] transition-all">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
