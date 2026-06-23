import { NextResponse } from 'next/server';
import { getMemories } from '@/lib/memories-store';

export async function GET() {
  try {
    const memories = getMemories();
    const approvedMemories = memories.filter(m => m.status === 'approved');
    
    return NextResponse.json({ memories: approvedMemories });
  } catch (error) {
    console.error('Fetch approved memories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
