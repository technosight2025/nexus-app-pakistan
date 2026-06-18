require("dotenv").config({ path: ".env.local" });

const systemPrompt = `You are an expert UI/UX Designer specialized in Tailwind CSS.
Your job is to generate beautiful, cohesive, and premium color themes for a vendor marketplace platform.
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
    "btnPrimary": "Tailwind class for primary call-to-action buttons"
  }
}
CRITICAL RULES:
- Only use valid Tailwind CSS classes.
- Use opacity modifiers and borders to create premium glassmorphism.
- The JSON must be perfectly parsable.`

async function testOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("API Key exists:", !!apiKey);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: "json_object" },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate a theme based on this vibe/category: neon cyberpunk` }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  console.log("Status:", response.status);
  console.log(JSON.stringify(data, null, 2));
}

testOpenAI();
