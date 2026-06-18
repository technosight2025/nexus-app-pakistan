"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar, CheckCircle2, Circle, Clock, Wallet, Users,
  CalendarCheck, ArrowRight, Plus, Flame, TrendingUp, Star,
  Camera, Utensils, Mic2, Car, Sparkles, ChevronRight,
  CheckCheck, AlertCircle, BellRing, CreditCard, Heart
} from "lucide-react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

// ─── Data & Types ─────────────────────────────────────────────────────────────

const SPARKLINE = [
  { v: 0 }, { v: 200000 }, { v: 500000 }, { v: 700000 },
  { v: 900000 }, { v: 1100000 }, { v: 1400000 }
]

const BOOKING_STATUS = [
  { vendor: "Venue", icon: Star, done: true, name: "Pearl Continental, ISB" },
  { vendor: "Photographer", icon: Camera, done: true, name: "Aslam Studio" },
  { vendor: "Catering", icon: Utensils, done: true, name: "Mughal Feast Co." },
  { vendor: "Entertainment", icon: Mic2, done: false, name: "Awaiting Quote" },
  { vendor: "Decorator", icon: Sparkles, done: false, name: "Not Selected" },
  { vendor: "Transport", icon: Car, done: false, name: "Not Booked" },
]

const BUDGET_CATEGORIES = [
  { name: "Venue", allocated: 1200000, spent: 400000, color: "#312E81" },
  { name: "Catering", allocated: 800000, spent: 200000, color: "#059669" },
  { name: "Photography", allocated: 300000, spent: 100000, color: "#D4AF37" },
  { name: "Decoration", allocated: 200000, spent: 0, color: "#4338ca" },
]

const ACTIVITY_FEED = [
  {
    id: 1,
    type: "booking",
    icon: CheckCircle2,
    color: "text-[#059669] bg-emerald-50",
    title: "Venue booking confirmed",
    sub: "Pearl Continental secured — PKR 4,00,000 paid",
    time: "2h ago",
  },
  {
    id: 2,
    type: "guest",
    icon: Users,
    color: "text-[#312E81] bg-indigo-50",
    title: "8 new RSVPs received",
    sub: "Ali Raza family (4) + Sana's friends (4) confirmed",
    time: "5h ago",
  },
  {
    id: 3,
    type: "payment",
    icon: CreditCard,
    color: "text-[#D4AF37] bg-amber-50",
    title: "Payment reminder",
    sub: "PKR 1,20,000 due to Aslam Studio in 3 days",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "task",
    icon: BellRing,
    color: "text-[#EF4444] bg-red-50",
    title: "Deadline approaching",
    sub: "Send digital invites — due in 4 days",
    time: "Yesterday",
  },
]

interface Task {
  id: number
  title: string
  date: string
  status: "completed" | "in-progress" | "pending"
  priority: "urgent" | "high" | "med"
}

// ─── Countdown Ring ───────────────────────────────────────────────────────────

