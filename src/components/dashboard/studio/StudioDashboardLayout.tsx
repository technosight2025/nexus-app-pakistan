"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, CalendarDays, Users, FileText, 
  Settings, Menu, X, Bell, Search, Plus, ChevronRight, 
  Sparkles, Contact, MessageSquare, LayoutGrid, Camera, 
  Video, FolderOpen, HeartHandshake, UploadCloud, 
  Wrench, Briefcase, CreditCard, BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NexusBusinessAI } from "../venue/NexusBusinessAI" // Reuse the AI component

import { MODULE_REGISTRY, getActiveModulesForUser } from "@/config/modules"

// Mock user's active modules (In reality, this comes from a database/context)
const ACTIVE_STUDIO_MODULES = [
  "nexus-apps", "projects", "leads", "team-schedule", 
  "photo-selection", "video-review", "delivery", "equipment", "payments", "accounting"
]

export function StudioDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)
  const pathname = usePathname()

  // Ensure scroll top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsMobileMenuOpen(false)
  }, [pathname])

  const activeModules = getActiveModulesForUser("Studio", ACTIVE_STUDIO_MODULES)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 text-white fixed h-full z-40">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <Link href="/dashboard/studio" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">NEXUS</h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Studio OS</p>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          <div className="mb-4 px-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Menu</p>
          </div>
          
          {/* Static Home Link */}
          <Link href="/dashboard/studio">
            <motion.div 
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                pathname === "/dashboard/studio" 
                  ? "bg-primary text-white shadow-md" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {pathname === "/dashboard/studio" && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary z-0" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              <LayoutDashboard className={`w-5 h-5 z-10 transition-transform duration-200 ${pathname === "/dashboard/studio" ? "" : "group-hover:scale-110"}`} />
              <span className="font-bold text-sm z-10">Dashboard</span>
            </motion.div>
          </Link>

          {/* Dynamic Module Links */}
          {activeModules.map((module) => {
            const href = `/dashboard/studio/${module.id}`
            const isActive = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link key={module.id} href={href}>
                <motion.div 
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isActive 
                      ? "bg-primary text-white shadow-md" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab" 
                      className="absolute inset-0 bg-primary z-0" 
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <module.icon className={`w-5 h-5 z-10 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`} />
                  <span className="font-bold text-sm z-10">{module.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto z-10 opacity-50" />}
                </motion.div>
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur-md sticky bottom-0">
          <Link href="/dashboard/studio/settings">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-800/50 transition-colors text-slate-400 hover:text-white group">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-primary transition-colors overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554046920-90dcac824bd6?q=80&w=150&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm text-white truncate">Lumiere Studios</p>
                <p className="text-xs text-slate-500 truncate">Settings & Profile</p>
              </div>
              <Settings className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 text-white z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black tracking-tight text-white">NEXUS</h1>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Studio OS</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <div className="mb-4 px-3">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Menu</p>
                </div>
                
                {/* Static Home Link */}
                <Link href="/dashboard/studio">
                  <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    pathname === "/dashboard/studio" ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-white active:bg-slate-800"
                  }`}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-bold text-sm">Dashboard</span>
                  </div>
                </Link>

                {/* Dynamic Module Links */}
                {activeModules.map((module) => {
                  const href = `/dashboard/studio/${module.id}`
                  const isActive = pathname === href || pathname.startsWith(`${href}/`)
                  return (
                    <Link key={module.id} href={href}>
                      <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                        isActive ? "bg-primary text-white shadow-md" : "text-slate-400 hover:text-white active:bg-slate-800"
                      }`}>
                        <module.icon className="w-5 h-5" />
                        <span className="font-bold text-sm">{module.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen lg:pl-72 relative transition-all duration-300">
        {/* Top Navbar */}
        <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-slate-600">
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Search Bar */}
            <div className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search projects, clients..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm font-medium w-[300px]"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <div className="hidden sm:flex items-center gap-1">
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-slate-200 bg-white text-slate-400 font-sans text-[10px] font-bold">⌘</kbd>
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-slate-200 bg-white text-slate-400 font-sans text-[10px] font-bold">K</kbd>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="outline" className="hidden sm:flex items-center gap-2 rounded-full border-slate-200 text-slate-600 hover:text-slate-900 font-bold shadow-sm">
              <Plus className="w-4 h-4" /> New Project
            </Button>
            
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative rounded-full text-slate-600 hover:bg-slate-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" className="relative rounded-full text-slate-600 hover:bg-slate-100">
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 w-full bg-slate-50/50">
          {children}
        </div>
        
        {/* Nexus Business AI Assistant (Floating) */}
        <NexusBusinessAI isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        
        {/* Floating AI Toggle Button (optional, to open it) */}
        {!isAIOpen && (
          <button 
            onClick={() => setIsAIOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30 flex items-center justify-center text-white hover:bg-indigo-700 transition-transform hover:scale-105 z-40"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        )}
      </main>
    </div>
  )
}
