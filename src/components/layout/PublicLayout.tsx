"use client"
import { usePathname } from "next/navigation"
import { GlobalHeader } from "./GlobalHeader"
import { MobileBottomNav } from "./MobileBottomNav"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
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
    </div>
  )
}


