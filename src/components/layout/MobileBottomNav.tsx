"use client"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, MessageSquare, User } from "lucide-react"
import { useNotifications } from "@/store/useNotifications"

export function MobileBottomNav() {
  const pathname = usePathname()
  const { unreadCount, startPolling, stopPolling } = useNotifications()

  useEffect(() => {
    startPolling()
    return () => stopPolling()
  }, [startPolling, stopPolling])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Create", href: "/create", icon: Plus, isPrimary: true },
    { name: "Messages", href: "/messages", icon: MessageSquare, badgeCount: unreadCount },
    { name: "My Nexus", href: "/dashboard", icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          if (item.isPrimary) {
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(15,91,62,0.3)] border-4 border-surface">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold mt-1 text-foreground">
                  {item.name}
                </span>
              </Link>
            )
          }

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <item.icon className={`w-5 h-5 mb-1 ${isActive ? "fill-primary/20" : ""}`} />
                {item.badgeCount ? (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-surface animate-in zoom-in">
                    {item.badgeCount > 99 ? '99+' : item.badgeCount}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] font-bold ${isActive ? "text-primary" : ""}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
