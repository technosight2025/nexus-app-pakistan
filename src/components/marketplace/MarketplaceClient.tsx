"use client"

import { useState } from "react"
import { MarketplaceHero } from "./MarketplaceHero"
import { MetricsPanel } from "./MetricsPanel"
import { BudgetArchitect } from "./BudgetArchitect"
import { BroadcastMenu } from "./BroadcastMenu"
import { CreativeTabs } from "./CreativeTabs"
import { CurationsShowcase } from "./CurationsShowcase"
import { IntuitionChat } from "./IntuitionChat"
import { WhatsAppButton } from "./WhatsAppButton"
import { useLanguage } from "@/contexts/LanguageContext"

export function MarketplaceClient() {
  const { isRomanUrdu, setIsRomanUrdu } = useLanguage()

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10 space-y-10 md:space-y-14">
      {/* 1. Global Executive Hero - passing state and setter */}
      <MarketplaceHero isRomanUrdu={isRomanUrdu} setIsRomanUrdu={setIsRomanUrdu} />

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        
        {/* Left Column (8 cols wide on desktop) */}
        <div className="lg:col-span-8 space-y-10 md:space-y-12">
          {/* B2B Metrics Suite */}
          <MetricsPanel />

          {/* Creative Suite (Invitations & Memory Tabs) - passing Urdu state */}
          <CreativeTabs isRomanUrdu={isRomanUrdu} />

          {/* Elite Curations Showcase */}
          <CurationsShowcase />
        </div>

        {/* Right Column (4 cols wide on desktop) */}
        <div className="lg:col-span-4 space-y-10 md:space-y-12">
          {/* Event Budget Designer */}
          <BudgetArchitect />

          {/* Digital Menu & Broadcaster */}
          <BroadcastMenu />
        </div>

      </div>

      {/* Floating Widgets */}
      <IntuitionChat />
      <WhatsAppButton />
    </div>
  )
}
