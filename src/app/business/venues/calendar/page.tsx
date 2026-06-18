"use client"

import React, { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Plus, X, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function VenueCalendarPage() {
  // Calendar dates state (default to May 2025 to match dashboard overview)
  const [currentMonth, setCurrentMonth] = useState("May 2025")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedHallFilter, setSelectedHallFilter] = useState("All Halls")

  // New booking form states
  const [clientName, setClientName] = useState("")
  const [selectedHall, setSelectedHall] = useState("Grand Marquee")
  const [eventType, setEventType] = useState("Wedding (Shadi)")
  const [eventDate, setEventDate] = useState("2025-05-20")
  const [guestCount, setGuestCount] = useState("500")

  // Mock Bookings list
  const [bookings, setBookings] = useState([
    { id: 1, title: "Ahmed & Fatima Wedding", day: 20, hall: "Grand Marquee", type: "Full Day", color: "bg-[#0F5B3E]", textColor: "text-white" },
    { id: 2, title: "Ali & Sara Engagement", day: 21, hall: "Crystal Hall", type: "Evening", color: "bg-blue-500", textColor: "text-white" },
    { id: 3, title: "Corporate Seminar B", day: 15, hall: "Pearl Hall", type: "Morning", color: "bg-purple-500", textColor: "text-white" },
    { id: 4, title: "Usman Dholki Night", day: 23, hall: "Pearl Hall", type: "Evening", color: "bg-amber-500", textColor: "text-white" },
    { id: 5, title: "Hassan Family Walima", day: 30, hall: "Grand Marquee", type: "Evening", color: "bg-[#0F5B3E]", textColor: "text-white" },
  ])

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const prevMonthDays = Array.from({ length: 4 }, (_, i) => 27 + i) // Offset for grid structure

  const getBookingsForDay = (day: number) => {
    return bookings.filter(b => b.day === day && (selectedHallFilter === "All Halls" || b.hall === selectedHallFilter))
  }

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName) return

    const dayNumber = parseInt(eventDate.split("-")[2]) || 12
    const newB = {
      id: Date.now(),
      title: `${clientName} ${eventType.split(" ")[0]}`,
      day: dayNumber,
      hall: selectedHall,
      type: "Evening",
      color: selectedHall === "Grand Marquee" ? "bg-[#0F5B3E]" : "bg-blue-500",
      textColor: "text-white"
    }

    setBookings(prev => [...prev, newB])
    setClientName("")
    setShowBookingModal(false)
  }

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-[calc(100vh-10rem)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#0F5B3E]" /> Venue Booking Calendar
          </h1>
          <p className="text-gray-500 text-[12.5px] font-semibold mt-1">
            Real-time schedule lookup for halls, capacity, and prevention of double bookings.
          </p>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Hall Filter dropdown selector */}
          <div className="relative">
            <select 
              value={selectedHallFilter}
              onChange={(e) => setSelectedHallFilter(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 bg-white border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 focus:outline-none"
            >
              <option value="All Halls">All Halls</option>
              <option value="Grand Marquee">Grand Marquee</option>
              <option value="Crystal Hall">Crystal Hall</option>
              <option value="Pearl Hall">Pearl Hall</option>
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button 
            onClick={() => setShowBookingModal(true)}
            className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[12px] transition-all flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Book Venue Shift
          </button>
        </div>
      </div>

      {/* Main Calendar Body Grid wrapper */}
      <div className="flex-1 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col overflow-hidden">
        {/* Calendar control bar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <h2 className="text-[14.5px] font-black text-gray-900">{currentMonth}</h2>
            <div className="flex items-center gap-0.5">
              <button 
                onClick={() => setCurrentMonth(currentMonth === "May 2025" ? "April 2025" : "May 2025")}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-4.5 h-4.5 text-gray-600" />
              </button>
              <button 
                onClick={() => setCurrentMonth(currentMonth === "May 2025" ? "June 2025" : "May 2025")}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-4.5 h-4.5 text-gray-600" />
              </button>
            </div>
            <button 
              onClick={() => {
                setCurrentMonth("May 2025")
                setSelectedDay(20)
              }}
              className="px-2.5 py-1 bg-white border border-[#ECE7DF] hover:bg-gray-50 rounded-lg text-[10px] font-bold text-gray-600 transition-colors ml-2"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-1 bg-gray-100/80 p-0.5 rounded-lg border border-[#ECE7DF]/50">
            <button className="px-3 py-1 bg-white shadow-xs rounded-md text-[11px] font-bold text-gray-900">Month</button>
            <button className="px-3 py-1 text-gray-500 hover:text-gray-900 rounded-md text-[11px] font-bold transition-colors">Week</button>
          </div>
        </div>

        {/* Calendar days labels */}
        <div className="grid grid-cols-7 border-b border-gray-100 bg-[#FAF8F5]/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-[9.5px] font-extrabold uppercase text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Date Boxes Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-gray-100 gap-px">
          {/* Sep offset dates */}
          {prevMonthDays.map(day => (
            <div key={`prev-${day}`} className="bg-white/40 p-2 min-h-[90px] text-left select-none opacity-40">
              <span className="text-[11px] font-bold text-gray-300">{day}</span>
            </div>
          ))}

          {/* Current Month dates mapping */}
          {daysInMonth.map(day => {
            const dayBookings = getBookingsForDay(day)
            const isToday = day === 20 && currentMonth === "May 2025"
            return (
              <div 
                key={`curr-${day}`} 
                onClick={() => {
                  setSelectedDay(day)
                  setEventDate(`2025-05-${day.toString().padStart(2, "0")}`)
                }}
                className={`bg-white p-2 min-h-[90px] hover:bg-gray-50/50 transition-all group cursor-pointer relative text-left border-transparent ${
                  selectedDay === day ? "ring-1.5 ring-inset ring-[#0F5B3E]" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[11px] font-black ${
                    isToday 
                      ? 'w-5.5 h-5.5 bg-[#0F5B3E] text-white rounded-full flex items-center justify-center' 
                      : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  
                  {/* Plus trigger overlay */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedDay(day)
                      setEventDate(`2025-05-${day.toString().padStart(2, "0")}`)
                      setShowBookingModal(true)
                    }}
                    className="w-5 h-5 bg-emerald-50 text-[#0F5B3E] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="mt-2 space-y-1 overflow-y-auto max-h-[60px] no-scrollbar">
                  {dayBookings.map(b => (
                    <div 
                      key={b.id} 
                      className={`${b.color} ${b.textColor} text-[8.5px] font-bold px-1.5 py-0.5 rounded-[4px] truncate`}
                      title={`${b.title} (${b.hall})`}
                    >
                      {b.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* NEW BOOKING MODAL FORM */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-300">
          <Card className="w-full max-w-md bg-white border border-[#ECE7DF] rounded-[24px] p-5 shadow-xl relative animate-in zoom-in-95 duration-200 text-left">
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-wider mb-4">
              Book Venue Shift
            </h3>

            <form onSubmit={handleAddBooking} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Client Name / Event Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Usman & Ayesha Wedding"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-semibold focus:outline-none focus:border-[#0F5B3E]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Select Hall</label>
                  <select 
                    value={selectedHall}
                    onChange={(e) => setSelectedHall(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E] bg-white"
                  >
                    <option value="Grand Marquee">Grand Marquee</option>
                    <option value="Crystal Hall">Crystal Hall</option>
                    <option value="Pearl Hall">Pearl Hall</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Event Type</label>
                  <select 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 focus:outline-none focus:border-[#0F5B3E] bg-white"
                  >
                    <option value="Wedding (Shadi)">Wedding (Shadi)</option>
                    <option value="Mehndi">Mehndi</option>
                    <option value="Valima">Valima</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Birthday Party">Birthday Party</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Event Date</label>
                  <input 
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 focus:outline-none bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Est. Guests</label>
                  <input 
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-700 focus:outline-none bg-white"
                  />
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-xl flex items-start gap-2 border border-[#ECE7DF]/50">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                  Shift checks active: This will automatically check for other bookings on the selected hall and date to prevent double bookings.
                </p>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-100 mt-4">
                <button 
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[11px] font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white font-bold rounded-xl text-[11px] shadow-sm"
                >
                  Confirm Booking Shift
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  )
}
