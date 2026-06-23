'use client';

import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Star, DollarSign, Search, SlidersHorizontal, Loader2, ChevronLeft, Video } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NexusStudioDiscoveryDirectory() {
  const [studios, setStudios] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Hydrate available studios directly from the B2B SaaS tenant partition matrix
  useEffect(() => {
    async function streamStudios() {
      try {
        const { data, error } = await supabase
          .from('tenants')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        setStudios(data || []);
      } catch (err) {
        console.error('Failed to parse studio tenant directories:', err);
      } finally {
        setLoading(false);
      }
    }
    streamStudios();
  }, []);

  const filteredStudios = studios.filter(studio => 
    studio.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#0F5B3E] animate-spin mb-2" />
        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Streaming Creative Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans antialiased pb-12 selection:bg-[#0F5B3E]/10">
      
      {/* Search Header Strip */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#C5A880]/20 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <div className="flex items-center gap-2">
            <a href="/" className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </a>
            <div>
              <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Premium Directory</span>
              <h1 className="text-sm font-serif font-black text-slate-900 tracking-tight">Elite Photographers & Visual Artists</h1>
            </div>
          </div>

          {/* Search Action Area */}
          <div className="flex gap-2 max-w-md w-full sm:w-72">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium studios..."
                className="w-full bg-white border border-[#C5A880]/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium focus:outline-none focus:border-[#0F5B3E] transition-all"
              />
            </div>
            <button type="button" className="p-2.5 border border-[#C5A880]/30 rounded-xl bg-white text-slate-600 hover:text-[#0F5B3E] shadow-sm transition-all">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Grid Portfolio Feed */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        {filteredStudios.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs font-bold uppercase tracking-wide">
            No artisan studios match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <div key={studio.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:border-[#0F5B3E]/30 transition-all flex flex-col group">
                
                {/* Visual Cover Canvas */}
                <div className="relative bg-gradient-to-br from-[#FAF5EC] to-[#F3EAD8] aspect-[4/3] flex items-center justify-center border-b border-slate-100">
                  <Camera className="w-10 h-10 text-[#0F5B3E]/40 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-[#C5A880]/20 text-[10px] font-black text-slate-700 flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-amber-500 fill-current" /> 4.8
                  </div>
                </div>

                {/* Card Context */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#C5A880]">Cinematography & Fine-Art</span>
                    <h3 className="font-serif text-sm font-black text-slate-900 group-hover:text-[#0F5B3E] transition-colors">{studio.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-[#0F5B3E]" /> Specialized Wedding Coverage
                    </p>
                  </div>

                  {/* Pricing Specs */}
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-1 text-slate-500 font-medium text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#0F5B3E]" /> Pakistan Wide
                    </div>
                    <div className="flex items-center gap-0.5 text-slate-800 font-serif font-black">
                      <span className="text-[10px] font-sans font-bold text-slate-400">PKR</span> {(200000).toLocaleString()}+
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
