import React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Award, ShieldCheck, CheckCircle2, MessageSquare, ChevronRight, Users, Clock, Truck, Shield, Sparkles, User, ArrowRight, Heart, Share2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import crypto from 'crypto'
import { VendorStorefront } from "@/components/venues/VendorStorefront"
import { VendorInteractiveSections } from "@/components/venues/VendorInteractiveSections"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function clerkToUuid(clerkId: string) {
  const hash = crypto.createHash('md5').update(clerkId).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

const MOCK_PROFILES: Record<string, any> = {
  "prof-lehnga": {
    name: "Zardozi Lehnga Boutique",
    category: "Lehnga Rental",
    location: "Gulberg, Lahore",
    rating: 4.9,
    reviews: 142,
    startingPrice: 15000,
    about: "Zardozi Lehnga Boutique offers an exclusive collection of premium bridal and party wear lehngas for rent. Our curated wardrobe features top-tier designer outfits, meticulously maintained and custom-fitted, allowing you to wear your dream dress without the exorbitant price tag.",
    features: ["Designer Bridal Wear", "Party Wear", "Custom Fittings", "Dry Cleaning Included", "Matching Jewelry Available"],
    packages: [
      { name: "Party Wear Rental", price: 15000, desc: "3-day rental for premium party wear outfits. Includes basic alterations and dry cleaning." },
      { name: "Bridal Signature", price: 65000, desc: "4-day rental for heavy bridal lehngas. Includes complete custom fitting, premium packaging, and dual-dupatta settings." },
      { name: "Royal Bridal Package", price: 120000, desc: "5-day rental for top-tier designer bridal wear. Includes complimentary jewelry rental and VIP fitting sessions." }
    ],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596450514735-111a2faefa25?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    ]
  },
  "prof-1": {
    name: "Usman Ali Photography",
    category: "Photography & Cinematography",
    location: "DHA Phase 6, Lahore",
    rating: 4.9,
    reviews: 420,
    startingPrice: 150000,
    about: "Award-winning photography and cinematography studio specializing in luxury Pakistani weddings. We capture your most precious moments with a blend of photojournalism and fine-art portraiture.",
    features: ["Cinematography", "Drone", "Photo Album", "Same Day Edit", "Female Photographers"],
    packages: [
      { name: "Silver Package", price: 150000, desc: "1 Photographer, 1 Videographer, 100 Print Album, Edited Highlights" },
      { name: "Gold Package", price: 250000, desc: "2 Photographers, 2 Videographers, Drone Coverage, 200 Print Album, Full Feature Film" },
      { name: "Diamond Package", price: 400000, desc: "3 Photographers, 3 Videographers, Crane, Drone, Cinematic Film, Premium Albums" }
    ],
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537151608804-ea2f1fa8c020?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    ]
  }
}

