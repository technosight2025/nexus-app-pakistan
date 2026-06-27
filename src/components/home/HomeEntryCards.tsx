"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const cards = [
  {
    id: 'plan-event',
    icon: Calendar,
    titleEN: 'Plan Your Event',
    titleRU: 'Event Plan Karain',
    descEN: 'Set up your private AI workspace — budget tracker, bilingual invitations, guest list & milestone timeline.',
    descRU: 'Budget tracker, bilingual dawat namey, guest list aur milestones sab ek jagah manage karain.',
    href: '/create-event',
    ctaEN: 'Start Planning',
    ctaRU: 'Shuru Karain',
    accent: '#0F5B3E',
    accentLight: 'rgba(15,91,62,0.8)',
    accentBorder: 'rgba(15,91,62,0.3)',
    iconBg: 'bg-white/20 backdrop-blur-md',
    iconColor: 'text-white',
    btnClass: 'bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white border border-[#0F5B3E]/50',
    tag: 'For Hosts',
    tagClass: 'bg-black/40 backdrop-blur-md text-white border border-white/20',
    image: '/images/host_luxury_wedding.png'
  },
  {
    id: 'find-venues',
    icon: MapPin,
    titleEN: 'Find Venues',
    titleRU: 'Venue Dhundein',
    descEN: 'Explore premium marquees, banquet halls & luxury hotels with live availability, verified ratings and instant quotes.',
    descRU: 'Premium marquees, banquet halls aur hotels — live availability aur verified ratings ke sath.',
    href: '/venues',
    ctaEN: 'Browse Venues',
    ctaRU: 'Venues Dekhein',
    accent: '#C5A880',
    accentLight: 'rgba(197,168,128,0.8)',
    accentBorder: 'rgba(197,168,128,0.3)',
    iconBg: 'bg-white/20 backdrop-blur-md',
    iconColor: 'text-[#C5A880]',
    btnClass: 'bg-[#C5A880] hover:bg-[#A88D6A] text-[#0B120E] border border-[#C5A880]/50',
    tag: '1,200+ Listed',
    tagClass: 'bg-black/40 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/30',
    image: '/images/pakistani_wedding_venue.png'
  },
  {
    id: 'find-professionals',
    icon: Users,
    titleEN: 'Find Professionals',
    titleRU: 'Professionals Dhundein',
    descEN: 'Browse elite photographers, cinematographers, mehndi artists and makeup pros with portfolios & direct booking.',
    descRU: 'Elite photographers, mehndi artists aur makeup pros — portfolios aur direct booking ke sath.',
    href: '/explore',
    ctaEN: 'Explore Talent',
    ctaRU: 'Talent Dekhein',
    accent: '#B01E5A',
    accentLight: 'rgba(176,30,90,0.8)',
    accentBorder: 'rgba(176,30,90,0.3)',
    iconBg: 'bg-white/20 backdrop-blur-md',
    iconColor: 'text-[#FFD1E3]',
    btnClass: 'bg-[#B01E5A] hover:bg-[#921849] text-white border border-[#B01E5A]/50',
    tag: 'Verified Only',
    tagClass: 'bg-black/40 backdrop-blur-md text-[#FFD1E3] border border-[#B01E5A]/30',
    image: '/images/pakistani_artisan_photographer.png'
  },
  {
    id: 'find-vendors',
    icon: ShoppingBag,
    titleEN: 'Find Vendors',
    titleRU: 'Vendors Dhundein',
    descEN: 'Discover premium caterers, florists, decorators, sound systems and tent services for your celebration.',
    descRU: 'Premium caterers, florists, decorators aur sound systems — sab kuch ek platform par.',
    href: '/vendors',
    ctaEN: 'Discover Vendors',
    ctaRU: 'Vendors Dekhein',
    accent: '#4F46E5',
    accentLight: 'rgba(79,70,229,0.8)',
    accentBorder: 'rgba(79,70,229,0.3)',
    iconBg: 'bg-white/20 backdrop-blur-md',
    iconColor: 'text-[#C7D2FE]',
    btnClass: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white border border-[#4F46E5]/50',
    tag: 'All Categories',
    tagClass: 'bg-black/40 backdrop-blur-md text-[#C7D2FE] border border-[#4F46E5]/30',
    image: '/images/pakistani_wedding_couple.png'
  },
];

export function HomeEntryCards() {
  const { isRomanUrdu } = useLanguage();

  return (
    <section className="relative z-40 max-w-[1400px] mx-auto px-6 mb-20 mt-16">
      {/* Section label */}
      <div className="text-center mb-10">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
          {isRomanUrdu ? 'Kahan Se Shuru Karein?' : 'Where Would You Like to Start?'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
              className="h-full"
            >
              <Link href={card.href} className="group block h-full">
                <div
                  className="relative h-full min-h-[380px] rounded-[1.75rem] border bg-[#0A120E] overflow-hidden flex flex-col p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
                  style={{ borderColor: card.accentBorder }}
                >
                  {/* Background Image */}
                  <img 
                    src={card.image} 
                    alt={card.titleEN}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A120E] via-[#0A120E]/80 to-transparent pointer-events-none" />
                  
                  {/* Glowing orb on hover */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 blur-[40px] transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: card.accentLight }}
                  />

                  {/* Top row: icon + tag */}
                  <div className="relative z-10 flex items-start justify-between mb-auto pb-8">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${card.tagClass}`}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Content (Bottom aligned) */}
                  <div className="relative z-10 mt-auto flex flex-col">
                    {/* Title */}
                    <h3 className="font-serif text-2xl font-black text-white mb-2 leading-snug drop-shadow-md">
                      {isRomanUrdu ? card.titleRU : card.titleEN}
                    </h3>

                    {/* Description */}
                    <p className="text-[12.5px] text-slate-300 font-medium leading-relaxed mb-6 drop-shadow-sm line-clamp-3">
                      {isRomanUrdu ? card.descRU : card.descEN}
                    </p>

                    {/* CTA Button */}
                    <div
                      className={`w-full py-3.5 px-5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] shadow-lg backdrop-blur-sm ${card.btnClass}`}
                    >
                      {isRomanUrdu ? card.ctaRU : card.ctaEN}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
