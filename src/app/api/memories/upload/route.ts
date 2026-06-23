import { NextResponse } from 'next/server';
import { getMemories, saveMemories, Memory } from '@/lib/memories-store';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    const title = data.get('title') as string || 'Guest Upload';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // In a real app, upload file to S3/Cloudinary and get URL.
    // For this mock, we'll use a placeholder or data URI if it's small.
    // To avoid massive JSON files, we will use a realistic mock URL for now.
    // But let's actually just use a placeholder image if we are mocking uploads.
    const mockUrl = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600"; 
    
    const newMemory: Memory = {
      id: `m_${Date.now()}`,
      url: mockUrl,
      title: title,
      category: "uncategorized",
      aspectRatio: "square",
      likes: 0,
      status: "pending", // ALWAYS DEFAULT TO PENDING
      createdAt: new Date().toISOString()
    };

    const memories = getMemories();
    memories.push(newMemory);
    saveMemories(memories);

    return NextResponse.json({ success: true, memory: newMemory });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
