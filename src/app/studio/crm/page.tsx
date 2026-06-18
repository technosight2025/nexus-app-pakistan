"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Mail, Phone, MoreVertical } from "lucide-react"

export default function CRMPage() {
  const clients = [
    {
      id: "C-001",
      name: "Ahmed & Sana",
      type: "Couple",
      phone: "+92 300 1234567",
      email: "ahmed.sana@example.com",
      status: "Active",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
      ltv: "Rs 500,000",
      lastContact: "Oct 10, 2026"
    },
    {
      id: "C-002",
      name: "TechCorp Industries",
      type: "Corporate",
      phone: "+92 321 7654321",
      email: "events@techcorp.pk",
      status: "VIP",
      statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
      ltv: "Rs 1,200,000",
      lastContact: "Oct 05, 2026"
    },
    {
      id: "C-003",
      name: "Hassan Family",
      type: "Family",
      phone: "+92 333 9876543",
      email: "hassan.family@example.com",
      status: "Past Client",
      statusColor: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300",
      ltv: "Rs 350,000",
      lastContact: "Sep 15, 2026"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Client Relationship Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage your client database, track interactions, and view lifetime value.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search clients by name, phone, or email..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="px-4 py-2 bg-gray-900 dark:bg-white/10 text-white rounded-full text-xs font-bold shadow-md border border-transparent dark:border-white/20">All Clients</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white transition-colors">Corporate</button>
          <button className="px-4 py-2 bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 dark:hover:text-white transition-colors">Couples</button>
        </div>
      </div>

      {/* Clients List */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/40 border-b border-gray-100 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Client Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Lifetime Value</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0A3B2A]/5 dark:bg-cyan-500/20 text-[#0A3B2A] dark:text-cyan-400 flex items-center justify-center font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{client.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{client.type} • {client.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" /> {client.phone}</span>
                      <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" /> {client.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${client.statusColor}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{client.ltv}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last seen: {client.lastContact}</p>
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
