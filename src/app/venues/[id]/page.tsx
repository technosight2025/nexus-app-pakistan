"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Star, MapPin, CheckCircle2, 
  Calendar, Users, ShieldCheck, Heart, Share, AlertTriangle
} from 'lucide-react'
import { NexusLogo } from '@/components/layout/NexusLogo'

// Mock Data (Must match the Explore Client)
const VENUE_DB = [
  {
    id: 'l-1',
    title: "Royal Palm Grand Ballroom",
    category: "halls",
    categoryName: "Banquet Hall",
    location: "DHA Phase 5, Lahore",
    rating: 4.92,
    reviews: 128,
    price: 350000,
    unit: "event",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop"
    ],
    maxGuests: 1200,
    description: "The Royal Palm Grand Ballroom offers an exquisite experience with premium crystal chandeliers, central air conditioning, and full-service gourmet catering. Perfect for luxury weddings and grand corporate events."
  },
  {
    id: 'l-2',
    title: "Monal Scenic Marquee",
    category: "marquees",
    categoryName: "Premium Marquee",
    location: "Margalla Hills, Islamabad",
    rating: 4.88,
    reviews: 94,
    price: 450000,
    unit: "event",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop"
    ],
    maxGuests: 800,
    description: "Nestled in the beautiful Margalla hills, this marquee provides a breathtaking view of the city alongside state-of-the-art facilities and open-air lawn extensions."
  },
  {
    id: 'l-3',
    title: "Green Meadows Farmhouse",
    category: "farmhouses",
    categoryName: "Farmhouse",
    location: "Bedian Road, Lahore",
    rating: 4.75,
    reviews: 56,
    price: 180000,
    unit: "night",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
    ],
    maxGuests: 250,
    description: "A serene and private farmhouse featuring a large swimming pool, lush green botanical gardens, and 4 luxury bedrooms for overnight stays."
  },
  {
    id: 'l-7',
    title: "Mughal Heritage Fine Catering & Banquet",
    category: "halls",
    categoryName: "Premium Banquet & Catering",
    location: "DHA Phase 5, Lahore",
    rating: 4.98,
    reviews: 320,
    price: 5000,
    unit: "guest",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop"
    ],
    maxGuests: 2000,
    menus: [
      {
        name: "Standard Package",
        price: "Rs. 3,500 / head",
        items: ["Chicken Biryani", "Chicken Qorma", "Naan & Roti", "Fresh Salad", "Gajar Halwa"]
      },
      {
        name: "Premium Mughal Package",
        price: "Rs. 5,000 / head",
        items: ["Mutton Mandi", "Chicken Malai Boti", "Live BBQ Station", "Palak Paneer", "Assorted Naans", "Shahi Tukda & Gulab Jamun"]
      }
    ],
    description: "Experience the royal taste of authentic Mughal cuisine in our opulent banquet hall. Our premium service includes live BBQ stations, traditional slow-cooked delicacies, and opulent royal dessert spreads. Perfect for grand weddings and luxury corporate events."
  }
]

