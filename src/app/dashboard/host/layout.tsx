import { CustomerDashboardLayout } from "@/components/dashboard/host/CustomerDashboardLayout"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomerDashboardLayout>{children}</CustomerDashboardLayout>
    </>
  )
}
