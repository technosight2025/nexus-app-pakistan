import { Metadata } from 'next'
import { Suspense } from 'react'
import { ExploreClient } from '@/components/explore/ExploreClient'

export const metadata: Metadata = {
  title: "Explore Event Spaces | Nexus Marketplace",
  description: "Find and book marquee halls, photo studios, and pre-loved bridal wear rentals in Pakistan, powered by Airbnb-style visual discoverability.",
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ExploreClient />
    </Suspense>
  )
}
