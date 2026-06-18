"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Bell, MessageSquare, User, Home, Plus, Search, Menu, X, ChevronRight, LayoutDashboard, Heart
} from "lucide-react"
import { NotificationsEngine } from "./NotificationsEngine"
import { useLanguage } from "@/contexts/LanguageContext"

const theme = {
  primary: "#0F5B3E",
  accent: "#D4AF37",
  bg: "#FDF8F0",
  success: "#10B981"
}

export function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()
  const pathname = usePathname()

  const GLOBAL_NAV = [
    { name: isRomanUrdu ? "Mera Dashboard" : "Overview", href: "/dashboard/host", icon: Home },
    { name: isRomanUrdu ? "Mere Events" : "My Events", href: "/dashboard/host/events", icon: LayoutDashboard },
    { name: isRomanUrdu ? "Paighaam" : "Messages", href: "/dashboard/host/messages", icon: MessageSquare },
    { name: isRomanUrdu ? "Profile Settings" : "Profile", href: "/dashboard/host/profile", icon: User },
  ]

  if (pathname.includes('/v2')) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen font-inter selection:bg-[#0F5B3E]/20 selection:text-[#0F5B3E] relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
      
      {/* 🌟 Animated Mesh Gradient Background 🌟 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px]" 
          style={{ backgroundImage: `linear-gradient(to bottom right, ${theme.accent}15, transparent)` }}
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full blur-[100px]" 
          style={{ backgroundImage: `linear-gradient(to bottom left, ${theme.primary}10, transparent)` }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header - Glassmorphic */}
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
          
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              
              {/* Logo and Mobile Toggle */}
              <div className="flex items-center gap-4">
                <button 
                  className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-[#0F5B3E] rounded-xl transition-all"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                
                <Link href="/dashboard/host" className="flex items-center gap-3 group">
                  <div 
                    className="w-9 h-9 md:w-11 md:h-11 rounded-[12px] flex items-center justify-center text-white font-serif italic font-black shadow-lg group-hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: theme.primary }}
                  >
                    N
                  </div>
                  <span className="hidden sm:block text-xl font-black tracking-tight text-[#1A1A1A] font-poppins group-hover:text-[#0F5B3E] transition-colors">
                    NEXUS <span className="text-[#D4AF37] font-bold">Host</span>
                  </span>
                </Link>
              </div>

              {/* Global Search - Frosted Glass */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0F5B3E] transition-colors z-10" />
                  <input 
                    type="text" 
                    placeholder={isRomanUrdu ? "Khushi ke pal talash karein..." : "Search Events, Vendors, or Tasks..."}
                    className="relative z-10 w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 focus:border-[#0F5B3E] focus:ring-4 focus:ring-[#0F5B3E]/10 rounded-full text-sm outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Actions & Profile */}
              <div className="flex items-center gap-2 md:gap-4">
                
                {/* Urdu Toggle */}
                <div className="hidden sm:flex items-center bg-gray-50 rounded-full p-1 border border-gray-200 shadow-inner">
                  <button 
                    onClick={() => setIsRomanUrdu(false)}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all ${!isRomanUrdu ? 'bg-white text-[#0F5B3E] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setIsRomanUrdu(true)}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all ${isRomanUrdu ? 'bg-white text-[#0F5B3E] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    UR
                  </button>
                </div>

                <NotificationsEngine />

                <button className="hidden sm:flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 p-[2px] shadow-sm">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-white" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold text-[#1A1A1A] leading-tight font-poppins">Ahmed K.</p>
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mt-0.5">Event Host</p>
                  </div>
                </button>

              </div>
            </div>
          </div>
        </header>

        {/* Main Layout Container */}
        <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 relative z-10">
          
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              
              <nav className="space-y-2 relative">
                {GLOBAL_NAV.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/dashboard/host' && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative block"
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-white border border-gray-100 shadow-sm"
                          style={{ borderRadius: '16px' }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className={`relative z-10 flex items-center gap-3 px-5 py-4 rounded-[16px] transition-colors duration-300 font-bold text-sm ${
                        isActive 
                          ? "text-[#0F5B3E]" 
                          : "text-gray-500 hover:text-[#1A1A1A] hover:bg-white/50"
                      }`}>
                        <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110 text-[#0F5B3E]" : "text-gray-400"}`} />
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </nav>

              {/* Quick Create Button */}
              <button 
                className="w-full text-white flex items-center justify-center gap-2 py-4 shadow-md transition-all active:scale-95 hover:bg-[#1A7A54]"
                style={{ borderRadius: '16px', backgroundColor: theme.primary }}
              >
                <Plus className="w-5 h-5" />
                <span className="font-bold">{isRomanUrdu ? "Naya Event Banayein" : "Create New Event"}</span>
              </button>

              {/* Assigned Planner Widget - Glass Card */}
              <div 
                className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-4">Event Concierge</p>
                  <div className="flex items-center gap-4 mb-5">
                    <div 
                      className="w-12 h-12 rounded-[16px] bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-base shadow-sm relative"
                      style={{ color: theme.primary }}
                    >
                      SA
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-bold font-poppins text-[#1A1A1A] leading-tight mb-1">Sarah Ahmed</p>
                      <p className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                        Online Now
                      </p>
                    </div>
                  </div>
                  <button 
                    className="w-full py-3 rounded-[12px] text-xs font-bold transition-all border shadow-sm hover:shadow-md"
                    style={{ backgroundColor: `${theme.primary}10`, color: theme.primary, borderColor: `${theme.primary}20` }}
                  >
                    {isRomanUrdu ? "Baat Karein" : "Say Hello 👋"}
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* Dynamic Content */}
          <main className="flex-1 min-w-0 pb-24 md:pb-0 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center h-16 px-2">
            {GLOBAL_NAV.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard/host' && pathname.startsWith(item.href))
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="flex flex-col items-center justify-center w-full h-full space-y-1 relative"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-nav-indicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full shadow-sm" 
                      style={{ backgroundColor: theme.accent }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 mt-1 transition-transform ${isActive ? "scale-110" : "text-gray-400"}`} style={{ color: isActive ? theme.primary : undefined }} />
                  <span className="text-[10px] font-bold transition-colors" style={{ color: isActive ? theme.primary : "#9CA3AF" }}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
