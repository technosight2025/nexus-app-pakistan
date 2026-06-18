import React, { Suspense } from 'react';
import { InvitationContainer } from '@/components/invitation/InvitationContainer';

// We use searchParams to dynamically extract the guest name or default it
export default function InvitePage({ params, searchParams }: { params: { id: string }, searchParams: { guest?: string } }) {
  const guestName = searchParams.guest ? decodeURIComponent(searchParams.guest) : "Honored Guest";

  // Mock Premium Invitation Data based on our new Architectural Design
  const mockData = {
    id: params.id,
    brideName: "Sarah",
    groomName: "Ahmed",
    weddingDate: "November 25, 2026",
    heroBackground: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    status: "Pre-Event" as const, // For demo purposes. Host can change to "Post-Event" in DB.
    allowRegistry: true,
    storyBlocks: [
      {
        title: "The First Meeting",
        text: "It started with a chance encounter at a coffee shop in Lahore. A spilled latte led to an apology, which led to a conversation that neither of us wanted to end. Three hours felt like three minutes.",
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop"
      },
      {
        title: "The Proposal",
        text: "Under the stars in Hunza, surrounded by the majestic mountains. Ahmed had planned it for months. As the sun set over Rakaposhi, he asked the question that would change our lives forever.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    events: [
      {
        id: "e1",
        type: "Mehndi" as const,
        title: "Colors & Qawali",
        date: "Nov 23, 2026",
        time: "7:00 PM",
        venueName: "The Royal Gardens, Lahore",
        googleMapsUrl: "https://maps.google.com",
        dressCode: "Vibrant Traditional (Yellows, Greens, Pinks)",
        coverImage: "https://images.unsplash.com/photo-1585836881903-8d003bba86d2?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: "e2",
        type: "Baraat" as const,
        title: "The Wedding Reception",
        date: "Nov 25, 2026",
        time: "8:00 PM",
        venueName: "Nishat Banquet Hall",
        googleMapsUrl: "https://maps.google.com",
        dressCode: "Formal/Traditional Elegance",
        coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    memories: [
      { id: "m1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", title: "Ring Ceremony", likes: 24 },
      { id: "m2", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", title: "The Venue", likes: 18 },
      { id: "m3", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop", title: "Hunza Memories", likes: 56 },
    ]
  };

  return (
    <Suspense fallback={<div className="min-h-screen bg-nexus-charcoal flex items-center justify-center text-white">Loading your journey...</div>}>
      <InvitationContainer data={mockData} guestName={guestName} />
    </Suspense>
  );
}
