"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import { OSHeroCards } from "./OSHeroCards"

export function OSHero() {
  return (
    <section className="relative w-full pt-20 pb-48 bg-gradient-to-br from-[#02182B] via-[#053225] to-[#0A4736] overflow-hidden">
      {/* Background Graphic: Data-Stream Nodes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Node 1 */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]"
        />
        {/* Node 2 */}
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] left-[25%] w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]"
        />
        {/* Node 3 (Main Data Node Graphic from image) */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[50%] right-[15%] hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-emerald-400/30"
        >
          <div className="w-16 h-16 rounded-full border border-emerald-400/50 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.5)] flex flex-col items-center justify-center gap-1">
              <div className="w-4 h-0.5 bg-emerald-300" />
              <div className="w-2 h-0.5 bg-emerald-300" />
            </div>
          </div>
          {/* Connecting lines branching out from this node */}
          <svg className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
            <line x1="128" y1="128" x2="30" y2="40" stroke="#34D399" strokeWidth="1" />
            <line x1="128" y1="128" x2="40" y2="180" stroke="#34D399" strokeWidth="1" />
            <line x1="128" y1="128" x2="200" y2="20" stroke="#34D399" strokeWidth="1" />
            <circle cx="30" cy="40" r="3" fill="#34D399" />
            <circle cx="40" cy="180" r="2" fill="#34D399" />
            <circle cx="200" cy="20" r="3" fill="#34D399" />
          </svg>
        </motion.div>

        {/* Subtle geometric lines across the background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 L300,300 L600,100 L900,400 L1200,200 L1500,500" stroke="#10B981" strokeWidth="1" fill="none" />
          <path d="M-100,300 L200,500 L500,200 L800,600 L1100,400 L1400,700" stroke="#34D399" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-xs font-medium text-emerald-100/70 tracking-[0.25em] uppercase"
          >
            Welcome to Nexus.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-white leading-tight font-serif"
          >
            The Operating System for Pakistan's Event, Hospitality, and Business Ecosystem.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-emerald-200/80 font-medium tracking-[0.2em] uppercase max-w-2xl mt-4"
          >
            Plan Events. Run Businesses. Manage Venues. Build Memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 mb-12"
          >
            <h2 className="font-heading font-light text-[60px] sm:text-[100px] md:text-[140px] leading-none text-white/90 tracking-widest select-none">
              NEXUS
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="px-8 py-3.5 border border-white/30 rounded-md text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-white/10 hover:border-white/60 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </Container>

      {/* Positioned Cards overlapping the hero bottom */}
      <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-4 sm:px-6 lg:px-8">
        <OSHeroCards />
      </div>
    </section>
  )
}
