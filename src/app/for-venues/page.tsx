import React from 'react'
import { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { MegaFooter } from '@/components/layout/MegaFooter'
import { VenueHero } from '@/components/venues-solution/VenueHero'
import { VenueFeatures } from '@/components/venues-solution/VenueFeatures'
import { VenueCTA } from '@/components/venues-solution/VenueCTA'

export const metadata: Metadata = {
  title: "Nexus for Venues | Marquee & Banquet Hall Operating System",
  description: "Ditch double bookings. Manage booking calendars, digital welcome signs, staff schedules, and revenue projections from one venue dashboard.",
}

export default function ForVenuesPage() {
  return (
    <PublicLayout>
      <main className="bg-white min-h-screen">
        <VenueHero />
        <VenueFeatures />
        <VenueCTA />
        <MegaFooter />
      </main>
    </PublicLayout>
  )
}
