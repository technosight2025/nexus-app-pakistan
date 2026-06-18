"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  ChevronLeft, Settings, LayoutDashboard, Clock, Users, Gift, 
  Wallet, FileText, Sparkles, Heart
} from "lucide-react"

// Import sub-modules
import { EventOverviewTab } from "./modules/EventOverviewTab"
import { TimelineTab } from "./modules/TimelineTab"
import { TeamVendorsTab } from "./modules/TeamVendorsTab"
import { GuestsTab } from "./modules/GuestsTab"
import { FinancesTab } from "./modules/FinancesTab"
import { ManagementTab } from "./modules/ManagementTab"
import { MemoriesTab } from "./modules/MemoriesTab"

import { getHostEventDetails } from "@/app/actions/host/events"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981",
  cardShadow: "0 4px 12px rgba(0,0,0,0.05)",
  goldShadow: "0 8px 24px rgba(212,175,55,0.15)"
}

interface EventCommandCenterProps {
  eventId: string
}

export function EventCommandCenter({ eventId }: EventCommandCenterProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [eventDetails, setEventDetails] = useState<any>(null)

  useEffect(() => {
    async function loadEvent() {
      const { data } = await getHostEventDetails(eventId)
      if (data) setEventDetails(data)
    }
    loadEvent()
  }, [eventId])

  const TABS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "timeline", label: "Timeline", icon: Clock },
    { id: "team", label: "Team & Vendors", icon: Users },
    { id: "guests", label: "Guests & Invites", icon: Gift },
    { id: "finances", label: "Finances", icon: Wallet },
    { id: "memories", label: "Memories", icon: Sparkles },
    { id: "management", label: "Management", icon: FileText },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-[1200px] mx-auto font-inter">
      
      {/* 🌟 Smart Premium Header 🌟 */}
      <div 
        className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white/80 backdrop-blur-xl p-6 md:p-8 border border-gray-100 overflow-hidden group transition-all duration-500"
        style={{ borderRadius: '24px', boxShadow: theme.cardShadow }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = theme.goldShadow}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = theme.cardShadow}
      >
        
        {/* Cinematic Animated Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F0]/80 to-white z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 animate-[pulse_8s_ease-in-out_infinite] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#0F5B3E]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="flex items-start md:items-center gap-5 relative z-20">
          <Link href="/dashboard/host">
            <button 
              className="w-12 h-12 bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#0F5B3E] hover:border-[#D4AF37] hover:shadow-md hover:-translate-x-1 transition-all duration-300"
              style={{ borderRadius: '16px' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0F5B3E]/10 border border-[#0F5B3E]/20">
                <Heart className="w-3 h-3 fill-[#0F5B3E] text-[#0F5B3E]" />
                <span className="text-[10px] font-bold text-[#0F5B3E] uppercase tracking-wider">{eventDetails?.event_type || 'Wedding'}</span>
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] bg-white px-2.5 py-1 rounded-md border border-[#D4AF37]/30 shadow-sm uppercase tracking-wider">
                {eventDetails?.start_date ? new Date(eventDetails.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Aug 20, 2026'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-poppins text-[#1A1A1A] tracking-tight leading-tight">
              {eventDetails?.name || 'Wedding of Ahmed & Fatima'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-20">
          <button className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-md opacity-40 group-hover:opacity-100 transition-opacity" />
            <div 
              className="relative bg-white hover:bg-gray-50 text-[#D4AF37] hover:text-[#B89020] font-bold py-2.5 px-5 text-sm flex items-center gap-2 border border-[#D4AF37] shadow-sm transition-all active:scale-95"
              style={{ borderRadius: '12px' }}
            >
              <Sparkles className="w-4 h-4" />
              Ask Nexus AI
            </div>
          </button>
          <button 
            className="w-12 h-12 bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#0F5B3E] hover:shadow-md hover:rotate-90 transition-all duration-500"
            style={{ borderRadius: '16px' }}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 🌟 Animated Navigation Tabs 🌟 */}
      <div className="relative">
        <div 
          className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-sm p-2 overflow-x-auto no-scrollbar"
          style={{ borderRadius: '16px' }}
        >
          <div className="flex items-center gap-1.5 min-w-max relative z-10">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-[12px] font-bold text-xs transition-colors duration-300 z-20 ${
                    isActive ? "text-[#0F5B3E]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-[#0F5B3E]/10 rounded-[12px] -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-[#0F5B3E]" : "text-gray-400"}`} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 🌟 Module Content Area 🌟 */}
      <div className="min-h-[600px] pt-2 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, scale: 0.99, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.99, filter: "blur(2px)" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="h-full"
          >
            {activeTab === "overview" && <EventOverviewTab eventId={eventId} />}
            {activeTab === "timeline" && <TimelineTab eventId={eventId} />}
            {activeTab === "team" && <TeamVendorsTab eventId={eventId} />}
            {activeTab === "guests" && <GuestsTab eventId={eventId} />}
            {activeTab === "finances" && <FinancesTab eventId={eventId} />}
            {activeTab === "memories" && <MemoriesTab eventId={eventId} />}
            {activeTab === "management" && <ManagementTab eventId={eventId} />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
