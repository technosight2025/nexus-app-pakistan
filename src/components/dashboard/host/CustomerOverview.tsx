"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Calendar, MapPin, Users, Plus, ArrowRight, LayoutGrid, CheckCircle, Clock, Search, MoreVertical, Bell, MessageSquare, Menu
} from "lucide-react"
import { getHostEvents } from "@/app/actions/host/events"

// Design Tokens defined by user
const theme = {
  primary: "#0F5B3E",
  primaryLight: "#1A7A54",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  success: "#10B981",
  goldShadow: "0 8px 24px rgba(212,175,55,0.15)",
  primaryShadow: "0 8px 20px rgba(15,91,62,0.12)",
  cardShadow: "0 4px 12px rgba(0,0,0,0.05)"
}

export function CustomerOverview() {
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFabOpen, setIsFabOpen] = useState(false)

  const MOCK_EVENTS = [
    {
      id: "wedding-2026",
      name: "Ahmed & Fatima's Wedding",
      type: "Wedding",
      date: "Aug 20, 2026",
      venue: "Grand Taj Marquee",
      guests: 350,
      progress: 65,
      status: "Active",
      daysLeft: 75,
    },
    {
      id: "corp-conf-2026",
      name: "Nexus Annual Summit",
      type: "Corporate",
      date: "Nov 15, 2026",
      venue: "Marriott, Islamabad",
      guests: 1200,
      progress: 25,
      status: "Planning",
      daysLeft: 162,
    },
    {
      id: "bday-2026",
      name: "Zain's 1st Birthday Gala",
      type: "Birthday",
      date: "Dec 10, 2026",
      venue: "TBD",
      guests: 80,
      progress: 10,
      status: "Sourcing",
      daysLeft: 187,
    }
  ]

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data, error } = await getHostEvents()
        if (data && data.length > 0) {
          const mapped = data.map((dbEvent) => {
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
              venue: "TBD",
              guests: dbEvent.guest_count_expected || 0,
              progress: 10,
              status: dbEvent.status,
              daysLeft,
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
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } }
  }

  return (
    <div className="min-h-screen -m-4 p-4 md:-m-8 md:p-8 font-sans pb-24" style={{ backgroundColor: theme.bg }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5"
      >
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-5">
          
          {/* Header Row */}
          <motion.div variants={itemVariants} className="flex items-center justify-between pb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>
                Welcome back, Ahmed
              </h1>
              <p className="font-medium mt-1" style={{ color: theme.textSecondary }}>
                Here is your event portfolio overview.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:border-[#D4AF37] transition-colors" style={{ boxShadow: theme.cardShadow }}>
                <Search className="w-5 h-5 text-gray-500" />
              </button>
              <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:border-[#D4AF37] transition-colors relative" style={{ boxShadow: theme.cardShadow }}>
                <span className="absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: theme.success }} />
                <Bell className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </motion.div>

          {/* Metrics Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Active Events", value: events.length.toString(), icon: LayoutGrid },
              { label: "Pending Tasks", value: "12", icon: Clock },
              { label: "Milestones Hit", value: "8", icon: CheckCircle }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-5 flex items-center justify-between border border-white/40 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '24px',
                  boxShadow: theme.cardShadow,
                }}
              >
                <div className="relative z-10">
                  <p className="text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: theme.textSecondary }}>{stat.label}</p>
                  <p className="text-3xl font-bold" style={{ color: theme.primary }}>{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: `${theme.accent}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: theme.accent }} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Event Cards Grid */}
          <motion.div variants={itemVariants} className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: theme.textPrimary }}>Your Events</h2>
              <Link href="/dashboard/host/events" className="text-sm font-semibold flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {events.map((event) => (
                <Link key={event.id} href={`/dashboard/host/events/${event.id}`} className="block group">
                  <div 
                    className="p-6 border border-gray-100 transition-all duration-300 relative bg-white flex flex-col h-full hover:border-[#D4AF37]"
                    style={{ 
                      borderRadius: '24px',
                      boxShadow: theme.cardShadow,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = theme.goldShadow
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = theme.cardShadow
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span 
                          className="px-3 py-1 text-xs font-bold uppercase tracking-wider inline-block mb-3 border"
                          style={{ 
                            borderRadius: '9999px',
                            backgroundColor: `${theme.primary}10`,
                            color: theme.primary,
                            borderColor: `${theme.primary}20`
                          }}
                        >
                          {event.type}
                        </span>
                        <h3 className="text-xl font-bold leading-tight" style={{ color: theme.textPrimary }}>{event.name}</h3>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4 -rotate-45" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: theme.textSecondary }}>
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} • {event.daysLeft} days left</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: theme.textSecondary }}>
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: theme.textSecondary }}>
                        <Users className="w-4 h-4" />
                        <span>{event.guests} Guests Expected</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span style={{ color: theme.textSecondary }}>Planning Progress</span>
                        <span style={{ color: theme.primary }}>{event.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 overflow-hidden" style={{ height: '8px', borderRadius: '9999px' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${event.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
                            borderRadius: '9999px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SIDEBAR (Event Concierge) */}
        <motion.div variants={itemVariants} className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div 
            className="bg-white p-6 h-full border-t-4 sm:border-t-0 lg:border-l-4"
            style={{ 
              borderRadius: '24px', 
              boxShadow: theme.cardShadow,
              borderColor: theme.accent
            }}
          >
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Concierge" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-1 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: theme.success }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: theme.textPrimary }}>Nexus AI Concierge</h3>
              <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>Online and ready to help</p>
              
              <button 
                className="mt-4 w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
                style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Concierge
              </button>
            </div>

            <div className="pt-6 space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider" style={{ color: theme.textSecondary }}>Quick Insights</h4>
              
              <div 
                className="p-4 rounded-2xl text-white"
                style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)` }}
              >
                <p className="text-sm font-medium text-white/80 mb-1">Total Budget Spent</p>
                <p className="text-2xl font-bold">Rs. 450,000</p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold bg-black/20 w-fit px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-emerald-300" />
                  On Track
                </div>
              </div>

              <div 
                className="p-4 rounded-2xl text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${theme.accent} 0%, #B89020 100%)` }}
              >
                <p className="text-sm font-medium text-white/90 mb-1">Next Milestone</p>
                <p className="text-lg font-bold leading-tight">Finalize Venue Selection</p>
                <p className="text-xs font-semibold mt-2 text-white/80">Due in 3 days</p>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50">
        <AnimatePresence>
          {isFabOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2 items-end"
            >
              <Link href="/dashboard/host/events/new">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md" style={{ color: theme.textPrimary }}>Create Event</span>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md text-gray-600 group-hover:text-[#0F5B3E] transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-3 group cursor-pointer">
                <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md" style={{ color: theme.textPrimary }}>Invite Vendor</span>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md text-gray-600 group-hover:text-[#0F5B3E] transition-colors">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95"
          style={{ 
            backgroundColor: theme.primary,
            boxShadow: isFabOpen ? theme.primaryShadow : '0 10px 25px rgba(0,0,0,0.2)',
            transform: isFabOpen ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
        >
          <Plus className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-lg border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { icon: LayoutGrid, label: "Home", active: true },
            { icon: Calendar, label: "Events", active: false },
            { icon: MessageSquare, label: "Chat", active: false },
            { icon: Menu, label: "Menu", active: false },
          ].map((nav, idx) => (
            <button 
              key={idx}
              className={`flex flex-col items-center justify-center w-16 h-12 relative transition-colors ${nav.active ? '' : 'text-gray-400'}`}
              style={{ color: nav.active ? theme.primary : undefined }}
            >
              {nav.active && (
                <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full" style={{ backgroundColor: theme.accent }} />
              )}
              <nav.icon className={`w-5 h-5 mb-1 ${nav.active ? 'fill-current opacity-20' : ''}`} />
              <span className="text-[10px] font-bold">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
      
    </div>
  )
}
