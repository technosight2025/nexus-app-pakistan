import React from 'react';
import { EventCalendar } from '@/components/dashboard/calendar/EventCalendar';

export const metadata = {
  title: 'Event Calendar | NEXUS Event OS',
  description: 'Monthly calendar view of all bookings and events',
};

export default function CalendarPage() {
  return (
    <div className="h-full flex flex-col">
      <EventCalendar />
    </div>
  );
}
