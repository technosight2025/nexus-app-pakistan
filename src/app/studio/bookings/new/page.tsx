"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react"
import StepIndicator from "@/components/studio/booking-wizard/StepIndicator"
import Step1Client from "@/components/studio/booking-wizard/Step1Client"
import Step2Event from "@/components/studio/booking-wizard/Step2Event"
import Step3Team from "@/components/studio/booking-wizard/Step3Team"
import Step4Pricing from "@/components/studio/booking-wizard/Step4Pricing"
import Step5Review from "@/components/studio/booking-wizard/Step5Review"
import type { BookingFormData } from "@/components/studio/booking-wizard/types"

const DEFAULT_SERVICES = [
  { id: "photography", name: "Photography", defaultPrice: 60000, price: "", selected: false },
  { id: "videography", name: "Videography", defaultPrice: 45000, price: "", selected: false },
  { id: "drone", name: "Drone Footage", defaultPrice: 20000, price: "", selected: false },
  { id: "album", name: "Printed Album", defaultPrice: 25000, price: "", selected: false },
  { id: "live-stream", name: "Live Streaming", defaultPrice: 15000, price: "", selected: false },
  { id: "same-day-edit", name: "Same-Day Edit", defaultPrice: 30000, price: "", selected: false },
]

const INITIAL_DATA: BookingFormData = {
  clientMode: "existing",
  selectedClientId: null,
  selectedClient: null,
  newClient: { name: "", phone: "", email: "", city: "", type: "Bride" },
  eventType: "",
  eventDate: "",
  shift: "",
  guestCount: "",
  venueName: "",
  venueCity: "",
  teamMembers: [],
  services: DEFAULT_SERVICES,
  customServices: [],
  packageName: "",
  totalAmount: "",
  advanceAmount: "",
  paymentDueDate: "",
  notes: "",
}

const STEP_LABELS = ["Client", "Event Details", "Team & Services", "Package & Pricing", "Review & Confirm"]

function validateStep(step: number, data: BookingFormData): string | null {
  if (step === 1) {
    if (data.clientMode === "existing" && !data.selectedClientId) return "Please select a client."
    if (data.clientMode === "new" && !data.newClient?.name?.trim()) return "Please enter the client's name."
    if (data.clientMode === "new" && !data.newClient?.phone?.trim()) return "Please enter the client's phone number."
  }
  if (step === 2) {
    if (!data.eventType) return "Please select an event type."
    if (!data.eventDate) return "Please select the event date."
    if (!data.shift) return "Please select a shift/occasion."
    if (!data.venueCity) return "Please select the venue city."
  }
  if (step === 3) {
    if (!data.teamMembers.length) return "Please assign at least one team member."
    if (!data.services.some(s => s.selected)) return "Please select at least one service."
  }
  if (step === 4) {
    if (!data.packageName) return "Please select a package."
    if (!data.totalAmount) return "Please enter the total amount."
    if (!data.advanceAmount) return "Please enter the advance payment."
  }
  return null
}

export default function NewBookingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_DATA)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [direction, setDirection] = useState<"forward" | "back">("forward")

  const updateData = (updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    setError(null)
  }

  const handleNext = () => {
    const err = validateStep(currentStep, formData)
    if (err) { setError(err); return }
    setError(null)
    setDirection("forward")
    setCurrentStep(s => Math.min(5, s + 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setError(null)
    setDirection("back")
    setCurrentStep(s => Math.max(1, s - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleJumpTo = (step: number) => {
    setError(null)
    setDirection(step < currentStep ? "back" : "forward")
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200))
    console.log("Booking Created:", formData)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  // Success screen
  if (isSuccess) {
    const clientName = formData.clientMode === "existing"
      ? formData.selectedClient?.name
      : formData.newClient?.name
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#EEF2FF] dark:bg-indigo-500/10 flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-[#4F46E5]" />
        </div>
        <h2 className="text-[28px] font-black text-[#111827] dark:text-white mb-2">Booking Created!</h2>
        <p className="text-[14px] text-[#6B7280] dark:text-gray-400 max-w-sm">
          The booking for <strong className="text-[#111827] dark:text-white">{clientName}</strong> has been added to your dashboard.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <button
            onClick={() => router.push("/studio/bookings")}
            className="px-6 py-3 bg-[#4F46E5] hover:bg-indigo-700 text-white rounded-2xl text-[13px] font-black transition-all cursor-pointer shadow-md hover:shadow-lg"
          >
            View All Bookings
          </button>
          <button
            onClick={() => { setIsSuccess(false); setFormData(INITIAL_DATA); setCurrentStep(1) }}
            className="px-6 py-3 bg-[#F8FAFC] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-[#374151] dark:text-gray-300 rounded-2xl text-[13px] font-black transition-all cursor-pointer hover:bg-[#EEF2FF] hover:text-[#4F46E5]"
          >
            Create Another Booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32">

      {/* Page Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/studio/bookings")}
          className="w-9 h-9 rounded-xl border border-[#E5E7EB] dark:border-white/10 flex items-center justify-center text-[#6B7280] hover:bg-[#F8FAFC] dark:hover:bg-white/5 hover:text-[#4F46E5] transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-[18px] font-black text-[#111827] dark:text-white">New Booking</h1>
          <p className="text-[11px] text-[#9CA3AF]">Step {currentStep} of 5 — {STEP_LABELS[currentStep - 1]}</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 md:p-6">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl">
          <X className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-[12px] font-semibold text-red-700 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-white/8 rounded-2xl p-5 md:p-8">
        {currentStep === 1 && <Step1Client data={formData} onChange={updateData} />}
        {currentStep === 2 && <Step2Event data={formData} onChange={updateData} />}
        {currentStep === 3 && <Step3Team data={formData} onChange={updateData} />}
        {currentStep === 4 && <Step4Pricing data={formData} onChange={updateData} />}
        {currentStep === 5 && <Step5Review data={formData} onJumpTo={handleJumpTo} />}
      </div>

      {/* Sticky Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#0A0A0F]/95 backdrop-blur-md border-t border-[#E5E7EB] dark:border-white/8 px-4 py-4 md:px-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">

          {/* Progress dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {[1,2,3,4,5].map(n => (
              <div
                key={n}
                className={`rounded-full transition-all duration-300 ${
                  n === currentStep ? "w-6 h-2 bg-[#4F46E5]" : n < currentStep ? "w-2 h-2 bg-[#4F46E5]/60" : "w-2 h-2 bg-[#E5E7EB] dark:bg-white/15"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] dark:border-white/10 text-[12px] font-black text-[#374151] dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-indigo-700 text-white text-[12px] font-black cursor-pointer transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22C55E] hover:bg-green-600 text-white text-[12px] font-black cursor-pointer transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Confirm Booking
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
