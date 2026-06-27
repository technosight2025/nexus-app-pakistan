"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, ArrowRight, Phone, Star, FileText, CheckCircle2, Briefcase, MoreVertical } from "lucide-react"

const COLUMNS = [
  { id: "inquiry",    label: "New Inquiry",     stages: [1],     color: "#F59E0B", bg: "bg-amber-50 dark:bg-amber-500/8",   dot: "bg-amber-400" },
  { id: "qualified",  label: "Qualified",        stages: [2,3],   color: "#0EA5E9", bg: "bg-sky-50 dark:bg-sky-500/8",      dot: "bg-sky-400" },
  { id: "quoted",     label: "Quoted",           stages: [4,5],   color: "#8B5CF6", bg: "bg-violet-50 dark:bg-violet-500/8", dot: "bg-violet-400" },
  { id: "confirmed",  label: "Confirmed",        stages: [6,7],   color: "#4F46E5", bg: "bg-indigo-50 dark:bg-indigo-500/8", dot: "bg-indigo-400" },
  { id: "production", label: "In Production",    stages: [8,9,10,11,12,13], color: "#F43F5E", bg: "bg-rose-50 dark:bg-rose-500/8", dot: "bg-rose-400" },
  { id: "review",     label: "Review",           stages: [14,15,16], color: "#14B8A6", bg: "bg-teal-50 dark:bg-teal-500/8",  dot: "bg-teal-400" },
  { id: "delivered",  label: "Delivered",        stages: [17,18,19,20], color: "#22C55E", bg: "bg-emerald-50 dark:bg-emerald-500/8", dot: "bg-emerald-400" },
]

const SCORE_STYLES: Record<string, string> = {
  Hot:  "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400",
  Warm: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400",
  Cold: "text-sky-600 bg-sky-50 dark:bg-sky-500/10 dark:text-sky-400",
}

const SOURCE_ICONS: Record<string, string> = {
  "Marketplace": "🛍️",
  "WhatsApp": "💬",
  "Referral": "🤝",
  "Website": "🌐",
  "Walk-in": "🚶",
  "Social Media": "📱",
  "Phone": "📞",
}

const ALL_CARDS = [
  { id: "L-001", client: "Ahmed & Sana", event: "Wedding", budget: 500000, stage: 1, score: "Hot", source: "Marketplace", date: "Nov 15", initials: "A", color: "bg-indigo-500", phone: "+92 300 1234567" },
  { id: "L-002", client: "Tariq Corp", event: "Corporate Gala", budget: 800000, stage: 2, score: "Warm", source: "Referral", date: "Oct 20", initials: "T", color: "bg-purple-500", phone: "+92 321 7654321" },
  { id: "L-003", client: "Ayesha Walima", event: "Walima", budget: 250000, stage: 3, score: "Hot", source: "WhatsApp", date: "Dec 5", initials: "A", color: "bg-rose-500", phone: "+92 333 9876543" },
  { id: "L-004", client: "Zainab Family", event: "Engagement", budget: 150000, stage: 4, score: "Warm", source: "Website", date: "Oct 28", initials: "Z", color: "bg-sky-500", phone: "+92 300 4567890" },
  { id: "L-005", client: "Kamran Mehndi", event: "Mehndi Night", budget: 180000, stage: 5, score: "Hot", source: "Social Media", date: "Nov 3", initials: "K", color: "bg-emerald-500", phone: "+92 311 9876543" },
  { id: "BK-1024", client: "Ayesha & Hamza", event: "Walima", budget: 120000, stage: 6, score: "Hot", source: "Marketplace", date: "Jul 5", initials: "A", color: "bg-indigo-500", phone: "+92 300 1234567" },
  { id: "BK-1026", client: "Malik Family", event: "Engagement", budget: 65000, stage: 8, score: "Warm", source: "Referral", date: "Jul 14", initials: "M", color: "bg-emerald-500", phone: "+92 333 5551234" },
  { id: "BK-1028", client: "Farhan Malik", event: "Corporate Event", budget: 180000, stage: 11, score: "Hot", source: "Marketplace", date: "Jul 22", initials: "F", color: "bg-purple-500", phone: "+92 300 7890123" },
  { id: "BK-1024b", client: "Nadia & Ali", event: "Mehndi", budget: 35000, stage: 13, score: "Warm", source: "WhatsApp", date: "Jul 18", initials: "N", color: "bg-amber-500", phone: "+92 311 4445678" },
  { id: "BK-1025", client: "Sara Imran", event: "Bridal Shoot", budget: 45000, stage: 15, score: "Hot", source: "Walk-in", date: "Jul 10", initials: "S", color: "bg-sky-500", phone: "+92 321 9876543" },
  { id: "BK-1029", client: "Zara & Omar", event: "Nikah Ceremony", budget: 55000, stage: 18, score: "Warm", source: "Referral", date: "Jun 28", initials: "Z", color: "bg-rose-500", phone: "+92 333 2221234" },
  { id: "BK-1030", client: "Hassan Ali", event: "Birthday Party", budget: 25000, stage: 20, score: "Cold", source: "Phone", date: "Jun 15", initials: "H", color: "bg-teal-500", phone: "+92 321 7777777" },
]

