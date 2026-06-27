"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar, Plus, Search, Download,
  CheckCircle, Clock, XCircle, ArrowUpRight,
  MapPin, Eye, Edit, Trash2, ChevronRight
} from "lucide-react"

const ALL_BOOKINGS = [
  { id: "BK-1024", client: "Ayesha & Hamza", event: "Walima", date: "Jul 5, 2025", venue: "Pearl Continental, Lahore", team: ["U","A","F"], status: "Confirmed", amount: 120000, paid: 60000, initials: "A", color: "bg-indigo-500" },
  { id: "BK-1025", client: "Sara Imran", event: "Bridal Shoot", date: "Jul 10, 2025", venue: "Studio B, Gulberg", team: ["K"], status: "Pending", amount: 45000, paid: 0, initials: "S", color: "bg-sky-500" },
  { id: "BK-1026", client: "Malik Family", event: "Engagement", date: "Jul 14, 2025", venue: "Serena Hotel, Islamabad", team: ["U","A"], status: "Confirmed", amount: 65000, paid: 30000, initials: "M", color: "bg-emerald-500" },
  { id: "BK-1027", client: "Nadia & Ali", event: "Mehndi", date: "Jul 18, 2025", venue: "Alhamra Arts Council", team: ["F"], status: "In Progress", amount: 35000, paid: 35000, initials: "N", color: "bg-amber-500" },
  { id: "BK-1028", client: "Farhan Malik", event: "Corporate Event", date: "Jul 22, 2025", venue: "Expo Center, Lahore", team: ["U","K","A"], status: "Confirmed", amount: 180000, paid: 90000, initials: "F", color: "bg-purple-500" },
  { id: "BK-1029", client: "Zara & Omar", event: "Nikah Ceremony", date: "Jun 28, 2025", venue: "Family Residence", team: ["A"], status: "Completed", amount: 55000, paid: 55000, initials: "Z", color: "bg-rose-500" },
  { id: "BK-1030", client: "Hassan Ali", event: "Birthday Party", date: "Jun 15, 2025", venue: "Country Club", team: ["K","F"], status: "Completed", amount: 25000, paid: 25000, initials: "H", color: "bg-teal-500" },
  { id: "BK-1031", client: "Bilal Khan", event: "Product Launch", date: "Aug 2, 2025", venue: "Marriott, Karachi", team: ["U","A"], status: "Pending", amount: 95000, paid: 0, initials: "B", color: "bg-cyan-500" },
]

const STATUS_STYLES: Record<string, string> = {
  "Confirmed":  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Pending":    "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "In Progress":"bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  "Completed":  "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400",
  "Cancelled":  "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
}

const STATUS_ICONS: Record<string, React.ElementType> = {
  "Confirmed":   CheckCircle,
  "Pending":     Clock,
  "In Progress": ArrowUpRight,
  "Completed":   CheckCircle,
  "Cancelled":   XCircle,
}

