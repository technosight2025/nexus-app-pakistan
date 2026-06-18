"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  MonitorPlay, Plus, Cast, Settings, Image as ImageIcon, Video, 
  QrCode, PlayCircle, StopCircle, RefreshCw, Calendar, Clock, Tv,
  ListMusic, Info, ShieldCheck
} from "lucide-react"

export default function DisplaysPage() {
  const [activeTab, setActiveTab] = useState<"screens" | "playlists" | "scheduler">("screens")

  const displays = [
    {
      id: "DISP-001",
      name: "Main Hall LED Screen",
      event: "Ali & Fatima Baraat",
      status: "Live",
      statusColor: "bg-green-500",
      content: "Slideshow + Guest Uploads",
      lastPing: "Just now",
      ip: "192.168.1.45"
    },
    {
      id: "DISP-002",
      name: "Entrance Welcome Screen",
      event: "Ali & Fatima Baraat",
      status: "Live",
      statusColor: "bg-green-500",
      content: "Welcome Video Loop",
      lastPing: "Just now",
      ip: "192.168.1.46"
    },
    {
      id: "DISP-003",
      name: "TechCorp Gala Projector",
      event: "TechCorp Annual Gala",
      status: "Offline",
      statusColor: "bg-gray-400 dark:bg-gray-600",
      content: "Corporate Presentation",
      lastPing: "2 days ago",
      ip: "10.0.0.12"
    }
  ]

  const playlists = [
    { name: "Wedding Welcome Slides", mediaCount: 24, duration: "10 min", type: "Slideshow", author: "Hira Khan" },
    { name: "Baraat Entrance Video", mediaCount: 1, duration: "3 min", type: "Video Loop", author: "Usman Ali" },
    { name: "Corporate Sponsor Reel", mediaCount: 12, duration: "5 min", type: "Slideshow", author: "Creative Studio" }
  ]

  const schedules = [
    { screen: "Entrance Welcome Screen", playlist: "Baraat Entrance Video", time: "06:00 PM - 08:00 PM", repeat: "Continuous" },
    { screen: "Main Hall LED Screen", playlist: "Wedding Welcome Slides", time: "08:00 PM - 11:30 PM", repeat: "Continuous" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] dark:border-white/10 pb-5">
        <div>
          <h1 className="text-[26px] font-black text-gray-950 dark:text-white leading-tight font-serif flex items-center gap-2">
            Displays OS <MonitorPlay className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 font-semibold">
            Manage live digital signage, welcome video loops, automated guest slideshow walls, and Android TV publishing configurations.
          </p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Add Screen
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-[12px] border border-transparent dark:border-white/10 w-fit">
        <button 
          onClick={() => setActiveTab("screens")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "screens" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Screen Management
        </button>
        <button 
          onClick={() => setActiveTab("playlists")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "playlists" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Playlist & Signage Editor
        </button>
        <button 
          onClick={() => setActiveTab("scheduler")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "scheduler" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Screen Scheduler
        </button>
      </div>

      {/* Tab contents */}
      {activeTab === "screens" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Displays List */}
          <div className="lg:col-span-2 space-y-4">
            {displays.map(display => (
              <div key={display.id} className="p-4 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-650 dark:text-gray-400 group-hover:text-[#0F5B3E] transition-colors shrink-0">
                      <MonitorPlay className="w-6 h-6" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#050505] ${display.statusColor}`} />
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-extrabold text-gray-950 dark:text-white leading-tight">{display.name}</h3>
                    <p className="text-[10px] font-extrabold text-[#0F5B3E] dark:text-emerald-400 mt-0.5">{display.event}</p>
                    <div className="flex items-center gap-2.5 mt-1 text-[10px] font-bold text-gray-400 dark:text-gray-500">
                      <span className="flex items-center gap-1"><Cast className="w-3 h-3" /> {display.ip}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> {display.lastPing}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end w-full md:w-auto gap-2">
                  <span className="text-[10px] font-bold bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 px-2.5 py-1 rounded-[6px] text-gray-750 dark:text-gray-300 w-full md:w-auto text-center md:text-right">
                    {display.content}
                  </span>
                  <div className="flex items-center gap-2.5 w-full justify-end">
                    <button className="px-2.5 py-1.5 border border-[#ECE7DF] dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-lg text-[10.5px] font-bold flex items-center gap-1">
                      <Settings className="w-3.5 h-3.5" /> Config
                    </button>
                    {display.status === 'Live' ? (
                      <button className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[10.5px] font-bold flex items-center gap-1">
                        <StopCircle className="w-3.5 h-3.5" /> Stop
                      </button>
                    ) : (
                      <button className="px-2.5 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-[10.5px] font-bold flex items-center gap-1">
                        <PlayCircle className="w-3.5 h-3.5" /> Cast
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* QR Side Panel */}
          <div className="space-y-6">
            <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-3.5">Guest Upload Portal</h3>
              <div className="bg-gray-50 dark:bg-black/30 rounded-xl p-4 flex flex-col items-center text-center border border-[#ECE7DF] dark:border-white/5">
                <div className="w-24 h-24 bg-white dark:bg-white/10 rounded-lg mb-3.5 p-1.5 flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-gray-700 dark:text-gray-300" />
                </div>
                <h4 className="font-extrabold text-[12px] text-gray-950 dark:text-white leading-tight">Scan to stream live</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 mb-3">Guests can scan this QR code to upload photos directly to the main slideshow.</p>
                <button className="w-full py-1.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-[10.5px] font-bold">
                  Print QR Signage Cards
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "playlists" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-4">Playlists & Content library</h3>

            <div className="space-y-3">
              {playlists.map(pl => (
                <div key={pl.name} className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 flex items-center justify-between gap-4 text-[11.5px] font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0F5B3E]/10 dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <ListMusic className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-950 dark:text-white leading-tight">{pl.name}</h4>
                      <p className="text-[9.5px] text-gray-400 mt-0.5">{pl.type} • {pl.mediaCount} files • {pl.duration}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400">Created by {pl.author}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Android TV Sync Box */}
          <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs flex flex-col justify-between h-[250px]">
            <div>
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-1">Android TV signages</h3>
              <p className="text-[10px] text-gray-400 font-semibold mb-4">Pair our NEXUS Displays player application on your smart TV or Android box.</p>

              <div className="p-3 bg-gray-50 dark:bg-black/30 border border-[#ECE7DF] dark:border-white/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white">Active Connections</span>
                </div>
                <span className="px-2 py-0.5 rounded-[6px] bg-[#E6F0EC] text-[#0F5B3E] text-[9.5px] font-extrabold">2 Online</span>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-[10px] text-[11px] font-bold transition-colors">
              Pair New Device
            </button>
          </Card>
        </div>
      )}

      {activeTab === "scheduler" && (
        <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
          <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-4">Screen Schedule Timelines</h3>

          <div className="space-y-3.5">
            {schedules.map(sch => (
              <div key={sch.screen} className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-[11.5px] font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-950 dark:text-white leading-tight">{sch.screen}</h4>
                    <p className="text-[10.5px] text-[#0F5B3E] dark:text-emerald-400 mt-1 font-bold">Playlist: {sch.playlist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left sm:text-right font-bold text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase block">Timing</span>
                    <span className="text-gray-950 dark:text-white flex items-center gap-1 text-[11px]"><Clock className="w-3.5 h-3.5" /> {sch.time}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase block">Repeat Mode</span>
                    <span className="text-gray-950 dark:text-white text-[11px]">{sch.repeat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  )
}
