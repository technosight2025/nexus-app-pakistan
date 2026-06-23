import NexusChat from "@/components/NexusChat"
import { Header } from "@/components/layout/Header"

export default function MessagesPage() {
  return (
    <>
      <Header />
      <NexusChat bookingId="99999999-9999-9999-9999-999999999999" senderType="host" senderName="Test User" />
    </>
  )
}
