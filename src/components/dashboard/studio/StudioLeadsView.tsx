"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  UserCheck, Search, Filter, Mail, 
  Phone, Calendar, Camera, Video, Plane, 
  MoreVertical, CheckCircle2, AlertCircle, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

type LeadStatus = "New" | "Contacted" | "Meeting Scheduled" | "Quote Sent" | "Booked" | "Lost"
type ServiceType = "Wedding Photography" | "Corporate Video" | "Pre-Wedding Shoot" | "Maternity Shoot"

interface Lead {
  id: string
  clientName: string
  contactNumber: string
  email: string
  eventDates: string
  services: string[]
  budgetExpectation: string
  status: LeadStatus
  dateReceived: string
  source: string
}

const INITIAL_LEADS: Lead[] = [
  {
    id: "LD-001",
    clientName: "Fatima & Bilal",
    contactNumber: "0300-1234567",
    email: "fatima.b@email.com",
    eventDates: "Nov 12 - 14, 2023",
    services: ["Wedding Photography", "Drone"],
    budgetExpectation: "200k - 300k PKR",
    status: "New",
    dateReceived: "Just Now",
    source: "Instagram"
  },
  {
    id: "LD-002",
    clientName: "Omer Tariq (CEO)",
    contactNumber: "0321-9876543",
    email: "omer@techcorp.pk",
    eventDates: "Dec 05, 2023",
    services: ["Corporate Video"],
    budgetExpectation: "150k PKR",
    status: "Meeting Scheduled",
    dateReceived: "2 Hours Ago",
    source: "Nexus App"
  },
  {
    id: "LD-003",
    clientName: "Ayesha Khan",
    contactNumber: "0333-5554443",
    email: "ayesha.k@email.com",
    eventDates: "Oct 28, 2023",
    services: ["Pre-Wedding Shoot"],
    budgetExpectation: "50k PKR",
    status: "Quote Sent",
    dateReceived: "Yesterday",
    source: "Website"
  },
  {
    id: "LD-004",
    clientName: "Ali Raza",
    contactNumber: "0301-1122334",
    email: "ali.raza@email.com",
    eventDates: "Oct 10, 2023",
    services: ["Wedding Photography", "Corporate Video"],
    budgetExpectation: "350k PKR",
    status: "Booked",
    dateReceived: "Last Week",
    source: "Referral"
  }
]

export function StudioLeadsView() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusBadge = (status: LeadStatus) => {
    switch(status) {
      case "New": return <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-rose-100"><AlertCircle className="w-3 h-3" /> New</span>
      case "Contacted": return <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-100"><Clock className="w-3 h-3" /> Contacted</span>
      case "Meeting Scheduled": return <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-indigo-100"><Calendar className="w-3 h-3" /> Meeting</span>
      case "Quote Sent": return <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-100"><Mail className="w-3 h-3" /> Quote Sent</span>
      case "Booked": return <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-100"><CheckCircle2 className="w-3 h-3" /> Booked</span>
      case "Lost": return <span className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200"><MoreVertical className="w-3 h-3" /> Lost</span>
    }
  }

  const getServiceIcon = (service: string) => {
    if (service.includes("Photo")) return <Camera className="w-3 h-3" />
    if (service.includes("Video")) return <Video className="w-3 h-3" />
    if (service.includes("Drone")) return <Plane className="w-3 h-3" />
    return <Camera className="w-3 h-3" />
  }

  const filteredLeads = leads.filter(l => 
    l.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.services.join(" ").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const newLeadsCount = leads.filter(l => l.status === "New").length

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <UserCheck className="w-8 h-8 text-rose-400" /> Lead Management
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Track incoming inquiries, schedule client meetings, and convert prospects into booked projects.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-center">
            <div className="text-xl font-black text-white">{newLeadsCount}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unread Leads</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads by name or service..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
          />
        </div>
        <Button variant="outline" className="bg-white rounded-xl shadow-sm font-bold text-slate-700">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 border-b border-slate-100">Prospect / Contact</th>
                <th className="px-6 py-4 border-b border-slate-100">Requested Event Details</th>
                <th className="px-6 py-4 border-b border-slate-100">Status & Pipeline</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                  
                  {/* Prospect Col */}
                  <td className="px-6 py-4">
                    <div className="font-black text-slate-900 text-base mb-1 group-hover:text-primary transition-colors cursor-pointer">
                      {lead.clientName}
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer transition-colors"><Phone className="w-3 h-3" /> {lead.contactNumber}</span>
                      <span className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer transition-colors"><Mail className="w-3 h-3" /> {lead.email}</span>
                    </div>
                  </td>
                  
                  {/* Details Col */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700 mb-2">
                      <Calendar className="w-4 h-4 text-slate-400" /> {lead.eventDates}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {lead.services.map(s => (
                        <span key={s} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                          {getServiceIcon(s)} {s}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Budget: <span className="text-slate-700">{lead.budgetExpectation}</span>
                    </div>
                  </td>
                  
                  {/* Status Col */}
                  <td className="px-6 py-4">
                    <div className="mb-2">
                      {getStatusBadge(lead.status)}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Received: {lead.dateReceived} • via {lead.source}
                    </div>
                  </td>
                  
                  {/* Actions Col */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="bg-white rounded-lg text-xs font-bold shadow-sm">
                        Schedule Meeting
                      </Button>
                      <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold shadow-sm">
                        Send Quote
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No leads match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
