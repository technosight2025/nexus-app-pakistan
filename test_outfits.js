const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Checking rental_outfits table...");
  const { data, error } = await supabase
    .from('rental_outfits')
    .select('*');

  if (error) {
    console.error('Error:', error.message, error.details, error.hint);
  } else {
    console.log('Success! Count:', data.length);
  }
}
test();
