"use client"

import { Sliders, Building2, ChevronDown, ThermometerSun } from "lucide-react"

export interface Hall {
  id: string
  name: string
  capacity: number
  status: "Available" | "Event in Progress" | "In Setup" | "Maintenance"
  temp: number
  slots: {
    morning: "Available" | "Booked" | "Blocked"
    afternoon: "Available" | "Booked" | "Blocked"
    evening: "Available" | "Booked" | "Blocked"
  }
}

interface VenueManagementModuleProps {
  halls: Hall[]
  onToggleStatus: (hallId: string) => void
  onTempChange: (hallId: string, temp: number) => void
  onToggleSlot: (hallId: string, slot: "morning" | "afternoon" | "evening") => void
}

export default function VenueManagementModule({
  halls,
  onToggleStatus,
  onTempChange,
  onToggleSlot
}: VenueManagementModuleProps) {
  return (
    <div className="bg-white rounded-[16px] border border-[#E6E2DA] p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#1D1C17]">Halls & Spaces Console</h2>
          <p className="text-xs text-slate-500 font-medium">Real-time tracking of space statuses, slots, and indoor environment climate</p>
        </div>
        <Sliders className="w-5 h-5 text-[#0F5B3E]" />
      </div>

      <div className="space-y-6">
        {halls.map((hall) => (
          <div
            key={hall.id}
            className="border border-[#E6E2DA] rounded-[16px] p-5 hover:border-[#0F5B3E]/30 hover:shadow-md transition-all space-y-4 bg-white"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#E6F0EC] text-[#0F5B3E] rounded-xl">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1D1C17] text-lg">{hall.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">Capacity: Max {hall.capacity} guests</p>
                </div>
              </div>

              {/* Status Cycler Button */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onToggleStatus(hall.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-[12px] border transition-all flex items-center gap-1.5 ${
                    hall.status === "Available"
                      ? "bg-[#E6F0EC] text-[#0F5B3E] border-[#0F5B3E]/20 hover:bg-[#E6F0EC]/80"
                      : hall.status === "Event in Progress"
                      ? "bg-[#FCEEF3] text-[#D9467A] border-[#D9467A]/20 hover:bg-[#FCEEF3]/80"
                      : hall.status === "In Setup"
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-current" />
                  {hall.status}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Climate and Slots Configs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-[#E6E2DA]">
              {/* Temperature Control */}
              <div className="md:col-span-6 flex flex-col justify-center space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <ThermometerSun className="w-3.5 h-3.5 text-orange-500" /> Climate Control
                  </span>
                  <span className="text-[#0F5B3E] font-black">{hall.temp}°C</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-bold">18°C</span>
                  <input
                    type="range"
                    min="18"
                    max="30"
                    value={hall.temp}
                    onChange={(e) => onTempChange(hall.id, parseInt(e.target.value))}
                    className="flex-1 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0F5B3E]"
                  />
                  <span className="text-xs text-slate-400 font-bold">30°C</span>
                </div>
              </div>

              {/* Time Slots grid */}
              <div className="md:col-span-6 space-y-2">
                <p className="text-xs font-bold text-slate-600">Today's Slots Timeline</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(hall.slots).map(([slotName, status]) => (
                    <button
                      key={slotName}
                      onClick={() => onToggleSlot(hall.id, slotName as any)}
                      className={`py-2 px-2.5 rounded-[12px] border text-center transition-all ${
                        status === "Available"
                          ? "bg-white border-[#E6E2DA] text-slate-700 hover:border-[#0F5B3E]"
                          : status === "Booked"
                          ? "bg-[#0F5B3E] border-[#0F5B3E] text-white"
                          : "bg-slate-100 border-[#E6E2DA] text-slate-400"
                      }`}
                    >
                      <p className="text-[10px] font-bold capitalize text-slate-500 leading-none mb-1">
                        {slotName}
                      </p>
                      <p className="text-[11px] font-black leading-none uppercase">
                        {status}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
