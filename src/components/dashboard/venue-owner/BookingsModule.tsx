"use client"

import { motion } from "framer-motion"
import { CalendarCheck, Phone, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Hall } from "./VenueManagementModule"

interface BookingsModuleProps {
  halls: Hall[]
}

export default function BookingsModule({ halls }: BookingsModuleProps) {
  // Extract mock upcoming events based on bookings
  const mockEvents = [
    {
      id: "ev1",
      title: "Kamran & Sara Valima",
      hall: "Grand Ballroom",
      guests: 500,
      time: "01:00 PM to 05:00 PM",
      status: "Happening Now",
      statusColor: "bg-emerald-100 text-emerald-600",
      phone: "+92 300 1234567"
    },
    {
      id: "ev2",
      title: "Tech Conference 2026",
      hall: "Crystal Marquee",
      guests: 200,
      time: "07:00 PM onwards",
      status: "Upcoming",
      statusColor: "bg-slate-100 text-slate-500",
      phone: "+92 321 7654321"
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#1D1C17] tracking-tight">Today's Live Bookings</h2>
        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
          View Calendar
        </Button>
      </div>

      <div className="bg-white rounded-[16px] border border-[#E6E2DA] shadow-sm overflow-hidden divide-y divide-[#E6E2DA]">
        {mockEvents.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ x: 4 }}
            className="p-4 bg-white hover:bg-slate-50/50 cursor-pointer transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 inline-block ${event.statusColor}`}>
                  {event.status}
                </span>
                <h3 className="font-bold text-[#1D1C17]">{event.title}</h3>
                <p className="text-sm text-slate-500">{event.hall} • {event.guests} Guests</p>
              </div>
              <div className="text-right">
                <span className="block text-sm font-bold text-[#1D1C17]">{event.time.split(" to ")[0]}</span>
                <span className="block text-xs text-slate-400">Slots schedule</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white border border-[#E6E2DA] text-slate-700 shadow-sm hover:bg-slate-50 rounded-[12px] h-9"
              >
                <Phone className="w-3.5 h-3.5 mr-1 text-[#0F5B3E]" /> Call Host
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white border border-[#E6E2DA] text-slate-700 shadow-sm hover:bg-slate-50 rounded-[12px] h-9"
              >
                Details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
