-- Create the secure media storage bucket if it does not exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('nexus-media', 'nexus-media', false)
ON CONFLICT (id) DO NOTHING;

-- Policy 1: Allow unrestricted public read access to watermarked preview samples
CREATE POLICY "Allow public read access to watermarked previews" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'nexus-media' AND (storage.foldername(name))[1] = 'vaulted');

-- Policy 2: Enforce payment check rule on high-res originals path prefix
CREATE POLICY "Enforce payment check for high-res originals" 
ON storage.objects FOR SELECT 
USING (
    bucket_id = 'nexus-media' 
    AND (storage.foldername(name))[1] = 'originals'
    AND EXISTS (
        SELECT 1 FROM public.event_payments_matrix 
        WHERE high_res_unlocked = true 
        -- Assumes your file storage naming scheme incorporates the booking ID
        AND name LIKE '%' || booking_id::text || '%' 
    )
);
