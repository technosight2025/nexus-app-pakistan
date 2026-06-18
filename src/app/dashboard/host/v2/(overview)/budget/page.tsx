import { BudgetTracker } from "@/components/dashboard/host/v2/BudgetTracker"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Budget Tracker | Nexus Host Dashboard",
  description: "Monitor your multi-day celebration finances with precision.",
}

export default function BudgetTrackerPage() {
  return <BudgetTracker />
}
