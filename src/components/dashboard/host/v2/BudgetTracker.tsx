"use client"
 
import { useState, useEffect } from "react"
import { 
  Wallet, Plus, Download, TrendingUp, PieChart, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, Flame, X, Trash2, Edit2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, BarChart, Bar } from "recharts"

interface BudgetItem {
  id: number;
  name: string;
  allocated: number;
  spent: number;
  paymentMethod: "Raast" | "Cash";
  status: "Paid" | "Partial" | "Unpaid";
}

const DEFAULT_BUDGET_ITEMS: BudgetItem[] = [
  { id: 1, name: "Banquet Hall / Venue Booking", allocated: 1200000, spent: 400000, paymentMethod: "Raast", status: "Partial" },
  { id: 2, name: "Catering & Shadi Feasts", allocated: 800000, spent: 0, paymentMethod: "Raast", status: "Unpaid" },
  { id: 3, name: "Photography & Video Coverage", allocated: 300000, spent: 100000, paymentMethod: "Cash", status: "Partial" },
  { id: 4, name: "Stage Decoration & Florals", allocated: 200000, spent: 200000, paymentMethod: "Raast", status: "Paid" }
]

export function BudgetTracker() {
  const [isMounted, setIsMounted] = useState(false)
  const [totalBudget, setTotalBudget] = useState(2500000)
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(DEFAULT_BUDGET_ITEMS)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null)
  
  // Form states
  const [formName, setFormName] = useState("")
  const [formAllocated, setFormAllocated] = useState("")
  const [formSpent, setFormSpent] = useState("")
  const [formMethod, setFormMethod] = useState<"Raast" | "Cash">("Raast")
  const [formStatus, setFormStatus] = useState<"Paid" | "Partial" | "Unpaid">("Unpaid")

  // Load from local storage
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const storedTotal = localStorage.getItem("nexus_crm_total_budget")
      if (storedTotal) {
        const parsed = parseInt(storedTotal)
        if (!isNaN(parsed)) setTotalBudget(parsed)
      }

      const storedItems = localStorage.getItem("nexus_crm_budget_list")
      if (storedItems) {
        try {
          setBudgetItems(JSON.parse(storedItems))
        } catch (e) {
          console.error("Error parsing budget items:", e)
        }
      }
    }
  }, [])

  // Save to local storage helper
  const saveToStorage = (newTotal: number, newItems: BudgetItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_crm_total_budget", String(newTotal))
      localStorage.setItem("nexus_crm_budget_list", JSON.stringify(newItems))
    }
  }

  const handleOpenAddModal = () => {
    setEditingItem(null)
    setFormName("")
    setFormAllocated("")
    setFormSpent("")
    setFormMethod("Raast")
    setFormStatus("Unpaid")
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (item: BudgetItem) => {
    setEditingItem(item)
    setFormName(item.name)
    setFormAllocated(String(item.allocated))
    setFormSpent(String(item.spent))
    setFormMethod(item.paymentMethod)
    setFormStatus(item.status)
    setIsModalOpen(true)
  }

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this budget item?")) {
      const updated = budgetItems.filter(item => item.id !== id)
      setBudgetItems(updated)
      saveToStorage(totalBudget, updated)
    }
  }

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formAllocated) return

    const allocatedNum = Math.max(0, parseInt(formAllocated) || 0)
    const spentNum = Math.max(0, parseInt(formSpent) || 0)

    let updatedItems: BudgetItem[]
    if (editingItem) {
      updatedItems = budgetItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, name: formName, allocated: allocatedNum, spent: spentNum, paymentMethod: formMethod, status: formStatus }
          : item
      )
    } else {
      const newItem: BudgetItem = {
        id: Date.now(),
        name: formName,
        allocated: allocatedNum,
        spent: spentNum,
        paymentMethod: formMethod,
        status: formStatus
      }
      updatedItems = [...budgetItems, newItem]
    }

    setBudgetItems(updatedItems)
    saveToStorage(totalBudget, updatedItems)
    setIsModalOpen(false)
  }

  const totalSpent = budgetItems.reduce((acc, item) => acc + (item.spent || 0), 0)
  const percentSpent = Math.min(100, Math.round((totalSpent / totalBudget) * 100)) || 0
  const remainingBudget = totalBudget - totalSpent

  // Colors for dynamic category cards
  const categoryColors = [
    { color: "bg-[#312E81] text-white", ring: "stroke-[#312E81]" },
    { color: "bg-[#059669] text-white", ring: "stroke-[#059669]" },
    { color: "bg-[#D4AF37] text-white", ring: "stroke-[#D4AF37]" },
    { color: "bg-[#4338ca] text-white", ring: "stroke-[#4338ca]" },
  ]

  // Chart data from current categories
  const chartData = budgetItems.map((item) => ({
    name: item.name.length > 15 ? item.name.substring(0, 12) + "..." : item.name,
    allocated: item.allocated,
    spent: item.spent
  }))

  if (!isMounted) return null

  return (
    <div className="p-3 max-w-[1440px] mx-auto text-[#1A1A1A] space-y-3 pb-24 md:pb-6 relative h-full">

      {/* ═══ ROW 1: Header (12 Col) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 bg-gradient-to-br from-[#1e1b4b] via-[#312E81] to-[#4338ca] rounded-2xl p-5 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#312E81] bg-white px-2 py-0.5 rounded-full shadow-sm">
                BUDGET TRACKER
              </span>
              <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1">
                <Flame className="w-3 h-3 animate-pulse" />
                {percentSpent <= 100 ? "On Budget" : "Over Budget"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">Financial Overview</h1>
            <p className="text-white/60 text-xs font-medium flex items-center gap-1.5 mt-1">
              <Wallet className="w-3.5 h-3.5" /> 
              {remainingBudget >= 0 
                ? `PKR ${new Intl.NumberFormat("en-PK").format(remainingBudget)} remaining` 
                : `PKR ${new Intl.NumberFormat("en-PK").format(Math.abs(remainingBudget))} over budget`}
            </p>
          </div>

          <div className="relative z-10 flex gap-2 mt-4 md:mt-0">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="text-[10px] font-bold text-white/70">Total Budget:</span>
              <input 
                type="number" 
                value={totalBudget} 
                onChange={(e) => {
                  const val = Math.max(0, parseInt(e.target.value) || 0)
                  setTotalBudget(val)
                  saveToStorage(val, budgetItems)
                }}
                className="bg-transparent text-white font-black text-xs w-28 outline-none border-b border-white/30 focus:border-white text-right"
              />
            </div>
            <button 
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[#312E81] hover:bg-indigo-50 rounded-xl shadow-sm transition-all font-bold text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Item
            </button>
          </div>
        </div>
      </div>

      {/* ═══ ROW 2: Category Bento (4x 3 Cols or dynamic grid) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        {budgetItems.slice(0, 4).map((item, idx) => {
          const styling = categoryColors[idx % categoryColors.length]
          const pct = Math.min(100, Math.round((item.spent / item.allocated) * 100)) || 0
          return (
            <div 
              key={item.id} 
              onClick={() => handleOpenEditModal(item)}
              className="col-span-6 md:col-span-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col hover:border-[#312E81]/20 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${styling.color}`}><PieChart className="w-4 h-4" /></div>
                <div className="relative w-8 h-8">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" strokeWidth="12" strokeLinecap="round" className={styling.ring} strokeDasharray={`${pct * 2.51} 251`} />
                  </svg>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 truncate">{item.name}</p>
              <p className="text-lg font-black text-[#1A1A1A] leading-none mb-1">
                PKR {item.spent >= 100000 ? `${(item.spent / 100000).toFixed(1)} Lakh` : new Intl.NumberFormat("en-PK").format(item.spent)}
              </p>
              <p className="text-[9px] font-bold text-slate-400 mt-auto">
                of PKR {item.allocated >= 100000 ? `${(item.allocated / 100000).toFixed(1)} Lakh` : new Intl.NumberFormat("en-PK").format(item.allocated)}
              </p>
            </div>
          )
        })}
        {budgetItems.length === 0 && (
          <div className="col-span-12 bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-xs font-bold">
            No budget items configured. Click "+ Item" to start your planning list.
          </div>
        )}
      </div>

      {/* ═══ ROW 3: Chart & Transactions (6 + 6 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Allocation vs Spent Chart */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-black text-[#1A1A1A]">Allocation vs Spent</h3>
              <p className="text-[10px] font-bold text-slate-500 mt-0.5">Comparing allocations vs actual expenditures</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spent</p>
              <p className="text-lg font-black text-[#BE185D]">
                PKR {totalSpent >= 100000 ? `${(totalSpent / 100000).toFixed(1)} Lakh` : new Intl.NumberFormat("en-PK").format(totalSpent)}
              </p>
            </div>
          </div>
          <div className="flex-1 h-[200px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
                    formatter={(val: any) => [`PKR ${new Intl.NumberFormat("en-PK").format(val)}`]}
                  />
                  <Bar dataKey="allocated" fill="#EEF2FF" name="Allocated" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" fill="#312E81" name="Spent" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400 font-bold">
                No items to display on chart
              </div>
            )}
          </div>
        </div>

        {/* Item Breakdown List */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black text-[#1A1A1A]">Expense Breakdown List</h3>
            <span className="text-[10px] font-bold text-slate-400">{budgetItems.length} categories</span>
          </div>
          <div className="space-y-2 flex-1 max-h-[260px] overflow-y-auto pr-1">
            {budgetItems.map(item => (
              <div key={item.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between group hover:bg-white hover:border-[#312E81]/20 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    item.status === 'Paid' ? 'bg-emerald-50 text-[#059669]' : 'bg-indigo-50 text-[#312E81]'
                  }`}>
                    {item.status === 'Paid' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#111827] leading-tight group-hover:text-[#312E81]">{item.name}</h4>
                    <p className="text-[9px] font-medium text-gray-500 mt-0.5">
                      {item.paymentMethod} &bull; Allocated: PKR {new Intl.NumberFormat("en-PK").format(item.allocated)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[11px] font-black text-[#111827]">
                      PKR {new Intl.NumberFormat("en-PK").format(item.spent)}
                    </p>
                    <span className={`inline-flex items-center gap-1 mt-1 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                      item.status === "Paid" ? "bg-emerald-50 text-[#059669]" : 
                      item.status === "Partial" ? "bg-amber-50 text-amber-700" : 
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1 hover:text-[#312E81] hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ═══ ADD/EDIT EXPENSE MODAL ═══ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[24px] w-full max-w-md p-6 shadow-2xl relative z-10 border border-slate-100"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-lg font-black text-[#312E81] mb-4 font-poppins">
                {editingItem ? "Edit Budget Item" : "Add Budget Item"}
              </h3>
              
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Item Name / Category</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Venue Booking, Floral Setup"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#312E81] focus:ring-2 focus:ring-[#312E81]/10 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Allocated (PKR)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 500000"
                      value={formAllocated}
                      onChange={(e) => setFormAllocated(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Spent (PKR)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 250000"
                      value={formSpent}
                      onChange={(e) => setFormSpent(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Method</label>
                    <select
                      value={formMethod}
                      onChange={(e) => setFormMethod(e.target.value as "Raast" | "Cash")}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    >
                      <option value="Raast">Raast Instant Pay</option>
                      <option value="Cash">Cash Payments</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as "Paid" | "Partial" | "Unpaid")}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Partial">Partial</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-[#E8E2D5] rounded-xl text-xs font-bold text-[#1A1A1A] hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-[#312E81] text-white rounded-xl text-xs font-bold hover:bg-[#4338ca] transition-colors shadow-sm shadow-indigo-900/20"
                  >
                    {editingItem ? "Save Changes" : "Create Item"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
