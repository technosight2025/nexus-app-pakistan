"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, CalendarCheck, Users, Banknote, 
  Plus, Search, Filter, Check, X, ChevronRight, Phone, 
  MessageSquare, FileText, Clock, ThermometerSun, MapPin, 
  Sliders, Building2, Sparkles, Copy, Calendar, ChevronDown, 
  Info, Sparkle, User, DollarSign, ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClockWeatherWidget } from "./ClockWeatherWidget"

interface Lead {
  id: string
  name: string
  type: string
  date: string
  value: string
  guests: number
  source: "Website" | "Instagram" | "WhatsApp" | "Walk-in"
  status: "New" | "Contacted" | "Site Visit" | "Proposal" | "Won" | "Lost"
  notes: string[]
  phone: string
}

interface Hall {
  id: string
  name: string
  capacity: number
  status: "Available" | "Event in Progress" | "In Setup" | "Maintenance"
  temp: number
  slots: {
    morning: "Available" | "Booked" | "Blocked"
    afternoon: "Available" | "Booked" | "Blocked"
    evening: "Available" | "Booked" | "Blocked"
  }
}

const INITIAL_LEADS: Lead[] = [
  { 
    id: "l1", 
    name: "Ahmed Raza", 
    type: "Wedding", 
    date: "2026-10-15", 
    value: "1.2M", 
    guests: 450,
    source: "Instagram", 
    status: "New",
    notes: ["Expressed interest in the Grand Ballroom.", "Requested high-end stage decor package."],
    phone: "+92 300 1234567"
  },
  { 
    id: "l2", 
    name: "Fatima Ali", 
    type: "Mehndi", 
    date: "2026-11-02", 
    value: "800k", 
    guests: 300,
    source: "WhatsApp", 
    status: "Contacted",
    notes: ["Sent initial package pricing via PDF.", "Followed up regarding food options."],
    phone: "+92 321 7654321"
  },
  { 
    id: "l3", 
    name: "TechCorp Gala", 
    type: "Corporate", 
    date: "2026-09-20", 
    value: "450k", 
    guests: 150,
    source: "Website", 
    status: "Site Visit",
    notes: ["Site visit completed yesterday. Liked the sound setup.", "Awaiting budget approval."],
    phone: "+92 333 4567890"
  },
  { 
    id: "l4", 
    name: "Usman Tariq", 
    type: "Valima", 
    date: "2026-12-05", 
    value: "1.5M", 
    guests: 600,
    source: "Walk-in", 
    status: "Proposal",
    notes: ["Custom menu proposal sent.", "Awaiting feedback on security protocols."],
    phone: "+92 312 9876543"
  },
  { 
    id: "l5", 
    name: "Zara Khan", 
    type: "Birthday", 
    date: "2026-09-12", 
    value: "200k", 
    guests: 80,
    source: "Instagram", 
    status: "Won",
    notes: ["Deposit paid.", "Theme confirmed: Royal Pastel Theme."],
    phone: "+92 345 6789012"
  }
]

const INITIAL_HALLS: Hall[] = [
  {
    id: "h1",
    name: "Grand Ballroom",
    capacity: 600,
    status: "Event in Progress",
    temp: 23,
    slots: {
      morning: "Booked",
      afternoon: "Booked",
      evening: "Booked"
    }
  },
  {
    id: "h2",
    name: "Crystal Marquee",
    capacity: 800,
    status: "In Setup",
    temp: 24,
    slots: {
      morning: "Available",
      afternoon: "Blocked",
      evening: "Booked"
    }
  },
  {
    id: "h3",
    name: "Royal Gardens",
    capacity: 1200,
    status: "Available",
    temp: 28,
    slots: {
      morning: "Available",
      afternoon: "Available",
      evening: "Blocked"
    }
  }
]

