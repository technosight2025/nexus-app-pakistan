require('dotenv').config({ path: '.env.local' });
const Replicate = require('replicate');

async function test() {
  try {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
    const model = await replicate.models.get('lucataco', 'faceswap');
    const version = await replicate.models.versions.get('lucataco', 'faceswap', '9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d');
    console.log(JSON.stringify(version.openapi_schema, null, 2));
  } catch (e) {
    console.error('API Error:', e.message);
  }
}
test();
