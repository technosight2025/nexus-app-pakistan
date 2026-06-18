"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Camera, Plus, Search, Tag, AlertTriangle, 
  CheckCircle2, Users, Wrench, Battery, BatteryCharging
} from "lucide-react"
import { Button } from "@/components/ui/button"

type GearStatus = "In Studio" | "Checked Out" | "In Repair"

interface GearItem {
  id: string
  name: string
  category: "Camera" | "Lens" | "Lighting" | "Drone" | "Audio"
  status: GearStatus
  assignedTo?: string
  condition: "Excellent" | "Good" | "Needs Maintenance"
  batteryLevel?: number
  serialNumber: string
}

const INITIAL_GEAR: GearItem[] = [
  { id: "G1", name: "Sony A7S III", category: "Camera", status: "Checked Out", assignedTo: "Ahmed Khan", condition: "Excellent", batteryLevel: 85, serialNumber: "SNY-A7S-001" },
  { id: "G2", name: "Sony FE 24-70mm f/2.8 GM", category: "Lens", status: "Checked Out", assignedTo: "Ahmed Khan", condition: "Good", serialNumber: "SNY-L2470-001" },
  { id: "G3", name: "DJI Mavic 3 Pro", category: "Drone", status: "In Studio", condition: "Excellent", batteryLevel: 100, serialNumber: "DJI-M3P-001" },
  { id: "G4", name: "Godox AD600 Pro", category: "Lighting", status: "In Repair", condition: "Needs Maintenance", serialNumber: "GDX-AD6-001" },
  { id: "G5", name: "Canon EOS R5", category: "Camera", status: "In Studio", condition: "Good", batteryLevel: 45, serialNumber: "CAN-R5-001" },
]

export function EquipmentTrackingView() {
  const [gear, setGear] = useState<GearItem[]>(INITIAL_GEAR)
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusBadge = (status: GearStatus) => {
    switch(status) {
      case "In Studio": return <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-100"><CheckCircle2 className="w-3 h-3" /> In Studio</span>
      case "Checked Out": return <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-indigo-100"><Users className="w-3 h-3" /> Checked Out</span>
      case "In Repair": return <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-rose-100"><Wrench className="w-3 h-3" /> In Repair</span>
    }
  }

  const filteredGear = gear.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <Camera className="w-8 h-8 text-indigo-400" /> Equipment Tracker
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Manage your studio's gear inventory, track check-outs, and monitor maintenance schedules.
          </p>
        </div>
        
        <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0 relative z-10">
          <Plus className="w-4 h-4 mr-2" /> Add Equipment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search gear or categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
          />
        </div>
      </div>

      {/* Gear List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 border-b border-slate-100">Equipment</th>
                <th className="px-6 py-4 border-b border-slate-100">Category</th>
                <th className="px-6 py-4 border-b border-slate-100">Status</th>
                <th className="px-6 py-4 border-b border-slate-100">Condition</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGear.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-xs font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                      <Tag className="w-3 h-3" /> {item.serialNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                    {item.status === "Checked Out" && item.assignedTo && (
                      <div className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                        With: {item.assignedTo}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${
                        item.condition === 'Excellent' ? 'text-emerald-600' :
                        item.condition === 'Good' ? 'text-indigo-600' : 'text-rose-600'
                      }`}>
                        {item.condition}
                      </span>
                      {item.batteryLevel !== undefined && (
                        <span className={`flex items-center gap-1 text-xs font-bold ${item.batteryLevel > 20 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.batteryLevel > 20 ? <Battery className="w-4 h-4" /> : <BatteryCharging className="w-4 h-4 animate-pulse" />}
                          {item.batteryLevel}%
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="rounded-lg text-xs font-bold">
                      {item.status === "In Studio" ? "Check Out" : item.status === "Checked Out" ? "Check In" : "Log Repair"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
