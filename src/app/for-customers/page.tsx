import React from 'react'
import { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { MegaFooter } from '@/components/layout/MegaFooter'
import { CustomerHero } from '@/components/customers/CustomerHero'
import { CustomerFeatures } from '@/components/customers/CustomerFeatures'
import { CustomerCTA } from '@/components/customers/CustomerCTA'

export const metadata: Metadata = {
  title: "Nexus for Customers | Elite Event Planning Toolkit",
  description: "Plan weddings, invite guests, track RSVPs, and preserve shared memories in one elegant Pakistani event platform.",
}

export default function ForCustomersPage() {
  return (
    <PublicLayout>
      <main className="bg-white min-h-screen">
        <CustomerHero />
        <CustomerFeatures />
        <CustomerCTA />
        <MegaFooter />
      </main>
    </PublicLayout>
  )
}
