"use client"
 
import { useState } from "react"
import { 
  Store, Wallet, FileText, CheckCircle2, Clock, Users,
  Search, ArrowRight, Star, Plus, ShieldCheck, Flame, ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const VENDORS = [
  { id: "v1", name: "Zubeda Mehndi Arts", cat: "Mehndi", status: "negotiating", quote: "PKR 45K", img: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?q=80&w=150" },
  { id: "v2", name: "Indus Flavors", cat: "Catering", status: "confirmed", quote: "PKR 1.2M", img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=150" },
  { id: "v3", name: "Luxe Studios", cat: "Photography", status: "shortlisted", quote: "Pending", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=150" },
  { id: "v4", name: "Royal Blooms", cat: "Decor", status: "confirmed", quote: "PKR 450K", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=150" }
]

export function VendorHubOverview() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="p-3 max-w-[1440px] mx-auto text-[#1A1A1A] space-y-3 pb-24 md:pb-6 relative h-full">
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-4 left-1/2 z-[100] bg-[#0A3B2A] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ROW 1: Header (12 Col) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 bg-gradient-to-br from-[#0A3B2A] via-[#0D4A34] to-[#063020] rounded-2xl p-5 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#BE185D]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800 bg-white px-2 py-0.5 rounded-full shadow-sm">
                VENDOR HUB
              </span>
              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1"><Flame className="w-3 h-3" />2 Needs Action</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">Vendor Management</h1>
            <p className="text-white/60 text-xs font-medium flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 8 out of 12 required vendors booked.
            </p>
          </div>

          <div className="relative z-10 flex gap-2 mt-4 md:mt-0">
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-sm transition-all font-bold text-xs border border-white/10">
              <Search className="w-3.5 h-3.5" /> Discover
            </button>
            <Link href="/dashboard/host/v2/vendor-hub/payoffs" className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[#0A3B2A] hover:bg-slate-50 rounded-xl shadow-sm transition-all font-bold text-xs">
              <Wallet className="w-3.5 h-3.5" /> Payoffs
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ ROW 2: Vendor Stats Bento (4x 3 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        {/* Booked */}
        <div className="col-span-6 md:col-span-3 bg-[#0A3B2A] text-white rounded-2xl border border-[#0A3B2A] p-4 shadow-sm flex flex-col group cursor-pointer hover:bg-[#0D4A34] transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10"><CheckCircle2 className="w-4 h-4" /></div>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-0.5">Booked Vendors</p>
          <p className="text-2xl font-black leading-none mb-1">8 <span className="text-sm font-medium text-white/40">/ 12</span></p>
          <div className="mt-auto pt-3">
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#34D399] h-full rounded-full" style={{ width: '66%' }} />
            </div>
          </div>
        </div>

        {/* Shortlisted */}
        <div className="col-span-6 md:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col group cursor-pointer hover:border-slate-300 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600"><Star className="w-4 h-4" /></div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Shortlisted</p>
          <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">14</p>
          <p className="text-[9px] font-bold text-slate-400 mt-auto">Across 4 categories</p>
        </div>

        {/* Negotiating */}
        <div className="col-span-6 md:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col group cursor-pointer hover:border-[#B45309]/30 transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FEF3C7] text-[#B45309]"><Clock className="w-4 h-4" /></div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#B45309] group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Negotiating</p>
          <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1">2</p>
          <p className="text-[9px] font-bold text-slate-400 mt-auto">Awaiting revised quotes</p>
        </div>

        {/* Committed Spend */}
        <div className="col-span-6 md:col-span-3 bg-[#BE185D] text-white rounded-2xl border border-[#BE185D] p-4 shadow-sm flex flex-col group cursor-pointer hover:bg-[#A91552] transition-all">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10"><Wallet className="w-4 h-4" /></div>
            <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-0.5">Total Committed</p>
          <p className="text-2xl font-black leading-none mb-1">PKR 1.65M</p>
          <p className="text-[9px] font-bold text-white/60 mt-auto">Across booked vendors</p>
        </div>
      </div>

      {/* ═══ ROW 3: Active Quotations & Saved Vendors (6 + 6 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Active Quotations */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-black text-[#1A1A1A]">My Vendors</h3>
              <p className="text-[10px] font-bold text-slate-500 mt-0.5">Booked and active negotiations</p>
            </div>
            <button onClick={() => showToast("Invite sent successfully!")} className="text-[10px] font-bold text-white bg-[#0A3B2A] px-2 py-1 rounded-md flex items-center gap-1 hover:bg-[#0A3B2A]/90"><Plus className="w-3 h-3"/> Invite</button>
          </div>
          <div className="space-y-2 flex-1">
            {VENDORS.filter(v => v.status !== "shortlisted").map(v => (
              <div key={v.id} className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D5] flex items-center justify-between group hover:bg-white hover:border-[#0A3B2A]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <img src={v.img} alt={v.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-tight group-hover:text-[#0A3B2A]">{v.name}</h4>
                    <p className="text-[9px] font-medium text-slate-500 mt-0.5">{v.cat}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-black text-[#1A1A1A]">{v.quote}</p>
                  <span className={`inline-flex items-center gap-1 mt-1 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                    v.status === "confirmed" ? "bg-[#A7F3D0] text-[#047857]" : "bg-[#FEF3C7] text-[#B45309]"
                  }`}>
                    {v.status === "confirmed" && <CheckCircle2 className="w-2.5 h-2.5" />}
                    {v.status === "negotiating" && <Clock className="w-2.5 h-2.5" />}
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortlisted/Saved Vendors */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-[#1A1A1A]">Shortlisted</h3>
            <button className="text-[10px] font-bold text-[#0A3B2A] hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {VENDORS.filter(v => v.status === "shortlisted").map(v => (
              <div key={v.id} className="col-span-2 sm:col-span-1 border border-slate-100 rounded-xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group flex flex-col">
                <div className="h-20 w-full relative overflow-hidden bg-slate-100">
                  <img src={v.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 bg-white flex-1 flex flex-col">
                  <p className="text-[8px] font-bold text-[#BE185D] uppercase tracking-widest mb-1">{v.cat}</p>
                  <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-tight mb-2 group-hover:text-[#0A3B2A]">{v.name}</h4>
                  <button onClick={() => showToast(`Quote requested from ${v.name}`)} className="mt-auto w-full py-1.5 bg-slate-50 text-[9px] font-bold text-slate-600 rounded flex justify-center items-center gap-1 group-hover:bg-[#0A3B2A] group-hover:text-white transition-colors">
                    Request Quote <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
            {/* Add placeholder */}
            <div className="col-span-2 sm:col-span-1 border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-[#0A3B2A]/30 transition-colors cursor-pointer min-h-[140px]">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-[10px] font-bold text-slate-600">Discover Vendors</p>
              <p className="text-[8px] text-slate-400 mt-0.5 text-center px-2">Browse the marketplace to find your perfect match</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
