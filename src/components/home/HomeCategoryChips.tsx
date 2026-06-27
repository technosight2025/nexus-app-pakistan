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
    <section className="relative z-40 max-w-[1400px] mx-auto px-6 mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black font-serif text-slate-900 dark:text-[#FAF5EC]">
          {isRomanUrdu ? 'Apni Pasand Ki Category Chunein' : 'Browse by Category'}
        </h2>
        <Link href="/explore" className="text-sm font-bold text-[#0F5B3E] hover:underline">
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
              className="flex-shrink-0 flex items-center gap-3 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group min-w-[200px] md:min-w-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0F5B3E]/10 dark:bg-[#0F5B3E]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-4 h-4 text-[#0F5B3E] dark:text-[#52c192]" />
              </div>
              <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0F5B3E] dark:group-hover:text-[#52c192] transition-colors leading-tight">
                {isRomanUrdu ? category.nameRU : category.nameEN}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
