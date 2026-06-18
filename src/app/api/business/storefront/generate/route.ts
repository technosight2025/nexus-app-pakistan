import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy")

const SYSTEM_PROMPT = `
You are an expert web designer and AI styling engineer. 
Your goal is to output EXACTLY 3 distinct theme configurations for a business storefront.
The user will provide a description of their business (e.g. 'Zardozi Lehnga Boutique').
You MUST generate an array of 3 highly distinct visual variations. For example:
- Variation 1: Light, elegant, minimalistic.
- Variation 2: Dark, cinematic, moody.
- Variation 3: Vibrant, modern, playful.

For EACH theme variation, you MUST output a JSON object adhering exactly to this schema:
{
  "themeName": "Name of the variation (e.g. Royal Gold)",
  "fontFamily": "font-sans | font-serif | font-mono",
  "bgMain": "A primary tailwind background color (e.g. bg-white or bg-slate-900)",
  "bgContent": "A contrasting background for cards (e.g. bg-white or bg-[#1c1c1c] or bg-transparent)",
  "textPrimary": "Main text color (e.g. text-black or text-white)",
  "textSecondary": "Secondary text color (e.g. text-gray-500)",
  "accentBg": "Accent background color for badges/highlights (e.g. bg-rose-500)",
  "accentText": "Text color to sit on top of accentBg (e.g. text-white)",
  "btnPrimary": "Button classes (e.g. bg-black text-white hover:bg-gray-800)",
  "borderRadius": "rounded-none | rounded-sm | rounded-md | rounded-lg | rounded-xl | rounded-2xl | rounded-3xl | rounded-full",
  "shadowStyle": "shadow-none | shadow-sm | shadow-md | shadow-lg | shadow-xl | shadow-2xl",
  "borderStyle": "border-0 | border border-slate-200 | border-2 border-black",
  "bgGradient": "A vibrant tailwind background gradient, e.g. bg-gradient-to-br from-rose-50 to-white. Set to 'none' if you want a solid color instead.",
  "textGradient": "A text gradient for headlines, e.g. bg-gradient-to-r from-pink-500 to-rose-500. Set to 'none' if standard text.",
  "glassEffect": boolean (true/false) to apply backdrop-blur glassmorphism to cards,
  "buttonStyle": "pill" | "sharp" | "neumorphic" | "ghost",
  "cardStyle": "elevated" | "flat" | "glass",
  "animationStyle": "fade-up" | "scale-in" | "slide-right" | "none"
}

IMPORTANT: You MUST return ONLY a raw JSON Array of length 3. Do not include markdown code blocks like \`\`\`json. Just the raw array starting with [ and ending with ].
`

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Dummy fallback if API key is invalid
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('dummy')) {
      // Mock generation for the 3 themes
      return NextResponse.json({
        success: true,
        themes: [
          {
            themeName: "Royal Gold Elegance",
            fontFamily: "font-serif",
            bgMain: "bg-[#111111]",
            bgContent: "bg-[#1A1A1A]",
            textPrimary: "text-white",
            textSecondary: "text-[#C9A227]",
            accentBg: "bg-[#C9A227]",
            accentText: "text-black",
            btnPrimary: "bg-[#C9A227] text-black hover:bg-[#A8851B]",
            borderRadius: "rounded-none",
            shadowStyle: "shadow-2xl",
            borderStyle: "border border-[#C9A227]/30",
            bgGradient: "bg-gradient-to-b from-[#111111] to-[#1A1A1A]",
            textGradient: "bg-gradient-to-r from-[#C9A227] to-[#FFF0B3]",
            glassEffect: false,
            buttonStyle: "sharp",
            cardStyle: "flat",
            animationStyle: "fade-up"
          },
          {
            themeName: "Rose Blush Light",
            fontFamily: "font-sans",
            bgMain: "bg-rose-50",
            bgContent: "bg-white",
            textPrimary: "text-slate-900",
            textSecondary: "text-slate-500",
            accentBg: "bg-rose-100",
            accentText: "text-rose-700",
            btnPrimary: "bg-rose-600 text-white hover:bg-rose-700",
            borderRadius: "rounded-2xl",
            shadowStyle: "shadow-lg",
            borderStyle: "border border-rose-100",
            bgGradient: "bg-gradient-to-br from-white via-rose-50 to-rose-100",
            textGradient: "none",
            glassEffect: true,
            buttonStyle: "pill",
            cardStyle: "glass",
            animationStyle: "scale-in"
          },
          {
            themeName: "Modern Cinematic",
            fontFamily: "font-sans",
            bgMain: "bg-black",
            bgContent: "bg-white/5",
            textPrimary: "text-white",
            textSecondary: "text-gray-400",
            accentBg: "bg-blue-600",
            accentText: "text-white",
            btnPrimary: "bg-white text-black hover:bg-gray-200",
            borderRadius: "rounded-xl",
            shadowStyle: "shadow-2xl",
            borderStyle: "border border-white/10",
            bgGradient: "bg-gradient-to-br from-slate-900 to-black",
            textGradient: "bg-gradient-to-r from-blue-400 to-purple-500",
            glassEffect: true,
            buttonStyle: "ghost",
            cardStyle: "glass",
            animationStyle: "slide-right"
          }
        ]
      })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Request: ${prompt}` }] }],
      generationConfig: {
        temperature: 0.8,
      }
    })

    const responseText = result.response.text().trim()
    let rawJson = responseText
    
    // Extract JSON array using regex if there's markdown
    const jsonMatch = rawJson.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      rawJson = jsonMatch[0]
    }

    const parsedThemes = JSON.parse(rawJson)

    if (!Array.isArray(parsedThemes) || parsedThemes.length !== 3) {
      throw new Error("AI did not return exactly 3 themes")
    }

    return NextResponse.json({ success: true, themes: parsedThemes })
  } catch (error: any) {
    console.error("AI Generation Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
