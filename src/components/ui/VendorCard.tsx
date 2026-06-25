import * as React from "react"
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface VendorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  category: string
  price: string
  rating: number
  reviewsCount?: number
  image?: string
  images?: string[]
  whatsapp: string
}

export function VendorCard({
  name,
  category,
  price,
  rating,
  reviewsCount = 42,
  image,
  images,
  whatsapp,
  className,
  ...props
}: VendorCardProps) {
  const [currentImg, setCurrentImg] = React.useState(0)
  const displayImages = images || (image ? [image] : [])

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImg((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImg((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  // Format WhatsApp Link
  const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(name)},%20I%20found%20you%20on%20Nexus%20and%20would%20love%20to%20inquire%20about%20your%20services!`

  return (
    <div
      className={cn(
        "group bg-white rounded-[20px] overflow-hidden border border-[#E6E2DA] hover:border-[#D4AF37]/50 shadow-xs hover:shadow-[0_12px_24px_rgba(212,175,55,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full",
        className
      )}
      {...props}
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <div className="relative w-full pb-[125%] overflow-hidden bg-slate-100 shrink-0">
        {displayImages.length > 0 && (
          <img
            src={displayImages[currentImg]}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {displayImages.length > 1 && (
          <>
            <button 
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all text-slate-700 shadow-sm z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all text-slate-700 shadow-sm z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {displayImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${idx === currentImg ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        <span className="absolute top-3.5 left-3.5 bg-[#0F5B3E] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-10">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left">
        <div className="space-y-1.5">
          <h4 className="font-heading font-bold text-base text-[#1A1A1A] tracking-tight line-clamp-1 group-hover:text-[#0F5B3E] transition-colors">
            {name}
          </h4>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] shrink-0" />
            <span className="font-bold text-[#1A1A1A]">{rating.toFixed(1)}</span>
            <span className="text-[#6B7280]">({reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-5 pt-4 border-t border-[#E6E2DA] flex items-center justify-between gap-2">
          <div className="text-left">
            <span className="block text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">Starting from</span>
            <span className="font-heading font-extrabold text-sm text-[#1A1A1A]">PKR {price}</span>
          </div>

          <Button
            asChild
            variant="goldOutline"
            size="sm"
            className="h-10 gap-1.5 text-xs font-bold border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
