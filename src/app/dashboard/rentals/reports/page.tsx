"use client"
import { motion } from "framer-motion"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, ArrowUpRight } from "lucide-react"

const MONTHLY = [
  { m: "Jul", revenue: 760, rentals: 8 }, { m: "Aug", revenue: 960, rentals: 10 },
  { m: "Sep", revenue: 1120, rentals: 13 }, { m: "Oct", revenue: 1240, rentals: 14 },
  { m: "Nov", revenue: 1080, rentals: 12 }, { m: "Dec", revenue: 1400, rentals: 16 },
]

const TOP_OUTFITS = [
  { name: "Crimson Bridal Set", rentals: 14, revenue: "910,000", pct: 100 },
  { name: "Regal Gold Lehnga", rentals: 22, revenue: "1,870,000", pct: 92 },
  { name: "Pastel Walima Gown", rentals: 11, revenue: "495,000", pct: 54 },
  { name: "Emerald Sherwani", rentals: 8, revenue: "200,000", pct: 39 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#0A3B2A]">Reports & Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Performance overview — Last 6 months</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Revenue (6mo)", value: "Rs. 6.56M", sub: "+31% YoY", color: "text-[#0A3B2A]" },
          { label: "Total Rentals", value: "73", sub: "Across all outfits", color: "text-slate-900" },
          { label: "Avg. per Rental", value: "Rs. 89.9K", sub: "Industry avg: 72K", color: "text-emerald-600" },
          { label: "AI Try-On Conversion", value: "8.8%", sub: "34 sessions → 3 bookings", color: "text-amber-600" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className={`text-xl font-black ${k.color}`}>{k.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{k.label}</p>
            <p className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" />{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Revenue Chart */}
        <div className="col-span-12 lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-[#0A3B2A] mb-1">Monthly Revenue</h3>
          <p className="text-xs text-slate-400 font-medium mb-4">Rental income in PKR (000s)</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C5A880" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#C5A880" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [`Rs. ${v}K`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 11 }} />
                <Area type="monotone" dataKey="revenue" stroke="#C5A880" strokeWidth={2.5} fill="url(#rev)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rentals Chart */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-black text-[#0A3B2A] mb-1">Rentals per Month</h3>
          <p className="text-xs text-slate-400 font-medium mb-4">Number of outfits rented out</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY} barSize={20}>
                <XAxis dataKey="m" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [v, "Rentals"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 11 }} />
                <Bar dataKey="rentals" fill="#0A3B2A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Outfits */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-black text-[#0A3B2A] mb-4">Top Performing Outfits</h3>
        <div className="space-y-4">
          {TOP_OUTFITS.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 w-4">#{i + 1}</span>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-[#0A3B2A]">Rs. {item.revenue}</p>
                  <p className="text-[10px] text-slate-400">{item.rentals} rentals</p>
                </div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full bg-gradient-to-r from-[#C5A880] to-[#0A3B2A] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
