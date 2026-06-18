"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarHeart, Users, Calculator, Image, Globe, Settings, MapPin, Music, MessageSquare, Menu, LayoutDashboard } from "lucide-react"

export function EventSidebar() {
  const pathname = usePathname()

  // For the B2C Event Portal, the paths usually look like /events/[event_id]/timeline
  // But for the global dashboard it's /events/dashboard.
  // Extract the eventId dynamically from the URL segment if inside an event portal path.
  const parts = pathname ? pathname.split('/') : []
  const eventId = (pathname?.startsWith("/events/") && parts[2] && parts[2] !== "dashboard" && parts[2] !== "settings")
    ? parts[2]
    : "demo-wedding"

  const isGlobalDashboard = pathname === "/events/dashboard";

  const EVENT_LINKS = [
    { name: "Command Center", href: `/events/${eventId}/timeline`, icon: LayoutDashboard },
    { name: "Guest List & RSVPs", href: `/events/${eventId}/guests`, icon: Users },
    { name: "Budget Tracker", href: `/events/${eventId}/budget`, icon: Calculator },
    { name: "Memories & Gallery", href: `/events/${eventId}/memories`, icon: Image },
    { name: "Digital Invitation", href: `/invite/dashboard`, icon: Globe },
    { name: "Venue & Vendors", href: `/events/${eventId}/vendors`, icon: MapPin },
    { name: "Music & Playlists", href: `/events/${eventId}/music`, icon: Music },
    { name: "Messages", href: `/events/${eventId}/messages`, icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-[#FAF7F2] border-r border-[#E6E2DA] h-screen fixed left-0 top-0 flex flex-col z-50">
      
      <div className="p-6 border-b border-[#E6E2DA]">
        <Link href="/" className="flex items-center gap-2 mb-8 group">
          <CalendarHeart className="w-6 h-6 text-[#0F5B3E] group-hover:scale-110 transition-transform" />
          <span className="font-serif font-bold text-xl text-[#1D1C17]">Event Portal</span>
        </Link>

        {/* Active Event Switcher */}
        {!isGlobalDashboard && (
          <div className="bg-white border border-[#E6E2DA] p-4 rounded-xl shadow-sm cursor-pointer hover:border-[#0F5B3E] transition-colors">
            <p className="text-[10px] font-bold uppercase text-[#5E6460] tracking-wider mb-1">Active Event</p>
            <p className="font-bold text-[#1D1C17] text-sm truncate">Ali & Fatima's Wedding</p>
            <p className="text-xs text-[#0F5B3E] mt-1 font-bold">24 Dec 2026</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        
        <Link href="/events/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${isGlobalDashboard ? 'bg-[#0F5B3E] text-white shadow-md' : 'text-[#5E6460] hover:bg-white hover:text-[#1D1C17]'}`}>
          <Menu className={`w-4 h-4 ${isGlobalDashboard ? 'text-white' : 'text-[#5E6460]'}`} /> All My Events
        </Link>

        {!isGlobalDashboard && (
          <div className="pt-6">
             <div className="mb-4 px-2">
              <span className="text-[10px] font-bold uppercase text-[#5E6460] tracking-widest">Event Planning</span>
            </div>
            
            {EVENT_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                    isActive ? "bg-[#0F5B3E] text-white shadow-md" : "text-[#5E6460] hover:bg-white hover:text-[#1D1C17]"
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#5E6460]"}`} />
                  {link.name}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-[#E6E2DA]">
        <Link href="/events/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#5E6460] hover:bg-white transition-colors font-bold text-sm">
          <Settings className="w-4 h-4" /> Account Settings
        </Link>
      </div>

    </aside>
  )
}
