require('dotenv').config({ path: '.env.local' });
const Replicate = require('replicate');

async function test() {
  try {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    
    // A tiny 1x1 pixel base64 image
    const tinyImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    
    console.log("Starting prediction...");
    const prediction = await replicate.predictions.create({
      version: "9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d", // lucataco/faceswap
      input: {
        target_image: tinyImage,
        swap_image: tinyImage
      }
    });
    console.log("Prediction started:", prediction.id);
  } catch (e) {
    console.error("API Error:", e.message);
  }
}
test();
