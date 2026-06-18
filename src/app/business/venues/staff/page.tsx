"use client"

import React, { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  Users, Plus, Mail, Phone, Calendar as CalendarIcon, Clock, Check, 
  Coins, UserCheck, ShieldAlert, Award, Trash2, Edit3, X, Search, AlertCircle
} from "lucide-react"

// Types
interface StaffEmployee {
  id: number
  name: string
  role: string
  type: string
  status: string
  phone: string
}

interface AttendanceRecord {
  id: number
  name: string
  role: string
  checkIn: string
  checkOut: string
  status: "Present" | "Absent" | "Late" | "Pending Check-In"
}

interface DailyWager {
  id: number
  name: string
  role: string
  shiftRate: string
  shifts: number
  payout: string
  status: "Paid" | "Unpaid"
}

interface StaffShift {
  id: number
  event: string
  role: string
  assigned: string
  date: string
  shift: string
}

function StaffPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "employees"

  const setTab = (tab: string) => {
    router.push(`/business/venues/staff?tab=${tab}`)
  }

  // Toast notifications state
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  // 1. Stateful Permanent Staff
  const [staff, setStaff] = useState<StaffEmployee[]>([
    { id: 1, name: "Usman Khan", role: "General Administrator", type: "Full-time", status: "Present", phone: "+92 307 1112223" },
    { id: 2, name: "Sardar Masih", role: "Sanitary Supervisor", type: "Full-time", status: "Present", phone: "+92 321 4443332" },
    { id: 3, name: "Sajid Mahmood", role: "Catering Head Chef", type: "Contract", status: "Present", phone: "+92 333 9998887" }
  ])

  // 2. Stateful Attendance Records
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { id: 1, name: "Usman Khan", role: "General Administrator", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present" },
    { id: 2, name: "Sardar Masih", role: "Sanitary Supervisor", checkIn: "08:45 AM", checkOut: "--", status: "Present" },
    { id: 3, name: "Sajid Mahmood", role: "Catering Head Chef", checkIn: "10:30 AM", checkOut: "--", status: "Late" },
    { id: 4, name: "Arshad Masih", role: "Waiter Crew", checkIn: "--", checkOut: "--", status: "Pending Check-In" },
    { id: 5, name: "Irfan Ali", role: "Kitchen Assistant", checkIn: "--", checkOut: "--", status: "Absent" }
  ])

  // 3. Stateful Daily Wagers
  const [wagers, setWagers] = useState<DailyWager[]>([
    { id: 1, name: "Arshad Masih", role: "Waiter Crew", shiftRate: "Rs. 2,500/shift", shifts: 10, payout: "Rs. 25,000", status: "Paid" },
    { id: 2, name: "Irfan Ali", role: "Kitchen Assistant", shiftRate: "Rs. 3,000/shift", shifts: 8, payout: "Rs. 24,000", status: "Unpaid" },
    { id: 3, name: "Shakir Butt", role: "Stage Helper Crew", shiftRate: "Rs. 2,000/shift", shifts: 15, payout: "Rs. 30,000", status: "Paid" }
  ])

  // 4. Stateful Shifts
  const [shifts, setShifts] = useState<StaffShift[]>([
    { id: 1, event: "Ahmed & Fatima Wedding", role: "Event Lead Coordinator", assigned: "Usman Khan", date: "May 20, 2025", shift: "3:00 PM - 12:00 AM" },
    { id: 2, event: "Ali & Sara Engagement", role: "Gate Reception Lead", assigned: "Sardar Masih", date: "May 21, 2025", shift: "6:00 PM - 11:00 PM" }
  ])

  // Modals and Search filters
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Form values
  const [formName, setFormName] = useState("")
  const [formRole, setFormRole] = useState("")
  const [formType, setFormType] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formStatus, setFormStatus] = useState("Present")
  const [formRate, setFormRate] = useState("")
  const [formDate, setFormDate] = useState("")

  // Staff delete/add
  const handleDeleteStaff = (id: number, name: string) => {
    setStaff(prev => prev.filter(s => s.id !== id))
    showToast(`Removed employee: ${name}`)
  }

  // Attendance actions
  const handleCheckIn = (id: number) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setAttendance(prev => prev.map(a => {
      if (a.id === id) {
        showToast(`${a.name} checked in successfully.`)
        return { ...a, checkIn: timeNow, status: "Present" }
      }
      return a
    }))
  }

  const handleCheckOut = (id: number) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setAttendance(prev => prev.map(a => {
      if (a.id === id) {
        showToast(`${a.name} checked out successfully.`)
        return { ...a, checkOut: timeNow }
      }
      return a
    }))
  }

  // Cycle attendance status
  const handleCycleAttendanceStatus = (id: number) => {
    setAttendance(prev => prev.map(a => {
      if (a.id === id) {
        let nextStatus: AttendanceRecord["status"] = "Pending Check-In"
        if (a.status === "Pending Check-In") nextStatus = "Present"
        else if (a.status === "Present") nextStatus = "Late"
        else if (a.status === "Late") nextStatus = "Absent"
        else if (a.status === "Absent") nextStatus = "Pending Check-In"

        showToast(`${a.name} status updated to ${nextStatus}`)
        return { 
          ...a, 
          status: nextStatus,
          checkIn: nextStatus === "Present" || nextStatus === "Late" ? "09:00 AM" : "--",
          checkOut: "--"
        }
      }
      return a
    }))
  }

  const handleDeleteAttendance = (id: number, name: string) => {
    setAttendance(prev => prev.filter(a => a.id !== id))
    showToast(`Deleted attendance entry for ${name}`)
  }

  // Wagers actions
  const handleDeleteWager = (id: number, name: string) => {
    setWagers(prev => prev.filter(w => w.id !== id))
    showToast(`Removed Daily Wager ledger: ${name}`)
  }

  const handleToggleWagerPayout = (id: number) => {
    setWagers(prev => prev.map(w => {
      if (w.id === id) {
        const nextStatus = w.status === "Paid" ? "Unpaid" : "Paid"
        showToast(`Wager payout marked as ${nextStatus}`)
        return { ...w, status: nextStatus }
      }
      return w
    }))
  }

  // Shifts actions
  const handleDeleteShift = (id: number, event: string) => {
    setShifts(prev => prev.filter(s => s.id !== id))
    showToast(`Removed scheduled shift for: ${event}`)
  }

  // Open modal helper
  const handleOpenAddModal = () => {
    setFormName("")
    setFormRole("")
    setFormType("")
    setFormPhone("")
    setFormStatus("Present")
    setFormRate("")
    setFormDate("")
    setIsModalOpen(true)
  }

  // Form submission dispatcher
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return

    if (activeTab === "employees") {
      const newStaff: StaffEmployee = {
        id: Date.now(),
        name: formName,
        role: formRole || "General Staff",
        type: formType || "Full-time",
        status: "Present",
        phone: formPhone || "+92 300 0000000"
      }
      setStaff(prev => [newStaff, ...prev])
      showToast(`Added permanent staff employee: ${formName}`)
    } 
    else if (activeTab === "attendance") {
      const newRecord: AttendanceRecord = {
        id: Date.now(),
        name: formName,
        role: formRole || "Staff",
        checkIn: formStatus === "Present" || formStatus === "Late" ? "09:15 AM" : "--",
        checkOut: "--",
        status: formStatus as AttendanceRecord["status"]
      }
      setAttendance(prev => [newRecord, ...prev])
      showToast(`Logged attendance entry for ${formName}`)
    } 
    else if (activeTab === "wagers") {
      const rateNum = parseInt(formRate.replace(/\D/g, "")) || 2000
      const shiftsNum = parseInt(formType) || 1
      const totalPayout = rateNum * shiftsNum
      
      const newWager: DailyWager = {
        id: Date.now(),
        name: formName,
        role: formRole || "Helper",
        shiftRate: `Rs. ${rateNum.toLocaleString()}/shift`,
        shifts: shiftsNum,
        payout: `Rs. ${totalPayout.toLocaleString()}`,
        status: "Unpaid"
      }
      setWagers(prev => [newWager, ...prev])
      showToast(`Registered daily wager log for ${formName}`)
    } 
    else if (activeTab === "schedule") {
      const newShift: StaffShift = {
        id: Date.now(),
        event: formName,
        role: formRole || "Staff Coordinator",
        assigned: formPhone || "Unassigned",
        date: formDate || "May 25, 2025",
        shift: formType || "3:00 PM - 12:00 AM"
      }
      setShifts(prev => [newShift, ...prev])
      showToast(`Created shift schedule for ${formName}`)
    }

    setIsModalOpen(false)
  }

  // Attendance metrics counter
  const attendanceStats = useMemo(() => {
    const present = attendance.filter(a => a.status === "Present").length
    const late = attendance.filter(a => a.status === "Late").length
    const absent = attendance.filter(a => a.status === "Absent").length
    const pending = attendance.filter(a => a.status === "Pending Check-In").length
    return { present, late, absent, pending }
  }, [attendance])

  // Filter listings based on search text
  const filteredStaff = useMemo(() => {
    return staff.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.role.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [staff, searchQuery])

  const filteredAttendance = useMemo(() => {
    return attendance.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.role.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [attendance, searchQuery])

  const filteredWagers = useMemo(() => {
    return wagers.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.role.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [wagers, searchQuery])

  const filteredShifts = useMemo(() => {
    return shifts.filter(s => s.event.toLowerCase().includes(searchQuery.toLowerCase()) || s.assigned.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [shifts, searchQuery])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0F5B3E]" /> Staff & Workforces
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Manage permanent hall employees, contractor chefs, waiter rosters, wagers, and daily attendance logs.
          </p>
        </div>
        
        <button 
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> 
          {activeTab === "employees" && "Add Employee"}
          {activeTab === "attendance" && "Log Attendance"}
          {activeTab === "wagers" && "Register Wager"}
          {activeTab === "schedule" && "Schedule Roster"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        {[
          { id: "employees", label: "Permanent Staff" },
          { id: "attendance", label: "Staff Attendance" },
          { id: "schedule", label: "Shifts & Scheduling" },
          { id: "wagers", label: "Daily Wagers Log" }
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

      {/* Roster aggregate stats for Attendance view */}
      {activeTab === "attendance" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="bg-white p-4 rounded-xl border border-gray-150">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Today Present</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">{attendanceStats.present} Staff</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-150">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Late Arrivals</span>
            <span className="text-2xl font-black text-amber-600 block mt-1">{attendanceStats.late} Staff</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-150">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Absent Staff</span>
            <span className="text-2xl font-black text-rose-600 block mt-1">{attendanceStats.absent} Staff</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-150">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Pending Attendance</span>
            <span className="text-2xl font-black text-gray-550 block mt-1">{attendanceStats.pending} Crew</span>
          </div>
        </div>
      )}

      {/* Search Filter input */}
      <div className="flex justify-start text-left">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search roster..." 
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

      {/* Tab 1: Staff List */}
      {activeTab === "employees" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Name</th>
                  <th className="pb-3.5">Assigned Role</th>
                  <th className="pb-3.5">Work Type</th>
                  <th className="pb-3.5">Contact Number</th>
                  <th className="pb-3.5">Attendance Today</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {filteredStaff.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{s.name}</td>
                    <td className="py-3.5 text-gray-500 font-bold">{s.role}</td>
                    <td className="py-3.5 text-gray-400">{s.type}</td>
                    <td className="py-3.5">{s.phone}</td>
                    <td className="py-3.5">
                      <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button 
                        onClick={() => handleDeleteStaff(s.id, s.name)}
                        className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                        title="Remove staff member"
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

      {/* Tab 2: Attendance Logs */}
      {activeTab === "attendance" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Employee / Crew</th>
                  <th className="pb-3.5">Assigned Role</th>
                  <th className="pb-3.5">Check-In</th>
                  <th className="pb-3.5">Check-Out</th>
                  <th className="pb-3.5">Status</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {filteredAttendance.map((a) => {
                  const hasCheckedIn = a.checkIn !== "--"
                  const hasCheckedOut = a.checkOut !== "--"
                  
                  return (
                    <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 pl-2 font-bold text-gray-900">{a.name}</td>
                      <td className="py-3.5 text-gray-500 font-bold">{a.role}</td>
                      <td className="py-3.5 font-bold text-gray-800">{a.checkIn}</td>
                      <td className="py-3.5 font-bold text-gray-800">{a.checkOut}</td>
                      <td className="py-3.5">
                        {/* Cycle Status */}
                        <button 
                          onClick={() => handleCycleAttendanceStatus(a.id)}
                          className={`px-2.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase transition-colors ${
                            a.status === "Present" ? "bg-emerald-50 text-emerald-700" :
                            a.status === "Late" ? "bg-amber-50 text-amber-700" :
                            a.status === "Absent" ? "bg-rose-50 text-rose-700" :
                            "bg-gray-100 text-gray-500"
                          }`}
                          title="Click to cycle status"
                        >
                          {a.status}
                        </button>
                      </td>
                      <td className="py-3.5 text-right pr-2 flex items-center justify-end gap-2.5">
                        {/* Check-In / Check-Out Actions */}
                        {!hasCheckedIn && (
                          <button 
                            onClick={() => handleCheckIn(a.id)}
                            className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-2 py-1 rounded transition-colors"
                          >
                            Check In
                          </button>
                        )}
                        {hasCheckedIn && !hasCheckedOut && (
                          <button 
                            onClick={() => handleCheckOut(a.id)}
                            className="text-[9.5px] font-bold text-[#0F5B3E] bg-[#E6F0EC] hover:bg-[#0F5B3E] hover:text-white px-2 py-1 rounded transition-colors"
                          >
                            Check Out
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteAttendance(a.id, a.name)}
                          className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                          title="Delete entry"
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

      {/* Tab 3: Daily Wagers */}
      {activeTab === "wagers" && (
        <Card className="p-5 border border-gray-100 bg-white rounded-[20px] shadow-sm">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10.5px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">Crew Name</th>
                  <th className="pb-3.5">Role</th>
                  <th className="pb-3.5">Rate per Shift</th>
                  <th className="pb-3.5 text-center">Total Shifts</th>
                  <th className="pb-3.5">Total Earnings</th>
                  <th className="pb-3.5">Payout ledger</th>
                  <th className="pb-3.5 text-right pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {filteredWagers.map((w) => (
                  <tr key={w.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">{w.name}</td>
                    <td className="py-3.5 text-gray-500 font-bold">{w.role}</td>
                    <td className="py-3.5 font-bold text-gray-800">{w.shiftRate}</td>
                    <td className="py-3.5 text-center">{w.shifts} shifts</td>
                    <td className="py-3.5 font-bold text-emerald-600">{w.payout}</td>
                    <td className="py-3.5">
                      {/* Payout toggle status */}
                      <button 
                        onClick={() => handleToggleWagerPayout(w.id)}
                        className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase transition-colors ${
                          w.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {w.status}
                      </button>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <button 
                        onClick={() => handleDeleteWager(w.id, w.name)}
                        className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                        title="Delete wager ledger"
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

      {/* Tab 4: Scheduling */}
      {activeTab === "schedule" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredShifts.map((s) => (
            <Card key={s.id} className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between h-[180px]">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[9.5px] font-extrabold text-[#0F5B3E] bg-[#E6F0EC] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {s.date}
                  </span>
                  <button 
                    onClick={() => handleDeleteShift(s.id, s.event)}
                    className="p-1 text-gray-300 hover:text-rose-600 transition-colors"
                    title="Remove shift assignment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h3 className="text-[13.5px] font-black text-gray-900 mt-2.5">{s.event}</h3>
                <p className="text-[11px] text-gray-400 font-bold mt-1">Role: {s.role}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-[11px] font-semibold text-gray-600">
                <span>Assigned: <span className="text-gray-900 font-bold">{s.assigned}</span></span>
                <span className="text-gray-400">{s.shift}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Staff Administration Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1D1C17]/40 backdrop-blur-xs flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-white border border-[#E6E2DA] w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 m-4 text-left">
            <div className="p-4 border-b border-[#E6E2DA] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-serif font-bold text-[#1D1C17] text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0F5B3E]" /> 
                {activeTab === "employees" && "Add Permanent Employee"}
                {activeTab === "attendance" && "Log Attendance Entry"}
                {activeTab === "wagers" && "Register Daily Wager"}
                {activeTab === "schedule" && "Schedule Event Shift"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-4 space-y-4 text-xs font-semibold">
              
              {/* Field 1: Name / Event title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                  {activeTab === "schedule" ? "Event Name" : "Staff Name"}
                </label>
                <input 
                  type="text" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={activeTab === "schedule" ? "e.g. Usman Walima Dinner" : "e.g. Shakir Butt"}
                  required
                  className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              {/* Field 2: Role / Assigned Position */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Assigned Role</label>
                <input 
                  type="text" 
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="e.g. Waiter / Kitchen Assistant"
                  required
                  className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              {/* Field 3: Type / Hours / Rate / Contact */}
              {activeTab === "employees" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Work Type</label>
                    <input 
                      type="text" 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      placeholder="e.g. Full-time / Part-time"
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Contact Phone</label>
                    <input 
                      type="text" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                </>
              )}

              {activeTab === "attendance" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Initial Status Mode</label>
                  <select 
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E] cursor-pointer"
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                    <option value="Pending Check-In">Pending Check-In</option>
                  </select>
                </div>
              )}

              {activeTab === "wagers" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Rate per Shift (Rs.)</label>
                    <input 
                      type="text" 
                      value={formRate}
                      onChange={(e) => setFormRate(e.target.value)}
                      placeholder="e.g. 2500"
                      required
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Total Shifts Completed</label>
                    <input 
                      type="number" 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      placeholder="e.g. 5"
                      required
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                </>
              )}

              {activeTab === "schedule" && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Shift Timings</label>
                    <input 
                      type="text" 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      placeholder="e.g. 3:00 PM - 12:00 AM"
                      required
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Assigned Staff Name</label>
                    <input 
                      type="text" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. Usman Khan"
                      required
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">Date of Shift</label>
                    <input 
                      type="text" 
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      placeholder="e.g. May 28, 2025"
                      required
                      className="w-full px-3 py-2 font-bold text-gray-700 bg-[#FAF8F5] border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                    />
                  </div>
                </>
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

export default function VenueStaffPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 animate-pulse">Loading Workforce OS...</span>
      </div>
    }>
      <StaffPageContent />
    </Suspense>
  )
}
