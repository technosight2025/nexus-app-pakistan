"use client"

import { useState } from "react"
import {
  ArrowLeft, CheckCircle2, Circle, Clock, AlertCircle,
  Phone, Mail, MapPin, Calendar, Users, Camera, FileText,
  CreditCard, Package, UploadCloud, Edit3, Eye, Truck,
  DollarSign, BadgeCheck, Heart, ChevronRight, MessageCircle,
  Download, Share2, Plus, Zap, Star, Sparkles, Send, Gift,
  PenTool, MonitorPlay, FileCheck, X
} from "lucide-react"
import { useRouter } from "next/navigation"

const TABS = ["overview", "quotation", "finances", "production", "media", "delivery"] as const
type TabId = typeof TABS[number]

// Mock Data
const BOOKING = {
  id: "BK-1024",
  client: "Ayesha & Hamza",
  phone: "+92 300 1234567",
  email: "ayesha@gmail.com",
  event: "Walima",
  date: "Jul 5, 2025",
  venue: "Pearl Continental, Lahore",
  city: "Lahore",
  guestCount: "400-600",
  budget: 120000,
  advance: 60000,
  initials: "A",
  color: "bg-indigo-500",
}

const QUOTATION_ITEMS = [
  { id: 1, name: "Premium Photography Package", desc: "2 Senior Photographers, Unlimited Shots", price: 65000 },
  { id: 2, name: "Cinematic Videography", desc: "2 Cinematographers, 1 Drone, Teaser + Highlight", price: 85000 },
  { id: 3, name: "Signature Album", desc: "12x36 Premium Leather Album (40 Pages)", price: 25000 },
]

const TEAM_MEMBERS = [
  { id: 1, name: "Usman Raza", role: "Lead Photographer", available: true },
  { id: 2, name: "Aisha Noor", role: "Co-Photographer", available: true },
  { id: 3, name: "Faisal Khan", role: "Videographer", available: false },
]

const EQUIPMENT = [
  { id: 1, name: "Sony A7IV Body", status: "Assigned" },
  { id: 2, name: "DJI Mavic 3 Pro", status: "Assigned" },
  { id: 3, name: "Godox AD600 Pro Lighting", status: "Available" },
]

