"use client"

import { useState } from "react"
import {
  BarChart3, TrendingUp, TrendingDown, Wallet, Target,
  Users, Calendar, Download, Filter, ChevronRight
} from "lucide-react"

export default function ReportsPage() {
  const stats = [
    { label: "Total Revenue (YTD)", value: "₨4.2M", change: "+12.5%", isPositive: true, icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "New Bookings", value: "34", change: "+5.2%", isPositive: true, icon: Target, color: "text-indigo-500", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10" },
    { label: "Lead Conversion", value: "28.4%", change: "-2.1%", isPositive: false, icon: Users, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Avg Package Value", value: "₨125K", change: "+8.4%", isPositive: true, icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ]

  const chartData = [35, 45, 30, 60, 75, 55, 65, 80, 70, 95, 85, 90]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const packages = [
    { name: "Premium Cinematic Wedding", bookings: 14, revenue: "₨2.1M", trend: "+15%", color: "bg-indigo-500" },
    { name: "Standard 3-Day Event", bookings: 12, revenue: "₨1.2M", trend: "+5%", color: "bg-emerald-500" },
    { name: "Corporate Gala Package", bookings: 5, revenue: "₨500K", trend: "-2%", color: "bg-amber-500" },
    { name: "Bridal Shower & Mehndi", bookings: 8, revenue: "₨400K", trend: "+25%", color: "bg-rose-500" },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-black text-[#111827] dark:text-white">Reports & Analytics</h1>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">Track financial performance, booking trends, and growth</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" /> This Year
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black hover:bg-indigo-700 transition-all cursor-pointer shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 hover:border-[#4F46E5]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.isPositive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-[24px] font-black text-[#111827] dark:text-white">{stat.value}</h3>
              <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[14px] font-black text-[#111827] dark:text-white">Revenue Overview</h2>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5">Monthly booking income for 2026</p>
            </div>
            <div className="text-right">
              <h3 className="text-[20px] font-black text-[#4F46E5]">₨4.2M</h3>
              <p className="text-[9px] font-black text-[#22C55E] uppercase tracking-widest">+12.5% vs Last Year</p>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-2 h-[220px] mt-auto pb-6">
            {chartData.map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 group h-full justify-end relative">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-white bg-gray-900 shadow-lg px-2 py-1 rounded-lg absolute bottom-[calc(100%+8px)] pointer-events-none z-10">
                  {height * 10}k
                </span>
                <div className="w-full relative bg-[#F8FAFC] dark:bg-white/5 rounded-t-lg overflow-hidden flex items-end justify-center h-full">
                  <div 
                    className="w-full bg-[#4F46E5] hover:bg-indigo-400 dark:bg-gradient-to-t dark:from-indigo-600 dark:to-indigo-400 rounded-t-lg transition-all duration-500 cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-[#9CA3AF] absolute -bottom-5">{months[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Packages */}
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-[14px] font-black text-[#111827] dark:text-white">Top Packages</h2>
            <button className="text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer">View All</button>
          </div>
          
          <div className="space-y-4 flex-1">
            {packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${pkg.color}`} />
                  <div>
                    <h4 className="text-[11px] font-bold text-[#111827] dark:text-white leading-tight">{pkg.name}</h4>
                    <p className="text-[9px] text-[#9CA3AF] mt-0.5">{pkg.bookings} Bookings</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-black text-[#111827] dark:text-white">{pkg.revenue}</p>
                  <p className={`text-[9px] font-black mt-0.5 ${pkg.trend.startsWith('+') ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                    {pkg.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-[#F3F4F6] dark:border-white/5">
            <button className="w-full py-2.5 bg-[#F8FAFC] dark:bg-white/5 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black transition-colors flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer">
              Package Settings <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
