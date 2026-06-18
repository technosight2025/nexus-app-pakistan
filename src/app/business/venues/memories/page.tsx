"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Camera, Image as ImageIcon, Video, Folder, HardDrive, Download, 
  Share2, Plus, QrCode, Sliders, ChevronRight, CheckCircle2, AlertCircle
} from "lucide-react"

export default function MemoriesOSPage() {
  const [activeTab, setActiveTab] = useState<"albums" | "qr" | "storage">("albums")
  
  // Custom QR Standee Designer States
  const [standeeTitle, setStandeeTitle] = useState("Share Your Best Shots!")
  const [selectedEvent, setSelectedEvent] = useState("Ahmed & Fatima Wedding")
  const [standeeColor, setStandeeColor] = useState<"emerald" | "gold" | "rose">("emerald")
  const [printSize, setPrintSize] = useState("a5")

  // Mock Event Albums
  const albums = [
    { id: "ALB-801", name: "Ahmed & Fatima - Baraat", cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300", photos: 482, videos: 12, size: "14.2 GB" },
    { id: "ALB-802", name: "Ahmed & Fatima - Walima", cover: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=300", photos: 310, videos: 8, size: "9.6 GB" },
    { id: "ALB-803", name: "Zainab Mehndi Night", cover: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300", photos: 248, videos: 4, size: "5.8 GB" },
    { id: "ALB-804", name: "Corporate Launch - Engro", cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300", photos: 185, videos: 15, size: "18.4 GB" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
            Memories OS <Camera className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12.5px] text-gray-500 mt-1 font-semibold">
            Manage event photo/video galleries, allocate QR guest upload standees, and analyze wedding loop storage metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Create New Gallery
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setActiveTab("albums")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "albums" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Event Albums
        </button>
        <button 
          onClick={() => setActiveTab("qr")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "qr" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Guest QR Standee Builder
        </button>
        <button 
          onClick={() => setActiveTab("storage")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "storage" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Storage & Bandwidth
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "albums" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="group border border-gray-100 bg-white rounded-[24px] shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
                <img 
                  src={album.cover} 
                  alt={album.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[8.5px] font-extrabold text-white uppercase tracking-wider">
                  {album.size}
                </div>
              </div>

              <div className="p-4.5 text-left space-y-1">
                <span className="text-[9px] font-extrabold text-[#0F5B3E] uppercase tracking-wider">{album.id}</span>
                <h4 className="text-[12.5px] font-black text-gray-950 truncate" title={album.name}>{album.name}</h4>
                <div className="flex items-center gap-3 pt-2 text-[10.5px] font-semibold text-gray-400">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-gray-400" /> {album.photos} Photos</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5 text-gray-400" /> {album.videos} Clips</span>
                </div>
              </div>

              <div className="p-3 border-t border-gray-50 bg-[#FAF8F5]/30 flex justify-between items-center gap-2">
                <button className="flex-1 py-1.5 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10.5px] font-bold text-gray-650 flex items-center justify-center gap-1 shadow-2xs transition-colors">
                  <Share2 className="w-3 h-3 text-gray-400" /> Share Links
                </button>
                <button className="flex-1 py-1.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl text-[10.5px] font-bold flex items-center justify-center gap-1 shadow-xs transition-colors">
                  <Folder className="w-3 h-3" /> View Files
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "qr" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Customizer */}
          <Card className="lg:col-span-2 p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm space-y-4">
            <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-2">Customizer Dashboard</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Standee Header Title</label>
                <input 
                  type="text" 
                  value={standeeTitle} 
                  onChange={e => setStandeeTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Link to Event Gallery</label>
                <select 
                  value={selectedEvent} 
                  onChange={e => setSelectedEvent(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                >
                  <option>Ahmed & Fatima Wedding</option>
                  <option>Zainab Mehndi Night</option>
                  <option>Corporate Launch - Engro</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase block">Standee Theme Color</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setStandeeColor("emerald")}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      standeeColor === "emerald" ? "border-[#0F5B3E] bg-[#E6F0EC] text-[#0F5B3E]" : "border-[#ECE7DF] hover:bg-gray-50 text-gray-500"
                    }`}
                  >
                    Emerald
                  </button>
                  <button 
                    onClick={() => setStandeeColor("gold")}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      standeeColor === "gold" ? "border-[#C9A227] bg-[#FAF8F5] text-[#b08e20]" : "border-[#ECE7DF] hover:bg-gray-50 text-gray-500"
                    }`}
                  >
                    Gold
                  </button>
                  <button 
                    onClick={() => setStandeeColor("rose")}
                    className={`py-2 rounded-xl text-[11px] font-bold border transition-all ${
                      standeeColor === "rose" ? "border-[#D9467A] bg-rose-50 text-[#D9467A]" : "border-[#ECE7DF] hover:bg-gray-50 text-gray-500"
                    }`}
                  >
                    Rose
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] font-extrabold text-gray-400 uppercase">Print Size Dimension</label>
                <select 
                  value={printSize} 
                  onChange={e => setPrintSize(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                >
                  <option value="a5">A5 Table Card (5.8" x 8.3")</option>
                  <option value="card">4" x 6" Photo Standee</option>
                  <option value="poster">A3 Entrance Poster (11.7" x 16.5")</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button className="flex-1 py-2.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
                <Download className="w-4 h-4" /> Download PDF Standee
              </button>
            </div>
          </Card>

          {/* Table Standee Preview Mockup */}
          <Card className="lg:col-span-3 p-6 bg-[#FAF7F2] border border-[#ECE7DF] rounded-[24px] flex items-center justify-center min-h-[420px]">
            <div className={`w-full max-w-xs aspect-[1/1.4] rounded-2xl border-4 p-6 flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden transition-all duration-300 bg-white`}
              style={{ borderColor: standeeColor === "emerald" ? "#0F5B3E" : standeeColor === "gold" ? "#C9A227" : "#D9467A" }}
            >
              
              {/* Standee Branding Header */}
              <div className="space-y-1 z-10 pt-2">
                <div className="flex items-center justify-center gap-1 text-[8.5px] font-extrabold uppercase tracking-widest text-gray-400">
                  <Camera className="w-3.5 h-3.5" style={{ color: standeeColor === "emerald" ? "#0F5B3E" : standeeColor === "gold" ? "#C9A227" : "#D9467A" }} />
                  Nexus Memories OS
                </div>
                <h3 className="text-base font-extrabold text-gray-900 mt-2.5 px-2">{standeeTitle}</h3>
              </div>

              {/* Big Scan Area */}
              <div className="my-5 flex flex-col items-center justify-center z-10">
                <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-900" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold mt-3 max-w-[170px] leading-tight">
                  Point your mobile camera at this QR code to upload photos directly to the wedding album!
                </p>
              </div>

              {/* Event details bottom strip */}
              <div className="w-full border-t pt-3 z-10" style={{ borderTopColor: standeeColor === "emerald" ? "#E6F0EC" : standeeColor === "gold" ? "#FAF8F5" : "#FCEEF3" }}>
                <span className="text-[9px] font-extrabold uppercase block tracking-wider" style={{ color: standeeColor === "emerald" ? "#0F5B3E" : standeeColor === "gold" ? "#C9A227" : "#D9467A" }}>
                  Digital Album Link:
                </span>
                <span className="text-[10.5px] font-black text-gray-800 mt-0.5 block truncate max-w-[200px] mx-auto">
                  {selectedEvent}
                </span>
              </div>

            </div>
          </Card>

        </div>
      )}

      {/* Tab 3: Storage & Bandwidth */}
      {activeTab === "storage" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Storage Quota Card */}
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Cloud Storage Allocations</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Allocated storage for guests media uploads</p>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-[11.5px] font-extrabold text-gray-900 leading-none">
                  <span>Space Used:</span>
                  <span>48.0 GB / 200 GB <span className="text-[10px] text-gray-400 font-semibold">(24% used)</span></span>
                </div>
                <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden">
                  <div className="bg-[#0F5B3E] h-full rounded-full" style={{ width: "24%" }} />
                </div>
              </div>

              <div className="mt-6 p-3 bg-purple-50/50 border border-purple-100 rounded-xl flex items-center gap-2.5">
                <HardDrive className="w-5 h-5 text-purple-700 shrink-0" />
                <span className="text-[10.5px] text-purple-900 leading-tight font-semibold">
                  Upgrade your subscription package to scale storage up to <span className="font-extrabold">1 TB</span> anytime.
                </span>
              </div>
            </div>

            <button className="w-full py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl text-[11px] font-extrabold uppercase transition-all shadow-xs mt-6">
              Upgrade Storage OS Plan
            </button>
          </Card>

          {/* Bandwidth Usage */}
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Data Transfer Bandwidth</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Traffic consumed by guests downloading photos/videos</p>

              <div className="space-y-4 mt-6 text-[11px] font-bold text-gray-500">
                <div className="flex justify-between">
                  <span>Today's Bandwidth:</span>
                  <span className="text-gray-950 font-black">1.24 GB</span>
                </div>
                <div className="flex justify-between border-t border-gray-50 pt-3">
                  <span>Total Downloads (Month):</span>
                  <span className="text-gray-950 font-black">12,482 downloads</span>
                </div>
                <div className="flex justify-between border-t border-gray-50 pt-3">
                  <span>Average File Size:</span>
                  <span className="text-gray-950 font-black">2.4 MB</span>
                </div>
                <div className="flex justify-between border-t border-gray-50 pt-3">
                  <span>Connection Health:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Excellent
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10.5px] font-bold text-gray-600 transition-colors mt-6">
              View Access Logs
            </button>
          </Card>

          {/* Android TV published setup */}
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Android TV Publishing</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Stream uploaded slideshows live to marriage hall signage displays</p>

              <div className="mt-5 space-y-2 text-[10.5px] text-gray-500 font-semibold leading-relaxed">
                <p>You can connect your venue's displays (Displays OS) directly to guest upload folders. Fresh photos automatically compile and publish to slideshow loops.</p>
                <div className="flex items-center gap-2 text-gray-900 font-bold pt-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>3 Screens Linked: Grand Ballroom, Lobby TV</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10.5px] font-bold text-gray-650 flex items-center justify-center gap-1.5 transition-colors mt-6">
              Displays OS Hub <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </Card>

        </div>
      )}

    </div>
  )
}
