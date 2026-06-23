-- 1. پے منٹ اور میڈیا ہینڈلنگ ٹیبل
CREATE TABLE IF NOT EXISTS event_payments_matrix (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL,
    pre_wedding_total DECIMAL(12, 2) NOT NULL,
    pre_wedding_paid DECIMAL(12, 2) DEFAULT 0.00,
    pre_wedding_status TEXT DEFAULT 'pending' CHECK (pre_wedding_status IN ('pending', 'partial', 'paid')),
    post_wedding_total DECIMAL(12, 2) NOT NULL,
    post_wedding_paid DECIMAL(12, 2) DEFAULT 0.00,
    post_wedding_status TEXT DEFAULT 'pending' CHECK (post_wedding_status IN ('pending', 'partial', 'paid')),
    high_res_unlocked BOOLEAN DEFAULT FALSE
);

-- 2. جدید مواصلاتی نظام (Live Chat Messages Table)
CREATE TABLE IF NOT EXISTS nexus_live_communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL,
    sender_type TEXT CHECK (sender_type IN ('host', 'photographer', 'admin')),
    sender_name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ریئل ٹائم نیٹ ورک کو دونوں ٹیبلز کے لیے آن کریں
DO $$
BEGIN
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
