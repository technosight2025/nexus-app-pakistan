"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, Plus, Search, FileText, 
  ArrowUpRight, ArrowDownRight, DollarSign, 
  Clock, CheckCircle2, AlertCircle, X, Download,
  Wallet, Banknote, Building, Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"

type InvoiceStatus = "Paid" | "Partial" | "Pending" | "Overdue"

interface Invoice {
  id: string
  invoiceNo: string
  clientName: string
  projectName: string
  totalAmount: number
  paidAmount: number
  dueDate: string
  status: InvoiceStatus
  dateIssued: string
}

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-1001",
    invoiceNo: "INV-2023-1001",
    clientName: "Ali Raza",
    projectName: "Ali & Sara Wedding",
    totalAmount: 350000,
    paidAmount: 350000,
    dueDate: "Oct 10, 2023",
    status: "Paid",
    dateIssued: "Oct 01, 2023"
  },
  {
    id: "INV-1002",
    invoiceNo: "INV-2023-1002",
    clientName: "Zainab Ahmed",
    projectName: "Zainab's Mehndi",
    totalAmount: 150000,
    paidAmount: 50000,
    dueDate: "Oct 25, 2023",
    status: "Partial",
    dateIssued: "Oct 15, 2023"
  },
  {
    id: "INV-1003",
    invoiceNo: "INV-2023-1003",
    clientName: "TechCorp Inc.",
    projectName: "Annual Gala Highlights",
    totalAmount: 200000,
    paidAmount: 0,
    dueDate: "Nov 01, 2023",
    status: "Pending",
    dateIssued: "Oct 18, 2023"
  },
  {
    id: "INV-1004",
    invoiceNo: "INV-2023-1004",
    clientName: "Omer Tariq",
    projectName: "Corporate Headshots",
    totalAmount: 50000,
    paidAmount: 0,
    dueDate: "Oct 05, 2023",
    status: "Overdue",
    dateIssued: "Sep 20, 2023"
  }
]

export function PaymentsView() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES)
  const [searchQuery, setSearchQuery] = useState("")

  // Modal States
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false)
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  // Form States
  const [paymentForm, setPaymentForm] = useState({ amount: "", method: "Bank Transfer", reference: "" })

  const formatCurrency = (amount: number) => {
    return 'Rs: ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(amount);
  }

  const getStatusBadge = (status: InvoiceStatus) => {
    switch(status) {
      case "Paid": return <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-100"><CheckCircle2 className="w-3 h-3" /> Paid</span>
      case "Partial": return <span className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-indigo-100"><Clock className="w-3 h-3" /> Partial</span>
      case "Pending": return <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-100"><Clock className="w-3 h-3" /> Pending</span>
      case "Overdue": return <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-rose-100"><AlertCircle className="w-3 h-3" /> Overdue</span>
    }
  }

  const handleOpenPayment = (inv: Invoice) => {
    setSelectedInvoice(inv)
    setPaymentForm({ amount: (inv.totalAmount - inv.paidAmount).toString(), method: "Bank Transfer", reference: "" })
    setIsRecordPaymentOpen(true)
  }

  const handleRecordPayment = () => {
    if (!selectedInvoice || !paymentForm.amount) return
    const payAmount = parseInt(paymentForm.amount)

    setInvoices(invoices.map(inv => {
      if (inv.id === selectedInvoice.id) {
        const newPaid = inv.paidAmount + payAmount
        const newStatus = newPaid >= inv.totalAmount ? "Paid" : "Partial"
        return { ...inv, paidAmount: newPaid, status: newStatus }
      }
      return inv
    }))
    setIsRecordPaymentOpen(false)
  }

  const filteredInvoices = invoices.filter(inv => 
    inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate KPIs
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
  const outstandingBalance = invoices.reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0)
  const overdueAmount = invoices.filter(i => i.status === "Overdue").reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0)

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl shadow-lg border border-slate-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-2 tracking-tight">
            <CreditCard className="w-8 h-8 text-emerald-400" /> Payments & Invoices
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-2 max-w-xl">
            Track studio revenue, manage client invoices, and record partial advances.
          </p>
        </div>
        
        <Button onClick={() => setIsNewInvoiceOpen(true)} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-md font-bold shrink-0 relative z-10">
          <Plus className="w-4 h-4 mr-2" /> Create Invoice
        </Button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-emerald-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              <ArrowUpRight className="w-3 h-3" /> +12%
            </span>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-slate-900">{formatCurrency(totalRevenue)}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Total Collected</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-indigo-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-slate-900">{formatCurrency(outstandingBalance)}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Outstanding Balance</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-rose-200 transition-colors">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-3xl font-black text-rose-600">{formatCurrency(overdueAmount)}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">Overdue Amount</p>
          </div>
        </div>
      </div>

      {/* Invoices Ledger */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-black text-slate-900 text-lg">Invoices Ledger</h2>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoice or client..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 border-b border-slate-100">Invoice</th>
                <th className="px-6 py-4 border-b border-slate-100">Client / Project</th>
                <th className="px-6 py-4 border-b border-slate-100">Status</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Total Amount</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Balance Due</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{inv.invoiceNo}</div>
                    <div className="text-xs text-slate-500">Issued: {inv.dateIssued}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{inv.clientName}</div>
                    <div className="text-xs text-slate-500">{inv.projectName}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(inv.status)}
                    <div className="text-xs text-slate-500 mt-1">Due: {inv.dueDate}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-bold text-slate-900">{formatCurrency(inv.totalAmount)}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`font-black ${inv.totalAmount - inv.paidAmount > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {formatCurrency(inv.totalAmount - inv.paidAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                        <Download className="w-4 h-4" />
                      </Button>
                      {inv.status !== "Paid" && (
                        <Button 
                          onClick={() => handleOpenPayment(inv)}
                          size="sm" 
                          className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-bold"
                        >
                          Record Payment
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      <AnimatePresence>
        {isRecordPaymentOpen && selectedInvoice && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsRecordPaymentOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                <div>
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" /> Record Payment
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-mono">{selectedInvoice.invoiceNo}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsRecordPaymentOpen(false)} className="rounded-full hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-600">Balance Due</span>
                  <span className="text-lg font-black text-rose-600">{formatCurrency(selectedInvoice.totalAmount - selectedInvoice.paidAmount)}</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Amount (PKR)</label>
                  <input 
                    type="number" 
                    value={paymentForm.amount} 
                    onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Bank Transfer", "Cash", "JazzCash", "EasyPaisa"].map(method => (
                      <div 
                        key={method}
                        onClick={() => setPaymentForm({...paymentForm, method})}
                        className={`p-3 rounded-xl border text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                          paymentForm.method === method 
                            ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-emerald-200"
                        }`}
                      >
                        {method === "Bank Transfer" && <Building className="w-4 h-4" />}
                        {method === "Cash" && <Banknote className="w-4 h-4" />}
                        {(method === "JazzCash" || method === "EasyPaisa") && <Smartphone className="w-4 h-4" />}
                        {method}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                    Reference ID <span className="text-slate-400 font-medium normal-case">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    value={paymentForm.reference} 
                    onChange={e => setPaymentForm({...paymentForm, reference: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium"
                    placeholder="e.g. Transaction ID"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsRecordPaymentOpen(false)} className="rounded-xl bg-white shadow-sm">Cancel</Button>
                <Button onClick={handleRecordPayment} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-sm font-bold">
                  Save Payment
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
