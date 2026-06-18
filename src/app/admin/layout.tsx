"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/layout/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // The AdminDashboard at /admin provides its own complete full-screen layout (Sidebar + Header).
  // The Theme Builder provides its own edge-to-edge layout.
  // So we don't wrap them in AdminSidebar.
  if (
    pathname === '/admin' || 
    pathname.includes('/admin/themes/create') || 
    pathname.includes('/admin/themes/edit')
  ) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
