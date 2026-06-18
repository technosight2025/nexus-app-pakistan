import { createClient } from '@/lib/supabase/server';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function getCustomerEvents() {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    throw new Error('Unauthorized');
  }

  const supabase = await createClient();
  const userEmail = user.primaryEmailAddress?.emailAddress || '';

  // 1. Find the contact record associated with this email
  const { data: contact, error: contactError } = await supabase
    .from('contacts')
    .select('id')
    .eq('email', userEmail)
    .single();

  // If there's no contact for this user, they don't have any events yet
  if (contactError || !contact) {
    console.log('No contact found for user ID:', userId);
    return [];
  }

  // 2. Fetch all events linked to this contact via contact_events
  const { data: contactEvents, error } = await supabase
    .from('contact_events')
    .select(`
      events (*)
    `)
    .eq('contact_id', contact.id);

  if (error) {
    console.error('Error fetching customer events:', JSON.stringify(error, null, 2));
    throw new Error('Failed to fetch your events. Please try again later.');
  }

  // Extract the events array, filter out any nulls, and sort by start_datetime
  const events = contactEvents
    .map((ce: any) => ce.events)
    .filter(Boolean)
    .sort((a: any, b: any) => {
      if (!a.start_datetime) return 1;
      if (!b.start_datetime) return -1;
      return new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime();
    });

  return events;
}

export async function getEventDetails(eventId: string) {
  const { userId } = await auth();
  const user = await currentUser();
  
  if (!userId || !user) {
    throw new Error('Unauthorized');
  }

  const supabase = await createClient();
  const userEmail = user.primaryEmailAddress?.emailAddress || '';

  // 1. Verify user contact directly by email
  const { data: contact, error: contactError } = await supabase
    .from('contacts')
    .select('id')
    .eq('email', userEmail)
    .single();

  if (contactError || !contact) {
    throw new Error('Unauthorized');
  }

  // 2. Fetch the specific event ensuring there's a link in contact_events
  const { data: contactEvent, error } = await supabase
    .from('contact_events')
    .select(`
      events (*)
    `)
    .eq('contact_id', contact.id)
    .eq('event_id', eventId)
    .single();

  if (error || !contactEvent || !contactEvent.events) {
    console.error('Error fetching event details:', JSON.stringify(error, null, 2));
    throw new Error('Event not found or access denied.');
  }

  return contactEvent.events as any; // Cast as any or specific Event row type
}

