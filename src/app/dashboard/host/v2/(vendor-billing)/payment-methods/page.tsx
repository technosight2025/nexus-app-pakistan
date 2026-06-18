"use client"

import { 
  Search, Bell, HelpCircle, Settings, ShieldCheck, Wallet, CreditCard, 
  Building, Clock, Repeat, FileSpreadsheet, CheckCircle2
} from "lucide-react"

export default function PaymentMethodsPage() {
  return (
    <div className="flex flex-col min-h-full">
      
      {/* 🌟 Desktop Header */}
      <header className="hidden lg:flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-bold font-poppins text-[#0A3B2A]">Payment Methods</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#EAE4D9] bg-opacity-40 border border-[#E8E2D5] rounded-full text-[13px] font-medium focus:outline-none focus:border-[#0A3B2A] transition-colors"
            />
          </div>
          <button className="text-slate-600 hover:text-black transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><Settings className="w-5 h-5" /></button>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* 🌟 Security Banner */}
      <div className="bg-[#FAF8F5] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E8E2D5] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Subtle shield background graphic */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden md:block">
           <ShieldCheck className="w-48 h-48" />
        </div>

        <div className="max-w-2xl relative z-10">
          <h2 className="text-[16px] font-bold font-poppins text-[#0A3B2A] mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0A3B2A]" /> Industrial-Grade Encryption
          </h2>
          <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
            Your financial security is our highest priority. Nexus Festive uses 256-bit SSL encryption and PCI-DSS compliant vaulting to ensure your sensitive payment details never touch our local servers directly.
          </p>
        </div>
        
        <div className="relative z-10 shrink-0">
          <span className="bg-[#0A3B2A] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <ShieldCheck className="w-4 h-4" /> PCI-DSS COMPLIANT
          </span>
        </div>
      </div>

      {/* 🌟 Active Sources */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[16px] font-bold font-poppins text-[#1A1A1A]">Active Sources</h3>
            <p className="text-[13px] text-slate-500 font-medium">Primary and secondary methods for event bookings.</p>
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">2 ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Credit Card (Dark Green) */}
          <div className="bg-[#0A3B2A] rounded-[24px] p-6 lg:p-8 shadow-lg relative overflow-hidden text-white flex flex-col justify-between min-h-[200px]">
            {/* Embedded Logo Pattern */}
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <div className="w-40 h-40 border-[16px] border-white rounded-[30px] transform rotate-12"></div>
            </div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-[2px]">
                  <div className="w-4 h-1 bg-white rounded-full opacity-50"></div>
                  <div className="w-4 h-1 bg-white rounded-full opacity-75"></div>
                  <div className="w-4 h-1 bg-white rounded-full"></div>
                </div>
                <span className="text-[14px] font-black font-poppins italic tracking-wider">NEXUS FESTIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-[#BE185D] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest shadow-sm">PRIMARY</span>
                <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded flex items-center justify-center font-bold text-[12px] italic">
                  VISA
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-xl lg:text-2xl font-mono tracking-[0.2em] mb-4">
                <span className="opacity-70">**** **** ****</span> 4291
              </p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-[#0A3B2A]-fixed uppercase tracking-widest font-bold mb-0.5">CARD HOLDER</p>
                  <p className="text-[13px] font-bold tracking-wide">ZAID SULTAN</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#0A3B2A]-fixed uppercase tracking-widest font-bold mb-0.5">EXPIRES</p>
                  <p className="text-[13px] font-bold tracking-wide">12/26</p>
                </div>
              </div>
            </div>
          </div>

          {/* JazzCash Wallet (White) */}
          <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-200 flex flex-col justify-between min-h-[200px]">
            
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-[#FDE047]">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold font-poppins text-[#1A1A1A]">JazzCash Wallet</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Linked Mobile Account</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#B45309]" />
              </div>
            </div>

            <p className="text-lg font-mono tracking-widest text-[#1A1A1A] mb-6">
              0345 <span className="text-slate-300">••••</span> 882
            </p>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[13px] font-medium text-slate-600">Verified</span>
              <button className="text-[11px] font-bold text-[#BE185D] hover:text-[#9D174D] uppercase tracking-widest transition-colors">
                Manage Settings
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 🌟 Add New Method */}
      <div className="mb-10">
        <h3 className="text-[16px] font-bold font-poppins text-[#1A1A1A] mb-1">Add New Method</h3>
        <p className="text-[13px] text-slate-500 font-medium mb-6">Expand your payment flexibility for larger festive events.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <button className="bg-[#FAF8F5] hover:bg-white border-2 border-dashed border-[#E8E2D5] hover:border-[#0A3B2A] rounded-[24px] p-8 text-center flex flex-col items-center justify-center gap-4 transition-all group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0A3B2A] shadow-sm group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#1A1A1A] mb-1">Credit / Debit Card</p>
              <p className="text-[11px] text-slate-500 font-medium">Visa, Mastercard, PayPak, UnionPay</p>
            </div>
          </button>

          <button className="bg-[#FAF8F5] hover:bg-white border-2 border-dashed border-[#E8E2D5] hover:border-[#BE185D] rounded-[24px] p-8 text-center flex flex-col items-center justify-center gap-4 transition-all group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#BE185D] shadow-sm group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#BE185D] mb-1">Mobile Wallets</p>
              <p className="text-[11px] text-slate-500 font-medium">Easypaisa, JazzCash, Nayapay</p>
            </div>
          </button>

          <button className="bg-[#FAF8F5] hover:bg-white border-2 border-dashed border-[#E8E2D5] hover:border-[#B45309] rounded-[24px] p-8 text-center flex flex-col items-center justify-center gap-4 transition-all group relative overflow-hidden">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#B45309] shadow-sm group-hover:scale-110 transition-transform">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#B45309] mb-1">Direct Bank Transfer</p>
              <p className="text-[11px] text-slate-500 font-medium">Direct IBFT from 30+ Local Banks</p>
            </div>
            {/* Add Inquire button matching screenshot placement */}
            <div className="absolute -bottom-2 -right-2 hidden lg:block">
              {/* Note: The screenshot shows an 'Inquire Now' button randomly placed on top of this block in desktop view. I will match its visual overlay. */}
            </div>
          </button>
           <div className="lg:hidden mt-4 flex justify-end w-full">
               <button className="bg-[#25D366] hover:bg-[#20BD5A] text-white text-[13px] font-bold py-2.5 px-6 rounded-full shadow-lg shadow-[#25D366]/30 flex items-center gap-2">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" /> Inquire Now
               </button>
           </div>
        </div>
      </div>

      {/* Floating Inquire Button Overlay (Desktop) */}
      <div className="hidden lg:flex justify-end -mt-16 mb-16 relative z-20 pr-4">
         <button className="bg-[#25D366] hover:bg-[#20BD5A] text-white text-[13px] font-bold py-3 px-6 rounded-full shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-105 flex items-center gap-2 translate-y-6">
           <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" /> Inquire Now
         </button>
      </div>

      {/* 🌟 Automated Festive Settlements */}
      <div className="bg-white rounded-[24px] p-6 lg:p-10 shadow-sm border border-slate-100 flex flex-col lg:flex-row items-center gap-10">
        
        <div className="flex-1">
          <h3 className="text-[18px] font-bold font-poppins text-[#1A1A1A] mb-8">Automated Festive Settlements</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#0A3B2A]-fixed flex items-center justify-center text-[#047857] shrink-0 mt-1">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-1">Scheduled Pay-Outs</h4>
                <p className="text-[13px] text-slate-500 font-medium">Automatically settle with vendors 48 hours after successful event completion.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#B45309] shrink-0 mt-1">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-1">Split Payments</h4>
                <p className="text-[13px] text-slate-500 font-medium">Pay deposits and final balances across multiple sources seamlessly.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#BE185D]-fixed flex items-center justify-center text-[#BE185D] shrink-0 mt-1">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1A1A1A] mb-1">Audit Trail</h4>
                <p className="text-[13px] text-slate-500 font-medium">Full ledger access for your finance team with one-click PDF export.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Graphic representing iPad / Dashboard */}
        <div className="flex-1 w-full relative rounded-[20px] overflow-hidden shadow-lg border-4 border-slate-100 bg-[#0A3B2A] aspect-[4/3] flex items-center justify-center">
           <img src="https://images.unsplash.com/photo-1611095567219-813840ddab92?q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Festive Background" />
           {/* Mock UI overlaid on the image */}
           <div className="relative z-10 w-[80%] h-[70%] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl flex flex-col p-4">
             <div className="w-1/2 h-3 bg-white/20 rounded-full mb-6"></div>
             <div className="w-full h-10 bg-[#0A3B2A]/50 rounded-lg mb-3 border border-white/10"></div>
             <div className="w-full h-10 bg-[#0A3B2A]/50 rounded-lg mb-3 border border-white/10"></div>
             <div className="flex gap-2 mt-auto">
               <div className="w-8 h-8 rounded-full bg-[#BE185D]/80"></div>
               <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
             </div>
           </div>
        </div>

      </div>

    </div>
  )
}
