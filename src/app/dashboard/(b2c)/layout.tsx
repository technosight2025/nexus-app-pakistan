"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPlannerRoute = pathname?.startsWith('/dashboard/planner')

  if (isPlannerRoute) {
    return (
      <div className="min-h-screen bg-[#FFF7F9] flex flex-col">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 p-4 md:p-8 overflow-y-auto font-sans">
          {children}
        </div>
      </main>
    </div>
  )
}
