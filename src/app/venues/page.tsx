import { VenueDirectoryV3 } from "@/components/marketplace/VenueDirectoryV3"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find Venues | NEXUS",
  description: "Discover and book the perfect venue for your wedding or corporate event in Pakistan.",
}

export default function VenuesPage() {
  return (
    <VenueDirectoryV3 />
  )
}
