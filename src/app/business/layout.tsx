"use client"
import { usePathname } from "next/navigation"
import { BusinessSidebar } from "@/components/layout/BusinessSidebar"
import { BusinessHeader } from "@/components/layout/BusinessHeader"

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Bypasses generic Business OS layout for marketing or dedicated Venue OS
  if (pathname === "/business" || pathname.startsWith("/business/venues")) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <BusinessSidebar />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <BusinessHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
