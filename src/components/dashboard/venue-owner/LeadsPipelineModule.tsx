"use client"

import { useState } from "react"
import { Search, MessageSquare, FileText, Check, ChevronDown, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Lead {
  id: string
  name: string
  type: string
  date: string
  value: string
  guests: number
  source: "Website" | "Instagram" | "WhatsApp" | "Walk-in"
  status: "New" | "Contacted" | "Site Visit" | "Proposal" | "Won" | "Lost"
  notes: string[]
  phone: string
}

interface LeadsPipelineModuleProps {
  leads: Lead[]
  selectedLead: Lead | null
  setSelectedLead: (lead: Lead | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (filter: string) => void
  onUpdateStatus: (leadId: string, status: Lead["status"]) => void
  onAddNote: (leadId: string, note: string) => void
}

export default function LeadsPipelineModule({
  leads,
  selectedLead,
  setSelectedLead,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onUpdateStatus,
  onAddNote
}: LeadsPipelineModuleProps) {
  const [newNote, setNewNote] = useState("")

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleLogNote = () => {
    if (!newNote.trim() || !selectedLead) return
    onAddNote(selectedLead.id, newNote.trim())
    setNewNote("")
  }

  return (
    <div className="bg-white rounded-[16px] border border-[#E6E2DA] p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#1D1C17]">CRM Leads Pipeline</h2>
        <p className="text-xs text-slate-500 font-medium">Customer leads tracking, follow-ups & interaction logging</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 text-sm font-medium text-[#1D1C17]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[#E6E2DA]">
          {["All", "New", "Contacted", "Proposal", "Won"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                statusFilter === st
                  ? "bg-[#0F5B3E] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Leads List */}
      <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#E6E2DA]">
        {filtered.length > 0 ? (
          filtered.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-3.5 rounded-[12px] border cursor-pointer transition-all ${
                selectedLead?.id === lead.id
                  ? "bg-[#E6F0EC] border-[#0F5B3E]"
                  : "bg-white border-[#E6E2DA] hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-[#1D1C17] truncate">{lead.name}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  lead.status === "New"
                    ? "bg-blue-100 text-blue-800"
                    : lead.status === "Contacted"
                    ? "bg-amber-100 text-amber-800"
                    : lead.status === "Site Visit"
                    ? "bg-purple-100 text-purple-800"
                    : lead.status === "Proposal"
                    ? "bg-indigo-100 text-indigo-800"
                    : lead.status === "Won"
                    ? "bg-[#E6F0EC] text-[#0F5B3E]"
                    : "bg-red-100 text-red-800"
                }`}>
                  {lead.status}
                </span>
              </div>

              <div className="flex justify-between items-end mt-2 text-xs font-medium text-slate-500">
                <span>{lead.type} • {lead.guests} guests</span>
                <span className="font-bold text-slate-700">PKR {lead.value}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-400 text-xs font-medium">
            No matching leads found
          </div>
        )}
      </div>

      {/* Selected Lead Activity & Status Workspace */}
      {selectedLead && (
        <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-[16px] p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-[#1D1C17]">{selectedLead.name}</h3>
              <p className="text-xs text-slate-500">{selectedLead.type} • {selectedLead.phone}</p>
            </div>
            <div className="flex items-center gap-1 bg-[#E6F0EC] text-[#0F5B3E] font-bold text-xs px-2.5 py-0.5 rounded-full">
              {selectedLead.source}
            </div>
          </div>

          {/* Status Updates */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Update Status</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["New", "Contacted", "Proposal", "Won", "Lost"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(selectedLead.id, st)}
                  className={`text-xs font-bold py-1.5 rounded-[12px] border transition-all ${
                    selectedLead.status === st
                      ? "bg-[#0F5B3E] text-white border-[#0F5B3E]"
                      : "bg-white text-slate-700 border-[#E6E2DA] hover:bg-slate-50"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Log */}
          <div className="space-y-2 border-t border-[#E6E2DA] pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Activity Notes</span>
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {selectedLead.notes.map((note, nIdx) => (
                <div key={nIdx} className="bg-white p-2.5 rounded-lg border border-[#E6E2DA] text-xs">
                  <p className="text-slate-700 leading-normal">{note}</p>
                  <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Logged note</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add an update note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogNote()}
                className="flex-1 h-9 px-3 rounded-[12px] border border-[#E6E2DA] focus:outline-none focus:ring-1 focus:ring-[#0F5B3E] text-xs"
              />
              <Button
                onClick={handleLogNote}
                className="h-9 bg-[#0F5B3E] text-white font-bold rounded-[12px] px-3.5 text-xs hover:bg-[#0F5B3E]/90"
              >
                Log
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
