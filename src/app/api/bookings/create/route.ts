import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkDateConflict } from '@/lib/bookings/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenant_id, host_id, venue_id, event_date, total_amount } = body;

    // 1. ڈیٹ کانفلیکٹ ویلیڈیشن رن کریں
    const { hasConflict, error } = await checkDateConflict({
      venueId: venue_id,
      eventDate: event_date,
    });

    if (error) throw new Error(error);

    if (hasConflict) {
      return NextResponse.json(
        { success: false, error: 'DATE_CLASH', message: 'یہ تاریخ اس وینیو پر پہلے سے بک ہے!' },
        { status: 409 } // Conflict Status Code
      );
    }

    // 2. اگر کوئی تصادم نہیں ہے، تو بکنگ انسرٹ کریں
    const supabase = await createClient();
    const { data: newBooking, error: dbError } = await supabase
      .from('event_bookings')
      .insert([
        {
          tenant_id,
          host_id,
          venue_id,
          event_date,
          total_amount,
          order_status: 'pending_venue',
        },
      ])
      .select()
      .single();

    if (dbError) throw new Error(dbError.message);

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
