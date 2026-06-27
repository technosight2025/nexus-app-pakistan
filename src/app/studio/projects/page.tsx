"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Plus, Search, Filter, MoreVertical, Calendar, Users,
  Clock, AlertCircle, CheckCircle, ArrowRight, Folder
} from "lucide-react"

type Priority = "high" | "medium" | "low"
type ProjectCard = {
  id: string; title: string; client: string; deadline: string
  priority: Priority; team: string[]; progress: number; tags: string[]
}

type Column = {
  id: string; label: string; color: string; dot: string; cards: ProjectCard[]
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: "inquiry", label: "Inquiry", color: "text-[#9CA3AF]", dot: "bg-[#9CA3AF]",
    cards: [
      { id: "P-01", title: "Sana & Bilal Wedding", client: "Sana Riaz", deadline: "Aug 2", priority: "high", team: ["U","A"], progress: 10, tags: ["Wedding","Photography"] },
      { id: "P-02", title: "Corporate Branding Shoot", client: "Zara Corp", deadline: "Aug 15", priority: "medium", team: ["K"], progress: 5, tags: ["Corporate"] },
    ]
  },
  {
    id: "planning", label: "Planning", color: "text-[#0EA5E9]", dot: "bg-[#0EA5E9]",
    cards: [
      { id: "P-03", title: "Khan Family Valima", client: "Khan Family", deadline: "Jul 30", priority: "medium", team: ["A","F"], progress: 30, tags: ["Wedding"] },
    ]
  },
  {
    id: "inprogress", label: "In Progress", color: "text-[#4F46E5]", dot: "bg-[#4F46E5]",
    cards: [
      { id: "P-04", title: "Hassan Family Walima", client: "Hassan Ali", deadline: "Jul 18", priority: "high", team: ["K"], progress: 55, tags: ["Wedding","Video"] },
      { id: "P-05", title: "Corporate Product Shoot", client: "TechCorp Ltd.", deadline: "Jul 22", priority: "low", team: ["U","F"], progress: 70, tags: ["Commercial"] },
    ]
  },
  {
    id: "editing", label: "Editing", color: "text-[#F59E0B]", dot: "bg-[#F59E0B]",
    cards: [
      { id: "P-06", title: "Ayesha & Hamza Album", client: "Ayesha Khan", deadline: "Jul 10", priority: "high", team: ["A"], progress: 80, tags: ["Album","Wedding"] },
    ]
  },
  {
    id: "review", label: "Client Review", color: "text-purple-600", dot: "bg-purple-600",
    cards: [
      { id: "P-07", title: "Farhan Engagement Reel", client: "Farhan Malik", deadline: "Jul 6", priority: "medium", team: ["K","U"], progress: 90, tags: ["Video"] },
    ]
  },
  {
    id: "done", label: "Completed", color: "text-[#22C55E]", dot: "bg-[#22C55E]",
    cards: [
      { id: "P-08", title: "Zara & Omar Nikah", client: "Zara Shah", deadline: "Jun 28", priority: "low", team: ["A","F"], progress: 100, tags: ["Photography","Nikah"] },
      { id: "P-09", title: "Birthday Party – Hassan", client: "Hassan Ali", deadline: "Jun 15", priority: "low", team: ["K"], progress: 100, tags: ["Event"] },
    ]
  },
]

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
}

