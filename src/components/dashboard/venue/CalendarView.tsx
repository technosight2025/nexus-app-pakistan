"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon, 
  MapPin, Clock, Users, Mail, Phone, CalendarDays, CloudSun
} from "lucide-react"
import { Button } from "@/components/ui/button"

// --- Mock Types & Data ---
type EventStatus = "Confirmed" | "Pending Payment" | "Tentative" | "Cancelled"

interface CalendarEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  time: string // HH:MM - HH:MM
  status: EventStatus
  space: string
  customerName: string
  guests: number
  phone: string
  email: string
}

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "BKG-101", title: "Zara & Ali's Mehndi", date: "2026-06-12", time: "18:00 - 23:00", status: "Confirmed", space: "Grand Ballroom", customerName: "Zara Khan", guests: 200, phone: "+92 300 1234567", email: "zara@example.com" },
  { id: "BKG-102", title: "Corporate Gala", date: "2026-06-15", time: "19:00 - 23:59", status: "Pending Payment", space: "Royal Marquee", customerName: "TechCorp Inc.", guests: 500, phone: "+92 321 7654321", email: "events@techcorp.com" },
  { id: "BKG-103", title: "Usman's Valima", date: "2026-06-18", time: "20:00 - 23:30", status: "Confirmed", space: "Garden Pavilion", customerName: "Usman Tariq", guests: 150, phone: "+92 333 9876543", email: "usman@example.com" },
  { id: "BKG-104", title: "Birthday Bash", date: "2026-06-25", time: "16:00 - 20:00", status: "Tentative", space: "Grand Ballroom", customerName: "Ayesha Ahmed", guests: 50, phone: "+92 301 1122334", email: "ayesha@example.com" },
  { id: "BKG-105", title: "Annual Dinner", date: "2026-07-05", time: "18:30 - 22:30", status: "Confirmed", space: "Royal Marquee", customerName: "Nexus Group", guests: 300, phone: "+92 345 5566778", email: "nexus@example.com" },
]

