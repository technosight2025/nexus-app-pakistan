const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, contacts (id, name, phone)');

  if (error) {
    console.error('Error:', error.message, error.details, error.hint);
  } else {
    console.log('Data:', data);
  }
}
test();
