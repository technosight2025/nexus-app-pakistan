"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp, CalendarCheck, Users, Banknote, Building2, 
  Sparkles, ChevronRight, Phone, MessageSquare, Clock, 
  CheckCircle2, Circle, ArrowUpRight, Eye,
  Star, Calendar, Flame, Target, Zap, Bell, MapPin,
  ThermometerSun, DollarSign, BarChart3, UserCheck
} from "lucide-react"
import Link from "next/link"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

// ——— Compact Mock Data ———

const REVENUE = [
  { m: "J", v: 800 }, { m: "F", v: 1200 }, { m: "M", v: 950 }, { m: "A", v: 1800 },
  { m: "M", v: 1400 }, { m: "J", v: 2100 }, { m: "J", v: 1900 }, { m: "A", v: 2400 },
  { m: "S", v: 2800 }, { m: "O", v: 3100 }, { m: "N", v: 2700 }, { m: "D", v: 3500 },
]

const EVENTS = [
  { id: 1, name: "Raza-Fatima Wedding", type: "Wedding", hall: "Grand Ballroom", guests: 450, value: "1.2M", days: 2 },
  { id: 2, name: "TechCorp Gala", type: "Corporate", hall: "Crystal Marquee", guests: 150, value: "450K", days: 5 },
  { id: 3, name: "Zara Birthday", type: "Birthday", hall: "Royal Gardens", guests: 80, value: "200K", days: 9 },
]

const TASKS = [
  { id: 1, text: "Follow up Ahmed Raza — decor package", p: "high" },
  { id: 2, text: "Send catering menu to TechCorp", p: "high" },
  { id: 3, text: "Review photographer submissions", p: "med" },
  { id: 4, text: "Update Jan availability", p: "low" },
]

const HALLS = [
  { name: "Grand Ballroom", cap: 600, status: "Live", occ: 92, color: "bg-rose-500" },
  { name: "Crystal Marquee", cap: 800, status: "Free", occ: 0, color: "bg-emerald-500" },
  { name: "Royal Gardens", cap: 1200, status: "Setup", occ: 45, color: "bg-amber-500" },
]

const ACTIVITY = [
  { text: "New lead: Ayesha — Wedding, 350 guests", time: "12m", icon: "lead" },
  { text: "Payment: PKR 250K from Zara Khan", time: "1h", icon: "pay" },
  { text: "Proposal sent to TechCorp Gala", time: "3h", icon: "prop" },
  { text: "Site visit: Ahmed toured Ballroom", time: "1d", icon: "visit" },
]

const LEADS_FUNNEL = [
  { stage: "New", count: 5, pct: 42, color: "bg-blue-500" },
  { stage: "Contacted", count: 3, pct: 25, color: "bg-amber-500" },
  { stage: "Proposal", count: 2, pct: 17, color: "bg-indigo-500" },
  { stage: "Won", count: 2, pct: 16, color: "bg-emerald-500" },
]

