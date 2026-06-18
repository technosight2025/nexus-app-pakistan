"use client"
import { useState } from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { EventManagerHero } from "@/components/event-managers/EventManagerHero"
import { EventManagerCategories } from "@/components/event-managers/EventManagerCategories"
import { EventManagerFeatured } from "@/components/event-managers/EventManagerFeatured"
import { EventManagerCostEstimator } from "@/components/event-managers/EventManagerCostEstimator"
import { EventManagerBenefits } from "@/components/event-managers/EventManagerBenefits"
import { EventManagerCTA } from "@/components/event-managers/EventManagerCTA"

export default function EventManagersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const handleSearch = (style: string, city: string) => {
    setSearchQuery(style)
    setSelectedCity(city)
  }

  return (
    <PublicLayout>
      <div className="bg-background min-h-screen">
        <EventManagerHero onSearch={handleSearch} />
        <EventManagerCategories />
        <EventManagerFeatured searchQuery={searchQuery} selectedCity={selectedCity} />
        <EventManagerCostEstimator />
        <EventManagerBenefits />
        <EventManagerCTA />
        <MegaFooter />
      </div>
    </PublicLayout>
  )
}
