-- 20260607000008_workforce_dependencies.sql

-- 1. Teams
CREATE TABLE public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE, -- nullable for org-wide teams
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., 'Photography', 'Decor', 'Waitstaff', 'Security'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Team Members
CREATE TABLE public.team_members (
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'Member', -- e.g., 'Leader', 'Member'
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (team_id, user_id)
);

-- 3. Module Dependencies
CREATE TABLE public.module_dependencies (
  module_id TEXT REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  depends_on_module_id TEXT REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (module_id, depends_on_module_id)
);

-- Add triggers for updated_at
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_dependencies ENABLE ROW LEVEL SECURITY;

-- Global Policy for Module Dependencies
CREATE POLICY "Anyone can view module dependencies" ON public.module_dependencies FOR SELECT TO authenticated USING (true);

-- Tenant Isolation Policies
CREATE POLICY "Tenant Isolation Policy for teams" ON public.teams FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

CREATE POLICY "Tenant Isolation Policy for team_members" ON public.team_members FOR ALL USING (
  team_id IN (SELECT id FROM public.teams WHERE organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()))
);
