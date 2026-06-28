"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Activity, Plus, CheckCircle, Bell, Wallet, Users, Camera, MessageSquare, Briefcase } from "lucide-react"

export default function StudioActivityPage() {
  const activities = [
    { id: 1, text: "New quote sent to Malik Family", time: "2 hours ago", author: "Creative Studio", action: "Sales", icon: Briefcase, color: "text-[#4F46E5] bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400" },
    { id: 2, text: "Payment of Rs. 60,000 received (Ayesha Walima)", time: "3 hours ago", author: "Admin", action: "Finance", icon: Wallet, color: "text-[#22C55E] bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400" },
    { id: 3, text: "New lead created for Bilal Khan", time: "1 day ago", author: "Website Portal", action: "Lead", icon: Bell, color: "text-[#F59E0B] bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400" },
    { id: 4, text: "Photos uploaded to Media Library", time: "2 days ago", author: "Zain Photographer", action: "Production", icon: Camera, color: "text-[#0EA5E9] bg-sky-50 dark:bg-sky-500/10 dark:text-sky-400" },
    { id: 5, text: "Client feedback received on Walima Video", time: "3 days ago", author: "Ayesha Khan", action: "Review", icon: MessageSquare, color: "text-[#E11D48] bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#4F46E5]" /> Activity Feed
        </h1>
        <p className="text-[#6B7280] dark:text-gray-400 mt-1 text-[13px] font-medium">
          A tamper-proof ledger of all studio activities, booking modifications, payments, and team operations.
        </p>
      </div>

      {/* Activity list */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="space-y-6">
          {activities.map((act) => (
            <div key={act.id} className="flex gap-4 items-start text-[11.5px] font-semibold text-[#6B7280] dark:text-gray-400">
              <div className={`w-10 h-10 rounded-xl ${act.color} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}>
                <act.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 border-b border-[#F3F4F6] dark:border-white/5 pb-5 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-black text-[#4F46E5] uppercase text-[9px] tracking-widest bg-[#EEF2FF] dark:bg-indigo-500/10 px-2 py-0.5 rounded-md">
                    {act.action}
                  </span>
                  <span className="text-[10px] text-[#9CA3AF] font-bold">{act.time}</span>
                </div>
                <h4 className="font-black text-[#111827] dark:text-white text-[14px] leading-snug">{act.text}</h4>
                <p className="text-[10px] text-[#9CA3AF] font-bold mt-1">Logged by: {act.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
