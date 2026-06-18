"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Box, HardDrive, DownloadCloud, Clock, MapPin, MoreVertical, Link2 } from "lucide-react"

export default function DeliveriesPage() {
  const deliveries = [
    {
      id: "DEL-001",
      client: "Ahmed & Sana",
      item: "Premium Photobook + USB",
      type: "Physical",
      typeIcon: Box,
      status: "In Transit",
      statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
      tracking: "TCS-987654321",
      date: "Expected Oct 12",
      address: "DHA Phase 5, Lahore"
    },
    {
      id: "DEL-002",
      client: "TechCorp Gala",
      item: "Full Event Gallery & Raw Footage",
      type: "Digital",
      typeIcon: DownloadCloud,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30",
      tracking: "Sent via WeTransfer",
      date: "Delivered Oct 10",
      address: "techcorp.pk/events"
    },
    {
      id: "DEL-003",
      client: "Hassan Family",
      item: "Custom Hard Drive (1TB)",
      type: "Physical",
      typeIcon: HardDrive,
      status: "Processing",
      statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
      tracking: "Pending Pickup",
      date: "Due Oct 15",
      address: "Studio Pickup"
    },
    {
      id: "DEL-004",
      client: "Zainab Engagement",
      item: "Digital Highlights Album",
      type: "Digital",
      typeIcon: DownloadCloud,
      status: "Pending Upload",
      statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
      tracking: "Generating Links...",
      date: "Due Today",
      address: "Client Portal"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Deliveries
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Track physical albums, USB dispatches, and digital delivery links.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Delivery
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search deliveries by client, tracking ID..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="px-4 py-2 bg-gray-900 dark:bg-white/10 text-white rounded-full text-xs font-bold shadow-md border border-transparent dark:border-white/20">All Deliveries</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white transition-colors">Physical</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white transition-colors">Digital</button>
        </div>
      </div>

      {/* Deliveries List */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/40 border-b border-gray-100 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Delivery Item</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-black/40 text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0 border border-gray-200 dark:border-white/10 shadow-sm">
                        <delivery.typeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{delivery.item}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">{delivery.type}</span>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{delivery.tracking}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{delivery.client}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{delivery.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${delivery.statusColor}`}>
                        {delivery.status}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5" /> {delivery.date}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-start gap-1.5">
                      {delivery.type === 'Physical' ? <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" /> : <Link2 className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />}
                      <span className="line-clamp-2">{delivery.address}</span>
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
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
