"use client"

import React from "react"
import { Menu, Search, Plus, MessageSquare, Bell, ChevronDown } from "lucide-react"

export default function StudioHeader() {
  return (
    <header className="w-full bg-white dark:bg-[#050505] border-b border-[#ECE7DF] dark:border-white/10 px-6 py-3 flex items-center justify-between transition-colors duration-500 shrink-0 sticky top-0 z-20">
      {/* Left Area: Hamburger and Welcome Text */}
      <div className="flex items-center gap-4">
        {/* Rounded Hamburger Menu Button */}
        <button className="w-10 h-10 rounded-xl border border-[#ECE7DF] dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shrink-0">
          <Menu className="w-5 h-5" />
        </button>

        {/* Welcome Messages */}
        <div className="flex flex-col leading-none">
          <h1 className="text-[16px] font-extrabold text-gray-900 dark:text-white flex items-center gap-1">
            Studio Dashboard <span className="animate-bounce">👋</span>
          </h1>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-semibold mt-1">
            Welcome back, Creative Studio
          </span>
        </div>
      </div>

      {/* Right Area: Search, Actions, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Input Box */}
        <div className="relative hidden md:block w-[240px] lg:w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full pl-10 pr-14 py-2 text-[12px] font-semibold bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[12px] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0F5B3E]/20 dark:focus:ring-emerald-500/20 focus:border-[#0F5B3E] dark:focus:border-emerald-500"
          />
          {/* Keyboard shortcut badge */}
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[4px] leading-none">
            ⌘ K
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2">
          {/* Plus Button */}
          <button className="w-8 h-8 rounded-full bg-[#0F5B3E] hover:bg-[#0d4d34] text-white flex items-center justify-center transition-colors shadow-sm shrink-0">
            <Plus className="w-4 h-4" />
          </button>

          {/* Messages Button */}
          <button className="w-8 h-8 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white flex items-center justify-center transition-colors shrink-0">
            <MessageSquare className="w-4.5 h-4.5" />
          </button>

          {/* Notifications Button with Red Badge */}
          <button className="w-8 h-8 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white flex items-center justify-center transition-colors shrink-0 relative">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#EF4444] text-[8px] font-extrabold text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-[#050505]">
              11
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 dark:bg-white/10 shrink-0"></div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none group">
          <div className="w-8 h-8 rounded-lg bg-[#0F5B3E] flex items-center justify-center text-white text-[13px] font-extrabold shrink-0 shadow-sm">
            C
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[12px] font-bold text-gray-800 dark:text-white group-hover:text-[#0F5B3E] dark:group-hover:text-emerald-400 transition-colors">
              Creative Studio
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
              Owner
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-transform group-hover:translate-y-0.5" />
        </div>
      </div>
    </header>
  )
}
