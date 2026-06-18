"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, CalendarCheck, CalendarDays, Users,
  FileText, Package, Shirt, BarChart3, Settings, Menu, X,
  Bell, Search, Plus, ChevronRight, Sparkles, Contact,
  MessageSquare, Store, LayoutGrid, Scan, Tags, Truck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { AlertCircle, CreditCard } from "lucide-react"
import { UserButton, useUser } from "@clerk/nextjs"

const MENU_ITEMS = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard/rentals" },
  { name: "Wardrobe", icon: Shirt, href: "/dashboard/rentals/wardrobe" },
  { name: "Bookings", icon: CalendarCheck, href: "/dashboard/rentals/bookings" },
  { name: "Calendar", icon: CalendarDays, href: "/dashboard/rentals/calendar" },
  { name: "Availability", icon: Tags, href: "/dashboard/rentals/availability" },
  { name: "Customers", icon: Users, href: "/dashboard/rentals/customers" },
  { name: "Leads", icon: Contact, href: "/dashboard/rentals/leads" },
  { name: "Quotations", icon: FileText, href: "/dashboard/rentals/quotations" },
  { name: "Deliveries", icon: Truck, href: "/dashboard/rentals/deliveries" },
  { name: "AI Try-On Studio", icon: Scan, href: "/ai-tryon-studio" },
  { name: "Reports", icon: BarChart3, href: "/dashboard/rentals/reports" },
  { name: "Profile Maker", icon: Store, href: "/dashboard/rentals/profile-maker" },
  { name: "Settings", icon: Settings, href: "/dashboard/rentals/settings" },
]

export function RentalsDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Rental Request", desc: "Aisha Khan wants Crimson Bridal Set for Dec 28", time: "8m ago", read: false },
    { id: 2, title: "Payment Received", desc: "Rs. 65,000 advance from Sana Mirza", time: "45m ago", read: false },
    { id: 3, title: "Outfit Returned", desc: "Pastel Walima Gown returned by Rabia Ali", time: "2h ago", read: true },
    { id: 3, title: "Outfit Returned", desc: "Pastel Walima Gown returned by Rabia Ali", time: "2h ago", read: true },
  ])

  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const [billingStatus, setBillingStatus] = useState<"trial" | "active" | "expired" | "none" | null>(null)
  const [daysRemaining, setDaysRemaining] = useState<number>(0)

  useEffect(() => {
    fetch("/api/billing/status")
      .then(r => r.json())
      .then(data => {
        setBillingStatus(data.status)
        setDaysRemaining(data.daysRemaining || 0)
        
        if (data.status === "expired" && !pathname.includes("billing")) {
          router.push("/dashboard/rentals/billing")
        }
      })
      .catch(() => {})
  }, [pathname, router])

  const pathSegments = pathname?.split('/').filter(Boolean) || []
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    return { name: segment.replace(/-/g, ' '), href }
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })))
  const showFullSidebar = !isDesktopCollapsed || isHovered

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-sans text-slate-900">

      {/* ── Sidebar (Desktop) ── */}
      <aside
        id="tour-sidebar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-slate-100 shadow-sm z-40 transition-all duration-300 overflow-hidden ${showFullSidebar ? 'w-60' : 'w-[72px]'}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 p-5 border-b border-slate-100 ${showFullSidebar ? '' : 'justify-center'}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A3B2A] to-[#1a6b4a] flex items-center justify-center shrink-0 shadow-md">
            <Shirt className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {showFullSidebar && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                <p className="font-black text-[#0A3B2A] text-sm leading-none">Rentals</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Dashboard</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden space-y-0.5 px-2">
          {MENU_ITEMS.map(item => {
            const isActive = pathname === item.href || (item.href !== '/dashboard/rentals' && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                title={!showFullSidebar ? item.name : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-[#0A3B2A] text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                } ${!showFullSidebar ? 'justify-center' : ''}`}
              >
                <item.icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'}`} />
                <AnimatePresence>
                  {showFullSidebar && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-sm font-semibold whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.name === "AI Try-On Studio" && showFullSidebar && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="ml-auto text-[9px] font-black uppercase px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#A07830] rounded-md"
                  >
                    AI
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Profile */}
        <div className={`p-4 border-t border-slate-100 flex items-center gap-3 ${!showFullSidebar ? 'justify-center' : ''}`}>
          <div className="shrink-0 flex">
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-xl" } }} />
          </div>
          <AnimatePresence>
            {showFullSidebar && user && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-w-0">
                <p className="text-xs font-black text-slate-900 truncate">{user?.fullName || "Vendor Profile"}</p>
                <p className="text-[10px] font-medium text-slate-400 truncate capitalize">
                  {billingStatus ? `${billingStatus} Plan` : "Loading Plan..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#0A3B2A] flex items-center justify-center">
                    <Shirt className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-black text-[#0A3B2A]">Rentals OS</p>
                </div>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
                {MENU_ITEMS.map(item => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-semibold ${isActive ? 'bg-[#0A3B2A] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 capitalize">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <Link href={crumb.href} className={`hover:text-slate-900 transition-colors ${idx === breadcrumbs.length - 1 ? 'text-slate-900 font-extrabold' : ''}`}>
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user?.publicMetadata?.websiteCreated ? (
              <Link href={`/vendors/${user?.id || 'demo'}`}
                className="hidden sm:flex items-center gap-2 h-8 px-4 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <Store className="w-3.5 h-3.5" /> View Public Page
              </Link>
            ) : (
              <Link href="/dashboard/rentals/profile-maker"
                className="hidden sm:flex items-center gap-2 h-8 px-4 rounded-lg bg-[#D4AF37] text-black text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
              >
                <Store className="w-3.5 h-3.5" /> Profile Maker
              </Link>
            )}
            
            <Link href="/dashboard/rentals/wardrobe"
              className="hidden sm:flex items-center gap-2 h-8 px-4 rounded-lg bg-[#0A3B2A] text-white text-xs font-bold hover:bg-[#0A3B2A]/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Outfit
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b flex items-center justify-between">
                      <h3 className="text-sm font-black">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-[10px] uppercase tracking-wider font-bold text-[#0A3B2A]">Mark all read</button>
                      )}
                    </div>
                    <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                          className={`p-4 hover:bg-slate-50 cursor-pointer flex gap-3 ${!n.read ? 'bg-emerald-50/50' : ''}`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-[#0A3B2A]' : 'bg-transparent'}`} />
                          <div>
                            <p className={`text-sm ${!n.read ? 'font-bold' : 'font-medium text-slate-600'}`}>{n.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                            <p className="text-[10px] font-bold text-slate-300 mt-1.5 uppercase">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center">
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-full" } }} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#FAF8F5] p-4 md:p-6 flex flex-col">
          {/* Trial Warning Banner */}
          {billingStatus === "trial" && daysRemaining <= 90 && !pathname.includes("billing") && (
            <div className="bg-[#D4AF37] text-slate-900 rounded-xl p-3 mb-6 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold text-sm">
                  {daysRemaining === 0 ? "Your trial ends today!" : `You have ${daysRemaining} days left in your Free Trial.`}
                </span>
              </div>
              <Link 
                href="/dashboard/rentals/billing" 
                className="bg-slate-900 hover:bg-black text-white px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
              >
                Upgrade Now
              </Link>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  )
}
