"use client"
import React from 'react'
import Link from 'next/link'
import { 
  Building2, Camera, Video, User, Sparkles, Utensils, 
  Layers, Music, Flame, Calendar, Speaker, ArrowRight, Laptop 
} from 'lucide-react'

export function CategoryGrid() {
  const categories = [
    { name: 'Venues', count: '450+ listings', icon: Building2, slug: 'venues', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=300' },
    { name: 'Photography', icon: Camera, slug: 'photographers', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300' },
    { name: 'Videography', icon: Video, slug: 'photographers', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=300' },
    { name: 'Makeup', icon: User, slug: 'salons', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300' },
    { name: 'Decor', icon: Sparkles, slug: 'decor', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300' },
    { name: 'Catering', icon: Utensils, slug: 'catering', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=300' },
    { name: 'Bridal Wear', icon: Layers, slug: 'rentals', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300' },
    { name: 'Rentals', icon: Layers, slug: 'rentals', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=300' },
    { name: 'Entertainment', icon: Music, slug: 'djs', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300' },
    { name: 'Florists', icon: Flame, slug: 'florists', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300' },
    { name: 'Event Planners', icon: Calendar, slug: 'planners', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300' },
    { name: 'Production', icon: Laptop, slug: 'sound', image: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?q=80&w=300' }
  ]

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-slate-50">
      <div className="flex justify-between items-baseline mb-12">
        <div className="text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-[#4F46E5] block font-bold mb-1">Explore Marketplace</span>
          <h2 className="text-3xl font-black font-sans text-slate-900 tracking-tight">Browse by Category</h2>
        </div>
        
        <Link href="/explore" className="text-xs font-black uppercase tracking-wider text-[#4F46E5] hover:underline flex items-center gap-1.5 min-h-[44px]">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Horizontal categories slider element */}
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide text-left w-full">
        {categories.map((cat, index) => {
          const Icon = cat.icon
          return (
            <Link 
              key={index}
              href={`/explore?category=${cat.slug}`}
              className="group relative flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            >
              {/* Background cover image */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Category Icon and count details */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                <Icon className="w-4.5 h-4.5" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-left">
                <h3 className="text-base font-bold text-white leading-tight mb-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] font-semibold text-slate-300">
                  {cat.count}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
