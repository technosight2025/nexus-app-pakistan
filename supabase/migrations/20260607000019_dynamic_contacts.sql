-- 20260607000019_dynamic_contacts.sql

-- Add company info and employee-specific fields to contacts
ALTER TABLE public.contacts 
  ADD COLUMN IF NOT EXISTS company_name TEXT NULL,
  ADD COLUMN IF NOT EXISTS company_info TEXT NULL,
  ADD COLUMN IF NOT EXISTS designation TEXT NULL,
  ADD COLUMN IF NOT EXISTS personal_phone TEXT NULL;
