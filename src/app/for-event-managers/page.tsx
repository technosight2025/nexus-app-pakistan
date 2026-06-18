import React from 'react'
import { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { MegaFooter } from '@/components/layout/MegaFooter'
import { PlannerHero } from '@/components/planners-solution/PlannerHero'
import { PlannerFeatures } from '@/components/planners-solution/PlannerFeatures'
import { PlannerCTA } from '@/components/planners-solution/PlannerCTA'

export const metadata: Metadata = {
  title: "Nexus for Event Managers | Unified Planning & Cost Control Workspace",
  description: "Stop client budget overruns. Track check sheets, allocate category expenses, invoice payments, and coordinate venues and decorators from one workspace.",
}

export default function ForEventManagersPage() {
  return (
    <PublicLayout>
      <main className="bg-white min-h-screen">
        <PlannerHero />
        <PlannerFeatures />
        <PlannerCTA />
        <MegaFooter />
      </main>
    </PublicLayout>
  )
}
