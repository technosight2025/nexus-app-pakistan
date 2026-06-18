"use client"

import { Card } from "@/components/ui/card"
import { Wallet, ArrowUpRight, ArrowDownRight, DollarSign, Download, Plus, Search, Filter } from "lucide-react"

export default function FinancesPage() {
  const transactions = [
    {
      id: "TRX-101",
      date: "Oct 10, 2026",
      description: "Advance Payment - Ali & Fatima Wedding",
      category: "Booking Income",
      type: "income",
      amount: "Rs 425,000",
      status: "Completed"
    },
    {
      id: "TRX-102",
      date: "Oct 09, 2026",
      description: "Freelancer Pay - Ahmad (Editor)",
      category: "Staff Payment",
      type: "expense",
      amount: "Rs 45,000",
      status: "Completed"
    },
    {
      id: "TRX-103",
      date: "Oct 08, 2026",
      description: "Sony A7IV Lens Rental",
      category: "Equipment",
      type: "expense",
      amount: "Rs 15,000",
      status: "Completed"
    },
    {
      id: "TRX-104",
      date: "Oct 05, 2026",
      description: "Final Payment - Corporate Gala",
      category: "Booking Income",
      type: "income",
      amount: "Rs 300,000",
      status: "Pending"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-poppins text-gray-900 dark:text-white tracking-tight">
            Financials
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Track revenue, staff payments, and studio expenses.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-white dark:bg-black/40 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="px-5 py-2.5 bg-[#0A3B2A] dark:bg-cyan-600 text-white rounded-full font-bold text-sm hover:bg-[#0F5B3E] dark:hover:bg-cyan-500 transition-colors shadow-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      {/* Finance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-none bg-gradient-to-br from-[#0A3B2A] to-[#0F5B3E] dark:from-cyan-900/40 dark:to-blue-900/40 dark:backdrop-blur-xl dark:border dark:border-cyan-500/20 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Wallet className="w-32 h-32 -mr-8 -mb-8" />
          </div>
          <div className="relative z-10">
            <p className="text-white/70 dark:text-cyan-100/70 text-sm font-semibold mb-2">Total Revenue (Oct)</p>
            <h3 className="text-3xl font-black mb-1">Rs 1.2M</h3>
            <span className="text-xs font-bold px-2 py-1 bg-white/20 dark:bg-cyan-500/20 rounded-full inline-flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +15% vs Sep
            </span>
          </div>
        </Card>

        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Total Expenses</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">Rs 145K</h3>
          <span className="text-xs font-bold text-red-500 dark:text-red-400 inline-flex items-center gap-1">
            <ArrowDownRight className="w-3 h-3" /> 8% of Revenue
          </span>
        </Card>

        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Outstanding Dues</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">Rs 350K</h3>
          <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">Pending Collection</span>
        </Card>

        <Card className="p-5 border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Net Profit Estimate</p>
          <h3 className="text-3xl font-black text-green-600 dark:text-green-400 mb-1">Rs 1.05M</h3>
          <span className="text-xs font-bold text-green-600 dark:text-green-400 inline-flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Healthy Margin
          </span>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 dark:focus:ring-cyan-500/30 focus:border-[#0A3B2A] dark:focus:border-cyan-500 text-sm"
          />
        </div>
        <button className="px-4 py-2.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Transactions List */}
      <Card className="border-none dark:bg-white/5 dark:backdrop-blur-xl dark:border dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_20px_rgba(255,255,255,0.02)] overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-black/40 border-b border-gray-100 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                <th className="px-6 py-4">Date / ID</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{trx.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{trx.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{trx.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {trx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${trx.status === 'Completed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`font-black ${trx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                      {trx.type === 'income' ? '+' : '-'}{trx.amount}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  )
}
