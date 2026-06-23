"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, CheckCircle2 } from 'lucide-react';

const HERO_IMAGES = [
  '/images/pakistani_wedding_couple.png',
  '/images/pakistani_wedding_venue.png',
  '/images/pakistani_artisan_photographer.png',
  '/images/pakistani_bride_makeup.png',
  '/images/pakistani_model_designer.png'
];

export default function Hero() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 z-10 bg-[#1E1B4B]">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentBg]})` }}
          />
        </AnimatePresence>
        {/* 40% Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4.5 py-1.5 rounded-full text-xs font-semibold mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Pakistan's Premier Creative Industry Network</span>
        </motion.div>

        {/* Large Premium Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl font-heading mb-6 drop-shadow-lg"
        >
          Plan Your Perfect Pakistani Wedding <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-emerald-300 via-[#10b981] to-[#D97706] bg-clip-text text-transparent italic font-serif">
            Without the Chaos
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed font-sans drop-shadow-md"
        >
          Find professionals. Book services. Manage budgets. Preserve memories. <br className="hidden md:inline" />
          Everything inside one unified operating system.
        </motion.p>

        {/* Call to Actions - Replacing Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12"
        >
          <Link
            href="/start-planning"
            className="w-full sm:w-auto bg-[#047857] hover:bg-[#035f44] text-white text-[15px] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-700/50 transform hover:-translate-y-0.5 flex items-center justify-center text-center"
          >
            Start Planning for Free
          </Link>
          <Link
            href="/tools"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white text-[15px] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center text-center"
          >
            View Budget Calculator
          </Link>
        </motion.div>

        {/* Social Proof Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-white/20 w-full max-w-3xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-xl leading-tight tracking-wide">1,500+</p>
              <p className="text-white/70 text-xs uppercase tracking-[0.15em] font-semibold mt-0.5">Professionals Onboarded</p>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-12 bg-white/20"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
              <CheckCircle2 className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-xl leading-tight tracking-wide">12,000+</p>
              <p className="text-white/70 text-xs uppercase tracking-[0.15em] font-semibold mt-0.5">Bookings Completed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
