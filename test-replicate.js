require('dotenv').config({ path: '.env.local' });
const Replicate = require('replicate');

async function test() {
  try {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    const model = await replicate.models.get('lucataco', 'faceswap');
    console.log('Model exists:', model.name);
    console.log('Latest version:', model.latest_version.id);
  } catch (e) {
    console.error('API Error:', e.message);
  }
}
test();
