import Link from "next/link"
import { Store, ExternalLink, Sparkles, Image, Star, MapPin } from "lucide-react"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"
import ProfileMakerClient from "@/components/dashboard/rentals/ProfileMakerClient"
import { auth } from "@clerk/nextjs/server"
import crypto from 'crypto'

function clerkToUuid(clerkId: string) {
  const hash = crypto.createHash('md5').update(clerkId).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

export default async function ProfileMakerPage() {
  const cookieStore = await cookies()
  let vendorId = cookieStore.get("nexus_vendor_id")?.value

  if (!vendorId) {
    const { userId } = await auth()
    if (userId) {
      vendorId = clerkToUuid(userId)
    }
  }

  let vendor: any = { business_name: "Vendor Profile", city: "Lahore" }
  
  if (vendorId) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data } = await supabase.from("vendors").select("*").eq("id", vendorId).single()
    if (data) vendor = data
  }

  // Calculate completion
  let score = 15;
  if (vendor.business_name) score += 15;
  if (vendor.city) score += 10;
  if (vendor.category) score += 10;

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#0A3B2A]">Profile Maker</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your Nexus Marketplace profile — {vendor.business_name}</p>
      </div>

      {/* Live Preview Card */}
      <div className="bg-gradient-to-br from-[#0A3B2A] to-[#1a6b4a] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#C5A880]/20 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#D4AF37]/40 bg-white flex items-center justify-center">
                <Store className="w-6 h-6 text-[#0A3B2A]" />
              </div>
              <div>
                <p className="font-black text-lg">{vendor.business_name}</p>
                <div className="flex items-center gap-1 text-white/70 text-xs font-medium">
                  <MapPin className="w-3 h-3" /> {vendor.city || "Pakistan"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" /><span className="font-black">New</span><span className="text-white/50 text-xs">(0 reviews)</span></div>
              <span className="text-white/30">|</span>
              <span className="text-white/70 text-xs font-medium">Add Pricing</span>
            </div>
          </div>
          <Link href={`/vendors/${vendorId}`} target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-black rounded-xl font-black text-sm hover:bg-[#C5A880] transition-colors whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4" /> View Live Profile
          </Link>
        </div>
      </div>

      {/* Sections & Interactive Client */}
      <ProfileMakerClient initialVendor={vendor} vendorId={vendorId || ""} />
    </div>
  )
}
