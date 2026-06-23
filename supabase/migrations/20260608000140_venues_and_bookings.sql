-- 20260608000140_venues_and_bookings.sql

-- Drop the old venues table if it exists to apply the new schema cleanly
DROP TABLE IF EXISTS public.venues CASCADE;
DROP TABLE IF EXISTS public.event_bookings CASCADE;

-- Create Venues Table (جہاں ایونٹ ہونا ہے)
CREATE TABLE public.venues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    capacity INT,
    contact_phone TEXT NOT NULL -- وینیو مینیجر کا واٹس ایپ نمبر
);

-- Create Bookings / Orders Table
CREATE TABLE public.event_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID NOT NULL,
    host_id UUID NOT NULL REFERENCES public.contacts(id), -- یہ 'contacts' ٹیبل سے جڑے گا (client_b2c یا corporate_b2b)
    venue_id UUID REFERENCES public.venues(id),
    event_date DATE NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    order_status TEXT DEFAULT 'pending_venue' CHECK (order_status IN ('pending_venue', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Realtime انیبل کریں تاکہ وینیو اور ہوسٹ کی اسکرینز لائیو سنک رہیں
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_bookings;

-- Basic RLS for testing
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for venues (Testing)" ON public.venues FOR SELECT USING (true);
CREATE POLICY "Public insert access for venues (Testing)" ON public.venues FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for venues (Testing)" ON public.venues FOR UPDATE USING (true);

CREATE POLICY "Public read access for event_bookings (Testing)" ON public.event_bookings FOR SELECT USING (true);
CREATE POLICY "Public insert access for event_bookings (Testing)" ON public.event_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for event_bookings (Testing)" ON public.event_bookings FOR UPDATE USING (true);
