import { NextResponse } from 'next/server';
import { getMemories } from '@/lib/memories-store';
// import { auth } from '@clerk/nextjs/server'; // Skipping clerk auth strictly for local dev mockup

export async function GET() {
  try {
    // In production:
    // const { sessionClaims } = await auth();
    // if (sessionClaims?.metadata?.role !== 'customer') { // We use customer/host interchangeably in this app based on prev files
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const memories = getMemories();
    const pendingMemories = memories.filter(m => m.status === 'pending');
    
    return NextResponse.json({ memories: pendingMemories });
  } catch (error) {
    console.error('Fetch pending memories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
