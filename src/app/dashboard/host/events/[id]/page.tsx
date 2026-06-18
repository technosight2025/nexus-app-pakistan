import { EventCommandCenter } from "@/components/dashboard/host/EventCommandCenter"

export default function EventCommandCenterPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch event data using params.id
  return <EventCommandCenter eventId={params.id} />
}
