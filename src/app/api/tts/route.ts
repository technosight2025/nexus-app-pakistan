import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    
    // If the API key is missing or is the dummy key, return a specific error
    if (!apiKey || apiKey === 'your_dummy_openai_key_here') {
      console.warn("TTS skipped: No OPENAI_API_KEY configured.");
      return NextResponse.json(
        { error: 'OpenAI API key is missing. Please add OPENAI_API_KEY to your .env.local to enable Voice Mode.' },
        { status: 503 } // 503 Service Unavailable so frontend can gracefully handle it
      );
    }

    // Call OpenAI TTS
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1', // or tts-1-hd for higher quality
        input: text,
        voice: 'nova', // 'nova' is an extremely realistic, expressive female voice (similar to Gemini/ChatGPT)
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI TTS API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate speech from OpenAI' },
        { status: response.status }
      );
    }

    // Stream the audio buffer back to the client
    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': arrayBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('TTS Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during TTS generation' },
      { status: 500 }
    );
  }
}
