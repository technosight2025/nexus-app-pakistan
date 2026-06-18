"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, PlayCircle, X, ChevronRight, ChevronLeft, PauseCircle } from 'lucide-react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

export function InviteHero() {
  const [showDemo, setShowDemo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      title: "Beautiful, Cinematic Themes",
      desc: "Choose from our premium collection of immersive, animated invitation themes.",
      image: "https://images.unsplash.com/photo-1544425884-d92ea407c0b0?auto=format&fit=crop&q=80"
    },
    {
      title: "Tell Your Love Story",
      desc: "Walk your guests through your journey with interactive timeline events.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"
    },
    {
      title: "Smart RSVP Collection",
      desc: "Automatically gather guest counts, dietary needs, and plus-ones instantly.",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80"
    },
    {
      title: "Secure Guest Access",
      desc: "Protect your event with PIN codes or personalized QR entries.",
      image: "https://images.unsplash.com/photo-1583939000003-88c9fae88a3b?auto=format&fit=crop&q=80"
    }
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showDemo && isAutoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [showDemo, isAutoPlay, currentSlide]);

  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1D1C17]">
      {/* Cinematic Background - Placeholder for a rich video or high-quality image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')" }}
      />
      
      {/* Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D1C17] via-[#1D1C17]/80 to-transparent z-10" />

      <div className="relative z-30 max-w-[1400px] mx-auto px-4 md:px-8 text-center flex flex-col items-center mt-20 pb-20">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-[#C9A227]" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">Digital Invitations Platform</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl"
        >
          More Than An <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#F2EFE9] italic font-medium">Invitation</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-12"
        >
          Create an experience your guests will remember. Interactive microsites, rich media storytelling, and seamless RSVP management.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link 
            href="#builder"
            className="w-full sm:w-auto px-8 py-4 bg-[#C9A227] hover:bg-[#B08D22] text-[#1D1C17] rounded-full font-bold text-lg transition-all shadow-[0_10px_40px_-10px_rgba(201,162,39,0.8)] hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Create Invitation
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <button 
            onClick={() => setShowDemo(true)}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            View Demo
          </button>
        </motion.div>

      </div>
      
      {/* Bottom fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF7F2] to-transparent z-20 pointer-events-none" />

      {/* Demo Modal */}
      {showDemo && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setShowDemo(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center"
            >
              <button 
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Carousel UI */}
              <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row bg-[#1D1C17]">
                
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1D1C17] to-transparent opacity-80" />
                </div>

                {/* Text Content Section */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-16 relative z-10">
                  <div className="mb-4 text-[#C9A227] tracking-widest text-xs font-bold uppercase">Platform Feature {currentSlide + 1}/{slides.length}</div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">{slides[currentSlide].title}</h2>
                      <p className="text-xl text-white/70 font-light leading-relaxed mb-12">{slides[currentSlide].desc}</p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="flex items-center gap-6 mt-auto">
                    <div className="flex items-center gap-3">
                      <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-[#C9A227] hover:bg-[#B08D22] flex items-center justify-center text-[#1D1C17] transition-colors">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                    
                    {/* Indicators */}
                    <div className="flex items-center gap-2">
                      {slides.map((_, i) => (
                        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#C9A227]' : 'w-2 bg-white/20'}`} />
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white/10 transition-colors"
                    >
                      {isAutoPlay ? <PauseCircle className="w-4 h-4"/> : <PlayCircle className="w-4 h-4"/>}
                      {isAutoPlay ? 'Auto-Playing' : 'Auto-Play'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
