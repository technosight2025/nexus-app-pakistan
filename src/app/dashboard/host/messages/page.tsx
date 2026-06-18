import { HostMessages } from "@/components/dashboard/host/HostMessages"

export const metadata = {
  title: 'Messages | NEXUS Host',
  description: 'Chat with your vendors and Nexus Concierge.',
}

export default function HostMessagesPage() {
  return (
    <div className="w-full h-full">
      <HostMessages />
    </div>
  )
}
