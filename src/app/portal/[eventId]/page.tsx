import React from 'react';
import { getEventDetails } from '@/app/portal/actions';
import { EventDashboard } from '@/components/portal/EventDashboard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Event Details | NEXUS Customer Portal',
  description: 'View detailed information about your upcoming event.',
};

export default async function EventDetailsPage(props: { params: Promise<{ eventId: string }> }) {
  const params = await props.params;
  const { eventId } = params;
  
  let event;
  try {
    event = await getEventDetails(eventId);
  } catch (err: any) {
    return (
      <div className="container mx-auto py-20 px-4 md:px-8 max-w-4xl text-center">
        <h1 className="text-2xl font-black text-[#1D1C17] uppercase tracking-wider mb-4">Access Denied</h1>
        <p className="text-[#5E6460]">{err.message}</p>
        <Link href="/portal" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#0F5B3E] uppercase tracking-widest hover:underline">
          <ArrowLeft size={14} /> Return to Portal
        </Link>
      </div>
    );
  }

  return <EventDashboard event={event} />;
}
