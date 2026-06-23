import { NextResponse } from 'next/server';
import { getMemories, saveMemories } from '@/lib/memories-store';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = params.id;
    const memories = getMemories();
    const index = memories.findIndex(m => m.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Memory not found' }, { status: 404 });
    }

    memories[index].status = 'approved';
    saveMemories(memories);

    return NextResponse.json({ success: true, memory: memories[index] });
  } catch (error) {
    console.error('Approve memory error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
