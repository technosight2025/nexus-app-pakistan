import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { VendorSearchDirectory } from "@/components/marketplace/VendorSearchDirectory"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Find Top Vendors | NEXUS",
  description: "Discover and book the best photographers, caterers, makeup artists, and event planners in Pakistan.",
}

export default function VendorsPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><div className="w-8 h-8 border-4 border-[#0F5B3E] border-t-transparent rounded-full animate-spin"></div></div>}>
        <VendorSearchDirectory />
      </Suspense>
      <MegaFooter />
    </PublicLayout>
  )
}
