"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Wallet, CheckCircle2, AlertCircle, Clock, 
  CalendarDays, CreditCard, X, ShieldCheck, Banknote, ArrowUpRight, Plus, Receipt
} from "lucide-react"

interface Installment {
  id: number;
  label: string;
  amount: number;
  date: string;
  status: "paid" | "upcoming" | "pending";
}

interface PaymentSchedule {
  id: string;
  name: string;
  category: string;
  totalQuote: number;
  paidAmount: number;
  image: string;
  installments: Installment[];
}

const INITIAL_SCHEDULES: PaymentSchedule[] = [
  {
    id: "V-IF2026-11",
    name: "Indus Flavors Cauldron",
    category: "Catering & Feasts",
    totalQuote: 1200000,
    paidAmount: 200000,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=300",
    installments: [
      { id: 1, label: "Booking Advance Payout", amount: 200000, date: "Nov 01, 2026", status: "paid" },
      { id: 2, label: "Ingredient Purchase Milestone", amount: 500000, date: "Dec 10, 2026", status: "upcoming" },
      { id: 3, label: "Final Cauldron Clearance", amount: 500000, date: "Dec 16, 2026", status: "pending" },
    ]
  },
  {
    id: "V-RB2026-05",
    name: "Rose Petals Decorators",
    category: "Floral & Lighting Decor",
    totalQuote: 450000,
    paidAmount: 150000,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=300",
    installments: [
      { id: 4, label: "Decor Retainer Deposit", amount: 150000, date: "Nov 10, 2026", status: "paid" },
      { id: 5, label: "Setup Handover Milestone", amount: 150000, date: "Dec 05, 2026", status: "upcoming" },
      { id: 6, label: "Post-Event Payout", amount: 150000, date: "Dec 15, 2026", status: "pending" },
    ]
  },
  {
    id: "V-SP2026-09",
    name: "Sara Tariq Photography",
    category: "Media & Cinematic",
    totalQuote: 250000,
    paidAmount: 50000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300",
    installments: [
      { id: 7, label: "Booking Retainer Fee", amount: 50000, date: "Nov 05, 2026", status: "paid" },
      { id: 8, label: "Shoot Pre-Payment Clearance", amount: 100000, date: "Dec 12, 2026", status: "pending" },
      { id: 9, label: "Album Print Release", amount: 100000, date: "Jan 05, 2027", status: "pending" },
    ]
  }
]

