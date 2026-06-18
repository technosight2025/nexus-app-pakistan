"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle2, Clock, AlertCircle, FileText, ChevronRight,
  TrendingUp, Users, Wallet, CheckSquare, Sparkles, Camera, Heart
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#E11D48",
  cardShadow: "0 4px 12px rgba(0,0,0,0.05)",
  goldShadow: "0 8px 24px rgba(212,175,55,0.15)"
}

export function EventOverviewTab({ eventId }: { eventId?: string }) {
  const { isRomanUrdu } = useLanguage()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-inter pb-24">
      
      {/* Main Column */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* 🌟 Smart Status Card 🌟 */}
        <div 
          className="relative bg-white/80 backdrop-blur-xl border border-gray-100 p-6 md:p-8 overflow-hidden group hover:-translate-y-1 transition-all duration-300"
          style={{ borderRadius: '24px', boxShadow: theme.cardShadow }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
            <div className="space-y-1">
              <h2 className="text-xl font-bold font-poppins text-[#1A1A1A] tracking-tight">Event Status Overview</h2>
              <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 uppercase tracking-wider">
                Everything is on track <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </p>
            </div>
            <div className="text-right">
              <div 
                className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-4 py-2 border border-[#D4AF37]/20 shadow-sm"
                style={{ borderRadius: '12px' }}
              >
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-bold text-[#B89020]">75 Days Left</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
            {[
              { label: "Progress", val: "65%", icon: TrendingUp, color: theme.primary },
              { label: "Vendors", val: "4 / 10", icon: Users, color: theme.accent },
              { label: "Spent", val: "1.2M", icon: Wallet, color: "#4D96FF" },
              { label: "Tasks", val: "12 / 45", icon: CheckSquare, color: theme.success },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white rounded-[16px] p-4 border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">{stat.label}</p>
                <p className="text-xl font-bold font-poppins text-[#1A1A1A]">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold font-poppins text-[#1A1A1A] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#E11D48]" /> Pending Actions
            </h3>
            <span className="bg-[#E11D48]/10 text-[#E11D48] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#E11D48]/20">3 Tasks</span>
          </div>

          <div className="space-y-3">
            {[
              { title: "Approve Decor Quote", desc: "From Royal Decorators. Expires in 2 days.", type: "quote", color: theme.accent },
              { title: "Pay Venue Deposit", desc: "Grand Taj Marquee - Rs 150,000", type: "pay", color: theme.error },
              { title: "Shortlist Photographer", desc: "3 vendors awaiting your response.", type: "task", color: "#4D96FF" }
            ].map((action, i) => (
              <div 
                key={i} 
                className="group relative bg-white rounded-[16px] border border-gray-100 p-4 shadow-sm hover:border-[#D4AF37]/50 transition-all flex items-center gap-4 cursor-pointer overflow-hidden hover:-translate-y-0.5"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                  style={{ backgroundColor: action.color }}
                />
                
                <div 
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white shadow-sm"
                  style={{ backgroundColor: `${action.color}15`, color: action.color }}
                >
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="text-sm font-bold font-poppins text-[#1A1A1A] truncate mb-0.5 group-hover:text-[#0F5B3E] transition-colors">{action.title}</h4>
                  <p className="text-xs font-medium text-gray-500 truncate">{action.desc}</p>
                </div>
                <button 
                  className="relative hidden sm:flex bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold px-4 py-2 transition-colors shadow-sm"
                  style={{ borderRadius: '12px' }}
                >
                  Action
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Sidebar Column */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Latest Memories Widget */}
        <div 
          className="relative bg-white/80 backdrop-blur-xl border border-gray-100 p-6 overflow-hidden"
          style={{ borderRadius: '24px', boxShadow: theme.cardShadow }}
        >
          <div className="flex items-center justify-between mb-5 relative z-10">
            <h3 className="text-lg font-bold font-poppins text-[#1A1A1A] flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#D4AF37]" /> Memories
            </h3>
            <button className="text-[11px] font-bold text-[#D4AF37] hover:text-[#B89020] uppercase tracking-wider">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="aspect-square bg-gray-100 overflow-hidden border border-gray-200 relative group cursor-pointer"
                style={{ borderRadius: '16px' }}
              >
                <img 
                  src={`https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop&sig=${i}`} 
                  alt="Memory" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F5B3E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <Heart className="w-4 h-4 text-white fill-white/50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 Premium Vendor Quick Add 🌟 */}
        <div 
          className="relative bg-white rounded-[24px] p-6 shadow-sm overflow-hidden group border border-gray-100"
          style={{ boxShadow: theme.cardShadow }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[30px] pointer-events-none" />
          
          <div className="relative z-10 flex items-start gap-4 mb-5">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0"
              style={{ backgroundColor: `${theme.accent}15`, borderColor: `${theme.accent}30` }}
            >
              <Sparkles className="w-6 h-6" style={{ color: theme.accent }} />
            </div>
            <div>
              <h3 className="text-base font-bold font-poppins text-[#1A1A1A]">Need a Photographer?</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
                Your AI assistant found 3 perfect matches for your style and budget.
              </p>
            </div>
          </div>
          
          <button 
            className="w-full text-white font-bold py-3 text-sm transition-colors shadow-md relative z-10 hover:bg-[#1A7A54]"
            style={{ borderRadius: '12px', backgroundColor: theme.primary }}
          >
            View Recommendations
          </button>
        </div>

      </div>

    </div>
  )
}
