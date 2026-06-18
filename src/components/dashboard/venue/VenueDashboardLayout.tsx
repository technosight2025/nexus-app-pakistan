"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, CalendarCheck, CalendarDays, Users, 
  UserCircle, FileText, Building2, Package, Wrench, 
  UserSquare2, Box, MonitorPlay, Image as ImageIcon, 
  BarChart3, Settings, Menu, X, Bell, Search, Plus, ChevronRight, Sparkles, Contact, MessageSquare, Store, LayoutGrid
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NexusBusinessAI } from "./NexusBusinessAI"
import VenueDashboardTutorial from "./VenueDashboardTutorial"

const MENU_ITEMS = [
  { name: "Nexus Apps", icon: LayoutGrid, href: "/dashboard/vendor/nexus-apps" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/vendor" },
  { name: "Bookings", icon: CalendarCheck, href: "/dashboard/vendor/bookings" },
  { name: "Calendar", icon: CalendarDays, href: "/dashboard/vendor/calendar" },
  { name: "Leads", icon: Users, href: "/dashboard/vendor/leads" },
  { name: "Contacts", icon: Contact, href: "/dashboard/vendor/contacts" },
  { name: "Quotations", icon: FileText, href: "/dashboard/vendor/quotations" },
  { name: "Halls & Spaces", icon: Building2, href: "/dashboard/vendor/halls" },
  { name: "Products & Services", icon: Package, href: "/dashboard/products" },
  { name: "Assets", icon: Box, href: "/dashboard/vendor/assets" },
  { name: "Displays", icon: MonitorPlay, href: "/dashboard/vendor/displays" },
  { name: "Reports", icon: BarChart3, href: "/dashboard/vendor/reports" },
  { name: "Profile Maker", icon: Store, href: "/dashboard/vendor/profile-maker" },
  { name: "Settings", icon: Settings, href: "/dashboard/vendor/settings" },
]

export function VenueDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)

  const [showNotifications, setShowNotifications] = useState(false)
  const hasOpenedNotifications = useRef(false)
  const [showMessageToast, setShowMessageToast] = useState(false)
  const [installedApps, setInstalledApps] = useState<string[]>(['displays', 'rental', 'accounting'])

  useEffect(() => {
    const stored = localStorage.getItem("nexus_vendor_apps")
    if (stored) {
      try {
        setInstalledApps(JSON.parse(stored))
      } catch (e) {}
    } else {
      localStorage.setItem("nexus_vendor_apps", JSON.stringify(['displays', 'rental', 'accounting']))
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem("nexus_vendor_apps")
      if (updated) {
        try {
          setInstalledApps(JSON.parse(updated))
        } catch (e) {}
      }
    }
    window.addEventListener("nexus_vendor_apps_changed", handleStorageChange)
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("nexus_vendor_apps_changed", handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const filteredMenuItems = MENU_ITEMS.filter(item => {
    if (item.name === "Displays") {
      return installedApps.includes("displays")
    }
    if (item.name === "Assets") {
      return installedApps.includes("rental")
    }
    if (item.name === "Reports") {
      return installedApps.includes("accounting")
    }
    return true
  })

  useEffect(() => {
    // Notifications and toasts are now manual-only (click the bell icon)
  }, [])

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    let hideTimer: NodeJS.Timeout
    if (showMessageToast) {
      hideTimer = setTimeout(() => {
        setShowMessageToast(false)
      }, 5000)
    }
    return () => {
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [showMessageToast])

  const handleToggleNotifications = () => {
    hasOpenedNotifications.current = true
    setShowNotifications(!showNotifications)
  }

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Lead from Sarah", desc: "Wedding event on Dec 15 for Grand Ballroom", time: "5m ago", read: false, type: "lead" },
    { id: 2, title: "Payment Received", desc: "Rs: 250,000 advance via Bank Transfer", time: "1h ago", read: false, type: "finance" },
    { id: 3, title: "New Message", desc: "Kamran Ali: 'Is the hall available on...'", time: "2h ago", read: true, type: "message" },
  ])
  
  const unreadCount = notifications.filter(n => !n.read).length
  const markAllAsRead = () => setNotifications(notifications.map(n => ({...n, read: true})))
  const markAsRead = (id: number) => setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n))

  const showFullSidebar = !isDesktopCollapsed || isHovered

  const pathname = usePathname()
  const pathSegments = pathname?.split('/').filter(Boolean) || []
  
  // Generate breadcrumbs mapping
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    return { name: segment, href }
  })

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Inject Tutorial Wizard */}
      <VenueDashboardTutorial />

      {/* Mobile Header */}
      <div className="md:hidden flex flex-col bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsAIOpen(true)} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200" />
          </div>
        </div>
        {/* Mobile Breadcrumbs */}
        <div className="flex items-center gap-1.5 px-4 pb-3 text-[11px] font-bold text-slate-400 capitalize overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {breadcrumbs.map((crumb, idx) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link href={crumb.href} className={`hover:text-slate-900 transition-colors ${idx === breadcrumbs.length - 1 ? 'text-primary' : ''}`}>
                {crumb.name.replace('-', ' ')}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Desktop Topbar */}
        <header id="tour-venue-topbar" className="hidden md:flex h-16 bg-white border-b border-border items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <span className="font-black text-xl tracking-tight text-[#0A3B2A]">NEXUS <span className="text-primary">OS</span></span>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end max-w-xl ml-4">
            <div className="relative w-full max-w-sm hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
              />
            </div>
            <Button variant="outline" className="hidden lg:flex gap-2 rounded-xl h-10 border-border shadow-sm">
              <Plus className="w-4 h-4" /> Quick Action
            </Button>
            <div className="relative flex items-center gap-2">
              <button onClick={() => setIsAIOpen(true)} className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform" title="Nexus Business AI">
                <Sparkles className="w-4 h-4" />
              </button>
              <button onClick={handleToggleNotifications} className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]/50">
                      <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-[10px] uppercase tracking-wider font-bold text-primary hover:text-primary/80 transition-colors">Mark all as read</button>
                      )}
                    </div>
                    <div className="max-h-[320px] overflow-y-auto hide-scrollbar">
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                          {notifications.map(n => (
                            <div 
                              key={n.id} 
                              onClick={() => markAsRead(n.id)}
                              className={`p-4 hover:bg-[#FAF8F5] cursor-pointer transition-colors flex gap-3 ${!n.read ? 'bg-primary/5' : ''}`}
                            >
                              <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? 'bg-primary' : 'bg-transparent'}`} />
                              <div>
                                <p className={`text-sm ${!n.read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{n.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{n.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-slate-500 text-sm">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-[#FAF8F5] border-t border-slate-100 text-center">
                      <Link href="/dashboard/vendor/settings" onClick={() => setShowNotifications(false)} className="text-[10px] uppercase tracking-wider font-bold text-slate-500 hover:text-slate-900 transition-colors">Notification Settings</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 ml-2" />
          </div>
        </header>

        {/* Secondary Breadcrumbs Strip */}
        <div className="hidden md:flex bg-[#FAF8F5] border-b border-slate-100 px-8 py-2.5 items-center gap-2 text-xs font-bold text-slate-400 capitalize select-none shrink-0 text-left">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <Link href={crumb.href} className={`hover:text-slate-900 transition-colors ${idx === breadcrumbs.length - 1 ? 'text-slate-900 font-extrabold' : ''}`}>
                {crumb.name.replace('-', ' ')}
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#FAF8F5] p-4 md:p-8">
          {children}
        </main>
      </div>

      <AnimatePresence>
        {showMessageToast && !showNotifications && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-6 right-6 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-slate-100 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-4 z-[100] border border-slate-700 cursor-pointer max-w-sm w-full"
            onClick={() => {
              setShowMessageToast(false)
              handleToggleNotifications()
            }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">New Message Received</p>
              <p className="text-xs text-slate-400 mt-0.5">Kamran Ali: 'Is the hall available on...'</p>
            </div>
            <button 
              className="ml-auto p-2 -mr-2 -mt-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setShowMessageToast(false)
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global AI Assistant Panel */}
      <NexusBusinessAI isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

    </div>
  )
}
