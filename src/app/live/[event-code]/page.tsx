import { GuestUploadFlow } from "@/components/live/GuestUploadFlow"

export default function LiveGuestPage({ params }: { params: { "event-code": string } }) {
  return <GuestUploadFlow eventCode={params["event-code"]} />
}
