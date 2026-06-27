import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with the API key from the environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set in environment variables.' }, 
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages array provided.' }, 
        { status: 400 }
      );
    }

    // Format history for Gemini
    // Gemini expects 'user' or 'model' roles. We map 'assistant' to 'model'
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // The last message is the current prompt
    const latestMessage = messages[messages.length - 1]?.content || '';

    // Add a system prompt via the model configuration
    const modelWithInstruction = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are the Nexus AI Studio Assistant, built into the Nexus platform. You help creative professionals in Pakistan (photographers, videographers, venue managers) with tasks like generating quotations, drafting emails, managing project timelines, and writing business reports. Be concise, highly professional, and format monetary amounts using PKR (₨). Do not use markdown headers larger than h3."
    });

    const chat = modelWithInstruction.startChat({
      history: history,
    });

    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during AI generation.' }, 
      { status: 500 }
    );
  }
}
