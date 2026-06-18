"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  CheckSquare, FileSignature, FolderOpen, AlertCircle, 
  CheckCircle2, Clock, Download, ChevronRight, Search, Upload
} from "lucide-react"
import { getHostEventTasks } from "@/app/actions/host/events"

export function ManagementTab({ eventId }: { eventId?: string }) {
  const [activeView, setActiveView] = useState<'tasks' | 'quotes' | 'docs'>('tasks')
  const [tasks, setTasks] = useState<any[]>([])

  const MOCK_TASKS = [
    { id: 1, title: "Finalize Menu Tasting", priority: "High", due: "Next Week", status: "Pending", category: "Catering" },
    { id: 2, title: "Upload Guest List", priority: "Medium", due: "In 2 Weeks", status: "In Progress", category: "Guests" },
    { id: 3, title: "Sign Venue Contract", priority: "High", due: "Tomorrow", status: "Pending", category: "Venue" },
    { id: 4, title: "Approve Decor Design", priority: "Medium", due: "Last Week", status: "Completed", category: "Decor" }
  ]

  const QUOTES_CONTRACTS = [
    { id: "QT-101", vendor: "Royal Aesthetics", type: "Quotation", amount: 250000, status: "Awaiting Approval", date: "Aug 02, 2026" },
    { id: "CT-045", vendor: "Grand Taj Marquee", type: "Contract", amount: 1500000, status: "Signed", date: "Jul 15, 2026" },
    { id: "QT-102", vendor: "Nexus Studios", type: "Quotation", amount: 120000, status: "Needs Revision", date: "Aug 05, 2026" }
  ]

  const DOCUMENTS = [
    { name: "Venue_Floorplan_V2.pdf", type: "PDF", size: "2.4 MB", date: "Aug 01, 2026", category: "Design" },
    { name: "Guest_List_Final.csv", type: "Data", size: "0.5 MB", date: "Aug 05, 2026", category: "Guests" }
  ]

  useEffect(() => {
    async function loadTasks() {
      if (!eventId) {
        setTasks(MOCK_TASKS)
        return
      }
      try {
        const { data } = await getHostEventTasks(eventId)
        if (data && data.length > 0) {
          const mapped = data.map((t: any) => {
            let dueStr = "TBD"
            if (t.due_date) {
              const d = new Date(t.due_date)
              dueStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
            return {
              id: t.id,
              title: t.title,
              priority: t.priority?.charAt(0).toUpperCase() + t.priority?.slice(1) || "Medium",
              due: dueStr,
              status: t.status === 'completed' ? 'Completed' : 'Pending',
              category: "General"
            }
          })
          setTasks(mapped)
        } else {
          setTasks(MOCK_TASKS)
        }
      } catch (err) {
        setTasks(MOCK_TASKS)
      }
    }
    loadTasks()
  }, [eventId])

  const completedTasks = tasks.filter(t => t.status === 'Completed').length
  const totalTasks = tasks.length
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="space-y-6">
      
      {/* 🌟 Header & Navigation 🌟 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Event Management</h2>
          <p className="text-sm font-medium text-slate-500">Tasks, contracts, and documents hub</p>
        </div>
        
        <div className="flex bg-white/60 backdrop-blur-md p-1 rounded-xl border border-white shadow-sm w-fit overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveView('tasks')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeView === 'tasks' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Tasks
          </button>
          <button 
            onClick={() => setActiveView('quotes')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeView === 'quotes' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Quotes & Contracts
          </button>
          <button 
            onClick={() => setActiveView('docs')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeView === 'docs' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Documents
          </button>
        </div>
      </div>

      {activeView === 'tasks' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              
              <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
                <div className="relative group flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF6B6B]" />
                  <input type="text" placeholder="Search tasks..." className="w-full pl-9 pr-4 py-2 bg-white/80 border border-white shadow-sm text-sm outline-none text-slate-700 focus:ring-2 focus:ring-[#FF6B6B]/20 rounded-xl" />
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none" />
                <div className="divide-y divide-slate-100/50 relative z-10">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 sm:p-5 hover:bg-white/40 transition-colors flex items-start gap-4">
                      <button className={`mt-1 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors
                        ${task.status === 'Completed' ? 'bg-[#6BCB77] border-[#6BCB77] text-white' : 'bg-white border-slate-300 text-transparent hover:border-[#FF6B6B]'}
                      `}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                          <h4 className={`text-base font-bold truncate ${task.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                            {task.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider w-fit
                            ${task.priority === 'High' ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]' : 'bg-[#FFD93D]/10 text-[#D4A000]'}
                          `}>
                            {task.priority} Priority
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 flex items-center gap-3">
                          <span>{task.category}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due {task.due}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8B] rounded-3xl p-6 text-white shadow-sm relative overflow-hidden group border border-white/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                <h3 className="text-lg font-bold mb-2 relative z-10">Task Progress</h3>
                <div className="text-4xl font-black mb-4 relative z-10">{progressPercent}%</div>
                <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden relative z-10">
                  <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-xs font-semibold text-white/80 mt-3 relative z-10">{completedTasks} of {totalTasks} tasks completed</p>
              </div>
            </div>
          </div>
          
        </motion.div>
      )}

      {activeView === 'quotes' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {QUOTES_CONTRACTS.map((doc, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-3xl p-6 relative group hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none rounded-3xl" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white shadow-sm shrink-0
                    ${doc.type === 'Contract' ? 'bg-[#4D96FF]/10 text-[#4D96FF]' : 'bg-[#FFD93D]/10 text-[#D4A000]'}
                  `}>
                    <FileSignature className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{doc.type}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border shadow-sm
                        ${doc.status === 'Signed' ? 'bg-[#6BCB77]/10 text-[#6BCB77] border-[#6BCB77]/20' : 
                          doc.status === 'Needs Revision' ? 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/20' : 
                          'bg-white text-slate-600 border-slate-200'}
                      `}>
                        {doc.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800">{doc.vendor}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Rs {doc.amount.toLocaleString()} • {doc.date}</p>
                  </div>
                </div>

                <div className="relative z-10 flex sm:flex-col gap-2 shrink-0">
                  <button className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors text-center">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeView === 'docs' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
            <div className="relative group flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#4D96FF]" />
              <input type="text" placeholder="Search files..." className="w-full pl-9 pr-4 py-2 bg-white/80 border border-white shadow-sm text-sm outline-none text-slate-700 focus:ring-2 focus:ring-[#4D96FF]/20 rounded-xl" />
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#4D96FF] to-[#6EC1E4] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-[0_2px_10px_rgba(77,150,255,0.3)] border border-white/20 hover:opacity-90 transition-opacity">
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none" />
            <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 border-b border-slate-100/50 text-xs font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">File Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date Added</th>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {DOCUMENTS.map((doc, i) => (
                    <tr key={i} className="hover:bg-white/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-5 h-5 text-[#4D96FF]" />
                          <span className="font-bold text-slate-800 group-hover:text-[#4D96FF] transition-colors">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-600">{doc.category}</td>
                      <td className="px-6 py-4 font-medium text-slate-500">{doc.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-500">{doc.size}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-800 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  )
}
