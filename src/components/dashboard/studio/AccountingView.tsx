"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, Plus, Search, FileText, 
  ArrowUpRight, ArrowDownRight, DollarSign, 
  Clock, CheckCircle2, AlertCircle, X, Download,
  Wallet, Banknote, Building, Smartphone, Filter,
  Trash2, Camera, Users, Car, Utensils, Layers, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Expense {
  id: string
  name: string
  category: string
  project: string
  amount: number
  date: string
  method: string
}

const INITIAL_EXPENSES: Expense[] = [
  {
    id: "EXP-1001",
    name: "Sony A7IV Rental (2 Days)",
    category: "Gear Rental",
    project: "Ali & Sara Wedding",
    amount: 15000,
    date: "2023-10-10",
    method: "Cash"
  },
  {
    id: "EXP-1002",
    name: "Second Videographer Payout",
    category: "Crew Payout",
    project: "Ali & Sara Wedding",
    amount: 25000,
    date: "2023-10-12",
    method: "Bank Transfer"
  },
  {
    id: "EXP-1003",
    name: "Travel & Fuel Reimbursement",
    category: "Travel",
    project: "TechCorp Gala",
    amount: 8000,
    date: "2023-10-20",
    method: "EasyPaisa"
  },
  {
    id: "EXP-1004",
    name: "Crew Dinner & Refreshments",
    category: "Food",
    project: "Zainab's Mehndi",
    amount: 6500,
    date: "2023-10-14",
    method: "Cash"
  },
  {
    id: "EXP-1005",
    name: "Gimbal Stabilizer Repair",
    category: "Other",
    project: "General Studio Maintenance",
    amount: 12000,
    date: "2023-10-18",
    method: "JazzCash"
  }
]

