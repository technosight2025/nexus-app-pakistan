"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp, CalendarCheck, Users, Banknote,
  Sparkles, ChevronRight, Clock,
  CheckCircle2, Circle, ArrowUpRight, Eye,
  Star, UserCheck, Shirt, AlertTriangle,
  Scan, Tags, Truck, RefreshCw, Store
} from "lucide-react"
import Link from "next/link"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { useUser } from "@clerk/nextjs"
import { useOrganization } from "@/app/context/OrganizationContext"

const REVENUE = [
  { m: "J", v: 0 }, { m: "F", v: 0 }, { m: "M", v: 0 }, { m: "A", v: 0 },
  { m: "M", v: 0 }, { m: "J", v: 0 }, { m: "J", v: 0 }, { m: "A", v: 0 },
  { m: "S", v: 0 }, { m: "O", v: 0 }, { m: "N", v: 0 }, { m: "D", v: 0 },
]

const TASKS: any[] = []

const LEAD_SOURCES = [
  { label: "AI Try-On Studio", pct: 0, color: "bg-[#D4AF37]" },
  { label: "Marketplace Profile", pct: 0, color: "bg-[#0A3B2A]" },
  { label: "WhatsApp Referral", pct: 0, color: "bg-emerald-400" },
  { label: "Direct Walk-In", pct: 0, color: "bg-slate-300" },
]

