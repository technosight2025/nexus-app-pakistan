"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ShieldAlert, Activity, DollarSign, Database, Server, LogOut, Settings, BarChart, AlertTriangle } from "lucide-react"
import { NexusLogo } from "./NexusLogo"

export function AdminSidebar() {
  const pathname = usePathname()

  const ADMIN_LINKS = [
    { name: "Platform Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users & Orgs", href: "/admin/users", icon: Users },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: DollarSign },
    { name: "Platform Health", href: "/admin/health", icon: Activity },
    { name: "AI Operations", href: "/admin/ai", icon: Database },
    { name: "Audit Logs", href: "/admin/logs", icon: ShieldAlert },
    { name: "Infrastructure", href: "/admin/infrastructure", icon: Server },
    { name: "Security Alerts", href: "/admin/security", icon: AlertTriangle },
  ]

  return (
    <aside className="w-64 bg-[#0A0A0A] text-gray-300 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-50 shadow-2xl">
      <div className="p-6 border-b border-gray-800 bg-[#111]">
        <Link href="/" className="flex flex-col mb-2">
          <NexusLogo iconColor="text-rose-600" textColor="text-white" iconSize={28} />
          <span className="text-[10px] font-black text-rose-600 tracking-widest uppercase mt-1">Super Admin</span>
        </Link>

        <div className="mt-4 flex items-center gap-3 bg-gray-900 border border-gray-800 p-3 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Normal</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar">
        <div className="mb-4 px-2">
          <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Command Center</span>
        </div>
        
        {ADMIN_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/') && link.href !== '/admin'
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                isActive ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <link.icon className={`w-4 h-4 ${isActive ? "text-rose-500" : "text-gray-500"}`} />
              {link.name}
            </Link>
          )
        })}

        <div className="mt-8 mb-4 px-2">
          <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Global Settings</span>
        </div>

        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent">
          <Settings className="w-4 h-4 text-gray-500" />
          Platform Config
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800 bg-[#111]">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-800 hover:text-white transition-colors font-bold text-sm">
          <LogOut className="w-4 h-4" /> Exit Command Center
        </Link>
      </div>
    </aside>
  )
}