function CountdownRing({ days, total = 365 }: { days: number; total?: number }) {
  const pct = Math.max(0, Math.min(1, 1 - days / total))
  const R = 44
  const C = 2 * Math.PI * R
  const offset = C * (1 - pct)

  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={R} stroke="#ffffff20" strokeWidth="8" fill="none" />
        <circle
          cx="50" cy="50" r={R}
          stroke="#D4AF37"
          strokeWidth="8"
          fill="none"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white font-black text-2xl leading-none">{days}</span>
        <span className="text-white/60 text-[9px] font-semibold uppercase tracking-wider">days</span>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HostV2Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [profile, setProfile] = useState({
    brideName: "Zoya Malik",
    groomName: "Ahmed Khan",
    weddingDate: "2026-11-10",
    location: "Islamabad, Pakistan",
  })
  const [totalBudget, setTotalBudget] = useState(4200000)
  const [budgetSpent, setBudgetSpent] = useState(1400000)
  const [guestsCount, setGuestsCount] = useState(285)

  useEffect(() => {
    if (typeof window === "undefined") return

    const storedProfile = localStorage.getItem("nexus_crm_wedding_profile")
    if (storedProfile) {
      try { setProfile(JSON.parse(storedProfile)) } catch (_) {}
    }
    const storedTotal = localStorage.getItem("nexus_crm_total_budget")
    if (storedTotal) {
      const n = parseInt(storedTotal)
      if (!isNaN(n)) setTotalBudget(n)
    }
    const storedBudgetList = localStorage.getItem("nexus_crm_budget_list")
    if (storedBudgetList) {
      try {
        const list = JSON.parse(storedBudgetList)
        const s = list.reduce((a: number, c: any) => a + (c.spent || 0), 0)
        if (s > 0) setBudgetSpent(s)
      } catch (_) {}
    }
    const storedGuests = localStorage.getItem("nexus_crm_guest_list")
    if (storedGuests) {
      try {
        const list = JSON.parse(storedGuests)
        const c = list.reduce((a: number, g: any) => a + (g.count || 1), 0)
        if (c > 0) setGuestsCount(c)
      } catch (_) {}
    }
    const storedTasks = localStorage.getItem("nexus_crm_tasks")
    if (storedTasks) {
      try { setTasks(JSON.parse(storedTasks)) } catch (_) {}
    } else {
      const defaults: Task[] = [
        { id: 1, title: "Finalize floral & stage decoration samples", date: "Dec 20", status: "in-progress", priority: "urgent" },
        { id: 2, title: "Send digital invites to overseas guests", date: "Dec 25", status: "pending", priority: "high" },
        { id: 3, title: "Confirm valet & logistics for Barat day", date: "Jan 5", status: "pending", priority: "high" },
        { id: 4, title: "Review Mughal Feast final menu", date: "Jan 10", status: "pending", priority: "med" },
        { id: 5, title: "Book bridal makeup & hair team", date: "Jan 15", status: "pending", priority: "med" },
      ]
      setTasks(defaults)
      localStorage.setItem("nexus_crm_tasks", JSON.stringify(defaults))
    }
  }, [])

  const getDaysLeft = () => {
    const diff = new Date(profile.weddingDate).getTime() - Date.now()
    return Math.max(0, Math.ceil(diff / 86400000))
  }

  const toggleTask = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "completed" ? ("pending" as const) : ("completed" as const) }
        : t
    )
    setTasks(updated)
    localStorage.setItem("nexus_crm_tasks", JSON.stringify(updated))
  }

  const daysLeft = getDaysLeft()
  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const pendingTasks = tasks.filter((t) => t.status !== "completed").length
  const planningPct = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0
  const bookedVendors = BOOKING_STATUS.filter((v) => v.done).length
  const budgetPct = totalBudget > 0 ? Math.round((budgetSpent / totalBudget) * 100) : 0
  const bride = profile.brideName.split(" ")[0]
  const groom = profile.groomName.split(" ")[0]

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-5">

      {/* ══════════════════════════════════════════════════════ */}
      {/* ROW 1 — HERO BANNER                                    */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#312E81] via-[#3730a3] to-[#4338ca] p-6 lg:p-8"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#D4AF37]/10 rounded-full translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* Left: Names + info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Premium Event
              </span>
              <span className="text-white/40 text-[10px] font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#F59E0B]" /> Active Planning
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-1">
              {bride} <span className="text-[#D4AF37]">&</span> {groom}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-white/70 text-[12px]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(profile.weddingDate).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-[12px]">
                <Users className="w-3.5 h-3.5" />
                <span>{guestsCount} Guests</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-5">
              <Link href="/dashboard/host/v2/planning" className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#312E81] text-[12px] font-bold rounded-xl hover:bg-white/90 transition-all shadow-sm">
                <Plus className="w-3.5 h-3.5" /> Add Task
              </Link>
              <Link href="/dashboard/host/v2/guests" className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 text-white border border-white/20 text-[12px] font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                <Users className="w-3.5 h-3.5" /> Invite Guest
              </Link>
              <Link href="/dashboard/host/v2/messages" className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 text-white border border-white/20 text-[12px] font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">
                <Heart className="w-3.5 h-3.5" /> Message Vendor
              </Link>
            </div>
          </div>

          {/* Right: Countdown Ring */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <CountdownRing days={daysLeft} />
            <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest text-center">
              Until the Big Day
            </p>
          </div>

        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ROW 2 — KPI BENTO GRID                                */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Planning Progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-[#312E81]" style={{ width: 18, height: 18 }} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">PROGRESS</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Planning</p>
            <p className="text-2xl font-black text-[#111827] leading-tight mt-0.5">{planningPct}%</p>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>{completedTasks} done</span>
              <span>{tasks.length} total</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${planningPct}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#312E81] to-[#4338ca] rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Budget Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="/dashboard/host/v2/budget"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3 hover:border-[#D4AF37]/40 hover:shadow-md transition-all group block h-full"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Wallet className="w-[18px] h-[18px] text-[#D4AF37]" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Budget Used</p>
              <p className="text-2xl font-black text-[#D4AF37] leading-tight mt-0.5">
                {(budgetSpent / 1000000).toFixed(1)}M
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">of {(totalBudget / 1000000).toFixed(1)}M · {budgetPct}% used</p>
            </div>
            <div className="h-8 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPARKLINE}>
                  <defs>
                    <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#D4AF37" strokeWidth={2} fill="url(#budgetGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Link>
        </motion.div>

        {/* Active Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Link
            href="/dashboard/host/v2/bookings"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3 hover:border-[#059669]/30 hover:shadow-md transition-all group block h-full"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CalendarCheck className="w-[18px] h-[18px] text-[#059669]" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Bookings</p>
              <p className="text-2xl font-black text-[#111827] leading-tight mt-0.5">
                <span className="text-[#059669]">{bookedVendors}</span>
                <span className="text-[14px] text-gray-400 font-medium ml-1">/ {BOOKING_STATUS.length}</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">vendors confirmed</p>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-auto">
              <div
                className="h-full bg-[#059669] rounded-full"
                style={{ width: `${(bookedVendors / BOOKING_STATUS.length) * 100}%` }}
              />
            </div>
          </Link>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/dashboard/host/v2/planning"
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-3 hover:border-[#EF4444]/20 hover:shadow-md transition-all group block h-full"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <Clock className="w-[18px] h-[18px] text-[#EF4444]" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#EF4444] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Pending Tasks</p>
              <p className="text-2xl font-black text-[#111827] leading-tight mt-0.5">
                <span className="text-[#EF4444]">{pendingTasks}</span>
                <span className="text-[14px] text-gray-400 font-medium ml-1">/ {tasks.length}</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 mt-auto">
              {tasks.filter(t => t.priority === "urgent" && t.status !== "completed").length > 0 && (
                <span className="flex items-center gap-1 bg-red-50 text-[#EF4444] text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                  <Flame className="w-2.5 h-2.5" />
                  {tasks.filter(t => t.priority === "urgent" && t.status !== "completed").length} urgent
                </span>
              )}
            </div>
          </Link>
        </motion.div>

      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ROW 3 — BOOKING STATUS + TASKS                        */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Booking Status Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-bold text-[14px] text-[#111827]">Vendor Booking Status</h3>
            <Link href="/dashboard/host/v2/bookings" className="text-[11px] font-semibold text-[#312E81] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {BOOKING_STATUS.map((v) => (
              <div key={v.vendor} className="flex items-center gap-3 px-5 py-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${v.done ? "bg-emerald-50" : "bg-gray-50"}`}>
                  <v.icon className={`w-4 h-4 ${v.done ? "text-[#059669]" : "text-gray-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[12px] font-semibold ${v.done ? "text-[#111827]" : "text-gray-400"}`}>{v.vendor}</p>
                  <p className="text-[10px] text-gray-400 truncate">{v.name}</p>
                </div>
                {v.done ? (
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0">
                    <CheckCheck className="w-2.5 h-2.5" /> Booked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0">
                    <AlertCircle className="w-2.5 h-2.5" /> Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Immediate Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-bold text-[14px] text-[#111827]">Upcoming Tasks</h3>
            <Link href="/dashboard/host/v2/planning" className="text-[11px] font-semibold text-[#312E81] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-4 space-y-2">
            {tasks.slice(0, 4).map((t) => {
              const done = t.status === "completed"
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    done ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-gray-100 hover:border-[#312E81]/20 hover:bg-indigo-50/30"
                  }`}
                >
                  {done
                    ? <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    : <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <span className={`block text-[12px] font-semibold leading-tight ${done ? "line-through text-gray-400" : "text-[#111827]"}`}>
                      {t.title}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-0.5">{t.date}</span>
                  </div>
                  <span className={`shrink-0 text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${
                    t.priority === "urgent"
                      ? "bg-rose-50 text-rose-600"
                      : t.priority === "high"
                        ? "bg-indigo-50 text-[#312E81]"
                        : "bg-amber-50 text-amber-700"
                  }`}>
                    {t.priority}
                  </span>
                </button>
              )
            })}
            {tasks.length === 0 && (
              <p className="text-center text-[12px] text-gray-400 py-8">No tasks yet. Start planning!</p>
            )}
          </div>
        </motion.div>

      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/* ROW 4 — BUDGET BARS + ACTIVITY FEED                   */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Budget Category Bars */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)] p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[14px] text-[#111827]">Budget by Category</h3>
            <Link href="/dashboard/host/v2/budget" className="text-[11px] font-semibold text-[#312E81] hover:underline flex items-center gap-1">
              Full Tracker <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {BUDGET_CATEGORIES.map((cat) => {
              const pct = Math.round((cat.spent / cat.allocated) * 100)
              return (
                <div key={cat.name}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-[12px] font-semibold text-[#111827]">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">
                        PKR {(cat.spent / 1000).toFixed(0)}K / {(cat.allocated / 1000).toFixed(0)}K
                      </span>
                      <span className="text-[10px] font-bold" style={{ color: cat.color }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">Total Remaining</p>
              <p className="text-[15px] font-black text-[#059669]">
                PKR {((totalBudget - budgetSpent) / 1000000).toFixed(2)}M
              </p>
            </div>
            <Link href="/dashboard/host/v2/budget" className="flex items-center gap-1.5 px-3.5 py-2 bg-[#312E81] text-white text-[11px] font-semibold rounded-xl hover:bg-[#4338ca] transition-colors">
              <Plus className="w-3 h-3" /> Add Expense
            </Link>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)] p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[14px] text-[#111827]">Recent Activity</h3>
            <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">Live</span>
          </div>
          <div className="space-y-3">
            {ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#111827] leading-tight">{item.title}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{item.sub}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-medium shrink-0 mt-0.5">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50">
            <Link href="/dashboard/host/v2/bookings" className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 hover:border-[#312E81]/30 hover:text-[#312E81] transition-all">
              View All Activity <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

      </div>

    </div>
  )
}
