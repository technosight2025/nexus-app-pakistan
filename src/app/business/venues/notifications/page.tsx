"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Bell, Check, Inbox, Wallet, AlertTriangle, Info } from "lucide-react"

export default function VenueNotificationsPage() {
  const [unreadCount, setUnreadCount] = useState(3)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#0F5B3E]" /> Inbox Notifications
          </h1>
          <p className="text-gray-500 mt-1 text-[13px] font-medium">
            Monitor real-time event reminders, booking request alerts, and invoice payment confirmations.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={() => setUnreadCount(0)}
            className="px-3.5 py-1.5 border border-[#ECE7DF] hover:bg-gray-50 text-[11px] font-extrabold rounded-xl text-gray-600 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* List */}
      <Card className="p-5 border border-gray-100 bg-white rounded-[24px] shadow-sm max-w-3xl">
        <div className="divide-y divide-gray-50">
          {/* Item 1 */}
          <div className="py-4 first:pt-0 flex gap-3 text-[11.5px] font-semibold text-gray-600">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Inbox className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-900 text-[12.5px]">New booking request received</span>
                <span className="text-[10px] text-gray-400 font-bold">2 mins ago</span>
              </div>
              <p className="text-gray-500 mt-1">Fatima Noor requested Hall A for wedding ceremony on Dec 15, 2026. Needs response to lock date.</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="py-4 flex gap-3 text-[11.5px] font-semibold text-gray-600">
            <div className="w-8 h-8 rounded-xl bg-[#E6F0EC] text-[#0F5B3E] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-900 text-[12.5px]">Advance Booking Payment Verified</span>
                <span className="text-[10px] text-gray-400 font-bold">1 hour ago</span>
              </div>
              <p className="text-gray-500 mt-1">Transaction TXN-8203 of Rs. 2,00,000 for Ahmed Wedding cleared bank audit.</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="py-4 flex gap-3 text-[11.5px] font-semibold text-gray-600">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-900 text-[12.5px] text-rose-600">AC Unit Malfunction Alert</span>
                <span className="text-[10px] text-gray-400 font-bold">1 day ago</span>
              </div>
              <p className="text-gray-500 mt-1">AC Unit 4 in Royal Hall reported blowing warm air. Maintenance ticket #MC-91 opened.</p>
            </div>
          </div>
        </div>
      </Card>

    </div>
  )
}
