-- 20260607000020_multiple_bank_accounts.sql

-- Add JSONB column for multiple bank accounts
ALTER TABLE public.contacts 
  ADD COLUMN IF NOT EXISTS bank_accounts JSONB NOT NULL DEFAULT '[]'::jsonb;
