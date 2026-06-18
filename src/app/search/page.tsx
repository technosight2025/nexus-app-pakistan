"use client"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { FilterBar } from "@/components/search/FilterBar"
import { MapPlaceholder } from "@/components/search/MapPlaceholder"
import { ListingGrid } from "@/components/search/ListingGrid"
import { PublicLayout } from "@/components/layout/PublicLayout"

function SearchContent() {
  const [activeTab, setActiveTab] = useState<"venues" | "vendors">("venues")
  const searchParams = useSearchParams()
  const rawCity = searchParams ? (searchParams.get("city") || "Lahore") : "Lahore"
  const city = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).toLowerCase()

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden pt-16">
      
      {/* Left Content Area - Scrollable List */}
      <div className="w-full md:w-[55%] lg:w-[60%] h-[calc(100vh-64px)] overflow-y-auto flex flex-col custom-scrollbar">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
          
          {/* Header & Tabs */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-6">
              Discover {activeTab === "venues" ? "Venues" : "Vendors"} in {city}
            </h1>

            {/* Seamless Animated Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl w-full max-w-sm mb-2 relative">
              {/* Animated Background Pill */}
              <motion.div
                className="absolute inset-y-1 bg-white rounded-xl shadow-sm border border-slate-200"
                initial={false}
                animate={{
                  left: activeTab === "venues" ? "4px" : "50%",
                  width: "calc(50% - 4px)"
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />

              <button
                onClick={() => setActiveTab("venues")}
                className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${activeTab === "venues" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Venues
              </button>
              <button
                onClick={() => setActiveTab("vendors")}
                className={`flex-1 py-2.5 text-sm font-bold z-10 transition-colors ${activeTab === "vendors" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Vendors
              </button>
            </div>
          </div>

          <FilterBar />

          {/* Grid Container */}
          <motion.div
            key={activeTab} // Forces re-animation when tab changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ListingGrid activeTab={activeTab} />
          </motion.div>

        </div>
      </div>

      {/* Right Content Area - Sticky Map */}
      <div className="hidden md:block w-[45%] lg:w-[40%] h-[calc(100vh-64px)] sticky top-16 bg-slate-100 border-l border-outline">
        <MapPlaceholder />
      </div>

      {/* Mobile Map Toggle Button (Floating) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button className="bg-foreground text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
          Map View
        </button>
      </div>

    </div>
  )
}

export default function SearchPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><div className="w-8 h-8 border-4 border-[#0F5B3E] border-t-transparent rounded-full animate-spin"></div></div>}>
        <SearchContent />
      </Suspense>
    </PublicLayout>
  )
}
