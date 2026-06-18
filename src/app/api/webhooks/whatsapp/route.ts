import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We will initialize the Supabase Admin Client inside the handler
// to prevent Next.js build errors when the service role key is absent during static analysis.

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WhatsApp Webhook Verified!');
    return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is missing');
      return new NextResponse('Internal Error', { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Verify it is a WhatsApp business account payload
    if (payload.object === 'whatsapp_business_account') {
      const entry = payload.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;
      const messages = value?.messages;

      if (messages && messages.length > 0) {
        const message = messages[0];
        const sender_phone_number = message.from;
        let incoming_text = '';

        if (message.type === 'text') {
          incoming_text = message.text.body;
        } else {
          // Log fallback for media payloads or interactive buttons
          incoming_text = `[Received ${message.type} payload]`;
        }

        const whatsapp_message_id = message.id;

        // Perform RLS-bypassed lookup in contacts
        const { data: contacts, error: contactError } = await supabaseAdmin
          .from('contacts')
          .select('id, organization_id')
          .eq('phone', sender_phone_number)
          .limit(1);

        if (contactError) {
          console.error('Error fetching contact for webhook:', contactError);
          return new NextResponse('OK', { status: 200 }); // Return 200 to prevent Meta retry flood
        }

        if (contacts && contacts.length > 0) {
          const contact = contacts[0];
          
          // Check if conversation thread already exists
          let { data: conversations, error: convError } = await supabaseAdmin
            .from('conversations')
            .select('id')
            .eq('contact_id', contact.id)
            .limit(1);

          let conversationId: string;

          if (convError || !conversations || conversations.length === 0) {
            // Create a new active thread
            const { data: newConv, error: createConvError } = await supabaseAdmin
              .from('conversations')
              .insert({
                contact_id: contact.id,
                organization_id: contact.organization_id,
                title: `WhatsApp: ${sender_phone_number}`
              })
              .select('id')
              .single();

            if (createConvError || !newConv) {
              console.error('Error creating conversation:', createConvError);
              return new NextResponse('OK', { status: 200 });
            }
            conversationId = newConv.id;
          } else {
            conversationId = conversations[0].id;
          }

          // Insert the incoming message
          const { error: insertMessageError } = await supabaseAdmin
            .from('messages')
            .insert({
              conversation_id: conversationId,
              text: incoming_text,
              sender_id: null, // Null indicates external client incoming payload
              whatsapp_message_id: whatsapp_message_id,
              is_verified_proof: true,
              delivery_status: 'delivered'
            });

          if (insertMessageError) {
            console.error('Error inserting webhook message:', insertMessageError);
          } else {
            console.log(`Ingested incoming message from ${sender_phone_number}`);
          }
        } else {
          console.log(`Webhook received but sender phone ${sender_phone_number} not matched in contacts.`);
        }
      }
    }

    return new NextResponse('OK', { status: 200 });

  } catch (error) {
    console.error('Error processing WhatsApp webhook payload:', error);
    // Crucial: Always return 200 status code to Meta to prevent retry floods
    return new NextResponse('OK', { status: 200 });
  }
}
