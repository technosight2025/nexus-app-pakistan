-- ====================================================================
-- NEXUS STORAGE SECURITY LAYER: ROW LEVEL SECURITY HARDENING
-- ====================================================================

-- 1. ENABLE ROW LEVEL SECURITY ON THE STORAGE STORAGE OBJECTS SCHEMA
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. POLICY A: ALLOW PUBLIC/CLIENT READS FOR COMPRESSED PROOFS (vaulted/)
CREATE POLICY "Allow open reads for watermarked proofs"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'nexus-media' 
  AND (storage.foldername(name))[1] = 'vaulted'
);

-- 3. POLICY B: CONDITIONAL SECURE READ ACCESS FOR ORIGINAL HIGH-RES FILES (originals/)
CREATE POLICY "Lock originals behind payment matrix verification"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'nexus-media'
  AND (storage.foldername(name))[1] = 'originals'
  AND EXISTS (
    SELECT 1 
    FROM public.event_payments_matrix
    WHERE public.event_payments_matrix.booking_id::text = (storage.filename(name))
    AND public.event_payments_matrix.high_res_unlocked = true
  )
);

-- 4. POLICY C: WRITE ACCESS ASSIGNMENT (Allows authenticated studio workers to upload assets)
CREATE POLICY "Allow authenticated studio managers full write access"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'nexus-media'
  -- Ensures requests are made by an authorized tenant connection
  AND auth.role() = 'authenticated'
);
