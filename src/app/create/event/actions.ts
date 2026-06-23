'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

export async function createEventAction(formData: FormData) {
  const { userId, orgId: activeOrgId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const dateStr = formData.get('date') as string;
  const guestCount = parseInt(formData.get('guest_count') as string) || 0;
  const budget = parseFloat(formData.get('budget') as string) || 0;
  const eventType = formData.get('event_type') as string || 'wedding';

  if (!name) {
    throw new Error('Event name is required.');
  }

  const supabase = await createClient();
  const role = user.publicMetadata?.role || 'customer';
  let orgId = (user.publicMetadata?.organizationId as string) || (activeOrgId as string);

  // Fallback: Query Supabase if Clerk doesn't have the orgId in context or metadata
  if (!orgId) {
    const { data: memberData } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();
    
    if (memberData?.organization_id) {
      orgId = memberData.organization_id;
    } else if (process.env.NODE_ENV === 'development') {
      // Dev mock fallback if absolutely no org is found
      orgId = 'org_mock_vendor'; 
    }
  }

  const eventId = crypto.randomUUID();
  const eventDate = dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();

  if (role === 'customer' || role === 'client') {
    // B2C Customer path
    const b2cOrgId = '11111111-1111-1111-1111-111111111111';

    // Initialize Admin Client to bypass RLS constraints for system registration
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      throw new Error('System configuration error: Service key is missing.');
    }
    const adminSupabase = createSupabaseAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey
    );

    const userEmail = user.primaryEmailAddress?.emailAddress || '';

    // 1. Find or create contact linked to this email address
    let { data: contact } = await adminSupabase
      .from('contacts')
      .select('id')
      .eq('email', userEmail)
      .maybeSingle();

    if (!contact) {
      const contactId = crypto.randomUUID();
      const { error: insertContactError } = await adminSupabase.from('contacts').insert({
        id: contactId,
        organization_id: b2cOrgId,
        name: user.fullName || user.firstName || 'Customer',
        email: userEmail,
        contact_type: 'individual',
      });

      if (insertContactError) {
        console.error('Failed to create contact:', JSON.stringify(insertContactError, null, 2));
        throw new Error('Could not set up contact profile: ' + insertContactError.message + ' (' + insertContactError.code + ')');
      }
      contact = { id: contactId };
    }

    // Insert event
    const { error: eventError } = await adminSupabase.from('events').insert({
      id: eventId,
      organization_id: b2cOrgId,
      name,
      event_type_id: eventType,
      start_datetime: eventDate,
      guest_count: guestCount,
      budget: budget,
      status: 'planned',
    });

    if (eventError) {
      console.error('Event creation error:', eventError);
      throw new Error(eventError.message);
    }

    // Link event to contact
    const { error: linkError } = await adminSupabase.from('contact_events').insert({
      contact_id: contact.id,
      event_id: eventId,
      role_type: 'client',
    });

    if (linkError) {
      console.error('Failed to link event to contact:', linkError);
    }

    redirect('/portal');
  } else {
    // B2B Owner / Vendor path
    if (!orgId) {
      throw new Error('Business organization profile not found.');
    }

    // Find default branch
    const { data: branch } = await supabase
      .from('branches')
      .select('id')
      .eq('organization_id', orgId)
      .limit(1)
      .maybeSingle();

    const branchId = branch?.id || null;

    const { error: eventError } = await supabase.from('events').insert({
      id: eventId,
      organization_id: orgId,
      branch_id: branchId,
      name,
      event_type_id: eventType,
      start_datetime: eventDate,
      guest_count: guestCount,
      budget: budget,
      status: 'planned',
    });

    if (eventError) {
      console.error('B2B Event creation error:', eventError);
      throw new Error(eventError.message);
    }

    redirect('/dashboard');
  }
}
