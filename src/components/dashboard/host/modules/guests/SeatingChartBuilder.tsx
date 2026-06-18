"use client"

import { useState } from "react"
import { Users, Plus, Move, LayoutGrid } from "lucide-react"

// Mock Data
const MOCK_TABLES = [
  { id: 1, name: "Table 1 (Family)", capacity: 8, assigned: 8 },
  { id: 2, name: "Table 2 (Friends)", capacity: 8, assigned: 6 },
  { id: 3, name: "Table 3 (Colleagues)", capacity: 10, assigned: 0 },
]

export function SeatingChartBuilder() {
  const [tables] = useState(MOCK_TABLES)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-black text-slate-900">Seating Chart Builder</h3>
          <p className="text-sm font-medium text-slate-500">Drag and drop guests to assign tables.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl shadow-sm text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors">
            <LayoutGrid className="w-3.5 h-3.5" /> Auto-Assign
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md border border-blue-500 text-xs font-bold text-white transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Table
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Unassigned Guests Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h4 className="font-bold text-slate-900 mb-1">Unassigned Guests</h4>
            <p className="text-xs font-medium text-slate-500">12 Guests remaining</p>
          </div>
          <div className="p-4 space-y-2 overflow-y-auto flex-1 bg-slate-50/50">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex items-center justify-between cursor-grab hover:border-blue-400 hover:shadow-md transition-all group">
                <div>
                  <p className="text-sm font-bold text-slate-900">Zainab's Family</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">4 Pax • Bride's Side</p>
                </div>
                <Move className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Tables Grid */}
        <div className="lg:col-span-3 bg-slate-100 border border-slate-200 rounded-2xl shadow-inner p-6 h-[600px] overflow-y-auto relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {tables.map(table => (
              <div key={table.id} className="bg-white rounded-full aspect-square border-4 border-slate-200 shadow-xl flex flex-col items-center justify-center p-6 relative group transition-all duration-300 hover:border-blue-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg">
                  {table.name}
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900">{table.assigned}<span className="text-xl text-slate-400">/{table.capacity}</span></div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">Seats Filled</p>
                </div>

                {/* Simulated Chairs */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-200 rounded-t-lg rounded-b-sm border border-slate-300" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-200 rounded-b-lg rounded-t-sm border border-slate-300" />
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-l-lg rounded-r-sm border border-slate-300" />
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-slate-200 rounded-r-lg rounded-l-sm border border-slate-300" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
