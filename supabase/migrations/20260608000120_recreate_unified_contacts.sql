-- 20260608000120_recreate_unified_contacts.sql
-- Drop the existing contacts table and its dependencies (like contact_events foreign keys) if any
DROP TABLE IF EXISTS public.contacts CASCADE;

-- Unified Contacts Table
CREATE TABLE public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID NOT NULL, -- ملٹی ٹیننسی کے لیے (ایونٹ مینیجر آئی ڈی)
    name TEXT NOT NULL,
    email TEXT,
    phone_number TEXT NOT NULL, -- واٹس ایپ انٹیگریشن کے لیے لازمی
    contact_type TEXT CHECK (contact_type IN ('client_b2c', 'corporate_b2b', 'vendor', 'company')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    metadata JSONB DEFAULT '{}'::jsonb, -- اضافی ڈیٹا جیسے وینڈر کی کیٹیگری یا کمپنی کی ڈیٹیلز
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Update Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at 
BEFORE UPDATE ON public.contacts 
FOR EACH ROW 
EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security (RLS) چالو کریں تاکہ ایک ٹیننٹ دوسرے کا ڈیٹا نہ دیکھ سکے
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants can only access their own contacts" 
ON public.contacts 
FOR ALL 
USING (tenant_id = auth.uid());
