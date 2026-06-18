-- 20260607000014_payments_table.sql

CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL, -- 'Cash', 'Bank Transfer', 'Cheque'
  reference_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy
CREATE POLICY "Tenant Isolation Policy for payments" ON public.payments FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

-- Public testing policies
CREATE POLICY "Public read access for payments (Testing)" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Public insert access for payments (Testing)" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for payments (Testing)" ON public.payments FOR UPDATE USING (true);
