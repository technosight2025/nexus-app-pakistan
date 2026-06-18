import React from 'react';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { DashboardOverviewHome } from '@/components/dashboard/overview/DashboardOverviewHome';

export default async function DashboardOverviewPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect('/sign-in');
  }

  const cookieStore = await cookies();
  const vendorId = cookieStore.get('nexus_vendor_id')?.value;

  const role = user.publicMetadata?.role;

  // If they have a vendor cookie, we fetch their category and route them to their specialized dashboard
  if (vendorId) {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: vendor } = await supabase.from('vendors').select('category').eq('id', vendorId).single();

    if (vendor?.category === 'rentals' || vendor?.category === 'Rental & Wardrobe') {
      redirect('/dashboard/rentals');
    }
    // Fallback to the generic CRM dashboard
    return <DashboardOverviewHome />;
  }

  if (!role) {
    redirect('/onboarding');
  }

  if (role === 'customer') {
    redirect('/dashboard/host');
  }

  return <DashboardOverviewHome />;
}
