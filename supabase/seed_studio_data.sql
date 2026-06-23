-- 1. ٹیسٹ وینیو انسرٹ کریں
INSERT INTO venues (id, tenant_id, name, location, capacity, contact_phone)
VALUES (
    '88888888-8888-8888-8888-888888888888',
    '77777777-7777-7777-7777-777777777777',
    'Khyber City Mall Venue, Mardan',
    'Main Charsadda Road, Mardan',
    500,
    '+923001234567'
);

-- 2. ٹیسٹ ایونٹ بکنگ انسرٹ کریں (Host & Venue Junction)
INSERT INTO event_bookings (id, tenant_id, host_id, venue_id, event_date, total_amount, order_status)
VALUES (
    '99999999-9999-9999-9999-999999999999',
    '77777777-7777-7777-7777-777777777777',
    '11111111-1111-1111-1111-111111111111', -- Host ID (Muhammad Shafiq)
    '88888888-8888-8888-8888-888888888888', -- Venue ID
    '2026-06-25',
    350000.00,
    'pending_venue' -- ٹیسٹ شروع کرنے کے لیے اسٹیٹس پینڈنگ رکھا ہے
);

-- 3. اسٹوڈیو پے منٹ میٹرکس انسرٹ کریں (Pre/Post-Wedding Matrix)
INSERT INTO event_payments_matrix (booking_id, pre_wedding_total, pre_wedding_paid, pre_wedding_status, post_wedding_total, post_wedding_paid, post_wedding_status, high_res_unlocked)
VALUES (
    '99999999-9999-9999-9999-999999999999',
    100000.00,
    100000.00,
    'paid',
    150000.00,
    50000.00,
    'partial',
    FALSE -- ٹیسٹ لاک ایکٹیو ہے
);
