import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, Briefcase } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F5B3E]/5 via-[#FDF8F0]/30 to-[#FDF8F0] pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0F5B3E]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10 text-center space-y-6 max-w-4xl">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/35 text-[#0F5B3E] font-heading font-extrabold text-xs uppercase tracking-widest mx-auto shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>Pakistan's Event Ecosystem</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.12] tracking-tight max-w-3xl mx-auto">
          Where Events Connect,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5B3E] via-[#D4AF37] to-[#EC4899]">
            Creators Grow
          </span>
          , and Memories Last Forever
        </h1>

        {/* Subheadline */}
        <p className="text-slate-500 font-medium text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Find Pakistan's best venues, photographers, caterers, and creators – all in one WhatsApp-friendly platform.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            variant="emeraldSolid"
            className="w-full sm:w-auto min-h-[48px] px-8 text-sm flex items-center justify-center gap-2"
          >
            <Link href="/search">
              <span>🎉 Start Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="goldOutline"
            className="w-full sm:w-auto min-h-[48px] px-8 text-sm flex items-center justify-center gap-2 border-[#D4AF37] text-[#D4AF37]"
          >
            <Link href="/register?role=vendor">
              <Briefcase className="w-4 h-4" />
              <span>💼 Become a Vendor</span>
            </Link>
          </Button>
        </div>

        {/* Stats ticker */}
        <div className="pt-10 flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-[#6B7280]">
          <span>Trusted by 500+ verified vendors</span>
          <span className="text-[#D4AF37] hidden sm:inline">•</span>
          <span>10,000+ happy customers</span>
          <span className="text-[#D4AF37] hidden sm:inline">•</span>
          <span>Built for premium standard hospitality 🇵🇰</span>
        </div>

      </Container>
    </section>
  )
}
