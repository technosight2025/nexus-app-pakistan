"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Menu, User, LayoutDashboard, LogOut, Languages, Search } from 'lucide-react'
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

  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMainTab, setActiveMainTab] = useState<'venues' | 'vendors' | 'professionals'>('venues')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  const handleSearchSubmit = () => {
    router.push(`/explore?tab=${activeMainTab}`)
  }

  return (
    <header className={`bg-white border-b border-slate-200 sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-3 shadow-sm h-[80px] flex items-center' : 'pb-6 pt-6'}`}>
      <div className={`max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col transition-all duration-300 w-full ${!isScrolled ? 'gap-6' : 'gap-0'}`}>
        
        {/* Top Row: Logo, Tabs/Capsule, Actions */}
        <div className="flex items-center justify-between relative z-[60] w-full">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/")}>
            <NexusLogo iconSize={40} iconColor="text-slate-900" textColor="text-slate-900" />
          </div>

          {/* Center: Main Tabs or Search Capsule */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl px-4">
            <AnimatePresence mode="wait">
              {!isScrolled ? (
                <motion.div 
                  key="tabs"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-10 text-[16px] font-bold text-slate-500 items-center"
                >
                  {/* Venues Tab */}
                  <button 
                    onClick={() => setActiveMainTab('venues')}
                    className={`flex items-center gap-3 pb-3 cursor-pointer transition-all relative ${
                      activeMainTab === 'venues' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <img src="/images/nexus_shadi_hall_icon.png?v=2" alt="Venues" className="w-12 h-12 object-contain" />
                    <span>Venues</span>
                    {activeMainTab === 'venues' && (
                      <motion.div layoutId="activeHeaderTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                  </button>

                  {/* Vendors Tab */}
                  <button 
                    onClick={() => setActiveMainTab('vendors')}
                    className={`flex items-center gap-3 pb-3 cursor-pointer transition-all relative ${
                      activeMainTab === 'vendors' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <div className="relative w-12 h-12 shrink-0">
                      <img src="/images/nexus_company_icon.png?v=2" alt="Vendors" className="w-full h-full object-contain" />
                      <span className="absolute -top-1.5 -right-2 px-1 py-0.2 text-[8px] font-black text-white bg-gradient-to-b from-[#3a587d] to-[#20344d] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)] border border-[#1b2b41]/40 flex items-center justify-center tracking-wider leading-none">NEW</span>
                    </div>
                    <span>Vendors</span>
                    {activeMainTab === 'vendors' && (
                      <motion.div layoutId="activeHeaderTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                  </button>

                  {/* Professionals Tab */}
                  <button 
                    onClick={() => setActiveMainTab('professionals')}
                    className={`flex items-center gap-3 pb-3 cursor-pointer transition-all relative ${
                      activeMainTab === 'professionals' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <div className="relative w-12 h-12 shrink-0">
                      <img src="/images/nexus_photographer_icon.png?v=2" alt="Professionals" className="w-full h-full object-contain" />
                      <span className="absolute -top-1.5 -right-2 px-1 py-0.2 text-[8px] font-black text-white bg-gradient-to-b from-[#3a587d] to-[#20344d] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.25)] border border-[#1b2b41]/40 flex items-center justify-center tracking-wider leading-none">NEW</span>
                    </div>
                    <span>Professionals</span>
                    {activeMainTab === 'professionals' && (
                      <motion.div layoutId="activeHeaderTab" className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                    )}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="capsule"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <HeaderSearchCapsule 
                    onClick={(field) => {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Actions and account menu */}
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-750 mt-1">
            <Link 
              href="/explore" 
              className="hidden lg:block hover:bg-slate-100 px-4 py-2.5 rounded-full cursor-pointer transition-colors text-sm font-semibold text-slate-800"
            >
              {isRomanUrdu ? 'Talash' : 'Explore'}
            </Link>

            <Link 
              href="/business" 
              className="hidden lg:block hover:bg-slate-100 px-4 py-2.5 rounded-full cursor-pointer transition-colors text-sm font-semibold text-slate-800"
            >
              {isRomanUrdu ? 'Host Banein' : 'Become a Host'}
            </Link>

            <button className="p-2.5 hover:bg-slate-100 rounded-full cursor-pointer transition-colors">
              <Globe className="w-4 h-4 text-slate-800" />
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

        {/* Expanded Search Bar (Only visible when NOT scrolled) */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[850px] mx-auto z-50 origin-top overflow-hidden"
            >
              <div className="bg-slate-50/80 border border-slate-200 rounded-full shadow-lg shadow-slate-200/50 flex items-center mt-2 relative">
                
                {/* Where */}
                <div onClick={() => router.push(`/explore?focus=where`)} className="flex-1 px-8 py-3.5 hover:bg-slate-100/80 rounded-full cursor-pointer transition-colors group">
                  <div className="text-xs font-extrabold text-slate-800">Where</div>
                  <div className="text-sm font-medium text-slate-400 group-hover:text-slate-500 mt-0.5">Search destinations</div>
                </div>

                <div className="w-[1px] h-8 bg-slate-200" />

                {/* When */}
                <div onClick={() => router.push(`/explore?focus=when`)} className="flex-1 px-6 py-3.5 hover:bg-slate-100/80 rounded-full cursor-pointer transition-colors group">
                  <div className="text-xs font-extrabold text-slate-800">When</div>
                  <div className="text-sm font-medium text-slate-400 group-hover:text-slate-500 mt-0.5">Add dates</div>
                </div>

                <div className="w-[1px] h-8 bg-slate-200" />

                {/* Who */}
                <div onClick={() => router.push(`/explore?focus=who`)} className="flex-1 px-6 py-3.5 hover:bg-slate-100/80 rounded-full cursor-pointer transition-colors flex items-center justify-between group">
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">Who</div>
                    <div className="text-sm font-medium text-slate-600 mt-0.5">1 couple</div>
                  </div>
                  
                  {/* Search Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSearchSubmit(); }}
                    className="ml-2 px-6 py-3 rounded-full bg-[#FF385C] hover:bg-[#e62248] text-white font-extrabold text-sm flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Search className="w-4 h-4 stroke-[3]" />
                    <span>Search</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}
