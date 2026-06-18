"use client"

import { useState, useEffect } from "react"
import { FileText, Download, CheckCircle2, Clock, CreditCard, X, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CustomerQuotes() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: ""
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('pay') === 'true') {
        setIsPaymentOpen(true)
      }
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    // Basic formatters for clean credit card fields
    let formattedValue = value
    if (field === 'number') {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19)
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim().substring(0, 5)
      if (formattedValue.endsWith('/')) {
        formattedValue = formattedValue.slice(0, -1)
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3)
    }
    
    setPaymentForm(prev => ({
      ...prev,
      [field]: formattedValue
    }))
  }

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsPaid(true)
      setIsPaymentOpen(false)
      // Clean up URL parameter after paying
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.delete('pay')
        window.history.replaceState({}, '', url.pathname + url.search)
      }
    }, 1800)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Simple Blessings</h2>
          <p className="text-slate-500 font-medium">Manage your vendor invoices and view payment history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Payments */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Action Required</h3>
          
          <div className={`bg-white p-6 rounded-3xl border transition-all duration-500 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-6 ${isPaid ? 'border-emerald-200' : 'border-rose-200'}`}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${isPaid ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            
            {/* Soft decorative background glow if paid */}
            {isPaid && (
              <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 opacity-80" />
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {isPaid ? (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-emerald-700" /> Settled
                  </span>
                ) : (
                  <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md">Due in 2 days</span>
                )}
                <span className="text-sm font-bold text-slate-400">Invoice #INV-2026-001</span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-1">Catering 50% Advance</h4>
              <p className="text-sm font-medium text-slate-500 mb-4">Royal Caterers</p>
              
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                  <p className="text-xl font-black text-slate-900">Rs: 450,000</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-200" />
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Amount Due</p>
                  <p className={`text-xl font-black transition-colors duration-500 ${isPaid ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isPaid ? "Rs: 0" : "Rs: 225,000"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-3 md:w-48 shrink-0">
              {!isPaid ? (
                <Button 
                  onClick={() => setIsPaymentOpen(true)}
                  className="w-full bg-slate-900 text-white hover:bg-[#0F5B3E] rounded-xl font-bold shadow-lg transition-colors cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                </Button>
              ) : (
                <Button 
                  disabled
                  className="w-full bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Paid
                </Button>
              )}
              <Button variant="outline" className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Payment History</h3>
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4">
            {isPaid && (
              <>
                <div className="flex items-start gap-4 p-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl animate-in slide-in-from-top duration-500">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-900">Catering Advance (Paid)</h5>
                    <p className="text-xs text-slate-500">Paid Just Now</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-600">Rs: 225,000</p>
                  </div>
                </div>
                <div className="h-[1px] bg-slate-100 mx-2" />
              </>
            )}

            <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-slate-900">Grand Taj Marquee (Booking)</h5>
                <p className="text-xs text-slate-500">Paid on Jan 15, 2026</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">Rs: 150,000</p>
              </div>
            </div>
            
            <div className="h-[1px] bg-slate-100 mx-2" />

            <div className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-slate-900">Nexus Studios (Advance)</h5>
                <p className="text-xs text-slate-500">Paid on Feb 10, 2026</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">Rs: 50,000</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Credit Card Payment Modal Drawer */}
      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden border border-slate-100 shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Secure Payment</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Pay Rs: 225,000 via credit/debit card</p>
              </div>
              <button 
                onClick={() => setIsPaymentOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePay} className="p-6 space-y-6">
              {/* Luxury Virtual Credit Card Preview */}
              <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-amber-700 via-yellow-600 to-amber-900 p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-12 -mb-12" />
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">NEXUS Secure</p>
                    <h4 className="text-md font-bold tracking-wider mt-1 text-slate-50">Platinum card</h4>
                  </div>
                  <div className="w-10 h-8 rounded bg-white/10 flex items-center justify-center border border-white/10 text-xs font-black italic">
                    VISA
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Card Number */}
                  <p className="text-lg font-mono tracking-widest text-center text-slate-100">
                    {paymentForm.number || "•••• •••• •••• ••••"}
                  </p>
                  
                  {/* Card Holder & Expiry */}
                  <div className="flex justify-between text-xs">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-amber-200">Card Holder</p>
                      <p className="font-semibold tracking-wide truncate max-w-[200px] text-slate-100">
                        {paymentForm.name.toUpperCase() || "YOUR NAME"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-amber-200 text-right">Expires</p>
                      <p className="font-semibold tracking-wide text-slate-100 text-right">
                        {paymentForm.expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ahmed Raza"
                    value={paymentForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-3 text-sm font-semibold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      value={paymentForm.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-3 pr-10 text-sm font-mono tracking-widest outline-none transition-all"
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Expiration Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={paymentForm.expiry}
                      onChange={(e) => handleInputChange('expiry', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-3 text-sm font-semibold text-center outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">CVV / CVC</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      value={paymentForm.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 rounded-xl p-3 text-sm font-semibold text-center outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsPaymentOpen(false)}
                  className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2.5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="flex-1 bg-slate-900 hover:bg-[#0F5B3E] text-white rounded-xl font-bold py-2.5 shadow-lg relative flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
