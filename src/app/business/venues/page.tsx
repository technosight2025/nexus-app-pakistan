"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { 
  CalendarDays, Wallet, PieChart, FileText, Inbox, Users, 
  ChevronDown, ChevronLeft, ChevronRight, MapPin, CheckCircle, 
  Clock, Plus, MoreVertical, Sparkles, Star, Bell, ArrowUpRight, 
  Trash2, X, ClipboardList, Send, Phone, UserCheck, ShieldCheck, 
  Tag, Compass, Check, Calendar as CalendarIcon
} from "lucide-react"

export default function VenueDashboardPage() {
  const router = useRouter()
  
  // State for interactive features
  const [selectedDate, setSelectedDate] = useState<number>(20)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  
  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: "Confirm catering for Ahmed Wedding", priority: "High", done: true },
    { id: 2, text: "Hall decoration final review", priority: "Medium", done: false },
    { id: 3, text: "Payment reminder for 3 invoices", priority: "Medium", done: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  // Active event command center mock data
  const eventDetails = {
    id: "EV-AhmedFatima",
    title: "Wedding of Ahmed & Fatima",
    hall: "Royal Hall (Main Banquet)",
    date: "May 20, 2025",
    guests: "800 Guests",
    vendors: [
      { category: "Catering", name: "Tariq Royal Caterers", status: "Prepared" },
      { category: "Decoration", name: "Roseate Events & Decor", status: "Active Setup" },
      { category: "Photography", name: "Fahad Photography Pro", status: "On-site" },
      { category: "Sound & Light", name: "Lahore DJ Beats & Lighting", status: "Active Setup" },
    ],
    timeline: [
      { time: "08:00 AM", task: "Florist stage flower setup", status: "Completed" },
      { time: "11:00 AM", task: "Buffet tables set and cutlery audit", status: "In Progress" },
      { time: "01:30 PM", task: "Groom & Bride entry walk check", status: "Upcoming" },
      { time: "03:30 PM", task: "Dinner service starts (Chicken Qorma, Biryani, Naan)", status: "Upcoming" },
      { time: "11:00 PM", task: "Hall clearance and inventory cleanup", status: "Upcoming" },
    ],
    displays: [
      { screen: "Entrance Main Portrait", loop: "Welcome slide Ahmed & Fatima" },
      { screen: "Main Stage Backdrop", loop: "Digital Signage Animated Flowers" },
    ],
    tasks: "12 of 16 setup checklists ticked",
    payments: { total: "Rs. 4,50,000", paid: "Rs. 3,50,000", balance: "Rs. 1,00,000" }
  }

  // KPI card configs
  const kpiCards = [
    {
      id: "events",
      title: "Today's Events",
      value: "3",
      trend: "2 Ongoing",
      trendColor: "text-emerald-600 dark:text-emerald-400 font-bold",
      icon: CalendarIcon,
      bgColor: "bg-[#E6F0EC]",
      iconColor: "text-[#0F5B3E]",
    },
    {
      id: "revenue",
      title: "This Month Revenue",
      value: "Rs. 2,45,000",
      trend: "↑ 28% from last month",
      trendColor: "text-indigo-600 font-bold",
      icon: Wallet,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      id: "occupancy",
      title: "Occupancy Rate",
      value: "78%",
      trend: "↑ 12% from last month",
      trendColor: "text-amber-600 font-bold",
      icon: PieChart,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      id: "quotes",
      title: "Pending Quotations",
      value: "18",
      trend: "↑ 5 new today",
      trendColor: "text-[#D9467A] font-bold",
      icon: FileText,
      bgColor: "bg-rose-50",
      iconColor: "text-[#D9467A]",
    },
    {
      id: "bookings",
      title: "Active Bookings",
      value: "24",
      trend: "↑ 6 new this week",
      trendColor: "text-blue-600 font-bold",
      icon: Inbox,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: "leads",
      title: "New Leads",
      value: "32",
      trend: "↑ 15 new this week",
      trendColor: "text-emerald-600 font-bold",
      icon: Users,
      bgColor: "bg-[#E6F0EC]",
      iconColor: "text-[#0F5B3E]",
    },
  ]

  // Mock Calendar dates mapping for May 2025
  const calendarDates = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1
    let status: "confirmed" | "tentative" | "blocked" | "none" = "none"
    if ([2, 3, 9, 10, 16, 17, 20, 23, 24, 30, 31].includes(day)) status = "confirmed"
    else if ([5, 6, 13, 22, 29].includes(day)) status = "tentative"
    else if ([1, 8, 15, 28].includes(day)) status = "blocked"

    return { day, status }
  })

  // Quick actions array
  const quickActions = [
    { label: "New Booking", href: "/business/venues/calendar", icon: CalendarDays, color: "bg-emerald-50 text-[#0F5B3E] hover:bg-emerald-100/50" },
    { label: "New Quotation", href: "/business/venues/quotes", icon: FileText, color: "bg-blue-50 text-blue-600 hover:bg-blue-100/50" },
    { label: "New Event", href: "/business/venues/events", icon: Sparkles, color: "bg-rose-50 text-[#D9467A] hover:bg-rose-100/50" },
    { label: "Add Customer", href: "/business/venues/leads", icon: Users, color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100/50" },
    { label: "Create Invoice", href: "/business/venues/quotes?tab=invoices", icon: Wallet, color: "bg-amber-50 text-amber-600 hover:bg-amber-100/50" },
    { label: "Add Task", href: "/business/venues/operations", icon: CheckCircle, color: "bg-purple-50 text-purple-600 hover:bg-purple-100/50" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top executive summary KPI rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((card) => (
          <div key={card.id} className="p-4 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[20px] shadow-sm flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{card.title}</span>
              <h3 className="text-[19px] font-black text-gray-900 dark:text-white leading-none mt-1">{card.value}</h3>
              <span className={`text-[9.5px] mt-1.5 leading-none ${card.trendColor}`}>
                {card.trend}
              </span>
            </div>
            <div className={`w-9.5 h-9.5 rounded-xl ${card.bgColor} flex items-center justify-center ${card.iconColor} shrink-0`}>
              <card.icon className="w-4.5 h-4.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Activity, Calendar, and Revenue widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Today's Venue Activity */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Today's Venue Activity</h3>
              <button className="text-[10px] font-bold px-2 py-0.5 border border-[#ECE7DF] rounded-lg text-gray-500 hover:bg-gray-50">View Timeline</button>
            </div>
            
            {/* Timeline vertical chain */}
            <div className="space-y-3.5 my-2 pl-2">
              <div className="flex gap-3 text-[11px] relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 flex items-center justify-center shrink-0 z-10" />
                  <div className="w-0.5 h-12 bg-gray-200" />
                </div>
                <div className="flex-1 text-left pb-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-400">08:00 AM</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-extrabold uppercase">Completed</span>
                  </div>
                  <h4 className="font-black text-gray-800 text-[11.5px] mt-0.5">Event Setup</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">Wedding - Ahmed & Fatima</p>
                </div>
              </div>

              <div className="flex gap-3 text-[11px] relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100 flex items-center justify-center shrink-0 z-10" />
                  <div className="w-0.5 h-12 bg-gray-200" />
                </div>
                <div className="flex-1 text-left pb-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-400">11:00 AM</span>
                    <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md font-extrabold uppercase">In Progress</span>
                  </div>
                  <h4 className="font-black text-gray-800 text-[11.5px] mt-0.5">Guest Arrival</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">Wedding - Ahmed & Fatima</p>
                </div>
              </div>

              <div className="flex gap-3 text-[11px] relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-100 flex items-center justify-center shrink-0 z-10" />
                  <div className="w-0.5 h-12 bg-gray-200" />
                </div>
                <div className="flex-1 text-left pb-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-400">01:30 PM</span>
                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-extrabold uppercase">Upcoming</span>
                  </div>
                  <h4 className="font-black text-gray-800 text-[11.5px] mt-0.5">Ceremony</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">Wedding - Ahmed & Fatima</p>
                </div>
              </div>

              <div className="flex gap-3 text-[11px] relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100 flex items-center justify-center shrink-0 z-10" />
                  <div className="w-0.5 h-10 bg-gray-200" />
                </div>
                <div className="flex-1 text-left pb-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-400">03:30 PM</span>
                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-extrabold uppercase">Upcoming</span>
                  </div>
                  <h4 className="font-black text-gray-800 text-[11.5px] mt-0.5">Dinner</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">Wedding - Ahmed & Fatima</p>
                </div>
              </div>

              <div className="flex gap-3 text-[11px] relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-100 flex items-center justify-center shrink-0 z-10" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-400">11:00 PM</span>
                    <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md font-extrabold uppercase">Upcoming</span>
                  </div>
                  <h4 className="font-black text-gray-800 text-[11.5px] mt-0.5">Cleanup</h4>
                  <p className="text-[10px] text-gray-400 font-semibold">Wedding - Ahmed & Fatima</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget 2: Booking Calendar preview */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Booking Calendar</h3>
              <span className="text-[10.5px] font-extrabold text-gray-500">May 2025</span>
            </div>

            {/* Week header */}
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-extrabold text-gray-400 uppercase py-2 border-b border-gray-100">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10.5px] font-extrabold mt-2">
              {/* Offset empty slots for May 2025 starting Thursday */}
              <span className="text-gray-200">27</span>
              <span className="text-gray-200">28</span>
              <span className="text-gray-200">29</span>
              <span className="text-gray-200">30</span>

              {calendarDates.map(({ day, status }) => {
                const isSelected = day === selectedDate
                return (
                  <div 
                    key={day} 
                    onClick={() => setSelectedDate(day)}
                    className={`h-7 w-full flex flex-col items-center justify-between rounded-lg cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-[#0F5B3E] text-white shadow-xs" 
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="pt-0.5 text-[10px] font-black">{day}</span>
                    {/* Status dot indicator */}
                    <div className="flex gap-0.5 pb-1 justify-center">
                      {status === "confirmed" && <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-emerald-500"}`} />}
                      {status === "tentative" && <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-amber-500"}`} />}
                      {status === "blocked" && <span className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-rose-500"}`} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Calendar Color Legend */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-around text-[9.5px] font-extrabold text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Confirmed</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Tentative</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Blocked</span>
          </div>
        </div>

        {/* Widget 3: Revenue Overview */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Revenue Overview</h3>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#ECE7DF] rounded-lg text-[10px] font-bold text-gray-600 cursor-pointer">
                <span>This Month</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col items-start leading-none mb-4">
              <span className="text-[20px] font-black text-gray-950">Rs. 2,45,000</span>
              <span className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-1">↑ 28% <span className="text-gray-400 font-semibold">from last month</span></span>
            </div>

            {/* Line Chart path diagram SVG */}
            <div className="relative w-full h-[110px] flex flex-col justify-end mt-2">
              <svg className="absolute inset-0 h-[90px] w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="venueRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F5B3E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0F5B3E" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 80 Q 20 60, 30 70 T 60 50 T 80 20 T 100 40 L 100 100 L 0 100 Z" fill="url(#venueRevenueGradient)" />
                <path d="M 0 80 Q 20 60, 30 70 T 60 50 T 80 20 T 100 40" fill="none" stroke="#0F5B3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* X axis */}
              <div className="w-full flex justify-between text-[9px] font-bold text-gray-400 pt-1.5 pl-1.5 border-t border-gray-100">
                <span>May 1</span>
                <span>May 8</span>
                <span>May 15</span>
                <span>May 22</span>
                <span>May 29</span>
              </div>
            </div>
          </div>

          {/* Revenue split stats */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-left">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Total Booked</span>
              <span className="text-[12px] font-black text-gray-900 mt-1 leading-none">24 <span className="text-emerald-600 text-[9px] font-bold">↑ 14%</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Advance Rec.</span>
              <span className="text-[12px] font-black text-gray-900 mt-1 leading-none">Rs. 1.8L <span className="text-emerald-600 text-[9px] font-bold">↑ 32%</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Balance Pen.</span>
              <span className="text-[12px] font-black text-gray-900 mt-1 leading-none">Rs. 65k <span className="text-rose-600 text-[9px] font-bold">↓ 8%</span></span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Occupancy, Upcoming Events, and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Occupancy Analytics */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Occupancy Analytics</h3>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 border border-[#ECE7DF] rounded-lg text-[10px] font-bold text-gray-600 cursor-pointer">
                <span>This Month</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 my-2">
              {/* Donut Chart SVG */}
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" fill="transparent" stroke="#F1EFE9" strokeWidth="12" />
                  {/* Occupied (78%) - Green - length = 226.2 * 0.78 = 176.4 */}
                  <circle cx="50" cy="50" r="36" fill="transparent" stroke="#0F5B3E" strokeWidth="12" strokeDasharray="176.4 226.2" strokeDashoffset="0" />
                  {/* Available (17%) - Yellow - length = 226.2 * 0.17 = 38.4 - offset = -176.4 */}
                  <circle cx="50" cy="50" r="36" fill="transparent" stroke="#EAB308" strokeWidth="12" strokeDasharray="38.4 226.2" strokeDashoffset="-176.4" />
                  {/* Blocked (5%) - Red - length = 226.2 * 0.05 = 11.3 - offset = -214.8 */}
                  <circle cx="50" cy="50" r="36" fill="transparent" stroke="#D9467A" strokeWidth="12" strokeDasharray="11.3 226.2" strokeDashoffset="-214.8" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[19px] font-black text-gray-900 leading-none">78%</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">Occupied</span>
                </div>
              </div>

              {/* Legend Column */}
              <div className="flex-1 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F5B3E] shrink-0" />
                    <span className="text-gray-500">Occupied</span>
                  </div>
                  <span className="text-gray-900 font-black">78%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-gray-500">Available</span>
                  </div>
                  <span className="text-gray-900 font-black">17%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D9467A] shrink-0" />
                    <span className="text-gray-500">Blocked</span>
                  </div>
                  <span className="text-gray-900 font-black">5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats boxes */}
          <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3.5">
            <div className="bg-[#FAF8F5] p-2.5 rounded-xl text-left border border-[#ECE7DF]/50">
              <span className="text-[8.5px] font-bold text-gray-400 uppercase block tracking-wider leading-none">Peak Booking Days</span>
              <span className="text-[11.5px] font-black text-gray-900 mt-1.5 block leading-none">May 24, 25, 31</span>
            </div>
            <div className="bg-[#FAF8F5] p-2.5 rounded-xl text-left border border-[#ECE7DF]/50 flex items-center justify-between">
              <div>
                <span className="text-[8.5px] font-bold text-gray-400 uppercase block tracking-wider leading-none">Most Booked Hall</span>
                <span className="text-[11.5px] font-black text-gray-950 mt-1.5 block leading-none">Royal Hall</span>
              </div>
              <span className="w-6 h-6 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </span>
            </div>
          </div>
        </div>

        {/* Widget 2: Upcoming Events */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Upcoming Events</h3>
              <button 
                onClick={() => router.push("/business/venues/events")}
                className="text-[10px] font-bold text-gray-500 hover:text-gray-800"
              >
                View All
              </button>
            </div>

            {/* List with Unsplash previews */}
            <div className="space-y-3">
              {/* Event 1 - Ahmed Fatima */}
              <div 
                onClick={() => setSelectedEventId("EV-AhmedFatima")}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-[#ECE7DF]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=100" alt="Wedding" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11.5px] font-black text-gray-900">Ahmed & Fatima Wedding</span>
                    <span className="text-[9.5px] text-gray-400 font-bold mt-1">Royal Hall • May 20, 2025 • 800 Guests</span>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">Today</span>
              </div>

              {/* Event 2 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=100" alt="Engagement" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11.5px] font-black text-gray-900">Ali & Sara Engagement</span>
                    <span className="text-[9.5px] text-gray-400 font-bold mt-1">Crystal Hall • May 21, 2025 • 300 Guests</span>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 shrink-0">Tomorrow</span>
              </div>

              {/* Event 3 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=100" alt="Dinner" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11.5px] font-black text-gray-900">Company Annual Dinner</span>
                    <span className="text-[9.5px] text-gray-400 font-bold mt-1">Garden Lawn • May 22, 2025 • 250 Guests</span>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">In 2 Days</span>
              </div>

              {/* Event 4 */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-lg object-cover shrink-0" src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=100" alt="Dholki" />
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11.5px] font-black text-gray-900">Usman Dholki Night</span>
                    <span className="text-[9.5px] text-gray-400 font-bold mt-1">Pearl Hall • May 23, 2025 • 150 Guests</span>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 shrink-0">In 3 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Widget 3: Recent Bookings */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Recent Bookings</h3>
              <span className="text-[10px] font-bold text-gray-400 cursor-pointer">View All</span>
            </div>

            <div className="space-y-3">
              {/* Client 1 */}
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <div className="flex items-center gap-2.5">
                  <img className="w-7 h-7 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100" alt="Client" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-gray-900">Hassan Family Wedding</span>
                    <span className="text-[9.5px] text-gray-400">Royal Hall • Jun 15, 2026</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">Rs. 3,20,000</span>
                  <span className="text-[8.5px] font-extrabold px-1 rounded bg-emerald-50 text-emerald-700">Confirmed</span>
                </div>
              </div>

              {/* Client 2 */}
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <div className="flex items-center gap-2.5">
                  <img className="w-7 h-7 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" alt="Client" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-gray-900">Zainab & Bilal Wedding</span>
                    <span className="text-[9.5px] text-gray-400">Crystal Hall • Jul 10, 2026</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">Rs. 2,80,000</span>
                  <span className="text-[8.5px] font-extrabold px-1 rounded bg-emerald-50 text-emerald-700">Confirmed</span>
                </div>
              </div>

              {/* Client 3 */}
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <div className="flex items-center gap-2.5">
                  <img className="w-7 h-7 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" alt="Client" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-gray-900">Raza Birthday Event</span>
                    <span className="text-[9.5px] text-gray-400">Garden Lawn • May 30, 2025</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">Rs. 85,000</span>
                  <span className="text-[8.5px] font-extrabold px-1 rounded bg-amber-50 text-amber-700">Tentative</span>
                </div>
              </div>

              {/* Client 4 */}
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <div className="flex items-center gap-2.5">
                  <img className="w-7 h-7 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" alt="Client" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-gray-900">ABC Corporate Event</span>
                    <span className="text-[9.5px] text-gray-400">Pearl Hall • Jun 5, 2026</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">Rs. 1,20,000</span>
                  <span className="text-[8.5px] font-extrabold px-1 rounded bg-emerald-50 text-emerald-700">Confirmed</span>
                </div>
              </div>

              {/* Client 5 */}
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <div className="flex items-center gap-2.5">
                  <img className="w-7 h-7 rounded-full object-cover shrink-0" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=100" alt="Client" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-gray-900">Farhan Mehndi Event</span>
                    <span className="text-[9.5px] text-gray-400">Royal Lawn • Jun 12, 2026</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">Rs. 95,000</span>
                  <span className="text-[8.5px] font-extrabold px-1 rounded bg-amber-50 text-amber-700">Tentative</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Quick Actions, Pending Tasks, and Recent Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Quick Actions menu */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[260px]">
          <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider text-left mb-3">Quick Actions</h3>
          
          <div className="grid grid-cols-3 gap-3 my-auto">
            {quickActions.map((action) => (
              <button 
                key={action.label}
                onClick={() => router.push(action.href)}
                className={`p-3 rounded-2xl ${action.color} border border-[#ECE7DF]/40 transition-all flex flex-col items-center justify-center gap-2 text-center shadow-xs`}
              >
                <div className="w-8 h-8 rounded-xl bg-white/60 dark:bg-black/10 flex items-center justify-center shrink-0">
                  <action.icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[9.5px] font-extrabold leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Widget 2: Pending Tasks checklist */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Pending Tasks</h3>
              <span className="text-[9.5px] text-[#0F5B3E] font-bold">
                {tasks.filter(t => !t.done).length} Remaining
              </span>
            </div>

            <div className="space-y-3.5 my-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between text-[11px] font-semibold">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input 
                      type="checkbox" 
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4 text-[#0F5B3E] border-[#ECE7DF] rounded-md focus:ring-[#0F5B3E]"
                    />
                    <span className={`truncate text-[11.5px] text-left text-gray-800 ${task.done ? "line-through text-gray-400 font-medium" : "font-bold"}`}>
                      {task.text}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase shrink-0 ${
                    task.priority === "High" 
                      ? "bg-rose-50 text-rose-700" 
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => router.push("/business/venues/operations")}
            className="w-full py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10.5px] font-bold text-gray-600 transition-colors"
          >
            Open Tasks Center
          </button>
        </div>

        {/* Widget 3: Live Alerts / Notification Logger */}
        <div className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">Recent Notifications</h3>
              <button 
                onClick={() => router.push("/business/venues/notifications")}
                className="text-[10px] font-bold text-gray-500 hover:text-gray-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-3.5 my-2 text-left">
              <div className="flex gap-2.5 text-[11px] font-semibold">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <Inbox className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-gray-800 font-bold truncate">New booking request received</span>
                  <span className="text-[9.5px] text-gray-400 font-medium mt-0.5">Ahmed Wedding • 2 minutes ago</span>
                </div>
              </div>

              <div className="flex gap-2.5 text-[11px] font-semibold">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-gray-800 font-bold truncate">Payment of Rs. 50,000 received</span>
                  <span className="text-[9.5px] text-gray-400 font-medium mt-0.5">Hassan Walima • 1 hour ago</span>
                </div>
              </div>

              <div className="flex gap-2.5 text-[11px] font-semibold">
                <div className="w-6 h-6 rounded-lg bg-[#E6F0EC] flex items-center justify-center text-[#0F5B3E] shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-gray-800 font-bold truncate">Event Ahmed & Fatima timeline updated</span>
                  <span className="text-[9.5px] text-gray-400 font-medium mt-0.5">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* EVENT COMMAND CENTER MODAL - Ahmed & Fatima Wedding */}
      {selectedEventId === "EV-AhmedFatima" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white border border-[#ECE7DF] rounded-[32px] p-6 shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Close button */}
            <button 
              onClick={() => setSelectedEventId(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-100"
            >
              <X className="w-4.5 h-4.5 text-gray-500" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-gray-100 pb-5 text-left">
              <span className="text-[9.5px] font-extrabold tracking-widest text-[#0F5B3E] uppercase bg-[#E6F0EC] px-3 py-1 rounded-full">
                Active Event Workspace • ID: {eventDetails.id}
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-3">{eventDetails.title}</h2>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 mt-2">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0F5B3E]" /> {eventDetails.hall}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5 text-blue-500" /> {eventDetails.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#D9467A]" /> {eventDetails.guests}</span>
              </div>
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-left">
              
              {/* Column 1: Timeline & Setup */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0F5B3E]" /> Real-time Event Timeline
                </h3>
                <div className="p-4 bg-[#FAF8F5] border border-[#ECE7DF]/60 rounded-2xl space-y-3.5">
                  {eventDetails.timeline.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start text-[11px] font-semibold">
                      <div className="flex gap-2">
                        <span className="text-gray-400 font-bold w-14 shrink-0">{item.time}</span>
                        <span className="text-gray-800 font-medium">{item.task}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                        item.status === "Completed" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : item.status === "In Progress" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Vendors */}
                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2 pt-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Assigned Vendors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eventDetails.vendors.map((vendor, idx) => (
                    <div key={idx} className="p-3 bg-white border border-[#ECE7DF]/80 rounded-xl flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{vendor.category}</span>
                        <span className="text-[11.5px] font-bold text-gray-900 mt-0.5">{vendor.name}</span>
                      </div>
                      <span className="text-[9.5px] text-[#0F5B3E] font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F5B3E]" /> {vendor.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Signage, guest lists, and payment metrics */}
              <div className="space-y-4">
                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-purple-600" /> Operations Desk
                </h3>
                
                <div className="space-y-3">
                  {/* Payments summary */}
                  <div className="p-4 bg-white border border-[#ECE7DF] rounded-2xl flex flex-col gap-1.5">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Payment Status</span>
                    <div className="flex justify-between items-center text-[11px] font-semibold pt-1">
                      <span className="text-gray-500">Contract Total:</span>
                      <span className="text-gray-900 font-bold">{eventDetails.payments.total}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold">
                      <span className="text-gray-500">Paid:</span>
                      <span className="text-emerald-600 font-bold">{eventDetails.payments.paid}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-semibold border-t border-gray-100 pt-1.5">
                      <span className="text-gray-500 font-bold">Outstanding:</span>
                      <span className="text-rose-600 font-black">{eventDetails.payments.balance}</span>
                    </div>
                  </div>

                  {/* Displays OS hooks */}
                  <div className="p-4 bg-white border border-[#ECE7DF] rounded-2xl flex flex-col gap-1.5 text-[11px] font-semibold">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Displays OS Loop Control</span>
                    {eventDetails.displays.map((scr, idx) => (
                      <div key={idx} className="flex justify-between items-center pt-1 border-b border-gray-50 pb-1.5">
                        <span className="text-gray-900 font-bold">{scr.screen}:</span>
                        <span className="text-purple-600 font-medium truncate max-w-[120px]">{scr.loop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer actions */}
            <div className="border-t border-gray-100 pt-5 mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedEventId(null)}
                className="px-4 py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[11px] font-bold text-gray-700 transition-colors"
              >
                Close Workspace
              </button>
              <button 
                onClick={() => {
                  setSelectedEventId(null)
                  router.push("/business/venues/events")
                }}
                className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl text-[11px] font-bold transition-all"
              >
                Open Event Timeline Page
              </button>
            </div>
          </Card>
        </div>
      )}

    </div>
  )
}
