"use client"

import React, { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  ClipboardList, Plus, Trash2, Edit, CheckCircle, Clock, 
  Wrench, Sparkles, ShieldAlert, Check, X, Search, AlertCircle, Users, CheckSquare
} from "lucide-react"

// Types
interface Task {
  id: number
  text: string
  assigned: string
  type: string
  status: "Pending" | "Completed"
}

interface ChecklistItem {
  id: number
  text: string
  completed: boolean
}

interface Checklist {
  id: number
  title: string
  category: string
  items: ChecklistItem[]
}

interface MaintenanceTicket {
  id: number
  item: string
  priority: "Low" | "Medium" | "High"
  reported: string
  status: string
}

interface HousekeepingTask {
  id: number
  space: string
  lastDone: string
  scheduled: string
  staff: string
  status: "Clean" | "Pending"
}

interface SecurityGuard {
  id: number
  name: string
  station: string
  status: "Active" | "On Break"
}

interface SecurityAlert {
  id: number
  text: string
  severity: "Low" | "Medium" | "High"
  time: string
  status: "Active" | "Resolved"
}

function OperationsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "tasks"

  const setTab = (tab: string) => {
    router.push(`/business/venues/operations?tab=${tab}`)
  }

  // Toast notifications state
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  // 1. Stateful Tasks list
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Hall decoration final review", assigned: "Fahad Ahmed", type: "Setup", status: "Pending" },
    { id: 2, text: "Verify sound system backup mics", assigned: "Bilal Ahmed", type: "AV Setup", status: "Pending" },
    { id: 3, text: "Confirm catering raw supplies audit", assigned: "Zain Malik", type: "Food", status: "Completed" },
  ])

  // 2. Stateful Checklists list
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: 1,
      title: "Baraat Setup (Royal Hall)",
      category: "Wedding",
      items: [
        { id: 101, text: "Red carpet entryway laid out", completed: true },
        { id: 102, text: "Stage floral backdrop check", completed: true },
        { id: 103, text: "Bridal sofa alignment and cleaning", completed: false },
        { id: 104, text: "Welcome digital screen loops active", completed: false },
        { id: 105, text: "VIP seating placards placed", completed: false }
      ]
    },
    {
      id: 2,
      title: "Corporate Conference Prep (Crystal Hall)",
      category: "Corporate",
      items: [
        { id: 201, text: "Projector slide loop active check", completed: true },
        { id: 202, text: "Wireless microphones frequency scan", completed: true },
        { id: 203, text: "Welcome reception badge printer setup", completed: false },
        { id: 204, text: "Individual speaker water bottles placed", completed: true }
      ]
    }
  ])

  // 3. Stateful Maintenance requests
  const [maintenance, setMaintenance] = useState<MaintenanceTicket[]>([
    { id: 1, item: "AC Unit 4 in Royal Hall blowing warm air", priority: "High", reported: "May 18", status: "Assigned (AC Tech)" },
    { id: 2, item: "Stage spot light replacement", priority: "Medium", reported: "May 19", status: "Pending Supply" },
  ])

  // 4. Stateful Housekeeping schedule
  const [housekeeping, setHousekeeping] = useState<HousekeepingTask[]>([
    { id: 1, space: "Royal Hall Carpet Shampooing", lastDone: "3 days ago", scheduled: "Tonight (11:00 PM)", staff: "Housekeeping Team A", status: "Pending" },
    { id: 2, space: "Crystal Hall Toilet Sanitation", lastDone: "2 hours ago", scheduled: "Every 4 hours", staff: "Sardar Masih", status: "Clean" },
    { id: 3, space: "Ballroom Main Foyer glass cleaning", lastDone: "1 day ago", scheduled: "May 21", staff: "Housekeeping Team B", status: "Clean" }
  ])

  // 5. Stateful Security roster
  const [securityGuards, setSecurityGuards] = useState<SecurityGuard[]>([
    { id: 1, name: "Yasir Khan", station: "Main Gate Entry 1", status: "Active" },
    { id: 2, name: "Tariq Jamil", station: "VIP Stage Lobby Area", status: "Active" },
    { id: 3, name: "Sajid Mahmood", station: "Valet Parking Area", status: "Active" },
  ])

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    { id: 1, text: "Valet parking lane congestion on Main Road", severity: "High", time: "10 mins ago", status: "Active" },
    { id: 2, text: "Unauthorized visitor query at Back Entry Gate 2", severity: "Medium", time: "25 mins ago", status: "Active" }
  ])

  // Modals visibility and form values
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Form states
  const [formText, setFormText] = useState("")
  const [formAssigned, setFormAssigned] = useState("")
  const [formType, setFormType] = useState("")
  const [formPriority, setFormPriority] = useState<"Low" | "Medium" | "High">("Medium")
  const [formSubItems, setFormSubItems] = useState("") // comma-separated for checklists

  // Handle tasks actions
  const handleToggleTaskStatus = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "Pending" ? "Completed" : "Pending"
        showToast(`Task marked as ${nextStatus}`)
        return { ...t, status: nextStatus }
      }
      return t
    }))
  }

  const handleDeleteTask = (id: number, text: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    showToast(`Removed task "${text}"`)
  }

  // Handle checklist sub-item toggle
  const handleToggleChecklistItem = (checklistId: number, itemId: number) => {
    setChecklists(prev => prev.map(c => {
      if (c.id === checklistId) {
        const updatedItems = c.items.map(item => {
          if (item.id === itemId) {
            return { ...item, completed: !item.completed }
          }
          return item
        })
        return { ...c, items: updatedItems }
      }
      return c
    }))
  }

  const handleDeleteChecklist = (id: number, title: string) => {
    setChecklists(prev => prev.filter(c => c.id !== id))
    showToast(`Deleted checklist "${title}"`)
  }

  // Handle maintenance ticket status change
  const handleCycleMaintenanceStatus = (id: number) => {
    setMaintenance(prev => prev.map(t => {
      if (t.id === id) {
        let nextStatus = "Resolved"
        if (t.status === "Pending Supply") nextStatus = "Assigned (AC Tech)"
        else if (t.status === "Assigned (AC Tech)") nextStatus = "Resolved"
        else if (t.status === "Resolved") nextStatus = "Pending Supply"
        showToast(`Ticket status updated to ${nextStatus}`)
        return { ...t, status: nextStatus }
      }
      return t
    }))
  }

  const handleDeleteMaintenance = (id: number, item: string) => {
    setMaintenance(prev => prev.filter(t => t.id !== id))
    showToast(`Removed ticket "${item}"`)
  }

  // Housekeeping toggle cleaning status
  const handleToggleHousekeeping = (id: number) => {
    setHousekeeping(prev => prev.map(hk => {
      if (hk.id === id) {
        const nextStatus = hk.status === "Clean" ? "Pending" : "Clean"
        showToast(`${hk.space} marked as ${nextStatus}`)
        return { ...hk, status: nextStatus, lastDone: nextStatus === "Clean" ? "Just now" : hk.lastDone }
      }
      return hk
    }))
  }

  // Resolve security alert
  const handleResolveAlert = (id: number, text: string) => {
    setSecurityAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "Resolved" } : a))
    showToast(`Resolved security alert: "${text}"`)
  }

  // Modal Open action helper
  const handleOpenAddModal = () => {
    setFormText("")
    setFormAssigned("")
    setFormType("")
    setFormPriority("Medium")
    setFormSubItems("")
    setIsModalOpen(true)
  }

  // Form Submit dispatcher
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formText.trim()) return

    if (activeTab === "tasks") {
      const newTask: Task = {
        id: Date.now(),
        text: formText,
        assigned: formAssigned || "Unassigned",
        type: formType || "General",
        status: "Pending"
      }
      setTasks(prev => [newTask, ...prev])
      showToast(`Created task: "${formText}"`)
    } 
    else if (activeTab === "checklists") {
      const subItemsList = formSubItems
        .split(",")
        .map((item, idx) => ({
          id: Date.now() + idx,
          text: item.trim(),
          completed: false
        }))
        .filter(item => item.text.length > 0)

      const newChecklist: Checklist = {
        id: Date.now(),
        title: formText,
        category: formType || "General",
        items: subItemsList.length > 0 ? subItemsList : [{ id: Date.now(), text: "Verify basic setup", completed: false }]
      }
      setChecklists(prev => [newChecklist, ...prev])
      showToast(`Created checklist: "${formText}"`)
    } 
    else if (activeTab === "maintenance") {
      const newTicket: MaintenanceTicket = {
        id: Date.now(),
        item: formText,
        priority: formPriority,
        reported: "Just now",
        status: "Pending Supply"
      }
      setMaintenance(prev => [newTicket, ...prev])
      showToast(`Reported maintenance ticket: "${formText}"`)
    } 
    else if (activeTab === "housekeeping") {
      const newHk: HousekeepingTask = {
        id: Date.now(),
        space: formText,
        lastDone: "Never",
        scheduled: formType || "As needed",
        staff: formAssigned || "Unassigned Housekeeper",
        status: "Pending"
      }
      setHousekeeping(prev => [newHk, ...prev])
      showToast(`Scheduled housekeeping for: "${formText}"`)
    } 
    else if (activeTab === "security") {
      const newAlert: SecurityAlert = {
        id: Date.now(),
        text: formText,
        severity: formPriority,
        time: "Just now",
        status: "Active"
      }
      setSecurityAlerts(prev => [newAlert, ...prev])
      showToast(`Reported security incident alert: "${formText}"`)
    }

    setIsModalOpen(false)
  }

  // Filter lists based on search queries
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase()) || t.assigned.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [tasks, searchQuery])

  const filteredChecklists = useMemo(() => {
    return checklists.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [checklists, searchQuery])

  const filteredMaintenance = useMemo(() => {
    return maintenance.filter(m => m.item.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [maintenance, searchQuery])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#0F5B3E]" /> Operations & Maintenance
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Manage cleaning schedules, verify setup checklists, track maintenance tickets, and monitor safety alerts.
          </p>
        </div>
        
        <button 
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> 
          {activeTab === "tasks" && "Create Task"}
          {activeTab === "checklists" && "Create Template"}
          {activeTab === "maintenance" && "Report Ticket"}
          {activeTab === "housekeeping" && "Schedule Housekeeper"}
          {activeTab === "security" && "Report Incident"}
        </button>
      </div>

      {/* Navigation tabs bar */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        {[
          { id: "tasks", label: "Checklists & Tasks" },
          { id: "checklists", label: "Checklist Templates" },
          { id: "maintenance", label: "Maintenance Requests" },
          { id: "housekeeping", label: "Housekeeping Schedule" },
          { id: "security", label: "Security & Safety" },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
              activeTab === tab.id 
                ? "bg-[#0F5B3E] text-white shadow-xs" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Filter input */}
      <div className="flex justify-start text-left">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search operations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#ECE7DF] bg-white text-xs font-bold focus:outline-none focus:border-[#0F5B3E] text-gray-700" 
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Checklists & Tasks */}
      {activeTab === "tasks" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Task Description</th>
                  <th className="pb-3.5">Assigned staff</th>
                  <th className="pb-3.5">Task Category</th>
                  <th className="pb-3.5">Verify Status</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {filteredTasks.map((task) => {
                  const isCompleted = task.status === "Completed"
                  return (
                    <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className={`py-3.5 pl-2 font-bold ${isCompleted ? 'text-gray-400 line-through font-semibold' : 'text-gray-900'}`}>{task.text}</td>
                      <td className="py-3.5 text-gray-500 font-semibold">{task.assigned}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[9px] bg-gray-100 text-gray-600 uppercase font-bold">
                          {task.type}
                        </span>
                      </td>
                      <td className="py-3.5">
                        {/* Interactive toggle */}
                        <button 
                          onClick={() => handleToggleTaskStatus(task.id)}
                          className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase transition-colors ${
                            isCompleted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {task.status}
                        </button>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        <button 
                          onClick={() => handleDeleteTask(task.id, task.text)}
                          className="p-1 text-gray-450 hover:text-rose-600 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 2: Checklist Templates */}
      {activeTab === "checklists" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredChecklists.map((c) => {
            const total = c.items.length
            const completed = c.items.filter(i => i.completed).length
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0
            
            return (
              <Card key={c.id} className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm space-y-4">
                <div className="flex justify-between items-start pb-2 border-b border-gray-100">
                  <div>
                    <h4 className="text-[13px] font-black text-gray-950">{c.title}</h4>
                    <span className="text-[8.5px] font-extrabold uppercase text-gray-400 tracking-wider block mt-0.5">{c.category} Staging</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteChecklist(c.id, c.title)}
                    className="p-1 text-gray-300 hover:text-rose-600 transition-colors"
                    title="Delete Checklist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10.5px] font-bold text-gray-400 uppercase">
                    <span>Layout readiness</span>
                    <span className="text-[#0F5B3E] font-black">{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0F5B3E] h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                {/* Checklist items list */}
                <div className="space-y-2.5 pt-2 text-xs font-semibold text-gray-600">
                  {c.items.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => handleToggleChecklistItem(c.id, item.id)}
                      className="w-full flex items-center gap-2.5 hover:bg-gray-50/50 p-1 rounded-lg transition-colors text-left"
                    >
                      <span className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        item.completed ? "border-[#0F5B3E] bg-[#0F5B3E] text-white" : "border-gray-300"
                      }`}>
                        {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className={`${item.completed ? "text-gray-400 line-through font-semibold" : "text-gray-950"}`}>{item.text}</span>
                    </button>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Tab 3: Maintenance requests */}
      {activeTab === "maintenance" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Reported Issue</th>
                  <th className="pb-3.5">Priority</th>
                  <th className="pb-3.5">Report Date</th>
                  <th className="pb-3.5">Ticket Status</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {filteredMaintenance.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-950 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-gray-450 shrink-0" /> {m.item}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                        m.priority === "High" ? "bg-rose-50 text-rose-700" : m.priority === "Medium" ? "bg-amber-50 text-amber-750" : "bg-blue-50 text-blue-700"
                      }`}>{m.priority}</span>
                    </td>
                    <td className="py-3.5 text-gray-400">{m.reported}</td>
                    <td className="py-3.5 font-bold">
                      {/* Cycle Status */}
                      <button 
                        onClick={() => handleCycleMaintenanceStatus(m.id)}
                        className={`text-left hover:underline text-xs ${
                          m.status === "Resolved" ? "text-emerald-600" : "text-[#0F5B3E]"
                        }`}
                        title="Click to cycle status"
                      >
                        {m.status}
                      </button>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button 
                        onClick={() => handleDeleteMaintenance(m.id, m.item)}
                        className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 4: Housekeeping */}
      {activeTab === "housekeeping" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {housekeeping.map((hk) => {
            const isClean = hk.status === "Clean"
            return (
              <Card key={hk.id} className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm flex flex-col justify-between h-[190px]">
                <div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-3">
                    <h4 className="text-[12px] font-black text-gray-950 truncate max-w-[160px]">{hk.space}</h4>
                    <button 
                      onClick={() => handleToggleHousekeeping(hk.id)}
                      className={`text-[9px] px-2 py-0.5 rounded font-extrabold flex items-center gap-0.5 transition-colors ${
                        isClean ? "bg-emerald-50 text-[#0F5B3E]" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" /> {hk.status}
                    </button>
                  </div>

                  <div className="space-y-1 text-[11.5px] font-semibold text-gray-500">
                    <p>Staff Assigned: <span className="text-gray-900 font-bold">{hk.staff}</span></p>
                    <p>Last Audited: <span className="text-gray-700 font-bold">{hk.lastDone}</span></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-[10.5px]">
                  <span className="text-gray-400 font-bold">Next Run: {hk.scheduled}</span>
                  <button 
                    onClick={() => handleToggleHousekeeping(hk.id)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-xl transition-all ${
                      isClean ? "bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-700" : "bg-[#E6F0EC] hover:bg-[#0F5B3E] hover:text-white text-[#0F5B3E]"
                    }`}
                  >
                    {isClean ? "Flag Dirty" : "Sign-off Clean"}
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Tab 5: Security & Safety */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* Active alerts panel */}
          <Card className="col-span-1 md:col-span-2 p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm space-y-4">
            <div className="pb-2 border-b border-gray-100">
              <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" /> Active Security Alerts
              </h3>
            </div>

            <div className="space-y-3.5">
              {securityAlerts.filter(a => a.status === "Active").length > 0 ? (
                securityAlerts.filter(a => a.status === "Active").map((alert) => (
                  <div key={alert.id} className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl flex justify-between items-center gap-4 animate-in fade-in duration-300">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[8.5px] bg-rose-100 text-rose-700 font-extrabold uppercase">
                          {alert.severity} Severity
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">{alert.time}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 leading-relaxed">{alert.text}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleResolveAlert(alert.id, alert.text)}
                      className="px-3 py-1 bg-white hover:bg-emerald-50 text-[#0F5B3E] border border-[#ECE7DF] hover:border-[#0F5B3E] text-[10px] font-bold rounded-lg transition-all"
                    >
                      Clear Alert
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center bg-emerald-50/30 border border-dashed border-emerald-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-xs text-emerald-700 font-bold">All sectors are fully secured. No alerts logged.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Guard Roster */}
          <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm space-y-4">
            <div className="pb-2 border-b border-gray-100">
              <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0F5B3E]" /> Security Shift Roster
              </h3>
            </div>

            <div className="space-y-3 font-semibold text-xs text-gray-650">
              {securityGuards.map((guard) => (
                <div key={guard.id} className="flex justify-between items-center p-2.5 bg-gray-50/70 border border-gray-100 rounded-lg">
                  <div className="text-left">
                    <span className="font-black text-gray-900 block">{guard.name}</span>
                    <span className="text-[9.5px] text-gray-400 block mt-0.5">{guard.station}</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" title="On Shift" />
                </div>
              ))}
            </div>
          </Card>

        </div>
      )}

      {/* Operations Form Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1D1C17]/40 backdrop-blur-xs flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-white border border-[#E6E2DA] w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 m-4 text-left">
            <div className="p-4 border-b border-[#E6E2DA] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-serif font-bold text-[#1D1C17] text-sm flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#0F5B3E]" /> 
                {activeTab === "tasks" && "Create Task"}
                {activeTab === "checklists" && "Create Checklist Template"}
                {activeTab === "maintenance" && "Report Ticket"}
                {activeTab === "housekeeping" && "Schedule Housekeeping"}
                {activeTab === "security" && "Report Security Incident"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-4 space-y-4 text-xs font-semibold">
              
              {/* Field 1: Title / Text */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                  {activeTab === "tasks" && "Task description"}
                  {activeTab === "checklists" && "Template Title"}
                  {activeTab === "maintenance" && "Describe the maintenance issue"}
                  {activeTab === "housekeeping" && "Cleaning Area / space"}
                  {activeTab === "security" && "Incident Description / Alert text"}
                </label>
                <input 
                  type="text" 
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder={
                    activeTab === "tasks" ? "e.g. Clean back foyer windows" :
                    activeTab === "checklists" ? "e.g. Wedding Stage Setup" :
                    activeTab === "maintenance" ? "e.g. Split AC leaking water" :
                    activeTab === "housekeeping" ? "e.g. Crystal Hall Toilets" :
                    "e.g. Valet gate parking jam"
                  }
                  required
                  className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              {/* Field 2: Assign staff (tasks, housekeeping) */}
              {(activeTab === "tasks" || activeTab === "housekeeping") && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Assigned Staff</label>
                  <input 
                    type="text" 
                    value={formAssigned}
                    onChange={(e) => setFormAssigned(e.target.value)}
                    placeholder="e.g. Fahad Ahmed / Housekeeper Team"
                    className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                  />
                </div>
              )}

              {/* Field 3: Category (tasks, checklists, housekeeping schedule interval) */}
              {(activeTab === "tasks" || activeTab === "checklists" || activeTab === "housekeeping") && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                    {activeTab === "housekeeping" ? "Schedule Interval" : "Category"}
                  </label>
                  <input 
                    type="text" 
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder={
                      activeTab === "housekeeping" ? "e.g. Every 4 hours or Nightly" : "e.g. Setup, AV, Catering"
                    }
                    className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                  />
                </div>
              )}

              {/* Field 4: Priority / Severity (maintenance, security) */}
              {(activeTab === "maintenance" || activeTab === "security") && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Severity / Priority</label>
                  <select 
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as "Low" | "Medium" | "High")}
                    className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E] cursor-pointer"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>
              )}

              {/* Field 5: Sub items comma list (checklists only) */}
              {activeTab === "checklists" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Checklist Sub-items (Comma-separated)</label>
                  <textarea 
                    value={formSubItems}
                    onChange={(e) => setFormSubItems(e.target.value)}
                    placeholder="e.g. Setup main carpet, Verify spotlights, Align bridal sofa"
                    rows={4}
                    required
                    className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                  />
                </div>
              )}

              {/* Form buttons */}
              <div className="pt-3 border-t border-gray-150 flex justify-end gap-2 text-[11px] font-bold">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 border border-[#E6E2DA] text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-3.5 py-1.5 bg-[#0F5B3E] text-white rounded-lg shadow-sm hover:bg-[#0A422C] transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Universal feedback toast banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-100">{toast}</span>
        </div>
      )}

    </div>
  )
}

export default function VenueOperationsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 animate-pulse">Loading Operations Desk...</span>
      </div>
    }>
      <OperationsPageContent />
    </Suspense>
  )
}
