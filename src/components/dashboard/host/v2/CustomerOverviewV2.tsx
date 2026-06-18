"use client"

import { 
  Plus, Users, Wallet, Store, MoreHorizontal, MessageCircle, 
  Share2, ListFilter, Calendar, Archive, User, ArrowUpRight, 
  ArrowRight, ExternalLink
} from "lucide-react"

export function CustomerOverviewV2() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[480px] lg:max-w-none mx-auto pb-6">
      
      {/* 🌟 Greeting Section */}
      <div className="pt-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-3 lg:space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold font-poppins text-[#1A1A1A] leading-tight">
            Assalam-o-Alaikum, Zoya
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-md">
            Your celebration ecosystem is humming. Here's your pulse for today.
          </p>
          
          {/* Mobile CTA */}
          <div className="pt-2 lg:hidden">
            <button className="bg-[#0D2E20] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 hover:bg-[#154130] transition-colors">
              <Plus className="w-4 h-4" /> Create New Event
            </button>
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="px-6 py-3 rounded-2xl border-2 border-slate-200 text-[#1A1A1A] font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm bg-white">
            Quick Action
          </button>
          <button className="px-6 py-3.5 rounded-2xl bg-[#BE185D] text-white font-bold text-sm hover:bg-[#BE185D]/90 transition-colors shadow-md">
            Upgrade to Premium
          </button>
        </div>
      </div>

      {/* 🌟 Main Dashboard Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 mt-4 lg:mt-8">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN (Progress + Invitations)                     */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Progress Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden flex flex-col items-center text-center h-fit">
            <div className="absolute top-4 right-4 bg-[#FDE68A] text-[#92400E] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Premium Event
            </div>

            <h2 className="text-xl lg:text-2xl font-bold font-poppins text-[#1A1A1A] mb-8 mt-2 w-full text-left lg:text-center">Malik-Khan Wedding</h2>
            
            {/* Circular Progress */}
            <div className="relative w-36 h-36 lg:w-40 lg:h-40 mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#0D2E20" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="87.9" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] font-poppins">65%</span>
                <span className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Complete</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 relative z-10">
              <div className="bg-[#FDF8F0] border border-[#F5EFE5] rounded-2xl px-6 py-4 w-full flex items-center justify-between text-left">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Countdown</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">14 Days to Go</p>
                </div>
                <Calendar className="w-5 h-5 text-[#92400E]" />
              </div>
              <div className="bg-[#FFF0F5] border border-[#FDE2EC] rounded-2xl px-6 py-4 w-full border-l-[4px] border-l-[#BE185D] text-left">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Next Milestone</p>
                <p className="text-sm font-bold text-[#1A1A1A]">Mehndi Decor Finalization</p>
              </div>
            </div>
          </div>

          {/* Digital Invitation */}
          <div className="bg-[#0D2E20] rounded-[32px] p-6 lg:p-8 text-white relative overflow-hidden shadow-xl h-fit">
            <div className="absolute top-6 right-6 opacity-20">
              <Share2 className="w-6 h-6" />
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 rotate-12">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl lg:text-2xl font-bold font-poppins mb-6">Invitation Hub</h3>
              
              <div className="bg-[#133A29] border border-[#1C4D38] rounded-2xl p-5 mb-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1A4B36] rounded-xl flex items-center justify-center flex-shrink-0">
                   <div className="w-6 h-6 bg-white/20 rounded-md" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Royal Mughal Suite</h4>
                  <p className="text-[10px] text-white/50">Premium Digital Invite Active</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <button className="flex-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-3 rounded-xl text-[12px] transition-colors">
                  Track RSVPs
                </button>
                <button className="flex-[1.5] bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-xl text-[12px] flex items-center justify-center gap-2 transition-colors">
                   WhatsApp
                </button>
              </div>

              <div className="pt-4 border-t border-[#1C4D38] flex justify-between items-center">
                <span className="text-xs text-white/70">Pending Responses</span>
                <span className="text-sm font-bold text-white">42 Guests</span>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (KPIs + Tasks + Quotations)                 */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top Row: KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Guests */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
              <div className="absolute top-6 right-6 lg:group-hover:translate-x-1 lg:transition-transform">
                <ArrowRight className="w-5 h-5 text-slate-300" />
              </div>
              <div className="w-12 h-12 bg-[#0A3B2A]-fixed rounded-2xl flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-[#047857]" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Guests</p>
              <p className="text-3xl font-bold font-poppins text-[#1A1A1A] mb-1">
                285 <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Confirmed</span>
              </p>
            </div>

            {/* Budget */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
               <div className="absolute top-6 right-6 lg:group-hover:translate-x-1 lg:transition-transform">
                <ArrowRight className="w-5 h-5 text-slate-300" />
              </div>
              <div className="w-12 h-12 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mb-5">
                <Wallet className="w-6 h-6 text-[#B45309]" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget Spent</p>
              <p className="text-3xl font-bold font-poppins text-[#B45309] mb-1">
                PKR 2.4M
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-2">of 4M</p>
            </div>

            {/* Vendors */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
               <div className="absolute top-6 right-6 lg:group-hover:translate-x-1 lg:transition-transform">
                <ArrowRight className="w-5 h-5 text-slate-300" />
              </div>
              <div className="w-12 h-12 bg-[#BE185D]-fixed rounded-2xl flex items-center justify-center mb-5">
                <Store className="w-6 h-6 text-[#BE185D]" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Vendors</p>
              <p className="text-3xl font-bold font-poppins text-[#BE185D] mb-1">
                8 <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider text-[#1E293B]">Booked</span>
              </p>
            </div>

          </div>

          {/* Bottom Row: Tasks & Quotations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            
            {/* Immediate Tasks */}
            <div className="bg-white rounded-[32px] p-6 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] h-full flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A] leading-tight w-[60%]">Immediate Tasks</h3>
                <button className="text-[11px] font-bold text-[#0A3B2A] flex items-center gap-1 hover:underline">
                  View Calendar <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-6 flex-1">
                {[
                  { title: "Confirm Floral Samples", deadline: "Due tomorrow", badge: "URGENT", badgeBg: "bg-[#BE185D]-fixed", badgeText: "text-[#BE185D]" },
                  { title: "Send E-Invites to Overseas", deadline: "Due in 3 days", badge: "HIGH", badgeBg: "bg-[#0A3B2A]-fixed", badgeText: "text-[#047857]" },
                  { title: "Review Valet Logistics", deadline: "Due next week", badge: "MEDIUM", badgeBg: "bg-[#F1F5F9]", badgeText: "text-[#64748B]" },
                ].map((task, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-8 rounded-md border-2 border-slate-300 flex-shrink-0 mt-1 cursor-pointer hover:border-[#0A3B2A] transition-colors" />
                    <div className="flex-1 min-w-0 flex items-start justify-between gap-2 pt-0.5">
                      <div>
                        <p className="text-[15px] font-bold text-[#1A1A1A] leading-tight mb-1 pr-2">{task.title}</p>
                        <p className="text-[11px] font-medium text-slate-400">{task.deadline}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full flex-shrink-0 mt-1 ${task.badgeBg}`}>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${task.badgeText}`}>{task.badge}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Quotations */}
            <div className="bg-white rounded-[32px] p-6 lg:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] h-full flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A] leading-tight w-[60%]">Active Quotations</h3>
                <div className="bg-[#BE185D]-fixed text-[#BE185D] text-[10px] font-bold px-3 py-1.5 rounded-full flex flex-col items-center leading-none">
                  <span>2</span><span>New</span>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {[
                  { name: "Zubeda Mehndi Arts", sub: "Bridal Package + 15 Guests", price: "PKR 85k", img: "https://images.unsplash.com/photo-1596450514735-111a2fe02935?q=80&w=100" },
                  { name: "Indus Flavors", sub: "Menu Selection Rev. 2", price: "PKR 1.2M", img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=100" },
                ].map((quote, i) => (
                  <div key={i} className="border border-slate-200 rounded-3xl p-4 flex flex-col gap-4 relative hover:border-[#0A3B2A]/30 transition-colors">
                    
                    <div className="flex items-start gap-4">
                      <img src={quote.img} className="w-12 h-12 rounded-full object-cover shadow-sm" alt="vendor" />
                      <div className="flex-1 min-w-0 pr-16">
                        <h4 className="text-[14px] font-bold text-[#1A1A1A] leading-tight mb-1">{quote.name}</h4>
                        <p className="text-[11px] font-medium text-[#BE185D] leading-tight">{quote.sub}</p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 text-right">
                      <span className="text-[10px] font-bold text-[#0A3B2A] block leading-none">PKR</span>
                      <span className="text-[14px] font-bold text-[#0A3B2A] leading-tight">{quote.price}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <button className="flex-1 bg-[#0A3B2A] text-white text-[11px] font-bold py-2 rounded-full hover:bg-[#154130] transition-colors">Accept</button>
                      <button className="flex-1 border border-slate-300 text-[#1A1A1A] text-[11px] font-bold py-2 rounded-full hover:bg-slate-50 transition-colors">Negotiate</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 🌟 Floating WhatsApp Button (Global) */}
      <div className="fixed bottom-24 lg:bottom-10 right-5 lg:right-10 z-50">
        <button className="w-14 h-14 bg-[#10B981] text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform">
          <MessageCircle className="w-6 h-6 fill-white" />
        </button>
      </div>

      {/* 🌟 Fixed Bottom Navigation (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-center justify-around px-4 z-50 rounded-t-[32px] shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        
        <div className="bg-[#0D2E20] text-white flex flex-col items-center justify-center w-16 h-14 rounded-2xl shadow-md">
          <div className="w-5 h-5 border-[2px] border-white rounded-sm grid grid-cols-2 gap-0.5 p-[2px] mb-0.5">
            <div className="bg-white rounded-sm" /><div className="bg-white rounded-sm" />
            <div className="bg-white rounded-sm" /><div className="bg-white rounded-sm" />
          </div>
          <span className="text-[9px] font-bold">Home</span>
        </div>

        <button className="flex flex-col items-center justify-center w-16 h-14 text-slate-400 hover:text-[#0D2E20] transition-colors">
          <Calendar className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Planning</span>
        </button>

        <button className="flex flex-col items-center justify-center w-16 h-14 text-slate-400 hover:text-[#0D2E20] transition-colors">
          <Archive className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Vault</span>
        </button>

        <button className="flex flex-col items-center justify-center w-16 h-14 text-slate-400 hover:text-[#0D2E20] transition-colors">
          <User className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>

      </div>

    </div>
  )
}