export function VenueDashboardHome() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [halls, setHalls] = useState<Hall[]>(INITIAL_HALLS)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(INITIAL_LEADS[0])
  const [newNote, setNewNote] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  
  // Modals state
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    type: "Wedding",
    date: "",
    value: "",
    guests: 300,
    source: "Instagram" as const,
    phone: ""
  })

  // Time & Greeting
  const [greeting, setGreeting] = useState("Good Day")
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  // KPI Calculations
  const activeLeadsCount = leads.filter(l => l.status !== "Won" && l.status !== "Lost").length
  const wonValue = leads
    .filter(l => l.status === "Won")
    .reduce((acc, curr) => {
      const numericVal = parseFloat(curr.value.replace(/[^0-9.]/g, ''))
      const scale = curr.value.toLowerCase().includes('m') ? 1000000 : 1000
      return acc + (numericVal * scale)
    }, 0)

  // Filter & Search Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Add Note to Selected Lead
  const handleAddNote = () => {
    if (!newNote.trim() || !selectedLead) return
    const updatedLeads = leads.map(l => {
      if (l.id === selectedLead.id) {
        const updatedNotes = [...l.notes, newNote.trim()]
        return { ...l, notes: updatedNotes }
      }
      return l
    })
    setLeads(updatedLeads)
    setSelectedLead({ ...selectedLead, notes: [...selectedLead.notes, newNote.trim()] })
    setNewNote("")
  }

  // Handle lead status updates
  const handleUpdateStatus = (leadId: string, newStatus: Lead["status"]) => {
    const updatedLeads = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus }
      }
      return l
    })
    setLeads(updatedLeads)
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus })
    }
  }

  // Handle Add Lead Submit
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLeadForm.name || !newLeadForm.date || !newLeadForm.value) return

    const newLead: Lead = {
      id: "l_" + Date.now(),
      name: newLeadForm.name,
      type: newLeadForm.type,
      date: newLeadForm.date,
      value: newLeadForm.value,
      guests: newLeadForm.guests,
      source: newLeadForm.source,
      status: "New",
      notes: ["Lead registered on dashboard."],
      phone: newLeadForm.phone || "+92 300 0000000"
    }

    setLeads([newLead, ...leads])
    setSelectedLead(newLead)
    setIsAddLeadOpen(false)
    setNewLeadForm({
      name: "",
      type: "Wedding",
      date: "",
      value: "",
      guests: 300,
      source: "Instagram",
      phone: ""
    })
  }

  // Toggle Hall Status
  const handleToggleHallStatus = (hallId: string) => {
    const statusCycle: Hall["status"][] = ["Available", "Event in Progress", "In Setup", "Maintenance"]
    setHalls(halls.map(h => {
      if (h.id === hallId) {
        const nextIdx = (statusCycle.indexOf(h.status) + 1) % statusCycle.length
        return { ...h, status: statusCycle[nextIdx] }
      }
      return h
    }))
  }

  // Update Hall Temp
  const handleTempChange = (hallId: string, newTemp: number) => {
    setHalls(halls.map(h => h.id === hallId ? { ...h, temp: newTemp } : h))
  }

  // Toggle Slots
  const handleToggleSlot = (hallId: string, slotKey: "morning" | "afternoon" | "evening") => {
    const slotCycle: ("Available" | "Booked" | "Blocked")[] = ["Available", "Booked", "Blocked"]
    setHalls(halls.map(h => {
      if (h.id === hallId) {
        const nextVal = slotCycle[(slotCycle.indexOf(h.slots[slotKey]) + 1) % slotCycle.length]
        return {
          ...h,
          slots: { ...h.slots, [slotKey]: nextVal }
        }
      }
      return h
    }))
  }

  // Quick Action Notification Templates
  const copyTemplateMessage = (type: "visit" | "quote") => {
    if (!selectedLead) return
    const text = type === "visit" 
      ? `Dear ${selectedLead.name}, thank you for choosing Royal Palace. We invite you for a site visit this week to explore our spaces. Please let us know your availability.`
      : `Dear ${selectedLead.name}, we have sent your customized proposal for ${selectedLead.type} event. Please check your email or WhatsApp.`
    navigator.clipboard.writeText(text)
    alert("Message template copied to clipboard!")
  }

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto text-[#1A1A1A]">
      
      {/* 1. Header with greeting, active venue, stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white border border-[slate-100] rounded-[24px] p-6 shadow-sm">
        <div>
          <span className="text-xs font-bold text-[#0A3B2A] tracking-widest uppercase bg-[#FAF8F5] px-3 py-1 rounded-full">
            Banquet Console
          </span>
          <h1 className="text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight mt-2 text-[#1A1A1A]">
            {greeting}, Kamran Ali
          </h1>
          <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
            <Building2 className="w-4 h-4 text-[#0A3B2A]" /> Royal Palace Banquet Hall
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button 
            onClick={() => setIsAddLeadOpen(true)}
            className="flex-1 md:flex-initial bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white font-bold rounded-2xl h-11 shadow-sm px-5"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Lead
          </Button>
        </div>
      </div>

      {/* Clock and Outdoor Climate Widget */}
      <ClockWeatherWidget />

      {/* Primary KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-[24px] p-5 border border-[slate-100] shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] text-[#0A3B2A]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Real-time</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium mb-1">Active Pipeline Leads</p>
            <p className="text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight text-[#1A1A1A]">{activeLeadsCount}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-[24px] p-5 border border-[slate-100] shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-[#FCEEF3] text-[#D9467A]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">80% Target</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium mb-1">Lead Conversion Rate</p>
            <p className="text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight text-[#1A1A1A]">
              {leads.length ? Math.round((leads.filter(l => l.status === "Won").length / leads.length) * 100) : 0}%
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-[24px] p-5 border border-[slate-100] shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-amber-50 text-[#C9A227]">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0A3B2A] bg-[#FAF8F5] px-2 py-1 rounded-md">2 Booked</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium mb-1">Today's Hall Bookings</p>
            <p className="text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight text-[#1A1A1A]">
              {halls.filter(h => h.status === "Event in Progress" || h.status === "In Setup").length} / {halls.length}
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white rounded-[24px] p-5 border border-[slate-100] shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <Banknote className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">PKR</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium mb-1">Won Leads Revenue</p>
            <p className="text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight text-[#1A1A1A]">
              {(wonValue / 1000000).toFixed(1)}M
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Leads Overview and CRM Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Area: Leads Overview & Venue management widget (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 2. Leads Overview Widget (Visual Analytics) */}
          <div className="bg-white rounded-[24px] border border-[slate-100] p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A3B2A] tracking-tight">Leads Overview & Analytics</h2>
                <p className="text-xs text-slate-500 font-medium">Detailed breakdown of acquisition channels and funnel efficiency</p>
              </div>
              <Sparkle className="w-5 h-5 text-[#D9467A]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Acquisition Funnel progress */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Channel Efficiency</h3>
                <div className="space-y-3">
                  {[
                    { source: "Instagram", pct: 40, count: 8, color: "bg-[#D9467A]" },
                    { source: "WhatsApp", pct: 30, count: 6, color: "bg-[#0A3B2A]" },
                    { source: "Website", pct: 20, count: 4, color: "bg-blue-500" },
                    { source: "Walk-in", pct: 10, count: 2, color: "bg-amber-500" }
                  ].map((chan) => (
                    <div key={chan.source} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{chan.source}</span>
                        <span>{chan.pct}% ({chan.count} leads)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${chan.pct}%` }}
                          className={`h-full ${chan.color} rounded-full`}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Stats / Funnel metrics */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[slate-100] flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A3B2A] bg-[#FAF8F5] px-2.5 py-1 rounded-full w-max">
                    <TrendingUp className="w-3.5 h-3.5" /> High Performance
                  </div>
                  <h4 className="text-lg font-black mt-2 text-[#1A1A1A]">Funnel Conversion Goal</h4>
                  <p className="text-xs text-slate-500 font-medium">Goal is 25% booking confirmation on all registered leads.</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-600">Current Conversion</span>
                      <span className="text-[#0A3B2A]">20%</span>
                    </div>
                    <div className="h-2 w-full bg-white border border-[slate-100] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A3B2A] rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[40px] font-black font-poppins text-[#0A3B2A] text-[#0A3B2A]">80%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">of target met</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Venue Management Widget (Physical asset console) */}
          <div className="bg-white rounded-[24px] border border-[slate-100] p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold font-poppins text-[#0A3B2A] tracking-tight">Halls & Spaces Console</h2>
                <p className="text-xs text-slate-500 font-medium">Real-time tracking of space statuses, slots, and indoor environment climate</p>
              </div>
              <Sliders className="w-5 h-5 text-[#0A3B2A]" />
            </div>

            <div className="space-y-6">
              {halls.map((hall) => (
                <div 
                  key={hall.id} 
                  className="border border-[slate-100] rounded-[24px] p-5 hover:border-[#0A3B2A]/30 hover:shadow-md transition-all space-y-4 bg-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-[#FAF8F5] text-[#0A3B2A] rounded-xl">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold font-poppins text-[#1A1A1A] text-lg">{hall.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">Capacity: Max {hall.capacity} guests</p>
                      </div>
                    </div>
                    
                    {/* Interactive Status Selector button */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button 
                        onClick={() => handleToggleHallStatus(hall.id)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-2xl border transition-all flex items-center gap-1.5 ${
                          hall.status === "Available" 
                            ? "bg-[#FAF8F5] text-[#0A3B2A] border-[#0A3B2A]/20 hover:bg-[#FAF8F5]/80"
                            : hall.status === "Event in Progress"
                            ? "bg-[#FCEEF3] text-[#D9467A] border-[#D9467A]/20 hover:bg-[#FCEEF3]/80"
                            : hall.status === "In Setup"
                            ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-current" />
                        {hall.status}
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Environment controls & Climate details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 border-t border-[slate-100]">
                    
                    {/* Temperature Slider */}
                    <div className="md:col-span-6 flex flex-col justify-center space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-600">
                        <span className="flex items-center gap-1"><ThermometerSun className="w-3.5 h-3.5 text-orange-500" /> Climate Control</span>
                        <span className="text-[#0A3B2A] font-black">{hall.temp}°C</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-bold">18°C</span>
                        <input 
                          type="range" 
                          min="18" 
                          max="30" 
                          value={hall.temp}
                          onChange={(e) => handleTempChange(hall.id, parseInt(e.target.value))}
                          className="flex-1 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0A3B2A]"
                        />
                        <span className="text-xs text-slate-400 font-bold">30°C</span>
                      </div>
                    </div>

                    {/* Timeline Slots */}
                    <div className="md:col-span-6 space-y-2">
                      <p className="text-xs font-bold text-slate-600">Today's Slots Timeline</p>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(hall.slots).map(([slotName, status]) => (
                          <button
                            key={slotName}
                            onClick={() => handleToggleSlot(hall.id, slotName as "morning" | "afternoon" | "evening")}
                            className={`py-2 px-2.5 rounded-2xl border text-center transition-all ${
                              status === "Available"
                                ? "bg-white border-[slate-100] text-slate-700 hover:border-[#0A3B2A]"
                                : status === "Booked"
                                ? "bg-[#0A3B2A] border-[#0A3B2A] text-white"
                                : "bg-slate-100 border-[slate-100] text-slate-400"
                            }`}
                          >
                            <p className="text-[10px] font-bold capitalize text-slate-500 group-hover:text-white leading-none mb-1">
                              {slotName}
                            </p>
                            <p className="text-[11px] font-black leading-none uppercase">
                              {status}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Area: CRM Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 3. CRM Panel (Interactive) */}
          <div className="bg-white rounded-[24px] border border-[slate-100] p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold font-poppins text-[#0A3B2A] tracking-tight">CRM Panel</h2>
              <p className="text-xs text-slate-500 font-medium">Customer leads tracking, follow-ups & interaction logging</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm font-medium text-[#1A1A1A]"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[slate-100]">
                {["All", "New", "Contacted", "Proposal", "Won"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      statusFilter === st 
                        ? "bg-[#0A3B2A] text-white" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered Leads List */}
            <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[slate-100]">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedLead?.id === lead.id 
                        ? "bg-[#FAF8F5] border-[#0A3B2A]" 
                        : "bg-white border-[slate-100] hover:border-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold font-poppins text-[#1A1A1A] truncate">{lead.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === "New" 
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "Contacted"
                          ? "bg-amber-100 text-amber-800"
                          : lead.status === "Site Visit"
                          ? "bg-purple-100 text-purple-800"
                          : lead.status === "Proposal"
                          ? "bg-indigo-100 text-indigo-800"
                          : lead.status === "Won"
                          ? "bg-[#FAF8F5] text-[#0A3B2A]"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {lead.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-end mt-2 text-xs font-medium text-slate-500">
                      <span>{lead.type} • {lead.guests} guests</span>
                      <span className="font-bold text-slate-700">PKR {lead.value}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs font-medium">
                  No matching leads found
                </div>
              )}
            </div>

            {/* Selected Lead Workspace Area */}
            {selectedLead && (
              <div className="bg-[#FAF8F5] border border-[slate-100] rounded-[24px] p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold font-poppins text-[#1A1A1A]">{selectedLead.name}</h3>
                    <p className="text-xs text-slate-500">{selectedLead.type} • {selectedLead.phone}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FAF8F5] text-[#0A3B2A] font-bold text-xs px-2.5 py-0.5 rounded-full">
                    {selectedLead.source}
                  </div>
                </div>

                {/* Status Updater */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lead Status</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["New", "Contacted", "Proposal", "Won", "Lost"] as const).slice(0, 3).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedLead.id, st)}
                        className={`text-xs font-bold py-1.5 rounded-2xl border transition-all ${
                          selectedLead.status === st 
                            ? "bg-[#0A3B2A] text-white border-[#0A3B2A]" 
                            : "bg-white text-slate-700 border-[slate-100] hover:bg-slate-50"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                    {(["Proposal", "Won", "Lost"] as const).map((st) => {
                      if (st === "Proposal") return null;
                      return (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(selectedLead.id, st)}
                          className={`text-xs font-bold py-1.5 rounded-2xl border transition-all ${
                            selectedLead.status === st 
                              ? "bg-[#0A3B2A] text-white border-[#0A3B2A]" 
                              : "bg-white text-slate-700 border-[slate-100] hover:bg-slate-50"
                          }`}
                        >
                          {st}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Timeline Notes */}
                <div className="space-y-2 border-t border-[slate-100] pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Activity Notes</span>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {selectedLead.notes.map((note, nIdx) => (
                      <div key={nIdx} className="bg-white p-2.5 rounded-lg border border-[slate-100] text-xs">
                        <p className="text-slate-700 leading-normal">{note}</p>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Logged note</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Note Area */}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add an update note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                      className="flex-1 h-9 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-1 focus:ring-[#0A3B2A] text-xs"
                    />
                    <Button 
                      onClick={handleAddNote}
                      className="h-9 bg-[#0A3B2A] text-white font-bold rounded-2xl px-3.5 text-xs hover:bg-[#0A3B2A]/90"
                    >
                      Log
                    </Button>
                  </div>
                </div>

                {/* Quick Messaging Actions */}
                <div className="space-y-2 pt-3 border-t border-[slate-100]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Contact Console</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyTemplateMessage("visit")}
                      className="flex-1 h-9 bg-white border-[slate-100] text-slate-700 text-xs font-bold rounded-2xl hover:bg-slate-50"
                    >
                      <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#0A3B2A]" /> Invite Visit
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => copyTemplateMessage("quote")}
                      className="flex-1 h-9 bg-white border-[slate-100] text-slate-700 text-xs font-bold rounded-2xl hover:bg-slate-50"
                    >
                      <FileText className="w-3.5 h-3.5 mr-1 text-[#D9467A]" /> Proposal Sent
                    </Button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Lead Dialog Modal */}
      <AnimatePresence>
        {isAddLeadOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[24px] border border-[slate-100] p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[slate-100]">
                <h3 className="font-bold text-lg text-[#1A1A1A] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0A3B2A]" /> New CRM Lead Entry
                </h3>
                <button onClick={() => setIsAddLeadOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLeadSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Lead Client Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ayesha Siddique"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Event Category</label>
                    <select
                      value={newLeadForm.type}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, type: e.target.value })}
                      className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm bg-white"
                    >
                      <option>Wedding</option>
                      <option>Mehndi</option>
                      <option>Valima</option>
                      <option>Corporate</option>
                      <option>Birthday</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Acquisition Source</label>
                    <select
                      value={newLeadForm.source}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as any })}
                      className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm bg-white"
                    >
                      <option>Instagram</option>
                      <option>WhatsApp</option>
                      <option>Website</option>
                      <option>Walk-in</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Event Date</label>
                    <input 
                      type="date" 
                      required
                      value={newLeadForm.date}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, date: e.target.value })}
                      className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Est. Budget Value</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 1.2M or 800k"
                      value={newLeadForm.value}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, value: e.target.value })}
                      className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Guest Count</label>
                    <input 
                      type="number" 
                      value={newLeadForm.guests}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, guests: parseInt(e.target.value) })}
                      className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +92 300 1234567"
                      value={newLeadForm.phone}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                      className="w-full h-10 px-3 rounded-2xl border border-[slate-100] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddLeadOpen(false)}
                    className="flex-1 border-[slate-100] text-slate-700 font-bold rounded-2xl h-10"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-[#0A3B2A] hover:bg-[#0A3B2A]/90 text-white font-bold rounded-2xl h-10"
                  >
                    Register Lead
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
