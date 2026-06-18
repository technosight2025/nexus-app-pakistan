"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, Users, CalendarDays, Wallet, 
  FolderKanban, Briefcase, Star, Settings, Box, Bot, AppWindow, CheckCircle2 
} from "lucide-react"

export function ProfessionalSidebar() {
  const pathname = usePathname()

  const modules = [
    { name: "Overview Desk", href: "/dashboard/professional", icon: LayoutDashboard },
    { name: "Clients & CRM", href: "/dashboard/professional/clients", icon: Users },
    { name: "Bookings & Calendar", href: "/dashboard/professional/bookings", icon: CalendarDays },
    { name: "Projects & Shoots", href: "/dashboard/professional/projects", icon: Briefcase },
    { name: "Deliverables OS", href: "/dashboard/professional/deliverables", icon: CheckCircle2 },
    { name: "Team Builder", href: "/dashboard/professional/team", icon: FolderKanban },
    { name: "Finance & Accounting", href: "/dashboard/professional/finance", icon: Wallet },
    { name: "Portfolio Manager", href: "/dashboard/professional/portfolio", icon: Box },
    { name: "Reviews", href: "/dashboard/professional/reviews", icon: Star },
    { name: "AI Assistant", href: "/dashboard/professional/ai", icon: Bot },
    { name: "NEXUS Apps", href: "/dashboard/professional/apps", icon: AppWindow },
    { name: "Settings", href: "/dashboard/professional/settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 text-slate-300 flex flex-col z-20">
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard/professional" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0F5B3E] to-[#C9A227] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">PR</span>
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-sm">Professional OS</h1>
            <p className="text-[10px] text-slate-400 font-medium">NEXUS Platform</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">
          Modules
        </div>
        
        {modules.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive 
                  ? "bg-[#0F5B3E]/20 text-[#C9A227] font-semibold" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className={`w-4.5 h-4.5 ${isActive ? "text-[#C9A227]" : "text-slate-400"}`} />
              {item.name}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1518110924513-568b2b7169ac?q=80&w=200&auto=format&fit=crop" 
              alt="Avatar"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Ali Rahman</p>
            <p className="text-xs text-[#C9A227] font-medium truncate">Elite Professional</p>
          </div>
        </div>
      </div>
    </div>
  )
}
