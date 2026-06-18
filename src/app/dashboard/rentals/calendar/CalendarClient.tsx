"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, Search } from 'lucide-react'

export default function CalendarClient() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/rentals/bookings")
      const data = await res.json()
      if (data && !data.error) {
        setBookings(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))

  // Calendar Math
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const getBookingsForDay = (day: number) => {
    const targetDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookings.filter(b => {
      // Just check if the rental starts or ends on this day for MVP (or simply starts)
      return b.start_date === targetDateStr && b.status !== "rejected"
    }).filter(b => b.customer_name.toLowerCase().includes(search.toLowerCase()) || b.rental_outfits?.name?.toLowerCase().includes(search.toLowerCase()))
  }

  if (loading) return <div className="min-h-screen bg-[#FAF8F5] p-6 lg:p-10 flex items-center justify-center"><p>Loading calendar...</p></div>

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6 lg:p-10 text-[#1A1A1A] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0A3B2A] tracking-tight">Booking Calendar</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your wardrobe availability and upcoming pickups.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0A3B2A] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#06291d] transition-all">
            <CalendarIcon className="w-4 h-4" /> Sync
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button onClick={nextMonth} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 auto-rows-[120px]">
          {emptyDays.map(d => (
            <div key={`empty-${d}`} className="border-r border-b border-slate-100 bg-slate-50/50" />
          ))}
          
          {days.map(day => {
            const dayBookings = getBookingsForDay(day)
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()
            
            return (
              <div key={day} className={`p-2 border-r border-b border-slate-100 relative group transition-colors ${isToday ? 'bg-emerald-50/30' : 'hover:bg-slate-50'}`}>
                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-[#0A3B2A] text-white' : 'text-slate-500'}`}>
                  {day}
                </span>
                
                <div className="space-y-1 max-h-[80px] overflow-y-auto hide-scrollbar">
                  {dayBookings.map(b => (
                    <motion.div 
                      key={b.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`px-2 py-1.5 rounded-md text-[10px] font-bold truncate cursor-pointer ${
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                      title={`${b.rental_outfits?.name} - ${b.customer_name}`}
                    >
                      {b.customer_name.split(' ')[0]} - {b.rental_outfits?.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
