import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { PremiumProfileView } from "@/components/professionals/PremiumProfileView"

export const metadata = {
  title: "Professional Profile | NEXUS",
  description: "View professional portfolio, packages, and book online.",
}

export default function ProfessionalProfilePage() {
  return (
    <PublicLayout>
      <PremiumProfileView />
      <MegaFooter />
    </PublicLayout>
  )
}
