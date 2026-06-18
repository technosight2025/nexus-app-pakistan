"use client"
import { Bell, Search, Menu } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

export function BusinessHeader() {
  return (
    <header className="h-16 md:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="md:hidden w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
        <h2 className="text-xl font-black text-slate-900 tracking-tight hidden md:block">Business OS</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex relative group mr-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500" />
          <input 
            type="text" 
            placeholder="Search leads, quotes..." 
            className="w-64 pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm font-medium focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
        
        <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center relative transition-colors">
          <Bell className="w-5 h-5 text-slate-700" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        
        <div className="pl-2 border-l border-slate-200">
          <UserButton />
        </div>
      </div>
    </header>
  )
}
