/**
 * sendWhatsAppAlert
 * -----------------
 * Constructs and dispatches a secure, localized WhatsApp template message
 * to the Meta Cloud API (v20.0) using an approved WABA template.
 *
 * This is the generic, production-grade alert dispatcher. For a specific
 * welcome-onboarding message, use `@/lib/whatsapp/send-welcome.ts` instead.
 *
 * Template parameters are injected in order: {{1}}, {{2}}, {{3}}, etc.
 *
 * Environment variables required (set in .env.local):
 *   WHATSAPP_PHONE_NUMBER_ID — Meta Business Phone Number ID
 *   WHATSAPP_SYSTEM_USER_TOKEN — Long-lived System User Token (never expires)
 *
 * @param recipientPhone  - E.164 or local Pakistani format (+92xxx / 03xx)
 * @param templateName    - Exact name of the approved WABA template
 * @param parameters      - Ordered array of string values for template variables
 * @returns               - Raw fetch Response for status inspection by the caller
 */
export async function sendWhatsAppAlert(
  recipientPhone: string,
  templateName: string,
  parameters: string[]
): Promise<Response> {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_USER_TOKEN
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
  const META_API_VERSION = 'v20.0'

  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    const msg = '[sendWhatsAppAlert] Missing WHATSAPP_SYSTEM_USER_TOKEN or WHATSAPP_PHONE_NUMBER_ID env variables.'
    console.error(msg)
    // Return a synthetic 500 Response so callers can inspect .ok
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!recipientPhone || !templateName) {
    const msg = '[sendWhatsAppAlert] recipientPhone and templateName are required.'
    console.error(msg)
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Normalize phone number to E.164 (strip spaces, dashes; handle 0300 → 92300)
  const normalized = normalizePhone(recipientPhone)

  const endpoint = `https://graph.facebook.com/${META_API_VERSION}/${PHONE_NUMBER_ID}/messages`

  const payload = {
    messaging_product: 'whatsapp',
    to: normalized,
    type: 'template',
    template: {
      name: templateName,
      language: {
        // Pakistani market: use 'en' for English templates (most approved templates)
        // Switch to 'ur' for Urdu-specific approved templates
        code: 'en',
      },
      components: [
        {
          type: 'body',
          parameters: parameters.map((text) => ({
            type: 'text' as const,
            text,
          })),
        },
      ],
    },
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: 'Unknown Meta API error' }))
      console.error(
        `[sendWhatsAppAlert] Meta API rejected request for template "${templateName}":`,
        errorBody
      )
    }

    return response
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[sendWhatsAppAlert] Network or runtime error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

/**
 * Normalizes a Pakistani phone number to E.164 format required by Meta API.
 * Examples:
 *   '+92 300 1234567' → '923001234567'
 *   '0300-1234567'    → '923001234567'
 *   '923001234567'    → '923001234567' (already valid)
 */
function normalizePhone(phone: string): string {
  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, '')

  // Handle local Pakistani format starting with 0 (e.g. 03001234567)
  if (digits.startsWith('0') && digits.length === 11) {
    digits = '92' + digits.slice(1)
  }

  return digits
}
