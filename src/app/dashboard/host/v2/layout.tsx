"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, CalendarRange, Wallet, Users, CalendarCheck,
  MessageSquare, CreditCard, Image as ImageIcon, Store, Settings,
  Bell, Search, Sparkles, Plus, X, Menu, ChevronLeft, ChevronRight,
  Clock, Heart, PanelLeftClose, PanelLeftOpen
} from "lucide-react"
import { NexusAIAssistant } from "@/components/dashboard/host/v2/NexusAIAssistant"
import { NexusDailyBriefing } from "@/components/dashboard/host/v2/NexusDailyBriefing"
import { LanguageProvider } from "@/components/dashboard/host/v2/LanguageContext"

// ─── Navigation Config ────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    label: "Overview",
    links: [
      { name: "Dashboard", href: "/dashboard/host/v2", icon: LayoutDashboard, exact: true },
      { name: "My Events", href: "/dashboard/host/v2/planning", icon: CalendarRange },
    ],
  },
  {
    label: "Planning",
    links: [
      { name: "Bookings", href: "/dashboard/host/v2/bookings", icon: CalendarCheck },
      { name: "Guests", href: "/dashboard/host/v2/guests", icon: Users },
      { name: "Budget", href: "/dashboard/host/v2/budget", icon: Wallet },
      { name: "Timeline", href: "/dashboard/host/v2/contracts", icon: Clock },
    ],
  },
  {
    label: "Connect",
    links: [
      { name: "Messages", href: "/dashboard/host/v2/messages", icon: MessageSquare },
      { name: "Saved Pros", href: "/dashboard/host/v2/vendor-hub", icon: Store },
    ],
  },
  {
    label: "Finance",
    links: [
      { name: "Payments", href: "/dashboard/host/v2/payments", icon: CreditCard },
    ],
  },
  {
    label: "Memories",
    links: [
      { name: "Event Memories", href: "/dashboard/host/v2/memories", icon: ImageIcon },
    ],
  },
  {
    label: "Account",
    links: [
      { name: "Settings", href: "/dashboard/host/v2/settings", icon: Settings },
    ],
  },
]

