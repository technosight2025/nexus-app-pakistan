import { LeadDetailsView } from "@/components/dashboard/venue/LeadDetailsView"

// Use standard Promise types for Next.js 16 dynamic params
export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return <LeadDetailsView leadId={resolvedParams.id} />
}
