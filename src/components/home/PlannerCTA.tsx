"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CalendarDays, Wallet, CheckSquare, Sparkles } from "lucide-react"
import Link from "next/link"

export function PlannerCTA() {
  return (
    <section className="py-24 bg-[#FFFAFB] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-xl p-8 md:p-16 border border-outline shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center gap-12 lg:gap-24 overflow-hidden relative">
          
          {/* Inner Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/5 to-transparent blur-3xl rounded-full" />

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold mb-6 text-sm"
            >
              <Sparkles className="w-4 h-4" /> YOUR PERSONAL WORKSPACE
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-6"
            >
              Plan Your Entire Event in One Place
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Ditch the spreadsheets! Use our brand new Event Planner Dashboard to manage your budget, track guest RSVPs, and organize your to-do lists for free.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/dashboard/planner">
                <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-foreground hover:bg-black text-white shadow-xl hover:-translate-y-1 transition-all">
                  Go to My Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content (Feature Cards) */}
          <div className="flex-1 w-full relative z-10 hidden md:block">
            <div className="relative h-[400px] w-full">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="absolute top-10 right-10 w-72 bg-white rounded-3xl p-6 shadow-lg border border-outline origin-bottom-right"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4"><CalendarDays className="w-6 h-6"/></div>
                <h3 className="font-black text-lg mb-2">RSVP Manager</h3>
                <p className="text-sm text-muted-foreground font-medium">Keep track of your entire guest list effortlessly.</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: -10 }}
                whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
                className="absolute bottom-10 left-10 w-72 bg-white rounded-3xl p-6 shadow-lg border border-outline origin-top-left"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4"><CheckSquare className="w-6 h-6"/></div>
                <h3 className="font-black text-lg mb-2">Smart Checklists</h3>
                <p className="text-sm text-muted-foreground font-medium">Never miss a deadline with our built-in task manager.</p>
              </motion.div>

              {/* Card 3 (Center) */}
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-3xl p-6 shadow-[0_30px_60px_rgba(255,56,92,0.15)] border-2 border-primary/20 z-20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4"><Wallet className="w-6 h-6"/></div>
                <h3 className="font-black text-lg mb-2">Budget Tracker</h3>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-primary rounded-full w-[60%]"></div>
                </div>
                <p className="text-sm font-bold text-muted-foreground flex justify-between">
                  <span>Spent: 1.2M</span>
                  <span className="text-primary">Total: 2.0M</span>
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
