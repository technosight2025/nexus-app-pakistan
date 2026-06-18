import { EventWizard } from "@/components/onboarding/EventWizard"

export const metadata = {
  title: 'Start Your Event - Nexus Event OS',
  description: 'Let\'s build your event workspace in just a few steps.',
}

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <EventWizard />
    </main>
  )
}
