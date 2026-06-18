"use client"

import React, { useState } from "react"
import { Calendar, ShieldCheck } from "lucide-react"

interface B2bSimulatorProps {
  isUrdu: boolean;
}

interface BookingSlot {
  id: string;
  date: string;
  slot: "Lunch" | "Dinner";
  hall: string;
  booked: boolean;
  bookedBy?: string;
}

const INITIAL_SLOTS: BookingSlot[] = [
  { id: "s1", date: "2026-12-25", slot: "Dinner", hall: "Grand Ballroom A", booked: true, bookedBy: "Ahmed Raza" },
  { id: "s2", date: "2026-12-25", slot: "Lunch", hall: "Grand Ballroom A", booked: false },
  { id: "s3", date: "2026-12-26", slot: "Dinner", hall: "Grand Ballroom A", booked: true, bookedBy: "Sobia Khan" },
  { id: "s4", date: "2026-12-26", slot: "Lunch", hall: "Grand Ballroom A", booked: false },
  { id: "s5", date: "2026-12-27", slot: "Dinner", hall: "Margalla Marquee", booked: false },
  { id: "s6", date: "2026-12-27", slot: "Lunch", hall: "Margalla Marquee", booked: true, bookedBy: "Bilal Malik" }
]

export function B2bSimulator({ isUrdu }: B2bSimulatorProps) {
  const [slots, setSlots] = useState<BookingSlot[]>(INITIAL_SLOTS)
  const [notification, setNotification] = useState<string | null>(null)

  const handleToggleSlot = (id: string) => {
    setSlots(prev =>
      prev.map(slot => {
        if (slot.id === id) {
          const nextState = !slot.booked
          if (nextState) {
            triggerNotification(isUrdu ? "Safety Alert: Date kamyabi se book ho gayi. Double-booking namumkin hai!" : "OS Action: Date booked successfully. Double-booking prevented!")
            return { ...slot, booked: true, bookedBy: isUrdu ? "Test Customer" : "Test Customer" }
          } else {
            triggerNotification(isUrdu ? "Safety Alert: Booking release ho gayi. Slot ab available hai." : "OS Action: Booking released. Date is now available.")
            return { ...slot, booked: false, bookedBy: undefined }
          }
        }
        return slot
      })
    )
  }

  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 4500)
  }

  const totalSlots = slots.length
  const bookedSlots = slots.filter(s => s.booked).length
  const occupancyRate = Math.round((bookedSlots / totalSlots) * 100)

  return (
    <section id="simulator" className="py-16 px-4 md:px-8 bg-white select-none">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-xl mx-auto" dir="ltr">
          <h2 className="text-2xl md:text-3xl font-black text-[#1D1C17] uppercase tracking-wider">
            {isUrdu ? "Zero Double-Booking Engine" : "Zero Double-Booking Engine"}
          </h2>
          <p className="text-xs md:text-sm text-[#5E6460] font-medium leading-relaxed font-sans">
            {isUrdu 
              ? "Humare live simulator me slots book krain aur check krain k Nexus kis tarah double booking ko rokta hai." 
              : "Try our interactive manifest simulator. Click on slots below to toggle bookings and see how double bookings are instantly avoided."
            }
          </p>
        </div>

        {/* Dashboard Frame Mock */}
        <div className="bg-[#FAF7F2] border border-[#E6E2DA] rounded-3xl p-6 shadow-md relative overflow-hidden space-y-6">
          
          {/* Notification Alert Banner */}
          {notification && (
            <div className="bg-[#0F5B3E] text-white px-4 py-2.5 rounded-xl border border-[#C9A227]/30 text-[10px] font-bold tracking-wider flex items-center justify-center gap-2 animate-fadeIn shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              {notification}
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-[#E6E2DA]" dir="ltr">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#0F5B3E]" />
              <div className="text-left">
                <span className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">
                  {isUrdu ? "Banquet Room Manifest" : "Banquet Room Manifest"}
                </span>
                <span className="text-xs font-black text-[#1D1C17]">
                  {isUrdu ? "December 2026 Schedule" : "December 2026 Schedule"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left">
                <span className="text-[9px] text-[#5E6460] font-black uppercase tracking-wider block">
                  {isUrdu ? "Booking Ratio" : "Current Occupancy"}
                </span>
                <span className="text-xs font-black text-[#0F5B3E]">
                  {occupancyRate}% {isUrdu ? "Booked Slots" : "Booked Slots"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-4 border-[#E6E2DA] border-t-[#0F5B3E] flex items-center justify-center font-black text-[9px]">
                {bookedSlots}/{totalSlots}
              </div>
            </div>
          </div>

          {/* Slot Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
            {slots.map(slot => (
              <div 
                key={slot.id}
                onClick={() => handleToggleSlot(slot.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center bg-white hover:border-[#0F5B3E]/30 ${
                  slot.booked 
                    ? "border-[#E6E2DA] shadow-sm bg-slate-50/50" 
                    : "border-[#E6E2DA] shadow-sm"
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded ${slot.booked ? "bg-[#C9A227]" : "bg-emerald-500"}`} />
                    <span className="text-xs font-black text-[#1D1C17]">{slot.date}</span>
                  </div>
                  <p className="text-[10px] font-medium text-[#5E6460] mt-1">
                    {slot.hall} • <span className="font-bold text-[#1D1C17]">{slot.slot}</span>
                  </p>
                  {slot.booked && (
                    <span className="text-[8px] text-[#C9A227] font-black uppercase block mt-0.5">
                      {isUrdu ? `Booked By: ${slot.bookedBy}` : `Booked: ${slot.bookedBy}`}
                    </span>
                  )}
                </div>

                <div 
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                    slot.booked 
                      ? "bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20"
                      : "bg-[#0F5B3E]/10 text-[#0F5B3E] border border-[#0F5B3E]/20"
                  }`}
                >
                  {slot.booked ? (isUrdu ? "Booked" : "BOOKED") : (isUrdu ? "Available" : "AVAILABLE")}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
