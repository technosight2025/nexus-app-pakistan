"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  HeartHandshake, Plus, Search, Link as LinkIcon, 
  Copy, CheckCircle2, ChevronLeft, Download, 
  Heart, Image as ImageIcon, Filter, Settings2, X
} from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryStatus = "Awaiting Client" | "In Progress" | "Completed"

interface SelectionGallery {
  id: string
  name: string
  clientName: string
  status: GalleryStatus
  totalPhotos: number
  selectedCount: number
  limit?: number
  sentDate: string
  lastActive: string
  coverImage: string
  photos: Photo[]
}

interface Photo {
  id: string
  url: string
  isSelected: boolean
  filename: string
}

// Generate some mock photos
const generateMockPhotos = (count: number, selectedCount: number): Photo[] => {
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop"
  ]
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `IMG_${1000 + i}`,
    url: images[i % images.length],
    isSelected: i < selectedCount,
    filename: `ALI_SARA_WEDDING_${1000 + i}.raw`
  }))
}

const INITIAL_GALLERIES: SelectionGallery[] = [
  {
    id: "GAL-001",
    name: "Ali & Sara Wedding",
    clientName: "Ali Raza",
    status: "Completed",
    totalPhotos: 450,
    selectedCount: 150,
    limit: 150,
    sentDate: "Oct 10, 2023",
    lastActive: "Today at 2:30 PM",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
    photos: generateMockPhotos(20, 15) // Just a subset for demo
  },
  {
    id: "GAL-002",
    name: "Zainab's Mehndi",
    clientName: "Zainab Ahmed",
    status: "In Progress",
    totalPhotos: 200,
    selectedCount: 120,
    limit: 150,
    sentDate: "Oct 15, 2023",
    lastActive: "Yesterday",
    coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400&auto=format&fit=crop",
    photos: generateMockPhotos(20, 12)
  },
  {
    id: "GAL-003",
    name: "TechCorp Annual Gala",
    clientName: "TechCorp Inc.",
    status: "Awaiting Client",
    totalPhotos: 800,
    selectedCount: 0,
    sentDate: "Oct 20, 2023",
    lastActive: "Never",
    coverImage: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=400&auto=format&fit=crop",
    photos: generateMockPhotos(20, 0)
  }
]

