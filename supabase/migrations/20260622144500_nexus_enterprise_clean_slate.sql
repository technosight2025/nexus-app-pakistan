-- ====================================================================
-- NEXUS ENTERPRISE DATABASE MIGRATION SCRIPT (CLEAN SLATE PRODUCTION)
-- ====================================================================

-- Enable UUID Extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clean Slate: Drop existing tables if they exist to apply the new schema
DROP TABLE IF EXISTS nexus_live_communications CASCADE;
DROP TABLE IF EXISTS event_payments_matrix CASCADE;
DROP TABLE IF EXISTS event_bookings CASCADE;
DROP TABLE IF EXISTS venues CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;

-- 1. TENANTS TABLE (B2B SaaS Business Partitioning)
CREATE TABLE tenants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_name TEXT NOT NULL,
    tenant_type TEXT NOT NULL CHECK (tenant_type IN ('studio', 'venue', 'event_manager', 'restaurant')),
    owner_email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. VENUES SUBSYSTEM TABLE
CREATE TABLE venues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    capacity INT NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. MASTER EVENT BOOKINGS (The Central Operational Nexus)
CREATE TABLE event_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
    venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
    host_name TEXT NOT NULL,
    host_phone TEXT NOT NULL, -- Core identifier for Meta WABA Engine
    event_date DATE NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    order_status TEXT DEFAULT 'pending_venue' CHECK (order_status IN ('pending_venue', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unique_venue_date UNIQUE (venue_id, event_date) -- Smart Conflict Check Guardrail
);

-- 4. STUDIO LEDGER & ASSET LOCK MATRIX
CREATE TABLE event_payments_matrix (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES event_bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
    pre_wedding_total DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    pre_wedding_paid DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    pre_wedding_status TEXT DEFAULT 'pending' CHECK (pre_wedding_status IN ('pending', 'partial', 'paid')),
    post_wedding_total DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    post_wedding_paid DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    post_wedding_status TEXT DEFAULT 'pending' CHECK (post_wedding_status IN ('pending', 'partial', 'paid')),
    high_res_unlocked BOOLEAN DEFAULT FALSE -- Dynamic asset locker switch
);

-- 5. REAL-TIME MULTI-PORTAL COMMUNICATION FEEDS
CREATE TABLE nexus_live_communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES event_bookings(id) ON DELETE CASCADE NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('host', 'studio_admin', 'venue_admin')),
    sender_name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ====================================================================
-- REALTIME REPLICATION ENABLEMENT
-- ====================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'event_bookings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE event_bookings;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'event_payments_matrix'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE event_payments_matrix;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'nexus_live_communications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE nexus_live_communications;
  END IF;
END $$;
