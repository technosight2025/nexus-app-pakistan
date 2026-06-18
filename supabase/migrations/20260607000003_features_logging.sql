-- 20260607000003_features_logging.sql

-- 1. Feature Flags
CREATE TABLE public.feature_flags (
  id TEXT PRIMARY KEY, -- e.g., ai_assistant, displays, memories, beta_features
  name TEXT NOT NULL,
  default_value BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Feature Flag Overrides
CREATE TABLE public.feature_flag_overrides (
  flag_id TEXT REFERENCES public.feature_flags(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  value BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (flag_id, organization_id)
);

-- 3. Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- system, bookings, payments, messages, tasks
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Audit Logs
CREATE TABLE public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add triggers for updated_at
CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON public.feature_flags FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_feature_flag_overrides_updated_at BEFORE UPDATE ON public.feature_flag_overrides FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flag_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view feature flags" ON public.feature_flags FOR SELECT TO authenticated USING (true);

-- Tenant Isolation Policies
CREATE POLICY "Tenant Isolation Policy for feature_flag_overrides" ON public.feature_flag_overrides FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

CREATE POLICY "Tenant Isolation Policy for notifications" ON public.notifications FOR ALL USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()) AND
  user_id = auth.uid()
);

CREATE POLICY "Tenant Isolation Policy for audit_logs" ON public.audit_logs FOR SELECT USING (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);
-- Note: Audit logs should only be insertable, usually done via service role or restricted insert policies.
CREATE POLICY "Tenant Isolation Policy for inserting audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (
  organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);
