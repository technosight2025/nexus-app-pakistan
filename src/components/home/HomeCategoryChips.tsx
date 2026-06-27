"use client"

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Building2, Camera, Palette, Scissors, 
  Utensils, Flower2, Music, Crown, 
  Car, Speaker, PartyPopper, Home
} from 'lucide-react';

const categories = [
  { id: 'marquees', nameEN: 'Marquees', nameRU: 'Marquees', icon: Building2, href: '/explore?category=marquees' },
  { id: 'halls', nameEN: 'Banquet Halls', nameRU: 'Shadi Halls', icon: Home, href: '/explore?category=halls' },
  { id: 'photographers', nameEN: 'Photographers', nameRU: 'Photographers', icon: Camera, href: '/explore?category=photographers' },
  { id: 'makeup', nameEN: 'Makeup Artists', nameRU: 'Makeup Artists', icon: Scissors, href: '/explore?category=salons' },
  { id: 'mehndi', nameEN: 'Mehndi Artists', nameRU: 'Mehndi Artists', icon: Palette, href: '/explore?category=mehendi' },
  { id: 'caterers', nameEN: 'Catering', nameRU: 'Pakwan & Catering', icon: Utensils, href: '/explore?category=catering' },
  { id: 'decorators', nameEN: 'Decorators', nameRU: 'Decorators', icon: PartyPopper, href: '/explore?category=decor' },
  { id: 'florists', nameEN: 'Florists', nameRU: 'Phool Walay', icon: Flower2, href: '/explore?category=decor' },
  { id: 'sound', nameEN: 'Sound Systems', nameRU: 'Sound Systems', icon: Speaker, href: '/explore?category=djs' },
  { id: 'dj', nameEN: 'DJs & Music', nameRU: 'DJ & Music', icon: Music, href: '/explore?category=djs' },
  { id: 'bridal', nameEN: 'Bridal Wear', nameRU: 'Bridal Wear', icon: Crown, href: '/explore?category=suits' },
  { id: 'cars', nameEN: 'Rent a Car', nameRU: 'Rent a Car', icon: Car, href: '/explore?category=cars' },
];

export function HomeCategoryChips() {
  const { isRomanUrdu } = useLanguage();

  return (
    <section className="relative z-40 max-w-[1400px] mx-auto px-6 mb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black font-serif text-slate-900 leading-tight">
          {isRomanUrdu ? 'Apni Pasand Ki Category Chunein' : 'Browse by Category'}
        </h2>
        <Link href="/explore" className="text-xs font-black uppercase tracking-wider text-[#C5A880] hover:underline min-h-[44px] flex items-center">
          {isRomanUrdu ? 'Sab Dekhein' : 'View All'}
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-3 md:grid md:grid-cols-4 lg:grid-cols-6 scrollbar-hide md:overflow-x-visible md:pb-0">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link 
              key={category.id} 
              href={category.href}
              className="flex-shrink-0 flex items-center gap-3.5 p-4 rounded-[20px] border border-slate-200/60 bg-white hover:bg-slate-50/50 hover:border-[#C5A880]/30 hover:shadow-[0_12px_24px_rgba(197,168,128,0.06)] hover:-translate-y-1 transition-all duration-300 group min-w-[180px] md:min-w-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C5A880]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-4.5 h-4.5 text-[#C5A880]" />
              </div>
              <span className="text-[13px] font-bold text-slate-800 group-hover:text-neutral-900 transition-colors leading-tight">
                {isRomanUrdu ? category.nameRU : category.nameEN}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
