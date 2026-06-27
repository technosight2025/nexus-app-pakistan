"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Menu, User, LayoutDashboard, LogOut, Languages } from 'lucide-react'
import { useUser, useClerk } from "@clerk/nextjs"
import { useLanguage } from '@/contexts/LanguageContext'
import { NexusLogo } from '@/components/layout/NexusLogo'
import { HeaderSearchCapsule } from '@/components/layout/HeaderSearchCapsule'
import { useRouter } from 'next/navigation'

export function HomeExploreHeader() {
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()
  
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

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

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-[100] transition-all duration-300 py-3 shadow-sm h-[80px] flex items-center">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between relative z-[60] w-full">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/")}>
          <NexusLogo iconSize={40} iconColor="text-slate-900" textColor="text-slate-900" />
        </div>

        {/* Center: Search Capsule */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-lg px-4">
          <HeaderSearchCapsule 
            onClick={(field) => {
              window.location.href = `/explore?focus=${field || 'where'}`
            }}
          />
        </div>

        {/* Right: Actions and account menu */}
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Link 
            href="/business" 
            className="hidden lg:block hover:bg-slate-100 px-4 py-2.5 rounded-full cursor-pointer transition-colors text-sm font-semibold text-slate-800"
          >
            {isRomanUrdu ? 'Host Banein' : 'Become a Host'}
          </Link>

          <button
            onClick={() => setIsRomanUrdu(!isRomanUrdu)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-black tracking-wider uppercase rounded-full transition-all border border-slate-200 text-slate-700 hover:bg-slate-100 bg-slate-50 cursor-pointer"
            title={isRomanUrdu ? "Switch to English" : "Urdu mein tabdeel karain"}
          >
            <Languages className="w-4 h-4" />
            <span className="hidden sm:block">{isRomanUrdu ? "Urdu" : "EN"}</span>
          </button>

          {/* Hamburger Account menu */}
          <div 
            ref={accountMenuRef}
            onClick={(e) => {
              e.stopPropagation()
              setIsAccountMenuOpen(!isAccountMenuOpen)
            }}
            className="flex items-center gap-3 border border-slate-300 rounded-full py-1.5 px-2 hover:shadow-md transition-shadow cursor-pointer bg-white relative ml-2"
          >
            <Menu className="w-4 h-4 text-slate-600 ml-2" />
            <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center overflow-hidden">
              {isSignedIn && user?.imageUrl ? (
                <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Dropdown Menu Panel */}
            <AnimatePresence>
              {isAccountMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-12 w-[280px] bg-white border border-slate-200 shadow-2xl rounded-2xl py-2 z-50 cursor-default text-left flex flex-col"
                >
                  {isSignedIn ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-slate-50 px-4 py-3 cursor-pointer transition-colors font-semibold text-sm text-slate-700 flex items-center gap-3">
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        <span>Dashboard</span>
                      </Link>
                      <div className="h-[1px] bg-slate-100 my-1" />
                      <div onClick={() => { setIsAccountMenuOpen(false); signOut(); }} className="hover:bg-slate-50 px-4 py-3 cursor-pointer transition-colors font-semibold text-sm text-red-600 flex items-center gap-3">
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Log out</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/sign-up" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-slate-50 px-4 py-3 cursor-pointer transition-colors font-black text-sm text-slate-900">
                        Sign up
                      </Link>
                      <Link href="/login" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-slate-50 px-4 py-3 cursor-pointer transition-colors font-semibold text-sm text-slate-700">
                        Log in
                      </Link>
                      <div className="h-[1px] bg-slate-100 my-1" />
                      <Link href="/business" onClick={() => setIsAccountMenuOpen(false)} className="hover:bg-slate-50 px-4 py-3 cursor-pointer transition-colors font-semibold text-sm text-slate-700">
                        Become a Host
                      </Link>
                      <div onClick={() => { alert("Opening Help Center"); setIsAccountMenuOpen(false); }} className="hover:bg-slate-50 px-4 py-3 cursor-pointer transition-colors font-semibold text-sm text-slate-700 flex items-center gap-3">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span>Help Center</span>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
