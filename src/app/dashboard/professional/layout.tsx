import { ProfessionalSidebar } from "@/components/dashboard/professional/ProfessionalSidebar"

export const metadata = {
  title: "Professional Dashboard | NEXUS",
  description: "Manage your professional business on NEXUS.",
}

export default function ProfessionalDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <ProfessionalSidebar />
      <div className="pl-64">
        {/* We can add a top navbar here later if needed, for now main content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
