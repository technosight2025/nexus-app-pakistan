"use client"

import React from "react"
import { Bell, Check, Clock, MessageSquare, Briefcase, Info } from "lucide-react"

export default function StudioNotificationsPage() {
  const notifications = [
    { id: 1, title: "Urgent: Review pending for Walima video", desc: "Ayesha Khan has requested 2 revisions on the final cut.", time: "10 mins ago", type: "urgent", icon: Clock, color: "text-rose-500 bg-rose-50 dark:bg-rose-500/10" },
    { id: 2, title: "New Message from Malik Family", desc: "Can we add a drone operator for the Mehndi?", time: "1 hour ago", type: "message", icon: MessageSquare, color: "text-sky-500 bg-sky-50 dark:bg-sky-500/10" },
    { id: 3, title: "Lead Converted: Bilal Khan", desc: "Bilal has signed the contract and paid the advance.", time: "2 hours ago", type: "success", icon: Briefcase, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
    { id: 4, title: "System Update: Storage Usage", desc: "Your Media Library is at 24% capacity (48.2 GB used).", time: "1 day ago", type: "info", icon: Info, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111827] dark:text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#4F46E5]" /> Notifications
          </h1>
          <p className="text-[#6B7280] dark:text-gray-400 mt-1 text-[13px] font-medium">
            Stay updated with your latest alerts, messages, and studio updates.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-black text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
          <Check className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-2 shadow-sm">
        <div className="flex flex-col">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex gap-4 items-start p-4 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
              <div className={`w-10 h-10 rounded-xl ${notif.color} flex items-center justify-center shrink-0 shadow-sm`}>
                <notif.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-[#111827] dark:text-white text-[13px] leading-snug group-hover:text-[#4F46E5] transition-colors">{notif.title}</h4>
                  <span className="text-[10px] text-[#9CA3AF] font-semibold shrink-0 ml-4">{notif.time}</span>
                </div>
                <p className="text-[11px] font-medium text-[#6B7280] dark:text-gray-400">{notif.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
