-- 20260607000010_dev_public_read_testing.sql

-- Temporary policies to allow public reads for testing the Venue Matrix UI without authentication
CREATE POLICY "Public read access for rooms (Testing)" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Public read access for bookings (Testing)" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public read access for events (Testing)" ON public.events FOR SELECT USING (true);
