"use client"

import { 
  Search, Bell, HelpCircle, Settings, Download, Filter, Receipt, ArrowUpRight, MessageCircle 
} from "lucide-react"

export default function BillingHistoryPage() {
  const invoices = [
    { id: '#INV-88210', date: 'Sept 12, 2024', category: 'Premium Listing', amount: '45,000', status: 'Paid', statusColor: 'bg-[#0A3B2A]-fixed text-[#047857]' },
    { id: '#INV-88195', date: 'Aug 28, 2024', category: 'Marketing Blast', amount: '12,500', status: 'Paid', statusColor: 'bg-[#0A3B2A]-fixed text-[#047857]' },
    { id: '#INV-87902', date: 'Aug 10, 2024', category: 'Venue Commission', amount: '187,500', status: 'Processing', statusColor: 'bg-[#FED7AA] text-[#C2410C]' },
    { id: '#INV-87550', date: 'July 22, 2024', category: 'Premium Listing', amount: '45,000', status: 'Paid', statusColor: 'bg-[#0A3B2A]-fixed text-[#047857]' },
  ]

  return (
    <div className="flex flex-col min-h-full">
      
      {/* 🌟 Desktop Header (Title + Actions) */}
      <header className="hidden lg:flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-bold font-poppins text-[#0A3B2A]">Billing History</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoices..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#EAE4D9] bg-opacity-40 border border-[#E8E2D5] rounded-full text-[13px] font-medium focus:outline-none focus:border-[#0A3B2A] transition-colors"
            />
          </div>
          <button className="text-slate-600 hover:text-black transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><Settings className="w-5 h-5" /></button>
        </div>
      </header>

      {/* 🌟 Top Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Annual Spend */}
        <div className="bg-[#0A3B2A] rounded-[24px] p-8 relative overflow-hidden shadow-md lg:col-span-2 flex flex-col justify-between">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <div className="w-64 h-64 border-[16px] border-white rounded-[40px]"></div>
          </div>
          <div className="absolute right-12 bottom-12 opacity-10 pointer-events-none">
            <div className="w-32 h-32 border-[16px] border-white rounded-[24px]"></div>
          </div>

          <div className="relative z-10 mb-8">
            <p className="text-[11px] text-[#0A3B2A]-fixed font-bold uppercase tracking-widest mb-1.5">ANNUAL SPEND OVERVIEW</p>
            <p className="text-[15px] font-bold text-white">Total Billed This Year</p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl text-[#0A3B2A]-fixed font-bold">PKR</span>
              <span className="text-5xl lg:text-6xl font-black font-poppins text-white tracking-tight leading-none">245,000</span>
            </div>
            <div className="bg-[#0A3B2A]-container border border-[#227A5B] text-[#0A3B2A]-fixed text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
              <ArrowUpRight className="w-3 h-3" /> +12.5% vs 2023
            </div>
          </div>
        </div>

        {/* Next Payment */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden">
           <div className="w-12 h-12 bg-[#BE185D]-fixed rounded-xl flex items-center justify-center text-[#BE185D] mb-6">
             <Receipt className="w-5 h-5" />
           </div>
           
           <div className="mb-8">
             <h3 className="text-[16px] font-bold font-poppins text-[#1A1A1A] mb-1">Next Payment</h3>
             <p className="text-[13px] text-slate-500 font-medium">Due on Oct 15, 2024</p>
           </div>

           <div>
             <p className="text-2xl font-bold font-poppins text-[#BE185D] mb-4">PKR 12,400</p>
             <button className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-widest hover:text-[#BE185D] transition-colors">
               Manage Subscriptions
             </button>
           </div>
        </div>

      </div>

      {/* 🌟 Invoice History Table */}
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 mb-8 flex-1 flex flex-col overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
          <div>
            <h3 className="text-[18px] font-bold font-poppins text-[#0A3B2A]">Invoice History</h3>
            <p className="text-[13px] text-slate-500 font-medium mt-1">Download and manage your past billing records.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#FAF8F5] border border-[#E8E3D5] text-[#1A1A1A] hover:bg-slate-100 text-[13px] font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="bg-[#0A3B2A] hover:bg-[#0A3B2A]-container text-white text-[13px] font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-colors shadow-md shadow-[#0A3B2A]/20">
              <Download className="w-4 h-4" /> Export All
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="py-4 px-6 lg:px-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-[#FAF8F5]">Invoice #</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-[#FAF8F5]">Date</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-[#FAF8F5]">Category</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-[#FAF8F5]">Amount</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-[#FAF8F5]">Status</th>
                <th className="py-4 px-6 lg:px-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-[#FAF8F5] text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 lg:px-8 text-[14px] font-bold text-[#1A1A1A]">{inv.id}</td>
                  <td className="py-5 px-6 text-[14px] text-slate-600 font-medium">{inv.date}</td>
                  <td className="py-5 px-6">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      inv.category.includes('Premium') ? 'bg-[#0A3B2A]-fixed text-[#047857]' : 
                      inv.category.includes('Marketing') ? 'bg-[#BE185D]-fixed text-[#BE185D]' : 
                      'bg-[#FEF3C7] text-[#B45309]'
                    }`}>
                      {inv.category}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-[14px] font-bold text-[#1A1A1A]">PKR {inv.amount}</td>
                  <td className="py-5 px-6">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1.5 w-fit ${inv.statusColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 lg:px-8 text-right">
                    <button className="text-slate-400 hover:text-[#0A3B2A] transition-colors p-2">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 lg:p-6 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[12px] font-medium text-slate-500">Showing 4 of 24 invoices</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">&lt;</button>
            <button className="w-8 h-8 rounded bg-[#0A3B2A] text-white font-bold flex items-center justify-center text-[12px]">1</button>
            <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-[#1A1A1A] hover:bg-slate-50 text-[12px] font-medium">2</button>
            <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-[#1A1A1A] hover:bg-slate-50">&gt;</button>
          </div>
        </div>
      </div>

      {/* 🌟 Support Footer */}
      <div className="bg-[#FAF8F5] rounded-[24px] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#E8E2D5] shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#BE185D]"></div>
        
        <div className="flex items-center gap-6 z-10 w-full md:w-auto">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#0A3B2A]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-[16px] font-bold font-poppins text-[#1A1A1A] mb-1">Need help with billing?</h4>
            <p className="text-[13px] text-slate-600 font-medium leading-relaxed max-w-lg">
              Our finance team is available Mon-Fri for reconciliation queries.
            </p>
          </div>
        </div>

        <button className="w-full md:w-auto bg-[#25D366] hover:bg-[#20BD5A] text-white text-[14px] font-bold py-3 px-6 rounded-xl shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 flex items-center justify-center gap-2 shrink-0 z-10">
          <MessageCircle className="w-5 h-5" /> Inquire via WhatsApp
        </button>
      </div>

    </div>
  )
}
