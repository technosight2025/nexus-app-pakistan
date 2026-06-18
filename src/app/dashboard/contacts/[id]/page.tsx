import { ContactDetailsView } from "@/components/dashboard/host/ContactDetailsView"

export default async function ContactDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ContactDetailsView contactId={resolvedParams.id} />
}
