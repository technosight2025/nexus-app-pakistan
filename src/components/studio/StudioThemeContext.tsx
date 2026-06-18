"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark"

interface StudioThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const StudioThemeContext = createContext<StudioThemeContextType | undefined>(undefined)

export function StudioThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark") // Default is dark as requested
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("studio-theme") as Theme | null
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "light" ? "dark" : "light"
      localStorage.setItem("studio-theme", newTheme)
      return newTheme
    })
  }

  // Prevent hydration mismatch while still providing the context
  if (!mounted) {
    return (
      <StudioThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {} }}>
        <div className="dark flex min-h-screen bg-[#0A0A0A]">
           {/* Render children hidden or a simple loader until mounted if needed, but for simplicity we just render children with default dark class */}
           <div className="contents w-full">{children}</div>
        </div>
      </StudioThemeContext.Provider>
    )
  }

  return (
    <StudioThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme === "dark" ? "dark bg-[#0A0A0A] text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-500 min-h-screen`}>
        {children}
      </div>
    </StudioThemeContext.Provider>
  )
}

export function useStudioTheme() {
  const context = useContext(StudioThemeContext)
  if (context === undefined) {
    throw new Error("useStudioTheme must be used within a StudioThemeProvider")
  }
  return context
}
