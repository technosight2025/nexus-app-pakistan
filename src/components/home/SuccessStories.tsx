"use client"
import React from 'react'
import Link from 'next/link'
import { Star, ArrowRight, Quote } from 'lucide-react'

export function SuccessStories() {
  const stories = [
    {
      quote: "Nexus made our event coordination completely effortless. The booking verification gave us total peace of mind.",
      client: "The Ahmed Family",
      location: "Lahore, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
    },
    {
      quote: "We found our wedding venue and our photography artisans in a single afternoon. Booking was secure and fast.",
      client: "Sara & Bilal",
      location: "Karachi, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    },
    {
      quote: "The interactive catering calculator and AI checklist saved us weeks of budgeting calculations.",
      client: "Zainab & Haris",
      location: "Islamabad, Pakistan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
    }
  ]

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-slate-50 border-t border-slate-200/50">
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-[#4F46E5] block font-bold">Real Celebrations. Real Memories.</span>
        <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight">Testimonials</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div 
            key={idx}
            className="bg-white border border-slate-250/60 rounded-2xl p-8 text-left flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-350 transition-all duration-300 relative group"
          >
            {/* Quote Icon Accent */}
            <Quote className="absolute top-6 right-8 w-12 h-12 text-slate-100 group-hover:text-slate-200 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "{story.quote}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-8 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <img src={story.image} alt={story.client} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 leading-tight">
                  {story.client}
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mt-1">
                  {story.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/explore" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#4F46E5] hover:text-indigo-700 transition-colors group min-h-[44px]">
          Read More Stories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
