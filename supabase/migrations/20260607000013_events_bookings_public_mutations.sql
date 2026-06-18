-- 20260607000013_events_bookings_public_mutations.sql

-- Temporary policies to allow public mutations for testing the Venue Matrix UI without authentication
CREATE POLICY "Public insert access for events (Testing)" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for events (Testing)" ON public.events FOR UPDATE USING (true);

CREATE POLICY "Public insert access for bookings (Testing)" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for bookings (Testing)" ON public.bookings FOR UPDATE USING (true);
