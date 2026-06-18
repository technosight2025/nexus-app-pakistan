import { HostSupport } from "@/components/dashboard/host/HostSupport"

export const metadata = {
  title: 'Support Center | NEXUS Host',
  description: 'Get help with your events, raise tickets, and read FAQs.',
}

export default function HostSupportPage() {
  return (
    <div className="w-full h-full p-4 md:p-8">
      <HostSupport />
    </div>
  )
}