export function RentalsDashboardOverview() {
  const [greeting, setGreeting] = useState("")
  const [done, setDone] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const { user, isLoaded } = useUser()
  const { organization } = useOrganization()
  
  const [metrics, setMetrics] = useState({
    businessName: "",
    category: "",
    revenue: "0",
    activeRentals: 0,
    totalOutfits: 0
  })
  const [upcoming, setUpcoming] = useState<any[]>([])
  const [wardrobe, setWardrobe] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    const h = new Date().getHours()
    setGreeting(h < 12 ? "Good Morning" : h < 18 ? "Good Afternoon" : "Good Evening")
    
    // Fetch live dashboard data
    const fetchOverview = async () => {
      try {
        const res = await fetch("/api/rentals/overview")
        const data = await res.json()
        if (data && !data.error) {
          setMetrics({
            businessName: data.businessName || user?.fullName || "Vendor Profile",
            category: data.category || "Store",
            revenue: data.revenue || "0",
            activeRentals: data.activeRentals || 0,
            totalOutfits: data.totalOutfits || 0
          })
          setUpcoming(data.upcomingRentals || [])
          setWardrobe(data.wardrobe || [])
          setActivity(data.activity || [])
        } else if (data.error) {
          console.error("Dashboard API Error:", data.error)
          setMetrics(prev => ({ ...prev, businessName: user?.fullName || "Vendor Profile" }))
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOverview()
  }, [])

  if (!mounted || loading) return <div className="min-h-screen bg-[#FAF8F5]" />

  const score = 0

  return (
    <div className="space-y-4 pb-8 max-w-[1440px] mx-auto text-[#1A1A1A]">

      {/* ── Greeting & Company Details ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 bg-[#0A3B2A]/5 text-[#0A3B2A] text-[10px] font-black uppercase tracking-wider rounded-md border border-[#0A3B2A]/10">
              Main Branch
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {metrics.category.replace(/_/g, " ")}
            </span>
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            {metrics.businessName || user?.fullName || "Loading..."}
            {(metrics.businessName || user?.fullName) && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
          </h1>
          
          <p className="text-slate-500 font-medium mt-2 flex items-center gap-1.5">
            <span className="text-[#0A3B2A] font-bold">{greeting}, {user?.fullName || "Partner"}!</span> 
            <span>You have <strong className="text-slate-900">{metrics.activeRentals} active rentals</strong> in progress.</span>
          </p>
        </div>
        
        <div className="flex flex-col gap-2 w-full lg:w-auto">
          {organization?.settings?.active_theme_id ? (
            <div className="flex gap-2 w-full">
              <Link href={`/site/${organization.slug || organization.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-[#1A1A1A] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all text-center leading-tight"
              >
                <Eye className="w-4 h-4 text-emerald-400 shrink-0" /> View Public Page
              </Link>
              <Link href="/dashboard/rentals/profile-maker"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#1A1A1A] text-[#1A1A1A] rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all text-center leading-tight"
              >
                <Store className="w-4 h-4 text-[#D4AF37] shrink-0" /> Profile Maker
              </Link>
            </div>
          ) : (
            <Link href="/dashboard/rentals/profile-maker"
              className="flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all w-full justify-center text-center leading-tight"
            >
              <Store className="w-4 h-4 text-[#D4AF37] shrink-0" /> Manage Storefront Profile
            </Link>
          )}

          <Link href="/ai-tryon-studio"
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-black rounded-xl font-black text-xs uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all w-full justify-center"
          >
            <Scan className="w-4 h-4" /> Open AI Try-On Studio
          </Link>
        </div>
      </div>

      {/* ── ROW 1: KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Revenue", value: metrics.revenue, sub: "Lifetime earnings", icon: Banknote, bg: "from-emerald-50 to-teal-50/50", ib: "bg-emerald-100 text-emerald-700" },
          { label: "Active Rentals", value: metrics.activeRentals.toString(), sub: "In progress", icon: Shirt, bg: "from-rose-50 to-pink-50/50", ib: "bg-rose-100 text-rose-700" },
          { label: "Total Outfits", value: metrics.totalOutfits.toString(), sub: "In wardrobe", icon: Shirt, bg: "from-blue-50 to-indigo-50/50", ib: "bg-blue-100 text-blue-700" },
          { label: "AI Try-On Leads", value: "0", sub: "Coming soon", icon: Scan, bg: "from-amber-50 to-orange-50/50", ib: "bg-amber-100 text-amber-700" },
        ].map((k, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className={`bg-gradient-to-br ${k.bg} rounded-2xl p-4 border border-white shadow-sm flex flex-col justify-between cursor-default`}
          >
            <div className={`p-1.5 rounded-lg ${k.ib} w-max shadow-sm mb-2`}><k.icon className="w-4 h-4" /></div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{k.label}</p>
            <p className="text-2xl font-black tracking-tight mt-0.5">Rs. {k.value}</p>
            <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-0.5"><ArrowUpRight className="w-3 h-3" />{k.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* ── ROW 2: Chart + Lead Sources + Score ── */}
      <div className="grid grid-cols-12 gap-3">

        {/* Revenue Sparkline */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-sm font-black">Revenue Trend</h3>
              <p className="text-[10px] text-slate-400 font-medium">12-month rental income</p>
            </div>
            <p className="text-lg font-black text-[#0A3B2A]">8.5M</p>
          </div>
          <div className="h-[100px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs>
                  <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A880" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#C5A880" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#C5A880" strokeWidth={2.5} fill="url(#rg2)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div id="tour-recent-activity" className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <h3 className="text-sm font-black mb-3">Lead Sources</h3>
          <div className="space-y-2.5">
            {LEAD_SOURCES.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-[10px] font-bold mb-0.5">
                  <span className="text-slate-600">{s.label}</span>
                  <span className="text-slate-400">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.8 }}
                    className={`h-full ${s.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nexus Score */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center justify-center">
          <div className="relative w-24 h-24 mb-2">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#sg2)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${score * 2.51} 251`} />
              <defs><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#C5A880" /><stop offset="100%" stopColor="#0A3B2A" /></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">{score}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Score</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-center mt-1">
            {[
              { v: "4.9", l: "Rating", ic: Star, c: "text-amber-500" },
              { v: "3.8K", l: "Views", ic: Eye, c: "text-blue-500" },
              { v: "8m", l: "Response", ic: Clock, c: "text-emerald-500" },
              { v: "31%", l: "Repeat", ic: UserCheck, c: "text-purple-500" },
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

      {/* ── ROW 3: Upcoming Rentals + Tasks + Activity ── */}
      <div className="grid grid-cols-12 gap-3">

        {/* Upcoming Rentals */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black">Upcoming Rentals</h3>
            <Link href="/dashboard/rentals/bookings" className="text-[10px] font-bold text-[#0A3B2A] hover:underline flex items-center gap-0.5">All <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-2">
            {upcoming.length === 0 ? (
              <p className="text-xs text-slate-500 font-medium">No upcoming rentals. Go share your profile!</p>
            ) : upcoming.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#C5A880]/40 hover:shadow-sm transition-all cursor-pointer group">
                <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                  r.daysLeft <= 3 ? 'bg-rose-100 text-rose-700' : r.daysLeft <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  <span className="text-sm font-black leading-none">{r.daysLeft}</span>
                  <span className="text-[7px] font-bold uppercase">days</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#1A1A1A] truncate group-hover:text-[#0A3B2A] transition-colors">{r.outfit}</p>
                  <p className="text-[10px] text-slate-400 font-medium truncate">{r.customer} • {r.event}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-[#0A3B2A]">Rs. {r.value}</p>
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                    r.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>{r.status}</span>
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

        {/* Activity */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <h3 className="text-sm font-black mb-3">Activity</h3>
          <div className="space-y-1 flex-1">
            {activity.length === 0 ? (
              <p className="text-xs text-slate-500 font-medium">No activity yet.</p>
            ) : activity.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#FAF8F5] transition-colors cursor-pointer">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  a.icon === 'book' ? 'bg-blue-100 text-blue-600'
                  : a.icon === 'pay' ? 'bg-emerald-100 text-emerald-600'
                  : a.icon === 'ai' ? 'bg-amber-100 text-amber-600'
                  : 'bg-purple-100 text-purple-600'
                }`}>
                  {a.icon === 'book' ? <CalendarCheck className="w-3 h-3" />
                    : a.icon === 'pay' ? <Banknote className="w-3 h-3" />
                    : a.icon === 'ai' ? <Scan className="w-3 h-3" />
                    : <RefreshCw className="w-3 h-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-[#1A1A1A] leading-snug">{a.text}</p>
                  <p className="text-[9px] font-bold text-slate-300 mt-0.5 uppercase">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 4: Wardrobe Console ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black">Wardrobe Status</h3>
          <Link href="/dashboard/rentals/wardrobe" className="text-[10px] font-bold text-[#0A3B2A] hover:underline flex items-center gap-0.5">
            Manage All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {wardrobe.length === 0 ? (
            <p className="text-xs text-slate-500 font-medium col-span-4">Your wardrobe is empty. Add your first outfit!</p>
          ) : wardrobe.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -3 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {item.image && <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full ${
                  item.status === 'Available' ? 'bg-emerald-500 text-white'
                  : item.status === 'Rented' ? 'bg-rose-500 text-white'
                  : 'bg-amber-400 text-black'
                }`}>{item.status}</span>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white font-black text-xs leading-tight truncate">{item.name}</p>
                  <p className="text-white/70 text-[9px] font-bold">{item.rentals} rentals total</p>
                </div>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.tag}</span>
                {item.dueBack && (
                  <span className="text-[9px] font-bold text-rose-600 flex items-center gap-0.5">
                    <AlertTriangle className="w-2.5 h-2.5" /> Back {item.dueBack}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
