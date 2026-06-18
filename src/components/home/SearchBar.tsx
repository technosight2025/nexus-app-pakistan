import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Grid, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SearchBar() {
  const router = useRouter()
  const [selectedChip, setSelectedChip] = React.useState("Wedding")
  const [city, setCity] = React.useState("lahore")
  const [category, setCategory] = React.useState("venues")
  const [keyword, setKeyword] = React.useState("")

  const chips = ["Wedding", "Birthday", "Corporate", "Engagement", "Other"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to discover with search params
    router.push(`/search?city=${city}&category=${category}&q=${encodeURIComponent(keyword)}`)
  }

  const popularSearches = [
    { label: "Wedding venues in Lahore", link: "/search?city=lahore&category=venues" },
    { label: "Birthday photographers in Karachi", link: "/search?city=karachi&category=photographers" },
    { label: "Caterers in Islamabad", link: "/search?city=islamabad&category=caterers" }
  ]

  return (
    <section className="py-6 relative z-25">
      <Container className="max-w-4xl">
        <div className="bg-white border border-[#E6E2DA] rounded-[2rem] p-6 md:p-8 shadow-xs space-y-6">
          
          {/* Label & Chips */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-heading font-extrabold text-base text-[#1A1A1A] flex items-center gap-2">
              <span>🔍</span> What are you looking for?
            </h3>
            
            {/* Category Chips Scroll */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1.5 w-full shrink-0">
              {chips.map((chip) => {
                const isSelected = selectedChip === chip
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSelectedChip(chip)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer",
                      isSelected
                        ? "bg-[#0F5B3E]/10 border-[#0F5B3E]/30 text-[#0F5B3E]"
                        : "bg-slate-50 border-[#E6E2DA] text-[#6B7280] hover:bg-slate-100 hover:text-[#1A1A1A]"
                    )}
                  >
                    {chip}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Core Inputs Row */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            
            {/* Select City Dropdown */}
            <div className="flex-1 relative flex items-center">
              <MapPin className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-9 pr-4 py-3.5 text-xs font-bold rounded-xl border border-[#E6E2DA] bg-[#FDF8F0]/30 focus:border-[#0F5B3E] outline-none appearance-none"
              >
                <option value="lahore">Lahore, PK</option>
                <option value="karachi">Karachi, PK</option>
                <option value="islamabad">Islamabad, PK</option>
                <option value="rawalpindi">Rawalpindi, PK</option>
                <option value="faisalabad">Faisalabad, PK</option>
              </select>
              <div className="absolute right-3.5 w-1.5 h-1.5 border-r border-b border-slate-500 rotate-45 pointer-events-none" />
            </div>

            {/* Select Category Dropdown */}
            <div className="flex-1 relative flex items-center">
              <Grid className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-4 py-3.5 text-xs font-bold rounded-xl border border-[#E6E2DA] bg-[#FDF8F0]/30 focus:border-[#0F5B3E] outline-none appearance-none"
              >
                <option value="venues">Venues & Banquets</option>
                <option value="photographers">Photographers</option>
                <option value="caterers">Catering Services</option>
                <option value="decorators">Decor & Stages</option>
                <option value="makeup-artists">Makeup Artists</option>
              </select>
              <div className="absolute right-3.5 w-1.5 h-1.5 border-r border-b border-slate-500 rotate-45 pointer-events-none" />
            </div>

            {/* Keyword Input Search */}
            <div className="flex-[1.5] relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search specific keywords, marquees..."
                className="w-full pl-9 pr-4 py-3.5 text-xs font-semibold rounded-xl border border-[#E6E2DA] bg-[#FDF8F0]/30 focus:border-[#0F5B3E] outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              variant="emeraldSolid"
              className="w-full md:w-auto h-12 px-6 text-xs"
            >
              <span>Search Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Popular searches links */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] text-slate-400 font-bold text-left">
            <span className="uppercase tracking-wider">Popular Searches:</span>
            {popularSearches.map((search, i) => (
              <React.Fragment key={search.label}>
                <a
                  href={search.link}
                  className="text-[#0F5B3E] hover:underline"
                >
                  {search.label}
                </a>
                {i < popularSearches.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
