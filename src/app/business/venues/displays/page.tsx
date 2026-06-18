"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Tv, MonitorPlay, Sparkles, Send, Library, Plus, Play, 
  Pause, Laptop, Smartphone, Check, HelpCircle
} from "lucide-react"

export default function VenueDisplaysPage() {
  const [screens, setScreens] = useState([
    { id: "SCR-101", name: "Grand Entrance Welcome Board", type: "Android TV (Portrait)", activeLoop: "Welcome Ahmed & Fatima", status: "Online", resolution: "1080x1920" },
    { id: "SCR-102", name: "Main Stage Projector", type: "Smart Projector (Landscape)", activeLoop: "Emerald Floral Animation", status: "Online", resolution: "1920x1080" },
    { id: "SCR-103", name: "Reception Directory Wall", type: "Wall LED (Landscape)", activeLoop: "Hall Directory Map", status: "Standby", resolution: "3840x1080" },
  ])

  const [publishSuccessIndex, setPublishSuccessIndex] = useState<number | null>(null)

  const handleTriggerPublish = (index: number) => {
    setPublishSuccessIndex(index)
    setTimeout(() => setPublishSuccessIndex(null), 2500)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Tv className="w-6 h-6 text-[#0F5B3E]" /> Displays OS Controller
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Broadcast event welcome slides, live photo loops, dinner directories, and menus to TVs and LED screens.
          </p>
        </div>
        
        <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Connect Smart Display
        </button>
      </div>

      {/* Screen Monitor Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {screens.map((scr, idx) => (
          <Card key={scr.id} className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between h-[230px]">
            <div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center shrink-0">
                    <Tv className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-[12.5px] font-black text-gray-900 leading-snug">{scr.name}</h3>
                    <span className="text-[9.5px] text-gray-400 font-bold">{scr.type} • {scr.resolution}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                  scr.status === "Online" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                }`}>{scr.status}</span>
              </div>

              {/* Active content details */}
              <div className="my-4 p-3 bg-[#FAF8F5] border border-[#ECE7DF]/50 rounded-xl flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-[9px] text-gray-400 font-bold block uppercase leading-none">Active Media Loop</span>
                  <span className="text-[11px] font-bold text-gray-900 mt-1 block truncate">{scr.activeLoop}</span>
                </div>
                <button className="w-6 h-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shrink-0 shadow-xs">
                  <Pause className="w-3 h-3 fill-current" />
                </button>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-[11px] font-bold">
              <span className="text-gray-400">ID: {scr.id}</span>
              <button 
                onClick={() => handleTriggerPublish(idx)}
                className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl transition-all flex items-center gap-1 shadow-xs"
              >
                {publishSuccessIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Published Loop
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Publish Loop
                  </>
                )}
              </button>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}
