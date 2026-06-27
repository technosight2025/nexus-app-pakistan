"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useUser, useClerk } from "@clerk/nextjs"
import { Search, LayoutDashboard, Menu, User, ChevronDown, LogOut, Languages } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { ExploreMegaMenu, BusinessOSMegaMenu, InvitationsMegaMenu, MemoriesMegaMenu, ToolsMegaMenu, DisplaysMegaMenu } from "./MegaMenu"
import { useLanguage } from "@/contexts/LanguageContext"
import { NexusLogo } from "./NexusLogo"
import { HeaderSearchCapsule } from "./HeaderSearchCapsule"

export function GlobalHeader() {
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()

  const [localProfileName, setLocalProfileName] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("nexus_crm_wedding_profile")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.hostName) setLocalProfileName(parsed.hostName)
        else if (parsed.brideName && parsed.brideName !== "You") setLocalProfileName(parsed.brideName)
      } catch (e) {}
    }
  }, [])

  // Pages that have a dark hero section or dark top banner
  const isDarkPage = pathname === "/business"

  const [profileHeaderHidden, setProfileHeaderHidden] = useState(false)
  const isProfilePage = !!pathname?.startsWith('/venues/')
  
  const isImmersivePage =
    pathname === "/" ||
    pathname?.startsWith('/vendors') ||
    pathname?.startsWith('/host-desk') ||
    pathname?.startsWith('/ai-planner') ||
    pathname?.startsWith('/ai-tryon-studio') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/onboarding') ||
    pathname?.startsWith('/business/storefront') ||
    pathname?.startsWith('/explore') ||
    pathname?.startsWith('/site')

  // Handle scroll effect for the floating pill
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setProfileHeaderHidden(window.scrollY > 150)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isImmersivePage) {
    return null;
  }

  // Use dark text color if scrolled, OR if it's a profile page, OR if it's NOT a dark page
  const useDarkText = isProfilePage || scrolled || !isDarkPage

  const wrapperClasses = isProfilePage
    ? `fixed top-0 inset-x-0 z-[100] w-full pointer-events-none transition-all duration-500 ${
        profileHeaderHidden ? "opacity-0 -translate-y-20" : "opacity-100 translate-y-0"
      }`
    : `fixed top-4 md:top-6 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none transition-all duration-500`

  const headerClasses = isProfilePage
    ? `pointer-events-auto transition-all duration-500 w-full h-20 bg-white border-b border-slate-200/85 flex items-center justify-between px-6 md:px-12 shadow-sm`
    : `pointer-events-auto transition-all duration-500 w-full max-w-[1300px] rounded-[2rem] border flex items-center justify-between px-4 md:px-6 py-3 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-[0_12px_40px_rgba(0,0,0,0.05)]" 
          : isDarkPage
            ? "bg-slate-950/40 backdrop-blur-xl border-white/10 shadow-none"
            : "bg-transparent border-transparent shadow-none"
      }`

  return (
    <div className={wrapperClasses}>
      <header className={headerClasses}>
        
        {/* LEFT SECTION - SOFT LUXURY LOGO */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1.5 group">
            <NexusLogo 
              iconColor={useDarkText ? "text-slate-900" : "text-white"} 
              textColor={useDarkText ? "text-slate-900" : "text-white"} 
              iconSize={32}
            />
          </Link>
        </div>

        {/* CENTER SECTION - COMPACT CAPSULE SEARCH BAR */}
        <div className="hidden lg:block w-full max-w-[340px] lg:max-w-[420px] pointer-events-auto">
          <HeaderSearchCapsule 
            onClick={(field) => {
              window.location.href = `/explore?focus=${field || 'where'}`
            }}
          />
        </div>

        {/* RIGHT SECTION - SOFT ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4">
          {pathname === "/business" ? (
            <Link 
              href="/login?role=partner" 
              className={`hidden md:block px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${
                useDarkText ? "border-slate-200 text-slate-800 hover:bg-slate-50" : "border-white/20 text-white hover:bg-white/5"
              }`}
            >
              Business Login
            </Link>
          ) : (
            <Link 
              href="/create-event" 
              className={`hidden md:block px-4 py-2 text-sm font-semibold rounded-full transition-colors border ${
                useDarkText ? "border-slate-200 text-slate-800 hover:bg-slate-50" : "border-white/20 text-white hover:bg-white/5"
              }`}
            >
              Create Event
            </Link>
          )}

          {/* English / Urdu Toggle Button */}
          <button
            onClick={() => setIsRomanUrdu(!isRomanUrdu)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black tracking-wider uppercase rounded-full transition-all border cursor-pointer select-none ${
              useDarkText 
                ? "border-slate-200 text-slate-700 hover:bg-slate-100 bg-slate-50" 
                : "border-white/20 text-white hover:bg-white/10 bg-white/5"
            }`}
            title={isRomanUrdu ? "Switch to English" : "Urdu mein tabdeel karain"}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isRomanUrdu ? "Urdu" : "EN"}</span>
          </button>
          
          <div className={`h-5 w-[1px] hidden sm:block ${useDarkText ? "bg-slate-200" : "bg-white/10"}`} />
          
          {isSignedIn ? (
            <div className="relative">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-2 py-1.5 backdrop-blur-md border rounded-full transition-all bg-white hover:bg-gray-50 border-gray-200 shadow-sm"
              >
                <img 
                  src={user?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <span className="text-sm font-semibold text-slate-800 hidden sm:block pl-1">
                  {user?.firstName || localProfileName || "Zoya"}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform pr-1 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <Link 
                        href="/dashboard" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-500" /> Overview
                      </Link>
                      <div className="h-[1px] w-full bg-gray-100 my-1"></div>
                      <button 
                        onClick={() => {
                          setDropdownOpen(false)
                          signOut()
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/sign-in" 
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors hidden sm:block ${
                  useDarkText ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/5"
                }`}
              >
                Login
              </Link>
              <Link href="/register" className="px-6 py-2.5 shadow-lg rounded-full text-sm font-semibold transition-all bg-slate-900 text-white hover:bg-black">
                Register
              </Link>
            </div>
          )}

          {/* MOBILE MENU */}
          <button 
            className={`lg:hidden w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center ${
              useDarkText 
                ? "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800" 
                : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
            }`}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>
    </div>
  )
}
