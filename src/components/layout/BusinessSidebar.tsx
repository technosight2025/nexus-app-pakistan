"use client"
import Link from "next/link"

import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, CalendarDays, Inbox, FileText, Settings, LogOut, Briefcase, Camera, Music, Video, MapPin, ChefHat, ListOrdered, ClipboardList, AppWindow, Building2, Store, Plus, ChevronDown, Wallet, MonitorPlay, QrCode, Sliders, Bot, LayoutGrid } from "lucide-react"
import { useState } from "react"
import { useNexusEcosystem } from "@/app/context/NexusEcosystemContext"
import { NexusLogo } from "./NexusLogo"

const ICON_MAP: Record<string, any> = {
  LayoutGrid, Users, Wallet, MonitorPlay, Camera, QrCode, Sliders, Bot, MapPin, ChefHat
}

export function BusinessSidebar() {
  const pathname = usePathname()
  const { isAppInstalled, availableApps } = useNexusEcosystem()
  const [showOrgDropdown, setShowOrgDropdown] = useState(false)

  // Global links for the Business OS
  const GLOBAL_LINKS = [
    { name: "Global Dashboard", href: "/business/dashboard", icon: LayoutDashboard },
    { name: "App Store & Tools", href: "/business/tools", icon: AppWindow },
    { name: "Organization Settings", href: "/business/settings", icon: Building2 },
  ]

  // Dynamic Active Modules
  const ACTIVE_MODULES = availableApps.filter(app => isAppInstalled(app.id))

  // Mock Organizations for Multi-tenant switcher
  const organizations = [
    { id: 1, name: "Zardozi Lehnga Boutique", type: "Apparel", active: true },
    { id: 2, name: "Royal Palace Banquet", type: "Venue", active: false },
  ]

  return (
    <aside className="w-64 bg-[#1D1C17] text-white flex flex-col h-screen fixed left-0 top-0 border-r border-white/10 z-50">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex flex-col mb-8 group">
          <NexusLogo iconColor="text-[#C9A227]" textColor="text-white" iconSize={28} />
          <span className="text-[10px] font-bold text-[#C9A227] tracking-widest uppercase mt-1">Business OS</span>
        </Link>


        {/* Multi-Tenant Business Selector */}
        <div className="relative">
          <div 
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
            className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-[#0F5B3E] rounded-lg flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider truncate">Current Workspace</p>
                <p className="font-bold text-white text-sm truncate">Zardozi Boutique</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${showOrgDropdown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown */}
          {showOrgDropdown && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#2a2924] border border-white/10 rounded-xl shadow-xl overflow-hidden z-[100]">
              {organizations.map(org => (
                <div key={org.id} className={`p-3 text-sm flex items-center justify-between cursor-pointer hover:bg-white/5 ${org.active ? 'bg-white/5 border-l-2 border-[#C9A227]' : ''}`}>
                  <div>
                    <div className="font-bold">{org.name}</div>
                    <div className="text-xs text-white/50">{org.type}</div>
                  </div>
                </div>
              ))}
              <div className="p-3 text-sm text-[#C9A227] font-bold border-t border-white/10 flex items-center gap-2 cursor-pointer hover:bg-white/5">
                <Plus className="w-4 h-4" /> Add Organization
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar">
        <div className="mb-4 px-2">
          <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Platform Core</span>
        </div>
        
        {GLOBAL_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                isActive ? "bg-[#0F5B3E] text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-white/50"}`} />
              {link.name}
            </Link>
          )
        })}

        <div className="mt-8 mb-4 px-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Active Apps</span>
          <Link href="/business/tools" className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C9A227] transition-colors"><Plus className="w-3 h-3 text-white" /></Link>
        </div>

        {ACTIVE_MODULES.map((app) => {
          const href = `/business/${app.id}`
          const isActive = pathname === href || pathname.startsWith(href + '/')
          const Icon = ICON_MAP[app.iconName] || AppWindow

          return (
            <Link
              key={app.id}
              href={href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                isActive ? "bg-white/10 text-white border border-white/20" : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isActive ? 'bg-[#C9A227]' : 'bg-white/10'}`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                {app.name}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-colors font-bold text-sm">
          <LogOut className="w-4 h-4" /> Exit Business OS
        </Link>
      </div>
    </aside>
  )
}
