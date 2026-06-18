"use client"
import { EventSidebar } from "@/components/layout/EventSidebar"

export default function CustomerEventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex">
      <EventSidebar />
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 relative">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
