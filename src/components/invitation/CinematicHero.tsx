"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CinematicHeroProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  backgroundUrl?: string;
  onBeginJourney: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  brideName,
  groomName,
  weddingDate,
  backgroundUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  onBeginJourney
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-nexus-charcoal">
      {/* Background Image with slow zoom */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        
        {/* Monogram/Bismillah Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 border border-nexus-gold/50 rotate-45 flex items-center justify-center mb-4">
            <span className="-rotate-45 font-serif text-nexus-gold text-2xl">
              {brideName[0]}&{groomName[0]}
            </span>
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-white/70 uppercase tracking-[0.2em] text-sm md:text-base mb-4 font-sans"
        >
          Are Getting Married
        </motion.h2>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg"
        >
          {brideName} <br className="md:hidden" />
          <span className="text-nexus-gold text-4xl md:text-6xl mx-2">&</span> <br className="md:hidden" />
          {groomName}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-16"
        >
          {weddingDate}
        </motion.p>
      </div>

      {/* Begin Journey Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center cursor-pointer"
        onClick={onBeginJourney}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest mb-3">Begin Journey</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-nexus-gold" size={24} />
        </motion.div>
      </motion.div>

    </div>
  );
};
