"use client"

import { useState } from "react"
import { 
  Plus, Search, Bell, BarChart2, Handshake, Archive, Users, Settings, 
  HelpCircle, Scale, Download, FilePlus, ChevronDown, AlertTriangle, 
  Menu, X, Utensils, Box, Monitor, Filter, ArrowDownWideNarrow, MessageCircle
} from "lucide-react"
import Link from "next/link"

export function AnalyticsDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-inter overflow-hidden relative">
      
      {/* 🌟 Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🌟 Left Sidebar (Enterprise Tier) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#F4F0E6] border-r border-[#E8E3D5] flex flex-col shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0A3B2A] rounded flex items-center justify-center shrink-0">
                <Box className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-black font-poppins text-[#0A3B2A] leading-tight">Nexus<br/>Management</h1>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Enterprise Tier</p>
              </div>
            </div>
            <button 
              className="lg:hidden text-slate-500 hover:text-black"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button className="w-full bg-[#0A3B2A] hover:bg-[#0A3B2A]-container text-white text-[13px] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#0A3B2A]/20">
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>

        <nav className="px-4 space-y-1 mb-8 flex-1">
          <Link href="/dashboard/host/v2/analytics" className="flex items-center gap-4 px-4 py-3.5 bg-[#0A3B2A]-container text-white shadow-md rounded-xl">
            <BarChart2 className="w-5 h-5" />
            <span className="text-[13px] font-bold tracking-wide">ANALYTICS</span>
          </Link>
          <Link href="/dashboard/host/v2/vendor-hub" className="flex items-center gap-4 px-4 py-3.5 text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
            <Handshake className="w-5 h-5" />
            <span className="text-[13px] font-bold tracking-wide">NEGOTIATIONS</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3.5 text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
            <Archive className="w-5 h-5" />
            <span className="text-[13px] font-bold tracking-wide">ARCHIVING</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3.5 text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
            <Users className="w-5 h-5" />
            <span className="text-[13px] font-bold tracking-wide">TEAM</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3.5 text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-[13px] font-bold tracking-wide">SETTINGS</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#E8E3D5] space-y-1">
          <Link href="#" className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-black hover:bg-slate-200/50 rounded-xl transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wide">SUPPORT</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-black hover:bg-slate-200/50 rounded-xl transition-colors">
            <Scale className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wide">LEGAL</span>
          </Link>
        </div>
      </aside>

      {/* 🌟 Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        
        {/* Top Global Header */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4 lg:gap-8 h-full">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:text-black"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-lg font-black font-poppins text-[#1A1A1A] hidden sm:block">
              Nexus
            </div>
            <nav className="hidden md:flex items-center gap-6 h-full">
              <Link href="/dashboard/host/v2" className="text-sm font-bold text-[#0A3B2A] border-b-[3px] border-[#0A3B2A] h-full flex items-center pt-1">Dashboard</Link>
              <Link href="/dashboard/host/v2/vendor-hub" className="text-sm font-medium text-slate-500 hover:text-[#1A1A1A] h-full flex items-center">Vendors</Link>
              <Link href="/dashboard/host/v2/contracts" className="text-sm font-medium text-slate-500 hover:text-[#1A1A1A] h-full flex items-center">Contracts</Link>
              <Link href="#" className="text-sm font-medium text-slate-500 hover:text-[#1A1A1A] h-full flex items-center">Heritage</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search finances..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border-none rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A3B2A]/20"
              />
            </div>
            <button className="relative text-slate-400 hover:text-[#1A1A1A] p-2">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#BE185D] rounded-full border border-white"></div>
            </button>
            <div className="flex items-center gap-3 pl-2 lg:pl-6 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight">Zain Malik</p>
                <p className="text-[11px] font-medium text-slate-500">Project Lead</p>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-8">
          
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[18px] font-bold font-poppins text-[#0A3B2A] mb-1">Event Budget Tracker</h2>
              <p className="text-[14px] text-slate-500 font-medium">Corporate Gala - Grand Hyatt Regency 2024</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white border border-slate-200 hover:bg-slate-50 text-[#1A1A1A] text-[13px] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
                <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export PDF</span>
              </button>
              <button className="bg-[#BE185D] hover:bg-[#BE185D]/90 text-white text-[13px] font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#BE185D]/20">
                <FilePlus className="w-4 h-4" /> Add Expense
              </button>
            </div>
          </div>

          {/* 4 KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">
            
            {/* Total Budget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0A3B2A]"></div>
              <div>
                <p className="text-[13px] font-medium text-slate-500 mb-2">Total Budget</p>
                <p className="text-2xl font-bold font-poppins text-[#0A3B2A]">PKR 4.0M</p>
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                <BarChart2 className="w-3.5 h-3.5 text-[#0A3B2A]" />
                <span className="text-[11px] font-bold text-[#0A3B2A] tracking-wide">+12% from original</span>
              </div>
            </div>

            {/* Total Paid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#BE185D]"></div>
              <div>
                <p className="text-[13px] font-medium text-slate-500 mb-2">Total Paid</p>
                <p className="text-2xl font-bold font-poppins text-[#BE185D]">PKR 2.4M</p>
              </div>
              <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-[#BE185D] h-1.5 rounded-full w-[60%]"></div>
              </div>
            </div>

            {/* Committed Funds */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#92400E]"></div>
              <div>
                <p className="text-[13px] font-medium text-slate-500 mb-2">Committed Funds</p>
                <p className="text-2xl font-bold font-poppins text-[#92400E]">PKR 1.0M</p>
              </div>
              <div className="mt-4">
                <span className="text-[11px] font-medium text-slate-500">4 Active Contracts Pending</span>
              </div>
            </div>

            {/* Remaining Balance */}
            <div className="bg-[#0A3B2A] rounded-2xl p-6 shadow-md border border-[#155E45] relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <p className="text-[13px] font-medium text-[#0A3B2A]-fixed mb-2">Remaining Balance</p>
                <p className="text-2xl font-bold font-poppins text-white">PKR 0.6M</p>
              </div>
              <div className="mt-4">
                <button className="text-[11px] font-bold text-white underline decoration-[#A7F3D0] underline-offset-4 hover:text-[#0A3B2A]-fixed transition-colors tracking-wide">
                  Allocate Funds
                </button>
              </div>
            </div>

          </div>

          {/* Middle Row (Charts & Logs) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
            
            {/* Budget Allocation Chart (Spans 2 columns on Desktop) */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 lg:col-span-2 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h3 className="text-[16px] font-bold font-poppins text-[#0A3B2A]">Budget Allocation</h3>
                <button className="bg-[#FAF8F5] border border-slate-200 text-[#1A1A1A] text-[12px] font-bold py-2 px-4 rounded-lg flex items-center justify-between sm:justify-center gap-2 hover:bg-slate-50 transition-colors">
                  Overall Allocation <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 flex-1">
                
                {/* Custom SVG Donut Chart */}
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Background track */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F4F0E6" strokeWidth="12" />
                    {/* Spent (Dark Green) - 60% */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#0A3B2A" strokeWidth="12" strokeDasharray="150.8 251.2" strokeLinecap="round" />
                    {/* Committed (Brown) - 25% (starts after Spent) */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#92400E" strokeWidth="12" strokeDasharray="62.8 251.2" strokeDashoffset="-150.8" strokeLinecap="round" />
                    {/* Free (Magenta) - 15% (starts after Committed) */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#BE185D" strokeWidth="12" strokeDasharray="37.6 251.2" strokeDashoffset="-213.6" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold font-poppins text-[#1A1A1A]">60%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Spent</span>
                  </div>
                </div>

                {/* Legend & Notes */}
                <div className="flex flex-col gap-6 w-full md:w-auto flex-1 max-w-sm">
                  
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1">Spent (60%)</p>
                        <div className="w-20 h-1.5 bg-[#0A3B2A] rounded-full"></div>
                      </div>
                      <span className="text-[14px] font-bold text-[#0A3B2A]">2.4M</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1">Committed (25%)</p>
                        <div className="w-20 h-1.5 bg-[#92400E] rounded-full"></div>
                      </div>
                      <span className="text-[14px] font-bold text-[#92400E]">1.0M</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-1">Free (15%)</p>
                        <div className="w-20 h-1.5 bg-[#BE185D] rounded-full"></div>
                      </div>
                      <span className="text-[14px] font-bold text-[#BE185D]">0.6M</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] border border-[#E8E3D5] rounded-xl p-4 flex gap-3 mt-2">
                    <AlertTriangle className="w-5 h-5 text-[#92400E] shrink-0" />
                    <p className="text-[12px] text-slate-600 font-medium leading-relaxed">
                      Venue costs have increased by 5% since booking.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Transaction Log (Spans 1 column) */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 lg:col-span-1 flex flex-col min-h-[400px]">
              <h3 className="text-[16px] font-bold font-poppins text-[#0A3B2A] mb-8">Transaction Log</h3>
              
              <div className="flex-1 flex flex-col gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4F0E6] flex items-center justify-center shrink-0 text-[#0A3B2A]">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[14px] font-bold text-[#1A1A1A] truncate">Serena Catering</p>
                      <p className="text-[14px] font-bold text-[#1A1A1A] shrink-0">- PKR 450k</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">22 Oct 2024 • Partial Payment</p>
                    <span className="bg-[#BE185D] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Credit</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4F0E6] flex items-center justify-center shrink-0 text-[#0A3B2A]">
                    <Box className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[14px] font-bold text-[#1A1A1A] truncate">Royal Decorators</p>
                      <p className="text-[14px] font-bold text-[#1A1A1A] shrink-0">- PKR 200k</p>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">20 Oct 2024 • Final Installment</p>
                    <span className="bg-[#0A3B2A] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Paid</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 opacity-50">
                  <div className="w-10 h-10 rounded-full bg-[#F4F0E6] flex items-center justify-center shrink-0 text-[#0A3B2A]">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[14px] font-bold text-[#1A1A1A] truncate">Studio</p>
                      <p className="text-[14px] font-bold text-[#1A1A1A] shrink-0">- PKR 150k</p>
                    </div>
                  </div>
                </div>

              </div>

              <button className="w-full mt-6 text-center text-[11px] font-bold text-[#0A3B2A] hover:text-black uppercase tracking-widest py-3">
                View All History
              </button>
            </div>

          </div>

          {/* Bottom Row: Vendor Management Header */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold font-poppins text-[#0A3B2A]">Vendor Management</h3>
              <div className="flex items-center gap-4">
                <button className="text-slate-500 hover:text-black transition-colors p-1">
                  <Filter className="w-5 h-5" />
                </button>
                <button className="text-slate-500 hover:text-black transition-colors p-1">
                  <ArrowDownWideNarrow className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* Table content would go here, leaving space as per screenshot */}
            <div className="h-10"></div>
          </div>

        </div>

        {/* 🌟 Footer */}
        <footer className="border-t border-slate-200 bg-[#FAF8F5] py-8 px-6 mt-auto">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-[13px] font-medium text-slate-500 text-center lg:text-left">
              <span className="font-bold text-[#1A1A1A] mr-2">Nexus</span>
              © 2024 Nexus Event Management. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-[13px] font-medium text-slate-600">
              <Link href="#" className="hover:text-black">Privacy Policy</Link>
              <Link href="#" className="hover:text-black">Terms of Service</Link>
              <Link href="#" className="hover:text-black">Security</Link>
              <Link href="#" className="hover:text-black">Heritage Preservation Standards</Link>
            </div>
          </div>
        </footer>

        {/* 🌟 Floating WhatsApp Action Button */}
        <button className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 hover:bg-[#20BD5A] transition-all z-50">
          <MessageCircle className="w-7 h-7" />
        </button>

      </main>

    </div>
  )
}
