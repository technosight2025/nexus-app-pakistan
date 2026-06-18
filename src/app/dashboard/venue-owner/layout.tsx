import { VenueDashboardLayout } from "@/components/dashboard/venue/VenueDashboardLayout"

export default function VenueOwnerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <VenueDashboardLayout>
      {children}
    </VenueDashboardLayout>
  )
}