const MEDIA_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80", selected: true },
  { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80", selected: true },
  { id: 3, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80", selected: false },
  { id: 4, src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80", selected: false },
  { id: 5, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=400&q=80", selected: true },
  { id: 6, src: "https://images.unsplash.com/photo-1546193430-c2d207739ed7?auto=format&fit=crop&w=400&q=80", selected: false },
]

const UPSELL_SERVICES = [
  { id: 1, name: "1st Anniversary Shoot", price: "₨35,000", desc: "Lock in your anniversary shoot now at a 20% discount.", icon: Heart, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  { id: 2, name: "Canvas Wall Art (24x36)", price: "₨15,000", desc: "Turn your favorite portrait into a premium canvas print.", icon: MonitorPlay, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
  { id: 3, name: "Mini Parent Albums", price: "₨20,000", desc: "2x replica pocket albums perfect for gifting to parents.", icon: Gift, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
]

export default function BookingCommandCenter() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>("overview")

  // Interactive states to simulate business flow
  const [quoteStatus, setQuoteStatus] = useState<"Draft"|"Sent"|"Negotiating"|"Approved">("Negotiating")
  const [discount, setDiscount] = useState(25000)
  const [paymentStage, setPaymentStage] = useState<"Pending Advance"|"Project Started"|"Pending Final"|"Fully Paid">("Project Started")
  const [mediaSent, setMediaSent] = useState(false)
  const [suggestedUpsells, setSuggestedUpsells] = useState<number[]>([])

  const totalQuote = QUOTATION_ITEMS.reduce((a, b) => a + b.price, 0) - discount

  return (
    <div className="space-y-5 md:space-y-6 max-w-6xl mx-auto pb-24">
      
      {/* ────────────────────────────────────────────────
          HEADER BANNER
      ──────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/studio")} className="w-10 h-10 rounded-xl border border-[#E5E7EB] dark:border-white/10 flex items-center justify-center text-[#6B7280] hover:bg-[#F8FAFC] dark:hover:bg-white/5 hover:text-[#4F46E5] transition-colors cursor-pointer shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[16px] md:text-[20px] font-black text-[#111827] dark:text-white leading-tight">{BOOKING.client}</h1>
              <span className="text-[9px] font-black bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-500/20">{BOOKING.id}</span>
            </div>
            <p className="text-[11px] md:text-[12px] font-medium text-[#6B7280] dark:text-gray-400 mt-0.5">{BOOKING.event} · {BOOKING.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[11px] font-black text-[#374151] dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-white/5 cursor-pointer transition-colors shadow-sm">
            <MessageCircle className="w-4 h-4 text-[#22C55E]" /> WhatsApp Client
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          MAIN WORKSPACE TABS
      ──────────────────────────────────────────────── */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-1.5 sticky top-[72px] z-40 shadow-sm backdrop-blur-md">
        {TABS.map((tab, idx) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`flex-1 min-w-[120px] py-2.5 rounded-xl text-[10px] md:text-[11px] font-black capitalize transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === tab 
                ? "bg-white dark:bg-[#111118] text-[#4F46E5] shadow-sm ring-1 ring-[#E5E7EB] dark:ring-white/10" 
                : "text-[#6B7280] dark:text-gray-400 hover:text-[#4F46E5] hover:bg-white/50 dark:hover:bg-white/5"
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#F3F4F6] dark:bg-white/10 flex items-center justify-center text-[8px]">{idx + 1}</span>
            {tab}
          </button>
        ))}
      </div>

      {/* ────────────────────────────────────────────────
          TAB 1: OVERVIEW
      ──────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Client Intel */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 space-y-4">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2"><Star className="w-3 h-3"/> Client Intel</div>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${BOOKING.color} text-white font-black flex items-center justify-center text-lg shadow-inner`}>{BOOKING.initials}</div>
              <div>
                <div className="text-[15px] font-black text-[#111827] dark:text-white leading-tight">{BOOKING.client}</div>
                <div className="text-[11px] text-[#22C55E] font-bold mt-0.5 flex items-center gap-1"><BadgeCheck className="w-3 h-3"/> High Value Client</div>
              </div>
            </div>
            <div className="space-y-2.5 pt-2 border-t border-[#F3F4F6] dark:border-white/5">
              <div className="flex items-center gap-3 text-[12px] text-[#374151] dark:text-gray-300"><Phone className="w-4 h-4 text-[#9CA3AF]" /> {BOOKING.phone}</div>
              <div className="flex items-center gap-3 text-[12px] text-[#374151] dark:text-gray-300"><Mail className="w-4 h-4 text-[#9CA3AF]" /> {BOOKING.email}</div>
              <div className="flex items-center gap-3 text-[12px] text-[#374151] dark:text-gray-300"><MapPin className="w-4 h-4 text-[#9CA3AF]" /> {BOOKING.city}</div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 space-y-4">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3"/> Event Specs</div>
            <div className="space-y-3">
              {[
                { l: "Type", v: BOOKING.event },
                { l: "Date", v: BOOKING.date },
                { l: "Venue", v: BOOKING.venue },
                { l: "Guests", v: BOOKING.guestCount },
              ].map(item => (
                <div key={item.l} className="flex items-center justify-between bg-[#F8FAFC] dark:bg-white/3 p-2.5 rounded-xl">
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">{item.l}</span>
                  <span className="text-[11px] font-black text-[#111827] dark:text-white">{item.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Status */}
          <div className="bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-4">Current Workspace Status</div>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-white/90">Quotation</span>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">{quoteStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-white/90">Payment</span>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">{paymentStage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-white/90">Production</span>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">Assigned</span>
              </div>
            </div>

            <button onClick={() => setActiveTab("quotation")} className="mt-5 w-full py-2.5 bg-white text-[#4F46E5] text-[11px] font-black rounded-xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20 cursor-pointer">
              Go to Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────
          TAB 2: QUOTATION & NEGOTIATION
      ──────────────────────────────────────────────── */}
      {activeTab === "quotation" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6">
          {/* Quote Builder */}
          <div className="lg:col-span-3 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5 flex items-center justify-between bg-[#F8FAFC] dark:bg-white/2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4F46E5]" />
                <h3 className="text-[14px] font-black text-[#111827] dark:text-white">Quote Builder</h3>
              </div>
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${quoteStatus === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20'}`}>
                {quoteStatus}
              </span>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-3">
              {QUOTATION_ITEMS.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-3 border border-[#E5E7EB] dark:border-white/10 rounded-xl hover:border-[#4F46E5]/40 transition-colors">
                  <div>
                    <div className="text-[12px] font-bold text-[#111827] dark:text-white">{item.name}</div>
                    <div className="text-[10px] text-[#6B7280] dark:text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                  <div className="text-[12px] font-black text-[#111827] dark:text-white">₨{item.price.toLocaleString()}</div>
                </div>
              ))}
              <button className="w-full py-2 border border-dashed border-[#E5E7EB] dark:border-white/20 rounded-xl text-[10px] font-black text-[#6B7280] hover:text-[#4F46E5] hover:border-[#4F46E5] transition-colors cursor-pointer flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" /> Add Service Package
              </button>
            </div>

            <div className="p-5 bg-[#F8FAFC] dark:bg-[#1A1A24] border-t border-[#E5E7EB] dark:border-white/5 space-y-2">
              <div className="flex justify-between text-[11px] text-[#6B7280]">
                <span>Subtotal</span>
                <span>₨175,000</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#6B7280]">
                <span className="flex items-center gap-1"><PenTool className="w-3 h-3" /> Negotiated Discount</span>
                <span className="text-[#EF4444]">-₨{discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[16px] font-black text-[#111827] dark:text-white pt-2 border-t border-[#E5E7EB] dark:border-white/10">
                <span>Final Total</span>
                <span>₨{totalQuote.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Negotiation Chat & Actions */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 flex flex-col h-[300px]">
              <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-3 border-b border-[#F3F4F6] dark:border-white/5 pb-2">Client Portal Chat</div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F8FAFC] dark:bg-white/10 flex items-center justify-center text-[8px] shrink-0">C</div>
                  <div className="bg-[#F8FAFC] dark:bg-white/5 p-2 rounded-xl rounded-tl-sm text-[11px] text-[#374151] dark:text-gray-300">
                    Hi, the quotation looks good but is it possible to give a small discount on the album?
                  </div>
                </div>
                <div className="flex gap-2 flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-[8px] font-black shrink-0">NX</div>
                  <div className="bg-[#4F46E5] text-white p-2 rounded-xl rounded-tr-sm text-[11px]">
                    I've updated the quote with a ₨25,000 package discount for you! Please review.
                  </div>
                </div>
              </div>

              <div className="mt-3 relative">
                <input type="text" placeholder="Reply to client..." className="w-full text-[11px] bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-[#4F46E5]" />
                <button className="absolute right-2 top-1.5 p-1 text-[#4F46E5] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg cursor-pointer"><Send className="w-3.5 h-3.5"/></button>
              </div>
            </div>

            {quoteStatus !== "Approved" ? (
              <button onClick={() => { setQuoteStatus("Approved"); setPaymentStage("Pending Advance"); }} className="w-full py-3.5 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-2xl text-[12px] font-black shadow-lg cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Client Approved Quote
              </button>
            ) : (
              <div className="w-full py-3.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-2xl text-[12px] font-black flex items-center justify-center gap-2">
                <BadgeCheck className="w-4 h-4" /> Quotation Approved
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────
          TAB 3: FINANCES & PAYMENTS
      ──────────────────────────────────────────────── */}
      {activeTab === "finances" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Payment Gateway / Invoice Form */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 md:p-6 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#22C55E] opacity-5 rounded-full blur-3xl pointer-events-none" />
             
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-[#22C55E] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[#111827] dark:text-white">Record Payment</h3>
                  <p className="text-[10px] text-[#6B7280]">Total Project Value: ₨{totalQuote.toLocaleString()}</p>
                </div>
             </div>

             <div className="space-y-4">
                {paymentStage === "Pending Advance" && (
                  <div className="p-4 border border-[#E5E7EB] dark:border-white/10 rounded-xl bg-[#F8FAFC] dark:bg-white/2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-bold text-[#374151] dark:text-gray-300">Advance Required (50%)</span>
                      <span className="text-[14px] font-black text-[#111827] dark:text-white">₨{(totalQuote/2).toLocaleString()}</span>
                    </div>
                    <button onClick={() => setPaymentStage("Project Started")} className="w-full py-2.5 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-xl text-[11px] font-black cursor-pointer hover:opacity-90 transition-opacity">
                      Record Advance Received
                    </button>
                  </div>
                )}
                
                {(paymentStage === "Project Started" || paymentStage === "Pending Final") && (
                  <div className="p-4 border border-[#E5E7EB] dark:border-white/10 rounded-xl bg-[#F8FAFC] dark:bg-white/2">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-bold text-[#374151] dark:text-gray-300">Final Balance</span>
                      <span className="text-[14px] font-black text-[#111827] dark:text-white">₨{(totalQuote/2).toLocaleString()}</span>
                    </div>
                    <button onClick={() => setPaymentStage("Fully Paid")} className="w-full py-2.5 bg-[#4F46E5] text-white rounded-xl text-[11px] font-black cursor-pointer hover:opacity-90 transition-opacity">
                      Record Final Payment
                    </button>
                  </div>
                )}

                {paymentStage === "Fully Paid" && (
                  <div className="p-6 border border-emerald-200 dark:border-emerald-500/20 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#22C55E] text-white flex items-center justify-center mb-3"><BadgeCheck className="w-6 h-6"/></div>
                    <div className="text-[14px] font-black text-[#111827] dark:text-white">Project Fully Paid</div>
                    <div className="text-[10px] text-[#6B7280] mt-1">Receipts sent to client portal</div>
                  </div>
                )}
             </div>
          </div>

          {/* Payment History List */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4">Payment History</div>
            
            <div className="space-y-3">
              {(paymentStage !== "Pending Advance") && (
                <div className="flex items-center justify-between p-3 border border-[#E5E7EB] dark:border-white/8 rounded-xl bg-[#F8FAFC] dark:bg-white/2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center"><CheckCircle2 className="w-4 h-4"/></div>
                    <div>
                      <div className="text-[11px] font-bold text-[#111827] dark:text-white">Advance Payment</div>
                      <div className="text-[9px] text-[#9CA3AF]">Bank Transfer · {BOOKING.date}</div>
                    </div>
                  </div>
                  <div className="text-[12px] font-black text-[#111827] dark:text-white">₨{(totalQuote/2).toLocaleString()}</div>
                </div>
              )}
              
              {paymentStage === "Fully Paid" && (
                <div className="flex items-center justify-between p-3 border border-[#E5E7EB] dark:border-white/8 rounded-xl bg-[#F8FAFC] dark:bg-white/2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center"><CheckCircle2 className="w-4 h-4"/></div>
                    <div>
                      <div className="text-[11px] font-bold text-[#111827] dark:text-white">Final Clearance</div>
                      <div className="text-[9px] text-[#9CA3AF]">Cash · Today</div>
                    </div>
                  </div>
                  <div className="text-[12px] font-black text-[#111827] dark:text-white">₨{(totalQuote/2).toLocaleString()}</div>
                </div>
              )}
            </div>

            <button className="mt-5 text-[10px] font-black text-[#4F46E5] hover:underline cursor-pointer flex items-center gap-1"><Download className="w-3 h-3"/> Download Ledger PDF</button>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────
          TAB 4: TEAM & PRODUCTION
      ──────────────────────────────────────────────── */}
      {activeTab === "production" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Team Assignment */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4 border-b border-[#F3F4F6] dark:border-white/5 pb-2">
               <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2"><Users className="w-3 h-3"/> Assign Crew</div>
               <button className="text-[9px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 px-2 py-1 rounded-lg cursor-pointer">+ Add Staff</button>
            </div>
            
            <div className="space-y-2">
              {TEAM_MEMBERS.map(member => (
                <div key={member.id} className="flex items-center justify-between p-3 border border-[#E5E7EB] dark:border-white/8 rounded-xl hover:border-[#4F46E5]/30 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-black flex items-center justify-center shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#111827] dark:text-white leading-none">{member.name}</div>
                      <div className="text-[9px] text-[#6B7280] mt-1">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${member.available ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`} />
                    <button className="opacity-0 group-hover:opacity-100 p-1 text-[#9CA3AF] hover:bg-[#F8FAFC] rounded cursor-pointer transition-all"><X className="w-3 h-3"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Assignment */}
          <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4 border-b border-[#F3F4F6] dark:border-white/5 pb-2">
               <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2"><Camera className="w-3 h-3"/> Allocate Gear</div>
               <button className="text-[9px] font-black text-[#4F46E5] bg-[#EEF2FF] dark:bg-indigo-500/10 px-2 py-1 rounded-lg cursor-pointer">+ Add Gear</button>
            </div>
            
            <div className="space-y-2">
              {EQUIPMENT.map(gear => (
                <div key={gear.id} className="flex items-center justify-between p-3 border border-[#E5E7EB] dark:border-white/8 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] dark:bg-white/5 text-[#9CA3AF] flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-bold text-[#374151] dark:text-gray-300">{gear.name}</div>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${gear.status === 'Assigned' ? 'bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-500/20' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20'}`}>
                    {gear.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────
          TAB 5: MEDIA & SELECTIONS
      ──────────────────────────────────────────────── */}
      {activeTab === "media" && (
        <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-[#F3F4F6] dark:border-white/5 flex items-center justify-between bg-[#F8FAFC] dark:bg-[#1A1A24]">
             <div>
               <h3 className="text-[14px] font-black text-[#111827] dark:text-white">Media Selection Portal</h3>
               <p className="text-[10px] text-[#6B7280] mt-0.5">Send watermarked shoots to the client for final selection.</p>
             </div>
             <button 
               onClick={() => setMediaSent(true)}
               className={`px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 cursor-pointer transition-all ${mediaSent ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20' : 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:opacity-90'}`}
             >
               {mediaSent ? <><CheckCircle2 className="w-3.5 h-3.5"/> Sent to Client</> : <><Send className="w-3.5 h-3.5"/> Send Selection Link</>}
             </button>
          </div>
          
          <div className="p-5">
             <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-bold text-[#374151] dark:text-gray-300"><span className="text-[#4F46E5]">3/6</span> items selected by client</div>
                <div className="flex gap-2">
                   <span className="w-2 h-2 rounded-full bg-[#E5E7EB] dark:bg-white/10" />
                   <span className="w-2 h-2 rounded-full bg-[#E5E7EB] dark:bg-white/10" />
                   <span className="w-6 h-2 rounded-full bg-[#4F46E5]" />
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {MEDIA_IMAGES.map((img) => (
                  <div key={img.id} className={`relative aspect-square rounded-xl overflow-hidden group cursor-pointer border-2 transition-all ${img.selected ? 'border-[#4F46E5]' : 'border-transparent'}`}>
                    <img src={img.src} alt="media" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {/* Watermark overlay */}
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none opacity-50">
                      <span className="text-white/60 font-black text-2xl -rotate-45 tracking-widest">NEXUS</span>
                    </div>
                    {/* Selection Check */}
                    {img.selected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────
          TAB 6: DELIVERY & UPSELL
      ──────────────────────────────────────────────── */}
      {activeTab === "delivery" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Handover Links */}
          <div className="lg:col-span-2 bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 flex flex-col">
            <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-4 flex items-center gap-2"><Truck className="w-3 h-3"/> Final Deliverables</div>
            
            <div className="flex-1 space-y-3">
               <div className="p-4 border border-[#E5E7EB] dark:border-white/8 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                      <UploadCloud className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#111827] dark:text-white">High-Res Photos (Drive)</div>
                      <div className="text-[9px] text-[#9CA3AF]">nexus.cloud/d/walima-hq</div>
                    </div>
                 </div>
                 <button className="px-3 py-1.5 bg-[#F8FAFC] dark:bg-white/5 text-[#374151] dark:text-gray-300 rounded-lg text-[10px] font-black hover:bg-[#E5E7EB] dark:hover:bg-white/10 transition-colors cursor-pointer">Copy Link</button>
               </div>

               <div className="p-4 border border-[#E5E7EB] dark:border-white/8 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                      <MonitorPlay className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#111827] dark:text-white">Cinematic Video (Vimeo)</div>
                      <div className="text-[9px] text-[#9CA3AF]">vimeo.com/nexus/bk-1024 (Pwd: walima25)</div>
                    </div>
                 </div>
                 <button className="px-3 py-1.5 bg-[#F8FAFC] dark:bg-white/5 text-[#374151] dark:text-gray-300 rounded-lg text-[10px] font-black hover:bg-[#E5E7EB] dark:hover:bg-white/10 transition-colors cursor-pointer">Copy Link</button>
               </div>
            </div>

            <button className="mt-5 w-full py-3 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-xl text-[12px] font-black shadow-lg cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <FileCheck className="w-4 h-4"/> Mark Project as Complete
            </button>
          </div>

          {/* Upsell Engine */}
          <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-[#1A1A24] dark:to-[#111118] border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
               <Sparkles className="w-4 h-4 text-[#4F46E5]"/>
               <div className="text-[11px] font-black text-[#111827] dark:text-white uppercase tracking-widest">Suggestive Services</div>
            </div>
            <p className="text-[10px] text-[#6B7280] mb-4">Automatically pitch relevant post-project services to increase lifetime value.</p>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {UPSELL_SERVICES.map(srv => {
                const isPitched = suggestedUpsells.includes(srv.id)
                return (
                  <div key={srv.id} className="bg-white dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md ${srv.bg} ${srv.color} flex items-center justify-center shrink-0`}><srv.icon className="w-3 h-3"/></div>
                      <div className="text-[10px] font-bold text-[#111827] dark:text-white leading-tight">{srv.name}</div>
                    </div>
                    <div className="text-[9px] text-[#9CA3AF] leading-snug">{srv.desc}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-black text-[#4F46E5]">{srv.price}</span>
                      <button 
                        onClick={() => setSuggestedUpsells(prev => isPitched ? prev : [...prev, srv.id])}
                        disabled={isPitched}
                        className={`text-[8px] font-black px-2 py-1 rounded cursor-pointer transition-colors ${isPitched ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-[#F8FAFC] dark:bg-white/5 text-[#374151] dark:text-gray-300 hover:bg-[#E5E7EB] border border-[#E5E7EB] dark:border-white/10'}`}
                      >
                        {isPitched ? 'Pitched ✓' : 'Pitch Now'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
