-- ====================================================================
-- NEXUS ENTERPRISE SEED SCRIPT (PRODUCTION BASELINE)
-- ====================================================================

-- 1. Insert Master Tenant Partition
INSERT INTO tenants (id, business_name, tenant_type, owner_email)
VALUES (
    '77777777-7777-7777-7777-777777777777', 
    'Technosight Premium Studios', 
    'studio', 
    'shafiq@technosight.pk'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Physical Venue Node 
INSERT INTO venues (id, tenant_id, name, location, capacity, base_price, is_active)
VALUES (
    '88888888-8888-8888-8888-888888888888', 
    '77777777-7777-7777-7777-777777777777', 
    'Khyber City Mall Venue', 
    'Main Charsadda Road, Mardan, Pakistan', 
    500, 
    250000.00, 
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert Central Operational Booking (Targeting June 25, 2026)
INSERT INTO event_bookings (id, tenant_id, venue_id, host_name, host_phone, event_date, total_amount, order_status)
VALUES (
    '99999999-9999-9999-9999-999999999999', 
    '77777777-7777-7777-7777-777777777777', 
    '88888888-8888-8888-8888-888888888888', 
    'Muhammad Shafiq', 
    '+923001234567', 
    '2026-06-25', 
    350000.00, 
    'pending_venue'
) ON CONFLICT (id) DO NOTHING;

-- 4. Insert Blocked/Watermarked Payment Ledger Matrix
INSERT INTO event_payments_matrix (booking_id, pre_wedding_total, pre_wedding_paid, pre_wedding_status, post_wedding_total, post_wedding_paid, post_wedding_status, high_res_unlocked)
VALUES (
    '99999999-9999-9999-9999-999999999999', 
    100000.00, 
    100000.00, 
    'paid', 
    150000.00, 
    50000.00, 
    'partial', 
    FALSE
) ON CONFLICT (booking_id) DO NOTHING;
