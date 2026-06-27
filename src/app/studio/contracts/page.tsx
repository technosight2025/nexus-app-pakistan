"use client"

import { useState } from "react"
import {
  FilePen, Plus, Search, Download, Eye, CheckCircle2,
  Clock, XCircle, AlertCircle, Send, FileText,
  PenLine, MoreVertical, Shield, Calendar
} from "lucide-react"

const STATUS_STYLES: Record<string, string> = {
  "Draft":      "bg-gray-100 text-gray-600 dark:bg-white/8 dark:text-gray-400",
  "Sent":       "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  "Signed":     "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Expired":    "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "Voided":     "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-500",
}

const STATUS_ICONS: Record<string, React.ElementType> = {
  Draft: Clock, Sent: Send, Signed: CheckCircle2, Expired: AlertCircle, Voided: XCircle,
}

const CONTRACTS = [
  { id: "CTR-0156", client: "Ayesha & Hamza", event: "Walima — Jul 5, 2025",  template: "Wedding Photography", value: 120000, status: "Signed",  signed: "Jun 15, 2025", expires: "Dec 31, 2025", initials: "A", color: "bg-indigo-500" },
  { id: "CTR-0157", client: "Sara Imran",      event: "Bridal Shoot — Jul 10", template: "Studio Photography",   value: 45000,  status: "Signed",  signed: "Jun 20, 2025", expires: "Dec 31, 2025", initials: "S", color: "bg-sky-500" },
  { id: "CTR-0158", client: "Malik Family",    event: "Engagement — Jul 14",   template: "Wedding Photography", value: 65000,  status: "Sent",    signed: "—",            expires: "Jul 5, 2025",  initials: "M", color: "bg-emerald-500" },
  { id: "CTR-0159", client: "Farhan Malik",    event: "Corporate — Jul 22",    template: "Corporate Event",     value: 180000, status: "Draft",   signed: "—",            expires: "—",            initials: "F", color: "bg-purple-500" },
  { id: "CTR-0160", client: "Zara & Omar",     event: "Nikah — Jun 28",        template: "Wedding Photography", value: 55000,  status: "Signed",  signed: "Jun 1, 2025",  expires: "Dec 31, 2025", initials: "Z", color: "bg-rose-500" },
  { id: "CTR-0155", client: "Hassan Ali",      event: "Birthday — Jun 15",     template: "Event Photography",   value: 25000,  status: "Voided",  signed: "—",            expires: "—",            initials: "H", color: "bg-teal-500" },
]

const TEMPLATES = [
  { name: "Wedding Photography", used: 42, icon: "💍" },
  { name: "Corporate Event", used: 18, icon: "🏢" },
  { name: "Studio Photography", used: 31, icon: "📷" },
  { name: "Event Photography", used: 27, icon: "🎉" },
]

