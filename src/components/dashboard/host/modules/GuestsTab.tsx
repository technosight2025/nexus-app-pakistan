"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getHostEventGuests } from "@/app/actions/host/events"

import { GuestListManager } from "./guests/GuestListManager"
import { SeatingChartBuilder } from "./guests/SeatingChartBuilder"
import { DigitalInvitations } from "./guests/DigitalInvitations"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981"
}

export function GuestsTab({ eventId }: { eventId?: string }) {
  const [activeView, setActiveView] = useState<'list' | 'seating' | 'invitations'>('list')
  const [guests, setGuests] = useState<any[]>([])

  const MOCK_GUESTS = [
    { id: 1, name: "Ali Khan & Family", group: "Bride's Family", rsvp: "Confirmed", pax: 4, seating: "Table 1" },
    { id: 2, name: "Zainab Ahmed", group: "Friends", rsvp: "Pending", pax: 1, seating: "Unassigned" },
    { id: 3, name: "Mr. & Mrs. Tariq", group: "Groom's Family", rsvp: "Confirmed", pax: 2, seating: "Table 4" },
    { id: 4, name: "Sara Raza", group: "Colleagues", rsvp: "Declined", pax: 0, seating: "-" },
  ]

  useEffect(() => {
    async function loadGuests() {
      if (!eventId) {
        setGuests(MOCK_GUESTS)
        return
      }
      try {
        const { data } = await getHostEventGuests(eventId)
        if (data && data.length > 0) {
          const mapped = data.map((g: any) => ({
            id: g.id,
            name: g.name,
            group: g.group_name || "Unassigned",
            rsvp: g.rsvp_status || "Pending",
            pax: g.pax_count || 1,
            seating: g.seating_assignment || "-"
          }))
          setGuests(mapped)
        } else {
          setGuests(MOCK_GUESTS)
        }
      } catch (err) {
        setGuests(MOCK_GUESTS)
      }
    }
    loadGuests()
  }, [eventId])

  return (
    <div className="space-y-6 font-inter pb-24">
      
      {/* 🌟 Header & Navigation 🌟 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-poppins text-[#1A1A1A] tracking-tight">Guest Management</h2>
          <p className="text-sm font-medium text-gray-500">Track RSVPs, seating charts, and digital invites</p>
        </div>
        
        <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-[12px] border border-gray-200 shadow-sm w-fit">
          <button 
            onClick={() => setActiveView('list')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'list' ? 'bg-[#0F5B3E] text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            Guest List
          </button>
          <button 
            onClick={() => setActiveView('seating')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'seating' ? 'bg-[#0F5B3E] text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            Seating Charts
          </button>
          <button 
            onClick={() => setActiveView('invitations')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'invitations' ? 'bg-[#0F5B3E] text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            Invitations
          </button>
        </div>
      </div>

      <div className="pt-2">
        {activeView === 'list' && <GuestListManager guests={guests} setGuests={setGuests} />}
        {activeView === 'seating' && <SeatingChartBuilder />}
        {activeView === 'invitations' && <DigitalInvitations />}
      </div>

    </div>
  )
}
