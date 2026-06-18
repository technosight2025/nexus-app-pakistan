import { StudioDashboardLayout } from "@/components/dashboard/studio/StudioDashboardLayout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StudioDashboardLayout>{children}</StudioDashboardLayout>
}
