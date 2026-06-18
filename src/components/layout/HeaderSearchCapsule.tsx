"use client"

import React from 'react'
import { Search } from 'lucide-react'

interface HeaderSearchCapsuleProps {
  searchDest?: string
  datesDisplay?: string
  whoDisplay?: string
  onClick?: (field?: 'where' | 'when' | 'who') => void
  className?: string
}

export function HeaderSearchCapsule({
  searchDest,
  datesDisplay,
  whoDisplay,
  onClick,
  className = ""
}: HeaderSearchCapsuleProps) {
  
  const handleSegmentClick = (e: React.MouseEvent, field: 'where' | 'when' | 'who') => {
    if (onClick) {
      e.stopPropagation()
      onClick(field)
    }
  }

  const destinationText = searchDest || "Anywhere"
  const whenText = datesDisplay && datesDisplay !== "Add dates" ? datesDisplay : "Anytime"
  const guestText = whoDisplay && whoDisplay !== "Add guests" ? whoDisplay : "Add guests"

  return (
    <div 
      onClick={() => onClick && onClick('where')}
      className={`flex items-center bg-white border border-slate-200 hover:border-slate-350 shadow-[0_3px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] rounded-full pl-4 pr-2.5 py-1.5 transition-all duration-300 cursor-pointer select-none max-w-full ${className}`}
    >
      
      {/* 🏡 Airbnb-Style Illustrative Cabin + Tree SVG Icon */}
      <div className="flex items-center shrink-0 mr-1.5 md:mr-2">
        <svg 
          className="w-7 h-7 filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.06)]" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tree Trunk */}
          <path d="M8 20V24" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tree Foliage */}
          <path d="M8 11.5C9.65685 11.5 11 13 11 14.8333C11 16.6667 10 18.5 8 20.5C6 18.5 5 16.6667 5 14.8333C5 13 6.34315 11.5 8 11.5Z" fill="#388E3C" />
          <path d="M8 9.5C9.10457 9.5 10 10.7 10 12C10 13.3 9.10457 14.5 8 16C6.89543 14.5 6 13.3 6 12C6 10.7 6.89543 9.5 8 9.5Z" fill="#2E7D32" />

          {/* Cabin Wall */}
          <rect x="14" y="16" width="13" height="9" rx="1.5" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5" />
          {/* Roof */}
          <path d="M12 16L20.5 9L29 16H12Z" fill="#90A4AE" stroke="#37474F" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Red Door */}
          <rect x="18" y="19.5" width="4" height="5.5" rx="0.5" fill="#D32F2F" />
          {/* Door Knob */}
          <circle cx="19" cy="22" r="0.5" fill="#FFEB3B" />
          {/* Window */}
          <rect x="23.5" y="18.5" width="2.5" height="2.5" rx="0.5" fill="#FFF" stroke="#37474F" strokeWidth="1" />
        </svg>
      </div>

      {/* Capsule Content Area */}
      <div className="flex items-center text-xs md:text-[13px] font-bold text-slate-800 tracking-tight leading-none">
        
        {/* Anywhere / Destination */}
        <span 
          onClick={(e) => handleSegmentClick(e, 'where')}
          className="px-2 hover:text-slate-950 transition-colors duration-150 truncate max-w-[100px] sm:max-w-[120px] md:max-w-[150px]"
        >
          {destinationText}
        </span>
        
        {/* Divider 1 */}
        <div className="w-[1px] h-4 bg-slate-200 shrink-0" />
        
        {/* Anytime / Dates */}
        <span 
          onClick={(e) => handleSegmentClick(e, 'when')}
          className="px-2 text-slate-500 font-medium hover:text-slate-900 transition-colors duration-150 truncate max-w-[80px] sm:max-w-[100px]"
        >
          {whenText}
        </span>
        
        {/* Divider 2 */}
        <div className="w-[1px] h-4 bg-slate-200 shrink-0" />
        
        {/* Add guests / Who */}
        <span 
          onClick={(e) => handleSegmentClick(e, 'who')}
          className="px-2 text-slate-500 font-medium hover:text-slate-900 transition-colors duration-150 truncate max-w-[80px] sm:max-w-[100px]"
        >
          {guestText}
        </span>

      </div>

      {/* Red Search Circular Button */}
      <div 
        onClick={(e) => handleSegmentClick(e, 'where')}
        className="w-8 h-8 rounded-full bg-[#FF385C] hover:bg-[#e62248] text-white flex items-center justify-center shrink-0 transition-colors ml-2.5 shadow-sm active:scale-95 duration-150"
      >
        <Search className="w-4 h-4 text-white stroke-[2.5]" />
      </div>

    </div>
  )
}