export default function ProjectsPage() {
  const router = useRouter()
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS)
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"kanban"|"list">("kanban")
  const dragCard = useRef<{ colId: string; cardId: string } | null>(null)

  const totalProjects = columns.reduce((sum, c) => sum + c.cards.length, 0)
  const completedProjects = columns.find(c => c.id === "done")?.cards.length || 0
  const inProgressProjects = columns.find(c => c.id === "inprogress")?.cards.length || 0

  // Drag & Drop handlers
  const handleDragStart = (colId: string, cardId: string) => {
    dragCard.current = { colId, cardId }
  }

  const handleDrop = (targetColId: string) => {
    if (!dragCard.current || dragCard.current.colId === targetColId) return
    const { colId: srcColId, cardId } = dragCard.current

    setColumns(prev => {
      const next = prev.map(col => ({ ...col, cards: [...col.cards] }))
      const srcCol = next.find(c => c.id === srcColId)!
      const tgtCol = next.find(c => c.id === targetColId)!
      const cardIdx = srcCol.cards.findIndex(c => c.id === cardId)
      if (cardIdx === -1) return prev
      const [card] = srcCol.cards.splice(cardIdx, 1)
      tgtCol.cards.push(card)
      return next
    })
    dragCard.current = null
  }

  const filteredColumns = columns.map(col => ({
    ...col,
    cards: col.cards.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase())
    )
  }))

  return (
    <div className="space-y-5 h-full">
      
      {/* Summary Row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3 overflow-x-auto">
        {columns.map(col => (
          <div key={col.id} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-xl p-2.5 md:p-3 text-center min-w-[80px]">
            <div className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${col.color} mb-1 truncate`}>{col.label}</div>
            <div className="text-[16px] md:text-[20px] font-black text-[#111827] dark:text-white">{col.cards.length}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="relative w-full sm:w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-white dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-xl overflow-hidden">
            {(["kanban","list"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-[10px] font-black uppercase transition-all cursor-pointer ${
                  view === v ? "bg-[#4F46E5] text-white" : "text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-white/5"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] text-white rounded-xl text-[10px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
            <Plus className="w-3.5 h-3.5" /> New Project
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {view === "kanban" && (
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-1 px-1">
          {filteredColumns.map(col => (
            <div
              key={col.id}
              className="flex-shrink-0 w-[220px] md:w-[260px] flex flex-col gap-3"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column header */}
              <div className="flex items-center gap-2 px-1">
                <span className={`w-2 h-2 rounded-full ${col.dot} shrink-0`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${col.color}`}>{col.label}</span>
                <span className="text-[9px] font-black text-[#9CA3AF] ml-auto bg-[#F8FAFC] dark:bg-white/5 px-2 py-0.5 rounded-full">{col.cards.length}</span>
              </div>

              {/* Drop zone */}
              <div className="min-h-[80px] space-y-3 rounded-2xl p-2 bg-[#F8FAFC] dark:bg-white/3 border border-dashed border-[#E5E7EB] dark:border-white/8 transition-colors">
                {col.cards.map(card => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(col.id, card.id)}
                    className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-xl p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#111827] dark:text-white leading-tight flex-1">{card.title}</span>
                      <button className="text-[#9CA3AF] hover:text-[#6B7280] shrink-0 cursor-pointer"><MoreVertical className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] flex items-center gap-1 mb-2">
                      <Users className="w-2.5 h-2.5" /> {card.client}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {card.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-black text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-[8px] font-black text-[#9CA3AF] uppercase">Progress</span>
                        <span className="text-[8px] font-black text-[#4F46E5]">{card.progress}%</span>
                      </div>
                      <div className="h-1 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full transition-all"
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {card.team.map((initial, i) => (
                          <div key={i} className="w-5 h-5 rounded-full bg-[#4F46E5] text-white text-[7px] font-black flex items-center justify-center border border-white dark:border-[#111118]">
                            {initial}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${PRIORITY_STYLES[card.priority]}`}>
                          {card.priority.toUpperCase()}
                        </span>
                        <span className="text-[9px] text-[#9CA3AF] flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> {card.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add card button */}
                <button className="w-full py-2.5 text-[9px] font-black text-[#9CA3AF] hover:text-[#4F46E5] hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 border border-dashed border-transparent hover:border-[#4F46E5]/30">
                  <Plus className="w-3 h-3" /> Add Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                {["Project","Client","Deadline","Priority","Progress","Team","Stage"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredColumns.flatMap(col => col.cards.map(card => (
                <tr key={card.id} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                  <td className="px-5 py-3">
                    <div className="text-[12px] font-bold text-[#111827] dark:text-white">{card.title}</div>
                    <div className="text-[9px] text-[#9CA3AF]">{card.id}</div>
                  </td>
                  <td className="px-5 py-3 text-[11px] text-[#374151] dark:text-gray-300">{card.client}</td>
                  <td className="px-5 py-3 text-[11px] text-[#374151] dark:text-gray-300 whitespace-nowrap">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#9CA3AF]" />{card.deadline}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${PRIORITY_STYLES[card.priority]}`}>{card.priority.toUpperCase()}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: `${card.progress}%` }} />
                      </div>
                      <span className="text-[9px] font-bold text-[#9CA3AF]">{card.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex -space-x-1.5">
                      {card.team.map((t, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-[#4F46E5] text-white text-[8px] font-black flex items-center justify-center border-2 border-white dark:border-[#111118]">{t}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${col.color} bg-[#F8FAFC] dark:bg-white/5`}>
                      {col.label}
                    </span>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  )
}
