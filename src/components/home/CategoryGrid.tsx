import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/ui/Container"

export function CategoryGrid() {
  const categories = [
    { name: "Venues", count: "120+", emoji: "🏰", slug: "venues" },
    { name: "Photographers", count: "85+", emoji: "📸", slug: "photographers" },
    { name: "Caterers", count: "60+", emoji: "🍲", slug: "caterers" },
    { name: "Decorators", count: "45+", emoji: "🌸", slug: "decorators" },
    { name: "Makeup Artists", count: "40+", emoji: "💄", slug: "makeup-artists" },
    { name: "Qawwals", count: "15+", emoji: "🎤", slug: "qawwals" },
    { name: "Rentals", count: "30+", emoji: "🚗", slug: "rentals" },
    { name: "Event Planners", count: "25+", emoji: "📋", slug: "planners" },
    { name: "Videographers", count: "35+", emoji: "🎥", slug: "videographers" }
  ]

  return (
    <section className="py-20 bg-white border-b border-[#E6E2DA]">
      <Container>
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
            🗂️ Browse Directories
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1A1A1A]">
            Browse by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
            Find checked, highly-rated specialists in Pakistan matching your event needs.
          </p>
        </div>

        {/* 3x3 Grid (2x2 on Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/search?category=${cat.slug}`}
              className="group bg-[#FDF8F0]/40 hover:bg-white border border-[#E6E2DA] hover:border-[#D4AF37]/50 rounded-[20px] p-6 text-center flex flex-col items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(212,175,55,0.08)] transition-all duration-300 cursor-pointer h-36"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300 select-none">
                {cat.emoji}
              </span>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#1A1A1A]">
                {cat.name}
              </h3>
              <span className="text-[10px] font-black tracking-widest text-[#0F5B3E] bg-[#0F5B3E]/5 px-2.5 py-0.5 rounded-full border border-[#0F5B3E]/10">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>

      </Container>
    </section>
  )
}
