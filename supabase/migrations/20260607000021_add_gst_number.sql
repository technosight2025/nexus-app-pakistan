-- 20260607000021_add_gst_number.sql

-- Add GST number tracking for contacts
ALTER TABLE public.contacts 
  ADD COLUMN IF NOT EXISTS gst_number TEXT NULL;
