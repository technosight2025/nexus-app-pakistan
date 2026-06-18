"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Inbox, Image as ImageIcon, CreditCard, Heart, LogOut, Ticket } from "lucide-react"
import { NexusLogo } from "./NexusLogo"

export function CustomerSidebar() {
  const pathname = usePathname()

  const CUSTOMER_LINKS = [
    { name: "My Events", href: "/dashboard/host", icon: CalendarDays },
    { name: "Invitations & RSVPs", href: "/dashboard/host/invitations", icon: Inbox },
    { name: "Memories & Albums", href: "/dashboard/host/albums", icon: ImageIcon },
    { name: "Payments & Invoices", href: "/dashboard/host/payments", icon: CreditCard },
    { name: "Saved Vendors", href: "/dashboard/host/saved", icon: Heart },
    { name: "Bookings", href: "/dashboard/host/bookings", icon: Ticket },
  ]

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex flex-col mb-2">
          <NexusLogo iconColor="text-[#052E20]" textColor="text-[#052E20]" iconSize={28} />
          <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-1">Customer Portal</span>
        </Link>

      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 no-scrollbar">
        {CUSTOMER_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/') && link.href !== '/dashboard/host'
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                isActive ? "bg-[#E6F0EC] text-[#052E20]" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <link.icon className={`w-4 h-4 ${isActive ? "text-[#052E20]" : "text-gray-400"}`} />
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors font-bold text-sm">
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </aside>
  )
}