export default function ContractsPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [selected, setSelected] = useState<typeof CONTRACTS[0] | null>(CONTRACTS[0])

  const statuses = ["All", "Draft", "Sent", "Signed", "Expired", "Voided"]
  const filtered = CONTRACTS.filter(c => {
    const matchSearch = c.client.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "All" || c.status === filterStatus
    return matchSearch && matchStatus
  })

  const stats = {
    signed:  CONTRACTS.filter(c => c.status === "Signed").length,
    pending: CONTRACTS.filter(c => c.status === "Sent" || c.status === "Draft").length,
    value:   CONTRACTS.filter(c => c.status === "Signed").reduce((s, c) => s + c.value, 0),
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Contracts</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Generate, send, and archive client contracts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /> New Contract
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Signed", value: stats.signed, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Pending", value: stats.pending, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Total Value", value: `₨${(stats.value / 1000).toFixed(0)}K`, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
          { label: "Templates", value: TEMPLATES.length, color: "text-[#6B7280]", bg: "bg-[#F8FAFC] dark:bg-white/5" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            <div className={`text-[22px] font-black ${s.color}`}>{s.value}</div>
            <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left — Contract list */}
        <div className="lg:col-span-2 space-y-3">
          {/* Controls */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contracts…" className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {statuses.map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer transition-all ${filterStatus === s ? "bg-[#4F46E5] text-white" : "bg-[#F8FAFC] dark:bg-white/5 text-[#9CA3AF] hover:text-[#4F46E5]"}`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 sm:hidden">
            {filtered.map(c => {
              const SIcon = STATUS_ICONS[c.status]
              return (
                <div key={c.id} onClick={() => setSelected(c)} className={`bg-white dark:bg-[#111118] border-2 rounded-2xl p-4 cursor-pointer transition-all ${selected?.id === c.id ? "border-[#4F46E5]" : "border-[#E5E7EB] dark:border-white/8"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl ${c.color} text-white text-[11px] font-black flex items-center justify-center`}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-black text-[#111827] dark:text-white">{c.client}</div>
                      <div className="text-[9px] text-[#9CA3AF]">{c.id}</div>
                    </div>
                    <span className={`flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-full ${STATUS_STYLES[c.status]}`}><SIcon className="w-2.5 h-2.5" />{c.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div><span className="text-[9px] text-[#9CA3AF]">Value</span><div className="font-black text-[#111827] dark:text-white">₨{c.value.toLocaleString()}</div></div>
                    <div><span className="text-[9px] text-[#9CA3AF]">Signed</span><div className="font-semibold text-[#374151] dark:text-gray-300">{c.signed}</div></div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                    {["Contract", "Event", "Value", "Status", "Signed"].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const SIcon = STATUS_ICONS[c.status]
                    const isSelected = selected?.id === c.id
                    return (
                      <tr key={c.id} onClick={() => setSelected(c)} className={`border-b border-[#F9FAFB] dark:border-white/3 cursor-pointer transition-colors ${isSelected ? "bg-[#EEF2FF] dark:bg-indigo-500/8" : "hover:bg-[#F8FAFC] dark:hover:bg-white/3"}`}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl ${c.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>{c.initials}</div>
                            <div>
                              <div className="text-[12px] font-bold text-[#111827] dark:text-white">{c.client}</div>
                              <div className="text-[9px] text-[#9CA3AF]">{c.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[10px] text-[#6B7280] dark:text-gray-400">{c.template}</td>
                        <td className="px-5 py-4 text-[11px] font-black text-[#111827] dark:text-white">₨{c.value.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className={`flex items-center gap-1 w-fit text-[8px] font-black px-2 py-1 rounded-full ${STATUS_STYLES[c.status]}`}><SIcon className="w-2.5 h-2.5" />{c.status}</span>
                        </td>
                        <td className="px-5 py-4 text-[10px] text-[#9CA3AF]">{c.signed}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right — Detail Panel + Templates */}
        <div className="space-y-4">
          {selected && (
            <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 space-y-4">
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Contract Detail</div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${selected.color} text-white font-black flex items-center justify-center`}>{selected.initials}</div>
                <div>
                  <div className="text-[14px] font-black text-[#111827] dark:text-white">{selected.client}</div>
                  <div className="text-[9px] text-[#9CA3AF]">{selected.id}</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Event", value: selected.event },
                  { label: "Template", value: selected.template },
                  { label: "Value", value: `₨${selected.value.toLocaleString()}` },
                  { label: "Signed On", value: selected.signed },
                  { label: "Expires", value: selected.expires },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
                    <span className="text-[11px] font-semibold text-[#374151] dark:text-gray-300">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-[#F3F4F6] dark:border-white/5">
                <button className="flex items-center justify-center gap-2 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black cursor-pointer hover:bg-indigo-700 transition-colors"><Eye className="w-3.5 h-3.5" /> Preview Contract</button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-[#E5E7EB] dark:border-white/10 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors"><Download className="w-3.5 h-3.5" /> Download PDF</button>
                {selected.status !== "Signed" && (
                  <button className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-[11px] font-black cursor-pointer hover:bg-emerald-100 transition-colors"><Send className="w-3.5 h-3.5" /> Send to Client</button>
                )}
              </div>
            </div>
          )}

          {/* Templates */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4">Contract Templates</div>
            <div className="space-y-2">
              {TEMPLATES.map(t => (
                <div key={t.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-white/3 cursor-pointer transition-colors group">
                  <div className="w-8 h-8 rounded-xl bg-[#F8FAFC] dark:bg-white/5 flex items-center justify-center text-sm">{t.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-[#374151] dark:text-gray-300">{t.name}</div>
                    <div className="text-[9px] text-[#9CA3AF]">Used {t.used} times</div>
                  </div>
                  <Shield className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#4F46E5] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
