import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { BusinessHero } from "@/components/business/BusinessHero"
import { BusinessConsole } from "@/components/business/BusinessConsole"
import { BusinessCTA } from "@/components/business/BusinessCTA"

export default function BusinessSolutionsPage() {
  return (
    <PublicLayout>
      <BusinessHero />
      <BusinessConsole />
      <BusinessCTA />
      <MegaFooter />
    </PublicLayout>
  )
}
