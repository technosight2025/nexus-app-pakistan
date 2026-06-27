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
    accentLight: 'rgba(15,91,62,0.08)',
    accentBorder: 'rgba(15,91,62,0.2)',
    gradient: 'from-[#0F5B3E]/5 to-transparent',
    iconBg: 'bg-[#0F5B3E]/10',
    iconColor: 'text-[#0F5B3E]',
    btnClass: 'bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white',
    tag: 'For Hosts',
    tagClass: 'bg-[#0F5B3E]/10 text-[#0F5B3E]',
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
    accentLight: 'rgba(197,168,128,0.08)',
    accentBorder: 'rgba(197,168,128,0.2)',
    gradient: 'from-[#C5A880]/5 to-transparent',
    iconBg: 'bg-[#C5A880]/10',
    iconColor: 'text-[#A88D6A]',
    btnClass: 'bg-[#C5A880] hover:bg-[#A88D6A] text-[#0B120E]',
    tag: '1,200+ Listed',
    tagClass: 'bg-[#C5A880]/10 text-[#A88D6A]',
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
    accentLight: 'rgba(176,30,90,0.08)',
    accentBorder: 'rgba(176,30,90,0.2)',
    gradient: 'from-[#B01E5A]/5 to-transparent',
    iconBg: 'bg-[#B01E5A]/10',
    iconColor: 'text-[#B01E5A]',
    btnClass: 'bg-[#B01E5A] hover:bg-[#921849] text-white',
    tag: 'Verified Only',
    tagClass: 'bg-[#B01E5A]/10 text-[#B01E5A]',
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
    accentLight: 'rgba(79,70,229,0.08)',
    accentBorder: 'rgba(79,70,229,0.2)',
    gradient: 'from-[#4F46E5]/5 to-transparent',
    iconBg: 'bg-[#4F46E5]/10',
    iconColor: 'text-[#4F46E5]',
    btnClass: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white',
    tag: 'All Categories',
    tagClass: 'bg-[#4F46E5]/10 text-[#4F46E5]',
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
            >
              <Link href={card.href} className="group block h-full">
                <div
                  className="relative h-full rounded-[1.75rem] border bg-white dark:bg-[#1C2420] overflow-hidden flex flex-col p-7 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
                  style={{
                    borderColor: card.accentBorder,
                  }}
                >
                  {/* Gradient wash */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`}
                  />

                  {/* Glowing orb on hover */}
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: card.accentLight }}
                  />

                  {/* Top row: icon + tag */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${card.tagClass}`}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative font-serif text-xl font-black text-slate-900 dark:text-[#FAF5EC] mb-2 leading-snug">
                    {isRomanUrdu ? card.titleRU : card.titleEN}
                  </h3>

                  {/* Description */}
                  <p className="relative text-[12.5px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-1 mb-7">
                    {isRomanUrdu ? card.descRU : card.descEN}
                  </p>

                  {/* CTA Button */}
                  <div className="relative">
                    <div
                      className={`w-full py-3 px-5 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all duration-300 group-hover:scale-[1.02] shadow-sm ${card.btnClass}`}
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
