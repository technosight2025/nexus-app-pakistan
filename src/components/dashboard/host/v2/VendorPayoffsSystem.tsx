"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, Wallet, CheckCircle2, AlertCircle, Clock, 
  ChevronRight, CalendarDays, Receipt, CreditCard, X, ShieldCheck
} from "lucide-react"
import Link from "next/link"

export function VendorPayoffsSystem() {
  const [payoffs, setPayoffs] = useState([
    {
      id: "V-IF2024-11",
      name: "Indus Flavors",
      category: "Catering",
      totalQuote: 1200000,
      paidAmount: 200000,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=300",
      installments: [
        { id: 1, label: "Booking Advance", amount: 200000, date: "Sep 01, 2025", status: "paid" },
        { id: 2, label: "Midway Payment", amount: 500000, date: "Oct 20, 2025", status: "upcoming" },
        { id: 3, label: "Final Clearance", amount: 500000, date: "Nov 15, 2025", status: "pending" },
      ]
    },
    {
      id: "V-RB2024-05",
      name: "Royal Blooms",
      category: "Floral Decor",
      totalQuote: 450000,
      paidAmount: 150000,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=300",
      installments: [
        { id: 1, label: "Booking Advance", amount: 150000, date: "Sep 15, 2025", status: "paid" },
        { id: 2, label: "Pre-Event Payment", amount: 150000, date: "Oct 25, 2025", status: "upcoming" },
        { id: 3, label: "Final Clearance", amount: 150000, date: "Nov 10, 2025", status: "pending" },
      ]
    }
  ])

  const [recordingPaymentFor, setRecordingPaymentFor] = useState<string | null>(null)
  
  const totalCommitted = payoffs.reduce((sum, p) => sum + p.totalQuote, 0)
  const totalCleared = payoffs.reduce((sum, p) => sum + p.paidAmount, 0)
  const totalUpcoming = payoffs.reduce((sum, p) => {
    const upcoming = p.installments.find(i => i.status === 'upcoming')
    return sum + (upcoming ? upcoming.amount : 0)
  }, 0)

  const handleRecordPayment = (vendorId: string, installmentId: number, amount: number) => {
    setPayoffs(prev => prev.map(vendor => {
      if (vendor.id !== vendorId) return vendor
      
      const newInstallments = vendor.installments.map(inst => {
        if (inst.id === installmentId) return { ...inst, status: "paid" }
        // Next pending becomes upcoming
        return inst
      })

      // Find the first pending and make it upcoming if needed
      const firstPendingIndex = newInstallments.findIndex(i => i.status === 'pending')
      if (firstPendingIndex !== -1 && !newInstallments.find(i => i.status === 'upcoming')) {
        newInstallments[firstPendingIndex].status = "upcoming"
      }

      return {
        ...vendor,
        paidAmount: vendor.paidAmount + amount,
        installments: newInstallments
      }
    }))
    setRecordingPaymentFor(null)
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] font-inter p-4 md:p-6 lg:p-10 max-w-[1400px] mx-auto pb-28 md:pb-24">
      
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/host/v2/vendor-hub" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0A3B2A] font-bold text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Vendor Hub
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-[40px] font-black font-poppins text-[#0A3B2A] tracking-tight leading-tight mb-2">
              Payoffs System
            </h1>
            <p className="text-[13px] md:text-[15px] text-slate-600 font-medium max-w-xl">
              Track vendor payment schedules, clear upcoming dues, and manage financial commitments securely.
            </p>
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0A3B2A] rounded-[24px] md:rounded-[28px] p-6 shadow-xl border border-[#155E45] flex flex-col relative overflow-hidden text-white"
        >
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[12px] font-bold text-[#0A3B2A]-fixed uppercase tracking-widest mb-1 relative z-10">Total Committed</p>
          <p className="text-[28px] font-black font-poppins text-white leading-tight relative z-10">PKR {(totalCommitted / 1000000).toFixed(2)}M</p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-20 blur-[50px] rounded-full pointer-events-none"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-[24px] md:rounded-[28px] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-[#A7F3D0] rounded-full flex items-center justify-center text-[#047857]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-1">Amount Cleared</p>
          <p className="text-[28px] font-black font-poppins text-[#047857] leading-tight">PKR {totalCleared.toLocaleString()}</p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-[#047857] rounded-full" style={{ width: `${(totalCleared/totalCommitted)*100}%` }}></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-[24px] md:rounded-[28px] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center text-[#B45309]">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-1">Upcoming (30 Days)</p>
          <p className="text-[28px] font-black font-poppins text-[#B45309] leading-tight">PKR {totalUpcoming.toLocaleString()}</p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEF3C7] opacity-20 blur-[50px] rounded-full pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Payoff Tracking List */}
      <h2 className="text-xl font-black font-poppins text-[#0A3B2A] mb-6">Active Payment Schedules</h2>
      
      <div className="space-y-6">
        {payoffs.map((vendor, i) => {
          const pct = Math.round((vendor.paidAmount / vendor.totalQuote) * 100)
          const upcoming = vendor.installments.find(i => i.status === 'upcoming')
          const isRecording = recordingPaymentFor === vendor.id

          return (
            <motion.div 
              key={vendor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
              className="bg-white rounded-[24px] overflow-hidden border border-slate-200 shadow-sm"
            >
              <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                
                {/* Vendor Info & Progress */}
                <div className="lg:w-1/3 shrink-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#BE185D] uppercase tracking-widest mb-1">{vendor.category}</p>
                        <h3 className="text-[18px] font-bold font-poppins text-[#1A1A1A] leading-tight">{vendor.name}</h3>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-[12px] font-medium text-slate-500 mb-1">Total Quote</p>
                        <p className="text-[15px] font-black text-[#1A1A1A]">PKR {vendor.totalQuote.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-slate-500 mb-1">Cleared</p>
                        <p className="text-[15px] font-black text-[#047857]">PKR {vendor.paidAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[13px] font-bold">
                      <span className="text-[#0A3B2A]">Progress</span>
                      <span className="text-slate-500">{pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A3B2A] rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-px bg-slate-100"></div>

                {/* Installments Schedule */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-[15px] font-bold text-[#1A1A1A] flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-slate-400" /> Payment Schedule
                    </h4>
                  </div>
                  
                  <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-slate-100">
                    {vendor.installments.map((inst, idx) => (
                      <div key={inst.id} className="relative flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-white relative z-10 ${
                          inst.status === 'paid' ? 'bg-[#A7F3D0] text-[#047857]' : 
                          inst.status === 'upcoming' ? 'bg-[#FEF3C7] text-[#B45309]' : 
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {inst.status === 'paid' ? <CheckCircle2 className="w-4 h-4" /> : 
                           inst.status === 'upcoming' ? <Clock className="w-4 h-4" /> : 
                           <div className="w-2 h-2 rounded-full bg-slate-300"></div>}
                        </div>
                        
                        <div className={`flex-1 rounded-2xl p-4 border transition-colors ${
                          inst.status === 'upcoming' ? 'bg-[#FFFBEC] border-[#FDE68A]' : 
                          'bg-white border-slate-100'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <p className={`text-[14px] font-bold ${inst.status === 'paid' ? 'text-slate-500 line-through' : 'text-[#1A1A1A]'}`}>
                                {inst.label}
                              </p>
                              <p className="text-[12px] font-medium text-slate-500 mt-1">Due: {inst.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <p className={`text-[16px] font-black font-poppins ${inst.status === 'paid' ? 'text-slate-400' : 'text-[#1A1A1A]'}`}>
                                PKR {inst.amount.toLocaleString()}
                              </p>
                              {inst.status === 'upcoming' && (
                                <button 
                                  onClick={() => setRecordingPaymentFor(vendor.id)}
                                  className="bg-[#0A3B2A] text-white px-4 py-2 rounded-xl text-[12px] font-bold hover:bg-[#155E45] transition-colors"
                                >
                                  Pay Now
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Record Payment Overlay */}
              <AnimatePresence>
                {isRecording && upcoming && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-200 bg-slate-50 overflow-hidden"
                  >
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0A3B2A] shadow-sm border border-slate-200">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#1A1A1A]">Record Payment: {upcoming.label}</p>
                          <p className="text-[12px] text-slate-500 font-medium mt-1">Amount: PKR {upcoming.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                          onClick={() => setRecordingPaymentFor(null)}
                          className="bg-white border border-slate-200 text-slate-600 font-bold px-6 py-3 rounded-xl text-sm hover:bg-slate-100 transition-colors flex-1 md:flex-none"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleRecordPayment(vendor.id, upcoming.id, upcoming.amount)}
                          className="bg-[#0A3B2A] text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#155E45] transition-colors flex-1 md:flex-none"
                        >
                          <ShieldCheck className="w-4 h-4" /> Confirm & Record
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )
        })}
      </div>

    </div>
  )
}
