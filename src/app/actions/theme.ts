"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function selectWebsiteTheme(themeId: string) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error("Unauthorized")
    }

    // In Clerk SDK v5+, clerkClient is exposed differently.
    // However, we can use the fetch API to securely update the user's metadata directly if the SDK methods are unstable.
    // But let's try the officially recommended way for the installed Clerk version first.
    const clerk = await import("@clerk/nextjs/server").then(m => m.clerkClient)
    
    // Some Clerk versions require awaiting clerkClient()
    const client = typeof clerk === 'function' ? await clerk() : clerk;

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        websiteCreated: true,
        themeId: themeId
      }
    })

    // Revalidate the dashboard layout so the Topbar updates instantly
    revalidatePath("/dashboard", "layout")
    
    return { success: true }
  } catch (error: any) {
    console.error("Theme Selection Error:", error)
    return { success: false, error: error.message }
  }
}
