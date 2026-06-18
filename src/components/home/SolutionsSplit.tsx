"use client"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const B2C_FEATURES = [
  "AI-Powered Smart Quotes",
  "Live Budget & Expense Tracker",
  "Digital E-Invites & RSVP Management",
  "Verified Vendors & Beauty Parlors",
  "Interactive Guest List"
]

const B2B_FEATURES = [
  "Unified Communication & Quotation Engine",
  "Daily Wager & Field Operations Tracking",
  "Venue & Asset Management Systems",
  "Digital Signage & Payment Tracking",
  "Business Analytics & AI Assistant"
]

export function SolutionsSplit() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pakistani_mehndi_hands.png')] bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold mb-4 text-sm"
          >
            THE NEXUS ECOSYSTEM
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
          >
            One Platform. <br className="md:hidden" />
            <span className="text-primary">Two Powerful Solutions.</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground font-medium">
            Whether you're planning the perfect event or growing your event business, Nexus provides the specialized tools you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* B2C Solution Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 md:p-12 border-2 border-transparent hover:border-blue-500/20 shadow-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
            
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Users className="w-8 h-8" />
            </div>
            
            <h3 className="text-3xl font-black text-foreground mb-4">For Event Hosts</h3>
            <p className="text-slate-600 font-medium mb-8 leading-relaxed">
              Plan your Shaadi, Valima, or Corporate Gala seamlessly. Take control of your budget, track RSVPs, and book Pakistan's best vendors all in one place.
            </p>
            
            <ul className="space-y-4 mb-10">
              {B2C_FEATURES.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/dashboard/planner" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Start Planning <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* B2B Solution Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-foreground text-white rounded-xl p-8 md:p-12 shadow-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-primary rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-white/10">
              <Building2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-3xl font-black mb-4">The Hospitality Operating System</h3>
            <p className="text-slate-300 font-medium mb-8 leading-relaxed">
              Scale your event business with our complete ERP. Automate leads, track daily wagers, manage venue bookings without conflicts, and access powerful analytics.
            </p>
            
            <ul className="space-y-4 mb-10">
              {B2B_FEATURES.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-100 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link href="/dashboard/vendor" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Explore the OS <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
