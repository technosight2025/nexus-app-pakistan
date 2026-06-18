"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export function LiveAvailabilityCalendar() {
  const [currentMonth, setCurrentMonth] = useState("November 2026")
  
  // Mock days (1 to 30)
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = i + 1
    let status = "available"
    if ([5, 6, 12, 13, 19, 20].includes(date)) status = "booked"
    if ([26, 27].includes(date)) status = "fast-filling"
    return { date, status }
  })

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-900">Live Availability</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-full border border-emerald-100">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Live Status</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-slate-600" /></button>
        <span className="text-xs font-bold text-slate-800">{currentMonth}</span>
        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-slate-600" /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
          <div key={d} className="text-[10px] font-bold text-slate-400">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 relative z-0">
        {/* Empty slots for starting day offset */}
        <div className="aspect-square"></div>
        <div className="aspect-square"></div>
        
        {days.map(d => (
          <button 
            key={d.date}
            disabled={d.status === "booked"}
            className={`
              aspect-square rounded-lg flex flex-col items-center justify-center text-[11px] font-bold transition-all relative group
              ${d.status === "available" ? "bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:bg-blue-50" : ""}
              ${d.status === "booked" ? "bg-slate-100 text-slate-400 cursor-not-allowed line-through border border-transparent" : ""}
              ${d.status === "fast-filling" ? "bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100" : ""}
            `}
          >
            {d.date}
            {d.status === "fast-filling" && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-amber-500" />
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block w-max bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-xl z-50 pointer-events-none">
              {d.status === "available" && "Available"}
              {d.status === "booked" && "Fully Booked"}
              {d.status === "fast-filling" && "1 slot left!"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[9px] font-bold text-slate-500">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border border-slate-200 bg-white" /> Available</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400" /> Fast Filling</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-300" /> Booked</div>
      </div>
    </div>
  )
}
