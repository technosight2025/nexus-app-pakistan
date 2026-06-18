"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Wallet, ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3,
  Calendar, Users, CircleAlert, DollarSign, Download, Plus,
  FileSpreadsheet, ArrowRight, Tag, Percent
} from "lucide-react"

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "transactions" | "payroll" | "tax">("analytics")

  // Mock financial stats
  const stats = [
    { name: "Monthly Profit", value: "Rs. 1,65,000", change: "↑ 38%", isPositive: true, detail: "vs last month" },
    { name: "Total Revenue", value: "Rs. 2,45,000", change: "↑ 32%", isPositive: true, detail: "5 events billed" },
    { name: "Total Expenses", value: "Rs. 80,000", change: "↓ 12%", isPositive: true, detail: "Vendor + Payroll" },
    { name: "Outstanding Invoices", value: "Rs. 1,10,000", change: "4 invoices", isPositive: false, detail: "Due in 15 days" }
  ]

  // Mock transactions
  const transactions = [
    { id: "TXN-809", name: "Ayesha & Hamza Wedding Booking", type: "Revenue", category: "Event Booking", amount: "Rs. 60,000", date: "May 20, 2025", status: "Paid" },
    { id: "TXN-810", name: "Freelance Photographer - Usman Ali", type: "Expense", category: "Payroll", amount: "Rs. 15,000", date: "May 22, 2025", status: "Paid" },
    { id: "TXN-811", name: "Zainab Pre-Wedding Shoot Balance", type: "Revenue", category: "Event Booking", amount: "Rs. 25,000", date: "May 24, 2025", status: "Paid" },
    { id: "TXN-812", name: "Camera Equipment Rental - Lens Loft", type: "Expense", category: "Equipment", amount: "Rs. 8,500", date: "May 25, 2025", status: "Paid" },
    { id: "TXN-813", name: "Ahmed Studio Quotation Deposit", type: "Revenue", category: "Deposit", amount: "Rs. 40,000", date: "May 26, 2025", status: "Pending" },
    { id: "TXN-814", name: "Catering Vendor Payout - FoodArt", type: "Expense", category: "Vendor Payout", amount: "Rs. 32,000", date: "May 28, 2025", status: "Paid" }
  ]

  // Mock payroll info
  const payroll = [
    { name: "Usman Ali", role: "Lead Photographer", type: "Freelancer", rate: "Rs. 15,000/event", shoots: 3, pending: "Rs. 0", paid: "Rs. 45,000" },
    { name: "Hira Khan", role: "Video Editor", type: "Monthly Employee", rate: "Rs. 45,000/mo", shoots: null, pending: "Rs. 45,000", paid: "Rs. 0" },
    { name: "Bilal Ahmed", role: "Drone Operator", type: "Daily Wager", rate: "Rs. 5,000/day", shoots: 4, pending: "Rs. 10,000", paid: "Rs. 10,000" }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#ECE7DF] dark:border-white/10 pb-5">
        <div>
          <h1 className="text-[26px] font-black text-gray-950 dark:text-white leading-tight font-serif flex items-center gap-2">
            Accounting Pro <Wallet className="w-6 h-6 text-[#0F5B3E]" />
          </h1>
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 font-semibold">
            Track revenue streams, classify operating expenses, issue payouts, and access financial intelligence reports.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[10px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs">
            <Download className="w-3.5 h-3.5" /> Export Sheet
          </button>
          <button className="px-3.5 py-1.5 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Record Entry
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-[12px] border border-transparent dark:border-white/10 w-fit">
        <button 
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "analytics" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Financial Analytics
        </button>
        <button 
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "transactions" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Revenue & Expenses
        </button>
        <button 
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "payroll" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Payroll & Vendor Payouts
        </button>
        <button 
          onClick={() => setActiveTab("tax")}
          className={`px-4 py-1.5 rounded-[9px] text-[12px] font-bold transition-all ${
            activeTab === "tax" 
              ? "bg-white dark:bg-white/10 text-gray-950 dark:text-white shadow-xs" 
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          Tax Estimation
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(stat => (
          <div key={stat.name} className="py-3.5 px-4.5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] flex items-center justify-between shadow-2xs">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{stat.name}</span>
              <h3 className="text-[20px] font-black text-gray-950 dark:text-white leading-none mt-1.5">{stat.value}</h3>
              <div className="text-[9.5px] font-bold flex items-center gap-1 mt-2 leading-none">
                <span className={stat.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}>
                  {stat.change}
                </span>
                <span className="text-gray-400 dark:text-gray-500 font-medium">{stat.detail}</span>
              </div>
            </div>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              stat.name.includes("Profit") || stat.name.includes("Revenue")
                ? "bg-[#E6F0EC] text-[#0F5B3E] dark:bg-emerald-500/10 dark:text-emerald-400"
                : stat.name.includes("Expenses")
                ? "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400"
                : "bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
            }`}>
              {stat.name.includes("Profit") ? <TrendingUp className="w-4.5 h-4.5" /> :
               stat.name.includes("Revenue") ? <ArrowUpRight className="w-4.5 h-4.5" /> :
               stat.name.includes("Expenses") ? <ArrowDownRight className="w-4.5 h-4.5" /> :
               <CircleAlert className="w-4.5 h-4.5" />}
            </div>
          </div>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart Widget */}
          <Card className="lg:col-span-2 p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs h-[320px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Revenue vs Expenses (P&L Trend)</h3>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Last 30 days financial graph</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" /> Revenue
                </span>
                <span className="flex items-center gap-1 text-[9.5px] font-bold text-rose-500 dark:text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Expenses
                </span>
              </div>
            </div>

            {/* SVG Charts */}
            <div className="relative w-full h-[180px] mt-4">
              {/* Grid Lines */}
              <div className="absolute inset-x-0 bottom-6 top-2 flex flex-col justify-between">
                <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                  <span className="w-6 shrink-0 text-left">300k</span>
                  <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
                </div>
                <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                  <span className="w-6 shrink-0 text-left">150k</span>
                  <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
                </div>
                <div className="w-full flex items-center justify-between text-[9px] font-bold text-gray-300 dark:text-white/10">
                  <span className="w-6 shrink-0 text-left">0</span>
                  <div className="flex-1 border-t border-dashed border-gray-200 dark:border-white/10 ml-2" />
                </div>
              </div>

              {/* Chart Lines */}
              <svg className="absolute inset-x-0 bottom-6 left-8 right-0 h-[130px] w-[calc(100%-32px)] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Revenue Curve */}
                <path d="M 0 90 Q 20 50, 25 45 T 50 65 T 75 30 T 100 15" fill="none" stroke="#0F5B3E" strokeWidth="2.5" strokeLinecap="round" />
                {/* Expense Curve */}
                <path d="M 0 95 Q 20 80, 25 78 T 50 85 T 75 70 T 100 60" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeDasharray="2,2" />
              </svg>

              {/* Axis labels */}
              <div className="w-full flex justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 pl-8 pt-1 absolute bottom-0">
                <span>May 20</span>
                <span>May 27</span>
                <span>Jun 03</span>
                <span>Jun 10</span>
                <span>Jun 17</span>
                <span>Jun 20</span>
              </div>
            </div>
          </Card>

          {/* Quick breakdown list */}
          <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs h-[320px] flex flex-col justify-between">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Cash Flow Health</h3>
            
            <div className="flex-1 flex flex-col justify-center gap-3.5 my-2">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-gray-500 dark:text-gray-400">Total Profit margin</span>
                <span className="text-emerald-600 dark:text-emerald-400">67.3%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#0F5B3E] rounded-full" style={{ width: "67.3%" }} />
              </div>

              <div className="flex justify-between items-center text-[11px] font-bold pt-1.5 border-t border-gray-100 dark:border-white/5">
                <span className="text-gray-500 dark:text-gray-400">Tax Liabilities (Est.)</span>
                <span className="text-rose-500">Rs. 12,250</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold pt-1.5 border-t border-gray-100 dark:border-white/5">
                <span className="text-gray-500 dark:text-gray-400">Pending Receivables</span>
                <span className="text-amber-500">Rs. 1,10,000</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold pt-1.5 border-t border-gray-100 dark:border-white/5">
                <span className="text-gray-500 dark:text-gray-400">Direct Vendor payables</span>
                <span className="text-gray-950 dark:text-white">Rs. 32,000</span>
              </div>
            </div>

            <button className="w-full py-1.5 border border-[#ECE7DF] dark:border-white/10 rounded-[10px] text-[11px] font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors">
              P&L Ledger Book
            </button>
          </Card>
        </div>
      )}

      {activeTab === "transactions" && (
        <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
          <div className="flex items-center justify-between mb-4.5">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">Transaction Registry</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400">Filter type:</span>
              <select className="px-2 py-1 bg-white dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-lg text-[10.5px] font-bold text-gray-700 dark:text-gray-300">
                <option>All Transactions</option>
                <option>Revenue Only</option>
                <option>Expenses Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11.5px] font-semibold text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5 text-gray-400 uppercase text-[9px] tracking-wider font-extrabold">
                  <th className="py-2.5 pb-2">TXN ID</th>
                  <th className="py-2.5 pb-2">Description</th>
                  <th className="py-2.5 pb-2">Category</th>
                  <th className="py-2.5 pb-2">Type</th>
                  <th className="py-2.5 pb-2">Date</th>
                  <th className="py-2.5 pb-2 text-right">Amount</th>
                  <th className="py-2.5 pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {transactions.map(txn => (
                  <tr key={txn.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 text-gray-400 dark:text-gray-500 font-bold">{txn.id}</td>
                    <td className="py-3 font-bold text-gray-950 dark:text-white">{txn.name}</td>
                    <td className="py-3">{txn.category}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[6px] text-[9.5px] font-bold ${
                        txn.type === "Revenue"
                          ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "text-rose-700 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400"
                      }`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">{txn.date}</td>
                    <td className="py-3 text-right font-black text-gray-950 dark:text-white">{txn.amount}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                        txn.status === "Paid" ? "bg-emerald-600" : "bg-amber-400"
                      }`} />
                      {txn.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "payroll" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
            <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-4">Staff & Contractor Payroll</h3>
            
            <div className="space-y-4">
              {payroll.map(staff => (
                <div key={staff.name} className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0F5B3E]/10 dark:bg-emerald-500/10 text-[#0F5B3E] dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                      {staff.name[0]}
                    </div>
                    <div>
                      <h4 className="text-[12px] font-extrabold text-gray-950 dark:text-white leading-tight">{staff.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{staff.role} • <span className="font-bold">{staff.type}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between sm:justify-end text-[11px] font-bold text-gray-600 dark:text-gray-400">
                    <div className="text-left">
                      <p className="text-[9px] text-gray-400 uppercase">Rate</p>
                      <p className="text-gray-950 dark:text-white">{staff.rate}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] text-gray-400 uppercase">Unpaid</p>
                      <p className="text-rose-500">{staff.pending}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] text-gray-400 uppercase">Paid</p>
                      <p className="text-emerald-600">{staff.paid}</p>
                    </div>
                    {staff.pending !== "Rs. 0" ? (
                      <button className="px-2.5 py-1 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-lg text-[10px] font-bold">
                        Pay
                      </button>
                    ) : (
                      <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">✓ Cleared</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white mb-1">Direct Vendor Payments</h3>
              <p className="text-[10px] text-gray-400 font-semibold mb-4">Pay partners (caterers, decorations, halls)</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white leading-tight">FoodArt Caterers</h4>
                    <span className="text-[9.5px] text-gray-400">Ayesha & Hamza Wedding</span>
                  </div>
                  <span className="text-[11px] font-bold text-rose-500">Rs. 32,000</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white leading-tight">Flora Decorators</h4>
                    <span className="text-[9.5px] text-gray-400">Sarah Khan Outdoor Shoot</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600">✓ Settled</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-[#0F5B3E] hover:bg-[#0d4d34] text-white rounded-[10px] text-[11px] font-bold transition-colors">
              Manage Vendor Ledger
            </button>
          </Card>
        </div>
      )}

      {activeTab === "tax" && (
        <Card className="p-5 bg-white dark:bg-white/5 border border-[#ECE7DF]/50 dark:border-white/10 rounded-[16px] shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-4 mb-4">
            <div>
              <h3 className="text-[13.5px] font-bold text-gray-950 dark:text-white">FBR Tax Estimation Registry</h3>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Calculated based on active sales and invoices logs for Pakistani businesses.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400">Status:</span>
              <span className="px-2 py-0.5 rounded-[6px] bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-100">Filer Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 space-y-1.5">
              <span className="text-[9.5px] font-bold text-gray-450 dark:text-gray-500 uppercase">Estimated Sales Tax (PRA/SRB)</span>
              <h4 className="text-[20px] font-black text-gray-950 dark:text-white">Rs. 39,200</h4>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Estimated 16% on services revenue generated inside Punjab & Sindh.</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 space-y-1.5">
              <span className="text-[9.5px] font-bold text-gray-450 dark:text-gray-500 uppercase">Withholding Tax (WHT)</span>
              <h4 className="text-[20px] font-black text-gray-950 dark:text-white">Rs. 18,500</h4>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Deducted at source by corporate clients (Filer status WHT 3%).</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5 space-y-1.5">
              <span className="text-[9.5px] font-bold text-gray-450 dark:text-gray-500 uppercase">Net Income Tax Liability</span>
              <h4 className="text-[20px] font-black text-rose-500">Rs. 12,250</h4>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Final tax calculated after deducting operating expenses and salaries.</p>
            </div>
          </div>

          <div className="mt-6 p-4 border border-[#ECE7DF] dark:border-white/10 rounded-xl bg-[#FAF8F5] dark:bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                <Percent className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <h4 className="text-[11.5px] font-extrabold text-gray-950 dark:text-white leading-tight">Generate FBR tax filing documentation</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Download formatted sales and expenses ledgers mapped to the IRS layout.</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-950 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold transition-colors">
              FBR Format Export
            </button>
          </div>
        </Card>
      )}

    </div>
  )
}
