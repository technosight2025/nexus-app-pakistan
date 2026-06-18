"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, PlayCircle, Clock, MessageSquare, MoreVertical, Link2, Download } from "lucide-react"

export default function VideoReviewsPage() {
  const videos = [
    {
      id: "VID-001",
      title: "Ali & Fatima - Cinematic Highlights",
      client: "Ali Raza",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600",
      status: "Revisions Requested",
      statusColor: "bg-orange-500",
      version: "v2",
      duration: "04:32",
      comments: 3,
      lastUpdated: "2 hours ago"
    },
    {
      id: "VID-002",
      title: "TechCorp Annual Gala - Main Event",
      client: "Sarah Khan",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600",
      status: "Approved",
      statusColor: "bg-green-500",
      version: "v1",
      duration: "45:10",
      comments: 0,
      lastUpdated: "1 day ago"
    },
    {
      id: "VID-003",
      title: "Hassan & Zainab - Mehndi Teaser",
      client: "Hassan Family",
      thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600",
      status: "Pending Review",
      statusColor: "bg-blue-500",
      version: "v1",
      duration: "01:15",
      comments: 0,
      lastUpdated: "15 mins ago"
    },
    {
      id: "VID-004",
      title: "Zainab Engagement - Full Video",
      client: "Zainab Ali",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600",
      status: "Rendering",
      statusColor: "bg-purple-500 animate-pulse",
      version: "v3",
      duration: "00:00",
      comments: 5,
      lastUpdated: "Just now"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Video Reviews
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Share videos with clients, track frame-accurate feedback, and manage revisions.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload Video
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search videos..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="px-4 py-2 bg-gray-900 dark:bg-white/10 text-white rounded-full text-xs font-bold shadow-md border border-transparent dark:border-white/20">All Videos</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white transition-colors">Needs Action</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white transition-colors">Approved</button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="p-0 border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all overflow-hidden group flex flex-col h-full">
            
            {/* Video Thumbnail Area */}
            <div className="relative h-56 w-full bg-gray-900 overflow-hidden cursor-pointer">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <div className={`w-2 h-2 rounded-full ${video.statusColor}`}></div>
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">{video.status}</span>
                </div>
              </div>
              
              {/* Top Right Options */}
              <div className="absolute top-4 right-4">
                <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex gap-2 text-white">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold font-mono">
                    {video.duration}
                  </span>
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-gray-300">
                    {video.version}
                  </span>
                </div>
                {video.comments > 0 && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white bg-orange-500/90 backdrop-blur-md px-2.5 py-1 rounded-md shadow-lg shadow-orange-500/20">
                    <MessageSquare className="w-3.5 h-3.5" /> {video.comments} Notes
                  </div>
                )}
              </div>
            </div>

            {/* Details Area */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-1">{video.title}</h3>
              <p className="text-sm font-semibold text-[#0A3B2A] dark:text-cyan-400 mb-4">{video.client}</p>

              <div className="mt-auto space-y-4">
                <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {video.lastUpdated}
                  </span>
                  <span>ID: {video.id}</span>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex gap-2">
                  <button className="flex-1 py-2 bg-[#0A3B2A]/5 hover:bg-[#0A3B2A]/10 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-[#0A3B2A] dark:text-cyan-400 rounded-lg text-xs font-bold transition-colors flex justify-center items-center gap-2">
                    Open Review Room
                  </button>
                  <button className="px-3 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white rounded-lg transition-colors flex justify-center items-center" title="Copy Link">
                    <Link2 className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-white rounded-lg transition-colors flex justify-center items-center" title="Download Source">
                    <Download className="w-4 h-4" />
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
