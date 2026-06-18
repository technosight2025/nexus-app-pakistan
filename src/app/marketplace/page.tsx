import { Metadata } from "next"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"
import { MarketplaceLayout } from "@/components/marketplace/MarketplaceLayout"

export const metadata: Metadata = {
  title: "Nexus Marketplace | Event Discovery",
  description: "Explore elite venues, event planners, and services in Pakistan.",
}

export default function MarketplacePage() {
  return (
    <>
      <MarketplaceLayout />
      <MobileBottomNav />
    </>
  )
}
