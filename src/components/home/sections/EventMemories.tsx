"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, UploadCloud, Images, Sparkles, Film, Phone, Compass, CheckCircle2 } from 'lucide-react';

const MEMORY_FEATURES = [
  {
    icon: QrCode,
    title: 'QR Code Scanning',
    description: 'Guests scan a single QR code at the venue entryway to join the live shared event album instantly—no app download required.',
    color: 'text-indigo-950',
    bg: 'bg-indigo-50'
  },
  {
    icon: UploadCloud,
    title: 'Live Uploads',
    description: 'Watch event media populate in real-time as guests take photos and upload them directly from their phone browsers.',
    color: 'text-emerald-750',
    bg: 'bg-emerald-50'
  },
  {
    icon: Images,
    title: 'Shared Collaborative Galleries',
    description: 'Every guest contribution compiles into a centralized dashboard, allowing hosts to filter, select, and compile albums easily.',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    icon: Sparkles,
    title: 'AI Facial Recognition Albums',
    description: 'Nexus automatically sorts uploaded media into personalized folders by face detection, so guests find their photos in seconds.',
    color: 'text-purple-700',
    bg: 'bg-purple-50'
  },
  {
    icon: Film,
    title: 'Highlight Videos',
    description: 'Generate stunning social-media-ready recap clips compiling top-rated guest photos and video uploads with musical tracks.',
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  }
];

export default function EventMemories() {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(4,120,87,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-[11px] font-black uppercase text-[#047857] tracking-[0.25em] bg-emerald-50 px-4.5 py-1.5 rounded-full border border-emerald-100">
            EVENT MEMORIES HUB
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#1E1B4B] tracking-tight">
            Every Event Has a Story.
          </h2>
          <p className="text-[#1E1B4B]/60 text-sm md:text-base font-medium max-w-xl mx-auto">
            Let every guest become part of the memory. Collect authentic, candid media seamlessly inside one shared space.
          </p>
        </div>

        {/* 2-Column Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Feature List */}
          <div className="lg:col-span-7 space-y-4 text-left">
            {MEMORY_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeFeatureIdx === idx;
              return (
                <motion.div
                  key={feature.title}
                  onClick={() => setActiveFeatureIdx(idx)}
                  whileHover={{ x: 4 }}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                    isActive 
                      ? 'border-[#1E1B4B] bg-white shadow-md' 
                      : 'border-transparent hover:bg-white/50'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${feature.bg} ${feature.color} border border-slate-100`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#1E1B4B] font-heading flex items-center gap-2">
                      {feature.title}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#047857] animate-ping" />}
                    </h3>
                    <p className="text-[#1E1B4B]/70 text-xs md:text-sm font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Premium Mobile Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#047857]/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none scale-90" />

            {/* Mobile Outer Frame */}
            <div className="relative w-[300px] h-[610px] bg-[#1E1B4B] rounded-[3rem] p-3 shadow-2xl border-4 border-slate-200/80 overflow-hidden flex flex-col justify-between">
              
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-[#1E1B4B] rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
              </div>

              {/* Screen Content Wrapper */}
              <div className="relative flex-1 bg-[#FAF9F6] rounded-[2.5rem] overflow-hidden p-5 pt-10 flex flex-col justify-between">
                
                {/* Simulated Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[9px] font-bold text-[#1E1B4B]/40 uppercase tracking-widest font-mono">
                    Nexus Memory OS
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[#047857] text-white px-2 py-0.5 rounded-full">
                    LIVE EVENT
                  </span>
                </div>

                {/* Simulated Main Content */}
                <div className="flex-1 py-4 flex flex-col justify-start text-center space-y-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-[#1E1B4B] font-heading">
                      Ayesha & Bilal's Mehndi
                    </h4>
                    <p className="text-[9px] text-[#1E1B4B]/50 font-semibold mt-0.5">
                      1,245 Photos Uploaded by Guests
                    </p>
                  </div>

                  {/* Featured Guest Image (Simulated live upload) */}
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-100 shadow-xs bg-slate-100">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('/images/mehndi_bridal.png')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[8px] font-bold text-white uppercase tracking-wider font-mono">
                      @Amina_Uploader // 2 mins ago
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button className="w-full bg-[#047857] hover:bg-[#035f44] text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5">
                      <UploadCloud className="w-3.5 h-3.5" /> Upload Photo / Video
                    </button>
                    <button className="w-full bg-white border border-slate-200 text-[#1E1B4B] py-2 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1">
                      <Images className="w-3 h-3 text-[#D97706]" /> View Event Gallery
                    </button>
                  </div>
                </div>

                {/* Simulated Footer */}
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[8px] text-[#1E1B4B]/40 font-mono">
                  <span>SSL SECURED</span>
                  <span className="text-slate-400">HOST CODE: AB-2026</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
