import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Helper to convert Clerk's "user_xyz" into a deterministic Postgres UUID
function clerkToUuid(clerkId: string) {
  const hash = crypto.createHash('md5').update(clerkId).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { clerkId, businessName, category, phone, email } = body

    if (!clerkId || !businessName || !category) {
      console.log("VENDOR SYNC FAILED - Missing fields:", { clerkId, businessName, category })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate the deterministic UUID for this Clerk User
    const vendorUuid = clerkToUuid(clerkId);

    // Insert the new vendor into Supabase
    const { data, error } = await supabase
      .from("vendors")
      .upsert({
        id: vendorUuid,
        business_name: businessName,
        category: category,
        phone: phone,
        email: email,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Set the MVP compatibility cookie with the UUID so existing Supabase logic works!
    const cookieStore = await cookies()
    cookieStore.set("nexus_vendor_id", vendorUuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return NextResponse.json({ success: true, vendor: data })

  } catch (err: any) {
    console.error("Sync error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
