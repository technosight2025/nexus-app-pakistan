"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, CalendarDays, Users, CheckCircle2, Search, Filter, Plus, Clock, MapPin, DollarSign, Activity } from "lucide-react"

const MOCK_CLIENTS = [
  { id: "CL-01", name: "Fatima & Hamza", type: "Wedding Series", dates: "Oct 12 - 15, 2026", status: "In Progress", progress: 65, budget: "₨ 4.5M", nextTask: "Finalize Decorator" },
  { id: "CL-02", name: "Nexus Corp Gala", type: "Corporate", dates: "Nov 5, 2026", status: "Planning", progress: 20, budget: "₨ 2.1M", nextTask: "Send Invitations" },
  { id: "CL-03", name: "Ayesha Walima", type: "Wedding Day", dates: "Dec 1, 2026", status: "Planning", progress: 10, budget: "₨ 1.2M", nextTask: "Book Caterer" },
  { id: "CL-04", name: "Zain Birthday", type: "Private Party", dates: "Sep 28, 2026", status: "Completed", progress: 100, budget: "₨ 300K", nextTask: "None" },
]

export function EventManagerDashboard() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'timeline'>('portfolio')

  return (
    <div className="space-y-6">
      
      {/* 🌟 Header 🌟 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-indigo-500" /> Event Manager OS
          </h1>
          <p className="text-slate-500 font-medium mt-1">High-level command center for professional planners.</p>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Client
        </button>
      </div>

      {/* 🌟 Global Stats 🌟 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Clients</p>
            <p className="text-2xl font-black text-slate-900">12</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Completed (YTD)</p>
            <p className="text-2xl font-black text-slate-900">48</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
            <Activity className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Tasks</p>
            <p className="text-2xl font-black text-slate-900">24</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Managed Budget</p>
            <p className="text-2xl font-black text-slate-900">₨ 24.5M</p>
          </div>
        </div>
      </div>

      {/* 🌟 Tabs 🌟 */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-max">
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'portfolio' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <Briefcase className="w-4 h-4" /> Client Portfolio
        </button>
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'timeline' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <CalendarDays className="w-4 h-4" /> Multi-Event Timeline
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'portfolio' ? (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {MOCK_CLIENTS.map((client) => (
              <div key={client.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{client.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{client.type}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border
                    ${client.status === 'Completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : ''}
                    ${client.status === 'In Progress' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : ''}
                    ${client.status === 'Planning' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
                  `}>
                    {client.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <CalendarDays className="w-4 h-4 text-slate-400" /> {client.dates}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <DollarSign className="w-4 h-4 text-slate-400" /> {client.budget} Budget
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progress</span>
                    <span className="text-sm font-black text-slate-900">{client.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${client.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                      style={{ width: `${client.progress}%` }} 
                    />
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Next Immediate Task</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      {client.nextTask !== "None" ? (
                        <><div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> {client.nextTask}</>
                      ) : (
                        <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> All Caught Up</>
                      )}
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm hover:underline">
                      View OS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="timeline"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-x-auto min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900">Master Calendar (Oct 2026)</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-200">{"<"} Prev</button>
                <button className="px-3 py-1 bg-slate-100 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-200">Next {">"}</button>
              </div>
            </div>

            {/* Mock Gantt/Timeline View */}
            <div className="min-w-[800px] border border-slate-200 rounded-xl overflow-hidden">
              {/* Header Days */}
              <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17', 'Sun 18'].map((day, i) => (
                  <div key={day} className={`p-3 text-center border-r border-slate-200 last:border-0 ${i === 3 ? 'bg-blue-50/50' : ''}`}>
                    <span className={`text-xs font-bold uppercase ${i === 3 ? 'text-blue-600' : 'text-slate-500'}`}>{day}</span>
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                  {[1,2,3,4,5,6,7].map(i => <div key={i} className="border-r border-slate-100 last:border-0 h-full" />)}
                </div>

                {/* Events */}
                <div className="relative p-4 space-y-4">
                  <div className="h-10 bg-indigo-500 rounded-lg shadow-sm w-[57%] ml-0 relative flex items-center px-4 hover:bg-indigo-600 cursor-pointer transition-colors z-10 group">
                    <span className="text-white font-bold text-sm whitespace-nowrap">Fatima & Hamza (Wedding Series)</span>
                    {/* Tooltip mock */}
                  </div>
                  <div className="h-10 bg-emerald-500 rounded-lg shadow-sm w-[14%] ml-[71%] relative flex items-center px-4 hover:bg-emerald-600 cursor-pointer transition-colors z-10">
                    <span className="text-white font-bold text-sm whitespace-nowrap truncate">Corporate Gala</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-medium text-slate-400 mt-6">
              Interactive timeline loading... (Mock)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
