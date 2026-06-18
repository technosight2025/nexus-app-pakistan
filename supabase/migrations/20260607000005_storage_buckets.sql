-- 20260607000005_storage_buckets.sql

-- Insert buckets into storage.buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('organizations', 'organizations', true),
('portfolios', 'portfolios', true),
('albums', 'albums', false),
('documents', 'documents', false),
('videos', 'videos', false),
('display-content', 'display-content', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for avatars (public read, authenticated users can insert/update their own)
CREATE POLICY "Public Access avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their avatars" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- RLS policies for organizations (public read, authenticated users can insert/update)
CREATE POLICY "Public Access organizations" ON storage.objects FOR SELECT USING (bucket_id = 'organizations');
CREATE POLICY "Authenticated users can upload org files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'organizations' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update org files" ON storage.objects FOR UPDATE USING (bucket_id = 'organizations' AND auth.role() = 'authenticated');

-- RLS policies for portfolios (public read, authenticated users can insert/update)
CREATE POLICY "Public Access portfolios" ON storage.objects FOR SELECT USING (bucket_id = 'portfolios');
CREATE POLICY "Authenticated users can upload portfolio files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolios' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update portfolio files" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolios' AND auth.role() = 'authenticated');

-- Private buckets (albums, documents, videos, display-content) - only authenticated users can read/write
CREATE POLICY "Authenticated users can access albums" ON storage.objects FOR ALL USING (bucket_id = 'albums' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access documents" ON storage.objects FOR ALL USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access videos" ON storage.objects FOR ALL USING (bucket_id = 'videos' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can access display-content" ON storage.objects FOR ALL USING (bucket_id = 'display-content' AND auth.role() = 'authenticated');
