"use client"
import { motion } from "framer-motion"

export function VendorHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image overlay - generic styling */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-[url('/images/pakistani_mehndi_hands.png')] bg-cover bg-center"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />

      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Discover Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Talent</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            From award-winning photographers to master caterers. Find and book verified professionals for your next unforgettable event.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