export function VenueDashboardV2() {
  const [greeting, setGreeting] = useState("")
  const [done, setDone] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const h = new Date().getHours()
    setGreeting(h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening")
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-[#FAF8F5]" />

  const score = 87

  return (
    <div className="space-y-3 pb-6 max-w-[1440px] mx-auto text-[#1A1A1A]">

      {/* ═══ ROW 1: KPI Cards ═══ */}
      <div id="tour-venue-kpi" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Revenue", value: "3.5M", sub: "+29.6%", icon: Banknote, bg: "from-emerald-50 to-teal-50/50", ib: "bg-emerald-100 text-emerald-700" },
          { label: "Active Leads", value: "12", sub: "+3 this week", icon: Users, bg: "from-blue-50 to-indigo-50/50", ib: "bg-blue-100 text-blue-700" },
          { label: "Events Booked", value: "4", sub: "Next: 2d", icon: CalendarCheck, bg: "from-amber-50 to-orange-50/50", ib: "bg-amber-100 text-amber-700" },
          { label: "Conversion", value: "24%", sub: "Target 25%", icon: TrendingUp, bg: "from-rose-50 to-pink-50/50", ib: "bg-rose-100 text-rose-700" },
        ].map((k, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className={`bg-gradient-to-br ${k.bg} rounded-2xl p-4 border border-white shadow-sm flex flex-col justify-between cursor-default`}
          >
            <div className={`p-1.5 rounded-lg ${k.ib} w-max shadow-sm mb-2`}><k.icon className="w-4 h-4" /></div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{k.label}</p>
            <p className="text-2xl font-black tracking-tight mt-0.5">PKR {k.value}</p>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5"><ArrowUpRight className="w-3 h-3" />{k.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ═══ ROW 2: Chart + Funnel + Score ═══ */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Mini Revenue Sparkline */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-sm font-black text-[#1A1A1A]">Revenue Trend</h3>
              <p className="text-[10px] text-slate-400 font-medium">12-month performance</p>
            </div>
            <p className="text-lg font-black text-[#0A3B2A]">22.6M</p>
          </div>
          <div className="h-[100px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A3B2A" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0A3B2A" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#0A3B2A" strokeWidth={2.5} fill="url(#rg)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Funnel */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <h3 className="text-sm font-black text-[#1A1A1A] mb-3">Lead Funnel</h3>
          <div className="space-y-2.5">
            {LEADS_FUNNEL.map(f => (
              <div key={f.stage}>
                <div className="flex justify-between text-[10px] font-bold mb-0.5">
                  <span className="text-slate-600">{f.stage}</span>
                  <span className="text-slate-400">{f.count} leads ({f.pct}%)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.pct}%` }} transition={{ duration: 0.8 }} className={`h-full ${f.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nexus Score + Quick Stats */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#sg)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${score * 2.51} 251`} />
              <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#34D399" /><stop offset="100%" stopColor="#C9A227" /></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">{score}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Score</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-center mt-1">
            {[
              { v: "4.8", l: "Rating", ic: Star, c: "text-amber-500" },
              { v: "2.4K", l: "Views", ic: Eye, c: "text-blue-500" },
              { v: "12m", l: "Response", ic: Clock, c: "text-emerald-500" },
              { v: "18%", l: "Repeat", ic: UserCheck, c: "text-purple-500" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <s.ic className={`w-3 h-3 ${s.c}`} />
                <div className="text-left">
                  <p className="text-xs font-black leading-none">{s.v}</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase">{s.l}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ROW 3: Upcoming Events + Tasks + Activity ═══ */}
      <div className="grid grid-cols-12 gap-3">

        {/* Upcoming Events */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black">Upcoming Events</h3>
            <Link href="/dashboard/vendor/bookings" className="text-[10px] font-bold text-[#0A3B2A] hover:underline flex items-center gap-0.5">All <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-2">
            {EVENTS.map(ev => (
              <div key={ev.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#0A3B2A]/20 hover:shadow-sm transition-all cursor-pointer group">
                {/* Countdown */}
                <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                  ev.days <= 3 ? 'bg-rose-100 text-rose-700' : ev.days <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className="text-sm font-black leading-none">{ev.days}</span>
                  <span className="text-[7px] font-bold uppercase">days</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#1A1A1A] truncate group-hover:text-[#0A3B2A] transition-colors">{ev.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{ev.hall} • {ev.guests} guests</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-[#0A3B2A]">{ev.value}</p>
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                    ev.type === 'Wedding' ? 'bg-pink-100 text-pink-700' : ev.type === 'Corporate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>{ev.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-black">Today&apos;s Priorities</h3>
            <span className="text-[10px] font-bold text-slate-400">{done.length}/{TASKS.length}</span>
          </div>
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-3">
            <motion.div className="h-full bg-[#0A3B2A] rounded-full" animate={{ width: `${(done.length / TASKS.length) * 100}%` }} />
          </div>
          <div className="space-y-1.5 flex-1">
            {TASKS.map(t => {
              const isDone = done.includes(t.id)
              return (
                <button key={t.id} onClick={() => setDone(p => p.includes(t.id) ? p.filter(x => x !== t.id) : [...p, t.id])} 
                  className={`w-full flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all text-xs ${
                    isDone ? 'bg-emerald-50/50 border-emerald-100 opacity-50' : 'bg-white border-slate-100 hover:border-[#0A3B2A]/20'
                  }`}>
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                  <span className={`flex-1 font-semibold leading-tight ${isDone ? 'line-through text-slate-400' : ''}`}>{t.text}</span>
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded shrink-0 ${
                    t.p === 'high' ? 'bg-rose-100 text-rose-600' : t.p === 'med' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
                  }`}>{t.p}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div id="tour-venue-activity" className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <h3 className="text-sm font-black mb-3">Activity</h3>
          <div className="space-y-1 flex-1">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  a.icon === 'lead' ? 'bg-blue-100 text-blue-600' : a.icon === 'pay' ? 'bg-emerald-100 text-emerald-600' : a.icon === 'prop' ? 'bg-amber-100 text-amber-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {a.icon === 'lead' ? <Users className="w-3 h-3" /> : a.icon === 'pay' ? <Banknote className="w-3 h-3" /> : a.icon === 'prop' ? <MessageSquare className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[#1A1A1A] leading-snug">{a.text}</p>
                  <p className="text-[9px] font-bold text-slate-300 mt-0.5 uppercase">{a.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ROW 4: Halls Console (compact horizontal) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        {HALLS.map((h, i) => (
          <div key={i} className="col-span-12 sm:col-span-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#FAF8F5] text-[#0A3B2A] rounded-lg"><Building2 className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs font-black">{h.name}</p>
                  <p className="text-[9px] text-slate-400 font-medium">Max {h.cap}</p>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                h.status === 'Live' ? 'bg-rose-100 text-rose-700' : h.status === 'Free' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>{h.status}</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>Occupancy</span><span className="text-[#0A3B2A]">{h.occ}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${h.occ}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.2 }} className={`h-full ${h.color} rounded-full`} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
