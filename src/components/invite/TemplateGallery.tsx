"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ["All", "Royal", "Minimal", "Traditional", "Corporate", "Floral", "Modern"];
  
  const templates = [
    { name: "Royal Emerald", category: "Royal", img: "https://images.unsplash.com/photo-1544425884-d92ea407c0b0?auto=format&fit=crop&q=80", height: "h-[400px]" },
    { name: "Minimal White", category: "Minimal", img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80", height: "h-[300px]" },
    { name: "Lahori Heritage", category: "Traditional", img: "https://images.unsplash.com/photo-1583939000003-88c9fae88a3b?auto=format&fit=crop&q=80", height: "h-[500px]" },
    { name: "Tech Summit", category: "Corporate", img: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80", height: "h-[350px]" },
    { name: "Rose Garden", category: "Floral", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80", height: "h-[450px]" },
    { name: "Onyx Black", category: "Modern", img: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80", height: "h-[300px]" },
  ];

  const filtered = activeCategory === 'All' ? templates : templates.filter(t => t.category === activeCategory);

  return (
    <section className="w-full bg-white py-24 px-4 md:px-8 border-t border-[#E6E2DA]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1D1C17] mb-6">Discover the Perfect Theme</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#0F5B3E] text-white shadow-md' 
                    : 'bg-[#FAF7F2] text-[#5E6460] hover:text-[#1D1C17] hover:bg-[#E6E2DA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-style Grid (approximated with columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((template, idx) => (
            <motion.div 
              key={template.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`relative w-full ${template.height} rounded-[2rem] overflow-hidden group cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-shadow`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${template.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">{template.category}</span>
                <h3 className="text-white text-2xl font-serif font-bold mb-4">{template.name}</h3>
                
                <button className="w-12 h-12 rounded-full bg-white text-[#1D1C17] flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-4 bg-[#FAF7F2] hover:bg-[#E6E2DA] text-[#1D1C17] rounded-full font-bold transition-colors flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C9A227]" />
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
