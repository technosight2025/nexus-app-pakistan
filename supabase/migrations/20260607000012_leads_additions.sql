-- 20260607000012_leads_additions.sql

-- Add new CRM specific columns to the leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS budget NUMERIC,
ADD COLUMN IF NOT EXISTS guest_count INTEGER,
ADD COLUMN IF NOT EXISTS next_action_note TEXT,
ADD COLUMN IF NOT EXISTS is_urgent BOOLEAN DEFAULT false;

-- Add temporary RLS bypass for dev testing of the CRM Board without login
CREATE POLICY "Public read access for leads (Testing)" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Public insert access for leads (Testing)" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for leads (Testing)" ON public.leads FOR UPDATE USING (true);
