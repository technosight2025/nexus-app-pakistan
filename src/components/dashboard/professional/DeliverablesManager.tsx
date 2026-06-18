"use client"

import { useState } from "react"
import { CheckSquare, UploadCloud, Link as LinkIcon, MessageSquare, Clock, Filter, Search } from "lucide-react"

export function ProfessionalDeliverablesManager() {
  const [activeFilter, setActiveFilter] = useState("all")

  const deliverables = [
    { id: "D-101", client: "Zainab & Ali", project: "Wedding Highlights", type: "Video Link", dueDate: "Oct 25", status: "Pending Client Approval", progress: 100 },
    { id: "D-102", client: "Sapphire PK", project: "Winter Collection", type: "Raw Album", dueDate: "Oct 28", status: "In Progress", progress: 65 },
    { id: "D-103", client: "TechCorp Gala", project: "Event Coverage", type: "Edited Album", dueDate: "Nov 02", status: "Not Started", progress: 0 },
    { id: "D-104", client: "Hassan & Fatima", project: "Bridal Shoot", type: "Printed Album", dueDate: "Oct 15", status: "Approved & Delivered", progress: 100 }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Deliverables OS</h1>
          <p className="text-slate-500 font-medium">Track asset delivery, share links, and manage client approvals.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:border-[#0F5B3E] hover:text-[#0F5B3E] transition-all flex items-center gap-2">
            <LinkIcon className="w-4.5 h-4.5" /> Share Drive Link
          </button>
          <button className="px-5 py-2.5 bg-[#0F5B3E] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#0a422c] transition-all shadow-sm">
            <UploadCloud className="w-5 h-5" />
            Upload Assets
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {["All", "In Progress", "Pending Approval", "Delivered"].map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeFilter === f.toLowerCase() ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search projects..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F5B3E] w-64" />
          </div>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="p-5">Project / Client</th>
              <th className="p-5">Deliverable Type</th>
              <th className="p-5">Progress</th>
              <th className="p-5">Due Date</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deliverables.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5">
                  <div className="font-bold text-slate-900">{item.project}</div>
                  <div className="text-sm text-slate-500 font-medium">{item.client}</div>
                </td>
                <td className="p-5">
                  <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                    {item.type}
                  </span>
                </td>
                <td className="p-5">
                  <div className="w-32">
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.progress === 100 ? 'bg-emerald-500' : 'bg-[#C9A227]'}`} 
                        style={{ width: `${item.progress}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" /> {item.dueDate}
                  </div>
                </td>
                <td className="p-5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    item.status.includes('Approved') ? 'bg-emerald-100 text-emerald-700' :
                    item.status.includes('Pending') ? 'bg-amber-100 text-amber-700' :
                    item.status.includes('Progress') ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><MessageSquare className="w-4.5 h-4.5" /></button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><CheckSquare className="w-4.5 h-4.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
