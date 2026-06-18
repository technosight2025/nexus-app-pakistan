"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, Gift, ArrowUpRight, ArrowDownRight, Search, Plus, Filter, Download, CreditCard, Banknote, History, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK_TRANSACTIONS = [
  { id: 1, name: "Taya Abu (Lahore)", relation: "Paternal Uncle", type: "cash", amount: 50000, event: "Baraat", date: "Oct 12", status: "received" },
  { id: 2, name: "Khalid Uncle (UK)", relation: "Family Friend", type: "digital", amount: 100000, event: "Valima", date: "Oct 14", status: "cleared" },
  { id: 3, name: "Cousin Ali", relation: "First Cousin", type: "cash", amount: 10000, event: "Mehndi", date: "Oct 10", status: "received" },
  { id: 4, name: "Sara Aunty (Dubai)", relation: "Maternal Aunt", type: "digital", amount: 75000, event: "Mehndi", date: "Oct 10", status: "cleared" },
  { id: 5, name: "Neighbors (House 42)", relation: "Neighbor", type: "cash", amount: 5000, event: "Baraat", date: "Oct 12", status: "received" },
]

export function SalamiLedger() {
  const [activeTab, setActiveTab] = useState<'all' | 'cash' | 'digital'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const filteredTransactions = MOCK_TRANSACTIONS.filter(t => {
    if (activeTab !== 'all' && t.type !== activeTab) return false
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const totalCollected = MOCK_TRANSACTIONS.reduce((acc, curr) => acc + curr.amount, 0)
  const digitalCollected = MOCK_TRANSACTIONS.filter(t => t.type === 'digital').reduce((acc, curr) => acc + curr.amount, 0)
  const cashCollected = MOCK_TRANSACTIONS.filter(t => t.type === 'cash').reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold mb-4 text-xs tracking-wider">
            <Wallet className="w-4 h-4" /> DIGITAL LEDGER
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Salami & Neondra Tracker</h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl">
            Never lose track of a gifting envelope again. Manage cash receipts and digital Raast transfers in one beautiful dashboard.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsAdding(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20">
            <Plus className="w-5 h-5 mr-2" /> Log Cash Envelope
          </Button>
          <Button variant="outline" className="rounded-xl font-bold border-slate-200">
            <Download className="w-5 h-5 mr-2" /> Export Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-emerald-600 font-bold flex items-center text-sm"><ArrowUpRight className="w-4 h-4 mr-1"/> 12% vs last event</span>
          </div>
          <p className="text-slate-500 font-bold mb-1 relative z-10">Total Salami Collected</p>
          <h3 className="text-4xl font-black text-slate-900 relative z-10">Rs {totalCollected.toLocaleString()}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 border-2 border-blue-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 font-bold mb-1 relative z-10">Digital (IBFT/Raast)</p>
          <h3 className="text-4xl font-black text-slate-900 relative z-10">Rs {digitalCollected.toLocaleString()}</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 border-2 border-orange-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Banknote className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 font-bold mb-1 relative z-10">Cash Envelopes</p>
          <h3 className="text-4xl font-black text-slate-900 relative z-10">Rs {cashCollected.toLocaleString()}</h3>
        </motion.div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 items-center bg-slate-50/50">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button onClick={() => setActiveTab('all')} className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>All</button>
            <button onClick={() => setActiveTab('digital')} className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'digital' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Digital</button>
            <button onClick={() => setActiveTab('cash')} className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'cash' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Cash</button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" placeholder="Search guest name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Button variant="outline" className="rounded-xl border-slate-200"><Filter className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-sm">
                <th className="px-6 py-4 font-bold">Guest Name</th>
                <th className="px-6 py-4 font-bold">Relation</th>
                <th className="px-6 py-4 font-bold">Event</th>
                <th className="px-6 py-4 font-bold">Type</th>
                <th className="px-6 py-4 font-bold text-right">Amount (PKR)</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTransactions.map((tx) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    key={tx.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-900">{tx.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{tx.relation}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{tx.event}</td>
                    <td className="px-6 py-4">
                      {tx.type === 'digital' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                          <CreditCard className="w-3 h-3" /> Digital
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                          <Banknote className="w-3 h-3" /> Cash
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900 text-right">
                      Rs {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold ${tx.status === 'cleared' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {tx.status === 'cleared' ? <CheckCircle2 className="w-4 h-4" /> : <History className="w-4 h-4" />}
                        {tx.status === 'cleared' ? 'Cleared' : 'Logged'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center text-slate-500 font-medium">
              No envelopes found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
