"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, FileText, Send, CheckCircle, Clock } from "lucide-react"

export default function QuotationsPage() {
  const quotes = [
    {
      id: "QT-2026-001",
      client: "Ahmed & Sana",
      eventName: "3-Day Wedding Package",
      amount: "Rs 500,000",
      status: "Draft",
      statusColor: "bg-gray-100 text-gray-700",
      date: "Oct 10, 2026",
    },
    {
      id: "QT-2026-002",
      client: "Zainab Engagement",
      eventName: "Engagement Shoot + Album",
      amount: "Rs 150,000",
      status: "Sent",
      statusColor: "bg-blue-100 text-blue-700",
      date: "Oct 08, 2026",
    },
    {
      id: "QT-2026-003",
      client: "Ali & Fatima",
      eventName: "Luxury Wedding Coverage",
      amount: "Rs 850,000",
      status: "Accepted",
      statusColor: "bg-green-100 text-green-700",
      date: "Oct 01, 2026",
    },
    {
      id: "QT-2026-004",
      client: "TechCorp",
      eventName: "Annual Gala Video",
      amount: "Rs 300,000",
      status: "Sent",
      statusColor: "bg-blue-100 text-blue-700",
      date: "Oct 05, 2026",
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Quotations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Build packages, send quotes to clients, and track approvals.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Quote
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">12</h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Quotes Sent</p>
          </div>
        </Card>

        <Card className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">8</h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Accepted</p>
          </div>
        </Card>

        <Card className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">4</h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Pending Reply</p>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search quotations..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Quotes List */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/40 border-b border-gray-100 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Quote ID</th>
                <th className="px-6 py-4">Client & Details</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{quote.id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{quote.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{quote.client}</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">{quote.eventName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800 dark:text-gray-200">{quote.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${quote.statusColor} dark:bg-opacity-20`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1.5 text-xs font-bold text-[#0A3B2A] dark:text-cyan-400 bg-[#0A3B2A]/5 dark:bg-white/5 rounded-full hover:bg-[#0A3B2A]/10 dark:hover:bg-white/10 transition-colors hidden sm:block">
                        Convert to Booking
                      </button>
                    </div>
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
