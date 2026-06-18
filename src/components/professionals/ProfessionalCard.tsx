import { Star, MapPin, CheckCircle2, ShieldCheck, Heart } from "lucide-react"
import Link from "next/link"

export interface ProfessionalCardProps {
  id: string
  name: string
  category: string
  location: string
  rating: number
  reviews: number
  price: number
  imageUrl: string
  verificationLevel: "Basic" | "Verified" | "Premium" | "Elite"
  featured?: boolean
}

export function ProfessionalCard(props: ProfessionalCardProps) {
  const getVerificationBadge = () => {
    switch (props.verificationLevel) {
      case "Elite":
        return (
          <div className="flex items-center gap-1 bg-[#C9A227]/10 text-[#C9A227] px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border border-[#C9A227]/20">
            <ShieldCheck className="w-3 h-3" /> Elite Pro
          </div>
        )
      case "Premium":
        return (
          <div className="flex items-center gap-1 bg-[#0F5B3E]/10 text-[#0F5B3E] px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border border-[#0F5B3E]/20">
            <CheckCircle2 className="w-3 h-3" /> Premium
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-[#0F5B3E]/20 transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={props.imageUrl}
          alt={props.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {props.featured && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
            Featured
          </div>
        )}

        <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-[#D9467A] transition-colors shadow-sm">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-[#0F5B3E] transition-colors">
                {props.name}
              </h3>
              {getVerificationBadge()}
            </div>
            <p className="text-sm font-medium text-slate-500">{props.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 mb-5">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="truncate max-w-[100px]">{props.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
            <span className="font-bold text-slate-900">{props.rating}</span>
            <span className="text-slate-400">({props.reviews})</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium mb-0.5">Starting from</p>
            <p className="font-bold text-slate-900">
              Rs. {props.price.toLocaleString()}
            </p>
          </div>
          <Link 
            href={`/professionals/${props.id}`}
            className="px-5 py-2.5 bg-slate-50 text-slate-900 font-semibold rounded-xl text-sm hover:bg-[#0F5B3E] hover:text-white transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
