"use client"

import { 
  Search, Bell, HelpCircle, Settings, CreditCard, Sparkles, Cloud, BarChart3, 
  ArrowRight, Database, TrendingUp, Receipt
} from "lucide-react"

export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col min-h-full">
      
      {/* 🌟 Desktop Header (Title + Actions) */}
      <header className="hidden lg:flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-bold font-poppins text-[#0A3B2A]">Subscriptions</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Invoices..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#EAE4D9] bg-opacity-40 border border-[#E8E2D5] rounded-full text-[13px] font-medium focus:outline-none focus:border-[#0A3B2A] transition-colors"
            />
          </div>
          <button className="text-slate-600 hover:text-black transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><Settings className="w-5 h-5" /></button>
        </div>
      </header>

      {/* 🌟 Hero Card (Nexus Premium) */}
      <div className="bg-[#0A3B2A] rounded-[32px] p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 shadow-xl mb-10">
        
        {/* Subtle Crosshair Background Pattern */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#A7F3D0" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#A7F3D0" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#A7F3D0" strokeWidth="0.5" strokeDasharray="1 3" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#A7F3D0" strokeWidth="0.5" strokeDasharray="4 2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#A7F3D0" strokeWidth="0.5" strokeDasharray="4 2" />
        </svg>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 bg-[#BE185D] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3 h-3" /> ACTIVE PLAN
          </div>
          <h2 className="text-5xl lg:text-6xl font-black font-poppins text-white leading-[1.1] tracking-tight mb-4">
            Nexus <br/>Premium
          </h2>
          <p className="text-[#0A3B2A]-fixed text-[15px] leading-relaxed font-medium mb-10 max-w-sm">
            Empowering your luxury event management with AI-driven insights.
          </p>

          <div className="flex items-center gap-8">
            <div>
              <p className="text-[10px] text-[#86EFAC] font-bold uppercase tracking-widest mb-1.5">ANNUAL RENEWAL</p>
              <p className="text-xl font-bold font-poppins text-white">November 24, 2024</p>
            </div>
            <div className="w-px h-10 bg-[#0A3B2A]-container"></div>
            <div>
              <p className="text-[10px] text-[#86EFAC] font-bold uppercase tracking-widest mb-1.5">BILLING CYCLE</p>
              <p className="text-xl font-bold font-poppins text-white">PKR 45,000 / Year</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full lg:w-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[24px] p-6 w-full lg:w-[340px]">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[13px] font-bold text-white">Payment Method</p>
              <CreditCard className="w-5 h-5 text-[#FDE047]" />
            </div>
            <p className="text-2xl text-white font-mono tracking-[0.2em] mb-8 flex items-center gap-3">
              <span>••••</span> <span>••••</span> <span>••••</span> <span className="font-bold">8824</span>
            </p>
            <button className="w-full bg-white text-[#0A3B2A] hover:bg-slate-50 text-[14px] font-bold py-3.5 rounded-xl transition-colors shadow-sm">
              Manage Billing
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 Feature Inventory */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold font-poppins text-[#1A1A1A]">Feature Inventory</h3>
            <p className="text-[13px] text-slate-500 font-medium">Your premium suite of tools and storage</p>
          </div>
          <button className="text-[13px] font-bold text-[#BE185D] hover:text-[#9D174D] hidden sm:block">View All Features</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
             <div className="w-12 h-12 bg-[#B45309] rounded-xl flex items-center justify-center text-white mb-6">
               <Sparkles className="w-6 h-6" />
             </div>
             <h4 className="text-[18px] font-bold font-poppins text-[#1A1A1A] mb-3">AI Bridal Atelier</h4>
             <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8">
               Generative design tool for visualizing bespoke festive attire and jewelry based on client moodboards.
             </p>
             <div className="mt-auto flex items-center justify-between">
               <span className="bg-[#0A3B2A]-fixed text-[#047857] text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">Unlimited Access</span>
               <ArrowRight className="w-5 h-5 text-[#BE185D]" />
             </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-md border-2 border-[#1A1A1A] flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF8F5] rounded-bl-[100px] -z-0"></div>
             <div className="w-12 h-12 bg-[#0A3B2A] rounded-xl flex items-center justify-center text-white mb-6 relative z-10">
               <Cloud className="w-6 h-6" />
             </div>
             <h4 className="text-[18px] font-bold font-poppins text-[#1A1A1A] mb-3 relative z-10">Unlimited Memory Vault</h4>
             <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8 relative z-10">
               High-fidelity cloud storage for event media. Store raw 4K footage and multi-terabyte wedding albums without limits.
             </p>
             <div className="mt-auto flex flex-col gap-4 relative z-10">
               <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden flex items-center relative">
                 <div className="bg-[#0A3B2A] h-full w-[20%] rounded-full absolute left-0 z-10"></div>
                 <span className="absolute right-0 text-[10px] font-bold text-[#1A1A1A] -top-5">1.2 TB Used</span>
               </div>
               <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                 <span className="text-[#BE185D] text-[11px] font-bold uppercase tracking-widest">Premium Benefit</span>
                 <Database className="w-5 h-5 text-[#BE185D]" />
               </div>
             </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
             <div className="w-12 h-12 bg-[#EAB308] rounded-xl flex items-center justify-center text-white mb-6">
               <BarChart3 className="w-6 h-6" />
             </div>
             <h4 className="text-[18px] font-bold font-poppins text-[#1A1A1A] mb-3">B2B Analytics</h4>
             <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8 line-clamp-3">
               Real-time market trends, seasonal demand forecasting, and competitor benchmarking for top-tier vendors.
             </p>
             <div className="mt-auto flex items-center justify-between">
               <span className="text-slate-600 text-[12px] font-bold">Active</span>
               <TrendingUp className="w-5 h-5 text-[#BE185D]" />
             </div>
             <button className="absolute bottom-6 right-6 bg-[#25D366] hover:bg-[#20BD5A] text-white text-[13px] font-bold py-2.5 px-4 rounded-full shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 flex items-center gap-2">
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" /> Inquire Now
             </button>
          </div>

        </div>
      </div>

      {/* 🌟 Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Service Utilization */}
        <div className="lg:col-span-2">
          <h3 className="text-[18px] font-bold font-poppins text-[#1A1A1A] mb-4">Service Utilization</h3>
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-100 h-[320px] flex flex-col">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#FAF8F5] rounded-xl p-4 text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Generations</p>
                <p className="text-2xl font-black font-poppins text-[#0A3B2A]">842</p>
                <p className="text-[9px] font-medium text-slate-400 mt-1">This month</p>
              </div>
              <div className="bg-[#FAF8F5] rounded-xl p-4 text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Active Leads</p>
                <p className="text-2xl font-black font-poppins text-[#BE185D]">156</p>
                <p className="text-[9px] font-medium text-slate-400 mt-1">Real-time sync</p>
              </div>
              <div className="bg-[#FAF8F5] rounded-xl p-4 text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">API Requests</p>
                <p className="text-2xl font-black font-poppins text-[#B45309]">2.4k</p>
                <p className="text-[9px] font-medium text-slate-400 mt-1">Quota: Unlimited</p>
              </div>
            </div>
            
            <div className="flex-1 border-t border-slate-100 pt-6 flex flex-col justify-end relative">
               <div className="flex justify-between items-center mb-6">
                 <p className="text-[13px] font-bold text-[#1A1A1A]">Monthly Growth</p>
                 <span className="text-[13px] font-bold text-[#047857]">↑ 12.5%</span>
               </div>
               <div className="flex items-end justify-between h-24 gap-2 px-2">
                 {[40, 50, 45, 60, 55, 70, 95].map((h, i) => (
                   <div 
                     key={i} 
                     className={`w-full rounded-t-sm ${i === 6 ? 'bg-[#0A3B2A]' : 'bg-[#0A3B2A]-fixed'}`} 
                     style={{ height: `${h}%` }}
                   ></div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div>
          <h3 className="text-[18px] font-bold font-poppins text-[#1A1A1A] mb-4">Recent Invoices</h3>
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 h-[320px] overflow-y-auto">
            
            {[
              { id: 'INV-2024-001', date: 'Nov 01, 2024', amount: '45,000' },
              { id: 'INV-2023-012', date: 'Nov 01, 2023', amount: '45,000' },
              { id: 'INV-2022-012', date: 'Nov 01, 2022', amount: '42,000' }
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F0E6] flex items-center justify-center text-[#0A3B2A] shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#1A1A1A] mb-0.5">{inv.id}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{inv.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-[#1A1A1A] mb-1">PKR {inv.amount}</p>
                  <span className="text-[9px] font-bold text-[#047857] uppercase tracking-widest">PAID</span>
                </div>
              </div>
            ))}

            <button className="w-full text-center mt-4 pt-4 border-t border-slate-100 text-[12px] font-bold text-[#1A1A1A] hover:text-[#BE185D] transition-colors">
              View Full History
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
