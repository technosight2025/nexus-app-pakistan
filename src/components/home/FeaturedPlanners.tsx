"use client"
import { motion } from "framer-motion"
import { Star, MapPin, ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const PLANNERS = [
  { id: 1, name: "QYT Events", category: "Luxury Weddings", location: "Lahore", price: "PKR 500k+", rating: "5.0", reviews: "128", image: "/images/pakistani_mehndi_hands.png" },
  { id: 2, name: "Jalwa Event Management", category: "Turnkey Solutions", location: "Islamabad", price: "PKR 300k+", rating: "4.9", reviews: "215", image: "/images/pakistani_mehndi_hands.png" },
  { id: 3, name: "Nizam Events", category: "Corporate & Weddings", location: "Karachi", price: "PKR 450k+", rating: "4.8", reviews: "89", image: "/images/pakistani_mehndi_hands.png" },
  { id: 4, name: "A-Z Planners", category: "Budget Friendly", location: "Lahore", price: "PKR 150k+", rating: "4.7", reviews: "340", image: "/images/pakistani_wedding_venue.png" }
]

export function FeaturedPlanners() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold mb-4 text-sm"
            >
              <Briefcase className="w-4 h-4" /> TURNKEY EXPERTS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
            >
              Top Event Planners
            </motion.h2>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2 text-primary font-bold hover:bg-primary/10 rounded-full px-6 py-6">
            View All Planners <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel 
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {PLANNERS.map((planner) => (
                <CarouselItem key={planner.id} className="md:basis-1/2 lg:basis-1/4 pl-4 md:pl-6">
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-slate-50 rounded-3xl p-6 border-2 border-transparent hover:border-blue-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] transition-all duration-300 text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-cyan-400/10 rounded-full blur-2xl" />
                    
                    <div className="relative w-full h-40 mb-6 rounded-2xl overflow-hidden shadow-sm">
                      <Image 
                        src={planner.image} 
                        alt={planner.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center justify-center shadow-sm">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs font-bold">{planner.rating}</span>
                      </div>
                    </div>
                    
                    <div className="inline-block px-3 py-1 bg-white text-blue-600 rounded-full text-xs font-bold mb-3 shadow-sm border border-slate-100">
                      {planner.category}
                    </div>
                    
                    <h3 className="font-black text-xl text-foreground mb-1 group-hover:text-blue-600 transition-colors">{planner.name}</h3>
                    
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-500" /> {planner.location}</span>
                      <span>•</span>
                      <span>{planner.reviews} reviews</span>
                    </div>

                    <div className="text-center mb-6">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Fee Starts At</span>
                      <div className="font-black text-lg text-foreground">{planner.price}</div>
                    </div>

                    <Button className="w-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl font-bold transition-colors">
                      Hire Planner
                    </Button>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static transform-none h-14 w-14 rounded-full border-2 border-outline hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm" />
              <CarouselNext className="static transform-none h-14 w-14 rounded-full border-2 border-outline hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
