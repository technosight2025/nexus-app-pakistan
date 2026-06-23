"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, Activity, Bell, CalendarDays, Inbox, CheckCircle, 
  AlertCircle, ListOrdered, Calendar as CalendarIcon, Play, CheckSquare, 
  GitCommit, UserCheck, Users, BookOpen, MessageSquare, FileText, 
  Package, Receipt, Wallet, Building2, Map, Sliders, DollarSign, 
  Clock, Sparkles, Wrench, ShieldAlert, User, Coins, Tv, MonitorPlay, 
  Camera, Paintbrush, ChefHat, Music, BarChart3, PieChart, TrendingUp, 
  Star, AppWindow, Settings, Key, CreditCard, ChevronDown, ChevronLeft, Search, QrCode,
  Menu, X, Sparkle, MessageSquareCode, Globe
} from "lucide-react"

export default function VenueOSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [installedApps, setInstalledApps] = useState<string[]>(['accounting', 'workforce', 'ai_helper'])
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)
  
  React.useEffect(() => {
    const storedSidebar = localStorage.getItem("nexus_venue_sidebar_open")
    if (storedSidebar !== null) {
      setDesktopSidebarOpen(storedSidebar === "true")
    }
  }, [])

  const handleToggleDesktopSidebar = () => {
    setDesktopSidebarOpen(prev => {
      const nextState = !prev
      localStorage.setItem("nexus_venue_sidebar_open", String(nextState))
      return nextState
    })
  }

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    OVERVIEW: true,
    BOOKINGS: true,
    EVENTS: true,
    "CUSTOMERS (CRM)": false,
    SALES: false,
    "VENUE MANAGEMENT": false,
    OPERATIONS: false,
    STAFF: false,
    DISPLAYS: false,
    VENDORS: false,
    ANALYTICS: false,
    APPS: false,
    SETTINGS: false
  })

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => ({ ...prev, [title]: !prev[title] }))
  }

  React.useEffect(() => {
    const stored = localStorage.getItem("nexus_venue_apps")
    if (stored) {
      try {
        setInstalledApps(JSON.parse(stored))
      } catch (e) {}
    } else {
      localStorage.setItem("nexus_venue_apps", JSON.stringify(['accounting', 'workforce', 'ai_helper']))
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem("nexus_venue_apps")
      if (updated) {
        try {
          setInstalledApps(JSON.parse(updated))
        } catch (e) {}
      }
    }
    window.addEventListener("nexus_venue_apps_changed", handleStorageChange)
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("nexus_venue_apps_changed", handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  React.useEffect(() => {
    const activeCat = filteredCategories.find(category => 
      category.items.some(link => checkActive(link.href))
    )
    if (activeCat) {
      setExpandedCategories(prev => ({
        ...prev,
        [activeCat.title]: true
      }))
    }
  }, [pathname, installedApps])

  // Mock branches for selector
  const branches = [
    { id: "main", name: "Royal Garden Banquet", branch: "Main Branch", active: true },
    { id: "lahore", name: "Shalimar Gardens", branch: "Lahore Branch", active: false },
    { id: "islamabad", name: "Serena Hall", branch: "Islamabad Branch", active: false },
  ]

  const activeBranch = branches.find(b => b.active) || branches[0]

  // Left Sidebar category configuration
  const sidebarCategories = [
    {
      title: "OVERVIEW",
      items: [
        { name: "Dashboard", href: "/business/venues", icon: LayoutDashboard },
        { name: "Activity Feed", href: "/business/venues/activity", icon: Activity },
        { name: "Notifications", href: "/business/venues/notifications", icon: Bell, badge: 6 },
      ]
    },
    {
      title: "BOOKINGS",
      items: [
        { name: "Calendar", href: "/business/venues/calendar", icon: CalendarDays },
        { name: "Booking Requests", href: "/business/venues/bookings?tab=requests", icon: Inbox, badge: 12 },
        { name: "Confirmed Events", href: "/business/venues/bookings?tab=confirmed", icon: CheckCircle },
        { name: "Tentative Bookings", href: "/business/venues/bookings?tab=tentative", icon: AlertCircle },
        { name: "Waiting List", href: "/business/venues/bookings?tab=waiting", icon: ListOrdered, badge: 3 },
      ]
    },
    {
      title: "EVENTS",
      items: [
        { name: "Upcoming Events", href: "/business/venues/events", icon: CalendarIcon },
        { name: "Active Events", href: "/business/venues/events?tab=active", icon: Play },
        { name: "Completed Events", href: "/business/venues/events?tab=completed", icon: CheckSquare },
        { name: "Event Timeline", href: "/business/venues/events?tab=timeline", icon: GitCommit },
      ]
    },
    {
      title: "CUSTOMERS (CRM)",
      items: [
        { name: "Leads", href: "/business/venues/leads", icon: UserCheck },
        { name: "Customers", href: "/business/venues/leads?tab=customers", icon: Users },
        { name: "Guest Lists", href: "/business/venues/leads?tab=guests", icon: BookOpen },
        { name: "Messages", href: "/business/venues/messages", icon: MessageSquare, badge: 1 },
      ]
    },
    {
      title: "SALES",
      items: [
        { name: "Quotations", href: "/business/venues/quotes", icon: FileText },
        { name: "Packages", href: "/business/venues/quotes?tab=packages", icon: Package },
        { name: "Invoices", href: "/business/venues/quotes?tab=invoices", icon: Receipt },
        { name: "Payments", href: "/business/venues/quotes?tab=payments", icon: Wallet },
      ]
    },
    {
      title: "VENUE MANAGEMENT",
      items: [
        { name: "Halls & Areas", href: "/business/venues/halls", icon: Building2 },
        { name: "Capacity Management", href: "/business/venues/halls?tab=capacity", icon: Map },
        { name: "Pricing & Availability", href: "/business/venues/halls?tab=pricing", icon: Sliders },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { name: "Tasks", href: "/business/venues/operations", icon: CheckSquare },
        { name: "Checklists", href: "/business/venues/operations?tab=checklists", icon: CheckCircle },
        { name: "Maintenance", href: "/business/venues/operations?tab=maintenance", icon: Wrench },
        { name: "Housekeeping", href: "/business/venues/operations?tab=housekeeping", icon: Sparkles },
        { name: "Security", href: "/business/venues/operations?tab=security", icon: ShieldAlert },
      ]
    },
    {
      title: "STAFF",
      items: [
        { name: "Employees", href: "/business/venues/staff", icon: User },
        { name: "Attendance", href: "/business/venues/staff?tab=attendance", icon: CalendarIcon },
        { name: "Scheduling", href: "/business/venues/staff?tab=schedule", icon: Clock },
        { name: "Daily Wagers", href: "/business/venues/staff?tab=wagers", icon: Coins },
      ]
    },
    {
      title: "DISPLAYS",
      items: [
        { name: "Signage Screens", href: "/business/venues/displays", icon: Tv },
      ]
    },
    {
      title: "VENDORS",
      items: [
        { name: "Vendor Network", href: "/business/venues/vendors", icon: Sparkles },
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        { name: "Analytics Desk", href: "/business/venues/analytics", icon: BarChart3 },
      ]
    },
    {
      title: "APPS",
      items: [
        { name: "App Marketplace", href: "/business/venues/apps", icon: AppWindow },
      ]
    },
    {
      title: "SETTINGS",
      items: [
        { name: "Public Profile", href: "/business/venues/profile", icon: Globe },
        { name: "Settings OS", href: "/business/venues/settings", icon: Settings },
      ]
    }
  ]

  const checkActive = (href: string) => {
    const cleanPath = pathname.split("?")[0]
    const cleanHref = href.split("?")[0]
    return cleanPath === cleanHref
  }

  const filteredCategories = sidebarCategories.map(category => {
    if (category.title === "SALES") {
      const items = [...category.items]
      const hasAccounting = items.some(item => item.name === "Accounting Pro")
      if (installedApps.includes("accounting") && !hasAccounting) {
        items.push({ name: "Accounting Pro", href: "/business/venues/accounting", icon: Wallet })
      }
      return { ...category, items }
    }
    if (category.title === "STAFF") {
      if (!installedApps.includes("workforce")) {
        return null
      }
    }
    if (category.title === "DISPLAYS") {
      if (!installedApps.includes("displays")) {
        return null
      }
    }

    return category
  }).filter(Boolean) as typeof sidebarCategories

  const segmentLabels: Record<string, string> = {
    venues: "Venue OS",
    accounting: "Accounting Pro",
    calendar: "Calendar",
    halls: "Halls & Areas",
    leads: "Leads & CRM",
    quotes: "Quotations & Invoices",
    events: "Events OS",
    operations: "Operations Desk",
    staff: "Staff & Wages",
    displays: "Displays OS",
    vendors: "Vendor Network",
    apps: "App Store",
    settings: "Settings",
    activity: "Activity Feed",
    notifications: "Notification Logs"
  }

  const pathSegments = pathname.split("/").filter(s => s && s !== "business")
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/business/" + pathSegments.slice(0, index + 1).join("/")
    const label = segmentLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const isLast = index === pathSegments.length - 1
    return { href, label, isLast }
  })

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-900 font-sans flex transition-colors duration-300">
      
      {/* 1. Sidebar Component (Desktop) */}
      <aside className={`bg-[#FAF7F2] border-r border-[#ECE7DF] flex flex-col h-screen fixed left-0 top-0 overflow-hidden shrink-0 z-30 hidden md:flex transition-all duration-300 ${
        desktopSidebarOpen ? "w-64" : "w-0 border-r-0"
      }`}>
        {/* Brand header */}
        <div className="p-6 pb-4 flex items-center justify-between shrink-0">
          <Link href="/business/venues" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-[#0F5B3E]" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 3.8l6.9 13.8H5.1L12 5.8z" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-[#1F2937] font-extrabold text-[16px] tracking-tight">NEXUS</span>
              <span className="text-[#0F5B3E] font-bold text-[9px] tracking-widest uppercase mt-0.5">VENUE OS</span>
            </div>
          </Link>
          <button 
            onClick={handleToggleDesktopSidebar}
            type="button"
            className="w-7 h-7 bg-gray-50 border border-[#ECE7DF] hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors hidden md:flex"
            title="Collapse Sidebar"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Sidebar link tree list */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 pb-6 space-y-4 pt-2">
          {filteredCategories.map((category) => {
            const isExpanded = !!expandedCategories[category.title]
            return (
              <div key={category.title} className="space-y-0.5">
                <button 
                  onClick={() => toggleCategory(category.title)}
                  type="button"
                  className="w-full px-3 py-1 flex items-center justify-between text-[9.5px] font-black tracking-wider text-gray-450 hover:text-gray-955 uppercase mb-1 cursor-pointer transition-colors"
                >
                  <span>{category.title}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                    isExpanded ? "transform rotate-0" : "transform -rotate-90"
                  }`} />
                </button>
                {isExpanded && (
                  <div className="space-y-0.5 animate-in fade-in duration-200">
                    {category.items.map((link) => {
                      const isActive = checkActive(link.href)
                      return (
                        <Link 
                          key={link.name} 
                          href={link.href}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                            isActive 
                              ? "bg-[#E6F0EC] text-[#0F5B3E] shadow-sm" 
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <link.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0F5B3E]" : "text-gray-400"}`} />
                            <span>{link.name}</span>
                          </div>
                          {link.badge && (
                            <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-md ${
                              isActive 
                                ? "bg-[#0F5B3E] text-white" 
                                : "bg-200/80 text-gray-600"
                            }`}>
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {/* 2. Slide-out Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay backdrop */}
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />
          {/* Drawer content panel */}
          <aside className="relative flex flex-col w-64 bg-[#FAF7F2] border-r border-[#ECE7DF] h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-5 flex justify-between items-center border-b border-[#ECE7DF]/50 shrink-0">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0F5B3E]" fill="currentColor">
                  <path d="M12 2L2 22h20L12 2zm0 3.8l6.9 13.8H5.1L12 5.8z" />
                </svg>
                <span className="font-extrabold text-sm tracking-tight text-gray-900">NEXUS VENUE OS</span>
              </div>
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
              {filteredCategories.map((category) => {
                const isExpanded = !!expandedCategories[category.title]
                return (
                  <div key={category.title} className="space-y-0.5">
                    <button 
                      onClick={() => toggleCategory(category.title)}
                      type="button"
                      className="w-full px-3 py-1 flex items-center justify-between text-[9.5px] font-black tracking-wider text-gray-455 hover:text-gray-950 uppercase mb-1 cursor-pointer transition-colors"
                    >
                      <span>{category.title}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "transform rotate-0" : "transform -rotate-90"
                      }`} />
                    </button>
                    {isExpanded && (
                      <div className="space-y-0.5 animate-in fade-in duration-200">
                        {category.items.map((link) => {
                          const isActive = checkActive(link.href)
                          return (
                            <Link 
                              key={link.name} 
                              href={link.href}
                              onClick={() => setMobileSidebarOpen(false)}
                              className={`flex items-center justify-between px-3 py-2 rounded-xl text-[12px] font-bold transition-all ${
                                isActive 
                                  ? "bg-[#E6F0EC] text-[#0F5B3E]" 
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <link.icon className="w-4 h-4 text-gray-400" />
                                <span>{link.name}</span>
                              </div>
                              {link.badge && (
                                <span className="text-[8.5px] font-extrabold px-1.5 py-0.5 bg-gray-200/80 text-gray-600 rounded-md">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>
        </div>
      )}

      {/* 3. Main Shell Content Body */}
      <div className={`flex-1 flex flex-col min-w-0 pb-20 md:pb-6 transition-all duration-300 ${
        desktopSidebarOpen ? "md:pl-64" : "md:pl-0"
      }`}>
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#ECE7DF] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs shrink-0 select-none">
          <div className="flex items-center gap-1.5 xs:gap-3">
            {/* Hamburger Toggle */}
            <button 
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileSidebarOpen(true)
                } else {
                  handleToggleDesktopSidebar()
                }
              }}
              type="button"
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Branch Switcher Selector */}
            <div className="relative">
              <div 
                onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 border border-transparent hover:border-[#ECE7DF] rounded-xl cursor-pointer transition-all duration-200"
              >
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[13.5px] font-black text-gray-950 flex items-center gap-1">
                    <span className="truncate max-w-[85px] xs:max-w-[140px] sm:max-w-[200px] md:max-w-none">{activeBranch.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F5B3E] shrink-0" />
                    <span className="truncate max-w-[85px] xs:max-w-[140px] sm:max-w-[200px] md:max-w-none">{activeBranch.branch}</span>
                  </span>
                </div>
              </div>

              {showBranchDropdown && (
                <div className="absolute top-full left-0 mt-1.5 w-60 bg-white border border-[#ECE7DF] rounded-xl shadow-lg overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-1">
                  {branches.map(branch => (
                    <button
                      key={branch.id}
                      onClick={() => {
                        branches.forEach(b => b.active = (b.id === branch.id))
                        setShowBranchDropdown(false)
                      }}
                      className={`w-full p-3 text-left hover:bg-gray-50 flex flex-col transition-colors border-l-2 ${
                        branch.id === activeBranch.id ? "border-[#0F5B3E] bg-[#E6F0EC]/20" : "border-transparent"
                      }`}
                    >
                      <span className="text-[12px] font-bold text-gray-900">{branch.name}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{branch.branch}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Search bar & utility icons right side */}
          <div className="flex items-center gap-1.5 xs:gap-3">
            {/* Global Search Bar (Desktop) */}
            <div className="relative w-64 hidden lg:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search events, bookings, customers..." 
                className="w-full pl-9 pr-8 py-1.5 bg-[#FAF7F2] border border-[#ECE7DF] rounded-xl text-[11px] font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0F5B3E] focus:ring-1 focus:ring-[#0F5B3E]/30"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-400 bg-white border border-[#ECE7DF] px-1 py-0.5 rounded-md pointer-events-none">
                ⌘K
              </span>
            </div>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="h-8.5 px-2 sm:px-3 bg-[#FAF8F5] border border-[#C9A227]/40 hover:bg-[#FAF7F2] text-[#C9A227] hover:text-[#b08e20] rounded-xl font-bold text-[11.5px] transition-all flex items-center gap-1 shrink-0"
              >
                <span>⚡</span>
                <span className="hidden xs:inline">Quick Actions</span>
                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
              </button>

              {showQuickActions && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-[#ECE7DF] rounded-xl shadow-lg overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-1 text-left">
                  <Link href="/business/venues/calendar" onClick={() => setShowQuickActions(false)} className="w-full px-4 py-2 hover:bg-gray-50 text-[11px] font-bold text-gray-800 flex items-center gap-2">
                    <PlusIcon className="w-3.5 h-3.5 text-gray-400" /> New Booking
                  </Link>
                  <Link href="/business/venues/quotes" onClick={() => setShowQuickActions(false)} className="w-full px-4 py-2 hover:bg-gray-50 text-[11px] font-bold text-gray-800 flex items-center gap-2">
                    <PlusIcon className="w-3.5 h-3.5 text-gray-400" /> New Quotation
                  </Link>
                  <Link href="/business/venues/events" onClick={() => setShowQuickActions(false)} className="w-full px-4 py-2 hover:bg-gray-50 text-[11px] font-bold text-gray-800 flex items-center gap-2">
                    <PlusIcon className="w-3.5 h-3.5 text-gray-400" /> New Event
                  </Link>
                  <Link href="/business/venues/leads" onClick={() => setShowQuickActions(false)} className="w-full px-4 py-2 hover:bg-gray-50 text-[11px] font-bold text-gray-800 flex items-center gap-2">
                    <PlusIcon className="w-3.5 h-3.5 text-gray-400" /> New Customer
                  </Link>
                </div>
              )}
            </div>

            {/* Chat Icon */}
            <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors shrink-0">
              <MessageSquareCode className="w-4.5 h-4.5" />
            </button>

            {/* Notifications Button with count */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors shrink-0 relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D9467A] rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-[#ECE7DF] rounded-xl shadow-lg overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-1 text-left">
                  <div className="px-4 py-2 border-b border-[#ECE7DF]/50 flex justify-between items-center">
                    <span className="text-[11px] font-extrabold text-gray-900 uppercase">Alerts & Notifications</span>
                    <span className="text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-full font-bold">6 Unread</span>
                  </div>
                  <div className="divide-y divide-gray-50 text-[11px]">
                    <div className="p-3 hover:bg-gray-50 flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900">New booking request received</span>
                      <span className="text-[9.5px] text-gray-400 font-semibold">Ahmed Wedding • 2 minutes ago</span>
                    </div>
                    <div className="p-3 hover:bg-gray-50 flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900">Payment received</span>
                      <span className="text-[9.5px] text-gray-400 font-semibold">Rs. 50,000 for Hassan Walima • 1 hour ago</span>
                    </div>
                    <div className="p-3 hover:bg-gray-50 flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900">Event timeline updated</span>
                      <span className="text-[9.5px] text-gray-400 font-semibold">Ahmed & Fatima Wedding • 2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Assistant Button */}
            <button className="h-8.5 px-2 sm:px-3 bg-[#0F5B3E] hover:bg-[#0A3B2A] text-white rounded-xl font-bold text-[11px] transition-all flex items-center gap-1.5 shadow-sm shrink-0">
              <Sparkle className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden xs:inline">AI Assistant</span>
            </button>

            {/* User Profile Card */}
            <div className="flex items-center gap-2 border-l border-[#ECE7DF] pl-3 shrink-0">
              <img className="w-8 h-8 rounded-full object-cover border border-[#ECE7DF]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="Usman Khan" />
              <div className="flex flex-col text-left leading-none hidden sm:block">
                <span className="text-[12px] font-black text-gray-900">Usman Khan</span>
                <span className="text-[9px] text-gray-400 font-bold mt-0.5">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Secondary Breadcrumbs Strip */}
        <div className="bg-[#FAF8F5] border-b border-[#ECE7DF] px-4 md:px-6 py-2.5 flex items-center gap-2.5 text-[11px] font-bold text-gray-400 select-none shrink-0 text-left">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.href}>
              {idx > 0 && <span className="text-[10px] text-gray-300 font-normal">/</span>}
              {crumb.isLast ? (
                <span className="text-gray-800 font-extrabold">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-[#0F5B3E] transition-colors text-gray-500">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main nested layout view container */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* 4. Mobile Sticky Bottom Navigation (Phone UI) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#ECE7DF] z-40 flex md:hidden justify-around items-center px-2 shadow-lg">
        <Link href="/business/venues" className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold ${checkActive("/business/venues") ? "text-[#0F5B3E]" : "text-gray-400"}`}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/business/venues/calendar" className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold ${checkActive("/business/venues/calendar") ? "text-[#0F5B3E]" : "text-gray-400"}`}>
          <CalendarDays className="w-5 h-5" />
          <span>Calendar</span>
        </Link>
        <Link href="/business/venues/halls" className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold ${checkActive("/business/venues/halls") ? "text-[#0F5B3E]" : "text-gray-400"}`}>
          <Building2 className="w-5 h-5" />
          <span>Halls</span>
        </Link>
        <Link href="/business/venues/leads" className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold ${checkActive("/business/venues/leads") ? "text-[#0F5B3E]" : "text-gray-400"}`}>
          <UserCheck className="w-5 h-5" />
          <span>CRM</span>
        </Link>
        <button 
          onClick={() => setMobileSidebarOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[9.5px] font-bold text-gray-400"
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
        </button>
      </nav>

    </div>
  )
}

// Micro Plus Icon definition to avoid code bloat
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
