import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Taps privileged role to parse financial matrices securely
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json({ error: 'Missing target booking identity parameter' }, { status: 400 });
  }

  try {
    // Query baseline metrics from both the operational bookings and payment layers
    const { data: booking, error: bError } = await supabase
      .from('event_bookings')
      .select('*, tenants(*)')
      .eq('id', bookingId)
      .single();

    const { data: matrix, error: mError } = await supabase
      .from('event_payments_matrix')
      .select('*')
      .eq('booking_id', bookingId)
      .single();

    if (bError || mError || !booking || !matrix) {
      throw new Error('Failed to resolve related financial records.');
    }

    // Build a structured text-based print ledger primitive mimicking a physical luxury stationary invoice layout
    const timestamp = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const invoiceContent = `
====================================================================
               NEXUS HERITAGE LUXURY PLANNING PLATCON
                    OFFICIAL TRANSACTIONAL RECEIPT
====================================================================
Issued On      : ${timestamp}
Booking Reference : ${bookingId.toUpperCase()}
Client Account    : ${booking.host_name}
Assigned Studio   : ${booking.tenants?.name || 'Technosight Premium Studios'}
Event Date Scheduled : ${booking.event_date}

--------------------------------------------------------------------
ITEMIZED STATEMENT OF SERVICES
--------------------------------------------------------------------
1. Complete Wedding Fine-Art Photography Coverage
2. Cinematic 4K Post-Production Master Teaser
3. Secure Object Storage Vaulting Allocation
4. Interactive Digital Invitation & RSVP Portals

--------------------------------------------------------------------
FINANCIAL LEDGER ACCOUNTS MATRIX
--------------------------------------------------------------------
TOTAL CONTRACT GROSS  : PKR ${(matrix.total_contract_amount || 250000).toLocaleString()}
PAID IN ADVANCE       : PKR ${(matrix.advance_paid || 150000).toLocaleString()}
--------------------------------------------------------------------
REMAINING PAYOFF BALANCE : PKR ${(matrix.total_contract_amount - matrix.advance_paid).toLocaleString()}
--------------------------------------------------------------------

Security Status: ${matrix.high_res_unlocked ? 'VAULT RELEASE AUTHORIZED' : 'ASSETS VAULT LOCKED PENDING PAYOFF'}

Thank you for planning your landmark heritage milestone with Nexus Pakistan.
This document serves as an authenticated system digital transactional proof.
====================================================================
    `.trim();

    // Return the response as a downloadable raw plain text attachment stream
    return new Response(invoiceContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename=Nexus_Invoice_${bookingId.substring(0, 8)}.txt`,
      },
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invoice processing engine crash' }, { status: 500 });
  }
}
