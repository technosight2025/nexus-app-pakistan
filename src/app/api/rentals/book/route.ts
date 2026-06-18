import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

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
  } catch (e) {
    console.error("Error matching vendor to organization:", e)
  }

  try {
    const { data: firstOrg } = await supabase
      .from("organizations")
      .select("id")
      .limit(1)
    if (firstOrg && firstOrg.length > 0) {
      return firstOrg[0].id
    }
  } catch (e) {
    console.error("Error fetching fallback organization:", e)
  }

  return "11111111-1111-1111-1111-111111111111"
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Resolve organization ID for vendor
    const orgId = await getOrgIdForVendor(supabase, body.vendor_id)

    // Insert into Supabase business_leads table using its correct schema
    const { data, error } = await supabase
      .from("business_leads")
      .insert([{
        organization_id: orgId,
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        customer_email: body.customer_email || "",
        event_type: "Rental",
        event_date: body.start_date,
        estimated_value: parseFloat((body.total_price || "0").toString().replace(/,/g, '')) || 0,
        notes: JSON.stringify({
          outfit_id: body.outfit_id,
          start_date: body.start_date,
          payment_method: body.payment_method,
          total_price: body.total_price,
          size: body.size || "M",
          address: body.address || "",
          city: body.city || "",
          deposit: body.deposit || 0,
          vendor_id: body.vendor_id
        }),
        status: "New", // Case-sensitive constraint check ('New', 'Contacted', 'Quoted', 'Won', 'Lost')
        source: "Nexus Public Profile"
      }])
      .select()
      .single()

    if (error) throw error

    // Map lead back to mock booking format for client response compatibility
    const mockBooking = {
      id: data.id,
      vendor_id: body.vendor_id,
      outfit_id: body.outfit_id,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      start_date: body.start_date,
      end_date: body.start_date,
      payment_method: body.payment_method,
      total_price: body.total_price,
      status: "pending", // Dashboard expects lowercase 'pending' (mapped from 'New')
      created_at: data.created_at
    }

    return NextResponse.json({ success: true, booking: mockBooking }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

