"use client"

import { useState } from "react"
import { Heart, Download, Share2, Filter, X, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomerPhotos() {
  const [activeTab, setActiveTab] = useState("All Photos")
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [photoList, setPhotoList] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", liked: true, category: "Baraat" },
    { id: 2, url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop", liked: false, category: "Mehndi" },
    { id: 3, url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", liked: true, category: "Baraat" },
    { id: 4, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop", liked: false, category: "Mehndi" },
    { id: 5, url: "https://images.unsplash.com/photo-1530103862676-de8892ebeea6?q=80&w=800&auto=format&fit=crop", liked: false, category: "Mehndi" },
    { id: 6, url: "https://images.unsplash.com/photo-1506869640319-ce1a188bb36b?q=80&w=800&auto=format&fit=crop", liked: true, category: "Baraat" },
  ])
  
  const tabs = ["All Photos", "Shortlisted", "Mehndi", "Baraat"]

  const toggleLike = (id: number) => {
    setPhotoList(prev => prev.map(photo => 
      photo.id === id ? { ...photo, liked: !photo.liked } : photo
    ))
  }

  // Filter based on selected tabs
  const filteredPhotos = photoList.filter(photo => {
    if (activeTab === "All Photos") return true
    if (activeTab === "Shortlisted") return photo.liked
    return photo.category === activeTab
  })

  const likedCount = photoList.filter(p => p.liked).length

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">The Memory Gallery</h2>
          <p className="text-slate-500 font-medium">Shortlist your favorite photos for the final print album.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
          <div className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all">
            <Heart className="w-4 h-4 fill-rose-600 animate-pulse" />
            {likedCount} / 100 Selected
          </div>
          <Button 
            onClick={() => setIsSubmitOpen(true)}
            disabled={likedCount === 0}
            className="bg-slate-900 text-white hover:bg-[#0F5B3E] rounded-xl font-bold transition-colors cursor-pointer"
          >
            Submit Selection
          </Button>
        </div>
      </div>

      {/* Tabs and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-amber-100 text-amber-700 shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-slate-200 text-slate-600 rounded-xl font-bold flex-1 sm:flex-none cursor-pointer">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" className="border-slate-200 text-slate-600 rounded-xl font-bold flex-1 sm:flex-none cursor-pointer">
            <Share2 className="w-4 h-4 mr-2" /> Share Gallery
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="relative group rounded-3xl overflow-hidden bg-slate-100 aspect-[3/4] shadow-sm">
              <img 
                src={photo.url} 
                alt="Wedding Event" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Glassmorphic Overlay */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
                <div className="flex justify-end">
                  <Button variant="secondary" size="icon" className="bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 rounded-full cursor-pointer">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={() => toggleLike(photo.id)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xl cursor-pointer ${
                      photo.liked ? "bg-rose-500 text-white" : "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${photo.liked ? "fill-white" : ""}`} />
                  </button>
                </div>
                
                <div className="text-center text-white/80 text-xs font-mono">
                  IMG_{1000 + photo.id}.jpg
                </div>
              </div>

              {/* Permanent Like Indicator if liked */}
              {photo.liked && (
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center shadow-lg group-hover:opacity-0 transition-opacity z-20">
                  <Heart className="w-4 h-4 fill-white text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
          <p className="font-semibold text-lg">No photos found in this category.</p>
          <p className="text-sm font-medium mt-1">Shortlist photos to see them here.</p>
        </div>
      )}

      {/* Success Dialog Modal */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden border border-slate-100 shadow-2xl p-8 relative text-center animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsSubmitOpen(false)}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors absolute top-4 right-4"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6 shadow-inner">
              <CheckCircle className="w-10 h-10 fill-emerald-500/10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Selection Submitted!</h3>
            <p className="text-slate-500 text-sm font-semibold mb-6">
              You have shortlisted <strong className="text-slate-800">{likedCount} photos</strong>. Your dedicated photographer at <strong className="text-slate-800">Nexus Studios</strong> has been notified and will prepare the print layout.
            </p>

            <Button 
              onClick={() => setIsSubmitOpen(false)}
              className="w-full bg-slate-900 hover:bg-[#0F5B3E] text-white rounded-xl font-bold py-3 shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-white" /> Great, Thanks!
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
