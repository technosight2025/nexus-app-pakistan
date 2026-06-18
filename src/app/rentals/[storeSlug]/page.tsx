import React from "react"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Award, ShieldCheck, CheckCircle2, MessageSquare, ChevronRight, Users, Clock, Truck, Shield, Sparkles, User, ArrowRight } from "lucide-react"
import { StoreInteractiveFrame, Outfit } from "@/components/rentals/StoreInteractiveFrame"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface StorePageProps {
  params: Promise<{ storeSlug: string }>
}

export default async function StorefrontPage({ params }: StorePageProps) {
  const resolvedParams = await params
  const storeSlug = resolvedParams.storeSlug

  // Fetch rentals vendors and match dynamically based on slug
  let dbVendor = null
  try {
    const { data: dbVendors } = await supabase
      .from("vendors")
      .select("*")
      .eq("category", "rentals")

    if (dbVendors && dbVendors.length > 0) {
      // Match by slug
      dbVendor = dbVendors.find(v => {
        const slug = v.business_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return slug === storeSlug || storeSlug.includes(slug) || slug.includes(storeSlug)
      })

      // Fallback to active developer vendor ID with real outfits
      if (!dbVendor) {
        dbVendor = dbVendors.find(v => v.id === "a1c77aee-29ab-60ae-dd35-7c79570149d7") || dbVendors[0]
      }
    }
  } catch (err) {
    console.error("Error loading vendor from DB:", err)
  }

  const vendorId = dbVendor?.id || "a1c77aee-29ab-60ae-dd35-7c79570149d7"

  // Fetch real outfits from database
  let dbOutfits: any[] = []
  try {
    const { data } = await supabase
      .from("rental_outfits")
      .select("*")
      .eq("vendor_id", vendorId)
      
    if (data) {
      dbOutfits = data
    }
  } catch (err) {
    console.error("Error loading outfits from DB:", err)
  }

  // Store metadata details matching "Emira By Hiraa" but dynamically fallback
  const storeData = {
    name: dbVendor?.business_name || "Emira By Hiraa",
    category: "Bridal & Formal Wear Rental",
    location: dbVendor?.location || dbVendor?.city || "Gulberg III, Lahore, Pakistan",
    rating: dbVendor?.rating || 4.9,
    reviews: dbVendor?.reviews_count || 128,
    startingPrice: dbVendor?.starting_price || 38000,
    phone: dbVendor?.phone || "923001234567",
    about: dbVendor?.about || "Emira By Hiraa is a premium fashion rental house specializing in Pakistani bridal and formal wear. Our curated designer collection, luxury quality standards, and exceptional service ensure you wear your dream dress on your special day without the premium price tag. We believe every event deserve perfection.",
    images: dbVendor?.images?.length > 0 ? dbVendor.images : [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596450514735-111a2faefa25?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    ]
  }

  // Format outfits for StoreInteractiveFrame
  const formattedOutfits: Outfit[] = dbOutfits.map((o, idx) => ({
    id: o.id,
    name: o.name,
    designer: o.material || "Designer Collection",
    tag: o.tag || "Bridal Wear",
    price: Number(o.price) || 45000,
    deposit: Math.round((Number(o.price) || 45000) * 0.2), // 20% security deposit
    image: o.image_url || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600",
    sizes: o.sizes || ["XS", "S", "M", "L", "XL"],
    badge: idx === 0 ? "Most Rented" : idx === 1 ? "New Arrival" : undefined
  }))

  return (
    <PublicLayout>
      <div className="bg-[#FAF6F0] min-h-screen pb-32 font-sans selection:bg-[#C9A76A] selection:text-white">
        
        {/* ══ HERO BANNER (Luxury layout matching PNG) ══ */}
        <div className="relative w-full h-[550px] md:h-[600px] overflow-hidden bg-stone-900">
          <Image 
            src={storeData.images[0]} 
            alt="Emira By Hiraa Cover" 
            fill 
            className="object-cover opacity-70" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              <div className="text-white space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#C9A76A]/20 border border-[#C9A76A]/40 text-[9px] font-bold uppercase tracking-widest text-[#C9A76A] rounded-full backdrop-blur-sm">
                    <Award className="w-3.5 h-3.5" /> Verified Nexus Partner
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1 shadow-xl shrink-0">
                    <div className="w-full h-full rounded-xl bg-[#1E1E1E] flex items-center justify-center font-serif font-black text-white text-xl md:text-2xl tracking-tighter">
                      EH
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none font-serif text-[#FAF6F0]">
                      {storeData.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-stone-300 font-bold text-[10px] uppercase tracking-wider">
                      <span>{storeData.category}</span>
                      <span>•</span>
                      <span>5+ Years In Business</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-stone-300">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#C9A76A]" /> {storeData.location}</div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> <span>{storeData.rating}</span> ({storeData.reviews} reviews)</div>
                  <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#C9A76A]" /> Serves Nationwide</div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-2 text-white">
                <button className="px-5 py-3 rounded-xl bg-[#C9A76A] hover:bg-[#b0925c] text-[10px] font-bold uppercase tracking-widest transition-all shadow-md">
                  Book Appointment
                </button>
                <button className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest border border-white/20 transition-all">
                  Check Availability
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ══ KEY STATS BANNER ══ */}
        <div className="bg-[#FAF6F0] border-b border-stone-200/60 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8 text-center">
              {[
                { value: "1,250+", label: "Dresses Available" },
                { value: "5,800+", label: "Rentals Completed" },
                { value: "4.9", label: "Customer Rating" },
                { value: "15 mins", label: "Avg. Response Time" },
                { value: "50+ Cities", label: "Delivery Coverage" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1 min-w-[120px] flex-1 md:flex-initial">
                  <p className="text-xl md:text-2xl font-black text-[#1E1E1E] font-serif">{stat.value}</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MAIN WRAPPER ══ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Detail Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-16">
              
              {/* About Us Story card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-[2rem] border border-stone-200/60 p-8 md:p-10 shadow-sm">
                <div className="space-y-4">
                  <h3 className="text-xl font-serif text-[#1E1E1E] flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#C9A76A] rounded-full" /> About Us
                  </h3>
                  <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-semibold">
                    {storeData.about}
                  </p>
                  <button className="text-xs font-bold text-[#C9A76A] hover:underline uppercase tracking-wider">Read More →</button>
                </div>
                
                {/* Why Choose Us Circular Metrics */}
                <div className="space-y-4">
                  <h3 className="text-xl font-serif text-[#1E1E1E] flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#C9A76A] rounded-full" /> Why Choose Us
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { icon: <Award className="w-5 h-5" />, label: "Designer Collection" },
                      { icon: <ShieldCheck className="w-5 h-5" />, label: "Premium Condition" },
                      { icon: <Users className="w-5 h-5" />, label: "Professional Fitting" },
                      { icon: <Truck className="w-5 h-5" />, label: "Home Delivery" },
                      { icon: <Shield className="w-5 h-5" />, label: "Nationwide Shipping" },
                      { icon: <Clock className="w-5 h-5" />, label: "Flexible Rentals" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C9A76A] border border-stone-200/50">
                          {item.icon}
                        </div>
                        <span className="text-[8px] font-bold text-stone-500 uppercase tracking-wider mt-1.5 block leading-tight">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stateful Client-Side Sections */}
              <StoreInteractiveFrame 
                storeSlug={storeSlug}
                storeName={storeData.name}
                phone={storeData.phone}
                vendorId={vendorId}
                initialOutfits={formattedOutfits}
              />

              {/* Curated Packages & Bundles */}
              <section className="space-y-6">
                <h2 className="text-2xl font-serif text-[#1E1E1E] flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C9A76A]" /> Packages & Bundles
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Silver Package",
                      price: 65000,
                      save: 10000,
                      features: ["Premium Bridal Dress", "Heavy Embroidery Dupatta", "Basic Jewelry Set Matching"],
                      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300"
                    },
                    {
                      name: "Gold Package",
                      price: 95000,
                      save: 20000,
                      features: ["Signature Designer Dress", "Full Royal Jewelry Set", "Embellished Wedding Shoes", "Bridal Velvet Clutch"],
                      img: "https://images.unsplash.com/photo-1596450514735-111a2faefa25?q=80&w=300"
                    },
                    {
                      name: "Platinum Package",
                      price: 135000,
                      save: 30000,
                      features: ["Couture Custom Fitted Dress", "Luxury Antique Jewelry Set", "Designer Shoes & Box Clutch", "VIP Fitting Consultant Session"],
                      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300",
                      highlight: true
                    }
                  ].map((pkg, i) => (
                    <div 
                      key={i} 
                      className={`bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${
                        pkg.highlight ? "border-[#C9A76A] ring-1 ring-[#C9A76A]" : "border-stone-200/60"
                      }`}
                    >
                      {pkg.highlight && (
                        <span className="absolute top-4 right-4 bg-[#C9A76A] text-white px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm">
                          Most Popular
                        </span>
                      )}
                      
                      <div>
                        <div className="relative aspect-[4/3] bg-stone-100">
                          <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 space-y-4">
                          <div>
                            <h4 className="text-lg font-serif text-[#1E1E1E]">{pkg.name}</h4>
                            <span className="text-[9px] font-bold text-[#0F5B3E] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                              Save PKR {pkg.save.toLocaleString()}
                            </span>
                          </div>

                          <ul className="space-y-2 text-xs text-stone-500 font-medium">
                            {pkg.features.map((f, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A76A] shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-stone-50 mt-4 space-y-3">
                        <div className="flex items-baseline gap-1 pt-3">
                          <span className="text-2xl font-black text-[#1E1E1E]">PKR {pkg.price.toLocaleString()}</span>
                        </div>
                        <button className="w-full py-3 bg-[#1E1E1E] hover:bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm">
                          Book Package
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews & Overview */}
              <section className="space-y-6">
                <h2 className="text-2xl font-serif text-[#1E1E1E] flex items-center gap-3">
                  <span className="w-6 h-0.5 bg-[#C9A76A]" /> Customer Reviews
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                  
                  {/* Rating Overall Score Card */}
                  <div className="sm:col-span-4 bg-white border border-stone-200/60 rounded-[2rem] p-6 text-center space-y-4 shadow-sm">
                    <div>
                      <span className="text-5xl font-black text-[#1E1E1E] font-serif">4.9</span>
                      <div className="flex justify-center gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1 block">Based on 128 Reviews</span>
                    </div>

                    <div className="space-y-2 border-t border-stone-100 pt-4 text-left text-[10px] font-medium text-stone-500">
                      {[
                        { label: "Service Quality", val: "4.9" },
                        { label: "Dress Condition", val: "4.9" },
                        { label: "Delivery Experience", val: "4.8" },
                        { label: "Value For Money", val: "4.8" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span>{item.label}</span>
                          <span className="font-bold text-[#1E1E1E]">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review Cards list */}
                  <div className="sm:col-span-8 space-y-4">
                    {[
                      { name: "Ayesha Khalid", feedback: "Amazing experience! The dress was in absolute pristine condition and altered perfectly. Got so many compliments!", date: "2 hours ago" },
                      { name: "Hina Mani", feedback: "The team is so professional and helpful. Highly recommended for bridal rentals.", date: "1 week ago" }
                    ].map((rev, idx) => (
                      <div key={idx} className="bg-white border border-stone-200/60 p-5 rounded-2xl space-y-2 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                              <User className="w-4 h-4 text-stone-400" />
                            </div>
                            <div>
                              <h4 className="text-xs font-extrabold text-[#1E1E1E] leading-none font-heading">{rev.name}</h4>
                              <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mt-1 inline-block">Verified Booking</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-semibold text-stone-450">{rev.date}</span>
                        </div>
                        <p className="text-stone-600 text-xs leading-relaxed font-semibold">{rev.feedback}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Store Policies & Delivery */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] border border-stone-200/60 p-6 space-y-4 shadow-sm">
                  <h3 className="text-base font-serif text-[#1E1E1E] pb-2 border-b border-stone-100">Store Policies</h3>
                  <ul className="space-y-3 text-xs text-stone-500 font-medium">
                    <li>• <strong className="text-[#1E1E1E]">Rental Duration</strong>: 3 to 5 Days (Customisable).</li>
                    <li>• <strong className="text-[#1E1E1E]">Security Deposit</strong>: Refundable other inspection.</li>
                    <li>• <strong className="text-[#1E1E1E]">Cancellation</strong>: 48 hours notice required.</li>
                    <li>• <strong className="text-[#1E1E1E]">Damage Policy</strong>: Applicable charges minor wear.</li>
                  </ul>
                </div>

                <div className="bg-white rounded-[2rem] border border-stone-200/60 p-6 space-y-4 shadow-sm">
                  <h3 className="text-base font-serif text-[#1E1E1E] pb-2 border-b border-stone-100">Delivery Information</h3>
                  <ul className="space-y-3 text-xs text-stone-500 font-medium">
                    <li>• <strong className="text-[#1E1E1E]">Nationwide Delivery</strong>: Across Pakistan.</li>
                    <li>• <strong className="text-[#1E1E1E]">Delivery Time</strong>: 2-3 Working Days.</li>
                    <li>• <strong className="text-[#1E1E1E]">Pickup Options</strong>: Home pickup available.</li>
                    <li>• <strong className="text-[#1E1E1E]">Shipping Partner</strong>: Leopards, TCS, Trax.</li>
                  </ul>
                </div>
              </section>

            </div>

            {/* Right Booking Column */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-8">
              
              {/* Visit Store card (Google Map snapshot & opening hours) */}
              <div className="bg-white border border-stone-200/60 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                <h4 className="text-sm font-extrabold text-[#1E1E1E] uppercase tracking-widest pb-2 border-b border-stone-100 font-heading">Visit Our Store</h4>
                
                {/* Mock Map Image */}
                <div className="relative aspect-[16/10] bg-stone-100 border border-stone-200 rounded-2xl overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400" alt="Map Location" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-stone-900/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#C9A76A] flex items-center justify-center text-white shadow-md border-2 border-white animate-bounce">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-stone-500 font-medium">
                  <div className="flex justify-between">
                    <span>Monday – Saturday</span>
                    <span className="font-bold text-[#1E1E1E]">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-bold text-[#1E1E1E]">Closed</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1">Store Address</p>
                  <p className="text-xs text-stone-750 font-semibold leading-relaxed">
                    20-M, Gulberg III, Lahore, Pakistan
                  </p>
                </div>
                
                <button className="w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-[#1E1E1E] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 border border-stone-200/60 shadow-sm">
                  Get Directions
                </button>
              </div>

              {/* Related Services Cross-Sells */}
              <div className="bg-white border border-stone-200/60 rounded-[2.5rem] p-8 space-y-4 shadow-sm">
                <h4 className="text-sm font-extrabold text-[#1E1E1E] uppercase tracking-widest pb-2 border-b border-stone-100 font-heading">Explore Nearby</h4>
                <div className="space-y-2">
                  <Link href="/makeup-artists" className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-[#FAF6F0] border border-stone-100 transition-colors group">
                    <span className="text-xs font-bold text-stone-700">Makeup Artists</span>
                    <ArrowRight className="w-4 h-4 text-stone-450 group-hover:text-[#C9A76A] transition-colors" />
                  </Link>
                  <Link href="/photographers" className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-[#FAF6F0] border border-stone-100 transition-colors group">
                    <span className="text-xs font-bold text-stone-700">Photographers</span>
                    <ArrowRight className="w-4 h-4 text-stone-450 group-hover:text-[#C9A76A] transition-colors" />
                  </Link>
                  <Link href="/venues" className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-[#FAF6F0] border border-stone-100 transition-colors group">
                    <span className="text-xs font-bold text-stone-700">Venues</span>
                    <ArrowRight className="w-4 h-4 text-stone-450 group-hover:text-[#C9A76A] transition-colors" />
                  </Link>
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
