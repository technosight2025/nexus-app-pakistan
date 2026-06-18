"use client"

import React, { useState } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { B2bHero } from "@/components/b2b/B2bHero"
import { B2bModules } from "@/components/b2b/B2bModules"
import { B2bSimulator } from "@/components/b2b/B2bSimulator"
import { B2bRegistration } from "@/components/b2b/B2bRegistration"

export default function B2bSolutionsPage() {
  // Shared translation state
  const [isUrdu, setIsUrdu] = useState(false)

  return (
    <PublicLayout>
      <div className="bg-[#FAF7F2] min-h-screen">
        {/* B2B Hero Header with Language Selector toggle */}
        <B2bHero isUrdu={isUrdu} onToggleLanguage={setIsUrdu} />

        {/* Modules Grid list details */}
        <B2bModules isUrdu={isUrdu} />

        {/* Interactive availability slots simulator */}
        <B2bSimulator isUrdu={isUrdu} />

        {/* B2B Business Registration Forms */}
        <B2bRegistration isUrdu={isUrdu} />

        {/* Layout Footer */}
        <MegaFooter />
      </div>
    </PublicLayout>
  )
}
