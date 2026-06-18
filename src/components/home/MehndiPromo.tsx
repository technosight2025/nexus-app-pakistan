"use client"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function MehndiPromo() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#FFFAFB] border-2 border-dashed border-primary/20 rounded-xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group">
          
          {/* Ambient light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-pink-100/50 to-primary/5 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000" />
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2 relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-bold mb-6 text-sm"
            >
              <Sparkles className="w-4 h-4" /> NEW AI FEATURE
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6 leading-tight"
            >
              Design Your <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
                Dream Mehndi
              </span>
            </motion.h2>
            
            <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Stop guessing how the henna will look. Use our AI-powered virtual designer to visualize stunning Arabic, Minimalist, or Heavy Bridal mehndi styles directly with a live preview.
            </p>
            
            <Link href="/tools/mehndi-designer">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-2xl py-7 px-8 font-bold text-lg shadow-xl shadow-primary/20 transition-all group-hover:scale-105">
                Try Live Preview <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Right Imagery */}
          <div className="w-full lg:w-1/2 relative h-[400px] flex items-center justify-center z-10">
            <div className="relative w-[280px] h-[380px] rounded-3xl overflow-hidden shadow-lg rotate-[-6deg] group-hover:rotate-0 transition-all duration-500 border-8 border-white z-20">
              <Image src="/images/mehndi_bridal.png" alt="Bridal Mehndi" fill className="object-cover" />
            </div>
            <div className="absolute top-10 right-0 w-[240px] h-[320px] rounded-3xl overflow-hidden shadow-xl rotate-[6deg] group-hover:rotate-12 transition-all duration-500 border-8 border-white z-10 opacity-80">
              <Image src="/images/mehndi_arabic.png" alt="Arabic Mehndi" fill className="object-cover" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
