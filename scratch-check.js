const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  console.log("Checking rental_bookings table...");
  const { data: bData, error: bError } = await supabase.from("rental_bookings").select("*").limit(1);
  if (bError) {
    console.log("rental_bookings table query failed:", bError.message);
  } else {
    console.log("rental_bookings table exists! Data:", bData);
  }

  console.log("Checking bookings table columns...");
  const { data: checkData, error: checkError } = await supabase.from("bookings").select("*").limit(1);
  if (checkError) {
    console.log("bookings table query failed:", checkError.message);
  } else {
    console.log("bookings table exists! Columns in first row:", Object.keys(checkData[0] || {}));
  }
}

check();
