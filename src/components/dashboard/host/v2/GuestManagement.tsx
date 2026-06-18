"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Search, Bell, Settings, LayoutDashboard, Users, Calendar, Utensils,
  UserPlus, HelpCircle, LifeBuoy, Download, Send, UserCheck, Clock,
  XCircle, Edit2, Trash2, MapPin, ChevronRight, CheckCircle2, ChevronLeft, Menu, X, ArrowLeft
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Guest {
  id: number;
  name: string;
  email?: string;
  count: number;
  side: "Bride" | "Groom" | "Mutual";
  status: "Confirmed" | "Pending" | "Declined";
}

const DEFAULT_GUESTS: Guest[] = [
  { id: 1, name: "Ali Raza & Family", email: "ali.raza@mail.com", count: 4, side: "Groom", status: "Confirmed" },
  { id: 2, name: "Sana Malik & Friends", email: "sana.m@mail.com", count: 6, side: "Bride", status: "Confirmed" },
  { id: 3, name: "Uncle Tariq", email: "tariq.k@mail.com", count: 2, side: "Groom", status: "Pending" },
  { id: 4, name: "Auntie Yasmin", email: "yasmin.a@mail.com", count: 4, side: "Bride", status: "Pending" }
]

export function GuestManagement() {
  const [isMounted, setIsMounted] = useState(false)
  const [guests, setGuests] = useState<Guest[]>(DEFAULT_GUESTS)
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)

  // Form states
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formCount, setFormCount] = useState("1")
  const [formSide, setFormSide] = useState<"Bride" | "Groom" | "Mutual">("Bride")
  const [formStatus, setFormStatus] = useState<"Confirmed" | "Pending" | "Declined">("Pending")

  // Load from local storage
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexus_crm_guest_list")
      if (stored) {
        try {
          // Map stored data (might have slight format variations, e.g. status: 'Attending')
          const parsed = JSON.parse(stored).map((g: any) => {
            let normalizedStatus: "Confirmed" | "Pending" | "Declined" = "Pending";
            if (g.status === "Attending" || g.status === "Confirmed") normalizedStatus = "Confirmed";
            else if (g.status === "Declined" || g.status === "Regret") normalizedStatus = "Declined";

            return {
              id: g.id || Date.now() + Math.random(),
              name: g.name || "Guest",
              email: g.email || `${g.name?.toLowerCase().replace(/\s+/g, '') || 'guest'}@mail.com`,
              count: g.count || 1,
              side: g.side || "Mutual",
              status: normalizedStatus
            }
          })
          setGuests(parsed)
        } catch (e) {
          console.error("Error parsing guest list:", e)
        }
      }
    }
  }, [])

  // Save helper
  const saveToStorage = (newGuests: Guest[]) => {
    if (typeof window !== "undefined") {
      // Keep it compatible with what other pages expect (Attending/Pending/Declined)
      const mappedForStorage = newGuests.map(g => ({
        id: g.id,
        name: g.name,
        count: g.count,
        side: g.side,
        status: g.status === "Confirmed" ? "Attending" : g.status
      }))
      localStorage.setItem("nexus_crm_guest_list", JSON.stringify(mappedForStorage))
    }
  }

  const handleOpenAddModal = () => {
    setEditingGuest(null)
    setFormName("")
    setFormEmail("")
    setFormCount("1")
    setFormSide("Bride")
    setFormStatus("Pending")
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (g: Guest) => {
    setEditingGuest(g)
    setFormName(g.name)
    setFormEmail(g.email || "")
    setFormCount(String(g.count))
    setFormSide(g.side)
    setFormStatus(g.status)
    setIsModalOpen(true)
  }

  const handleDeleteGuest = (id: number) => {
    if (confirm("Are you sure you want to remove this guest?")) {
      const updated = guests.filter(g => g.id !== id)
      setGuests(updated)
      saveToStorage(updated)
    }
  }

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return

    const countNum = Math.max(1, parseInt(formCount) || 1)
    const emailVal = formEmail.trim() || `${formName.toLowerCase().replace(/\s+/g, '')}@mail.com`

    let updatedGuests: Guest[]
    if (editingGuest) {
      updatedGuests = guests.map(g => 
        g.id === editingGuest.id 
          ? { ...g, name: formName, email: emailVal, count: countNum, side: formSide, status: formStatus }
          : g
      )
    } else {
      const newGuest: Guest = {
        id: Date.now(),
        name: formName,
        email: emailVal,
        count: countNum,
        side: formSide,
        status: formStatus
      }
      updatedGuests = [...guests, newGuest]
    }

    setGuests(updatedGuests)
    saveToStorage(updatedGuests)
    setIsModalOpen(false)
  }

  // Stats Calculations
  const totalInvited = guests.reduce((acc, g) => acc + g.count, 0)
  const confirmedCount = guests.filter(g => g.status === "Confirmed").reduce((acc, g) => acc + g.count, 0)
  const pendingCount = guests.filter(g => g.status === "Pending").reduce((acc, g) => acc + g.count, 0)
  const declinedCount = guests.filter(g => g.status === "Declined").reduce((acc, g) => acc + g.count, 0)

  const pctConfirmed = totalInvited > 0 ? Math.round((confirmedCount / totalInvited) * 100) : 0
  const pctPending = totalInvited > 0 ? Math.round((pendingCount / totalInvited) * 100) : 0
  const pctDeclined = totalInvited > 0 ? Math.round((declinedCount / totalInvited) * 100) : 0

  // Filter & Search
  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (g.email && g.email.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (activeFilter === "All") return matchesSearch
    if (activeFilter === "Bride") return matchesSearch && g.side === "Bride"
    if (activeFilter === "Groom") return matchesSearch && g.side === "Groom"
    if (activeFilter === "Mutual") return matchesSearch && g.side === "Mutual"
    return matchesSearch
  })

  const getInitials = (name: string) => {
    return name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()
  }

  const initialColors = [
    "bg-[#312E81] text-white",
    "bg-[#059669] text-white",
    "bg-amber-100 text-amber-800",
    "bg-indigo-100 text-indigo-800"
  ]

  if (!isMounted) return null

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1400px] mx-auto font-sans pb-28 md:pb-24 relative">
            
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl lg:text-[32px] font-black font-poppins text-[#111827] mb-2 tracking-tight">Guest Management</h1>
          <p className="text-[14px] text-[#6B7280] font-medium">Overview and tracking for your celebration guest list.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenAddModal}
            className="bg-[#312E81] hover:bg-[#4338ca] text-white text-[13px] font-bold py-2.5 px-5 rounded-xl shadow-md shadow-indigo-900/20 transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Add Guest
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
        
        {/* Total Invited */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#312E81] rounded-l-2xl"></div>
          <div className="flex items-start justify-between mb-4 pl-3">
            <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-[#312E81]">
              <Users className="w-4.5 h-4.5" style={{width:18,height:18}} />
            </div>
            <span className="bg-indigo-50 text-[#312E81] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">TOTAL</span>
          </div>
          <div className="pl-3">
            <p className="text-3xl font-black font-poppins text-[#111827] mb-0.5">{totalInvited}</p>
            <p className="text-[11px] text-[#6B7280] font-medium">Total Invited</p>
          </div>
        </div>

        {/* Confirmed */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#059669] rounded-l-2xl"></div>
          <div className="flex items-start justify-between mb-4 pl-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-[#059669]">
              <CheckCircle2 className="w-[18px] h-[18px]" />
            </div>
            <span className="bg-emerald-50 text-[#059669] text-[10px] font-bold px-2 py-0.5 rounded-full">{pctConfirmed}%</span>
          </div>
          <div className="pl-3">
            <p className="text-3xl font-black font-poppins text-[#111827] mb-0.5">{confirmedCount}</p>
            <p className="text-[11px] text-[#6B7280] font-medium">Confirmed</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37] rounded-l-2xl"></div>
          <div className="flex items-start justify-between mb-4 pl-3">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-[18px] h-[18px]" />
            </div>
            <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{pctPending}%</span>
          </div>
          <div className="pl-3">
            <p className="text-3xl font-black font-poppins text-[#111827] mb-0.5">{pendingCount}</p>
            <p className="text-[11px] text-[#6B7280] font-medium">Pending</p>
          </div>
        </div>

        {/* Declined */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EF4444] rounded-l-2xl"></div>
          <div className="flex items-start justify-between mb-4 pl-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center text-[#EF4444]">
              <XCircle className="w-[18px] h-[18px]" />
            </div>
            <span className="bg-red-50 text-[#EF4444] text-[10px] font-bold px-2 py-0.5 rounded-full">{pctDeclined}%</span>
          </div>
          <div className="pl-3">
            <p className="text-3xl font-black font-poppins text-[#111827] mb-0.5">{declinedCount}</p>
            <p className="text-[11px] text-[#6B7280] font-medium">Declined</p>
          </div>
        </div>

      </div>

      {/* Main Split Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Col: Guest List Table */}
        <div className="lg:col-span-2 bg-white rounded-[32px] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
          
          {/* Table Header & Filters */}
          <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h3 className="text-[18px] font-bold font-poppins text-[#111827]">Guest List</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search guests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {["All", "Bride", "Groom", "Mutual"].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`text-[12px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    activeFilter === tab 
                      ? "bg-[#312E81] text-white" 
                      : "bg-gray-100 text-[#6B7280] hover:text-[#312E81] hover:bg-indigo-50"
                  }`}
                >
                  {tab === "All" ? "All Sides" : `${tab} Side`}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="w-[40%] py-3 px-6 lg:px-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50">Guest Name</th>
                  <th className="w-[15%] py-3 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50">Party</th>
                  <th className="w-[15%] py-3 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50">Side</th>
                  <th className="w-[15%] py-3 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50">RSVP</th>
                  <th className="w-[15%] py-3 px-6 lg:px-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, idx) => {
                  const initialColor = initialColors[idx % initialColors.length]
                  return (
                    <tr key={guest.id} className="border-b border-gray-50 hover:bg-indigo-50/20 transition-colors">
                      <td className="py-4 px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[12px] ${initialColor}`}>
                            {getInitials(guest.name)}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-[#111827]">{guest.name}</p>
                            <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">{guest.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[12px] font-bold text-[#111827]">{guest.count} pax</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-50 text-[#312E81]">
                          {guest.side}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit ${
                          guest.status === "Confirmed" ? "bg-emerald-50 text-[#059669]" :
                          guest.status === "Pending" ? "bg-amber-50 text-amber-700" :
                          "bg-red-50 text-[#EF4444]"
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {guest.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 lg:px-8">
                        <div className="flex items-center justify-end gap-2 text-gray-400">
                          <button onClick={() => handleOpenEditModal(guest)} className="p-1 hover:text-[#312E81] hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteGuest(guest.id)} className="p-1 hover:text-[#EF4444] hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filteredGuests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400 font-medium text-xs">
                      No guests found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 lg:p-6 border-t border-slate-100 flex items-center justify-between bg-white">
            <p className="text-[13px] font-medium text-slate-500">Showing {filteredGuests.length} of {guests.length} guests</p>
          </div>

        </div>

        {/* Right Col: Widgets */}
        <div className="flex flex-col gap-6 lg:gap-8">
          
          {/* Dietary Summary */}
          <div className="bg-white rounded-[32px] p-6 lg:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <Utensils className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-[18px] font-bold font-poppins text-[#111827]">Dietary Summary</h3>
            </div>

            <div className="space-y-5 mb-8">
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-[12px] font-semibold text-[#111827]">Standard Menu</span>
                  <span className="text-[12px] font-bold text-[#111827]">{Math.round(totalInvited * 0.85)}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#312E81] h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-[12px] font-semibold text-[#111827]">Vegetarian / Diet</span>
                  <span className="text-[12px] font-bold text-[#111827]">{Math.round(totalInvited * 0.1)}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#059669] h-full rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-[12px] font-semibold text-[#111827]">Allergies (Nuts/Gluten)</span>
                  <span className="text-[12px] font-bold text-[#111827]">{Math.round(totalInvited * 0.05)}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Milestones */}
          <div className="bg-white rounded-[32px] p-6 lg:p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-[18px] font-bold font-poppins text-[#111827]">RSVP Milestones</h3>
            </div>

            <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
              <div className="relative pl-6">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#059669] border-4 border-white flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <p className="text-[12px] font-bold text-[#111827] leading-tight mb-0.5">Digital Invite Launch</p>
                <p className="text-[11px] text-[#6B7280] font-medium">Completed during Onboarding</p>
              </div>

              <div className="relative pl-6">
                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#D4AF37] border-4 border-white flex items-center justify-center">
                  <Bell className="w-3 h-3 text-white" />
                </div>
                <p className="text-[12px] font-bold text-[#111827] leading-tight mb-0.5">Reminder Send</p>
                <p className="text-[11px] text-[#6B7280] font-medium">Automatic based on RSVPs</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ═══ ADD/EDIT GUEST MODAL ═══ */}
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
                     <h3 className="text-lg font-black text-[#312E81] mb-4 font-poppins">
                {editingGuest ? "Edit Guest Details" : "Add New Guest"}
              </h3>
              
              <form onSubmit={handleSaveGuest} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Bilal Ahmed & Family"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address (Optional)</label>
                  <input 
                    type="email" 
                    placeholder="e.g. guest@mail.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Pax</label>
                    <input 
                      type="number" 
                      min="1"
                      required
                      value={formCount}
                      onChange={(e) => setFormCount(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#312E81] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Side</label>
                    <select
                      value={formSide}
                      onChange={(e) => setFormSide(e.target.value as "Bride" | "Groom" | "Mutual")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#312E81] transition-all"
                    >
                      <option value="Bride">Bride</option>
                      <option value="Groom">Groom</option>
                      <option value="Mutual">Mutual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as "Confirmed" | "Pending" | "Declined")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#312E81] transition-all"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold text-[#111827] hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-[#312E81] text-white rounded-xl text-xs font-bold hover:bg-[#4338ca] transition-colors shadow-sm shadow-indigo-900/20"
                  >
                    {editingGuest ? "Save Details" : "Add Guest"}
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
