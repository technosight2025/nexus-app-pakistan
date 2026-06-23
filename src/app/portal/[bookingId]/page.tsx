'use client';

import React, { useState, useEffect, use } from 'react';
import { 
  Heart, Image as ImageIcon, Video, Lock, Unlock, 
  MessageSquare, Loader2, Sparkles, CheckCircle, ShieldAlert 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import NexusChat from '@/components/NexusChat';

// Forces Next.js to treat this dynamic booking profile as a fully dynamic server-rendered segment
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

export default function NexusClientFacingPortal({ params }: PageProps) {
  const { bookingId } = use(params);
  const [booking, setBooking] = useState<any>(null);
  const [matrix, setMatrix] = useState<any>(null);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [linkedVenue, setLinkedVenue] = useState<any>(null);
  const [linkedStudio, setLinkedStudio] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'venue' | 'studio'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(800000);

  const [marketplaceVendors] = useState([
    { id: 'v_royal_palm', name: 'The Royal Palm Marquee', type: 'venue', city: 'Islamabad', price: 450000, metrics: 'Capacity: 600 Guests', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600' },
    { id: 'v_serena_hall', name: 'Sheesh Mahal Hall (Serena)', type: 'venue', city: 'Islamabad', price: 750000, metrics: 'Capacity: 400 Guests • 5-Star Luxury', image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=600' },
    { id: 'v_lahore_fort', name: 'Grand Mughal Marquee', type: 'venue', city: 'Lahore', price: 500000, metrics: 'Capacity: 800 Guests • Open Lawn', image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600' },
    { id: 's_bukhari_studio', name: 'Bukhari Fine-Art Studios', type: 'studio', city: 'Islamabad', price: 220000, metrics: 'Cinematic 4K Master Coverage', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600' },
    { id: 's_daastan_films', name: 'Daastan Media & Films', type: 'studio', city: 'Lahore', price: 350000, metrics: 'Luxury Documentary-Style Storytelling', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600' }
  ]);

  const filteredMarketplace = marketplaceVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' ? true : vendor.type === filterType;
    const matchesPrice = vendor.price <= maxPrice;
    return matchesSearch && matchesType && matchesPrice;
  });

  const handleLinkVendor = async (type: 'venue' | 'studio', vendorId: string) => {
    try {
      const fieldToUpdate = type === 'venue' ? { venue_id: vendorId } : { studio_id: vendorId };
      
      const res = await fetch(`/api/bookings/link-vendor?bookingId=${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldToUpdate)
      });

      if (!res.ok) throw new Error('Failed to associate vendor entity.');
      
      // Optimistic UI state adjustment
      if (type === 'venue') setLinkedVenue(vendorId);
      if (type === 'studio') setLinkedStudio(vendorId);
      
      alert(`Masha'Allah! Your premium ${type} selection has been linked to this contract layout.`);
    } catch (err) {
      console.error('Vendor linkage fault:', err);
    }
  };

  // Hydrate all database layers matching this specific unique booking channel
  async function hydratePortalCluster() {
    try {
      const { data: bookingData } = await supabase
        .from('event_bookings')
        .select('*, venues(*)')
        .eq('id', bookingId)
        .single();

      const { data: matrixData } = await supabase
        .from('event_payments_matrix')
        .select('*')
        .eq('booking_id', bookingId)
        .single();

      setBooking(bookingData);
      setMatrix(matrixData);

      // Populate a mock array of digital assets matching storage-naming conventions
      // In production, this reads directly from your storage path buckets
      const mockMedia = [
        { 
          id: 'img_01', 
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600', 
          label: 'Baraat Entrance _preview', 
          isFavorited: false 
        },
        { 
          id: 'img_02', 
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600', 
          label: 'Rukhsati Moment _preview', 
          isFavorited: false 
        },
        { 
          id: 'img_03', 
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600', 
          label: 'Stage Couple Portrait _preview', 
          isFavorited: false 
        },
        { 
          id: 'vid_01', 
          type: 'video', 
          url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600', 
          label: 'Cinematic Teaser 4K _high_res', 
          isHighRes: true 
        }
      ];
      setMediaItems(mockMedia);
    } catch (err) {
      console.error('Portal layer failed to hydrate baseline states:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    hydratePortalCluster();

    // Bind real-time WebSocket subscription hooks directly to database rows
    const portalChannel = supabase
      .channel(`portal-realtime-${bookingId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_bookings', filter: `id=eq.${bookingId}` }, (payload) => {
        setBooking((prev: any) => ({ ...prev, order_status: payload.new.order_status }));
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_payments_matrix', filter: `booking_id=eq.${bookingId}` }, (payload) => {
        setMatrix((prev: any) => ({ ...prev, high_res_unlocked: payload.new.high_res_unlocked }));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(portalChannel);
    };
  }, [bookingId]);

  // Handle client favoriting action and pipe selection metrics back to the Nexus Engine API
  const toggleFavoriteAsset = async (mediaId: string) => {
    let updatedStatus = 'selected';
    
    setMediaItems((prev) => 
      prev.map((item) => {
        if (item.id === mediaId) {
          const newFavState = !item.isFavorited;
          updatedStatus = newFavState ? 'approved' : 'rejected';
          return { ...item, isFavorited: newFavState };
        }
        return item;
      })
    );

    // Increment local state counter natively for instant user feedback
    setFavoritesCount(prev => updatedStatus === 'approved' ? prev + 1 : Math.max(0, prev - 1));

    // Fire the atomic selection update to the backend API route
    try {
      await fetch('/api/nexus-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CLIENT_MEDIA_SELECTION',
          bookingId: bookingId,
          mediaId: mediaId,
          status: updatedStatus
        })
      });
    } catch (err) {
      console.error('Failed to sync client media feedback with studio:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#0F5B3E] animate-spin mb-2" />
        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Syncing Client Portal Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Upper Brand Control Row Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#C5A880]/20 px-4 py-4 max-w-2xl mx-auto w-full flex justify-between items-center">
        <div>
          <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Private Client Portal</span>
          <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">{booking?.host_name || 'Guest'}</h1>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          booking?.order_status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {booking?.order_status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending Approval'}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-6 space-y-6">

        {/* Dynamic Countdown & Venue Overview HUD */}
        <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Scheduled Function</h2>
              <p className="font-serif text-base font-black text-slate-900 mt-0.5">{booking?.venues?.name || 'Khyber City Hall'}</p>
              <span className="text-[11px] text-slate-500 font-medium">{booking?.event_date}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-[#0F5B3E] bg-[#0F5B3E]/5 border border-[#0F5B3E]/10 px-3 py-1.5 rounded-xl">
                {favoritesCount} Selected for Album
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.open(`/api/invoice?bookingId=${bookingId}`, '_blank')}
            className="w-full mt-4 bg-white hover:bg-slate-50 text-[#0F5B3E] border border-[#C5A880]/40 font-black text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            Download Premium Digital Invoice Proof
          </button>
        </div>

        <section className="bg-white border border-[#C5A880]/20 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Nexus Global Marketplace</span>
              <h3 className="font-serif text-base font-black text-slate-950">Search Premium Venues & Studios</h3>
              <p className="text-xs text-slate-400">Discover vetted vendor assets matching your exact operational filters.</p>
            </div>
            
            {/* Type Filter Buttons */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-wider">
              {(['all', 'venue', 'studio'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${filterType === type ? 'bg-white text-[#0F5B3E] shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Reactive Search Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Search by Name or City</label>
              <input
                type="text"
                placeholder="e.g., Islamabad, Lahore, Serena..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F5B3E]"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-400">
                <label>Max Budget Allocation</label>
                <span className="text-[#0F5B3E]">PKR {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200000"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0F5B3E] h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredMarketplace.length > 0 ? (
              filteredMarketplace.map((vendor) => {
                const isCurrentlyLinked = vendor.type === 'venue' ? linkedVenue === vendor.id : linkedStudio === vendor.id;
                
                return (
                  <div key={vendor.id} className="border border-slate-200/60 hover:border-[#C5A880]/30 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between group transition-all">
                    <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={vendor.image} 
                        alt={vendor.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                        {vendor.city}
                      </span>
                    </div>
                    
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-black tracking-wider text-[#C5A880] block">
                          {vendor.type === 'venue' ? 'Premium Venue Selection' : 'Creative Studio Specialist'}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-slate-900 truncate mt-0.5">{vendor.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{vendor.metrics}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-medium">Estimated Pricing</span>
                          <span className="text-xs font-black text-slate-900">PKR {vendor.price.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex gap-1.5">
                          {/* Profile Exploratory Target Gateway */}
                          <a
                            href={`/vendors/${vendor.id}?originBooking=${bookingId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all shadow-sm"
                          >
                            Profile
                          </a>

                          <button
                            type="button"
                            disabled={isCurrentlyLinked}
                            onClick={() => handleLinkVendor(vendor.type as 'venue' | 'studio', vendor.id)}
                            className={`px-3 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all border ${
                              isCurrentlyLinked
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-not-allowed'
                                : 'bg-[#0F5B3E] hover:bg-[#0A3F2B] text-white border-[#0F5B3E] shadow-sm'
                            }`}
                          >
                            {isCurrentlyLinked ? '✓ Appointed' : 'Hire & Link'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-slate-400 font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No professional premium matches correspond to your configured filter rules.
              </div>
            )}
          </div>
        </section>

        {/* Production Digital Asset Media Showcase Selection Gallery Grid */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C5A880]" /> Interactive Selection Timeline
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Tap the heart icons to select your favorite proofs directly for album processing[cite: 2401].</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mediaItems.map((item) => {
              const isLocked = item.isHighRes && !matrix?.high_res_unlocked;
              return (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm relative group flex flex-col justify-between">
                  
                  {/* Visual Node Layer Container */}
                  <div className="relative bg-slate-100 aspect-video flex items-center justify-center overflow-hidden">
                    {item.url && (
                      <img src={item.url} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-101 transition-transform duration-300" />
                    )}

                    {isLocked ? (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-10 flex flex-col items-center justify-center text-white p-4 text-center">
                        <Lock className="w-5 h-5 text-[#C5A880] mb-1.5 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#C5A880]">High-Res Locked</span>
                        <p className="text-[9px] text-slate-200 font-medium mt-0.5 max-w-[160px]">Awaiting post-wedding balance clearance.</p>
                      </div>
                    ) : item.type === 'video' ? (
                      <div className="absolute inset-0 bg-slate-900/20 flex flex-col items-center justify-center text-white p-4 z-10 hover:bg-slate-900/40 transition-colors">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 mb-2">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider block drop-shadow-md">Master 4K Stream</span>
                      </div>
                    ) : null}

                    {/* Interactive Selection Trigger Overlay (Only for Proof Previews) */}
                    {!item.isHighRes && (
                      <button
                        type="button"
                        onClick={() => toggleFavoriteAsset(item.id)}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-xl shadow-md backdrop-blur-md transition-all ${
                          item.isFavorited 
                            ? 'bg-[#0F5B3E] text-white border border-[#0F5B3E]' 
                            : 'bg-white/80 border border-slate-200 text-slate-400 hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${item.isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Label Row Descriptor Footer Strip */}
                  <div className="p-3 bg-white border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-bold truncate max-w-[150px] font-mono">{item.label}</span>
                    <span className="text-[9px] bg-slate-50 px-2 py-0.5 rounded text-slate-400 font-black uppercase tracking-wider">
                      {item.isHighRes ? 'Original' : 'Proof'}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Multi-Portal Live Discussion Tab Layout Block */}
        <div className="space-y-3 pt-2">
          <NexusChat bookingId={bookingId} senderType="host" senderName={booking?.host_name || 'Host'} />
        </div>

      </main>
    </div>
  );
}
