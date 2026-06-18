-- 20260607000026_host_dashboard_schema.sql

-- NEXUS Host (B2C) Dashboard Schema
-- This schema represents events from the perspective of the Customer (Host), 
-- who acts as the central planner and can hire multiple vendors (Organizations).

-- 1. Host Events (The overarching event planned by the customer)
CREATE TABLE public.host_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL, -- The Host
  name TEXT NOT NULL, -- e.g., "Wedding of Ahmed & Fatima"
  event_type TEXT NOT NULL, -- e.g., 'Wedding', 'Corporate'
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  guest_count_expected INTEGER DEFAULT 0,
  total_budget NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Planning', -- Inquiry, Planning, In Progress, Completed
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Host Event Milestones (Timeline)
CREATE TABLE public.host_event_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_event_id UUID REFERENCES public.host_events(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  milestone_date TIMESTAMPTZ,
  time_string TEXT,
  venue_string TEXT,
  status TEXT NOT NULL DEFAULT 'Upcoming', -- Upcoming, Completed
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Host Event Budgets (Category Breakdown)
CREATE TABLE public.host_event_budgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_event_id UUID REFERENCES public.host_events(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL, -- Venue, Catering, Decor, Photography
  allocated_amount NUMERIC DEFAULT 0,
  spent_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(host_event_id, category)
);

-- 4. Host Event Vendors (Links the Host's Event to B2B Vendor Organizations)
CREATE TABLE public.host_event_vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_event_id UUID REFERENCES public.host_events(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL, -- The Vendor (Optional, might just be a manual entry first)
  vendor_name TEXT NOT NULL, -- Hardcoded name if organization_id is null
  service_type TEXT NOT NULL, -- Photographer, Decorator
  status TEXT NOT NULL DEFAULT 'Inquiry', -- Inquiry, Quoted, Booked, Rejected
  agreed_price NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Host Event Guests
CREATE TABLE public.host_event_guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_event_id UUID REFERENCES public.host_events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  rsvp_status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, Declined
  pax_count INTEGER DEFAULT 1,
  group_name TEXT, -- e.g., "Bride's Family"
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Host Event Tasks
CREATE TABLE public.host_event_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_event_id UUID REFERENCES public.host_events(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  priority TEXT DEFAULT 'Medium', -- Low, Medium, High
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at triggers
CREATE TRIGGER update_host_events_updated_at BEFORE UPDATE ON public.host_events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_host_event_milestones_updated_at BEFORE UPDATE ON public.host_event_milestones FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_host_event_budgets_updated_at BEFORE UPDATE ON public.host_event_budgets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_host_event_vendors_updated_at BEFORE UPDATE ON public.host_event_vendors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_host_event_guests_updated_at BEFORE UPDATE ON public.host_event_guests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_host_event_tasks_updated_at BEFORE UPDATE ON public.host_event_tasks FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.host_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_event_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_event_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_event_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_event_guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_event_tasks ENABLE ROW LEVEL SECURITY;

-- Policies (Host can only see their own events)
CREATE POLICY "Host Isolation Policy for host_events" ON public.host_events FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Host Isolation Policy for milestones" ON public.host_event_milestones FOR ALL USING (host_event_id IN (SELECT id FROM public.host_events WHERE user_id = auth.uid()));
CREATE POLICY "Host Isolation Policy for budgets" ON public.host_event_budgets FOR ALL USING (host_event_id IN (SELECT id FROM public.host_events WHERE user_id = auth.uid()));
CREATE POLICY "Host Isolation Policy for vendors" ON public.host_event_vendors FOR ALL USING (host_event_id IN (SELECT id FROM public.host_events WHERE user_id = auth.uid()));
CREATE POLICY "Host Isolation Policy for guests" ON public.host_event_guests FOR ALL USING (host_event_id IN (SELECT id FROM public.host_events WHERE user_id = auth.uid()));
CREATE POLICY "Host Isolation Policy for tasks" ON public.host_event_tasks FOR ALL USING (host_event_id IN (SELECT id FROM public.host_events WHERE user_id = auth.uid()));

-- Public testing policies (for development without Auth)
CREATE POLICY "Public read testing host_events" ON public.host_events FOR SELECT USING (true);
CREATE POLICY "Public insert testing host_events" ON public.host_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testing host_events" ON public.host_events FOR UPDATE USING (true);
CREATE POLICY "Public delete testing host_events" ON public.host_events FOR DELETE USING (true);

CREATE POLICY "Public read testing host_event_milestones" ON public.host_event_milestones FOR SELECT USING (true);
CREATE POLICY "Public insert testing host_event_milestones" ON public.host_event_milestones FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testing host_event_milestones" ON public.host_event_milestones FOR UPDATE USING (true);

CREATE POLICY "Public read testing host_event_budgets" ON public.host_event_budgets FOR SELECT USING (true);
CREATE POLICY "Public insert testing host_event_budgets" ON public.host_event_budgets FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testing host_event_budgets" ON public.host_event_budgets FOR UPDATE USING (true);

CREATE POLICY "Public read testing host_event_vendors" ON public.host_event_vendors FOR SELECT USING (true);
CREATE POLICY "Public insert testing host_event_vendors" ON public.host_event_vendors FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testing host_event_vendors" ON public.host_event_vendors FOR UPDATE USING (true);

CREATE POLICY "Public read testing host_event_guests" ON public.host_event_guests FOR SELECT USING (true);
CREATE POLICY "Public insert testing host_event_guests" ON public.host_event_guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testing host_event_guests" ON public.host_event_guests FOR UPDATE USING (true);

CREATE POLICY "Public read testing host_event_tasks" ON public.host_event_tasks FOR SELECT USING (true);
CREATE POLICY "Public insert testing host_event_tasks" ON public.host_event_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update testing host_event_tasks" ON public.host_event_tasks FOR UPDATE USING (true);
