import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Container } from "@/components/ui/Container"

export function Testimonials() {
  const testimonials = [
    {
      quote: "Nexus made our wedding perfect. Found the best venue and photographer in one day. WhatsApp connection was seamless!",
      author: "Ayesha & Bilal",
      city: "Lahore",
      rating: 5.0
    },
    {
      quote: "Managing bookings for our marquee was a chaotic mess of WhatsApp threads. Now, with Marquee OS, everything is unified.",
      author: "M. Haris (Owner, Royal Pavilion)",
      city: "Karachi",
      rating: 5.0
    },
    {
      quote: "We loved the budget architect tool! It gave us a clear breakdown of our wedding costs, which let us negotiate confidently.",
      author: "Zainab & Hamza",
      city: "Islamabad",
      rating: 5.0
    }
  ]

  const [activeIndex, setActiveIndex] = React.useState(0)

  // Auto scroll every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-20 bg-[#FDF8F0] border-b border-[#E6E2DA]">
      <Container className="max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
            ⭐ Community Feedback
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A1A1A]">
            What Our Community Says
          </h2>
        </div>

        {/* Carousel Card Wrapper */}
        <div className="bg-white border border-[#E6E2DA] rounded-[2rem] p-8 sm:p-12 relative shadow-xs text-center min-h-[260px] flex flex-col justify-between">
          {/* Quote icon overlay */}
          <div className="absolute top-6 left-6 text-slate-100 select-none">
            <Quote className="w-16 h-16 shrink-0 fill-slate-50" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 relative z-10 flex flex-col justify-center items-center flex-1"
            >
              {/* Rating stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] shrink-0" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-sm sm:text-base md:text-lg font-heading font-semibold text-[#1A1A1A] leading-relaxed max-w-2xl mx-auto italic">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>

              {/* Author name */}
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest pt-2">
                — {testimonials[activeIndex].author},{" "}
                <span className="text-[#0F5B3E] font-black">{testimonials[activeIndex].city}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls indicators */}
          <div className="mt-8 flex justify-between items-center relative z-10">
            
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-[#E6E2DA] text-slate-400 hover:text-[#1A1A1A] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeIndex === i ? "bg-[#0F5B3E] w-6" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-[#E6E2DA] text-slate-400 hover:text-[#1A1A1A] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </div>

      </Container>
    </section>
  )
}
