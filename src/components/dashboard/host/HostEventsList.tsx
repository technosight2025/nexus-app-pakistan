"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Calendar, MapPin, Users, ChevronRight, Plus, PartyPopper, Briefcase, Gift, Filter, Search
} from "lucide-react"
import { getHostEvents } from "@/app/actions/host/events"

export function HostEventsList() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const MOCK_EVENTS = [
    {
      id: "wedding-2026",
      name: "Wedding of Ahmed & Fatima",
      type: "Wedding",
      date: "Aug 20, 2026",
      venue: "Grand Taj Marquee, Lahore",
      guests: 350,
      budget: "75%",
      progress: 65,
      status: "Active",
      daysLeft: 75,
      icon: PartyPopper,
      color: "from-[#FF6B6B] to-[#FF8E8B]",
      textColor: "text-[#FF6B6B]",
      glow: "shadow-[0_4px_16px_rgba(255,107,107,0.2)]"
    },
    {
      id: "corp-conf-2026",
      name: "Nexus Annual Summit",
      type: "Corporate",
      date: "Nov 15, 2026",
      venue: "Marriott, Islamabad",
      guests: 1200,
      budget: "30%",
      progress: 25,
      status: "Planning",
      daysLeft: 162,
      icon: Briefcase,
      color: "from-[#4D96FF] to-[#6EC1E4]",
      textColor: "text-[#4D96FF]",
      glow: "shadow-[0_4px_16px_rgba(77,150,255,0.2)]"
    },
    {
      id: "bday-2026",
      name: "Zain's 1st Birthday Gala",
      type: "Birthday",
      date: "Dec 10, 2026",
      venue: "TBD",
      guests: 80,
      budget: "10%",
      progress: 10,
      status: "Sourcing",
      daysLeft: 187,
      icon: Gift,
      color: "from-[#FFD93D] to-[#FFC300]",
      textColor: "text-[#D4A000]",
      glow: "shadow-[0_4px_16px_rgba(255,217,61,0.2)]"
    },
    {
      id: "anniversary-2027",
      name: "Mom & Dad's 25th Anniversary",
      type: "Anniversary",
      date: "Feb 14, 2027",
      venue: "Pearl Continental, Lahore",
      guests: 150,
      budget: "5%",
      progress: 5,
      status: "Upcoming",
      daysLeft: 250,
      icon: PartyPopper,
      color: "from-[#6BCB77] to-[#80E08C]",
      textColor: "text-[#6BCB77]",
      glow: "shadow-[0_4px_16px_rgba(107,203,119,0.2)]"
    }
  ]

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data, error } = await getHostEvents()
        if (data && data.length > 0) {
          const mapped = data.map(dbEvent => {
            // Assign icons based on type
            let icon = PartyPopper
            let color = "from-[#FF6B6B] to-[#FF8E8B]"
            let textColor = "text-[#FF6B6B]"
            let glow = "shadow-[0_4px_16px_rgba(255,107,107,0.2)]"

            if (dbEvent.event_type?.toLowerCase() === 'corporate') {
              icon = Briefcase
              color = "from-[#4D96FF] to-[#6EC1E4]"
              textColor = "text-[#4D96FF]"
              glow = "shadow-[0_4px_16px_rgba(77,150,255,0.2)]"
            } else if (dbEvent.event_type?.toLowerCase() === 'birthday') {
              icon = Gift
              color = "from-[#FFD93D] to-[#FFC300]"
              textColor = "text-[#D4A000]"
              glow = "shadow-[0_4px_16px_rgba(255,217,61,0.2)]"
            }

            // Calculate days left
            let daysLeft = 0
            let dateStr = "TBD"
            if (dbEvent.start_date) {
              const start = new Date(dbEvent.start_date)
              const today = new Date()
              const diffTime = Math.abs(start.getTime() - today.getTime())
              daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              dateStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }

            return {
              id: dbEvent.id,
              name: dbEvent.name,
              type: dbEvent.event_type,
              date: dateStr,
              venue: "TBD", // Will be fetched from host_event_vendors in future
              guests: dbEvent.guest_count_expected || 0,
              budget: "0%", // Will be calculated from budgets in future
              progress: 10,
              status: dbEvent.status,
              daysLeft,
              icon,
              color,
              textColor,
              glow
            }
          })
          setEvents(mapped)
        } else {
          setEvents(MOCK_EVENTS)
        }
      } catch (err) {
        setEvents(MOCK_EVENTS)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.3 } }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 🌟 Header Section 🌟 */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-tight mb-1">
            My Events
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Manage all your celebrations in one place
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-full shadow-[inset_0_1px_rgba(255,255,255,0.8)] border border-white" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF6B6B] transition-colors z-10" />
            <input 
              type="text" 
              placeholder="Search events..."
              className="relative z-10 w-64 pl-10 pr-4 py-2.5 bg-transparent text-sm outline-none text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#FF6B6B]/20 rounded-full"
            />
          </div>
          
          <Link href="/dashboard/host/events/new" className="group relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] rounded-full blur-md opacity-40 group-hover:opacity-100 transition-all duration-300" />
            <div className="relative bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8B] hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-full shadow-[inset_0_1px_rgba(255,255,255,0.3)] border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm w-full md:w-auto">
              <Plus className="w-4 h-4" />
              New Event
            </div>
          </Link>
        </div>
      </motion.div>

      {/* 🌟 Filters 🌟 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar"
      >
        {["all", "active", "planning", "upcoming", "past"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all duration-300 border ${
              activeFilter === filter 
                ? "bg-white/90 border-white text-[#FF6B6B] shadow-sm" 
                : "bg-white/40 border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-700"
            }`}
          >
            {filter}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white text-slate-500 text-xs font-semibold hover:bg-white/70 transition-colors shadow-sm">
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </motion.div>

      {/* 🌟 Events Grid 🌟 */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {events.map((event) => (
          <Link 
            key={event.id} 
            href={`/dashboard/host/events/${event.id}`}
            className="group block"
          >
            <motion.div variants={itemVariants} className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
              
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_rgba(255,255,255,0.8)] pointer-events-none z-10" />
              <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />

              <div className="flex items-start justify-between mb-6 relative z-20">
                <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center ${event.glow} border border-white/20`}>
                  <event.icon className="w-6 h-6 text-white" />
                </div>

                <div className={`px-2.5 py-1 rounded-full bg-white shadow-sm border border-white/50 ${event.textColor}`}>
                  <span className="text-[10px] font-bold">{event.status}</span>
                </div>
              </div>

              <div className="space-y-1 mb-6 relative z-20 flex-1">
                <h3 className="font-bold text-lg text-slate-800 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 transition-colors">
                  {event.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-white shadow-sm">
                    {event.type}
                  </span>
                  <span className={`text-[11px] font-semibold ${event.textColor}`}>
                    • {event.daysLeft} Days Left
                  </span>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="space-y-2.5 mb-6 bg-white/50 backdrop-blur-sm p-3.5 rounded-2xl border border-white shadow-sm relative z-20">
                <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {event.date}
                </div>
                <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 relative z-20 mb-4">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 px-1">
                  <span>Progress</span>
                  <span className="text-slate-700">{event.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100/80 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${event.color} relative`} 
                    style={{ width: `${event.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer Action */}
              <div className={`pt-4 border-t border-white/50 flex items-center justify-between text-xs font-semibold ${event.textColor} group-hover:px-2 transition-all duration-300 relative z-20 mt-auto`}>
                <span>Open Event</span>
                <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center shadow-sm transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300`}>
                  <ChevronRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

            </motion.div>
          </Link>
        ))}
      </motion.div>

    </div>
  )
}
