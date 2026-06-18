"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Image as ImageIcon, Share2, QrCode, Upload, CheckCircle2, 
  XCircle, Filter, Heart, Download
} from "lucide-react"

export function MemoriesTab({ eventId }: { eventId?: string }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved'>('all')

  const MOCK_PHOTOS = [
    { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600", uploader: "Zainab A.", status: "approved", likes: 24, time: "2h ago" },
    { id: 2, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600", uploader: "Ali Khan", status: "pending", likes: 0, time: "3h ago" },
    { id: 3, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600", uploader: "Ayesha T.", status: "approved", likes: 56, time: "5h ago" },
    { id: 4, src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600", uploader: "Studio Team", status: "approved", likes: 102, time: "1d ago" },
    { id: 5, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600", uploader: "Hamza M.", status: "pending", likes: 0, time: "Just now" },
  ]

  const filteredPhotos = MOCK_PHOTOS.filter(p => activeFilter === 'all' || p.status === activeFilter)

  return (
    <div className="space-y-6">
      
      {/* 🌟 Header & Actions 🌟 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-blue-500" /> Event Memories
          </h2>
          <p className="text-sm font-medium text-slate-500">Collect, approve, and share photos from all your guests.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 transition-colors">
            <QrCode className="w-4 h-4" /> Guest Upload Link
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md border border-blue-500 text-sm font-bold text-white transition-colors">
            <Share2 className="w-4 h-4" /> Share Gallery
          </button>
        </div>
      </div>

      {/* 🌟 Filter & Stats 🌟 */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === 'all' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            All Photos
          </button>
          <button 
            onClick={() => setActiveFilter('approved')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === 'approved' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeFilter === 'pending' ? 'bg-amber-50 text-amber-700 shadow-sm flex items-center gap-1.5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 flex items-center gap-1.5'}`}
          >
            Pending Review <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </button>
        </div>
        
        <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4 text-sm font-medium text-slate-600 mr-2">
          <div className="flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-slate-400" /> 128 Total
          </div>
          <div className="w-px h-4 bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" /> 842 Likes
          </div>
        </div>
      </div>

      {/* 🌟 Masonry Gallery 🌟 */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo) => (
          <motion.div 
            key={photo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm"
          >
            <img src={photo.src} alt="Memory" className="w-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Overlay Controls */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md
                  ${photo.status === 'approved' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'}
                `}>
                  {photo.status}
                </div>
                
                <button className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Row */}
              <div>
                {photo.status === 'pending' ? (
                  <div className="flex gap-2 mb-3">
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold py-2 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                    <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-2 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 mb-2 text-white/90 text-sm font-medium">
                    <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> {photo.likes}</span>
                    <span>•</span>
                    <span>{photo.time}</span>
                  </div>
                )}
                <p className="text-white font-semibold text-sm">Uploaded by <span className="text-blue-300">{photo.uploader}</span></p>
              </div>

            </div>
          </motion.div>
        ))}

        {/* Upload Placeholder inside Masonry */}
        <div className="break-inside-avoid aspect-[3/4] border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center text-center p-6 cursor-pointer group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-black text-slate-900 mb-1">Upload Photo</h4>
          <p className="text-sm font-medium text-slate-500">Max size 20MB</p>
        </div>
      </div>

    </div>
  )
}
