"use client"

import React from 'react';
import { Heart, Briefcase, GlassWater, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

export function InvitationTypes() {
  const types = [
    {
      title: "Wedding Invitations",
      icon: Heart,
      tags: ["Mehndi", "Barat", "Walima", "Full Journey"],
      colSpan: "col-span-12 md:col-span-8",
      bg: "bg-[#0F5B3E]",
      text: "text-white",
      tagBg: "bg-white/20",
      image: "https://images.unsplash.com/photo-1583939000003-88c9fae88a3b?auto=format&fit=crop&q=80"
    },
    {
      title: "Corporate Events",
      icon: Briefcase,
      tags: ["Conferences", "Launches"],
      colSpan: "col-span-12 md:col-span-4",
      bg: "bg-[#1D1C17]",
      text: "text-white",
      tagBg: "bg-white/20",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
    },
    {
      title: "Private Parties",
      icon: GlassWater,
      tags: ["Birthdays", "Anniversaries"],
      colSpan: "col-span-12 md:col-span-6",
      bg: "bg-[#D9467A]",
      text: "text-white",
      tagBg: "bg-white/20",
      image: "https://images.unsplash.com/photo-1530103862676-de8892b12a15?auto=format&fit=crop&q=80"
    },
    {
      title: "Restaurant Events",
      icon: Utensils,
      tags: ["Iftar", "Private Dining"],
      colSpan: "col-span-12 md:col-span-6",
      bg: "bg-[#C9A227]",
      text: "text-white",
      tagBg: "bg-white/20",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="w-full bg-[#FAF7F2] py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1D1C17] mb-4">Crafted For Every Occasion</h2>
            <p className="text-[#5E6460] text-lg max-w-2xl">From intimate family gatherings to grand corporate launches, our platform adapts to your event's unique tone and requirements.</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {types.map((type, idx) => {
            const Icon = type.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${type.colSpan} ${type.bg} ${type.text} rounded-[2rem] p-8 overflow-hidden relative group min-h-[300px] flex flex-col justify-end shadow-lg`}
              >
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${type.image})` }}
                />
                
                {/* Top Icon */}
                <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-serif font-bold mb-6">{type.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {type.tags.map(tag => (
                      <span key={tag} className={`px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm ${type.tagBg} border border-white/10`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
