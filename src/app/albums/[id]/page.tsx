"use client"

import { useState, useEffect } from "react"
import { Download, Share2, Play, Grid, Film, Heart } from "lucide-react"

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState<'all' | 'highlights' | 'mehndi' | 'baraat' | 'video'>('all')
  const [isScrolled, setIsScrolled] = useState(false)

  // Mock Album Data
  const album = {
    title: "Ali & Fatima",
    subtitle: "The Wedding Story",
    date: "October 12-14, 2026",
    coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000",
    studioName: "NEXUS Studios",
  }

  // Mock Gallery Photos
  const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", category: "highlights", span: "col-span-2 row-span-2" },
    { id: 2, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", category: "mehndi", span: "col-span-1 row-span-1" },
    { id: 3, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", category: "baraat", span: "col-span-1 row-span-2" },
    { id: 4, url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800", category: "mehndi", span: "col-span-1 row-span-1" },
    { id: 5, url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800", category: "baraat", span: "col-span-2 row-span-1" },
    { id: 6, url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800", category: "highlights", span: "col-span-1 row-span-1" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black min-h-screen text-white">
      
      {/* Floating Action Bar (Appears on Scroll) */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div className="font-bold tracking-widest uppercase text-sm">
            {album.title}
          </div>
          <div className="flex gap-4">
            <button className="text-white/70 hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={album.coverUrl} 
            alt="Cover" 
            className="w-full h-full object-cover object-center scale-105 animate-[kenburns_20s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
          <p className="text-white/80 font-medium tracking-[0.3em] uppercase text-sm mb-6">
            {album.date}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl">
            {album.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light italic font-serif">
            {album.subtitle}
          </p>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 sticky top-[72px] z-40 bg-black/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            All Photos
          </button>
          <button 
            onClick={() => setActiveTab('highlights')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'highlights' ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            Highlights
          </button>
          <button 
            onClick={() => setActiveTab('mehndi')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'mehndi' ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            Mehndi
          </button>
          <button 
            onClick={() => setActiveTab('baraat')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'baraat' ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            Baraat
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'video' ? 'bg-white text-black' : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Film className="w-4 h-4" /> Films
          </button>
        </div>

        {/* Cinematic Film Section (Only show if 'all' or 'video' tab) */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Film className="w-6 h-6 text-white/50" /> Highlights Film
            </h2>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-2" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Masonry Photo Gallery */}
        {(activeTab !== 'video') && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {photos.filter(p => activeTab === 'all' || p.category === activeTab).map((photo) => (
              <div 
                key={photo.id} 
                className={`relative rounded-xl overflow-hidden group cursor-pointer ${photo.span}`}
              >
                <img 
                  src={photo.url} 
                  alt={`Gallery Image ${photo.id}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                      {photo.category}
                    </span>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center mt-24">
        <p className="text-white/50 text-sm font-medium">Captured with ❤️ by</p>
        <p className="text-white font-bold tracking-widest mt-2">{album.studioName}</p>
        <div className="mt-8 flex justify-center gap-6">
          <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Download All</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Share Album</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">Order Prints</a>
        </div>
      </footer>
      
      {/* Required keyframes for kenburns effect */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}} />
    </div>
  )
}