const MOBILE_NAV = [
  { name: "Home", href: "/dashboard/host/v2", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/host/v2/planning", icon: CalendarRange },
  { name: "Budget", href: "/dashboard/host/v2/budget", icon: Wallet },
  { name: "Guests", href: "/dashboard/host/v2/guests", icon: Users },
  { name: "Messages", href: "/dashboard/host/v2/messages", icon: MessageSquare },
]

// ─── Page Title Map ───────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  "/dashboard/host/v2": "Dashboard",
  "/dashboard/host/v2/planning": "My Events",
  "/dashboard/host/v2/bookings": "Bookings",
  "/dashboard/host/v2/guests": "Guest Management",
  "/dashboard/host/v2/budget": "Budget Tracker",
  "/dashboard/host/v2/contracts": "Timeline",
  "/dashboard/host/v2/messages": "Messages",
  "/dashboard/host/v2/memories": "Event Memories",
  "/dashboard/host/v2/vendor-hub": "Saved Professionals",
  "/dashboard/host/v2/payments": "Payments",
  "/dashboard/host/v2/settings": "Settings",
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

function Sidebar({
  isCollapsed,
  onToggleCollapse,
  onClose,
  isMobileOpen,
}: {
  isCollapsed: boolean
  onToggleCollapse: () => void
  onClose: () => void
  isMobileOpen: boolean
}) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-50 flex flex-col
        bg-gradient-to-b from-[#1e1b4b] via-[#252060] to-[#312E81]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-[70px]" : "w-[260px]"}
        hidden lg:flex
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 h-16 shrink-0 border-b border-white/10 ${isCollapsed ? "justify-center px-0" : ""}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#f0d060] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span className="text-white font-bold text-[17px] tracking-tight whitespace-nowrap font-poppins">
                Nexus Events
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Sections */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="px-3 mb-1">
            {!isCollapsed && (
              <p className="text-indigo-400/60 text-[9px] font-bold uppercase tracking-[0.12em] px-2 mb-1.5">
                {section.label}
              </p>
            )}
            {section.links.map((link) => {
              const active = isActive(link.href, link.exact)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  title={isCollapsed ? link.name : undefined}
                  className={`
                    flex items-center gap-3 rounded-xl mb-0.5 transition-all duration-150
                    ${isCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-3 py-2.5"}
                    ${active
                      ? "bg-white/15 text-white shadow-sm border border-white/10"
                      : "text-indigo-200/80 hover:bg-white/8 hover:text-white"
                    }
                  `}
                >
                  <div className={`relative shrink-0 ${active ? "" : ""}`}>
                    <link.icon className={`w-4.5 h-4.5 ${active ? "text-[#D4AF37]" : ""}`} style={{ width: 18, height: 18 }} />
                    {active && (
                      <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                    )}
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`text-[13px] font-medium whitespace-nowrap ${active ? "text-white font-semibold" : ""}`}
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User Card */}
      {!isCollapsed && (
        <div className="mx-3 mb-3 p-3 bg-white/8 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-white text-[12px] font-semibold leading-tight truncate">Zoya & Ahmed</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Heart className="w-2.5 h-2.5 text-[#D4AF37]" />
                <p className="text-indigo-300 text-[10px] font-medium truncate">145 days to go</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCollapsed && (
        <div className="flex justify-center mb-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#D4AF37]/50">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#312E81] border border-indigo-400/30 rounded-full flex items-center justify-center shadow-lg hover:bg-[#4338ca] transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-white" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-white" />
        )}
      </button>
    </aside>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-[280px] z-50 lg:hidden flex flex-col bg-gradient-to-b from-[#1e1b4b] via-[#252060] to-[#312E81]"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#f0d060] rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-[17px] tracking-tight font-poppins">Nexus Events</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 space-y-1 [&::-webkit-scrollbar]:hidden">
              {NAV_SECTIONS.map((section) => (
                <div key={section.label} className="px-3 mb-1">
                  <p className="text-indigo-400/60 text-[9px] font-bold uppercase tracking-[0.12em] px-2 mb-1.5">
                    {section.label}
                  </p>
                  {section.links.map((link) => {
                    const active = isActive(link.href, link.exact)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all ${
                          active
                            ? "bg-white/15 text-white border border-white/10"
                            : "text-indigo-200/80 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        <link.icon className={`w-[18px] h-[18px] ${active ? "text-[#D4AF37]" : ""}`} />
                        <span className={`text-[13px] font-medium ${active ? "font-semibold text-white" : ""}`}>{link.name}</span>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>

            {/* User Card */}
            <div className="mx-3 mb-4 p-3 bg-white/8 border border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37]/50">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold">Zoya & Ahmed</p>
                  <div className="flex items-center gap-1">
                    <Heart className="w-2.5 h-2.5 text-[#D4AF37]" />
                    <p className="text-indigo-300 text-[10px]">145 days to go ✨</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Top Header ───────────────────────────────────────────────────────────────

function TopHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname()
  const pageTitle = PAGE_TITLES[pathname] ?? "Dashboard"
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifications] = useState(3)

  return (
    <header className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center px-4 lg:px-6 gap-4 shrink-0 sticky top-0 z-30 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      {/* Mobile: Hamburger + Logo */}
      <button
        className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        onClick={onMenuOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page Title */}
      <div className="hidden lg:block">
        <h1 className="text-[15px] font-bold text-[#111827]">{pageTitle}</h1>
      </div>

      {/* Mobile: Logo */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-[#D4AF37] to-[#f0d060] rounded-lg flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-[15px] text-[#111827] font-poppins">Nexus</span>
      </div>

      {/* Search */}
      <div className={`flex-1 max-w-md relative hidden md:flex items-center`}>
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search vendors, tasks, guests..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full pl-9 pr-4 py-2 bg-gray-50 border rounded-xl text-[13px] text-gray-700 placeholder-gray-400 outline-none transition-all ${
            searchFocused
              ? "border-[#312E81] bg-white ring-3 ring-[#312E81]/10"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
      </div>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Create Event */}
        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#312E81] text-white text-[12px] font-semibold rounded-xl hover:bg-[#4338ca] transition-colors shadow-sm shadow-indigo-900/20">
          <Plus className="w-3.5 h-3.5" />
          <span>New Event</span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
          <Bell className="w-4 h-4 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center text-[9px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-[#312E81]/20 cursor-pointer hover:border-[#312E81]/50 transition-colors">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}

// ─── Mobile Bottom Navigation ─────────────────────────────────────────────────

function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center h-16">
        {MOBILE_NAV.map((item) => {
          const isActive = item.href === "/dashboard/host/v2"
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${
                isActive ? "text-[#312E81]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className={`text-[9px] font-semibold ${isActive ? "text-[#312E81]" : ""}`}>{item.name}</span>
              {isActive && <span className="absolute bottom-0 w-8 h-0.5 bg-[#312E81] rounded-t-full" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function HostV2Layout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased">

        {/* Desktop Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
          onClose={() => {}}
          isMobileOpen={false}
        />

        {/* Mobile Drawer */}
        <MobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Wrapper */}
        <div
          className={`
            flex flex-col min-h-screen transition-all duration-300
            ${sidebarCollapsed ? "lg:ml-[70px]" : "lg:ml-[260px]"}
          `}
        >
          {/* Top Header */}
          <TopHeader onMenuOpen={() => setMobileMenuOpen(true)} />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden pb-20 lg:pb-0">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Floating AI Panels */}
        <NexusDailyBriefing />
        <NexusAIAssistant />
      </div>
    </LanguageProvider>
  )
}
