import { HostEventsList } from "@/components/dashboard/host/HostEventsList"

export const metadata = {
  title: 'My Events | NEXUS Host',
  description: 'Manage all your events and celebrations on NEXUS.',
}

export default function HostEventsPage() {
  return (
    <div className="w-full h-full">
      <HostEventsList />
    </div>
  )
}
