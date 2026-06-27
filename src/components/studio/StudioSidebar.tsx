"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useStudioTheme } from "./StudioThemeContext"
import { useStudioApps } from "@/contexts/StudioAppContext"
import { NexusLogo } from "../layout/NexusLogo"
import { useState } from "react"
import { 
  LayoutGrid, Calendar, FileText, User, 
  Image as ImageIcon, BookOpen, Receipt, Users, Package, 
  CalendarDays, CheckSquare, Star, BarChart3, Settings,
  Moon, Sun, Activity, Bell, UserCheck, Folder, Camera,
  UploadCloud, QrCode, Wallet, Globe, Share2,
  MonitorPlay, Library, Send, Tv, Grid3X3, Key, CreditCard, Cpu,
  ChevronLeft, ChevronRight, X, Briefcase,
  HelpCircle, TrendingUp, FileCheck, Box, Archive, Megaphone,
  PieChart, Bot, MessageSquare, Shield, Zap,
  GitBranch, Layers, HardDrive, FilePen, Sparkles, Workflow,
  Kanban, Film, BadgeCheck
} from "lucide-react"

interface StudioSidebarProps {
  onCollapseChange?: (collapsed: boolean) => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export default function StudioSidebar({ onCollapseChange, mobileOpen = false, onMobileClose }: StudioSidebarProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useStudioTheme()
  const { isAppInstalled } = useStudioApps()
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapseToggle = () => {
    const next = !collapsed
    setCollapsed(next)
    onCollapseChange?.(next)
  }

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
      title: "WORKFLOW",
      items: [
        { name: "Pipeline", href: "/studio/workflow", icon: Workflow },
        { name: "Kanban Board", href: "/studio/pipeline", icon: Kanban },
        { name: "AI Assistant", href: "/studio/ai", icon: Sparkles },
        { name: "Automation", href: "/studio/automation", icon: Zap },
      ]
    },
    {
      title: "BUSINESS",
      items: [
        { name: "Bookings", href: "/studio/bookings", icon: CalendarDays },
        { name: "Projects", href: "/studio/projects", icon: Folder },
        { name: "Contacts", href: "/studio/contacts", icon: Users },
        { name: "Catalogue", href: "/studio/catalogue", icon: Package },
        { name: "Leads", href: "/studio/leads", icon: UserCheck },
        { name: "Calendar", href: "/studio/calendar", icon: Calendar },
        { name: "Messages", href: "/studio/messages", icon: MessageSquare },
      ]
    },
    {
      title: "PRODUCTION",
      items: [
        { name: "Portfolio", href: "/studio/albums", icon: BookOpen },
        { name: "Media Library", href: "/studio/media", icon: HardDrive },
        { name: "Shoots", href: "/studio/videos", icon: Camera },
        { name: "Deliverables", href: "/studio/deliveries", icon: UploadCloud },
        ...(isAppInstalled("memories") ? [{ name: "Memories", href: "/studio/memories", icon: ImageIcon }] : []),
        ...(isAppInstalled("invitations") ? [{ name: "Invitations", href: "/studio/invitations", icon: QrCode }] : []),
      ]
    },
    {
      title: "FINANCE",
      items: [
        { name: "Invoices", href: "/studio/finances", icon: Receipt },
        { name: "Payments", href: "/studio/finances?tab=payments", icon: Wallet },
        { name: "Quotations", href: "/studio/quotations", icon: FileText },
        { name: "Contracts", href: "/studio/contracts", icon: FilePen },
        ...(isAppInstalled("accounting") ? [{ name: "Accounting", href: "/studio/accounting", icon: PieChart }] : []),
      ]
    },
    ...(isAppInstalled("team") ? [{ 
      title: "TEAM",
      items: [
        { name: "Employees", href: "/studio/team?tab=employees", icon: Users },
        { name: "Freelancers", href: "/studio/team?tab=freelancers", icon: Briefcase },
        { name: "Attendance", href: "/studio/team?tab=attendance", icon: CheckSquare },
        { name: "Scheduling", href: "/studio/team?tab=scheduling", icon: CalendarDays },
      ]
    }] : []),
    {
      title: "ASSETS",
      items: [
        { name: "Equipment", href: "/studio/equipment", icon: Camera },
        { name: "Inventory", href: "/studio/equipment?tab=inventory", icon: Box },
        { name: "Asset Library", href: "/studio/equipment?tab=assets", icon: Archive },
      ]
    },
    {
      title: "MARKETING",
      items: [
        { name: "Marketing Hub", href: "/studio/marketing", icon: Megaphone },
        { name: "Reviews", href: "/studio/reviews", icon: Star },
        { name: "Social Links", href: "/studio/settings?tab=social", icon: Share2 },
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        { name: "Reports", href: "/studio/reports", icon: BarChart3 },
        { name: "Analytics", href: "/studio/reports?tab=analytics", icon: TrendingUp },
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
      title: "PLATFORM",
      items: [
        { name: "Apps", href: "/studio/apps", icon: Grid3X3 },
        { name: "Settings", href: "/studio/settings", icon: Settings },
        { name: "Security", href: "/studio/settings?tab=security", icon: Shield },
        { name: "Help Center", href: "/studio/settings?tab=help", icon: HelpCircle },
      ]
    }
  ]

