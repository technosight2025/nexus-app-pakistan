interface WelcomeMessagePayload {
  phoneNumber: string;
  contactName: string;
  businessName: string; // آپ کی کمپنی یا ٹیننٹ کا نام
}

export async function sendWhatsAppWelcome({
  phoneNumber,
  contactName,
  businessName,
}: WelcomeMessagePayload) {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_USER_TOKEN;
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const VERSION = 'v20.0'; // آپ کی میٹا API ورژن لائن

  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error('WhatsApp configuration env variables are missing.');
    return { success: false, error: 'Config missing' };
  }

  // پاکستانی فارمیٹ کو درست کرنا (+92 یا 0300 کو انٹرنیشنل فارمیٹ میں بدلنا)
  const formattedPhone = phoneNumber.replace(/[^0-9]/g, '');

  const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;

  const body = {
    messaging_product: 'whatsapp',
    to: formattedPhone,
    type: 'template',
    template: {
      name: 'nexus_welcome_onboarding', // میٹا ڈیش بورڈ پر رجسٹرڈ ٹیمپلیٹ کا نام
      language: {
        code: 'ur', // خالص اردو مارکیٹ کے لیے اردو ٹیمپلیٹ (یا 'en' اگر انگلش رکھنا ہو)
      },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: contactName },    // ٹیمپلیٹ کا پہلا ویری ایبل {{1}}
            { type: 'text', text: businessName },   // دوسرا ویری ایبل {{2}}
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to send WhatsApp message');
    }

    return { success: true, messageId: data.messages[0]?.id };
  } catch (error: any) {
    console.error('WhatsApp Pipeline Error:', error.message);
    return { success: false, error: error.message };
  }
}
