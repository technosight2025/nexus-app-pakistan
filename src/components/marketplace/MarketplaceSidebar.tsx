"use client"

import React from 'react'
import { 
  List, Home, Camera, Film, Store, Palette, Utensils, Music, Tv, Car, ShoppingBag 
} from 'lucide-react'

interface MarketplaceSidebarProps {
  activeCategory: string
  setActiveCategory: (cat: string) => void
  activeMode: 'gigs' | 'rentals'
}

export function MarketplaceSidebar({ activeCategory, setActiveCategory, activeMode }: MarketplaceSidebarProps) {
  const menuItems = [
    { name: "All Categories", category: "All", icon: List, count: null, type: 'both' },
    { name: "Wedding Venues", category: "Venues", icon: Home, count: 245, type: 'rentals' },
    { name: "Photographers", category: "Photography", icon: Camera, count: 209, type: 'gigs' },
    { name: "Videographers", category: "Videography", icon: Film, count: 167, type: 'gigs' },
    { name: "Decorators", category: "Decorator", icon: Store, count: 167, type: 'gigs' },
    { name: "Makeup Artists", category: "Makeup Artist", icon: Palette, count: 109, type: 'gigs' },
    { name: "Lehnga Rental", category: "Lehnga Rental", icon: ShoppingBag, count: 64, type: 'rentals' },
    { name: "Catering", category: "Catering", icon: Utensils, count: 83, type: 'gigs' },
    { name: "Entertainment", category: "Entertainment", icon: Music, count: 89, type: 'gigs' },
    { name: "Digital Displays", category: "Digital Displays", icon: Tv, count: 245, type: 'rentals' },
    { name: "Transport", category: "Transport", icon: Car, count: 53, type: 'rentals' }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    item.type === 'both' || item.type === activeMode
  )

  return (
    <div className="w-full flex flex-col py-6 px-4 min-h-full justify-between">
      
      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const active = activeCategory === item.category
          return (
            <button
              key={item.name}
              onClick={() => setActiveCategory(item.category)}
              className={`w-full py-2.5 px-4 rounded-full flex items-center gap-3 transition-colors text-sm font-medium text-left cursor-pointer ${
                active 
                  ? 'bg-[#447A5A] text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
              <span className="flex-1 truncate">{item.name}</span>
              {item.count !== null && (
                <span className={`text-xs ${active ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {item.count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* QUICK MATCH Box */}
      <div className="mt-8 bg-[#F0EBE1] border border-[#E1DAC9] rounded-xl p-5 space-y-4">
        <h4 className="font-bold text-slate-800 text-sm tracking-tight uppercase">
          *QUICK MATCH*
        </h4>
        <p className="text-xs text-slate-600 leading-snug">
          Quickly post your requirements to find out your pro match.
        </p>
        <input 
          type="text" 
          placeholder="Enter your requirement..." 
          className="w-full h-10 px-3 text-xs bg-white border border-[#D5CFC0] rounded-md outline-none focus:border-[#447A5A]"
        />
        <button 
          onClick={() => alert("Quick Match Request Submitted!")}
          className="w-full bg-[#1B3B2B] hover:bg-[#132A1E] text-white py-2.5 rounded-md font-bold text-sm transition-colors cursor-pointer shadow-sm"
        >
          Post Now
        </button>
      </div>

    </div>
  )
}

