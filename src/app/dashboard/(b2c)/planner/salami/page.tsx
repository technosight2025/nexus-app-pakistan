import { PublicLayout } from "@/components/layout/PublicLayout"
import { SalamiLedger } from "@/components/dashboard/SalamiLedger"

export default function SalamiLedgerPage() {
  return (
    <PublicLayout>
      <div className="py-8 bg-slate-50 min-h-screen">
        <SalamiLedger />
      </div>
    </PublicLayout>
  )
}
