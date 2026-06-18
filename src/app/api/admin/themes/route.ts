import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data: themes, error } = await supabase
      .from("themes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ themes })
  } catch (error: any) {
    console.error("Error fetching themes:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // In a real app, we would verify the user is an Admin via Clerk auth here.

    const { id, name, description, price, type, preview_image, icon, config } = body

    if (!id || !name || !config) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("themes")
      .upsert([{ id, name, description, price, type, preview_image, icon, config }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, theme: data })
  } catch (error: any) {
    console.error("Error creating theme:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
