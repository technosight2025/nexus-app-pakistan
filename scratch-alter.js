const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const sql = `
    -- Make room_id and event_id nullable in bookings table
    ALTER TABLE public.bookings ALTER COLUMN event_id DROP NOT NULL;
    ALTER TABLE public.bookings ALTER COLUMN room_id DROP NOT NULL;

    -- Add wardrobe columns to bookings table
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS outfit_id UUID REFERENCES public.rental_outfits(id) ON DELETE SET NULL;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS customer_name TEXT;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS customer_phone TEXT;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS start_date DATE;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS end_date DATE;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS payment_method TEXT;
    ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS total_price TEXT;
  `;

  console.log("Attempting to run migration via exec_sql RPC...");
  const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql });
  if (error) {
    console.error("RPC exec_sql failed:", error.message, error.details);
  } else {
    console.log("Migration applied successfully:", data);
  }
}

run();
