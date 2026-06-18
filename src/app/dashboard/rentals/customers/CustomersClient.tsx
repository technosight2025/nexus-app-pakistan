"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, User, Phone, Banknote, Calendar, ArrowUpRight, MoreHorizontal, MessageCircle } from 'lucide-react'

export default function CustomersClient() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/rentals/customers")
      const data = await res.json()
      if (data && !data.error) {
        setCustomers(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) || 
    c.phone?.includes(search)
  )

  return (
    <div className="min-h-screen bg-[#FAF8F5] p-6 lg:p-10 text-[#1A1A1A] max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#0A3B2A] tracking-tight">Customers</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your clients, view lifetime spend, and rental history.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Customers</p>
            <p className="text-2xl font-black">{customers.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Avg Lifetime Value</p>
            <p className="text-2xl font-black">
              Rs. {customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.lifetimeSpend, 0) / customers.length).toLocaleString() : "0"}
            </p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Repeat Rate</p>
            <p className="text-2xl font-black">
              {customers.length > 0 ? Math.round((customers.filter(c => c.totalOrders > 1).length / customers.length) * 100) : "0"}%
            </p>
          </div>
        </div>
      </div>

      {/* CRM Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Last Order</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">Loading customers...</td></tr>
              ) : filteredCustomers.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No customers found.</td></tr>
              ) : (
                filteredCustomers.map((c, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={c.id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A3B2A] to-[#115e45] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                          {c.name ? c.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <p className="font-black text-sm text-[#1A1A1A] group-hover:text-[#0A3B2A] transition-colors">{c.name || "Unknown Customer"}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">Joined {new Date(c.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {c.phone || "No phone"}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-black text-xs">
                        {c.totalOrders}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-black text-sm text-emerald-600">Rs. {c.lifetimeSpend.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(c.lastOrderDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors" title="Message on WhatsApp">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg text-slate-400 hover:text-[#0A3B2A] hover:bg-slate-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
