"use client"

import { Card } from "@/components/ui/card"
import { Search, Plus, Filter, CalendarCheck, MapPin, Users, Calendar, AlertCircle } from "lucide-react"

export default function BookingsPage() {
  const bookings = [
    {
      id: "BK-2026-042",
      client: "Ali & Fatima",
      event: "Wedding Reception",
      date: "Oct 12, 2026",
      venue: "Serena Hotel, Islamabad",
      team: "Zoya, Fahad, Ali",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
      advance: "Received (Rs 425,000)"
    },
    {
      id: "BK-2026-043",
      client: "TechCorp",
      event: "Annual Gala",
      date: "Oct 14, 2026",
      venue: "Marriott Hotel, Karachi",
      team: "Ahmad, Zoya",
      status: "Pending Contract",
      statusColor: "bg-yellow-100 text-yellow-700",
      advance: "Pending"
    },
    {
      id: "BK-2026-044",
      client: "Hassan Family",
      event: "Mehndi & Baraat",
      date: "Oct 20, 2026",
      venue: "PC Hotel, Lahore",
      team: "Not Assigned",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
      advance: "Received (Rs 200,000)"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Bookings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage confirmed events, contracts, and scheduling.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Booking
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">This Month</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">24</h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Confirmed Bookings</p>
          </div>
        </Card>

        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">3</h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Missing Contracts</p>
          </div>
        </Card>

        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between h-[130px]">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">5</h3>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Unassigned Teams</p>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-0 border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all overflow-hidden flex flex-col h-full">
            <div className={`h-2 w-full ${booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${booking.statusColor} dark:bg-opacity-20`}>
                  {booking.status}
                </span>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{booking.id}</span>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{booking.client}</h3>
                <p className="text-sm font-semibold text-[#0A3B2A] dark:text-cyan-400">{booking.event}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{booking.date}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{booking.venue}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <span className={`text-sm font-medium ${booking.team === 'Not Assigned' ? 'text-red-500 font-bold' : 'text-gray-600 dark:text-gray-300'}`}>{booking.team}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Advance</p>
                  <p className={`text-sm font-bold ${booking.advance === 'Pending' ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>{booking.advance}</p>
                </div>
                <button className="px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white rounded-lg text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  Details
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

    </div>
  )
}
