"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, ListOrdered, Utensils, CheckCircle2, Clock, Truck, Plus, Search, Filter } from "lucide-react"

const MOCK_ORDERS = [
  { id: "ORD-901", client: "Zainab Wedding", type: "Barat Buffet", date: "Today, 7:00 PM", pax: 500, status: "Prep", total: "₨ 850,000", items: ["Mutton Qorma", "Chicken Biryani", "Live BBQ", "Gajar Halwa"] },
  { id: "ORD-902", client: "Ali Corporate", type: "Hi-Tea", date: "Tomorrow, 4:00 PM", pax: 150, status: "Pending", total: "₨ 120,000", items: ["Mini Samosas", "Chicken Sandwiches", "Fruit Tart", "Tea/Coffee"] },
  { id: "ORD-903", client: "Tech Conf 2026", type: "Lunch Box", date: "Today, 1:00 PM", pax: 300, status: "Out for Delivery", total: "₨ 240,000", items: ["Chicken Karahi", "Naan", "Cold Drink", "Brownie"] },
  { id: "ORD-904", client: "Farhan Walima", type: "Premium Buffet", date: "Sat, 8:00 PM", pax: 800, status: "Pending", total: "₨ 1,200,000", items: ["Prawn Tempura", "Beef Steak", "Special Fried Rice", "Cheesecake"] },
]

export function CateringDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'kds'>('orders')

  return (
    <div className="space-y-6">
      
      {/* 🌟 Header 🌟 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-orange-500" /> Restaurant & Catering OS
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage bulk orders, catering contracts, and kitchen displays.</p>
        </div>
        
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Order
        </button>
      </div>

      {/* 🌟 Tabs 🌟 */}
      <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-max">
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-orange-50 text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <ListOrdered className="w-4 h-4" /> Order Manager
        </button>
        <button 
          onClick={() => setActiveTab('kds')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'kds' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <Utensils className="w-4 h-4" /> Kitchen Display (KDS)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'orders' ? (
          <motion.div 
            key="orders"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Orders Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-[250px]">
                <div className="relative w-full max-w-sm">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  <Filter className="w-4 h-4" /> Filter
                </button>
              </div>
            </div>

            {/* Orders Table/Cards */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client & Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pax</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_ORDERS.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{order.client}</div>
                          <div className="text-sm font-medium text-slate-500">{order.type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-700">{order.date}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold">
                            {order.pax}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold
                            ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                            ${order.status === 'Prep' ? 'bg-blue-100 text-blue-700' : ''}
                            ${order.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-700' : ''}
                            ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : ''}
                          `}>
                            {order.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                            {order.status === 'Prep' && <ChefHat className="w-3.5 h-3.5" />}
                            {order.status === 'Out for Delivery' && <Truck className="w-3.5 h-3.5" />}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {order.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="kds"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {MOCK_ORDERS.filter(o => o.status === 'Prep' || o.status === 'Pending').map((order) => (
              <div key={order.id} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-white">{order.id}</h3>
                    <p className="text-slate-400 font-medium">{order.type} • {order.pax} Pax</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider
                    ${order.status === 'Prep' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}
                  `}>
                    {order.status}
                  </div>
                </div>

                <div className="flex-1 bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-700/50">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Order Items</h4>
                  <ul className="space-y-3">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex items-center justify-between group cursor-pointer">
                        <span className="text-slate-200 font-medium text-lg group-hover:text-white transition-colors">{item}</span>
                        <div className="w-6 h-6 rounded border border-slate-600 group-hover:border-emerald-500 flex items-center justify-center transition-colors">
                          {/* Checkbox mock */}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <button className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Mark Ready
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
