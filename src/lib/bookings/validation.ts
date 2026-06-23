import { createClient } from '@/lib/supabase/server';

interface ValidationPayload {
  venueId: string;
  eventDate: string; // Format: YYYY-MM-DD
}

export async function checkDateConflict({ venueId, eventDate }: ValidationPayload) {
  const supabase = await createClient();

  // وینیو اور تاریخ کے حساب سے فعال بکنگز چیک کریں
  const { data, error } = await supabase
    .from('event_bookings')
    .select('id, order_status')
    .eq('venue_id', venueId)
    .eq('event_date', eventDate)
    .in('order_status', ['confirmed', 'pending_venue']); // کینسل شدہ بکنگز کو چھوڑ دیں

  if (error) {
    console.error('Validation Error:', error.message);
    return { hasConflict: true, error: error.message };
  }

  // اگر کوئی بھی ریکارڈ مل گیا، تو اس کا مطلب ہے کہ تاریخ پہلے سے بک ہے
  return { hasConflict: data.length > 0 };
}
