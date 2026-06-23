import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getOrgIdForVendor(supabase: any, vendorId: string): Promise<string> {
  try {
    const { data: vendor } = await supabase
      .from("vendors")
      .select("business_name")
      .eq("id", vendorId)
      .single()

    if (vendor && vendor.business_name) {
      const slug = vendor.business_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const { data: org } = await supabase
        .from("organizations")
        .select("id")
        .or(`name.eq."${vendor.business_name}",slug.eq."${slug}"`)
        .limit(1)

      if (org && org.length > 0) {
        return org[0].id
      }
    }
  } catch (e) {}

  try {
    const { data: firstOrg } = await supabase
      .from("organizations")
      .select("id")
      .limit(1)
    if (firstOrg && firstOrg.length > 0) {
      return firstOrg[0].id
    }
  } catch (e) {}

  return "11111111-1111-1111-1111-111111111111"
}

export async function POST() {
  try {
    const cookieStore = await cookies()
    const vendorId = cookieStore.get("nexus_vendor_id")?.value

    if (!vendorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete all outfits for this vendor
    const { error: outfitError } = await supabase
      .from("rental_outfits")
      .delete()
      .eq("vendor_id", vendorId)

    if (outfitError) throw outfitError

    // Delete all leads/bookings for this organization
    const orgId = await getOrgIdForVendor(supabase, vendorId)
    const { error: leadsError } = await supabase
      .from("business_leads")
      .delete()
      .eq("organization_id", orgId)

    if (leadsError) throw leadsError

    return NextResponse.json({ success: true, message: "Rental data wiped successfully" })

  } catch (error: any) {
    console.error("Error resetting rental data:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
