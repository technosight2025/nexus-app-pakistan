"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Menu, User, LayoutDashboard, LogOut, Search, X } from 'lucide-react'
import { useUser, useClerk } from "@clerk/nextjs"
import { useLanguage } from '@/contexts/LanguageContext'
import { NexusLogo } from '@/components/layout/NexusLogo'
import { useRouter } from 'next/navigation'

export function HomeExploreHeader() {
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()
  
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  // Scroll listener for dynamic translucency & border effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchDrawerOpen(false)
    }
  }

  return (
    <>
      <header className={`w-full fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/75 backdrop-blur-md border-b border-neutral-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)]' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between w-full h-full">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => router.push("/")}>
            <NexusLogo iconSize={42} iconColor="text-neutral-900" textColor="text-neutral-900 font-serif" />
          </div>

          {/* Center: Minimalist text links (Editorial Swiss Style) */}
          <nav className="hidden md:flex items-center gap-10 text-[12px] font-black uppercase tracking-widest text-neutral-500">
            <Link href="/explore" className="relative py-2 hover:text-neutral-950 transition-colors duration-300 group">
              <span>{isRomanUrdu ? 'Explore' : 'Explore Marketplace'}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/create-event" className="relative py-2 hover:text-neutral-950 transition-colors duration-300 group">
              <span>{isRomanUrdu ? 'Planner' : 'AI Event Planner'}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/business" className="relative py-2 hover:text-neutral-950 transition-colors duration-300 group">
              <span>{isRomanUrdu ? 'Host Partner' : 'Become a Partner'}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Distinct Primary CTA */}
            <Link href="/create-event" className="hidden lg:block">
              <span className="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-neutral-950 text-white rounded-full hover:bg-[#C5A880] hover:shadow-[0_4px_12px_rgba(197,168,128,0.2)] transition-all duration-300 cursor-pointer">
                Start Planning
              </span>
            </Link>

            {/* Search Trigger Button */}
            <button 
              onClick={() => setIsSearchDrawerOpen(true)}
              className="p-2.5 hover:bg-neutral-100 rounded-full cursor-pointer transition-colors text-neutral-850"
              title="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Language Toggle */}
            <button 
              onClick={() => setIsRomanUrdu(!isRomanUrdu)}
              className="p-2.5 hover:bg-neutral-100 rounded-full cursor-pointer transition-colors text-neutral-850"
              title={isRomanUrdu ? "English" : "Urdu"}
            >
              <Globe className="w-4.5 h-4.5" />
            </button>

            {/* Profile Dropdown */}
            <div 
              ref={accountMenuRef}
              onClick={(e) => {
                e.stopPropagation()
                setIsAccountMenuOpen(!isAccountMenuOpen)
              }}
              className="flex items-center gap-2 border border-neutral-200 rounded-full p-1 hover:border-neutral-900 hover:shadow-2xs transition-all cursor-pointer bg-white relative"
            >
              <div className="w-7 h-7 rounded-full bg-neutral-800 text-white flex items-center justify-center overflow-hidden">
                {isSignedIn && user?.imageUrl ? (
                  <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <Menu className="w-3.5 h-3.5 text-neutral-600 mr-1.5" />

              {/* Dropdown Menu Panel */}
              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-10 w-[240px] bg-white border border-neutral-100 shadow-xl rounded-xl py-1.5 z-50 cursor-default text-left flex flex-col"
                  >
                    {isSignedIn ? (
                      <>
                        <Link href="/dashboard" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-neutral-50 px-4 py-2.5 cursor-pointer transition-colors font-bold text-xs uppercase tracking-wider text-neutral-700 flex items-center gap-2">
                          <LayoutDashboard className="w-3.5 h-3.5" />
                          <span>Dashboard</span>
                        </Link>
                        <div className="h-[1px] bg-neutral-100 my-1" />
                        <div onClick={() => { setIsAccountMenuOpen(false); signOut(); }} className="hover:bg-neutral-50 px-4 py-2.5 cursor-pointer transition-colors font-bold text-xs uppercase tracking-wider text-red-650 flex items-center gap-2">
                          <LogOut className="w-3.5 h-3.5 text-red-500" />
                          <span>Log out</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link href="/register" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-neutral-50 px-4 py-2.5 cursor-pointer transition-colors font-black text-xs uppercase tracking-wider text-neutral-900">
                          Sign up
                        </Link>
                        <Link href="/sign-in" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-neutral-50 px-4 py-2.5 cursor-pointer transition-colors font-bold text-xs uppercase tracking-wider text-neutral-700">
                          Log in
                        </Link>
                        <div className="h-[1px] bg-neutral-100 my-1" />
                        <Link href="/business" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-neutral-50 px-4 py-2.5 cursor-pointer transition-colors font-bold text-xs uppercase tracking-wider text-neutral-700">
                          Become a Host
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </header>

      {/* Floating Search Drawer Overlay */}
      <AnimatePresence>
        {isSearchDrawerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/30 backdrop-blur-xs z-[110] flex flex-col justify-start"
            onClick={() => setIsSearchDrawerOpen(false)}
          >
            <motion.div 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white border-b border-neutral-100 py-6 px-6 md:px-10 lg:px-20 w-full shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-[1440px] mx-auto flex items-center justify-between w-full">
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center mr-6">
                  <Search className="w-5 h-5 text-neutral-400 mr-3 shrink-0" />
                  <input 
                    type="text"
                    autoFocus
                    placeholder="Search venues, decorators, photographers, caterers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-lg text-neutral-900 placeholder-neutral-400 font-medium"
                  />
                </form>
                
                <button 
                  onClick={() => setIsSearchDrawerOpen(false)}
                  className="p-2 hover:bg-neutral-50 rounded-full cursor-pointer transition-colors text-neutral-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
