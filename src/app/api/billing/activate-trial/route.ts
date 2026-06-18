import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

import { cookies } from "next/headers"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const vendorId = cookieStore.get("nexus_vendor_id")?.value

    if (!vendorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Calculate trial dates (90 days from now)
    const now = new Date()
    const trialEnds = new Date()
    trialEnds.setDate(now.getDate() + 90)

    const { data, error } = await supabase
      .from("vendor_subscriptions")
      .upsert({
        vendor_id: vendorId,
        status: "trial",
        trial_start: now.toISOString(),
        trial_ends: trialEnds.toISOString(),
        payment_status: "unpaid"
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, subscription: data })
  } catch (error: any) {
    console.error("Error activating trial:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
