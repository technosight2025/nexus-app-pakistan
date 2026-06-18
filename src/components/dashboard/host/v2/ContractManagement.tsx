"use client"

import { 
  Search, LayoutGrid, FileText, Store, User, LogOut, 
  ShieldCheck, Clock, Box, Download, Eye, ArrowRight
} from "lucide-react"
import Link from "next/link"

export function ContractManagement() {
  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6 text-slate-800 pb-28 md:pb-24 relative text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left mb-6">
        <div>
          <h1 className="text-3xl font-black text-[#0A3B2A] tracking-tight font-heading">Contract Management</h1>
          <p className="text-slate-500 font-medium mt-1">Review, sign, and archive active agreements with your hired professionals.</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by vendor or ID..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20 shadow-sm"
          />
        </div>
      </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-slate-200 mb-8 px-2">
          <button className="text-[13px] font-bold text-[#1A1A1A] pb-4 border-b-2 border-[#1A1A1A] tracking-wide">
            ALL
          </button>
          <button className="text-[13px] font-bold text-slate-500 pb-4 hover:text-black transition-colors tracking-wide">
            SIGNED
          </button>
          <button className="text-[13px] font-bold text-slate-500 pb-4 hover:text-black transition-colors tracking-wide">
            PENDING
          </button>
          <button className="text-[13px] font-bold text-slate-500 pb-4 hover:text-black transition-colors tracking-wide">
            ARCHIVED
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[24px] p-2 shadow-sm border border-slate-100 flex-1 overflow-y-auto">
          <div className="min-w-[900px]">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#FDFBF7] rounded-xl mb-2">
              <div className="col-span-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vendor</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contract ID</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Event Date</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value (PKR)</div>
              <div className="col-span-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</div>
              <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</div>
            </div>

            {/* Row 1: Action Required */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-slate-50 items-center hover:bg-slate-50 transition-colors rounded-xl">
              <div className="col-span-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A3B2A]-container text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-bold text-[#0A3B2A] leading-snug">Zubeda Mehndi Arts</span>
              </div>
              <div className="col-span-2 text-[13px] text-slate-600 font-medium">NEX-2024-089</div>
              <div className="col-span-2 text-[13px] text-slate-600 font-medium leading-snug">14 Oct<br/>2024</div>
              <div className="col-span-2 text-[14px] font-bold text-[#1A1A1A]">Rs. 185,000</div>
              <div className="col-span-1 flex justify-center">
                <div className="flex flex-col gap-0.5">
                  <span className="bg-[#BE185D]-fixed text-[#BE185D] text-[9px] font-black uppercase px-3 py-1 rounded-full text-center">Action</span>
                  <span className="bg-[#BE185D]-fixed text-[#BE185D] text-[9px] font-black uppercase px-3 py-1 rounded-full text-center">Required</span>
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <Link 
                  href="/dashboard/host/v2/contracts/agreement"
                  className="bg-[#0A3B2A] hover:bg-[#0A3B2A]-container text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg shadow-sm transition-colors"
                >
                  Review & Sign
                </Link>
              </div>
            </div>

            {/* Row 2: Fully Executed */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-slate-50 items-center hover:bg-slate-50 transition-colors rounded-xl">
              <div className="col-span-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EAE4D9] bg-opacity-50 text-[#0A3B2A] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-bold text-[#0A3B2A] leading-snug">The Royal Palms</span>
              </div>
              <div className="col-span-2 text-[13px] text-slate-600 font-medium">NEX-2024-042</div>
              <div className="col-span-2 text-[13px] text-slate-600 font-medium leading-snug">28 Nov<br/>2024</div>
              <div className="col-span-2 text-[14px] font-bold text-[#1A1A1A]">Rs. 1,450,000</div>
              <div className="col-span-1 flex justify-center">
                <div className="flex flex-col gap-0.5">
                  <span className="bg-[#EAE4D9] text-[#0A3B2A] text-[9px] font-black uppercase px-3 py-1 rounded-full text-center">Fully</span>
                  <span className="bg-[#EAE4D9] text-[#0A3B2A] text-[9px] font-black uppercase px-3 py-1 rounded-full text-center">Executed</span>
                </div>
              </div>
              <div className="col-span-2 flex justify-end pr-4">
                <button className="text-[#0A3B2A] hover:bg-[#EAE4D9] p-2 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Row 3: Pending Vendor */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-slate-50 items-center hover:bg-slate-50 transition-colors rounded-xl">
              <div className="col-span-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-slate-200 text-[#0A3B2A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-bold text-[#0A3B2A] leading-snug">Shahi Caterers</span>
              </div>
              <div className="col-span-2 text-[13px] text-slate-600 font-medium">NEX-2024-103</div>
              <div className="col-span-2 text-[13px] text-slate-600 font-medium leading-snug">02 Dec<br/>2024</div>
              <div className="col-span-2 text-[14px] font-bold text-[#1A1A1A]">Rs. 560,000</div>
              <div className="col-span-1 flex justify-center">
                <div className="flex flex-col gap-0.5">
                  <span className="bg-[#FEF3C7] text-[#92400E] text-[9px] font-black uppercase px-3 py-1 rounded-full text-center">Pending</span>
                  <span className="bg-[#FEF3C7] text-[#92400E] text-[9px] font-black uppercase px-3 py-1 rounded-full text-center">Vendor</span>
                </div>
              </div>
              <div className="col-span-2 flex justify-end">
                <button className="bg-white border border-[#1A1A1A] hover:bg-slate-50 text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors">
                  Send Reminder
                </button>
              </div>
            </div>

            {/* Row 4: Archived */}
            <div className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-slate-50 transition-colors rounded-xl opacity-70">
              <div className="col-span-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                  <Box className="w-5 h-5" />
                </div>
                <span className="text-[14px] font-bold text-slate-500 leading-snug">Marquee Luxe</span>
              </div>
              <div className="col-span-2 text-[13px] text-slate-500 font-medium">NEX-2023-991</div>
              <div className="col-span-2 text-[13px] text-slate-500 font-medium leading-snug">10 Jan<br/>2024</div>
              <div className="col-span-2 text-[14px] font-bold text-slate-500">Rs. 2,100,000</div>
              <div className="col-span-1 flex justify-center">
                <span className="bg-slate-200 text-slate-500 text-[9px] font-black uppercase px-3 py-1 rounded-full">Archived</span>
              </div>
              <div className="col-span-2 flex justify-end pr-4">
                <button className="text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

    </div>
  )
}
