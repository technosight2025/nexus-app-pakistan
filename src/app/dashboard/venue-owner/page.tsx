"use client"

import { useState, useEffect } from "react"
import { Building2, Sparkle } from "lucide-react"
import VenueOwnerOverview from "@/components/dashboard/venue-owner/VenueOwnerOverview"
import LeadsPipelineModule, { type Lead } from "@/components/dashboard/venue-owner/LeadsPipelineModule"
import VenueManagementModule, { type Hall } from "@/components/dashboard/venue-owner/VenueManagementModule"
import BookingsModule from "@/components/dashboard/venue-owner/BookingsModule"
import RevenueSummaryModule from "@/components/dashboard/venue-owner/RevenueSummaryModule"
import QuickActionsModule from "@/components/dashboard/venue-owner/QuickActionsModule"

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

export default function VenueOwnerDashboard() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [halls, setHalls] = useState<Hall[]>(INITIAL_HALLS)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(INITIAL_LEADS[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")

  // Greeting
  const [greeting, setGreeting] = useState("Good Day")
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")
  }, [])

  // KPI calculations
  const activeLeadsCount = leads.filter(l => l.status !== "Won" && l.status !== "Lost").length
  const wonValue = leads
    .filter(l => l.status === "Won")
    .reduce((acc, curr) => {
      const numericVal = parseFloat(curr.value.replace(/[^0-9.]/g, ''))
      const scale = curr.value.toLowerCase().includes('m') ? 1000000 : 1000
      return acc + (numericVal * scale)
    }, 0)
  const todayEventsCount = halls.filter(h => h.status === "Event in Progress" || h.status === "In Setup").length
  const wonLeadsCount = leads.filter(l => l.status === "Won").length
  const conversionRate = leads.length ? Math.round((wonLeadsCount / leads.length) * 100) : 0

  const leadsBreakdown = {
    total: leads.length,
    newCount: leads.filter(l => l.status === "New").length,
    activeCount: leads.filter(l => l.status !== "New" && l.status !== "Won" && l.status !== "Lost").length,
    convertedCount: leads.filter(l => l.status === "Won").length
  }

  // Actions
  const handleUpdateStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l))
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null)
    }
  }

  const handleAddNote = (leadId: string, noteText: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, notes: [...l.notes, noteText] } : l))
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, notes: [...prev.notes, noteText] } : null)
    }
  }

  const handleAddLead = (newLeadDetails: {
    name: string
    type: string
    date: string
    value: string
    guests: number
    source: "Website" | "Instagram" | "WhatsApp" | "Walk-in"
    phone: string
  }) => {
    const newLead: Lead = {
      id: "l_" + Date.now(),
      ...newLeadDetails,
      status: "New",
      notes: ["Lead registered on dashboard."],
    }
    setLeads(prev => [newLead, ...prev])
    setSelectedLead(newLead)
  }

  const handleToggleHallStatus = (hallId: string) => {
    const statusCycle: Hall["status"][] = ["Available", "Event in Progress", "In Setup", "Maintenance"]
    setHalls(prev => prev.map(h => {
      if (h.id === hallId) {
        const nextIdx = (statusCycle.indexOf(h.status) + 1) % statusCycle.length
        return { ...h, status: statusCycle[nextIdx] }
      }
      return h
    }))
  }

  const handleTempChange = (hallId: string, newTemp: number) => {
    setHalls(prev => prev.map(h => h.id === hallId ? { ...h, temp: newTemp } : h))
  }

  const handleToggleSlot = (hallId: string, slotKey: "morning" | "afternoon" | "evening") => {
    const slotCycle: ("Available" | "Booked" | "Blocked")[] = ["Available", "Booked", "Blocked"]
    setHalls(prev => prev.map(h => {
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

  const copyTemplateMessage = (type: "visit" | "quote") => {
    if (!selectedLead) return
    const text = type === "visit"
      ? `Dear ${selectedLead.name}, thank you for choosing Royal Palace. We invite you for a site visit this week to explore our spaces. Please let us know your availability.`
      : `Dear ${selectedLead.name}, we have sent your customized proposal for ${selectedLead.type} event. Please check your email or WhatsApp.`
    navigator.clipboard.writeText(text)
    alert("Message template copied to clipboard!")
  }

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto text-[#1D1C17]">
      
      {/* Welcome & Venue Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1D1C17] flex items-center gap-2">
            {greeting}, Kamran Ali
            <span className="text-[10px] font-bold text-[#0F5B3E] tracking-widest uppercase bg-[#E6F0EC] px-2 py-0.5 rounded-full normal-case font-medium">
              Banquet Console
            </span>
          </h1>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-[#0F5B3E]" /> Royal Palace Banquet Hall
          </p>
        </div>
      </div>

      {/* 1. Overview (KPIs) Module */}
      <VenueOwnerOverview
        leadsBreakdown={leadsBreakdown}
        monthlyRevenue={`PKR ${(wonValue / 1000000).toFixed(1)}M`}
        conversionRate={conversionRate}
        upcomingEvents={24}
        occupancyRate={78}
      />

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (8 grid cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 5. Revenue Summary Module */}
          <RevenueSummaryModule
            leads={leads}
            wonValue={wonValue}
          />

          {/* 3. Venue Management Module */}
          <VenueManagementModule
            halls={halls}
            onToggleStatus={handleToggleHallStatus}
            onTempChange={handleTempChange}
            onToggleSlot={handleToggleSlot}
          />

        </div>

        {/* Right column (4 grid cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 6. Quick Actions Module */}
          <QuickActionsModule
            selectedLead={selectedLead}
            onAddLead={handleAddLead}
            copyTemplateMessage={copyTemplateMessage}
          />

          {/* 2. Leads Pipeline (CRM) Module */}
          <LeadsPipelineModule
            leads={leads}
            selectedLead={selectedLead}
            setSelectedLead={setSelectedLead}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onUpdateStatus={handleUpdateStatus}
            onAddNote={handleAddNote}
          />

          {/* 4. Bookings Module */}
          <BookingsModule
            halls={halls}
          />

        </div>

      </div>

    </div>
  )
}
