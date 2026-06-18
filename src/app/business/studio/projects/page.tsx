"use client"
import { useState } from "react"
import { Plus, Search, Filter, Video, Camera, Clock, CheckCircle2, ChevronRight, FileVideo, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK_PROJECTS = [
  {
    id: "PRJ-001",
    client: "Zainab & Ahmed",
    eventType: "Wedding Series",
    date: "Dec 15, 2026",
    deliverables: [
      { name: "Cinematic Highlights", type: "video", status: "editing" },
      { name: "Full Feature Film", type: "video", status: "pending" },
      { name: "Signature Photobook", type: "photo", status: "client_review" }
    ],
    team: ["Ali", "Hamza"],
    progress: 45
  },
  {
    id: "PRJ-002",
    client: "Corporate Gala 2026",
    eventType: "Corporate",
    date: "Dec 20, 2026",
    deliverables: [
      { name: "Event Recap Reel", type: "video", status: "completed" },
      { name: "High-Res Gallery", type: "photo", status: "completed" }
    ],
    team: ["Saad"],
    progress: 100
  },
  {
    id: "PRJ-003",
    client: "Hassan Walima",
    eventType: "Walima",
    date: "Jan 05, 2027",
    deliverables: [
      { name: "Raw Footage Dump", type: "video", status: "pending" },
      { name: "Edited Album", type: "photo", status: "editing" }
    ],
    team: ["Ali", "Omer"],
    progress: 15
  }
]

export default function ProjectTrackerPage() {
  const [projects] = useState(MOCK_PROJECTS)

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Project Tracker</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage deliverables, editing pipelines, and team assignments.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search projects or clients..." 
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-indigo-500 outline-none shadow-sm"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button className="px-4 py-1.5 bg-white text-slate-900 font-bold text-sm rounded-lg shadow-sm">All</button>
          <button className="px-4 py-1.5 text-slate-600 font-bold text-sm rounded-lg hover:text-slate-900 transition-colors">Editing</button>
          <button className="px-4 py-1.5 text-slate-600 font-bold text-sm rounded-lg hover:text-slate-900 transition-colors">Review</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            
            {/* Card Header */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                  {project.id}
                </span>
                <span className="text-xs font-bold text-slate-500">{project.date}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{project.client}</h3>
              <p className="text-sm font-medium text-slate-500">{project.eventType}</p>
            </div>

            {/* Deliverables */}
            <div className="p-6 flex-1 bg-slate-50/50">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Deliverables</h4>
              <div className="space-y-3">
                {project.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${del.type === 'video' ? 'bg-indigo-50' : 'bg-emerald-50'}`}>
                        {del.type === 'video' ? <FileVideo className="w-4 h-4 text-indigo-500" /> : <ImageIcon className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[150px]">{del.name}</span>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full shrink-0
                      ${del.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                        del.status === 'editing' ? 'bg-amber-100 text-amber-700' :
                        del.status === 'client_review' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'}
                    `}>
                      {del.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                      {del.status === 'editing' && <Video className="w-3 h-3" />}
                      {del.status === 'client_review' && <Clock className="w-3 h-3" />}
                      {del.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer (Progress & Team) */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Overall Progress</span>
                <span className="text-xs font-black text-slate-900">{project.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${project.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {member.charAt(0)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50">
                  Manage <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
