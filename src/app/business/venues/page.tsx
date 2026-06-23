'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, Calendar, Users, CheckCircle, AlertTriangle, 
  Loader2, ExternalLink, Send, MapPin, ShieldCheck
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NexusB2BVenueWorkspace() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Hydrate all booking layers associated with our venue infrastructure
  async function streamVenueSnapshot() {
    try {
      const { data, error } = await supabase
        .from('event_bookings')
        .select('*, venues(*)')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error hydrating B2B venue infrastructure:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    streamVenueSnapshot();

    // Establish dynamic real-time subscription channel for venue bookings
    const venueChannel = supabase
      .channel('b2b-venue-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'event_bookings' }, () => {
        streamVenueSnapshot();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(venueChannel);
    };
  }, []);

  // Handler to safely process and execute venue booking confirmation via our central API engine
  const handleApproveVenue = async (bookingId: string) => {
    setActionLoading(bookingId);
    try {
      const response = await fetch('/api/nexus-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'VENUE_APPROVE',
          bookingId: bookingId
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Pipeline execution failed');
      
      alert('Venue confirmed! Meta WABA tracking template fired to host mobile.');
    } catch (err: any) {
      alert(`Approval Pipeline Fault: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0F5B3E] animate-spin mb-2" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Streaming Venue Matrix Module...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans pb-12">
      
      {/* Upper B2B Venue Header Row */}
      <header className="sticky top-0 z-50 bg-[#0F5B3E] text-[#FAF7F2] border-b border-[#D4AF37]/40 p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4AF37]/20 p-2 rounded-xl border border-[#D4AF37]/40">
            <Building2 className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Nexus Venue Suite</span>
            <h1 className="text-base font-black tracking-tight">KHYBER CITY MANAGEMENT MATRIX</h1>
          </div>
        </div>
        <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Hall Controls Online
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-6">
        <div>
          <h2 className="text-lg font-black text-[#0F5B3E]">Incoming Rental & Reservation Log</h2>
          <p className="text-xs text-slate-400 mt-0.5">Approve incoming host vectors to lock date configurations and fire automated dispatch webhooks.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm font-medium">
            No active reservation slots logged in the execution cluster.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookings.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6 group hover:border-[#0F5B3E]/30 transition-all">
                
                {/* Information Node */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-black text-slate-800">{item.host_name}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                      item.order_status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.order_status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-500 font-medium">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0F5B3E]" /> Slot Date: <span className="font-bold text-slate-700">{item.event_date}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#0F5B3E]" /> Location: <span className="font-bold text-slate-700">{item.venues?.name || 'Assigned Venue'}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#0F5B3E]" /> Capacity: <span className="font-bold text-slate-700">{item.venues?.capacity || '500'} Persons</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-[#0F5B3E]" /> Routing Phone: <span className="font-bold text-slate-700">{item.host_phone}</span>
                    </p>
                  </div>
                </div>

                {/* Operations Call-To-Action Layout */}
                <div className="flex items-center gap-3 border-t pt-4 md:border-t-0 md:pt-0 border-slate-100">
                  {item.order_status === 'pending_venue' ? (
                    <button
                      onClick={() => handleApproveVenue(item.id)}
                      disabled={actionLoading === item.id}
                      className="w-full md:w-auto bg-[#0F5B3E] hover:bg-[#093a27] text-white font-black text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-sm"
                    >
                      {actionLoading === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Confirm Slot & Alert Host
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> Operational Sync Active
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
