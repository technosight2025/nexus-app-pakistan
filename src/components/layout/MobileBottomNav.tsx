"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, MessageSquare, Calendar, User, Sparkles } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA on scroll when Y > 200
      setShowFloatingCTA(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Discover", href: "/explore", icon: Search },
    { name: "Inbox", href: "/messages", icon: MessageSquare },
    { name: "Events", href: "/dashboard", icon: Calendar },
    { name: "Profile", href: "/portal", icon: User },
  ]

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <>
      {/* Floating CTA for Mobile (Emerald Green, fixed above bottom nav on scroll) */}
      <div className={`md:hidden fixed bottom-20 left-4 right-4 z-40 transition-all duration-500 transform ${
        showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}>
        <Link 
          href="/create-event" 
          onClick={triggerHaptic} 
          className="w-full h-12 bg-[#0F5B3E] hover:bg-[#0c4730] text-white flex items-center justify-center gap-2 rounded-full shadow-lg border border-white/10 active:scale-98 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-xs font-black uppercase tracking-widest">Plan Your Event</span>
        </Link>
      </div>

      {/* Main 5-Item Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-150 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={triggerHaptic}
                className={`flex flex-col items-center justify-center w-14 h-full transition-colors relative ${
                  isActive ? "text-[#C5A880]" : "text-neutral-400 hover:text-neutral-950"
                }`}
              >
                <div className="relative">
                  <item.icon className={`w-4.5 h-4.5 mb-0.5 ${isActive ? "fill-[#C5A880]/10" : ""}`} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? "text-[#C5A880]" : ""}`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
