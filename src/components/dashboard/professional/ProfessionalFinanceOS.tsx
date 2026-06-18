"use client"

import { useState } from "react"
import { Wallet, Download, ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, Search, Filter } from "lucide-react"

export function ProfessionalFinanceOS() {
  const [activeTab, setActiveTab] = useState("invoices")

  const stats = [
    { label: "Total Revenue (YTD)", value: "Rs. 4,250,000", trend: "+15%", positive: true },
    { label: "Outstanding Invoices", value: "Rs. 350,000", trend: "3 Pending", positive: false },
    { label: "Pending Quotations", value: "Rs. 850,000", trend: "4 Active", positive: true },
    { label: "Available to Withdraw", value: "Rs. 1,120,000", trend: "Ready", positive: true }
  ]

  const invoices = [
    { id: "INV-2026-001", client: "Zainab & Ali", amount: 150000, status: "Paid", date: "Oct 10, 2026" },
    { id: "INV-2026-002", client: "Sapphire PK", amount: 250000, status: "Pending", date: "Oct 12, 2026" },
    { id: "INV-2026-003", client: "TechCorp Gala", amount: 100000, status: "Overdue", date: "Oct 01, 2026" },
    { id: "INV-2026-004", client: "Hassan & Fatima", amount: 80000, status: "Paid", date: "Sep 28, 2026" },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Finance & Payouts</h1>
          <p className="text-slate-500 font-medium">Manage quotations, invoices, and track your revenue.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:border-[#0F5B3E] hover:text-[#0F5B3E] transition-all">
            Withdraw Funds
          </button>
          <button className="px-5 py-2.5 bg-[#0F5B3E] text-white font-bold rounded-xl shadow-sm hover:bg-[#0a422c] transition-all">
            Create Invoice
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-2">{stat.label}</h3>
            <p className="text-2xl font-black text-slate-900 mb-2">{stat.value}</p>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
              {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {["Invoices", "Quotations", "Payout History", "Tax Reports"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
            className={`px-6 py-4 font-bold text-sm border-b-2 transition-colors ${
              activeTab === tab.toLowerCase().split(' ')[0]
                ? "border-[#0F5B3E] text-[#0F5B3E]"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search invoices..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F5B3E] w-64" />
          </div>
          <button className="p-2 border border-slate-200 bg-white rounded-xl text-slate-500 hover:bg-slate-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-white text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="p-5">Invoice ID</th>
              <th className="p-5">Client Name</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Date Issued</th>
              <th className="p-5">Status</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" /> {inv.id}
                </td>
                <td className="p-5 font-medium text-slate-600">{inv.client}</td>
                <td className="p-5 font-black text-slate-900">Rs. {inv.amount.toLocaleString()}</td>
                <td className="p-5 text-sm text-slate-500 font-medium">{inv.date}</td>
                <td className="p-5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 w-max ${
                    inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                    inv.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                  }`}>
                    {inv.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                    {inv.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-slate-400 hover:text-[#0F5B3E] transition-colors p-2">
                    <Download className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
