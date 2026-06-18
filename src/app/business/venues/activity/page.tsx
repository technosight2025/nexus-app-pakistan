"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Activity, Plus, CheckCircle, Bell, Wallet, MapPin } from "lucide-react"

export default function VenueActivityPage() {
  const activities = [
    { id: 1, text: "Groom & Bride entry walk check", time: "2 hours ago", author: "Usman Khan", action: "Timeline Setup", icon: CheckCircle, color: "text-[#0F5B3E] bg-[#E6F0EC]" },
    { id: 2, text: "Payment of Rs. 50,000 received (Hassan Walima)", time: "3 hours ago", author: "Zain Malik", action: "Cash Payout", icon: Wallet, color: "text-indigo-600 bg-indigo-50" },
    { id: 3, text: "New lead created for Fatima Noor", time: "1 day ago", author: "Website portal", action: "CRM Inquiry", icon: Bell, color: "text-rose-600 bg-rose-50" },
    { id: 4, text: "AC maintenance technician logged Unit 4 repaired", time: "2 days ago", author: "AC Tech Services", action: "Operations", icon: Activity, color: "text-amber-600 bg-amber-50" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#0F5B3E]" /> Audit & Activity Logs
        </h1>
        <p className="text-gray-500 mt-1 text-[13px] font-medium">
          A tamper-proof ledger of employee check-ins, payment confirmations, booking modifications, and cleaning reports.
        </p>
      </div>

      {/* Roster list */}
      <Card className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm max-w-3xl">
        <div className="space-y-5">
          {activities.map((act) => (
            <div key={act.id} className="flex gap-4 items-start text-[11.5px] font-semibold text-gray-600">
              <div className={`w-8 h-8 rounded-xl ${act.color} flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                <act.icon className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0 border-b border-gray-50 pb-4">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[#0F5B3E] uppercase text-[9px] tracking-wider bg-[#E6F0EC] px-2 py-0.5 rounded-md">
                    {act.action}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">{act.time}</span>
                </div>
                <h4 className="font-black text-gray-900 text-[12.5px] mt-2 leading-snug">{act.text}</h4>
                <p className="text-[9.5px] text-gray-400 font-semibold mt-1">Logged by: {act.author}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}
