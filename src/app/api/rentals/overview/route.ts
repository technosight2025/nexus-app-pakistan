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

    // 0. Get Vendor Profile
    const { data: vendorProfile } = await supabase
      .from("vendors")
      .select("business_name, category")
      .eq("id", vendorId)
      .single()

    // 1. Get Wardrobe First
    const { data: wardrobe, error: wardrobeError } = await supabase
      .from("rental_outfits")
      .select("*")
      .eq("vendor_id", vendorId)
      .order("created_at", { ascending: false })

    if (wardrobeError) throw wardrobeError

    // 2. Get Bookings (Mapping from business_leads)
    let bookings: any[] = []
    const orgId = await getOrgIdForVendor(supabase, vendorId)
    const { data: leadsData, error: leadsError } = await supabase
      .from("business_leads")
      .select("*")
      .eq("organization_id", orgId)

    if (leadsError) {
      throw leadsError
    } else {
      bookings = (leadsData || []).map(lead => {
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
        } catch (e) {
          // Not a wardrobe lead
        }
        return null
      }).filter(Boolean) as any[]
    }

    // Calculate metrics
    let totalRevenue = 0
    let activeRentals = 0
    const upcomingRentals = []
    
    const now = new Date()

    if (bookings) {
      for (const b of bookings) {
        if (b.status === "confirmed") {
          totalRevenue += parseFloat(b.total_price.replace(/,/g, '')) || 0
          
          const startDate = new Date(b.start_date)
          if (startDate >= now) {
            activeRentals++
            const diffTime = Math.abs(startDate.getTime() - now.getTime())
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            
            const outfit = wardrobe?.find(w => w.id === b.outfit_id)
            upcomingRentals.push({
              id: b.id,
              outfit: outfit?.name || "Deleted Outfit",
              customer: b.customer_name,
              event: "Rental",
              daysLeft: diffDays,
              value: b.total_price,
              status: b.status
            })
          }
        } else if (b.status === "pending") {
          activeRentals++
          const startDate = new Date(b.start_date)
          const diffTime = Math.abs(startDate.getTime() - now.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          const outfit = wardrobe?.find(w => w.id === b.outfit_id)
          upcomingRentals.push({
            id: b.id,
            outfit: outfit?.name || "Deleted Outfit",
            customer: b.customer_name,
            event: "Rental",
            daysLeft: diffDays,
            value: b.total_price,
            status: b.status
          })
        }
      }
    }

    // Format Wardrobe for UI
    const formattedWardrobe = (wardrobe || []).slice(0, 4).map(w => ({
      name: w.name,
      tag: w.tag,
      status: "Available", // In a real app, calculate based on current bookings
      dueBack: null,
      image: w.image_url,
      rentals: 0 // Mocked for MVP
    }))

    // Format Activity for UI
    const activity = (bookings || []).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4).map(b => {
      const outfit = wardrobe?.find(w => w.id === b.outfit_id)
      return {
        text: `${b.customer_name} booked ${outfit?.name || "an outfit"}`,
        time: new Date(b.created_at).toLocaleDateString(),
        icon: b.status === "confirmed" ? "pay" : "book"
      }
    })

    return NextResponse.json({
      businessName: vendorProfile?.business_name || "Vendor",
      category: vendorProfile?.category || "Store",
      revenue: totalRevenue.toLocaleString(),
      activeRentals,
      totalOutfits: wardrobe?.length || 0,
      upcomingRentals: upcomingRentals.slice(0, 5),
      wardrobe: formattedWardrobe,
      activity
    })

  } catch (error: any) {
    console.error("Error fetching overview:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
