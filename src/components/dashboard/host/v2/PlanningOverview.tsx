"use client"
 
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, Circle, Clock, Calendar as CalendarIcon, 
  MapPin, Users, Camera, Plus, AlertCircle, PlayCircle,
  MoreVertical, ArrowRight, Flame, X, Trash2
} from "lucide-react"

interface Task {
  id: number;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
  priority: "high" | "med" | "urgent";
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, title: "Secure Banquet Hall / Venue contract", date: "Dec 15", status: "completed", priority: "urgent" },
  { id: 2, title: "Finalize shadi catering menu details", date: "Jan 10", status: "in-progress", priority: "high" },
  { id: 3, title: "Hire photographer & cinematographer", date: "Jan 15", status: "pending", priority: "high" },
  { id: 4, title: "Confirm stage decoration & florist themes", date: "Jan 20", status: "pending", priority: "med" },
  { id: 5, title: "Review guest lists and send digital invites", date: "Feb 01", status: "pending", priority: "med" }
]

const MILESTONES = [
  { id: "m1", title: "Venue & Dates", date: "Dec 15", icon: MapPin, color: "bg-blue-100 text-blue-700", pct: 100 },
  { id: "m2", title: "Core Vendors", date: "Jan 20", icon: Camera, color: "bg-purple-100 text-purple-700", pct: 66 },
  { id: "m3", title: "Guest Mgt", date: "Feb 28", icon: Users, color: "bg-emerald-100 text-emerald-700", pct: 33 },
  { id: "m4", title: "Execution", date: "Apr 10", icon: PlayCircle, color: "bg-rose-100 text-rose-700", pct: 0 }
]