export function AccountingView() {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  
  // Modal States
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  
  // Form States
  const [expenseForm, setExpenseForm] = useState({
    name: "",
    category: "Gear Rental",
    project: "Ali & Sara Wedding",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    method: "Bank Transfer"
  })

  // Fixed sales revenue for demo
  const salesRevenue = 750000

  // Calculate Metrics
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const netProfit = salesRevenue - totalExpenses
  const marginPercentage = ((netProfit / salesRevenue) * 100).toFixed(1)

  const formatCurrency = (amount: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount);
  }
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Gear Rental": return <Camera className="w-4 h-4 text-indigo-600" />
      case "Crew Payout": return <Users className="w-4 h-4 text-rose-600" />
      case "Travel": return <Car className="w-4 h-4 text-blue-600" />
      case "Food": return <Utensils className="w-4 h-4 text-orange-600" />
      default: return <Layers className="w-4 h-4 text-slate-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Gear Rental": return "bg-indigo-50 border-indigo-100 text-indigo-700"
      case "Crew Payout": return "bg-rose-50 border-rose-100 text-rose-700"
      case "Travel": return "bg-blue-50 border-blue-100 text-blue-700"
      case "Food": return "bg-orange-50 border-orange-100 text-orange-700"
      default: return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!expenseForm.name || !expenseForm.amount) return

    const newExp: Expense = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      name: expenseForm.name,
      category: expenseForm.category,
      project: expenseForm.project,
      amount: parseFloat(expenseForm.amount),
      date: expenseForm.date,
      method: expenseForm.method
    }

    setExpenses([newExp, ...expenses])
    setIsAddExpenseOpen(false)
    setExpenseForm({
      name: "",
      category: "Gear Rental",
      project: "Ali & Sara Wedding",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      method: "Bank Transfer"
    })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "All" || exp.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Category summary weights
  const categoryBreakdown = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <CreditCard className="w-8 h-8 text-indigo-400" /> Accounting & Expenses
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Track gear rentals, model payouts, travel fees, and food costs to measure net profit margins.
          </p>
        </div>
        
        <Button onClick={() => setIsAddExpenseOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0 relative z-10">
          <Plus className="w-4 h-4 mr-2" /> Log Expense
        </Button>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-slate-300 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-black text-slate-900">{formatCurrency(salesRevenue)}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Total Sales Revenue</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-rose-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <ArrowDownRight className="w-6 h-6" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-black text-slate-900">{formatCurrency(totalExpenses)}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Logged Expenses</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-black text-emerald-600">{formatCurrency(netProfit)}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Net Studio Profit</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-indigo-600 text-xs font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">Healthy</span>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-black text-slate-900">{marginPercentage}%</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Net Margin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Ledger Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-black text-slate-900 text-base">Expense Bookkeeping</h2>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search project or detail..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
                />
              </div>

              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-xl outline-none shadow-sm cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Gear Rental">Gear Rental</option>
                <option value="Crew Payout">Crew Payout</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-100">Expense Detail</th>
                  <th className="px-6 py-4 border-b border-slate-100">Category</th>
                  <th className="px-6 py-4 border-b border-slate-100">Project Linked</th>
                  <th className="px-6 py-4 border-b border-slate-100 text-right">Amount</th>
                  <th className="px-6 py-4 border-b border-slate-100 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">{exp.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Paid via {exp.method} • {exp.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold border ${getCategoryColor(exp.category)}`}>
                        {getCategoryIcon(exp.category)} {exp.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-700">{exp.project}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-rose-600">{formatCurrency(exp.amount)}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button 
                        onClick={() => handleDeleteExpense(exp.id)}
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-semibold">
                      No expense logs match the filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Breakdown Charts (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="font-black text-slate-900 text-base">Expense Breakdown</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Weighted Categorization</p>
          </div>

          <div className="space-y-4">
            {["Gear Rental", "Crew Payout", "Travel", "Food", "Other"].map((cat) => {
              const amount = categoryBreakdown[cat] || 0
              const percentage = totalExpenses > 0 ? ((amount / totalExpenses) * 100) : 0
              
              return (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        cat === "Gear Rental" ? "bg-indigo-500" :
                        cat === "Crew Payout" ? "bg-rose-500" :
                        cat === "Travel" ? "bg-blue-500" :
                        cat === "Food" ? "bg-orange-500" : "bg-slate-400"
                      }`} />
                      {cat}
                    </span>
                    <span>{formatCurrency(amount)} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat === "Gear Rental" ? "bg-indigo-500" :
                        cat === "Crew Payout" ? "bg-rose-500" :
                        cat === "Travel" ? "bg-blue-500" :
                        cat === "Food" ? "bg-orange-500" : "bg-slate-400"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bookkeeping Note</span>
            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              Expenses are updated real-time across invoices to calculate gross profit margin accurately before taxes. Ensure to request invoice receipts for equipment checkouts.
            </p>
          </div>
        </div>

      </div>

      {/* Log Expense Modal */}
      <AnimatePresence>
        {isAddExpenseOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddExpenseOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-500" /> Log Custom Expense
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Enter detailed expense to balance ledger sheet.</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsAddExpenseOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleAddExpense} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expense Item Name</label>
                  <input 
                    type="text" 
                    required
                    value={expenseForm.name} 
                    onChange={e => setExpenseForm({...expenseForm, name: e.target.value})}
                    placeholder="e.g. Flash Trigger Rent"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                    <select
                      value={expenseForm.category}
                      onChange={e => setExpenseForm({...expenseForm, category: e.target.value})}
                      className="w-full h-11 px-3 border border-slate-200 rounded-xl bg-white text-sm font-bold outline-none cursor-pointer"
                    >
                      <option value="Gear Rental">Gear Rental</option>
                      <option value="Crew Payout">Crew Payout</option>
                      <option value="Travel">Travel</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Linked Project</label>
                    <select
                      value={expenseForm.project}
                      onChange={e => setExpenseForm({...expenseForm, project: e.target.value})}
                      className="w-full h-11 px-3 border border-slate-200 rounded-xl bg-white text-sm font-bold outline-none cursor-pointer"
                    >
                      <option value="Ali & Sara Wedding">Ali & Sara Wedding</option>
                      <option value="Zainab's Mehndi">Zainab's Mehndi</option>
                      <option value="TechCorp Gala">TechCorp Gala</option>
                      <option value="General Studio Maintenance">General Maintenance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Amount (PKR)</label>
                    <input 
                      type="number" 
                      required
                      value={expenseForm.amount} 
                      onChange={e => setExpenseForm({...expenseForm, amount: e.target.value})}
                      placeholder="e.g. 5000"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Method</label>
                    <select
                      value={expenseForm.method}
                      onChange={e => setExpenseForm({...expenseForm, method: e.target.value})}
                      className="w-full h-11 px-3 border border-slate-200 rounded-xl bg-white text-sm font-bold outline-none cursor-pointer"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="JazzCash">JazzCash</option>
                      <option value="EasyPaisa">EasyPaisa</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expense Date</label>
                  <input 
                    type="date" 
                    required
                    value={expenseForm.date} 
                    onChange={e => setExpenseForm({...expenseForm, date: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsAddExpenseOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm font-bold">
                    Log Expense
                  </Button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
