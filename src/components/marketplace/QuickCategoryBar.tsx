"use client"

import React from 'react';

interface QuickCategoryBarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function QuickCategoryBar({ activeCategory, setActiveCategory }: QuickCategoryBarProps) {
  const categories = [
    "All", "Venues", "Photographers", "Studios", "Videographers", 
    "Decorators", "Makeup Artists", "Catering", "Transport", 
    "Entertainment", "DJs", "Digital Displays", "Workforce", "Business Solutions"
  ];

  return (
    <div className="bg-white border-b border-[#E6E2DA] sticky top-[76px] md:top-[92px] z-40 shadow-sm py-3.5 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-2.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-[#0F5B3E] text-white border-[#0F5B3E] shadow-md' 
                : 'bg-white text-[#5E6460] border-[#E6E2DA] hover:border-[#C9A227] hover:text-[#1D1C17]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