export function PlanningOverview() {
  const [isMounted, setIsMounted] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS)
  const [completedMilestones, setCompletedMilestones] = useState<string[]>(["m1"])
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formTitle, setFormTitle] = useState("")
  const [formDate, setFormDate] = useState("")
  const [formPriority, setFormPriority] = useState<"high" | "med" | "urgent">("med")
  const [formStatus, setFormStatus] = useState<"completed" | "in-progress" | "pending">("pending")

  // Load tasks from local storage
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexus_crm_tasks")
      if (stored) {
        try {
          setTasks(JSON.parse(stored))
        } catch (e) {
          console.error("Error loading tasks:", e)
        }
      } else {
        // Fallback to default
        localStorage.setItem("nexus_crm_tasks", JSON.stringify(DEFAULT_TASKS))
      }
    }
  }, [])

  // Save to local storage
  const saveToStorage = (updatedTasks: Task[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_tasks", JSON.stringify(updatedTasks))
    }
  }

  const handleToggleTask = (id: number) => {
    const updated: Task[] = tasks.map(t => {
      if (t.id === id) {
        const nextStatus: "completed" | "pending" = t.status === "completed" ? "pending" : "completed"
        return { ...t, status: nextStatus }
      }
      return t
    })
    setTasks(updated)
    saveToStorage(updated)
  }

  const handleDeleteTask = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const updated = tasks.filter(t => t.id !== id)
      setTasks(updated)
      saveToStorage(updated)
    }
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) return

    const newTask: Task = {
      id: Date.now(),
      title: formTitle,
      date: formDate || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      status: formStatus,
      priority: formPriority
    }

    const updated = [...tasks, newTask]
    setTasks(updated)
    saveToStorage(updated)
    setIsModalOpen(false)
    setFormTitle("")
    setFormDate("")
  }

  const completedCount = tasks.filter(t => t.status === "completed").length
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0

  if (!isMounted) return null

  return (
    <div className="p-3 max-w-[1440px] mx-auto text-[#1A1A1A] space-y-3 pb-24 md:pb-6 relative h-full">

      {/* ═══ ROW 1: Header (12 Col) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 bg-gradient-to-br from-[#0A3B2A] via-[#0D4A34] to-[#063020] rounded-2xl p-5 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FEF3C7]/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800 bg-white px-2 py-0.5 rounded-full shadow-sm">
                PLANNING
              </span>
              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1"><Flame className="w-3 h-3" />On Track</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight font-black">Master Timeline</h1>
            <p className="text-white/60 text-xs font-medium flex items-center gap-1.5 mt-1">
              <CalendarIcon className="w-3.5 h-3.5" /> Next milestone is actively being completed.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 mt-4 md:mt-0 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="relative w-12 h-12">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#34D399" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${progressPercentage * 2.51} 251`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-black">{progressPercentage}%</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Overall Progress</p>
              <p className="text-sm font-black text-white">{completedCount} of {tasks.length} Tasks</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ ROW 2: Milestones Bento (4x 3 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        {MILESTONES.map((m) => {
          const isCompleted = completedMilestones.includes(m.id)
          return (
            <div 
              key={m.id} 
              onClick={() => setCompletedMilestones(p => p.includes(m.id) ? p.filter(x => x !== m.id) : [...p, m.id])} 
              className={`col-span-6 md:col-span-3 bg-white rounded-2xl border ${isCompleted ? 'border-emerald-200 shadow-md' : 'border-slate-100 shadow-sm'} p-4 flex flex-col group cursor-pointer hover:border-[#0A3B2A]/30 transition-all`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.color}`}><m.icon className="w-4 h-4" /></div>
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />}
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{m.date}</p>
              <p className="text-sm font-black text-[#1A1A1A] leading-none mb-3 truncate">{m.title}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                  <span>Completion</span><span>{isCompleted ? 100 : m.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${isCompleted ? 'bg-emerald-500' : 'bg-[#0A3B2A]'}`} style={{ width: `${isCompleted ? 100 : m.pct}%` }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ═══ ROW 3: Active Checklist + Timeline View (6 + 6 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Checklist */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black text-[#1A1A1A]">Active Checklist</h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[10px] font-bold text-white bg-[#0A3B2A] px-2.5 py-1.5 rounded-md flex items-center gap-1 hover:bg-[#0A3B2A]/90"
            >
              <Plus className="w-3.5 h-3.5"/> New Task
            </button>
          </div>
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-3">
            <motion.div className="h-full bg-[#0A3B2A] rounded-full" animate={{ width: `${progressPercentage}%` }} />
          </div>
          <div className="space-y-1.5 flex-1 max-h-[300px] overflow-y-auto pr-1">
            {tasks.map(t => {
              const isDone = t.status === "completed"
              return (
                <div 
                  key={t.id}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all group ${
                    isDone ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 hover:border-[#0A3B2A]/20'
                  }`}
                >
                  <button onClick={() => handleToggleTask(t.id)} className="shrink-0">
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4 text-slate-300 hover:text-[#0A3B2A]" />}
                  </button>
                  <div className="flex-1 min-w-0" onClick={() => handleToggleTask(t.id)}>
                    <span className={`block text-[11px] font-bold leading-tight ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>{t.title}</span>
                    <span className="flex items-center gap-1 text-[9px] font-medium text-slate-500 mt-0.5"><Clock className="w-3 h-3"/> {t.date}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {t.status === "in-progress" && <span className="text-[8px] font-bold uppercase px-2 py-1 rounded bg-amber-100 text-amber-700 hidden sm:block">In Progress</span>}
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded ${
                      t.priority === 'urgent' ? 'bg-rose-100 text-rose-700' : t.priority === 'high' ? 'bg-[#BE185D]/10 text-[#BE185D]' : 'bg-[#FEF3C7] text-[#D97706]'
                    }`}>{t.priority}</span>
                    <button 
                      onClick={() => handleDeleteTask(t.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-100 text-rose-600 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
            {tasks.length === 0 && (
              <p className="text-center text-xs text-slate-400 py-6">No tasks added yet. Click "New Task" to begin.</p>
            )}
          </div>
        </div>

        {/* Timeline Roadmap View */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-[#1A1A1A]">Roadmap View</h3>
            <span className="text-[10px] font-bold text-slate-400">Projected Sequence</span>
          </div>
          <div className="flex-1 relative border-l-2 border-slate-100 ml-3 space-y-4 max-h-[340px] overflow-y-auto pr-1">
            {tasks.map((t, i) => (
              <div key={i} className="relative pl-4">
                <div className={`absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-white ${t.status === 'completed' ? 'bg-emerald-500' : t.status === 'in-progress' ? 'bg-amber-400' : 'bg-slate-300'}`} />
                <div className={`p-3 rounded-xl border ${t.status === 'completed' ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200'}`}>
                  <p className={`text-[11px] font-bold ${t.status === 'completed' ? 'text-slate-500 line-through' : 'text-[#1A1A1A]'}`}>{t.title}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{t.date} &bull; Priority: {t.priority}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ═══ ADD TASK MODAL ═══ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[24px] w-full max-w-md p-6 shadow-2xl relative z-10 border border-slate-100"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-lg font-black text-[#0A3B2A] mb-4 font-poppins">
                Create New Task
              </h3>
              
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Task Description</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Schedule rehearsal call, Pay caterer deposit"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Target Date</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dec 25, Next week"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Priority</label>
                    <select
                      value={formPriority}
                      onChange={(e) => setFormPriority(e.target.value as "high" | "med" | "urgent")}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    >
                      <option value="med">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent Priority</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-[#E8E2D5] rounded-xl text-xs font-bold text-[#1A1A1A] hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-[#0A3B2A] text-white rounded-xl text-xs font-bold hover:bg-[#0A3B2A]/90 transition-colors"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
