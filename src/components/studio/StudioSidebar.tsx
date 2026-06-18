"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useStudioTheme } from "./StudioThemeContext"
import { useStudioApps } from "@/contexts/StudioAppContext"
import { NexusLogo } from "../layout/NexusLogo"
import { 
  LayoutGrid, Calendar, FileText, User, 
  Image as ImageIcon, BookOpen, Receipt, Users, Package, 
  CalendarDays, CheckSquare, Star, BarChart3, Settings,
  Moon, Sun, Activity, Bell, UserCheck, Folder, Camera,
  UploadCloud, QrCode, Wallet, Globe, Share2,
  MonitorPlay, Library, Send, Tv, Grid3X3, Key, CreditCard, Cpu
} from "lucide-react"

export default function StudioSidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useStudioTheme()
  const { isAppInstalled } = useStudioApps()
// ... categories definitions ...
  const categories = [
    {
      title: "OVERVIEW",
      items: [
        { name: "Dashboard", href: "/studio", icon: LayoutGrid },
        { name: "Activity Feed", href: "/studio/activity", icon: Activity },
        { name: "Notifications", href: "/studio/notifications", icon: Bell },
      ]
    },
    {
      title: "BUSINESS",
      items: [
        { name: "Leads", href: "/studio/leads", icon: UserCheck },
        { name: "Clients", href: "/studio/clients", icon: Users },
        { name: "Events", href: "/studio/bookings", icon: Calendar },
        { name: "Projects", href: "/studio/projects", icon: Folder },
        { name: "Calendar", href: "/studio/calendar", icon: CalendarDays },
      ]
    },
    {
      title: "PRODUCTION",
      items: [
        { name: "Shoots", href: "/studio/videos", icon: Camera },
        { name: "Deliverables", href: "/studio/deliveries", icon: UploadCloud },
        { name: "Albums", href: "/studio/albums", icon: BookOpen },
        ...(isAppInstalled("memories") ? [{ name: "Memories", href: "/studio/memories", icon: Camera }] : []),
        ...(isAppInstalled("invitations") ? [{ name: "Invitations", href: "/studio/invitations", icon: QrCode }] : []),
      ]
    },
    ...(isAppInstalled("team") ? [{
      title: "TEAM OS",
      items: [
        { name: "Employees", href: "/studio/team?tab=employees", icon: Users },
        { name: "Freelancers", href: "/studio/team?tab=freelancers", icon: Users },
        { name: "Daily Wagers", href: "/studio/team?tab=wagers", icon: Users },
        { name: "Attendance", href: "/studio/team?tab=attendance", icon: CheckSquare },
        { name: "Scheduling", href: "/studio/team?tab=scheduling", icon: CalendarDays },
      ]
    }] : []),
    {
      title: "FINANCE",
      items: [
        { name: "Quotations", href: "/studio/quotations", icon: FileText },
        { name: "Invoices", href: "/studio/finances", icon: Receipt },
        { name: "Payments", href: "/studio/finances?tab=payments", icon: Wallet },
        ...(isAppInstalled("accounting") ? [{ name: "Accounting", href: "/studio/accounting", icon: Wallet }] : []),
      ]
    },
    {
      title: "MARKETING",
      items: [
        { name: "Portfolio", href: "/studio/reviews?tab=portfolio", icon: Globe },
        { name: "Reviews", href: "/studio/reviews", icon: Star },
        { name: "Social Links", href: "/studio/settings?tab=social", icon: Share2 },
        { name: "Website Profile", href: "/studio/settings?tab=profile", icon: User },
      ]
    },
    ...(isAppInstalled("displays") ? [{
      title: "DISPLAYS OS",
      items: [
        { name: "Display Screens", href: "/studio/displays", icon: MonitorPlay },
        { name: "Content Library", href: "/studio/displays?tab=content", icon: Library },
        { name: "Publishing", href: "/studio/displays?tab=publishing", icon: Send },
        { name: "Android TV", href: "/studio/displays?tab=tv", icon: Tv },
      ]
    }] : []),
    {
      title: "APPS",
      items: [
        { name: "Installed Apps", href: "/studio/apps", icon: Grid3X3 },
        { name: "App Marketplace", href: "/studio/apps?tab=marketplace", icon: Grid3X3 },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { name: "Studio Settings", href: "/studio/settings", icon: Settings },
        { name: "Team Permissions", href: "/studio/settings?tab=permissions", icon: Key },
        { name: "Billing", href: "/studio/settings?tab=billing", icon: CreditCard },
        { name: "Integrations", href: "/studio/settings?tab=integrations", icon: Cpu },
      ]
    }
  ]

  return (
    <aside className="w-64 bg-white dark:bg-[#050505] border-r border-[#ECE7DF] dark:border-white/10 text-gray-900 dark:text-gray-100 flex flex-col h-screen fixed left-0 top-0 overflow-hidden transition-colors duration-500 z-30 shadow-sm">
      {/* Sidebar Header / Logo */}
      <div className="p-6 pb-4 flex justify-between items-center shrink-0">
        <Link href="/" className="flex items-center">
          <NexusLogo iconSize={28} showText={false} iconColor="text-[#0F5B3E] dark:text-emerald-400" />
          <div className="flex flex-col leading-none ml-2">
            <span className="text-[#1F2937] dark:text-white font-semibold text-[16px] tracking-tight">nexus</span>
            <span className="text-[#0F5B3E] dark:text-emerald-400 font-bold text-[9px] tracking-widest uppercase mt-0.5">STUDIO</span>
          </div>
        </Link>


        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-gray-600" />}
        </button>
      </div>

      {/* Profile / Account Card */}
      <div className="mx-4 mb-4 p-3 bg-[#FAF7F2] dark:bg-white/5 border border-[#ECE7DF] dark:border-white/10 rounded-[16px] flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-[#0F5B3E] flex items-center justify-center text-white font-black text-sm shrink-0">
          C
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-bold text-[#1F2937] dark:text-white leading-tight truncate">Creative Studio</div>
          <div className="text-[10px] text-[#6B7280] dark:text-gray-400 font-semibold leading-tight mt-0.5">Photography & Films</div>
        </div>
      </div>

      {/* Sidebar Links List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-2 pb-4 space-y-4">
        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <div className="px-3 text-[9px] font-extrabold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
              {category.title}
            </div>
            <div className="space-y-0.5">
              {category.items.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/studio" && pathname.startsWith(link.href.split("?")[0]))
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all ${
                      isActive 
                        ? "bg-[#E6F0EC] text-[#0F5B3E] dark:bg-emerald-500/10 dark:text-emerald-400 shadow-sm" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <link.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0F5B3E] dark:text-emerald-400" : "text-gray-400 dark:text-gray-500"}`} />
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom App Promo Banner */}
      <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#050505] shrink-0">
        <div className="p-3.5 bg-[#0F5B3E] dark:bg-emerald-950/40 border border-transparent dark:border-emerald-500/10 text-white rounded-[20px] relative overflow-hidden flex flex-col min-h-[140px] shadow-sm select-none">
          {/* Green Glow effect */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full filter blur-xl pointer-events-none"></div>

          <div className="z-10 max-w-[65%]">
            <div className="text-[9px] font-extrabold tracking-widest text-[#34D399] mb-0.5 uppercase leading-none">NEXUS STUDIO APP</div>
            <div className="text-[11px] font-bold leading-tight mb-2.5">Manage your studio on the go.</div>
            
            <div className="space-y-1">
              {/* Google Play Button */}
              <a href="#" className="flex items-center gap-1.5 px-2 py-0.5 bg-black border border-white/10 rounded-md hover:bg-neutral-900 transition-colors w-[100px]">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white fill-current shrink-0">
                  <path d="M5.23 3.001c-.13 0-.25.04-.36.12l11.08 11.08 3.51-3.51L5.23 3.001zm11.96 12.358L6.11 23.771c.11.08.23.12.36.12.44 0 .85-.18 1.15-.48l12.18-12.18-2.61-2.61-4.97 4.97-.03.03-.01.01-.01.01-.01.01v.01z" />
                  <path d="M3.6 4.79v14.42c0 .35.1.68.27.97L11.59 12 3.87 3.82c-.17.29-.27.62-.27.97z" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[5px] text-gray-400 font-bold uppercase">GET IT ON</div>
                  <div className="text-[7px] font-black mt-0.5">Google Play</div>
                </div>
              </a>

              {/* App Store Button */}
              <a href="#" className="flex items-center gap-1.5 px-2 py-0.5 bg-black border border-white/10 rounded-md hover:bg-neutral-900 transition-colors w-[100px]">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white fill-current shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39" />
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[5px] text-gray-400 font-bold uppercase">Download on the</div>
                  <div className="text-[7px] font-black mt-0.5">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* iPhone Mockup Overlay */}
          <div className="absolute right-[-14px] bottom-[-22px] w-[80px] h-[135px] bg-neutral-900 rounded-[18px] p-1 shadow-lg border-2 border-neutral-700 select-none pointer-events-none transform -rotate-6 transition-transform hover:rotate-0 duration-300">
            {/* Screen */}
            <div className="w-full h-full bg-[#032318] rounded-[14px] overflow-hidden flex flex-col relative">
              {/* Camera Island */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-neutral-900 rounded-full z-20"></div>
              
              {/* Mini App Mockup UI */}
              <div className="p-1.5 pt-3.5 flex-1 flex flex-col text-[5px] text-white space-y-1 leading-none">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-extrabold text-[6px] text-emerald-400">NEXUS</span>
                  <span className="text-[4px] text-white/50">Online</span>
                </div>
                
                {/* Micro Card 1 */}
                <div className="bg-white/5 p-1 rounded border border-white/5 flex flex-col gap-0.5">
                  <span className="text-[3px] text-white/40 uppercase">Upcoming Shoot</span>
                  <span className="font-bold text-[4.5px]">Ayesha & Hamza</span>
                  <span className="text-[3.5px] text-white/60">Walima • May 25</span>
                </div>

                {/* Micro Card 2 */}
                <div className="bg-white/5 p-1 rounded border border-white/5 flex items-center justify-between gap-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[3px] text-white/40 uppercase">Bookings</span>
                    <span className="text-[8px] font-black">12</span>
                  </div>
                  <svg className="w-5 h-4 stroke-emerald-400 stroke-[0.8] fill-none" viewBox="0 0 30 15">
                    <path d="M0,12 Q5,6 10,9 T20,3 T30,5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
