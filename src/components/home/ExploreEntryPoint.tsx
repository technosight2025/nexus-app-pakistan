"use client"

import React from 'react'
import Link from 'next/link'
import { Map, ArrowRight, Compass } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

export function ExploreEntryPoint() {
  const { isRomanUrdu } = useLanguage()

  return (
    <section className="max-w-[1400px] mx-auto px-6 mb-20 relative z-40">
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#0A120E] text-white shadow-2xl flex flex-col md:flex-row min-h-[400px]">
        {/* Left Side: Content */}
        <div className="w-full md:w-[55%] p-10 md:p-16 flex flex-col justify-center relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
            <Compass className="w-6 h-6 text-[#E6CDA7]" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif leading-tight mb-4 tracking-tight">
            {isRomanUrdu ? 'Poori Market Ek Map Par' : 'Explore the Entire Marketplace'}
          </h2>
          <p className="text-lg md:text-xl text-emerald-50/80 mb-10 font-light max-w-md">
            {isRomanUrdu 
              ? 'Venues, photographers, decorators aur bohat kuch. Hamaray interactive map par apne ird gird behtareen options talash karain.'
              : 'Discover venues, photographers, decorators, and more. Use our interactive map to find the best options near you in a single view.'}
          </p>
          <Link href="/explore">
            <button className="w-max bg-gradient-to-r from-[#E6CDA7] to-[#C5A880] text-[#0A120E] px-8 py-4 rounded-full font-black text-lg flex items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(197,168,128,0.3)]">
              {isRomanUrdu ? 'Explore Karain' : 'Open Explore'} <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Right Side: Visual/Map Representation */}
        <div className="w-full md:w-[45%] relative min-h-[300px] md:min-h-full">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
            alt="Interactive Map Explore" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0A120E] via-[#0A120E]/50 to-transparent" />
          
          {/* Abstract Map UI Element overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 md:w-80 md:h-80 border border-white/20 rounded-full flex items-center justify-center relative"
            >
               <div className="w-32 h-32 md:w-56 md:h-56 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl rounded-full border border-[#E6CDA7]/40 flex items-center justify-center shadow-[0_0_50px_rgba(230,205,167,0.4)]">
                    <Map className="w-8 h-8 md:w-10 md:h-10 text-[#E6CDA7]" />
                  </div>
               </div>
               
               {/* Decorative dots */}
               <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#E6CDA7] rounded-full shadow-[0_0_10px_#E6CDA7] -translate-x-1/2 -translate-y-1/2" />
               <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] translate-x-1/2" />
               <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white/50 rounded-full translate-y-1/2" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
