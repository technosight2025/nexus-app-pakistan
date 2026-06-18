"use client"
import React from 'react'

interface NexusLogoProps {
  className?: string
  iconColor?: string
  textColor?: string
  showText?: boolean
  iconSize?: number
}

export function NexusLogo({ 
  className = "", 
  iconColor = "text-[#0F5B3E]", 
  textColor = "text-[#0F5B3E]", 
  showText = true,
  iconSize = 36
}: NexusLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Refined Scalable Brand Icon */}
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconColor} shrink-0`}
      >
        {/* Left Head */}
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.5" />
        {/* Right Head */}
        <circle cx="25" cy="9" r="3.5" stroke="currentColor" strokeWidth="2.5" />
        {/* Connected Loop Shoulders */}
        <path 
          d="M 4,28 C 4,21 8,19 12,19 C 16,19 17.5,22.5 17,25.5 C 16.5,28.5 14.5,29.5 13.5,28.5 C 12.5,27.5 13,25.5 15,24 C 18,22 21,17.5 25,17.5 C 29,17.5 32,21 32,28" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
      {/* Refined Brand Wordmark */}
      {showText && (
        <span 
          className={`text-2xl font-semibold tracking-tight ${textColor}`} 
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          nexus
        </span>
      )}
    </div>
  )
}

