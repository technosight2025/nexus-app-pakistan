import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt, currentConfig, currentMock } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey === 'your_dummy_gemini_key_here') {
      console.warn("No real Gemini key found. Falling back to Mock AI Generator.")
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const isDark = prompt.toLowerCase().includes("dark") || prompt.toLowerCase().includes("cyber") || prompt.toLowerCase().includes("midnight");

      return NextResponse.json({
        theme_name: isDark ? "Cyber Midnight" : "Elegance Premium",
        description: `A stunning, high-converting design perfect for a ${prompt} vibe.`,
        config: {
          bgMain: isDark ? "bg-slate-950" : "bg-stone-50",
          bgContent: isDark ? "bg-slate-900 border-slate-800" : "bg-white border-stone-100",
          textPrimary: isDark ? "text-emerald-400" : "text-stone-900",
          textSecondary: isDark ? "text-slate-400" : "text-stone-500",
          accentBg: isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-50 border-rose-100",
          accentText: isDark ? "text-emerald-500" : "text-rose-600",
          btnPrimary: isDark ? "bg-emerald-500 hover:bg-emerald-600 text-black" : "bg-stone-900 hover:bg-black text-white",
          fontFamily: "font-sans",
          borderRadius: "rounded-2xl",
          shadowStyle: "shadow-xl",
          borderStyle: isDark ? "border border-slate-800" : "border border-stone-200",
          bgGradient: isDark ? "none" : "bg-gradient-to-br from-rose-50 via-white to-stone-50",
          textGradient: isDark ? "bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-400" : "none",
          glassEffect: true,
          buttonStyle: "pill",
          cardStyle: "elevated",
          animationStyle: "fade-up"
        },
        mockContent: {
          heroTitle: isDark ? "Cyberpunk Collection" : `${prompt} Collection`,
          heroSubtitle: "Explore our premium selection crafted for perfection.",
          features: [
            { title: "Premium Quality", desc: "Crafted with the finest materials." },
            { title: "Fast Delivery", desc: "Get it when you need it." },
            { title: "24/7 Support", desc: "We're always here to help." }
          ],
          products: [
            { name: "Signature Item 1", price: "$199" },
            { name: "Premium Item 2", price: "$299" },
            { name: "Elite Item 3", price: "$399" }
          ]
        }
      })
    }

    const systemPrompt = `You are an expert UI/UX Designer specialized in Tailwind CSS.
Your job is to generate or iteratively modify cohesive and premium color themes for a vendor marketplace platform.
You will be provided with the user's instruction. You may also be provided with the 'Current State' of the theme.

If 'Current State' is provided, your job is to precisely follow the user's instruction to *modify* that state. Do NOT completely change the theme if the user only asked for a minor tweak (e.g., if they say "make the text red", only change the text colors and leave the backgrounds as they are). If the user asks for a completely new theme, you may completely replace the current state.

You must return a strict JSON object with EXACTLY the following structure:
{
  "theme_name": "A catchy, premium name for the theme",
  "description": "A short 1-sentence marketing description of the vibe",
  "config": {
    "bgMain": "Tailwind class for the outer page background",
    "bgContent": "Tailwind class for the inner content cards",
    "textPrimary": "Tailwind class for main headings",
    "textSecondary": "Tailwind class for muted text",
    "accentBg": "Tailwind class for subtle badge/highlight backgrounds",
    "accentText": "Tailwind class for the text inside the accent/badge",
    "btnPrimary": "Tailwind class for primary call-to-action buttons",
    "fontFamily": "Tailwind class for font family (e.g. font-sans, font-serif, font-mono)",
    "borderRadius": "Tailwind class for corner radius (e.g. rounded-none, rounded-md, rounded-2xl, rounded-full)",
    "shadowStyle": "Tailwind class for shadows (e.g. shadow-none, shadow-md, shadow-2xl)",
    "borderStyle": "Tailwind class for borders (e.g. border-none, border border-slate-200, border-2 border-black)",
    "bgGradient": "Tailwind gradient class for background (e.g. bg-gradient-to-br from-purple-500 to-pink-500) or 'none'",
    "textGradient": "Tailwind class for text gradient (e.g. bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500) or 'none'",
    "glassEffect": boolean (true for backdrop-blur glassmorphism on cards, false otherwise),
    "buttonStyle": "pill (rounded-full), sharp (rounded-none), neumorphic (soft shadow), or ghost (border only)",
    "cardStyle": "elevated (heavy shadow), flat (no shadow), or glass (translucent)",
    "animationStyle": "fade-up, scale-in, slide-right, or none"
  },
  "mockContent": {
    "heroTitle": "A contextual title for the hero image",
    "heroSubtitle": "A catchy subtitle for the hero section",
    "features": [
      { "title": "Feature 1 Title", "desc": "Short description" },
      { "title": "Feature 2 Title", "desc": "Short description" },
      { "title": "Feature 3 Title", "desc": "Short description" }
    ],
    "products": [
      { "name": "Contextual Product 1", "price": "$199" },
      { "name": "Contextual Product 2", "price": "$299" },
      { "name": "Contextual Product 3", "price": "$399" }
    ]
  }
}
CRITICAL RULES:
- Only use valid Tailwind CSS classes.
- Use opacity modifiers and borders to create premium glassmorphism.
- Use beautiful gradients if the user asks for a vibrant, cinematic, or modern theme.
- The JSON must be perfectly parsable.`

    let userMessageContent = `Instruction: ${prompt}`
    if (currentConfig) {
      userMessageContent += `\n\nCurrent Config State:\n${JSON.stringify(currentConfig, null, 2)}`
    }
    if (currentMock) {
      userMessageContent += `\n\nCurrent Mock Content State:\n${JSON.stringify(currentMock, null, 2)}`
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [{
          role: 'user',
          parts: [{ text: userMessageContent }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Gemini Error:", data)
      return NextResponse.json({ error: "Failed to generate theme from Gemini" }, { status: 500 })
    }

    const jsonString = data.candidates[0].content.parts[0].text
    const generatedTheme = JSON.parse(jsonString)

    return NextResponse.json(generatedTheme)

  } catch (error: any) {
    console.error("Error generating theme:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
