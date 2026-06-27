"use client"

import { useState } from "react"
import {
  Camera, Package, Wrench, Plus, Search, AlertTriangle,
  CheckCircle, Clock, Battery, Wifi, Shield, MoreVertical,
  Download, Filter
} from "lucide-react"

type EquipStatus = "Available" | "In Use" | "Maintenance" | "Rented Out"

const EQUIPMENT = [
  { id: "EQ-001", name: "Sony A7 IV", category: "Camera", status: "In Use" as EquipStatus, condition: 95, lastUsed: "Jun 28, 2025", nextMaintenance: "Aug 1, 2025", assignedTo: "U", serial: "SRY-2024-001", value: 480000 },
  { id: "EQ-002", name: "Canon EOS R5", category: "Camera", status: "Available" as EquipStatus, condition: 88, lastUsed: "Jun 25, 2025", nextMaintenance: "Jul 20, 2025", assignedTo: "", serial: "CN-2023-045", value: 520000 },
  { id: "EQ-003", name: "DJI Ronin-M", category: "Stabilizer", status: "Maintenance" as EquipStatus, condition: 60, lastUsed: "Jun 10, 2025", nextMaintenance: "Jul 5, 2025", assignedTo: "", serial: "DJI-2022-099", value: 95000 },
  { id: "EQ-004", name: "Sony FX6", category: "Cinema Camera", status: "Rented Out" as EquipStatus, condition: 92, lastUsed: "Jun 27, 2025", nextMaintenance: "Sep 1, 2025", assignedTo: "Client A", serial: "SRY-2024-FX6-01", value: 850000 },
  { id: "EQ-005", name: "24-70mm f/2.8 Lens", category: "Lens", status: "In Use" as EquipStatus, condition: 98, lastUsed: "Jun 28, 2025", nextMaintenance: "Dec 1, 2025", assignedTo: "U", serial: "CN-L-2023-001", value: 180000 },
  { id: "EQ-006", name: "70-200mm f/2.8 Lens", category: "Lens", status: "Available" as EquipStatus, condition: 96, lastUsed: "Jun 20, 2025", nextMaintenance: "Dec 1, 2025", assignedTo: "", serial: "CN-L-2023-002", value: 210000 },
  { id: "EQ-007", name: "DJI Mavic 3 Pro", category: "Drone", status: "Available" as EquipStatus, condition: 100, lastUsed: "Jun 15, 2025", nextMaintenance: "Nov 1, 2025", assignedTo: "", serial: "DJI-2024-MAV-01", value: 350000 },
  { id: "EQ-008", name: "Godox V1 Flash Set", category: "Lighting", status: "Available" as EquipStatus, condition: 90, lastUsed: "Jun 22, 2025", nextMaintenance: "Jan 1, 2026", assignedTo: "", serial: "GDX-2023-V1-01", value: 45000 },
  { id: "EQ-009", name: "Zoom H6 Recorder", category: "Audio", status: "In Use" as EquipStatus, condition: 85, lastUsed: "Jun 28, 2025", nextMaintenance: "Oct 1, 2025", assignedTo: "F", serial: "ZM-2023-H6-01", value: 35000 },
  { id: "EQ-010", name: "Aputure 300d II", category: "Lighting", status: "Maintenance" as EquipStatus, condition: 70, lastUsed: "Jun 5, 2025", nextMaintenance: "Jul 3, 2025", assignedTo: "", serial: "APT-2022-300-01", value: 120000 },
]

const STATUS_STYLES: Record<EquipStatus, string> = {
  "Available": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "In Use": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  "Maintenance": "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "Rented Out": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
}

const STATUS_ICONS: Record<EquipStatus, React.ElementType> = {
  Available: CheckCircle,
  "In Use": Camera,
  Maintenance: Wrench,
  "Rented Out": Package,
}

const CONDITION_COLOR = (v: number) => v >= 90 ? "#22C55E" : v >= 70 ? "#F59E0B" : "#EF4444"

