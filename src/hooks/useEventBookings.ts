'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface EventBooking {
  id: string;
  tenant_id: string;
  host_id: string;
  venue_id: string;
  event_date: string;
  total_amount: number;
  order_status: 'pending_venue' | 'confirmed' | 'cancelled';
  created_at: string;
}

export function useEventBookings(venueId: string) {
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 1. Fetch initial bookings for this venue
    const fetchInitialBookings = async () => {
      const { data, error } = await supabase
        .from('event_bookings')
        .select('*')
        .eq('venue_id', venueId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setBookings(data as EventBooking[]);
      }
      setLoading(false);
    };

    fetchInitialBookings();

    // 2. Subscribe to realtime changes on event_bookings table for this venue
    const channel = supabase
      .channel(`live-bookings-${venueId}`)
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, and DELETE
          schema: 'public',
          table: 'event_bookings',
          filter: `venue_id=eq.${venueId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newBooking = payload.new as EventBooking;
            setBookings((prev) => [newBooking, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedBooking = payload.new as EventBooking;
            setBookings((prev) =>
              prev.map((item) => (item.id === updatedBooking.id ? updatedBooking : item))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedBooking = payload.old as EventBooking;
            setBookings((prev) => prev.filter((item) => item.id !== deletedBooking.id));
          }
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [venueId]);

  // Function to update the status of a booking (e.g., Venue confirms the order)
  const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    const { error } = await supabase
      .from('event_bookings')
      .update({ order_status: status })
      .eq('id', bookingId);

    if (error) {
      console.error('Error updating booking status:', error.message);
    }
  };

  return { bookings, loading, updateBookingStatus };
}
