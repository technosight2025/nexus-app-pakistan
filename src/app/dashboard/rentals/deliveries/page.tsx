"use client"
import { motion } from "framer-motion"
import { Truck, MapPin, Phone, CheckCircle2, Clock, Package } from "lucide-react"

const DELIVERIES = [
  { id: "DEL-001", type: "Pickup by Customer", customer: "Aisha Khan", phone: "0300-1234567", outfit: "Crimson Bridal Set", scheduledDate: "Dec 17, 10:00 AM", address: "Gulberg III — Boutique", status: "Scheduled", driver: null },
  { id: "DEL-002", type: "Home Delivery", customer: "Sana Mirza", phone: "0312-9876543", outfit: "Regal Gold Lehnga", scheduledDate: "Jan 03, 2:00 PM", address: "DHA Phase 5, Lahore", status: "Pending", driver: "Imran (0300-000-1111)" },
  { id: "DEL-003", type: "Return Pickup", customer: "Aisha Khan", phone: "0300-1234567", outfit: "Crimson Bridal Set", scheduledDate: "Dec 20, 12:00 PM", address: "DHA Phase 1, House 45", status: "Pending", driver: "Imran (0300-000-1111)" },
  { id: "DEL-004", type: "Pickup by Customer", customer: "Rabia Ali", phone: "0321-5554433", outfit: "Pastel Walima Gown", scheduledDate: "Dec 22, 11:00 AM", address: "Gulberg III — Boutique", status: "Completed", driver: null },
]

const STATUS_STYLE: Record<string, string> = {
  "Scheduled": "bg-blue-100 text-blue-700",
  "Pending": "bg-amber-100 text-amber-700",
  "Completed": "bg-emerald-100 text-emerald-700",
  "Cancelled": "bg-slate-100 text-slate-400",
}

export default function DeliveriesPage() {
  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#0A3B2A]">Deliveries</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage pickups, home deliveries, and returns</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Upcoming Deliveries", value: "2", color: "text-[#0A3B2A]" },
          { label: "Scheduled Pickups", value: "1", color: "text-blue-600" },
          { label: "Returns Pending", value: "1", color: "text-amber-600" },
          { label: "Completed Today", value: "1", color: "text-emerald-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {DELIVERIES.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  d.type.includes("Return") ? "bg-amber-100 text-amber-600" : d.type.includes("Home") ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"
                }`}>
                  {d.type.includes("Home") ? <Truck className="w-5 h-5" /> : d.type.includes("Return") ? <Package className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{d.id}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${STATUS_STYLE[d.status]}`}>{d.status}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{d.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {d.scheduledDate}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Outfit</p>
                <p className="font-bold text-slate-900">{d.outfit}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Customer</p>
                <p className="font-bold text-slate-900">{d.customer}</p>
                <a href={`tel:${d.phone}`} className="flex items-center gap-1 text-[#0A3B2A] font-bold hover:underline mt-0.5">
                  <Phone className="w-3 h-3" /> {d.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Location</p>
                <p className="font-medium text-slate-700 flex items-start gap-1">
                  <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-slate-400" /> {d.address}
                </p>
                {d.driver && <p className="text-[10px] text-slate-400 mt-1 font-medium">Driver: {d.driver}</p>}
              </div>
            </div>

            {d.status !== "Completed" && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-[#0A3B2A] text-white text-[10px] font-black uppercase tracking-wider hover:bg-[#0A3B2A]/90 transition-colors">
                  Mark Completed
                </button>
                <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider hover:bg-slate-200 transition-colors">
                  Reschedule
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