export function CalendarView() {
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 12)) // Default
  const [viewType, setViewType] = useState<"week" | "month" | "year">("month")
  
  // Time State
  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // UI State
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false)

  // Data State
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS)
  
  // New Event Form State
  const [newEventData, setNewEventData] = useState<Partial<CalendarEvent>>({
    customerName: "", phone: "", email: "", date: "", time: "18:00 - 23:00", 
    space: "Grand Ballroom", guests: 100, status: "Tentative", title: "New Event"
  })
  
  // Helpers
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() // 0-11
  
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay() // 0 = Sunday
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Navigation Logic
  const nextDate = () => {
    if (viewType === "month") setCurrentDate(new Date(year, month + 1, 1))
    if (viewType === "year") setCurrentDate(new Date(year + 1, month, 1))
    if (viewType === "week") setCurrentDate(new Date(year, month, currentDate.getDate() + 7))
  }
  
  const prevDate = () => {
    if (viewType === "month") setCurrentDate(new Date(year, month - 1, 1))
    if (viewType === "year") setCurrentDate(new Date(year - 1, month, 1))
    if (viewType === "week") setCurrentDate(new Date(year, month, currentDate.getDate() - 7))
  }
  
  const goToday = () => setCurrentDate(new Date())

  // Customer Autocomplete Logic
  const existingCustomers = Array.from(new Map(events.map(b => [b.customerName, { name: b.customerName, phone: b.phone, email: b.email }])).values())
  const filteredCustomers = existingCustomers.filter(c => c.name.toLowerCase().includes((newEventData.customerName || "").toLowerCase()))

  const handleCreateEvent = () => {
    const newEvt: CalendarEvent = {
      id: `BKG-10${events.length + 1}`,
      ...(newEventData as any)
    }
    setEvents([...events, newEvt])
    setIsNewEventModalOpen(false)
    // reset
    setNewEventData({
      customerName: "", phone: "", email: "", date: "", time: "18:00 - 23:00", 
      space: "Grand Ballroom", guests: 100, status: "Tentative", title: "New Event"
    })
  }

  const getEventsForDate = (y: number, m: number, d: number) => {
    const dateStr = `${y}-${(m + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "Confirmed": return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Pending Payment": return "bg-amber-100 text-amber-700 border-amber-200"
      case "Tentative": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const renderMonthView = () => {
    const blanks = Array(firstDayOfMonth).fill(null)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const totalSlots = [...blanks, ...days]
    while (totalSlots.length % 7 !== 0) totalSlots.push(null)

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest border-r border-slate-200 last:border-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 bg-slate-100 gap-px">
          {totalSlots.map((day, idx) => {
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
            const dayEvents = day ? getEventsForDate(year, month, day) : []
            
            return (
              <div key={idx} className={`min-h-[120px] bg-white p-2 transition-colors ${day ? "hover:bg-slate-50" : "opacity-50 bg-slate-50"}`}>
                {day && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${isToday ? "bg-primary text-white" : "text-slate-700"}`}>
                        {day}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1.5 overflow-y-auto hide-scrollbar">
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`px-2 py-1.5 rounded-md border text-[10px] sm:text-xs font-bold truncate cursor-pointer hover:shadow-sm transition-all ${getStatusColor(event.status)}`}
                        >
                          <div className="truncate">{event.title}</div>
                          <div className="font-medium opacity-80 text-[9px] truncate">{event.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderYearView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {monthNames.map((mName, mIdx) => {
          const eventsInMonth = events.filter(e => {
            const eDate = new Date(e.date)
            return eDate.getFullYear() === year && eDate.getMonth() === mIdx
          })
          
          return (
            <div 
              key={mName} 
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => {
                setCurrentDate(new Date(year, mIdx, 1))
                setViewType("month")
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-slate-900 group-hover:text-primary transition-colors">{mName}</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{eventsInMonth.length} Events</span>
              </div>
              <div className="space-y-2">
                {eventsInMonth.slice(0, 3).map(e => (
                  <div key={e.id} className="text-xs flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${e.status === 'Confirmed' ? 'bg-emerald-500' : e.status === 'Pending Payment' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <span className="truncate font-medium text-slate-600">{e.title}</span>
                  </div>
                ))}
                {eventsInMonth.length === 0 && <p className="text-xs text-slate-400 italic">No events</p>}
                {eventsInMonth.length > 3 && <p className="text-xs text-slate-400 font-bold mt-2">+{eventsInMonth.length - 3} more</p>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    // Determine the start of the week (Sunday)
    const currentDayOfWeek = currentDate.getDay() // 0 = Sun
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDayOfWeek)
    
    const weekDays = Array.from({length: 7}, (_, i) => {
      const d = new Date(startOfWeek)
      d.setDate(startOfWeek.getDate() + i)
      return d
    })

    const hours = Array.from({length: 16}, (_, i) => i + 8) // 8 AM to 11 PM (23:00)

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-auto max-h-[70vh]">
        <div className="min-w-[1000px] flex flex-col">
          {/* Times Header (X Axis) */}
          <div className="flex border-b border-slate-200 bg-slate-50 sticky top-0 z-40 shadow-sm">
            <div className="w-28 shrink-0 p-3 border-r border-slate-200 bg-slate-100 flex items-center justify-center sticky left-0 z-50 shadow-[1px_0_0_0_#e2e8f0]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date / Time</span>
            </div>
            <div className="flex-1 grid bg-slate-50" style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}>
              {hours.map(hour => (
                <div key={hour} className="p-3 text-center border-r border-slate-200 last:border-0">
                  <span className="text-[10px] font-bold text-slate-400">{hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Days Rows (Y Axis) */}
          <div className="bg-slate-50">
            {weekDays.map(date => {
              const isToday = date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
              const dEvents = getEventsForDate(date.getFullYear(), date.getMonth(), date.getDate())

              return (
                <div key={date.toISOString()} className="flex border-b border-slate-200 bg-white last:border-0 relative min-h-[90px]">
                  {/* Day Label (Sticky horizontally) */}
                  <div className="w-28 shrink-0 p-3 border-r border-slate-200 bg-slate-50 flex flex-col justify-center items-center z-30 sticky left-0 shadow-[1px_0_0_0_#e2e8f0]">
                    <p className={`text-xs font-bold uppercase tracking-widest ${isToday ? "text-primary" : "text-slate-500"}`}>{dayNames[date.getDay()]}</p>
                    <p className={`text-xl font-black mt-1 ${isToday ? "text-primary" : "text-slate-900"}`}>{date.getDate()}</p>
                  </div>

                  {/* Hourly Cells for this Day */}
                  <div className="flex-1 grid relative" style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0, 1fr))` }}>
                    {/* Background Grid Lines */}
                    {hours.map(hour => (
                      <div key={hour} className="border-r border-slate-100 last:border-0 h-full" />
                    ))}
                    
                    {/* Events rendered absolutely within the row */}
                    {dEvents.map(event => {
                      const [start, end] = event.time.split(' - ')
                      const startHour = parseInt(start.split(':')[0])
                      const endHour = parseInt(end.split(':')[0])
                      
                      // Calculate position and width
                      if (endHour <= 8 || startHour >= 24) return null; // Outside visual bounds
                      
                      const effectiveStart = Math.max(8, startHour)
                      const effectiveEnd = Math.min(24, endHour)
                      const duration = effectiveEnd - effectiveStart
                      
                      const leftPercent = ((effectiveStart - 8) / hours.length) * 100
                      const widthPercent = (duration / hours.length) * 100

                      return (
                        <div 
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`absolute top-2 bottom-2 rounded-xl border p-2 cursor-pointer hover:shadow-md transition-all shadow-sm z-20 overflow-hidden flex flex-col justify-center ${getStatusColor(event.status)}`}
                          style={{ 
                            left: `calc(${leftPercent}% + 4px)`, 
                            width: `calc(${widthPercent}% - 8px)`
                          }}
                        >
                          <div className="text-xs font-bold leading-tight truncate">{event.title}</div>
                          {duration >= 2 && <div className="font-medium opacity-80 text-[10px] mt-0.5 truncate">{event.time} • {event.space}</div>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-8 h-8 text-primary" /> Calendar
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track all your scheduled events.</p>
        </div>

        {/* Weather & Time Widget */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-100">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs font-bold text-slate-900">{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-[10px] text-slate-500">{currentTime.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-xs font-bold text-slate-900">28°C, Sunny</p>
              <p className="text-[10px] text-slate-500">Lahore, PK</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          
          {/* View Toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            <Button variant="ghost" size="sm" onClick={() => setViewType("week")} className={`h-8 px-3 text-xs font-bold ${viewType === "week" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500"}`}>Week</Button>
            <Button variant="ghost" size="sm" onClick={() => setViewType("month")} className={`h-8 px-3 text-xs font-bold ${viewType === "month" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500"}`}>Month</Button>
            <Button variant="ghost" size="sm" onClick={() => setViewType("year")} className={`h-8 px-3 text-xs font-bold ${viewType === "year" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-500"}`}>Year</Button>
          </div>

          <Button variant="outline" className="font-bold bg-white" onClick={goToday}>Today</Button>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-slate-100" onClick={prevDate}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="w-32 text-center font-bold text-sm text-slate-900">
              {viewType === "year" ? year : `${monthNames[month]} ${year}`}
            </span>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md hover:bg-slate-100" onClick={nextDate}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button className="font-bold w-full md:w-auto px-6" onClick={() => setIsNewEventModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Event
          </Button>
        </div>
      </div>

      {viewType === "month" && renderMonthView()}
      {viewType === "year" && renderYearView()}
      {viewType === "week" && renderWeekView()}

      {/* MODALS */}

      {/* Event Details Slide-out Panel */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" />
            <motion.div 
              initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col border-l border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{selectedEvent.id}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)} className="rounded-full bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Schedule & Venue</h3>
                  <div className="space-y-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><CalendarDays className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-slate-900">Date</p>
                        <p>{new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><Clock className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-slate-900">Time</p>
                        <p>{selectedEvent.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><MapPin className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-slate-900">Venue Space</p>
                        <p>{selectedEvent.space}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><Users className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-slate-900">Expected Guests</p>
                        <p>{selectedEvent.guests} Pax</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Client Contact</h3>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-black text-slate-900 mb-3">{selectedEvent.customerName}</p>
                    <div className="space-y-2">
                      <a href={`tel:${selectedEvent.phone}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"><Phone className="w-3.5 h-3.5" /> {selectedEvent.phone}</a>
                      <a href={`mailto:${selectedEvent.email}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors"><Mail className="w-3.5 h-3.5" /> {selectedEvent.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
                <Button variant="outline" className="flex-1 font-bold bg-white border-slate-200 text-slate-600">Edit Event</Button>
                <Button className="flex-1 font-bold">View Full Booking</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New Event Creation Modal */}
      <AnimatePresence>
        {isNewEventModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]" onClick={() => setIsNewEventModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-xl font-black text-slate-900">New Event</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsNewEventModalOpen(false)} className="rounded-full bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Event Title</label>
                    <input type="text" value={newEventData.title} onChange={e => setNewEventData({...newEventData, title: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Client Details</h3>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Customer Name</label>
                    <input 
                      type="text" 
                      value={newEventData.customerName} 
                      onChange={e => {
                        setNewEventData({...newEventData, customerName: e.target.value})
                        setIsCustomerDropdownOpen(true)
                      }}
                      onFocus={() => setIsCustomerDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setIsCustomerDropdownOpen(false), 200)}
                      placeholder="Search or enter new..."
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" 
                    />
                    
                    <AnimatePresence>
                      {isCustomerDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 shadow-xl rounded-xl z-50 max-h-48 overflow-y-auto"
                        >
                          {filteredCustomers.length > 0 ? (
                            <>
                              {filteredCustomers.map(c => (
                                <div 
                                  key={c.name}
                                  className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                                  onClick={() => {
                                    setNewEventData({...newEventData, customerName: c.name, phone: c.phone, email: c.email})
                                    setIsCustomerDropdownOpen(false)
                                  }}
                                >
                                  <div className="font-bold text-sm text-slate-900">{c.name}</div>
                                  <div className="text-xs text-slate-500">{c.phone} • {c.email}</div>
                                </div>
                              ))}
                              {!filteredCustomers.some(c => c.name.toLowerCase() === (newEventData.customerName || "").toLowerCase()) && (newEventData.customerName || "").trim() !== "" && (
                                <div 
                                  className="p-3 hover:bg-slate-50 cursor-pointer text-primary font-bold text-sm flex items-center gap-2 border-t border-slate-100 bg-primary/5"
                                  onClick={() => setIsCustomerDropdownOpen(false)}
                                >
                                  <Plus className="w-4 h-4" /> Add "{newEventData.customerName}" as new customer
                                </div>
                              )}
                            </>
                          ) : (
                            (newEventData.customerName || "").trim() !== "" ? (
                              <div 
                                className="p-3 hover:bg-slate-50 cursor-pointer text-primary font-bold text-sm flex items-center gap-2"
                                onClick={() => setIsCustomerDropdownOpen(false)}
                              >
                                <Plus className="w-4 h-4" /> Add "{newEventData.customerName}" as new customer
                              </div>
                            ) : (
                              <div className="p-4 text-center text-sm text-slate-500">Type to search or add new</div>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                    <input type="text" value={newEventData.phone} onChange={e => setNewEventData({...newEventData, phone: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input type="email" value={newEventData.email} onChange={e => setNewEventData({...newEventData, email: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Event Details</h3>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Date</label>
                    <input type="date" value={newEventData.date} onChange={e => setNewEventData({...newEventData, date: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Time</label>
                    <input type="text" value={newEventData.time} onChange={e => setNewEventData({...newEventData, time: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Venue Space</label>
                    <select value={newEventData.space} onChange={e => setNewEventData({...newEventData, space: e.target.value})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium">
                      <option>Grand Ballroom</option>
                      <option>Royal Marquee</option>
                      <option>Garden Pavilion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Expected Guests</label>
                    <input type="number" value={newEventData.guests} onChange={e => setNewEventData({...newEventData, guests: Number(e.target.value)})} className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                  </div>
                </div>

              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <Button variant="ghost" className="font-bold text-sm" onClick={() => setIsNewEventModalOpen(false)}>Cancel</Button>
                <Button className="font-bold text-sm bg-primary text-white hover:bg-primary/90" onClick={handleCreateEvent}>
                  <Plus className="w-4 h-4 mr-2" /> Add Event
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
