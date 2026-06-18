import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const cookieStore = await cookies()
  const vendorId = cookieStore.get("nexus_vendor_id")?.value

  const query = supabase.from("rental_outfits").select("*").order("created_at", { ascending: false })
  
  if (vendorId) {
    query.eq("vendor_id", vendorId)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  const cookieStore = await cookies()
  const vendorId = cookieStore.get("nexus_vendor_id")?.value

  if (!vendorId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("rental_outfits")
    .insert([{
      vendor_id:   vendorId,
      name:        body.name,
      tag:         body.tag,
      price:       body.price,
      material:    body.material,
      description: body.description || "",
      sizes:       body.sizes,
      features:    body.features || [],
      image_url:   body.image_url || "",
      status:      "Available",
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  const { error } = await supabase.from("rental_outfits").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  
  const cookieStore = await cookies()
  const vendorId = cookieStore.get("nexus_vendor_id")?.value

  if (!vendorId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("rental_outfits")
    .update({
      name:        body.name,
      tag:         body.tag,
      price:       body.price,
      material:    body.material,
      description: body.description || "",
      sizes:       body.sizes,
      features:    body.features || [],
      image_url:   body.image_url || "",
    })
    .eq("id", body.id)
    .eq("vendor_id", vendorId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 200 })
}
