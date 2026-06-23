CREATE TYPE memory_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  status memory_status DEFAULT 'pending',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Approved memories are publicly accessible
CREATE POLICY "Approved memories are publicly accessible"
  ON memories FOR SELECT
  USING (status = 'approved');

-- Allow inserts for anyone (e.g., guests uploading) or manage via Service Role in API
-- For this feature, we will manage inserts via the API using Service Role to ensure status is forced to 'pending'.
-- We will also manage updates via API.
