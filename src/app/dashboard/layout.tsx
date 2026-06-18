import React from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const vendorId = cookieStore.get('nexus_vendor_id')?.value || null;
  let vendorCategory = null;

  if (vendorId) {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: vendor } = await supabase.from('vendors').select('category').eq('id', vendorId).single();
    vendorCategory = vendor?.category;
  }

  return (
    <DashboardLayout initialVendorId={vendorId} vendorCategory={vendorCategory}>
      {children}
    </DashboardLayout>
  );
}
