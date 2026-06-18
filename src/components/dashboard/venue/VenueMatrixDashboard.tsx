'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useDashboard } from '@/contexts/DashboardContext';
import { Loader2, Plus, ExternalLink, Check } from 'lucide-react';
import type { Database } from '@/types/supabase';
import { EventFinancialLedger } from './EventFinancialLedger';

type RoomRow = Database['public']['Tables']['rooms']['Row'];
type LeadRow = Database['public']['Tables']['leads']['Row'];
type BookingRow = Database['public']['Tables']['bookings']['Row'] & {
  events?: { name: string; id: string; guest_count: number | null; budget: number | null } | null;
};

const SLOTS = ['Day', 'Night'] as const;

export function VenueMatrixDashboard() {
  const { branchId, organizationId } = useDashboard();
  const [rooms, setRooms] = useState<RoomRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Soft-lock creation state
  const [activeSlotSelection, setActiveSlotSelection] = useState<{ roomId: string, date: string, slot: string } | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inspection state
  const [inspectingEventId, setInspectingEventId] = useState<string | null>(null);

  const supabase = createClient();

  // Generate 14 days starting today
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    async function fetchData() {
      if (!branchId || !organizationId) return;
      setIsLoading(true);

      const [roomsRes, bookingsRes, leadsRes] = await Promise.all([
        supabase.from('rooms').select('*').eq('branch_id', branchId),
        supabase.from('bookings').select('*, events(*)').in('status', ['confirmed', 'tentative']),
        supabase.from('leads').select('*').eq('organization_id', organizationId).neq('status', 'booked')
      ]);

      if (roomsRes.data) setRooms(roomsRes.data);
      if (bookingsRes.data) setBookings(bookingsRes.data as unknown as BookingRow[]); 
      if (leadsRes.data) setLeads(leadsRes.data);
      
      setIsLoading(false);
    }
    fetchData();
  }, [branchId, organizationId, supabase]);

  const formatDateLabel = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatIsoDate = (d: Date) => {
    const tzOffset = d.getTimezoneOffset() * 60000;
    return (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 10);
  };

  const handleCreateBooking = async () => {
    if (!activeSlotSelection || !selectedLeadId || !organizationId || !branchId) return;
    
    setIsSubmitting(true);
    const selectedLead = leads.find(l => l.id === selectedLeadId);
    const numericToken = parseFloat(tokenAmount) || 0;
    const status = numericToken > 0 ? 'confirmed' : 'tentative';

    // 1. Create Event
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert({
        organization_id: organizationId,
        branch_id: branchId,
        name: selectedLead?.name || 'Unnamed Event',
        budget: numericToken > 0 ? numericToken : null,
        guest_count: selectedLead?.guest_count || null,
        status: status
      })
      .select()
      .single();

    if (eventError || !eventData) {
      console.error('Failed to create event:', eventError);
      setIsSubmitting(false);
      return;
    }

    // 2. Create Booking
    const newBooking = {
      event_id: eventData.id,
      room_id: activeSlotSelection.roomId,
      booking_date: activeSlotSelection.date,
      slot: activeSlotSelection.slot.toLowerCase(),
      status: status
    };

    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert(newBooking)
      .select('*, events(*)')
      .single();

    if (bookingError) {
      console.error('Failed to create booking:', bookingError);
    } else if (bookingData) {
      // Optimistic update
      setBookings(prev => [...prev, bookingData as unknown as BookingRow]);
      setActiveSlotSelection(null);
      setSelectedLeadId('');
      setTokenAmount('');
    }
    
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[600px] flex items-center justify-center text-[#0F5B3E] bg-[#FAF7F2]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] font-sans p-4 relative overflow-hidden">
      <div className="flex-1 overflow-auto border border-[#E6E2DA] bg-[#FFFFFF]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="sticky top-0 z-20 bg-[#FAF7F2] border-b-2 border-[#E6E2DA]">
            <tr>
              <th className="p-3 border-r border-[#E6E2DA] font-bold text-xs uppercase tracking-widest text-[#1D1C17] w-32 bg-[#FAF7F2] z-30 sticky left-0">
                Date
              </th>
              {rooms.map(room => (
                <th key={room.id} className="border-r border-[#E6E2DA] p-0 align-top">
                  <div className="p-2 border-b border-[#E6E2DA] text-center">
                    <div className="font-bold text-[#1D1C17] text-sm uppercase tracking-wider">{room.name}</div>
                    <div className="text-[10px] text-[#5E6460] font-bold">Max {room.capacity || 'N/A'}</div>
                  </div>
                  <div className="flex w-full divide-x divide-[#E6E2DA]">
                    <div className="flex-1 p-1 text-center text-[10px] font-black tracking-widest text-[#5E6460] uppercase">Day</div>
                    <div className="flex-1 p-1 text-center text-[10px] font-black tracking-widest text-[#5E6460] uppercase bg-[#FAF7F2]">Night</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map((date) => {
              const dateStr = formatIsoDate(date);
              
              return (
                <tr key={dateStr} className="border-b border-[#E6E2DA]">
                  {/* Row Header */}
                  <td className="p-3 border-r border-[#E6E2DA] text-xs font-bold text-[#1D1C17] bg-[#FFFFFF] sticky left-0 z-10 whitespace-nowrap">
                    {formatDateLabel(date)}
                  </td>

                  {/* Room Columns */}
                  {rooms.map(room => (
                    <td key={`${dateStr}-${room.id}`} className="p-0 border-r border-[#E6E2DA]">
                      <div className="flex h-full min-h-[80px] divide-x divide-[#E6E2DA]">
                        {SLOTS.map(slot => {
                          // Find Booking
                          const booking = bookings.find(b => 
                            b.room_id === room.id && 
                            b.booking_date === dateStr && 
                            b.slot.toLowerCase() === slot.toLowerCase() &&
                            (b.status === 'confirmed' || b.status === 'tentative')
                          );

                          const isSelected = activeSlotSelection?.roomId === room.id && 
                                             activeSlotSelection?.date === dateStr && 
                                             activeSlotSelection?.slot === slot;

                          if (booking) {
                            // BOOKED STATE
                            return (
                              <div key={slot} className="flex-1 bg-[#0F5B3E] p-2 flex flex-col justify-between border-b border-[#0F5B3E]">
                                <div>
                                  <div className="flex justify-between items-start mb-1">
                                    <div className="text-[10px] font-black text-[#E6F0EC] uppercase tracking-wider">
                                      {booking.status}
                                    </div>
                                    {booking.events?.budget && (
                                      <div className="bg-[#E6F0EC] text-[#0F5B3E] text-[9px] font-bold px-1.5 py-0.5 whitespace-nowrap">
                                        Rs: {booking.events.budget.toLocaleString()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-xs font-bold text-white leading-tight">
                                    {booking.events?.name || 'Unnamed Event'}
                                  </div>
                                  {booking.events?.guest_count && (
                                    <div className="text-[10px] text-[#E6F0EC] mt-0.5">
                                      {booking.events.guest_count} guests
                                    </div>
                                  )}
                                </div>
                                <button 
                                  onClick={() => setInspectingEventId(booking.events?.id || null)}
                                  className="mt-2 text-[#E6F0EC] hover:text-white flex items-center gap-1 text-[10px] font-bold group z-10 cursor-pointer"
                                >
                                  <span>View Master</span>
                                  <ExternalLink size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              </div>
                            );
                          }

                          // AVAILABLE STATE
                          return (
                            <div 
                              key={slot} 
                              className={`flex-1 p-2 relative group transition-colors ${
                                slot === 'Night' ? 'bg-[#FAF7F2]/30' : 'bg-[#FFFFFF]'
                              } ${isSelected ? 'bg-[#E6F0EC]' : 'hover:bg-[#FAF7F2]'}`}
                            >
                              {isSelected ? (
                                <div className="absolute top-0 left-0 w-64 z-40 bg-[#FFFFFF] border-2 border-[#0F5B3E] p-3 flex flex-col shadow-xl">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] font-bold text-[#0F5B3E] uppercase tracking-wider">Create Booking</span>
                                    <button onClick={() => setActiveSlotSelection(null)} className="text-[#5E6460] hover:text-[#1D1C17]">✕</button>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div>
                                      <label className="block text-[10px] font-bold text-[#5E6460] mb-1 uppercase">Link CRM Lead</label>
                                      <select 
                                        value={selectedLeadId}
                                        onChange={(e) => setSelectedLeadId(e.target.value)}
                                        className="w-full text-xs border border-[#E6E2DA] p-1.5 focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none"
                                      >
                                        <option value="">Select a Lead...</option>
                                        {leads.map(l => (
                                          <option key={l.id} value={l.id}>{l.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                    
                                    <div>
                                      <label className="block text-[10px] font-bold text-[#5E6460] mb-1 uppercase">Token Amount (Bayaana)</label>
                                      <input 
                                        type="number" 
                                        value={tokenAmount}
                                        onChange={(e) => setTokenAmount(e.target.value)}
                                        placeholder="e.g. 50000" 
                                        className="w-full text-xs border border-[#E6E2DA] p-1.5 focus:outline-none focus:border-[#0F5B3E] bg-[#FAF7F2] rounded-none" 
                                      />
                                    </div>

                                    <button 
                                      onClick={handleCreateBooking}
                                      disabled={!selectedLeadId || isSubmitting}
                                      className="w-full bg-[#0F5B3E] text-white text-[11px] font-bold py-2 rounded-none hover:bg-[#0c4931] disabled:opacity-50 flex items-center justify-center gap-1 mt-2 transition-colors"
                                    >
                                      {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                      Confirm Booking
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div 
                                  onClick={() => setActiveSlotSelection({ roomId: room.id, date: dateStr, slot })}
                                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[#0F5B3E]"
                                >
                                  <div className="flex flex-col items-center">
                                    <Plus size={16} />
                                    <span className="text-[9px] font-bold uppercase tracking-wider mt-1">Soft-Lock</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {inspectingEventId && (
        <EventFinancialLedger 
          eventId={inspectingEventId} 
          onClose={() => setInspectingEventId(null)} 
        />
      )}
    </div>
  );
}
