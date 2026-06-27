"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  TrendingUp, TrendingDown, Receipt, DollarSign, Wallet,
  Plus, Search, Download, Eye, CheckCircle, Clock, XCircle,
  ArrowUpRight, ArrowDownRight, Filter
} from "lucide-react"

import { getInvoices } from "@/lib/mock-db"

const EXPENSES = [
  { category: "Equipment Rental", amount: 18000, date: "Jun 15, 2025", note: "Sony A7IV – 3 days" },
  { category: "Transport", amount: 5500, date: "Jun 20, 2025", note: "Walima venue trip" },
  { category: "Software Subscription", amount: 3200, date: "Jun 28, 2025", note: "Adobe CC monthly" },
  { category: "Studio Rent", amount: 25000, date: "Jul 1, 2025", note: "Monthly studio fee" },
  { category: "Freelancer Pay", amount: 22000, date: "Jul 3, 2025", note: "2 videographers" },
]

const STATUS_STYLES: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Partial: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Unpaid: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Overdue: "bg-red-200 text-red-800 dark:bg-red-500/20 dark:text-red-300",
}

export default function FinancesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Invoices")
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [invoices, setInvoices] = useState<any[]>([])

  useEffect(() => {
    setInvoices(getInvoices())
  }, [])

  const totalRevenue = invoices.reduce((s, i) => s + i.paid, 0)
  const totalOutstanding = invoices.reduce((s, i) => s + (i.amount - i.paid), 0)
  const totalExpenses = EXPENSES.reduce((s, e) => s + e.amount, 0)
  const netProfit = totalRevenue - totalExpenses

  const filtered = invoices.filter(inv => {
    const matchSearch = inv.client?.toLowerCase().includes(search.toLowerCase()) || inv.id?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "All" || inv.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5 md:space-y-6">

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: "Revenue Collected", value: `₨${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-[#22C55E]", bg: "bg-emerald-50 dark:bg-emerald-500/10", trend: "+32%" },
          { label: "Outstanding", value: `₨${totalOutstanding.toLocaleString()}`, icon: Clock, color: "text-[#F59E0B]", bg: "bg-amber-50 dark:bg-amber-500/10", trend: `${invoices.filter(i=>i.status!=="Paid").length} invoices` },
          { label: "Total Expenses", value: `₨${totalExpenses.toLocaleString()}`, icon: TrendingDown, color: "text-[#EF4444]", bg: "bg-red-50 dark:bg-red-500/10", trend: "this month" },
          { label: "Net Profit", value: `₨${netProfit.toLocaleString()}`, icon: DollarSign, color: "text-[#4F46E5]", bg: "bg-[#EEF2FF] dark:bg-indigo-500/10", trend: `${Math.round((netProfit/totalRevenue)*100)}% margin` },
        ].map(card => (
          <div key={card.label} className={`${card.bg} rounded-xl md:rounded-2xl p-4 md:p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{card.label}</span>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className={`text-[18px] md:text-[22px] font-black ${card.color} leading-none`}>{card.value}</div>
            <div className="text-[9px] text-[#9CA3AF] mt-2">{card.trend}</div>
          </div>
        ))}
      </div>

      {/* Revenue vs Expenses Bar Chart */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 md:p-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-black text-[#111827] dark:text-white">Revenue vs Expenses</h3>
          <div className="flex items-center gap-4 text-[10px] font-black">
            <span className="flex items-center gap-1.5 text-[#22C55E]"><span className="w-3 h-3 rounded-sm bg-[#22C55E] inline-block" />Revenue</span>
            <span className="flex items-center gap-1.5 text-[#EF4444]"><span className="w-3 h-3 rounded-sm bg-[#EF4444] inline-block" />Expenses</span>
          </div>
        </div>
        <div className="flex items-end gap-2 md:gap-4 h-[120px] md:h-[140px] min-w-[320px]">
          {[
            { month: "Jan", rev: 145000, exp: 42000 },
            { month: "Feb", rev: 180000, exp: 58000 },
            { month: "Mar", rev: 160000, exp: 47000 },
            { month: "Apr", rev: 220000, exp: 72000 },
            { month: "May", rev: 195000, exp: 65000 },
            { month: "Jun", rev: 245000, exp: 73700 },
          ].map(d => {
            const maxRev = 250000
            const revH = Math.round((d.rev / maxRev) * 120)
            const expH = Math.round((d.exp / maxRev) * 120)
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-0.5 h-[120px]">
                  <div className="w-5 bg-[#22C55E] rounded-t-md hover:bg-emerald-600 transition-colors cursor-pointer" style={{ height: `${revH}px` }} title={`₨${d.rev.toLocaleString()}`} />
                  <div className="w-5 bg-[#EF4444] rounded-t-md hover:bg-red-600 transition-colors cursor-pointer" style={{ height: `${expH}px` }} title={`₨${d.exp.toLocaleString()}`} />
                </div>
                <span className="text-[9px] font-black text-[#9CA3AF]">{d.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-1 w-fit">
        {["Invoices","Expenses"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
              activeTab === tab ? "bg-[#4F46E5] text-white shadow-sm" : "text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* INVOICES TABLE */}
      {activeTab === "Invoices" && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between px-4 md:px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5">
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all" />
            </div>
            <div className="flex items-center gap-2">
              {["All","Paid","Partial","Unpaid"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`px-2.5 py-1 rounded-lg text-[9px] font-black cursor-pointer transition-all ${filterStatus === s ? "bg-[#4F46E5] text-white" : "text-[#9CA3AF] hover:bg-[#F8FAFC] dark:hover:bg-white/5"}`}>{s}</button>
              ))}
              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] text-white rounded-xl text-[9px] font-black hover:bg-indigo-700 cursor-pointer ml-1">
                <Plus className="w-3 h-3" /> New Invoice
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                  {["Invoice","Client","Service","Amount","Paid","Due Date","Status",""].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => {
                  const pctPaid = Math.round((inv.paid / inv.amount) * 100)
                  return (
                    <tr key={inv.id} onClick={() => router.push(`/studio/finances/invoices/${inv.id}`)} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors cursor-pointer">
                      <td className="px-5 py-3 text-[11px] font-black text-[#4F46E5]">{inv.id}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg ${inv.color} text-white text-[9px] font-black flex items-center justify-center shrink-0`}>{inv.initials}</div>
                          <span className="text-[11px] font-bold text-[#111827] dark:text-white">{inv.client}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[11px] text-[#6B7280] dark:text-gray-400">{inv.event || inv.service}</td>
                      <td className="px-5 py-3 text-[11px] font-black text-[#111827] dark:text-white">₨{inv.amount.toLocaleString()}</td>
                      <td className="px-5 py-3">
                        <div className="text-[10px] font-bold text-[#22C55E]">₨{inv.paid.toLocaleString()}</div>
                        <div className="mt-1 h-1 w-16 bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${pctPaid}%` }} />
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[10px] text-[#9CA3AF]">{inv.due}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${STATUS_STYLES[inv.status]}`}>{inv.status}</span>
                      </td>
                      <td className="px-5 py-3" onClick={e => e.stopPropagation()}>
                        <button onClick={() => router.push(`/studio/finances/invoices/${inv.id}`)} className="p-1.5 hover:bg-[#EEF2FF] rounded-lg text-[#9CA3AF] hover:text-[#4F46E5] cursor-pointer transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EXPENSES TABLE */}
      {activeTab === "Expenses" && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5">
            <span className="text-[12px] font-black text-[#111827] dark:text-white">Expense Log</span>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-[#EF4444] text-white rounded-xl text-[9px] font-black hover:bg-red-600 cursor-pointer">
              <Plus className="w-3 h-3" /> Log Expense
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-white/3 border-b border-[#E5E7EB] dark:border-white/8">
                {["Category","Amount","Date","Note"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXPENSES.map((exp, i) => (
                <tr key={i} className="border-b border-[#F9FAFB] dark:border-white/3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 transition-colors">
                  <td className="px-5 py-3 text-[11px] font-bold text-[#111827] dark:text-white">{exp.category}</td>
                  <td className="px-5 py-3 text-[11px] font-black text-[#EF4444]">₨{exp.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-[10px] text-[#9CA3AF]">{exp.date}</td>
                  <td className="px-5 py-3 text-[11px] text-[#6B7280] dark:text-gray-400">{exp.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 flex items-center justify-between bg-[#F8FAFC] dark:bg-white/3 border-t border-[#E5E7EB] dark:border-white/8">
            <span className="text-[10px] font-black text-[#9CA3AF]">Total Expenses This Month</span>
            <span className="text-[14px] font-black text-[#EF4444]">₨{totalExpenses.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
