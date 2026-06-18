import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Inbox, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LeadCapturePopup() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [whatsappOptIn, setWhatsappOptIn] = React.useState(true)
  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    // Show only once per session
    const hasSeenPopup = sessionStorage.getItem("hasSeenLeadPopup")
    if (hasSeenPopup) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor moves out of top viewport
      if (e.clientY < 20) {
        setIsOpen(true)
        sessionStorage.setItem("hasSeenLeadPopup", "true")
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Log event / Submit to database
    console.log("Newsletter lead capture:", { email, whatsappOptIn })
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-[#FDF8F0] border border-[#D4AF37]/30 rounded-[2rem] p-8 shadow-2xl overflow-hidden text-center z-10"
          >
            {/* Design patterns */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0F5B3E] via-[#D4AF37] to-[#EC4899]" />
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-[#D4AF37]/10 blur-xl rounded-full" />
            <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 bg-[#0F5B3E]/10 blur-xl rounded-full" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-[#1A1A1A] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-[#D4AF37]/15 rounded-full flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#1A1A1A]">
                    Get Wedding Planning Tips!
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    Join our newsletter to receive curated venue catalogs, checklist schedules, and exclusive vendor coupons in Pakistan.
                  </p>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="lead-email" className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Inbox className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                      id="lead-email"
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#E6E2DA] bg-white outline-none focus:border-[#0F5B3E] focus:ring-2 focus:ring-[#0F5B3E]/10 placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                </div>

                {/* Checkbox Opt-in */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={whatsappOptIn}
                      onChange={(e) => setWhatsappOptIn(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        "w-4.5 h-4.5 rounded border flex items-center justify-center transition-all",
                        whatsappOptIn ? "bg-[#0F5B3E] border-[#0F5B3E]" : "border-[#E6E2DA] bg-white"
                      )}
                    >
                      {whatsappOptIn && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <span className="text-xs text-[#6B7280] font-medium leading-normal">
                    Also send me planning checklists and updates directly via WhatsApp
                  </span>
                </label>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="emeraldSolid"
                  className="w-full h-12 text-sm"
                >
                  Send Me Inspiration
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 py-4"
              >
                <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Check className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#1A1A1A]">
                  You're on the list!
                </h3>
                <p className="text-sm text-[#6B7280] max-w-xs mx-auto">
                  Thank you! Check your inbox soon for your event planning catalog and digital checklists.
                </p>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="px-6 h-10 font-bold border-[#E6E2DA] hover:bg-slate-100"
                >
                  Close
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
