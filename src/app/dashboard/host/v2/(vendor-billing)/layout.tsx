"use client"

import { useState } from "react"
import { 
  LayoutDashboard, PlaySquare, Receipt, Tags, CreditCard, 
  Menu, X, Search, Bell, HelpCircle, Settings
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function VendorV2Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Host Dashboard", href: "/dashboard/host/v2", icon: LayoutDashboard },
    { name: "Subscriptions", href: "/dashboard/host/v2/subscriptions", icon: PlaySquare },
    { name: "Billing", href: "/dashboard/host/v2/billing", icon: Receipt },
    { name: "Pricing Plans", href: "/dashboard/host/v2/pricing", icon: Tags },
    { name: "Payment Methods", href: "/dashboard/host/v2/payment-methods", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen font-inter flex relative" style={{ backgroundColor: '#FAF8F5' }}>
      
      {/* 🌟 Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🌟 Persistent Desktop / Mobile Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A3B2A] flex flex-col shrink-0 text-white
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Header Block */}
        <div className="p-6 pt-8 pb-10 flex items-center justify-between">
          <div>
            <h1 className="text-[17px] font-black font-poppins text-white leading-tight">Nexus Festive</h1>
            <p className="text-[9px] font-bold text-[#0A3B2A]-fixed uppercase tracking-[0.2em] mt-1">Vendor Management</p>
          </div>
          <button 
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#0A3B2A]-container text-white shadow-md font-bold" 
                    : "text-white/70 hover:bg-[#0A3B2A]-container/50 hover:text-white font-medium"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                <span className="text-[13.5px] tracking-wide">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Profile Block */}
        <div className="p-6">
          <div className="border border-[#155E45] rounded-xl p-4 mb-4 bg-[#0A3B2A]">
            <p className="text-[11px] text-[#0A3B2A]-fixed font-medium mb-2">Current Tier: Gold</p>
            <button className="w-full bg-[#BE185D] hover:bg-[#BE185D]/90 text-white text-[13px] font-bold py-2.5 rounded-lg shadow-md shadow-[#BE185D]/20 transition-colors">
              Upgrade Plan
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#155E45]">
              <div className="w-5 h-5 border-[1.5px] border-[#0A3B2A] rounded-sm flex flex-col gap-[2px] p-[2px]">
                 <div className="h-full bg-[#0A3B2A] rounded-[1px]" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-white truncate leading-tight">Premium Vendor</p>
              <p className="text-[11px] text-white/60 truncate">vendor@nexus.pk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 🌟 Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
        
        {/* Responsive Top Header */}
        <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md px-4 lg:px-8 py-4 lg:py-6 flex items-center justify-between lg:hidden shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="p-1 -ml-1 text-[#1A1A1A] hover:bg-black/5 rounded-md transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
            <span className="text-xl font-bold font-poppins text-[#1A1A1A] capitalize">
              {pathname?.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-4 lg:px-10 lg:py-10">
          {children}
        </div>

      </main>

    </div>
  )
}
