-- 20260607000007_crm_events.sql

-- 1. Leads
CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  event_type_id TEXT, -- Will reference event_types
  event_date TIMESTAMPTZ,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Customers
CREATE TABLE public.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- nullable for offline clients
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Event Types
CREATE TABLE public.event_types (
  id TEXT PRIMARY KEY, -- e.g., 'wedding', 'mehndi', 'corporate'
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pre-populate common event types
INSERT INTO public.event_types (id, name, description) VALUES
  ('wedding', 'Wedding', 'Main wedding event'),
  ('mehndi', 'Mehndi', 'Pre-wedding celebration'),
  ('barat', 'Barat', 'Groom''s procession'),
  ('walima', 'Walima', 'Marriage banquet'),
  ('birthday', 'Birthday', 'Birthday party'),
  ('corporate', 'Corporate Event', 'Business gathering'),
  ('conference', 'Conference', 'Large corporate conference'),
  ('exhibition', 'Exhibition', 'Trade show or exhibition'),
  ('seminar', 'Seminar', 'Educational or professional seminar'),
  ('product_launch', 'Product Launch', 'Launch event for a new product')
ON CONFLICT DO NOTHING;

-- Add foreign key to leads now that event_types exists
ALTER TABLE public.leads ADD CONSTRAINT fk_leads_event_type FOREIGN KEY (event_type_id) REFERENCES public.event_types(id) ON DELETE SET NULL;

-- 4. Events
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
  event_type_id TEXT REFERENCES public.event_types(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  start_datetime TIMESTAMPTZ,
  end_datetime TIMESTAMPTZ,
  guest_count INTEGER,
  budget NUMERIC,
  status TEXT NOT NULL DEFAULT 'planned',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Customer Events
CREATE TABLE public.customer_events (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
  role_type TEXT NOT NULL, -- e.g., 'host', 'groom', 'bride', 'guest'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (event_id, customer_id)
);

-- Add triggers for updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_events ENABLE ROW LEVEL SECURITY;

-- Global Policy for Event Types
CREATE POLICY "Anyone can view event types" ON public.event_types FOR SELECT TO authenticated USING (true);

-- Tenant Isolation Policies
CREATE POLICY "Tenant Isolation Policy for leads" ON public.leads FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

CREATE POLICY "Tenant Isolation Policy for customers" ON public.customers FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

CREATE POLICY "Tenant Isolation Policy for events" ON public.events FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

CREATE POLICY "Tenant Isolation Policy for customer_events" ON public.customer_events FOR ALL USING (
  event_id IN (SELECT id FROM public.events WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()))
);
