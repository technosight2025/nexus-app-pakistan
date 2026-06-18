"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Phone, CreditCard, CheckCircle2, Loader2 } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    title: string
    price: string
    vendorId: string
  }
}

export default function BookingModal({ isOpen, onClose, product }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    startDate: "",
    endDate: "",
    paymentMethod: "Cash"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/rentals/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          outfit_id: product.id,
          vendor_id: product.vendorId,
          customer_name: form.customerName,
          customer_phone: form.customerPhone,
          start_date: form.startDate,
          end_date: form.endDate,
          payment_method: form.paymentMethod,
          total_price: product.price
        })
      })

      if (!res.ok) throw new Error("Booking failed")

      setStep(2) // Success step
    } catch (error) {
      console.error(error)
      alert("Failed to submit booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <div>
                <h2 className="text-xl font-serif font-black text-slate-900">Book {product.title}</h2>
                <p className="text-sm font-bold text-emerald-600 mt-1">Rs. {product.price}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {step === 1 ? (
                <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Start Date</label>
                      <input 
                        type="date" required 
                        value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0A3B2A] outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">End Date</label>
                      <input 
                        type="date" required 
                        value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})}
                        className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0A3B2A] outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" required placeholder="Aisha Khan"
                        value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})}
                        className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0A3B2A] outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel" required placeholder="0300 1234567"
                        value={form.customerPhone} onChange={e => setForm({...form, customerPhone: e.target.value})}
                        className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0A3B2A] outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Payment Method</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select 
                        value={form.paymentMethod} onChange={e => setForm({...form, paymentMethod: e.target.value})}
                        className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0A3B2A] outline-none appearance-none font-medium"
                      >
                        <option value="Cash">Cash (In-Store)</option>
                        <option value="Online">Online Payment (Stripe)</option>
                        <option value="EasyPaisa">EasyPaisa</option>
                        <option value="JazzCash">JazzCash</option>
                        <option value="Bank Transfer">Direct Bank Transfer</option>
                      </select>
                    </div>
                  </div>

                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Booking Requested!</h3>
                  <p className="text-slate-500 font-medium max-w-sm">
                    Your request has been sent directly to the boutique. They will contact you shortly to confirm the rental and arrange your selected payment method ({form.paymentMethod}).
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
              {step === 1 ? (
                <button 
                  type="submit" form="booking-form" disabled={loading}
                  className="w-full py-4 bg-[#0A3B2A] hover:bg-black text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Booking Request"}
                </button>
              ) : (
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-xl flex items-center justify-center"
                >
                  Return to Marketplace
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
