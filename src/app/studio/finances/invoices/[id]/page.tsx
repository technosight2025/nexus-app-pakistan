"use client"

import { useState, use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, Download, Send, CreditCard, Banknote, Building2, Check, Receipt, Plus
} from "lucide-react"

import { getInvoice, updateInvoice } from "@/lib/mock-db"

const DEFAULT_INVOICE = {
  id: "INV-0000", client: "Walk-in Client", event: "Event", date: "Today", due: "Next Week", amount: 100000, paid: 0, status: "Unpaid", items: [
    { name: "Custom Service", desc: "Details", qty: 1, price: 100000 }
  ]
}

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  
  const [invoice, setInvoice] = useState(DEFAULT_INVOICE)
  const [showPayment, setShowPayment] = useState(false)
  
  // Load from local storage
  useEffect(() => {
    const inv = getInvoice(id)
    if (inv) setInvoice(inv)
    else setInvoice({ ...DEFAULT_INVOICE, id })
  }, [id])
  
  // Payment Form State
  const [payAmount, setPayAmount] = useState(0)
  const [payMethod, setPayMethod] = useState("Bank Transfer")
  const [payRef, setPayRef] = useState("")

  // Update payAmount default when invoice loads
  useEffect(() => {
    if (invoice.amount) {
      setPayAmount(invoice.amount - invoice.paid)
    }
  }, [invoice.amount, invoice.paid])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
      case "Partial": return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
      case "Unpaid": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20"
      default: return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border-gray-200 dark:border-white/10"
    }
  }

  const handleRecordPayment = () => {
    const newPaid = invoice.paid + Number(payAmount)
    const newStatus = newPaid >= invoice.amount ? "Paid" : "Partial"
    
    const updated = {
      ...invoice,
      paid: newPaid,
      status: newStatus
    }
    
    setInvoice(updated)
    updateInvoice(id, { paid: newPaid, status: newStatus })
    setShowPayment(false)
  }

  const balance = invoice.amount - invoice.paid
  const pctPaid = Math.round((invoice.paid / invoice.amount) * 100)

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Header & Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push("/studio/finances")}
          className="flex items-center gap-2 text-[12px] font-bold text-[#6B7280] hover:text-[#111827] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Finances
        </button>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusColor(invoice.status)}`}>
          {invoice.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Document Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl overflow-hidden shadow-sm p-8 md:p-12">
            
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="w-12 h-12 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center font-black text-xl mb-4">NX</div>
                <div className="text-[14px] font-black text-[#111827] dark:text-white">Creative Studio</div>
                <div className="text-[10px] text-[#6B7280] mt-1">123 Studio Lane, Lahore<br/>hello@creativestudio.pk<br/>+92 300 1234567</div>
              </div>
              <div className="text-right">
                <div className="text-[24px] font-black text-[#E5E7EB] dark:text-white/10 uppercase tracking-widest">Invoice</div>
                <div className="text-[12px] font-bold text-[#111827] dark:text-white mt-2">{invoice.id}</div>
                <div className="text-[10px] text-[#6B7280] mt-1">Issued: {invoice.date}<br/>Due: {invoice.due}</div>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-12 border-l-2 border-[#4F46E5] pl-4">
              <div className="text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">Bill To</div>
              <div className="text-[14px] font-black text-[#111827] dark:text-white">{invoice.client}</div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">{invoice.event}</div>
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#E5E7EB] dark:border-white/10">
                    <th className="text-left py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Description</th>
                    <th className="text-center py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest w-16">Qty</th>
                    <th className="text-right py-3 text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest w-24">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item: any, i: number) => (
                    <tr key={i} className="border-b border-[#F3F4F6] dark:border-white/5">
                      <td className="py-4">
                        <div className="text-[12px] font-bold text-[#111827] dark:text-white">{item.name}</div>
                        <div className="text-[10px] text-[#6B7280] mt-0.5">{item.desc}</div>
                      </td>
                      <td className="py-4 text-center text-[12px] font-bold text-[#111827] dark:text-white">{item.qty}</td>
                      <td className="py-4 text-right text-[12px] font-black text-[#111827] dark:text-white">₨{(item.price * item.qty).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-[11px] text-[#6B7280]">
                  <span>Subtotal</span>
                  <span>₨{invoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px] font-black text-[#111827] dark:text-white pt-3 border-t border-[#E5E7EB] dark:border-white/10">
                  <span>Total Due</span>
                  <span>₨{invoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-[#22C55E]">
                  <span>Amount Paid</span>
                  <span>- ₨{invoice.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[16px] font-black text-[#4F46E5] pt-3 border-t border-[#E5E7EB] dark:border-white/10">
                  <span>Balance</span>
                  <span>₨{balance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center text-[10px] text-[#9CA3AF]">
              Thank you for your business! Please make payments by the due date.
            </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-4">
          
          {/* Action Card */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-5">
            <h3 className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4">Actions</h3>
            <div className="flex flex-col gap-2">
              <button className="w-full px-4 py-2.5 bg-[#F8FAFC] dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-[#374151] dark:text-gray-300 rounded-xl text-[11px] font-black flex items-center justify-center gap-2 transition-colors border border-[#E5E7EB] dark:border-white/10">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button className="w-full px-4 py-2.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-xl text-[11px] font-black flex items-center justify-center gap-2 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
                <Send className="w-4 h-4" /> Send Reminder
              </button>
            </div>
          </div>

          {/* Payment Status Card */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-5">
            <h3 className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4">Payment Status</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-black mb-2">
                <span className="text-[#111827] dark:text-white">Paid</span>
                <span className="text-[#22C55E]">{pctPaid}%</span>
              </div>
              <div className="h-2 w-full bg-[#E5E7EB] dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${pctPaid}%` }} />
              </div>
            </div>

            {balance > 0 ? (
              <button 
                onClick={() => setShowPayment(!showPayment)}
                className="w-full px-4 py-3 bg-[#4F46E5] text-white rounded-xl text-[12px] font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Record Payment
              </button>
            ) : (
              <div className="w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-[12px] font-black flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Fully Paid
              </div>
            )}
            
            {showPayment && balance > 0 && (
              <div className="mt-4 p-4 border border-[#E5E7EB] dark:border-white/10 rounded-xl bg-[#F8FAFC] dark:bg-white/5 space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-[#6B7280]">Amount (₨)</label>
                  <input 
                    type="number" 
                    value={payAmount} 
                    onChange={e => setPayAmount(Number(e.target.value))}
                    max={balance}
                    className="w-full mt-1 px-3 py-2 text-[12px] font-bold border border-[#E5E7EB] dark:border-white/10 rounded-lg outline-none focus:border-[#4F46E5] bg-white dark:bg-[#111118] text-[#111827] dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#6B7280]">Method</label>
                  <select 
                    value={payMethod}
                    onChange={e => setPayMethod(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-[12px] font-bold border border-[#E5E7EB] dark:border-white/10 rounded-lg outline-none focus:border-[#4F46E5] bg-white dark:bg-[#111118] text-[#111827] dark:text-white"
                  >
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>JazzCash / EasyPaisa</option>
                    <option>Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#6B7280]">Reference Note</label>
                  <input 
                    type="text" 
                    value={payRef} 
                    onChange={e => setPayRef(e.target.value)}
                    placeholder="Transaction ID..."
                    className="w-full mt-1 px-3 py-2 text-[12px] font-bold border border-[#E5E7EB] dark:border-white/10 rounded-lg outline-none focus:border-[#4F46E5] bg-white dark:bg-[#111118] text-[#111827] dark:text-white"
                  />
                </div>
                <button 
                  onClick={handleRecordPayment}
                  className="w-full mt-2 px-4 py-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-lg text-[11px] font-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Save Payment
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
