"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SmartTVDisplay({ params }: { params: { screen_id: string } }) {
  // In a real app, this would fetch from Supabase to get the currently mapped content
  // based on the screen_id. For now, we mock a "Welcome Board".
  
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Hide scrollbars for the TV display
    document.body.style.overflow = 'hidden';
    
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0A0F0D] text-white relative overflow-hidden flex flex-col items-center justify-center font-serif">
      
      {/* Background Ambient Animation */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1.1 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-emerald-900 rounded-full blur-[150px] opacity-30"
        />
        <motion.div 
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: 0.5, scale: 1.2 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", delay: 5 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#C9A227] rounded-full blur-[180px] opacity-20"
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-20 text-center">
        
        {/* Top Venue Branding */}
        <div className="absolute top-12 left-12 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <span className="font-sans font-bold text-xl tracking-widest text-[#C9A227]">SG</span>
          </div>
          <div className="text-left">
            <h2 className="font-sans text-xl font-bold tracking-widest text-white/80 uppercase">Shalimar Gardens</h2>
            <p className="font-sans text-sm text-[#C9A227] tracking-widest uppercase">Hall A</p>
          </div>
        </div>

        {/* Live Clock */}
        <div className="absolute top-16 right-16">
          <span className="font-sans text-3xl font-bold tracking-widest text-white/80 drop-shadow-lg">
            {currentTime}
          </span>
        </div>

        {/* Welcome Message */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <h3 className="font-sans text-2xl md:text-3xl tracking-[0.3em] uppercase text-[#C9A227] mb-8">
            Welcome to the Wedding of
          </h3>
          <h1 className="text-7xl md:text-[8rem] leading-none mb-12 drop-shadow-2xl" style={{ fontFamily: '"Playfair Display", serif' }}>
            Ali & Fatima
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto mb-12 opacity-50" />
          <p className="font-sans text-3xl text-white/70 tracking-wide font-light">
            Please join us for dinner at <strong className="text-white">8:30 PM</strong>
          </p>
        </motion.div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 inset-x-0 text-center z-10">
        <p className="font-sans text-sm text-white/30 tracking-[0.2em] uppercase">
          Powered by NEXUS Digital Displays
        </p>
      </div>

    </div>
  );
}
