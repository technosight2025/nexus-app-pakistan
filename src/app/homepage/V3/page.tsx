import { PublicLayout } from "@/components/layout/PublicLayout"
import { MegaFooter } from "@/components/layout/MegaFooter"
import { NexusHomepageV3 } from "@/components/home/NexusHomepageV3"

export default function HomepageV3Page() {
  return (
    <PublicLayout>
      <NexusHomepageV3 />
      <MegaFooter />
    </PublicLayout>
  )
}
