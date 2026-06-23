"use client"

import React from 'react'
import Link from 'next/link'
import { Star, MapPin, ArrowLeftRight, Calendar, Heart } from 'lucide-react'
import { useFavorites } from '@/contexts/FavoritesContext'

export interface MarketplaceCardProps {
  id: string
  type: 'venue' | 'photographer' | 'decorator' | 'package' | 'workforce'
  name: string
  category: string
  location: string
  rating: number
  reviews: number
  price: string
  images: string[]
  avatar?: string
  badge?: string
  previews?: string[]
  isVerified?: boolean
  isPremium?: boolean
  compareList: string[]
  setCompareList: React.Dispatch<React.SetStateAction<string[]>>
  features?: string[]
  bookedDates?: string[]
  onSelect?: () => void
}

export function MarketplaceCard({ 
  id, type, category, name, location, rating, reviews, price, images, avatar, compareList, setCompareList, features, bookedDates, onSelect
}: MarketplaceCardProps) {
  
  const getCategorySlug = (vendorType: string, vendorCategory: string) => {
    if (vendorType === 'venue') return 'marriage-halls'
    if (vendorType === 'photographer') return 'photographers'
    if (vendorType === 'decorator') return 'decorators'
    if (vendorType === 'package') return 'caterers'
    if (vendorType === 'workforce') return 'rentals'
    return 'marriage-halls'
  }

  const categorySlug = getCategorySlug(type, category)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const isShortlisted = isFavorite(id)

  const handleShortlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isShortlisted) {
      removeFavorite(id)
    } else {
      addFavorite({ id, name, category, type, price, image: images[0] })
    }
  }

  const mainImage = images[0] || "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800"

  return (
    <div className="bg-white rounded-xl border border-[#E6E2DA] p-3 flex flex-col gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
      
      {/* Top Section: Avatar & Info */}
      <div className="flex gap-3 items-start">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
          <img src={avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150"} alt={name} className="w-full h-full object-cover" />
        </div>
        
        {/* Info Stack */}
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 truncate leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-600">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-slate-800">{rating.toFixed(1)}</span>
            <span className="mx-0.5">•</span>
            <span>{reviews} reviews</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-[11px] font-medium text-slate-500">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Image with Preview Button */}
      <div 
        onClick={() => onSelect && onSelect()}
        className="relative w-full aspect-[16/9] rounded-lg overflow-hidden group bg-slate-100 cursor-pointer"
      >
        <img src={mainImage} alt={name} className="w-full h-full object-cover" />
        {/* Preview Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-black/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer">
            Quick View
          </button>
        </div>
      </div>

      {/* Features & Availability */}
      {(features || bookedDates) && (
        <div className="flex flex-col gap-2 mt-1">
          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-medium truncate max-w-[120px]">
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="text-slate-400 text-[10px] px-1 font-medium">+{features.length - 3}</span>
              )}
            </div>
          )}
          {bookedDates && bookedDates.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-500 bg-rose-50 px-2 py-1 rounded-md">
              <Calendar className="w-3 h-3 shrink-0" />
              <span className="truncate">Booked: {bookedDates.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Section: Price & Actions */}
      <div className="flex flex-col gap-2.5 mt-auto">
        <div className="flex flex-col gap-0.5 mt-1">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Starting Price</span>
          <div className="text-[15px] font-black text-slate-900 leading-none">
            Rs. {price}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onSelect) onSelect();
            }}
            className="flex-1 bg-[#1B3B2B] hover:bg-[#132A1E] text-white py-2 rounded border border-[#1B3B2B] text-xs font-bold text-center transition-colors shadow-sm cursor-pointer"
          >
            Explore & Book
          </button>
          <button 
            onClick={handleShortlistToggle}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded border text-xs font-semibold transition-colors cursor-pointer ${
              isShortlisted 
                ? 'bg-rose-50 border-rose-200 text-rose-500' 
                : 'bg-white border-[#D5CFC0] text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-rose-500' : ''}`} />
            {isShortlisted ? 'Saved' : 'Shortlist'}
          </button>
        </div>
      </div>


    </div>
  )
}
