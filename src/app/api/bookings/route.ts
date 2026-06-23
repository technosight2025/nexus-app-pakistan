import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Uses high-authority key to handle onboarding row setup securely
);

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { hostName, email, eventDate, venueId, totalContractAmount, hostPhone } = payload;

    if (!hostName || !email || !eventDate) {
      return NextResponse.json({ error: 'Missing baseline onboarding parameters.' }, { status: 400 });
    }

    // 1. Insert core booking node parameters
    const { data: booking, error: bError } = await supabase
      .from('event_bookings')
      .insert({
        host_name: hostName,
        host_phone: hostPhone || '00000000000',
        email: email, // Preserving in case the table was manually updated
        total_amount: totalContractAmount || 0, // Adding the required total_amount column
        event_date: eventDate,
        venue_id: venueId || null,
        order_status: 'pending_venue' // Correcting to match the DB CHECK constraint
      })
      .select()
      .single();

    if (bError || !booking) {
      throw new Error(`Booking insert fault: ${bError?.message}`);
    }

    // 2. Pair corresponding financial statement ledger structure rows automatically
    const contractGross = totalContractAmount || 300000;
    const { error: mError } = await supabase
      .from('event_payments_matrix')
      .insert({
        booking_id: booking.id,
        pre_wedding_total: contractGross, // Aligned with the nexus_enterprise schema
        pre_wedding_paid: 0,
        post_wedding_total: 0,
        post_wedding_paid: 0,
        high_res_unlocked: false
      });

    if (mError) {
      // Clean up orphaned records to guarantee data consistency
      await supabase.from('event_bookings').delete().eq('id', booking.id);
      throw new Error(`Ledger entry provision crash: ${mError.message}`);
    }

    return NextResponse.json({ id: booking.id }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Onboarding system fault' }, { status: 500 });
  }
}
