import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking mapping token' }, { status: 400 });
  }

  try {
    const payload = await request.json();
    
    // Updates the active row column identifiers fields dynamically
    const { data, error } = await supabase
      .from('event_bookings')
      .update(payload)
      .eq('id', bookingId)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, updated: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Linkage update fault' }, { status: 500 });
  }
}
