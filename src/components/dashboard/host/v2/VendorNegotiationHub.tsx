"use client"

import { useState } from "react"
import { 
  FileText, MessageSquare, Briefcase, CreditCard, Sparkles, Star, History, Send,
  Plus, ArrowLeft, MoreVertical, ShieldCheck, CheckCircle2, Edit, XCircle, Users,
  Calendar, Calculator, Clock, MessageCircle
} from "lucide-react"
import Link from "next/link"

export function VendorNegotiationHub() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F3EFE] text-[#1E293B] font-inter flex flex-col lg:flex-row relative overflow-hidden" style={{ backgroundColor: '#FAF8F5' }}>
      
      {/* ========================================= */}
      {/* 1. LEFT SIDEBAR (Vendor Hub Nav)          */}
      {/* ========================================= */}
      <aside className={`
        absolute lg:static inset-y-0 left-0 z-40 bg-white lg:bg-transparent
        w-64 shrink-0 flex flex-col overflow-y-auto transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-8 pb-8 flex items-center gap-2">
           <div className="w-6 h-6 border-[1.5px] border-[#0A3B2A] rounded flex flex-col gap-[2px] p-[3px]">
             <div className="h-full bg-[#0A3B2A] rounded-[1px]" />
           </div>
           <h2 className="text-sm font-black font-poppins text-[#0A3B2A]">Nexus Festive</h2>
        </div>

        <div className="px-8 mb-8">
          <h3 className="text-sm font-bold font-poppins text-[#1A1A1A] mb-1">Vendor Hub</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Negotiation Suite</p>
        </div>

        <nav className="px-4 space-y-1 mb-8 flex-1">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">All Quotes</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-[#0A3B2A]-container text-white shadow-md rounded-xl">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-bold">Negotiations</span>
          </Link>
          <Link href="/dashboard/host/v2/contracts" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Contracts</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-medium">Payments</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl">
            <Sparkles className="w-4 h-4 text-[#C026D3]" />
            <span className="text-sm font-medium">Value Optimizer</span>
          </Link>
        </nav>

        <div className="p-6">
          <button className="w-full bg-[#C026D3] text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-[#C026D3]/20 flex items-center justify-center gap-2 hover:bg-[#A21CAF] transition-colors">
            <Plus className="w-4 h-4" /> New Request
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========================================= */}
      {/* 2. MIDDLE COLUMN (Workspace)              */}
      {/* ========================================= */}
      <main className="flex-1 flex flex-col min-w-0 lg:overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
        
        {/* Workspace Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/host/v2"
              className="lg:hidden p-2 bg-white rounded-full shadow-sm text-slate-600 mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard/host/v2"
              className="hidden lg:flex w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm text-slate-600 hover:text-black"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold font-poppins text-[#0A3B2A] flex items-center gap-2">
                Negotiation Workspace
              </h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Vendor ID: V-ZM2024-08</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-[#BE185D]-fixed text-[#BE185D] text-[11px] font-black uppercase px-4 py-2 rounded-full tracking-wider">
              Active Offer
            </span>
            <button className="text-slate-400 hover:text-black">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Vendor Card */}
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1596450514735-111a2fe02935?q=80&w=150" className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-white" alt="Zubeda Mehndi Arts" />
              <div className="absolute -bottom-2 -right-2 bg-[#FEF3C7] text-[#854D0E] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border-2 border-white">
                <Star className="w-3 h-3 fill-current" /> 4.9
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold font-poppins text-[#1A1A1A] mb-1">Zubeda Mehndi Arts</h2>
              <div className="flex items-center gap-2 text-[13px] text-slate-600 mb-3 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#0A3B2A]" /> 128 verified bridal bookings
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-full">Top Rated</span>
                <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-full">Urgent Booking Available</span>
              </div>
            </div>
          </div>
          <div className="lg:text-right mt-4 lg:mt-0">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Quote</p>
            <p className="text-2xl font-bold font-poppins text-[#0A3B2A] mb-1">PKR 45,000</p>
            <p className="text-[11px] font-bold text-[#B45309]">Includes Taxes & Material Fees</p>
          </div>
        </div>

        {/* Itemized Service Breakdown */}
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-bold font-poppins text-[#0A3B2A]">Itemized Service Breakdown</h3>
            <span className="bg-[#F8F4EC] text-[#1A1A1A] text-[11px] font-bold px-3 py-1.5 rounded-full">3 Items Total</span>
          </div>

          <div className="w-full text-left">
            <div className="flex items-center border-b border-slate-100 pb-4 mb-5">
              <div className="w-3/4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Description</div>
              <div className="w-1/4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Price (PKR)</div>
            </div>
            
            <div className="flex items-center border-b border-slate-50 pb-5 mb-5">
              <div className="w-3/4 pr-4">
                <p className="text-[14px] font-bold text-[#1A1A1A] mb-1">Bridal Mehndi (Intricate Full Hand & Feet)</p>
                <p className="text-[12px] text-slate-500 font-medium">Signature organic henna paste + 6 hours session</p>
              </div>
              <div className="w-1/4 text-right text-[15px] font-bold text-[#1A1A1A]">25,000</div>
            </div>

            <div className="flex items-center border-b border-slate-50 pb-5 mb-5">
              <div className="w-3/4 pr-4">
                <p className="text-[14px] font-bold text-[#1A1A1A] mb-1">Guest Packages (15-20 People)</p>
                <p className="text-[12px] text-slate-500 font-medium">Arabic style strips + 2 Junior artists included</p>
              </div>
              <div className="w-1/4 text-right text-[15px] font-bold text-[#1A1A1A]">15,000</div>
            </div>

            <div className="flex items-center pb-2">
              <div className="w-3/4 pr-4">
                <p className="text-[14px] font-bold text-[#1A1A1A] mb-1">Travel & Setup Fee</p>
                <p className="text-[12px] text-slate-500 font-medium">Transportation to DHA Phase 6 + Sanitary setup kit</p>
              </div>
              <div className="w-1/4 text-right text-[15px] font-bold text-[#1A1A1A]">5,000</div>
            </div>
          </div>
        </div>

        {/* Negotiation History / Chat */}
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 flex-1 flex flex-col relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[15px] font-bold font-poppins text-[#0A3B2A] flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Negotiation History
            </h3>
            <div className="flex items-center -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#0A3B2A]-fixed text-[#047857] flex items-center justify-center text-[10px] font-bold border-2 border-white relative z-10">
                ZM
              </div>
              <div className="w-8 h-8 rounded-full bg-[#BE185D]-fixed text-[#BE185D] flex items-center justify-center text-[10px] font-bold border-2 border-white relative z-0">
                ZA
              </div>
            </div>
          </div>

          <div className="w-1/2 h-1 bg-[#0A3B2A]-container rounded-full mx-auto mb-8 opacity-20"></div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col gap-6 mb-8">
            {/* Vendor Message */}
            <div className="flex items-start gap-4 w-full max-w-xl">
               <div className="w-10 h-10 rounded-full bg-[#BE185D]-fixed text-[#BE185D] flex items-center justify-center shrink-0">
                 <Users className="w-5 h-5" />
               </div>
               <div className="bg-[#EAE4D9] bg-opacity-40 rounded-2xl rounded-tl-sm p-5 text-[14px] text-[#1A1A1A] font-medium leading-relaxed shadow-sm border border-[#E8E2D5]">
                 I can reduce it to 12,000 PKR if we limit it to 12 guests. Let me know if that works for you!
                 <p className="text-[10px] text-slate-500 mt-3 font-bold">11:15 AM</p>
               </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="relative mt-auto">
            <input 
              type="text" 
              placeholder="Type your counter offer..."
              className="w-full border border-[#E8E2D5] rounded-full pl-6 pr-16 py-4 text-sm font-medium focus:outline-none focus:border-[#0A3B2A] bg-[#EAE4D9] bg-opacity-30"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-black">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </main>

      {/* ========================================= */}
      {/* 3. RIGHT COLUMN (Actions & AI)            */}
      {/* ========================================= */}
      <aside className="w-full lg:w-[380px] p-4 lg:p-8 shrink-0 overflow-y-auto">
        
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Primary Actions</h3>
        
        {/* Actions Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-8 flex flex-col gap-4">
          <button className="w-full bg-[#0A3B2A] hover:bg-[#0A3B2A]-container text-white text-[14px] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#0A3B2A]/20">
            <CheckCircle2 className="w-5 h-5" /> Accept Quote
          </button>
          
          <button className="w-full bg-white hover:bg-slate-50 text-[#1A1A1A] border-2 border-slate-200 text-[14px] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Edit className="w-4 h-4" /> Send Counter Offer
          </button>
          
          <button className="w-full text-center text-[13px] font-bold text-[#E11D48] hover:bg-red-50 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <XCircle className="w-4 h-4" /> Decline Quote
          </button>

          <div className="h-px bg-slate-100 my-2"></div>

          <button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14px] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#25D366]/20">
            <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
          </button>
        </div>

        {/* AI Value Optimizer Card */}
        <div className="bg-[#0A3B2A] rounded-[24px] p-6 shadow-xl border border-[#155E45] relative overflow-hidden text-white">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C026D3] opacity-20 blur-[50px] rounded-full pointer-events-none"></div>

          <div className="flex items-start justify-between mb-6 relative z-10">
            <h3 className="text-[16px] font-bold font-poppins flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C026D3]" /> AI Value Optimizer
            </h3>
            <span className="bg-[#C026D3] text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-sm">
              High Impact
            </span>
          </div>

          <div className="flex items-end gap-2 mb-6 relative z-10">
            <span className="text-4xl font-poppins font-light tracking-tight">8.2</span>
            <span className="text-[13px] text-[#0A3B2A]-fixed mb-1 font-medium">/ 10 Negotiability Score</span>
          </div>

          <div className="bg-[#0A3B2A]-container border border-[#227A5B] rounded-xl p-4 mb-6 relative z-10">
            <p className="text-lg font-bold text-white mb-1">PKR 3,000</p>
            <p className="text-[11px] text-[#0A3B2A]-fixed font-medium">Estimated Potential Savings</p>
          </div>

          <p className="text-[12px] leading-relaxed text-[#D1FAE5] font-light italic mb-6 relative z-10">
            "Smart Recommendation: Swap imported henna for <span className="font-medium text-white border-b border-[#C026D3]">premium organic local brand</span>. It maintains identical stain quality while reducing the quote by 7%."
          </p>

          <button className="w-full bg-[#BE185D]-fixed hover:bg-white text-[#BE185D] text-[14px] font-bold py-3.5 rounded-xl transition-colors shadow-sm relative z-10">
            Apply AI Strategy
          </button>
        </div>
      </aside>

      {/* ========================================= */}
      {/* 4. FAR-RIGHT STRIP (Tools & Profile)      */}
      {/* ========================================= */}
      <aside className="hidden xl:flex w-20 border-l border-slate-200 bg-[#EAE4D9] bg-opacity-30 shrink-0 flex-col items-center py-8 z-10">
        
        <div className="flex flex-col gap-4 w-full px-4">
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-600 hover:text-black hover:scale-105 transition-all">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-600 hover:text-black hover:scale-105 transition-all">
            <Calculator className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-600 hover:text-black hover:scale-105 transition-all">
            <Clock className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-auto relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#BE185D] border-2 border-[#EAE4D9] rounded-full"></div>
        </div>

      </aside>

    </div>
  )
}
