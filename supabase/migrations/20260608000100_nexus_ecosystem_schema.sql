-- SUPABASE MIGRATION: NEXUS Relational Ecosystem Schema

-- ==========================================
-- 1. CORE USERS & PERSONA AUTHENTICATION
-- ==========================================
CREATE TABLE public.nexus_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone_number TEXT UNIQUE CHECK (phone_number ~ '^\+?[1-9]\d{1,14}$'), -- E.164 phone verification
  active_role VARCHAR(20) NOT NULL CHECK (active_role IN ('Host', 'Vendor', 'Artisan')),
  account_status VARCHAR(30) NOT NULL DEFAULT 'Pending OTP' CHECK (account_status IN ('Pending OTP', 'Vetted Profile', 'Active Showcase')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==========================================
-- 2. PERSONA-SPECIFIC PROFILE EXTENSIONS
-- ==========================================

-- A. Host Profiles (B2C Planners)
CREATE TABLE public.host_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.nexus_users(id) ON DELETE CASCADE UNIQUE,
  planning_sub_role VARCHAR(30) NOT NULL CHECK (planning_sub_role IN ('Bride/Groom', 'Family Elder', 'Professional Coordinator')),
  target_celebration_month VARCHAR(20) NOT NULL,
  vault_master_key_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- B. Vendor Profiles (B2B Businesses)
CREATE TABLE public.vendor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.nexus_users(id) ON DELETE CASCADE UNIQUE,
  business_category TEXT NOT NULL,
  national_tax_number TEXT UNIQUE,
  vetted_status_badge BOOLEAN DEFAULT false NOT NULL,
  sub_venue_sub_locations JSONB DEFAULT '[]'::jsonb NOT NULL,
  one_dish_compliant BOOLEAN DEFAULT true NOT NULL,
  curfew_compliant BOOLEAN DEFAULT true NOT NULL,
  bank_iban TEXT,
  bank_pkr_account TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- C. Artisan Profiles (Bespoke Creators)
CREATE TABLE public.artisan_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.nexus_users(id) ON DELETE CASCADE UNIQUE,
  heritage_specialty TEXT NOT NULL,
  editorial_lookbook_paths TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  base_booking_rate DECIMAL(12, 2) NOT NULL CHECK (base_booking_rate >= 0),
  heritage_quality_pledge BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==========================================
-- 3. THE MULTI-DAY "SHADI CALENDAR" BOOKINGS
-- ==========================================
CREATE TABLE public.shadi_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  host_profile_id UUID NOT NULL REFERENCES public.host_profiles(id) ON DELETE CASCADE,
  booking_day_type VARCHAR(20) NOT NULL CHECK (booking_day_type IN ('Mehndi/Mayun', 'Barat', 'Valima')),
  scheduled_date DATE NOT NULL,
  chronological_sequence_num INTEGER NOT NULL CHECK (chronological_sequence_num IN (1, 2, 3)),
  assigned_sub_venue TEXT NOT NULL,
  booking_approval_state VARCHAR(30) NOT NULL DEFAULT 'Draft Booking' CHECK (booking_approval_state IN ('Draft Booking', 'Escrow Received', 'Approved by Venue', 'Celebration Complete')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==========================================
-- 4. CATERING & REGULATORY POLICY AUDIT LOGS
-- ==========================================
CREATE TABLE public.catering_policy_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shadi_booking_id UUID NOT NULL REFERENCES public.shadi_bookings(id) ON DELETE CASCADE UNIQUE,
  catering_main_course_count INTEGER NOT NULL DEFAULT 1 CHECK (catering_main_course_count >= 1),
  one_dish_compliance_flag BOOLEAN GENERATED ALWAYS AS (catering_main_course_count = 1) STORED,
  curfew_buffer_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==========================================
-- 5. FINANCIAL SPLIT-BILLING & MILESTONE INVOICING
-- ==========================================
CREATE TABLE public.split_billing_ledgers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.shadi_bookings(id) ON DELETE CASCADE UNIQUE,
  total_booking_amount DECIMAL(12, 2) NOT NULL CHECK (total_booking_amount >= 0),
  family_splitting_percentage DECIMAL(5, 2) NOT NULL DEFAULT 50.00 CHECK (family_splitting_percentage BETWEEN 0.00 AND 100.00),
  lock_in_milestone_pct DECIMAL(5, 2) NOT NULL DEFAULT 10.00,
  lock_in_milestone_cleared BOOLEAN DEFAULT false NOT NULL,
  advance_escrow_milestone_pct DECIMAL(5, 2) NOT NULL DEFAULT 50.00,
  advance_escrow_milestone_cleared BOOLEAN DEFAULT false NOT NULL,
  final_settlement_milestone_pct DECIMAL(5, 2) NOT NULL DEFAULT 40.00,
  final_settlement_milestone_cleared BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==========================================
-- 6. HERITAGE HUB & VAULT DOCUMENT INDEXES
-- ==========================================
CREATE TABLE public.vault_documents_index (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_profile_id UUID NOT NULL REFERENCES public.host_profiles(id) ON DELETE CASCADE,
  vault_target_category VARCHAR(30) NOT NULL CHECK (vault_target_category IN ('Nexus Legacy Vault', 'Family Health Vault')),
  encrypted_document_uri TEXT NOT NULL,
  vault_aesthetics_state JSONB DEFAULT '{"border_color": "#C5A880", "icon": "💝"}'::jsonb NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ==========================================
-- TIMESTAMP TRIGGER ATTACHMENTS
-- ==========================================
-- Note: Reuses the existing update_updated_at_column() trigger function defined in public namespace.

CREATE TRIGGER update_nexus_users_updated_at 
  BEFORE UPDATE ON public.nexus_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_host_profiles_updated_at 
  BEFORE UPDATE ON public.host_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_profiles_updated_at 
  BEFORE UPDATE ON public.vendor_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artisan_profiles_updated_at 
  BEFORE UPDATE ON public.artisan_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shadi_bookings_updated_at 
  BEFORE UPDATE ON public.shadi_bookings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_split_billing_ledgers_updated_at 
  BEFORE UPDATE ON public.split_billing_ledgers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vault_documents_index_updated_at 
  BEFORE UPDATE ON public.vault_documents_index 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.nexus_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artisan_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shadi_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catering_policy_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.split_billing_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_documents_index ENABLE ROW LEVEL SECURITY;

-- 1. nexus_users policies
CREATE POLICY "Users can view own nexus_user row" ON public.nexus_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own nexus_user row" ON public.nexus_users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own nexus_user row" ON public.nexus_users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. host_profiles policies
CREATE POLICY "Hosts can view own profile" ON public.host_profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Hosts can manage own profile" ON public.host_profiles
  FOR ALL USING (user_id = auth.uid());

-- 3. vendor_profiles policies
CREATE POLICY "Anyone can view active vendor showcases" ON public.vendor_profiles
  FOR SELECT USING (true);

CREATE POLICY "Vendors can manage own profile" ON public.vendor_profiles
  FOR ALL USING (user_id = auth.uid());

-- 4. artisan_profiles policies
CREATE POLICY "Anyone can view artisan listings" ON public.artisan_profiles
  FOR SELECT USING (true);

CREATE POLICY "Artisans can manage own profile" ON public.artisan_profiles
  FOR ALL USING (user_id = auth.uid());

-- 5. shadi_bookings policies
CREATE POLICY "Hosts can manage their own bookings" ON public.shadi_bookings
  FOR ALL USING (
    host_profile_id IN (
      SELECT id FROM public.host_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can select assigned bookings" ON public.shadi_bookings
  FOR SELECT USING (true);

-- 6. catering_policy_audit_logs policies
CREATE POLICY "Hosts can view catering audits for their bookings" ON public.catering_policy_audit_logs
  FOR SELECT USING (
    shadi_booking_id IN (
      SELECT b.id FROM public.shadi_bookings b
      JOIN public.host_profiles h ON b.host_profile_id = h.id
      WHERE h.user_id = auth.uid()
    )
  );

-- 7. split_billing_ledgers policies
CREATE POLICY "Hosts can view splitting invoices for their bookings" ON public.split_billing_ledgers
  FOR SELECT USING (
    booking_id IN (
      SELECT b.id FROM public.shadi_bookings b
      JOIN public.host_profiles h ON b.host_profile_id = h.id
      WHERE h.user_id = auth.uid()
    )
  );

CREATE POLICY "Hosts can update split ledger details" ON public.split_billing_ledgers
  FOR UPDATE USING (
    booking_id IN (
      SELECT b.id FROM public.shadi_bookings b
      JOIN public.host_profiles h ON b.host_profile_id = h.id
      WHERE h.user_id = auth.uid()
    )
  );

-- 8. vault_documents_index policies
CREATE POLICY "Hosts can manage legacy and health documents" ON public.vault_documents_index
  FOR ALL USING (
    host_profile_id IN (
      SELECT id FROM public.host_profiles WHERE user_id = auth.uid()
    )
  );
