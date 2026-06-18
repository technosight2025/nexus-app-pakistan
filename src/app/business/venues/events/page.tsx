"use client"

import React, { useState, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  Calendar, Clock, MapPin, Users, Sparkles, CheckSquare, 
  Trash2, Plus, ArrowUpRight, Search, Play, CheckCircle, Gift,
  X, Check, AlertCircle, Download, CalendarIcon, Edit3
} from "lucide-react"

// Types
interface Milestone {
  id: number
  time: string
  title: string
  desc: string
  status: "Done" | "Live" | "Pending"
}

function EventsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "upcoming"

  const setTab = (tab: string) => {
    router.push(`/business/venues/events?tab=${tab}`)
  }

  // Toast notifications state
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  // Mock events lists
  const events = [
    { id: "EV-01", title: "Ahmed & Fatima Wedding (Shadi)", date: "May 20, 2025", hall: "Royal Hall", guests: 800, status: "Active Setup", type: "Wedding" },
    { id: "EV-02", title: "Ali & Sara Engagement", date: "May 21, 2025", hall: "Crystal Hall", guests: 300, status: "Confirmed", type: "Engagement" },
    { id: "EV-03", title: "Company Annual Dinner", date: "May 22, 2025", hall: "Garden Lawn", guests: 250, status: "Confirmed", type: "Corporate" },
    { id: "EV-04", title: "Usman Dholki Night", date: "May 23, 2025", hall: "Pearl Hall", guests: 150, status: "Confirmed", type: "Wedding" },
  ]

  const completedEvents = [
    { id: "EV-99", title: "Zainab & Bilal Wedding", date: "May 10, 2025", hall: "Grand Marquee", guests: 900, status: "Archived", type: "Wedding" },
    { id: "EV-98", title: "Hassan Family Walima", date: "May 12, 2025", hall: "Royal Hall", guests: 600, status: "Archived", type: "Wedding" }
  ]

  // Selected event ID for the timeline tab
  const [selectedEventId, setSelectedEventId] = useState("EV-01")

  // Stateful timeline database
  const [timelineData, setTimelineData] = useState<Record<string, Milestone[]>>({
    "EV-01": [
      { id: 1, time: "02:00 PM", title: "Staff Setup & Inventory Audit", desc: "Chef Biryani prep, florist stage layout complete, TV welcome screens initialized.", status: "Done" },
      { id: 2, time: "03:00 PM", title: "Entrance Open & Guest Arrival", desc: "Lobby TVs publish welcome templates, wayfinding staff active, background music live.", status: "Done" },
      { id: 3, time: "03:45 PM", title: "Groom & Baraat Arrival", desc: "VIP guard setup active, flower petals ready at red carpet lobby entrance.", status: "Live" },
      { id: 4, time: "04:15 PM", title: "Nikah Ceremony", desc: "Stage seating alignment checked, wireless microphone volume preset check.", status: "Pending" },
      { id: 5, time: "04:45 PM", title: "Food Service (One-Dish Catering)", desc: "Mutton Pulao, Chicken Qorma, Naan, Gajar Halwa buffet queues active.", status: "Pending" },
      { id: 6, time: "05:45 PM", title: "Rukhsati Departure", desc: "Baraat car parking release, farewell photo highlights loop active on signage screens.", status: "Pending" }
    ],
    "EV-02": [
      { id: 1, time: "03:00 PM", title: "Crystal Hall Entry & Audio check", desc: "Lobby setup active, floral check on engagement stage, slide loops active.", status: "Done" },
      { id: 2, time: "04:00 PM", title: "Guest Arrivals & High Tea Buffet", desc: "Snacks, tea, and drinks available. Photographers taking guest portraits.", status: "Done" },
      { id: 3, time: "05:00 PM", title: "Ring Exchange & Photo Highlights", desc: "Engagement ring exchange on main stage, custom display slideshow.", status: "Live" },
      { id: 4, time: "06:00 PM", title: "Farewell Guest departure", desc: "Digital guestbook checkouts and parking release.", status: "Pending" }
    ],
    "EV-03": [
      { id: 1, time: "05:30 PM", title: "AV Setup & Keynote Projection check", desc: "LED video wall testing, wireless headset volumes, seating plan alignments.", status: "Done" },
      { id: 2, time: "06:30 PM", title: "Registration Desk & Badges", desc: "Check-in systems active, badging printer testing.", status: "Done" },
      { id: 3, time: "07:00 PM", title: "CEO Keynote & Annual Review", desc: "Speeches and review slides active on screens.", status: "Live" },
      { id: 4, time: "08:30 PM", title: "Gala Buffet Dinner", desc: "Mutton Biryani, Kheer, and live BBQ stalls active.", status: "Pending" }
    ]
  })

  // Modal forms state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formTime, setFormTime] = useState("")
  const [formTitle, setFormTitle] = useState("")
  const [formDesc, setFormDesc] = useState("")
  const [formStatus, setFormStatus] = useState<Milestone["status"]>("Pending")

  // Toggle status cycle: Pending -> Live -> Done
  const handleToggleMilestoneStatus = (id: number) => {
    setTimelineData(prev => {
      const currentMilestones = prev[selectedEventId] || []
      const updated = currentMilestones.map(m => {
        if (m.id === id) {
          let nextStatus: Milestone["status"] = "Pending"
          if (m.status === "Pending") nextStatus = "Live"
          else if (m.status === "Live") nextStatus = "Done"
          return { ...m, status: nextStatus }
        }
        return m
      })
      return { ...prev, [selectedEventId]: updated }
    })
  }

  // Delete milestone
  const handleDeleteMilestone = (id: number, title: string) => {
    setTimelineData(prev => {
      const currentMilestones = prev[selectedEventId] || []
      const updated = currentMilestones.filter(m => m.id !== id)
      return { ...prev, [selectedEventId]: updated }
    })
    showToast(`Removed milestone: "${title}"`)
  }

  // Open modal for add
  const handleOpenAddModal = () => {
    setFormTime("")
    setFormTitle("")
    setFormDesc("")
    setFormStatus("Pending")
    setIsModalOpen(true)
  }

  // Submit new milestone
  const handleSubmitMilestone = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) return

    const newMilestone: Milestone = {
      id: Date.now(),
      time: formTime || "TBD",
      title: formTitle,
      desc: formDesc,
      status: formStatus
    }

    setTimelineData(prev => {
      const current = prev[selectedEventId] || []
      return {
        ...prev,
        [selectedEventId]: [...current, newMilestone]
      }
    })

    setIsModalOpen(false)
    showToast(`Successfully added milestone: "${formTitle}"`)
  }

  // Get active milestones list in view
  const currentMilestones = useMemo(() => {
    return timelineData[selectedEventId] || []
  }, [timelineData, selectedEventId])

  // PDF schedule print feedback
  const handlePrintTimeline = () => {
    const activeTitle = events.find(e => e.id === selectedEventId)?.title || "Event"
    showToast(`Exporting timeline schedule PDF for ${activeTitle}...`)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Gift className="w-6 h-6 text-[#0F5B3E]" /> Event Command Center
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Manage live staging, guest limits, vendors, and audio-visual cues for each booked workspace.
          </p>
        </div>
        
        <button 
          onClick={() => {
            if (activeTab === "timeline") {
              handleOpenAddModal()
            } else {
              showToast("Redirecting to event setup calendar scheduler...")
            }
          }}
          className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> {activeTab === "timeline" ? "Add Milestone" : "Schedule Event Setup"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setTab("upcoming")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "upcoming" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Upcoming Events
        </button>
        <button 
          onClick={() => setTab("active")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "active" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Active Setup
        </button>
        <button 
          onClick={() => setTab("completed")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "completed" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Completed / Archived
        </button>
        <button 
          onClick={() => setTab("timeline")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "timeline" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Event Timeline
        </button>
      </div>

      {/* Event Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {activeTab === "upcoming" && events.map((ev) => (
          <Card key={ev.id} className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm flex flex-col justify-between h-[210px] hover:shadow-md transition-shadow relative overflow-hidden group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[9.5px] font-extrabold text-[#0F5B3E] bg-[#E6F0EC] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {ev.type}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">{ev.id}</span>
              </div>

              <h3 className="text-[14.5px] font-black text-gray-900 mt-3">{ev.title}</h3>
              <div className="flex gap-4 text-[11px] text-gray-500 font-semibold mt-2.5">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0F5B3E]" /> {ev.hall}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-gray-400" /> {ev.guests} Guests</span>
              </div>
            </div>

            <div className="pt-3.5 border-t border-gray-100 mt-4 flex justify-between items-center">
              <span className="text-[10.5px] text-gray-400 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" /> {ev.date}
              </span>
              
              <button 
                onClick={() => router.push(`/business/venues?event=${ev.id}`)}
                className="text-[11.5px] font-bold text-[#0F5B3E] hover:text-[#0A3B2A] flex items-center gap-1"
              >
                Enter Event Command Room <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}

        {activeTab === "active" && (
          <Card className="col-span-2 p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-[13px] font-black text-gray-950 uppercase tracking-wider">Ahmed & Fatima Setup (Live Status)</h3>
              </div>
              <span className="text-[11px] font-bold text-gray-400">Target Guests: 800</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-gray-600">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-100">
                <span className="text-[9px] text-gray-400 font-bold block uppercase mb-1">Catering Prep</span>
                <p className="text-gray-900 font-bold">Menu: 1-Dish (Chicken Qorma, Biryani, Naan)</p>
                <span className="text-emerald-600 text-[10px] font-bold mt-1.5 block">Status: Ready (Service at 3:30 PM)</span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-100">
                <span className="text-[9px] text-gray-400 font-bold block uppercase mb-1">Stage & Florist decor</span>
                <p className="text-gray-900 font-bold">Premium Rose & Jasmine layout</p>
                <span className="text-emerald-600 text-[10px] font-bold mt-1.5 block">Status: Setup Complete (95%)</span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-100">
                <span className="text-[9px] text-gray-400 font-bold block uppercase mb-1">Digital Signage OS</span>
                <p className="text-gray-900 font-bold">Active screen loop: Welcome slides</p>
                <span className="text-[#0F5B3E] text-[10px] font-bold mt-1.5 block">Status: Publishing Live</span>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "completed" && completedEvents.map((ev) => (
          <Card key={ev.id} className="p-5 border border-gray-100 bg-[#FAF8F5]/80 rounded-[24px] shadow-sm flex flex-col justify-between h-[210px] relative opacity-85">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[9.5px] font-extrabold text-gray-400 bg-gray-200/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {ev.type}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">{ev.id}</span>
              </div>

              <h3 className="text-[14px] font-black text-gray-700 mt-3">{ev.title}</h3>
              <div className="flex gap-4 text-[11px] text-gray-400 font-semibold mt-2.5">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ev.hall}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ev.guests} Guests</span>
              </div>
            </div>

            <div className="pt-3.5 border-t border-gray-100 mt-4 flex justify-between items-center">
              <span className="text-[10.5px] text-gray-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Completed on {ev.date}
              </span>
              <button 
                onClick={() => showToast("Loading invoice archives...")}
                className="text-[11px] font-bold text-gray-400 hover:text-gray-600"
              >
                View Invoice Archive
              </button>
            </div>
          </Card>
        ))}

        {activeTab === "timeline" && (
          <Card className="col-span-1 md:col-span-2 p-6 border border-gray-100 bg-white rounded-[24px] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Event Milestone Timeline</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Chronological milestones for selected workspace</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Event:</span>
                <select 
                  value={selectedEventId}
                  onChange={(e) => {
                    setSelectedEventId(e.target.value)
                    const title = events.find(ev => ev.id === e.target.value)?.title || "Event"
                    showToast(`Switched timeline view to ${title}`)
                  }}
                  className="pl-2 pr-6 py-1.5 bg-white border border-[#ECE7DF] rounded-xl text-[11px] font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E] cursor-pointer"
                >
                  <option value="EV-01">Ahmed & Fatima Wedding (Shadi)</option>
                  <option value="EV-02">Ali & Sara Engagement</option>
                  <option value="EV-03">Company Annual Dinner</option>
                </select>
              </div>
            </div>

            {/* Timeline Milestones Nodes */}
            {currentMilestones.length > 0 ? (
              <div className="relative border-l border-[#ECE7DF] ml-3.5 pl-6 space-y-6 py-2 text-[12px] font-semibold text-gray-600">
                {currentMilestones.map((m) => {
                  const isDone = m.status === "Done"
                  const isLive = m.status === "Live"
                  
                  return (
                    <div key={m.id} className="relative animate-in fade-in duration-300">
                      
                      {/* Interactive Dot */}
                      <button 
                        onClick={() => handleToggleMilestoneStatus(m.id)}
                        title="Click to cycle status"
                        className={`absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                          isDone 
                            ? "border-[#0F5B3E] text-[#0F5B3E] hover:bg-emerald-55" 
                            : isLive 
                              ? "border-amber-500 text-amber-500 hover:bg-amber-55" 
                              : "border-gray-250 hover:border-gray-400"
                        }`}
                      >
                        {isDone && <span className="w-1.5 h-1.5 rounded-full bg-[#0F5B3E]" />}
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />}
                      </button>

                      <div className="flex justify-between items-start gap-4 hover:bg-gray-50/50 p-2.5 rounded-xl transition-all">
                        <div className="text-left space-y-0.5">
                          <span className={`text-[10px] font-black uppercase block ${
                            isDone ? "text-gray-450 line-through" : isLive ? "text-amber-600" : "text-[#0F5B3E]"
                          }`}>
                            {m.time} • {m.title}
                          </span>
                          <p className={`text-[11px] mt-1 font-semibold leading-relaxed ${isDone ? "text-gray-400 line-through" : "text-gray-900"}`}>
                            {m.desc}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Interactive status badge */}
                          <button 
                            onClick={() => handleToggleMilestoneStatus(m.id)}
                            className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded shrink-0 transition-colors ${
                              isDone ? "bg-[#E6F0EC] text-[#0F5B3E]" :
                              isLive ? "bg-amber-50 text-amber-700 animate-pulse" :
                              "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {m.status}
                          </button>

                          {/* Delete Milestone button */}
                          <button 
                            onClick={() => handleDeleteMilestone(m.id, m.title)}
                            className="p-1 text-gray-300 hover:text-rose-600 rounded transition-colors"
                            title="Delete Milestone"
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
              <div className="py-10 text-center border border-dashed border-[#ECE7DF] rounded-2xl bg-[#FAF8F5]/30">
                <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-bold">No Milestones defined for this event.</p>
                <button onClick={handleOpenAddModal} className="text-xs font-bold text-[#0F5B3E] hover:underline mt-2">Create one now</button>
              </div>
            )}

            {/* Footer metrics and action button triggers */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10.5px] font-bold">
              <span className="text-gray-400">{currentMilestones.length} Milestones Scheduled</span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleOpenAddModal}
                  className="px-3.5 py-1.5 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-gray-650 transition-colors"
                >
                  Add Milestone
                </button>
                <button 
                  onClick={handlePrintTimeline}
                  className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl transition-colors shadow-xs"
                >
                  Print Schedule PDF
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Add Milestone Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1D1C17]/40 backdrop-blur-xs flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <div className="bg-white border border-[#E6E2DA] w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 m-4 text-left">
            <div className="p-4 border-b border-[#E6E2DA] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-serif font-bold text-[#1D1C17] text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F5B3E]" /> Add Venue Milestone
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitMilestone} className="p-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] block">Target Time</label>
                <input 
                  type="text" 
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  placeholder="e.g. 04:30 PM"
                  required
                  className="w-full px-3 py-1.5 font-bold text-gray-700 bg-white border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] block">Milestone Title</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Ring exchange / stage photos"
                  required
                  className="w-full px-3 py-1.5 font-bold text-gray-700 bg-white border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] block">Description / Staff Instructions</label>
                <textarea 
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Enter specific instructions..."
                  rows={3}
                  className="w-full px-3 py-1.5 font-bold text-gray-700 bg-white border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#5E6460] block">Initial Status</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as Milestone["status"])}
                  className="w-full px-3 py-1.5 font-bold text-gray-700 bg-white border border-[#E6E2DA] rounded-lg focus:outline-none focus:border-[#0F5B3E] cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Live">Live</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="pt-2 border-t border-gray-150 flex justify-end gap-2 text-[11px] font-bold">
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

      {/* Interactive Toast Notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-100">{toast}</span>
        </div>
      )}

    </div>
  )
}

export default function VenueEventsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 animate-pulse">Loading Events Room...</span>
      </div>
    }>
      <EventsPageContent />
    </Suspense>
  )
}
