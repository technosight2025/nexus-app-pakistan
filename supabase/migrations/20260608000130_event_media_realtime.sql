-- 20260608000130_event_media_realtime.sql

-- Create Media Table
CREATE TABLE public.event_media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL,
    url TEXT NOT NULL,
    caption TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- اہم ترین مرحلہ: اس ٹیبل کے لیے سپابیس ریئل ٹائم کو انیبل کریں
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_media;

-- Update Trigger for updated_at
CREATE TRIGGER update_event_media_updated_at 
BEFORE UPDATE ON public.event_media 
FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.event_media ENABLE ROW LEVEL SECURITY;

-- Note: Policies can be refined later, but for testing we'll allow public access
CREATE POLICY "Public read access for event_media (Testing)" ON public.event_media FOR SELECT USING (true);
CREATE POLICY "Public insert access for event_media (Testing)" ON public.event_media FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for event_media (Testing)" ON public.event_media FOR UPDATE USING (true);
