require("dotenv").config({ path: ".env.local" });

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
  const data = await response.json();
  const models = data.models.map(m => m.name);
  console.log(models);
}

listModels();
