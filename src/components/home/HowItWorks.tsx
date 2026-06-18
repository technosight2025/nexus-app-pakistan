import * as React from "react"
import { Container } from "@/components/ui/Container"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      emoji: "🔍",
      title: "Discover",
      desc: "Browse premium verified vendors by category, location, or customized budget distributions.",
    },
    {
      step: "02",
      emoji: "💬",
      title: "Connect",
      desc: "Connect instantly on WhatsApp, discuss your creative preferences, and receive quick pricing quotation cards.",
    },
    {
      step: "03",
      emoji: "🎉",
      title: "Celebrate",
      desc: "Plan details with our built-in calculators, track routes on the map, and preserve galleries inside the vault.",
    }
  ]

  return (
    <section className="py-20 bg-[#FDF8F0] border-b border-[#E6E2DA]">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] font-black uppercase text-[#0F5B3E] tracking-widest bg-[#0F5B3E]/10 px-3 py-1 rounded-full border border-[#0F5B3E]/20">
            🪜 Process Timeline
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A1A1A]">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
            Planning event structures has never been more straightforward. We organize coordinates in three stages.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting dashed line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-[#E6E2DA] z-0" />

          {steps.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#E6E2DA] rounded-[20px] p-8 text-center flex flex-col items-center justify-between hover:border-[#D4AF37]/30 transition-all duration-300 relative z-10 shadow-2xs hover:shadow-xs group"
            >
              <div className="space-y-4">
                {/* Step indicator */}
                <div className="w-12 h-12 rounded-2xl bg-[#0F5B3E] text-white flex items-center justify-center font-heading font-black text-sm shadow-md group-hover:scale-105 transition-transform">
                  {item.step}
                </div>

                <div className="text-3xl pt-2">{item.emoji}</div>

                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-lg text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] font-medium leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}
