import { HostProfile } from "@/components/dashboard/host/HostProfile"

export const metadata = {
  title: 'Profile Settings | NEXUS Host',
  description: 'Manage your personal info, security, and notifications.',
}

export default function HostProfilePage() {
  return (
    <div className="w-full h-full">
      <HostProfile />
    </div>
  )
}
