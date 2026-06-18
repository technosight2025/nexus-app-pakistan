"use client"
import { useState } from "react"
import { Plus, MoreVertical, Search, Filter, Calendar, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simple Mock Data
const INITIAL_COLUMNS = [
  {
    id: "new",
    title: "New Leads",
    color: "bg-blue-500",
    cards: [
      { id: "1", clientName: "Fatima Noor", eventType: "Wedding", date: "Dec 15, 2026", value: "Rs 500,000" },
      { id: "2", clientName: "Ahmed Raza", eventType: "Corporate", date: "Jan 10, 2027", value: "Rs 250,000" }
    ]
  },
  {
    id: "contacted",
    title: "Contacted",
    color: "bg-amber-500",
    cards: [
      { id: "3", clientName: "Zainab Malik", eventType: "Mehndi", date: "Nov 20, 2026", value: "Rs 300,000" }
    ]
  },
  {
    id: "quoted",
    title: "Quotation Sent",
    color: "bg-indigo-500",
    cards: [
      { id: "4", clientName: "Hassan Ali", eventType: "Walima", date: "Oct 25, 2026", value: "Rs 800,000" }
    ]
  },
  {
    id: "won",
    title: "Won / Booked",
    color: "bg-emerald-500",
    cards: []
  }
]

export function LeadsKanbanBoard() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS)

  // Basic drag and drop is complex to implement from scratch without a library like dnd-kit or react-beautiful-dnd.
  // For the UX prototype, we will just render the columns statically with a placeholder drag UI.

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Leads Pipeline</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Drag and drop to update lead status</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative group flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full sm:w-48 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <Button variant="outline" className="shrink-0 bg-white border-slate-200">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold">
            <Plus className="w-4 h-4 mr-2" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((col) => (
            <div key={col.id} className="w-80 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/50">
              
              {/* Column Header */}
              <div className="p-4 flex items-center justify-between border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${col.color}`} />
                  <h3 className="font-bold text-slate-900">{col.title}</h3>
                  <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {col.cards.length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {col.cards.map((card) => (
                  <div 
                    key={card.id} 
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-grab hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{card.eventType}</span>
                      <button className="text-slate-300 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h4 className="font-black text-slate-900 text-base mb-1">{card.clientName}</h4>
                    <p className="text-sm font-bold text-emerald-600 mb-3">{card.value}</p>
                    
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                      <Calendar className="w-3.5 h-3.5" /> {card.date}
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" /> Message
                      </button>
                      <div className="w-px h-4 bg-slate-200" />
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                        <Phone className="w-3.5 h-3.5" /> Call
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Empty State */}
                {col.cards.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                    <p className="text-sm font-medium text-slate-400">Drag cards here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
