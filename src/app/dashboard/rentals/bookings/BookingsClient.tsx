"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck, Search, Filter, MoreHorizontal, CheckCircle2, XCircle, Clock, MapPin, Banknote, CreditCard, ExternalLink, PartyPopper } from 'lucide-react'

export default function BookingsClient() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/rentals/bookings")
      const data = await res.json()
      if (data.bookings) {
        setBookings(data.bookings)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/rentals/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: id, status })
      })
      
      if (status === "confirmed") {
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 5000)
      }

      fetchBookings()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      
      {/* Confetti Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-emerald-900/20 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-[2rem] p-12 text-center shadow-2xl border border-emerald-100 max-w-lg mx-4"
            >
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">First Sale Confirmed!</h2>
              <p className="text-lg text-slate-600 font-medium">
                Congratulations! You've just confirmed your first booking through the Nexus platform.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-slate-900 mb-2">Bookings & Orders</h1>
          <p className="text-slate-500 font-medium">Manage your rental requests and track payments.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by customer or order #..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Order Details</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Loading bookings...</td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <CalendarCheck className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-lg font-bold text-slate-900 mb-1">No bookings yet</p>
                    <p className="text-slate-500">When customers book your outfits, they will appear here.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {booking.rental_outfits?.image_url && (
                            <img src={booking.rental_outfits.image_url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{booking.rental_outfits?.name || "Deleted Outfit"}</p>
                          <p className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-bold">
                            #{booking.id.split('-')[0]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-700">{booking.customer_name}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{booking.customer_phone}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <CalendarCheck className="w-4 h-4 text-slate-400" />
                        <span>{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-[#0A3B2A]">Rs. {booking.total_price}</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                          {booking.payment_method === 'Cash' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                          {booking.payment_method}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {booking.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending Review
                        </span>
                      )}
                      {booking.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Confirmed
                        </span>
                      )}
                      {booking.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {booking.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                            className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors tooltip" title="Approve Booking"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(booking.id, 'rejected')}
                            className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors tooltip" title="Reject Booking"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