export default function PipelinePage() {
  const router = useRouter()
  const [dragId, setDragId] = useState<string | null>(null)

  const getColumnCards = (col: typeof COLUMNS[0]) =>
    ALL_CARDS.filter(c => col.stages.includes(c.stage))

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Kanban Pipeline</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Drag-and-drop booking cards across pipeline stages</p>
        </div>
        <button
          onClick={() => router.push("/studio/leads")}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
        {COLUMNS.map(col => (
          <div key={col.id} className={`${col.bg} rounded-xl p-3 text-center border border-transparent`}>
            <div className="text-[16px] font-black" style={{ color: col.color }}>{getColumnCards(col).length}</div>
            <div className="text-[8px] font-black text-[#9CA3AF] uppercase tracking-widest leading-tight mt-0.5">{col.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban board — horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-2 -mx-1 px-1">
        <div className="flex gap-4" style={{ minWidth: `${COLUMNS.length * 280}px` }}>
          {COLUMNS.map(col => {
            const cards = getColumnCards(col)
            return (
              <div key={col.id} className="w-[268px] shrink-0 flex flex-col gap-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <span className="text-[11px] font-black text-[#374151] dark:text-gray-300">{col.label}</span>
                  </div>
                  <span className="text-[9px] font-black text-[#9CA3AF] bg-[#F8FAFC] dark:bg-white/5 px-1.5 py-0.5 rounded-full">{cards.length}</span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2.5 min-h-[120px]">
                  {cards.map(card => (
                    <div
                      key={card.id}
                      className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 cursor-pointer hover:shadow-md hover:border-[#4F46E5]/30 transition-all group"
                      onClick={() => router.push(`/studio/bookings/${card.id}`)}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg ${card.color} text-white text-[9px] font-black flex items-center justify-center shrink-0`}>
                            {card.initials}
                          </div>
                          <div>
                            <div className="text-[11px] font-black text-[#111827] dark:text-white leading-tight">{card.client}</div>
                            <div className="text-[8px] text-[#9CA3AF]">{card.id}</div>
                          </div>
                        </div>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${SCORE_STYLES[card.score]}`}>
                          {card.score}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#9CA3AF]">{card.event}</span>
                          <span className="font-black text-[#111827] dark:text-white">₨{(card.budget / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-[#9CA3AF]">
                          <span>{SOURCE_ICONS[card.source]} {card.source}</span>
                          <span>📅 {card.date}</span>
                        </div>
                      </div>

                      {/* Stage badge */}
                      <div className="mt-3 pt-3 border-t border-[#F3F4F6] dark:border-white/5">
                        <div className="text-[9px] font-black text-[#9CA3AF]">Stage {card.stage} of 20</div>
                        <div className="mt-1 h-1 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(card.stage / 20) * 100}%`, background: col.color }} />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Empty drop zone */}
                  {cards.length === 0 && (
                    <div className={`${col.bg} border-2 border-dashed rounded-2xl p-6 flex items-center justify-center`} style={{ borderColor: col.color + "40" }}>
                      <span className="text-[10px] font-bold text-[#9CA3AF]">Drop cards here</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
