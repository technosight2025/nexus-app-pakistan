import { PublicLayout } from "@/components/layout/PublicLayout"
import { JahaizTracker } from "@/components/tools/JahaizTracker"

export default function JahaizTrackerPage() {
  return (
    <PublicLayout>
      <div className="py-8 bg-slate-50 min-h-screen">
        <JahaizTracker />
      </div>
    </PublicLayout>
  )
}
