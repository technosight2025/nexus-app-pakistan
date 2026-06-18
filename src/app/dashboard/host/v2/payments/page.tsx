import { PaymentsOverview } from "@/components/dashboard/host/v2/PaymentsOverview"

export const metadata = {
  title: "Payments Hub | Nexus Host Desk",
  description: "Release secure escrow payouts, review payment schedules, and view transaction history.",
}

export default function PaymentsPage() {
  return <PaymentsOverview />
}
