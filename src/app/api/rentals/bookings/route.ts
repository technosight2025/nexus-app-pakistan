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

// Map db status to client status
function mapDbStatusToClient(dbStatus: string): string {
  const s = (dbStatus || "").toLowerCase()
  if (s === "new") return "pending"
  if (s === "won") return "confirmed"
  if (s === "lost") return "cancelled"
  return s
}

// Map client status to db status
function mapClientStatusToDb(clientStatus: string): string {
  const s = (clientStatus || "").toLowerCase()
  if (s === "pending") return "New"
  if (s === "confirmed") return "Won"
  if (s === "cancelled") return "Lost"
  // Capitalize first letter as fallback
  return clientStatus.charAt(0).toUpperCase() + clientStatus.slice(1)
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const vendorId = cookieStore.get("nexus_vendor_id")?.value

    if (!vendorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orgId = await getOrgIdForVendor(supabase, vendorId)

    // Query business_leads table for this organization
    const { data: leads, error } = await supabase
      .from("business_leads")
      .select("*")
      .eq("organization_id", orgId)
      .order("created_at", { ascending: false })

    if (error) throw error

    // Fetch wardrobe outfits to associate them with bookings
    const { data: outfits } = await supabase
      .from("rental_outfits")
      .select("*")
      .eq("vendor_id", vendorId)

    // Filter and map leads containing wardrobe bookings
    const bookings = (leads || []).map(lead => {
      try {
        const parsed = JSON.parse(lead.notes || "")
        if (parsed.outfit_id) {
          const outfit = outfits?.find(o => o.id === parsed.outfit_id) || null
          return {
            id: lead.id,
            vendor_id: vendorId,
            outfit_id: parsed.outfit_id,
            customer_name: lead.customer_name,
            customer_phone: lead.customer_phone,
            start_date: parsed.start_date,
            end_date: parsed.start_date,
            payment_method: parsed.payment_method,
            total_price: parsed.total_price,
            status: mapDbStatusToClient(lead.status),
            created_at: lead.created_at,
            rental_outfits: outfit ? {
              name: outfit.name,
              image_url: outfit.image_url
            } : null
          }
        }
      } catch (e) {
        // Not a wardrobe rental lead
      }
      return null
    }).filter(Boolean)

    return NextResponse.json({ bookings })
  } catch (error: any) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const vendorId = cookieStore.get("nexus_vendor_id")?.value

    if (!vendorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { booking_id, status } = await req.json()
    const orgId = await getOrgIdForVendor(supabase, vendorId)

    // Map booking status back to lead status
    const leadStatus = mapClientStatusToDb(status)

    const { data: lead, error } = await supabase
      .from("business_leads")
      .update({ status: leadStatus })
      .eq("id", booking_id)
      .eq("organization_id", orgId)
      .select()
      .single()

    if (error) throw error

    let mockBooking = null
    if (lead) {
      try {
        const parsed = JSON.parse(lead.notes || "")
        
        // Fetch wardrobe outfit details for the updated booking
        const { data: outfit } = await supabase
          .from("rental_outfits")
          .select("*")
          .eq("id", parsed.outfit_id)
          .single()

        mockBooking = {
          id: lead.id,
          vendor_id: vendorId,
          outfit_id: parsed.outfit_id,
          customer_name: lead.customer_name,
          customer_phone: lead.customer_phone,
          start_date: parsed.start_date,
          end_date: parsed.start_date,
          payment_method: parsed.payment_method,
          total_price: parsed.total_price,
          status: mapDbStatusToClient(lead.status),
          created_at: lead.created_at,
          rental_outfits: outfit ? {
            name: outfit.name,
            image_url: outfit.image_url
          } : null
        }
      } catch (e) {}
    }

    return NextResponse.json({ success: true, booking: mockBooking })
  } catch (error: any) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

