import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { clerkClient } from "@clerk/nextjs/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { themeConfig, organization_id, clerk_id, user_name, user_email } = await req.json()

    if (!themeConfig || !organization_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // 1. Insert the generated theme into the global themes table
    // We create a unique ID for this instance
    const themeId = `storefront-${organization_id}-${Date.now()}`
    const { data: themeData, error: themeError } = await supabase
      .from("themes")
      .insert([{ 
        id: themeId, 
        name: themeConfig.themeName || "Custom Storefront Theme", 
        description: "AI Generated Custom Theme", 
        price: 0, 
        type: "Free", 
        preview_image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", 
        icon: "LayoutTemplate", 
        config: themeConfig 
      }])
      .select()
      .single()

    if (themeError) throw themeError

    // If it's a mock organization, but we have a real clerk_id (new signup)
    // We must CREATE a real organization for them and link it to their profile!
    if (organization_id.includes('mock') && clerk_id) {
      const newOrgId = crypto.randomUUID()
      const slug = (user_name || "boutique").toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)
      
      const { error: insertOrgError } = await supabase
        .from("organizations")
        .insert([{
          id: newOrgId,
          name: user_name || "My Boutique",
          slug: slug,
          type: "apparel",
          settings: { active_theme_id: themeId }
        }])
      
      if (insertOrgError) throw insertOrgError

      // 2. Link to user profile via Clerk publicMetadata instead of the empty Supabase users table
      const client = await clerkClient()
      await client.users.updateUserMetadata(clerk_id, {
        publicMetadata: {
          organization_id: newOrgId
        }
      })

      return NextResponse.json({ success: true, themeId, organization_id: newOrgId })
    }

    // If it's a mock organization and no clerk_id is provided, just bypass DB update
    if (organization_id.includes('mock')) {
      return NextResponse.json({ success: true, themeId, mocked: true })
    }

    // 2. Fetch the current organization to get existing settings
    const { data: orgData, error: orgFetchError } = await supabase
      .from("organizations")
      .select("settings")
      .eq("id", organization_id)
      .single()

    if (orgFetchError) throw orgFetchError

    // 3. Update the organization settings with active_theme_id
    let currentSettings = orgData.settings as Record<string, any> | null
    if (!currentSettings) currentSettings = {}
    
    currentSettings.active_theme_id = themeId

    const { error: orgUpdateError } = await supabase
      .from("organizations")
      .update({ settings: currentSettings })
      .eq("id", organization_id)

    if (orgUpdateError) throw orgUpdateError

    return NextResponse.json({ success: true, themeId })
  } catch (error: any) {
    console.error("Error applying theme:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