export default async function VendorProfilePage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ theme?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const vendorId = resolvedParams.id
  
  // Check if vendorId is already a valid UUID format
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(vendorId)
  const vendorUuid = isUuid ? vendorId : clerkToUuid(vendorId)

  // Fetch real data from Supabase
  const { data: realVendor } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", vendorUuid)
    .single()

  // Use mock data ONLY if it's not a real UUID or explicitly demo
  const isDemo = vendorId === "demo" || !isUuid
  const baseMock = isDemo ? (MOCK_PROFILES["prof-lehnga"] || {}) : {}
  
  const VENDOR = {
    name: realVendor?.business_name || baseMock.name || "Untitled Studio",
    category: realVendor?.category || baseMock.category || "Uncategorized",
    phone: realVendor?.phone || baseMock.phone || null,
    email: realVendor?.email || baseMock.email || null,
    location: realVendor?.location || realVendor?.city || baseMock.location || "Location not set",
    about: realVendor?.about || baseMock.about || "Welcome to our studio.",
    features: realVendor?.features?.length > 0 ? realVendor.features : (baseMock.features || []),
    packages: realVendor?.packages?.length > 0 ? realVendor.packages : (baseMock.packages || []),
    images: realVendor?.images?.length > 0 ? realVendor.images : (baseMock.images || []),
    startingPrice: realVendor?.starting_price || baseMock.startingPrice || 0,
    rating: realVendor?.rating || baseMock.rating || 0,
    reviews: realVendor?.reviews_count || baseMock.reviews || 0,
  }

  // Fetch Outfits
  const { data: outfits } = await supabase
    .from("rental_outfits")
    .select("*")
    .eq("vendor_id", vendorUuid)
    .eq("status", "Available")
    .order("created_at", { ascending: false });

  return (
    <PublicLayout>
      <div className="bg-[#FDF8F0] min-h-screen pb-32 font-sans selection:bg-[#0F5B3E] selection:text-white">
        
        {/* 🌟 Cinematic Cover Banner 🌟 */}
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-stone-900">
          {VENDOR.images && VENDOR.images.length > 0 ? (
            <Image src={VENDOR.images[0]} alt="Cover" fill className="object-cover opacity-75" priority />
          ) : (
            <div className="w-full h-full bg-stone-850" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-white space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">
                  <Award className="w-3.5 h-3.5" /> Verified Nexus Partner
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1 shadow-xl shrink-0">
                    <div className="w-full h-full rounded-xl bg-[#0F5B3E] flex items-center justify-center font-heading font-black text-white text-xl md:text-2xl tracking-tighter">
                      {VENDOR.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-heading text-[#FDF8F0]">
                      {VENDOR.name}
                    </h1>
                    <p className="text-stone-300 text-xs md:text-sm font-semibold tracking-wider uppercase mt-1.5">{VENDOR.category} • Est. 2018</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm font-medium text-stone-300">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#C2A378]" /> {VENDOR.location}</div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> <span className="font-bold text-white">{VENDOR.rating}</span> ({VENDOR.reviews} reviews)</div>
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#C2A378]" /> Nationwide Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 Key Stats Banner 🌟 */}
        <div className="bg-[#FAF6F0] border-b border-stone-200/50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { value: `${outfits?.length || 18}+`, label: "Dresses Available" },
                { value: "1,200+", label: "Rentals Completed" },
                { value: "4.9", label: "Customer Rating" },
                { value: "< 1 hour", label: "Response Time" },
                { value: "Nationwide", label: "Delivery Coverage" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xl md:text-2xl font-black text-[#1A1A1A] font-heading">{stat.value}</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🌟 Main Content Section 🌟 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Detail Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-16">
              
              {/* About "The Story" */}
              <section className="bg-white rounded-[2rem] border border-stone-200/60 p-8 md:p-12 shadow-sm space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> The Story
                </h2>
                <p className="text-base md:text-lg text-stone-600 leading-relaxed font-medium">
                  {VENDOR.about}
                </p>
              </section>

              {/* Why Choose Us Feature Cards */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Why Choose Us
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Designer Collection", desc: "Curated premium bridal and formal wear from leading luxury designer catalogs." },
                    { title: "Premium Condition Guaranteed", desc: "All outfits are dry-cleaned, sanitized, and detailed by dressmakers after each rental cycle." },
                    { title: "Professional Custom Fitting", desc: "Our in-house tailors alter your chosen outfits to fit your exact measurements." },
                    { title: "Nationwide Secure Shipping", desc: "Insured home delivery and returns dispatch across all major cities in Pakistan." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-stone-200/60 p-6 rounded-2xl shadow-sm hover:border-[#C2A378] transition-all">
                      <h4 className="text-base font-extrabold text-[#1A1A1A] mb-1.5 font-heading">{item.title}</h4>
                      <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curated Portfolio Collage */}
              {VENDOR.images && VENDOR.images.length > 1 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                    <span className="w-6 h-0.5 bg-[#C2A378]" /> Curated Portfolio
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {VENDOR.images.slice(1, 4).map((img: string, i: number) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-stone-200 bg-stone-100">
                        <Image 
                          src={img} 
                          alt="Portfolio item" 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Signature Services badges */}
              {VENDOR.features && VENDOR.features.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                    <span className="w-6 h-0.5 bg-[#C2A378]" /> Signature Services
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {VENDOR.features.map((feat: string) => (
                      <div key={feat} className="group relative bg-white border border-stone-200/60 p-6 rounded-2xl hover:border-[#C2A378] hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0F5B3E] group-hover:scale-125 transition-transform" />
                          <span className="font-bold text-[#1A1A1A] text-base">{feat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Curated Packages / Bundles */}
              {VENDOR.packages && VENDOR.packages.length > 0 && (
                <section className="space-y-6">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                    <span className="w-6 h-0.5 bg-[#C2A378]" /> Curated Offerings
                  </h2>
                  <div className="space-y-4">
                    {VENDOR.packages.map((pkg: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="group relative bg-white border border-stone-200/60 rounded-[2rem] p-8 md:p-10 hover:border-[#C2A378] hover:shadow-xl transition-all duration-500 overflow-hidden"
                      >
                        <div className="absolute top-4 right-8 text-8xl font-black text-stone-100/70 select-none font-heading group-hover:text-stone-200/50 transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="max-w-xl space-y-2">
                            <h4 className="text-xl md:text-2xl font-black text-[#1A1A1A] group-hover:text-[#0F5B3E] transition-colors">{pkg.name}</h4>
                            <p className="text-stone-500 text-sm md:text-base font-medium leading-relaxed">{pkg.desc}</p>
                          </div>
                          <div className="flex flex-col md:items-end justify-center shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Total Price</span>
                            <span className="text-3xl font-black text-[#1A1A1A] mb-4">₨ {Number(pkg.price).toLocaleString()}</span>
                            <button className="w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#1A1A1A] text-white hover:bg-[#0F5B3E] transition-colors shadow-sm">
                              Select Package
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Interactive Try-On, Calendar, & Sticky Bar Client Sections */}
              <VendorInteractiveSections 
                vendorId={vendorUuid}
                vendorName={VENDOR.name}
                startingPrice={VENDOR.startingPrice}
                phone={VENDOR.phone}
              />

              {/* Wardrobe Collection Storefront Grid */}
              <VendorStorefront vendorId={vendorUuid} outfits={outfits || []} />

              {/* Rental Process Timeline */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Rental Process
                </h2>
                <div className="bg-white rounded-[2rem] border border-stone-200/60 p-8 md:p-10 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
                    {[
                      { step: "01", title: "Select Dress", desc: "Browse the digital wardrobe catalog and pick your designer outfit." },
                      { step: "02", title: "Book Alterations", desc: "Schedule custom fitting session with our tailoring masters." },
                      { step: "03", title: "Celebrate", desc: "Wear your dream dress on your special day." },
                      { step: "04", title: "Free Pick-up", desc: "Return the dress using our prepaid home pickup service." }
                    ].map((proc, i) => (
                      <div key={i} className="space-y-3 relative group">
                        <div className="text-2xl font-black font-heading text-[#C2A378]">{proc.step}</div>
                        <h4 className="text-base font-extrabold text-[#1A1A1A] font-heading">{proc.title}</h4>
                        <p className="text-stone-500 text-xs leading-relaxed font-medium">{proc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Customer Reviews & Breakdown */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Verified Customer Reviews
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-stone-200/60 rounded-[2rem] p-6 text-center">
                  <div className="py-4 border-b sm:border-b-0 sm:border-r border-stone-200/60">
                    <span className="text-4xl font-extrabold text-[#1A1A1A] font-heading">4.9</span>
                    <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-widest mt-1">Average Rating</span>
                  </div>
                  <div className="py-4 border-b sm:border-b-0 sm:border-r border-stone-200/60">
                    <span className="text-4xl font-extrabold text-[#0F5B3E] font-heading">99%</span>
                    <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-widest mt-1">Outfit Quality Match</span>
                  </div>
                  <div className="py-4">
                    <span className="text-4xl font-extrabold text-[#C2A378] font-heading">100%</span>
                    <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-widest mt-1">On-Time Logistics</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Ayesha Ahmed", rating: 5, date: "May 2026", feedback: "The outfit was in absolute pristine condition, altered perfectly to my size. Highly recommend their bridal rental collections!" },
                    { name: "Bilal Hassan", rating: 5, date: "April 2026", feedback: "Rented a Prince Coat for my brother's wedding. Excellent customer service and response time. Alterations were spotless." }
                  ].map((rev, idx) => (
                    <div key={idx} className="bg-white border border-stone-200/60 p-6 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-extrabold text-[#1A1A1A] font-heading">{rev.name}</h4>
                          <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-medium">{rev.feedback}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Real Event Gallery */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Real Event Gallery
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400",
                  ].map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 group">
                      <Image src={img} alt="Real Event Showcase" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />
                      <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white">Client Showcase</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Store Policies */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Store Policies
                </h2>
                <div className="bg-white rounded-[2rem] border border-stone-200/60 p-8 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-widest border-b border-stone-100 pb-2">Rental & Returns</h4>
                    <ul className="space-y-2 text-xs text-stone-500 font-medium">
                      <li>• Standard rental durations are 3, 5, or 7 days.</li>
                      <li>• 20% refundable security deposit is required at booking.</li>
                      <li>• Cancellations are free up to 14 days before the event.</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-[#1A1A1A] uppercase tracking-widest border-b border-stone-100 pb-2">Damage Policy</h4>
                    <ul className="space-y-2 text-xs text-stone-500 font-medium">
                      <li>• Minor stains and light fabric wear are covered.</li>
                      <li>• Major tears or structural loss requires a restoration fee.</li>
                      <li>• Dry cleaning is strictly handled by our professional facility.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Consultants & Team */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Meet the Consultants
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Zainab Malik", role: "Creative Director" },
                    { name: "Fiza Ali", role: "Bridal Stylist" },
                    { name: "M. Saleem", role: "Master Tailoring Specialist" }
                  ].map((member, i) => (
                    <div key={i} className="bg-white border border-stone-200/60 p-5 rounded-2xl text-center shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center mx-auto mb-3 border border-stone-200">
                        <User className="w-5 h-5 text-stone-400" />
                      </div>
                      <h4 className="text-sm font-extrabold text-[#1A1A1A] font-heading">{member.name}</h4>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{member.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Services Cross-Sells */}
              <section className="space-y-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#1A1A1A] font-heading flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C2A378]" /> Explore Vendors
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/makeup-artists" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-stone-200/60 hover:border-[#0F5B3E] hover:shadow-md transition-all group">
                    <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#0F5B3E] transition-colors">Makeup Artists</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#0F5B3E] transition-colors" />
                  </Link>
                  <Link href="/photographers" className="flex items-center justify-between p-5 rounded-2xl bg-white border border-stone-200/60 hover:border-[#0F5B3E] hover:shadow-md transition-all group">
                    <span className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#0F5B3E] transition-colors">Photographers</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#0F5B3E] transition-colors" />
                  </Link>
                </div>
              </section>

            </div>

            {/* Right Booking Column */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-8">
              
              {/* Concierge Sticky Booking Card */}
              <div className="sticky top-28 space-y-8">
                <div className="backdrop-blur-xl bg-white/85 border border-white/60 shadow-[0_24px_50px_-12px_rgba(15,91,62,0.08)] rounded-[2.5rem] p-8 overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C2A378] to-transparent opacity-60" />
                  
                  <div className="mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1 block">Starting Investment</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight text-[#0F5B3E] font-heading">
                        ₨ {Number(VENDOR.startingPrice).toLocaleString()}
                      </span>
                      <span className="text-stone-400 text-xs font-semibold"> / event</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="bg-stone-50/50 rounded-2xl border border-stone-200/60 overflow-hidden">
                      <div className="p-4 border-b border-stone-200/60 focus-within:bg-white transition-colors">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#C2A378] mb-1 block">Selected Event Date</label>
                        <input type="date" className="w-full bg-transparent font-bold text-[#1A1A1A] outline-none cursor-pointer text-sm" />
                      </div>
                      <div className="p-4 focus-within:bg-white transition-colors">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#C2A378] mb-1 block">Celebration Type</label>
                        <input type="text" placeholder="Mehndi, Barat, Valima..." className="w-full bg-transparent font-bold text-[#1A1A1A] outline-none placeholder:text-stone-300 text-sm" />
                      </div>
                    </div>
                  </div>

                  <button className="w-full h-14 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#0F5B3E] text-white shadow-lg shadow-[#0F5B3E]/10 hover:bg-[#0c4a32] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mb-3">
                    Request Quotation <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  <button className="w-full h-14 rounded-xl text-xs font-bold uppercase tracking-widest bg-white border border-stone-200 text-[#1A1A1A] hover:bg-stone-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#C2A378]" /> Contact Representative
                  </button>

                  <div className="mt-8 pt-6 border-t border-stone-200/60 flex items-start gap-4">
                    <ShieldCheck className="w-8 h-8 shrink-0 text-[#0F5B3E] opacity-70" />
                    <div className="text-xs font-medium text-stone-500 leading-relaxed">
                      <span className="text-[#1A1A1A] font-bold block mb-0.5">Nexus Elite Verified</span>
                      Every detail, portfolio sample, and pricing sheet has been vetted by our customer quality division.
                    </div>
                  </div>
                </div>

                {/* Store Location & Hours */}
                <div className="bg-white border border-stone-200/60 rounded-[2.5rem] p-8 space-y-6">
                  <h4 className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-widest pb-2 border-b border-stone-100 font-heading">Store Hours & Location</h4>
                  
                  <div className="space-y-3 text-xs text-stone-500 font-medium">
                    <div className="flex justify-between">
                      <span>Monday – Saturday</span>
                      <span className="font-bold text-[#1A1A1A]">11:00 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-bold text-[#1A1A1A]">Closed</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Store Address</p>
                    <p className="text-xs text-stone-650 font-semibold leading-relaxed">
                      {VENDOR.location}
                    </p>
                  </div>
                  
                  <button className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 border border-stone-200">
                    Get Directions
                  </button>
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
