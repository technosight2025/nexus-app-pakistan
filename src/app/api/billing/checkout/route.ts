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

    // Simulate successful Stripe checkout
    // In reality, this would create a Stripe session, and a webhook would update the DB.
    
    const { data, error } = await supabase
      .from("vendor_subscriptions")
      .update({ 
        payment_status: "paid",
        status: "active",
        // Extend trial/billing period by 30 days
        trial_ends: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString() 
      })
      .eq("vendor_id", vendorId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, subscription: data })
  } catch (error: any) {
    console.error("Error processing checkout:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
