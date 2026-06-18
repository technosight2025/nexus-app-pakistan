import * as React from "react"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/button"

export function ForVendors() {
  const features = [
    "Professional portfolio web page under your private name",
    "WhatsApp lead generation pipelines and quotation managers",
    "Analytics dashboards tracking bookings and conversion rates",
    "Modular software suites for slot locking and wage tracking"
  ]

  return (
    <section id="pricing" className="py-20 bg-white border-b border-[#E6E2DA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Features */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F5B3E]/10 text-[#0F5B3E] font-heading font-black text-[10px] uppercase tracking-widest">
              💼 Nexus Business Suite
            </span>
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#1A1A1A] leading-tight">
              Grow Your Event Business
            </h2>
            
            <p className="text-sm sm:text-base text-slate-500 font-semibold leading-relaxed">
              Join 500+ premium Pakistani event businesses—from banquets to filmmakers—utilizing Nexus to automate slots and convert customer inquires.
            </p>

            <ul className="space-y-3 pt-2">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-xs sm:text-sm font-bold text-[#1A1A1A]">
                  <CheckCircle2 className="w-5 h-5 text-[#0F5B3E] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <Button asChild variant="emeraldSolid" className="w-full sm:w-auto h-12 px-8">
                <Link href="/register?role=vendor">Start Free Trial</Link>
              </Button>
              <Link
                href="/register?role=vendor"
                className="text-sm font-black text-[#0F5B3E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Mockup */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#FDF8F0] border border-[#E6E2DA] rounded-[2.5rem] p-6 sm:p-8 shadow-xs relative overflow-hidden text-left">
              {/* Shimmer */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/5 blur-2xl rounded-full" />
              
              {/* Fake dashboard header */}
              <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-4 mb-6">
                <div>
                  <h4 className="text-xs font-black text-[#1A1A1A] uppercase">Organization OS</h4>
                  <span className="text-[9px] text-[#6B7280] font-bold">Standard Tier Suite • Active</span>
                </div>
                <span className="text-[9px] font-black text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20 uppercase tracking-wider">
                  Enterprise
                </span>
              </div>

              {/* Fake pipeline */}
              <div className="space-y-4">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Recent Lead Pipings</span>
                
                {[
                  { title: "Zainab Wedding (250 Guests)", stage: "Quotation Sent", date: "Today", value: "PKR 450,000", color: "bg-amber-100 text-amber-800 border-amber-200" },
                  { title: "Corporate Seminar Slot", stage: "Booking Confirmed", date: "Yesterday", value: "PKR 350,000", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-[#E6E2DA] rounded-2xl p-4 flex items-center justify-between shadow-3xs">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-[#1A1A1A]">{item.title}</p>
                      <div className="flex gap-2 items-center">
                        <span className={`text-[8.5px] font-black border px-2 py-0.5 rounded-full ${item.color}`}>
                          {item.stage}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold">{item.date}</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#1A1A1A]">{item.value}</span>
                  </div>
                ))}

                {/* Performance stats mini card */}
                <div className="pt-2">
                  <div className="bg-white border border-[#E6E2DA] rounded-2xl p-4 flex justify-between items-center shadow-3xs">
                    <div>
                      <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Conversion rate</span>
                      <p className="text-lg font-heading font-black text-[#0F5B3E] mt-0.5">28.4%</p>
                    </div>
                    <div className="w-12 h-6 bg-[#0F5B3E]/10 rounded border border-[#0F5B3E]/20 flex items-center justify-center text-[9px] font-black text-[#0F5B3E]">
                      ↑ +4.2%
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
