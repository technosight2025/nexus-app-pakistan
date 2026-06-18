"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, TrendingUp, TrendingDown, Users, 
  DollarSign, Download, Filter, Calendar as CalendarIcon,
  CheckCircle2, AlertCircle, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts"

// Mock Data for Charts
const revenueData = [
  { month: "Jan", revenue: 1500000, bookings: 4 },
  { month: "Feb", revenue: 2100000, bookings: 6 },
  { month: "Mar", revenue: 1800000, bookings: 5 },
  { month: "Apr", revenue: 2800000, bookings: 8 },
  { month: "May", revenue: 3200000, bookings: 10 },
  { month: "Jun", revenue: 4500000, bookings: 12 },
]

const eventTypeData = [
  { name: "Weddings", value: 65, color: "#6366f1" },
  { name: "Corporate", value: 20, color: "#14b8a6" },
  { name: "Birthdays", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#64748b" },
]

const recentTransactions = [
  { id: "TRX-8921", client: "Ahmad Raza", amount: 500000, type: "Advance", status: "Completed", date: "Today, 10:30 AM" },
  { id: "TRX-8920", client: "Zainab Ali", amount: 1200000, type: "Final Payment", status: "Completed", date: "Yesterday" },
  { id: "TRX-8919", client: "TechCorp Inc", amount: 250000, type: "Advance", status: "Pending", date: "Oct 24, 2023" },
  { id: "TRX-8918", client: "Usman Tariq", amount: 800000, type: "Partial", status: "Completed", date: "Oct 22, 2023" },
]

export function ReportsView() {
  const [timeRange, setTimeRange] = useState("Last 6 Months")

  return (
    <div className="space-y-6 w-full pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Reports & Analytics
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Track your venue's performance and financial metrics.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
            {["This Month", "Last 6 Months", "This Year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  timeRange === range 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "Rs 15.9M", trend: "+12.5%", isUp: true, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Total Bookings", value: "45", trend: "+8.2%", isUp: true, icon: CalendarIcon, color: "text-primary", bg: "bg-indigo-50" },
          { label: "Conversion Rate", value: "24%", trend: "-2.1%", isUp: false, icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-50" },
          { label: "Avg. Booking Value", value: "Rs 350K", trend: "+5.4%", isUp: true, icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${kpi.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {kpi.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {kpi.trend}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900">{kpi.value}</h3>
              <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">{kpi.label}</p>
            </div>
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${kpi.bg} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Revenue Overview</h2>
              <p className="text-sm font-medium text-slate-500">Gross revenue across all events</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-lg">View Details</Button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} tickFormatter={(val) => `Rs ${val / 1000000}M`} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  formatter={(value: any) => [`Rs ${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Types Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div>
            <h2 className="text-lg font-black text-slate-900">Event Distribution</h2>
            <p className="text-sm font-medium text-slate-500">Bookings by event type</p>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {eventTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {eventTypeData.map((type) => (
              <div key={type.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                <div>
                  <p className="text-xs font-bold text-slate-900">{type.name}</p>
                  <p className="text-xs font-medium text-slate-500">{type.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black text-slate-900">Recent Transactions</h2>
            <p className="text-sm font-medium text-slate-500">Latest payments received.</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Transaction ID</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Client</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Type</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Amount</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm font-medium text-slate-500">{trx.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{trx.client}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                      {trx.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-black text-slate-900">Rs {trx.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-500">{trx.date}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end">
                      {trx.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                          <Clock className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
