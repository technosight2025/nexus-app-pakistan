"use client"
import { motion } from "framer-motion"
import { FileText, Download, Send, Eye, Clock } from "lucide-react"

const QUOTATIONS = [
  { id: "QT-001", customer: "Fatima Rehman", outfit: "Crimson Bridal Set", event: "Wedding", date: "Jan 15", amount: "70,000", advance: "35,000", validity: "3 days", status: "Sent", created: "Dec 12" },
  { id: "QT-002", customer: "Sara Ahmad", outfit: "Regal Gold Lehnga", event: "Walima", date: "Feb 03", amount: "90,000", advance: "45,000", validity: "Expired", status: "Expired", created: "Dec 08" },
  { id: "QT-003", customer: "Kiran Malik", outfit: "Crimson Bridal Set", event: "Nikkah", date: "Feb 20", amount: "65,000", advance: "32,500", validity: "5 days", status: "Pending", created: "Dec 11" },
  { id: "QT-004", customer: "Amna Siddiqui", outfit: "Emerald Sherwani", event: "Baraat", date: "Jan 10", amount: "28,000", advance: "14,000", validity: "Accepted", status: "Accepted", created: "Dec 09" },
]

const STATUS_STYLE: Record<string, string> = {
  "Sent": "bg-blue-100 text-blue-700",
  "Pending": "bg-amber-100 text-amber-700",
  "Accepted": "bg-emerald-100 text-emerald-700",
  "Expired": "bg-slate-100 text-slate-400",
}

export default function QuotationsPage() {
  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#0A3B2A]">Quotations</h1>
          <p className="text-sm text-slate-500 mt-0.5">{QUOTATIONS.length} quotes — {QUOTATIONS.filter(q => q.status === "Accepted").length} accepted</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A3B2A] text-white rounded-xl font-bold text-sm hover:bg-[#0A3B2A]/90 transition-colors self-start">
          <FileText className="w-4 h-4" /> New Quotation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Quotes", value: QUOTATIONS.length, color: "text-slate-900" },
          { label: "Pending Response", value: QUOTATIONS.filter(q => q.status === "Pending" || q.status === "Sent").length, color: "text-amber-600" },
          { label: "Accepted", value: QUOTATIONS.filter(q => q.status === "Accepted").length, color: "text-emerald-600" },
          { label: "Value of Active", value: "Rs. 1.63L", color: "text-[#0A3B2A]" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {QUOTATIONS.map((q, i) => (
          <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-[#0A3B2A]">{q.id}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${STATUS_STYLE[q.status]}`}>{q.status}</span>
                </div>
                <p className="text-base font-black text-slate-900">{q.customer}</p>
                <p className="text-xs text-slate-500 font-medium">{q.outfit} • {q.event} on {q.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-[#0A3B2A]">Rs. {q.amount}</p>
                <p className="text-xs text-slate-400 font-medium">50% advance: Rs. {q.advance}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Created {q.created} • Validity: <span className={`font-bold ${q.validity === "Expired" ? "text-rose-500" : "text-slate-600"}`}>{q.validity}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold hover:bg-slate-200 transition-colors">
                  <Eye className="w-3 h-3" /> View
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold hover:bg-slate-200 transition-colors">
                  <Download className="w-3 h-3" /> PDF
                </button>
                {q.status !== "Accepted" && q.status !== "Expired" && (
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A3B2A] text-white text-[10px] font-bold hover:bg-[#0A3B2A]/90 transition-colors">
                    <Send className="w-3 h-3" /> Resend
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
