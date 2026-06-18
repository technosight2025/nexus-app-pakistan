"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Scan, Phone, MessageSquare, ChevronRight, Clock, User } from "lucide-react"
import Link from "next/link"

const LEADS = [
  { id: 1, name: "Fatima Rehman", phone: "0311-3334455", source: "AI Try-On Studio", outfit: "Crimson Bridal Set", event: "Wedding", date: "Jan 15", budget: "70,000", stage: "New", time: "2h ago" },
  { id: 2, name: "Sara Ahmad", phone: "0322-6667788", source: "Marketplace Profile", outfit: "Regal Gold Lehnga", event: "Walima", date: "Feb 03", budget: "90,000", stage: "Contacted", time: "5h ago" },
  { id: 3, name: "Nadia Iqbal", phone: "0303-9990011", source: "AI Try-On Studio", outfit: "Pastel Walima Gown", event: "Mehndi", date: "Jan 28", budget: "50,000", stage: "Fitting Booked", time: "1d ago" },
  { id: 4, name: "Kiran Malik", phone: "0344-1112233", source: "WhatsApp Referral", outfit: "Crimson Bridal Set", event: "Nikkah", date: "Feb 20", budget: "65,000", stage: "Quote Sent", time: "2d ago" },
  { id: 5, name: "Amna Siddiqui", phone: "0300-4445566", source: "AI Try-On Studio", outfit: "Emerald Sherwani", event: "Baraat", date: "Jan 10", budget: "28,000", stage: "Won", time: "3d ago" },
]

const STAGES = ["All", "New", "Contacted", "Fitting Booked", "Quote Sent", "Won"]
const STAGE_STYLE: Record<string, string> = {
  "New": "bg-blue-100 text-blue-700",
  "Contacted": "bg-amber-100 text-amber-700",
  "Fitting Booked": "bg-purple-100 text-purple-700",
  "Quote Sent": "bg-indigo-100 text-indigo-700",
  "Won": "bg-emerald-100 text-emerald-700",
}

export default function LeadsPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? LEADS : LEADS.filter(l => l.stage === filter)

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#0A3B2A]">Leads</h1>
        <p className="text-sm text-slate-500 mt-0.5">{LEADS.length} total leads — {LEADS.filter(l => l.source === "AI Try-On Studio").length} from AI Try-On Studio</p>
      </div>

      {/* AI Try-On Banner */}
      <div className="bg-gradient-to-r from-[#0A3B2A] to-[#1a6b4a] rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
            <Scan className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-white font-black text-sm">34 AI Try-On Sessions This Week</p>
            <p className="text-white/60 text-xs font-medium">3 converted into confirmed bookings</p>
          </div>
        </div>
        <Link href="/ai-tryon-studio" className="px-4 py-2 bg-[#D4AF37] text-black rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#C5A880] transition-colors whitespace-nowrap">
          Open Studio
        </Link>
      </div>

      {/* Stage Filters */}
      <div className="flex flex-wrap gap-2">
        {STAGES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${filter === s ? "bg-[#0A3B2A] text-white border-[#0A3B2A]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0A3B2A]/40"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filtered.map((lead, i) => (
          <motion.div key={lead.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A880] to-[#0A3B2A] flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-sm">{lead.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-black text-slate-900">{lead.name}</p>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${STAGE_STYLE[lead.stage]}`}>{lead.stage}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{lead.outfit} • {lead.event} on {lead.date}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-[#0A3B2A]">Rs. {lead.budget}</p>
                <p className="text-[10px] text-slate-400 font-medium">{lead.time}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  lead.source === "AI Try-On Studio" ? "bg-[#D4AF37]/15 text-[#A07830]" : "bg-slate-100 text-slate-500"
                }`}>
                  {lead.source === "AI Try-On Studio" && <Scan className="w-2.5 h-2.5" />}
                  {lead.source}
                </span>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold hover:bg-slate-200 transition-colors">
                  <Phone className="w-3 h-3" /> {lead.phone}
                </a>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A3B2A]/10 text-[#0A3B2A] text-[10px] font-bold hover:bg-[#0A3B2A]/20 transition-colors">
                  <ChevronRight className="w-3 h-3" /> Update Stage
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
