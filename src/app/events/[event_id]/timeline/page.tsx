"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  CalendarHeart, CheckCircle2, Circle, Clock, MapPin, Search, 
  Plus, Check, Trash2, Edit3, Download, AlertCircle, X, CheckSquare, Sparkles, ArrowRight,
  Users
} from "lucide-react"

// Types
interface Task {
  id: number
  title: string
  date: string
  status: "completed" | "pending" | "upcoming"
  phase: "Planning & Setup" | "Invitations & Media" | "Event Day Schedule"
  desc: string
}

export default function EventTimelinePage() {
  const params = useParams()
  const router = useRouter()
  const eventId = (params?.event_id as string) || "demo-wedding"

  // Event details resolver
  const eventDetails = useMemo(() => {
    const isEngagement = eventId.toLowerCase().includes("engage") || eventId === "EV-02"
    const isCorporate = eventId.toLowerCase().includes("corp") || eventId.toLowerCase().includes("gala") || eventId === "EV-03"

    if (isEngagement) {
      return {
        title: "Ali & Sara's Engagement Ceremony",
        date: "Jan 12, 2027",
        hall: "Crystal Hall",
        guests: 300,
        type: "Engagement"
      }
    } else if (isCorporate) {
      return {
        title: "Nexus Tech Annual Corporate Gala",
        date: "Feb 18, 2027",
        hall: "Garden Lawn",
        guests: 250,
        type: "Corporate"
      }
    } else {
      return {
        title: "Ahmed & Fatima's Wedding (Shadi)",
        date: "Dec 24, 2026",
        hall: "Royal Hall",
        guests: 800,
        type: "Wedding"
      }
    }
  }, [eventId])

  // Get initial tasks list based on event category
  const initialTasks = useMemo(() => {
    const isEngagement = eventId.toLowerCase().includes("engage") || eventId === "EV-02"
    const isCorporate = eventId.toLowerCase().includes("corp") || eventId.toLowerCase().includes("gala") || eventId === "EV-03"
    
    if (isEngagement) {
      return [
        { id: 1, title: "Book Crystal Hall Venue", date: "Completed Oct 15", status: "completed", phase: "Planning & Setup", desc: "Secure the venue booking deposit and log in Bookings OS." },
        { id: 2, title: "Hire Portrait Photographer", date: "Completed Nov 5", status: "completed", phase: "Planning & Setup", desc: "Finalize engagement photoshoot contract with VIP edits." },
        { id: 3, title: "Send digital engagement invites to 300 guests", date: "Due in 2 days", status: "pending", phase: "Invitations & Media", desc: "Distribute cards dynamically via WhatsApp OS." },
        { id: 4, title: "Stage Floral Setup & Ring Box Check", date: "Event Day 4:00 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Verify florist arrangements on the main stage." },
        { id: 5, title: "Ring Exchange Ceremony & Slideshow Loop", date: "Event Day 5:00 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Ring ceremony and childhood photos projection." },
        { id: 6, title: "High Tea Service & Photography Session", date: "Event Day 5:30 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Serve snacks, tea and hold family group sessions." }
      ] as Task[]
    } else if (isCorporate) {
      return [
        { id: 1, title: "Book Garden Lawn and reserve sound system", date: "Completed Oct 20", status: "completed", phase: "Planning & Setup", desc: "Secure the lawn and sound equipment rentals." },
        { id: 2, title: "Confirm guest registration system", date: "Completed Nov 10", status: "completed", phase: "Planning & Setup", desc: "Set up digital check-in terminal for attendees." },
        { id: 3, title: "Finalize keynote slides & test projector", date: "Due in 3 days", status: "pending", phase: "Invitations & Media", desc: "Review corporate slideshow and test dynamic screens." },
        { id: 4, title: "AV Sound Check and registration desk open", date: "Event Day 6:00 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Initialize microphones and badge print terminals." },
        { id: 5, title: "CEO Welcome Speech and presentation", date: "Event Day 7:00 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Opening keynote by corporate leads." },
        { id: 6, title: "Gala Buffet Dinner Service", date: "Event Day 8:00 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Premium catering buffet and networking session." }
      ] as Task[]
    } else {
      // Default: Wedding / Shadi
      return [
        { id: 1, title: "Book Royal Hall Venue", date: "Completed Oct 15", status: "completed", phase: "Planning & Setup", desc: "Deposit paid and reservation logged in Bookings OS." },
        { id: 2, title: "Select catering menu (One-dish compliance)", date: "Completed Nov 1", status: "completed", phase: "Planning & Setup", desc: "Verify menu follows Pakistani wedding local government codes." },
        { id: 3, title: "Finalize stage decor & floral arrangements", date: "Completed Nov 15", status: "completed", phase: "Planning & Setup", desc: "Premium Rose & Jasmine layout for the stage." },
        { id: 4, title: "Design digital calligraphy cards on Invitations OS", date: "Completed Dec 1", status: "completed", phase: "Invitations & Media", desc: "Custom Urdu script invite builder validation." },
        { id: 5, title: "Send WhatsApp RSVP invites to 800 guests", date: "Due in 1 week", status: "pending", phase: "Invitations & Media", desc: "Send invites using WhatsApp Webhook api." },
        { id: 6, title: "Generate welcome screen loops & QR codes", date: "Due in 2 weeks", status: "upcoming", phase: "Invitations & Media", desc: "Upload slides to signage displays for guest photo uploads." },
        { id: 7, title: "Doors open & wayfinding staff active", date: "Event Day 3:00 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Hall entry open, background instrumental music active." },
        { id: 8, title: "Groom Baraat entry & reception", date: "Event Day 3:45 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Flower petals ready at red carpet lobby entrance." },
        { id: 9, title: "Nikah Ceremony & signature verification", date: "Event Day 4:15 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Stage seating alignment checked, wireless microphone volume check." },
        { id: 10, title: "Dinner service (Chicken Qorma, Biryani, Naan)", date: "Event Day 4:45 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Activate buffet lines for one-dish dining." },
        { id: 11, title: "Rukhsati farewell and checkout", date: "Event Day 5:45 PM", status: "upcoming", phase: "Event Day Schedule", desc: "Baraat departure checkout and screen display logs." }
      ] as Task[]
    }
  }, [eventId])

  // Stateful tasks
  const [tasks, setTasks] = useState<Task[]>([])

  // Load correct event initial state
  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("")
  const [activePhase, setActivePhase] = useState<string>("All")
  
  // Toast notifications state
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [formTitle, setFormTitle] = useState("")
  const [formPhase, setFormPhase] = useState<Task["phase"]>("Planning & Setup")
  const [formDate, setFormDate] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formStatus, setFormStatus] = useState<Task["status"]>("upcoming")

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingTask(null)
    setFormTitle("")
    setFormPhase("Planning & Setup")
    setFormDate("")
    setFormDesc("")
    setFormStatus("upcoming")
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task)
    setFormTitle(task.title)
    setFormPhase(task.phase)
    setFormDate(task.date)
    setFormDesc(task.desc)
    setFormStatus(task.status)
    setIsModalOpen(true)
  }

  // Form submission (Add / Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) return

    if (editingTask) {
      // Edit mode
      setTasks(prev => prev.map(t => t.id === editingTask.id ? {
        ...t,
        title: formTitle,
        phase: formPhase,
        date: formDate || "TBD",
        desc: formDesc,
        status: formStatus
      } : t))
      showToast(`Successfully updated milestone "${formTitle}"`)
    } else {
      // Add mode
      const newTask: Task = {
        id: Date.now(),
        title: formTitle,
        phase: formPhase,
        date: formDate || "TBD",
        desc: formDesc,
        status: formStatus
      }
      setTasks(prev => [...prev, newTask])
      showToast(`Added new milestone: "${formTitle}"`)
    }
    setIsModalOpen(false)
  }

  // Delete milestone
  const handleDeleteTask = (id: number, title: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    showToast(`Removed milestone "${title}"`)
  }

  // Toggle milestone status cycle: upcoming -> pending -> completed
  const handleToggleStatus = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        let nextStatus: Task["status"] = "upcoming"
        if (t.status === "upcoming") nextStatus = "pending"
        else if (t.status === "pending") nextStatus = "completed"
        return { ...t, status: nextStatus }
      }
      return t
    }))
  }

  // Task statistics
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === "completed").length
    const pending = tasks.filter(t => t.status === "pending").length
    const upcoming = tasks.filter(t => t.status === "upcoming").length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return { total, completed, pending, upcoming, percentage }
  }, [tasks])

  // Filter tasks in view
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.desc.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPhase = activePhase === "All" || t.phase === activePhase
      return matchesSearch && matchesPhase
    })
  }, [tasks, searchQuery, activePhase])

  // Print schedule
  const handlePrintSchedule = () => {
    showToast(`Preparing printed schedule draft for ${eventDetails.title}...`)
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Event Header Banner Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1D1C17] to-[#2B2923] rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A227] bg-[#C9A227]/10 px-3 py-1 rounded-full border border-[#C9A227]/20">
              {eventDetails.type} Command Center
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-black tracking-tight mt-2 text-white">
              {eventDetails.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300 mt-2">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#C9A227]" /> {eventDetails.date}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#C9A227]" /> {eventDetails.hall}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gray-400" /> {eventDetails.guests} Guests</span>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t border-white/10 md:border-0 pt-4 md:pt-0 shrink-0 gap-4">
            <div className="text-left md:text-right">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">ID Routing</span>
              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded border border-white/10 mt-1 block">{eventId}</span>
            </div>
            
            <button 
              onClick={handlePrintSchedule}
              className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A422C] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> Export Schedule PDF
            </button>
          </div>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Circle/Bar */}
        <div className="bg-white border border-[#E6E2DA] p-5 rounded-2xl shadow-xs text-left">
          <span className="text-[10.5px] font-bold text-[#5E6460] uppercase tracking-wider block">Timeline Progress</span>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-3xl font-black text-gray-900 block">{stats.percentage}%</span>
              <span className="text-xs text-gray-400 font-bold mt-1 block">Milestones Completed</span>
            </div>
            
            {/* Horizontal progress visualization */}
            <div className="w-24 bg-[#FAF7F2] rounded-full h-3 border border-[#E6E2DA] overflow-hidden relative">
              <div 
                className="bg-[#0F5B3E] h-full rounded-full transition-all duration-700" 
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task counter status */}
        <div className="bg-white border border-[#E6E2DA] p-5 rounded-2xl shadow-xs text-left flex justify-between items-center">
          <div>
            <span className="text-[10.5px] font-bold text-[#5E6460] uppercase tracking-wider block">Task Breakdown</span>
            <div className="flex gap-4 mt-3">
              <div>
                <span className="text-xl font-bold text-emerald-600 block">{stats.completed}</span>
                <span className="text-[9px] text-gray-400 font-extrabold uppercase">Done</span>
              </div>
              <div className="border-l border-gray-150 pl-3">
                <span className="text-xl font-bold text-[#C9A227] block">{stats.pending}</span>
                <span className="text-[9px] text-gray-400 font-extrabold uppercase">Pending</span>
              </div>
              <div className="border-l border-gray-150 pl-3">
                <span className="text-xl font-bold text-gray-400 block">{stats.upcoming}</span>
                <span className="text-[9px] text-gray-400 font-extrabold uppercase">Upcoming</span>
              </div>
            </div>
          </div>
          <span className="text-2xl font-black text-[#5E6460] bg-[#FAF7F2] border border-[#E6E2DA] w-12 h-12 flex items-center justify-center rounded-xl">
            {stats.total}
          </span>
        </div>

        {/* Highlight Banner / Next Up */}
        <div className="bg-white border border-[#E6E2DA] p-5 rounded-2xl shadow-xs text-left flex flex-col justify-between">
          <div>
            <span className="text-[10.5px] font-bold text-[#5E6460] uppercase tracking-wider block">Next Up Milestone</span>
            <p className="text-[13px] font-bold text-gray-800 mt-2 truncate">
              {tasks.find(t => t.status === "pending")?.title || tasks.find(t => t.status === "upcoming")?.title || "All Milestones Completed!"}
            </p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="text-xs font-bold text-[#0F5B3E] hover:text-[#0A422C] flex items-center gap-1 mt-3 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom Milestone
          </button>
        </div>
      </div>

      {/* Main Timeline Card Section */}
      <div className="bg-white rounded-3xl border border-[#E6E2DA] p-6 md:p-8 shadow-xs text-left space-y-6">
        
        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
          {/* Phase Filter tabs */}
          <div className="flex overflow-x-auto bg-[#FAF7F2] border border-[#E6E2DA] p-1 rounded-xl gap-1 shrink-0">
            {["All", "Planning & Setup", "Invitations & Media", "Event Day Schedule"].map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-3 py-1.5 rounded-lg text-[10.5px] font-black tracking-wider uppercase transition-all shrink-0 ${
                  activePhase === phase
                    ? "bg-[#0F5B3E] text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {phase === "All" ? "All Tasks" : phase.split(" & ")[0]}
              </button>
            ))}
          </div>

          {/* Search task */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E6E2DA] bg-[#FAF7F2] text-xs font-semibold focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-all text-gray-700" 
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-450 hover:text-gray-800">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Timeline List Nodes */}
        {filteredTasks.length > 0 ? (
          <div className="relative border-l border-[#E6E2DA] ml-3.5 pl-7 space-y-8 py-2 text-[12px] font-semibold text-gray-600">
            {filteredTasks.map((task, idx) => {
              const isCompleted = task.status === "completed"
              const isPending = task.status === "pending"
              
              return (
                <div key={task.id} className="relative group/node animate-in fade-in duration-300">
                  
                  {/* Left Dot with Action Status cycle on click */}
                  <button 
                    onClick={() => handleToggleStatus(task.id)}
                    title="Click to change status"
                    className={`absolute -left-[37px] top-1 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all z-10 ${
                      isCompleted 
                        ? "border-[#0F5B3E] text-[#0F5B3E] hover:bg-emerald-50 scale-105" 
                        : isPending 
                          ? "border-[#C9A227] text-[#C9A227] hover:bg-amber-50 scale-105" 
                          : "border-[#E6E2DA] text-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isPending ? (
                      <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover/node:bg-gray-350" />
                    )}
                  </button>

                  <div className="flex justify-between items-start gap-4 bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] border border-[#E6E2DA] hover:border-[#0F5B3E]/30 p-4 rounded-2xl transition-all cursor-pointer">
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          {task.phase}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className={`text-[10px] font-bold ${isCompleted ? 'text-gray-400 line-through' : 'text-[#C9A227]'}`}>
                          {task.date}
                        </span>
                      </div>
                      
                      <h4 className={`text-[13px] font-black transition-colors ${
                        isCompleted ? "text-gray-400 line-through font-semibold" : "text-gray-900"
                      }`}>
                        {task.title}
                      </h4>
                      
                      <p className={`text-[11.5px] font-medium leading-relaxed ${
                        isCompleted ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {task.desc}
                      </p>
                    </div>

                    {/* Nodes edit/delete controls */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className={`px-2 py-0.5 text-[8.5px] font-extrabold uppercase rounded tracking-wider ${
                        isCompleted ? "bg-[#E6F0EC] text-[#0F5B3E]" :
                        isPending ? "bg-amber-50 text-amber-700 animate-pulse" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {task.status}
                      </span>
                      
                      <button 
                        onClick={() => handleOpenEditModal(task)}
                        className="p-1 text-gray-400 hover:text-[#0F5B3E] hover:bg-white rounded transition-colors"
                        title="Edit milestone"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      
                      <button 
                        onClick={() => handleDeleteTask(task.id, task.title)}
                        className="p-1 text-gray-400 hover:text-rose-600 hover:bg-white rounded transition-colors"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-[#E6E2DA] rounded-3xl bg-[#FAF7F2]/30">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-gray-700">No Milestones Found</h4>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or phase filter tab.</p>
          </div>
        )}

      </div>

      {/* Dynamic Add/Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1D1C17]/40 backdrop-blur-xs flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-white border border-[#E6E2DA] w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 m-4 text-left">
            <div className="p-5 border-b border-[#E6E2DA] flex justify-between items-center bg-[#FAF7F2]">
              <h3 className="font-serif font-bold text-[#1D1C17] text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F5B3E]" /> {editingTask ? "Edit Milestone" : "Add Custom Milestone"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Title input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] tracking-wider block">Milestone Title</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Wedding Stage Sound Check"
                  required
                  className="w-full px-3.5 py-2 text-xs font-semibold text-gray-700 bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-all"
                />
              </div>

              {/* Phase select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] tracking-wider block">Planning Phase</label>
                <select 
                  value={formPhase}
                  onChange={(e) => setFormPhase(e.target.value as Task["phase"])}
                  className="w-full px-3.5 py-2 text-xs font-semibold text-gray-700 bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Planning & Setup">Planning & Setup</option>
                  <option value="Invitations & Media">Invitations & Media</option>
                  <option value="Event Day Schedule">Event Day Schedule</option>
                </select>
              </div>

              {/* Date / Time input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] tracking-wider block">Due Date / Time</label>
                <input 
                  type="text" 
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  placeholder="e.g. Due in 1 week or 03:00 PM"
                  className="w-full px-3.5 py-2 text-xs font-semibold text-gray-700 bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-all"
                />
              </div>

              {/* Description input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] tracking-wider block">Description / Action Plan</label>
                <textarea 
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Provide checklist context..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-xs font-semibold text-gray-700 bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-all"
                />
              </div>

              {/* Status select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] tracking-wider block">Current Status</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as Task["status"])}
                  className="w-full px-3.5 py-2 text-xs font-semibold text-gray-700 bg-[#FAF7F2] border border-[#E6E2DA] rounded-xl focus:outline-none focus:border-[#0F5B3E] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Form buttons */}
              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2 text-xs font-bold">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E6E2DA] text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A422C] text-white rounded-xl shadow-md transition-colors"
                >
                  {editingTask ? "Save Changes" : "Create Milestone"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Toast Banner Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#1D1C17] border border-white/10 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-100">{toast}</span>
        </div>
      )}

    </div>
  )
}
