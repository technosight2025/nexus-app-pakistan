"use client"
import { motion } from "framer-motion"
import { Star, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const SALONS = [
  { id: 1, name: "Kashee's Beauty Parlor", category: "Bridal Makeup", location: "Karachi", price: "PKR 100k", rating: "4.9", reviews: "850+", image: "/images/pakistani_bride_makeup.png" },
  { id: 2, name: "Depilex Beauty Clinic", category: "Hair & Makeup", location: "Lahore", price: "PKR 60k", rating: "4.8", reviews: "1.2k+", image: "/images/pakistani_bride_makeup.png" },
  { id: 3, name: "Zara's Salon", category: "Bridal Services", location: "Islamabad", price: "PKR 85k", rating: "4.9", reviews: "420", image: "/images/pakistani_bride_makeup.png" },
  { id: 4, name: "Natasha Salon", category: "Signature Bridal", location: "Karachi", price: "PKR 150k", rating: "5.0", reviews: "630", image: "/images/pakistani_bride_makeup.png" }
]

export function FeaturedSalons() {
  return (
    <section className="py-24 bg-white border-t-2 border-dashed border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-bold mb-4 text-sm"
            >
              💄 GLAMOUR & BEAUTY
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
            >
              Top Beauty Parlors
            </motion.h2>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2 text-primary font-bold hover:bg-primary/10 rounded-full px-6 py-6">
            Explore Salons <ArrowRight className="w-5 h-5" />
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
              {SALONS.map((salon) => (
                <CarouselItem key={salon.id} className="md:basis-1/2 lg:basis-1/4 pl-4 md:pl-6">
                  <motion.div 
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group bg-[#FFFAFB] rounded-3xl p-6 border-2 border-transparent hover:border-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,56,92,0.15)] transition-all duration-300 text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-pink-100/20 rounded-full blur-2xl" />
                    
                    <div className="relative w-28 h-28 mx-auto mb-6">
                      <Image 
                        src={salon.image} 
                        alt={salon.name} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        priority={salon.id <= 4}
                        className="object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute -bottom-2 -right-4 bg-white px-2 py-1 rounded-full flex items-center justify-center shadow-md border border-slate-100">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs font-bold">{salon.rating}</span>
                      </div>
                    </div>
                    
                    <div className="inline-block px-3 py-1 bg-white text-slate-600 rounded-full text-xs font-bold mb-3 shadow-sm">
                      {salon.category}
                    </div>
                    
                    <h3 className="font-black text-xl text-foreground mb-1 group-hover:text-primary transition-colors">{salon.name}</h3>
                    
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {salon.location}</span>
                      <span>•</span>
                      <span>{salon.reviews} reviews</span>
                    </div>

                    <div className="text-center mb-6">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Bridal Packages from</span>
                      <div className="font-black text-lg text-primary">{salon.price}</div>
                    </div>

                    <Button className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl font-bold transition-colors">
                      View Packages
                    </Button>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-8">
              <CarouselPrevious className="relative inset-0 translate-y-0 h-12 w-12 bg-white hover:bg-primary hover:text-white border-2 border-slate-100" />
              <CarouselNext className="relative inset-0 translate-y-0 h-12 w-12 bg-white hover:bg-primary hover:text-white border-2 border-slate-100" />
            </div>
          </Carousel>
        </motion.div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="ghost" className="text-primary font-bold">
            Explore All Salons <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
