import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

import { cookies } from "next/headers"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const vendorId = cookieStore.get("nexus_vendor_id")?.value

    if (!vendorId) {
      return NextResponse.json({ status: "none" })
    }

    const { data, error } = await supabase
      .from("vendor_subscriptions")
      .select("*")
      .eq("vendor_id", vendorId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No subscription found
        return NextResponse.json({ status: "none" })
      }
      throw error
    }

    // Check if trial is expired
    let currentStatus = data.status
    let daysRemaining = 0

    if (currentStatus === "trial") {
      const ends = new Date(data.trial_ends)
      const now = new Date()
      const diffTime = ends.getTime() - now.getTime()
      daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (daysRemaining <= 0) {
        currentStatus = "expired"
        // Auto-update to expired
        await supabase
          .from("vendor_subscriptions")
          .update({ status: "expired" })
          .eq("id", data.id)
      }
    }

    return NextResponse.json({ 
      status: currentStatus, 
      daysRemaining: Math.max(0, daysRemaining),
      trialEnds: data.trial_ends
    })
  } catch (error: any) {
    console.error("Error fetching billing status:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
