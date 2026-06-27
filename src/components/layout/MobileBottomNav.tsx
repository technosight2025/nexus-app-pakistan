"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, MessageSquare, Calendar } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/explore", icon: Search },
    { name: "Concierge", href: "https://wa.me/923001234567", icon: MessageSquare, isWhatsApp: true },
    { name: "My Event", href: "/dashboard", icon: Calendar },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-150 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          if (item.isWhatsApp) {
            return (
              <a 
                key={item.name} 
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-16 h-full text-emerald-600 active:scale-95 transition-all"
              >
                <div className="relative">
                  <item.icon className="w-5 h-5 mb-0.5 fill-emerald-50" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                  {item.name}
                </span>
              </a>
            )
          }

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
                isActive ? "text-[#C5A880]" : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              <div className="relative">
                <item.icon className={`w-5 h-5 mb-0.5 ${isActive ? "fill-[#C5A880]/10" : ""}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? "text-[#C5A880]" : ""}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
