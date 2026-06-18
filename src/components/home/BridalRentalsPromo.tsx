"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, ShieldCheck, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BridalRentalsPromo() {
  return (
    <section className="py-24 bg-[#FFFAFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-pink-100 shadow-sm flex flex-col lg:flex-row items-center overflow-hidden">
          
          {/* Left: Image / Visuals */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] order-2 lg:order-1">
            <Image 
              src="/images/pakistani_bride_makeup.png" 
              alt="Designer Bridal Dress" 
              fill 
              className="object-cover"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-rose-50/90" />
            
            {/* Floating Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Starting from</p>
                <p className="text-xl font-black text-foreground">PKR 25,000 / day</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 p-8 md:p-16 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-bold mb-6 text-sm"
            >
              <Sparkles className="w-4 h-4" /> DESIGNER BRIDAL RENTALS
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-6"
            >
              Look Stunning.<br />
              <span className="text-pink-500">Spend Smart.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Why spend millions on a dress you will wear once? Rent authentic, dry-cleaned designer Lehengas, Ghararas, and Sherwanis for a fraction of the retail price.
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-10"
            >
              {[
                "100% Authentic Designer Wear",
                "Professionally Dry-Cleaned & Altered",
                "Includes Jewelry & Accessories packages"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-foreground">
                  <ShieldCheck className="w-5 h-5 text-pink-500" /> {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/rentals">
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-pink-600 hover:bg-pink-700 text-white shadow-lg hover:-translate-y-1 transition-all border-none flex items-center gap-2">
                  Explore Bridal Collection <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
