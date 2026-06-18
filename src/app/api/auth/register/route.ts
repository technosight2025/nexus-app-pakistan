import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { businessName, email, phone, password, category } = await req.json()

    // Create the vendor in the vendors table
    const { data, error } = await supabase
      .from("vendors")
      .insert({
        business_name: businessName,
        email,
        phone,
        category: category || 'rentals',
        // In production, NEVER store plain passwords. Use Supabase Auth.
        // For MVP, we are mocking the identity flow.
        password_mock: password 
      })
      .select()
      .single()

    if (error) throw error

    // Set a session cookie for the vendor
    const cookieStore = await cookies()
    cookieStore.set('nexus_vendor_id', data.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return NextResponse.json({ success: true, vendorId: data.id })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
