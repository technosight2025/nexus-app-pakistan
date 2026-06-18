'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Clock, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// --- Types ---
type SlotStatus = 'Available' | 'SoftLock' | 'HardLock';

interface SlotData {
  status: SlotStatus;
  // SoftLock data
  leadName?: string;
  expiresInHours?: number;
  // HardLock data
  eventType?: string;
  guestCount?: number;
  paymentStatus?: 'Paid' | 'Partial' | 'Pending';
}

interface Room {
  id: string;
  name: string;
}

interface MatrixProps {
  current_branch_id: string;
}

export function VenueMatrixCalendar({ current_branch_id }: MatrixProps) {
  const [currentMonth, setCurrentMonth] = useState('December 2026');
  
  // Real DB State
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchMatrixData() {
      if (!current_branch_id) return;
      setIsLoading(true);

      try {
        // 1. Fetch physical rooms for this branch
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('id, name')
          .eq('branch_id', current_branch_id)
          .order('name');
        
        if (roomError) throw roomError;
        setRooms(roomData || []);

        const roomIds = roomData?.map(r => r.id) || [];

        // 2. Fetch bookings for these rooms (along with event details via join)
        if (roomIds.length > 0) {
          const { data: bookingData, error: bookingError } = await supabase
            .from('bookings')
            .select(`
              id,
              room_id,
              booking_date,
              slot,
              status,
              events:event_id (
                name,
                guest_count,
                event_type_id
              )
            `)
            .in('room_id', roomIds);
          
          if (bookingError) throw bookingError;
          setBookings(bookingData || []);
        }
      } catch (error) {
        console.error('Error fetching matrix data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMatrixData();
  }, [current_branch_id]);

  // Generate days for Dec 2026 (hardcoded date generation for now)
  const DAYS = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(2026, 11, i + 1); // Dec 1 to Dec 14
    // Format to match DB booking_date format: 'YYYY-MM-DD'
    const fullDateStr = date.toLocaleDateString('en-CA'); // e.g. '2026-12-01'
    return {
      dateString: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      day: i + 1,
      fullDateStr
    };
  });

  // Data mapping logic
  const getSlotData = (dateStr: string, roomId: string, isDay: boolean): SlotData => {
    const targetSlot = isDay ? 'Day' : 'Night';
    
    // Find the booking for this specific cell
    const booking = bookings.find(b => 
      b.room_id === roomId && 
      b.booking_date === dateStr && 
      b.slot === targetSlot
    );

    if (booking) {
      if (booking.status === 'reserved' || booking.status === 'confirmed') {
        return { 
          status: 'HardLock', 
          eventType: booking.events?.event_type_id || 'Event', 
          guestCount: booking.events?.guest_count || 0, 
          paymentStatus: 'Paid' 
        };
      } else {
        return { 
          status: 'SoftLock', 
          leadName: booking.events?.name || 'Lead', 
          expiresInHours: 24 
        };
      }
    }

    // Default to available
    return { status: 'Available' };
  };

  // Helper to render the cell UI based on state
  const renderCell = (data: SlotData) => {
    switch (data.status) {
      case 'Available':
        return (
          <div className="w-full h-full min-h-[80px] bg-[#FFFFFF] hover:bg-slate-50 transition-colors flex items-center justify-center cursor-pointer group">
            <Plus className="opacity-0 group-hover:opacity-100 text-[#0F5B3E] transition-opacity w-5 h-5" />
          </div>
        );

      case 'SoftLock':
        return (
          <div className="w-full h-full min-h-[80px] bg-[#E6F0EC] border-2 border-dashed border-[#0F5B3E] p-2 flex flex-col justify-between cursor-pointer hover:bg-[#d8e8e2] transition-colors">
            <span className="text-[11px] font-bold text-[#1D1C17] uppercase tracking-wide truncate">
              {data.leadName}
            </span>
            <div className="flex items-center gap-1 text-[#D9467A] bg-[#FFFFFF] px-1.5 py-0.5 w-max">
              <Clock className="w-3 h-3" />
              <span className="text-[9px] font-bold">{data.expiresInHours}h Hold</span>
            </div>
          </div>
        );

      case 'HardLock':
        return (
          <div className="w-full h-full min-h-[80px] bg-[#0F5B3E] text-[#FFFFFF] p-2 flex flex-col justify-between cursor-pointer hover:bg-[#0c4931] transition-colors shadow-none rounded-none border border-[#0F5B3E]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider truncate">{data.eventType}</p>
              <p className="text-[10px] text-[#FAF7F2]/80">{data.guestCount || '-'} Guests</p>
            </div>
            <div className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 w-max ${
              data.paymentStatus === 'Paid' ? 'bg-[#FFFFFF] text-[#0F5B3E]' : 'bg-[#C9A227] text-[#FFFFFF]'
            }`}>
              {data.paymentStatus}
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[400px] bg-[#FAF7F2] border border-[#E6E2DA] flex items-center justify-center text-[#0F5B3E]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] font-sans text-[#1D1C17] border border-[#E6E2DA]">
      
      {/* Header Controls */}
      <div className="p-4 bg-[#FFFFFF] border-b border-[#E6E2DA] flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold tracking-tight uppercase">Venue Matrix</h2>
          <p className="text-xs font-semibold text-[#5E6460] mt-0.5">{currentMonth}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-[#5E6460]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 border-2 border-dashed border-[#0F5B3E] bg-[#E6F0EC]"></div>
            <span>Soft-Lock</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#0F5B3E]"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            {/* Top Level: Halls/Rooms */}
            <tr>
              <th className="bg-[#FFFFFF] border-b border-r border-[#E6E2DA] w-32 shrink-0 sticky left-0 z-20"></th>
              {rooms.length === 0 ? (
                <th className="bg-[#FFFFFF] border-b border-r border-[#E6E2DA] py-3 text-center text-xs font-black text-[#1D1C17] uppercase tracking-widest">
                  No Rooms Found
                </th>
              ) : (
                rooms.map((room) => (
                  <th key={room.id} colSpan={2} className="bg-[#FFFFFF] border-b border-r border-[#E6E2DA] py-3 text-center text-xs font-black text-[#1D1C17] uppercase tracking-widest">
                    {room.name}
                  </th>
                ))
              )}
            </tr>
            {/* Sub Level: Day / Night Slots */}
            {rooms.length > 0 && (
              <tr>
                <th className="bg-[#FAF7F2] border-b border-r border-[#E6E2DA] w-32 shrink-0 sticky left-0 z-20 p-2 text-left text-[10px] font-bold text-[#5E6460] uppercase">
                  Date
                </th>
                {rooms.map((room) => (
                  <React.Fragment key={`${room.id}-slots`}>
                    <th className="bg-[#FAF7F2] border-b border-r border-[#E6E2DA] py-2 text-center text-[10px] font-bold text-[#5E6460] uppercase w-48">
                      Day <span className="font-medium normal-case">(1pm-4pm)</span>
                    </th>
                    <th className="bg-[#FAF7F2] border-b border-r border-[#E6E2DA] py-2 text-center text-[10px] font-bold text-[#5E6460] uppercase w-48">
                      Night <span className="font-medium normal-case">(7pm-11pm)</span>
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rooms.length > 0 && DAYS.map((dayObj) => (
              <tr key={dayObj.day}>
                {/* Row Header (Date) */}
                <td className="bg-[#FFFFFF] border-b border-r border-[#E6E2DA] p-3 sticky left-0 z-10">
                  <span className="text-xs font-bold text-[#1D1C17] tracking-tight">
                    {dayObj.dateString}
                  </span>
                </td>
                
                {/* Cells for Rooms */}
                {rooms.map((room) => {
                  const daySlotData = getSlotData(dayObj.fullDateStr, room.id, true);
                  const nightSlotData = getSlotData(dayObj.fullDateStr, room.id, false);

                  return (
                    <React.Fragment key={`${dayObj.day}-${room.id}`}>
                      <td className="border-b border-r border-[#E6E2DA] p-0 align-top">
                        {renderCell(daySlotData)}
                      </td>
                      <td className="border-b border-r border-[#E6E2DA] p-0 align-top">
                        {renderCell(nightSlotData)}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
            {rooms.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-sm font-bold text-[#5E6460]">
                  No rooms exist for this branch yet. Create a room to view the matrix.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