export default function EquipmentPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterCategory, setFilterCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("Equipment")

  const categories = ["All", ...Array.from(new Set(EQUIPMENT.map(e => e.category)))]
  const statuses: (EquipStatus | "All")[] = ["All", "Available", "In Use", "Maintenance", "Rented Out"]

  const filtered = EQUIPMENT.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.serial.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "All" || e.status === filterStatus
    const matchCat = filterCategory === "All" || e.category === filterCategory
    return matchSearch && matchStatus && matchCat
  })

  const totalValue = EQUIPMENT.reduce((s, e) => s + e.value, 0)

  return (
    <div className="space-y-5 md:space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Total Equipment", value: EQUIPMENT.length, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
          { label: "Available", value: EQUIPMENT.filter(e=>e.status==="Available").length, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Maintenance Due", value: EQUIPMENT.filter(e=>e.status==="Maintenance").length, color: "text-[#EF4444]", bg: "bg-red-50 dark:bg-red-500/10" },
          { label: "Fleet Value", value: `₨${(totalValue/1000000).toFixed(1)}M`, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10" },
        ].map(c => (
          <div key={c.label} className={`${c.bg} rounded-xl md:rounded-2xl p-4 md:p-5`}>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">{c.label}</div>
            <div className={`text-[18px] md:text-[22px] font-black ${c.color} leading-none`}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-1 w-fit">
        {["Equipment","Inventory","Maintenance"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all cursor-pointer ${activeTab === tab ? "bg-[#4F46E5] text-white shadow-sm" : "text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-white/5"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search equipment..." className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-white dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-2.5 py-1 rounded-lg text-[9px] font-black cursor-pointer transition-all ${filterStatus === s ? "bg-[#4F46E5] text-white" : "bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 text-[#9CA3AF] hover:bg-[#EEF2FF] hover:text-[#4F46E5]"}`}>
                {s}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] text-white rounded-xl text-[9px] font-black hover:bg-indigo-700 cursor-pointer shrink-0">
            <Plus className="w-3 h-3" /> Add Equipment
          </button>
        </div>
      </div>

      {/* Equipment Grid */}
      {activeTab === "Equipment" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {filtered.map(item => {
            const StatusIcon = STATUS_ICONS[item.status]
            const condColor = CONDITION_COLOR(item.condition)
            return (
              <div key={item.id} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-white/5 flex items-center justify-center group-hover:bg-[#EEF2FF] transition-colors">
                    <Camera className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <button className="text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"><MoreVertical className="w-4 h-4" /></button>
                </div>

                <div className="text-[12px] font-black text-[#111827] dark:text-white mb-0.5">{item.name}</div>
                <div className="text-[9px] font-black text-[#9CA3AF] uppercase mb-3">{item.category} · {item.serial}</div>

                {/* Status Badge */}
                <span className={`flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-full w-fit mb-3 ${STATUS_STYLES[item.status]}`}>
                  <StatusIcon className="w-2.5 h-2.5" />
                  {item.status}
                </span>

                {/* Condition Bar */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] font-black text-[#9CA3AF] uppercase">Condition</span>
                    <span className="text-[8px] font-black" style={{ color: condColor }}>{item.condition}%</span>
                  </div>
                  <div className="h-1.5 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.condition}%`, backgroundColor: condColor }} />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 pt-3 border-t border-[#F3F4F6] dark:border-white/5">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-[#9CA3AF]">Last Used</span>
                    <span className="font-bold text-[#374151] dark:text-gray-300">{item.lastUsed}</span>
                  </div>
                  <div className="flex justify-between text-[9px]">
                    <span className="text-[#9CA3AF]">Next Maintenance</span>
                    <span className={`font-bold ${item.status === "Maintenance" ? "text-[#EF4444]" : "text-[#374151] dark:text-gray-300"}`}>{item.nextMaintenance}</span>
                  </div>
                  <div className="flex justify-between text-[9px]">
                    <span className="text-[#9CA3AF]">Value</span>
                    <span className="font-bold text-[#22C55E]">₨{item.value.toLocaleString()}</span>
                  </div>
                  {item.assignedTo && (
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#9CA3AF]">Assigned To</span>
                      <div className="w-4 h-4 rounded-full bg-[#4F46E5] text-white text-[7px] font-black flex items-center justify-center">{item.assignedTo}</div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Maintenance Schedule */}
      {activeTab === "Maintenance" && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5">
            <h3 className="text-[13px] font-black text-[#111827] dark:text-white">Upcoming Maintenance</h3>
          </div>
          <div className="p-4 space-y-3">
            {EQUIPMENT.filter(e => e.status === "Maintenance" || true).sort((a,b) => a.nextMaintenance.localeCompare(b.nextMaintenance)).map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === "Maintenance" ? "bg-[#EF4444] animate-pulse" : "bg-[#22C55E]"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-[#111827] dark:text-white">{item.name}</div>
                  <div className="text-[9px] text-[#9CA3AF]">{item.category} · Condition {item.condition}%</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-black text-[#374151] dark:text-gray-300">{item.nextMaintenance}</div>
                  <div className={`text-[8px] font-black ${item.status === "Maintenance" ? "text-[#EF4444]" : "text-[#22C55E]"}`}>
                    {item.status === "Maintenance" ? "⚠ Due Now" : "Scheduled"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Summary (placeholder tab) */}
      {activeTab === "Inventory" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {Array.from(new Set(EQUIPMENT.map(e => e.category))).map(cat => {
            const items = EQUIPMENT.filter(e => e.category === cat)
            const totalVal = items.reduce((s, e) => s + e.value, 0)
            return (
              <div key={cat} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-black text-[#111827] dark:text-white">{cat}</span>
                  <span className="text-[9px] font-black text-[#9CA3AF] bg-[#F8FAFC] dark:bg-white/5 px-2 py-1 rounded-lg">{items.length} units</span>
                </div>
                <div className="text-[18px] font-black text-[#22C55E]">₨{(totalVal/1000).toFixed(0)}k</div>
                <div className="text-[9px] text-[#9CA3AF] mt-1">Total fleet value</div>
                <div className="flex gap-1.5 mt-3">
                  {items.map(e => (
                    <div key={e.id} title={e.name} className={`w-5 h-5 rounded-full ${STATUS_STYLES[e.status].split(" ")[0]} flex items-center justify-center`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${e.status === "Available" ? "bg-emerald-500" : e.status === "In Use" ? "bg-indigo-500" : e.status === "Maintenance" ? "bg-red-500" : "bg-amber-500"}`} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
