import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { VendorCard } from "@/components/ui/VendorCard"

export function FeaturedVendors() {
  const featured = [
    {
      name: "The Royal Palms Banquet",
      category: "Venues",
      price: "450,000",
      rating: 4.9,
      reviewsCount: 140,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
      whatsapp: "923001234567"
    },
    {
      name: "DeLumiere Cinematic Studios",
      category: "Photographers",
      price: "75,000 / day",
      rating: 4.9,
      reviewsCount: 92,
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop",
      whatsapp: "923005555555"
    },
    {
      name: "Marigold Catering Masters",
      category: "Caterers",
      price: "1,500 / plate",
      rating: 4.8,
      reviewsCount: 110,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop",
      whatsapp: "923004444444"
    }
  ]

  return (
    <section className="py-20 bg-white border-b border-[#E6E2DA]">
      <Container>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 gap-4 text-left">
          <div>
            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
              ✨ Premium Showcase
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] mt-2">
              Featured Creators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
              Highly requested, verified service providers with premium ratings and locked slot schedules.
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-black text-[#0F5B3E] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All Creators</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Responsive Layout Grid (Horizontal swipe on mobile, grid on desktop) */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 no-scrollbar pb-6 md:pb-0 w-full shrink-0">
          {featured.map((vendor) => (
            <div key={vendor.name} className="w-[280px] sm:w-[320px] md:w-auto shrink-0 flex flex-col">
              <VendorCard {...vendor} />
            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}
