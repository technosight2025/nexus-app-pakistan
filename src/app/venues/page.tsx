'use client';

import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Users, Loader2, ChevronLeft, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { VenueHero } from '@/components/venues/VenueHero';

const getVenueImage = (venueName: string = '', id: string = '') => {
  const name = venueName.toLowerCase();
  if (name.includes('palm') || id.includes('1')) {
    return "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop";
  }
  if (name.includes('monal') || id.includes('2')) {
    return "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop";
  }
  if (name.includes('meadow') || id.includes('3')) {
    return "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop";
  }
  return "https://images.unsplash.com/photo-1519225495810-7512c696af05?q=80&w=800&auto=format&fit=crop";
};

export default function NexusVenueDiscoveryDirectory() {
  const [venues, setVenues] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [loading, setLoading] = useState(true);

  // Hydrate available venues directly from the Supabase B2B data tier
  useEffect(() => {
    async function streamVenues() {
      // Guard: skip if Supabase is not configured in this environment
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('Supabase env vars not set — venue list will be empty in local dev.');
        setLoading(false);
        return;
      }
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setVenues(data || []);
      } catch (err) {
        console.error('Failed to parse venue database collections:', err);
      } finally {
        setLoading(false);
      }
    }
    streamVenues();
  }, []);


  // Filter items matching search, city, and category queries safely
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = 
      !searchQuery || 
      venue.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCity = 
      selectedCity === "All" || 
      !venue.location || 
      venue.location.toLowerCase().includes(selectedCity.toLowerCase());

    const matchesCategory = 
      selectedCategory === "All Types" || 
      !venue.type || 
      venue.type.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Marquees" && (venue.type.toLowerCase().includes("marquee") || venue.name?.toLowerCase().includes("marquee"))) ||
      (selectedCategory === "Banquet Halls" && (venue.type.toLowerCase().includes("hall") || venue.type.toLowerCase().includes("banquet") || venue.name?.toLowerCase().includes("ballroom"))) ||
      (selectedCategory === "Farmhouses" && (venue.type.toLowerCase().includes("farmhouse") || venue.name?.toLowerCase().includes("farmhouse"))) ||
      (selectedCategory === "Hotels" && (venue.type.toLowerCase().includes("hotel") || venue.name?.toLowerCase().includes("hotel"))) ||
      (selectedCategory === "Restaurants" && (venue.type.toLowerCase().includes("restaurant") || venue.name?.toLowerCase().includes("restaurant")));

    return matchesSearch && matchesCity && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#0F5B3E] animate-spin mb-2" />
        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Streaming Venue Matrix...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Search Header Navigation Core */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#C5A880]/20 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </a>
            <div>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Premium Directory</span>
              <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Explore Pakistan&apos;s Finest Venues</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 bg-[#0F5B3E]/10 text-[#0F5B3E] font-bold rounded-full">
              {filteredVenues.length} {filteredVenues.length === 1 ? 'Venue' : 'Venues'}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <VenueHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Grid View */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        {filteredVenues.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs font-bold uppercase tracking-wide">
            No elite spaces match your active filter inputs.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <a 
                href={`/venues/${venue.id}`}
                key={venue.id} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:border-[#0F5B3E]/30 transition-all flex flex-col group cursor-pointer hover:shadow-md"
              >
                
                {/* Visual Imagery Asset */}
                <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-100 bg-[#FAF5EC]">
                  <img 
                    src={getVenueImage(venue.name, venue.id)} 
                    alt={venue.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-[#C5A880]/20 text-[10px] font-black text-slate-700 flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-current" /> 4.9
                  </div>
                </div>

                {/* Meta Description Copy Block */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">
                      {venue.type || 'Exclusive Venue'}
                    </span>
                    <h3 className="font-serif text-sm font-black text-slate-900 group-hover:text-[#0F5B3E] transition-colors">{venue.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0F5B3E]" /> {venue.location || 'Pakistan'}
                    </p>
                  </div>

                  {/* Pricing and Capacity Specs Ribbon */}
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users className="w-4 h-4 text-[#0F5B3E]" /> <span>{venue.capacity || '500'} Max</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-slate-800 font-serif font-black">
                      <span className="text-[10px] font-sans font-bold text-slate-400">PKR</span> {(450000).toLocaleString()}+
                    </div>
                  </div>
                </div>

              </a>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
