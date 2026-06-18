import React from 'react'
import { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { MegaFooter } from '@/components/layout/MegaFooter'
import { RestaurantHero } from '@/components/restaurants-solution/RestaurantHero'
import { RestaurantFeatures } from '@/components/restaurants-solution/RestaurantFeatures'
import { RestaurantCTA } from '@/components/restaurants-solution/RestaurantCTA'

export const metadata: Metadata = {
  title: "Nexus for Restaurants | Table Reservations & Digital QR Menu System",
  description: "Ditch double bookings. Manage reservation calendars, digital welcome signs, table allocations, and food pricing from one dashboard.",
}

export default function ForRestaurantsPage() {
  return (
    <PublicLayout>
      <main className="bg-white min-h-screen">
        <RestaurantHero />
        <RestaurantFeatures />
        <RestaurantCTA />
        <MegaFooter />
      </main>
    </PublicLayout>
  )
}
