import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // We use the 'events' table to get pipeline status distribution
    const { data, error } = await supabase
      .from('events')
      .select('status'); 

    if (error) throw error;
    
    // Transform data for the chart (Recharts compatible)
    const counts = data.reduce((acc: any, curr: any) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(counts).map(key => ({ 
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize status
      count: counts[key] 
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error('Error fetching pipeline data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pipeline data' },
      { status: 500 }
    );
  }
}
