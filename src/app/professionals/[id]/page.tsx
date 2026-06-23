"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Star, MapPin, CheckCircle2, 
  Users, ShieldCheck, Tag, Clock
} from 'lucide-react'
import { NexusLogo } from '@/components/layout/NexusLogo'

// Mock Data (Must match Explore Client)
const PROFESSIONAL_DB = [
  {
    id: 'l-5',
    title: "The Creative Loft Studio",
    category: "studios",
    categoryName: "Photo Studio",
    location: "Clifton, Karachi",
    rating: 4.80,
    reviews: 145,
    price: 15000,
    unit: "hour",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A fully equipped creative studio perfect for pre-wedding shoots, fashion photography, and cinematography. Comes with professional lighting setups and 4 distinct background sets."
  }
]

export default function ProfessionalDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [vendor, setVendor] = useState<typeof PROFESSIONAL_DB[0] | null>(null)
  
  // Booking State
  const [selectedDate, setSelectedDate] = useState("")
  const [hours, setHours] = useState(4)
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    if (id) {
      const found = PROFESSIONAL_DB.find(v => v.id === id) || PROFESSIONAL_DB[0]
      setVendor(found)
    }
  }, [id])

  const formatPKR = (val: number) => {
    return 'Rs. ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  }

  const handleRequestBooking = () => {
    if (!selectedDate) {
      alert("Please select a date before booking.")
      return
    }

    setIsBooking(true)

    setTimeout(() => {
      const stored = localStorage.getItem("nexus_crm_hired_vendors")
      let vendors = []
      if (stored) {
        try { vendors = JSON.parse(stored) } catch (e) {}
      }

      if (vendors.find((v: any) => v.id === vendor?.id)) {
        alert("You already have an active booking or pending contract with this professional.")
        setIsBooking(false)
        router.push("/dashboard/host/v2/bookings")
        return
      }

      const totalContract = (vendor?.price || 0) * hours
      const depositAmt = Math.round(totalContract * 0.5)
      const finalAmt = totalContract - depositAmt

      const newVendor = {
        id: vendor?.id,
        businessName: vendor?.title,
        category: vendor?.categoryName,
        image: vendor?.images[0],
        contractAmount: totalContract,
        paidAmount: 0,
        status: 'Pending Signature',
        milestones: [
          {
            id: 'm1',
            name: 'Booking Deposit (50%)',
            percentage: 50,
            amount: depositAmt,
            dueDate: 'Upon Signature',
            status: 'Pending'
          },
          {
            id: 'm2',
            name: 'Final Service Payment',
            percentage: 50,
            amount: finalAmt,
            dueDate: selectedDate,
            status: 'Locked'
          }
        ],
        contractTerms: `STANDARD NEXUS PROFESSIONAL AGREEMENT
Client agrees to book ${vendor?.title} on ${selectedDate} for ${hours} ${vendor?.unit}s.
Hourly/Unit Rate: ${formatPKR(vendor?.price || 0)}
Total Escrow Amount: ${formatPKR(totalContract)}
Milestone 1: 50% deposit to lock booking.
Milestone 2: 50% remaining balance due upon delivery/event.`
      }

      vendors.push(newVendor)
      localStorage.setItem("nexus_crm_hired_vendors", JSON.stringify(vendors))

      router.push("/dashboard/host/v2/bookings")
    }, 1200)
  }

  if (!vendor) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const totalPrice = vendor.price * hours

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <NexusLogo iconSize={32} />
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900 mb-2">{vendor.title}</h1>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1 text-slate-900"><Star className="w-4 h-4 fill-slate-900" /> {vendor.rating} ({vendor.reviews} reviews)</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {vendor.location}</span>
            <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full"><Tag className="w-3.5 h-3.5" /> Creative Professional</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[450px] rounded-[24px] overflow-hidden mb-12">
          <div className="relative group">
            <img src={vendor.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative group overflow-hidden rounded-[24px]">
              <img src={vendor.images[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Secondary 1" />
            </div>
            <div className="relative group overflow-hidden rounded-[24px]">
              <img src={vendor.images[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Secondary 2" />
            </div>
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            <div className="pb-8 border-b border-slate-200">
              <h2 className="text-2xl font-bold mb-2">Service Overview</h2>
              <div className="flex items-center gap-6 text-slate-500 font-medium mt-4">
                <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> Escrow Protected Booking</span>
              </div>
            </div>

            <div className="pb-8 border-b border-slate-200 space-y-4">
              <h3 className="text-xl font-bold">About this Professional</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{vendor.description}</p>
            </div>

            <div className="pb-8 border-b border-slate-200">
              <h3 className="text-xl font-bold mb-6">Equipment & Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Professional Lighting', 'Make-up Room', 'Wi-Fi Access', 'Refreshments'].map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 text-slate-700 font-medium text-lg">
                    <CheckCircle2 className="w-5 h-5 text-slate-400" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 shadow-xl rounded-3xl p-6">
              
              <div className="flex items-end gap-1 mb-6">
                <span className="text-2xl font-black">{formatPKR(vendor.price)}</span>
                <span className="text-slate-500 font-medium mb-1">/ {vendor.unit}</span>
              </div>

              <div className="border border-slate-300 rounded-xl overflow-hidden mb-4">
                <div className="p-3 border-b border-slate-300">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-sm font-semibold focus:outline-none text-slate-900 bg-transparent"
                  />
                </div>
                <div className="p-3 bg-slate-50 flex justify-between items-center">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Duration</label>
                    <div className="text-sm font-semibold text-slate-900">{hours} Hours</div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setHours(Math.max(1, hours - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                    >-</button>
                    <button 
                      onClick={() => setHours(hours + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                    >+</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleRequestBooking}
                disabled={isBooking}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-rose-500/20 disabled:opacity-70 flex justify-center"
              >
                {isBooking ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Request to Book'
                )}
              </button>
              
              <p className="text-center text-sm font-medium text-slate-500 mt-4 mb-6">
                No charges until contract is signed
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>{formatPKR(vendor.price)} x {hours} hours</span>
                  <span>{formatPKR(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-black text-slate-900 text-lg pt-3 border-t border-slate-200">
                  <span>Total Escrow Need</span>
                  <span>{formatPKR(totalPrice)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
