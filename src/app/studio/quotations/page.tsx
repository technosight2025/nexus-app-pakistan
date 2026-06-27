"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  FileText, Search, Plus, Filter, Send, CheckCircle2,
  Clock, MoreVertical, Edit, Copy, Trash2, Eye, Download
} from "lucide-react"

import { getQuotations } from "@/lib/mock-db"

const STATUS_STYLES: Record<string, string> = {
  "Draft": "bg-gray-100 text-gray-600 dark:bg-white/8 dark:text-gray-400",
  "Sent": "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  "Approved": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Rejected": "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
}

const STATUS_ICONS: Record<string, React.ElementType> = {
  Draft: Clock, Sent: Send, Approved: CheckCircle2,
}

export default function QuotationsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [quotations, setQuotations] = useState<any[]>([])

  // Load from local storage on mount to avoid hydration mismatch
  useEffect(() => {
    setQuotations(getQuotations())
  }, [])

  const filtered = quotations.filter(q => 
    q.client?.toLowerCase().includes(search.toLowerCase()) || 
    q.id?.toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: quotations.length,
    accepted: quotations.filter(q => q.status === "Approved").length,
    sent: quotations.filter(q => q.status === "Sent").length,
    value: quotations.filter(q => q.status === "Approved").reduce((a, b) => a + b.total, 0),
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Quotations</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Create and send itemized packages to your leads</p>
        </div>
        <button onClick={() => router.push("/studio/quotations/new")} className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /> New Quotation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Value (Accepted)", value: `₨${(stats.value / 1000).toFixed(0)}K`, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Pending (Sent)", value: stats.sent, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Accepted", value: stats.accepted, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
          { label: "Total Quotes", value: stats.total, color: "text-[#6B7280]", bg: "bg-[#F8FAFC] dark:bg-white/5" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            <div className={`text-[22px] font-black ${s.color}`}>{s.value}</div>
            <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search quotations…" className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all" />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                {["Quotation", "Event", "Items", "Total", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => {
                const SIcon = STATUS_ICONS[q.status] || CheckCircle2
                return (
                  <tr key={q.id} onClick={() => router.push(`/studio/quotations/${q.id}`)} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl ${q.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>{q.initials}</div>
                        <div>
                          <div className="text-[12px] font-bold text-[#111827] dark:text-white">{q.client}</div>
                          <div className="text-[9px] text-[#9CA3AF]">{q.id} · {q.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[11px] font-semibold text-[#374151] dark:text-gray-300">{q.event}</td>
                    <td className="px-5 py-4 text-[10px] text-[#6B7280] dark:text-gray-400">{q.items?.length || 0} items</td>
                    <td className="px-5 py-4 text-[11px] font-black text-[#111827] dark:text-white">₨{q.total.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`flex items-center gap-1 w-fit text-[8px] font-black px-2 py-1 rounded-full ${STATUS_STYLES[q.status]}`}>
                        <SIcon className="w-2.5 h-2.5" /> {q.status}
                      </span>
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1.5 text-[#9CA3AF]">
                        <button onClick={() => router.push(`/studio/quotations/${q.id}`)} className="p-1.5 hover:text-[#4F46E5] hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 hover:text-[#4F46E5] hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"><Send className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        {filtered.map(q => {
          const SIcon = STATUS_ICONS[q.status] || CheckCircle2
          return (
            <div key={q.id} onClick={() => router.push(`/studio/quotations/${q.id}`)} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 cursor-pointer hover:border-[#4F46E5]/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl ${q.color} text-white text-[11px] font-black flex items-center justify-center shrink-0`}>{q.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-black text-[#111827] dark:text-white">{q.client}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{q.id} · {q.event}</div>
                </div>
                <span className={`flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-full ${STATUS_STYLES[q.status]}`}>
                  <SIcon className="w-2.5 h-2.5" /> {q.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9CA3AF]">{q.items?.length || 0} items</span>
                <span className="font-black text-[#111827] dark:text-white">₨{q.total.toLocaleString()}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F3F4F6] dark:border-white/5 flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                <button onClick={() => router.push(`/studio/quotations/${q.id}`)} className="px-3 py-1.5 bg-[#F8FAFC] dark:bg-white/5 text-[#374151] dark:text-gray-300 rounded-lg text-[10px] font-black">View</button>
                <button className="px-3 py-1.5 bg-indigo-50 text-[#4F46E5] dark:bg-indigo-500/10 dark:text-indigo-400 rounded-lg text-[10px] font-black flex items-center gap-1"><Send className="w-3 h-3" /> Send</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
