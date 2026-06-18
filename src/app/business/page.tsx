import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { BusinessHero } from "@/components/business/BusinessHero"
import { ModuleDeepDive } from "@/components/business/ModuleDeepDive"
import { TargetAudienceGrid } from "@/components/business/TargetAudienceGrid"
import { BusinessCTA } from "@/components/business/BusinessCTA"

export default function BusinessSolutionsPage() {
  return (
    <PublicLayout>
      <BusinessHero />
      <TargetAudienceGrid />
      <ModuleDeepDive />
      <BusinessCTA />
      <MegaFooter />
    </PublicLayout>
  )
}
