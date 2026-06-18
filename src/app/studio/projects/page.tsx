"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, Users, Calendar, MoreVertical, LayoutGrid, List } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: "Ali & Fatima Wedding",
      client: "Ali Raza",
      date: "Oct 12, 2026",
      status: "Planning",
      statusColor: "bg-blue-100 text-blue-700",
      progress: 10,
      team: ["ZA", "FA", "MS"]
    },
    {
      id: 2,
      name: "TechCorp Annual Gala",
      client: "Sarah Khan",
      date: "Oct 14, 2026",
      status: "Shooting",
      statusColor: "bg-red-100 text-red-700 animate-pulse",
      progress: 30,
      team: ["AK", "ZA"]
    },
    {
      id: 3,
      name: "Hassan & Zainab Mehndi",
      client: "Hassan",
      date: "Oct 05, 2026",
      status: "Editing",
      statusColor: "bg-purple-100 text-purple-700",
      progress: 65,
      team: ["JD"]
    },
    {
      id: 4,
      name: "LUMS Convocation 2026",
      client: "LUMS Admin",
      date: "Sep 28, 2026",
      status: "Review",
      statusColor: "bg-yellow-100 text-yellow-700",
      progress: 90,
      team: ["FA", "MS"]
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Track and manage all your active and upcoming shoots.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex w-full sm:w-auto gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
            />
          </div>
          <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="flex items-center bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-full p-1 shadow-sm">
          <button className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white">
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-5 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all cursor-pointer group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${project.statusColor} dark:bg-opacity-20`}>
                {project.status}
              </span>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{project.name}</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> {project.client}
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5" /> {project.date}
              </p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Progress</span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
                <div 
                  className="bg-[#0A3B2A] dark:bg-cyan-500 h-1.5 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Team</span>
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-black bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-[10px] font-black text-blue-700 dark:text-blue-400">
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}
