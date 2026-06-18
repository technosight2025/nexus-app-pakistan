"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Phone, Calendar, MoreVertical, Filter } from "lucide-react"

export default function LeadsPage() {
  const leads = [
    {
      id: 1,
      name: "Ahmed & Sana",
      phone: "+92 300 1234567",
      eventDate: "2026-11-15",
      eventType: "Wedding Package",
      status: "New Lead",
      statusColor: "bg-blue-100 text-blue-700",
      budget: "Rs 500,000"
    },
    {
      id: 2,
      name: "Tariq Corporation",
      phone: "+92 321 7654321",
      eventDate: "2026-10-20",
      eventType: "Corporate Gala",
      status: "Contacted",
      statusColor: "bg-purple-100 text-purple-700",
      budget: "Rs 800,000"
    },
    {
      id: 3,
      name: "Ayesha Walima",
      phone: "+92 333 9876543",
      eventDate: "2026-12-05",
      eventType: "Walima Photography",
      status: "Meeting Scheduled",
      statusColor: "bg-yellow-100 text-yellow-700",
      budget: "Rs 250,000"
    },
    {
      id: 4,
      name: "Zainab Engagement",
      phone: "+92 300 4567890",
      eventDate: "2026-10-28",
      eventType: "Engagement Shoot",
      status: "Quoted",
      statusColor: "bg-orange-100 text-orange-700",
      budget: "Rs 150,000"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Leads Pipeline
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage incoming inquiries and convert them to bookings.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search leads by name, phone, or event..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Leads List */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/40 border-b border-gray-100 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Event Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Est. Budget</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{lead.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{lead.eventType}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <Calendar className="w-3 h-3" /> {lead.eventDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.statusColor} dark:bg-opacity-20`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{lead.budget}</p>
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
