"use client"
 
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, Mail, CheckCircle2, AlertCircle, Search, 
  Plus, Send, Edit, Copy, ChevronRight, Play, Flame, X
} from "lucide-react"
import { MusicalInviteViewer } from "./MusicalInviteViewer"
import Link from "next/link"

interface Guest {
  id: number;
  name: string;
  count: number;
  side: "Bride" | "Groom" | "Mutual";
  status: "Confirmed" | "Pending" | "Declined";
}

const DEFAULT_GUESTS: Guest[] = [
  { id: 1, name: "Ali Raza & Family", count: 4, side: "Groom", status: "Confirmed" },
  { id: 2, name: "Sana Malik & Friends", count: 6, side: "Bride", status: "Confirmed" },
  { id: 3, name: "Uncle Tariq", count: 2, side: "Groom", status: "Pending" },
  { id: 4, name: "Auntie Yasmin", count: 4, side: "Bride", status: "Pending" }
]

export function InvitationHubOverview() {
  const [isMounted, setIsMounted] = useState(false)
  const [guests, setGuests] = useState<Guest[]>(DEFAULT_GUESTS)
  const [showPreview, setShowPreview] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendProgress, setSendProgress] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Add Guest Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formName, setFormName] = useState("")
  const [formCount, setFormCount] = useState("1")
  const [formSide, setFormSide] = useState<"Bride" | "Groom" | "Mutual">("Bride")
  const [formStatus, setFormStatus] = useState<"Confirmed" | "Pending" | "Declined">("Pending")

  // Load from local storage
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexus_crm_guest_list")
      if (stored) {
        try {
          const parsed = JSON.parse(stored).map((g: any) => {
            let normalizedStatus: "Confirmed" | "Pending" | "Declined" = "Pending";
            if (g.status === "Attending" || g.status === "Confirmed") normalizedStatus = "Confirmed";
            else if (g.status === "Declined" || g.status === "Regret") normalizedStatus = "Declined";

            return {
              id: g.id || Date.now() + Math.random(),
              name: g.name || "Guest",
              count: g.count || 1,
              side: g.side || "Mutual",
              status: normalizedStatus
            }
          })
          setGuests(parsed)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  // Save helper
  const saveToStorage = (newGuests: Guest[]) => {
    if (typeof window !== "undefined") {
      const mapped = newGuests.map(g => ({
        id: g.id,
        name: g.name,
        count: g.count,
        side: g.side,
        status: g.status === "Confirmed" ? "Attending" : g.status
      }))
      localStorage.setItem("nexus_crm_guest_list", JSON.stringify(mapped))
    }
  }

  const handleCreateGuest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return

    const newGuest: Guest = {
      id: Date.now(),
      name: formName,
      count: Math.max(1, parseInt(formCount) || 1),
      side: formSide,
      status: formStatus
    }

    const updated = [...guests, newGuest]
    setGuests(updated)
    saveToStorage(updated)
    setIsModalOpen(false)
    setFormName("")
    setFormCount("1")
    showToast("Guest added successfully!")
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSend = () => {
    setIsSending(true)
    setSendProgress(0)
    const interval = setInterval(() => {
      setSendProgress(p => {
        if (p >= 100) { 
          clearInterval(interval); 
          setTimeout(() => {
            setIsSending(false)
            showToast("RSVP follow-up messages broadcasted via WhatsApp!")
          }, 1000); 
          return 100 
        }
        return p + 10
      })
    }, 100)
  }

  // Stats
  const totalGuests = guests.reduce((acc, g) => acc + g.count, 0)
  const confirmedCount = guests.filter(g => g.status === "Confirmed").reduce((acc, g) => acc + g.count, 0)
  const pendingCount = guests.filter(g => g.status === "Pending").reduce((acc, g) => acc + g.count, 0)
  const declinedCount = guests.filter(g => g.status === "Declined").reduce((acc, g) => acc + g.count, 0)
  const sentCount = totalGuests - pendingCount

  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!isMounted) return null

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
      {showPreview && <MusicalInviteViewer onClose={() => setShowPreview(false)} />}

      {/* ═══ ROW 1: Header (12 Col) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 bg-gradient-to-br from-[#0A3B2A] via-[#0D4A34] to-[#063020] rounded-2xl p-5 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#34D399]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-800 bg-white px-2 py-0.5 rounded-full shadow-sm">
                INVITATION HUB
              </span>
              <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1"><Flame className="w-3 h-3" />Accepting RSVPs</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight font-black">Guest Management</h1>
            <p className="text-white/60 text-xs font-medium flex items-center gap-1.5 mt-1">
              <Users className="w-3.5 h-3.5" /> {totalGuests} total invited across all events.
            </p>
          </div>

          <div className="relative z-10 flex gap-2 mt-4 md:mt-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
              <input 
                type="text" 
                placeholder="Search guests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-white/10 hover:bg-white/20 focus:bg-white/20 text-white placeholder-white/60 rounded-xl backdrop-blur-sm transition-all font-bold text-xs border border-white/10 outline-none w-[140px] focus:w-[180px]"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-[#0A3B2A] hover:bg-slate-50 rounded-xl shadow-sm transition-all font-bold text-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Add Guest
            </button>
          </div>
        </div>
      </div>

      {/* ═══ ROW 2: Stats Bento (4x 3 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        {/* Total */}
        <div className="col-span-6 md:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EAE4D9] text-[#0A3B2A]"><Users className="w-4 h-4" /></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Total Guests</p>
          <p className="text-2xl font-black text-[#1A1A1A] leading-none mb-1 font-black">{totalGuests}</p>
          <div className="mt-auto">
            <p className="text-[9px] font-bold text-slate-400">Headcount across all lists</p>
          </div>
        </div>

        {/* Sent */}
        <div className="col-span-6 md:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-700"><Mail className="w-4 h-4" /></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Invites Sent</p>
          <p className="text-2xl font-black text-[#1D4ED8] leading-none mb-1 font-black">{sentCount} <span className="text-[14px] text-slate-400">/ {totalGuests}</span></p>
          <div className="mt-auto w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#1D4ED8] h-full" style={{ width: `${totalGuests > 0 ? (sentCount / totalGuests) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Confirmed */}
        <div className="col-span-6 md:col-span-3 bg-[#0A3B2A] text-white rounded-2xl p-4 shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#34D399]/20 blur-xl rounded-full" />
          <div className="flex justify-between items-start mb-3 relative z-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#34D399]/20"><CheckCircle2 className="w-4 h-4 text-[#34D399]" /></div>
          </div>
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-0.5 relative z-10">Confirmed RSVPs</p>
          <p className="text-2xl font-black text-[#34D399] leading-none mb-1 relative z-10 font-black">{confirmedCount}</p>
          <div className="mt-auto relative z-10">
            <p className="text-[9px] font-bold text-white/50">Attending</p>
          </div>
        </div>

        {/* Pending */}
        <div className="col-span-6 md:col-span-3 bg-white rounded-2xl border border-[#B45309]/20 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FEF3C7] text-[#B45309]"><AlertCircle className="w-4 h-4" /></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Pending / Declined</p>
          <p className="text-2xl font-black text-[#B45309] leading-none mb-1 font-black">{pendingCount} <span className="text-[14px] text-slate-400">/ {declinedCount}</span></p>
          <div className="mt-auto">
            <button 
              onClick={handleSend}
              disabled={isSending}
              className="text-[9px] font-bold text-white bg-[#0A3B2A] w-full py-1.5 rounded flex items-center justify-center gap-1 hover:bg-[#0A3B2A]/90"
            >
              <Mail className="w-3 h-3"/> Chase Up
            </button>
          </div>
        </div>
      </div>

      {/* ═══ ROW 3: Digital Invite + Recent Guests (6 + 6 Cols) ═══ */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Digital Invite Card */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center md:items-start">
          {/* Visual Preview Mini */}
          <div className="w-full md:w-[160px] shrink-0 bg-[#0A3B2A] rounded-[16px] aspect-[9/16] relative flex flex-col items-center justify-center text-center p-4 overflow-hidden group border border-slate-200">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="relative z-10 w-full h-full border border-yellow-500/30 rounded-xl flex flex-col justify-center items-center">
              <h2 className="text-white font-serif text-xl italic mb-1">Sarah & Ahmed</h2>
              <div className="w-8 h-px bg-yellow-500/50 my-2"></div>
              <p className="text-white font-bold text-[10px]">Premium Invite</p>
            </div>
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-20">
              <button onClick={() => setShowPreview(true)} className="bg-yellow-500 text-[#0A3B2A] w-8 h-8 rounded-full flex items-center justify-center"><Play className="w-4 h-4 fill-current ml-0.5"/></button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col w-full h-full">
            <div>
              <span className="bg-[#A7F3D0] text-[#047857] text-[8px] font-black uppercase px-2 py-0.5 rounded-full mb-2 inline-block">Active Theme</span>
              <h3 className="text-sm font-black text-[#1A1A1A]">Emerald Elegance</h3>
              <p className="text-[10px] text-slate-500 mt-1">Dark green template with gold foil accents. Animated music enabled.</p>
            </div>

            <div className="mt-4 space-y-2">
              <button onClick={() => setShowPreview(true)} className="w-full text-[10px] font-bold text-[#1A1A1A] bg-slate-50 border border-slate-200 py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100"><Play className="w-3 h-3"/> Preview Invitation</button>
              <button onClick={() => showToast("Public link copied to clipboard!")} className="w-full text-[10px] font-bold text-[#1A1A1A] bg-slate-50 border border-slate-200 py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-100"><Copy className="w-3 h-3"/> Copy Public Link</button>
            </div>

            <div className="mt-auto pt-4 relative">
              <button 
                onClick={handleSend}
                disabled={isSending}
                className={`w-full text-white text-[11px] font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 overflow-hidden relative ${
                  sendProgress === 100 ? "bg-[#047857]" : "bg-[#0A3B2A] hover:bg-[#155E45]"
                }`}
              >
                {isSending && <div className="absolute left-0 top-0 bottom-0 bg-[#34D399] transition-all" style={{ width: `${sendProgress}%` }} />}
                <span className="relative z-10 flex items-center gap-1.5">
                  {isSending ? `Broadcasting ${sendProgress}%` : <><Send className="w-3.5 h-3.5" /> Broadcast to Pending</>}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Guest Responses */}
        <div className="col-span-12 md:col-span-6 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black text-[#1A1A1A]">Recent Responses</h3>
            <Link href="/dashboard/host/v2/guests" className="text-[10px] font-bold text-[#0A3B2A] hover:underline flex items-center">View All <ChevronRight className="w-3 h-3"/></Link>
          </div>
          <div className="space-y-2 flex-1 max-h-[300px] overflow-y-auto pr-1">
            {filteredGuests.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No guests found</p>
            ) : filteredGuests.map(g => (
              <div key={g.id} className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D5] flex items-center justify-between group hover:bg-white hover:border-[#0A3B2A]/30 transition-colors">
                <div>
                  <h4 className="text-[11px] font-bold text-[#1A1A1A] leading-tight group-hover:text-[#0A3B2A]">{g.name}</h4>
                  <p className="text-[9px] font-medium text-slate-500 mt-0.5">{g.side} Side &bull; Party of {g.count}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                    g.status === "Confirmed" ? "bg-[#A7F3D0] text-[#047857]" : 
                    g.status === "Pending" ? "bg-[#FEF3C7] text-[#B45309]" : 
                    "bg-rose-100 text-rose-700"
                  }`}>
                    {g.status === "Confirmed" && <CheckCircle2 className="w-2.5 h-2.5" />}
                    {g.status === "Pending" && <AlertCircle className="w-2.5 h-2.5" />}
                    {g.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ═══ ADD GUEST MODAL ═══ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[24px] w-full max-w-md p-6 shadow-2xl relative z-10 border border-slate-100"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-lg font-black text-[#0A3B2A] mb-4 font-poppins">
                Add New Guest
              </h3>
              
              <form onSubmit={handleCreateGuest} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Bilal Ahmed & Family"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pax Count</label>
                    <input 
                      type="number" 
                      min="1"
                      required
                      value={formCount}
                      onChange={(e) => setFormCount(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Side</label>
                    <select
                      value={formSide}
                      onChange={(e) => setFormSide(e.target.value as "Bride" | "Groom" | "Mutual")}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    >
                      <option value="Bride">Bride Side</option>
                      <option value="Groom">Groom Side</option>
                      <option value="Mutual">Mutual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as "Confirmed" | "Pending" | "Declined")}
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#0A3B2A] transition-colors"
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-[#E8E2D5] rounded-xl text-xs font-bold text-[#1A1A1A] hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-[#0A3B2A] text-white rounded-xl text-xs font-bold hover:bg-[#0A3B2A]/90 transition-colors"
                  >
                    Add Guest
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
