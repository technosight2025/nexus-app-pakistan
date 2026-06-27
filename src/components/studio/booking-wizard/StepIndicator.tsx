import { Check } from "lucide-react"

const STEPS = [
  { number: 1, label: "Client" },
  { number: 2, label: "Event" },
  { number: 3, label: "Team" },
  { number: 4, label: "Pricing" },
  { number: 5, label: "Review" },
]

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-4 h-px bg-[#E5E7EB] dark:bg-white/10 z-0 mx-8" />
        {/* Filled progress line */}
        <div
          className="absolute left-0 top-4 h-px bg-[#4F46E5] z-0 ml-8 transition-all duration-500"
          style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 4rem + ${currentStep === STEPS.length ? "1rem" : "0px"})` }}
        />

        {STEPS.map((step) => {
          const isDone = step.number < currentStep
          const isActive = step.number === currentStep
          return (
            <div key={step.number} className="flex flex-col items-center gap-2 z-10">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all duration-300",
                  isDone
                    ? "bg-[#4F46E5] border-[#4F46E5] text-white scale-100"
                    : isActive
                    ? "bg-white dark:bg-[#111118] border-[#4F46E5] text-[#4F46E5] scale-110 shadow-md shadow-indigo-200 dark:shadow-indigo-900/40"
                    : "bg-white dark:bg-[#111118] border-[#E5E7EB] dark:border-white/15 text-[#9CA3AF]",
                ].join(" ")}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={`text-[9px] font-black uppercase tracking-widest hidden sm:block transition-colors ${
                  isActive ? "text-[#4F46E5]" : isDone ? "text-[#6B7280] dark:text-gray-400" : "text-[#9CA3AF]"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
