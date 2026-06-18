// Run this script once to create the rental_outfits table in Supabase
// Usage: node scripts/create-rental-outfits-table.mjs

const SUPABASE_URL = "https://rinepaoqofwfsvwrwhkd.supabase.co"
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbmVwYW9xb2Z3ZnN2d3J3aGtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDMxMzg2NiwiZXhwIjoyMDk1ODg5ODY2fQ.2OnfkQ6qeXaoZUgaGsROCCQMjeEY7YYNQShlsLuBwRQ"

const SQL = `
CREATE TABLE IF NOT EXISTS rental_outfits (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  tag         text NOT NULL DEFAULT 'Bridal',
  status      text NOT NULL DEFAULT 'Available',
  price       text NOT NULL,
  material    text NOT NULL DEFAULT '',
  description text DEFAULT '',
  sizes       text[] DEFAULT '{}',
  features    text[] DEFAULT '{}',
  image_url   text DEFAULT '',
  rentals     int  DEFAULT 0,
  rating      numeric DEFAULT 0,
  due_back    text DEFAULT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Enable Row Level Security (allow anon reads, service_role writes)
ALTER TABLE rental_outfits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read outfits (public marketplace)
CREATE POLICY IF NOT EXISTS "Public read outfits"
  ON rental_outfits FOR SELECT USING (true);

-- Allow service role (dashboard) to insert/update/delete
CREATE POLICY IF NOT EXISTS "Service role write outfits"
  ON rental_outfits FOR ALL USING (auth.role() = 'service_role');
`

const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "apikey": SERVICE_KEY,
    "Authorization": `Bearer ${SERVICE_KEY}`,
  },
  body: JSON.stringify({ sql: SQL }),
})

// Supabase doesn't have a generic /exec_sql — use the management API instead
const mgmtRes = await fetch(
  `https://api.supabase.com/v1/projects/rinepaoqofwfsvwrwhkd/database/query`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: SQL }),
  }
)

if (mgmtRes.ok) {
  console.log("✅ Table created successfully")
} else {
  const text = await mgmtRes.text()
  console.log("Response:", mgmtRes.status, text)
  console.log("\n📋 Please run the following SQL manually in your Supabase SQL Editor:")
  console.log("   https://supabase.com/dashboard/project/rinepaoqofwfsvwrwhkd/sql/new")
  console.log("\n" + SQL)
}
