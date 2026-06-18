"use client"

import { 
  Search, Bell, HelpCircle, Settings, Store, Rocket, Building2, Check,
  ShieldCheck, Gift, MessageCircle
} from "lucide-react"

export default function PricingPlansPage() {
  return (
    <div className="flex flex-col min-h-full">
      
      {/* 🌟 Desktop Header */}
      <header className="hidden lg:flex items-center justify-between mb-8">
        <h1 className="text-[22px] font-bold font-poppins text-[#0A3B2A]">Pricing Plans</h1>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search features..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#EAE4D9] bg-opacity-40 border border-[#E8E2D5] rounded-full text-[13px] font-medium focus:outline-none focus:border-[#0A3B2A] transition-colors"
            />
          </div>
          <button className="text-slate-600 hover:text-black transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <button className="text-slate-600 hover:text-black transition-colors"><Settings className="w-5 h-5" /></button>
        </div>
      </header>

      {/* 🌟 Hero Title Area */}
      <div className="text-center max-w-2xl mx-auto mb-16 pt-8">
        <span className="inline-block bg-[#BE185D]-fixed text-[#BE185D] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 shadow-sm">
          SCALED FOR SUCCESS
        </span>
        <h2 className="text-4xl lg:text-5xl font-black font-poppins text-[#0A3B2A] leading-[1.1] mb-6">
          Elevate Your Festive<br/>Business Strategy
        </h2>
        <p className="text-[14px] text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
          Choose the perfect tier to showcase your services, manage high-volume event bookings, and access industry-leading vendor tools.
        </p>
      </div>

      {/* 🌟 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto w-full mb-16 relative">
        
        {/* Basic Plan */}
        <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-sm border border-slate-100 flex flex-col relative z-0 mt-4 md:mt-8">
           <div className="w-12 h-12 bg-[#F4F0E6] rounded-xl flex items-center justify-center text-[#0A3B2A] mb-6">
             <Store className="w-6 h-6" />
           </div>
           <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A] mb-2">Basic</h3>
           <p className="text-[13px] text-slate-500 font-medium mb-8 leading-relaxed">
             Essential tools for individual vendors starting their journey.
           </p>
           <div className="flex items-end gap-1 mb-8">
             <span className="text-[14px] font-bold text-[#0A3B2A] pb-1">PKR</span>
             <span className="text-4xl font-black font-poppins text-[#0A3B2A]">5,500</span>
             <span className="text-[13px] text-slate-500 font-medium pb-1">/mo</span>
           </div>
           
           <ul className="space-y-4 mb-10 flex-1">
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> 10 Active Event Listings
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> 5GB Vault Storage
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> Standard Analytics
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-slate-300">
               <Check className="w-5 h-5 text-slate-200 shrink-0" /> <span className="line-through">Priority AI Assistant</span>
             </li>
           </ul>

           <button className="w-full bg-[#FAF8F5] hover:bg-slate-100 text-[#1A1A1A] text-[14px] font-bold py-4 rounded-2xl transition-colors border border-[#E8E3D5]">
             Get Started
           </button>
        </div>

        {/* Pro Plan (Elevated/Recommended) */}
        <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-2xl border-2 border-[#0A3B2A] flex flex-col relative z-10 transform md:-translate-y-4">
           
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A3B2A] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
             RECOMMENDED
           </div>

           <div className="w-12 h-12 bg-[#F4F0E6] rounded-xl flex items-center justify-center text-[#0A3B2A] mb-6">
             <Rocket className="w-6 h-6" />
           </div>
           <h3 className="text-2xl font-bold font-poppins text-[#1A1A1A] mb-2">Pro</h3>
           <p className="text-[13px] text-slate-500 font-medium mb-8 leading-relaxed">
             Advanced management for busy event planning teams.
           </p>
           <div className="flex items-end gap-1 mb-8">
             <span className="text-[14px] font-bold text-[#0A3B2A] pb-1">PKR</span>
             <span className="text-4xl font-black font-poppins text-[#0A3B2A]">12,500</span>
             <span className="text-[13px] text-slate-500 font-medium pb-1">/mo</span>
           </div>
           
           <ul className="space-y-4 mb-10 flex-1">
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> Unlimited Listings
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> 50GB Vault Storage
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> AI Smart Scheduling
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-[#1A1A1A]">
               <Check className="w-5 h-5 text-[#0A3B2A] shrink-0" /> 24/7 Email Support
             </li>
           </ul>

           <button className="w-full bg-[#0A3B2A] hover:bg-[#0A3B2A]-container text-white text-[14px] font-bold py-4 rounded-2xl transition-colors shadow-lg shadow-[#0A3B2A]/20">
             Choose Pro
           </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-[#0A3B2A] rounded-[32px] p-8 lg:p-10 shadow-xl flex flex-col relative z-0 mt-4 md:mt-8 overflow-hidden">
           
           <div className="absolute top-0 right-8 bg-[#EAB308] text-[#713F12] text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-b-xl shadow-lg">
             ⭐ POPULAR
           </div>

           <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
             <div className="w-48 h-48 border-[12px] border-white rounded-[40px]"></div>
           </div>

           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 relative z-10">
             <Building2 className="w-6 h-6" />
           </div>
           <h3 className="text-2xl font-bold font-poppins text-white mb-2 relative z-10">Enterprise</h3>
           <p className="text-[13px] text-[#0A3B2A]-fixed font-medium mb-8 leading-relaxed relative z-10">
             Bespoke solutions for luxury hotels and gala organizers.
           </p>
           <div className="flex items-end gap-1 mb-8 relative z-10 h-11">
             <span className="text-[14px] font-bold text-white pb-1">Contact Sales</span>
           </div>
           
           <ul className="space-y-4 mb-10 flex-1 relative z-10">
             <li className="flex items-start gap-3 text-[13px] font-medium text-white">
               <Check className="w-5 h-5 text-[#0A3B2A]-fixed shrink-0" /> Full White-labeling
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-white">
               <Check className="w-5 h-5 text-[#0A3B2A]-fixed shrink-0" /> Infinite Vault Size
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-white">
               <Check className="w-5 h-5 text-[#0A3B2A]-fixed shrink-0" /> Dedicated Support Head
             </li>
             <li className="flex items-start gap-3 text-[13px] font-medium text-white">
               <Check className="w-5 h-5 text-[#0A3B2A]-fixed shrink-0" /> Custom API Access
             </li>
           </ul>

           <button className="w-full bg-white hover:bg-slate-50 text-[#0A3B2A] text-[14px] font-bold py-4 rounded-2xl transition-colors shadow-sm relative z-10">
             Request Quote
           </button>
           
           {/* Floating Inquire Button Overlay */}
           <button className="absolute -bottom-6 -right-6 lg:bottom-4 lg:-right-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-[13px] font-bold py-3 px-6 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center gap-2 z-50">
             <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" /> Inquire Now
           </button>
        </div>

      </div>

      {/* 🌟 Detailed Feature Comparison */}
      <div className="bg-white rounded-[32px] p-6 lg:p-12 shadow-sm border border-slate-100 max-w-6xl mx-auto w-full mb-16 overflow-x-auto">
        <h3 className="text-[20px] font-bold font-poppins text-[#1A1A1A] mb-1">Detailed Feature Comparison</h3>
        <p className="text-[13px] text-slate-500 font-medium mb-10">Industrial-grade precision for your business scaling needs.</p>

        <table className="w-full text-left min-w-[800px] border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4">CATEGORY & FEATURE</th>
              <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4 text-center">BASIC</th>
              <th className="py-4 px-4 text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest w-1/4 text-center bg-[#FAF8F5] rounded-t-xl">PRO</th>
              <th className="py-4 px-4 text-[10px] font-black text-[#0A3B2A] uppercase tracking-widest w-1/4 text-center">ENTERPRISE</th>
            </tr>
          </thead>
          <tbody>
            {/* Infrastructure */}
            <tr className="bg-slate-50/50">
              <td colSpan={4} className="py-3 px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-y border-slate-100">PLATFORM INFRASTRUCTURE</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A]">Nexus Vault Storage</td>
              <td className="py-5 px-4 text-[13px] text-slate-600 font-medium text-center">5 GB</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center bg-[#FAF8F5]">50 GB</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#BE185D] text-center">Unlimited</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A]">Monthly Data Transfers</td>
              <td className="py-5 px-4 text-[13px] text-slate-600 font-medium text-center">250 GB</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center bg-[#FAF8F5]">1 TB</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center">Unmetered</td>
            </tr>

            {/* AI & Automation */}
            <tr className="bg-slate-50/50">
              <td colSpan={4} className="py-3 px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-y border-slate-100">AI & AUTOMATION</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A]">Auto-Scheduling Engine</td>
              <td className="py-5 px-4 text-center"><span className="text-slate-300">—</span></td>
              <td className="py-5 px-4 text-center bg-[#FAF8F5]"><Check className="w-5 h-5 text-[#0A3B2A] mx-auto" /></td>
              <td className="py-5 px-4 text-center"><Check className="w-5 h-5 text-[#0A3B2A] mx-auto" /></td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A]">Festive AI Copywriting</td>
              <td className="py-5 px-4 text-[13px] text-slate-600 font-medium text-center">3 runs/mo</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center bg-[#FAF8F5]">50 runs/mo</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center">Unlimited</td>
            </tr>

            {/* Support */}
            <tr className="bg-slate-50/50">
              <td colSpan={4} className="py-3 px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-y border-slate-100">SUPPORT PRIORITY</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A]">Response Time SLA</td>
              <td className="py-5 px-4 text-[13px] text-slate-600 font-medium text-center">48 Hours</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center bg-[#FAF8F5]">12 Hours</td>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A] text-center">1 Hour</td>
            </tr>
            <tr>
              <td className="py-5 px-4 text-[13px] font-bold text-[#1A1A1A]">Direct WhatsApp Access</td>
              <td className="py-5 px-4 text-center"><span className="text-slate-300">—</span></td>
              <td className="py-5 px-4 text-center bg-[#FAF8F5] rounded-b-xl"><span className="text-slate-300">—</span></td>
              <td className="py-5 px-4 text-center"><Check className="w-5 h-5 text-[#0A3B2A] mx-auto" /></td>
            </tr>
          </tbody>
        </table>
        
        <p className="text-center text-[11px] font-medium text-slate-400 mt-8 pt-8 border-t border-slate-100">
          Prices exclude VAT. Custom multi-year contracts available for Enterprise partners.
        </p>
      </div>

      {/* 🌟 Bottom Info Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto w-full mb-10">
        
        {/* Still not sure? */}
        <div className="bg-[#0A3B2A] rounded-[24px] p-8 shadow-md relative overflow-hidden flex flex-col justify-center">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-4 -translate-y-4">
            <div className="w-32 h-32 border-[8px] border-white rounded-[20px]"></div>
          </div>
          <h4 className="text-[18px] font-bold font-poppins text-white mb-2 relative z-10">Still not sure?</h4>
          <p className="text-[13px] text-[#0A3B2A]-fixed font-medium mb-6 leading-relaxed relative z-10">
            Book a personalized consultation with our vendor specialists to find the plan that matches your event volume.
          </p>
          <button className="bg-[#BE185D] hover:bg-[#BE185D]/90 text-white text-[13px] font-bold py-3 px-6 rounded-xl shadow-lg transition-colors w-fit relative z-10">
            Schedule Demo
          </button>
        </div>

        {/* Secure Payments */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center text-[#B45309] mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-[15px] font-bold font-poppins text-[#1A1A1A] mb-2">Secure Payments</h4>
          <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
            Bank-grade encryption for all PKR transactions.
          </p>
        </div>

        {/* Annual Savings */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-[#BE185D]-fixed rounded-full flex items-center justify-center text-[#BE185D] mb-4">
            <Gift className="w-6 h-6" />
          </div>
          <h4 className="text-[15px] font-bold font-poppins text-[#1A1A1A] mb-2">Annual Savings</h4>
          <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
            Pay yearly and get 2 months of Nexus Pro free.
          </p>
        </div>

      </div>

    </div>
  )
}
