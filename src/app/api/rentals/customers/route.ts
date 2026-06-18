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

function mapDbStatusToClient(dbStatus: string): string {
  const s = (dbStatus || "").toLowerCase()
  if (s === "new") return "pending"
  if (s === "won") return "confirmed"
  if (s === "lost") return "cancelled"
  return s
}

export async function GET() {
  try {
    const cookieStore = await cookies()
    const vendorId = cookieStore.get("nexus_vendor_id")?.value

    if (!vendorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orgId = await getOrgIdForVendor(supabase, vendorId)

    // Fetch all bookings for this vendor via business_leads
    const { data: leads, error } = await supabase
      .from("business_leads")
      .select("*")
      .eq("organization_id", orgId)

    if (error) throw error

    const bookings = (leads || []).map(lead => {
      try {
        const parsed = JSON.parse(lead.notes || "")
        if (parsed.outfit_id) {
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
            created_at: lead.created_at
          }
        }
      } catch (e) {}
      return null
    }).filter(Boolean) as any[]

    // Aggregate bookings by customer
    const customersMap = new Map<string, any>()

    for (const b of (bookings || [])) {
      // Use phone as the unique identifier, fallback to name if missing
      const key = b.customer_phone || b.customer_name
      
      const price = parseFloat(b.total_price.replace(/,/g, '')) || 0

      if (customersMap.has(key)) {
        const c = customersMap.get(key)
        c.totalOrders += 1
        c.lifetimeSpend += price
        if (new Date(b.created_at) > new Date(c.lastOrderDate)) {
          c.lastOrderDate = b.created_at
        }
      } else {
        customersMap.set(key, {
          id: key,
          name: b.customer_name,
          phone: b.customer_phone,
          totalOrders: 1,
          lifetimeSpend: price,
          lastOrderDate: b.created_at,
          joinDate: b.created_at
        })
      }
    }

    // Convert map to array and sort by lifetime spend
    const customers = Array.from(customersMap.values()).sort((a, b) => b.lifetimeSpend - a.lifetimeSpend)

    return NextResponse.json(customers)

  } catch (error: any) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
