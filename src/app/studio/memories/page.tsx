"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Camera, Image as ImageIcon, Video, QrCode, Play, Pause,
  Share2, Shield, Plus, Download, Sparkles, Check, Trash2,
  Users, Volume2
} from "lucide-react"

export default function MemoriesPage() {
  const [activeTab, setActiveTab] = useState<"archives" | "uploads" | "audio" | "access">("archives")
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null)

  // Mock albums
  const albums = [
    { id: "ALB-001", name: "Ayesha & Hamza Wedding Gala", photos: 1280, videos: 4, views: 1840, status: "Active", date: "May 25, 2025" },
    { id: "ALB-002", name: "Zainab & Usman Pre-Wedding", photos: 650, videos: 1, views: 920, status: "Active", date: "Jun 02, 2025" },
    { id: "ALB-003", name: "Sara Mehndi Event", photos: 950, videos: 3, views: 1150, status: "Private", date: "May 18, 2025" }
  ]

  // Mock guest uploads
  const guestUploads = [
    { id: "UPL-801", guest: "Zahid Khan", type: "Photo", size: "3.4 MB", date: "May 25, 2025", thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150" },
    { id: "UPL-802", guest: "Amina Shah", type: "Photo", size: "2.8 MB", date: "May 25, 2025", thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=150" },
    { id: "UPL-803", guest: "Faisal Ali", type: "Video", size: "18.2 MB", date: "May 25, 2025", thumbnail: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=150" }
  ]

  // Mock audio guestbook
  const audioNotes = [
    { id: "AUD-101", guest: "Chacha Bashir", duration: "0:45", date: "May 25, 2025", status: "Approved" },
    { id: "AUD-102", guest: "Saba (Bridesmaid)", duration: "1:12", date: "May 25, 2025", status: "Approved" },
    { id: "AUD-103", guest: "Uncle Jameel", duration: "0:30", date: "May 26, 2025", status: "Pending" }
  ]

  const toggleAudioPlay = (id: string) => {
    if (isPlayingId === id) {
      setIsPlayingId(null)
    } else {
      setIsPlayingId(id)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] dark:border-white/10 pb-5">
        <div>
          <h1 className="text-[26px] font-black text-gray-950 dark:text-white leading-tight font-serif flex items-center gap-2">
            Memories Pro <Camera className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 font-semibold">
            Deliver online photo galleries, collect guest submissions via QR code portals, and record audio guestbook voice files.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Create Gallery
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-[12px] border border-transparent dark:border-white/10 w-fit">
        <button 
          onClick={() => setActiveTab("archives")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "archives" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Album Archives
        </button>
        <button 
          onClick={() => setActiveTab("uploads")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "uploads" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Guest Uploads Inbox ({guestUploads.length})
        </button>
        <button 
          onClick={() => setActiveTab("audio")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "audio" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          QR & Audio Guestbook
        </button>
        <button 
          onClick={() => setActiveTab("access")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "access" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Family Access
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "archives" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map(album => (
            <Card key={album.id} className="bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[20px] overflow-hidden flex flex-col justify-between h-[230px] group shadow-2xs">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-[#0F5B3E]/10 dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-[6px] ${
                    album.status === "Active" 
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "bg-gray-100 text-gray-650 dark:bg-white/10 dark:text-gray-300"
                  }`}>
                    {album.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-[14px] text-gray-950 dark:text-white leading-tight mt-3.5 group-hover:text-[#0F5B3E] dark:group-hover:text-emerald-400 transition-colors">
                  {album.name}
                </h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 font-bold">
                  {album.date} • {album.photos} Photos • {album.videos} Videos
                </p>
              </div>

              <div className="px-5 py-3.5 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.01] flex items-center justify-between text-[11px] font-bold">
                <span className="text-gray-400 dark:text-gray-500">
                  {album.views} views
                </span>

                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1.5 border border-[#ECE7DF] dark:border-white/10 rounded-lg hover:bg-white text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button className="px-2.5 py-1.5 bg-[#0F5B3E] text-white rounded-lg hover:bg-[#0d4d34]">
                    Configure
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "uploads" && (
        <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
          <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-4">Guest Uploads Moderation</h3>
          
          <div className="space-y-4">
            {guestUploads.map(upload => (
              <div key={upload.id} className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={upload.thumbnail} className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-white/10" alt="Thumbnail" />
                  <div>
                    <h4 className="text-[12px] font-extrabold text-gray-950 dark:text-white leading-tight">{upload.guest}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{upload.type} • {upload.size} • Uploaded {upload.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button className="px-3 py-1.5 text-[10.5px] font-bold border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button className="px-3 py-1.5 text-[10.5px] font-bold bg-[#0F5B3E] text-white rounded-lg hover:bg-[#0d4d34] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Approve to Live Wall
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "audio" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-4.5">Audio Guestbook Logs</h3>

            <div className="space-y-3">
              {audioNotes.map(note => {
                const playing = isPlayingId === note.id
                return (
                  <div key={note.id} className="p-3.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleAudioPlay(note.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          playing 
                            ? "bg-rose-500 text-white" 
                            : "bg-[#0F5B3E]/10 dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400"
                        }`}
                      >
                        {playing ? <Pause className="w-4 h-4 ml-0" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <div>
                        <h4 className="text-[12px] font-extrabold text-gray-950 dark:text-white leading-tight">{note.guest}</h4>
                        <span className="text-[9.5px] text-gray-400 dark:text-gray-500 mt-0.5 flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" /> {note.duration} min • {note.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {note.status === "Pending" ? (
                        <button className="px-2.5 py-1 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-lg text-[10px] font-bold">
                          Approve
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">Approved</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* QR Card generator */}
          <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs flex flex-col justify-between h-[320px]">
            <div>
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">QR Code Table Cards</h3>
              <p className="text-[10px] text-gray-400 font-semibold mb-4">Generate and print cards so guests scan to leave voice notes or upload photographs.</p>

              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-black/30 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
                <QrCode className="w-14 h-14 text-gray-700 dark:text-gray-300 opacity-80" />
                <span className="text-[10px] font-bold text-gray-900 dark:text-white mt-2">TABLE-CARD-B1.PDF</span>
              </div>
            </div>

            <button className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-[10px] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm">
              <Download className="w-4 h-4" /> Download Print PDF
            </button>
          </Card>
        </div>
      )}

      {activeTab === "access" && (
        <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-white/5 pb-3">
            <div>
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Family Access Controls</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Allow the bride, groom, and specified family members to manage their photo selections directly.</p>
            </div>
            <button className="px-3 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Grant Access
            </button>
          </div>

          <div className="space-y-3.5">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-xl text-[11.5px] font-semibold text-gray-750 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#E6F0EC] dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400 flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-950 dark:text-white leading-tight">Ayesha (Bride)</h4>
                  <span className="text-[9.5px] text-gray-400">ayesha.k@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-[#0F5B3E] dark:text-emerald-400">Full Selection Access</span>
                <span className="text-gray-400">|</span>
                <button className="text-rose-500 font-bold hover:underline">Revoke</button>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-xl text-[11.5px] font-semibold text-gray-750 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                  H
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-950 dark:text-white leading-tight">Hamza (Groom)</h4>
                  <span className="text-[9.5px] text-gray-400">hamza.a@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-[#0F5B3E] dark:text-emerald-400">Full Selection Access</span>
                <span className="text-gray-400">|</span>
                <button className="text-rose-500 font-bold hover:underline">Revoke</button>
              </div>
            </div>
          </div>
        </Card>
      )}

    </div>
  )
}
