import { PublicLayout } from "@/components/layout/PublicLayout"
import { BaraatTracker } from "@/components/invite/BaraatTracker"

export default function BaraatTrackerPage() {
  return (
    <PublicLayout>
      <div className="py-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <BaraatTracker />
      </div>
    </PublicLayout>
  )
}
