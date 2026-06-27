"use client"

import React from 'react'
import Link from 'next/link'
import { Map, ArrowRight, Compass } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

export function ExploreEntryPoint() {
  const { isRomanUrdu } = useLanguage()

  return (
    <section className="max-w-[1400px] mx-auto px-6 mb-24 relative z-40">
      <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-neutral-100 flex flex-col md:flex-row min-h-[380px] hover:border-neutral-900 transition-all duration-500">
        {/* Left Side: Content */}
        <div className="w-full md:w-[50%] p-10 md:p-14 flex flex-col justify-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 block mb-4">
            {isRomanUrdu ? 'Interactive Naqsha' : 'Interactive Mapping'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-serif text-neutral-900 leading-tight mb-4 tracking-tight">
            {isRomanUrdu ? 'Poori Market Ek Map Par' : 'Explore the Entire Marketplace'}
          </h2>
          <p className="text-sm text-neutral-500 mb-8 font-normal max-w-md leading-relaxed">
            {isRomanUrdu 
              ? 'Venues, photographers, decorators aur bohat kuch. Hamaray interactive map par apne ird gird behtareen options talash karain.'
              : 'Discover venues, photographers, decorators, and more. Use our interactive map to find the best options near you in a single view.'}
          </p>
          <Link href="/explore">
            <button className="w-max bg-neutral-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2.5 transition-all">
              {isRomanUrdu ? 'Explore Karain' : 'Open Explore'} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Right Side: Visual/Map Representation */}
        <div className="w-full md:w-[50%] relative min-h-[250px] md:min-h-full bg-neutral-50">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
            alt="Interactive Map Explore" 
            className="absolute inset-0 w-full h-full object-cover opacity-70 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/20 to-transparent" />
          
          {/* Abstract Map UI Element overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-40 h-40 md:w-64 md:h-64 border border-neutral-300 rounded-full flex items-center justify-center relative"
            >
               <div className="w-28 h-28 md:w-44 md:h-44 border border-neutral-200 rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full border border-neutral-300 flex items-center justify-center shadow-xs">
                    <Map className="w-6 h-6 md:w-8 md:h-8 text-neutral-800" />
                  </div>
               </div>
               
               {/* Decorative dots */}
               <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-neutral-900 rounded-full -translate-x-1/2 -translate-y-1/2" />
               <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-neutral-600 rounded-full translate-x-1/2" />
               <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-neutral-400 rounded-full translate-y-1/2" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
