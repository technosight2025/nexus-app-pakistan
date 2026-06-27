"use client"

import { useState } from "react"
import {
  Megaphone, Heart, Tag, Users, BarChart2, MessageCircle,
  Mail, Search, Plus, Star, Gift, Share2, ArrowRight
} from "lucide-react"

const CAMPAIGNS = [
  { id: 1, name: "Winter Wedding Promo", type: "Email", status: "Active", sent: 450, opened: "68%", clicked: "12%", color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10", icon: Mail },
  { id: 2, name: "Eid Discount Reminder", type: "WhatsApp", status: "Scheduled", sent: 0, opened: "—", clicked: "—", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: MessageCircle },
  { id: 3, name: "Anniversary Follow-up", type: "SMS", status: "Active", sent: 120, opened: "95%", clicked: "8%", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: MessageCircle },
]

export default function MarketingPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Marketing & Loyalty</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Campaigns, referrals, and client retention tools</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Col - Campaigns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Recent Campaigns</div>
              <button className="text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer">View All</button>
            </div>
            <div className="space-y-3">
              {CAMPAIGNS.map(c => (
                <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#F3F4F6] dark:border-white/5 hover:border-[#E5E7EB] dark:hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.bg}`}>
                      <c.icon className={`w-5 h-5 ${c.color}`} />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#111827] dark:text-white">{c.name}</div>
                      <div className="text-[10px] text-[#9CA3AF] mt-0.5">{c.type} · <span className={c.status === "Active" ? "text-emerald-500" : "text-amber-500"}>{c.status}</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] sm:ml-auto border-t sm:border-0 border-[#F3F4F6] dark:border-white/5 pt-3 sm:pt-0">
                    <div>
                      <div className="text-[#9CA3AF]">Sent</div>
                      <div className="font-black text-[#374151] dark:text-gray-300">{c.sent}</div>
                    </div>
                    <div>
                      <div className="text-[#9CA3AF]">Opened</div>
                      <div className="font-black text-[#374151] dark:text-gray-300">{c.opened}</div>
                    </div>
                    <div>
                      <div className="text-[#9CA3AF]">Clicked</div>
                      <div className="font-black text-[#374151] dark:text-gray-300">{c.clicked}</div>
                    </div>
                    <button className="w-7 h-7 rounded-lg bg-[#F8FAFC] dark:bg-white/5 flex items-center justify-center text-[#9CA3AF] hover:text-[#4F46E5] transition-colors ml-2 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Loyalty */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] rounded-2xl p-6 text-white relative overflow-hidden">
            <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md mb-4">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-[18px] font-black">Referral Program</h3>
              <p className="text-[11px] text-white/80 mt-1 mb-4 leading-relaxed">Reward past clients for bringing in new business. Current reward: 10% off next booking.</p>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/70">Total Referrals</div>
                  <div className="text-[20px] font-black">24</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/70">Revenue Generated</div>
                  <div className="text-[20px] font-black">₨3.2M</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4">Promo Codes</div>
            <div className="space-y-2">
              {[
                { code: "WINTER25", discount: "15% OFF", used: 12 },
                { code: "EIDMUBARAK", discount: "₨5,000 OFF", used: 8 },
              ].map(p => (
                <div key={p.code} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-[#E5E7EB] dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 px-2 py-1 rounded text-[10px] font-black tracking-widest">{p.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-[#374151] dark:text-gray-300">{p.discount}</div>
                    <div className="text-[9px] text-[#9CA3AF]">Used {p.used} times</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[10px] font-black text-[#374151] dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors">
              Create Promo Code
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
