"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Star, ShieldCheck, MapPin, CheckCircle2, 
  MessageSquare, Phone, Calendar, Image as ImageIcon, 
  CheckSquare, Send, Check, Play, Film, Filter
} from "lucide-react"
import Link from "next/link"

interface VendorWorkspaceProps {
  vendorId: string
}

type ProofType = "image" | "video"

interface Proof {
  id: string
  url: string
  type: ProofType
  selected: boolean
  duration?: string
}

// Generate mock data with some videos
const MOCK_PROOFS: Proof[] = Array.from({ length: 24 }).map((_, i) => {
  const isVideo = i % 5 === 0; // Every 5th item is a video
  return {
    id: `p-${i}`,
    url: isVideo 
      ? `https://images.unsplash.com/photo-${1550000000000 + i}?q=80&w=400` // Using images as thumbnails for videos
      : `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=400`,
    type: isVideo ? "video" : "image",
    selected: false,
    duration: isVideo ? `0:${Math.floor(Math.random() * 40 + 15)}` : undefined
  }
})

export function VendorWorkspace({ vendorId }: VendorWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "proofing">("proofing")
  const [proofs, setProofs] = useState<Proof[]>(MOCK_PROOFS)
  const [filter, setFilter] = useState<"all" | "images" | "videos">("all")
  
  const maxSelections = 150

  const selectedCount = proofs.filter(p => p.selected).length

  const toggleSelection = (id: string) => {
    setProofs(prev => prev.map(p => {
      if (p.id === id) {
        if (!p.selected && selectedCount >= maxSelections) return p
        return { ...p, selected: !p.selected }
      }
      return p
    }))
  }

  const filteredProofs = proofs.filter(p => {
    if (filter === "all") return true
    if (filter === "images") return p.type === "image"
    if (filter === "videos") return p.type === "video"
    return true
  })

  // Simulate Luxe Studios
  const vendor = {
    name: "Luxe Studios",
    category: "Photography & Cinematography",
    rating: 5.0,
    reviews: 89,
    location: "DHA Phase 5, Lahore",
    status: "confirmed",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800"
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* 🌟 Header & Navigation */}
      <div className="flex items-center gap-4 text-slate-500 mb-2">
        <Link href="/dashboard/host/v2/vendor-hub" className="hover:text-[#0A3B2A] transition-colors flex items-center gap-1.5 font-bold text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Vendor Hub
        </Link>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A3B2A]/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
            <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-[#BE185D]/10 text-[#BE185D] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {vendor.category}
              </span>
              {vendor.status === "confirmed" && (
                <span className="bg-[#25D366]/10 text-[#25D366] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Hired
                </span>
              )}
            </div>
            <h1 className="text-[32px] font-black font-poppins text-[#0A3B2A] tracking-tight leading-none mb-2">
              {vendor.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vendor.location}</span>
              <span className="flex items-center gap-1 text-[#F59E0B]">
                <Star className="w-4 h-4 fill-current" /> {vendor.rating} <span className="text-slate-500">({vendor.reviews})</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-white border border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-2xl shadow-sm hover:border-[#0A3B2A] hover:text-[#0A3B2A] transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" /> Message
          </button>
          <button className="flex-1 md:flex-none bg-[#0A3B2A] text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:bg-[#0A3B2A]/90 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> Call
          </button>
        </div>
      </div>

      {/* 🌟 Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-2 text-[15px] font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "overview" ? "border-[#0A3B2A] text-[#0A3B2A]" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Calendar className="w-4 h-4" /> Overview
        </button>
        <button 
          onClick={() => setActiveTab("proofing")}
          className={`pb-3 px-2 text-[15px] font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === "proofing" ? "border-[#0A3B2A] text-[#0A3B2A]" : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <CheckSquare className="w-4 h-4" /> Studio Proofing Gallery
          <span className="bg-[#BE185D] text-white text-[10px] px-2 py-0.5 rounded-full ml-1">New</span>
        </button>
      </div>

      {/* 🌟 Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "proofing" && (
          <motion.div 
            key="proofing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Proofing Header */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 z-20">
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A3B2A]">Mehndi Raw Edits & Clips</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Please select up to {maxSelections} media items (photos & videos) for final retouching.
                </p>
                
                {/* Media Filters */}
                <div className="flex items-center gap-2 mt-4">
                  <Filter className="w-4 h-4 text-slate-400 mr-1" />
                  <button 
                    onClick={() => setFilter("all")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${filter === "all" ? "bg-[#0A3B2A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    All Media
                  </button>
                  <button 
                    onClick={() => setFilter("images")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${filter === "images" ? "bg-[#0A3B2A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    <ImageIcon className="w-3 h-3" /> Photos
                  </button>
                  <button 
                    onClick={() => setFilter("videos")}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${filter === "videos" ? "bg-[#0A3B2A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    <Film className="w-3 h-3" /> Videos
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selected</p>
                  <p className="text-xl font-black font-poppins text-[#0A3B2A]">
                    {selectedCount} <span className="text-sm text-slate-400 font-medium">/ {maxSelections}</span>
                  </p>
                </div>
                <button 
                  className={`py-3 px-6 rounded-2xl font-bold shadow-md transition-all flex items-center gap-2 ${
                    selectedCount > 0 
                      ? "bg-[#0A3B2A] text-white hover:bg-[#0A3B2A]/90" 
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" /> Send Selections
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#BE185D] transition-all duration-300"
                style={{ width: `${(selectedCount / maxSelections) * 100}%` }}
              />
            </div>

            {/* Proofing Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProofs.map((proof) => (
                <div 
                  key={proof.id}
                  onClick={() => toggleSelection(proof.id)}
                  className={`group relative aspect-[4/5] rounded-[16px] overflow-hidden cursor-pointer border-4 transition-all duration-300 bg-slate-900 ${
                    proof.selected ? "border-[#BE185D] shadow-lg scale-[0.98]" : "border-transparent shadow-sm hover:shadow-md"
                  }`}
                >
                  <img 
                    src={proof.url} 
                    alt="Proof" 
                    className={`w-full h-full object-cover transition-all duration-500 ${proof.selected ? "scale-105 opacity-80" : "opacity-90 group-hover:scale-105 group-hover:opacity-100"}`}
                  />
                  
                  {/* Video Overlay Indicator */}
                  {proof.type === "video" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-[#BE185D]/80 group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Watermark Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <span className="text-white font-black text-2xl rotate-[-30deg] tracking-widest drop-shadow-lg">
                      LUXE STUDIOS
                    </span>
                  </div>

                  {/* Selection Checkbox */}
                  <div className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
                    proof.selected ? "bg-[#BE185D] text-white" : "bg-white/50 backdrop-blur-sm text-slate-800 group-hover:bg-white"
                  }`}>
                    {proof.selected ? <Check className="w-5 h-5" /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
                  </div>

                  {/* Media Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between z-10">
                    <p className="text-white text-xs font-bold font-mono drop-shadow-md">
                      {proof.type === "video" ? "VID" : "IMG"}_{proof.id.split('-')[1].padStart(4, '0')}
                    </p>
                    {proof.type === "video" && (
                      <span className="text-white/90 text-[10px] font-bold bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        {proof.duration}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredProofs.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500 font-medium">
                  No media found for the selected filter.
                </div>
              )}
            </div>

          </motion.div>
        )}

        {activeTab === "overview" && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-slate-100"
          >
            <div className="w-20 h-20 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#0A3B2A]">
              <Calendar className="w-10 h-10" />
            </div>
            <h2 className="text-[28px] font-black font-poppins text-[#1A1A1A] mb-4">Vendor Overview</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">
              This space contains contract details, payment schedules, and communication history.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
