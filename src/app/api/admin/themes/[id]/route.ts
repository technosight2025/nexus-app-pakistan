import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const { data: theme, error } = await supabase
      .from("themes")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error

    return NextResponse.json({ theme })
  } catch (error: any) {
    console.error("Error fetching theme:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
