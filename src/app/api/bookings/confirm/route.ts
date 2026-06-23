import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWhatsAppWelcome } from '@/lib/whatsapp/send-welcome'; // جو ہم نے پہلے بنایا تھا

export async function POST(request: Request) {
  try {
    const { booking_id, venue_name, host_phone, host_name, total_amount } = await request.json();

    const supabase = await createClient();

    // 1. ڈیٹا بیس میں بکنگ اسٹیٹس 'confirmed' کریں
    const { data: booking, error: dbError } = await supabase
      .from('event_bookings')
      .update({ order_status: 'confirmed' })
      .eq('id', booking_id)
      .select()
      .single();

    if (dbError) throw new Error(dbError.message);

    // 2. ہوسٹ کو واٹس ایپ پر آرڈر کنفرمیشن میسج بھیجیں
    // یہاں ہم میٹا پر رجسٹرڈ 'nexus_order_confirmation' ٹیمپلیٹ استعمال کریں گے
    const VERSION = 'v20.0';
    const url = `https://graph.facebook.com/${VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const whatsappBody = {
      messaging_product: 'whatsapp',
      to: host_phone.replace(/[^0-9]/g, ''),
      type: 'template',
      template: {
        name: 'nexus_order_confirmation', // آپ کا میٹا ٹیمپلیٹ
        language: { code: 'ur' }, // اردو یا انگلش مارکیٹ کے لیے
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: host_name },      // {{1}} ہوسٹ کا نام
              { type: 'text', text: venue_name },     // {{2}} وینیو کا نام
              { type: 'text', text: `Rs. ${total_amount}` } // {{3}} کل رقم
            ],
          },
        ],
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_SYSTEM_USER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(whatsappBody),
    });

    return NextResponse.json({
      success: true,
      booking,
      whatsapp_notified: response.ok
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
