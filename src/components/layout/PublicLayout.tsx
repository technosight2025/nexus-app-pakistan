"use client"
import { usePathname } from "next/navigation"
import { GlobalHeader } from "./GlobalHeader"
import { MobileBottomNav } from "./MobileBottomNav"
import { MessageSquare } from "lucide-react"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBusinessPage = pathname?.startsWith('/business')
  const whatsAppText = isBusinessPage 
    ? "Need a walkthrough? Talk to our Business Team" 
    : "Need Help? Talk to us on WhatsApp"

  const hideHeader =
    pathname === "/" ||
    pathname?.startsWith('/vendors') ||
    pathname?.startsWith('/host-desk') ||
    pathname?.startsWith('/ai-planner') ||
    pathname?.startsWith('/ai-tryon-studio') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/onboarding') ||
    pathname?.startsWith('/business/storefront') ||
    pathname?.startsWith('/explore') ||
    pathname?.startsWith('/site')

  const isVenueProfile = pathname?.startsWith('/venues/')

  return (
    <div className={`min-h-screen flex flex-col ${isVenueProfile ? 'bg-white' : 'bg-background'} font-sans relative`}>
      <GlobalHeader />
      
      {/* We add pt-16 md:pt-20 to push the main content down below the fixed header */}
      <main className={`flex-1 ${hideHeader ? 'pt-0' : 'pt-16 md:pt-20'} pb-16 md:pb-0`}>
        {children}
      </main>

      <MobileBottomNav />

      {/* Persistent Floating WhatsApp Contact Button */}
      <a 
        href="https://wa.me/923001234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline-block">
          {whatsAppText}
        </span>
      </a>
    </div>
  )
}


