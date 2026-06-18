import React from 'react'
import { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { MegaFooter } from '@/components/layout/MegaFooter'
import { StudioHero } from '@/components/studios-solution/StudioHero'
import { StudioFeatures } from '@/components/studios-solution/StudioFeatures'
import { StudioCTA } from '@/components/studios-solution/StudioCTA'

export const metadata: Metadata = {
  title: "Nexus for Studios | Wedding Photography & Videography Operating System",
  description: "Ditch slow Google Drive links and USBs. Manage client project timelines, launch Lightroom-synced selection portals, and review video drafts with timestamped comments.",
}

export default function ForStudiosPage() {
  return (
    <PublicLayout>
      <main className="bg-white min-h-screen">
        <StudioHero />
        <StudioFeatures />
        <StudioCTA />
        <MegaFooter />
      </main>
    </PublicLayout>
  )
}
