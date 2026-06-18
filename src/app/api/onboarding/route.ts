import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    const { role } = payload;

    if (!role || (role !== 'customer' && role !== 'owner')) {
      return NextResponse.json({ error: 'Invalid user role' }, { status: 400 });
    }

    const supabase = await createClient();

    let userOrgId = '11111111-1111-1111-1111-111111111111'; // default customer workspace organization

    if (role === 'owner') {
      // 1. Create a B2B Organization
      const orgId = crypto.randomUUID();
      userOrgId = orgId;
      const slug = payload.businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 6);

      const { error: orgError } = await supabase.from('organizations').insert({
        id: orgId,
        name: payload.businessName,
        slug: slug,
        type: payload.category || 'venue',
      });

      if (orgError) {
        console.error('organizations insert error:', orgError);
        return NextResponse.json({ error: orgError.message }, { status: 500 });
      }

      // 2. Create a default Branch for the organization
      const branchId = crypto.randomUUID();
      const branchSlug = 'main-branch';

      const { error: branchError } = await supabase.from('branches').insert({
        id: branchId,
        organization_id: orgId,
        name: payload.city + ' Branch',
        slug: branchSlug,
        address: payload.city,
      });

      if (branchError) {
        console.error('branches insert error:', branchError);
      }

      // 3. If category is venue, create a Venue record
      if (payload.category === 'venue') {
        const { error: venueError } = await supabase.from('venues').insert({
          branch_id: branchId,
          name: payload.businessName,
          type: 'Banquet Hall',
          capacity: 500,
        });

        if (venueError) {
          console.error('venues insert error:', venueError);
        }
      }
    } else {
      // B2C Customer onboarding
      // 1. Create a Contact in the contacts table
      const contactId = crypto.randomUUID();
      
      const { error: contactError } = await supabase.from('contacts').insert({
        id: contactId,
        organization_id: userOrgId,
        name: payload.fullName,
        contact_type: 'individual',
      });

      if (contactError) {
        console.error('contacts insert error:', contactError);
      }

      // 2. Create an Event for the customer
      const eventId = crypto.randomUUID();
      const eventDate = payload.eventDate ? new Date(payload.eventDate).toISOString() : new Date().toISOString();

      const { error: eventError } = await supabase.from('events').insert({
        id: eventId,
        organization_id: userOrgId,
        name: payload.eventName || `${payload.fullName}'s Event`,
        event_type_id: 'wedding',
        start_datetime: eventDate,
        guest_count: parseInt(payload.guests) || 400,
        status: 'planned',
      });

      if (eventError) {
        console.error('events insert error:', eventError);
      }
    }

    // Update Clerk user public metadata
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role,
        onboarded: true,
        organizationId: userOrgId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('onboarding error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
