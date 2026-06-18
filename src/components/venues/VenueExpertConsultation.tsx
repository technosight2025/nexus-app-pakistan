"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PhoneCall, Calendar as CalendarIcon, Clock } from "lucide-react"

export function VenueExpertConsultation() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-outline">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
              <PhoneCall className="w-3 h-3" /> Free Consultation
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
              Feeling Overwhelmed? <br />
              <span className="text-primary">Talk to a Nexus Expert.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium mb-8">
              Our venue experts have visited and vetted over 500 venues across Pakistan. Book a free 15-minute call, tell us your vision, and we'll handle the rest.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-outline flex items-center justify-center shrink-0 text-primary">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">Tell us your requirements</h4>
                  <p className="text-sm font-medium text-muted-foreground">Guest count, budget, and desired location.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-outline flex items-center justify-center shrink-0 text-primary">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">We shortlist the best</h4>
                  <p className="text-sm font-medium text-muted-foreground">We check availabilities and negotiate the best rates.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-outline flex items-center justify-center shrink-0 text-primary">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-lg mb-1">You choose & book</h4>
                  <p className="text-sm font-medium text-muted-foreground">Review your tailored options and book securely via Nexus.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface border border-outline rounded-3xl p-8 shadow-[0_20px_40px_rgba(15,91,62,0.06)]"
          >
            <h3 className="text-2xl font-black text-foreground mb-2">Book a Free Call</h3>
            <p className="text-sm font-medium text-muted-foreground mb-6">Select a time that works for you.</p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Name</label>
                <input type="text" placeholder="Ali Raza" className="w-full px-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                <input type="tel" placeholder="+92 300 1234567" className="w-full px-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <input type="date" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-outline rounded-xl text-sm font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none" required>
                      <option>10:00 AM</option>
                      <option>02:00 PM</option>
                      <option>05:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button className="w-full h-12 mt-2 bg-foreground hover:bg-foreground/90 text-white rounded-xl font-bold shadow-sm transition-all">
                Schedule Call
              </Button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
