"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Volume2, VolumeX, Music, Heart, Calendar, MapPin } from "lucide-react"

export function MusicalInviteViewer({ onClose }: { onClose: () => void }) {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  
  // Using a soft acoustic placeholder track
  const audioRef = useRef<HTMLAudioElement>(null)

  const slides = [
    {
      id: "intro",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000",
      content: (
        <div className="text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            className="text-yellow-500 text-xs md:text-sm uppercase tracking-[0.3em] font-bold mb-6"
          >
            With joyous hearts
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 1.5 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-2xl italic"
          >
            Ali & Zara
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
            className="w-16 h-px bg-yellow-500/50 mx-auto my-8"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
            className="text-white/90 text-sm md:text-base font-light tracking-widest uppercase"
          >
            Invite you to celebrate their union
          </motion.p>
        </div>
      )
    },
    {
      id: "journey",
      image: "https://images.unsplash.com/photo-1583939008709-36b13e3146d9?q=80&w=2000",
      content: (
        <div className="text-center px-6 max-w-2xl mx-auto">
          <Heart className="w-8 h-8 text-yellow-500 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 italic">Our Journey</h2>
          <p className="text-white/80 text-sm md:text-lg leading-relaxed font-light">
            From our first meeting under the starlit sky of Lahore, to this beautiful moment where two families become one. We cannot wait to share our greatest adventure with the people we love most.
          </p>
        </div>
      )
    },
    {
      id: "events",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000",
      content: (
        <div className="text-center px-6 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 italic drop-shadow-xl">The Celebrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { title: "Mehndi", date: "Oct 24", time: "7:00 PM", venue: "Grand Marquee" },
              { title: "Baraat", date: "Oct 25", time: "8:00 PM", venue: "Royal Palm" },
              { title: "Walima", date: "Oct 26", time: "8:30 PM", venue: "Pearl Continental" }
            ].map((event, idx) => (
              <motion.div 
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (idx * 0.3), duration: 0.8 }}
                className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-yellow-500 font-serif text-2xl mb-4">{event.title}</h3>
                <div className="space-y-3 text-white/80 text-sm font-medium">
                  <p className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> {event.date} • {event.time}</p>
                  <p className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" /> {event.venue}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "rsvp",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000",
      content: (
        <div className="text-center px-6 bg-black/40 backdrop-blur-sm p-10 rounded-3xl border border-white/10 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 italic">We Await You</h2>
          <p className="text-white/70 mb-10 font-light">Please favor us with a reply by October 1st, 2025.</p>
          
          <button className="bg-yellow-500 hover:bg-yellow-400 text-[#0A3B2A] text-lg font-bold py-4 px-12 rounded-full shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:scale-105 transition-all w-full md:w-auto uppercase tracking-widest">
            Submit RSVP
          </button>
        </div>
      )
    }
  ]

  const handleStart = () => {
    setHasStarted(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e))
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1)
  }

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-inter overflow-hidden">
      
      {/* Background Music */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />

      {/* Entry Screen (Solves Autoplay restrictions) */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-[110] bg-[#0A3B2A] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20 animate-pulse">
                <Music className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-white font-serif text-3xl md:text-4xl italic mb-4 text-center">A Musical Journey Awaits</h2>
              <p className="text-white/60 mb-10 text-sm tracking-widest uppercase text-center">Turn on your volume</p>
              
              <button 
                onClick={handleStart}
                className="bg-yellow-500 text-[#0A3B2A] font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform uppercase tracking-widest shadow-xl"
              >
                Enter the Celebration
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Presentation */}
      <AnimatePresence mode="wait">
        {hasStarted && (
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Cinematic Background Image with Ken Burns effect */}
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute inset-0 z-0"
            >
              <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
              <img 
                src={slides[currentSlide].image} 
                alt="Background" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Slide Content */}
            <div className="relative z-20 w-full">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Controls */}
      {hasStarted && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center pointer-events-auto">
            <button 
              onClick={toggleMute}
              className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/40 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={onClose}
              className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-10 left-0 right-0 px-6 flex justify-between items-center pointer-events-auto">
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                  currentSlide === 0 
                  ? 'bg-transparent border-white/10 text-white/20 cursor-not-allowed' 
                  : 'bg-black/20 backdrop-blur-md border-white/20 text-white hover:bg-black/40'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
                  currentSlide === slides.length - 1 
                  ? 'bg-transparent border-white/10 text-white/20 cursor-not-allowed' 
                  : 'bg-yellow-500 border-yellow-500 text-[#0A3B2A] shadow-lg hover:bg-yellow-400 hover:scale-105'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === idx ? 'w-8 bg-yellow-500' : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
