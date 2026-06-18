"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, Image as ImageIcon, Video, Lock, Globe, MoreVertical, Link2 } from "lucide-react"

export default function StudioAlbumsPage() {
  const albums = [
    {
      id: "ALB-001",
      title: "Ali & Fatima - The Wedding",
      client: "Ali Raza",
      cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600",
      stats: { photos: 450, videos: 3 },
      status: "Published",
      access: "Password Protected",
      views: 124,
      date: "Oct 15, 2026"
    },
    {
      id: "ALB-002",
      title: "TechCorp Annual Gala",
      client: "Sarah Khan",
      cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600",
      stats: { photos: 120, videos: 1 },
      status: "Draft",
      access: "Public Link",
      views: 0,
      date: "Oct 18, 2026"
    },
    {
      id: "ALB-003",
      title: "Hassan & Zainab Mehndi",
      client: "Hassan Family",
      cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600",
      stats: { photos: 300, videos: 2 },
      status: "Published",
      access: "Password Protected",
      views: 56,
      date: "Oct 05, 2026"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Client Albums
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage digital deliverables, galleries, and client portals.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Album
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search albums..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="px-4 py-2 bg-gray-900 dark:bg-white/10 text-white rounded-full text-xs font-bold shadow-md border border-transparent dark:border-white/20">All Albums</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white">Published</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white">Drafts</button>
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Card key={album.id} className="p-0 border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all overflow-hidden group cursor-pointer flex flex-col h-full">
            
            {/* Cover Image Area */}
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
              <img 
                src={album.cover} 
                alt={album.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute top-4 left-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${
                  album.status === 'Published' ? 'bg-green-500/90 text-white' : 'bg-white/90 dark:bg-black/50 dark:text-gray-200 text-gray-800'
                }`}>
                  {album.status}
                </span>
              </div>
              
              <div className="absolute top-4 right-4">
                <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex gap-2 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-semibold backdrop-blur-md bg-black/30 px-2 py-1 rounded-md">
                    <ImageIcon className="w-3.5 h-3.5" /> {album.stats.photos}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold backdrop-blur-md bg-black/30 px-2 py-1 rounded-md">
                    <Video className="w-3.5 h-3.5" /> {album.stats.videos}
                  </div>
                </div>
              </div>
            </div>

            {/* Details Area */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{album.title}</h3>
              <p className="text-sm font-semibold text-[#0A3B2A] dark:text-cyan-400 mb-4">{album.client}</p>

              <div className="mt-auto space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    {album.access === 'Password Protected' ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    {album.access}
                  </span>
                  <span className="text-gray-900 dark:text-gray-300 font-bold">{album.views} views</span>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex gap-2">
                  <button className="flex-1 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-2">
                    Manage Media
                  </button>
                  <button className="px-3 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white rounded-lg transition-colors flex justify-center items-center" title="Copy Link">
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </Card>
        ))}
      </div>

    </div>
  )
}
