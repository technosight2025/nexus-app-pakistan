const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const { data, error } = await supabase.from("business_leads").select("*").limit(1);
  if (error) {
    console.error("Supabase Query Error:", error);
  } else {
    console.log("Record Keys:", data.length > 0 ? Object.keys(data[0]) : "No records");
    console.log("First Record:", data[0]);
  }
}

run();
