-- 20260607000022_link_conversations_to_contacts.sql

-- Link conversations strictly to a contact for WhatsApp UI mapping
ALTER TABLE public.conversations 
  ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL;
