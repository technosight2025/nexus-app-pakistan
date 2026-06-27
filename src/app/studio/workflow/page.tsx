"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight, CheckCircle2, Clock, AlertCircle, Circle,
  TrendingUp, Users, DollarSign, Zap, ChevronRight,
  Phone, Star, Camera, FileText, CreditCard, Package,
  UploadCloud, Edit3, Eye, Truck, BadgeCheck, Heart,
  MoreVertical, Calendar
} from "lucide-react"

const STAGES = [
  { id: 1, name: "New Inquiry", group: "lead", groupLabel: "Lead", color: "#F59E0B", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20", icon: Phone },
  { id: 2, name: "Lead Qualification", group: "lead", groupLabel: "Lead", color: "#F59E0B", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20", icon: Star },
  { id: 3, name: "Consultation", group: "lead", groupLabel: "Lead", color: "#F59E0B", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-200 dark:border-amber-500/20", icon: Users },
  { id: 4, name: "Quotation", group: "sales", groupLabel: "Sales", color: "#0EA5E9", bg: "bg-sky-50 dark:bg-sky-500/10", border: "border-sky-200 dark:border-sky-500/20", icon: FileText },
  { id: 5, name: "Client Approval", group: "sales", groupLabel: "Sales", color: "#0EA5E9", bg: "bg-sky-50 dark:bg-sky-500/10", border: "border-sky-200 dark:border-sky-500/20", icon: CheckCircle2 },
  { id: 6, name: "Contract & Payment", group: "sales", groupLabel: "Sales", color: "#0EA5E9", bg: "bg-sky-50 dark:bg-sky-500/10", border: "border-sky-200 dark:border-sky-500/20", icon: CreditCard },
  { id: 7, name: "Project Created", group: "preprod", groupLabel: "Pre-Production", color: "#8B5CF6", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20", icon: Package },
  { id: 8, name: "Team Assignment", group: "preprod", groupLabel: "Pre-Production", color: "#8B5CF6", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20", icon: Users },
  { id: 9, name: "Equipment Allocated", group: "preprod", groupLabel: "Pre-Production", color: "#8B5CF6", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20", icon: Camera },
  { id: 10, name: "Production Planning", group: "preprod", groupLabel: "Pre-Production", color: "#8B5CF6", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-200 dark:border-violet-500/20", icon: Calendar },
  { id: 11, name: "Event Day", group: "production", groupLabel: "Production", color: "#4F46E5", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", icon: Camera },
  { id: 12, name: "Media Upload", group: "production", groupLabel: "Production", color: "#4F46E5", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", icon: UploadCloud },
  { id: 13, name: "Editing Workflow", group: "production", groupLabel: "Production", color: "#4F46E5", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-500/20", icon: Edit3 },
  { id: 14, name: "Internal Review", group: "review", groupLabel: "Review", color: "#F43F5E", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-500/20", icon: Eye },
  { id: 15, name: "Client Review", group: "review", groupLabel: "Review", color: "#F43F5E", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-500/20", icon: Eye },
  { id: 16, name: "Revisions", group: "review", groupLabel: "Review", color: "#F43F5E", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-200 dark:border-rose-500/20", icon: Edit3 },
  { id: 17, name: "Final Delivery", group: "delivery", groupLabel: "Delivery", color: "#22C55E", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20", icon: Truck },
  { id: 18, name: "Final Payment", group: "delivery", groupLabel: "Delivery", color: "#22C55E", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20", icon: DollarSign },
  { id: 19, name: "Project Closure", group: "delivery", groupLabel: "Delivery", color: "#22C55E", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-500/20", icon: BadgeCheck },
  { id: 20, name: "Post-Project", group: "post", groupLabel: "Post-Project", color: "#14B8A6", bg: "bg-teal-50 dark:bg-teal-500/10", border: "border-teal-200 dark:border-teal-500/20", icon: Heart },
]

const BOOKINGS = [
  { id: "BK-1024", client: "Ayesha & Hamza", event: "Walima", stage: 13, initials: "A", color: "bg-indigo-500" },
  { id: "BK-1025", client: "Sara Imran", event: "Bridal Shoot", stage: 4, initials: "S", color: "bg-sky-500" },
  { id: "BK-1026", client: "Malik Family", event: "Engagement", stage: 8, initials: "M", color: "bg-emerald-500" },
  { id: "BK-1027", client: "Nadia & Ali", event: "Mehndi", stage: 17, initials: "N", color: "bg-amber-500" },
  { id: "BK-1028", client: "Farhan Malik", event: "Corporate Event", stage: 6, initials: "F", color: "bg-purple-500" },
  { id: "BK-1029", client: "Zara & Omar", event: "Nikah Ceremony", stage: 20, initials: "Z", color: "bg-rose-500" },
  { id: "BK-1030", client: "Hassan Ali", event: "Birthday Party", stage: 19, initials: "H", color: "bg-teal-500" },
  { id: "BK-1031", client: "Bilal Khan", event: "Product Launch", stage: 2, initials: "B", color: "bg-cyan-500" },
]

const GROUP_COLORS: Record<string, { dot: string; label: string }> = {
  lead:       { dot: "bg-amber-400",  label: "text-amber-600 dark:text-amber-400" },
  sales:      { dot: "bg-sky-400",    label: "text-sky-600 dark:text-sky-400" },
  preprod:    { dot: "bg-violet-400", label: "text-violet-600 dark:text-violet-400" },
  production: { dot: "bg-indigo-400", label: "text-indigo-600 dark:text-indigo-400" },
  review:     { dot: "bg-rose-400",   label: "text-rose-600 dark:text-rose-400" },
  delivery:   { dot: "bg-emerald-400",label: "text-emerald-600 dark:text-emerald-400" },
  post:       { dot: "bg-teal-400",   label: "text-teal-600 dark:text-teal-400" },
}

export default function WorkflowPage() {
  const router = useRouter()
  const [selectedBooking, setSelectedBooking] = useState(BOOKINGS[0])
  const [view, setView] = useState<"timeline" | "table">("timeline")

  const currentStage = STAGES.find(s => s.id === selectedBooking.stage)!

  const stageStats = STAGES.map(s => ({
    ...s,
    count: BOOKINGS.filter(b => b.stage === s.id).length,
  }))

  const groupSummary = [
    { label: "Lead Phase", group: "lead", count: BOOKINGS.filter(b => b.stage <= 3).length, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Sales Phase", group: "sales", count: BOOKINGS.filter(b => b.stage >= 4 && b.stage <= 6).length, color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10" },
    { label: "Production", group: "production", count: BOOKINGS.filter(b => b.stage >= 7 && b.stage <= 13).length, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Review", group: "review", count: BOOKINGS.filter(b => b.stage >= 14 && b.stage <= 16).length, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { label: "Delivery", group: "delivery", count: BOOKINGS.filter(b => b.stage >= 17 && b.stage <= 19).length, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Completed", group: "post", count: BOOKINGS.filter(b => b.stage === 20).length, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-500/10" },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Workflow Pipeline</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Track every booking through all 20 business stages</p>
        </div>
        <div className="flex items-center gap-2">
          {(["timeline", "table"] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-2 text-[10px] font-black rounded-xl cursor-pointer transition-all capitalize ${view === v ? "bg-[#4F46E5] text-white" : "bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 text-[#6B7280] hover:text-[#4F46E5]"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {groupSummary.map(g => (
          <div key={g.label} className={`${g.bg} rounded-2xl p-4 border border-transparent`}>
            <div className={`text-[20px] font-black ${g.color}`}>{g.count}</div>
            <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mt-0.5">{g.label}</div>
          </div>
        ))}
      </div>

      {view === "timeline" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left — Booking Selector */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5">
              <div className="text-[11px] font-black text-[#111827] dark:text-white uppercase tracking-widest">Active Bookings</div>
            </div>
            <div className="divide-y divide-[#F9FAFB] dark:divide-white/3">
              {BOOKINGS.map(b => {
                const stage = STAGES.find(s => s.id === b.stage)!
                const gc = GROUP_COLORS[stage.group]
                const isSelected = selectedBooking.id === b.id
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors ${isSelected ? "bg-[#EEF2FF] dark:bg-indigo-500/10" : "hover:bg-[#F8FAFC] dark:hover:bg-white/3"}`}
                  >
                    <div className={`w-8 h-8 rounded-xl ${b.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>
                      {b.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-[#111827] dark:text-white truncate">{b.client}</div>
                      <div className="text-[9px] text-[#9CA3AF]">{b.event}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-[9px] font-black ${gc.label} flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${gc.dot}`} />
                        Stage {b.stage}
                      </div>
                      <div className="text-[8px] text-[#9CA3AF] mt-0.5 truncate max-w-[80px]">{stage.name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right — Stage Timeline */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${selectedBooking.color} text-white text-[9px] font-black flex items-center justify-center`}>
                    {selectedBooking.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-[#111827] dark:text-white">{selectedBooking.client}</div>
                    <div className="text-[9px] text-[#9CA3AF]">{selectedBooking.event} · {selectedBooking.id}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/studio/bookings/${selectedBooking.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors"
              >
                Open <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-5 py-3 bg-[#F8FAFC] dark:bg-white/2 border-b border-[#F3F4F6] dark:border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Overall Progress</span>
                <span className="text-[11px] font-black text-[#4F46E5]">{Math.round((selectedBooking.stage / 20) * 100)}%</span>
              </div>
              <div className="h-2 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(selectedBooking.stage / 20) * 100}%`,
                    background: `linear-gradient(90deg, #4F46E5, ${currentStage.color})`
                  }}
                />
              </div>
            </div>

            <div className="p-5 space-y-2 overflow-y-auto max-h-[520px]">
              {STAGES.map((stage, idx) => {
                const isDone = stage.id < selectedBooking.stage
                const isActive = stage.id === selectedBooking.stage
                const isPending = stage.id > selectedBooking.stage
                const StageIcon = stage.icon
                const gc = GROUP_COLORS[stage.group]

                return (
                  <div key={stage.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? "border-2 " + stage.border + " " + stage.bg : isDone ? "opacity-60" : "opacity-40"}`}>
                    {/* Icon */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isDone ? "bg-[#22C55E]/15" : isActive ? stage.bg : "bg-[#F8FAFC] dark:bg-white/5"}`}>
                      {isDone
                        ? <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                        : isActive
                        ? <StageIcon className="w-4 h-4" style={{ color: stage.color }} />
                        : <Circle className="w-4 h-4 text-[#D1D5DB] dark:text-white/20" />
                      }
                    </div>

                    {/* Stage info */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-[11px] font-bold ${isActive ? "text-[#111827] dark:text-white" : "text-[#6B7280] dark:text-gray-400"}`}>
                        {stage.id}. {stage.name}
                      </div>
                      {isActive && (
                        <div className={`text-[9px] font-black ${gc.label} flex items-center gap-1 mt-0.5`}>
                          <span className={`w-1 h-1 rounded-full ${gc.dot}`} />
                          {stage.groupLabel} · Active
                        </div>
                      )}
                    </div>

                    {/* Connector line */}
                    {idx < STAGES.length - 1 && (
                      <ChevronRight className={`w-3 h-3 shrink-0 ${isDone ? "text-[#22C55E]" : "text-[#D1D5DB] dark:text-white/15"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {view === "table" && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-[#F9FAFB] dark:divide-white/3">
            {BOOKINGS.map(b => {
              const stage = STAGES.find(s => s.id === b.stage)!
              const gc = GROUP_COLORS[stage.group]
              const pct = Math.round((b.stage / 20) * 100)
              return (
                <div key={b.id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${b.color} text-white text-[10px] font-black flex items-center justify-center`}>{b.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-black text-[#111827] dark:text-white">{b.client}</div>
                      <div className="text-[10px] text-[#9CA3AF]">{b.event} · {b.id}</div>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full ${gc.label} ${stage.bg}`}>Stage {b.stage}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-[#9CA3AF]">{stage.name}</span>
                      <span className="font-black text-[#4F46E5]">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                  {["Booking", "Event", "Current Stage", "Phase", "Progress", ""].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map(b => {
                  const stage = STAGES.find(s => s.id === b.stage)!
                  const gc = GROUP_COLORS[stage.group]
                  const pct = Math.round((b.stage / 20) * 100)
                  return (
                    <tr key={b.id} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${b.color} text-white text-[10px] font-black flex items-center justify-center shrink-0`}>{b.initials}</div>
                          <div>
                            <div className="text-[12px] font-bold text-[#111827] dark:text-white">{b.client}</div>
                            <div className="text-[9px] text-[#9CA3AF]">{b.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[11px] font-semibold text-[#374151] dark:text-gray-300">{b.event}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${gc.label} ${stage.bg}`}>
                          {stage.id}. {stage.name}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[9px] font-black ${gc.label} flex items-center gap-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${gc.dot}`} />{stage.groupLabel}
                        </span>
                      </td>
                      <td className="px-5 py-4 w-40">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[9px] font-black text-[#9CA3AF] shrink-0">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => router.push(`/studio/bookings/${b.id}`)}
                          className="flex items-center gap-1 text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer"
                        >
                          Open <ArrowRight className="w-3 h-3" />
                        </button>
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
