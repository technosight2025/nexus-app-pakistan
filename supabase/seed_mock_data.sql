-- Insert Dummy Organization
INSERT INTO public.organizations (id, name, slug, type)
VALUES ('11111111-1111-1111-1111-111111111111', 'Royal Palace', 'royal-palace', 'venue')
ON CONFLICT (id) DO NOTHING;

-- Insert Dummy Branch
INSERT INTO public.branches (id, organization_id, name, slug, address)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Lahore Branch', 'lahore-branch', 'Gulberg III, Lahore')
ON CONFLICT (id) DO NOTHING;

-- Insert Dummy Rooms
INSERT INTO public.rooms (id, branch_id, name, type, capacity)
VALUES 
  ('33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222222', 'Grand Ballroom', 'Banquet Hall', 800),
  ('33333333-3333-3333-3333-333333333332', '22222222-2222-2222-2222-222222222222', 'Crystal Marquee', 'Marquee', 1200)
ON CONFLICT (id) DO NOTHING;

-- Insert Dummy Event Types
INSERT INTO public.event_types (id, name, description)
VALUES 
  ('44444444-4444-4444-4444-444444444441', 'Barat', 'Traditional wedding ceremony'),
  ('44444444-4444-4444-4444-444444444442', 'Walima', 'Wedding reception'),
  ('44444444-4444-4444-4444-444444444443', 'Corporate', 'Corporate event')
ON CONFLICT (id) DO NOTHING;

-- Insert Dummy Events
INSERT INTO public.events (id, organization_id, branch_id, event_type_id, name, guest_count, status)
VALUES 
  ('55555555-5555-5555-5555-555555555551', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444441', 'Ahmed & Zara Barat', 600, 'confirmed'),
  ('55555555-5555-5555-5555-555555555552', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444443', 'TechFest 2026', 1000, 'reserved')
ON CONFLICT (id) DO NOTHING;

-- Insert Dummy Bookings
INSERT INTO public.bookings (id, event_id, room_id, booking_date, slot, status)
VALUES 
  ('66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555551', '33333333-3333-3333-3333-333333333331', '2026-12-05', 'Night', 'confirmed'),
  ('66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555552', '33333333-3333-3333-3333-333333333332', '2026-12-10', 'Day', 'reserved')
ON CONFLICT (id) DO NOTHING;
