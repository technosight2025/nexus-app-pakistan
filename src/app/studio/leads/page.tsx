"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search, Plus, Phone, Mail, Calendar, MessageCircle,
  Flame, Snowflake, Thermometer, Filter, ArrowRight,
  MoreVertical, Globe, Share2, Smartphone, Users, Building2
} from "lucide-react"

const SCORE_CONFIG = {
  Hot:  { icon: Flame,       color: "text-red-500",    bg: "bg-red-50 dark:bg-red-500/10",    border: "border-red-200 dark:border-red-500/20" },
  Warm: { icon: Thermometer, color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20" },
  Cold: { icon: Snowflake,   color: "text-sky-500",    bg: "bg-sky-50 dark:bg-sky-500/10",    border: "border-sky-200 dark:border-sky-500/20" },
}

const STATUS_STYLES: Record<string, string> = {
  "New Inquiry":         "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "Contacted":           "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  "Meeting Scheduled":   "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  "Quoted":              "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  "Negotiating":         "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  "Converted":           "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Lost":                "bg-gray-100 text-gray-500 dark:bg-white/8 dark:text-gray-400",
}

const SOURCE_ICONS: Record<string, React.ElementType> = {
  "Marketplace": Globe,
  "WhatsApp": Smartphone,
  "Referral": Users,
  "Website": Globe,
  "Walk-in": Users,
  "Social Media": Share2,
  "Phone": Phone,
  "Corporate": Building2,
}

const ALL_LEADS = [
  { id: "L-001", name: "Ahmed & Sana", phone: "+92 300 1234567", email: "ahmed@gmail.com", event: "Wedding Package", eventDate: "2026-11-15", score: "Hot", status: "New Inquiry", budget: 500000, source: "Marketplace", city: "Lahore", initials: "A", color: "bg-indigo-500", notes: "Saw our portfolio on Nexus. Very interested in premium package.", created: "2 hours ago" },
  { id: "L-002", name: "Tariq Corporation", phone: "+92 321 7654321", email: "tariq@corp.pk", event: "Corporate Gala", eventDate: "2026-10-20", score: "Warm", status: "Contacted", budget: 800000, source: "Referral", city: "Islamabad", initials: "T", color: "bg-purple-500", notes: "Referred by Malik Family. Corporate event for 400 guests.", created: "1 day ago" },
  { id: "L-003", name: "Ayesha Walima", phone: "+92 333 9876543", email: "ayesha@gmail.com", event: "Walima Photography", eventDate: "2026-12-05", score: "Hot", status: "Meeting Scheduled", budget: 250000, source: "WhatsApp", city: "Karachi", initials: "A", color: "bg-rose-500", notes: "Meeting set for Tuesday 3pm. Client wants drone footage.", created: "3 days ago" },
  { id: "L-004", name: "Zainab Engagement", phone: "+92 300 4567890", email: "zainab@yahoo.com", event: "Engagement Shoot", eventDate: "2026-10-28", score: "Warm", status: "Quoted", budget: 150000, source: "Website", city: "Faisalabad", initials: "Z", color: "bg-sky-500", notes: "Quotation sent. Awaiting approval.", created: "5 days ago" },
  { id: "L-005", name: "Kamran Mehndi", phone: "+92 311 9876543", email: "kamran@hotmail.com", event: "Mehndi Night", eventDate: "2026-11-03", score: "Cold", status: "Negotiating", budget: 180000, source: "Social Media", city: "Multan", initials: "K", color: "bg-emerald-500", notes: "Comparing quotes. Budget is tight.", created: "1 week ago" },
  { id: "L-006", name: "Sara Corporate", phone: "+92 333 1112233", email: "sara@brand.pk", event: "Product Launch", eventDate: "2026-09-15", score: "Hot", status: "Converted", budget: 350000, source: "Referral", city: "Lahore", initials: "S", color: "bg-amber-500", notes: "Converted to booking BK-1032.", created: "2 weeks ago" },
  { id: "L-007", name: "Umar Birthday", phone: "+92 300 9998877", email: "umar@gmail.com", event: "Birthday Party", eventDate: "2026-08-20", score: "Cold", status: "Lost", budget: 50000, source: "Phone", city: "Rawalpindi", initials: "U", color: "bg-gray-400", notes: "Went with another photographer.", created: "3 weeks ago" },
]

const SCORES = ["All", "Hot", "Warm", "Cold"]
const STATUSES = ["All", "New Inquiry", "Contacted", "Meeting Scheduled", "Quoted", "Negotiating", "Converted", "Lost"]

const inputCls = "w-full px-4 py-2.5 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
const labelCls = "text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest"

export default function LeadsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filterScore, setFilterScore] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")
  const [showAdd, setShowAdd] = useState(false)

  const filtered = ALL_LEADS.filter(l => {
    const q = search.toLowerCase()
    const matchSearch = l.name.toLowerCase().includes(q) || l.event.toLowerCase().includes(q) || l.city.toLowerCase().includes(q)
    const matchScore = filterScore === "All" || l.score === filterScore
    const matchStatus = filterStatus === "All" || l.status === filterStatus
    return matchSearch && matchScore && matchStatus
  })

  const stats = {
    hot:  ALL_LEADS.filter(l => l.score === "Hot" && l.status !== "Lost").length,
    warm: ALL_LEADS.filter(l => l.score === "Warm" && l.status !== "Lost").length,
    cold: ALL_LEADS.filter(l => l.score === "Cold" && l.status !== "Lost").length,
    converted: ALL_LEADS.filter(l => l.status === "Converted").length,
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Leads Pipeline</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Qualify, score, and convert inquiries into confirmed bookings</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Score Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Hot Leads", value: stats.hot, icon: Flame, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
          { label: "Warm Leads", value: stats.warm, icon: Thermometer, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Cold Leads", value: stats.cold, icon: Snowflake, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
          { label: "Converted", value: stats.converted, icon: ArrowRight, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex items-center gap-3`}>
            <s.icon className={`w-5 h-5 ${s.color} shrink-0`} />
            <div>
              <div className={`text-[20px] font-black ${s.color}`}>{s.value}</div>
              <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads…" className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all" />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SCORES.map(s => (
            <button key={s} onClick={() => setFilterScore(s)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer transition-all border ${filterScore === s ? "bg-[#4F46E5] text-white border-[#4F46E5]" : "bg-white dark:bg-[#111118] border-[#E5E7EB] dark:border-white/10 text-[#9CA3AF] hover:border-[#4F46E5] hover:text-[#4F46E5]"}`}>{s}</button>
          ))}
          <div className="w-px bg-[#E5E7EB] dark:bg-white/10 mx-1" />
          {STATUSES.slice(0,5).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer transition-all border ${filterStatus === s ? "bg-[#111827] dark:bg-white text-white dark:text-[#111827] border-[#111827] dark:border-white" : "bg-white dark:bg-[#111118] border-[#E5E7EB] dark:border-white/10 text-[#9CA3AF] hover:border-[#4F46E5] hover:text-[#4F46E5]"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Mobile Cards */}
      {filtered.length > 0 && (
        <div className="flex flex-col gap-3 sm:hidden">
          {filtered.map(lead => {
            const ScoreConfig = SCORE_CONFIG[lead.score as keyof typeof SCORE_CONFIG]
            const SrcIcon = SOURCE_ICONS[lead.source] || Globe
            return (
              <div key={lead.id} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${lead.color} text-white text-[11px] font-black flex items-center justify-center shrink-0`}>{lead.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black text-[#111827] dark:text-white truncate">{lead.name}</div>
                    <div className="text-[10px] text-[#9CA3AF]">{lead.city} · {lead.created}</div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black ${ScoreConfig.bg} ${ScoreConfig.color}`}>
                    <ScoreConfig.icon className="w-3 h-3" /> {lead.score}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><div className={labelCls}>Event</div><div className="font-semibold text-[#374151] dark:text-gray-300 mt-0.5">{lead.event}</div></div>
                  <div><div className={labelCls}>Budget</div><div className="font-black text-[#111827] dark:text-white mt-0.5">₨{(lead.budget/1000).toFixed(0)}K</div></div>
                  <div><div className={labelCls}>Date</div><div className="font-semibold text-[#374151] dark:text-gray-300 mt-0.5">{lead.eventDate}</div></div>
                  <div><div className={labelCls}>Source</div><div className="font-semibold text-[#374151] dark:text-gray-300 mt-0.5 flex items-center gap-1"><SrcIcon className="w-3 h-3" />{lead.source}</div></div>
                </div>
                <span className={`inline-block text-[9px] font-black px-2.5 py-1 rounded-full ${STATUS_STYLES[lead.status]}`}>{lead.status}</span>
                <div className="flex gap-2 pt-1 border-t border-[#F3F4F6] dark:border-white/5">
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 rounded-lg cursor-pointer"><Phone className="w-3 h-3" /> Call</a>
                  <a href={`https://wa.me/${lead.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#22C55E] bg-emerald-50 dark:bg-emerald-500/10 rounded-lg cursor-pointer"><MessageCircle className="w-3 h-3" /> WhatsApp</a>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#6B7280] dark:text-gray-400 bg-[#F8FAFC] dark:bg-white/5 rounded-lg cursor-pointer ml-auto"><ArrowRight className="w-3 h-3" /> Convert</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Desktop Table */}
      {filtered.length > 0 && (
        <div className="hidden sm:block bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                  {["Lead", "Event", "Budget", "Source", "Score", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => {
                  const ScoreConfig = SCORE_CONFIG[lead.score as keyof typeof SCORE_CONFIG]
                  const SrcIcon = SOURCE_ICONS[lead.source] || Globe
                  return (
                    <tr key={lead.id} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${lead.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>{lead.initials}</div>
                          <div>
                            <div className="text-[12px] font-bold text-[#111827] dark:text-white">{lead.name}</div>
                            <div className="text-[9px] text-[#9CA3AF]">{lead.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[11px] font-semibold text-[#374151] dark:text-gray-300">{lead.event}</div>
                        <div className="text-[9px] text-[#9CA3AF] flex items-center gap-1 mt-0.5"><Calendar className="w-3 h-3" />{lead.eventDate}</div>
                      </td>
                      <td className="px-5 py-4 text-[11px] font-black text-[#111827] dark:text-white">₨{lead.budget.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] dark:text-gray-400">
                          <SrcIcon className="w-3.5 h-3.5" /> {lead.source}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`flex items-center gap-1.5 text-[9px] font-black px-2 py-1 rounded-full w-fit ${ScoreConfig.bg} ${ScoreConfig.color}`}>
                          <ScoreConfig.icon className="w-3 h-3" /> {lead.score}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[9px] font-black px-2 py-1 rounded-full ${STATUS_STYLES[lead.status]}`}>{lead.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <a href={`tel:${lead.phone}`} className="p-1.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg text-[#9CA3AF] hover:text-[#4F46E5] transition-colors cursor-pointer"><Phone className="w-3.5 h-3.5" /></a>
                          <a href={`mailto:${lead.email}`} className="p-1.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg text-[#9CA3AF] hover:text-[#4F46E5] transition-colors cursor-pointer"><Mail className="w-3.5 h-3.5" /></a>
                          <button className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg text-[#9CA3AF] hover:text-emerald-500 transition-colors cursor-pointer"><MessageCircle className="w-3.5 h-3.5" /></button>
                          <button className="flex items-center gap-1 px-2 py-1 bg-[#4F46E5] text-white text-[8px] font-black rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors ml-1">Convert <ArrowRight className="w-2.5 h-2.5" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl py-14 text-center text-sm text-[#9CA3AF]">No leads found.</div>
      )}
    </div>
  )
}
