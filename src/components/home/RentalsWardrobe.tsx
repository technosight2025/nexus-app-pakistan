"use client"
import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'

export function RentalsWardrobe() {
  const items = [
    { 
      name: 'Designer Red Lehenga', 
      price: 'PKR 45,000 / day',
      vendor: 'Zara Bridal Attire',
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400' 
    },
    { 
      name: 'Premium Groom Sherwani', 
      price: 'PKR 25,000 / day',
      vendor: 'Royal Grooms Ltd',
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=400' 
    },
    { 
      name: 'Louis XV Banquet Chairs', 
      price: 'PKR 1,500 / unit',
      vendor: 'Elite Event Furnishings',
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=400' 
    },
    { 
      name: 'Ambient LED Lighting Pack', 
      price: 'PKR 35,000 / day',
      vendor: 'Glow Light & Sound',
      availability: 'Booked',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=400' 
    },
    { 
      name: 'JBL Concert Sound System', 
      price: 'PKR 95,000 / day',
      vendor: 'Peak Sound Systems',
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400' 
    },
    { 
      name: 'Truss Stage & Rigging System', 
      price: 'PKR 150,000 / day',
      vendor: 'StagePro Production',
      availability: 'Available',
      image: 'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?q=80&w=400' 
    }
  ]

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 bg-slate-55 border-t border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Popular Rentals
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 tracking-tight leading-tight">
            Everything You Need, for Less
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-normal max-w-xl">
            Rent luxury bridal attire, premium sherwanis, event furniture, sound rigs, and ambient lighting directly from verified agencies.
          </p>
        </div>

        <Link href="/rentals/all" className="shrink-0">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all cursor-pointer">
            Browse Rentals <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Grid displaying cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-left group"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100 shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
              />
              <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-wider ${
                item.availability === 'Available' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {item.availability}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 leading-snug mb-1">{item.name}</h3>
                <span className="text-xs text-slate-400 font-medium">By {item.vendor}</span>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-[10px] text-slate-450 uppercase tracking-wider font-bold">Rental Cost</span>
                <span className="text-sm font-black text-indigo-600">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
