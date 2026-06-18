import { VenueDashboardLayout } from "@/components/dashboard/venue/VenueDashboardLayout"

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <VenueDashboardLayout>
      {children}
    </VenueDashboardLayout>
  )
}
