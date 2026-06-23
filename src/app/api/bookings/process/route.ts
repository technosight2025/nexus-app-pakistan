import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Antigravity Cloud environment integration
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypass RLS only for system process
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, action, tenantId } = body;

    if (!bookingId || !action) {
      return NextResponse.json({ error: 'Missing core process parameters' }, { status: 400 });
    }

    // STEP 1: Fetch booking lifecycle data
    const { data: booking, error: fetchError } = await supabase
      .from('event_bookings')
      .select('*, venues(*)')
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Event booking node not found in cluster' }, { status: 404 });
    }

    // STEP 2: Process Action Router
    if (action === 'VENUE_APPROVE') {
      // 1. Update Booking Lifecycle State
      await supabase
        .from('event_bookings')
        .update({ order_status: 'confirmed' })
        .eq('id', bookingId);

      // 2. Trigger Meta WABA Pipeline (WhatsApp Notification Script)
      const portalLink = `${process.env.NEXT_PUBLIC_SITE_URL}/portal/${bookingId}`;
      
      const whatsappPayload = {
        messaging_product: "whatsapp",
        to: "+923001234567", // Host Number (Shafiq Sahib)
        type: "template",
        template: {
          name: "nexus_premium_booking_confirmation",
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: booking.venues?.name || "Premium Venue" },
                { type: "text", text: booking.event_date },
                { type: "text", text: portalLink }
              ]
            }
          ]
        }
      };

      const metaResponse = await fetch(
        `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_SYSTEM_USER_TOKEN}`,
            'Content-Type': 'application/json' // Fixed typo from 'application/center.json'
          },
          body: JSON.stringify(whatsappPayload)
        }
      );

      return NextResponse.json({ 
        status: 'PROCESS_SUCCESS', 
        message: 'Venue status confirmed, WhatsApp portal payload fired to Host phone.' 
      });
    }

    if (action === 'FINALIZE_PAYOFF') {
      // 1. Release Media Assets
      await supabase
        .from('event_payments_matrix')
        .update({ high_res_unlocked: true, post_wedding_status: 'paid' })
        .eq('booking_id', bookingId);

      return NextResponse.json({ 
        status: 'PAYOFF_SUCCESS', 
        message: 'Financial ledger cleared. Asset Vault unlocked for Client Workspace.' 
      });
    }

    return NextResponse.json({ message: 'Process idle. No action targeted.' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
