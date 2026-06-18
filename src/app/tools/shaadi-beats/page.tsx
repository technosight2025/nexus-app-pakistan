import { PublicLayout } from "@/components/layout/PublicLayout"
import { ShaadiBeats } from "@/components/tools/ShaadiBeats"

export default function ShaadiBeatsPage() {
  return (
    <PublicLayout>
      <div className="py-8 bg-slate-50 min-h-screen">
        <ShaadiBeats />
      </div>
    </PublicLayout>
  )
}
