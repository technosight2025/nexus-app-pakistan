"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Plus, CheckCircle2, Heart, Sparkles, BrainCircuit, ListOrdered } from "lucide-react"
import { getHostEventMilestones } from "@/app/actions/host/events"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#E11D48",
  cardShadow: "0 4px 12px rgba(0,0,0,0.05)",
  goldShadow: "0 8px 24px rgba(212,175,55,0.15)"
}

export function TimelineTab({ eventId }: { eventId?: string }) {
  const [milestones, setMilestones] = useState<any[]>([])
  const [showPrediction, setShowPrediction] = useState(true)

  const MOCK_MILESTONES = [
    { id: 1, title: "Engagement / Baat Pakki", date: "Jan 10, 2026", status: "completed" },
    { id: 2, title: "Book Wedding Venue", date: "Mar 15, 2026", status: "overdue", time: "-", venue: "-" },
    { id: 3, title: "Mehndi Night", date: "Aug 18, 2026", status: "upcoming", time: "7:00 PM", venue: "The Royal Farm" },
    { id: 4, title: "Barat & Nikkah", date: "Aug 20, 2026", status: "upcoming", time: "6:00 PM", venue: "Grand Taj Marquee" },
    { id: 5, title: "Walima Reception", date: "Aug 22, 2026", status: "upcoming", time: "8:00 PM", venue: "Pearl Continental" }
  ]

  useEffect(() => {
    async function loadMilestones() {
      if (!eventId) {
        setMilestones(MOCK_MILESTONES)
        return
      }
      try {
        const { data } = await getHostEventMilestones(eventId)
        if (data && data.length > 0) {
          const mapped = data.map((dbM: any) => {
            let dateStr = "TBD"
            if (dbM.milestone_date) {
              const d = new Date(dbM.milestone_date)
              dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
            return {
              id: dbM.id,
              title: dbM.title,
              date: dateStr,
              status: dbM.status?.toLowerCase() || 'upcoming',
              time: dbM.time_string,
              venue: dbM.venue_string
            }
          })
          setMilestones(mapped)
        } else {
          setMilestones(MOCK_MILESTONES)
        }
      } catch (err) {
        setMilestones(MOCK_MILESTONES)
      }
    }
    loadMilestones()
  }, [eventId])

  const handleApplyTemplate = () => {
    alert("Applying 'Traditional Wedding' Milestone Template...")
  }

  return (
    <div className="relative font-inter max-w-[1000px] mx-auto pb-24 space-y-6">
      
      {/* 🌟 Header 🌟 */}
      <div className="bg-white/80 backdrop-blur-md rounded-[24px] border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10" style={{ boxShadow: theme.cardShadow }}>
        <div>
          <h2 className="text-2xl font-bold font-poppins text-[#1A1A1A] flex items-center gap-2 mb-1">
            Smart Timeline <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </h2>
          <p className="text-sm text-gray-500 font-medium">Manage your event roadmap with AI predictions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleApplyTemplate}
            className="px-4 py-2 bg-white border border-gray-200 text-[#0F5B3E] font-bold shadow-sm transition-colors hover:border-[#0F5B3E] flex items-center gap-2"
            style={{ borderRadius: '12px' }}
          >
            <ListOrdered className="w-4 h-4" /> Load Template
          </button>
          <button 
            className="px-5 py-2 text-white font-bold transition-all active:scale-95 flex items-center gap-2 shadow-md hover:bg-[#1A7A54]"
            style={{ borderRadius: '12px', backgroundColor: theme.primary }}
          >
            <Plus className="w-4 h-4" /> Add Milestone
          </button>
        </div>
      </div>

      {/* 🧠 AI Prediction Insight 🌟 */}
      <AnimatePresence>
        {showPrediction && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-[24px] p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <BrainCircuit className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A1A1A] text-sm">Nexus AI Insight</h4>
                <p className="text-sm font-medium text-gray-600 mt-1">
                  You are currently <strong className="text-[#E11D48]">12 days overdue</strong> on booking your Wedding Venue. Based on historical data in Islamabad, top-tier venues for August are 85% booked by this time.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowPrediction(false)} 
              className="text-xs font-bold text-[#D4AF37] hover:text-[#B89020] whitespace-nowrap"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 Timeline Rendering 🌟 */}
      <div className="relative border-l-2 ml-5 space-y-8 pb-2 z-10" style={{ borderColor: `${theme.primary}20` }}>
        {/* Animated Line overlay */}
        <div className="absolute top-0 bottom-0 -left-[2px] w-[3px] bg-gradient-to-b from-[#0F5B3E] via-[#D4AF37] to-transparent opacity-50" />

        {milestones.map((milestone) => {
          const isOverdue = milestone.status === 'overdue'
          const isComplete = milestone.status === 'completed'
          
          return (
            <div key={milestone.id} className="relative pl-10 group cursor-pointer">
              {/* Timeline Dot */}
              <div className={`absolute -left-[14px] top-1.5 w-7 h-7 rounded-full border-[3px] border-white flex items-center justify-center shadow-md z-20 transition-transform duration-300 group-hover:scale-125
                ${isComplete ? 'bg-[#0F5B3E]' : isOverdue ? 'bg-[#E11D48]' : 'bg-[#D4AF37]'}
              `}>
                {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                {isOverdue && <Clock className="w-3.5 h-3.5 text-white" />}
              </div>

              <div 
                className="relative bg-white/90 backdrop-blur-md rounded-[24px] border border-gray-100 p-6 transition-all duration-300 overflow-hidden group-hover:-translate-y-1"
                style={{ boxShadow: theme.cardShadow }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = isOverdue ? "0 8px 24px rgba(225,29,72,0.15)" : theme.goldShadow}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = theme.cardShadow}
              >
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border
                        ${isComplete ? 'bg-[#0F5B3E]/10 text-[#0F5B3E] border-[#0F5B3E]/20' : 
                          isOverdue ? 'bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/20' : 
                          'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20'}
                      `}>
                        {milestone.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-poppins text-[#1A1A1A] group-hover:text-[#0F5B3E] transition-colors">{milestone.title}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm bg-white ${isOverdue ? 'border-[#E11D48]/30 text-[#E11D48]' : 'border-gray-100'}`}>
                      <Calendar className="w-4 h-4" />
                      {milestone.date}
                    </div>
                  </div>
                </div>

                {milestone.status === 'upcoming' && milestone.time !== '-' && (
                  <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-[12px] border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-200">
                        <Clock className="w-4 h-4 text-gray-500" />
                      </div>
                      {milestone.time}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-[12px] border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-200">
                        <MapPin className="w-4 h-4 text-gray-500" />
                      </div>
                      {milestone.venue}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
