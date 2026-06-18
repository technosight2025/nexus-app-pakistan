import React from 'react';
import { getCustomerEvents } from './actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarIcon } from 'lucide-react';
import { OnboardingChecklist } from '@/components/portal/OnboardingChecklist';
import { PageEntrance } from '@/components/animations/PageEntrance';

export const metadata = {
  title: 'My Event Journey | NEXUS',
  description: 'Manage your events and track progress.',
};

export default async function PortalPage() {
  const events = await getCustomerEvents();
  const hasEvents = events && events.length > 0;

  return (
    <PageEntrance>
      <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#1D1C17] uppercase tracking-wider">My Event Journey</h1>
          <p className="text-[#5E6460] mt-2 text-sm">Manage your events and track progress.</p>
        </div>

        <OnboardingChecklist hasEvents={hasEvents} />

        {hasEvents && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="border-[#E6E2DA] shadow-sm hover:shadow-md transition-shadow bg-[#FFFFFF]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-[#1D1C17]">{event.name}</CardTitle>
                  <div className="flex flex-col gap-1 mt-2">
                    <CardDescription className="flex items-center gap-2 text-sm text-[#5E6460]">
                      <CalendarIcon className="w-4 h-4 shrink-0" />
                      {event.start_datetime 
                        ? new Date(event.start_datetime).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) 
                        : 'Date TBD'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-[#FAF7F2] text-[#0F5B3E] rounded border border-[#0F5B3E]/20">
                      {event.status || 'Draft'}
                    </span>
                    <Link href={`/portal/${event.id}`}>
                      <Button variant="outline" size="sm" className="text-xs uppercase tracking-widest font-bold border-[#E6E2DA] hover:bg-[#FAF7F2] hover:text-[#0F5B3E]">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageEntrance>
  );
}
