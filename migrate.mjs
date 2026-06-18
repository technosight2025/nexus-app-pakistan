import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  const sql = `
    ALTER TABLE public.vendors
    ADD COLUMN IF NOT EXISTS city TEXT,
    ADD COLUMN IF NOT EXISTS location TEXT,
    ADD COLUMN IF NOT EXISTS about TEXT,
    ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS packages JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS starting_price NUMERIC(10, 2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS rating NUMERIC(3, 1) DEFAULT 5.0,
    ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0;
  `
  // Some Supabase setups do not expose an exec_sql RPC, let's try calling it.
  // If we don't have exec_sql, we'll need to do it another way.
  const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql })
  if (error) {
    console.error("RPC error:", error)
    // If rpc fails, we cannot run DDL statements from the javascript client directly
    // unless we use the Postgres connection string. Let's see.
  } else {
    console.log("Success:", data)
  }
}

run()
