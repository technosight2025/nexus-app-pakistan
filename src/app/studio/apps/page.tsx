"use client"

import React, { Suspense } from "react"
import { NexusAppsView } from "@/components/dashboard/venue/NexusAppsView"

function AppMarketplacePageContent() {
  return (
    <div className="w-full">
      <NexusAppsView />
    </div>
  )
}

export default function AppMarketplacePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-48">
        <span className="text-sm font-bold text-gray-400 dark:text-gray-500 animate-pulse">Loading App Store...</span>
      </div>
    }>
      <AppMarketplacePageContent />
    </Suspense>
  )
}