export default function VenueDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  
  const [venue, setVenue] = useState<typeof VENUE_DB[0] | null>(null)
  
  // Booking State
  const [selectedDate, setSelectedDate] = useState("")
  const [quantity, setQuantity] = useState(100) // Default 100 for guests
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    if (id === 'preview') {
      try {
        const previewData = localStorage.getItem("nexus_preview_listing")
        if (previewData) {
          setVenue(JSON.parse(previewData))
          return
        }
      } catch (e) {}
    }

    if (id) {
      let found = VENUE_DB.find(v => v.id === id)
      
      if (!found) {
        try {
          const custom = localStorage.getItem("nexus_custom_listings")
          if (custom) {
            const parsed = JSON.parse(custom)
            if (Array.isArray(parsed)) {
              found = parsed.find((v: any) => v.id === id)
            }
          }
        } catch (e) {}
      }

      setVenue(found || VENUE_DB[0]) // Fallback to first if not found
    }
  }, [id])

  const formatPKR = (val: number) => {
    return 'Rs. ' + new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val);
  }

  const handleRequestBooking = () => {
    if (!selectedDate) {
      alert("Please select an event date before booking.")
      return
    }

    setIsBooking(true)

    setTimeout(() => {
      // 1. Fetch current hired vendors
      const stored = localStorage.getItem("nexus_crm_hired_vendors")
      let vendors = []
      if (stored) {
        try { vendors = JSON.parse(stored) } catch (e) {}
      }

      // 2. Prevent Duplicate Booking
      if (vendors.find((v: any) => v.id === venue?.id)) {
        alert("You already have an active booking or pending contract with this vendor.")
        setIsBooking(false)
        router.push("/dashboard/host/v2/bookings")
        return
      }

      // 3. Construct Standard 50/50 Milestones
      const isPerGuest = venue?.unit === 'guest'
      const totalContract = isPerGuest ? (venue?.price || 0) * quantity : (venue?.price || 0)
      const depositAmt = Math.round(totalContract * 0.5)
      const finalAmt = totalContract - depositAmt

      const newVendor = {
        id: venue?.id,
        businessName: venue?.title,
        category: venue?.categoryName,
        image: venue?.images[0],
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
            name: 'Final Delivery Payment',
            percentage: 50,
            amount: finalAmt,
            dueDate: selectedDate,
            status: 'Locked'
          }
        ],
        contractTerms: `STANDARD NEXUS ESCROW AGREEMENT
Client agrees to rent ${venue?.title} on ${selectedDate}.
${isPerGuest ? `Estimated Guests: ${quantity}` : ''}
Total Escrow Amount: ${formatPKR(totalContract)}
Milestone 1: 50% non-refundable deposit to secure the date.
Milestone 2: 50% remaining balance due on or before the event date.`
      }

      // 4. Save to LocalStorage
      vendors.push(newVendor)
      localStorage.setItem("nexus_crm_hired_vendors", JSON.stringify(vendors))

      // 5. Redirect to Dashboard
      router.push("/dashboard/host/v2/bookings")
    }, 1200)
  }

  if (!venue) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => {
              if (id === 'preview') {
                router.push('/business/venues/profile')
              } else {
                router.back()
              }
            }}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <NexusLogo iconSize={32} />
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900 mb-2">{venue.title}</h1>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1 text-slate-900"><Star className="w-4 h-4 fill-slate-900" /> {venue.rating} ({venue.reviews} reviews)</span>
            <span className="flex items-center gap-1 underline cursor-pointer"><MapPin className="w-4 h-4" /> {venue.location}</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-[24px] overflow-hidden mb-12">
          <div className="md:col-span-2 row-span-2 relative group">
            <img src={venue.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main" />
          </div>
          <div className="relative group overflow-hidden">
            <img src={venue.images[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Secondary 1" />
          </div>
          <div className="relative group overflow-hidden">
            <img src={venue.images[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Secondary 2" />
          </div>
          <div className="relative group overflow-hidden">
            <img src={venue.images[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Secondary 3" />
          </div>
          <div className="relative group overflow-hidden">
            <img src={venue.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Secondary 4" />
          </div>
        </div>

        {/* Content & Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            
            <div className="pb-8 border-b border-slate-200">
              <h2 className="text-2xl font-bold mb-2">Hosted by Nexus Verified Partner</h2>
              <div className="flex items-center gap-6 text-slate-500 font-medium">
                <span className="flex items-center gap-2"><Users className="w-5 h-5" /> Up to {venue.maxGuests} guests</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> Escrow Protected</span>
              </div>
            </div>

            <div className="pb-8 border-b border-slate-200 space-y-4">
              <h3 className="text-xl font-bold">About this space</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{venue.description}</p>
            </div>

            <div className="pb-8 border-b border-slate-200">
              <h3 className="text-xl font-bold mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Air Conditioning', 'Valet Parking', 'Bridal Room', 'Backup Generator', 'Wheelchair Accessible', 'Catering Area'].map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 text-slate-700 font-medium text-lg">
                    <CheckCircle2 className="w-5 h-5 text-slate-400" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Menus Section (If Applicable) */}
            {(venue as any).menus && (
              <div className="pb-8 border-b border-slate-200">
                <h3 className="text-xl font-bold mb-6">Catering Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(venue as any).menus.map((menu: any, i: number) => (
                    <div key={i} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-colors shadow-sm bg-white">
                      <div className="flex flex-col gap-1 mb-4">
                        <h4 className="font-black text-lg text-slate-900">{menu.name}</h4>
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg text-sm self-start inline-block">{menu.price}</span>
                      </div>
                      <ul className="space-y-3">
                        {menu.items.map((item: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 text-slate-600 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host Section */}
            <div className="pb-8 border-b border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" 
                  alt="Host" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                />
                <div>
                  <h3 className="text-xl font-bold">Hosted by Nexus Verified Partner</h3>
                  <p className="text-slate-500 text-sm">Joined May 2024 · Premium Host</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg mb-4">
                We pride ourselves on delivering 5-star experiences. Our team is dedicated to ensuring your event runs flawlessly from start to finish.
              </p>
              <button className="px-6 py-3 border border-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Contact Host
              </button>
            </div>

            {/* Reviews Section */}
            <div className="pb-8 border-b border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 fill-slate-900" /> {venue.rating} · {venue.reviews} reviews
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { name: "Ahmed", date: "October 2025", text: "Absolutely stunning venue. The management was incredibly helpful and the food was fantastic." },
                  { name: "Fatima", date: "September 2025", text: "Booked this for my Mehndi. The decor was exactly as promised and the escrow system made payments stress-free." },
                  { name: "Usman", date: "August 2025", text: "Great location and ample parking. The bridal room was spacious. Highly recommend!" },
                  { name: "Zainab", date: "July 2025", text: "A premium experience all around. The central AC worked perfectly even in peak summer." }
                ].map((review, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-bold">{review.name}</div>
                        <div className="text-xs text-slate-500">{review.date}</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 border border-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Show all {venue.reviews} reviews
              </button>
            </div>

            {/* Location Section */}
            <div className="pb-8 border-b border-slate-200">
              <h3 className="text-xl font-bold mb-6">Where you'll be</h3>
              <div className="w-full h-[300px] bg-slate-100 rounded-2xl overflow-hidden relative mb-4">
                {/* Mock Map Image */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                  alt="Map Location" 
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl border-4 border-white/50">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-lg">{venue.location}</h4>
              <p className="text-slate-500">Exact location provided after booking is confirmed.</p>
            </div>

            {/* Policies Section */}
            <div>
              <h3 className="text-xl font-bold mb-6">Things to know</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold mb-3">Event Rules</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>Events must end by 11:30 PM (Govt rules)</li>
                    <li>No indoor fireworks</li>
                    <li>External catering permitted with fee</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Safety & Property</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>Security cameras on property</li>
                    <li>Smoke alarms installed</li>
                    <li>Backup generators available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Cancellation Policy</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>Free cancellation within 48 hours of booking.</li>
                    <li>50% refund up to 30 days before event.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white border border-slate-200 shadow-xl rounded-3xl p-6">
              
              <div className="flex items-end gap-1 mb-6">
                <span className="text-2xl font-black">{formatPKR(venue.price)}</span>
                <span className="text-slate-500 font-medium mb-1">/ {venue.unit}</span>
              </div>

              <div className="border border-slate-300 rounded-xl overflow-hidden mb-4">
                <div className="p-3 border-b border-slate-300">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Event Date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-sm font-semibold focus:outline-none text-slate-900 bg-transparent"
                  />
                </div>
                <div className="p-3 bg-slate-50">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Guests</label>
                  <div className="text-sm font-semibold text-slate-900">Up to {venue.maxGuests} attendees</div>
                </div>
                {venue.unit === 'guest' && (
                  <div className="p-3 bg-slate-50 flex justify-between items-center border-t border-slate-300">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">Select Guest Count</label>
                      <div className="text-sm font-semibold text-slate-900">{quantity} Guests</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setQuantity(Math.max(10, quantity - 10))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                      >-</button>
                      <button 
                        onClick={() => setQuantity(Math.min(venue.maxGuests || 5000, quantity + 10))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold"
                      >+</button>
                    </div>
                  </div>
                )}
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
                You won't be charged yet
              </p>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Standard Booking Fee</span>
                  <span>{formatPKR(venue.price)} {venue.unit === 'guest' ? 'x ' + quantity : ''}</span>
                </div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Nexus Escrow Protection</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between font-black text-slate-900 text-lg pt-3 border-t border-slate-200">
                  <span>Total Escrow Need</span>
                  <span>{formatPKR(venue.unit === 'guest' ? venue.price * quantity : venue.price)}</span>
                </div>
              </div>

              <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex gap-3 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                Your funds are securely held in Nexus Escrow and released only after milestones are approved.
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  )
}
