import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, MessageSquare, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/search", icon: Search },
    { label: "Inbox", href: "/messages", icon: MessageSquare },
    { label: "Events", href: "/dashboard", icon: Calendar },
    { label: "Profile", href: "/portal", icon: User }
  ]

  // Only render on mobile screens
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-[#E6E2DA] h-16 px-4 z-40 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 cursor-pointer w-12 py-1",
              isActive ? "text-[#0F5B3E]" : "text-slate-400 hover:text-[#1A1A1A]"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
