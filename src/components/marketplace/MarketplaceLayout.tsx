"use client"

import React, { useState } from 'react'
import { Search, ShieldCheck } from 'lucide-react'
import { MarketplaceSidebar } from './MarketplaceSidebar'
import { ContentGrid } from './ContentGrid'
import { HybridDetailDrawer, HybridDetailItem } from './HybridDetailDrawer'
import { EscrowTrackerHub, EscrowContract } from './EscrowTrackerHub'
import { FavoritesTray } from './FavoritesTray'

export function MarketplaceLayout() {
  const [activeMode, setActiveMode] = useState<'gigs' | 'rentals'>('gigs')
  const [activeCategory, setActiveCategory] = useState("All")
  const [compareList, setCompareList] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  
  // New States for Hybrid Experience
  const [selectedItem, setSelectedItem] = useState<HybridDetailItem | null>(null)
  const [isEscrowOpen, setIsEscrowOpen] = useState(false)
  const [contracts, setContracts] = useState<EscrowContract[]>([
    {
      id: "sample-1",
      itemName: "Usman Ali Photography",
      category: "Photography",
      price: 75000,
      type: "gig",
      selectedTier: "Standard",
      requirements: "Event Vibe: Traditional Mughal. Seating count: 250 guests. Focus: Bride entry shots.",
      status: "Escrowed"
    }
  ])

  const getCategoryHeading = (cat: string) => {
    if (cat === "All") {
      return activeMode === 'gigs' ? "Elite Pakistan Creative Gigs" : "Top Wedding Venues & Rentals"
    }
    if (cat === "Venues") return "Top Wedding Venues"
    if (cat === "Photography") return "Professional Photographers"
    if (cat === "Videography") return "Expert Videographers"
    if (cat === "Decorator") return "Event Decorators"
    if (cat === "Makeup Artist") return "Makeup Artists"
    if (cat === "Lehnga Rental") return "Premium Lehnga Rentals"
    if (cat === "Catering") return "Catering Services"
    if (cat === "Entertainment") return "Entertainment & Music"
    if (cat === "Digital Displays") return "Digital Display Services"
    if (cat === "Transport") return "Transport Services"
    return `Elite ${cat} Professionals`
  }

  const handleBookingSubmit = (details: {
    itemId: string
    itemName: string
    category: string
    price: number
    type: 'rental' | 'gig'
    selectedTier?: 'Basic' | 'Standard' | 'Premium'
    startDate?: string
    endDate?: string
    seatingConfig?: string
    guestCount?: string
    requirements?: string
  }) => {
    const newContract: EscrowContract = {
      id: `contract-${Date.now()}`,
      itemName: details.itemName,
      category: details.category,
      price: details.price,
      type: details.type,
      selectedTier: details.selectedTier,
      startDate: details.startDate,
      endDate: details.endDate,
      seatingConfig: details.seatingConfig,
      guestCount: details.guestCount,
      requirements: details.requirements,
      status: 'Requirements'
    }
    setContracts(prev => [newContract, ...prev])
    setIsEscrowOpen(true)
  }

  const handleUpdateStatus = (id: string, newStatus: EscrowContract['status']) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
  }

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* Left Sidebar Pane */}
      <aside className="w-[260px] lg:w-[280px] shrink-0 bg-[#FAF7F2] border-r border-[#E6E2DA]">
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Spacer to prevent content from scrolling under the global header */}
          <div className="h-20 shrink-0 pointer-events-none"></div>
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <MarketplaceSidebar 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              activeMode={activeMode}
            />
          </div>
        </div>
      </aside>

      {/* Right Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative pb-16 pt-20">
        
        {/* Dual Mode Switcher Banner */}
        <div className="px-6 pt-6">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl max-w-lg shadow-3xs border border-slate-200">
            <button
              onClick={() => {
                setActiveMode('gigs');
                setActiveCategory('All');
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeMode === 'gigs' 
                  ? 'bg-[#0F5B3E] text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              💼 Creative Gigs (Fiverr)
            </button>
            <button
              onClick={() => {
                setActiveMode('rentals');
                setActiveCategory('All');
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeMode === 'rentals' 
                  ? 'bg-[#0F5B3E] text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🏡 Spaces & Rentals (Airbnb)
            </button>
          </div>
        </div>

        {/* Top Search Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="w-full relative flex items-center bg-white rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-[#447A5A]/20 focus-within:border-[#447A5A] transition-all px-4 h-12 shadow-sm">
            <Search className="w-4.5 h-4.5 text-slate-400 mr-3 shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeMode === 'gigs' ? "Describe creative requirements (e.g., 'photographer for Mehndi')..." : "Search rentals or marquees (e.g., 'farmhouse in Bedian road')..."}
              className="w-full bg-transparent border-none text-sm text-slate-800 placeholder-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-6 pb-8 space-y-4">
          
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">
              {getCategoryHeading(activeCategory)}
            </h2>
          </div>

          <ContentGrid 
            activeCategory={activeCategory} 
            compareList={compareList} 
            setCompareList={setCompareList}
            searchQuery={searchQuery}
            activeMode={activeMode}
            onItemSelect={(item) => setSelectedItem(item as any)}
          />
        </main>

        {/* Floating Escrow Tracker Hub Trigger */}
        <button
          onClick={() => setIsEscrowOpen(true)}
          className="fixed bottom-16 right-6 z-50 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-emerald-500/20 cursor-pointer hover:scale-105 transition-transform"
        >
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          Escrow Hub ({contracts.filter(c => c.status !== 'Released').length} Active)
        </button>

        {/* Footer Metrics Banner */}
        <div className="fixed bottom-0 left-[280px] right-0 h-12 bg-[#2D5640] text-white flex items-center justify-between px-6 z-40 border-t border-[#1C3E2B]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
              <span className="text-sm font-semibold">15,000+ <span className="font-normal opacity-90">Verified Specialists</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg leading-none">★</span>
              <span className="text-sm font-semibold">4.8/5 <span className="font-normal opacity-90">Average Rating</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white/20 rounded text-[10px] flex items-center justify-center font-bold">🛡️</div>
              <span className="text-sm font-normal opacity-90">Escrow Safeguards Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-90 mr-2">Media:</span>
            <div className="flex items-center gap-3 opacity-90">
              {/* Media Logos Placeholders */}
              <div className="h-6 w-12 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">ARY</div>
              <div className="h-6 w-16 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">SAMAA</div>
              <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">PTV</div>
              <div className="h-6 w-14 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">GEO</div>
            </div>
          </div>
        </div>

      </div>

      {/* Slide-over Drawers */}
      <HybridDetailDrawer 
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        onBookingSubmit={handleBookingSubmit}
      />

      <EscrowTrackerHub 
        isOpen={isEscrowOpen}
        onClose={() => setIsEscrowOpen(false)}
        contracts={contracts}
        onUpdateStatus={handleUpdateStatus}
      />

      <FavoritesTray />

    </div>
  )
}

