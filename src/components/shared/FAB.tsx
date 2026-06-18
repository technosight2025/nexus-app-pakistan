import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, PlusCircle, HelpCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function FAB() {
  const [isOpen, setIsOpen] = React.useState(false)
  const fabRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const actions = [
    { label: "Create Event", href: "/create-event", icon: Calendar, color: "bg-emerald-500 text-white" },
    { label: "Add Vendor", href: "/register?role=vendor", icon: PlusCircle, color: "bg-amber-500 text-white" },
    { label: "Quick Inquiry", href: "/search", icon: HelpCircle, color: "bg-pink-500 text-white" }
  ]

  return (
    <div ref={fabRef} className="fixed bottom-24 right-6 md:bottom-24 z-45 flex flex-col items-end gap-3.5">
      {/* Expanded Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 pr-1">
            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 15 }}
                transition={{ delay: (actions.length - 1 - i) * 0.05 }}
                className="flex items-center gap-2.5"
              >
                {/* Tooltip label */}
                <span className="bg-white border border-[#E6E2DA] text-[#1A1A1A] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                  {action.label}
                </span>
                
                {/* Action Button */}
                <Link
                  href={action.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer",
                    action.color
                  )}
                >
                  <action.icon className="w-4.5 h-4.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-[#0F5B3E] text-white flex items-center justify-center shadow-lg hover:shadow-[0_8px_20px_rgba(15,91,62,0.25)] transition-shadow duration-300 cursor-pointer border border-[#D4AF37]/25"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
