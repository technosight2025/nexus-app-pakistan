import { NextResponse } from 'next/server';
import { sendWhatsAppWelcome } from '@/lib/whatsapp/send-welcome';
// فرض کریں آپ کا سپابیس سرور کلائنٹ یہاں سیٹ ہے
import { createClient } from '@/lib/supabase/server'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone_number, contact_type, tenant_id, tenant_name } = body;

    if (!name || !phone_number || !tenant_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. سپابیس ڈیٹا بیس میں نیا کانٹیکٹ انسرٹ کریں
    const { data: contact, error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          tenant_id,
          name,
          phone_number,
          contact_type,
          status: 'active',
        },
      ])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database Error: ${dbError.message}`);
    }

    // 2. بیک گراؤنڈ میں واٹس ایپ پائپ لائن کو فائر کریں
    // اس کو await نہ بھی کریں تو یہ بیک گراؤنڈ میں چلتا رہے گا تاکہ UI فریز نہ ہو
    const whatsappResult = await sendWhatsAppWelcome({
      phoneNumber: phone_number,
      contactName: name,
      businessName: tenant_name || 'Nexus Ecosystem',
    });

    return NextResponse.json({
      success: true,
      contact,
      whatsapp_delivered: whatsappResult.success,
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
