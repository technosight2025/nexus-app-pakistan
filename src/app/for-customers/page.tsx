import React from 'react'
import { Metadata } from 'next'
import { ForCustomersClient } from '@/components/customers/ForCustomersClient'

export const metadata: Metadata = {
  title: "Nexus Ecosystem | Elite Event Planning Toolkit",
  description: "Plan weddings, invite guests, track RSVPs, and discover bespoke venues and professionals in Pakistan.",
}

export default function ForCustomersPage() {
  return (
    <main className="min-h-screen bg-[#FAF5EC]">
      <ForCustomersClient />
    </main>
  )
}
