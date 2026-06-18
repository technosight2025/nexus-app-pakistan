-- 20260607000015_tasks_table.sql

CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL, -- 'Hall Setup', 'Catering & Menu', 'Logistics & Valet'
  title TEXT NOT NULL,
  due_time TEXT, -- e.g., '3 Hours Prior', '14:00'
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add updated_at trigger
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policy
CREATE POLICY "Tenant Isolation Policy for tasks" ON public.tasks FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

-- Public testing policies
CREATE POLICY "Public read access for tasks (Testing)" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Public insert access for tasks (Testing)" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for tasks (Testing)" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Public delete access for tasks (Testing)" ON public.tasks FOR DELETE USING (true);
