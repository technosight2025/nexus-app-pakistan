import React from "react"
import StudioSidebar from "@/components/studio/StudioSidebar"
import StudioHeader from "@/components/studio/StudioHeader"
import { StudioThemeProvider } from "@/components/studio/StudioThemeContext"
import { StudioAppProvider } from "@/contexts/StudioAppContext"

export const metadata = {
  title: "Studio OS - Nexus",
  description: "The complete business operating system for photographers, videographers, and agencies.",
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioThemeProvider>
      <StudioAppProvider>
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#050505] transition-colors duration-500 text-gray-900 dark:text-gray-100">
          {/* Fixed Sidebar */}
          <StudioSidebar />
          
          {/* Main Content Area */}
          <main className="flex-1 min-w-0 ml-64 flex flex-col min-h-screen relative z-10">
            <StudioHeader />
            
            <div className="flex-1 p-6 md:p-8 xl:p-10 w-full max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </StudioAppProvider>
    </StudioThemeProvider>
  )
}
