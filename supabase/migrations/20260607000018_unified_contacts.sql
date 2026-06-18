-- 20260607000018_unified_contacts.sql

-- 1. Rename tables
ALTER TABLE public.customers RENAME TO contacts;
ALTER TABLE public.customer_events RENAME TO contact_events;

-- 2. Rename columns
ALTER TABLE public.contact_events RENAME COLUMN customer_id TO contact_id;

-- 3. Add industrial-grade localized enterprise tracking columns
ALTER TABLE public.contacts 
  ADD COLUMN IF NOT EXISTS contact_type TEXT NOT NULL DEFAULT 'individual', -- individual, company, employee, vendor, freelancer
  ADD COLUMN IF NOT EXISTS cnic TEXT NULL,                                   -- Localized identity validation
  ADD COLUMN IF NOT EXISTS office_address TEXT NULL,
  ADD COLUMN IF NOT EXISTS home_address TEXT NULL,
  ADD COLUMN IF NOT EXISTS bank_name TEXT NULL,
  ADD COLUMN IF NOT EXISTS bank_account_title TEXT NULL,
  ADD COLUMN IF NOT EXISTS bank_iban TEXT NULL,
  ADD COLUMN IF NOT EXISTS tax_number TEXT NULL; -- NTN tracking for corporate vendor filings

-- 4. Update triggers
DROP TRIGGER IF EXISTS update_customers_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 5. Update Policies for contacts
DROP POLICY IF EXISTS "Public read access for customers (Testing)" ON public.contacts;
DROP POLICY IF EXISTS "Public insert access for customers (Testing)" ON public.contacts;
DROP POLICY IF EXISTS "Public update access for customers (Testing)" ON public.contacts;

CREATE POLICY "Public read access for contacts (Testing)" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Public insert access for contacts (Testing)" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for contacts (Testing)" ON public.contacts FOR UPDATE USING (true);

-- 6. Update Policies for contact_events
DROP POLICY IF EXISTS "Public read access for customer_events (Testing)" ON public.contact_events;
DROP POLICY IF EXISTS "Public insert access for customer_events (Testing)" ON public.contact_events;
DROP POLICY IF EXISTS "Public update access for customer_events (Testing)" ON public.contact_events;

CREATE POLICY "Public read access for contact_events (Testing)" ON public.contact_events FOR SELECT USING (true);
CREATE POLICY "Public insert access for contact_events (Testing)" ON public.contact_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for contact_events (Testing)" ON public.contact_events FOR UPDATE USING (true);
