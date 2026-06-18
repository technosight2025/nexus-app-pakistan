"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Wallet, ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3,
  Calendar, Users, CircleAlert, DollarSign, Download, Plus,
  FileSpreadsheet, ArrowRight, Tag, Percent, RefreshCw, Calculator,
  UserCheck, ShieldCheck, Check, Info
} from "lucide-react"

export default function VenueAccountingPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "transactions" | "payroll" | "tax">("analytics")

  // WHT Calculator States
  const [whtGrossAmount, setWhtGrossAmount] = useState<string>("500000")
  const [clientStatus, setClientStatus] = useState<"filer" | "non-filer">("filer")

  // Financial Stats Card Data
  const stats = [
    { name: "Monthly Net Profit", value: "Rs. 2,15,000", change: "↑ 38%", isPositive: true, detail: "vs last month" },
    { name: "Total Gross Revenue", value: "Rs. 4,20,000", change: "↑ 24%", isPositive: true, detail: "6 bookings billed" },
    { name: "Operating Expenses", value: "Rs. 2,05,000", change: "↓ 8%", isPositive: true, detail: "Raw Materials + Wages" },
    { name: "Pending Receivables", value: "Rs. 1,65,000", change: "3 invoices", isPositive: false, detail: "Due this week" }
  ]

  // Pakistani Banquet Specific Transactions Log
  const [transactions, setTransactions] = useState([
    { id: "TXN-301", desc: "Usman & Ayesha Wedding Deposit", type: "Revenue", category: "Hall Rental", amount: "Rs. 1,50,000", date: "May 20, 2025", status: "Paid" },
    { id: "TXN-302", desc: "PSO Generator Diesel - 120 Liters", type: "Expense", category: "Utility & Fuel", amount: "Rs. 32,400", date: "May 22, 2025", status: "Paid" },
    { id: "TXN-303", desc: "Tariq Halal Meat (300kg Mutton Supply)", type: "Expense", category: "Catering Raw", amount: "Rs. 4,50,000", date: "May 24, 2025", status: "Paid" },
    { id: "TXN-304", desc: "Farhan Mehndi Event Booking", type: "Revenue", category: "Hall Rental", amount: "Rs. 95,000", date: "May 26, 2025", status: "Paid" },
    { id: "TXN-305", desc: "Waiters Daily Payout (24 Shifts - Ahmed)", type: "Expense", category: "Wager Payroll", amount: "Rs. 28,800", date: "May 28, 2025", status: "Paid" },
    { id: "TXN-306", desc: "LESCO Commercial Electricity Bill", type: "Expense", category: "Utility & Fuel", amount: "Rs. 85,000", date: "May 29, 2025", status: "Paid" },
    { id: "TXN-307", desc: "Al-Khair Fresh Rice (20 Bags)", type: "Expense", category: "Catering Raw", amount: "Rs. 1,10,000", date: "May 30, 2025", status: "Pending" }
  ])

  // Banquet Daily Wagers Roster Log
  const [payroll, setPayroll] = useState([
    { name: "Zahid Iqbal", role: "Head Chef (Biryani Specialist)", type: "Per-Event Wager", rate: "Rs. 15,000/event", events: 3, pending: "Rs. 0", paid: "Rs. 45,000" },
    { name: "Banquet Waiter Crew", role: "24 Waiters Shifts (Ahmed Wedding)", type: "Daily Waiters", rate: "Rs. 1,200/shift", events: 1, pending: "Rs. 28,800", paid: "Rs. 0" },
    { name: "Housekeeping Crew", role: "6 Cleaners Shifts", type: "Daily Cleaners", rate: "Rs. 1,000/shift", events: 4, pending: "Rs. 6,000", paid: "Rs. 18,000" },
    { name: "Security Guard Detail", role: "4 Guards Shift (VIP Walima)", type: "Security Wager", rate: "Rs. 1,500/shift", events: 2, pending: "Rs. 0", paid: "Rs. 12,000" }
  ])

  // FBR Services Tax & WHT Calculator Logic
  const calculateWht = () => {
    const gross = parseFloat(whtGrossAmount) || 0
    // FBR Withholding tax rate for Banquets: Filer = 3%, Non-Filer = 6%
    const rate = clientStatus === "filer" ? 0.03 : 0.06
    const wht = gross * rate
    // PRA Services Tax: 5% flat rate on services bookings
    const praTax = gross * 0.05
    const netReceivable = gross - wht + praTax
    return { wht, praTax, netReceivable }
  }

  const whtBill = calculateWht()

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] pb-5">
        <div className="text-left">
          <h1 className="text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
            Accounting Pro <Wallet className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12.5px] text-gray-500 mt-1 font-semibold">
            Banquet cash flow ledger, generator fuel logistics, waiter daily wages, and FBR services tax audits.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white border border-[#ECE7DF] rounded-[10px] text-[11px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs">
            <Download className="w-3.5 h-3.5" /> Export Sheet
          </button>
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Record Expense/Receipt
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex overflow-x-auto pb-1 bg-white border border-[#ECE7DF] rounded-[14px] p-1 gap-1 shrink-0 scrollbar-none">
        <button 
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "analytics" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Financial Overview
        </button>
        <button 
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "transactions" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Cash & Expense Ledger
        </button>
        <button 
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "payroll" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Waiter & Crew Payroll
        </button>
        <button 
          onClick={() => setActiveTab("tax")}
          className={`px-4 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 uppercase tracking-wider ${
            activeTab === "tax" 
              ? "bg-[#0F5B3E] text-white shadow-xs" 
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          FBR Pakistan Tax Center
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(stat => (
          <div key={stat.name} className="py-3.5 px-4.5 bg-white border border-[#ECE7DF] rounded-[20px] flex items-center justify-between shadow-xs">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">{stat.name}</span>
              <h3 className="text-[20px] font-black text-gray-950 leading-none mt-1.5">{stat.value}</h3>
              <div className="text-[9.5px] font-bold flex items-center gap-1 mt-2 leading-none">
                <span className={stat.isPositive ? "text-emerald-600" : "text-gray-400"}>
                  {stat.change}
                </span>
                <span className="text-gray-400 font-medium">{stat.detail}</span>
              </div>
            </div>
            <div className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0 ${
              stat.name.includes("Profit") || stat.name.includes("Revenue")
                ? "bg-emerald-50 text-[#0F5B3E]"
                : stat.name.includes("Expenses")
                ? "bg-rose-50 text-rose-600"
                : "bg-amber-50 text-amber-600"
            }`}>
              {stat.name.includes("Profit") ? <TrendingUp className="w-4.5 h-4.5" /> :
               stat.name.includes("Revenue") ? <ArrowUpRight className="w-4.5 h-4.5" /> :
               stat.name.includes("Expenses") ? <ArrowDownRight className="w-4.5 h-4.5" /> :
               <CircleAlert className="w-4.5 h-4.5" />}
            </div>
          </div>
        ))}
      </div>

      {/* Tab 1: Financial Overview */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Visual P&L Trend Line Graphic */}
          <Card className="lg:col-span-2 p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Revenue vs Expense Trend</h3>
                  <p className="text-[10px] text-gray-450 font-semibold mt-0.5">30-day operating cash flow diagram</p>
                </div>
                <div className="flex gap-3 text-[9.5px] font-bold">
                  <span className="flex items-center gap-1 text-[#0F5B3E]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0F5B3E]" /> Event Bookings
                  </span>
                  <span className="flex items-center gap-1 text-rose-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Utility & Raw Material
                  </span>
                </div>
              </div>

              {/* Graphic Chart representation SVG */}
              <div className="relative w-full h-[180px] mt-6 flex flex-col justify-end">
                {/* Horizontal dashed guides */}
                <div className="absolute inset-x-0 bottom-7 top-2 flex flex-col justify-between pointer-events-none z-0">
                  <div className="w-full flex items-center text-[9px] font-extrabold text-gray-300">
                    <span className="w-8 shrink-0 text-left">500k</span>
                    <div className="flex-1 border-t border-dashed border-gray-100 ml-1" />
                  </div>
                  <div className="w-full flex items-center text-[9px] font-extrabold text-gray-300">
                    <span className="w-8 shrink-0 text-left">250k</span>
                    <div className="flex-1 border-t border-dashed border-gray-100 ml-1" />
                  </div>
                  <div className="w-full flex items-center text-[9px] font-extrabold text-gray-300">
                    <span className="w-8 shrink-0 text-left">0</span>
                    <div className="flex-1 border-t border-dashed border-gray-100 ml-1" />
                  </div>
                </div>

                {/* SVG Curve drawings */}
                <svg className="absolute inset-x-0 bottom-7 left-8 right-0 h-[130px] w-[calc(100%-32px)] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Revenue Curve */}
                  <path d="M 0 85 Q 20 60, 30 70 T 60 40 T 80 15 T 100 30" fill="none" stroke="#0F5B3E" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Expense Curve */}
                  <path d="M 0 90 Q 20 80, 35 85 T 70 70 T 100 65" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeDasharray="3,3" />
                </svg>

                {/* Date labels */}
                <div className="w-full flex justify-between text-[9px] font-bold text-gray-400 pl-8 pt-1.5 border-t border-gray-100 mt-2 z-10">
                  <span>May 20</span>
                  <span>May 25</span>
                  <span>May 30</span>
                  <span>Jun 05</span>
                  <span>Jun 10</span>
                  <span>Jun 13</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Cash Spend Breakdown Donut & Info */}
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[340px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Spend Classifications</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Operating expense distribution</p>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-4 mt-6">
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#F1EFE9" strokeWidth="10" />
                    {/* Catering Raw (36%) - Green - length = 238.7 * 0.36 = 85.9 */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#0F5B3E" strokeWidth="10" strokeDasharray="85.9 238.7" strokeDashoffset="0" />
                    {/* Waiter Wages (30%) - Yellow - length = 238.7 * 0.30 = 71.6 - offset = -85.9 */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#EAB308" strokeWidth="10" strokeDasharray="71.6 238.7" strokeDashoffset="-85.9" />
                    {/* Fuel & Power (22%) - Red - length = 238.7 * 0.22 = 52.5 - offset = -157.5 */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#D9467A" strokeWidth="10" strokeDasharray="52.5 238.7" strokeDashoffset="-157.5" />
                    {/* Staging/Flower (12%) - Blue - length = 238.7 * 0.12 = 28.6 - offset = -210.0 */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#3B82F6" strokeWidth="10" strokeDasharray="28.6 238.7" strokeDashoffset="-210.0" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[17px] font-black text-gray-950 leading-none">Rs. 2.05L</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Out</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10.5px] font-bold">
                    <span className="text-gray-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0F5B3E]" /> Raw Catering</span>
                    <span className="text-gray-950 font-black">36%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10.5px] font-bold">
                    <span className="text-gray-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Crew Wages</span>
                    <span className="text-gray-950 font-black">30%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10.5px] font-bold">
                    <span className="text-gray-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D9467A]" /> Diesel & Power</span>
                    <span className="text-gray-950 font-black">22%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10.5px] font-bold">
                    <span className="text-gray-400 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Flower/Decor</span>
                    <span className="text-gray-950 font-black">12%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-[11px] font-bold text-gray-500">
              <span>Generator Fuel: 120L Diesel purchased</span>
              <span className="text-[#0F5B3E] cursor-pointer">Logs →</span>
            </div>
          </Card>

        </div>
      )}

      {/* Tab 2: Cash & Expense Ledger */}
      {activeTab === "transactions" && (
        <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm">
          <div className="flex items-center justify-between mb-4.5">
            <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Operating Cash Registry</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase">Class:</span>
              <select className="pl-2 pr-6 py-1 bg-white border border-[#ECE7DF] rounded-lg text-[10.5px] font-bold text-gray-700 focus:outline-none">
                <option>All Entries</option>
                <option>Booking Deposits (Revenue)</option>
                <option>Raw Supplies (Expense)</option>
                <option>Fuel Logistics (Expense)</option>
                <option>Wages Disbursements (Expense)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto text-left">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-[#ECE7DF] text-[10px] text-gray-400 font-extrabold uppercase">
                  <th className="pb-3.5 pl-2">TXN Code</th>
                  <th className="pb-3.5">Transaction Description</th>
                  <th className="pb-3.5">Category Class</th>
                  <th className="pb-3.5">Flow Type</th>
                  <th className="pb-3.5">Value Date</th>
                  <th className="pb-3.5 text-right">Transaction amount</th>
                  <th className="pb-3.5 text-right pr-2">Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11.5px] font-semibold text-gray-700">
                {transactions.map(txn => (
                  <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-400">{txn.id}</td>
                    <td className="py-3.5 font-black text-gray-900">{txn.desc}</td>
                    <td className="py-3.5 text-gray-400">{txn.category}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                        txn.type === "Revenue" 
                          ? "bg-emerald-50 text-[#0F5B3E]" 
                          : "bg-rose-50 text-rose-700"
                      }`}>{txn.type}</span>
                    </td>
                    <td className="py-3.5 text-gray-550">{txn.date}</td>
                    <td className="py-3.5 text-right font-black text-gray-900">{txn.amount}</td>
                    <td className="py-3.5 text-right pr-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${
                        txn.status === "Paid" ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                      }`} />
                      <span className="font-bold text-gray-600">{txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Tab 3: Waiter & Crew Payroll */}
      {activeTab === "payroll" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          <Card className="lg:col-span-2 p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Crew Shifts & Wages</h3>
                <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Disbursement ledger for daily wagers and banquet waiters</p>
              </div>
              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-extrabold uppercase">34,800 pending payout</span>
            </div>

            <div className="space-y-4">
              {payroll.map((person, idx) => (
                <div key={idx} className="p-4 bg-[#FAF8F5] border border-[#ECE7DF]/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-xl bg-[#0F5B3E]/10 text-[#0F5B3E] flex items-center justify-center font-black text-[13px] shrink-0">
                      {person.name[0]}
                    </div>
                    <div>
                      <h4 className="text-[12px] font-black text-gray-950 leading-tight">{person.name}</h4>
                      <p className="text-[9.5px] text-gray-400 font-semibold mt-0.5">{person.role} • <span className="font-bold">{person.type}</span></p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 justify-between sm:justify-end text-[11px] font-bold text-gray-500">
                    <div className="text-left">
                      <span className="text-[8.5px] text-gray-400 uppercase block font-semibold leading-none">Rate Code</span>
                      <span className="text-gray-900 mt-1 block leading-none">{person.rate}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[8.5px] text-gray-400 uppercase block font-semibold leading-none">Unpaid</span>
                      <span className="text-rose-600 mt-1 block leading-none">{person.pending}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[8.5px] text-gray-400 uppercase block font-semibold leading-none">Paid</span>
                      <span className="text-emerald-600 mt-1 block leading-none">{person.paid}</span>
                    </div>
                    {person.pending !== "Rs. 0" ? (
                      <button className="px-3 py-1 bg-[#0F5B3E] hover:bg-[#0a3b2a] text-white rounded-lg text-[10px] font-extrabold uppercase transition-all shadow-xs">
                        Disburse Cash
                      </button>
                    ) : (
                      <span className="text-emerald-700 text-[10px] font-extrabold uppercase flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Cleared
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick daily wagers metrics */}
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm flex flex-col justify-between min-h-[300px]">
            <div>
              <h3 className="text-[13.5px] font-black text-gray-950 uppercase tracking-wider">Shift Verification</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Audit checklist for yesterday's shift logs</p>

              <div className="space-y-4.5 mt-5">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-900">24 Banquet Waiters (Ahmed Event)</span>
                    <span className="text-[9px] text-gray-400">Verified by Shift Manager</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold border-t border-gray-100 pt-3.5">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-900">6 Cleaners Roster</span>
                    <span className="text-[9px] text-gray-400">Verified by Housekeeping</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold border-t border-gray-100 pt-3.5">
                  <div className="flex flex-col text-left">
                    <span className="text-gray-900">Usman Chef catering wager deposit</span>
                    <span className="text-[9px] text-gray-400">Pending audit check</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 animate-pulse">
                    <Info className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 border border-[#ECE7DF] hover:bg-gray-50 rounded-xl text-[10.5px] font-bold text-gray-600 transition-colors">
              Crew Roster Desk
            </button>
          </Card>
        </div>
      )}

      {/* Tab 4: FBR Pakistan Tax Center */}
      {activeTab === "tax" && (
        <div className="space-y-6 text-left">
          
          <Card className="p-5 bg-white border border-[#ECE7DF] rounded-[24px] shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-[13.5px] font-black text-gray-900 uppercase tracking-wider">FBR Pakistan Tax Calculator</h3>
                <p className="text-[10px] text-gray-450 font-semibold mt-0.5">Calculate PRA Services Tax (5%) and Filer/Non-Filer Withholding Taxes</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Tax Status:</span>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Filer Active
                </span>
              </div>
            </div>

            {/* Tax calculation grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Inputs panel */}
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9.5px] font-extrabold text-gray-400 uppercase block">Gross Invoice Amount (Rs.)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={whtGrossAmount}
                      onChange={(e) => setWhtGrossAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-[#ECE7DF] rounded-xl text-[12px] font-bold text-gray-800 focus:outline-none focus:border-[#0F5B3E]"
                    />
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9.5px] font-extrabold text-gray-400 uppercase block">Client FBR Filer status</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setClientStatus("filer")}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        clientStatus === "filer" 
                          ? "border-[#0F5B3E] bg-[#E6F0EC]/50 text-[#0F5B3E] font-black text-xs shadow-2xs" 
                          : "border-[#ECE7DF] hover:bg-gray-50 text-gray-600 font-bold text-xs"
                      }`}
                    >
                      Active Filer (3% WHT)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setClientStatus("non-filer")}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        clientStatus === "non-filer" 
                          ? "border-rose-300 bg-rose-50/50 text-rose-700 font-black text-xs shadow-2xs" 
                          : "border-[#ECE7DF] hover:bg-gray-50 text-gray-600 font-bold text-xs"
                      }`}
                    >
                      Non-Filer (6% WHT)
                    </button>
                  </div>
                </div>
              </div>

              {/* Outputs panel */}
              <div className="bg-[#FAF8F5] p-5 border border-[#ECE7DF] rounded-[20px] flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="text-[12.5px] font-black text-gray-900 uppercase tracking-wider pb-1.5 border-b border-gray-200">
                    Tax Invoice Breakdown
                  </h4>

                  <div className="space-y-2 text-[11px] font-semibold text-gray-500">
                    <div className="flex justify-between">
                      <span>Gross Event Amount:</span>
                      <span className="text-gray-900 font-bold">Rs. {(parseFloat(whtGrossAmount) || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PRA Services Tax (5%):</span>
                      <span className="text-emerald-700 font-bold">+ Rs. {whtBill.praTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FBR Withholding Tax ({clientStatus === "filer" ? "3%" : "6%"} WHT):</span>
                      <span className="text-rose-600 font-bold">- Rs. {whtBill.wht.toLocaleString()}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-2 flex justify-between text-[13px] font-black text-[#0F5B3E]">
                      <span>Receivable Balance:</span>
                      <span>Rs. {whtBill.netReceivable.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E6F0EC] text-[#0F5B3E] p-2.5 rounded-xl text-[10px] leading-relaxed mt-4 font-semibold border border-[#0F5B3E]/10">
                  WHT deductions are automatically calculated for the Income Tax return sheet. PRA services tax is collected for provincial filing.
                </div>
              </div>

            </div>

            {/* Export Section */}
            <div className="mt-6 p-4 bg-[#FAF8F5] border border-[#ECE7DF] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8.5 h-8.5 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <FileSpreadsheet className="w-4.5 h-4.5" />
                </div>
                <div className="text-left leading-tight">
                  <h4 className="text-[12px] font-black text-gray-900">Download PRA/SRB Tax Filings Ledger</h4>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Formatted specifically for FBR portal imports (Excel format).</p>
                </div>
              </div>

              <button className="px-4 py-2 bg-[#0F5B3E] hover:bg-[#0a3b2a] text-white rounded-xl text-[11.5px] font-extrabold uppercase transition-all shadow-xs shrink-0">
                Generate WHT Sheet
              </button>
            </div>
          </Card>

        </div>
      )}

    </div>
  )
}