  // On mobile: always full-width drawer, ignores `collapsed`
  // On desktop: respects `collapsed` for icon-only mode
  const isCollapsedDesktop = collapsed

  return (
    <aside
      className={[
        // Base
        "bg-white dark:bg-[#0A0A0F]",
        "border-r border-[#E5E7EB] dark:border-white/8",
        "text-gray-900 dark:text-gray-100",
        "flex flex-col h-screen",
        "fixed left-0 top-0",
        "overflow-hidden",
        "transition-all duration-300",
        "z-50 shadow-lg",

        // Mobile: slide drawer, always w-72
        "w-72 md:shadow-none",
        mobileOpen ? "translate-x-0" : "-translate-x-full",

        // Desktop: always visible, width depends on collapse state
        "md:translate-x-0",
        isCollapsedDesktop ? "md:w-16" : "md:w-64",
      ].join(" ")}
    >
      {/* Header / Logo */}
      <div className={`flex items-center h-[72px] shrink-0 border-b border-[#E5E7EB] dark:border-white/8 transition-all ${isCollapsedDesktop ? 'md:justify-center md:px-3 px-5' : 'justify-between px-5'}`}>
        <Link href="/" className="flex items-center gap-2" onClick={onMobileClose}>
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs">NX</span>
          </div>
          <div className={`flex flex-col leading-none ${isCollapsedDesktop ? 'md:hidden' : ''}`}>
            <span className="text-[#111827] dark:text-white font-black text-[14px] tracking-tight">nexus</span>
            <span className="text-[#4F46E5] font-bold text-[8px] tracking-widest uppercase">STUDIO</span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="md:hidden p-1.5 rounded-lg text-[#9CA3AF] hover:bg-[#F8FAFC] hover:text-[#374151] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop theme toggle (in header area on expanded state) */}
        {!isCollapsedDesktop && (
          <button
            onClick={toggleTheme}
            className="hidden md:flex w-7 h-7 rounded-lg bg-[#F8FAFC] dark:bg-white/8 items-center justify-center hover:bg-[#EEF2FF] dark:hover:bg-white/15 transition-colors shrink-0 cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#6B7280]" />}
          </button>
        )}
      </div>

      {/* Studio Profile Card */}
      <div className={`mx-3 mt-3 mb-1 p-3 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/8 rounded-2xl flex items-center gap-3 shrink-0 ${isCollapsedDesktop ? 'md:mx-2 md:px-2 md:justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm">
          C
        </div>
        <div className={`min-w-0 flex-1 ${isCollapsedDesktop ? 'md:hidden' : ''}`}>
          <div className="text-[13px] font-bold text-[#111827] dark:text-white leading-tight truncate">Creative Studio</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[9px] font-black text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded-full">PRO</span>
            <span className="text-[9px] text-[#22C55E] font-bold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full inline-block" />Verified
            </span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-4 space-y-4 mt-2">
        {categories.map((category) => (
          <div key={category.title} className="space-y-0.5">
            {!isCollapsedDesktop && (
              <div className="px-3 text-[9px] font-black tracking-widest text-[#9CA3AF] dark:text-gray-600 uppercase mb-1 md:block hidden">
                {category.title}
              </div>
            )}
            {/* Always show category title on mobile */}
            <div className={`px-3 text-[9px] font-black tracking-widest text-[#9CA3AF] dark:text-gray-600 uppercase mb-1 md:hidden`}>
              {category.title}
            </div>
            {category.items.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/studio" && pathname.startsWith(link.href.split("?")[0]))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onMobileClose}
                  title={isCollapsedDesktop ? link.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all group cursor-pointer ${
                    isActive
                      ? "bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-[#6B7280] dark:text-gray-400 hover:bg-[#F8FAFC] dark:hover:bg-white/5 hover:text-[#111827] dark:hover:text-white"
                  } ${isCollapsedDesktop ? 'md:justify-center' : ''}`}
                >
                  <link.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#4F46E5] dark:text-indigo-400" : "text-[#9CA3AF] dark:text-gray-500 group-hover:text-[#4F46E5]"}`} />
                  <span className={`truncate ${isCollapsedDesktop ? 'md:hidden' : ''}`}>{link.name}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer: theme + collapse toggle */}
      <div className={`p-3 border-t border-[#E5E7EB] dark:border-white/8 flex ${isCollapsedDesktop ? 'md:justify-center' : 'justify-between'} items-center shrink-0`}>
        {/* Mobile theme toggle */}
        <button
          onClick={toggleTheme}
          className="md:hidden w-7 h-7 rounded-lg bg-[#F8FAFC] dark:bg-white/8 flex items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#6B7280]" />}
        </button>

        {!isCollapsedDesktop && (
          <button
            onClick={toggleTheme}
            className="hidden md:flex w-7 h-7 rounded-lg bg-[#F8FAFC] dark:bg-white/8 items-center justify-center hover:bg-[#EEF2FF] transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#6B7280]" />}
          </button>
        )}

        {/* Desktop collapse toggle */}
        <button
          onClick={handleCollapseToggle}
          className="hidden md:flex w-7 h-7 rounded-lg bg-[#F8FAFC] dark:bg-white/8 items-center justify-center hover:bg-[#EEF2FF] dark:hover:bg-white/15 transition-colors text-[#6B7280] dark:text-gray-400 cursor-pointer"
          title={isCollapsedDesktop ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsedDesktop ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  )
}