export function PhotoSelectionView() {
  const [galleries, setGalleries] = useState<SelectionGallery[]>(INITIAL_GALLERIES)
  const [activeGallery, setActiveGallery] = useState<SelectionGallery | null>(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMode, setFilterMode] = useState<"All" | "Selected" | "Unselected">("All")
  
  // Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [newGalleryForm, setNewGalleryForm] = useState({ name: "", clientName: "", limit: "" })

  const handleCreateGallery = () => {
    if (!newGalleryForm.name || !newGalleryForm.clientName) return
    const newGal: SelectionGallery = {
      id: `GAL-${Math.floor(Math.random() * 1000)}`,
      name: newGalleryForm.name,
      clientName: newGalleryForm.clientName,
      status: "Awaiting Client",
      totalPhotos: 0,
      selectedCount: 0,
      limit: parseInt(newGalleryForm.limit) || undefined,
      sentDate: "Just now",
      lastActive: "Never",
      coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=400&auto=format&fit=crop",
      photos: []
    }
    setGalleries([newGal, ...galleries])
    setIsNewModalOpen(false)
    setNewGalleryForm({ name: "", clientName: "", limit: "" })
  }

  // Active Gallery View rendering
  if (activeGallery) {
    const displayedPhotos = activeGallery.photos.filter(p => {
      if (filterMode === "Selected") return p.isSelected
      if (filterMode === "Unselected") return !p.isSelected
      return true
    })

    return (
      <div className="space-y-6 w-full animate-in fade-in slide-in-from-right-4 duration-500">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setActiveGallery(null)} className="rounded-full bg-slate-50 hover:bg-slate-100 shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">{activeGallery.name}</h1>
              <p className="text-sm font-medium text-slate-500">Client: {activeGallery.clientName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm shrink-0">
              <Heart className="w-4 h-4 fill-rose-600" />
              {activeGallery.selectedCount} {activeGallery.limit ? `/ ${activeGallery.limit}` : ''} Selected
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm shrink-0">
              <Download className="w-4 h-4 mr-2" /> Download List
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setFilterMode("All")}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${filterMode === "All" ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              All Photos
            </button>
            <button 
              onClick={() => setFilterMode("Selected")}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${filterMode === "Selected" ? 'bg-rose-50 text-rose-600' : 'text-slate-500 hover:text-rose-600'}`}
            >
              <Heart className={`w-4 h-4 ${filterMode === "Selected" ? 'fill-rose-600' : ''}`} /> Selected
            </button>
            <button 
              onClick={() => setFilterMode("Unselected")}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${filterMode === "Unselected" ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Unselected
            </button>
          </div>
          
          <div className="relative w-full sm:max-w-xs shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search filename..." 
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm"
            />
          </div>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {displayedPhotos.map((photo) => (
            <div key={photo.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
              <img src={photo.url} alt={photo.filename} className="w-full h-auto object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-mono font-bold text-white drop-shadow-md truncate pr-2">{photo.filename}</p>
              </div>

              {/* Heart Badge */}
              {photo.isSelected && (
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Main Galleries Overview
  const filteredGalleries = galleries.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.clientName.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <HeartHandshake className="w-8 h-8 text-rose-400" /> Photo Selection
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">Send galleries to clients so they can effortlessly pick their favorite photos for the final album or edits.</p>
        </div>
        
        <Button onClick={() => setIsNewModalOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0 relative z-10">
          <Plus className="w-4 h-4 mr-2" /> New Selection Link
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search galleries or clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200 bg-white shadow-sm font-bold text-slate-600">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGalleries.map((gallery) => {
          const progressPercentage = gallery.totalPhotos > 0 
            ? Math.min(100, (gallery.selectedCount / (gallery.limit || gallery.totalPhotos)) * 100) 
            : 0

          return (
            <div 
              key={gallery.id} 
              onClick={() => setActiveGallery(gallery)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
            >
              {/* Cover Image */}
              <div className="h-40 relative bg-slate-100 overflow-hidden">
                <img src={gallery.coverImage} alt={gallery.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-black text-white text-lg truncate drop-shadow-md">{gallery.name}</h3>
                  <p className="text-xs font-bold text-slate-300 truncate">{gallery.clientName}</p>
                </div>

                <div className="absolute top-4 right-4">
                  {gallery.status === "Completed" && (
                    <span className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  )}
                  {gallery.status === "In Progress" && (
                    <span className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Settings2 className="w-3 h-3" /> In Progress
                    </span>
                  )}
                  {gallery.status === "Awaiting Client" && (
                    <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-slate-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      <Clock className="w-3 h-3" /> Awaiting
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-500">Selections</span>
                  <span className="font-black text-rose-600 flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-rose-600" />
                    {gallery.selectedCount} <span className="text-slate-400 font-medium text-xs">/ {gallery.limit ? gallery.limit : gallery.totalPhotos}</span>
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${gallery.status === 'Completed' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1 hover:text-slate-700 transition-colors" onClick={(e) => { e.stopPropagation(); /* mock copy link */ }}>
                    <LinkIcon className="w-3 h-3" /> Copy Link
                  </span>
                  <span>Active: {gallery.lastActive}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* New Link Modal */}
      <AnimatePresence>
        {isNewModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsNewModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-primary" /> Create Selection Link
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsNewModalOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gallery Name</label>
                  <input 
                    type="text" value={newGalleryForm.name} onChange={e => setNewGalleryForm({...newGalleryForm, name: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. Wedding Main Event"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                  <input 
                    type="text" value={newGalleryForm.clientName} onChange={e => setNewGalleryForm({...newGalleryForm, clientName: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. Ali & Sara"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                    Selection Limit <span className="text-slate-400 font-medium normal-case">(Optional)</span>
                  </label>
                  <input 
                    type="number" value={newGalleryForm.limit} onChange={e => setNewGalleryForm({...newGalleryForm, limit: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    placeholder="e.g. 150"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Set a limit if the client's package only includes a specific number of edits or album pages.
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsNewModalOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handleCreateGallery} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-sm font-bold">
                  Generate Link
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
