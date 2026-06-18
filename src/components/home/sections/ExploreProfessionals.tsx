"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Photographers',
    count: '142 Professionals',
    image: '/images/pakistani_artisan_photographer.png',
    link: '/explore?focus=studios'
  },
  {
    name: 'Videographers',
    count: '98 Professionals',
    image: '/images/artisan_freelancer_elite.png',
    link: '/explore?focus=studios'
  },
  {
    name: 'Makeup Artists',
    count: '124 Professionals',
    image: '/images/pakistani_artisan_makeup.png',
    link: '/explore?focus=studios'
  },
  {
    name: 'Wedding Planners',
    count: '56 Agencies',
    image: '/images/host_families_circle.png',
    link: '/explore'
  },
  {
    name: 'Venues',
    count: '85 Banquet Halls & lawns',
    image: '/images/pakistani_wedding_venue.png',
    link: '/explore?focus=venues'
  },
  {
    name: 'Decorators',
    count: '73 Design Studios',
    image: '/images/venues_halls_circle.png',
    link: '/explore'
  },
  {
    name: 'Florists',
    count: '34 Vendors',
    image: '/images/mehndi_minimalist.png',
    link: '/explore'
  },
  {
    name: 'Rental Providers',
    count: '49 Agencies',
    image: '/images/vendor_dashboard_venue.png',
    link: '/explore?focus=rentals'
  },
  {
    name: 'Fashion Designers',
    count: '62 Couture Houses',
    image: '/images/pakistani_model_designer.png',
    link: '/explore'
  },
  {
    name: 'Content Creators',
    count: '110 Creators',
    image: '/images/pakistani_model_bridal.png',
    link: '/explore'
  },
  {
    name: 'Editors',
    count: '40 Professionals',
    image: '/images/pakistani_model_groom.png',
    link: '/explore?focus=studios'
  },
  {
    name: 'Production Houses',
    count: '28 Studios',
    image: '/images/creative_artisans_circle.png',
    link: '/explore?focus=studios'
  }
];

export default function ExploreProfessionals() {
  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 text-left">
            <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
              EXPLORE THE MARKETPLACE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
              Hire the Best Creative Talent
            </h2>
            <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium">
              Browse profiles, verified reviews, and check direct calendar slot availability.
            </p>
          </div>
          <div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#047857] hover:text-[#035f44] border-b border-[#047857] pb-1 transition-all"
            >
              Browse All Categories <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link key={category.name} href={category.link} className="group">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative h-[290px] rounded-3xl overflow-hidden border border-[#E6E2DA] bg-white flex flex-col justify-end p-6 cursor-pointer shadow-xs"
              >
                {/* Background Image with Zoom on Hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Card Content */}
                <div className="relative z-10 space-y-1.5 text-left">
                  <span className="inline-block text-[9px] font-mono font-bold uppercase bg-[#D97706] text-white px-2 py-0.5 rounded-full tracking-wider">
                    {category.count}
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white font-heading tracking-wide">
                      {category.name}
                    </h3>
                    <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
