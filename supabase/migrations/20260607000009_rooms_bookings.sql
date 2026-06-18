-- 20260607000009_rooms_bookings.sql

-- 1. Rename venues to rooms
ALTER TABLE public.venues RENAME TO rooms;

-- Drop and recreate the updated_at trigger for the renamed table
DROP TRIGGER IF EXISTS update_venues_updated_at ON public.rooms;
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Rename the RLS policy for clarity
ALTER POLICY "Tenant Isolation Policy for venues" ON public.rooms RENAME TO "Tenant Isolation Policy for rooms";

-- 2. Clean up events table (remove venue_id since an event can have multiple bookings)
ALTER TABLE public.events DROP COLUMN IF EXISTS venue_id;

-- 3. Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  slot TEXT NOT NULL, -- e.g., 'Day', 'Night', 'Full Day'
  status TEXT NOT NULL DEFAULT 'reserved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(room_id, booking_date, slot) -- Prevent double booking a room for the same slot
);

-- Add updated_at trigger for bookings
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy for bookings
CREATE POLICY "Tenant Isolation Policy for bookings" ON public.bookings FOR ALL USING (
  event_id IN (SELECT id FROM public.events WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()))
);