export function PaymentsOverview() {
  const [schedules, setSchedules] = useState<PaymentSchedule[]>(INITIAL_SCHEDULES)
  const [recordingPaymentFor, setRecordingPaymentFor] = useState<string | null>(null)
  
  // Card Form State
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null)
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCVC, setCardCVC] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Load state from local storage if existing to align budget spent
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBudgetList = localStorage.getItem("nexus_crm_budget_list")
      if (storedBudgetList) {
        try {
          const list = JSON.parse(storedBudgetList)
          // Update the paid amount based on the budget items matching categories
          setSchedules(prev => prev.map(sched => {
            const match = list.find((b: any) => b.name.toLowerCase().includes(sched.category.toLowerCase().split(" ")[0]) || b.name.toLowerCase().includes(sched.name.toLowerCase().split(" ")[0]))
            if (match) {
              return {
                ...sched,
                paidAmount: match.spent || sched.paidAmount,
                totalQuote: match.allocated || sched.totalQuote
              }
            }
            return sched
          }))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  const totalCommitted = schedules.reduce((sum, p) => sum + p.totalQuote, 0)
  const totalCleared = schedules.reduce((sum, p) => sum + p.paidAmount, 0)
  const totalUpcoming = schedules.reduce((sum, p) => {
    const upcoming = p.installments.find(i => i.status === 'upcoming')
    return sum + (upcoming ? upcoming.amount : 0)
  }, 0)

  const handlePayNowClick = (vendorId: string, installment: Installment) => {
    setSelectedVendorId(vendorId)
    setSelectedInstallment(installment)
    setIsPayModalOpen(true)
  }

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardNumber || !cardExpiry || !cardCVC) {
      alert("Please fill card details.")
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      if (selectedVendorId && selectedInstallment) {
        const vendorId = selectedVendorId
        const instId = selectedInstallment.id
        const amount = selectedInstallment.amount

        // Update local schedule state
        const updated = schedules.map(vendor => {
          if (vendor.id !== vendorId) return vendor
          
          const newInstallments = vendor.installments.map(inst => {
            if (inst.id === instId) return { ...inst, status: "paid" as const }
            return inst
          })

          // Set next pending as upcoming
          const firstPendingIndex = newInstallments.findIndex(i => i.status === 'pending')
          if (firstPendingIndex !== -1 && !newInstallments.find(i => i.status === 'upcoming')) {
            newInstallments[firstPendingIndex].status = "upcoming" as const
          }

          return {
            ...vendor,
            paidAmount: vendor.paidAmount + amount,
            installments: newInstallments
          }
        })

        setSchedules(updated)

        // Write back to crm budget list if exists
        if (typeof window !== "undefined") {
          const storedBudgetList = localStorage.getItem("nexus_crm_budget_list")
          if (storedBudgetList) {
            try {
              const list = JSON.parse(storedBudgetList)
              const updatedList = list.map((item: any) => {
                const s = updated.find(sched => sched.category.toLowerCase().includes(item.name.toLowerCase().split(" ")[0]) || sched.name.toLowerCase().includes(item.name.toLowerCase().split(" ")[0]))
                if (s) {
                  return {
                    ...item,
                    spent: s.paidAmount,
                    status: s.paidAmount >= s.totalQuote ? "Paid" : "Partial"
                  }
                }
                return item
              })
              localStorage.setItem("nexus_crm_budget_list", JSON.stringify(updatedList))
            } catch (e) {
              console.error(e)
            }
          }
        }
      }

      setIsProcessing(false)
      setIsPayModalOpen(false)
      setCardNumber("")
      setCardExpiry("")
      setCardCVC("")
      alert("Milestone Escrow payment successfully completed and recorded!")
    }, 2000)
  }

  const formatPKR = (val: number) => {
    return 'Rs. ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  }

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1400px] mx-auto space-y-8 text-slate-800 pb-24 md:pb-12 text-left relative h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div>
          <h1 className="text-3xl font-black text-[#0A3B2A] tracking-tight font-heading">Payments Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Release secure escrow payouts, review payment schedules, and view transaction history.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#0A3B2A]/5 border border-[#0A3B2A]/10 px-4 py-2.5 rounded-full text-[#0A3B2A] font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-[#047857]" />
          <span>Double-Ledger Escrow Protection Active</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Total Committed */}
        <div className="bg-[#0A3B2A] rounded-[24px] p-6 shadow-md border border-[#155E45] flex flex-col relative overflow-hidden text-white">
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/20">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-[#EAE4D9] uppercase tracking-widest mb-1 relative z-10">Total Committed</p>
          <p className="text-2xl font-black font-poppins text-white leading-tight relative z-10">{formatPKR(totalCommitted)}</p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-20 blur-[50px] rounded-full pointer-events-none"></div>
        </div>

        {/* Amount Cleared */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-[#A7F3D0] rounded-xl flex items-center justify-center text-[#047857]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Amount Cleared (Paid)</p>
          <p className="text-2xl font-black font-poppins text-[#047857] leading-tight">{formatPKR(totalCleared)}</p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden border border-slate-100/50">
            <div className="h-full bg-[#047857] rounded-full" style={{ width: `${(totalCleared/totalCommitted)*100}%` }}></div>
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 bg-[#FEF3C7] rounded-xl flex items-center justify-center text-[#B45309]">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Upcoming Milestone Dues</p>
          <p className="text-2xl font-black font-poppins text-[#B45309] leading-tight">{formatPKR(totalUpcoming)}</p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEF3C7] opacity-20 blur-[50px] rounded-full pointer-events-none"></div>
        </div>
      </div>

      {/* Main Split Layout: Active Schedules vs Saved Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Columns: Payment Schedules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-base font-black text-[#0A3B2A] font-poppins">Active Milestone Schedules</h2>
              <span className="text-xs font-bold text-slate-500">{schedules.length} Active Schedules</span>
            </div>

            <div className="divide-y divide-slate-100">
              {schedules.map((vendor) => {
                const pct = Math.round((vendor.paidAmount / vendor.totalQuote) * 100)
                const upcoming = vendor.installments.find(i => i.status === 'upcoming')

                return (
                  <div key={vendor.id} className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                          <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                            {vendor.category}
                          </span>
                          <h3 className="text-base font-black text-slate-900 mt-1 leading-snug">{vendor.name}</h3>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[13px] font-medium text-slate-500">Total Commitment: <strong className="text-slate-900 font-mono">{formatPKR(vendor.totalQuote)}</strong></p>
                        <p className="text-[11px] font-bold text-emerald-700 mt-0.5">Cleared: {formatPKR(vendor.paidAmount)} ({pct}%)</p>
                      </div>
                    </div>

                    {/* Timeline List */}
                    <div className="space-y-3 pl-2 border-l-2 border-slate-100 ml-6">
                      {vendor.installments.map((inst) => (
                        <div key={inst.id} className="relative flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                          {/* Dot connector */}
                          <div className={`absolute -left-[14.5px] w-2.5 h-2.5 rounded-full border-2 border-white ${
                            inst.status === 'paid' ? 'bg-[#047857]' : 
                            inst.status === 'upcoming' ? 'bg-[#B45309]' : 
                            'bg-slate-300'
                          }`} />

                          <div className="space-y-1 pl-1">
                            <h4 className={`text-xs font-bold ${inst.status === 'paid' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{inst.label}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Target Due Date: {inst.date}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-900 font-mono">{formatPKR(inst.amount)}</span>
                            
                            {inst.status === 'paid' && (
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-full">
                                Escrow Released
                              </span>
                            )}
                            {inst.status === 'upcoming' && (
                              <button
                                onClick={() => handlePayNowClick(vendor.id, inst)}
                                className="bg-[#0A3B2A] hover:bg-[#035f44] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors"
                              >
                                Pay Now
                              </button>
                            )}
                            {inst.status === 'pending' && (
                              <span className="bg-slate-50 text-slate-400 border border-slate-100 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Locked
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Cards & Actions */}
        <div className="space-y-6">
          {/* Card Management */}
          <div className="bg-white rounded-[32px] p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-[#BE185D]" />
              <h3 className="text-base font-black text-[#0A3B2A] font-poppins">Saved Accounts</h3>
            </div>

            {/* Simulated Card */}
            <div className="w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-[#0A3B2A] via-[#0D4A34] to-[#063020] text-white p-5 flex flex-col justify-between relative overflow-hidden shadow-lg border border-[#155E45]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#BE185D]/20 rounded-full blur-2xl -mr-8 -mt-8" />
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[9px] font-mono font-bold tracking-widest bg-white/15 px-2.5 py-1 rounded-md">NEXUS RAAST LINK</span>
                <Banknote className="w-8 h-8 text-white/80" />
              </div>
              <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">Account Holder</p>
                <p className="text-sm font-black font-serif italic">Zoya Malik</p>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <p className="font-mono text-sm tracking-wider">**** **** **** 4892</p>
                <span className="text-[10px] font-bold uppercase text-slate-300">08/29</span>
              </div>
            </div>

            <button className="w-full h-11 border border-dashed border-slate-200 hover:border-[#0A3B2A] rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-[#0A3B2A] bg-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer">
              <Plus className="w-4 h-4" /> Link New Raast / Card Method
            </button>
          </div>

          {/* Secure Escrow Callout */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 rounded-[32px] p-6 lg:p-8 space-y-4 shadow-sm">
            <div className="w-10 h-10 bg-[#A7F3D0] rounded-xl flex items-center justify-center text-[#047857]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0A3B2A] font-poppins">Escrow Protected Ledger</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              All payments committed on the Nexus platform are held securely in a multi-tenant escrow pool. Funds are only cleared and released to the professional's bank account once you sign off on milestone completions or 24 hours post-event.
            </p>
          </div>
        </div>

      </div>

      {/* RELEASE MILESTONE PAYMENTS MODAL */}
      <AnimatePresence>
        {isPayModalOpen && selectedInstallment && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[80]" onClick={() => setIsPayModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden flex flex-col text-left border border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-base font-black text-slate-900">Release Milestone Payment</h2>
                <button onClick={() => setIsPayModalOpen(false)} className="p-1 rounded-full border border-slate-200 hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleConfirmPayment} className="p-6 space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Milestone Release Amount</span>
                  <p className="text-3xl font-black text-[#0A3B2A] font-mono">{formatPKR(selectedInstallment.amount)}</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{selectedInstallment.label}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Credit / Debit Card / Raast ID</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19))}
                        className="w-full h-11 pl-4 pr-10 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none" 
                      />
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Expiry Date</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                        className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Secure CVC</label>
                      <input 
                        type="password" 
                        required
                        placeholder="CVC"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value.substring(0, 4))}
                        className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold focus:outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full h-12 bg-[#0A3B2A] hover:bg-[#035f44] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-700/10 cursor-pointer"
                >
                  {isProcessing ? 'Authorizing Payout...' : 'Release Escrow Payout'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
