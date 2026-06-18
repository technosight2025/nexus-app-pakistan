"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Calendar, Wallet } from "lucide-react"

export function VenueHeroLeadGen() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
              ✨ Find Your Dream Venue
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] mb-6">
              The Perfect Venue, <br />
              <span className="text-primary">Without the Hassle.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium mb-8">
              Tell us what you're looking for, and our venue experts will send you 5 tailored quotes within 24 hours. Free of charge.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-bold text-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                Best Price Guarantee
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</div>
                Verified Reviews
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-3xl p-8 border border-outline shadow-[0_20px_40px_rgba(15,91,62,0.08)] relative"
          >
            <div className="absolute -top-4 -right-4 bg-secondary text-white font-black text-xs px-4 py-2 rounded-full shadow-lg transform rotate-3">
              Get Free Quotes!
            </div>
            
            <h3 className="text-2xl font-black text-foreground mb-6">Instant Venue Match</h3>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Event City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                      <option>100 - 300</option>
                      <option>300 - 500</option>
                      <option>500 - 1000</option>
                      <option>1000+</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Budget</label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                      <option>Economy</option>
                      <option>Standard</option>
                      <option>Premium</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pb-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Phone Number</label>
                <div className="flex gap-2">
                  <div className="w-20 px-3 py-3 bg-slate-100 border border-outline rounded-xl text-sm font-bold text-center">
                    +92
                  </div>
                  <input type="tel" placeholder="300 1234567" className="flex-1 px-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>

              <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-black shadow-lg hover:-translate-y-1 transition-all">
                Find My Venue
              </Button>
              <p className="text-center text-xs text-muted-foreground font-medium mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
