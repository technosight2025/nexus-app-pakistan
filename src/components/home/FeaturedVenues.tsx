"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Users, Star, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const VENUES = [
  { id: 1, name: "The Royal Palm", location: "Lahore", capacity: 800, price: 500000, rating: "4.9", reviews: 128, image: "/images/pakistani_wedding_venue.png" },
  { id: 2, name: "Serena Hotel", location: "Islamabad", capacity: 1200, price: 800000, rating: "5.0", reviews: 342, image: "/images/pakistani_wedding_venue.png" },
  { id: 3, name: "Pearl Continental", location: "Karachi", capacity: 2000, price: 1200000, rating: "4.8", reviews: 256, image: "/images/pakistani_wedding_venue.png" },
  { id: 4, name: "Bagh-e-Jinnah", location: "Lahore", capacity: 500, price: 300000, rating: "4.7", reviews: 89, image: "/images/pakistani_wedding_venue.png" }
]

// Sub-component for interactive Venue Card
function FeaturedVenueCard({ venue }: { venue: any }) {
  const [isSaved, setIsSaved] = useState(false)

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white rounded-xl overflow-hidden border-2 border-transparent hover:border-primary/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(255,56,92,0.15)] transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image src={venue.image} alt={venue.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={venue.id <= 2} className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-foreground flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {venue.rating} ({venue.reviews})
        </div>
        <button 
          onClick={toggleSave}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-sm z-10"
        >
          <Heart className={`w-5 h-5 transition-colors ${isSaved ? 'fill-pink-500 text-pink-500' : 'text-muted-foreground hover:text-pink-500'}`} />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-6 cursor-pointer group-hover:bg-slate-50/50 transition-colors">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 font-medium">
          <MapPin className="w-4 h-4 text-primary" /> {venue.location}
          <span className="mx-2 text-outline">•</span>
          <Users className="w-4 h-4 text-primary" /> Up to {venue.capacity}
        </div>
        <h3 className="font-black text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">{venue.name}</h3>
        
        <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-outline">
          <div>
            <span className="text-sm font-bold text-muted-foreground">Starting from</span>
            <div className="font-black text-xl text-primary">PKR {(venue.price/1000).toFixed(0)}k</div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg hover:-translate-y-1 transition-all z-10">
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedVenues() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t-2 border-dashed border-primary/10">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-pink-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-bold mb-4 text-sm"
            >
              💖 DREAM LOCATIONS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
            >
              Trending Venues
            </motion.h2>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2 text-primary font-bold hover:bg-primary/10 rounded-full px-6 py-6">
            View All Venues <ArrowRight className="w-5 h-5" />
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
              {VENUES.map((venue) => (
                <CarouselItem key={venue.id} className="md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
                  <FeaturedVenueCard venue={venue} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-8">
              <CarouselPrevious className="static transform-none h-14 w-14 rounded-full border-2 border-outline hover:border-primary hover:bg-primary hover:text-white transition-all shadow-sm" />
              <CarouselNext className="static transform-none h-14 w-14 rounded-full border-2 border-outline hover:border-primary hover:bg-primary hover:text-white transition-all shadow-sm" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
