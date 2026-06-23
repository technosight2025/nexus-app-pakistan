'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  Star, ShieldCheck, MapPin, ArrowLeft, Image as ImageIcon, 
  Sparkles, Calendar, Calculator, MessageSquare, Check, AlertCircle, Users
} from 'lucide-react';

export default function AdvancedPublicVendorProfile() {
  const params = useParams();
  const searchParams = useSearchParams();
  // We use params?.id here to match the existing Next.js [id] dynamic routing folder
  const vendorId = params?.id as string;
  const originBooking = searchParams.get('originBooking');

  // --- Core Domain Registries ---
  const profilesRegistry: Record<string, any> = {
    'v_royal_palm': { name: 'The Royal Palm Marquee', type: 'Venue', city: 'Islamabad', basePrice: 450000, rating: '4.9', reviewsCount: 42, bio: 'Nestled beautifully in the heart of E-11, The Royal Palm offers exquisite pillarless luxury layout designs, custom high-end statement lighting rigging, and full internal temperature climate control frameworks for premium Pakistani bridal matrices.', stats: ['600 Guest Cap', 'Valet Framework Active', 'In-House Catering Array'], images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600', 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=600'], blackedOutDates: ['2026-11-14', '2026-12-25', '2026-12-26'] },
    's_bukhari_studio': { name: 'Bukhari Fine-Art Studios', type: 'Artisan Studio', city: 'Islamabad', basePrice: 220000, rating: '5.0', reviewsCount: 68, bio: 'Bukhari Studios is an elite squad of high-end visual documentarians capturing heritage weddings across Pakistan. Specializing in cinematic 4K master grading, candid wedding editorial frames, and secure digital archival asset custody loops.', stats: ['Dual Master Shooters', 'Next-Day Teaser Delivery', 'Raw Log Storage Access'], images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600'], blackedOutDates: ['2026-10-10', '2026-11-20'] }
  };

  const currentProfile = profilesRegistry[vendorId] || {
    name: 'Premium Registered Specialist', type: 'Nexus Vetted Partner', city: 'Pakistan', basePrice: 300000, rating: '4.8', reviewsCount: 14, bio: 'An elite curated partner under active evaluation inside the Nexus system framework parameters.', stats: ['Vetted Security Clearing', 'Dedicated Support Wire'], images: ['https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600'], blackedOutDates: []
  };

  // --- Advanced State Primitives ---
  const [targetDate, setTargetDate] = useState<string>('');
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'available' | 'booked'>('idle');
  const [guestCount, setGuestCount] = useState<number>(300);
  const [menuTier, setMenuTier] = useState<'standard' | 'premium' | 'luxury'>('standard');
  const [reviews, setReviews] = useState<Array<{author: string, rating: number, text: string}>>([
    { author: 'Zainab Ahmed', rating: 5, text: 'Absolutely spectacular service. The lighting and ambiance met our elite corporate expectations flawlessly.' },
    { author: 'Kamran Malik', rating: 4, text: 'Very professional operations management. Highly recommended for high-capacity events.' }
  ]);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [selectedLayout, setSelectedLayout] = useState<'traditional' | 'runway' | 'banquet'>('traditional');
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState<boolean>(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const [addOnsSelection, setAddOnsSelection] = useState({
    importedFlorals: false,
    concertAcoustics: false,
    coldFireProtocol: false
  });

  const addOnPrices = {
    importedFlorals: 120000, // Imported Orchids & Exotic Stage Floral Rigging
    concertAcoustics: 85000,  // Concert-Grade Acoustic Sub-system array
    coldFireProtocol: 45000   // Indoor Cold-fireworks & Dry Ice Entrance Protocol
  };

  // --- Business Calculation Pipelines ---
  const menuPerHeadCost = { standard: 1500, premium: 2500, luxury: 4500 }[menuTier];
  const calculatedTotalEstimate = 
    currentProfile.basePrice + 
    (guestCount * menuPerHeadCost) +
    (addOnsSelection.importedFlorals ? addOnPrices.importedFlorals : 0) +
    (addOnsSelection.concertAcoustics ? addOnPrices.concertAcoustics : 0) +
    (addOnsSelection.coldFireProtocol ? addOnPrices.coldFireProtocol : 0);

  const handleBroadcastEstimateWhatsApp = () => {
    const currentMenuName = menuTier === 'standard' ? 'One-Dish Essential' : menuTier === 'premium' ? 'Premium 3-Course' : 'Elite Imperial Multi';
    
    // Format the text string with clean, high-converting Pakistani wedding event descriptors
    const messageString = 
  `Assalam-o-Alaikum! 🌟
  
  We are reviewing a custom luxury package layout on Nexus Heritage Pakistan:
  🏛️ Venue: ${currentProfile.name} (${currentProfile.city})
  👥 Guest Scale: ${guestCount} Persons
  🍽️ Culinary Menu: ${currentMenuName} (PKR ${menuPerHeadCost.toLocaleString()}/head)
  
  ✨ Premium Add-ons Appended:
  ${addOnsSelection.importedFlorals ? '• Exotic Imported Florals (Orchids & Stage Garlands) 🌸\n' : ''}${addOnsSelection.concertAcoustics ? '• Concert-Grade Line Acoustics 🎵\n' : ''}${addOnsSelection.coldFireProtocol ? '• Cold-Fire & Dry Ice Entrance Protocol 💨\n' : ''}${!addOnsSelection.importedFlorals && !addOnsSelection.concertAcoustics && !addOnsSelection.coldFireProtocol ? '• Standard Setup Basics\n' : ''}
  💰 Total Projected Calculation: PKR ${calculatedTotalEstimate.toLocaleString()}
  
  🔗 Explore the interactive layout and verify dates here:
  https://nexus-app-pakistan.vercel.app/vendors/${vendorId}${originBooking ? `?originBooking=${originBooking}` : ''}`;
  
    // Encode text characters securely for public browser wire redirection mapping
    const encodedMessage = encodeURIComponent(messageString);
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  const handleExecuteSecureHire = async () => {
    if (!originBooking) {
      alert("Please navigate to this vendor profile from your active Client Portal to bind this contract.");
      return;
    }
    
    setIsSubmittingBooking(true);
    try {
      // 1. Patch the main booking entry to officialize the appointment link
      const fieldToUpdate = currentProfile.type === 'Venue' ? { venue_id: vendorId } : { studio_id: vendorId };
      const linkRes = await fetch(`/api/bookings/link-vendor?bookingId=${originBooking}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldToUpdate)
      });

      if (!linkRes.ok) throw new Error('Failed to lock venue slot allocation.');

      // 2. Adjust the total gross cost matrix dynamically inside event_payments_matrix
      const matrixUpdateRes = await fetch(`/api/bookings/link-vendor?bookingId=${originBooking}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total_contract_amount: calculatedTotalEstimate })
      });

      setBookingSuccess(true);
      alert(`Masha'Allah! ${currentProfile.name} has been successfully booked and linked to your contract ledger.`);
    } catch (err) {
      console.error('Secure booking settlement failure:', err);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const checkLiveAvailability = () => {
    if (!targetDate) return;
    const isBooked = currentProfile.blackedOutDates.includes(targetDate);
    setAvailabilityStatus(isBooked ? 'booked' : 'available');
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setReviews([{ author: 'Verified Client Account', rating: newRating, text: newReviewText }, ...reviews]);
    setNewReviewText('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 pb-20 antialiased font-sans">
      
      {/* Editorial Profile Banner Header */}
      <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
        <img src={currentProfile.images[0]} alt={currentProfile.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-black/50" />
        <div className="absolute top-6 left-6 max-w-7xl mx-auto w-full px-4">
          {originBooking && (
            <a href={`/portal/${originBooking}`} className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-[#0F5B3E] shadow-sm hover:bg-white transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Back To Client Portal Dashboard
            </a>
          )}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Portfolio Content Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 border border-emerald-100 text-[#0F5B3E] text-[9px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">{currentProfile.type}</span>
                  <span className="text-slate-400 text-xs font-bold inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-[#C5A880]" /> {currentProfile.city}</span>
                </div>
                <h1 className="font-serif text-xl sm:text-2xl font-black text-slate-950 tracking-tight">{currentProfile.name}</h1>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <span className="text-[8px] text-slate-400 uppercase font-black tracking-widest block">Base Rate Configuration</span>
                  <span className="text-sm font-black text-slate-950">PKR {currentProfile.basePrice.toLocaleString()}</span>
                </div>
                <div className="border-l border-slate-200 pl-3 flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <div>
                    <span className="text-xs font-black block text-slate-950">{currentProfile.rating}</span>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase">{currentProfile.reviewsCount + reviews.length - 2} Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">Professional Bio & Strategy</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{currentProfile.bio}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentProfile.stats.map((stat: string, i: number) => (
                <div key={i} className="bg-slate-50/60 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0F5B3E] shrink-0" /> {stat}
                </div>
              ))}
            </div>
          </div>

          {/* --- Exquisite Curation Portfolio UI Segment --- */}
          <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Exquisite Curation Portfolio</span>
              <h3 className="font-serif text-base font-black text-slate-950">Menus, Services & Special Allocations</h3>
              <p className="text-xs text-slate-400">Vetted culinary combinations and baseline event support options.</p>
            </div>

            {/* 1. Dynamic Interactive Tiered Menu Catalog */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                🍽️ Signature Menu Tier Breakdown
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Standard / One-Dish Option */}
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/40 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900">One-Dish Essential</span>
                    <span className="text-[11px] font-black text-[#0F5B3E]">PKR 1,500/hd</span>
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1.5 font-medium list-disc list-inside">
                    <li>Premium Chicken Biryani / Pulao</li>
                    <li>Traditional Roghni Naan Array</li>
                    <li>Fresh Salad & Mint Raita</li>
                    <li>Shahi Kheer Dessert Primitive</li>
                  </ul>
                </div>

                {/* Premium Option */}
                <div className="border border-[#C5A880]/30 rounded-xl p-4 bg-[#FAF5EC]/30 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#C5A880] text-white text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl-md">
                    Popular Selection
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900">Premium 3-Course</span>
                    <span className="text-[11px] font-black text-[#0F5B3E]">PKR 2,500/hd</span>
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1.5 font-medium list-disc list-inside">
                    <li>Mutton Qorma / Chicken Karahi</li>
                    <li>Reshmi Kebab & Tikka Live BBQ</li>
                    <li>Assorted Naan & Kulcha Basket</li>
                    <li>Hot Gulab Jamun with Ice Cream</li>
                  </ul>
                </div>

                {/* Luxury Option */}
                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/40 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-900">Elite Imperial Multi</span>
                    <span className="text-[11px] font-black text-[#0F5B3E]">PKR 4,500/hd</span>
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1.5 font-medium list-disc list-inside">
                    <li>Mutton Champ & Mughlai Handi</li>
                    <li>Full Live Charcoal BBQ Station</li>
                    <li>Seafood Tempura Appetizers</li>
                    <li>Zafrani Kulfi & Premium Pastries</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* 2. Core Operational Services Offered */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                💼 Core Structural Services Included
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 border border-slate-100 rounded-xl flex items-start gap-2.5">
                  <span className="p-1 bg-emerald-50 text-[#0F5B3E] rounded-md text-[10px] font-black">✓</span>
                  <div>
                    <p className="font-bold text-slate-900">Climate Control Logistics</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">High-tonnage HVAC systems maintaining optimal interior layout ambient atmosphere parameters.</p>
                  </div>
                </div>
                <div className="p-3 border border-slate-100 rounded-xl flex items-start gap-2.5">
                  <span className="p-1 bg-emerald-50 text-[#0F5B3E] rounded-md text-[10px] font-black">✓</span>
                  <div>
                    <p className="font-bold text-slate-900">Valet & Parking Security Rig</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Fully staffed dedicated valet coordination lane tracking up to 250 vehicles synchronously.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Exclusive Special Services / Heritage Add-ons */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-black text-[#C5A880] uppercase tracking-widest flex items-center gap-1.5">
                ✨ Exclusive Premium Special Services
              </h4>
              <div className="bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] border border-[#C5A880]/30 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="bg-[#0F5B3E] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider">
                    Nexus Signature Only
                  </span>
                  <h5 className="font-serif font-bold text-xs text-slate-950">Live Family Broadcasting Sync</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Secure, low-latency live video streaming uplink directly mapped to your overseas relatives' private portal links viewframes.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="bg-[#0F5B3E] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider">
                    Asset Protection
                  </span>
                  <h5 className="font-serif font-bold text-xs text-slate-950">Bespoke Dowry (Jahaiz) Vault Allocation</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Access to an on-site, restricted-access inventory room with secure barcode scanning tracking to coordinate wedding registry drops.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Dynamic Portfolio Media Grid */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1"><ImageIcon className="w-4 h-4 text-[#C5A880]" /> Media Showcase Array</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentProfile.images.map((img: string, i: number) => (
                <div key={i} className="bg-white border border-[#C5A880]/15 rounded-2xl overflow-hidden shadow-sm h-44 group">
                  <img src={img} alt="Showcase layout profile" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Nexus Spatial Planner - Layout Visualizer */}
          <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Nexus Spatial Planner</span>
                <h3 className="font-serif text-base font-black text-slate-950">Interactive Floor Plan Layout</h3>
                <p className="text-xs text-slate-400">Toggle setup configurations to preview capacity mapping guidelines.</p>
              </div>

              {/* Layout Selection Pillars */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-[9px] font-black uppercase tracking-wider">
                {(['traditional', 'runway', 'banquet'] as const).map((layout) => (
                  <button
                    key={layout}
                    type="button"
                    onClick={() => setSelectedLayout(layout)}
                    className={`px-2.5 py-1.5 rounded-lg transition-all ${
                      selectedLayout === layout ? 'bg-white text-[#0F5B3E] shadow-sm' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {layout === 'traditional' ? 'Baraat Stage' : layout === 'runway' ? 'Bridal Walkway' : 'Corporate Banquet'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Plan Canvas Matrix Grid */}
            <div className="bg-slate-950 rounded-xl p-6 relative aspect-[16/10] sm:aspect-[16/8] flex flex-col justify-between border border-slate-800 overflow-hidden shadow-inner">
              
              {/* Stage Area */}
              <div className="w-full flex justify-center">
                <div className={`transition-all duration-300 bg-gradient-to-b from-[#FAF5EC] to-[#C5A880]/40 border border-[#C5A880] text-slate-950 text-[10px] font-black uppercase tracking-widest text-center py-2.5 rounded-lg shadow-md ${
                  selectedLayout === 'traditional' ? 'w-1/2' : selectedLayout === 'runway' ? 'w-1/3' : 'w-2/3'
                }`}>
                  {selectedLayout === 'banquet' ? 'Main Presentation Stage' : 'Grand Heritage Bridal Stage'}
                </div>
              </div>

              {/* Center Dynamic Area (Runway or Main Floor Space) */}
              <div className="flex-1 flex items-center justify-center my-4 relative">
                {selectedLayout === 'runway' && (
                  <div className="w-12 h-full bg-gradient-to-r from-[#FAF5EC]/90 to-[#C5A880]/30 border-x border-dashed border-[#C5A880] flex items-center justify-center shadow-lg animate-fade-in">
                    <span className="text-[8px] text-slate-950 font-black uppercase tracking-widest [writing-mode:vertical-lr] text-center">
                      Premium Runway Walkway
                    </span>
                  </div>
                )}

                {/* Guest Table Distribution Representation Mapping */}
                <div className={`w-full grid gap-4 transition-all duration-300 ${
                  selectedLayout === 'runway' ? 'grid-cols-4 px-12' : 'grid-cols-6'
                }`}>
                  {Array.from({ length: selectedLayout === 'runway' ? 12 : 18 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center space-y-1">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                        selectedLayout === 'banquet' 
                          ? 'bg-slate-900 border-slate-700 text-slate-400' 
                          : 'bg-[#0F5B3E]/10 border-[#0F5B3E]/30 text-[#0F5B3E]'
                      }`}>
                        <span className="text-[8px] font-black">{idx + 1}</span>
                      </div>
                      <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tighter">
                        {selectedLayout === 'banquet' ? 'Pax 10' : 'Pax 8'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grand Entrance Node */}
              <div className="w-full flex justify-center border-t border-dashed border-slate-800 pt-3">
                <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[8px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-sm">
                  {selectedLayout === 'traditional' ? '🚪 Royal Baraat Entry Protocol Gate' : '🚪 Standard Main Foyer Entrance'}
                </span>
              </div>
            </div>

            {/* Informational Plan Specs Notice */}
            <div className="bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl text-[11px] text-slate-500 leading-relaxed font-medium flex items-center gap-2">
              <span className="p-1 bg-[#0F5B3E] text-white rounded text-[9px] font-black">i</span>
              {selectedLayout === 'traditional' && "Traditional arrangement optimized for maximum luxury sofa layouts flanking the central staging cluster."}
              {selectedLayout === 'runway' && "Walkway configuration partitions guest matrix blocks to create a dramatic center path ideal for cinema tracking."}
              {selectedLayout === 'banquet' && "Round-table arrangement ideal for wide-angle visibility, corporate configurations, or multi-course wedding menus."}
            </div>
          </div>

          {/* Live Customer Feedback Engine */}
          <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-[#0F5B3E]" /> Client Review Matrix</h3>
            
            <form onSubmit={handlePostReview} className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-3">
              <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Write a Verified Review</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Share your experience..." value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} className="sm:col-span-2 bg-white border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0F5B3E]" />
                <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} className="bg-white border border-slate-200 text-xs rounded-xl px-2 py-2 text-slate-700">
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white font-black text-[10px] uppercase tracking-widest py-2 rounded-xl transition-all shadow-sm">Submit Review</button>
            </form>

            <div className="space-y-3 divide-y divide-slate-100">
              {reviews.map((rev, idx) => (
                <div key={idx} className={`pt-3 ${idx === 0 ? 'pt-0' : ''} space-y-1`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="text-amber-500 font-black">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Widgets (Calendar & Calculator Panel) */}
        <div className="space-y-6">
          
          {/* Widget 1: Real-Time Date Availability Validator */}
          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0F5B3E]" /> Live Availability Lookup
            </h3>
            <div className="space-y-2">
              <input 
                type="date" 
                value={targetDate} 
                onChange={(e) => setTargetDate(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F5B3E]" 
              />
              <button 
                type="button" 
                onClick={checkLiveAvailability} 
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all"
              >
                Verify Target Date
              </button>
            </div>

            {/* Dynamic Conditional Redirection Actions */}
            {availabilityStatus === 'available' && (
              <div className="space-y-3 pt-1">
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-3 text-[11px] font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Slot Available! Calendar frame is open.
                </div>
                
                {/* 🚀 REDIRECTION TARGET ACTION: Launches Checkout Booking System Drawer */}
                <button
                  type="button"
                  onClick={() => setIsBookingDrawerOpen(true)}
                  className="w-full bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Instantly Book & Secure Slot
                </button>
              </div>
            )}
            {availabilityStatus === 'booked' && (
              <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-3 text-[11px] font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" /> Slot Closed. This specific date is fully reserved.
              </div>
            )}
          </div>

          {/* Widget 2: Event Cost Estimator Calculator */}
          <div className="bg-white border border-[#C5A880]/20 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calculator className="w-4 h-4 text-[#0F5B3E]" /> Event Cost Estimator</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1"><Users className="w-3 h-3" /> Guest Count: {guestCount}</label>
                <input 
                  type="range" 
                  min="50" max="1000" step="50" 
                  value={guestCount} 
                  onChange={(e) => setGuestCount(Number(e.target.value))} 
                  className="w-full accent-[#0F5B3E]" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Catering Tier</label>
                <select 
                  value={menuTier} 
                  onChange={(e) => setMenuTier(e.target.value as any)} 
                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0F5B3E]"
                >
                  <option value="standard">Standard (PKR 1,500 / head)</option>
                  <option value="premium">Premium (PKR 2,500 / head)</option>
                  <option value="luxury">Luxury (PKR 4,500 / head)</option>
                </select>
              </div>

              {/* Premium Accoutrements & Add-ons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Premium Accoutrements & Add-ons</label>
                <div className="space-y-2">
                  
                  <label className="flex items-center justify-between p-2.5 border border-slate-100 bg-slate-50/50 rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={addOnsSelection.importedFlorals} 
                        onChange={(e) => setAddOnsSelection({...addOnsSelection, importedFlorals: e.target.checked})}
                        className="rounded text-[#0F5B3E] focus:ring-[#0F5B3E] w-4 h-4 accent-[#0F5B3E]" 
                      />
                      <div>
                        <p className="font-bold text-slate-900">Exotic Imported Florals</p>
                        <p className="text-[10px] text-slate-400">White Orchids & Fresh Stage Garland Arrangements</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-[11px] shrink-0">+PKR {addOnPrices.importedFlorals.toLocaleString()}</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 border border-slate-100 bg-slate-50/50 rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={addOnsSelection.concertAcoustics} 
                        onChange={(e) => setAddOnsSelection({...addOnsSelection, concertAcoustics: e.target.checked})}
                        className="rounded text-[#0F5B3E] focus:ring-[#0F5B3E] w-4 h-4 accent-[#0F5B3E]" 
                      />
                      <div>
                        <p className="font-bold text-slate-900">Concert-Grade Line Acoustics</p>
                        <p className="text-[10px] text-slate-400">High-Fidelity Audio Engineering Setups for Folk Live Music</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-[11px] shrink-0">+PKR {addOnPrices.concertAcoustics.toLocaleString()}</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 border border-slate-100 bg-slate-50/50 rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={addOnsSelection.coldFireProtocol} 
                        onChange={(e) => setAddOnsSelection({...addOnsSelection, coldFireProtocol: e.target.checked})}
                        className="rounded text-[#0F5B3E] focus:ring-[#0F5B3E] w-4 h-4 accent-[#0F5B3E]" 
                      />
                      <div>
                        <p className="font-bold text-slate-900">Cold-Fire Entrance Protocol</p>
                        <p className="text-[10px] text-slate-400">Indoor Sparklers & Heavy Cloud Dry-Ice Atmosphere Sync</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-[11px] shrink-0">+PKR {addOnPrices.coldFireProtocol.toLocaleString()}</span>
                  </label>

                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-2 pt-3">
                <div className="flex justify-between text-[11px] font-medium text-slate-500"><span>Base Setup Charge:</span><span className="font-bold text-slate-900">PKR {currentProfile.basePrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-[11px] font-medium text-slate-500"><span>Catering Array ({guestCount} x {menuPerHeadCost}):</span><span className="font-bold text-slate-900">PKR {(guestCount * menuPerHeadCost).toLocaleString()}</span></div>
                
                {/* Conditional Add-on Statement Lines */}
                {addOnsSelection.importedFlorals && <div className="flex justify-between text-[11px] font-medium text-slate-500 text-emerald-700"><span>+ Premium Floral Overlay:</span><span className="font-bold">PKR {addOnPrices.importedFlorals.toLocaleString()}</span></div>}
                {addOnsSelection.concertAcoustics && <div className="flex justify-between text-[11px] font-medium text-slate-500 text-emerald-700"><span>+ Concert Audio Suite:</span><span className="font-bold">PKR {addOnPrices.concertAcoustics.toLocaleString()}</span></div>}
                {addOnsSelection.coldFireProtocol && <div className="flex justify-between text-[11px] font-medium text-slate-500 text-emerald-700"><span>+ Entrance Protocol Pack:</span><span className="font-bold">PKR {addOnPrices.coldFireProtocol.toLocaleString()}</span></div>}
                
                <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Calculation:</span><span className="text-sm font-black text-[#0F5B3E]">PKR {calculatedTotalEstimate.toLocaleString()}</span></div>
              </div>
              
              <button
                type="button"
                onClick={handleBroadcastEstimateWhatsApp}
                className="w-full mt-2 bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-200 font-black text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                💬 Share Quote Summary via WhatsApp
              </button>
            </div>
          </div>
          
        </div>
      </main>

      {isBookingDrawerOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-in font-sans">
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Nexus Checkout Node</span>
                  <h2 className="font-serif text-base font-black text-slate-950">Secure Your Slot Allocation</h2>
                </div>
                <button 
                  onClick={() => setIsBookingDrawerOpen(false)} 
                  className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg"
                >
                  Close
                </button>
              </div>

              {/* Selected Specifications Block */}
              <div className="space-y-3 bg-slate-50 border border-slate-200/60 rounded-xl p-4">
                <div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Appointed Professional</span>
                  <span className="text-xs font-bold text-slate-900">{currentProfile.name}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Locked Date Coordinates</span>
                  <span className="text-xs font-bold text-[#0F5B3E]">{targetDate}</span>
                </div>
                <div>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Configured Configuration Tier</span>
                  <span className="text-xs font-bold text-slate-900 capitalize">{menuTier} Catering Menu ({guestCount} Guests)</span>
                </div>
              </div>

              {/* Itemized Financial Summary Ledger */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">Statement Summary</span>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Base Setup Fee:</span>
                  <span>PKR {currentProfile.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Catering & Guest Services:</span>
                  <span>PKR {(guestCount * menuPerHeadCost).toLocaleString()}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center text-slate-950">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total Due Gross:</span>
                  <span className="text-base font-black text-[#0F5B3E]">PKR {calculatedTotalEstimate.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Submissions Core Footer Buttons */}
            <div className="pt-6 border-t border-slate-100 space-y-2">
              {bookingSuccess ? (
                <div className="space-y-3">
                  <div className="bg-emerald-50 text-emerald-800 p-4 border border-emerald-200 rounded-xl text-center text-xs font-bold">
                    🎉 Masha'Allah! Your booking layout is confirmed and safely bound to your contract profile.
                  </div>
                  <a 
                    href={`/portal/${originBooking}`}
                    className="w-full bg-slate-950 text-white text-center font-black text-xs py-3.5 rounded-xl block transition-all"
                  >
                    Return To Your Dashboard
                  </a>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    disabled={isSubmittingBooking}
                    onClick={handleExecuteSecureHire}
                    className="w-full bg-[#0F5B3E] hover:bg-[#0A3F2B] disabled:bg-slate-300 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md"
                  >
                    {isSubmittingBooking ? 'Securing Matrix Placement...' : 'Confirm Appointment & Sign Ledger'}
                  </button>
                  <p className="text-[9px] text-slate-400 text-center leading-relaxed font-medium">
                    By confirming, this platform dynamically logs your placeholder inside the vendor schedule and updates your client portal statement receipt.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
