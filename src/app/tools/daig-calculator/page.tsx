import { PublicLayout } from "@/components/layout/PublicLayout"
import { DaigCalculator } from "@/components/tools/DaigCalculator"

export default function DaigCalculatorPage() {
  return (
    <PublicLayout>
      <div className="py-8 bg-slate-50 min-h-screen">
        <DaigCalculator />
      </div>
    </PublicLayout>
  )
}
