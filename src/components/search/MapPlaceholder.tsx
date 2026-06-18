"use client"
import { Map, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export function MapPlaceholder() {
  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden flex items-center justify-center">
      {/* Subtle Map-like grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating Pins */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4"
      >
        <MapPin className="w-10 h-10 text-primary fill-primary" />
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 right-1/4"
      >
        <MapPin className="w-8 h-8 text-blue-500 fill-blue-500" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white max-w-sm text-center">
        <Map className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="font-bold text-lg text-foreground mb-2">Interactive Map Loading</h3>
        <p className="text-sm text-muted-foreground">
          In production, this will be replaced with a live Mapbox or Google Maps instance plotting our search results.
        </p>
      </div>
    </div>
  )
}
