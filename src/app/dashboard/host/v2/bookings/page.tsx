import { ClientBookingsView } from "@/components/dashboard/host/v2/ClientBookingsView"

export const metadata = {
  title: 'My Bookings | Nexus Host Desk',
  description: 'Manage active contracts, verify escrow terms, and authorize milestone payments.',
}

export default function BookingsPage() {
  return <ClientBookingsView />
}
