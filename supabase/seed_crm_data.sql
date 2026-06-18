-- 20260607_seed_crm_data.sql
-- Run this in your Supabase SQL Editor to populate the CRM Pipeline Board

-- We will use the existing organization created in the previous seed:
-- '11111111-1111-1111-1111-111111111111'

INSERT INTO public.leads (id, organization_id, name, phone, event_date, budget, guest_count, next_action_note, status, is_urgent)
VALUES 
  ('77777777-7777-7777-7777-777777777771', '11111111-1111-1111-1111-111111111111', 'Ahmed Raza', '+923001234567', '2026-10-15', 1200000, 450, 'Call to discuss themes', 'new', true),
  ('77777777-7777-7777-7777-777777777772', '11111111-1111-1111-1111-111111111111', 'Zara Khan', '+923331234567', '2026-11-02', 800000, 300, 'Show Grand Ballroom', 'visit', false),
  ('77777777-7777-7777-7777-777777777773', '11111111-1111-1111-1111-111111111111', 'TechCorp Gala', '+923451234567', '2026-12-10', 2500000, 800, 'Follow up on PDF quote sent today', 'quote', false)
ON CONFLICT (id) DO NOTHING;
