"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowLeft, Calendar, Share2, Heart, Award, ShieldCheck, Ruler, Scissors, Wand2, Scan } from 'lucide-react'
import VirtualTryOn from '@/components/marketplace/VirtualTryOn'
import BookingModal from '@/components/marketplace/BookingModal'

interface ProductData {
  id: string
  title: string
  tag: string
  price: string
  description: string
  images: string[]
  features: string[]
  bookedDates: string[]
  sizes: string[]
  material: string
  vendorName: string
  vendorId: string
  categorySlug: string
}

export function ProductClient({ product }: { product: ProductData }) {
  const [activeImage, setActiveImage] = useState(0)
  const [isTryOnOpen, setIsTryOnOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-[#E6E2DA] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Link href="/marketplace" className="hover:text-[#0F5B3E] transition-colors">Marketplace</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/marketplace/${product.categorySlug}/${product.vendorId}`} className="hover:text-[#0F5B3E] transition-colors">
              {product.vendorName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{product.title}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Back Link */}
        <Link 
          href={`/marketplace/${product.categorySlug}/${product.vendorId}`} 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0F5B3E] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Vendor Profile
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Gallery & Try On Room */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Gallery */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden cursor-zoom-in">
                <img 
                  src={product.images[activeImage]} 
                  alt={`${product.title} view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md shadow-sm text-xs font-black text-[#052E20] rounded-xl uppercase tracking-wider">
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-[#0F5B3E] scale-[0.98]' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual Try Room Button */}
            <div className="bg-[#052E20] p-8 rounded-3xl border border-[#0A4730] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                  <Wand2 className="w-6 h-6 animate-pulse" />
                  <h3 className="font-serif font-black text-2xl text-white tracking-wide">AI Try-On Studio</h3>
                </div>
                <p className="text-gray-300 font-medium mb-8 leading-relaxed max-w-md">
                  Experience our premium virtual fitting room. Upload a photo to see exactly how this breathtaking piece will look on you.
                </p>
                <button 
                  onClick={() => setIsTryOnOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-yellow-500 hover:opacity-90 text-black font-black rounded-xl text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2"
                >
                  <Scan className="w-5 h-5" /> Enter Virtual Try-Room
                </button>
              </div>
            </div>

            <VirtualTryOn 
              isOpen={isTryOnOpen} 
              onClose={() => setIsTryOnOpen(false)} 
              productImages={product.images} 
              productTitle={product.title} 
            />

          </div>

          {/* Right Column: Product Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h1 className="text-3xl lg:text-4xl font-black text-[#052E20] leading-tight mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-6">
                By <span className="text-[#0F5B3E]">{product.vendorName}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 mx-1"></span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-green-600" /> Verified Premium</span>
              </div>

              <div className="text-3xl font-black text-[#0F5B3E] mb-8">
                Rs. {product.price} <span className="text-sm font-bold text-gray-400">/ rental</span>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-6">
                
                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-1 text-sm border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-500 font-bold mb-1">
                      <Ruler className="w-4 h-4" /> Sizes
                    </div>
                    <span className="font-bold text-slate-800">{product.sizes.join(', ')}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-1 text-sm border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-500 font-bold mb-1">
                      <Scissors className="w-4 h-4" /> Material
                    </div>
                    <span className="font-bold text-slate-800">{product.material}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="bg-[#052E20]/5 text-[#052E20] border border-[#052E20]/10 text-xs px-3 py-1.5 rounded-full font-bold">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                {product.bookedDates.length > 0 ? (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Availability</h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-rose-600 bg-rose-50 px-4 py-3 rounded-xl border border-rose-100">
                      <Calendar className="w-5 h-5" />
                      <span>Booked: {product.bookedDates.join(', ')}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Availability</h3>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100">
                      <Calendar className="w-5 h-5" />
                      <span>Available for all upcoming dates</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col gap-3">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-4 bg-[#052E20] hover:bg-black text-white font-bold rounded-xl text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center"
                >
                  Book Now
                </button>
                <button className="w-full py-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-xl text-sm tracking-wider uppercase transition-all">
                  Contact Vendor
                </button>
              </div>

            </div>

            {/* Quality Guarantee Box */}
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Nexus Quality Guarantee</h4>
                <p className="text-sm text-amber-800/80 font-medium leading-relaxed">
                  Every rental on our platform undergoes strict quality control. Dry cleaning is always included in the final price, and basic alterations are complimentary.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        product={{
          id: product.id,
          title: product.title,
          price: product.price,
          vendorId: product.vendorId
        }}
      />
    </div>
  )
}
