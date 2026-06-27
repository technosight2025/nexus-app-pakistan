"use client"

import React, { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Plus, MessageSquare, Bell, ChevronDown, LogOut,
  Calendar, Folder, Users, Receipt, Camera,
  X, Command, LayoutDashboard, Settings, HelpCircle, User,
  Menu, FileText
} from "lucide-react"

interface StudioHeaderProps {
  onMobileSidebarToggle?: () => void
}

export default function StudioHeader({ onMobileSidebarToggle }: StudioHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showQuickCreate, setShowQuickCreate] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setShowQuickCreate(false)
        setShowNotifications(false)
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const segments = pathname.replace("/studio", "").split("/").filter(Boolean)
  const breadcrumbs = [
    { label: "Studio", href: "/studio" },
    ...segments.map((seg, idx) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: "/studio/" + segments.slice(0, idx + 1).join("/")
    }))
  ]
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard"

  const quickCreateItems = [
    { label: "New Booking", icon: Calendar, href: "/studio/bookings?new=1" },
    { label: "New Quotation", icon: FileText, href: "/studio/quotations/new" },
    { label: "New Project", icon: Folder, href: "/studio/projects?new=1" },
    { label: "Add Contact", icon: Users, href: "/studio/contacts?new=1" },
    { label: "New Invoice", icon: Receipt, href: "/studio/finances?new=1" },
    { label: "Upload Portfolio", icon: Camera, href: "/studio/albums?new=1" },
    { label: "Invite Team Member", icon: Users, href: "/studio/team?new=1" },
  ]

  const notifications = [
    { id: 1, type: "Booking Request", message: "Fatima Khan requested a Walima shoot for Jan 18.", time: "5m ago", unread: true, color: "bg-[#4F46E5]" },
    { id: 2, type: "Payment Received", message: "PKR 85,000 received from Ahmed & Sara event.", time: "1h ago", unread: true, color: "bg-[#22C55E]" },
    { id: 3, type: "Deadline Alert", message: "Album delivery for Hamza Noor due tomorrow.", time: "3h ago", unread: true, color: "bg-[#F59E0B]" },
    { id: 4, type: "Team Update", message: "Usman marked today's attendance as present.", time: "6h ago", unread: false, color: "bg-[#0EA5E9]" },
    { id: 5, type: "Equipment Due", message: "Canon R5 rental return scheduled for Friday.", time: "1d ago", unread: false, color: "bg-[#EF4444]" },
  ]
  const unreadCount = notifications.filter(n => n.unread).length

  const closeAll = () => { setShowQuickCreate(false); setShowNotifications(false); setShowProfile(false) }

  return (
    <header
      ref={headerRef}
      className="w-full bg-white dark:bg-[#0A0A0F] border-b border-[#E5E7EB] dark:border-white/8 px-4 md:px-6 h-[60px] md:h-[68px] flex items-center justify-between transition-colors duration-300 shrink-0 sticky top-0 z-20"
    >
      {/* LEFT: Hamburger (mobile) + Breadcrumb / Title (desktop) */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMobileSidebarToggle}
          className="md:hidden w-9 h-9 rounded-xl border border-[#E5E7EB] dark:border-white/10 flex items-center justify-center text-[#6B7280] dark:text-gray-400 hover:bg-[#F8FAFC] dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title / breadcrumb */}
        <div className="flex flex-col justify-center min-w-0">
          {/* Desktop breadcrumb */}
          <nav className="hidden md:flex items-center gap-1.5 text-[10px] font-semibold text-[#9CA3AF]">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                {idx > 0 && <span>/</span>}
                <span
                  onClick={() => router.push(crumb.href)}
                  className={`cursor-pointer hover:text-[#4F46E5] transition-colors ${idx === breadcrumbs.length - 1 ? "text-[#111827] dark:text-white font-bold" : ""}`}
                >
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
          <h1 className="text-[15px] md:text-[16px] font-black text-[#111827] dark:text-white leading-tight truncate">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* CENTER: Desktop search */}
      <div className="hidden md:flex items-center relative w-[280px] lg:w-[380px]">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search clients, projects, bookings..."
          className="w-full pl-10 pr-14 py-2.5 text-[12px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchValue ? (
            <button onClick={() => setSearchValue("")} className="text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-white dark:bg-white/10 border border-[#E5E7EB] dark:border-white/10 rounded-md">
              <Command className="w-2.5 h-2.5 text-[#9CA3AF]" />
              <span className="text-[9px] font-bold text-[#9CA3AF]">K</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-2 md:gap-3">

        {/* Mobile search icon */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="md:hidden w-9 h-9 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-white/5 text-[#6B7280] flex items-center justify-center transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Quick Create (+) */}
        <div className="relative">
          <button
            onClick={() => { setShowQuickCreate(!showQuickCreate); setShowNotifications(false); setShowProfile(false) }}
            className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {showQuickCreate && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                className="absolute right-0 mt-2 w-[210px] bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl shadow-2xl py-2 z-50"
              >
                <div className="px-4 py-1.5 text-[9px] font-black text-[#9CA3AF] uppercase tracking-widest border-b border-[#F3F4F6] dark:border-white/5 mb-1">
                  Quick Create
                </div>
                {quickCreateItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { router.push(item.href); closeAll() }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 text-xs font-semibold text-[#374151] dark:text-gray-300 hover:text-[#4F46E5] transition-colors text-left cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 text-[#9CA3AF]" />
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowQuickCreate(false); setShowProfile(false) }}
            className="w-8 h-8 md:w-9 md:h-9 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-white/5 text-[#6B7280] dark:text-gray-400 flex items-center justify-center transition-colors cursor-pointer relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EF4444] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#0A0A0F] leading-none">
                {unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                className="absolute right-0 mt-2 w-[320px] md:w-[360px] bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="px-4 py-3 flex items-center justify-between border-b border-[#F3F4F6] dark:border-white/5">
                  <span className="text-xs font-black text-[#111827] dark:text-white uppercase tracking-widest">Notifications</span>
                  <button className="text-[10px] font-bold text-[#4F46E5] hover:underline cursor-pointer">Mark all read</button>
                </div>
                <div className="max-h-[300px] md:max-h-[340px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`flex gap-3 items-start px-4 py-3 hover:bg-[#F8FAFC] dark:hover:bg-white/3 cursor-pointer border-b border-[#F9FAFB] dark:border-white/3 last:border-0 transition-colors ${notif.unread ? "" : "opacity-60"}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.unread ? notif.color : "bg-transparent"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#4F46E5]">{notif.type}</span>
                          <span className="text-[9px] text-[#9CA3AF] shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-[#374151] dark:text-gray-300 leading-snug mt-0.5">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-[#F3F4F6] dark:border-white/5">
                  <button className="text-xs font-bold text-[#4F46E5] hover:underline w-full text-center cursor-pointer">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider – desktop only */}
        <div className="hidden md:block w-px h-7 bg-[#E5E7EB] dark:bg-white/10 shrink-0" />

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => { setShowProfile(!showProfile); setShowQuickCreate(false); setShowNotifications(false) }}
            className="flex items-center gap-2 cursor-pointer group select-none p-1 md:p-1.5 hover:bg-[#F8FAFC] dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white text-[13px] font-black shrink-0 shadow-sm">
              C
            </div>
            <div className="hidden lg:flex flex-col text-left leading-none">
              <span className="text-[12px] font-bold text-[#111827] dark:text-white group-hover:text-[#4F46E5] transition-colors">Creative Studio</span>
              <span className="text-[10px] text-[#9CA3AF] font-semibold mt-0.5">Owner</span>
            </div>
            <ChevronDown className="hidden md:block w-3.5 h-3.5 text-[#9CA3AF]" />
          </div>
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                className="absolute right-0 mt-2 w-[220px] md:w-[240px] bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/10 rounded-2xl shadow-2xl py-3 z-50"
              >
                <div className="px-4 pb-3 border-b border-[#F3F4F6] dark:border-white/5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-white font-black text-base mb-2">C</div>
                  <div className="text-sm font-bold text-[#111827] dark:text-white">Creative Studio</div>
                  <div className="text-[10px] text-[#9CA3AF]">studio@nexus.com</div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[8px] font-black text-[#4F46E5] bg-[#EEF2FF] px-2 py-0.5 rounded-full">PRO Plan</span>
                    <span className="text-[8px] font-black text-[#22C55E] bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">✓ Verified</span>
                  </div>
                </div>
                {[
                  { label: "Studio Dashboard", icon: LayoutDashboard, href: "/studio" },
                  { label: "Profile Settings", icon: User, href: "/studio/settings" },
                  { label: "Billing & Plans", icon: Receipt, href: "/studio/settings?tab=billing" },
                  { label: "Help Center", icon: HelpCircle, href: "/studio/settings?tab=help" },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => { router.push(item.href); closeAll() }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#EEF2FF] dark:hover:bg-indigo-500/10 text-xs font-semibold text-[#374151] dark:text-gray-300 hover:text-[#4F46E5] transition-colors text-left cursor-pointer"
                  >
                    <item.icon className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-[#F3F4F6] dark:bg-white/5 my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-black text-[#EF4444] uppercase tracking-widest transition-colors text-left cursor-pointer">
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile full-width search bar (slides down) */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0A0A0F] border-b border-[#E5E7EB] dark:border-white/8 px-4 py-3 z-30"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search clients, bookings, projects..."
                className="w-full pl-10 pr-10 py-2.5 text-[13px] font-semibold bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 rounded-xl text-[#111827] dark:text-white placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
              />
              <button onClick={() => { setShowMobileSearch(false); setSearchValue("") }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
