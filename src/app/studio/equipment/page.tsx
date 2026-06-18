"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, Camera, Scan, AlertTriangle, CheckCircle } from "lucide-react"

export default function EquipmentPage() {
  const inventory = [
    {
      id: "EQ-001",
      name: "Sony A7S III",
      category: "Camera Body",
      serial: "S7S-8899221",
      status: "Available",
      statusColor: "bg-green-100 text-green-700",
      location: "Studio Cabinet A"
    },
    {
      id: "EQ-002",
      name: "Sony FX3",
      category: "Cinema Camera",
      serial: "FX3-445566",
      status: "Checked Out",
      assignee: "Fahad Ahmed",
      statusColor: "bg-blue-100 text-blue-700",
      location: "On Shoot: Ali & Fatima Wedding"
    },
    {
      id: "EQ-003",
      name: "Sony FE 24-70mm f/2.8 GM II",
      category: "Lens",
      serial: "SEL-2470GM2",
      status: "Checked Out",
      assignee: "Zoya Ali",
      statusColor: "bg-blue-100 text-blue-700",
      location: "On Shoot: TechCorp Gala"
    },
    {
      id: "EQ-004",
      name: "DJI Mavic 3 Pro",
      category: "Drone",
      serial: "DJI-M3P-1122",
      status: "Maintenance",
      statusColor: "bg-red-100 text-red-700",
      location: "Repair Center (Estimated Return: Oct 15)"
    },
    {
      id: "EQ-005",
      name: "Godox AD600 Pro",
      category: "Lighting",
      serial: "GDX-600-99",
      status: "Available",
      statusColor: "bg-green-100 text-green-700",
      location: "Studio Cabinet B"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Equipment Inventory
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Track cameras, lenses, lighting, and manage checkouts.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white dark:bg-black/40 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm flex items-center gap-2">
            <Scan className="w-4 h-4" /> Scan QR
          </button>
          <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Gear
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[120px]">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Total Items</h3>
          <p className="text-3xl font-black text-gray-900 dark:text-white">42</p>
        </Card>
        <Card className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[120px] bg-green-50/50 dark:bg-green-500/10 dark:backdrop-blur-xl">
          <h3 className="text-sm font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Available
          </h3>
          <p className="text-3xl font-black text-green-700 dark:text-green-400">28</p>
        </Card>
        <Card className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[120px] bg-blue-50/50 dark:bg-blue-500/10 dark:backdrop-blur-xl">
          <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Camera className="w-4 h-4" /> Checked Out
          </h3>
          <p className="text-3xl font-black text-blue-700 dark:text-blue-400">12</p>
        </Card>
        <Card className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[120px] bg-red-50/50 dark:bg-red-500/10 dark:backdrop-blur-xl">
          <h3 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Maintenance
          </h3>
          <p className="text-3xl font-black text-red-700 dark:text-red-400">2</p>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, category, or serial number..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" /> Filter Categories
        </button>
      </div>

      {/* Inventory List */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/40 border-b border-gray-100 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Item & Serial</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Location / Assignee</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1 uppercase tracking-wider">{item.serial}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.statusColor} dark:bg-opacity-20`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.location}</p>
                    {item.assignee && (
                      <p className="text-xs text-blue-600 dark:text-cyan-400 font-bold mt-1">Checked out to: {item.assignee}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 text-xs font-bold text-[#0A3B2A] dark:text-cyan-400 bg-[#0A3B2A]/5 dark:bg-white/5 rounded-full hover:bg-[#0A3B2A]/10 dark:hover:bg-white/10 transition-colors">
                      {item.status === 'Available' ? 'Check Out' : 'Check In'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  )
}
