"use client"

import React, { useState, useEffect } from "react"
import StudioSidebar from "@/components/studio/StudioSidebar"
import StudioHeader from "@/components/studio/StudioHeader"
import { StudioThemeProvider } from "@/components/studio/StudioThemeContext"
import { StudioAppProvider } from "@/contexts/StudioAppContext"

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Close mobile drawer on viewport resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileSidebarOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileSidebarOpen])

  return (
    <StudioThemeProvider>
      <StudioAppProvider>
        <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#050508] transition-colors duration-300 text-gray-900 dark:text-gray-100">

          {/* Mobile overlay backdrop */}
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <StudioSidebar
            onCollapseChange={setSidebarCollapsed}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />

          {/* Main Content — no left margin on mobile, sidebar is a drawer overlay */}
          <main
            className={[
              "flex-1 min-w-0 flex flex-col min-h-screen relative z-10 transition-all duration-300",
              // Mobile: full width (sidebar is overlay)
              "ml-0",
              // Desktop: push right based on sidebar state
              sidebarCollapsed ? "md:ml-16" : "md:ml-64",
            ].join(" ")}
          >
            <StudioHeader onMobileSidebarToggle={() => setMobileSidebarOpen(true)} />

            <div className="flex-1 flex flex-col p-4 sm:p-5 md:p-6 xl:p-10 w-full min-w-0 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </StudioAppProvider>
    </StudioThemeProvider>
  )
}
