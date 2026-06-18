"use client"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { ProfileSubNav } from "@/components/layout/ProfileSubNav"
import { MegaFooter } from "@/components/layout/MegaFooter"
import Image from "next/image"
import { MapPin, Star, Share2, Heart, Award, ShieldCheck, CheckCircle2, ChevronRight, Users, Car, Coffee, Music, Wifi } from "lucide-react"
import { LiveAvailabilityCalendar } from "@/components/shared/LiveAvailabilityCalendar"

// Simple mock data
const VENUE = {
  name: "The Royal Palm Golf & Country Club",
  type: "Premium Marquee & Banquet",
  location: "DHA Phase 8, Lahore",
  rating: 4.9,
  reviews: 342,
  pricePerHead: 4500,
  capacity: "500 - 1,200",
  about: "Experience unparalleled luxury and elegance at the Royal Palm. With sprawling green lawns and a majestic indoor banquet hall, it is the perfect destination for grand weddings and corporate events. Our dedicated team ensures every detail is flawless.",
  amenities: [
    { name: "Valet Parking", icon: Car },
    { name: "In-house Catering", icon: Coffee },
    { name: "Bridal Room", icon: Heart },
    { name: "DJ Setup", icon: Music },
    { name: "High-speed WiFi", icon: Wifi },
    { name: "Wheelchair Accessible", icon: Users }
  ],
  packages: [
    { name: "Standard Mehndi", price: 3500, features: ["Chicken Biryani", "Live BBQ", "Standard Decor", "DJ Audio System"] },
    { name: "Premium Barat", price: 5500, features: ["Mutton Qorma", "Live Pasta Station", "Floral Decor", "Valet Service"] },
    { name: "Royal Walima", price: 6500, features: ["Gourmet Buffet", "Imported Flowers", "Stage Setup", "Photography Partner Discount"] }
  ],
  images: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
  ]
}

export default function VenueProfilePage({ params }: { params: { id: string } }) {
  return (
    <PublicLayout>
      <ProfileSubNav price={VENUE.pricePerHead} targetWidgetId="booking-widget" />
      <div className="bg-white min-h-screen pb-24">
        
        {/* 🌟 Joyfeel Hero Image Grid 🌟 */}
        <div id="gallery" className="w-full bg-white pt-8 pb-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span> <ChevronRight className="w-3 h-3" /> 
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Venues</span> <ChevronRight className="w-3 h-3" /> 
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Lahore</span> <ChevronRight className="w-3 h-3" /> 
              <span className="text-slate-900">{VENUE.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden">
              <div className="md:col-span-2 relative h-full group overflow-hidden">
                <Image src={VENUE.images[0]} alt="Main" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="hidden md:grid grid-rows-2 gap-3 h-full">
                <div className="relative h-full overflow-hidden group"><Image src={VENUE.images[1]} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <div className="relative h-full overflow-hidden group"><Image src={VENUE.images[2]} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-700" /></div>
              </div>
              <div className="hidden md:block relative h-full overflow-hidden group">
                <Image src={VENUE.images[3]} alt="Gallery" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                  <span className="text-white font-bold text-lg flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30 hover:bg-white hover:text-slate-900 transition-all">
                    Show all photos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 Main Content 🌟 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Header Info */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-xs font-bold mb-4">
                    <Award className="w-3.5 h-3.5" /> Premium Venue
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">{VENUE.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {VENUE.location}</div>
                    <div className="flex items-center gap-1.5 text-slate-900"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> <span className="font-bold">{VENUE.rating}</span> <span className="text-slate-500 underline decoration-slate-300 hover:decoration-slate-500 cursor-pointer">({VENUE.reviews} reviews)</span></div>
                    <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400" /> Capacity: {VENUE.capacity}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-slate-300 hover:bg-slate-50 transition-all"><Share2 className="w-5 h-5 text-slate-600" /></button>
                  <button className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-rose-200 hover:bg-rose-50 transition-all"><Heart className="w-5 h-5 text-rose-500" /></button>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200" />

              {/* About */}
              <div id="about">
                <h3 className="text-2xl font-black text-slate-900 mb-4">About the Venue</h3>
                <p className="text-slate-600 font-medium leading-relaxed text-lg">{VENUE.about}</p>
              </div>

              <div className="w-full h-px bg-slate-200" />

              {/* Amenities */}
              <div id="amenities">
                <h3 className="text-2xl font-black text-slate-900 mb-6">What this place offers</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                  {VENUE.amenities.map(amenity => (
                    <div key={amenity.name} className="flex items-center gap-3 text-slate-700 font-medium text-lg">
                      <amenity.icon className="w-6 h-6 text-slate-400" /> {amenity.name}
                    </div>
                  ))}
                </div>
                <button className="mt-8 px-6 py-3 bg-white border border-slate-200 shadow-sm rounded-xl font-bold text-slate-800 hover:bg-slate-50 transition-colors">
                  Show all 24 amenities
                </button>
              </div>

              <div className="w-full h-px bg-slate-200" />

              {/* Packages */}
              <div id="packages">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Available Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {VENUE.packages.map((pkg, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                      <h4 className="text-xl font-black text-slate-900 mb-2">{pkg.name}</h4>
                      <p className="text-2xl font-bold text-blue-600 mb-6">₨ {pkg.price.toLocaleString()}<span className="text-sm font-medium text-slate-500"> / head</span></p>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm font-medium text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full mt-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-colors">
                        Select Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1" id="booking-widget">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-8 sticky top-24" id="availability">
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-black text-slate-900">₨ {VENUE.pricePerHead.toLocaleString()}</span>
                  <span className="text-slate-500 font-medium mb-1">/ head starting</span>
                </div>

                <div className="mb-6">
                  <LiveAvailabilityCalendar />
                </div>

                <div className="space-y-4 mb-6">
                  <div className="border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Event Date</label>
                    <input type="date" className="w-full bg-transparent font-bold text-slate-900 outline-none cursor-pointer" />
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Estimated Guests</label>
                    <input type="number" placeholder="e.g. 500" className="w-full bg-transparent font-bold text-slate-900 outline-none" />
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold h-14 rounded-xl text-lg mb-4 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                  Request to Book
                </button>

                <p className="text-center text-xs text-slate-400 font-medium mt-4">
                  You won't be charged yet
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  <p className="text-xs font-medium text-slate-500 leading-tight">
                    <strong className="text-slate-700">NEXUS Guarantee:</strong> Safe payments, verified venues, and 24/7 support.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <MegaFooter />
    </PublicLayout>
  )
}
