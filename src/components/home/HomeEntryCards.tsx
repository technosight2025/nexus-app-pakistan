"use client"

import React from 'react';
import { Calendar, MapPin, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const cards = [
  {
    id: 'plan-event',
    icon: Calendar,
    titleEN: 'Plan Your Event',
    titleRU: 'Event Plan Karain',
    descEN: 'Set up your private AI workspace — budget tracker, guest list & milestone timeline.',
    descRU: 'Budget tracker, guest list aur milestones sab ek jagah manage karain.',
    href: '/create-event',
    ctaEN: 'Start Planning',
    ctaRU: 'Shuru Karain',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'find-venues',
    icon: MapPin,
    titleEN: 'Find Venues',
    titleRU: 'Venue Dhundein',
    descEN: 'Explore premium marquees, banquet halls & farmhouses with live availability.',
    descRU: 'Premium marquees, banquet halls aur farmhouses — live availability aur ratings ke sath.',
    href: '/explore?tab=venues',
    ctaEN: 'Browse Venues',
    ctaRU: 'Venues Dekhein',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'find-professionals',
    icon: Users,
    titleEN: 'Find Professionals',
    titleRU: 'Professionals Dhundein',
    descEN: 'Browse elite photographers, cinematographers and makeup artists with portfolios.',
    descRU: 'Elite photographers, mehndi artists aur makeup pros — portfolios ke sath.',
    href: '/explore?tab=professionals',
    ctaEN: 'Explore Talent',
    ctaRU: 'Talent Dekhein',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'find-vendors',
    icon: ShoppingBag,
    titleEN: 'Find Vendors',
    titleRU: 'Vendors Dhundein',
    descEN: 'Discover premium caterers, florists, decorators and sound systems for your celebration.',
    descRU: 'Premium caterers, florists, decorators aur sound systems — sab ek platform par.',
    href: '/explore?tab=vendors',
    ctaEN: 'Discover Vendors',
    ctaRU: 'Vendors Dekhein',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop'
  },
];

export function HomeEntryCards() {
  const { isRomanUrdu } = useLanguage();

  return (
    <section className="max-w-[1400px] mx-auto px-6 mb-24 mt-16 relative z-40">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-2">
          {isRomanUrdu ? 'Aghaz Karain' : 'Services & Setup'}
        </span>
        <h2 className="text-3xl font-black font-serif text-neutral-900 tracking-tight">
          {isRomanUrdu ? 'Kahan Se Shuru Karein?' : 'Where Would You Like to Start?'}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col bg-white border border-neutral-100/60 rounded-[28px] overflow-hidden hover:border-[#C5A880]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,168,128,0.12)] hover:-translate-y-2"
            >
              {/* Image at top */}
              <div className="relative h-48 overflow-hidden bg-neutral-50 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent z-10" />
                <img 
                  src={card.image} 
                  alt={card.titleEN} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between text-left">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#C5A880] uppercase block mb-2 font-bold">
                    {card.id.replace('-', ' ')}
                  </span>
                  <h3 className="text-lg font-black font-serif text-neutral-900 mb-2 leading-tight">
                    {isRomanUrdu ? card.titleRU : card.titleEN}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
                    {isRomanUrdu ? card.descRU : card.descEN}
                  </p>
                </div>
                
                <Link 
                  href={card.href} 
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-neutral-950 mt-auto hover:text-[#C5A880] transition-colors"
                >
                  {isRomanUrdu ? card.ctaRU : card.ctaEN} 
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
