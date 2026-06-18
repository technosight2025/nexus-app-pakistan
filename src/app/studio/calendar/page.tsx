"use client"

import { Card } from "@/components/ui/card"
import { Plus, ChevronLeft, ChevronRight, Camera, Video, Users } from "lucide-react"

export default function CalendarPage() {
  const days = [
    { date: 1, isCurrentMonth: true, events: [] },
    { date: 2, isCurrentMonth: true, events: [] },
    { date: 3, isCurrentMonth: true, events: [] },
    { date: 4, isCurrentMonth: true, events: [] },
    { date: 5, isCurrentMonth: true, events: [{ title: "TechCorp Gala", time: "18:00", type: "shoot", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30" }] },
    { date: 6, isCurrentMonth: true, events: [] },
    { date: 7, isCurrentMonth: true, events: [] },
    { date: 8, isCurrentMonth: true, events: [{ title: "Ahmed Meeting", time: "14:00", type: "meeting", color: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30" }] },
    { date: 9, isCurrentMonth: true, events: [] },
    { date: 10, isCurrentMonth: true, events: [{ title: "Ali & Fatima Baraat", time: "19:00", type: "shoot", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30" }] },
    { date: 11, isCurrentMonth: true, events: [] },
    { date: 12, isCurrentMonth: true, events: [] },
    { date: 13, isCurrentMonth: true, events: [] },
    { date: 14, isCurrentMonth: true, events: [] },
    { date: 15, isCurrentMonth: true, events: [{ title: "Zainab Engagement", time: "20:00", type: "shoot", color: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30" }] },
    { date: 16, isCurrentMonth: true, events: [] },
    { date: 17, isCurrentMonth: true, events: [] },
    { date: 18, isCurrentMonth: true, events: [] },
    { date: 19, isCurrentMonth: true, events: [] },
    { date: 20, isCurrentMonth: true, events: [] },
    { date: 21, isCurrentMonth: true, events: [] },
    { date: 22, isCurrentMonth: true, events: [] },
    { date: 23, isCurrentMonth: true, events: [] },
    { date: 24, isCurrentMonth: true, events: [] },
    { date: 25, isCurrentMonth: true, events: [] },
    { date: 26, isCurrentMonth: true, events: [] },
    { date: 27, isCurrentMonth: true, events: [] },
    { date: 28, isCurrentMonth: true, events: [] },
    { date: 29, isCurrentMonth: true, events: [] },
    { date: 30, isCurrentMonth: true, events: [] },
    { date: 31, isCurrentMonth: true, events: [] },
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Schedule & Calendar
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage your shoots, meetings, and team availability.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm">
            Sync Calendar
          </button>
          <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Main Calendar View */}
        <Card className="flex-1 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 flex flex-col">
          {/* Calendar Header */}
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">October 2026</h2>
              <div className="flex bg-gray-100 dark:bg-black/40 rounded-full p-1">
                <button className="px-4 py-1.5 bg-white dark:bg-white/10 text-gray-900 dark:text-white rounded-full text-xs font-bold shadow-sm">Month</button>
                <button className="px-4 py-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-bold transition-colors">Week</button>
                <button className="px-4 py-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-bold transition-colors">Day</button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-200 dark:border-white/10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 border border-gray-200 dark:border-white/10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-transparent">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/10 shrink-0">
              {weekDays.map(day => (
                <div key={day} className="py-3 text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>
            {/* Days Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-gray-100 dark:bg-white/5 gap-[1px]">
              {/* Padding days from previous month to align October 1st to Thursday */}
              <div className="bg-white dark:bg-black/20 p-2 opacity-50"></div>
              <div className="bg-white dark:bg-black/20 p-2 opacity-50"></div>
              <div className="bg-white dark:bg-black/20 p-2 opacity-50"></div>
              <div className="bg-white dark:bg-black/20 p-2 opacity-50"></div>
              {days.map((day, i) => (
                <div key={i} className={`bg-white dark:bg-black/20 p-2 ${day.isCurrentMonth ? '' : 'opacity-50'} hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group flex flex-col`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
                      day.date === 10 ? 'bg-[#0A3B2A] dark:bg-cyan-500 text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {day.date}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 no-scrollbar">
                    {day.events.map((event, j) => (
                      <div key={j} className={`px-2 py-1 text-xs font-bold rounded-md border ${event.color} truncate`}>
                        {event.time} - {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Padding days for end of month */}
              <div className="bg-white dark:bg-black/20 p-2 opacity-50"></div>
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <Card className="hidden lg:flex w-80 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] flex-col dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shrink-0">
          <div className="p-6 border-b border-gray-100 dark:border-white/10">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Upcoming Schedule</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex flex-col items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                  <span className="text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-lg font-black leading-none">10</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Ali & Fatima Baraat</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1"><Camera className="w-3 h-3" /> 19:00 - Serena Hotel</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex flex-col items-center justify-center text-purple-700 dark:text-purple-400 shrink-0 border border-purple-100 dark:border-purple-500/20">
                  <span className="text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-lg font-black leading-none">12</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Team Meeting</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1"><Users className="w-3 h-3" /> 11:00 - Studio</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex flex-col items-center justify-center text-blue-700 dark:text-blue-400 shrink-0 border border-blue-100 dark:border-blue-500/20">
                  <span className="text-[10px] font-bold uppercase">Oct</span>
                  <span className="text-lg font-black leading-none">15</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Zainab Engagement</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1"><Video className="w-3 h-3" /> 20:00 - Pearl Continental</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Calendars</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A3B2A] focus:ring-[#0A3B2A] dark:bg-black/40 dark:border-white/20 dark:checked:bg-cyan-500 dark:focus:ring-cyan-500" defaultChecked />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Shoots</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A3B2A] focus:ring-[#0A3B2A] dark:bg-black/40 dark:border-white/20 dark:checked:bg-cyan-500 dark:focus:ring-cyan-500" defaultChecked />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meetings</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A3B2A] focus:ring-[#0A3B2A] dark:bg-black/40 dark:border-white/20 dark:checked:bg-cyan-500 dark:focus:ring-cyan-500" defaultChecked />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Deadlines</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0A3B2A] focus:ring-[#0A3B2A] dark:bg-black/40 dark:border-white/20 dark:checked:bg-cyan-500 dark:focus:ring-cyan-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Team Leaves</span>
              </label>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}