export default function BookingsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const statuses = ["All", "Confirmed", "Pending", "In Progress", "Completed", "Cancelled"]

  const filtered = ALL_BOOKINGS.filter(b => {
    const matchesSearch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.event.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "All" || b.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = filtered.reduce((sum, b) => sum + b.amount, 0)
  const totalPaid    = filtered.reduce((sum, b) => sum + b.paid, 0)
  const totalPending = totalRevenue - totalPaid

  const summaryCards = [
    { label: "Total Bookings", value: String(filtered.length),              color: "text-[#4F46E5]",  bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
    { label: "Total Revenue",  value: `₨${totalRevenue.toLocaleString()}`, color: "text-[#22C55E]",  bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Amount Paid",    value: `₨${totalPaid.toLocaleString()}`,    color: "text-[#0EA5E9]",  bg: "bg-sky-50 dark:bg-sky-500/10" },
    { label: "Outstanding",    value: `₨${totalPending.toLocaleString()}`, color: "text-[#F59E0B]",  bg: "bg-amber-50 dark:bg-amber-500/10" },
  ]

  return (
    <div className="space-y-5 md:space-y-6">

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {summaryCards.map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl md:rounded-2xl p-4 md:p-5`}>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1">{c.label}</div>
            <div className={`text-[17px] md:text-[22px] font-black ${c.color} leading-none`}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* ── Controls Bar ── */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 space-y-3">
        {/* Row 1: Search + New Booking */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search bookings…"
              className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
            />
          </div>
          <button
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[10px] font-black text-[#6B7280] dark:text-gray-400 hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-all cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            onClick={() => router.push("/studio/bookings/new")}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] text-white rounded-xl text-[10px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> New Booking
          </button>
        </div>

        {/* Row 2: Status filters */}
        <div className="flex flex-wrap gap-1.5">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${
                filterStatus === s
                  ? "bg-[#4F46E5] text-white"
                  : "bg-[#F8FAFC] dark:bg-white/5 text-[#9CA3AF] hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 hover:text-[#4F46E5]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty State ── */}
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl py-14 text-center text-sm text-[#9CA3AF]">
          No bookings found.
        </div>
      )}

      {/* ══════════════════════════════════
          MOBILE CARD LIST  (hidden on sm+)
      ══════════════════════════════════ */}
      {filtered.length > 0 && (
        <div className="flex flex-col gap-3 sm:hidden">
          {filtered.map(b => {
            const StatusIcon = STATUS_ICONS[b.status]
            const paidPct = b.amount > 0 ? Math.round((b.paid / b.amount) * 100) : 0
            return (
              <div
                key={b.id}
                onClick={() => router.push(`/studio/bookings/${b.id}`)}
                className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 space-y-3 cursor-pointer"
              >
                {/* Top row: avatar + name + status */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${b.color} text-white text-[11px] font-black flex items-center justify-center shrink-0`}>
                    {b.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black text-[#111827] dark:text-white truncate">{b.client}</div>
                    <div className="text-[10px] text-[#9CA3AF] font-bold">{b.id}</div>
                  </div>
                  <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[b.status]}`}>
                    <StatusIcon className="w-2.5 h-2.5" />
                    {b.status}
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-[11px]">
                  <div>
                    <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-0.5">Event</div>
                    <div className="font-semibold text-[#374151] dark:text-gray-300">{b.event}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-0.5">Date</div>
                    <div className="font-semibold text-[#374151] dark:text-gray-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#9CA3AF] shrink-0" />{b.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-0.5">Venue</div>
                    <div className="font-semibold text-[#374151] dark:text-gray-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#9CA3AF] shrink-0" />
                      <span className="truncate">{b.venue}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-0.5">Team</div>
                    <div className="flex -space-x-1.5">
                      {b.team.map((initial, i) => (
                        <div key={i} className="w-5 h-5 rounded-full bg-[#4F46E5] text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-[#111118]">
                          {initial}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-black text-[#111827] dark:text-white">₨{b.amount.toLocaleString()}</span>
                    <span className="text-[10px] text-[#9CA3AF]">{paidPct}% paid</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full transition-all" style={{ width: `${paidPct}%` }} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#F3F4F6] dark:border-white/5">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
                    <Eye className="w-3 h-3" /> View
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#6B7280] dark:text-gray-400 bg-[#F8FAFC] dark:bg-white/5 rounded-lg cursor-pointer hover:bg-[#EEF2FF] hover:text-[#4F46E5] transition-colors">
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#EF4444] bg-red-50 dark:bg-red-500/10 rounded-lg cursor-pointer hover:bg-red-100 transition-colors ml-auto">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ══════════════════════════════════
          DESKTOP TABLE  (hidden on mobile)
      ══════════════════════════════════ */}
      {filtered.length > 0 && (
        <div className="hidden sm:block bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                  {["Client & ID", "Event", "Date", "Venue", "Team", "Payment", "Status", ""].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => {
                  const StatusIcon = STATUS_ICONS[b.status]
                  const paidPct = b.amount > 0 ? Math.round((b.paid / b.amount) * 100) : 0
                  return (
                    <tr key={b.id} onClick={() => router.push(`/studio/bookings/${b.id}`)} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${b.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>
                            {b.initials}
                          </div>
                          <div>
                            <div className="text-[12px] font-bold text-[#111827] dark:text-white">{b.client}</div>
                            <div className="text-[9px] text-[#9CA3AF] font-bold">{b.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[11px] font-semibold text-[#374151] dark:text-gray-300">{b.event}</td>
                      <td className="px-5 py-4 text-[11px] text-[#374151] dark:text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#9CA3AF]" /> {b.date}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[10px] text-[#6B7280] dark:text-gray-400 max-w-[140px]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#9CA3AF] shrink-0" />
                          <span className="truncate">{b.venue}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex -space-x-1.5">
                          {b.team.map((initial, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-[#111118]">
                              {initial}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[11px] font-black text-[#111827] dark:text-white">₨{b.amount.toLocaleString()}</div>
                        <div className="mt-1 h-1 w-20 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${paidPct}%` }} />
                        </div>
                        <div className="text-[8px] text-[#9CA3AF] mt-0.5">{paidPct}% paid</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full w-fit ${STATUS_STYLES[b.status]}`}>
                          <StatusIcon className="w-2.5 h-2.5" />
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button className="p-1.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg transition-colors text-[#9CA3AF] hover:text-[#4F46E5] cursor-pointer">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-lg transition-colors text-[#9CA3AF] hover:text-[#4F46E5] cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-[#9CA3AF] hover:text-[#EF4444] cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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

    </div>
  )
}
