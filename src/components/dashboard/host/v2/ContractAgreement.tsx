"use client"

import { 
  ArrowLeft, Search, Bell, ShieldCheck, Users, ClipboardList, 
  Banknote, Gavel, Edit3, Download, MessageSquare, Info, MapPin, 
  Calendar, Headset, CheckCircle2, Shield
} from "lucide-react"
import Link from "next/link"

export function ContractAgreement() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-inter flex flex-col">
      
      {/* 🌟 Global Top Header */}
      <header className="h-16 bg-[#FDFBF7] border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="text-lg font-black font-poppins text-[#1A1A1A]">
            Nexus
          </div>
          <nav className="hidden md:flex items-center gap-6 h-full">
            <Link href="/dashboard/host/v2" className="text-sm font-medium text-slate-500 hover:text-[#1A1A1A]">Dashboard</Link>
            <Link href="/dashboard/host/v2/vendor-hub" className="text-sm font-medium text-slate-500 hover:text-[#1A1A1A]">Vendors</Link>
            <Link href="#" className="text-sm font-bold text-[#0A3B2A] border-b-2 border-[#0A3B2A] h-16 flex items-center">Contracts</Link>
            <Link href="#" className="text-sm font-medium text-slate-500 hover:text-[#1A1A1A]">Heritage</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search contracts..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20"
            />
          </div>
          <button className="text-slate-400 hover:text-[#1A1A1A]"><Bell className="w-5 h-5" /></button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* 🌟 Sub-Header Action Bar */}
      <div className="border-b border-slate-200 bg-[#FDFBF7] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/dashboard/host/v2/contracts" className="flex items-center gap-2 text-slate-500 hover:text-[#1A1A1A] text-[11px] font-bold uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Contract Repository
        </Link>
        <div className="flex items-center gap-4">
          <span className="bg-[#0A3B2A]-container text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-full tracking-widest shadow-sm">
            Draft Status
          </span>
          <span className="text-slate-500 text-[12px] font-medium">Last modified: August 24, 2024</span>
        </div>
      </div>

      {/* 🌟 Main Workspace */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
        
        {/* ========================================= */}
        {/* LEFT COLUMN (The Document Card)           */}
        {/* ========================================= */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col">
          
          {/* Subtle Watermark */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
             <Shield className="w-full h-full" />
          </div>

          <div className="p-8 lg:p-12 relative z-10 flex-1">
            {/* Document Header */}
            <div className="flex items-start justify-between mb-12">
              <div>
                <h1 className="text-3xl font-black font-poppins text-[#0A3B2A] mb-1">Contract Agreement</h1>
                <p className="text-sm font-medium text-slate-500">Ref: #NX-2024-08-ZM</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white mb-2 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nexus Festive Ecosystem B2B</p>
              </div>
            </div>

            {/* Parties Involved */}
            <div className="mb-10">
              <h3 className="text-[13px] font-bold text-[#1A1A1A] flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-slate-400" /> Parties Involved
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF9F6] border-l-4 border-l-[#155E45] p-5 rounded-r-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Vendor (The Service Provider)</p>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-1">Zubeda Mehndi Arts</p>
                  <p className="text-[12px] text-slate-500 font-medium">NTN: 829104-5 • Lahore, Pakistan</p>
                </div>
                <div className="bg-[#FAF9F6] border-l-4 border-l-[#BE185D] p-5 rounded-r-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Client (The Recipient)</p>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-1">Zoya Malik</p>
                  <p className="text-[12px] text-slate-500 font-medium">Booking ID: NEX-ZM-2024</p>
                </div>
              </div>
            </div>

            {/* Scope of Work */}
            <div className="mb-10">
              <h3 className="text-[13px] font-bold text-[#1A1A1A] flex items-center gap-2 mb-4">
                <ClipboardList className="w-4 h-4 text-slate-400" /> Scope of Work & Commercials
              </h3>
              <div className="w-full">
                <div className="flex items-center bg-[#FAF9F6] rounded-t-xl px-4 py-3 border-b border-slate-200">
                  <div className="w-1/2 text-[11px] font-bold text-[#1A1A1A]">Description of Services</div>
                  <div className="w-1/4 text-[11px] font-bold text-[#1A1A1A] text-right">Unit Rate</div>
                  <div className="w-1/4 text-[11px] font-bold text-[#1A1A1A] text-right">Amount (PKR)</div>
                </div>
                
                <div className="flex items-start px-4 py-4 border-b border-slate-100">
                  <div className="w-1/2 pr-4">
                    <p className="text-[13px] font-bold text-[#1A1A1A] mb-1">Bridal Mehndi Package</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Intricate organic henna for full hands (up to elbows) and feet.</p>
                  </div>
                  <div className="w-1/4 text-right text-[13px] text-slate-600">45,000</div>
                  <div className="w-1/4 text-right text-[13px] font-bold text-[#1A1A1A]">45,000</div>
                </div>

                <div className="flex items-start px-4 py-4 border-b border-slate-100">
                  <div className="w-1/2 pr-4">
                    <p className="text-[13px] font-bold text-[#1A1A1A] mb-1">Guest Mehndi Service</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Simplified traditional patterns for 15-20 guests (1 hand each).</p>
                  </div>
                  <div className="w-1/4 text-right text-[13px] text-slate-600">2,000/pp</div>
                  <div className="w-1/4 text-right text-[13px] font-bold text-[#1A1A1A]">40,000</div>
                </div>

                <div className="flex items-start px-4 py-4 mb-4">
                  <div className="w-1/2 pr-4">
                    <p className="text-[13px] font-bold text-[#1A1A1A] mb-1">Travel & Setup Fees</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Transportation of equipment and specialized seating arrangements.</p>
                  </div>
                  <div className="w-1/4 text-right text-[13px] text-slate-600">-</div>
                  <div className="w-1/4 text-right text-[13px] font-bold text-[#1A1A1A]">5,000</div>
                </div>

                <div className="bg-[#EAE4D9] bg-opacity-40 rounded-xl px-4 py-4 flex items-center justify-between">
                  <p className="text-[13px] font-bold text-[#1A1A1A]">Total Contract Value</p>
                  <p className="text-[14px] font-black text-[#0A3B2A]">PKR 90,000</p>
                </div>
              </div>
            </div>

            {/* Payment Milestones */}
            <div className="mb-10">
              <h3 className="text-[13px] font-bold text-[#1A1A1A] flex items-center gap-2 mb-4">
                <Banknote className="w-4 h-4 text-slate-400" /> Payment Milestones
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-4 rounded-xl relative">
                  <div className="absolute -top-2 right-4 bg-[#047857] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest shadow-sm">
                    Completed
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 mb-1">20% DEPOSIT</p>
                  <p className="text-[14px] font-bold text-[#1A1A1A] mb-2">PKR 18,000</p>
                  <p className="text-[11px] text-slate-500">Paid via Bank Transfer</p>
                </div>

                <div className="bg-[#FAF9F6] border border-slate-200 p-4 rounded-xl">
                  <p className="text-[11px] font-bold text-slate-500 mb-1">50% POST-MEHNDI</p>
                  <p className="text-[14px] font-bold text-[#1A1A1A] mb-2">PKR 45,000</p>
                  <p className="text-[11px] text-slate-500">Due: Nov 14, 2024</p>
                </div>

                <div className="bg-[#FAF9F6] border border-slate-200 p-4 rounded-xl">
                  <p className="text-[11px] font-bold text-slate-500 mb-1">30% FINAL</p>
                  <p className="text-[14px] font-bold text-[#1A1A1A] mb-2">PKR 27,000</p>
                  <p className="text-[11px] text-slate-500">Due: Nov 16, 2024</p>
                </div>
              </div>
            </div>

            {/* Standard Legal Clauses */}
            <div className="mb-16">
              <h3 className="text-[13px] font-bold text-[#1A1A1A] flex items-center gap-2 mb-4">
                <Gavel className="w-4 h-4 text-slate-400" /> Standard Legal Clauses
              </h3>
              <div className="bg-[#FAF9F6] border border-slate-200 rounded-xl p-6 text-[12px] text-slate-600 leading-relaxed space-y-4">
                <div>
                  <p className="font-bold text-[#1A1A1A] mb-1">1. Cancellation Policy</p>
                  <p>Cancellations made more than 30 days prior to the event will result in a full refund of the deposit. Cancellations between 15-29 days will forfeit 50% of the deposit. Cancellations within 14 days are non-refundable.</p>
                </div>
                <div>
                  <p className="font-bold text-[#1A1A1A] mb-1">2. Force Majeure</p>
                  <p>Neither party shall be held liable for failure to perform their obligations under this contract if such failure is caused by an event beyond their reasonable control, including acts of God, war, or natural disasters.</p>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-6 mt-16 px-4">
              <div className="w-full sm:w-64 text-center">
                <div className="border-b border-slate-300 pb-2 mb-2 min-h-[40px] flex items-end justify-center">
                   <p className="text-[11px] italic text-slate-400">Awaiting Digital Signature</p>
                </div>
                <p className="text-[13px] font-bold text-[#1A1A1A]">Zubeda Ahmed</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized Signatory - Vendor</p>
              </div>

              <div className="w-full sm:w-64 text-center">
                <div className="border-b border-slate-300 pb-2 mb-2 min-h-[40px] flex items-end justify-center">
                   <p className="text-[11px] italic text-slate-400">Awaiting Digital Signature</p>
                </div>
                <p className="text-[13px] font-bold text-[#1A1A1A]">Zoya Malik</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Contract Principal - Client</p>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN (Action Sidebar)             */}
        {/* ========================================= */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          
          {/* Contract Actions */}
          <div className="bg-[#EAE4D9] bg-opacity-40 rounded-[24px] p-6 border border-[#E8E2D5]">
            <h3 className="text-[12px] font-bold text-[#0A3B2A] mb-5">Contract Actions</h3>
            
            <button className="w-full bg-[#0A3B2A] hover:bg-[#0A3B2A]-container text-white text-[13px] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mb-3 shadow-md shadow-[#0A3B2A]/10">
              <Edit3 className="w-4 h-4" /> Sign & Execute
            </button>
            
            <button className="w-full bg-white hover:bg-slate-50 text-[#1A1A1A] border border-slate-200 text-[13px] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors mb-4">
              <Download className="w-4 h-4" /> Download PDF
            </button>
            
            <button className="w-full text-center text-[12px] font-bold text-[#BE185D] hover:underline flex items-center justify-center gap-1.5 py-2">
              <MessageSquare className="w-3.5 h-3.5" /> Request Revision
            </button>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service Date</p>
                <p className="text-[13px] font-bold text-[#1A1A1A]">Nov 14-16, 2024</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#BE185D]-fixed text-[#BE185D] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                <p className="text-[13px] font-bold text-[#1A1A1A] leading-snug">Pearl Continental,<br/>Lahore</p>
              </div>
            </div>

            <div className="bg-[#FAF9F6] rounded-xl p-4 border border-slate-100">
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                "Secure your booking officially. Both parties receive a certified hash upon execution."
              </p>
            </div>
          </div>

          {/* Legal Support */}
          <div className="bg-[#EAE4D9] bg-opacity-40 rounded-[20px] p-5 border border-[#E8E2D5] flex items-center gap-4 cursor-pointer hover:bg-opacity-60 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
              <Headset className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-0.5">Legal Support</p>
              <p className="text-[11px] text-slate-500 font-medium">Talk to a mediator</p>
            </div>
          </div>

        </aside>

      </main>

      {/* 🌟 Footer */}
      <footer className="border-t border-slate-200 bg-[#FDFBF7] py-8 px-6 mt-auto">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-medium text-slate-500">
            <span className="font-bold text-[#1A1A1A] mr-2">Nexus</span>
            © 2024 Nexus Event Management. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px] font-medium text-slate-600">
            <Link href="#" className="hover:text-black">Privacy Policy</Link>
            <Link href="#" className="hover:text-black">Terms of Service</Link>
            <Link href="#" className="hover:text-black">Security</Link>
            <Link href="#" className="hover:text-black">Heritage Preservation Standards</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
