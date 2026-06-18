-- 20260607000016_settings_public_mutations.sql

-- Temporary policies to allow public inserts/updates for testing the Settings UI without authentication
CREATE POLICY "Public insert access for rooms (Testing)" ON public.rooms FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for rooms (Testing)" ON public.rooms FOR UPDATE USING (true);

CREATE POLICY "Public read access for branches (Testing)" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Public update access for branches (Testing)" ON public.branches FOR UPDATE USING (true);
