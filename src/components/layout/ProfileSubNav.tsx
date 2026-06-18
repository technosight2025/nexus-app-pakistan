"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Tab {
  id: string
  label: string
}

interface ProfileSubNavProps {
  price: number | string
  priceSuffix?: string
  targetWidgetId?: string
  tabs?: Tab[]
}

const DEFAULT_TABS: Tab[] = [
  { id: "gallery", label: "Photos" },
  { id: "about", label: "About" },
  { id: "amenities", label: "Amenities" },
  { id: "packages", label: "Packages" },
  { id: "availability", label: "Availability" }
]

export function ProfileSubNav({
  price,
  priceSuffix = "/ head",
  targetWidgetId = "booking-widget",
  tabs = DEFAULT_TABS
}: ProfileSubNavProps) {
  const [activeTab, setActiveTab] = useState<string>("")
  const [visible, setVisible] = useState(false)

  // Smooth scroll handler with offset for sticky nav
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80 // Sticky header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: id === "gallery" ? 0 : offsetPosition,
        behavior: "smooth"
      })
      setActiveTab(id)
    }
  }

  const handleBookClick = () => {
    const el = document.getElementById(targetWidgetId)
    if (el) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky navbar after scroll past 450px
      setVisible(window.scrollY > 450)

      if (tabs && tabs.length > 0) {
        let currentActive = ""
        const offset = 120 // Sticky nav height + buffer

        for (const tab of tabs) {
          const el = document.getElementById(tab.id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= offset) {
              currentActive = tab.id
            }
          }
        }

        // Default to first tab if we are scrolled to the top
        if (!currentActive && window.scrollY < 600) {
          currentActive = tabs[0].id
        }

        setActiveTab(currentActive)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial run
    return () => window.removeEventListener("scroll", handleScroll)
  }, [tabs])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 inset-x-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-50 shadow-sm hidden md:block"
        >
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            {/* Left Column: Anchors */}
            <div className="flex items-center gap-8 h-full">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleScrollTo(tab.id)}
                    className="relative text-sm font-semibold tracking-tight text-slate-600 hover:text-slate-900 transition-colors h-full flex items-center select-none"
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeSubNavTab"
                        className="absolute bottom-0 inset-x-0 h-[3px] bg-slate-900 rounded-t-full"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right Column: Dynamic Price Summary + Booking CTA */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-lg font-black text-slate-900">
                  ₨ {typeof price === "number" ? price.toLocaleString() : price}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-1">
                  {priceSuffix}
                </span>
              </div>
              <button
                onClick={handleBookClick}
                className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95"
              >
                Request to Book
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
