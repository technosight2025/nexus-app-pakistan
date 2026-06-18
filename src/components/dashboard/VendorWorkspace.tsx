"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, Wallet, Inbox, CheckCircle2, TrendingUp, Users, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"

// Mock Data for a Vendor (e.g., The Royal Palm Venue)
const MOCK_METRICS = {
  revenue: "PKR 4.5M",
  activeLeads: 12,
  upcomingEvents: 8,
  conversionRate: "68%"
}

const MOCK_LEADS = [
  { id: 1, name: "Sarah & Ahmed's Mehndi", date: "Oct 15, 2026", guests: 500, value: "PKR 1.2M", status: "New Request", timeAgo: "2 hours ago" },
  { id: 2, name: "TechCorp Annual Gala", date: "Nov 02, 2026", guests: 800, value: "PKR 2.8M", status: "Negotiating", timeAgo: "1 day ago" },
  { id: 3, name: "Zara's Barat", date: "Dec 12, 2026", guests: 300, value: "PKR 850k", status: "New Request", timeAgo: "3 days ago" },
]

const MOCK_CALENDAR = [
  { date: "Oct 15", event: "Sarah & Ahmed's Mehndi", type: "Booked", color: "bg-emerald-100 text-emerald-700" },
  { date: "Oct 18", event: "Ali's Valima", type: "Booked", color: "bg-emerald-100 text-emerald-700" },
  { date: "Oct 22", event: "Pending: Usman Barat", type: "Hold", color: "bg-orange-100 text-orange-700" },
]

const TABS = ["Incoming Leads", "Availability Calendar", "Earnings"]

export function VendorWorkspace() {
  const [activeTab, setActiveTab] = useState("Incoming Leads")

  const renderLeads = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold">Incoming Quote Requests</h3>
        <span className="text-sm font-bold text-muted-foreground bg-white px-3 py-1 rounded-full shadow-sm border border-outline">
          {MOCK_LEADS.length} Active Leads
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LEADS.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl p-6 border border-outline shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-1 ${lead.status === 'New Request' ? 'bg-blue-500' : 'bg-orange-400'}`} />
            
            <div className="flex justify-between items-start mb-4">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${lead.status === 'New Request' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                {lead.status}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> {lead.timeAgo}</span>
            </div>

            <h4 className="font-black text-lg mb-1 group-hover:text-primary transition-colors">{lead.name}</h4>
            
            <div className="space-y-2 mb-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-slate-400" /> {lead.date}</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> {lead.guests} Guests</div>
              <div className="flex items-center gap-2"><Wallet className="w-4 h-4 text-slate-400" /> Est. Value: <span className="font-bold text-foreground">{lead.value}</span></div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm">
                Accept
              </button>
              <Link href="/messages" className="flex-1">
                <button className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Chat
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="bg-white rounded-xl border border-outline shadow-sm overflow-hidden p-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold mb-6">Upcoming Bookings (October 2026)</h3>
      <div className="space-y-4">
        {MOCK_CALENDAR.map((cal, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-outline transition-all bg-slate-50/50">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center min-w-[80px] shadow-sm">
              <span className="block text-xs font-bold text-muted-foreground uppercase">Oct</span>
              <span className="block text-2xl font-black text-foreground">{cal.date.split(' ')[1]}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">{cal.event}</h4>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${cal.color}`}>
                {cal.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEarnings = () => (
    <div className="bg-white rounded-xl border border-outline shadow-sm overflow-hidden p-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-bold mb-6">Revenue Overview</h3>
      <div className="h-64 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
        {/* Mock Chart visually */}
        <div className="absolute bottom-0 left-0 w-full flex items-end gap-2 px-6 pb-6 h-48 opacity-60">
          <div className="w-1/6 bg-blue-200 rounded-t-sm h-[30%]"></div>
          <div className="w-1/6 bg-blue-300 rounded-t-sm h-[50%]"></div>
          <div className="w-1/6 bg-blue-400 rounded-t-sm h-[40%]"></div>
          <div className="w-1/6 bg-blue-500 rounded-t-sm h-[80%]"></div>
          <div className="w-1/6 bg-blue-600 rounded-t-sm h-[60%]"></div>
          <div className="w-1/6 bg-primary rounded-t-sm h-[100%]"></div>
        </div>
        <div className="relative z-10 text-center bg-white/80 backdrop-blur px-6 py-4 rounded-2xl shadow-sm border border-white">
          <p className="text-sm font-bold text-muted-foreground mb-1">Total Earnings (YTD)</p>
          <p className="text-4xl font-black text-foreground">PKR 14.5M</p>
          <p className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4"/> +24% vs last year
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100 pb-24 font-sans">
      
      {/* B2B Professional Header */}
      <div className="bg-[#0f172a] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b-4 border-blue-500">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-md text-xs font-bold mb-4 border border-blue-500/30 uppercase tracking-widest">
                Nexus Partner Portal
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4">
                The Royal Palm <CheckCircle2 className="w-8 h-8 text-blue-400 fill-blue-400/20" />
              </h1>
            </div>
            <button className="hidden md:block bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Edit Profile
            </button>
          </div>
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-slate-400 mb-2"><Wallet className="w-4 h-4"/> <span className="text-xs font-bold uppercase">Revenue (MTD)</span></div>
              <div className="text-2xl font-black">{MOCK_METRICS.revenue}</div>
            </div>
            <div className="bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-blue-300 mb-2"><Inbox className="w-4 h-4"/> <span className="text-xs font-bold uppercase">Active Leads</span></div>
              <div className="text-2xl font-black text-blue-100">{MOCK_METRICS.activeLeads}</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-slate-400 mb-2"><CalendarDays className="w-4 h-4"/> <span className="text-xs font-bold uppercase">Upcoming Events</span></div>
              <div className="text-2xl font-black">{MOCK_METRICS.upcomingEvents}</div>
            </div>
            <div className="bg-emerald-900/30 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-emerald-400 mb-2"><TrendingUp className="w-4 h-4"/> <span className="text-xs font-bold uppercase">Conversion</span></div>
              <div className="text-2xl font-black text-emerald-100">{MOCK_METRICS.conversionRate}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Sticky Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md border border-outline p-2 inline-flex flex-wrap gap-2 mb-8 w-full md:w-auto overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="min-h-[500px]">
          {activeTab === "Incoming Leads" && renderLeads()}
          {activeTab === "Availability Calendar" && renderCalendar()}
          {activeTab === "Earnings" && renderEarnings()}
        </div>
      </div>
    </div>
  )
}
