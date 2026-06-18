"use client"
import { useState } from "react"
import { ChevronLeft, Check, X, Heart, MessageSquare, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Mock Data for a photo review session
const MOCK_PHOTOS = Array.from({ length: 12 }, (_, i) => ({
  id: `img-${i+1}`,
  url: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?q=80&w=800&auto=format&fit=crop`,
  // Just deterministic mock URLs based on index to look varied
  selected: i % 4 === 0,
  rejected: i === 3,
  comments: i === 0 ? 1 : 0
}))

export default function PhotoSelectionWorkflowPage() {
  const [photos, setPhotos] = useState(MOCK_PHOTOS)

  const toggleSelect = (id: string) => {
    setPhotos(photos.map(p => {
      if (p.id === id) {
        return { ...p, selected: !p.selected, rejected: false }
      }
      return p
    }))
  }

  const toggleReject = (id: string) => {
    setPhotos(photos.map(p => {
      if (p.id === id) {
        return { ...p, rejected: !p.rejected, selected: false }
      }
      return p
    }))
  }

  const selectedCount = photos.filter(p => p.selected).length
  const limit = 40 // Target selection limit

  return (
    <div className="bg-slate-900 min-h-screen -m-6 md:-m-8 flex flex-col font-sans">
      
      {/* Top Bar (Client View) */}
      <div className="h-16 bg-black border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Zainab & Ahmed's Mehndi</h1>
            <p className="text-white/50 text-xs font-medium">Please select {limit} photos for your album</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 mr-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Rejected</span>
            </div>
          </div>
          
          <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
            <Share2 className="w-4 h-4 mr-2" /> Share Link
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            Submit Selection ({selectedCount}/{limit})
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10 w-full relative">
        <div 
          className={`absolute top-0 left-0 h-full transition-all duration-500 ${selectedCount >= limit ? 'bg-emerald-500' : 'bg-blue-500'}`}
          style={{ width: `${Math.min((selectedCount / limit) * 100, 100)}%` }}
        />
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {photos.map((photo, i) => (
            <div 
              key={photo.id} 
              className={`relative aspect-[3/4] rounded-xl overflow-hidden group transition-all duration-300
                ${photo.selected ? 'ring-4 ring-emerald-500 scale-[0.98]' : ''}
                ${photo.rejected ? 'opacity-30 grayscale' : ''}
              `}
            >
              <Image 
                src={photo.selected ? MOCK_PHOTOS[0].url : MOCK_PHOTOS[1].url} // Hack to show static images for the mock
                alt={`Photo ${photo.id}`} 
                fill 
                className="object-cover"
              />
              
              {/* Overlay Actions */}
              <div className={`absolute inset-0 bg-black/40 flex flex-col justify-between p-4 transition-opacity duration-200
                ${photo.selected || photo.rejected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}>
                <div className="flex justify-between items-start">
                  <span className="text-white/90 text-xs font-black drop-shadow-md">IMG_{4050 + i}</span>
                  <button className="w-8 h-8 rounded-full bg-black/50 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {photo.comments > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />}
                  </button>
                </div>

                <div className="flex justify-center gap-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <button 
                    onClick={() => toggleReject(photo.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all
                      ${photo.rejected ? 'bg-rose-500 text-white scale-110' : 'bg-black/50 text-white/70 hover:bg-rose-500 hover:text-white'}
                    `}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => toggleSelect(photo.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all
                      ${photo.selected ? 'bg-emerald-500 text-white scale-110' : 'bg-black/50 text-white/70 hover:bg-emerald-500 hover:text-white'}
                    `}
                  >
                    <Heart className={`w-5 h-5 ${photo.selected ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>
              
              {/* Status Indicator Icon (Always visible if selected/rejected) */}
              {(photo.selected || photo.rejected) && (
                <div className="absolute top-4 left-4 pointer-events-none">
                  {photo.selected && (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {photo.rejected && (
                    <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}
